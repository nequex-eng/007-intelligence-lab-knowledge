# 007 INTELLIGENCE LAB知识库

基于Ian Fleming 14部007原著逐部阅读建成的结构化知识库，供ChatGPT独立接管007情报世界对话层使用。

## 底本与规模

- 底本：用户提供的007全本txt（14个Pages文件转出），总计926290词、5073306字符、18849行，284个章节/故事单位，覆盖率100%。
- 实体总数：人物283、组织93、地点177、装备134、事件189、事实773条（762条原著事实、11条推测）。
- 每条事实含七字段：source_novel、chapter、entity、fact、timeline_position、confidence、canon_or_inference，均可追溯到具体作品与章节。

## 入口

先读[docs/CHATGPT-HANDOVER.md](docs/CHATGPT-HANDOVER.md)，再读以下文档：

- [docs/SOURCE-INVENTORY.md](docs/SOURCE-INVENTORY.md)：14部清单（书名、文件、大小、编码、sha256、章节目录、完整性）。
- [docs/CANON-ARCHITECTURE.md](docs/CANON-ARCHITECTURE.md)：目录结构、三层约束、字段说明、编号规则。
- [docs/CHARACTER-INDEX.md](docs/CHARACTER-INDEX.md)：人物索引（去重后283人）。
- [docs/TIMELINE.md](docs/TIMELINE.md)：时间线（出版顺序为主轴，故事内年份以原文为准）。
- [docs/KNOWLEDGE-COVERAGE.md](docs/KNOWLEDGE-COVERAGE.md)：覆盖率、实体总数、20条事实抽查、5组跨小说抽查、已知局限。
- [docs/CHATGPT-ONECLICK.md](docs/CHATGPT-ONECLICK.md)：给ChatGPT的一键接管指令。

## 文件结构

- knowledge/manifest.json：14部清单机器可读版。
- knowledge/novels/novel-01.json至novel-14.json：每部一本，按出版顺序编号（01皇家赌场1953至14八爪女1966）。
- knowledge/characters/index.json、organizations/index.json、locations/index.json、equipment/index.json：四类总索引。
- knowledge/timeline/index.json：14部时间线总索引。knowledge/events/index.json：事件总索引，189件。
- knowledge/canon-rules/：三层约束：character-core.json（人物固定身份与行为边界）、knowledge-control.json（场景与知识控制，10条规则）、adaptation-boundaries.json（原著与电影差异边界，10条已核验）。

## 硬规则

- 回答只能用canon事实；inference必须标明是推测并给出依据；原文未写的事回答不知道。
- 人物死亡即终点，不得在后续小说时间线中复活或对话。
- 电影设定一律隔离：DB5、激光桌、太空情节、火山基地、潜艇、莲花跑车等电影独有元素不得当原著用。
- 原文内部矛盾不调和：如实记录两种说法并标明出处。

## 版权

原始txt只作内部资料，绝不进本仓库；本仓库只含原创整理的结构化知识、事实索引、章节定位、人物关系与简明摘要，不含小说全文。引用原文仅保留必要短句（每句不超过25个英文词）并记录出处。

## 已知缺口

- 八爪女第4篇007 in New York本版未见，待换版核对。
- 7部小说的电影差异未系统核对（皇家赌场、生死关头、来自俄罗斯的爱情、只为你的双眼、霹雳弹、女王密使、八爪女）。
- 去重为下限口径，别名变体可能仍有拆分。

## 验收

本地提交号170c3b1。验收步骤见docs/CHATGPT-HANDOVER.md与docs/KNOWLEDGE-COVERAGE.md：全量JSON校验、20条事实抽查（20/20通过）、5组跨小说时间线抽查（均无冲突）。
