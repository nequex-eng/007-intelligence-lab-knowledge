# 007原著资料清单（SOURCE-INVENTORY）

> 内部资料，不对外发布。底本来源：用户提供的007_0_64b6.zip（16M，14个苹果Pages文件），经LibreOffice转txt存于本工程source/txt/。原始zip与.pages只作内部来源，绝不放进public/、绝不经API对外提供全文、绝不做公开阅读。

> 转换命令：soffice --headless --convert-to txt:"Text (encoded):UTF8"。词数统计方法：python split()。字符数含空格与换行。

## 一、总览

- 14部小说，全部UTF-8带BOM，总计5081257字节、5073306字符、926290词、18849行。
- 完整性：14个txt的sha256全部不同，无重复文件；全文替换字符（U+FFFD）0个；各本结尾逐本核对完整，未见截断。
- 章节索引：13本通过，1本待复核（八爪女）。
- 已知缺口：八爪女本版只含3篇故事，第4篇007 in New York全文0次出现，是否缺篇待换版核对，绝不编造。

## 二、文件清单

| 编号 | 原著英文书名 | 中文书名 | 首版 | 文件名 | 字节 | 行数 | 词数 | 字符数 | 编码 | 章节 | 状态 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 01 | Casino Royale | 皇家赌场 | 1953年 | casino-royale.txt | 270937 | 1360 | 50035 | 270717 | UTF-8带BOM | 27 | 通过 |
| 02 | Live and Let Die | 生死关头 | 1954年 | live-and-let-die.txt | 372632 | 1780 | 67850 | 372437 | UTF-8带BOM | 23 | 通过 |
| 03 | Moonraker | 月亮牌 | 1955年 | moonraker.txt | 401702 | 1587 | 73299 | 401334 | UTF-8带BOM | 25 | 通过 |
| 04 | Diamonds Are Forever | 金刚钻 | 1956年 | diamonds-are-forever.txt | 385280 | 1614 | 70742 | 384990 | UTF-8带BOM | 25 | 通过 |
| 05 | From Russia with Love | 来自俄罗斯的爱情 | 1957年 | from-russia-with-love.txt | 441820 | 2972 | 80305 | 441341 | UTF-8带BOM | 28 | 通过 |
| 06 | Dr No | 诺博士 | 1958年 | dr-no.txt | 424706 | 1345 | 78288 | 424069 | UTF-8带BOM | 20 | 通过 |
| 07 | Goldfinger | 金手指 | 1959年 | goldfinger.txt | 472854 | 1507 | 85981 | 472532 | UTF-8带BOM | 23 | 通过 |
| 08 | For Your Eyes Only | 只为你的双眼 | 1960年 | for-your-eyes-only.txt | 338594 | 769 | 62511 | 337890 | UTF-8带BOM | 5 | 通过 |
| 09 | Thunderball | 霹雳弹 | 1961年 | thunderball.txt | 465165 | 1867 | 83612 | 462127 | UTF-8带BOM | 24 | 通过 |
| 10 | The Spy Who Loved Me | 爱我的间谍 | 1962年 | spy-who-loved-me.txt | 262896 | 616 | 49227 | 262420 | UTF-8带BOM | 15 | 通过 |
| 11 | On Her Majesty's Secret Service | 女王密使 | 1963年 | on-her-majestys-secret-service.txt | 444856 | 1275 | 80727 | 444550 | UTF-8带BOM | 27 | 通过 |
| 12 | You Only Live Twice | 雷霆谷 | 1964年 | you-only-live-twice.txt | 367364 | 999 | 66354 | 367285 | UTF-8带BOM | 22 | 通过 |
| 13 | The Man with the Golden Gun | 金枪人 | 1965年 | man-with-golden-gun.txt | 276386 | 739 | 49604 | 275987 | UTF-8带BOM | 17 | 通过 |
| 14 | Octopussy and The Living Daylights | 八爪女与黎明生死线 | 1966年 | octopussy.txt | 156065 | 433 | 27755 | 155627 | UTF-8带BOM | 3 | 待复核 |

## 三、逐本章节目录

### 01 Casino Royale（皇家赌场，1953年，27章）

- 第1章：THE SECRET AGENT（起始行1）
- 第2章：DOSSIER FOR M（起始行48）
- 第3章：NUMBER 007（起始行118）
- 第4章：L'ENNEMI ÉCOUTE（起始行158）
- 第5章：THE GIRL FROM HEADQUARTERS（起始行205）
- 第6章：TWO MEN IN STRAW HATS（起始行249）
- 第7章：ROUGE ET NOIR（起始行281）
- 第8章：PINK LIGHTS AND CHAMPAGNE（起始行333）
- 第9章：THE GAME IS BACCARAT（起始行383）
- 第10章：THE HIGH TABLE（起始行430）
- 第11章：MOMENT OF TRUTH（起始行479）
- 第12章：THE DEADLY TUBE（起始行537）
- 第13章：'A WHISPER OF LOVE, A WHISPER OF HATE'（起始行598）
- 第14章：'LA VIE EN ROSE?'（起始行673）
- 第15章：BLACK HARE AND GREY HOUND（起始行708）
- 第16章：THE CRAWLING OF THE SKIN（起始行740）
- 第17章：'MY DEAR BOY'（起始行789）
- 第18章：A CRAGLIKE FACE（起始行876）
- 第19章：THE WHITE TENT（起始行909）
- 第20章：THE NATURE OF EVIL（起始行961）
- 第21章：VESPER（起始行1013）
- 第22章：THE HASTENING SALOON（起始行1072）
- 第23章：TIDE OF PASSION（起始行1121）
- 第24章：FRUIT DÉFENDU（起始行1157）
- 第25章：'BLACKPATCH'（起始行1209）
- 第26章：'SLEEP WELL, MY DARLING'（起始行1259）
- 第27章：THE BLEEDING HEART（起始行1309）

### 02 Live and Let Die（生死关头，1954年，23章）

- 第I章：THE RED CARPET（起始行1）
- 第II章：INTERVIEW WITH M（起始行72）
- 第III章：A VISITING-CARD（起始行130）
- 第IV章：THE BIG SWITCHBOARD（起始行210）
- 第V章：NIGGER HEAVEN（起始行282）
- 第VI章：TABLE Z（起始行369）
- 第VII章：MISTER BIG（起始行453）
- 第VIII章：NO SENSAYUMA（起始行538）
- 第IX章：TRUE OR FALSE?（起始行634）
- 第X章：THE SILVER PHANTOM（起始行718）
- 第XI章：ALLUMEUSE（起始行807）
- 第XII章：THE EVERGLADES（起始行915）
- 第XIII章：DEATH OF A PELICAN（起始行997）
- 第XIV章：'HE DISAGREED WITH SOMETHING THAT ATE HIM'（起始行1085）
- 第XV章：MIDNIGHT AMONG THE WORMS（起始行1162）
- 第XVI章：THE JAMAICA VERSION（起始行1247）
- 第XVII章：THE UNDERTAKER'S WIND（起始行1310）
- 第XVIII章：BEAU DESERT（起始行1382）
- 第XIX章：VALLEY OF SHADOWS（起始行1433）
- 第XX章：BLOODY MORGAN'S CAVE（起始行1475）
- 第XXI章：'GOOD NIGHT TO YOU BOTH'（起始行1538）
- 第XXII章：TERROR BY SEA（起始行1616）
- 第XXIII章：PASSIONATE LEAVE（起始行1742）

### 03 Moonraker（月亮牌，1955年，25章）

- 第I章：SECRET PAPER-WORK（起始行3）
- 第II章：THE COLUMBITE KING（起始行75）
- 第III章：'BELLY STRIPPERS', ETC.（起始行128）
- 第IV章：THE 'SHINER'（起始行182）
- 第V章：DINNER AT BLADES（起始行274）
- 第VI章：CARDS WITH A STRANGER（起始行336）
- 第VII章：THE QUICKNESS OF THE HAND（起始行415）
- 第VIII章：THE RED TELEPHONE（起始行497）
- 第IX章：TAKE IT FROM HERE（起始行548）
- 第X章：SPECIAL BRANCH AGENT（起始行590）
- 第XI章：POLICEWOMAN BRAND（起始行651）
- 第XII章：THE MOONRAKER（起始行701）
- 第XIII章：DEAD RECKONING（起始行744）
- 第XIV章：ITCHING FINGERS（起始行790）
- 第XV章：ROUGH JUSTICE（起始行834）
- 第XVI章：A GOLDEN DAY（起始行882）
- 第XVII章：WILD SURMISES（起始行962）
- 第XVIII章：BENEATH THE FLAT STONE（起始行1026）
- 第XIX章：MISSING PERSON（起始行1111）
- 第XX章：DRAX'S GAMBIT（起始行1161）
- 第XXI章：'THE PERSUADER'（起始行1223）
- 第XXII章：PANDORA'S BOX（起始行1295）
- 第XXIII章：ZERO MINUS（起始行1332）
- 第XXIV章：ZERO（起始行1436）
- 第XXV章：ZERO PLUS（起始行1502）

### 04 Diamonds Are Forever（金刚钻，1956年，25章）

- 第1章：THE PIPELINE OPENS（起始行7）
- 第2章：GEM QUALITY（起始行61）
- 第3章：HOT ICE（起始行115）
- 第4章："WHAT GOES ON AROUND HERE?"（起始行170）
- 第5章："FEUILLES MORTES"（起始行201）
- 第6章：IN TRANSIT（起始行281）
- 第7章：'SHADY' TREE（起始行344）
- 第8章：THE EYE THAT NEVER SLEEPS（起始行433）
- 第9章：BITTER CHAMPAGNE（起始行493）
- 第10章：STUDILLAC TO SARATOGA（起始行557）
- 第11章：SHY SMILE（起始行609）
- 第12章：THE PERPETUITIES（起始行647）
- 第13章：ACME MUD AND SULPHUR（起始行682）
- 第14章："WE DON'T LIKE MISTAKES"（起始行785）
- 第15章：RUE DE LA PAY（起始行860）
- 第16章：THE TIARA（起始行905）
- 第17章：THANKS FOR THE RIDE（起始行939）
- 第18章：NIGHT FALLS IN THE PASSION PIT（起始行1002）
- 第19章：SPECTREVILLE（起始行1069）
- 第20章：FLAMES COMING OUT OF THE TOP（起始行1153）
- 第21章："NOTHING PROPINKS LIKE PROPINQUITY"（起始行1242）
- 第22章：LOVE AND SAUCE BEARNAISE（起始行1279）
- 第23章：THE JOB COMES SECOND（起始行1360）
- 第24章：DEATH IS SO PERMANENT（起始行1424）
- 第25章：THE PIPELINE CLOSES（起始行1520）

### 05 From Russia with Love（来自俄罗斯的爱情，1957年，28章）

- 第One章：Roseland（起始行18）
- 第Two章：The Slaughterer（起始行78）
- 第Three章：Post-Graduate Studies（起始行172）
- 第Four章：The Moguls of Death（起始行272）
- 第Five章：Konspiratsia（起始行353）
- 第Six章：Death Warrant（起始行437）
- 第Seven章：The Wizard of Ice（起始行543）
- 第Eight章：The Beautiful Lure（起始行637）
- 第Nine章：A Labour of Love（起始行711）
- 第Ten章：The Fuse Burns（起始行885）
- 第Eleven章：The Soft Life（起始行984）
- 第Twelve章：A Piece of Cake（起始行1064）
- 第Thirteen章：`B.E.A. Takes You There ...'（起始行1175）
- 第Fourteen章：Darko Kerim（起始行1249）
- 第Fifteen章：Background to a Spy（起始行1343）
- 第Sixteen章：The Tunnel of Rats（起始行1437）
- 第Seventeen章：Killing Time（起始行1517）
- 第Eighteen章：Strong Sensations（起始行1613）
- 第Nineteen章：The Mouth of Marilyn Monroe（起始行1729）
- 第Twenty章：Black on Pink（起始行1827）
- 第Twenty-One章：Orient Express（起始行1969）
- 第Twenty-Two章：Out of Turkey（起始行2101）
- 第Twenty-Three章：Out of Greece（起始行2179）
- 第Twenty-Four章：Out of Danger?（起始行2279）
- 第Twenty-Five章：A Tie with a Windsor Knot（起始行2375）
- 第Twenty-Six章：The Killing Bottle（起始行2581）
- 第Twenty-Seven章：Ten Pints of Blood（起始行2729）
- 第Twenty-Eight章：La Tricoteuse（起始行2825）

### 06 Dr No（诺博士，1958年，20章）

- 第I章：I HEAR YOU LOUD AND CLEAR（起始行2）
- 第II章：CHOICE OF WEAPONS（起始行51）
- 第III章：HOLIDAY TASK（起始行133）
- 第IV章：RECEPTION COMMITTEE（起始行179）
- 第V章：FACTS AND FIGURES（起始行289）
- 第VI章：THE FINGER ON THE TRIGGER（起始行361）
- 第VII章：NIGHT PASSAGE（起始行410）
- 第VIII章：THE ELEGANT VENUS（起始行479）
- 第IX章：CLOSE SHAVES（起始行553）
- 第X章：DRAGON SPOOR（起始行622）
- 第XI章：AMIDST THE ALIEN CANE（起始行683）
- 第XII章：THE THING（起始行767）
- 第XIII章：MINK-LINED PRISON（起始行841）
- 第XIV章：COME INTO MY PARLOUR（起始行932）
- 第XV章：PANDORA'S BOX（起始行992）
- 第XVI章：HORIZONS OF AGONY（起始行1031）
- 第XVII章：THE LONG SCREAM（起始行1084）
- 第XVIII章：KILLING GROUND（起始行1146）
- 第XIX章：A SHOWER OF DEATH（起始行1189）
- 第XX章：SLAVE-TIME（起始行1290）

### 07 Goldfinger（金手指，1959年，23章）

- 第ONE章：REFLECTIONS IN A DOUBLE BOURBON（起始行8）
- 第TWO章：LIVING IT UP（起始行49）
- 第THREE章：THE MAN WITH AGORAPHOBIA（起始行129）
- 第FOUR章：OVER THE BARREL（起始行200）
- 第FIVE章：NIGHT DUTY（起始行278）
- 第SIX章：TALK OF GOLD（起始行369）
- 第SEVEN章：THOUGHTS IN A DB III（起始行411）
- 第EIGHT章：ALL TO PLAY FOR（起始行475）
- 第NINE章：THE CUP AND THE LIP（起始行551）
- 第TEN章：UP AT THE GRANGE（起始行683）
- 第ELEVEN章：THE ODD-JOB MAN（起始行723）
- 第TWELVE章：LONG TAIL ON A GHOST（起始行820）
- 第THIRTEEN章：'IF YOU TOUCH ME THERE…'（起始行865）
- 第FOURTEEN章：THINGS THAT GO THUMP IN THE NIGHT（起始行946）
- 第FIFTEEN章：THE PRESSURE ROOM（起始行1012）
- 第SIXTEEN章：THE LAST AND THE BIGGEST（起始行1047）
- 第SEVENTEEN章：HOODS' CONGRESS（起始行1094）
- 第EIGHTEEN章：CRIME DE LA CRIME（起始行1179）
- 第NINETEEN章：SECRET APPENDIX（起始行1236）
- 第TWENTY章：JOURNEY INTO HOLOCAUST（起始行1295）
- 第TWENTY-ONE章：THE RICHEST MAN IN HISTORY（起始行1332）
- 第TWENTY-TWO章：THE LAST TRICK（起始行1396）
- 第TWENTY-THREE章：T.L.C. TREATMENT（起始行1444）

### 08 For Your Eyes Only（只为你的双眼，1960年，5章）

- 第1章：FROM A VIEW TO A KILL（起始行1）
- 第2章：FOR YOUR EYES ONLY（起始行130）
- 第3章：QUANTUM OF SOLACE（起始行313）
- 第4章：RISICO（起始行383）
- 第5章：THE HILDEBRAND RARITY（起始行577）

### 09 Thunderball（霹雳弹，1961年，24章）

- 第1章：«Take It Easy, Mr. Bond»（起始行5）
- 第2章：Shrublands（起始行83）
- 第3章：The Rack（起始行193）
- 第4章：Tea and Animosity（起始行257）
- 第5章：S.P.E.C.T.R.E.（起始行351）
- 第6章：Violet-Scented Breath（起始行377）
- 第7章：«Fasten Your Lap-Strap»（起始行439）
- 第8章：«Big Fleas Have Little Fleas . . .»（起始行533）
- 第9章：Multiple Requiem（起始行603）
- 第10章：The Disco Volante（起始行667）
- 第11章：Domino（起始行785）
- 第12章：The Man from the C.I.A.（起始行915）
- 第13章：«My Name Is Emilio Largo»（起始行1009）
- 第14章：Sour Martinis（起始行1121）
- 第15章：Cardboard Hero（起始行1188）
- 第16章：Swimming the Gantlet（起始行1302）
- 第17章：The Red-Eye Catacomb（起始行1354）
- 第18章：How to Eat a Girl（起始行1444）
- 第19章：When the Kissing Stopped（起始行1512）
- 第20章：Time for Decision（起始行1592）
- 第21章：Very Softly, Very Slowly（起始行1656）
- 第22章：The Shadower（起始行1700）
- 第23章：Naked Warfare（起始行1774）
- 第24章：«Take It Easy, Mr. Bond»（起始行1834）

### 10 The Spy Who Loved Me（爱我的间谍，1962年，15章）

- 第One章：Scaredy Cat（起始行10）
- 第Two章：Dear Dead Days（起始行26）
- 第Three章：Spring's Awakening（起始行46）
- 第Four章："Dear Viv"（起始行73）
- 第Five章：A Bird With a Wing Down（起始行117）
- 第Six章：Go West, Young Woman（起始行140）
- 第Seven章："Come into My Parlor..."（起始行161）
- 第Eight章：Dynamite from Nightmare-Land（起始行182）
- 第Nine章：Then I Began to Scream（起始行230）
- 第Ten章：Whassat?（起始行276）
- 第Eleven章：Bedtime Story（起始行354）
- 第Twelve章：To Sleep—Perchance to Die!（起始行382）
- 第Thirteen章：The Crash of Guns（起始行439）
- 第Fourteen章：Bimbo（起始行497）
- 第Fifteen章：The Writing on My Heart（起始行554）

### 11 On Her Majesty's Secret Service（女王密使，1963年，27章）

- 第1章：Seascape with Figures（起始行6）
- 第2章：Gran Turismo（起始行40）
- 第3章：The Gambit of Shame（起始行82）
- 第4章：All Cats are Grey（起始行129）
- 第5章：The Capu（起始行172）
- 第6章：Bond of Bond Street?（起始行220）
- 第7章：The Hairy Heel of Achilles（起始行254）
- 第8章：Fancy Cover（起始行293）
- 第9章：Irma La Not So Douce（起始行325）
- 第10章：Ten Gorgeous Girls（起始行382）
- 第11章：Death for Breakfast（起始行431）
- 第12章：Two Near Misses（起始行515）
- 第13章：Princess Ruby?（起始行567）
- 第14章：Sweet Dreams-Sweet Nightmare!（起始行645）
- 第15章：The Heat Increases（起始行713）
- 第16章：Downhill Only（起始行778）
- 第17章：Bloody Snow（起始行812）
- 第18章：Fork Left for Hell!（起始行845）
- 第19章：Love for Breakfast（起始行902）
- 第20章：Men Pantoufles（起始行934）
- 第21章：The Man from Ag, and Fish.（起始行988）
- 第22章：Something Called 'BW'（起始行1027）
- 第23章：Gauloises and Garlic（起始行1070）
- 第24章：Blood-Lift（起始行1130）
- 第25章：Hell's Delight, etc.（起始行1153）
- 第26章：Happiness Without a Shadow?（起始行1187）
- 第27章：All the Time in the World（起始行1242）

### 12 You Only Live Twice（雷霆谷，1964年，22章）

- 第1章：SCISSORS CUT PAPER（起始行20）
- 第2章：CURTAINS FOR BOND?（起始行60）
- 第3章：THE IMPOSSIBLE MISSION（起始行117）
- 第4章：DIKKO ON THE GINZA（起始行165）
- 第5章：MAGIC 44（起始行210）
- 第6章：TIGER, TIGER!（起始行265）
- 第7章：THE DEATH COLLECTOR（起始行301）
- 第8章：SLAY IT WITH FLOWERS（起始行359）
- 第9章：INSTANT JAPAN（起始行407）
- 第10章：ADVANCED STUDIES（起始行476）
- 第11章：ANATOMY CLASS（起始行513）
- 第12章：APPOINTMENT IN SAMARA（起始行599）
- 第13章：KISSY SUZUKI（起始行651）
- 第14章：ONE GOLDEN DAY（起始行694）
- 第15章：THE SIX GUARDIANS（起始行732）
- 第16章：THE LOVESOME SPOT（起始行777）
- 第17章：SOMETHING EVIL COMES THIS WAY（起始行802）
- 第18章：OUBLIETTE（起始行837）
- 第19章：THE QUESTION ROOM（起始行870）
- 第20章：BLOOD AND THUNDER（起始行907）
- 第21章：OBIT:（起始行924）
- 第22章：SPARROWS' TEARS（起始行939）

### 13 The Man with the Golden Gun（金枪人，1965年，17章）

- 第1章："Can I Help You?"（起始行1）
- 第2章：Attentat!（起始行56）
- 第3章："Pistols" Scaramanga（起始行96）
- 第4章：The Stars Foretell（起始行135）
- 第5章：No. 3 -1/2 Love Lane（起始行208）
- 第6章：The Easy Grand（起始行265）
- 第7章：Un-real Estate（起始行321）
- 第8章：Pass the Canapes!（起始行355）
- 第9章：Minutes of the Meeting（起始行409）
- 第10章：Belly-Lick, etc.（起始行446）
- 第11章：Ballcock, and Other, Trouble（起始行481）
- 第12章：In a Glass, Very Darkly（起始行521）
- 第13章：Hear the Train Blow!（起始行552）
- 第14章：The Great Morass（起始行591）
- 第15章：Crab-meat（起始行621）
- 第16章：The Wrapup（起始行663）
- 第17章：Endit（起始行698）

### 14 Octopussy and The Living Daylights（八爪女与黎明生死线，1966年，3章）

- 第1章：OCTOPUSSY（起始行1）
- 第2章：THE LIVING DAYLIGHTS（起始行160）
- 第3章：THE PROPERTY OF A LADY（起始行279）

## 四、完整性核查方法

- 编码：file命令逐本确认UTF-8带BOM；全文检索U+FFFD替换字符，14本均为0个。
- 重复：sha256逐本比对，14个哈希全部不同，无重复文件。
- 截断：逐本读最后300字节，结尾均为完整句子或THE END，未见半截词句。
- 缺章：章节标题按本版txt形态逐本提取并核对连续性（裸数字1-N连续、罗马数字连续、词数标题连续、数字加点1.-N.连续），13本通过；八爪女以故事标题为索引单位，已确认3篇。
- 章节标题格式14本不统一，详见knowledge/manifest.json中chapter_list。

## 五、已知缺口

- 八爪女：第4篇007 in New York本版全文0次出现，是否缺篇待换版核对。knowledge/novels/novel-14.json中reading.coverage_note已记录，绝不编造第4篇内容。
- 生死关头、月亮牌章节数以本版txt识别为准（23章、25章），与常见版本章节数如有出入，以换版核对为准，不擅自改数。
- 各书中文译名采用通用译法，译名版本差异待用户确认。
