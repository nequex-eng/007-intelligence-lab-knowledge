# 数据字典（DATA-SCHEMA）

> 内部资料。全部JSON的字段字典，schema_version均为字符串，如“1.0”“2.0”。中文与英文字母、数字、符号之间一律不加空格。必填指该文件正常条目应有该字段；原文未写时填null或按各文件说明处理，不得编造。

## 一、knowledge/manifest.json

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| schema_version | 字符串 | 是 | 如“1.0” |
| generated | 字符串 | 是 | 生成日期，如“2026-11-06” |
| project | 字符串 | 是 | 项目名“007-intelligence-lab” |
| source_zip | 字符串 | 是 | 底本压缩包路径 |
| source_zip_bytes | 整数 | 是 | 底本字节数 |
| source_pages_dir | 字符串 | 是 | 底本Pages文件目录 |
| convert | 字符串 | 是 | txt转换命令 |
| total_bytes/total_chars/total_words/total_lines | 整数 | 是 | 14部txt合计规模 |
| novel_count | 整数 | 是 | 14 |
| integrity | 对象 | 是 | {encoding、replacement_chars_total、sha256_unique、truncation_found、duplicate_files、note} |
| known_gaps | 数组 | 是 | 已知缺口，如八爪女第4篇未见 |
| novels | 数组 | 是 | 每部一项目，见下表 |

novels数组每项：novel_no（整数，出版顺序1至14）、book_id（字符串，如casino-royale）、title_en/title_zh（字符串）、publication_year（整数）、txt_file（字符串）、bytes/lines/words/chars（整数）、encoding（字符串）、sha256（字符串）、chapters（整数）、chapter_status（字符串）、status（字符串）、chapter_list（数组，每项{n、title、line}；n保留原文形态：阿拉伯数字、罗马数字或词数）。

## 二、knowledge/novels/novel-XX.json（XX为01至14）

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| novel_id | 字符串 | 是 | 如casino-royale |
| novel_no | 整数 | 是 | 1至14 |
| title_en/title_zh | 字符串 | 是 | 书名 |
| publication_year | 整数 | 是 | 出版年 |
| kind | 字符串 | 是 | “长篇”或“短篇集” |
| source_file/source_sha256 | 字符串 | 是 | 底本txt与sha256 |
| words/lines | 整数 | 是 | 本部规模 |
| reading | 对象 | 是 | {chapters_read、chapters_total、coverage、method} |
| story_timeline | 字符串 | 是 | 故事内时间线摘要；原文未写明年份的不得强行定年 |
| chapters | 数组 | 是 | 每项{no、title、start_line、summary}；no保留原文形态 |
| characters | 数组 | 是 | 每项见下表 |
| organizations/locations/equipment | 数组 | 是 | 本部出现的组织/地点/装备 |
| vehicles/communications | 数组 | 是 | 交通工具/通讯方式 |
| mission | 对象 | 是 | {objective、investigation、key_clues、outcome} |
| events | 数组 | 是 | 每项{id、chapter、title、cause、effect}；id为小说id加事件id |
| facts | 数组 | 是 | 每项七字段加quote，见下表 |
| canon_vs_inference | 数组 | 是 | 每项{topic、status、note}；status为canon或inference |
| adaptation_differences | 数组 | 是 | 本部电影差异；未核对时只写“本部未核对电影差异” |

characters数组每项：id（字符串，英文名小写连字符）、name_en/name_zh（字符串）、aliases（字符串数组）、role（字符串）、appearance/age_clues/personality/habits/background（字符串或null，原文未写时为null或写明未写）、first_appearance_chapter/last_appearance_chapter（整数或字符串或null，保留原文形态）、relationships（数组，每项{with、type、change}；with为人物id）。

facts数组每项：source_novel（字符串）、chapter（整数或字符串，保留原文形态；全书级grep事实取全书）、entity（字符串，人物或组织id；现况另有10个不同主题词取值，见docs/VALIDATION-REPORT.md尚未解决问题第2条）、fact（字符串，中文事实陈述）、timeline_position（字符串，故事内时间位置）、confidence（字符串，high/medium/low）、canon_or_inference（字符串，canon或inference）、quote（字符串，必要原文短句，每句不超过25个英文词，可空）、quote_source（字符串，章节出处）。

## 三、knowledge/characters/index.json（人物总索引，279人）

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| schema_version/generated/total_unique | 字符串/字符串/整数 | 是 | 版本、生成日期、去重后总数 |
| note | 字符串 | 是 | 去重说明，如M与迈尔斯·梅瑟维为同一人 |
| characters | 数组 | 是 | 每项见下表 |

每项：id（字符串）、name_en/name_zh（字符串；索引条目没有name键，只有name_en与name_zh）、aliases（字符串数组）、roles（字符串数组）、appearance_count（整数）、appearances（数组，每项{novel、novel_no、title_zh、role、first_chapter、last_chapter}；first_chapter/last_chapter可为null）。

已知冲突（已解决，2026-11-06）：chief-of-staff、molony、solitaire、strangways四个id重复已由A路处理；霹雳弹中莱特在novel-09.json内记为leiter、爱我的间谍中邦德在novel-10.json内记为james-bond等别名变体，经knowledge/resolution/aliases.json统一解析（见第十二节）；验证期另发现bill-tanner与chief-of-staff、british-secret-service与secret-service、detroit-purple-gang与purple-gang三组漏并，已合并，旧id保留为别名。character-core.json的关系with字段以characters/index.json当前内容为准。

## 四、knowledge/organizations/index.json（89个）

顶层：schema_version、generated、total_unique、note、organizations。每项：id、name_en、name_zh、kind（字符串或null）、appearance_count、appearances（数组，每项{novel、novel_no、role、first_chapter}）。

## 五、knowledge/locations/index.json（170处）

顶层：schema_version、generated、total_unique、locations。每项：id、name_en、name_zh、country（字符串）、fictional（布尔值）、appearance_count、appearances（数组，每项{novel、novel_no、role}）。

## 六、knowledge/equipment/index.json（128项）

顶层：schema_version、generated、total_unique、equipment。每项：id、name_en、name_zh、kind（字符串，如武器）、appearance_count、appearances（数组，每项{novel、novel_no、note}）。

## 七、knowledge/timeline/index.json（14部）

顶层：schema_version、generated、note、entries。每项：novel_no、novel、title_en、title_zh、publication_year、story_timeline（字符串）。时间线以出版顺序为主轴；故事内年份以各部story_timeline为准，原文未写明年份的不得强行定年。

## 八、knowledge/events/index.json（189件）

顶层：schema_version、generated、total、events。每项：id（字符串，小说id加事件id，如thunderball:nuclear-blackmail）、novel、novel_no、chapter、title、cause、effect。

## 九、knowledge/canon-rules/character-core.json（v2.0）

顶层：schema_version（字符串，“2.0”）、generated、source、rule、layers（对象，三层说明）、field_notes（对象，新增字段说明）、characters（数组，32人）。

每人物：id、name_en、name_zh、role、first_appearance（对象{novel、novel_no、title_zh、role、first_chapter、last_chapter}）、appearance_count（整数）、appearance_novels（整数数组）、appearance（字符串或null）、age_clues（字符串或null）、personality（字符串或null）、habits（字符串或null）、background（字符串或null）、relationships（数组或null，每项{with、type、change}）、timeline_cutoff（字符串，如“金枪人（1965年）”）、boundaries（字符串，旧版字段，保留不动）、voice_style（对象或null，v2.0新增）、behavioral_boundaries（字符串数组，v2.0新增）、knowledge_boundaries（字符串数组，v2.0新增）、layers（对象，每人物三层字段归属）、knowledge_scope（数组，v2.0新增）、sources（字符串数组，小说id加章节号）、note（字符串，v2.0新增，补不齐原因，可空）。

voice_style对象：tone（字符串，语气）、signature_phrases（字符串数组，标志性措辞）、sentence_pattern（字符串，句式）、taboo（字符串数组，禁忌表达）。

knowledge_scope数组每项：novel_no（整数）、novel（字符串）、title_zh（字符串）、status（字符串，present/absent/dead/not_yet_introduced/mentioned_only）、known（字符串数组）、unknown（字符串数组）。

layers对象：layer1_identity（字符串数组：appearance、age_clues、background、relationships、timeline_cutoff）、layer2_knowledge（字符串数组：knowledge_scope、knowledge_boundaries）、layer3_behavior（字符串数组：personality、habits、voice_style、behavioral_boundaries）。

新增字段与旧字段的映射：voice_style、behavioral_boundaries、knowledge_boundaries、knowledge_scope、note、layers均为v2.0新增，无旧字段对应；旧版boundaries字符串字段保留，内容不变；旧版9个基础字段（appearance、age_clues、personality、habits、background、relationships、timeline_cutoff、first_appearance、appearance_count、appearance_novels）字段名与含义不变。

## 十、knowledge/canon-rules/knowledge-control.json（v2.0）

顶层：schema_version（字符串，“2.0”）、generated、source、purpose、enforcement（对象{before_answer、during_answer、on_unknown}）、layers（对象，三层与本文件规则的对应）、rules（数组，10条）。

rules数组每项：id（字符串，KC-01至KC-10，保留）、rule（字符串，规则名，保留）、text（字符串，原文规则文本，保留）、condition（字符串，v2.0新增，触发条件）、allowed（字符串数组，v2.0新增，允许做的事）、forbidden（字符串数组，v2.0新增，禁止做的事）、example（字符串，v2.0新增，示例；缺失信息不编造）。

## 十一、knowledge/canon-rules/adaptation-boundaries.json（v1.0，未动）

顶层：schema_version、generated、source、purpose、verified_differences（数组，10条已核验，每项{id、novel、novel_no、difference、evidence}）、not_yet_verified（字符串数组，7部未核对电影差异的说明）。

## 十二、knowledge/resolution/（检索索引，v1.0，2026-11-06新建）

文件清单：aliases.json、relationships.json、timeline.json；schema_version均为“1.0”，generated为生成日期。

aliases.json：顶层{schema_version、generated、note、aliases}。每项：alias（字符串，别名原文，大小写不敏感匹配）、kind（字符串，character/organization/location/equipment/event）、canonical_id（字符串，规范id；歧义别名为空）、candidates（字符串数组，歧义时为候选规范id清单）、basis（字符串，依据，如索引条目、小说JSON、原文行号）。解析规则：kind-aware，先按本类id精确匹配，再按本类别名匹配；同名不同实体返回candidates，不静默合并。共258条，歧义3条（Molony、Spang、spang-brothers）。

relationships.json：顶层{schema_version、generated、note、pairs}。每项：a、b（字符串，人物id，无序对）、relations（数组，每项{from、to、type、novel、novel_no}；from/to为有向陈述原始方向，type为关系类型，novel为出处小说id）、via_group（字符串或null，合称展开说明，如spang-brothers）。双向可查：任一端检索均可返回对方。共311对，其中116对双向均有陈述。

timeline.json：顶层{schema_version、generated、note、novels、characters}。novels数组每项：novel_no、novel、title_zh、characters（对象，键为人物id，值为present/absent/dead/not_yet_introduced/mentioned_only），状态集合由character-core.json的knowledge_scope导出。characters数组每项：id、timeline_cutoff（字符串，等于最后出场小说，即appearance_novels最大值；q为例外，见VALIDATION-REPORT.md）、first_present_novel、last_present_novel、death_novel_no（整数或null，首部status为dead的小说编号，死亡发生于前一部故事内）。共14部、32人。

与novels/novel-XX.json事实的对应关系：事实三键source_novel加chapter加entity定位；chapter取各部chapters的no实际值（阿拉伯数字、罗马数字、英文词数混用，不换算），全书级grep事实取全书；entity经aliases.json解析为规范id后落入四类索引。character-core.json与knowledge-control.json的v2.0结构不依赖检索索引，可独立读取。
