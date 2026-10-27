// Teste „scenarii văzute” (v2.2.0): sub-scenariile (sub-a1…sub-e2) se marchează după ≥3 s în banda centrală a ecranului;
// familiile D și E devin „parcurse” doar prin acest mecanism; persistență locală; ștergere.
// Rulare: node tests/scenarii-vazute.test.mjs   (Playwright + Chromium; PW_ROOT/CHROMIUM_PATH opționale)
import {createRequire} from 'module';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const require = createRequire(process.env.PW_ROOT || import.meta.url);
const {chromium} = require('playwright');
const HERE = path.dirname(fileURLToPath(import.meta.url));
const URL_APP = 'file://' + path.join(HERE, '..', 'index.html');
let pass = 0, fail = 0;
const ok = (c, n, i) => { if (c) { pass++; console.log('  ok   ' + n); } else { fail++; console.log('  FAIL ' + n + (i === undefined ? '' : ' ' + JSON.stringify(i).slice(0, 300))); } };
const browser = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || undefined, args: ['--no-sandbox']});
const net = [], errs = [];
const ctx = await browser.newContext({viewport: {width: 1280, height: 800}, locale: 'ro-RO'});
await ctx.route(/^https?:/, r => { net.push(r.request().url()); r.abort(); });
const page = await ctx.newPage();
page.on('pageerror', e => errs.push(e.message));
page.on('console', m => { if (/Content Security Policy|Refused to/i.test(m.text())) errs.push(m.text()); });
await page.goto(URL_APP);
await page.waitForFunction(() => window.__piCale && typeof go === 'function');
console.log('PrintreInteligente — scenarii văzute');
const epi = () => page.evaluate(() => { const i = P.findIndex(p => p.sg === 'book-epilog'); go(i); return i; });
const center = id => page.evaluate(i => { document.getElementById(i).scrollIntoView({block: 'center'}); }, id);
const sub = () => page.evaluate(() => window.__piCale.state().sub);
ok(JSON.stringify(await sub()) === '{}', 'la început nu e marcat niciun sub-scenariu');
await epi(); await page.waitForTimeout(500);
ok(await page.evaluate(() => !!document.getElementById('sub-e2') && !!document.getElementById('sub-d1')), 'Epilogul conține sub-d1 și sub-e2');
// trecere rapidă: sub 3 s nu marchează
await center('sub-d1'); await page.waitForTimeout(1000); await center('sub-e2'); await page.waitForTimeout(1000);
ok(JSON.stringify(await sub()) === '{}', 'trecerea rapidă (<3 s) nu marchează nimic', await sub());
await center('sub-e2'); await page.waitForTimeout(3800);
const s1 = await sub();
ok(s1['sub-e2'] >= 1, 'sub-e2 marcat după ≥3 s pe ecran', s1);
ok(!s1['sub-d1'], 'sub-d1 rămâne nemarcat', s1);
await page.evaluate(() => window.__piCale.open()); await page.waitForSelector('.pc-map');
const fam = await page.evaluate(() => [...document.querySelectorAll('.pc-fam')].map(f => f.classList.contains('pc-seen')));
ok(JSON.stringify(fam) === '[false,false,false,false,true]', 'doar familia E e marcată (D nu)', fam);
ok(await page.locator('.pc-chip.pc-seen').count() === 1 && /✓/.test(await page.locator('.pc-chip.pc-seen').innerText()), 'exact un scenariu marcat cu ✓');
ok((await page.locator('.pc-chip.pc-seen').getAttribute('data-sub')) === 'sub-e2', 'scenariul marcat e E2');
// persistență
await page.reload(); await page.waitForFunction(() => window.__piCale);
ok((await sub())['sub-e2'] >= 1, 'marcajul persistă după reîncărcare');
// stare coruptă / ostilă: ignorată
await page.evaluate(() => localStorage.setItem('printreinteligente.cale', JSON.stringify({sub: {'sub-z9': 5, '__proto__': 3, 'sub-a1': -2, 'sub-b2': 'x', 'sub-c1': 2}})));
const hs = await sub();
ok(JSON.stringify(hs) === '{"sub-c1":2}', 'chei/valori invalide ignorate', hs);
await page.evaluate(() => localStorage.setItem('printreinteligente.cale', '{nu e json'));
ok(JSON.stringify(await sub()) === '{}', 'JSON corupt → stare goală');
// ștergere
await page.evaluate(() => localStorage.setItem('printreinteligente.cale', JSON.stringify({sub: {'sub-e1': 1}})));
await page.evaluate(() => window.__piCale.open()); await page.waitForSelector('.pc-map');
ok(await page.locator('.pc-fam.pc-seen').count() === 1, 'E marcată din stare salvată');
await page.click('#pcDel'); await page.waitForTimeout(400);
await page.evaluate(() => { const b = [...document.querySelectorAll('.fff-dlg button, dialog button, [role=dialog] button')].filter(x => /Da|Șterge|OK/i.test(x.textContent)).pop(); if (b) b.click(); });
await page.waitForTimeout(600);
ok(JSON.stringify(await sub()) === '{}', 'ștergerea alegerilor curăță și scenariile văzute', await sub());
// ilustrațiile cărții se încarcă de pe alexio.tf (documentat: „Offline: parțial”); orice altă cerere ar fi o problemă
const alt = net.filter(u => !u.startsWith('https://alexio.tf/images/'));
ok(alt.length === 0, 'nicio cerere de rețea în afară de ilustrațiile alexio.tf (documentate)', alt);
ok(errs.length === 0, 'fără erori JS/CSP', errs);
await browser.close();
console.log(pass + ' ok, ' + fail + ' eșuate');
process.exit(fail ? 1 : 0);
