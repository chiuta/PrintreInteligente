// Teste „Calea cititorului” (v2.0.0): alegeri salvate, arborele poveștii, export ca episod de sine stătător.
// Rulare: node tests/cale.test.mjs   (Playwright + Chromium; axe-core opțional prin FFF_AXE / AXE_PATH)
import {createRequire as __fffCR} from 'node:module';
const __fffAxe = () => process.env.FFF_AXE || process.env.AXE_PATH || (() => { try { return __fffCR(import.meta.url).resolve('axe-core/axe.min.js'); } catch { return undefined; } })();
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
let pass = 0, fail = 0;
const ok = (cond, name, info) => { if (cond) { pass++; console.log('  ok   ' + name); } else { fail++; console.log('  FAIL ' + name + (info === undefined ? '' : ' ' + JSON.stringify(info).slice(0, 500))); } };
const browser = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || undefined, args: ['--no-sandbox']});
const net = [], errs = [];
async function mk(o = {}) {
  const ctx = await browser.newContext({viewport: {width: o.w || 1280, height: o.h || 800}, acceptDownloads: true, colorScheme: 'light', locale: 'ro-RO'});
  await ctx.route(/^https?:/, r => { net.push(r.request().url()); r.abort(); });
  const page = await ctx.newPage();
  page.on('pageerror', e => errs.push('pageerror: ' + e.message));
  page.on('console', m => { const t = m.text(); if (/Content Security Policy|Refused to/i.test(t)) errs.push('console: ' + t); });
  await page.goto(URL_APP);
  await page.waitForFunction(() => window.__piCale && typeof go === 'function');
  return {ctx, page};
}
const st = page => page.evaluate(() => window.__piCale.state());
async function axeRun(page, sel) {
  if (!(await page.evaluate(() => !!window.axe))) await page.evaluate(fs.readFileSync(AXE, 'utf8') + '\n;0');
  return page.evaluate(async s => { const r = await window.axe.run(s ? document.querySelector(s) : document, {resultTypes: ['violations']}); return r.violations.map(v => v.id + ':' + v.nodes.length); }, sel);
}
async function download(page, click) {
  const [dl] = await Promise.all([page.waitForEvent('download', {timeout: 8000}), click()]);
  const p = await dl.path();
  return {name: dl.suggestedFilename(), text: fs.readFileSync(p, 'utf8')};
}
console.log('PrintreInteligente — Calea cititorului');
const sgIdx = {A: 3, B: 4, C: 5};
{
  const {ctx, page} = await mk();
  ok(!errs.length, 'pornire: 0 erori și 0 încălcări CSP', errs);
  ok(await page.locator('#btnTree').count() === 1, 'butonul 🌳 „Arborele poveștii” e în bara de sus');
  const map = await page.evaluate(() => ['book-prolog', 'book-cap1', 'book-cap2', 'book-scen-a', 'book-scen-b', 'book-scen-c', 'book-epilog'].map(s => P.findIndex(p => p.sg === s)));
  ok(map.join() === '0,1,2,3,4,5,6', 'structura cărții: prolog, cap. 1–2, trei scenarii, epilog', map);
  await page.evaluate(() => go(2)); await page.waitForTimeout(200);
  ok((await page.locator('#piCaleBar').innerText()).includes('Nu ai ales încă un scenariu.'), 'Capitolul 2: bara arată că nu s-a ales încă un scenariu');
  ok((await st(page)).pick === null && (await st(page)).seen.cap2 === 1, 'stare: Capitolul 2 parcurs, nicio alegere');
  await page.evaluate(() => go(3)); await page.waitForTimeout(200);
  let s = await st(page);
  ok(s.pick === 'A' && s.last === 'A' && s.hist.length === 1 && s.seen.A === 1, 'alegerea scenariului A se salvează (stare + istoric)', s);
  ok((await page.locator('#piCaleBar').innerText()).includes('SCENARIUL A'), 'bara afișează „Calea ta: SCENARIUL A …”');
  const same = await page.evaluate(() => { const nt = h => { const t = document.createElement('template'); t.innerHTML = h; return [...t.content.querySelectorAll('p')].map(p => p.textContent.replace(/\s+/g, ' ').trim()).join('|'); }; const g = document.getElementById('pgb'); return nt(g.innerHTML) === nt(piH(P[3])) && !g.querySelector('#piCaleBar') && !document.querySelector('#ct p #piCaleBar'); });
  ok(same, 'textul cărții din pagină e identic cu originalul; bara e în afara lui');
  await page.evaluate(() => go(4)); await page.waitForTimeout(200);
  s = await st(page);
  ok(s.pick === 'B' && s.hist.length === 2 && s.hist[1].c === 'B', 'scenariul B: ramură nouă în istoric', s);
  await page.evaluate(() => go(4)); await page.waitForTimeout(100);
  ok((await st(page)).hist.length === 2, 'redeschiderea imediată a aceluiași scenariu nu dublează istoricul');

  // dialogul „Arborele poveștii”
  await page.click('#piCaleOpen');
  const dlg = page.locator('dialog[data-fff-dialog="pi-tree"]');
  ok(await dlg.isVisible(), 'butonul din bară deschide „Arborele poveștii”');
  ok(await dlg.locator('li.pc-pick-wrap').count() === 3 && await dlg.locator('.pc-t > li').count() === 4, 'arbore: 3 ramuri sub Capitolul 2 + prolog, cap. 1, cap. 2, epilog');
  const radios = await dlg.locator('input[name=pcPick]').evaluateAll(r => r.map(x => x.value + ':' + x.checked));
  ok(radios.join() === 'A:false,B:true,C:false', 'ramura aleasă (B) e bifată', radios);
  const stat = await dlg.locator('.pc-br .pc-st').allInnerTexts();
  ok(stat[0].startsWith('Parcurs') && stat[1].startsWith('Parcurs') && stat[2] === 'Neparcurs', 'ramurile A și B parcurse, C neparcurs', stat);
  ok(await dlg.locator('.pc-hist li').count() === 2, 'istoric: două alegeri');
  ok((await axeRun(page, 'dialog[data-fff-dialog="pi-tree"]')).length === 0, 'axe-core pe dialogul arborelui: 0 violări', await axeRun(page, 'dialog[data-fff-dialog="pi-tree"]'));
  await dlg.locator('input[value=C]').check();
  ok((await st(page)).pick === 'C', 'schimbarea traseului exportat se salvează (C)');

  // export HTML
  const exp = await download(page, () => dlg.locator('#pcExpHtml').click());
  ok(/^printre-inteligente-calea-C-ro\.html$/.test(exp.name), 'nume de fișier: calea C, limba ro', exp.name);
  const checks = await page.evaluate(h => {
    const d = new DOMParser().parseFromString(h, 'text/html');
    const txt = e => e.textContent.replace(/\s+/g, ' ').trim();
    const want = k => { const t = document.createElement('template'); t.innerHTML = piH(P[k]); return [...t.content.querySelectorAll('p')].filter(p => !p.classList.contains('caption') && p.textContent.trim()).map(txt); };
    const body = txt(d.body);
    const missing = [0, 1, 2, 5, 6].flatMap(k => want(k).filter(x => !body.includes(x)).map(x => k + ':' + x.slice(0, 30)));
    const common = new Set([0, 1, 2, 5, 6].flatMap(want)); const unwanted = [3, 4].filter(k => want(k).filter(x => x.length > 60 && !common.has(x)).some(x => body.includes(x)));
    return {sections: d.querySelectorAll('section').length, h2: [...d.querySelectorAll('h2')].map(txt), imgs: d.querySelectorAll('img').length, ext: /alexio\.tf|https?:\/\//.test(h.replace(/<style[\s\S]*?<\/style>/, '')), hand: /data-on-|onclick|<script/i.test(h), missing, unwanted, lang: d.documentElement.lang, nTexts: [0, 1, 2, 5, 6].map(k => want(k).length)};
  }, exp.text);
  ok(checks.sections === 5 && checks.h2.length === 5 && /SCENARIUL C/.test(checks.h2[3]) && /EPILOG/.test(checks.h2[4]), 'episod HTML: 5 secțiuni, traseul Prolog → Cap. 1 → Cap. 2 → C → Epilog', checks.h2);
  ok(checks.missing.length === 0, 'toate paragrafele cărții de pe traseu apar neschimbate în episod (' + checks.nTexts.join('+') + ' paragrafe)', checks.missing.slice(0, 3));
  ok(checks.unwanted.length === 0, 'scenariile neafișate (A, B) nu apar în episod', checks.unwanted);
  ok(checks.imgs === 0 && !checks.ext && !checks.hand, 'episodul e de sine stătător: fără imagini, linkuri externe, scripturi sau handlere', checks);
  ok(exp.text.includes('Ficțiune.') && exp.text.includes('nu a fost modificat'), 'episodul păstrează mențiunea de ficțiune și de text nemodificat');
  // export TXT
  const tx = await download(page, () => dlg.locator('#pcExpTxt').click());
  ok(/\.txt$/.test(tx.name) && tx.text.includes('SCENARIUL C') && !tx.text.includes('<') && tx.text.split('\n\n').length > 20, 'export TXT: text simplu, fără marcaje', tx.name);

  // „Deschide” din arbore
  await dlg.locator('.pc-br li').nth(0).locator('button').click();
  await page.waitForTimeout(300);
  ok(await dlg.count() === 0 && await page.evaluate(() => cIdx) === 3, '„Deschide” închide dialogul și duce la scenariul A');
  ok((await st(page)).pick === 'A', 'deschiderea scenariului A îl face traseul curent');

  // reîncărcare
  await page.reload(); await page.waitForFunction(() => window.__piCale);
  s = await st(page);
  ok(s.pick === 'A' && s.hist.length >= 3, 'după reîncărcare alegerile se păstrează', s);
  await page.evaluate(() => go(3)); await page.waitForTimeout(200);
  ok((await page.locator('#piCaleBar').innerText()).includes('SCENARIUL A'), 'după reîncărcare bara arată traseul salvat');
  ok((await axeRun(page, '#piCaleBar')).length === 0, 'axe-core pe bara „Calea ta”: 0 violări');

  // limbă engleză
  await page.evaluate(() => PIUI.set('en')); await page.waitForTimeout(500);
  await page.evaluate(() => go(4)); await page.waitForTimeout(300);
  const bar = await page.locator('#piCaleBar').innerText();
  ok(/Your path/.test(bar) && /Story tree|story tree/i.test(bar), 'interfață EN: bara tradusă', bar);
  const en = await download(page, () => page.evaluate(() => window.__piCale.exportEp('B', 'html')));
  const enOk = await page.evaluate(h => { const d = new DOMParser().parseFromString(h, 'text/html'); const t = document.createElement('template'); t.innerHTML = piH(P[4]); const first = [...t.content.querySelectorAll('p')].map(p => p.textContent.replace(/\s+/g, ' ').trim()).find(x => x.length > 60); return {lang: d.documentElement.lang, has: d.body.textContent.replace(/\s+/g, ' ').includes(first), en: PIUI.lang()}; }, en.text);
  ok(enOk.lang === 'en' && enOk.has && /Standalone episode/.test(en.text), 'export în engleză: lang=en, textul tradus al cărții, antet tradus', enOk);
  await page.evaluate(() => PIUI.set('ro')); await page.waitForTimeout(300);
  // ștergere
  await page.evaluate(() => window.__piCale.open());
  const d2 = page.locator('dialog[data-fff-dialog="pi-tree"]');
  await d2.locator('#pcDel').click();
  const conf = page.locator('dialog[data-fff-dialog="confirm"]');
  ok(await conf.isVisible(), 'ștergerea cere confirmare printr-un dialog propriu (nu confirm nativ)');
  await conf.locator('button.fff-primary').click(); await page.waitForTimeout(300);
  s = await st(page);
  ok(!s.pick && s.hist.length === 0 && await d2.locator('#pcExpHtml').isDisabled(), 'după ștergere: fără alegeri, export dezactivat', s);
  ok(await d2.locator('.pc-hist li').allInnerTexts().then(a => a.join() === 'Nicio alegere încă.'), 'istoricul afișează „Nicio alegere încă.”');
  await page.keyboard.press('Escape'); await page.waitForTimeout(200);
  ok(await page.locator('dialog[data-fff-dialog="pi-tree"]').count() === 0, 'Esc închide dialogul');
  ok(net.every(u => /^https:\/\/alexio\.tf\//.test(u)), 'nicio cerere de rețea în afara imaginilor existente (alexio.tf)', net.filter(u => !/^https:\/\/alexio\.tf\//.test(u)));
  ok(!errs.length, 'fără erori și fără încălcări CSP pe tot parcursul', errs);
  await ctx.close();
}
{
  const {ctx, page} = await mk({w: 360, h: 740});
  await page.evaluate(() => go(5)); await page.waitForTimeout(200);
  await page.click('#piCaleOpen');
  const w = await page.evaluate(() => { const d = document.querySelector('dialog[data-fff-dialog="pi-tree"]').getBoundingClientRect(); return {sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, dl: d.left, dr: d.right, vw: innerWidth}; });
  ok(w.sw <= w.cw + 1 && w.dl >= 0 && w.dr <= w.vw + 1, 'telefon 360px: dialogul încape, fără defilare orizontală', w);
  await page.keyboard.press('Escape');
  await ctx.close();
}
await browser.close();
console.log('\n' + pass + ' reușite, ' + fail + ' eșuate');
process.exit(fail ? 1 : 0);
