// Teste funcții noi (runda 8, 14 octombrie 2026) — Playwright, Chromium headless, rețea blocată.
// Rulare: node tests/fff-r8.test.mjs   (cere /opt/node-tools cu playwright și /opt/pw-browsers/chromium; axe-core opțional prin AXE_PATH)
// [fff-portable] axe-core: FFF_AXE / AXE_PATH, apoi pachetul `axe-core` (npm i -D axe-core). Dacă lipsește: undefined (testele cu axe pică cu mesaj clar).
import {createRequire as __fffCR} from 'node:module';
const __fffAxe = () => { try { return __fffCR(import.meta.url).resolve('axe-core/axe.min.js'); } catch { return undefined; } };
import {createRequire} from 'module';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const require = createRequire(process.env.PW_ROOT || import.meta.url);
const {chromium} = require('playwright');
const HERE = path.dirname(fileURLToPath(import.meta.url));
const INDEX = path.join(HERE, '..', 'index.html');
const URL_APP = 'file://' + INDEX;
const AXE = process.env.AXE_PATH || __fffAxe();
const sleep = ms => new Promise(r => setTimeout(r, ms));
let pass = 0, fail = 0;
const ok = (cond, name, info) => { if (cond) { pass++; console.log('  ok   ' + name); } else { fail++; console.log('  FAIL ' + name + (info === undefined ? '' : ' ' + JSON.stringify(info).slice(0, 500))); } };
const FLAGS = ['--no-sandbox', '--allow-loopback-in-peer-connection', '--disable-features=WebRtcHideLocalIpsWithMdns'];
const browser = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || undefined, args: FLAGS});
const net = [], errs = [];
async function mk(o = {}) {
  const ctx = await browser.newContext({viewport: {width: o.w || 1280, height: o.h || 800}, acceptDownloads: true, colorScheme: o.scheme || 'dark', reducedMotion: o.reduced ? 'reduce' : 'no-preference', locale: o.locale || 'ro-RO', bypassCSP: !!o.bypassCSP});
  await ctx.route(/^https?:/, r => { net.push(r.request().url()); r.abort(); });
  if (o.init) await ctx.addInitScript(o.init);
  const page = await ctx.newPage();
  page.on('pageerror', e => errs.push('pageerror: ' + e.message));
  page.on('console', m => { const t = m.text(); if (m.type() === 'error' || /Content Security Policy|Refused to/i.test(t)) errs.push('console: ' + t); });
  if (o.goto !== false) await page.goto(o.url || URL_APP);
  return {ctx, page};
}
async function axeRun(page, sel) {
  if (!(await page.evaluate(() => !!window.axe))) await page.evaluate(fs.readFileSync(AXE, 'utf8') + '\n;0');
  return page.evaluate(async s => { const r = await window.axe.run(s ? document.querySelector(s) : document, {resultTypes: ['violations']}); return r.violations.map(v => v.id + ':' + v.nodes.map(n => n.target.join(' ')).slice(0, 3).join(' | ')); }, sel || null);
}
const noHScroll = page => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1);
// sintetizator vocal fals: înregistrează textele „citite”
const TTS_MOCK = () => {
  window.__spoken = [];
  class U { constructor(t) { this.text = t; this.voice = null; this.lang = ''; this.rate = 1; } }
  const V = [{name: 'Test RO', lang: 'ro-RO', voiceURI: 'ro', localService: true, default: true}, {name: 'Test EN', lang: 'en-US', voiceURI: 'en', localService: true, default: false}];
  const synth = {getVoices: () => V, speaking: false, addEventListener() {}, removeEventListener() {}, pause() {}, resume() {},
    cancel() { synth.speaking = false; }, speak(u) { synth.speaking = true; setTimeout(() => { window.__spoken.push({text: u.text, lang: u.lang}); synth.speaking = false; if (u.onstart) u.onstart({}); if (u.onend) u.onend({}); }, 5); }};
  Object.defineProperty(window, 'SpeechSynthesisUtterance', {value: U, configurable: true}); Object.defineProperty(window, 'speechSynthesis', {value: synth, configurable: true});
};
console.log('PrintreInteligente — teste funcții noi (marcaje și note, kit)');
const netOwn = () => net.filter(u => !/^https:\/\/alexio\.tf\//.test(u));
const SEL = (page, i) => page.evaluate(i => { const p = document.querySelectorAll('#ct p')[i]; p.scrollIntoView(); const r = document.createRange(); r.selectNodeContents(p); const s = getSelection(); s.removeAllRanges(); s.addRange(r); return p.textContent.slice(0, 40); }, i);
for (const [w, h] of [[1280, 800], [360, 740]]) {
  const {ctx, page} = await mk({w, h});
  await page.waitForTimeout(3800);
  ok(await page.evaluate(() => !!(window.FFF && FFF.bundle && FFF.label && FFF.store)), `kit încărcat (${w}x${h})`);
  ok(await noHScroll(page), `fără depășire orizontală ${w}x${h}`);
  const ax = await axeRun(page); ok(ax.length === 0, `axe 0 violări (start) ${w}x${h}`, ax);
  ok(await page.locator('#r8-notes-btn').isVisible(), `butonul de note e vizibil ${w}x${h}`);
  await page.locator('#r8-notes-btn').click();
  const ax3 = await axeRun(page); ok(ax3.length === 0, `axe 0 violări cu dialogul de note ${w}x${h}`, ax3);
  ok(await noHScroll(page), `dialog note: fără depășire ${w}x${h}`);
  await ctx.close();
}
ok(errs.filter(e => !/Failed to load resource/.test(e)).length === 0, 'fără pageerror/CSP la pornire', errs);
{
  const {ctx, page} = await mk({});
  await page.waitForTimeout(3800);
  const t0 = await page.evaluate(() => document.title);
  await page.locator('#r8-notes-btn').click();
  ok(await page.locator('#r8n-add').count() === 0 || await page.locator('#r8n-add').isHidden(), 'fără selecție nu se poate adăuga marcaj');
  await page.keyboard.press('Escape');
  await page.evaluate(() => go(0)); await page.waitForTimeout(500);
  const txt = await SEL(page, 0);
  await page.locator('#r8-notes-btn').click();
  await page.locator('#r8n-note').fill('nota mea de test');
  await page.locator('#r8n-add').click();
  ok(await page.locator('.r8n-list li b').count() === 1, 'marcaj adăugat și listat');
  ok(/nota mea de test/.test(await page.locator('.r8n-list').innerText()), 'nota apare în listă');
  await page.keyboard.press('Escape');
  const st = await page.evaluate(() => Object.keys(localStorage).filter(k => /^fff\.printreinteligente\./.test(k)));
  ok(st.length > 0, 'marcajul e păstrat în FFF.store', st);
  await page.reload(); await page.waitForTimeout(3800);
  await page.locator('#r8-notes-btn').click();
  ok(await page.locator('.r8n-list li b').count() === 1, 'marcajul persistă după reîncărcare');
  const dl = page.waitForEvent('download');
  await page.locator('#r8n-md').click();
  const d = await dl; const md = fs.readFileSync(await d.path(), 'utf8');
  ok(/nota mea de test/.test(md) && d.suggestedFilename().endsWith('.md'), 'export Markdown conține nota', d.suggestedFilename());
  await page.keyboard.press('Escape');
  // copia .fff.json conține notele
  const bundle = await page.evaluate(async () => { const b = await FFF.bundle.build(); return JSON.stringify(b); });
  ok(bundle && /nota mea de test/.test(bundle), 'copia .fff.json conține notele');
  // „Mergi la fragment” de pe altă pagină
  await page.evaluate(() => go(3)); await page.waitForTimeout(400);
  const before = await page.evaluate(() => cIdx);
  await page.locator('#r8-notes-btn').click();
  await page.locator('.r8n-list li .fff-btn').first().click();
  await page.waitForTimeout(500);
  const after = await page.evaluate(() => cIdx);
  ok(before === 3 && after === 0, 'mergi la fragment navighează la pagina notei', [before, after]);
  ok(!(await page.locator('#r8n-note').isVisible().catch(() => false)), 'dialogul se închide');
  await page.locator('#r8-notes-btn').click();
  await page.locator('.r8n-list li .fff-danger-o').first().click();
  ok(await page.locator('.r8n-list li b').count() === 0, 'marcaj șters');
  await page.keyboard.press('Escape');
  // regresie: căutarea veche și audiobook
  await page.keyboard.press('Control+k'); await page.waitForTimeout(300);
  ok(await page.locator('#srchOverlay.open').count() === 1, 'căutarea existentă (Ctrl+K) funcționează');
  await page.keyboard.press('Escape');
  await page.locator('#btnAB').click().catch(() => {});
  ok(await page.locator('#btnAB').count() === 1, 'butonul audiobook rămâne');
  await ctx.close();
}
const errs2 = errs.filter(e => !/Failed to load resource/.test(e)); ok(errs2.length === 0, 'fără pageerror/CSP în tot setul (cu excepția imaginilor alexio.tf blocate de test)', errs2); ok(netOwn().length === 0, '0 cereri de rețea proprii (în afară de imaginile alexio.tf declarate)', netOwn());
console.log(`\n${pass} ok, ${fail} eșuate`); await browser.close(); process.exit(fail ? 1 : 0);
