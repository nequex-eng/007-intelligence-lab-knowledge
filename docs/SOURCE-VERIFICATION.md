# 007底本核验记录（SOURCE-VERIFICATION）

> 本文件为仓库内底本核验记录，由007-intelligence-lab工程内`source/bible.md`（圣经，内部底本核验记录）全文迁移而来，迁移日期2026-11-06。原`source/bible.md`不在本仓库内，`knowledge/canon-rules/adaptation-boundaries.json`原引用的`source/bible.md`已改指本文件。来源：`source/bible.md`，逐节注明。本文件只含核验结论、章节索引与事实出处，不含小说全文；原始txt与`.pages`文件按版权硬规则绝不进本仓库。
>
> 迁移说明：事实内容、数字、行号、人名与结论均照录`source/bible.md`原文，未改动；中文排版按现行中文行文总规则整理（中文与英文字母、数字、符号之间不加空格）。`source/bible.md`原文中指向网站工程的路径（`functions/_lib/characters.js`、`functions/_lib/knowledge.js`、`public/app.js`、`source/import-report.json`）照录并标注为工程侧文件，本仓库内无这些文件。
>
> 迁移注：第一节各本行数照录`source/bible.md`原文；经本次核查，`source/bible.md`行数与底本txt的`splitlines()`计数一致，`docs/SOURCE-INVENTORY.md`与`knowledge/manifest.json`中各本`lines`字段均比实测多1行（14本共多14行），而`manifest.json`的`total_lines`字段18849行与实测总行数一致；该口径差已报验证负责人复核，本文件不改数。

## 一、书目清单（14本，转换完成）

来源：`source/bible.md`第一节。

> 底本来源：用户提供的`007_0_64b6.zip`（16M，14个苹果Pages文件），已用soffice转txt存于本工程`source/txt/`，原始zip与`.pages`只作内部来源，绝不放进`public/`、绝不经API对外提供全文、绝不做公开阅读。
>
> 核验方法：分段grep核对，不一次把整本读进上下文。词数统计方法：python split()，与wc -w有数百词口径差，以本文件为准。
>
> 状态口径：本站前端仍标注“示例数据·待TXT导入核验”，本圣经中已核验的事实已同步写进`functions/_lib/characters.js`、`functions/_lib/knowledge.js`与`public/app.js`并标注“底本核验”；其余未核验内容继续标注示例。（以上为`source/bible.md`原文状态口径，所述同步目标为网站工程侧文件，本仓库不含这些文件。）

| 书名 | 首版 | 词数 | 行数 | 章节识别 | 状态 |
|---|---|---|---|---|---|
| 皇家赌场 | 1953年 | 50035 | 1359 | 27章（CHAPTER 1 - 标题格式） | 通过 |
| 生死关头 | 1954年 | 67850 | 1779 | 23章（CHAPTER I–XXIII） | 通过 |
| 月亮牌 | 1955年 | 73299 | 1586 | 25章（CHAPTER I–XXV） | 通过 |
| 金刚钻 | 1956年 | 70742 | 1613 | 25章（裸数字1-25+次行全大写标题，L7-L1521） | 通过 |
| 来自俄罗斯的爱情 | 1957年 | 80305 | 2971 | 28章（Chapter One格式） | 通过 |
| 诺博士 | 1958年 | 78288 | 1344 | 20章（罗马数字独占一行+次行标题） | 通过 |
| 金手指 | 1959年 | 85981 | 1506 | 23章（CHAPTER ONE–TWENTY-THREE） | 通过 |
| 只为你的双眼 | 1960年 | 62511 | 768 | 5篇故事（FROM A VIEW TO A KILL等，无章节编号） | 通过 |
| 霹雳弹 | 1961年 | 83612 | 1866 | 24章（数字加点标题1.-24.，首尾同名） | 通过 |
| 爱我的间谍 | 1962年 | 49227 | 615 | 3部15章（Part One: Me第1-6章、Part Two: Them第7-9章、Part Three: Him第10-15章） | 通过 |
| 女王密使 | 1963年 | 80727 | 1274 | 27章（裸数字1-27+次行标题，L6-L1242） | 通过 |
| 雷霆谷 | 1964年 | 66354 | 998 | 22章（裸数字1-22+次行全大写标题，分Part One、Part Two） | 通过 |
| 金枪人 | 1965年 | 49604 | 738 | 17章（裸数字1-17+次行标题，第1章数字在L1带BOM） | 通过 |
| 八爪女与黎明生死线 | 1966年 | 27755 | 432 | 3篇故事已确认（OCTOPUSSY等）；007 in New York本版0次，待换版核对 | 待复核 |

总词数926290。完整哈希、字节数见`source/import-report.json`（工程侧文件，本仓库无此文件；文件清单与哈希见本仓库`docs/SOURCE-INVENTORY.md`与`knowledge/manifest.json`）。通过13本，待复核1本（八爪女：已确认3篇故事，007 in New York本版未见，待换版核对）。

章节标题格式实测（14本不统一）：`CHAPTER 1 - 标题` / `CHAPTER ONE` / `Chapter One` / 罗马数字独占一行+次行标题（诺博士） / 数字+«标题»（霹雳弹部分章节） / 裸数字独占一行+次行标题（金刚钻、金枪人、女王密使、雷霆谷） / 数字加点标题（霹雳弹全部24章） / 三部+词数标题`One: …`（爱我的间谍） / 全大写故事标题（两部短篇集）。前端`detectChapters`已按此升级（含裸数字连续序列校验与词数标题）；0章的书不是没有章节，是本版txt转换后无统一标题行，章节索引待人工核对或换版，绝不编造章节数。（所述前端为网站工程侧，本仓库不含其代码。）

## 二、本轮纠正的4处错误（底本核验前为示例数据错误）

来源：`source/bible.md`第二节。以下4处均为底本核验后纠正的错误，纠正依据为底本原文检索。

1. **生死关头反派**：原写“史密斯先生”，错。底本核验：反派为Mr Big（大先生），护照名Gallia（生死关头）。已修正三处数据源。
2. **马提尼名言归属**：原写“shaken, not stirred出自皇家赌场”，错。底本核验：全库仅金刚钻第501行一句“The waiter brought the Martinis, shaken and not stirred, as Bond had stipulated”；皇家赌场中的是Vesper配方“Three measures of Gordon's, one of vodka, half a measure of Kina Lillet. Shake it very well until it's icecold”。已修正Bond档案。
3. **莱特出现作品**：原写4本（生死关头、金刚钻、金手指、霹雳弹），漏2本。底本全文检索提及次数：皇家赌场38次、生死关头157次、金刚钻88次、金手指15次、霹雳弹104次、金枪人37次，共6本；诺博士、月亮牌、来自俄罗斯的爱情、女王密使、雷霆谷为0次。已修正。
4. **M全名**：原标存疑。底本核验：金枪人开篇第19行“Admiral Sir Miles Messervy”（海军上将迈尔斯·梅瑟维爵士）。已修正为已核验。

## 三、已核验事实表（带出处）

来源：`source/bible.md`第三节。以下事实均已按底本核验，行号指出处均为底本txt行号。

- 邦德配枪换装：诺博士中Boothroyd（军械官）收缴贝雷塔.25手枪，改配瓦尔特手枪；Walther全库提及：诺博士5次、只为你的双眼3次、金手指2次、霹雳弹1次、女王密使3次、金枪人5次；PPK提及：诺博士2次、只为你的双眼2次、金手指2次、霹雳弹1次、女王密使2次、金枪人3次。
- 薇丝朋之死：皇家赌场末章，遗书自承苏联方面双面间谍并自杀（底本第1314行见遗体、第1330–1343行遗书、结尾电话“'Yes, dammit, I said "was". The bitch is dead now.'”）。
- 崔西之死：女王密使末尾第1266–1274行，婚后驾车途中被红色汽车（Maserati）枪击，邦德遗言“We've got all the time in the world.”；婚约见第1101–1102行（慕尼黑领事馆结婚）。
- 布洛菲尔德首次登场：霹雳弹（提及33次）；女王密使75次、雷霆谷48次、金枪人1次；此前各本0次。
- 诺博士与幽灵党：原著诺博士全文无SPECTRE一词（检索0次）；SPECTRE全库提及：霹雳弹25次、女王密使16次、爱我的间谍5次、金刚钻2次、雷霆谷1次。电影版把诺博士归入幽灵党是改编，不得混用。
- 金手指行动：诺克斯堡（Fort Knox）与OPERATION GRAND SLAM均在金手指底本中确认；奥德·约伯（Oddjob）提及76次。
- 塔蒂亚娜与克莱布：来自俄罗斯的爱情中Tatiana/Romanova提及109次，Klebb提及55次。
- 斯卡拉曼加：金枪人提及152次。雷霆谷中布洛菲尔德化名博士（Shatterhand）已确认在底本中出现。
- SMERSH提及：皇家赌场24次、来自俄罗斯的爱情54次、生死关头9次、金手指15次、霹雳弹6次、金刚钻2次、只为你的双眼1次、女王密使1次；其余为0次。

## 四、存疑与待核验清单

来源：`source/bible.md`第四节。以下内容未核验，按不知道处理，不得编造。

- 1本书章节索引待换版核对（八爪女：已确认3篇故事，007 in New York本版全文0次，是否缺第4篇待换版核对，不编造）。
- 生死关头、月亮牌章节数以本版txt识别为准（23章、25章），与常见版本章节数如有出入，以换版核对为准，不擅自改数。
- 诺博士背景“中国帮会与苏联方面”细节、塔蒂亚娜诱杀计划执行人名单、金手指合作方细节、崔西父亲全名等，仍标待TXT核验，按不知道处理。
- 各书中文译名采用通用译法，译名版本差异待用户确认。
- 人物首次登场年份与事件时间线以首版年份为准，小说内时间与出版时间如有出入，以底本为准逐步核对。

## 五、人物facts核验状态（12人）

来源：`source/bible.md`第五节。

- 已核验：邦德（配枪、马提尼、薇丝朋、崔西）、M（全名）、钱彭妮（基础事实）、Q（换装）、莱特（6本）、勒·希弗（皇家赌场）、诺博士（钢钳、蟹礁岛、非幽灵党）、金手指（诺克斯堡行动）、布洛菲尔德（首次登场霹雳弹）、薇丝朋（双面间谍、自杀）、塔蒂亚娜（诱杀计划）、崔西（结婚、遇害）。
- 以上facts中凡标“底本核验/底本第X行”者为已核验；凡标“待TXT核验”者仍为示例，按不知道处理。

## 六、第二阶段章节复核（2026-11-06）

来源：`source/bible.md`第六节。

方法：对8本待复核书逐本grep分段查标题形态，不一次读整本进上下文。试过的形态：`CHAPTER`（0命中，8本皆无）、`Chapter+词数/数字`（0命中）、罗马数字独占一行（0命中）、裸数字独占一行、数字加点标题、`«»`、全大写短行、`* * *`分节符、文件头40行。

逐本结论：

- 金刚钻：通过，25章。裸数字1-25连续（L7、L61、L115…L1520），次行皆全大写标题，第1章THE PIPELINE OPENS，第25章THE PIPELINE CLOSES。
- 只为你的双眼：通过，短篇集5篇故事，无章节编号。故事标题行：FROM A VIEW TO A KILL L1、FOR YOUR EYES ONLY L130、QUANTUM OF SOLACE L313、RISICO L383、THE HILDEBRAND RARITY L577；故事内无CHAPTER/编号结构。
- 金枪人：通过，17章。裸数字1-17连续，第1章数字在L1带BOM（`\ufeff1`），标题"Can I Help You?"在L2；第17章Endit在L698-699。
- 八爪女与黎明生死线：仍待复核。已确认3篇故事：OCTOPUSSY L1（带BOM）、THE LIVING DAYLIGHTS L160、THE PROPERTY OF A LADY L279；L368/L402两处全大写行经查是故事内拍卖品目录文字，不是标题。全文grep "New York" 0次，"007 in New York"本版未见，是否缺第4篇待换版核对。
- 女王密使：通过，27章。裸数字1-27连续（L6-L1242），次行标题混合大小写，第1章Seascape with Figures，第27章All the Time in the World。
- 爱我的间谍：通过，3部15章。Part One: Me第1-6章、Part Two: Them第7-9章、Part Three: Him第10-15章；标题格式为词数+冒号（One: Scaredy Cat … Fifteen: The Writing on My Heart），连续无缺。
- 霹雳弹：通过，24章。数字加点标题1.-24.连续（L5-L1834），全文件该格式恰好24行，无正文混入；首尾两章同名«Take It Easy, Mr. Bond»；`«»`在正文对话中出现643次，不能作章节判据。
- 雷霆谷：通过，22章。裸数字1-22连续（L20-L939），次行皆全大写标题，分Part One L17、Part Two L596两部；第21章标题为OBIT:；L324-329的"1. Deliriant…"是正文内毒物清单，不是章节，已排除。

本轮合计：通过7本，待复核从8本减至1本；全库通过13本、待复核1本。`import-report.json`与`functions/_lib/knowledge.js`的chapters字段已同步更新；`public/app.js`的`detectChapters`已升级为家族择优（CHAPTER/数字加点/裸数字/罗马数字/词数标题五族各计，取章数最多一族，数字加点与裸数字家族须1..N连续），并经node桩测试14本全过——初版曾把霹雳弹误判为5章（只认«»引号开头），放宽数字加点并加家族择优后24章全对，且雷霆谷正文内毒物清单1.-6.未混入。（所述`import-report.json`、`functions/_lib/knowledge.js`、`public/app.js`均为网站工程侧文件，本仓库无这些文件；本仓库章节目录见`docs/SOURCE-INVENTORY.md`与各部`knowledge/novels/novel-*.json`的`chapters`字段。）

## 七、本文件与仓库其他记录的关系

- 文件清单、字节数、哈希与逐本章节目录见`docs/SOURCE-INVENTORY.md`与`knowledge/manifest.json`；本文件不重复哈希明细。
- 各部事实、章节定位与原文短句见`knowledge/novels/novel-01.json`至`novel-14.json`；本文件第三节的已核验事实是这些事实的底本核验依据，不替代事实本身。
- 原著与电影改编差异边界见`knowledge/canon-rules/adaptation-boundaries.json`，其中AB-01与AB-02的证据指向本文件第二、三节对应条目。
- 已知缺口（八爪女第4篇待换版核对、7部电影差异未系统核对）与`docs/CANON-ARCHITECTURE.md`第五节一致。
