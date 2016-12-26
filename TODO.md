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
| 11 | M | Add edges (object that could be used to show visual connections between nodes) | to test  | [DataStruct] |
| 12 | M | Test A in AlgTest.html | to continue | [AlgTest](test/algTest.html) |
| 13 | L | Adding a dynamic real-time table/update (e.g: news feeds) | to add |  |
| 14 | L | Adding the real-time chat feature as well as the console one | to add | |
| 15 | L | Currency conversion | to add | [Maths] |
| 17 | L | History (event history, command history, viewed pages, ...) | to add | |
| 18 | M | Colour.getColourName() | to continue | [UI] |
| 19 | M | greyish hover effect for rows/columns headers that would highlight the whole row/column | to add | [UI] |
| 20 | H | Add to validate(): select, datetime, datetime-local, time, month, range, search, week, url; | to add | [DOM]~[validate()](1.1/modules/DOM.js~validate) |
| 21 | H | Fully functional NoSQL/NoPHP server/database | to do | [Web] |
| 22 | M | Event listeners to server, DB, WebPage and WebApp (see #3) | to add/continue | |
| 23 | L | double DES, triple (2/3-key) DES, MiTM attack | to add | [Security] |
| 24 | L | code highlighting feature for editors | to continue | [Web]~[Editor.highlightSyntax](1.1/modules/Web.js~Editor.highlightSyntax) |
| 25 | L | Parser for ASM/MIPS, Batch, Java, Python to DHTML/PHP and eventually to ASM/MIPS | to continue | [Web]~[Parser.run](1.1/modules/Web.js~Parser.run) |
| 26 | M | AI system that stores it's rules in a database and update it after learning | to continue | [Misc]~[AI](1.1/modules/Misc.js~AI) |
| 27 | H | Combinations maker: 3*\[a, b, c\] -> \[aaa, aab, aac, ..., ccc\] | to continue | [DataStruct]~[Comb](1.1/modules/DataStruct.js~Comb) |
| 28 | M | Path finding alg using IDA* | to continue | [DataStruct]~[IDAstar](1.1/modules/DataStruct.js~IDAstar) |
| 29 | M | Cumulative probabilities | to continue/add | [Maths] |
| 30 | M | Webpage templating | to continue | [Web]~webPage |
| 31 | L | Radial gradient generator | to continue | [UI]~radialGradient |
| 32 | L | WiFi testers | to improve | [Web] |
| 33 | M | eqSolver | to continue | [Maths]~eqSolver |
| 34 | M | 4x4+ matrix support for Array.rot | to continue | [essence]~Array.rot |
| 35 | M | 4x4+ matrix support for Array.det | to continue | [essence]~Array.det |
| 36 | M | 4x4+ matrix support for Array.getAdjoint | to continue | [essence]~Array.getAdjoint |
| 37 | M | 5x5+ matrix support for Array.translate | to continue | [essence]~Array.translate |
| 38 | L | msgBox() | to continue | [UI]~msgBox |
| 39 | L | WebApp | to continue | [Web]~WebApp |
| 40 | L | Debugger | to continue | [Web]~Debugger |
| 41 | M | FA | read about it and continue | [Misc]~FA |
| 42 | M | exp2dict | to continue | [Misc]~exp2dict |
| 43 | H | Alg formula to truth table | to continue | [Maths]~truthTable, [Maths]~getDNF, [Maths]~getCNF |
| 45 | M | Kruskal, Dijkstra and Prim algs | to do | [DataStruct] |
| 46 | H | Calendar | to improve | [Misc] |
| 47 | H | Array.getOccurrences() | to fix | [essence]~Array.getOccurrences |
| 48 | L | Array.revSort() which leaves a few elements unsorted | to fix | [essence]~Array.revSort |
| 49 | M | Machine.parse() for other bases than base 16 which tries to get string with a code "out of the visible" | to fix | [Misc]~Machine.parse |
| 50 | M | QueueList | to fix | [DataStruct]~QueueList |
| 51 | M | Archive.getResult | to fix | [DataStruct]~Archive |
| 52 | H | A+reconPath | to fix (in progress) | [DataStruct]~A |
| 53 | H | Something like Java's System.in that allows the code to grab the user's input without having to use JS prompt, contentEditable or HTML's input/textarea fields | to fix | [Misc]~Sys, [essence]~Essence.ask |
| 54 | H | Getting $Data.save() to save at the desired place and making sure the rest works | to fix | [Files]~$Data |
| 55 | H | Array.(min/max)(Avg/Mean)() | to rectify | [essence]~Array |
| 56 | H | Moving onto 1.2 using ES6+Node.js(+ExpressJS) | to do | |
| 57 | L | Add an element creator (a bit like in React) such that: createElement("tagname", {attr: val, ..., onEvt: handler, ...}, "Value") will create an object (Component) which will be transformed into this <tagname attr="val" onEvt="handler(this)">Value</tagname> after being rendered by a renderer | to add | [Dom]~createComponent (React.createElement), [UI]~renderComponent |

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