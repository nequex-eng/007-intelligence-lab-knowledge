# 正典架构（CANON-ARCHITECTURE）

> 内部资料。知识库来源：14部Ian Fleming原著逐部阅读抽取，底本为用户提供的007_0_64b6.zip（14个苹果Pages文件）经LibreOffice转txt。原始txt只作内部资料，绝不上传公开仓库；知识库只含原创整理的结构化知识、事实索引、章节定位、人物关系与简明摘要。

## 一、目录结构

```
knowledge/
  manifest.json              # 14部清单：书名、文件、大小、编码、sha256、章节数、完整性
  novels/
    novel-01.json            # 皇家赌场（1953年）
    novel-02.json            # 生死关头（1954年）
    ...
    novel-14.json            # 八爪女（1966年，3篇故事）
  characters/index.json      # 人物总索引（去重后283人）
  organizations/index.json   # 组织总索引（去重后93个）
  locations/index.json       # 地点总索引（去重后177处）
  equipment/index.json       # 装备总索引（去重后134项）
  timeline/index.json        # 时间线总索引（14部）
  events/index.json          # 事件总索引（189件）
  canon-rules/
    character-core.json      # 第一层：Character Core（12位站上人物）
    knowledge-control.json   # 第三层：Scene & Knowledge Control（10条规则）
    adaptation-boundaries.json # 原著与电影改编差异边界（10条已核验）
```

## 二、三层知识约束

### 第一层：Character Core

文件：knowledge/canon-rules/character-core.json。12位站上人物（邦德、M、钱彭妮、Q、费利克斯·莱特、勒·希弗、诺博士、金手指、布洛菲尔德、薇丝朋·琳德、塔蒂亚娜·罗曼诺娃、崔西·迪·维琴佐），每人含固定身份、性格、经历、语言风格、行为边界、出场小说清单与timeline_cutoff。

### 第二层：Canon Retrieval

检索单位是knowledge/novels/novel-XX.json。每部含完整章节目录、人物、组织、地点、装备、交通工具、通讯方式、任务目标、调查过程、关键线索、行动结果、关键事件前因后果、明确事实与推测的区别、原著与电影改编差异。每条事实含七字段：source_novel、chapter、entity、fact、timeline_position、confidence、canon_or_inference。回答必须能追溯到具体作品与章节。

### 第三层：Scene & Knowledge Control

文件：knowledge/canon-rules/knowledge-control.json，共10条规则：时间截断、死亡即终点、在场原则、状态按时间点分别记录、电影设定隔离、事实与推测分开、出处可追溯、原文内部矛盾不调和、不知道就说不知道、Q与布思罗伊德。

## 三、字段说明

- source_novel：小说id，如casino-royale、dr-no。
- chapter：章节号（长篇）或篇序号（短篇集第1-5篇、第1-3篇）。章节号形态按原文：阿拉伯数字、罗马数字、词数（One、Two）均保留原文形态。
- entity：事实主体人物或组织id。
- fact：事实陈述（中文）。
- timeline_position：故事内时间位置，如1953年；原文未写明年份的写未注明年份或标inference，不强行定年。
- confidence：high、medium、low。
- canon_or_inference：canon为原文明确写出的事实，inference为合理推测，必须标明依据。
- quote：必要原文短句，每句不超过25个英文词；quote_source为章节出处。

## 四、编号规则

- 小说编号按出版顺序：01皇家赌场1953、02生死关头1954、03月亮牌1955、04金刚钻1956、05来自俄罗斯的爱情1957、06诺博士1958、07金手指1959、08只为你的双眼1960短篇集、09霹雳弹1961、10爱我的间谍1962、11女王密使1963、12雷霆谷1964、13金枪人1965、14八爪女1966短篇集。
- 事件id为小说id加事件id，如thunderball:nuclear-blackmail。
- 人物id为英文名小写连字符，如felix-leiter、tatiana-romanov。

## 五、已知缺口

- 八爪女本版只含3篇故事，第4篇007 in New York全文0次出现，是否缺篇待换版核对，绝不编造。novel-14.json中reading.coverage_note已记录。
- 7部小说的电影差异未系统核对（皇家赌场、生死关头、来自俄罗斯的爱情、只为你的双眼、霹雳弹、女王密使、八爪女），各部novel JSON中只写本部未核对电影差异；adaptation-boundaries.json只收已核验的10条。
- 组织与地点去重只按英文名精确归并，别名变体可能仍有拆分，见KNOWLEDGE-COVERAGE.md。
