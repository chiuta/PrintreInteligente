// Teste pentru claude-proxy.worker.js — rulare: node tests/worker.test.mjs (fără rețea; fetch-ul upstream e simulat)
import worker from '../claude-proxy.worker.js';
let pass = 0, fail = 0;
const ok = (c, n, i) => { if (c) { pass++; console.log('  ok   ' + n); } else { fail++; console.log('  FAIL ' + n + (i === undefined ? '' : ' ' + JSON.stringify(i))); } };
const kv = new Map();
const env = {ANTHROPIC_API_KEY: 'k', RATELIMIT_KV: {get: async k => kv.get(k) ?? null, put: async (k, v) => { kv.set(k, v); }}};
const ctx = {waitUntil: p => p};
let sent = null;
globalThis.fetch = async (u, o) => { sent = JSON.parse(o.body); return new Response('{"content":[]}', {status: 200}); };
const call = (body, headers = {}) => worker.fetch(new Request('https://x/api', {method: 'POST', headers: {Origin: 'https://alexio.tf', 'Content-Type': 'application/json', ...headers}, body}), env, ctx);
const good = {model: 'claude-sonnet-5-5', max_tokens: 100, messages: [{role: 'user', content: 'hi'}]};
for (const b of ['null', '[]', '"x"', '5']) { const r = await call(b); ok(r.status === 400, 'body ' + b + ' → 400', r.status); }
let r = await call(JSON.stringify({...good, max_tokens: -5})); ok(r.status === 200 && sent.max_tokens === 1000, 'max_tokens negativ → 1000', sent && sent.max_tokens);
r = await call(JSON.stringify({...good, max_tokens: 99999})); ok(sent.max_tokens === 1500, 'max_tokens peste plafon → 1500', sent.max_tokens);
r = await call(JSON.stringify({...good, tools: [{type: 'web_search_20250305', name: 'web_search'}], thinking: {type: 'enabled', budget_tokens: 5000}, stream: true}));
ok(!('tools' in sent) && !('thinking' in sent) && !('stream' in sent), 'câmpuri neprevăzute nu se retransmit', Object.keys(sent));
r = await worker.fetch(new Request('https://x/api', {method: 'POST', headers: {Origin: 'https://evil.example'}, body: JSON.stringify(good)}), env, ctx); ok(r.status === 403, 'origine străină → 403');
r = await worker.fetch(new Request('https://x/api', {method: 'OPTIONS', headers: {Origin: 'https://alexio.tf'}}), env, ctx); ok(/cf-turnstile-response/.test(r.headers.get('Access-Control-Allow-Headers')), 'preflight permite antetul Turnstile');
console.log(`\n${pass} ok, ${fail} eșuate`); process.exit(fail ? 1 : 0);
