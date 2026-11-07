# 007原著知识库接管指令（给ChatGPT）
用户会把knowledge/与docs/打包发给你。先读完再动手，不要凭记忆回答。
## 一、这是什么
- 基于Ian Fleming 14部007原著逐部阅读建成的结构化知识库，底本为用户提供的007_0_64b6.zip（14个Pages文件转txt），总计926290词、5073306字符、18849行，284个章节/故事单位，覆盖率100%。
- 实体总数：人物279、组织89、地点170、装备128、事件189、事实773条（762条canon、11条inference）。
- 原始txt只作内部资料，绝不上传公开GitHub仓库；知识库只含原创整理的结构化知识、事实索引、章节定位、人物关系与简明摘要，不含小说全文。
- 自动化验收：`npm run validate`12/12项通过，检索测试`node scripts/retrieval-tests.js`15/15通过；检索索引见knowledge/resolution/（aliases.json 258条别名、relationships.json 311对关系、timeline.json 14部时间线）。
## 二、先读这些文件
- docs/CHATGPT-HANDOVER.md：完整接管指南（先读它）。
- docs/SOURCE-INVENTORY.md：14部清单（书名、文件、大小、编码、sha256、章节目录、完整性）。
- docs/CANON-ARCHITECTURE.md：目录结构、三层约束、字段说明、编号规则。
- docs/CHARACTER-INDEX.md：人物索引（去重后279人）。
- docs/TIMELINE.md：时间线（出版顺序为主轴，故事内年份以原文为准）。
- docs/KNOWLEDGE-COVERAGE.md：覆盖率、实体总数、20条事实抽查、5组跨小说抽查、已知局限。
- docs/VALIDATION-REPORT.md：自动化验证与修复记录（2026-11-06：`npm run validate`12/12项通过、检索测试15/15通过）。
- knowledge/manifest.json：14部清单机器可读版。
- knowledge/canon-rules/character-core.json：第一层约束（32位核心人物，v2.0）。
- knowledge/canon-rules/knowledge-control.json：第三层约束（10条规则，v2.0）。
- knowledge/canon-rules/adaptation-boundaries.json：原著与电影差异边界（10条已核验）。
## 三、文件结构与字段
- knowledge/novels/novel-01.json至novel-14.json：每部一本，按出版顺序编号：01皇家赌场1953、02生死关头1954、03月亮牌1955、04金刚钻1956、05来自俄罗斯的爱情1957、06诺博士1958、07金手指1959、08只为你的双眼1960短篇集、09霹雳弹1961、10爱我的间谍1962、11女王密使1963、12雷霆谷1964、13金枪人1965、14八爪女1966。每部含基本信息、完整章节目录、人物、组织、地点、装备、交通工具、通讯方式、任务目标、调查过程、关键线索、行动结果、关键事件前因后果、明确事实与推测的区别、原著与电影改编差异。
- knowledge/characters/index.json、organizations/index.json、locations/index.json、equipment/index.json：四类总索引，每项含appearances（出场小说清单）；去重后人物279、组织89、地点170、装备128。
- knowledge/resolution/：检索索引（aliases.json 258条别名、relationships.json 311对关系、timeline.json 14部时间线），见docs/DATA-SCHEMA.md第十二节。
- knowledge/timeline/index.json：14部时间线总索引。knowledge/events/index.json：事件总索引，189件，事件id为小说id加事件id。
- 事实七字段：source_novel（小说id）、chapter（章节号，保留原文形态）、entity（事实主体id）、fact（事实陈述）、timeline_position（故事内时间位置）、confidence（high、medium、low）、canon_or_inference（canon为原文明确事实，inference为合理推测）。引用原文只保留必要短句（每句不超过25个英文词）并记录章节。
## 四、三层约束（回答与维护的硬规则）
1. 先确认场景所处的小说与时间点，再取该时间点的人物状态与知识范围（见character-core.json中每位人物的timeline_cutoff与appearances）。
2. 回答只能用facts中canon_or_inference为canon的事实；inference必须标明是推测并给出依据；原文未写的事回答不知道，并可说明在知识库的哪一部、哪一章查过。
3. 人物死亡即终点：勒·希弗、薇丝朋·琳德、诺博士、金手指、布洛菲尔德、崔西·邦德死后不得在后续小说时间线中复活或对话。
4. 人物不知道自己不在场小说的内情，只能按听闻转述并注明来源。
5. 电影设定一律隔离：DB5、激光桌、太空情节、火山基地、潜艇、莲花跑车、诺博士归入幽灵党等电影独有元素不得当原著用。已核验差异见adaptation-boundaries.json；未核验的不得冒充已核对。
6. 原文内部矛盾不调和：如实记录两种说法并标明出处，不得擅自统一或修正。
## 五、验收（先做完再谈下一步）
1. 全量JSON校验（python3 -m json.tool逐本），报告非法文件数；再跑`npm run validate`（12项自动化验证）与`node scripts/retrieval-tests.js`（15条检索测试），报告通过/失败项。
2. 核对14部章节数与读取覆盖率，抽查20条事实（每部至少1条），在原文所引章节内逐字比对引用短句，逐条报通过或不通过。
3. 核对5组跨小说时间线：莱特出场6部、布洛菲尔德首登场霹雳弹、贝雷塔换瓦尔特、雷霆谷失忆接金枪人回归、布思罗伊德仅诺博士。
4. 验收报告先发给用户，网站不动。验收通过后才做下一步。
## 六、下一步（验收通过后）
- 把知识库接到网站对话层：用本库带出处的核验事实替换functions/_lib/knowledge.js与characters.js中仍标示例数据的内容（站上目前仍标示例数据·待TXT导入核验），三层约束按character-core、knowledge-control、adaptation-boundaries落地。
- 换版核对八爪女第4篇007 in New York，并补核7部未系统核对的电影差异（皇家赌场、生死关头、来自俄罗斯的爱情、只为你的双眼、霹雳弹、女王密使、八爪女）。
## 七、维护规则
- 修正事实：先读原文对应章节确认，再改对应novel JSON的facts条目（七字段齐全），同步更新相关总索引，修正后跑`npm run validate`（12项自动化验证，须全部通过）与`node scripts/retrieval-tests.js`（15条检索测试），并在docs/KNOWLEDGE-COVERAGE.md与docs/VALIDATION-REPORT.md中记录修正。
- 新增小说或换版核对：八爪女第4篇待换版核对——拿到新版后先核对全文是否含该篇，再补novel-14.json与相关索引，不得凭记忆补写。
- 新增人物：先确认该人物在原文中的首次登场章节与全名，再写入对应novel JSON的characters与总索引；别名以原文拼写为准。
- 新增改编差异：必须从原文对比确认后才写入adaptation-boundaries.json；未系统核对的只写本部未核对电影差异，不得冒充已核对。
- 去重规则：人物、组织、地点、装备按英文名归并；已确认的别名（M与海军上将迈尔斯·梅瑟维爵士、崔西·迪·维琴佐与特蕾莎·邦德、SIS与Secret Service、CIA与Central Intelligence Agency）已归并，其余别名变体合并前须经原文核对。
## 八、版权与提交
- 原始txt只作内部资料，绝不上传公开GitHub仓库；不要把14部小说全文复制进项目仓库或生成可下载的全文替代品。
- 引用原文仅保留必要的短句（每句不超过25个英文词），并记录出处。
- 知识库在GitHub：https://github.com/nequex-eng/007-intelligence-lab-knowledge（公开，直接读这个仓库）；网站仍走Pages直传。原始txt与Pages文件绝不进仓库，.gitignore已排除source/txt/、source/pages/与原始zip，只提交knowledge/与docs/。本地提交号170c3b1，GitHub提交号见仓库记录。
- 不要重部署网站，不要改public/、functions/与现有功能，不要新增付费模型API调用。
- 中文行文铁律：中文与英文字母、数字、符号之间一律不加空格，适用于全部中文文档与JSON里的中文文案，交付前自查。
## 九、已知缺口
- 八爪女第4篇007 in New York本版未见，待换版核对。
- 7部小说的电影差异未系统核对（皇家赌场、生死关头、来自俄罗斯的爱情、只为你的双眼、霹雳弹、女王密使、八爪女）。
- 组织、地点、装备去重只按英文名精确归并加少量已确认别名，其余别名变体可能仍有拆分；去重仍为下限口径。
- q的timeline_cutoff语义待确认：q从未以present登场（仅皇家赌场mentioned_only），其cutoff金枪人（1965年）不按最后出场小说解释。
- 事实entity字段存在10个不同主题词取值（coins、secatur、moonraker、train、zachary-smith、bomb、boneyard、note、sharks、disco-volante，共22处引用），非人物或组织id。
- 行数口径已解决（2026-11-06）：manifest.json各本lines字段原各多1行，已修正为与wc -l实测一致，总计18849行。
