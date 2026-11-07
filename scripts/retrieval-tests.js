// 007知识库检索测试（Node零依赖）
// 用法：node scripts/retrieval-tests.js
// 覆盖：人物ID、别名（中英双语）、小说名称（中英）、章节编号、时间线（中英）、人物关系（双向/中英）、组织、地点、装备、事件、事实类型canon/inference、同名区分、双语字段完整性。
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const K = path.join(ROOT, 'knowledge');
const J = (rel) => JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
const chars = J('knowledge/characters/index.json').characters;
const orgs = J('knowledge/organizations/index.json').organizations;
const locs = J('knowledge/locations/index.json').locations;
const eqs = J('knowledge/equipment/index.json').equipment;
const eventsIdx = J('knowledge/events/index.json').events;
const aliasesDoc = J('knowledge/resolution/aliases.json');
const relsDoc = J('knowledge/resolution/relationships.json');
const timelineDoc = J('knowledge/resolution/timeline.json');
const core = J('knowledge/canon-rules/character-core.json');
const novels = {};
for (let i = 1; i <= 14; i++) novels[i] = J(`knowledge/novels/novel-${String(i).padStart(2, '0')}.json`);
const IDX = {
  characters: new Map(chars.map((e) => [e.id, e])),
  organizations: new Map(orgs.map((e) => [e.id, e])),
  locations: new Map(locs.map((e) => [e.id, e])),
  equipment: new Map(eqs.map((e) => [e.id, e])),
};
const norm = (s) => String(s).trim().toLowerCase();
const aliasByKind = {};
for (const e of aliasesDoc.aliases) {
  const m = (aliasByKind[e.kind] = aliasByKind[e.kind] || new Map());
  m.set(norm(e.alias), e);
  // 双语解析：alias_en与alias同等索引，指向同一条目（含歧义候选）
  if (e.alias_en) m.set(norm(e.alias_en), e);
}
function resolveId(id, kind) {
  if (IDX[kind] && IDX[kind].has(id)) return { id, via: 'id' };
  const e = aliasByKind[kind] && aliasByKind[kind].get(norm(id));
  if (!e) return null;
  if (e.ambiguous) return { candidates: e.candidates, via: 'alias-ambiguous' };
  return { id: e.canonical_id, via: 'alias' };
}
function findNovelByTitle(title) {
  return Object.values(novels).find((n) => n.title_zh === title || n.title_en.toLowerCase() === title.toLowerCase() || n.novel_id === norm(title));
}
function relationsOf(id) {
  return relsDoc.pairs.filter((p) => p.a === id || p.b === id)
    .map((p) => ({ with: p.a === id ? p.b : p.a, relations: p.relations }));
}
let pass = 0, fail = 0;
function test(name, fn) {
  let ok = false, detail = '';
  try { const r = fn(); ok = r.ok; detail = r.detail || ''; }
  catch (e) { ok = false; detail = '异常：' + e.message; }
  console.log(`[${ok ? 'PASS' : 'FAIL'}] ${name}${detail ? ' — ' + detail : ''}`);
  ok ? pass++ : fail++;
}
// 1. 人物ID
test('人物ID：bond解析为詹姆斯·邦德', () => {
  const r = resolveId('bond', 'characters');
  return { ok: r && r.id === 'bond' && IDX.characters.get('bond').name_en === 'James Bond', detail: `name_en=${IDX.characters.get('bond').name_en}` };
});
// 2. 别名
test('别名：leiter解析为felix-leiter', () => {
  const r = resolveId('leiter', 'characters');
  return { ok: r && r.id === 'felix-leiter' && r.via === 'alias', detail: `via=${r && r.via}` };
});
test('别名：sis解析为secret-service（组织）', () => {
  const r = resolveId('sis', 'organizations');
  return { ok: r && r.id === 'secret-service', detail: `via=${r && r.via}` };
});
// 3. 小说名称
test('小说名称：金刚钻对应novel-04，25章', () => {
  const n = findNovelByTitle('金刚钻');
  return { ok: n && n.novel_id === 'diamonds-are-forever' && n.chapters.length === 25, detail: `novel_id=${n && n.novel_id}，章节=${n && n.chapters.length}` };
});
// 4. 章节编号（罗马数字形态不换算）
test('章节编号：诺博士第VII章存在且标题为NIGHT PASSAGE', () => {
  const n = novels[6];
  const c = n.chapters.find((x) => String(x.no) === 'VII');
  return { ok: c && c.title === 'NIGHT PASSAGE', detail: `title=${c && c.title}` };
});
// 5. 时间线
test('时间线：勒·希弗第1部present、第2部起dead', () => {
  const c = core.characters.find((x) => x.id === 'le-chiffre');
  const s1 = c.knowledge_scope.find((x) => x.novel_no === 1).status;
  const s2 = c.knowledge_scope.find((x) => x.novel_no === 2).status;
  const t = timelineDoc.characters.find((x) => x.id === 'le-chiffre');
  return { ok: s1 === 'present' && s2 === 'dead' && t.death_novel_no === 2, detail: `scope1=${s1}，scope2=${s2}，death_novel_no=${t.death_novel_no}` };
});
// 6. 人物关系（双向）
test('人物关系：bond与felix-leiter双向可查且为盟友', () => {
  const a = relationsOf('bond').find((r) => r.with === 'felix-leiter');
  const b = relationsOf('felix-leiter').find((r) => r.with === 'bond');
  const types = new Set([...(a ? a.relations : []), ...(b ? b.relations : [])].map((r) => r.type));
  return { ok: !!a && !!b && types.has('盟友'), detail: `bond侧${a ? a.relations.length : 0}条，leiter侧${b ? b.relations.length : 0}条` };
});
// 7. 组织
test('组织：secret-service共14部出场', () => {
  const o = IDX.organizations.get('secret-service');
  return { ok: o && o.appearance_count === 14, detail: `appearance_count=${o && o.appearance_count}` };
});
// 8. 地点
test('地点：迈阿密为真实地点（fictional=false），出场2部', () => {
  const l = IDX.locations.get('miami');
  return { ok: l && l.fictional === false && l.appearance_count === 2, detail: `fictional=${l && l.fictional}，count=${l && l.appearance_count}` };
});
// 9. 装备
test('装备：beretta-25为点25贝雷塔，出场2部', () => {
  const e = IDX.equipment.get('beretta-25');
  return { ok: e && e.name_en.includes('Beretta') && e.appearance_count === 2, detail: `name_en=${e && e.name_en}` };
});
// 10. 事件
test('事件：thunderball:nuclear-blackmail存在且章节有效', () => {
  const e = eventsIdx.find((x) => x.id === 'thunderball:nuclear-blackmail');
  const n = novels[9];
  const ok = e && n.chapters.some((c) => String(c.no) === String(e.chapter));
  return { ok: !!ok, detail: `chapter=${e && e.chapter}` };
});
// 11. 事实类型canon/inference
test('事实类型：全库canon 762条、inference 11条', () => {
  let canon = 0, infer = 0;
  for (const n of Object.values(novels)) for (const f of n.facts) (f.canon_or_inference === 'canon' ? canon++ : infer++);
  return { ok: canon === 762 && infer === 11, detail: `canon=${canon}，inference=${infer}` };
});
// 12. 同名区分
test('同名区分：Molony返回双候选，james-molony单指爵士', () => {
  const a = resolveId('Molony', 'characters');
  const b = resolveId('james-molony', 'characters');
  const c = resolveId('sergeant-molony', 'characters');
  const ok = a && a.candidates && JSON.stringify([...a.candidates].sort()) === JSON.stringify(['molony', 'sergeant-molony'])
    && b && b.id === 'molony' && c && c.id === 'sergeant-molony';
  return { ok: !!ok, detail: `Molony候选=${a && a.candidates}，james-molony=${b && b.id}，sergeant-molony=${c && c.id}` };
});
// 13. 事实定位：source_novel+chapter+entity三键定位
test('事实定位：皇家赌场第19章le-chiffre对外自杀说法可定位', () => {
  const n = novels[1];
  const f = n.facts.find((x) => x.entity === 'le-chiffre' && String(x.chapter) === '19' && x.fact.includes('自杀'));
  return { ok: !!f && !!f.quote, detail: `quote=${f && f.quote.slice(0, 40)}…` };
});
// 14. 全书级事实
test('全书级事实：dr-no#59/#60 chapter为全书且quote留空', () => {
  const n = novels[6];
  const ok = n.facts[59].chapter === '全书' && n.facts[59].quote === null && n.facts[60].chapter === '全书' && n.facts[60].quote === null;
  return { ok, detail: `chapter=${n.facts[59].chapter}/${n.facts[60].chapter}` };
});
// 15. 人物ID查询（英文）：bond角色与出场标题英文
test('人物ID（英文）：bond角色英文含Major character，皇家赌场出场标题为Casino Royale', () => {
  const c = IDX.characters.get('bond');
  const app = c.appearances.find((a) => a.novel === 'casino-royale');
  return { ok: c.roles_en.includes('Major character') && app.title_en === 'Casino Royale' && app.role_en === 'Major character', detail: `roles_en=${c.roles_en.slice(0, 2)}，title_en=${app.title_en}` };
});
// 16. 英文别名查询
test('英文别名：Kerim Bey/The Wizard of Ice/NATO均解析到同一规范id', () => {
  const a = resolveId('Kerim Bey', 'characters');
  const b = resolveId('The Wizard of Ice', 'characters');
  const c = resolveId('NATO', 'organizations');
  return { ok: a && a.id === 'darko-kerim' && b && b.id === 'kronsteen' && c && c.id === 'nato', detail: `kerim=${a && a.id}，kronsteen=${b && b.id}，nato=${c && c.id}` };
});
// 17. 中文别名查询
test('中文别名：军械官/塔尼娅/花斑帮均解析到同一规范id', () => {
  const a = resolveId('军械官', 'characters');
  const b = resolveId('塔尼娅', 'characters');
  const c = resolveId('花斑帮', 'organizations');
  return { ok: a && a.id === 'boothroyd' && b && b.id === 'tatiana-romanov' && c && c.id === 'spangled-mob', detail: `军械官=${a && a.id}，塔尼娅=${b && b.id}，花斑帮=${c && c.id}` };
});
// 18. 歧义别名中英一致
test('歧义别名中英一致：Spang与spang brothers返回同一候选清单', () => {
  const a = resolveId('Spang', 'characters');
  const b = resolveId('spang brothers', 'characters');
  const want = JSON.stringify(['jack-spang', 'seraffimo-spang']);
  return { ok: a && JSON.stringify([...a.candidates].sort()) === want && b && JSON.stringify([...b.candidates].sort()) === want, detail: `Spang=${a && a.candidates}，spang brothers=${b && b.candidates}` };
});
// 19. 小说名称中英查询
test('小说名称（英文）：Casino Royale/From Russia with Love对应27/28章', () => {
  const a = findNovelByTitle('Casino Royale');
  const b = findNovelByTitle('From Russia with Love');
  return { ok: a && a.novel_id === 'casino-royale' && a.chapters.length === 27 && b && b.novel_id === 'from-russia-with-love' && b.chapters.length === 28, detail: `CR=${a && a.chapters.length}章，FRWL=${b && b.chapters.length}章` };
});
// 20. 章节编号查询（英文书名定位）
test('章节编号（英文书名）：Dr No第VII章为NIGHT PASSAGE，Goldfinger共23章', () => {
  const a = findNovelByTitle('Dr No');
  const c = a && a.chapters.find((x) => String(x.no) === 'VII');
  const g = findNovelByTitle('Goldfinger');
  return { ok: c && c.title === 'NIGHT PASSAGE' && g && g.chapters.length === 23, detail: `VII=${c && c.title}，Goldfinger=${g && g.chapters.length}章` };
});
// 21. 时间线查询（英文）
test('时间线（英文）：casino-royale标题为Casino Royale，bond截止为Octopussy and The Living Daylights (1966)', () => {
  const e = timelineDoc.entries.find((x) => x.novel === 'casino-royale');
  const b = timelineDoc.characters.find((x) => x.id === 'bond');
  const q = timelineDoc.characters.find((x) => x.id === 'q');
  return { ok: e && e.title_en === 'Casino Royale' && b && b.timeline_cutoff_en === 'Octopussy and The Living Daylights (1966)' && q && q.note_en, detail: `title_en=${e && e.title_en}，cutoff_en=${b && b.timeline_cutoff_en}` };
});
// 22. 人物关系双向查询（中英）
test('人物关系双向（中英）：bond与felix-leiter中英类型一致', () => {
  const a = relationsOf('bond').find((r) => r.with === 'felix-leiter');
  const b = relationsOf('felix-leiter').find((r) => r.with === 'bond');
  const zh = new Set([...(a ? a.relations : []), ...(b ? b.relations : [])].map((r) => r.type));
  const en = new Set([...(a ? a.relations : []), ...(b ? b.relations : [])].map((r) => r.type_en));
  return { ok: !!a && !!b && zh.has('盟友') && zh.has('挚友与战友') && en.has('Ally') && en.has('Best friend and comrade-in-arms'), detail: `zh=${[...zh]}，en=${[...en]}` };
});
// 23. 组织查询（英文）
test('组织（英文）：nato英文全称正确，出场role_en非空', () => {
  const o = IDX.organizations.get('nato');
  const ss = IDX.organizations.get('secret-service');
  return { ok: o && o.name_en === 'North Atlantic Treaty Organization' && o.appearances.every((a) => a.role_en) && ss.appearances.every((a) => a.role_en), detail: `name_en=${o && o.name_en}` };
});
// 24. 地点查询（英文）
test('地点（英文）：london/miami国家英文正确，有国家者均有country_en', () => {
  const l = IDX.locations.get('london');
  const m = IDX.locations.get('miami');
  const all = locs.filter((x) => x.country).every((x) => x.country_en) && locs.every((x) => x.appearances.every((a) => a.role_en));
  return { ok: l && l.country_en === 'United Kingdom' && m && m.country_en === 'United States' && all, detail: `london=${l && l.country_en}，miami=${m && m.country_en}` };
});
// 25. 装备查询（英文）
test('装备（英文）：walther-ppk类别为Weapon，注释英文提及Boothroyd', () => {
  const e = IDX.equipment.get('walther-ppk');
  const allKind = eqs.every((x) => x.kind_en);
  const allNote = eqs.every((x) => x.appearances.every((a) => a.note === null || a.note_en));
  return { ok: e && e.kind_en === 'Weapon' && e.appearances[0].note_en.includes('Boothroyd') && allKind && allNote, detail: `kind_en=${e && e.kind_en}` };
});
// 26. 事件查询（英文书名定位）
test('事件（英文书名）：Thunderball可定位thunderball:nuclear-blackmail事件章节', () => {
  const e = eventsIdx.find((x) => x.id === 'thunderball:nuclear-blackmail');
  const n = findNovelByTitle('Thunderball');
  const ok = e && n && n.novel_id === 'thunderball' && n.chapters.some((c) => String(c.no) === String(e.chapter));
  return { ok: !!ok, detail: `novel_id=${n && n.novel_id}，chapter=${e && e.chapter}` };
});
// 27. 事实类型canon/inference筛选（英文实体可查）
test('事实类型筛选（英文）：inference共11条，人物实体均有name_en', () => {
  let infer = 0, bad = 0;
  for (const n of Object.values(novels)) for (const f of n.facts) {
    if (f.canon_or_inference !== 'inference') continue;
    infer++;
    const c = IDX.characters.get(f.entity);
    if (c && !c.name_en) bad++;
  }
  return { ok: infer === 11 && bad === 0, detail: `inference=${infer}，缺name_en=${bad}` };
});
// 28. 双语字段完整性
test('双语完整性：角色/别名/关系/时间线英文均已补齐', () => {
  const charsOk = chars.every((c) => c.roles_en.length === c.roles.length && c.appearances.every((a) => a.role_en && a.title_en));
  const aliasOk = aliasesDoc.aliases.every((x) => x.alias_en);
  const relOk = relsDoc.pairs.every((p) => p.relations.every((r) => r.type_en));
  const tlOk = timelineDoc.entries.every((e) => e.title_en) && timelineDoc.characters.every((c) => c.name_en && c.timeline_cutoff_en);
  return { ok: charsOk && aliasOk && relOk && tlOk, detail: `chars=${charsOk}，alias=${aliasOk}，rels=${relOk}，timeline=${tlOk}` };
});
console.log(`\n检索测试：${pass}通过，${fail}失败，共${pass + fail}条`);
process.exit(fail ? 1 : 0);
