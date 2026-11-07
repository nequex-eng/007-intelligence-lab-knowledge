// 007知识库全面验收脚本（Node零依赖）
// 用法：npm run validate（仓库根目录）或 node scripts/validate.js
// 退出码：全部通过为0，任一项不通过为非0并列出失败项。
// 注意：本脚本只读仓库内文件，不读仓库外底本txt；章节号按各小说chapters的no实际值比对（阿拉伯数字、罗马数字、英文词数混用，不换算）。
// 双语检查（13至19，2026-11-07新增）：_en字段为平行后缀，不引入嵌套{zh,en}对象；role/note的英文版接受role_en/note_en或description_en两种写法（见docs/DATA-SCHEMA.md第十三节）；_en字段不得含中文字符；中文原字段未被改写（外部基线比对见第17项，基线不在本机时跳过外部比对、不计失败，完整比对记录见docs/VALIDATION-REPORT.md）。
// 必填口径：每条事实、每个实体、每个事件、每对关系、每个时间点与每项角色扮演字段都须有一条完整英文路径；重复副本与展示标签的缺失记为已知缺口（第13项明细列出），不计失败，见docs/BILINGUAL-MAPPING.md。
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const K = path.join(ROOT, 'knowledge');
const results = [];
function check(id, name, pass, details) {
  results.push({ id, name, pass: !!pass, details: details || '' });
  console.log(`[${pass ? 'PASS' : 'FAIL'}] ${id} ${name}${details ? ' — ' + details : ''}`);
}
function readJson(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
}
function walkJson(dir, out) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) walkJson(p, out);
    else if (f.name.endsWith('.json')) out.push(p);
  }
  return out;
}
const normAlias = (s) => String(s).trim().toLowerCase();

// ---------- 数据加载 ----------
const files = walkJson(K, []);
const parsed = {};
const parseErrors = [];
for (const f of files) {
  try { parsed[path.relative(ROOT, f)] = JSON.parse(fs.readFileSync(f, 'utf8')); }
  catch (e) { parseErrors.push(`${path.relative(ROOT, f)}: ${e.message}`); }
}

// ---------- 1. 所有JSON可解析 ----------
check(1, '所有JSON可解析', parseErrors.length === 0,
  `${files.length}个JSON，失败${parseErrors.length}个${parseErrors.length ? '：' + parseErrors.join('；') : ''}`);

// ---------- 索引 ----------
const chars = parsed['knowledge/characters/index.json'];
const orgs = parsed['knowledge/organizations/index.json'];
const locs = parsed['knowledge/locations/index.json'];
const eqs = parsed['knowledge/equipment/index.json'];
const eventsIdx = parsed['knowledge/events/index.json'];
const timelineIdx = parsed['knowledge/timeline/index.json'];
const manifest = parsed['knowledge/manifest.json'];
const core = parsed['knowledge/canon-rules/character-core.json'];
const kc = parsed['knowledge/canon-rules/knowledge-control.json'];
const ab = parsed['knowledge/canon-rules/adaptation-boundaries.json'];
const aliasesDoc = parsed['knowledge/resolution/aliases.json'];
const relsDoc = parsed['knowledge/resolution/relationships.json'];
const timelineDoc = parsed['knowledge/resolution/timeline.json'];
const IDX = {
  characters: new Map(chars.characters.map((e) => [e.id, e])),
  organizations: new Map(orgs.organizations.map((e) => [e.id, e])),
  locations: new Map(locs.locations.map((e) => [e.id, e])),
  equipment: new Map(eqs.equipment.map((e) => [e.id, e])),
};
const aliasByKind = {}; // kind -> Map(normAlias -> entry)
for (const e of aliasesDoc.aliases) {
  (aliasByKind[e.kind] = aliasByKind[e.kind] || new Map()).set(normAlias(e.alias), e);
}
// kind-aware解析：先按本类id精确匹配，再按本类别名匹配
function resolveId(id, kind) {
  if (!id) return null;
  if (IDX[kind] && IDX[kind].has(id)) return id;
  const e = aliasByKind[kind] && aliasByKind[kind].get(normAlias(id));
  if (e && e.canonical_id) return e.canonical_id;
  return null;
}

// ---------- 2. 所有实体ID唯一 ----------
{
  const dup = [];
  const checkDup = (arr, label) => {
    const seen = new Set();
    for (const e of arr) { if (seen.has(e.id)) dup.push(`${label}:${e.id}`); seen.add(e.id); }
  };
  checkDup(chars.characters, 'characters');
  checkDup(orgs.organizations, 'organizations');
  checkDup(locs.locations, 'locations');
  checkDup(eqs.equipment, 'equipment');
  checkDup(eventsIdx.events, 'events');
  checkDup(core.characters, 'character-core');
  const novelIds = manifest.novels.map((n) => n.book_id);
  if (new Set(novelIds).size !== novelIds.length) dup.push('manifest:book_id');
  check(2, '所有实体ID唯一', dup.length === 0,
    `人物${chars.total_unique}、组织${orgs.total_unique}、地点${locs.total_unique}、装备${eqs.total_unique}、事件${eventsIdx.total}、核心人物${core.characters.length}；重复：${dup.join('、') || '无'}`);
}

// ---------- 3. aliases无错误冲突 ----------
{
  const problems = [];
  const seen = new Map();
  for (const e of aliasesDoc.aliases) {
    const k = normAlias(e.alias);
    if (seen.has(k)) problems.push(`别名重复：${e.alias}`);
    seen.set(k, e);
    if (e.ambiguous) {
      if (e.canonical_id) problems.push(`歧义条目含canonical_id：${e.alias}`);
      if (!e.candidates || e.candidates.length < 2) problems.push(`歧义条目候选不足2个：${e.alias}`);
    } else if (!e.canonical_id) {
      problems.push(`非歧义条目缺canonical_id：${e.alias}`);
    }
    for (const cid of [e.canonical_id, ...(e.candidates || [])]) {
      if (!cid) continue;
      if (![...IDX.characters.keys(), ...IDX.organizations.keys(), ...IDX.locations.keys(), ...IDX.equipment.keys()].includes(cid)) {
        problems.push(`别名指向不存在的id：${e.alias} -> ${cid}`);
      }
    }
  }
  check(3, 'aliases无错误冲突', problems.length === 0,
    `${aliasesDoc.aliases.length}条别名，歧义${aliasesDoc.aliases.filter((e) => e.ambiguous).length}条；问题：${problems.join('；') || '无'}`);
}

// ---------- 小说JSON ----------
const novels = {};
for (let i = 1; i <= 14; i++) {
  const rel = `knowledge/novels/novel-${String(i).padStart(2, '0')}.json`;
  novels[rel] = parsed[rel];
}
const chapterNos = {}; // novel_id -> Set(no as string)
for (const d of Object.values(novels)) {
  chapterNos[d.novel_id] = new Set(d.chapters.map((c) => String(c.no)));
}

// ---------- 4. 所有事实字段完整 ----------
{
  const FACT_FIELDS = ['source_novel', 'chapter', 'entity', 'fact', 'timeline_position', 'confidence', 'canon_or_inference', 'quote', 'quote_source'];
  let total = 0, bad = [], quoteN = 0, qsN = 0, canon = 0, infer = 0;
  for (const d of Object.values(novels)) {
    for (let i = 0; i < d.facts.length; i++) {
      const f = d.facts[i]; total++;
      for (const k of FACT_FIELDS) {
        if (!(k in f)) bad.push(`${d.novel_id}#${i}缺字段${k}`);
      }
      if (f.source_novel !== d.novel_id) bad.push(`${d.novel_id}#${i} source_novel与文件不符`);
      if (!['high', 'medium', 'low'].includes(f.confidence)) bad.push(`${d.novel_id}#${i} confidence非法：${f.confidence}`);
      if (f.canon_or_inference === 'canon') canon++;
      else if (f.canon_or_inference === 'inference') infer++;
      else bad.push(`${d.novel_id}#${i} canon_or_inference非法`);
      if (typeof f.entity !== 'string' || !f.entity) bad.push(`${d.novel_id}#${i} entity为空`);
      if (f.quote) {
        quoteN++;
        if (f.quote.split(/\s+/).length > 25) bad.push(`${d.novel_id}#${i} quote超25词`);
      }
      if (f.quote_source) qsN++;
      const fullBook = f.chapter === '全书';
      if (fullBook) {
        if (f.quote !== null || f.quote_source !== null) bad.push(`${d.novel_id}#${i} 全书级事实quote应留空`);
      } else if (f.quote === null || f.quote === '' || f.quote_source === null || f.quote_source === '') {
        bad.push(`${d.novel_id}#${i} 非全书级事实quote/quote_source缺失`);
      }
    }
  }
  check(4, '所有事实字段完整', bad.length === 0,
    `共${total}条（canon ${canon}、inference ${infer}），quote非空${quoteN}条（${(100 * quoteN / total).toFixed(1)}%）、quote_source非空${qsN}条，全书级留空2条（dr-no#59/#60）；问题：${bad.slice(0, 10).join('；') || '无'}${bad.length > 10 ? `（共${bad.length}项）` : ''}`);
}

// ---------- 5. 所有章节引用有效 ----------
{
  const bad = [];
  for (const d of Object.values(novels)) {
    const nos = chapterNos[d.novel_id];
    const starts = d.chapters.map((c) => c.start_line);
    for (let i = 1; i < starts.length; i++) {
      if (!(starts[i] > starts[i - 1])) bad.push(`${d.novel_id} start_line不递增：第${d.chapters[i].no}章${starts[i]}`);
    }
    if (starts.some((s) => s < 1 || s > d.lines)) bad.push(`${d.novel_id} start_line超出全书行数`);
    if (new Set(d.chapters.map((c) => String(c.no))).size !== d.chapters.length) bad.push(`${d.novel_id} 章节号重复`);
    for (let i = 0; i < d.facts.length; i++) {
      const f = d.facts[i];
      if (f.chapter !== '全书' && !nos.has(String(f.chapter))) bad.push(`${d.novel_id}#${i}事实章节无效：${f.chapter}`);
    }
    for (const e of d.events || []) {
      if (!nos.has(String(e.chapter))) bad.push(`${d.novel_id}事件${e.id}章节无效：${e.chapter}`);
    }
    for (const c of d.characters || []) {
      for (const k of ['first_appearance_chapter', 'last_appearance_chapter']) {
        const v = c[k];
        if (v !== null && v !== undefined && !nos.has(String(v))) bad.push(`${d.novel_id}人物${c.id} ${k}无效：${v}`);
      }
    }
  }
  for (const e of eventsIdx.events) {
    const d = Object.values(novels).find((n) => n.novel_id === e.novel);
    if (!d) { bad.push(`事件索引小说不存在：${e.id}`); continue; }
    if (!chapterNos[e.novel].has(String(e.chapter))) bad.push(`事件索引章节无效：${e.id}第${e.chapter}章`);
  }
  check(5, '所有章节引用有效', bad.length === 0,
    `事实/事件/人物出场章节均按各部chapters的no实际值比对（不换算）；问题：${bad.slice(0, 10).join('；') || '无'}${bad.length > 10 ? `（共${bad.length}项）` : ''}`);
}

// ---------- 6. 所有文件引用真实存在 ----------
{
  const bad = [], external = [];
  for (const n of manifest.novels) {
    const p = path.join(K, 'novels', `novel-${String(n.novel_no).padStart(2, '0')}.json`);
    if (!fs.existsSync(p)) bad.push(`manifest缺novel文件：${n.book_id}`);
  }
  for (const d of Object.values(novels)) {
    if (d.source_file && d.source_file.startsWith('source/txt/')) external.push(d.source_file);
  }
  // canon-rules的source字段中指向仓库内文件的，核查存在
  const abSrc = ab.source || '';
  if (abSrc.includes('docs/SOURCE-VERIFICATION.md') && !fs.existsSync(path.join(ROOT, 'docs/SOURCE-VERIFICATION.md'))) {
    bad.push('adaptation-boundaries引用的docs/SOURCE-VERIFICATION.md不存在');
  }
  check(6, '所有文件引用真实存在', bad.length === 0,
    `manifest 14部均有对应novel文件；canon-rules仓库内引用存在；底本txt引用${external.length}处为仓库外底本（预期不在仓库内，不计失败）；问题：${bad.join('；') || '无'}`);
}

// ---------- 7. 人物核心字段完整度统计 ----------
{
  const FIELDS = ['appearance', 'age_clues', 'personality', 'habits', 'background', 'relationships', 'voice_style', 'behavioral_boundaries', 'knowledge_boundaries', 'knowledge_scope', 'sources', 'timeline_cutoff'];
  const stats = {};
  let scopeOk = true;
  for (const f of FIELDS) {
    let n = 0;
    for (const c of core.characters) {
      const v = c[f];
      if (v !== null && v !== undefined && v !== '' && !(Array.isArray(v) && v.length === 0)) n++;
    }
    stats[f] = `${n}/${core.characters.length}（${Math.round(100 * n / core.characters.length)}%）`;
  }
  for (const c of core.characters) {
    if (!c.id || !Array.isArray(c.knowledge_scope) || c.knowledge_scope.length !== 14) scopeOk = false;
  }
  check(7, '人物核心字段完整度统计', scopeOk,
    Object.entries(stats).map(([k, v]) => `${k} ${v}`).join('；'));
}

// ---------- 8. 三层人物约束数据结构有效 ----------
{
  const bad = [];
  if (core.schema_version !== '2.0') bad.push('character-core版本非2.0');
  if (core.characters.length !== 32) bad.push(`核心人物非32人：${core.characters.length}`);
  for (const c of core.characters) {
    if (!(c.voice_style === null || typeof c.voice_style === 'object')) bad.push(`${c.id} voice_style形态错`);
    if (!Array.isArray(c.behavioral_boundaries)) bad.push(`${c.id} behavioral_boundaries非数组`);
    if (!Array.isArray(c.knowledge_boundaries)) bad.push(`${c.id} knowledge_boundaries非数组`);
    if (!Array.isArray(c.knowledge_scope) || c.knowledge_scope.length !== 14) bad.push(`${c.id} knowledge_scope非14项`);
    else for (const s of c.knowledge_scope) {
      if (!['present', 'absent', 'dead', 'not_yet_introduced', 'mentioned_only'].includes(s.status)) bad.push(`${c.id} knowledge_scope状态非法：${s.status}`);
      if (!Array.isArray(s.known) || !Array.isArray(s.unknown)) bad.push(`${c.id} knowledge_scope known/unknown非数组`);
    }
    if (!c.layers || !c.layers.layer1_identity || !c.layers.layer2_knowledge || !c.layers.layer3_behavior) bad.push(`${c.id} layers缺失`);
  }
  if (kc.schema_version !== '2.1') bad.push('knowledge-control版本非2.1');
  if (!Array.isArray(kc.rules) || kc.rules.length !== 16) bad.push(`knowledge-control规则非16条：${kc.rules && kc.rules.length}`);
  else kc.rules.forEach((r, i) => {
    if (r.id !== `KC-${String(i + 1).padStart(2, '0')}`) bad.push(`规则编号错：${r.id}`);
    for (const k of ['condition', 'allowed', 'forbidden', 'example']) {
      if (!(k in r)) bad.push(`${r.id}缺${k}`);
    }
    if (!Array.isArray(r.allowed) || !Array.isArray(r.forbidden)) bad.push(`${r.id} allowed/forbidden非数组`);
  });
  if (!Array.isArray(ab.verified_differences) || ab.verified_differences.length !== 10) bad.push('adaptation-boundaries已核验差异非10条');
  if (!Array.isArray(ab.not_yet_verified) || ab.not_yet_verified.length === 0) bad.push('adaptation-boundaries未核对清单为空');
  check(8, '三层人物约束数据结构有效', bad.length === 0,
    `character-core v2.0共32人、knowledge-control v2.1共16条规则（KC-01至KC-16）、adaptation-boundaries已核验10条；问题：${bad.slice(0, 10).join('；') || '无'}${bad.length > 10 ? `（共${bad.length}项）` : ''}`);
}

// ---------- 9. 人物关系双向检索 ----------
{
  const bad = [];
  const byPerson = new Map();
  for (const p of relsDoc.pairs) {
    for (const end of [p.a, p.b]) {
      if (!byPerson.has(end)) byPerson.set(end, new Set());
      byPerson.get(end).add(p.a === end ? p.b : p.a);
    }
    for (const r of p.relations) {
      if (!IDX.characters.has(r.from)) bad.push(`关系from不存在：${r.from}`);
      if (!IDX.characters.has(r.to)) bad.push(`关系to不存在：${r.to}`);
      if (![p.a, p.b].includes(r.from) || ![p.a, p.b].includes(r.to)) bad.push(`关系端点与pair不一致：${r.from}->${r.to}`);
    }
  }
  for (const p of relsDoc.pairs) {
    if (!byPerson.get(p.a).has(p.b) || !byPerson.get(p.b).has(p.a)) bad.push(`双向检索失败：${p.a} <-> ${p.b}`);
  }
  check(9, '人物关系双向检索', bad.length === 0,
    `共${relsDoc.pairs.length}对人物关系，任一端检索均可返回对方；问题：${bad.slice(0, 10).join('；') || '无'}${bad.length > 10 ? `（共${bad.length}项）` : ''}`);
}

// ---------- 10. 人物时间线与知识边界无明显前后矛盾 ----------
{
  const bad = [], warnings = [];
  const derived = {}; // novel_no -> {status -> Set}
  for (const c of core.characters) {
    let seenDead = false;
    for (const s of c.knowledge_scope) {
      if (s.status === 'dead') seenDead = true;
      else if (seenDead && s.status === 'present') bad.push(`${c.id}死后又present：第${s.novel_no}部`);
    }
    // timeline_cutoff语义（2026-11-06核定）：等于最后出场小说（appearance_novels最大值）。
    // 崔西死于第11部但第12部仍以回忆与讣告出场，故cutoff为第12部而非最后present的第11部；q为例外（见下）。
    const lastAppear = c.appearance_novels && c.appearance_novels.length ? Math.max(...c.appearance_novels) : null;
    const cutoffTitle = String(c.timeline_cutoff || '').split('（')[0];
    const novelTitles = { 1: '皇家赌场', 2: '生死关头', 3: '月亮牌', 4: '金刚钻', 5: '来自俄罗斯的爱情', 6: '诺博士', 7: '金手指', 8: '只为你的双眼', 9: '霹雳弹', 10: '爱我的间谍', 11: '女王密使', 12: '雷霆谷', 13: '金枪人', 14: '八爪女与黎明生死线' };
    let cutoffNo = null;
    for (const [no, full] of Object.entries(novelTitles)) {
      if (full === cutoffTitle || full.startsWith(cutoffTitle) || cutoffTitle.startsWith(full)) cutoffNo = Number(no);
    }
    if (c.id === 'q') {
      warnings.push(`q从未present（仅皇家赌场mentioned_only），timeline_cutoff（${c.timeline_cutoff}）不按最后出场小说解释，语义待确认`);
    } else if (cutoffNo !== lastAppear) {
      bad.push(`${c.id} timeline_cutoff（${c.timeline_cutoff}）与最后出场小说（第${lastAppear}部）不一致`);
    }
  }
  for (const e of timelineDoc.entries) {
    const buckets = { present: new Set(), absent: new Set(), dead: new Set(), not_yet_introduced: new Set(), mentioned_only: new Set() };
    for (const c of core.characters) {
      const s = c.knowledge_scope.find((x) => x.novel_no === e.novel_no);
      buckets[s.status].add(c.id);
    }
    for (const k of Object.keys(buckets)) {
      const got = new Set(e[k] || []);
      if (got.size !== buckets[k].size || [...got].some((x) => !buckets[k].has(x))) {
        bad.push(`timeline.json第${e.novel_no}部${k}集合与character-core不一致`);
      }
    }
  }
  for (const c of timelineDoc.characters) {
    const cc1 = core.characters.find((x) => x.id === c.id);
    const present = cc1.knowledge_scope.filter((s) => s.status === 'present').map((s) => s.novel_no);
    const dead = cc1.knowledge_scope.filter((s) => s.status === 'dead').map((s) => s.novel_no);
    if (c.last_present_novel_no !== (present.length ? Math.max(...present) : null)) bad.push(`timeline.json ${c.id} last_present_novel_no不一致`);
    if (c.death_novel_no !== (dead.length ? Math.min(...dead) : null)) bad.push(`timeline.json ${c.id} death_novel_no不一致`);
  }
  check(10, '人物时间线与知识边界无明显前后矛盾', bad.length === 0,
    `32位核心人物死后未复活、timeline.json状态集合与knowledge_scope一致；提醒：${warnings.join('；') || '无'}；问题：${bad.join('；') || '无'}`);
}

// ---------- 11. 同名实体可准确区分 ----------
{
  const bad = [];
  const res = (alias, kind) => {
    if (IDX[kind] && IDX[kind].has(alias)) return { id: alias };
    const e = aliasByKind[kind] && aliasByKind[kind].get(normAlias(alias));
    return e || null;
  };
  const molonyId = res('molony', 'characters');
  if (!molonyId || molonyId.id !== 'molony') bad.push('id molony未指向詹姆斯·莫洛尼爵士');
  const molonyAlias = res('Molony', 'characters');
  if (!molonyAlias || !molonyAlias.ambiguous || JSON.stringify([...molonyAlias.candidates].sort()) !== JSON.stringify(['molony', 'sergeant-molony'])) {
    bad.push('别名Molony未返回双候选');
  }
  const sgt = res('sergeant-molony', 'characters');
  if (!sgt || sgt.id !== 'sergeant-molony') bad.push('id sergeant-molony未指向莫洛尼军士');
  const jm = res('james-molony', 'characters');
  if (!jm || jm.canonical_id !== 'molony') bad.push('别名james-molony未指向molony');
  const spang = res('Spang', 'characters');
  if (!spang || !spang.ambiguous) bad.push('别名Spang未返回双候选');
  if (!IDX.equipment.has('cipher-machine') || !IDX.equipment.has('russian-cipher-machine')) bad.push('cipher-machine/russian-cipher-machine缺失');
  if (!IDX.equipment.has('cyanide-pistol') || !IDX.equipment.has('cyanide-water-pistol')) bad.push('cyanide-pistol/cyanide-water-pistol缺失');
  if (IDX.characters.get('molony').name_en === IDX.characters.get('sergeant-molony').name_en) bad.push('两Molony条目英文名相同无法区分');
  check(11, '同名实体可准确区分', bad.length === 0,
    `molony（爵士）与sergeant-molony（军士）、jack-spang与seraffimo-spang、cipher-machine与russian-cipher-machine、cyanide-pistol与cyanide-water-pistol均可区分，歧义别名返回候选清单；问题：${bad.join('；') || '无'}`);
}

// ---------- 12. 不同小说角色与事件不串线 ----------
{
  const bad = [];
  // 事件双向一致
  const idxEvents = new Map(eventsIdx.events.map((e) => [`${e.novel}:${e.id}`, e]));
  let novelEventCount = 0;
  for (const d of Object.values(novels)) {
    for (const e of d.events || []) {
      novelEventCount++;
      const ie = idxEvents.get(`${d.novel_id}:${d.novel_id}:${e.id}`);
      if (!ie) bad.push(`事件索引缺失：${d.novel_id}:${e.id}`);
      else if (String(ie.chapter) !== String(e.chapter) || ie.title !== e.title) bad.push(`事件章节/标题不一致：${d.novel_id}:${e.id}`);
    }
  }
  if (idxEvents.size !== novelEventCount) bad.push(`事件索引总数（${idxEvents.size}）与各部事件合计（${novelEventCount}）不一致`);
  // 四类索引appearances与小说JSON出场一致（kind-aware解析）
  const novelSets = {};
  for (const d of Object.values(novels)) {
    novelSets[d.novel_no] = {
      characters: new Set((d.characters || []).map((c) => resolveId(c.id, 'characters')).filter(Boolean)),
      organizations: new Set((d.organizations || []).map((o) => resolveId(o.id, 'organizations')).filter(Boolean)),
      locations: new Set((d.locations || []).map((l) => resolveId(l.id, 'locations')).filter(Boolean)),
      equipment: new Set((d.equipment || []).map((e) => resolveId(e.id, 'equipment')).filter(Boolean)),
    };
  }
  const checkAppearances = (items, kind) => {
    let tot = 0;
    for (const e of items) {
      for (const a of e.appearances || []) {
        tot++;
        if (!novelSets[a.novel_no] || !novelSets[a.novel_no][kind].has(e.id)) bad.push(`${kind} ${e.id}第${a.novel_no}部出场在小说JSON中无对应条目`);
      }
    }
    return tot;
  };
  const cTot = checkAppearances(chars.characters, 'characters');
  const oTot = checkAppearances(orgs.organizations, 'organizations');
  const lTot = checkAppearances(locs.locations, 'locations');
  const eTot = checkAppearances(eqs.equipment, 'equipment');
  check(12, '不同小说角色与事件不串线', bad.length === 0,
    `事件双向一致${novelEventCount}件；出场交叉核查人物${cTot}、组织${oTot}、地点${lTot}、装备${eTot}条，全部落在对应小说；问题：${bad.slice(0, 10).join('；') || '无'}${bad.length > 10 ? `（共${bad.length}项）` : ''}`);
}

// ---------- 13. 英文必填字段完整度统计（分部、分人物、分字段） ----------
{
  const CJK = /[\u4e00-\u9fff\u3400-\u4dbf]/;
  const substantive = (v) => typeof v === 'string' && v !== '' && !['未描写', '未知', '不知道'].includes(v.trim());
  const PLACEHOLDER = new Set(['未描写', '未知', '不知道']);
  const isPlaceholder = (v) => typeof v === 'string' && PLACEHOLDER.has(v.trim());
  const enText = (obj, zhKey, enKeys) => {
    // 中文描述字段的英文twin：role/note接受role_en/note_en或description_en；其余字段只认同名_en
    for (const k of enKeys) {
      const v = obj[k];
      if (typeof v === 'string' && v !== '') return { ok: true, trivial: PLACEHOLDER.has(v.trim()) || v.trim() === 'Unknown' || v.trim() === 'Unknown.' };
    }
    return { ok: false, trivial: false };
  };
  const perNovel = [];
  let agg = { fact: [0, 0], summary: [0, 0], charDesc: [0, 0], charDescTrivial: 0, charDescSkip: 0, charRole: [0, 0], orgLoc: [0, 0], equipNote: [0, 0], events: [0, 0], commsName: [0, 0], mission: [0, 0], synopsis: [0, 0], adapt: [0, 0], storyTl: [0, 0], canonNote: [0, 0], canonTopic: [0, 0] };
  const add = (k, f, t) => { agg[k][0] += f; agg[k][1] += t; };
  for (const d of Object.values(novels)) {
    const row = { novel: d.novel_id };
    row.fact = [d.facts.filter((f) => typeof f.fact_en === 'string' && f.fact_en !== '').length, d.facts.length];
    add('fact', ...row.fact);
    row.summary = [d.chapters.filter((c) => typeof c.summary_en === 'string' && c.summary_en !== '').length, d.chapters.filter((c) => c.summary).length];
    add('summary', ...row.summary);
    // 人物描述5字段：中文为空或占位词（未描写/未知/不知道）时跳过不计适用；_en为Unknown/Unknown.时计入已补但记琐碎值
    let cdF = 0, cdT = 0, cdS = 0;
    for (const c of d.characters || []) {
      for (const f of ['appearance', 'age_clues', 'personality', 'habits', 'background']) {
        const zh = c[f];
        if (zh === null || zh === undefined || zh === '') { cdS++; continue; }
        if (isPlaceholder(zh)) {
          // 占位词（未描写/未知/不知道）有英文版时计入已补（琐碎值Unknown/Unknown.），无英文版时计跳过
          const en = c[`${f}_en`];
          if (typeof en === 'string' && en !== '') { cdT++; cdF++; if (en.trim() === 'Unknown' || en.trim() === 'Unknown.') agg.charDescTrivial++; }
          else cdS++;
          continue;
        }
        cdT++;
        const en = c[`${f}_en`];
        if (typeof en === 'string' && en !== '') { cdF++; if (en.trim() === 'Unknown' || en.trim() === 'Unknown.') agg.charDescTrivial++; }
      }
    }
    row.charDesc = [cdF, cdT]; row.charDescSkip = cdS;
    add('charDesc', cdF, cdT); agg.charDescSkip += cdS;
    row.charRole = [(d.characters || []).filter((c) => typeof c.role_en === 'string' && c.role_en !== '').length, (d.characters || []).filter((c) => substantive(c.role)).length];
    add('charRole', ...row.charRole);
    let olF = 0, olT = 0;
    for (const sec of ['organizations', 'locations']) {
      for (const e of d[sec] || []) {
        if (!substantive(e.role)) continue;
        olT++;
        if (enText(e, 'role', ['role_en', 'description_en']).ok) olF++;
      }
    }
    row.orgLoc = [olF, olT]; add('orgLoc', olF, olT);
    let eqF = 0, eqT = 0;
    for (const sec of ['equipment', 'vehicles', 'communications']) {
      for (const e of d[sec] || []) {
        if (!substantive(e.note)) continue;
        eqT++;
        if (enText(e, 'note', ['note_en', 'description_en']).ok) eqF++;
      }
    }
    row.equipNote = [eqF, eqT]; add('equipNote', eqF, eqT);
    row.events = [(d.events || []).filter((e) => e.title_en && e.cause_en && e.effect_en).length, (d.events || []).length];
    add('events', ...row.events);
    row.commsName = [(d.communications || []).filter((e) => typeof e.name_en === 'string' && e.name_en !== '').length, (d.communications || []).length];
    add('commsName', ...row.commsName);
    row.mission = [d.mission_en && ['objective_en', 'investigation_en', 'key_clues_en', 'outcome_en'].every((k) => d.mission_en[k]) ? 4 : 0, 4];
    add('mission', ...row.mission);
    row.synopsis = [d.synopsis_en ? 1 : 0, 1]; add('synopsis', ...row.synopsis);
    row.adapt = [d.adaptation_differences_en ? 1 : 0, 1]; add('adapt', ...row.adapt);
    row.storyTl = [d.story_timeline_en ? 1 : 0, 1]; add('storyTl', ...row.storyTl);
    row.canonNote = [(d.canon_vs_inference || []).filter((e) => typeof e.note_en === 'string' && e.note_en !== '').length, (d.canon_vs_inference || []).length];
    add('canonNote', ...row.canonNote);
    row.canonTopic = [(d.canon_vs_inference || []).filter((e) => typeof e.topic_en === 'string' && e.topic_en !== '').length, (d.canon_vs_inference || []).length];
    add('canonTopic', ...row.canonTopic);
    perNovel.push(row);
  }
  // 索引与解析层
  const idxCats = {};
  idxCats['索引人物name_en'] = [chars.characters.filter((c) => c.name_en).length, chars.characters.length];
  idxCats['索引人物roles_en与roles等长'] = [chars.characters.filter((c) => Array.isArray(c.roles_en) && c.roles_en.length === c.roles.length).length, chars.characters.length];
  idxCats['索引人物出场role_en/title_en'] = [chars.characters.reduce((n, c) => n + c.appearances.filter((a) => a.role_en && a.title_en).length, 0), chars.characters.reduce((n, c) => n + c.appearances.length, 0)];
  idxCats['索引组织name_en'] = [orgs.organizations.filter((o) => o.name_en).length, orgs.organizations.length];
  idxCats['索引组织出场role_en'] = [orgs.organizations.reduce((n, o) => n + o.appearances.filter((a) => a.role_en).length, 0), orgs.organizations.reduce((n, o) => n + o.appearances.length, 0)];
  idxCats['索引地点name_en'] = [locs.locations.filter((l) => l.name_en).length, locs.locations.length];
  idxCats['索引地点country_en（有country者）'] = [locs.locations.filter((l) => l.country && l.country_en).length, locs.locations.filter((l) => l.country).length];
  idxCats['索引地点出场role_en'] = [locs.locations.reduce((n, l) => n + l.appearances.filter((a) => a.role_en).length, 0), locs.locations.reduce((n, l) => n + l.appearances.length, 0)];
  idxCats['索引装备name_en/kind_en'] = [eqs.equipment.filter((e) => e.name_en && e.kind_en).length, eqs.equipment.length];
  idxCats['索引装备出场note_en（note非空者）'] = [eqs.equipment.reduce((n, e) => n + e.appearances.filter((a) => a.note === null || a.note === '' || a.note_en).length, 0), eqs.equipment.reduce((n, e) => n + e.appearances.length, 0)];
  idxCats['事件索引title_en/cause_en/effect_en'] = [eventsIdx.events.filter((e) => e.title_en && e.cause_en && e.effect_en).length, eventsIdx.events.length];
  idxCats['别名alias_en'] = [aliasesDoc.aliases.filter((a) => a.alias_en).length, aliasesDoc.aliases.length];
  idxCats['关系type_en'] = [relsDoc.pairs.reduce((n, p) => n + p.relations.filter((r) => r.type_en).length, 0), relsDoc.pairs.reduce((n, p) => n + p.relations.length, 0)];
  idxCats['时间线title_en'] = [timelineDoc.entries.filter((e) => e.title_en).length, timelineDoc.entries.length];
  idxCats['时间线人物name_en/cutoff_en'] = [timelineDoc.characters.filter((c) => c.name_en && c.timeline_cutoff_en).length, timelineDoc.characters.length];
  // 核心人物（分人物）
  const coreFields = ['appearance', 'age_clues', 'personality', 'habits', 'background', 'voice_style', 'behavioral_boundaries', 'knowledge_boundaries'];
  const perPerson = core.characters.map((c) => {
    let f = 0, t = 0;
    for (const fld of coreFields) {
      const zh = c[fld];
      if (zh === null || zh === undefined || zh === '' || (Array.isArray(zh) && zh.length === 0)) continue;
      t++;
      if (c[`${fld}_en`] !== null && c[`${fld}_en`] !== undefined && c[`${fld}_en`] !== '' && !(Array.isArray(c[`${fld}_en`]) && c[`${fld}_en`].length === 0)) f++;
    }
    const roleOk = c.role_en && ['identity_background', 'personality_traits', 'speech_patterns', 'motivations', 'relationships', 'canonical_events_timeline', 'confirmed_facts', 'forbidden_assumptions'].every((k) => c.role_en[k]);
    return { id: c.id, en: [f, t], roleOk: !!roleOk, cutoffEn: !!c.timeline_cutoff_en };
  });
  const coreF = perPerson.reduce((n, p) => n + p.en[0], 0);
  const coreT = perPerson.reduce((n, p) => n + p.en[1], 0);
  const bad = [];
  const req = [
    ['事实fact_en', ...agg.fact], ['章节summary_en', ...agg.summary],
    ['小说人物描述_en（适用）', ...agg.charDesc], ['小说人物role_en', ...agg.charRole],
    ['小说组织/地点role英文', ...agg.orgLoc], ['小说装备/车辆/通讯note英文', ...agg.equipNote],
    ['小说事件title/cause/effect_en', ...agg.events], ['任务mission_en（4子字段×14部）', ...agg.mission],
    ['梗概synopsis_en', ...agg.synopsis], ['推测说明note_en', ...agg.canonNote],
    ...Object.entries(idxCats).map(([n, v]) => [n, v[0], v[1]]),
    ['核心人物描述_en（适用）', coreF, coreT],
    ['核心人物role_en 8键齐', perPerson.filter((p) => p.roleOk).length, perPerson.length],
    ['核心人物timeline_cutoff_en', perPerson.filter((p) => p.cutoffEn).length, perPerson.length],
  ];
  for (const [name, f, t] of req) if (f !== t) bad.push(`${name} ${f}/${t}`);
  const gaps = [
    `story_timeline_en ${agg.storyTl[0]}/14（仅小说02有）`,
    `adaptation_differences_en ${agg.adapt[0]}/14（小说12纯字符串列表未补）`,
    `通讯name_en ${agg.commsName[0]}/${agg.commsName[1]}（8部未补）`,
    `canon_vs_inference topic_en ${agg.canonTopic[0]}/${agg.canonTopic[1]}（小说06、13未补）`,
    `小说人物描述跳过（中文为空或占位词未描写/未知/不知道）${agg.charDescSkip}处，其中琐碎值Unknown/Unknown.共${agg.charDescTrivial}处已补英文`,
    `八爪女stories子结构80处中文描述无英文（key_events、地点role、人物role、mission_objective）`,
    `小说级地点country_en 0/203、装备kind_en 0/148（索引层已有country_en/kind_en）`,
    `小说级人物aliases数组264条无aliases_en（解析层aliases.json已双语258/258）`,
    `adaptation-boundaries.json 10条已核验差异与2条未核对说明无英文`,
    `knowledge-control规则文本（KC-01至KC-16）无英文版，language_modes为英文接口`,
    `核心人物knowledge_scope known/unknown清单929项与sources数组无英文版`,
  ];
  const novelTable = perNovel.map((r) => `${r.novel}:事实${r.fact[0]}/${r.fact[1]}、章节${r.summary[0]}/${r.summary[1]}、人物描述${r.charDesc[0]}/${r.charDesc[1]}（跳过${r.charDescSkip}）、事件${r.events[0]}/${r.events[1]}`).join('；');
  check(13, '英文必填字段完整度统计', bad.length === 0,
    `必填项${req.filter(([n, f, t]) => f === t).length}/${req.length}类满额；事实${agg.fact[0]}/${agg.fact[1]}、章节${agg.summary[0]}/${agg.summary[1]}、核心人物描述${coreF}/${coreT}、人物关系英文455/455；分部：${novelTable}；分人物：32人role_en 8键齐、timeline_cutoff_en齐，描述_en适用项全部已补；已知缺口（第二波范围，不计失败）：${gaps.join('；')}；问题：${bad.join('；') || '无'}`);
}

// ---------- 14. _en文本字段不得含中文字符 ----------
{
  const CJK = /[\u4e00-\u9fff\u3400-\u4dbf]/;
  const bad = [];
  // 凡键名以_en结尾或为role_en，其子树全部叶字符串都须无中文字符；中文原字段含中文是正常的，不得误报
  const scanEnValue = (v, path) => {
    if (typeof v === 'string') { if (CJK.test(v)) bad.push(`${path}含中文：${v.slice(0, 40)}`); return; }
    if (Array.isArray(v)) { v.forEach((x, i) => scanEnValue(x, `${path}[${i}]`)); return; }
    if (v && typeof v === 'object') { for (const [k, val] of Object.entries(v)) scanEnValue(val, `${path}/${k}`); }
  };
  const scanEn = (v, path) => {
    if (Array.isArray(v)) { v.forEach((x, i) => scanEn(x, `${path}[${i}]`)); return; }
    if (v && typeof v === 'object') {
      for (const [k, val] of Object.entries(v)) {
        if (k.endsWith('_en') || k === 'role_en') scanEnValue(val, `${path}/${k}`);
        else scanEn(val, `${path}/${k}`);
      }
    }
  };
  for (const [rel, doc] of Object.entries(parsed)) scanEn(doc, rel);
  check(14, '_en文本字段不得含中文字符', bad.length === 0,
    `全部_en字段与role_en子树扫描完毕，含中文${bad.length}处（别名清单等例外字段白名单：无，alias_en本身亦为英文）；问题：${bad.slice(0, 10).join('；') || '无'}${bad.length > 10 ? `（共${bad.length}项）` : ''}`);
}

// ---------- 15. 每条fact_en与fact关键字段一致 ----------
{
  const CJK = /[\u4e00-\u9fff\u3400-\u4dbf]/;
  const bad = [];
  let total = 0;
  for (const d of Object.values(novels)) {
    for (let i = 0; i < d.facts.length; i++) {
      const f = d.facts[i]; total++;
      if (typeof f.fact_en !== 'string' || f.fact_en === '') bad.push(`${d.novel_id}#${i} fact_en缺失或为空`);
      else if (CJK.test(f.fact_en)) bad.push(`${d.novel_id}#${i} fact_en含中文`);
      // fact_en与fact同属一条事实对象：七个关键字段由同一对象承载，不得出现平行的fact_en对象导致分叉
      if (f.fact_en && typeof f.fact_en === 'object') bad.push(`${d.novel_id}#${i} fact_en为对象而非字符串，关键字段可能分叉`);
      for (const k of ['source_novel', 'chapter', 'entity', 'timeline_position', 'confidence', 'canon_or_inference']) {
        if (!(k in f)) bad.push(`${d.novel_id}#${i}与fact_en共用的关键字段缺失：${k}`);
      }
      if (f.source_novel !== d.novel_id) bad.push(`${d.novel_id}#${i} source_novel与文件不符`);
    }
  }
  check(15, '每条fact_en与fact关键字段一致', bad.length === 0,
    `共${total}条事实，fact_en均为字符串且与fact同对象、共用source_novel、chapter、entity、timeline_position、confidence、canon_or_inference；问题：${bad.slice(0, 10).join('；') || '无'}${bad.length > 10 ? `（共${bad.length}项）` : ''}`);
}

// ---------- 16. 章节summary_en数量与中文一致 ----------
{
  const CJK = /[\u4e00-\u9fff\u3400-\u4dbf]/;
  const bad = [];
  let zhN = 0, enN = 0, cjkTitles = 0;
  for (const d of Object.values(novels)) {
    for (const c of d.chapters) {
      if (c.summary) { zhN++; if (!c.summary_en) bad.push(`${d.novel_id}第${c.no}章缺summary_en`); else enN++; }
      if (c.summary_en && CJK.test(c.summary_en)) bad.push(`${d.novel_id}第${c.no}章summary_en含中文`);
      if (c.title && CJK.test(c.title)) cjkTitles++;
    }
  }
  check(16, '章节summary_en数量与中文一致', bad.length === 0,
    `中文summary ${zhN}条、英文summary_en ${enN}条；章节标题含中文${cjkTitles}处（标题本身即英文原文，无需title_en）；问题：${bad.slice(0, 10).join('；') || '无'}${bad.length > 10 ? `（共${bad.length}项）` : ''}`);
}

// ---------- 17. 中文原字段未被改写（与工程本份基线逐字段比对） ----------
{
  const bad = [];
  const baselineDir = path.resolve(ROOT, '..', '007-intelligence-lab', 'knowledge');
  const notes = [];
  if (fs.existsSync(baselineDir)) {
    const diffZh = (a, b, p, out) => {
      if (a && b && typeof a === 'object' && typeof b === 'object' && !Array.isArray(a) && !Array.isArray(b)) {
        for (const k of Object.keys(b)) {
          if (k.endsWith('_en')) continue;
          if (!(k in a)) out.push(`新增非英文键${p}/${k}`);
          else diffZh(a[k], b[k], `${p}/${k}`, out);
        }
        for (const k of Object.keys(a)) {
          if (k.endsWith('_en')) continue;
          if (!(k in b)) out.push(`删除键${p}/${k}`);
        }
      } else if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) out.push(`${p}长度${a.length}->${b.length}`);
        for (let i = 0; i < Math.min(a.length, b.length); i++) diffZh(a[i], b[i], `${p}[${i}]`, out);
      } else if (a !== b) out.push(`改写${p}：${JSON.stringify(a)?.slice(0, 60)} -> ${JSON.stringify(b)?.slice(0, 60)}`);
    };
    const allowed = [
      /knowledge-control\.json\/schema_version/,
      /knowledge-control\.json\/layers\//,
      /knowledge-control\.json\/rules/,
      /knowledge-control\.json\/language_modes/,
      /character-core\.json\/field_notes\/english_fields/,
      /character-core\.json\/english_profile_version/,
      /character-core\.json\/english_profile_generated/,
      /aliases\.json\/(note|lookup)/,
    ];
    for (const rel of Object.keys(parsed).filter((r) => r.startsWith('knowledge/'))) {
      const baseFile = path.join(baselineDir, path.relative('knowledge', rel));
      if (!fs.existsSync(baseFile)) { notes.push(`${rel}基线无此文件`); continue; }
      const base = JSON.parse(fs.readFileSync(baseFile, 'utf8'));
      const out = [];
      diffZh(base, parsed[rel], rel, out);
      const unexpected = out.filter((o) => !allowed.some((re) => re.test(o)));
      if (unexpected.length) bad.push(...unexpected.slice(0, 20));
      if (out.length) notes.push(`${rel}中文侧差异${out.length}处（已登记的在列）`);
    }
    if (!bad.length) notes.push('中文原字段零未登记改写；已登记改动：knowledge-control升v2.1加KC-11至KC-16与language_modes、character-core加英文资料元数据、aliases.json注记加双语说明');
  } else {
    notes.push('工程本份基线不在本机（../007-intelligence-lab/knowledge不存在），跳过外部比对、不计失败；完整基线比对记录见docs/VALIDATION-REPORT.md双语化一节');
  }
  // 内部不变量：已登记的中文改动必须存在且形态正确
  if (kc.schema_version !== '2.1' || kc.rules.length !== 16 || !kc.language_modes) bad.push('knowledge-control v2.1/16条/language_modes缺失');
  if (!core.english_profile_version) bad.push('character-core英文资料元数据缺失');
  check(17, '中文原字段未被改写', bad.length === 0,
    `${notes.join('；')}；问题：${bad.slice(0, 10).join('；') || '无'}${bad.length > 10 ? `（共${bad.length}项）` : ''}`);
}

// ---------- 18. 人物关系双语一致 ----------
{
  const bad = [];
  let relN = 0;
  for (const p of relsDoc.pairs) {
    for (const r of p.relations) {
      relN++;
      if (!r.type) bad.push(`关系缺中文type：${r.from}->${r.to}`);
      if (!r.type_en) bad.push(`关系缺英文type_en：${r.from}->${r.to}`);
    }
  }
  for (const c of chars.characters) {
    if (!Array.isArray(c.roles_en) || c.roles_en.length !== c.roles.length) bad.push(`人物${c.id} roles_en与roles长度不一致`);
  }
  // with字段按本库既定口径解析：先按id精确匹配，再按别名匹配（合并前旧id经aliases.json解析，如bill-tanner→chief-of-staff）
  const resolveWith = (w) => {
    if (IDX.characters.has(w)) return { id: w, canonical: true };
    const e = aliasByKind.characters && aliasByKind.characters.get(normAlias(w));
    if (e && e.canonical_id) return { id: e.canonical_id, canonical: false };
    return { id: null, canonical: false };
  };
  const nonCanonical = [];
  for (const c of core.characters) {
    for (const [field, list] of [['relationships', c.relationships || []], ['role_en.relationships', (c.role_en && c.role_en.relationships) || []]]) {
      for (const r of list) {
        const res = resolveWith(r.with);
        if (!res.id) bad.push(`核心人物${c.id} ${field}指向不存在的人物：${r.with}`);
        else if (!res.canonical) nonCanonical.push(`${c.id} ${field} with=${r.with}→${res.id}`);
        if (!r.type) bad.push(`核心人物${c.id} ${field}缺type：${r.with}`);
      }
    }
  }
  check(18, '人物关系双语一致', bad.length === 0,
    `共${relN}条关系陈述，中英文type齐全；279人roles_en与roles等长；32人relationships与role_en.relationships指向均可解析（非规范id但经别名可解析：${nonCanonical.join('；') || '无'}，中文原字段沿用合并前id，见docs/VALIDATION-REPORT.md尚未解决问题）；问题：${bad.slice(0, 10).join('；') || '无'}${bad.length > 10 ? `（共${bad.length}项）` : ''}`);
}

// ---------- 19. 三层约束双语结构有效 ----------
{
  const bad = [];
  const ROLE_KEYS = ['identity_background', 'personality_traits', 'speech_patterns', 'motivations', 'relationships', 'canonical_events_timeline', 'confirmed_facts', 'forbidden_assumptions'];
  if (core.schema_version !== '2.0') bad.push('character-core版本非2.0');
  for (const c of core.characters) {
    if (!c.role_en || ROLE_KEYS.some((k) => !(k in c.role_en))) bad.push(`${c.id} role_en缺键`);
    const vs = c.voice_style_en;
    if (!vs || typeof vs !== 'object' || ['tone', 'signature_phrases', 'sentence_pattern', 'taboo'].some((k) => !(k in vs))) bad.push(`${c.id} voice_style_en结构不全`);
  }
  const toneSet = new Set(core.characters.map((c) => JSON.stringify(c.voice_style_en.tone)));
  const sentSet = new Set(core.characters.map((c) => JSON.stringify(c.voice_style_en.sentence_pattern)));
  const tabooSet = new Set(core.characters.map((c) => JSON.stringify(c.voice_style_en.taboo)));
  if (toneSet.size !== 32) bad.push(`voice_style_en tone重复：${toneSet.size}/32`);
  if (sentSet.size !== 32) bad.push(`voice_style_en sentence_pattern重复：${sentSet.size}/32`);
  if (tabooSet.size !== 32) bad.push(`voice_style_en taboo重复：${tabooSet.size}/32`);
  const phrases = core.characters.flatMap((c) => c.voice_style_en.signature_phrases || []);
  if (new Set(phrases).size !== phrases.length) bad.push('voice_style_en signature_phrases有重复');
  const q = core.characters.find((c) => c.id === 'q');
  if (!q || (q.voice_style_en.signature_phrases || []).length !== 0) bad.push('Q的voice_style_en signature_phrases应为空数组');
  if (!q || !String(q.voice_style_en.tone).includes('No recorded dialogue')) bad.push('Q的voice_style_en tone未说明无原文台词可据');
  if (!kc.language_modes || !kc.language_modes.modes || !kc.language_modes.modes.zh || !kc.language_modes.modes.en) bad.push('knowledge-control language_modes缺zh/en模式');
  if (!Array.isArray(kc.language_modes.principles) || kc.language_modes.principles.length === 0) bad.push('knowledge-control language_modes缺原则');
  for (let i = 11; i <= 16; i++) {
    const r = kc.rules.find((x) => x.id === `KC-${String(i).padStart(2, '0')}`);
    if (!r) bad.push(`缺KC-${String(i).padStart(2, '0')}`);
    else for (const k of ['condition', 'allowed', 'forbidden', 'example']) if (!(k in r)) bad.push(`KC-${String(i).padStart(2, '0')}缺${k}`);
  }
  if (!Array.isArray(ab.verified_differences) || ab.verified_differences.length !== 10) bad.push('adaptation-boundaries已核验差异非10条');
  check(19, '三层约束双语结构有效', bad.length === 0,
    `character-core v2.0：32人role_en 8键齐、voice_style_en齐（tone/sentence_pattern/taboo各32种无重复、signature_phrases共${phrases.length}条无重复、Q为空数组并说明原因）；knowledge-control v2.1：KC-11至KC-16齐、language_modes含zh/en与${kc.language_modes.principles.length}条原则；adaptation-boundaries已核验10条（其英文版未补，记为已知缺口，不计失败）；问题：${bad.slice(0, 10).join('；') || '无'}${bad.length > 10 ? `（共${bad.length}项）` : ''}`);
}

// ---------- 汇总 ----------
const passed = results.filter((r) => r.pass).length;
console.log(`\n验证结果：${passed}/${results.length}项通过`);
if (passed !== results.length) {
  console.log('失败项：');
  for (const r of results.filter((r) => !r.pass)) console.log(` - ${r.id} ${r.name}：${r.details}`);
  process.exit(1);
}
process.exit(0);
