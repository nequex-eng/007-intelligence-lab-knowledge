# 验证报告（VALIDATION-REPORT）

> 本文件为知识库验证工作的记录文件。“重复ID处理记录”一节由实体去重负责人写入（2026-11-06）；其他节留待后续负责人补充。本文件只写已验证的内容，未验证的内容不写。

## 重复ID处理记录（实体去重负责人，2026-11-06）

### 处理前后总览

- 处理前：四类索引共687条，重复id共19个（人物4个、组织2个、地点6个、装备7个），多余条目18条。
- 处理后：四类索引共669条，重复id共0个；16个合并、3个拆分。
- 条数变化：人物283条→280条；组织93条→91条；地点177条→170条；装备134条→128条。
- total_unique字段已随条数同步更新；每条合并后条目的appearance_count均按合并后appearances重算并逐条校验一致。
- 任务书所列为17个重复id（另加blades，共18个），实测为19个：任务书分项所列人物4个、组织2个、地点5个（不含blades）、装备7个，不含blades已是18个，加blades为19个。以实测为准。
- events/index.json与timeline/index.json中未发现对上述重复id的精确引用，无需改动；character-core.json与canon-rules文件未动。
- 小说JSON同步改动仅3处id改名：novel-09.json中molony→sergeant-molony；novel-06.json中cipher-machine→russian-cipher-machine；novel-14.json中cyanide-pistol→cyanide-water-pistol。其余合并均保留原id，小说JSON无需改动；facts的entity字段中上述拆分id均未出现（molony的facts只在novel-06，主体为詹姆斯·莫洛尼爵士；cipher-machine与cyanide-pistol无facts引用）。
- 核查方法：每个重复id均以grep在相关小说txt原文中定位出现位置与上下文，按小说JSON章节起始行换算章节号；章节号形态保留原文（阿拉伯数字、罗马数字、英文词数均有）。

### 逐条判定表

| 原id | 判定 | 合并后id或新id | 依据章节与原文关键词 |
|---|---|---|---|
| chief-of-staff | 同一实体合并 | chief-of-staff（定名Bill Tanner，比尔·坦纳） | casino-royale第3章，邦德称参谋长为Bill；diamonds-are-forever第3章，tell me this,Bill；dr-no第III章，参谋长为工兵上校、邦德在总部最好的朋友；man-with-golden-gun第2章，Bill Tanner；you-only-live-twice第3章，Bill Tanner,late Colonel Tanner of the Sappers |
| molony | 不同实体拆分 | molony（詹姆斯·莫洛尼爵士，留原id）；新id sergeant-molony（莫洛尼军士） | dr-no第II章，Sir James Molony，圣玛丽医院神经科医生；thunderball第14章，Sergeant Molony of the Harbor Police，巴哈马港务警察军士。两人身份、地点均不同 |
| solitaire | 同一实体合并 | solitaire（定名Simone Latrelle，西蒙娜·拉特雷尔） | live-and-let-die第XVII章，Strangways提及Solitaire；dr-no第VII章，邦德回忆the girl he had brought back,torn and bleeding,from that sea，即生死关头寻宝案中从海中救回的同一姑娘 |
| strangways | 同一实体合并 | strangways（定名Commander John Strangways，约翰·斯特兰威斯） | live-and-let-die第XVI章，chief Secret Service agent for the Caribbean；dr-no第I章，Commander John Strangways,Regional Control Officer for the Caribbean；dr-no第III章，worked with him on that treasure business about five years ago，即生死关头寻宝案 |
| spangled-mob | 同一实体合并 | spangled-mob（定名The Spangled Mob，斯班格帮） | diamonds-are-forever第6章，joint controller of the 'Spangled Mob'，斯班格兄弟共管；goldfinger第SEVENTEEN章，Mr Jack Strap of the Spangled Mob，inherited from the late lamented brothers Spang；man-with-golden-gun第3章，full-time gunman for The Spangled Mob，Tiara Hotel掩护，与金刚钻中Seraffimo经营的Tiara为同一组织 |
| nato | 同一实体合并 | nato（定名North Atlantic Treaty Organization，北大西洋公约组织） | casino-royale第2章，North Atlantic Treaty Organization；thunderball第7章，NATO training flight，同一组织全称与简称 |
| new-york | 同一实体合并 | new-york（定名New York，纽约） | 同一城市，live-and-let-die、diamonds-are-forever、dr-no、goldfinger四部中的纽约，Idlewild机场等地点一致，无证据表明为不同城市 |
| nassau | 同一实体合并 | nassau（定名Nassau，拿骚） | 同一城市，live-and-let-die、goldfinger、for-your-eyes-only、thunderball四部中的拿骚 |
| london-hq | 同一实体合并 | london-hq（定名Secret Service Headquarters,Regent's Park,London，伦敦摄政公园秘密情报局总部） | dr-no第I章，the building in Regent's Park that is the headquarters of the Secret Service；goldfinger，the tall building in Regent's Park；thunderball，the big square building，八楼顶层；man-with-golden-gun第3章，M由Blades返回Regent's Park总部。五部同为摄政公园同一总部 |
| hotel-splendide | 同一实体合并 | hotel-splendide（定名Hôtel Splendide，Splendide酒店） | casino-royale第1章，Hôtel Splendide，电文BOND SPLENDIDE ROYALELESEAUX，45号房；on-her-majestys-secret-service第2章，the Hotel Splendide，第3章The number is 45。同为Royale镇同一酒店，45号房相同。两条fictional标注不一致（true/false），统一为true：Royale-les-Eaux为虚构小镇 |
| blades | 同一实体合并 | blades（定名Blades，布莱兹俱乐部） | moonraker第III章，Blades沿革，Park Street，1778年首见Blades之名；man-with-golden-gun第3章，M在Blades午餐，Porterfield；you-only-live-twice第2章，Blades年关，Porterfield。同为伦敦圣詹姆斯区同一俱乐部 |
| miami | 同一实体合并 | miami（定名Miami，迈阿密） | 同一城市，goldfinger开篇地与thunderball第二枚核弹预定目标 |
| luger | 同一型号合并 | luger（定名Luger，鲁格手枪） | 同型手枪，非同一支实物：moonraker第IX章，无编号Luger；goldfinger第TWENTY-THREE章，死去守卫肩套中的Luger；for-your-eyes-only第1篇杀手配枪，第4篇Colombo手下人人配Luger。装备索引按型号归并 |
| beretta-25 | 同一实物合并 | beretta-25（定名.25 Beretta automatic，点25贝雷塔自动手枪） | 同一支枪：diamonds-are-forever第6章，the .25 Beretta automatic，the new gun M had given him；dr-no第II章，I've used the .25 Beretta for fifteen years，同章M收缴 |
| colt-45 | 同一型号合并 | colt-45（定名.45 Colt，点45柯尔特手枪） | 同型手枪，非同一支实物：diamonds-are-forever第14章，Gun looked like a .45.Might have been a Colt；goldfinger第SEVEN章，a long-barrelled Colt .45 in a trick compartment under the driver's seat；for-your-eyes-only第1篇，the long-barrel .45 Colt。装备索引按型号归并 |
| sniperscope | 同一型号合并 | sniperscope（定名Sniperscope，红外瞄准镜） | 同型红外瞄准镜：from-russia-with-love第Nineteen章，Sniperscope.German model.Infrared lens；octopussy第2篇，an infrared sniperscope fixed above his rifle，五百码靶场。装备索引按型号归并 |
| cipher-machine | 不同实体拆分 | cipher-machine（霹雳弹Triple X密码机，留原id）；新id russian-cipher-machine（诺博士的俄国密码机） | dr-no第XVI章，they have even given us a cipher machine，莫斯科提供给诺博士的密码机与专用频率，另有监听员持副本；thunderball第8章，Take a cipher machine with the Triple X setting，邦德自带Triple X密码机，另有莱特的中情局密码机。分属不同系统、不同持有方，非同型设备 |
| benzedrine | 同一实体合并 | benzedrine（定名Benzedrine，苯丙胺） | 同种药物：spy-who-loved-me第Eleven章，Benzedrine.That'll keep me awake for tonight；you-only-live-twice第13章，benzedrine tablets列入忍者装备 |
| cyanide-pistol | 不同实体拆分 | cyanide-pistol（金枪人克格勃氰化物球形枪托手枪，留原id）；新id cyanide-water-pistol（八爪女第3篇论文所述氰化物气水枪） | man-with-golden-gun第2章，the bulb-butted pistol，克格勃给邦德的刺杀武器，喷黏稠棕色氰化物液体；octopussy第3篇，the cheapest bulb-handled children's water pistol喷射氰化物气，仅见于科研站论文所述，未在故事中作为实物出现。构造不同（黑金属短鼻球形枪托手枪与廉价球柄儿童水枪），存在状态不同 |

### 改动文件清单

- knowledge/characters/index.json：合并3个（chief-of-staff、solitaire、strangways），拆分1个（molony→sergeant-molony），total_unique 283→280。
- knowledge/organizations/index.json：合并2个（spangled-mob、nato），total_unique 93→91。
- knowledge/locations/index.json：合并6个（new-york、nassau、london-hq、hotel-splendide、blades、miami），total_unique 177→170。
- knowledge/equipment/index.json：合并5个（luger、beretta-25、colt-45、sniperscope、benzedrine），拆分2个（cipher-machine→russian-cipher-machine、cyanide-pistol→cyanide-water-pistol），total_unique 134→128。
- knowledge/novels/novel-06.json：equipment中cipher-machine改id为russian-cipher-machine（1处）。
- knowledge/novels/novel-09.json：characters中molony改id为sergeant-molony（1处）。
- knowledge/novels/novel-14.json：equipment中cyanide-pistol改id为cyanide-water-pistol（1处）。
- docs/VALIDATION-REPORT.md：新建，本节。

### 未动事项（留待后续负责人）

- README.md与docs/CANON-ARCHITECTURE.md、docs/CHARACTER-INDEX.md、docs/CHATGPT-HANDOVER.md、docs/CHATGPT-ONECLICK.md、docs/KNOWLEDGE-COVERAGE.md中所写的283/93/177/134总数已过时（应为280/91/170/128），本次未改，留待文档负责人同步。
- 全库交叉核查发现29处与本次重复id无关的既有悬空引用：小说JSON所用id在四类索引中不存在，如sis（novel-03、novel-04、novel-06、novel-07、novel-08、novel-10、novel-13、novel-14组织）、leiter（novel-09人物）、tanner（novel-13人物）、james-bond（novel-10人物）、james-molony（novel-12人物）、miss-moneypenny（novel-14人物）、tracy-draco（novel-12人物）、ronnie-vallance（novel-04人物）、london-target（novel-03地点）、colt-army-special-45（novel-03装备）、harpoon-gun（novel-08装备）、heel-knife（novel-11装备）及若干relationships的with引用（spang-brothers、abc等）。均为本次改动前已存在，本次未动，留待另行处理。
- 组织与地点索引无aliases字段：spangled-mob的中文异译花斑帮、nato的简称北约等名称变体已在本表记录，未另建字段。

> 同步注记（检索与验收负责人，2026-11-06）：本节第一条所列过时总数文档已由本次同步——README.md、docs/CANON-ARCHITECTURE.md、docs/CHARACTER-INDEX.md、docs/CHATGPT-HANDOVER.md、docs/CHATGPT-ONECLICK.md、docs/KNOWLEDGE-COVERAGE.md现均为279/89/170/128（验证期又并入3组后，A路所写280/91已再变，见本报告修复前后数据对比）；第二条所列29处悬空引用实测为23处数组/关系引用（14个不同id）加16处事实entity引用，已全部经knowledge/resolution/aliases.json解析，见本报告悬空引用处理一节。

## 验证方法与范围（检索与验收负责人，2026-11-06）

- 验证命令：`npm run validate`（入口scripts/validate.js，Node零依赖）与`node scripts/retrieval-tests.js`；均在仓库根目录运行，退出码通过为0、不通过为非0。
- 章节号形态：阿拉伯数字、罗马数字、英文词数混用，按各小说chapters的no实际值比对，不换算。
- 底本复核：事实修正逐条对照~/workspace/007-intelligence-lab/source/txt/原文（只读）核对；quote须为原文逐字子串、落在其事实章节内、每句不超过25个英文词。
- 行数口径复核（C路移交问题）：`wc -l`逐本实测与`splitlines()`计数一致，总计18849行；manifest.json各本lines字段原各多1行（14本共多14行），total_lines字段18849行原已正确。本次已将manifest.json各本lines减1（1359/1779/1586/1613/2971/1344/1506/768/1866/615/1274/998/738/432），求和18849行与total_lines一致；docs/SOURCE-INVENTORY.md第二表行数列同步各减1。novel-01.json至novel-14.json的lines字段原已正确，未动。docs/SOURCE-VERIFICATION.md第一节行数原已正确，未动。

## 自动化验证结果（2026-11-06）

`npm run validate`完整输出（退出码0）：

```
[PASS] 1 所有JSON可解析 — 27个JSON，失败0个
[PASS] 2 所有实体ID唯一 — 人物279、组织89、地点170、装备128、事件189、核心人物32；重复：无
[PASS] 3 aliases无错误冲突 — 258条别名，歧义3条；问题：无
[PASS] 4 所有事实字段完整 — 共773条（canon 762、inference 11），quote非空771条（99.7%）、quote_source非空771条，全书级留空2条（dr-no#59/#60）；问题：无
[PASS] 5 所有章节引用有效 — 事实/事件/人物出场章节均按各部chapters的no实际值比对（不换算）；问题：无
[PASS] 6 所有文件引用真实存在 — manifest 14部均有对应novel文件；canon-rules仓库内引用存在；底本txt引用14处为仓库外底本（预期不在仓库内，不计失败）；问题：无
[PASS] 7 人物核心字段完整度统计 — appearance 31/32（97%）；age_clues 31/32（97%）；personality 31/32（97%）；habits 31/32（97%）；background 32/32（100%）；relationships 31/32（97%）；voice_style 32/32（100%）；behavioral_boundaries 32/32（100%）；knowledge_boundaries 32/32（100%）；knowledge_scope 32/32（100%）；sources 32/32（100%）；timeline_cutoff 32/32（100%）
[PASS] 8 三层人物约束数据结构有效 — character-core v2.0共32人、knowledge-control v2.0共10条规则、adaptation-boundaries已核验10条；问题：无
[PASS] 9 人物关系双向检索 — 共311对人物关系，任一端检索均可返回对方；问题：无
[PASS] 10 人物时间线与知识边界无明显前后矛盾 — 32位核心人物死后未复活、timeline.json状态集合与knowledge_scope一致；提醒：q从未present（仅皇家赌场mentioned_only），timeline_cutoff（金枪人（1965年））不按最后出场小说解释，语义待确认；问题：无
[PASS] 11 同名实体可准确区分 — molony（爵士）与sergeant-molony（军士）、jack-spang与seraffimo-spang、cipher-machine与russian-cipher-machine、cyanide-pistol与cyanide-water-pistol均可区分，歧义别名返回候选清单；问题：无
[PASS] 12 不同小说角色与事件不串线 — 事件双向一致189件；出场交叉核查人物349、组织142、地点204、装备148条，全部落在对应小说；问题：无

验证结果：12/12项通过
```

第7项说明：31/32的5个字段缺失项全部集中于q一人（appearance、age_clues、personality、habits、relationships均为null），B路已在character-core.json的note中说明原因（Q在原著中几乎不存在，仅皇家赌场第3章提及一次，无从可据），非本次遗漏。

## 修复前后数据对比

| 指标 | 修复前（本次开工时） | 修复后（2026-11-06） | 说明 |
|---|---|---|---|
| 重复id数 | 0 | 0 | A路已清零（处理前19个）；本次验证期又发现3组漏并（见下），已合并 |
| 人物总数 | 280 | 279 | bill-tanner并入chief-of-staff（同名同姓，见验证期新发现） |
| 组织总数 | 91 | 89 | british-secret-service并入secret-service；detroit-purple-gang并入purple-gang |
| 地点总数 | 170 | 170 | 未变 |
| 装备总数 | 128 | 128 | 未变 |
| 核心人物数 | 32 | 32 | B路v2.0，未变 |
| 事实总数 | 773 | 773 | 未变 |
| quote覆盖率 | 725/773（93.8%） | 771/773（99.7%） | 补录46条皇家赌场quote与1条八爪女替换quote；仅dr-no#59/#60全书级事实留空 |
| quote_source覆盖率 | 725/773（93.8%） | 771/773（99.7%） | 同上；仅dr-no#59/#60留空 |
| 悬空引用（数组/关系） | 23处（14个不同id） | 0处 | 全部经knowledge/resolution/aliases.json解析 |
| 事实entity引用（经别名解析） | 16处引用（6个不同id） | 0处未解析 | james-bond、leiter等16处经别名解析；另有10个不同主题词entity取值（22处引用）见尚未解决问题 |
| 断链引用数 | 23处 | 0处 | 与悬空引用同口径 |
| 人物字段完整度（核心人物） | 未计量（B路未留基线） | 见第7项统计 | 本次为首次计量；除q外全部字段齐全 |
| 霹雳弹章节目录start_line错位 | 第18–21章整体错位一位，第21与第22章重复1700 | 已修正（1444/1512/1592/1656/1700），严格递增 | C路fact-fixes 4条 |
| manifest各本行数 | 各多1行（合计多14行） | 与wc -l实测一致 | 各减1，total_lines 18849行未动 |

## fact-fixes应用记录（/tmp/fact-fixes.json，137条）

应用结果总账：137条中有建议值的85条全部应用（抽查方法见下）；无建议值的52条中47条已应用（皇家赌场补录quote 46条、八爪女替换quote 1条），1条复核后不改动（女王密使#22），4条按全书级事实留空（诺博士#59/#60的quote与quote_source各2条）。另有复核追加修正7条（137条之外，见本节末）。

抽查方法（有建议值的85条）：20条chapter修正中18条以修正前quote在底本中的落行直接验证（落入建议章节），其余2条以修正后quote验证（生死关头#39修正后quote在第985行落入第XII章；金刚钻#46 quote在第1348行落入第22章）；4条quote纠错逐字验证均在底本命中且旧写法无命中；4条start_line以底本标题行验证；46条皇家赌场quote_source建议值（C路注明为按chapter字段机械推导）逐条以补录quote的落行复核，其中3条推导有误已纠正（#11、#26、#47，见复核追加）。

### chapter修正20条（旧→新）

| 小说 | fact_index | 旧 | 新 | 复核依据（quote落行） |
|---|---|---|---|---|
| live-and-let-die | 39 | XI | XII | 修正后quote在第985行，第XII章起始行915 |
| live-and-let-die | 54 | XVII | XVI | quote在第1305行，第XVI章起始行1247 |
| live-and-let-die | 58 | XVIII | XVI | quote在第1308行，第XVI章起始行1247 |
| moonraker | 40 | XX | XXI | quote在第1236行，第XXI章起始行1223 |
| moonraker | 43 | XXII | II | quote在第113行，第II章起始行75 |
| diamonds-are-forever | 46 | 23 | 22 | quote在第1348行，第22章起始行1279；第23章起始行1360 |
| dr-no | 21 | VI | VII | quote在第447行，第VII章起始行410 |
| dr-no | 22 | VI | VII | quote在第415行，第VII章起始行410 |
| goldfinger | 50 | TWENTY | NINETEEN | quote在第1292行，第NINETEEN章起始行1236 |
| thunderball | 2 | 2 | 1 | quote在第53行，第1章起始行5 |
| thunderball | 23 | 8 | 7 | quote在第509行，第7章起始行439 |
| thunderball | 34 | 11 | 15 | quote在第1256行，第15章起始行1188 |
| thunderball | 46 | 20 | 19 | quote在第1586行，第19章起始行1512（按修正后start_line） |
| spy-who-loved-me | 9 | Three | Four | quote在第95行，第Four章起始行73 |
| spy-who-loved-me | 20 | Seven | One | quote在第16行，第One章起始行10 |
| on-her-majestys-secret-service | 8 | 4 | 3 | quote在第127行，第3章起始行82 |
| on-her-majestys-secret-service | 9 | 5 | 4 | quote在第170行，第4章起始行129 |
| you-only-live-twice | 12 | 7 | 6 | quote在第299行，第6章起始行265 |
| you-only-live-twice | 13 | 7 | 6 | quote在第299行，第6章起始行265 |
| you-only-live-twice | 55 | 1 | 6 | quote在第287行，第6章起始行265 |

### quote_source修正11条（跨章节错，与chapter同错）

live-and-let-die#54（第XVII章→第XVI章）、moonraker#40（第XX章→第XXI章）、moonraker#43（第XXII章→第II章）、diamonds-are-forever#46（第23章→第22章）、goldfinger#50（第TWENTY章→第NINETEEN章）、thunderball#2（第2章→第1章）、spy-who-loved-me#9（第Three章→第Four章）、spy-who-loved-me#20（第Seven章→第One章）、you-only-live-twice#12（第7章→第6章）、you-only-live-twice#13（第7章→第6章）、you-only-live-twice#55（第1章→第6章）。以上均与同条chapter修正同依据。

### quote纠错4条（旧→新，底本逐字）

| 小说 | fact_index | 旧 | 新 | 底本落行 |
|---|---|---|---|---|
| live-and-let-die | 13 | He did not drink or smoke | He didn't drink or smoke | 第134行 |
| live-and-let-die | 39 | It is an ouanga, a Voodoo fetish | It's an ouanga, a Voodoo fetish | 第985行 |
| live-and-let-die | 40 | It is called The Sunshine City | It's called "The Sunshine City" | 第929行 |
| from-russia-with-love | 9 | act of terrorism in enemy territory | a conspicuous act of terrorism to be carried out in enemy territory | 第326行 |

### 皇家赌场补录quote 46条（逐字原文短句，均不超过25词，落行与章节已逐条验证）

| fact_index | 章节 | quote（底本逐字） | 底本落行 |
|---|---|---|---|
| 1 | 1 | slip his right hand under the pillow until it rested under the butt of the .38 Colt Police Positive with the sawn barrel | 45 |
| 3 | 1 | through a taciturn man who was head of the picture desk on the Daily Gleaner, the famous newspaper of the Caribbean | 27 |
| 4 | 2 | In January 1946, Le Chiffre bought control of a chain of brothels, known as the Cordon Jaune | 58 |
| 5 | 2 | on 13 April, there was passed in France Law No. 46685 entitled Loi Tendant à la Fermeture des Maisons de Tolérance | 61 |
| 6 | 2 | First encountered as a displaced person, inmate of Dachau DP camp in the US Zone of Germany, June 1945. | 92 |
| 7 | 2 | Height 5 ft 8 ins. Weight 18 stones. Complexion very pale. Cleanshaven. Hair redbrown, 'en brosse'. | 94 |
| 9 | 2 | with a strength of 50,000, capable in time of war of controlling a wide sector of France's northern frontier | 82 |
| 10 | 2 | on or after 15 June to make a profit at baccarat of fifty million francs | 80 |
| 11 | 9 | the corpses of a Japanese cipher expert in New York and a Norwegian double agent in Stockholm to thank for being a Double 0 | 399 |
| 12 | 3 | Up to twentyfive million, the same as him. We'll start you on ten and send you another ten when you've had a look round. | 148 |
| 13 | 3 | in the Casino in Monte Carlo for two months before the war watching that Roumanian team work their stuff with the invisible ink | 139 |
| 14 | 4 | is suspended a very powerful radio pickup. The wires run up the chimney to behind the Muntzes' electric fire where there is an amplifier. | 182 |
| 15 | 4 | Bond noticed that he had turned the volume on to full and that the red light indicating the long waveband was illuminated | 175 |
| 16 | 4 | she is a wireless expert which, though sexually less interesting, makes her a perfect employee of Radio Stentor and assistant to myself | 192 |
| 17 | 5 | One of the last of the 4½litre Bentleys with the supercharger by Amherst Villiers, he had bought it almost new in 1933 | 219 |
| 18 | 5 | Her hair was very black and she wore it cut square and low on the nape of the neck | 231 |
| 19 | 6 | Clearly the bomb was intended for you. It must have been faulty. | 266 |
| 21 | 7 | It turned out that Leiter was from Texas. While he talked on about his job with the Joint Intelligence Staff of NATO | 322 |
| 23 | 8 | He then took from under his shirts in another drawer a very flat .25 Beretta automatic with a skeleton grip | 337 |
| 24 | 9 | I'm personal assistant to Head of S. | 397 |
| 25 | 9 | He paid a million francs for it and his capital has been reduced to twentyfour million. | 412 |
| 26 | 11 | They were a four and a five — an unbeatable nine. | 488 |
| 27 | 11 | In two coups he had lost twelve million francs. | 521 |
| 29 | 12 | His momentum tipped the crossbar of the chairback down so quickly that it cracked across the malacca tube | 583 |
| 31 | 13 | In all there was over seventy million francs. | 648 |
| 32 | 14 | Bond knew he would find Vesper's evening bag among the flowers. | 700 |
| 33 | 15 | Then the revolutions mounted until he was past 110 and on to the 120 mph mark on the speedometer. | 718 |
| 34 | 16 | they had been waiting for the third man to retrieve the carpet of spiked chainmail | 761 |
| 35 | 17 | It struck again and again so that Bond screamed and his body jangled in the chair like a marionette. | 835 |
| 36 | 17 | All the furniture has been taken to pieces and your clothes and the curtains and bedclothes have been cut up. | 842 |
| 38 | 18 | Blood in the shape of an inverted 'M' welled out and slowly started to drip on to the floor. | 902 |
| 39 | 19 | During the next two days James Bond was permanently in this state without regaining consciousness. | 911 |
| 40 | 19 | I simply opened the door and unscrewed my number plate and put the folded cheque underneath it and screwed the plate back. | 952 |
| 41 | 19 | We have announced that Le Chiffre shot his two accomplices and then committed suicide because he could not face an inquiry into the union funds. | 948 |
| 42 | 20 | It was a pretty sound job. Nice and clean too. Three hundred yards away. | 976 |
| 43 | 21 | I managed to get an arm free and throw my bag through the window. | 1048 |
| 44 | 22 | It was three weeks from the day when he had been on the edge of death, and now it was July | 1083 |
| 45 | 22 | Monsieur Versoix was a middleaged man with one arm. The other he had lost fighting with the Free French in Madagascar. | 1113 |
| 46 | 24 | He glanced at the bottles and was surprised to see that one contained nembutal sleepingpills. | 1159 |
| 47 | 26 | His name was Adolph Gettler. He had given a bank in Zurich as his address. | 1266 |
| 48 | 25 | one of my guests had put through a call to Paris and that there had been no answer | 1256 |
| 49 | 27 | I am an agent of the MWD. Yes, I am a double agent for the Russians. | 1330 |
| 50 | 27 | That was why they knew about you before you arrived and why they had time to put the microphones in. | 1330 |
| 52 | 27 | It was addressed simply in a large round hand 'Pour Lui'. | 1321 |
| 54 | 27 | He would take on SMERSH and hunt it down. | 1351 |
| 55 | 5 | RoyalelesEaux, which lies near the mouth of the Somme before the flat coastline soars up from the beaches of southern Picardy | 208 |

注：#38的quote取自第18章行刑现场（倒M形血痕），俄文字母Ш的认定原文在第20章第967行（Bond复述：the Russian letter for SH. It's rather like an inverted M with a tail），章节仍按行刑事件记第18章。#50的quote取自遗书泄露身份与窃听器一段，绑架策划见同信第1331行。#47的quote原文拼写为Adolph Gettler，与事实中文阿道夫·盖特勒对应。

### 皇家赌场quote_source补值46条

C路建议值按chapter字段机械推导，逐条以补录quote落行复核：43条确认无误（#1第1章、#3第1章、#4第2章、#5第2章、#6第2章、#7第2章、#9第2章、#10第2章、#12第3章、#13第3章、#14第4章、#15第4章、#16第4章、#17第5章、#18第5章、#19第6章、#21第7章、#23第8章、#24第9章、#25第9章、#27第11章、#29第12章、#31第13章、#32第14章、#33第15章、#34第16章、#35第17章、#36第17章、#38第18章、#39第19章、#40第19章、#41第19章、#42第20章、#43第21章、#44第22章、#45第22章、#46第24章、#48第25章、#49第27章、#50第27章、#52第27章、#54第27章、#55第5章）；3条推导有误已纠正（#11第3章→第9章、#26第10章→第11章、#47第25章→第26章，见复核追加）。

### 霹雳弹start_line修正4条

第18章1512→1444、第19章1592→1512、第20章1656→1592、第21章1700→1656；第22章1700不动。底本标题行实测：第18章在第1444行、第19章在第1512行、第20章在第1592行、第21章在第1656行、第22章在第1700行；docs/SOURCE-INVENTORY.md第九节所列起始行与底本一致，可作交叉核对。第21章修正按标题定位（旧值1700在novel-09.json中第21与第22章重复出现）。

### 无建议值null项处理（52条）

- 皇家赌场缺失quote 46条：全部补录，见上表。
- 八爪女#37（quote旧值he will be the underbidder）：底本全文无此逐字句，替换为第3篇第328行逐字句“you remember what this Dr. Fanshawe said about an underbidder—someone to make these Wartski merchants go to their very top price”（21词）。
- 女王密使#22（quote旧值Clinique de l'Aube at Davos）：复核后不改动。底本第321行为Clinique de 1'Aube at Davos，数字1为小写字母l的转写artifact，现有quote为正确读法。
- 诺博士#59/#60（quote与quote_source各2条，共4条）：全书级grep事实（SPECTRE出现0次、军械官从未被称为Q、莱特出现0次），无单句可引，quote与quote_source留空；chapter原II为占位写法，改为全书标注，并在DATA-SCHEMA.md中写明chapter可取全书。验证脚本第4项据此放行（仅此2条）。

### 复核追加修正（137条之外，共7项）

| 位置 | 修正 | 依据 |
|---|---|---|
| casino-royale#11 | chapter 3→9，quote_source第3章→第9章 | 双0编号原因（两次冷血杀人）原文见第9章第399行；第3章仅提及Double O身份，未述原因；C路未发现 |
| casino-royale#26 | chapter 10→11，quote_source第10章→第11章 | 首注200万法郎天生9点击败庄家为第11章首注（第479行起）；第10章仅为开局50万法郎与6号位；本条为跨10–11章复合事实，章节以决定性事件为准；C路未发现 |
| casino-royale#47 | chapter 25→26，quote_source第25章→第26章 | 盖特勒身份核查原文在第1266行，落入第26章（起始行1259）；第25章止于1258行；C路未发现 |
| casino-royale#16 | quote首字母大写She→小写she | 底本第192行原文为And she is a wireless expert（小写she）；初版补录时首字母大写与原文不符，逐字比对发现并修正 |
| character-core bond | timeline_cutoff金枪人（1965年）→八爪女与黎明生死线（1966年） | 其余30人cutoff均等于最后出场小说；邦德appearance_novels含14且knowledge_scope第14部为present；B路沿用旧值未更新 |
| character-core m | timeline_cutoff金枪人（1965年）→八爪女与黎明生死线（1966年） | 同上；M appearance_novels含14且knowledge_scope第14部为present |
| 详见验证期新发现 | 3组合并（bill-tanner、british-secret-service、detroit-purple-gang） | 见下节 |

## 悬空引用处理（A路移交29处）

A路所列29处逐项计数实为23处（sis 8处、人物7处、地点1处、装备3处、关系with引用4处），与其所称29处不符，以本次实测23处为准。23处数组/关系引用（14个不同id）全部解决，另有16处事实entity引用经别名解析解决（6个不同id），合计39处引用点。

| 悬空id | 判定 | 解析目标 | 依据 |
|---|---|---|---|
| sis | 别名变体 | secret-service（组织） | 8部小说JSON组织id；原文Secret Intelligence Service；索引规范id |
| leiter | 别名变体 | felix-leiter | novel-09.json人物id；原文全名Felix Leiter |
| tanner | 别名变体 | chief-of-staff | novel-13.json人物id；原文全名Bill Tanner；A路定名 |
| james-bond | 别名变体 | bond | novel-10.json人物id |
| james-molony | 别名变体 | molony | novel-12.json人物id；原文Sir James Molony；与莫洛尼军士不同人 |
| miss-moneypenny | 别名变体 | moneypenny | novel-14.json人物id |
| tracy-draco | 别名变体 | tracy | novel-12.json人物id；原文Teresa Draco/Bond；索引tracy |
| ronnie-vallance | 别名变体 | vallance | novel-04.json人物id；原文全名Ronnie Vallance |
| spang-brothers | 合称（关系引用） | jack-spang、seraffimo-spang（候选清单） | novel-04.json 3处关系引用；兄弟二人合称，不静默合并为一人；relationships.json中展开为两人并注via_group |
| abc | 别名变体 | jack-spang | novel-04.json关系引用；ABC为杰克·斯班格化名，索引jack-spang条目aliases已收ABC |
| london-target | 别名变体 | london | novel-03.json地点id；实为伦敦（德拉克斯目标），非独立地点 |
| colt-army-special-45 | 别名变体 | colt-army-special | novel-03.json装备id；索引条目名Colt Army Special .45，出场记录一致 |
| harpoon-gun | 别名变体 | champion-harpoon | novel-08.json装备id；索引条目Champion harpoon gun，第5篇一致 |
| heel-knife | 别名变体 | shoe-knife | novel-11.json装备id；索引条目Heel knife，第1章一致 |

全部14个id写入knowledge/resolution/aliases.json（另含索引与小说JSON收录的全部别名，共258条，歧义3条）。小说JSON原文id未改写，以别名解析层统一解析；验证脚本第12项以kind-aware解析复核，出场交叉核查349/142/204/148条全部通过。

## 验证期新发现的合并（A路漏并，3组）

出场交叉核查（验证脚本第12项）与同名扫描发现A路漏并3组，均以原文核对后合并，旧id保留为别名：

1. bill-tanner并入chief-of-staff（人物280→279）。同名同姓Bill Tanner，别名重叠（Bill、Chief of Staff）；chief-of-staff原6部（1、3、4、6、7、14），bill-tanner原2部（12、13），合并后8部，appearance_count 8。发现线索：bill-tanner在novel-13的出场与novel-13人物id tanner不一致。
2. british-secret-service并入secret-service（组织91→90，合并后14部）。同一机构（邦德所属机构，首脑为M），仅英文名写法不同（Secret Intelligence Service与British Secret Service）；novel-05与novel-12角色描述与secret-service一致。docs/KNOWLEDGE-COVERAGE.md原称Secret Service与Secret Intelligence Service已归并，与此次合并后状态一致。
3. detroit-purple-gang并入purple-gang（组织90→89，合并后4部）。同一底特律紫帮：金刚钻第298行Detroit Purple gang；金手指第1137行The Purple Gang. Detroit；霹雳弹第393行Magnus Blomberg为Detroit Purple Gang成员（第6章）；金枪人第116行斯卡拉曼加1958年与底特律紫帮对头Ramon Rodriguez决斗（第3章档案）。后两部出场为本次补记（novel-09.json与novel-13.json组织数组同步补入）；金枪人第343行另有对话问句“The Purple Gang?”，未单独计出场。

另补1处索引缺口：pinkerton在金枪人第420行有原文（Leiter was still working for Pinkerton's, but was also on the reserve of the C.I.A.，第9章），索引有出场记录但novel-13.json组织数组缺失，已补入。

## 检索索引与检索测试

新建knowledge/resolution/共3个文件（结构见docs/DATA-SCHEMA.md第十二节）：

- aliases.json：258条别名→规范id映射（含上述14个悬空id、3个合并旧id、索引与小说JSON收录的全部别名、A路记录的花斑帮→spangled-mob与北约→nato）；歧义3条（Molony、Spang、spang-brothers）返回候选清单，不静默合并。另有跨类同名提示：Miami同时为地点id（迈阿密）与人物别名（sam-miami绰号），解析时须按kind区分。
- relationships.json：311对人物关系（双向可查），由14部小说JSON关系与character-core关系归并；双向均有陈述的116对，其余为单向原始陈述（不虚构反向类型）。
- timeline.json：14部时间线，每部含32位核心人物按knowledge_scope导出的present/absent/dead/not_yet_introduced/mentioned_only集合，另有每人timeline_cutoff、首末present小说、death_novel_no（首部status为dead的小说，死亡发生于前一部故事内）。

检索测试`node scripts/retrieval-tests.js`共15条，全部通过（退出码0）：

```
[PASS] 人物ID：bond解析为詹姆斯·邦德 — name_en=James Bond
[PASS] 别名：leiter解析为felix-leiter — via=alias
[PASS] 别名：sis解析为secret-service（组织） — via=alias
[PASS] 小说名称：金刚钻对应novel-04，25章 — novel_id=diamonds-are-forever，章节=25
[PASS] 章节编号：诺博士第VII章存在且标题为NIGHT PASSAGE — title=NIGHT PASSAGE
[PASS] 时间线：勒·希弗第1部present、第2部起dead — scope1=present，scope2=dead，death_novel_no=2
[PASS] 人物关系：bond与felix-leiter双向可查且为盟友 — bond侧4条，leiter侧4条
[PASS] 组织：secret-service共14部出场 — appearance_count=14
[PASS] 地点：迈阿密为真实地点（fictional=false），出场2部 — fictional=false，count=2
[PASS] 装备：beretta-25为点25贝雷塔，出场2部 — name_en=.25 Beretta automatic
[PASS] 事件：thunderball:nuclear-blackmail存在且章节有效 — chapter=7
[PASS] 事实类型：全库canon 762条、inference 11条 — canon=762，inference=11
[PASS] 同名区分：Molony返回双候选，james-molony单指爵士 — Molony候选=molony,sergeant-molony，james-molony=molony，sergeant-molony=sergeant-molony
[PASS] 事实定位：皇家赌场第19章le-chiffre对外自杀说法可定位 — quote=We have announced that Le Chiffre shot h…
[PASS] 全书级事实：dr-no#59/#60 chapter为全书且quote留空 — chapter=全书/全书

检索测试：15通过，0失败，共15条
```

## 改动文件清单（本次）

- knowledge/novels/novel-01.json：fact-fixes 46条quote_source补值、46条quote补录，复核追加#11/#26/#47章节修正与#16 quote大小写修正。
- knowledge/novels/novel-02.json：chapter修正3条、quote_source修正1条、quote纠错3条。
- knowledge/novels/novel-03.json：chapter修正2条、quote_source修正2条。
- knowledge/novels/novel-04.json：chapter修正1条、quote_source修正1条。
- knowledge/novels/novel-05.json：quote纠错1条。
- knowledge/novels/novel-06.json：chapter修正2条、#59/#60 chapter改为全书。
- knowledge/novels/novel-07.json：chapter修正1条、quote_source修正1条。
- knowledge/novels/novel-09.json：chapter修正4条、quote_source修正1条、start_line修正4条、组织数组补purple-gang。
- knowledge/novels/novel-10.json：chapter修正2条、quote_source修正2条。
- knowledge/novels/novel-11.json：chapter修正2条。
- knowledge/novels/novel-12.json：chapter修正3条、quote_source修正3条。
- knowledge/novels/novel-13.json：组织数组补purple-gang与pinkerton。
- knowledge/characters/index.json：bill-tanner并入chief-of-staff，total_unique 280→279。
- knowledge/organizations/index.json：british-secret-service并入secret-service，detroit-purple-gang并入purple-gang（补霹雳弹与金枪人出场），total_unique 91→89。
- knowledge/manifest.json：各本lines减1（total_lines 18849行未动）。
- knowledge/canon-rules/character-core.json：bond与m的timeline_cutoff改为八爪女与黎明生死线（1966年）。
- knowledge/resolution/aliases.json、relationships.json、timeline.json：新建。
- scripts/validate.js、scripts/retrieval-tests.js、package.json：新建。
- docs/VALIDATION-REPORT.md：本文件补全（A路一节原样保留）。
- docs/DATA-SCHEMA.md：第十二节检索索引补入；第三至六节总数同步为279/89/170/128；第三节约冲突段落更新；事实chapter字段补全书标注。
- docs/KNOWLEDGE-COVERAGE.md、docs/CHATGPT-HANDOVER.md、docs/CHATGPT-ONECLICK.md、README.md、docs/CANON-ARCHITECTURE.md、docs/CHARACTER-INDEX.md、docs/SOURCE-INVENTORY.md：总数与状态同步（见各文件）。

## 尚未解决问题

1. q的timeline_cutoff语义待确认：q在14部中从未以present登场（仅皇家赌场mentioned_only，appearance_novels仅含第1部），其timeline_cutoff金枪人（1965年）不按最后出场小说解释。验证脚本第10项将其记为提醒而非失败。需B路或后续负责人确认cutoff语义（最后登场、知识截断还是站点剧情截断）。
2. 事实entity字段存在10个不同主题词取值（coins、secatur、moonraker、train、zachary-smith、bomb、boneyard、note、sharks、disco-volante，共22处引用），非人物或组织id。按DATA-SCHEMA.md事实字段说明，entity应为人物或组织id；现况为撰写时以主题词充当entity。验证脚本第4项只核查字段齐全与类型，不强制entity落入索引；如需收紧，须逐条重定entity并补索引，工作量较大，留待后续。
3. 组织与地点索引无aliases字段：spangled-mob中文异译花斑帮、nato简称北约等已写入knowledge/resolution/aliases.json，但索引条目本身仍无aliases字段；如需索引自带别名，须另建字段。
4. secret-service与british-secret-service已合并，但小说JSON中novel-05.json与novel-12.json组织id仍为british-secret-service（以别名解析，未改写原文id）；同理8部小说JSON组织id仍为sis、novel-09.json人物id仍为leiter、novel-10.json人物id仍为james-bond等，均以aliases.json解析。如需全文改写为规范id，须另行批量改写并复核。
5. 八爪女第4篇007 in New York本版未见，待换版核对（A路与C路遗留，未变）。
6. 7部小说的电影差异未系统核对（皇家赌场、生死关头、来自俄罗斯的爱情、只为你的双眼、霹雳弹、女王密使、八爪女），adaptation-boundaries.json只收已核验的10条（未变）。
7. 去重仍为下限口径：本次以同名扫描仅发现3组漏并；组织、地点、装备中其余别名变体可能仍有拆分（例如不同译名写法），须逐条原文核对后方可再并，不得仅凭名字相似合并。
8. 金刚钻#46的quote为cleaned读法：底本第1348行原文为I've never what you'd call'slept with a man' in my life（含call'slept连写artifact），库中quote记为I've never what you'd call slept with a man in my life，未逐字照录artifact；章节修正23→22已验证无误，quote本文未动，记此一笔。
9. 皇家赌场#26为跨10–11章复合事实（开局50万法郎与6号位在第10章，首注200万法郎天生9点在第11章），章节以决定性事件记第11章；第10章部分无独立quote，见本报告fact-fixes记录。
10. 皇家赌场#38的quote取自第18章行刑现场，未含Ш字母本身；Ш的认定原文在第20章第967行。章节按行刑事件记第18章，见本报告fact-fixes记录。
11. 皇家赌场#50的quote取自遗书泄露身份与窃听器一段；绑架策划见同信第1331行，未另引。
12. 本次验证未复核全部773条事实的quote逐字性：仅复核fact-fixes涉及的137条与抽查的20条chapter修正、4条quote纠错、46条补录quote；其余事实的quote仍以撰写时记录为准。全面逐字复核须另行立项。
