| Id | Priority | Description | Status | Where |
| ---- | ------- | ----- | ---- | ---- |
| 0 | M | Get the spider working | In progress | [Files] |
| 1 | L | Improve getResources() | to do | [DOM] |
| 2 | L | Improve Console() | to do | [Web] |
| 3 | M | Comparing DB and server's event handlers/listeners and use the best for the rest | to do |  |
| 4 | M | Finish daynightMode() (using Dom*() | stuck | [UI] |
| 5 | M | Add a complete thing for DocTemplate (to avoid having to add manually of the things) | to do | [DOM] |
| 7 | H | Rewrite README.md | to do | [README](README.md) |
| 8 | L | Test DES() | to do | [Security] |
| 9 | L | Add an URL (or any good) pipeline to BuddyGit to send updates to the github website for each releases | to do |  |
| 10 | H | Add tutorials and a demo | to do  |  |
| 11 | M | Test A in AlgTest.html | to continue | [AlgTest](test/algTest.html) |
| 12 | L | Adding a dynamic real-time table/update (e.g: news feeds) | to add |  |
| 13 | L | Adding the real-time chat feature as well as the console one | to add | |
| 14 | L | Currency conversion | to add | [Maths] |
| 15 | L | History (event history, command history, viewed pages, ...) | to add | |
| 16 | M | Colour.getColourName() | to continue | [UI] |
| 17 | M | greyish hover effect for rows/columns headers that would highlight the whole row/column | to add | [UI] |
| 18 | H | Add to validate(): select, datetime, datetime-local, time, month, range, search, week, url; | to add | [DOM]~[validate()](1.1/modules/DOM.js~validate) |
| 19 | H | Fully functional NoSQL/NoPHP server/database | to do | [Web] |
| 20 | M | Event listeners to server, DB, WebPage and WebApp (see #3) | to add/continue | |
| 21 | L | double DES, triple (2/3-key) DES, MiTM attack | to add | [Security] |
| 22 | L | code highlighting feature for editors | to continue | [Web]~[Editor.highlightSyntax](1.1/modules/Web.js~Editor.highlightSyntax) |
| 23 | L | Parser for ASM/MIPS, Batch, Java, Python to DHTML/PHP and eventually to ASM/MIPS | to continue | [Web]~[Parser.run](1.1/modules/Web.js~Parser.run) |
| 24 | M | AI system that stores it's rules in a database and update it after learning | to continue | [Misc]~[AI](1.1/modules/Misc.js~AI) |
| 25 | H | Combinations maker: 3*\[a, b, c\] -> \[aaa, aab, aac, ..., ccc\] | to continue | [DataStruct]~[Comb](1.1/modules/DataStruct.js~Comb) |
| 26 | M | Path finding alg using IDA* | to continue | [DataStruct]~[IDAstar](1.1/modules/DataStruct.js~IDAstar) |
| 27 | M | Cumulative probabilities | to continue/add | [Maths] |
| 28 | M | Webpage templating | to continue | [Web]~webPage |
| 29 | L | Radial gradient generator | to continue | [UI]~radialGradient |
| 30 | L | WiFi testers | to improve | [Web] |
| 31 | M | eqSolver | to continue | [Maths]~eqSolver |
| 32 | M | 4x4+ matrix support for Array.rot | to continue | [essence]~Array.rot |
| 33 | M | 4x4+ matrix support for Array.det | to continue | [essence]~Array.det |
| 34 | M | 4x4+ matrix support for Array.getAdjoint | to continue | [essence]~Array.getAdjoint |
| 35 | M | 5x5+ matrix support for Array.translate | to continue | [essence]~Array.translate |
| 36 | L | msgBox() | to continue | [UI]~msgBox |
| 37 | L | WebApp | to continue | [Web]~WebApp |
| 38 | L | Debugger | to continue | [Web]~Debugger |
| 39 | M | FA | read about it and continue | [Misc]~FA |
| 40 | M | exp2dict | to continue | [Misc]~exp2dict |
| 41 | H | Alg formula to truth table | to continue | [Maths]~truthTable, [Maths]~getDNF, [Maths]~getCNF |
| 42 | M | Kruskal and Prim algs | to improve and test | [DataStruct] |
| 43 | H | Calendar | to improve | [Misc] |
| 44 | H | Array.getOccurrences() | to fix | [essence]~Array.getOccurrences |
| 45 | L | Array.revSort() which leaves a few elements unsorted | to fix | [essence]~Array.revSort |
| 46 | M | Machine.parse() for other bases than base 16 which tries to get string with a code "out of the visible" | to fix | [Misc]~Machine.parse |
| 47 | M | QueueList | to fix | [DataStruct]~QueueList |
| 48 | M | Archive.getResult | to fix | [DataStruct]~Archive |
| 49 | H | A+reconPath | to fix (in progress) | [DataStruct]~A |
| 50 | H | Something like Java's System.in that allows the code to grab the user's input without having to use JS prompt, contentEditable or HTML's input/textarea fields | to fix | [Misc]~Sys, [essence]~Essence.ask |
| 51 | H | Getting $Data.save() to save at the desired place and making sure the rest works | to fix | [Files]~$Data |
| 52 | H | Array.(min/max)(Avg/Mean)() | to rectify | [essence]~Array |
| 53 | H | Moving onto 1.2 using ES6+Node.js(+ExpressJS) | to do | |
| 54 | L | Add an element creator (a bit like in React) such that: createElement("tagname", {attr: val, ..., onEvt: handler, ...}, "Value") will create an object (Component) which will be transformed into this <tagname attr="val" onEvt="handler(this)">Value</tagname> after being rendered by a renderer | to add | [Dom]~createComponent (React.createElement), [UI]~renderComponent |
| 55 | L | Virtual DOM (see [that](https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060#.y68b4v9rg)) | to add | [DOM] |

[essence]: 1.1/essence.js
[Ajax]: 1.1/modules/Ajax.js
[DataStruct]: 1.1/modules/DataStruct.js
[DOM]: 1.1/modules/DOM.js
[Files]: 1.1/modules/Files.js
[Maths]: 1.1/modules/Maths.js
[Misc]: 1.1/modules/Misc.js
[QTest]: 1.1/modules/QTest.js
[Security]: 1.1/modules/Security.js
[UI]: 1.1/modules/UI.js
[Web]: 1.1/modules/Web.js