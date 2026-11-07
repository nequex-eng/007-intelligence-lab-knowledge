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
| story_timeline | 字符串 | 是 | 故事内时间线摘要；原文未写明年份的不得强行定年；英文版story_timeline_en只有小说02补写，见第十三节 |
| chapters | 数组 | 是 | 每项{no、title、start_line、summary、summary_en}；no保留原文形态；title本身即英文原文，无需title_en；summary_en与summary一一对应 |
| characters | 数组 | 是 | 每项见下表；英文版见第十三节 |
| organizations/locations/equipment | 数组 | 是 | 本部出现的组织/地点/装备；英文版见第十三节 |
| vehicles/communications | 数组 | 是 | 交通工具/通讯方式；英文版见第十三节 |
| mission | 对象 | 是 | {objective、investigation、key_clues、outcome}；英文版为平行对象mission_en{objective_en、investigation_en、key_clues_en、outcome_en} |
| synopsis_en | 字符串 | 是 | 英文梗概（本文件无对应中文synopsis字段，梗概只以英文写成） |
| events | 数组 | 是 | 每项{id、chapter、title、title_en、cause、cause_en、effect、effect_en}；id为小说id加事件id |
| facts | 数组 | 是 | 每项七字段加quote，见下表；英文版为同对象内fact_en字符串 |
| canon_vs_inference | 数组 | 是 | 每项{topic、topic_en、status、note、note_en}；status为canon或inference（本身即英文枚举，status_en只在小说14补写，不作必填）；topic_en在小说06、13未补，见第十三节 |
| adaptation_differences | 数组 | 是 | 本部电影差异；未核对时只写“本部未核对电影差异”；英文版为平行数组adaptation_differences_en，小说12因纯字符串列表未补，见第十三节 |

characters数组每项：id（字符串，英文名小写连字符）、name_en/name_zh（字符串）、aliases（字符串数组；英文版aliases_en只在解析层见第十二节，小说级aliases数组无英文版，见第十三节）、role（字符串）、role_en（字符串，英文版role）、appearance/age_clues/personality/habits/background（字符串或null，原文未写时为null或写明未写；英文版为同名_en字段，只在中文非空且非占位词时补写，见第十三节）、first_appearance_chapter/last_appearance_chapter（整数或字符串或null，保留原文形态）、relationships（数组，每项{with、type、change}；with为人物id）。

organizations/locations数组每项：id、name_en/name_zh、role（字符串，本部出场作用）、英文版role_en或description_en（两种写法并存，见第十三节）；locations另有country（字符串，无英文版，见第十三节）。

equipment/vehicles/communications数组每项：id、name_en/name_zh（communications的name_en在8部未补，见第十三节）、note（字符串，本部说明）、英文版note_en或description_en（两种写法并存，见第十三节）；equipment另有kind（字符串，无英文版，见第十三节）。

events数组每项：id、chapter、title/title_en、cause/cause_en、effect/effect_en。

facts数组每项：source_novel（字符串）、chapter（整数或字符串，保留原文形态；全书级grep事实取全书）、entity（字符串，人物或组织id；现况另有10个不同主题词取值，见docs/VALIDATION-REPORT.md尚未解决问题第2条）、fact（字符串，中文事实陈述）、fact_en（字符串，同对象内英文事实陈述，与fact共用source_novel、chapter、entity、timeline_position、confidence、canon_or_inference七个关键字段）、timeline_position（字符串，故事内时间位置）、confidence（字符串，high/medium/low）、canon_or_inference（字符串，canon或inference）、quote（字符串，必要原文短句，每句不超过25个英文词，可空）、quote_source（字符串，章节出处）。

## 三、knowledge/characters/index.json（人物总索引，279人）

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| schema_version/generated/total_unique | 字符串/字符串/整数 | 是 | 版本、生成日期、去重后总数 |
| note | 字符串 | 是 | 去重说明，如M与迈尔斯·梅瑟维为同一人 |
| characters | 数组 | 是 | 每项见下表 |

每项：id（字符串）、name_en/name_zh（字符串；索引条目没有name键，只有name_en与name_zh）、aliases（字符串数组）、roles（字符串数组）、roles_en（字符串数组，与roles一一对应）、appearance_count（整数）、appearances（数组，每项{novel、novel_no、title_zh、title_en、role、role_en、first_chapter、last_chapter}；first_chapter/last_chapter可为null）。

已知冲突（已解决，2026-11-06）：chief-of-staff、molony、solitaire、strangways四个id重复已由A路处理；霹雳弹中莱特在novel-09.json内记为leiter、爱我的间谍中邦德在novel-10.json内记为james-bond等别名变体，经knowledge/resolution/aliases.json统一解析（见第十二节）；验证期另发现bill-tanner与chief-of-staff、british-secret-service与secret-service、detroit-purple-gang与purple-gang三组漏并，已合并，旧id保留为别名。character-core.json的关系with字段以characters/index.json当前内容为准。

## 四、knowledge/organizations/index.json（89个）

顶层：schema_version、generated、total_unique、note、organizations。每项：id、name_en、name_zh、kind（字符串或null）、appearance_count、appearances（数组，每项{novel、novel_no、role、role_en、first_chapter}）。

## 五、knowledge/locations/index.json（170处）

顶层：schema_version、generated、total_unique、locations。每项：id、name_en、name_zh、country（字符串）、country_en（字符串，有country者均有；东方快车无country，不适用）、fictional（布尔值）、appearance_count、appearances（数组，每项{novel、novel_no、role、role_en}）。

## 六、knowledge/equipment/index.json（128项）

顶层：schema_version、generated、total_unique、equipment。每项：id、name_en、name_zh、kind（字符串，如武器）、kind_en（字符串）、appearance_count、appearances（数组，每项{novel、novel_no、note、note_en}；note为null时note_en不补）。

## 七、knowledge/timeline/index.json（14部）

顶层：schema_version、generated、note、entries。每项：novel_no、novel、title_en、title_zh、publication_year、story_timeline（字符串）。时间线以出版顺序为主轴；故事内年份以各部story_timeline为准，原文未写明年份的不得强行定年。

## 八、knowledge/events/index.json（189件）

顶层：schema_version、generated、total、events。每项：id（字符串，小说id加事件id，如thunderball:nuclear-blackmail）、novel、novel_no、chapter、title、title_en、cause、cause_en、effect、effect_en。事件索引英文版由小说级事件英文机械同步（2026-11-07），逐条核对title/cause/effect一致后复制，见docs/VALIDATION-REPORT.md双语化一节。

## 九、knowledge/canon-rules/character-core.json（v2.0，英文资料1.0版，2026-11-07）

顶层：schema_version（字符串，“2.0”）、generated、source、rule、layers（对象，三层说明）、field_notes（对象，新增字段说明）、english_profile_version（字符串，“1.0”）、english_profile_generated（字符串，英文资料生成日期）、characters（数组，32人）。

每人物：id、name_en、name_zh、role、first_appearance（对象{novel、novel_no、title_zh、role、first_chapter、last_chapter}）、appearance_count（整数）、appearance_novels（整数数组）、appearance（字符串或null）、appearance_en（字符串或null，只在中文非空时补写）、age_clues（字符串或null）、age_clues_en（字符串或null）、personality（字符串或null）、personality_en（字符串或null）、habits（字符串或null）、habits_en（字符串或null）、background（字符串或null）、background_en（字符串或null）、relationships（数组或null，每项{with、type、change}；英文版不另设relationships_en字段，见role_en.relationships）、timeline_cutoff（字符串，如“金枪人（1965年）”）、timeline_cutoff_en（字符串，英文版时间截断，如The Man with the Golden Gun (1965)，由knowledge/resolution/timeline.json机械同步，2026-11-07）、boundaries（字符串，旧版字段，保留不动）、voice_style（对象或null，v2.0新增）、voice_style_en（对象，英文版语气，见下）、behavioral_boundaries（字符串数组，v2.0新增）、behavioral_boundaries_en（字符串数组）、knowledge_boundaries（字符串数组，v2.0新增）、knowledge_boundaries_en（字符串数组）、layers（对象，每人物三层字段归属）、knowledge_scope（数组，v2.0新增；known/unknown清单为中文，无英文版，见第十三节）、sources（字符串数组，小说id加章节号；无英文版，见第十三节）、note（字符串，v2.0新增，补不齐原因，可空）、role_en（对象，8键全齐，见下）。

voice_style对象：tone（字符串，语气）、signature_phrases（字符串数组，标志性措辞）、sentence_pattern（字符串，句式）、taboo（字符串数组，禁忌表达）。voice_style_en同结构，32人tone、sentence_pattern、taboo均无重复，signature_phrases共64条无重复；Q的signature_phrases为空数组（无原文台词可据），tone中说明原因并改用布思罗伊德口吻。

role_en对象（8键缺一不可）：identity_background（身份与背景）、personality_traits（性格特征数组）、speech_patterns（语言模式）、motivations（动机）、relationships（关系数组，每项{with、type、change}，with为人物id；即relationships的英文版）、canonical_events_timeline（原著大事时间线数组，附小说与章节）、confirmed_facts（已确认事实数组，逐条标canon/inference/unconfirmed并附章节）、forbidden_assumptions（禁止假设数组）。

knowledge_scope数组每项：novel_no（整数）、novel（字符串）、title_zh（字符串）、status（字符串，present/absent/dead/not_yet_introduced/mentioned_only）、known（字符串数组）、unknown（字符串数组）。

layers对象：layer1_identity（字符串数组：appearance、age_clues、background、relationships、timeline_cutoff）、layer2_knowledge（字符串数组：knowledge_scope、knowledge_boundaries）、layer3_behavior（字符串数组：personality、habits、voice_style、behavioral_boundaries）。

新增字段与旧字段的映射：voice_style、behavioral_boundaries、knowledge_boundaries、knowledge_scope、note、layers均为v2.0新增，无旧字段对应；旧版boundaries字符串字段保留，内容不变；旧版9个基础字段（appearance、age_clues、personality、habits、background、relationships、timeline_cutoff、first_appearance、appearance_count、appearance_novels）字段名与含义不变。

## 十、knowledge/canon-rules/knowledge-control.json（v2.1，2026-11-07）

顶层：schema_version（字符串，“2.1”）、generated、source、purpose、enforcement（对象{before_answer、during_answer、on_unknown}）、layers（对象，三层与本文件规则的对应）、rules（数组，16条，KC-01至KC-16）、language_modes（对象，双语模式，见下）。

rules数组每项：id（字符串，KC-01至KC-16，保留）、rule（字符串，规则名，保留）、text（字符串，原文规则文本，保留）、condition（字符串，v2.0新增，触发条件）、allowed（字符串数组，v2.0新增，允许做的事）、forbidden（字符串数组，v2.0新增，禁止做的事）、example（字符串，v2.0新增，示例；缺失信息不编造）。KC-01至KC-10为v2.0原有规则；KC-11至KC-16为v2.1新增双语规则（语言模式选择、M汇报与Q装备领取双语工作、多人物同场对话双语一致、语言切换不丢失对话与事实、英文模式专有名词保留原名、英文资料不得由中文提示词翻译生成）。规则文本本身无英文版，以中文为准，language_modes为英文接口，见第十三节。

language_modes对象：modes.zh（中文模式，source_fields为中文字段）、modes.en（英文模式，source_fields为_en字段与role_en）、principles（字符串数组，6条原则：切换语言只换表达语言，不换事实、时间截断、知识范围与知识边界；M汇报与Q装备领取双语工作；多人物同场各保身份与口吻；切换不丢对话与已确认事实；英文模式专有名词保留原著英文原名；英文模式不混入电影设定）。

## 十一、knowledge/canon-rules/adaptation-boundaries.json（v1.0，未动；英文版未补，见第十三节）

顶层：schema_version、generated、source、purpose、verified_differences（数组，10条已核验，每项{id、novel、novel_no、difference、evidence}）、not_yet_verified（字符串数组，7部未核对电影差异的说明）。

## 十二、knowledge/resolution/（检索索引，v1.0，2026-11-06新建）

文件清单：aliases.json、relationships.json、timeline.json；schema_version均为“1.0”，generated为生成日期。

aliases.json：顶层{schema_version、generated、note、aliases}。每项：alias（字符串，别名原文，大小写不敏感匹配）、alias_en（字符串，英文别名，与alias指向同一规范id）、kind（字符串，character/organization/location/equipment/event）、canonical_id（字符串，规范id；歧义别名为空）、candidates（字符串数组，歧义时为候选规范id清单）、basis（字符串，依据，如索引条目、小说JSON、原文行号）。解析规则：kind-aware，先按本类id精确匹配，再按本类别名匹配（alias与alias_en双语均可解析到同一规范id）；同名不同实体返回candidates，不静默合并。共258条，歧义3条（Molony、Spang、spang-brothers）。

relationships.json：顶层{schema_version、generated、note、pairs}。每项：a、b（字符串，人物id，无序对）、relations（数组，每项{from、to、type、type_en、novel、novel_no}；from/to为有向陈述原始方向，type为关系类型，type_en为英文版关系类型，novel为出处小说id）、via_group（字符串或null，合称展开说明，如spang-brothers）。双向可查：任一端检索均可返回对方。共311对，其中116对双向均有陈述；关系陈述共455条，中英文type齐全。

timeline.json：顶层{schema_version、generated、note、novels、characters}。novels数组每项：novel_no、novel、title_zh、title_en、characters（对象，键为人物id，值为present/absent/dead/not_yet_introduced/mentioned_only），状态集合由character-core.json的knowledge_scope导出。characters数组每项：id、name_en、timeline_cutoff（字符串，等于最后出场小说，即appearance_novels最大值；q为例外，见VALIDATION-REPORT.md）、timeline_cutoff_en（字符串，英文版时间截断）、first_present_novel、last_present_novel、death_novel_no（整数或null，首部status为dead的小说编号，死亡发生于前一部故事内）。共14部、32人。

与novels/novel-XX.json事实的对应关系：事实三键source_novel加chapter加entity定位；chapter取各部chapters的no实际值（阿拉伯数字、罗马数字、英文词数混用，不换算），全书级grep事实取全书；entity经aliases.json解析为规范id后落入四类索引。character-core.json与knowledge-control.json的v2.0结构不依赖检索索引，可独立读取。

## 十三、双语字段（2026-11-07新增，英文资料1.0版）

### 13.1兼容方案：沿用下划线后缀，不引入嵌套{zh,en}对象

英文资料一律以平行`_en`后缀字段写在同一对象内，不引入嵌套`{zh,en}`对象，原因有四：第一，已上线数据与接口（网站functions/_lib/knowledge.js与characters.js、检索脚本、验证脚本）全部按扁平字段读取，嵌套会迫使全部调用点改写；第二，中文原字段名与含义一字不动，基线比对可逐字段做（验证脚本第17项）；第三，事实的`fact_en`与`fact`同属一条事实对象，共用七个关键字段，嵌套会把同一条事实拆成两个对象，增加分叉风险；第四，缺失处理直观——中文为空或占位词时`_en`字段直接不补，不必用空对象占位。`_en`字段不得含中文字符（验证脚本第14项全库扫描，含`role_en`子树，0处）；中文原字段含中文是正常的，不得误报。

### 13.2中英字段映射表（中文原字段→英文新字段）

| 中文原字段 | 英文新字段 | 位置 | 备注 |
|---|---|---|---|
| title_zh | title_en | 小说顶层、章节无此字段（标题本身即英文原文）、索引、时间线 | 基线已有，修复前即存在 |
| name_zh（索引无name键） | name_en | 四类索引、小说各数组、核心人物 | 基线已有，修复前即存在；通讯name_en在8部未补 |
| fact | fact_en | 事实对象内 | 同对象，共用七个关键字段 |
| summary | summary_en | 章节对象内 | 284/284 |
| appearance | appearance_en | 小说人物、核心人物 | 只在中文非空且非占位词时补写 |
| age_clues | age_clues_en | 小说人物、核心人物 | 同上 |
| personality | personality_en | 小说人物、核心人物 | 同上 |
| habits | habits_en | 小说人物、核心人物 | 同上 |
| background | background_en | 小说人物、核心人物 | 同上 |
| voice_style | voice_style_en | 核心人物 | 同结构{tone、signature_phrases、sentence_pattern、taboo} |
| behavioral_boundaries | behavioral_boundaries_en | 核心人物 | 字符串数组 |
| knowledge_boundaries | knowledge_boundaries_en | 核心人物 | 字符串数组 |
| role（人物） | role_en | 小说人物、索引人物出场 | 唯一写法 |
| role（组织/地点） | role_en或description_en | 小说组织/地点数组 | 两种写法并存，见13.3 |
| role（索引出场） | role_en | 四类索引appearances | 唯一写法 |
| note（装备/车辆/通讯） | note_en或description_en | 小说装备/车辆/通讯数组 | 两种写法并存，见13.3 |
| note（索引出场） | note_en | 装备索引appearances | 唯一写法 |
| title（事件） | title_en | 小说事件、事件索引 | 事件索引英文版2026-11-07由小说级机械同步 |
| cause（事件） | cause_en | 小说事件、事件索引 | 同上 |
| effect（事件） | effect_en | 小说事件、事件索引 | 同上 |
| roles | roles_en | 人物索引 | 与roles一一对应 |
| country | country_en | 地点索引 | 有country者均有；小说级地点无country_en |
| kind | kind_en | 装备索引 | 小说级装备无kind_en |
| mission（对象） | mission_en（对象） | 小说顶层 | 子字段objective_en、investigation_en、key_clues_en、outcome_en |
| topic（推测说明） | topic_en | canon_vs_inference | 小说06、13未补 |
| note（推测说明） | note_en | canon_vs_inference | 107/107 |
| status（推测说明） | status_en | canon_vs_inference | 本身即英文枚举，不作必填；只在小说14补写 |
| adaptation_differences（数组） | adaptation_differences_en（数组） | 小说顶层 | 小说12未补，见13.3 |
| story_timeline（字符串） | story_timeline_en（字符串） | 小说顶层 | 只有小说02补写 |
| timeline_cutoff | timeline_cutoff_en | 核心人物、时间线人物 | 核心人物版2026-11-07由时间线机械同步 |
| relationships | role_en.relationships | 核心人物 | 不另设relationships_en字段，见13.3 |
| alias | alias_en | 解析层aliases.json | 双语均可解析到同一规范id |
| type（关系） | type_en | 解析层relationships.json | 455/455 |
| （无中文对应字段） | synopsis_en | 小说顶层 | 英文梗概，无对应中文synopsis字段 |
| （无中文对应字段） | role_en（对象） | 核心人物 | 8键对象，见第九节 |

### 13.3字段命名收敛决定（2026-11-07验收定）

各路专人对同一类字段用了不同英文名，如实登记如下，不静默重写：

1. 组织/地点的中文描述字段原名是`role`。小说05、07、09补`role_en`（组织8+16+14=38条、地点20+16+12=48条）；其余11部补`description_en`（组织105条、地点156条）。索引层四类appearances一律用`role_en`，无分歧。
2. 装备/车辆/通讯的中文描述字段原名是`note`。小说05、07、09补`note_en`（装备14+17+10=41条、车辆8+11+9=28条、通讯6+6+6=18条）；其余11部补`description_en`（装备106条、车辆97条、通讯60条）。装备索引appearances一律用`note_en`，无分歧。
3. 通讯的`name_en`有的补了、有的没补：小说03、05、06、08、09、14共36条已补；小说01、02、04、07、10、11、12、13共42条未补。
4. `story_timeline_en`只有小说02补了，其余13部未补。
5. `adaptation_differences`有的用平行数组`adaptation_differences_en`（13部），小说12因纯字符串列表未补（1部）。
6. `canon_vs_inference`的`topic_en`在小说06（11条）、13（8条）未补；`status_en`只在小说14补写，其余13部未补（`status`本身即canon/inference英文枚举，不作必填）。

统一口径：新写字段一律按中文原字段名加`_en`后缀（`role`→`role_en`、`note`→`note_en`），与索引层一致；已交付的`description_en`是合规的既有写法，验证脚本同时接受`role_en`与`description_en`（`note`同理），不做批量改名。理由：批量改名涉及约600处已交付英文内容，改动面大而收益只在拼写统一，且检索测试与网站接口均不依赖该字段名拼写；改名风险高于收益，故只登记、不重写。第二波补齐时仍按本口径写新字段。

改不动的已知局限：小说12的`adaptation_differences`为纯字符串列表（`["本部未核对电影差异"]`），无结构可挂英文版，记为已知局限，不得强行改结构；小说14`stories`子结构（3篇故事的key_events、地点role、人物role、mission_objective，共80处）无英文版，且子结构措辞与小说级数组不同、无法机械同步，记为已知局限。

### 13.4跳过口径：中文为空或占位词时不补英文

小说人物5个描述字段（appearance、age_clues、personality、habits、background）中，中文为null、空字符串或占位词（未描写、未知、不知道）时，`_en`字段不补，不得编造。实测跳过241处：小说04共15处、小说06共41处、小说07共14处、小说11共30处、小说12共37处、小说13共65处、小说14共39处；小说01共36处与小说10共14处占位词已译为琐碎值Unknown/Unknown.（50处），计入已补但另行注明；其余各部为0处。核心人物中Q的appearance、age_clues、personality、habits、relationships中文均为空，故只补background_en与role_en；其voice_style_en如实写明无原文台词可据。

### 13.5必填口径与验证入口

必填指每条事实、每个实体、每个事件、每对关系、每个时间点与每项角色扮演字段都须有一条完整英文路径；重复副本与展示标签的缺失记为已知缺口，不计验证失败，缺口清单见docs/VALIDATION-REPORT.md双语化一节与docs/BILINGUAL-MAPPING.md。验证入口仍为`npm run validate`（19项）与`node scripts/retrieval-tests.js`（29条），退出码通过为0、不通过为非0。
