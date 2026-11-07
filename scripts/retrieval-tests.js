// 007知识库检索测试（Node零依赖）
// 用法：node scripts/retrieval-tests.js
// 覆盖：人物ID、别名、小说名称、章节编号、时间线、人物关系、组织、地点、装备、事件、事实类型canon/inference、同名区分。
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
for (const e of aliasesDoc.aliases) (aliasByKind[e.kind] = aliasByKind[e.kind] || new Map()).set(norm(e.alias), e);
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
console.log(`\n检索测试：${pass}通过，${fail}失败，共${pass + fail}条`);
process.exit(fail ? 1 : 0);
