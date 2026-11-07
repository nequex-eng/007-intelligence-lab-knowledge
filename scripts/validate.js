// 007知识库全面验收脚本（Node零依赖）
// 用法：npm run validate（仓库根目录）或 node scripts/validate.js
// 退出码：全部通过为0，任一项不通过为非0并列出失败项。
// 注意：本脚本只读仓库内文件，不读仓库外底本txt；章节号按各小说chapters的no实际值比对（阿拉伯数字、罗马数字、英文词数混用，不换算）。
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
  if (kc.schema_version !== '2.0') bad.push('knowledge-control版本非2.0');
  if (!Array.isArray(kc.rules) || kc.rules.length !== 10) bad.push(`knowledge-control规则非10条：${kc.rules && kc.rules.length}`);
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
    `character-core v2.0共32人、knowledge-control v2.0共10条规则、adaptation-boundaries已核验10条；问题：${bad.slice(0, 10).join('；') || '无'}${bad.length > 10 ? `（共${bad.length}项）` : ''}`);
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

// ---------- 汇总 ----------
const passed = results.filter((r) => r.pass).length;
console.log(`\n验证结果：${passed}/${results.length}项通过`);
if (passed !== results.length) {
  console.log('失败项：');
  for (const r of results.filter((r) => !r.pass)) console.log(` - ${r.id} ${r.name}：${r.details}`);
  process.exit(1);
}
process.exit(0);
