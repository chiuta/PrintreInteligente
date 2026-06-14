/*
  ====================================================================
  Autor: Alexandru-Ionuț Chiuță (Alexio)
  LICENȚĂ: TRADE-FREE + CC0 1.0 — domeniu public, fără troc (TROM · trom.tf)
  https://creativecommons.org/publicdomain/zero/1.0/
  Sprijin: Patreon https://www.patreon.com/c/alexio_tf · Buy Me a Coffee https://buymeacoffee.com/echo.of.the.strings
  ====================================================================
*/

/**
 * Cloudflare Worker — proxy sigur către Anthropic API
 * ----------------------------------------------------
 * Pentru: "Printre inteligențe" (alexio.tf) — funcțiile GRM și MYE
 *
 * Rolul Worker-ului:
 *   1. Injectează x-api-key server-side (cheia NU ajunge în browser)
 *   2. Blochează apelurile din alte origini (CORS whitelist)
 *   3. Aplică rate-limit per IP (împotriva abuzului)
 *   4. Validează payload-ul (model permis, max_tokens limitat)
 *
 * Deploy rapid:
 *   1. Dashboard Cloudflare → Workers & Pages → Create → Hello World
 *   2. Lipește acest cod, click "Save and Deploy"
 *   3. Settings → Variables → Add "ANTHROPIC_API_KEY" ca "Secret"
 *      (obține cheia de pe console.anthropic.com)
 *   4. Zonă alexio.tf → Rules → Routes → Add route:
 *        alexio.tf/api/claude  →  claude-proxy (worker-ul tău)
 *   5. Testează: deschide alexio.tf și încearcă "Recenzia ta"
 *
 * Cost estimativ: Workers Free = 100.000 requests/zi, suficient.
 * Cost API Anthropic: ~$0.003/apel Sonnet 4 (1000 tokens).
 * Cu rate-limit-ul de mai jos, abuzul e imposibil.
 */

const ALLOWED_ORIGINS = new Set([
  'https://alexio.tf',
  'https://www.alexio.tf',
  // Adaugă aici dev local dacă e nevoie:
  // 'http://localhost:8080',
]);

const ALLOWED_MODELS = new Set([
  'claude-sonnet-4-20250514',
  'claude-opus-4-5',
  'claude-haiku-4-5-20251001',
]);

const MAX_TOKENS_LIMIT = 1500;          // hard cap, ignoră orice depășește
const RATE_LIMIT_PER_IP_PER_HOUR = 30;  // 30 apeluri/oră/IP

export default {
  async fetch(request, env, ctx) {
    // ─── 1. CORS preflight ─────────────────────────────────────
    const origin = request.headers.get('Origin') || '';
    const corsOk = ALLOWED_ORIGINS.has(origin);

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(origin, corsOk),
      });
    }

    // ─── 2. Blocare origini neautorizate ───────────────────────
    if (!corsOk) {
      return jsonError(403, 'Origin not allowed', origin);
    }

    if (request.method !== 'POST') {
      return jsonError(405, 'Method not allowed', origin);
    }

    // ─── 3. Rate-limit per IP (KV storage) ─────────────────────
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const hour = Math.floor(Date.now() / 3_600_000);
    const rlKey = `rl:${ip}:${hour}`;

    if (env.RATELIMIT_KV) {
      const current = parseInt(await env.RATELIMIT_KV.get(rlKey) || '0', 10);
      if (current >= RATE_LIMIT_PER_IP_PER_HOUR) {
        return jsonError(429, 'Rate limit exceeded. Încearcă într-o oră.', origin);
      }
      ctx.waitUntil(
        env.RATELIMIT_KV.put(rlKey, String(current + 1), { expirationTtl: 3700 })
      );
    }
    // Dacă nu ai KV configurat, rate-limit-ul e skipped — recomandat să-l adaugi:
    // Dashboard → Workers & Pages → KV → Create → "RATELIMIT_KV" → bind la worker.

    // ─── 4. Validare payload ───────────────────────────────────
    let body;
    try {
      body = await request.json();
    } catch {
      return jsonError(400, 'Body nu e JSON valid', origin);
    }

    if (!body.model || !ALLOWED_MODELS.has(body.model)) {
      return jsonError(400, 'Model nepermis', origin);
    }
    if (typeof body.max_tokens !== 'number' || body.max_tokens > MAX_TOKENS_LIMIT) {
      body.max_tokens = Math.min(body.max_tokens || 1000, MAX_TOKENS_LIMIT);
    }
    if (!Array.isArray(body.messages) || body.messages.length === 0) {
      return jsonError(400, 'messages lipsă sau invalid', origin);
    }

    // ─── 5. Proxy către Anthropic ──────────────────────────────
    if (!env.ANTHROPIC_API_KEY) {
      return jsonError(500, 'API key nu e configurat pe Worker', origin);
    }

    try {
      const upstream = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify(body),
      });

      const text = await upstream.text();
      return new Response(text, {
        status: upstream.status,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders(origin, true),
        },
      });
    } catch (err) {
      return jsonError(502, 'Upstream error: ' + err.message, origin);
    }
  },
};

function corsHeaders(origin, allowed) {
  return {
    'Access-Control-Allow-Origin': allowed ? origin : 'null',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  };
}

function jsonError(status, message, origin) {
  return new Response(JSON.stringify({ error: { message } }), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(origin, ALLOWED_ORIGINS.has(origin)),
    },
  });
}
