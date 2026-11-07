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
13. 小说12中文事实写“氢气球”，原著多处明写helium balloon（氦气球），英文版已按原著写helium；中文侧待另行修正（双语化验收2026-11-07核实：you-only-live-twice第20章事实，fact为“邦德关闭间歇泉阀门后城堡爆炸，他抓住氢气球系绳逃生”，fact_en为helium balloon）。
14. 小说03德拉克斯植皮左右不一致是原著本身的问题（第IV章右半脸，第XXII章左太阳穴与左脸颊），英文沿用第IV章，未另加注（双语化验收2026-11-07核实：第IV章事实写右脸植皮，fact_en为grafted skin over the right side of his face）。
15. 小说03第44条事实chapter原值就是"II"（内容实为第XXII章追述），原样保留（双语化验收2026-11-07核实：facts[43] chapter为II，内容为德拉克斯小队炸毁盟军后方联络总部食堂，quote_source为第II章）。
16. 小说06两处原文内部矛盾未调和（诺博士购岛年份1943与1942、在岛14年；结尾35岁准将与比尔·坦普勒是否为同一人），已在canon_vs_inference的note_en标明（双语化验收2026-11-07核实：购岛年份条目note_en写明两处表述不一致、原文如此、未做调和；“结尾准将是否为比尔·坦普勒”条目note_en写明第I章桥牌局成员为准将比尔·坦普勒、第XX章主张派兵的准将未写姓名、原文未明示两人是否为同一人；两条目的topic_en均未补，小说06共11条topic_en全缺）。
17. Q的signature_phrases为空数组（无原文台词可据，有意留空）；实测32人核心人物signature_phrases（character-core.json顶层字段）全部为空数组，英文版voice_style_en.signature_phrases共64条、Q为空数组（双语化验收2026-11-07核实，见双语化一节）。
18. 各小说人物描述字段因中文为空而跳过的总数（双语化验收2026-11-07实测，含空值与占位词未描写/未知/不知道）：小说04共15处、小说06共41处、小说07共14处、小说11共30处、小说12共37处、小说13共65处、小说14共39处；另有小说01共36处与小说10共14处占位词已译为琐碎值Unknown/Unknown.；其余各部为0处；合计跳过241处。
19. 全面逐条复核未做：人物专人只做关键锚点抽查，未对32人逐条做14部全文重读；双语化验收亦只做程序全量核查与定点原文核对（第13至17条所列各项），未逐条重读英文版全部773条fact_en与284条summary_en。
20. 双语已知缺口（第二波范围，2026-11-07登记）：story_timeline_en只有小说02有；adaptation_differences_en 13/14（小说12纯字符串列表未补）；通讯name_en 36/78；canon_vs_inference topic_en 88/107（小说06、13未补）；小说14 stories子结构80处无英文；小说级地点country_en 0/203、装备kind_en 0/148；小说级人物aliases数组264条无aliases_en；adaptation-boundaries.json无英文；knowledge-control规则文本无英文版；核心人物knowledge_scope known/unknown清单929项与sources数组无英文版。详见双语化一节与docs/BILINGUAL-MAPPING.md第五节。
21. M的role_en.relationships与中文relationships均沿用合并前id bill-tanner（2026-11-06验证期已并入chief-of-staff），经knowledge/resolution/aliases.json可解析到chief-of-staff，不计断链；中文原字段未改写，规范化须另行处理（双语化验收2026-11-07核实，验证脚本第18项按别名解析口径放行）。
22. 组织与地点索引无aliases字段（沿用第3条）：spangled-mob中文异译花斑帮、nato简称北约等已写入knowledge/resolution/aliases.json（含alias_en），但索引条目本身仍无aliases字段。

## 双语化验收（2026-11-07）

> 第一波16路交回后统一验收：14部小说、32位核心人物、索引与检索全部双语化。本节记录本次验收的修复内容、验证结果、中英覆盖率前后对比、重复与命名问题处理记录、尚未解决问题（见本文件末节第13至22条）与改动文件清单。验收人不改英文内容本身，只做两处机械同步（见下）与验证脚本修补。

### 本次修复内容

1. 验证脚本第8项修补：knowledge-control已升v2.1、规则16条（KC-01至KC-16），原检查写死v2.0/10条会误报；已改为v2.1/16条，规则编号逐条核对KC-01至KC-16。
2. 新增双语检查7项（验证脚本第13至19项）：英文必填字段完整度统计（分部、分人物、分字段）；`_en`文本字段不得含中文字符（全库扫描，含`role_en`子树）；每条`fact_en`与`fact`关键字段一致；章节`summary_en`数量与中文一致；中文原字段未被改写（与工程本份基线逐字段比对）；人物关系双语一致；三层约束双语结构有效（`role_en` 8键齐、`voice_style_en`区分度）。
3. 机械同步两处（英文内容本身不动，只把库内已有英文复制到缺失位置，逐条核对一致后复制）：
   - knowledge/events/index.json补`title_en`/`cause_en`/`effect_en`共189件乘3字段，由小说级事件英文同步，逐条核对`title`/`cause`/`effect`一致，0处不符。
   - knowledge/canon-rules/character-core.json补`timeline_cutoff_en`共32人，由knowledge/resolution/timeline.json同步，逐条核对年份一致，0处不符。
4. 字段命名收敛：不做批量改名，只登记并定口径，见docs/DATA-SCHEMA.md第十三节与docs/BILINGUAL-MAPPING.md。

### 自动化验证结果（2026-11-07）

`npm run validate`完整输出（退出码0）：

```
[PASS] 1 所有JSON可解析 — 27个JSON，失败0个
[PASS] 2 所有实体ID唯一 — 人物279、组织89、地点170、装备128、事件189、核心人物32；重复：无
[PASS] 3 aliases无错误冲突 — 258条别名，歧义3条；问题：无
[PASS] 4 所有事实字段完整 — 共773条（canon 762、inference 11），quote非空771条（99.7%）、quote_source非空771条，全书级留空2条（dr-no#59/#60）；问题：无
[PASS] 5 所有章节引用有效 — 事实/事件/人物出场章节均按各部chapters的no实际值比对（不换算）；问题：无
[PASS] 6 所有文件引用真实存在 — manifest 14部均有对应novel文件；canon-rules仓库内引用存在；底本txt引用14处为仓库外底本（预期不在仓库内，不计失败）；问题：无
[PASS] 7 人物核心字段完整度统计 — appearance 31/32（97%）；age_clues 31/32（97%）；personality 31/32（97%）；habits 31/32（97%）；background 32/32（100%）；relationships 31/32（97%）；voice_style 32/32（100%）；behavioral_boundaries 32/32（100%）；knowledge_boundaries 32/32（100%）；knowledge_scope 32/32（100%）；sources 32/32（100%）；timeline_cutoff 32/32（100%）
[PASS] 8 三层人物约束数据结构有效 — character-core v2.0共32人、knowledge-control v2.1共16条规则（KC-01至KC-16）、adaptation-boundaries已核验10条；问题：无
[PASS] 9 人物关系双向检索 — 共311对人物关系，任一端检索均可返回对方；问题：无
[PASS] 10 人物时间线与知识边界无明显前后矛盾 — 32位核心人物死后未复活、timeline.json状态集合与knowledge_scope一致；提醒：q从未present（仅皇家赌场mentioned_only），timeline_cutoff（金枪人（1965年））不按最后出场小说解释，语义待确认；问题：无
[PASS] 11 同名实体可准确区分 — molony（爵士）与sergeant-molony（军士）、jack-spang与seraffimo-spang、cipher-machine与russian-cipher-machine、cyanide-pistol与cyanide-water-pistol均可区分，歧义别名返回候选清单；问题：无
[PASS] 12 不同小说角色与事件不串线 — 事件双向一致189件；出场交叉核查人物349、组织142、地点204、装备148条，全部落在对应小说；问题：无
[PASS] 13 英文必填字段完整度统计 — 必填项28/28类满额；事实773/773、章节284/284、核心人物描述252/252、人物关系英文455/455；分部：casino-royale:事实56/56、章节27/27、人物描述105/105（跳过0）、事件12/12；live-and-let-die:事实67/67、章节23/23、人物描述120/120（跳过0）、事件18/18；moonraker:事实58/58、章节25/25、人物描述100/100（跳过0）、事件12/12；diamonds-are-forever:事实52/52、章节25/25、人物描述105/105（跳过15）、事件11/11；from-russia-with-love:事实56/56、章节28/28、人物描述135/135（跳过0）、事件12/12；dr-no:事实61/61、章节20/20、人物描述79/79（跳过41）、事件17/17；goldfinger:事实58/58、章节23/23、人物描述111/111（跳过14）、事件16/16；for-your-eyes-only:事实48/48、章节5/5、人物描述125/125（跳过0）、事件15/15；thunderball:事实56/56、章节24/24、人物描述155/155（跳过0）、事件12/12；spy-who-loved-me:事实50/50、章节15/15、人物描述90/90（跳过0）、事件11/11；on-her-majestys-secret-service:事实53/53、章节27/27、人物描述130/130（跳过30）、事件14/14；you-only-live-twice:事实59/59、章节22/22、人物描述83/83（跳过37）、事件15/15；man-with-golden-gun:事实59/59、章节17/17、人物描述85/85（跳过65）、事件14/14；octopussy:事实40/40、章节3/3、人物描述81/81（跳过39）、事件10/10；分人物：32人role_en 8键齐、timeline_cutoff_en齐，描述_en适用项全部已补；已知缺口（第二波范围，不计失败）：story_timeline_en 1/14（仅小说02有）；adaptation_differences_en 13/14（小说12纯字符串列表未补）；通讯name_en 36/78（8部未补）；canon_vs_inference topic_en 88/107（小说06、13未补）；小说人物描述跳过（中文为空或占位词未描写/未知/不知道）241处，其中琐碎值Unknown/Unknown.共50处已补英文；八爪女stories子结构80处中文描述无英文（key_events、地点role、人物role、mission_objective）；小说级地点country_en 0/203、装备kind_en 0/148（索引层已有country_en/kind_en）；小说级人物aliases数组264条无aliases_en（解析层aliases.json已双语258/258）；adaptation-boundaries.json 10条已核验差异与2条未核对说明无英文；knowledge-control规则文本（KC-01至KC-16）无英文版，language_modes为英文接口；核心人物knowledge_scope known/unknown清单929项与sources数组无英文版；问题：无
[PASS] 14 _en文本字段不得含中文字符 — 全部_en字段与role_en子树扫描完毕，含中文0处（别名清单等例外字段白名单：无，alias_en本身亦为英文）；问题：无
[PASS] 15 每条fact_en与fact关键字段一致 — 共773条事实，fact_en均为字符串且与fact同对象、共用source_novel、chapter、entity、timeline_position、confidence、canon_or_inference；问题：无
[PASS] 16 章节summary_en数量与中文一致 — 中文summary 284条、英文summary_en 284条；章节标题含中文0处（标题本身即英文原文，无需title_en）；问题：无
[PASS] 17 中文原字段未被改写 — knowledge/canon-rules/character-core.json中文侧差异3处（已登记的在列）；knowledge/canon-rules/knowledge-control.json中文侧差异5处（已登记的在列）；knowledge/resolution/aliases.json中文侧差异2处（已登记的在列）；中文原字段零未登记改写；已登记改动：knowledge-control升v2.1加KC-11至KC-16与language_modes、character-core加英文资料元数据、aliases.json注记加双语说明；问题：无
[PASS] 18 人物关系双语一致 — 共455条关系陈述，中英文type齐全；279人roles_en与roles等长；32人relationships与role_en.relationships指向均可解析（非规范id但经别名可解析：m relationships with=bill-tanner→chief-of-staff；m role_en.relationships with=bill-tanner→chief-of-staff，中文原字段沿用合并前id，见docs/VALIDATION-REPORT.md尚未解决问题）；问题：无
[PASS] 19 三层约束双语结构有效 — character-core v2.0：32人role_en 8键齐、voice_style_en齐（tone/sentence_pattern/taboo各32种无重复、signature_phrases共64条无重复、Q为空数组并说明原因）；knowledge-control v2.1：KC-11至KC-16齐、language_modes含zh/en与6条原则；adaptation-boundaries已核验10条（其英文版未补，记为已知缺口，不计失败）；问题：无

验证结果：19/19项通过
```

`node scripts/retrieval-tests.js`完整输出（退出码0）：

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
[PASS] 人物ID（英文）：bond角色英文含Major character，皇家赌场出场标题为Casino Royale — roles_en=Major character,Major character (introduced in Chapter 10)，title_en=Casino Royale
[PASS] 英文别名：Kerim Bey/The Wizard of Ice/NATO均解析到同一规范id — kerim=darko-kerim，kronsteen=kronsteen，nato=nato
[PASS] 中文别名：军械官/塔尼娅/花斑帮均解析到同一规范id — 军械官=boothroyd，塔尼娅=tatiana-romanov，花斑帮=spangled-mob
[PASS] 歧义别名中英一致：Spang与spang brothers返回同一候选清单 — Spang=jack-spang,seraffimo-spang，spang brothers=jack-spang,seraffimo-spang
[PASS] 小说名称（英文）：Casino Royale/From Russia with Love对应27/28章 — CR=27章，FRWL=28章
[PASS] 章节编号（英文书名）：Dr No第VII章为NIGHT PASSAGE，Goldfinger共23章 — VII=NIGHT PASSAGE，Goldfinger=23章
[PASS] 时间线（英文）：casino-royale标题为Casino Royale，bond截止为Octopussy and The Living Daylights (1966) — title_en=Casino Royale，cutoff_en=Octopussy and The Living Daylights (1966)
[PASS] 人物关系双向（中英）：bond与felix-leiter中英类型一致 — zh=盟友,挚友与战友，en=Ally,Best friend and comrade-in-arms
[PASS] 组织（英文）：nato英文全称正确，出场role_en非空 — name_en=North Atlantic Treaty Organization
[PASS] 地点（英文）：london/miami国家英文正确，有国家者均有country_en — london=United Kingdom，miami=United States
[PASS] 装备（英文）：walther-ppk类别为Weapon，注释英文提及Boothroyd — kind_en=Weapon
[PASS] 事件（英文书名）：Thunderball可定位thunderball:nuclear-blackmail事件章节 — novel_id=thunderball，chapter=7
[PASS] 事实类型筛选（英文）：inference共11条，人物实体均有name_en — inference=11，缺name_en=0
[PASS] 双语完整性：角色/别名/关系/时间线英文均已补齐 — chars=true，alias=true，rels=true，timeline=true

检索测试：29通过，0失败，共29条
```

### 中英覆盖率前后对比

修复前（基线，2026-11-06，工程本份实测）：只有中文描述与名称类英文（`name_en`人物279/279、组织89/89、地点170/170、装备128/128，`title_en`小说14/14）；事实、英文摘要、角色英文、关系英文、别名英文、时间线英文全部为0；knowledge-control为v2.0、规则10条。

修复后（2026-11-07验收实测）：必填英文槽位8459/8459（100%）；全部可统计英文槽位8597/10356（83.0%），未补缺口1759处；中文为空或占位词而跳过的人物描述241处，不计入适用槽位。

| 类别 | 修复前 | 修复后 |
|---|---|---|
| 事实fact_en | 0/773 | 773/773 |
| 章节summary_en | 0/284 | 284/284 |
| 小说人物描述_en（适用） | 0/1504 | 1504/1504（含琐碎值Unknown/Unknown.共50处；跳过241处） |
| 小说人物role_en | 0/349 | 349/349 |
| 小说组织/地点role英文 | 0/347 | 347/347（role_en或description_en） |
| 小说装备/车辆/通讯note英文 | 0/350 | 350/350（note_en或description_en） |
| 小说事件title/cause/effect_en | 0/567 | 567/567 |
| 任务mission_en子字段 | 0/56 | 56/56 |
| 梗概synopsis_en | 0/14 | 14/14 |
| 推测说明note_en | 0/107 | 107/107（topic_en 88/107） |
| 索引人物出场role_en/title_en | 0/698 | 698/698 |
| 索引组织出场role_en | 0/142 | 142/142 |
| 索引地点country_en/出场role_en | 0/169、0/204 | 169/169、204/204 |
| 索引装备kind_en/出场note_en | 0/128、0/147 | 128/128、147/147 |
| 事件索引title/cause/effect_en | 0/567 | 567/567（本次机械同步） |
| 别名alias_en | 0/258 | 258/258 |
| 关系type_en | 0/455 | 455/455 |
| 时间线title_en | 0/14 | 14/14 |
| 时间线人物name_en/cutoff_en | 0/64 | 64/64 |
| 核心人物描述_en（适用） | 0/252 | 252/252 |
| 核心人物role_en 8键 | 0/32 | 32/32 |
| 核心人物timeline_cutoff_en | 0/32 | 32/32（本次机械同步） |
| knowledge-control版本/规则 | v2.0/10条 | v2.1/16条（KC-01至KC-16） |

分部（小说人物描述_en）：小说01共105/105（跳过0处，琐碎值36处）、小说02共120/120、小说03共100/100、小说04共105/105（跳过15处）、小说05共135/135、小说06共79/79（跳过41处）、小说07共111/111（跳过14处）、小说08共125/125、小说09共155/155、小说10共90/90（跳过0处，琐碎值14处）、小说11共130/130（跳过30处）、小说12共83/83（跳过37处）、小说13共85/85（跳过65处）、小说14共81/81（跳过39处）。

分人物（32位核心人物）：31人描述_en适用项全部已补；Q只补background_en与role_en，其余4个描述字段中文为空，不适用；32人role_en 8键全齐、timeline_cutoff_en全齐、voice_style_en全齐；voice_style_en的tone、sentence_pattern、taboo各32种无重复，signature_phrases共64条无重复，Q为空数组并在tone中说明原因。

### 重复与命名问题处理记录

- 重复id：本次双语化未引入新id，未改动任何id；人物279、组织89、地点170、装备128、事件189、核心人物32、事实773条均与修复前一致。
- 命名分歧：组织/地点中文`role`的英文版在小说05、07、09为`role_en`，其余11部为`description_en`；装备/车辆/通讯中文`note`的英文版在小说05、07、09为`note_en`，其余11部为`description_en`；通讯`name_en`在8部未补；`story_timeline_en`只有小说02有；`adaptation_differences_en` 13/14（小说12未补）；`canon_vs_inference`的`topic_en`在小说06、13未补。统一口径：新字段一律按中文原字段名加`_en`后缀，已交付的`description_en`为合规既有写法，验证脚本同时接受两种写法，不做批量改名。改不动的已知局限：小说12纯字符串列表、小说14 stories子结构（80处），见docs/DATA-SCHEMA.md第十三节。
- 中文原字段比对：与工程本份基线（~/workspace/007-intelligence-lab/knowledge，与GitHub main分支d5a0e4e1内容一致）逐字段比对，中文侧差异共10处，全部已登记：knowledge-control升v2.1（schema_version、layers文本、rules 10条增至16条、新增language_modes）、character-core加英文资料元数据（field_notes.english_fields、english_profile_version、english_profile_generated）、aliases.json注记加双语说明（note、lookup）；其余中文原字段零改写。验证脚本第17项在基线存在时自动重跑该比对，基线不在本机时跳过外部比对、不计失败。

### 内容问题核查记录（定点核对，非全面重读）

- 小说12“氢气球”：you-only-live-twice第20章事实中文写“氢气球”，英文版写helium balloon；中文侧待另行修正，见尚未解决问题第13条。
- 小说03德拉克斯植皮：原著本身左右不一致（第IV章右半脸，第XXII章左太阳穴与左脸颊），英文沿用第IV章，未另加注，见尚未解决问题第14条。
- 小说03第44条事实：chapter原值就是"II"，原样保留，见尚未解决问题第15条。
- 小说06两处原文内部矛盾：购岛年份与结尾准将是否为比尔·坦普勒，均已在canon_vs_inference的note_en标明，未调和，见尚未解决问题第16条。
- Q的signature_phrases为空数组：顶层字段32人全部为空数组；voice_style_en.signature_phrases共64条，Q为空数组并在tone中说明原因，见尚未解决问题第17条。
- 人物描述跳过241处：分部见尚未解决问题第18条。
- 全面逐条复核未做：见尚未解决问题第19条。

### 全部文件与数据盘点（2026-11-07）

- 仓库文件共43个：knowledge/下JSON共27个（manifest.json 1个、novels 14个、canon-rules 3个、characters/organizations/locations/equipment/timeline/events索引共6个、resolution 3个）、docs/下Markdown共12个（含新增docs/BILINGUAL-MAPPING.md）、README.md、package.json、scripts/validate.js与scripts/retrieval-tests.js。
- 已有英文资料的部分（修复前基线即有）：四类索引与小说各数组的name_en（人物279、组织89、地点170、装备128）、小说title_en（14/14）、章节title（本身即英文原文，284/284）。
- 修复前缺失或只有中文的部分：事实、英文摘要、角色英文、关系英文、别名英文、时间线英文、事件英文、任务英文、梗概英文、推测说明英文全部为0。
- 补齐的英文结构化资料清单：事实fact_en 773条、章节summary_en 284条、小说人物描述_en 1504项、小说人物role_en 349条、小说组织/地点role英文347条、小说装备/车辆/通讯note英文350条、小说事件英文567项、任务mission_en 56项、梗概synopsis_en 14条、推测说明note_en 107条、索引出场英文（人物698项、组织142项、地点204项、装备147项）、索引地点country_en 169项、索引装备kind_en 128项、事件索引英文567项、别名alias_en 258条、关系type_en 455条、时间线英文（标题14条、人物64项）、核心人物描述_en 252项、role_en 32人乘8键、timeline_cutoff_en 32项、voice_style_en 32人、knowledge-control v2.1（KC-11至KC-16与language_modes）。
- 中文数据保留情况：中文原字段零未登记改写（已登记改动10处，见上）；中文事实773条、章节摘要284条、实体总数（人物279、组织89、地点170、装备128、事件189）均未变；JSON全部可解析（27个，0失败，python3 -m json.tool批量校验通过，见下）。
- 中英对应关系与稳定ID：见docs/BILINGUAL-MAPPING.md；id中英共用，永不改写。
- JSON格式与完整性检查结果：`npm run validate`19/19项通过（退出码0），其中第1项全部JSON可解析、第4项事实字段完整、第5项章节引用有效、第13至19项双语检查通过；`node scripts/retrieval-tests.js`29/29条通过（退出码0），其中第28项双语完整性（角色/别名/关系/时间线英文均已补齐）通过。
- 人物关系一致性检查结果：311对人物关系双向可查，455条关系陈述中英文type齐全；279人roles_en与roles等长；32人role_en.relationships指向均可解析（M沿用合并前id bill-tanner，经别名可解析到chief-of-staff，见尚未解决问题第21条）。

### JSON批量校验（2026-11-07）

全部27个JSON最后再跑一遍`python3 -m json.tool`批量校验，0个非法文件，退出码0。校验命令：`for f in $(find knowledge -name '*.json'); do python3 -m json.tool "$f" > /dev/null || echo "FAIL $f"; done`。

### 改动文件清单（本次双语化验收，相对GitHub HEAD d5a0e4e1）

- knowledge/events/index.json：补title_en/cause_en/effect_en共189件乘3字段（机械同步）。
- knowledge/canon-rules/character-core.json：补timeline_cutoff_en共32人（机械同步）。
- knowledge/canon-rules/knowledge-control.json：v2.0升v2.1，规则10条增至16条（KC-11至KC-16），新增language_modes，layers文本同步更新（16路交回内容，本次验收只核对不改写）。
- knowledge/resolution/aliases.json：注记（note、lookup）加双语说明（16路交回内容，本次验收只核对不改写）。
- knowledge/novels/novel-01.json至novel-14.json：全部_en字段（16路交回内容，本次验收只核对不改写；中文原字段零改写）。
- knowledge/characters/index.json、knowledge/organizations/index.json、knowledge/locations/index.json、knowledge/equipment/index.json、knowledge/resolution/relationships.json、knowledge/resolution/timeline.json：全部_en字段（16路交回内容，本次验收只核对不改写；中文原字段零改写）。
- scripts/validate.js：第8项修补（v2.1/16条），新增第13至19项双语检查。
- scripts/retrieval-tests.js：15条增至29条（16路交回内容，本次验收只核对不改写；新增第15至29项双语检索测试）。
- docs/DATA-SCHEMA.md：第二、三、四、五、六、八、九、十、十一、十二节同步英文版字段，新增第十三节（双语兼容方案、字段字典、命名收敛决定）。
- docs/BILINGUAL-MAPPING.md：新增（中英对应关系与稳定ID清单、语言切换规则摘要、覆盖率总表、已知缺口清单）。
- docs/VALIDATION-REPORT.md：本节（双语化验收）与尚未解决问题第13至22条。
- docs/KNOWLEDGE-COVERAGE.md：新增第六节英文覆盖率，第五节同步验证结果。
- docs/CHARACTER-CONSTRAINTS.md：第五节补第五点第六小节核验记录（2026-11-07）。
- docs/CHATGPT-HANDOVER.md与docs/CHATGPT-ONECLICK.md：双语接管说明（数据结构、文件路径、接口及使用方式）。
- 未改动：knowledge/manifest.json、knowledge/timeline/index.json（title_en为基线已有）、knowledge/canon-rules/adaptation-boundaries.json、package.json、docs/其余文件；网站public/、functions/未碰，未部署，未改Cloudflare配置，未调用收费模型。
