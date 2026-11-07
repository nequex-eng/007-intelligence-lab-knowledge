# 中英对应关系（BILINGUAL-MAPPING）

> 生成时间：2026-11-07。英文资料1.0版验收记录。中文行文铁律：中文与英文字母、数字、符号之间一律不加空格；英文正文内部按英文正常词间空格写。

## 一、稳定ID清单：中英共用同一id，永不改写

人物、组织、地点、装备、事件、事实的id在中英文模式下完全相同，不因语言切换而改变。英文模式只换字段文本，不换id。

| 类别 | 总数 | id示例 | id规则 | 说明 |
|---|---|---|---|---|
| 人物 | 279人 | bond、m、felix-leiter、le-chiffre | 英文名小写连字符 | 去重后总数；含仅提及人物与无名配角 |
| 组织 | 89个 | secret-service、smersh、spectre、nato | 英文名小写连字符 | 去重后总数 |
| 地点 | 170处 | london、miami、royale-les-eaux | 英文名小写连字符 | 去重后总数；虚构地点标fictional |
| 装备 | 128项 | walther-ppk、beretta-25、disco-volante | 英文名小写连字符 | 去重后总数；按型号归并 |
| 事件 | 189件 | thunderball:nuclear-blackmail | 小说id加事件id，冒号分隔 | 各部事件不跨部合并 |
| 事实 | 773条 | 以source_novel加chapter加entity三键定位，无独立事实id | canon 762条、inference 11条 | 事实本身无id字段，三键定位 |
| 核心人物 | 32人 | bond、m、q、boothroyd、blofeld | 与人物索引同一id | character-core.json子集 |
| 小说 | 14部 | casino-royale、dr-no、octopussy | 英文书名小写连字符 | novel_id；novel_no为出版顺序1至14 |

id合并记录（旧id保留为别名，不删除）：bill-tanner并入chief-of-staff、british-secret-service并入secret-service、detroit-purple-gang并入purple-gang（2026-11-06验证期）；molony拆分为molony与sergeant-molony、cipher-machine拆分为cipher-machine与russian-cipher-machine、cyanide-pistol拆分为cyanide-pistol与cyanide-water-pistol。小说JSON原文id（如leiter、james-bond、sis、british-secret-service）未改写，以knowledge/resolution/aliases.json解析为准。

## 二、中英字段对照表

完整映射见docs/DATA-SCHEMA.md第十三节，此处只列对话层最常用的对照：

| 用途 | 中文模式取 | 英文模式取 | 位置 |
|---|---|---|---|
| 人物外貌 | appearance | appearance_en | 小说人物、核心人物 |
| 人物年龄线索 | age_clues | age_clues_en | 小说人物、核心人物 |
| 人物性格 | personality | personality_en | 小说人物、核心人物 |
| 人物习惯 | habits | habits_en | 小说人物、核心人物 |
| 人物背景 | background | background_en | 小说人物、核心人物 |
| 人物关系 | relationships | role_en.relationships | 核心人物（不另设relationships_en字段） |
| 人物语气 | voice_style | voice_style_en | 核心人物 |
| 行为边界 | behavioral_boundaries | behavioral_boundaries_en | 核心人物 |
| 知识边界 | knowledge_boundaries | knowledge_boundaries_en | 核心人物 |
| 时间截断 | timeline_cutoff | timeline_cutoff_en | 核心人物、时间线人物 |
| 角色完整资料 | 中文字段 | role_en（8键对象） | 核心人物 |
| 事实陈述 | fact | fact_en | 事实对象内，同对象共用七个关键字段 |
| 章节摘要 | summary | summary_en | 章节对象内 |
| 出场作用（人物） | role | role_en | 小说人物、索引出场 |
| 出场作用（组织/地点） | role | role_en或description_en | 小说数组；索引出场一律role_en |
| 本部说明（装备/车辆/通讯） | note | note_en或description_en | 小说数组；装备索引出场一律note_en |
| 事件标题/起因/结果 | title/cause/effect | title_en/cause_en/effect_en | 小说事件、事件索引 |
| 关系类型 | type | type_en | 解析层relationships.json |
| 别名 | alias | alias_en | 解析层aliases.json |
| 任务目标/调查/线索/结果 | objective/investigation/key_clues/outcome | mission_en内同名_en子字段 | 小说顶层mission_en对象 |
| 规则 | KC-01至KC-16中文文本 | language_modes（英文接口） | knowledge-control.json；规则文本本身无英文版 |

## 三、语言切换规则摘要

以knowledge/canon-rules/knowledge-control.json v2.1的KC-11至KC-16与language_modes为准，摘要如下：

1. 中文模式用中文字段，英文模式用`_en`字段与`role_en`；两种模式共用同一`timeline_cutoff`与`knowledge_scope`，只换表达语言，不换事实内容与知识边界（KC-11、KC-14）。
2. 英文资料按14部英文原著写成，不是中文角色提示词的翻译；每条英文断言须能追溯到英文原著章节，区分canon/inference/unconfirmed；与英文原著冲突时以英文原著为准（KC-16）。
3. M的任务汇报与Q的装备领取在两种语言下都能正确工作：M在英文模式下仍用命令式短句；Q按布思罗伊德职能行事，不编造出场情节与电影版发明，装备说明一律以布思罗伊德条目为准（诺博士第2章：瓦尔特PPK经5000发试射推荐）（KC-12）。
4. 多人物同场对话时，每个人物在两种语言下保持各自的身份、语言风格与原著设定，不得借用另一人物的口吻，也不得在对方语言下改变人物关系与时间点状态（KC-13）。
5. 语言切换不丢失对话与已确认事实：切换前已建立的对话、已确认的事实、人物关系与时间点状态全部保留；切换后不得改写已确认的事实，不得让人物突然知道切换前不知道的事，不得改变死亡、缺席或尚未登场状态（KC-14）。
6. 英文模式下专有名词与组织名保留原著英文原名，不得翻译或改写：SPECTRE、SMERSH、MWD、Otdyel II、Q Branch、Blades、Secret Service、人名与地名（如Royale-les-Eaux、Piz Gloria、Disco Volante）一律用原著英文拼写（KC-15）。
7. 英文模式不混入电影设定，KC-05在两种语言下同样适用（KC-11、KC-16）。

## 四、英文覆盖率总表（2026-11-07验收实测）

修复前（基线，2026-11-06）：只有中文描述，只有名称类英文（name_en、title_en）已存在；事实、英文摘要、角色英文、关系英文、别名英文、时间线英文全部为0。

修复后：必填英文槽位8459/8459（100%）；全部可统计英文槽位8597/10356（83.0%），未补缺口1759处；中文为空或占位词而跳过的人物描述241处，不计入适用槽位。

| 类别 | 修复前 | 修复后 | 说明 |
|---|---|---|---|
| 事实fact_en | 0/773 | 773/773 | 同对象，共用七个关键字段 |
| 章节summary_en | 0/284 | 284/284 | 章节标题本身即英文原文，无需title_en |
| 小说人物描述_en（适用） | 0/1504 | 1504/1504 | 含琐碎值Unknown/Unknown.共50处；跳过241处 |
| 小说人物role_en | 0/349 | 349/349 |  |
| 小说组织/地点role英文 | 0/347 | 347/347 | role_en或description_en两种写法 |
| 小说装备/车辆/通讯note英文 | 0/350 | 350/350 | note_en或description_en两种写法 |
| 小说事件title/cause/effect_en | 0/567 | 567/567 | 每件3个字段 |
| 任务mission_en子字段 | 0/56 | 56/56 | 4子字段乘14部 |
| 梗概synopsis_en | 0/14 | 14/14 | 无对应中文synopsis字段 |
| 推测说明note_en | 0/107 | 107/107 | topic_en 88/107，见缺口 |
| 索引人物name_en/roles_en | 279/279（基线已有） | 279/279 | 名称类英文修复前即存在 |
| 索引人物出场role_en/title_en | 0/698 | 698/698 | 每条出场2个字段 |
| 索引组织name_en/出场role_en | 89/89（基线已有）/0/142 | 89/89、142/142 |  |
| 索引地点name_en/country_en/出场role_en | 170/170（基线已有）/0/169/0/204 | 170/170、169/169、204/204 | country_en只计有country者 |
| 索引装备name_en/kind_en/出场note_en | 128/128（基线已有）/0/128/0/147 | 128/128、128/128、147/147 | note_en只计note非空者 |
| 事件索引title/cause/effect_en | 0/567 | 567/567 | 2026-11-07由小说级机械同步 |
| 别名alias_en | 0/258 | 258/258 | 双语均可解析到同一规范id |
| 关系type_en | 0/455 | 455/455 | 311对关系共455条陈述 |
| 时间线title_en | 0/14 | 14/14 |  |
| 时间线人物name_en/cutoff_en | 0/64 | 64/64 | 每人2个字段 |
| 核心人物描述_en（适用） | 0/252 | 252/252 | Q的4个空字段不适用 |
| 核心人物role_en 8键 | 0/32 | 32/32 | 每人8键全齐 |
| 核心人物timeline_cutoff_en | 0/32 | 32/32 | 2026-11-07由时间线机械同步 |

分部（小说人物描述_en，适用口径）：小说01共105/105（跳过0处，琐碎值36处）、小说02共120/120、小说03共100/100、小说04共105/105（跳过15处）、小说05共135/135、小说06共79/79（跳过41处）、小说07共111/111（跳过14处）、小说08共125/125、小说09共155/155、小说10共90/90（跳过0处，琐碎值14处）、小说11共130/130（跳过30处）、小说12共83/83（跳过37处）、小说13共85/85（跳过65处）、小说14共81/81（跳过39处）。

分人物（32位核心人物）：31人描述_en适用项全部已补；Q只补background_en与role_en，其余4个描述字段中文为空，不适用；32人role_en 8键全齐、timeline_cutoff_en全齐、voice_style_en全齐。

## 五、已知缺口清单（第二波范围，不得隐瞒）

1. story_timeline_en只有小说02有，其余13部未补。
2. adaptation_differences_en 13/14，小说12纯字符串列表未补（已知局限，不得强行改结构）。
3. 通讯name_en 36/78，小说01、02、04、07、10、11、12、13共42条未补。
4. canon_vs_inference topic_en 88/107，小说06（11条）、13（8条）未补。
5. 小说人物描述跳过241处（中文为空或占位词未描写/未知/不知道），分部见第四节。
6. 小说14 stories子结构80处中文描述无英文（key_events标题/起因/结果、地点role与country、人物role、mission_objective），子结构措辞与小说级数组不同，无法机械同步。
7. 小说级地点country_en 0/203、装备kind_en 0/148（索引层已有country_en/kind_en）。
8. 小说级人物aliases数组264条无aliases_en（解析层aliases.json已双语258/258）。
9. adaptation-boundaries.json 10条已核验差异与2条未核对说明无英文。
10. knowledge-control规则文本（KC-01至KC-16）无英文版，language_modes为英文接口。
11. 核心人物knowledge_scope known/unknown清单929项与sources数组无英文版。
12. 核心人物不另设relationships_en字段，英文版关系见role_en.relationships；时间线人物note_en只有Q有1条（其余31人无note字段，不适用）。

## 六、验证入口

`npm run validate`（19项，2026-11-07：19/19通过）与`node scripts/retrieval-tests.js`（29条，29/29通过）。双语检查为验证脚本第13至19项：覆盖率统计、`_en`字段不得含中文字符、fact_en与fact关键字段一致、章节summary_en数量一致、中文原字段未被改写（与工程本份基线逐字段比对）、人物关系双语一致、三层约束双语结构有效。完整输出见docs/VALIDATION-REPORT.md双语化一节。
