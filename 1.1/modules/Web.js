/**
 * @module Web
 * @description Web stuff
 * @version 1.0
 * @since 1.1
 * @license MIT
 * @author Maximilian Berkmann <maxieberkmann@gmail.com>
 * @copyright Maximilian Berkmann 2016
 * @requires ../essence
 * @namespace
 * @type {{name: string, version: number, run: Web.run, description: string, dependency: Array, author: string, complete: boolean}}
 * @since 1.1
 * @exports Web
 */
var Web = {
    name: "Web",
    version: 1,
    run: function () {

    },
    description: "Web stuff",
    dependency: [],
    author: "Maximilian Berkmann",
    complete: false,
    toString: function () {
        return "Module(name='" + this.name + "', version=" + this.version + ", description='" + this.description + "', author='" + this.author + "', complete=" + this.complete + ", run=" + this.run + ")";
    }
};

(function () {
    Web.complete = true;
})();

/**
 * @description Gather the cookie named $c_name
 * @param {string} c_name Cookie name
 * @returns {undefined|string} Cookie
 * @see setCookie
 * @since 1.0
 * @func
 */
function getCookie (c_name) {
    var x, y, cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length;i++) {
        x = cookies[i].substr(0, cookies[i].indexOf("="));
        y = cookies[i].substr(cookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x === c_name) return decodeURIComponent(y)
    }
}

/**
 * @description Create a cookie
 * @param {string} c_name Cookie name
 * @param {*} value Cookie value
 * @param {number} exdays Expiration days
 * @returns {undefined}
 * @see getCookie
 * @since 1.0
 * @func
 */
function setCookie (c_name, value, exdays) {
    exdays? exdays %= 99983489: exdays = 99983488; //As 99983488 is the maximum value
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = encodeURIComponent(value) + ((exdays === null) ? "" : "; expires = " + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value
}

/**
 * @description Local/session database
 * @param {string} [name="Database"] Database name
 * @param {Array} [headR=range(100)] Header rows
 * @param {Array} [cells=[].fill("...")] Cells
 * @param {Array} [headC=["Index", "Value"]] Header columns
 * @param {string} [admin="Anonymous"] Admin's name
 * @param {number} [ver=1.0] Version
 * @this database
 * @returns {database} Database
 * @since 1.0
 */
function database (name, headR, cells, headC, admin, ver) { //Local database
    this.name = name || "Database";
    this.headerRow = (isNon(headR))? range(100): headR;
    this.content = (isNon(cells))? [].fill("..."): cells;
    this.headerCol = headC || ["Index", "Value"];
    this.admin = admin || "Anonymous";
    this.version = ver || 1.0;
    this.val = new Array(this.headRow.length);
    for(var i = 0; i < this.val.length; i++) this.val[i] = new Array(headC.length);
    for(i = 0; i < this.headerCol.length; i++) this.val[0][i] = this.headerCol[i];
    for (i = 0; i < this.content.length; i++) {
        this.val[i][0] = (this.headerRow)? this.headerRow[i]: i;
        for (var j = 0; j < this.content[i].length; j++) {
            this.val[i][j + 1] = this.content[i][j];
        }
    }
    this.setStorage = function () {
        localStorage[this.name] = JSON.stringify(this.val)
    };
    this.html = complexTable(this.name, this.headerRow, this.content, this.headerCol, name);
    this.css = "<style>*{font-family:Consolas,Segoe UI,Tahoma;}table{background: #000;}table,td,th{border:1px solid #000;color:#000;background:#fff;}tr:nth-child(even) td,tr:nth-child(even) th{background:#eee;}</style>";
    this.disp = function (elmId) {
        var place = (elmId)? "#" + elmId: "body";
        $e(place).write(this.html + this.css,true);
        this.setStorage();
    };
    this.update = function () {
        if (localStorage[this.name]) this.val = JSON.parse(localStorage[this.name]);
        else this.setStorage()
    };
    this.searchAndRemove = function (vals) { //Vals = range|..
        for (var n = 0; n < vals.length; n++) {
            for (var i = 0; i < this.val.length; i++) {
                for (var j = 0; j < this.val.length; j++) {
                    if (this.val[i][j] == vals[n]) this.val[i][j] = null;
                }
            }
        }
    };
    this.remove = function (xs, ys) { //Vals = range|..
        for (var i = 0; i < xs.length; i++) {
            for (var j = 0; j < ys.length; j++) {
                this.val[ys[j]][xs[i]] = null;
            }
        }
    };

    return this;
}

/**
 * @description Process
 * @param {string} name Name of the process
 * @param {string} [auth="Anonymous"] Author
 * @param {string} [summup=""] Summary
 * @param {string} [ctt=""] Content
 * @returns {process} Process
 * @since 1.0
 */
function process (name, auth, summup, ctt) {
    this.name = name;
    this.author = auth || "Anonymous";
    this.bitsize = 0; //Size in binary unit
    this.description = summup || "";
    this.content = ctt || "";
    this.sig = this.name[0] + this.name[this.name.length - 1] + this.name.prod() + this.author.slice(0, 2) + "-" + (getType(this.content))[0];
    //Rights/privileges ?!
    this.update = function () {
        if (this.author != auth || this.author === "Anonymous" || isNon(this.author)) this.sig = this.name[0] + this.name[this.name.length-1] + "-" + this.name.prod() + this.author.slice(0, 2) + "-" + getType(this.content)[0]//H4ck
        else this.sig = this.name[0] + this.name[this.name.length - 1] + this.name.prod() + this.author.slice(0, 2) + "-" + (getType(this.content))[0];;
        if (this.sig[this.sig.length - 1] === "N") this.bitsize = 8 * conv(this.content, 10, 2).sum();
        else if (this.sig[this.sig.length - 1] === "B") this.bitsize = 8;
        else if (this.sig[this.sig.length - 1] === "A") this.bitsize = (is2dArray(this.content))? 8 * this.content.numElm(): 8 * this.content.length;
        else if (this.sig[this.sig.length - 1] === "O") this.bitsize = 0;
        else if (this.sig[this.sig.length - 1] === "S") this.bitsize = 8 * this.content.length;
        else this.bitsize = null;
    };
    this.update();
    this.askPermission = function (serv) {
        this.update();
        serv.add(this);
    };
    this.destroy = function () {
        Essence.say("The process named " + this.name + " (created by " + this.author + ") has been destroyed !", "info");
        this.delete();
    };
    Essence.addProcess(this);

    return this;
}

/**
 * @description Server
 * @todo Content<->> database issues to fix
 * @param {string} name Name
 * @param {string} admin Admin
 * @param {string} [type="data"] Type
 * @param {number} [ver=1.0] Version
 * @param {number} [mxsz=2⁶] Maximum size of the server's database
 * @returns {server} Server
 * @see database
 * @since 1.0
 */
function server (name, admin, type, ver, mxsz) {
    this.name = name;
    this.admin = admin;
    this.version = ver || 1.0;
    this.maxsize = mxsz || Math.pow(2, 14);
    this.nb_slots = Math.pow(2, 6);
    this.slots = mkArray(this.nb_slots, 1, "empty");
    this.type = type || "data";
    this.type = this.type.toLowerCase();
    if (this.type === "data") this.data = new database(this.name, range(1, 1, this.maxsize), this.slots, ["Index", "Value"], this.admin, this.version);
    else if (this.type === "process") this.data = new database(this.name, range(1, 1, this.maxsize), this.slots, ["N°", "Name", "Author", "Description", "Content", "Bit size"], this.admin, this.version);
    else if (this.type === "storage") this.data = new database(this.name, range(1, 1, this.maxsize), this.slots, ["Key", "Value"], this.admin, this.version);
    else if (this.type === "authentification") this.data = new database(this.name, range(1, 1, this.maxsize), this.slots, ["Username", "Password", "Email", "Hash"], this.admin, this.version);
    else if (this.type === "register" || this.type =="details") this.data = new database(this.name, range(1, 1, this.maxsize), this.slots, ["First name", "Last Name", "Title", "Email", "Phone", "Sex", "City/Country", "Birthday", "Websites", "Job", "Quote"], this.admin, this.version);
    else if (this.type === "location") this.data = new database(this.name, range(1, 1, this.maxsize), this.slots, ["Name", "Longitude", "Latitude"], this.admin, this.version);
    else throw new Error(this.type + " is an invalid server type.");
    this.addProcess = function (pcs) {
        if (pcs.sig.last() === "-" || pcs.bitsize > this.maxsize/this.nb_slots) console.log("[Server:" + name + "] The process named " + pcs.name + " has been rejected");
        else {
            var pos;
            for (var i = 0; i < this.nb_slots; i++) {
                if (isNon(this.slots[i])) {
                    this.slots[i] = [pcs.name, pcs.author, pcs.description, pcs.content, pcs.bitsize];
                    pos = i;
                    i = this.nb_slots;break;
                }
            }
            if (this.slots[pos] != [pcs.name, pcs.author, pcs.description, pcs.content, pcs.bitsize] && this.nb_slots < this.maxsize) { //Check if the process was added to the server
                this.nb_slots += this.maxsize / this.nb_slots//Extend by one slot
                this.slots[this.nb_slots] = [pcs.name, pcs.author, pcs.description, pcs.content, pcs.bitsize];
            }
        }
    };
    this.add = function (data) {
        var pos;
        for (var i = 0; i < this.nb_slots; i++) {
            if (isNon(this.slots[i])) {
                this.slots[i] = JSON.stringify(this);
                pos = i;
                i = this.nb_slots;
                break;
            }
        }
        if (this.slots[pos] != data && this.nb_slots < this.maxsize) { //Check if the process was added to the server
            this.nb_slots += this.maxsize / this.nb_slots; //Extend by one slot
            this.slots[this.nb_slots] = JSON.stringify(this);
        }
    };
    this.rm = function (n) {
        this.slots[n] = null
    };
    this.store = function () {
        localStorage["server_" + this.name] = JSON.stringify(this)
    };
    this.update = function () {
        if (localStorage["server_" + this.name]) {
            this.name = localStorage["server_" + this.name].name;
            this.admin = localStorage["server_" + this.name].admin;
            this.version = localStorage["server_" + this.name].version;
            this.maxsize = localStorage["server_" + this.name].maxsize;
            this.nb_slots = localStorage["server_" + this.name].nb_slots;
            this.slots = JSON.parse(localStorage["server_" + this.name].slots);
            this.data = localStorage["server_" + this.name].data;
        }else this.store()
    };
    this.fire = function (pcs) {
        for (var i in this.slots) {
            if (this.slots.hasOwnProperty(i) && this.slots[i][0] === pcs.name && this.slots[i][1] === pcs.author) this.rm(i);
        }
    };
    this.reset = function () {
        for(var i in this.slots) {
            if(this.slots.hasOwnProperty(i)) this.rm(i)
        }
    };
    Essence.addServer(this);

    return this;
}

/**
 * @description Launch the verification of the connection
 * @param {string} id ID of the element to be used
 * @param {string} [src="../img/random2000x2000.jpg"] Source of the image to use for the test
 * @param {number} [sz=61784] Size of the image (in kb)
 * @param {number} [delay=100] Delay (in ms)
 * @param {number} [maxDelay=2e4] Maximum delay
 * @returns {undefined}
 * @see CETimer
 * @since 1.0
 * @func
 */
function CECheck (id, src, sz, delay, maxDelay) {
    window.defaultStatus = "Evalue the connexion and see the downloading speed";
    if (!src) src = "../img/random2000x2000.jpg";
    if (!sz) sz = 61784; //7.723kB -> kb
    if (!delay) delay = 100; //ms
    if (!maxDelay) maxDelay = 2e4;
    var img = new Image();
    $G["t1"] = new Date().getTime();
    $G["t2"] = 0;
    img.src = src + "?t1=" + $G["t1"]; //To prevent the browser to load a cached version of the image

    $e("#" + id).write("Verification in progress...");
    setTimeout("CETimer('" + id + "', '" + img + "', 0, " + delay + ", " + maxDelay + ", " + sz + ")", delay); //Uncaught SyntaxError: Unexpected identifier
}

/**
 * @description Connection evaluation timer
 * @param {string} id ID of the element to be used
 * @param {string} img Image to use for the test
 * @param {number} nb Number of attempts done
 * @param {number} [delay=100] Delay (in ms)
 * @param {number} [maxDelay=2e4] Maximum delay
 * @param {number} size Size of the image (in kb)
 * @returns {undefined}
 * @see CECheck
 * @since 1.0
 * @func
 */
function CETimer (id, img, nb, delay, maxDelay, size) {
    nb++;
    $e("#" + id).write("Verification in progress...");
    if (nb * delay >= maxDelay) $e("#" + id).write(evalDownload(0)); //End of the maximimun delay
    else {
        if (img.complete) {
            $G["t2"] = new Date().getTime();
            $e("#" + id).write(evalDownload(size / ($G["t2"] - $G["t1"])));
            Essence.time("Connexion: " + (size / ($G["t2"] - $G["t1"]).toNDigits(3) + " kbps"));
        } else setTimeout("CETimer(" + id + ", " + img + ", " + nb + ", " + delay + ", " + maxDelay + ", " + size + ")", delay);
    }
}
/*
 ping (ms)
 <0, 30>: excellent
 >30, 60>: really good
 >60, 100>: good
 >100, 200>: okay
 >200, 300>: poor
 >300: bad
 latency is the client-server packet transmit when ping is the go and return of that

 gigue (ms): connexion fluctuation
 <5: synchronized connexion

 download speed (kbps/Mbps):
 <0, 56>: low debit
 >56, 8M>: ADSL debit
 >8M, 20M>: ADSL2+
 >20M, 50M>: wire
 >50M, 100M>: optical fibre
 >100M: Ethernet

 upload speed:
 <0, 56>: low debit
 >56, 1M>: ADSL+
 >1M, 5M>: wire
 >5M, 100M>: Ethernet
 */
/**
 * @description Evaluate the download speed
 * @param {number} kbps Speed (in kb/s)
 * @returns {string} Result
 * @since 1.0
 * @func
 */
function evalDownload (kbps) {
    var res = "";
    if (kbps === 0) res = "No connexion";
    else if (kbps > 0 && kbps <= 56) res = "Low debit";
    else if (kbps > 56 && kbps <= 8e3) res = "ADSL debit";
    else if (kbps > 8e3 && kbps <= 2e4) res = "ADSL2 + ";
    else if (kbps > 2e4 && kbps <= 5e4) res = "wire";
    else if (kbps > 5e4 && kbps <= 1e5) res = "optical fibre";
    else res = "Ethernet";
    return res + " (" + kbps.toNDigits(3) +" kbps)"
}

/**
 * @description Evaluate the upload speed
 * @param {number} kbps Speed (in kb/s)
 * @returns {string} Result
 * @since 1.0
 */
function evalUpload (kbps) {
    var res = "";
    if (kbps === 0) res = "No connexion";
    else if (kbps > 0 && kbps <= 56) res = "Low debit";
    else if (kbps > 56 && kbps <= 1e3) res = "ADSL + ";
    else if (kbps > 1e3 && kbps <= 5e3) res = "wire";
    else res = "Ethernet";
    return res + " (" + kbps.toNDigits(3) +" kbps)"
}

/**
 * @description Evaluate the ping speed
 * @param {number} ms Number of milliseconds
 * @returns {string} Result
 * @since 1.0
 * @func
 */
function evalPing (ms) {
    var res = "";
    if (ms > 0 && ms <= 30) res = "Excellent";
    else if (ms > 30 && ms <= 60) res = "Really good";
    else if (ms > 60 && ms <= 100) res = "Good";
    else if (ms > 100 && ms <= 200) res = "Okay";
    else if (ms > 200 && ms <= 300) res = "Poor";
    else if (ms > 300 && ms <= 400) res = "Bad";
    else res = "Really bad";
    return res + " (" + ms +" ms)"
}

/**
 * @description Getting the URL parameters just like in PHP.
 * @param {string|string[]} p Parameter(s)
 * @param {Function} action Action to be done with the value(s) of the parameter(s)
 * @returns {undefined}
 * @since 1.0
 * @func
 */
function parseURL (p, action) { //Doing some PHP without PHP :) !!
    var urlQuery = location.href.split("?");
    if (urlQuery.length > 1) {
        var urlTerms = urlQuery[1].split("&");
        if (isType(p, "Array")) { //Multi parameter parsing
            for (var j = 0; j < p.length; j++) {
                for (var i = 0; i < urlTerms.length; i++) {
                    var param = urlTerms[i].split("=");
                    if (param[0] === p[j]) {
                        if (isType(action, "Array")) action[j](param[1], param[0]);
                        else action(param[1], param[0]);
                    }
                }
            }
        } else {
            for (i = 0; i < urlTerms.length; i++) {
                param = urlTerms[i].split("=");
                if (param[0] === p) action(param[1]);
            }
        }
    }
}

/**
 * @description Web page builder.
 * Structure components:
 - header: header with a title and a logo
 - h-menu: horizontal menu with icons
 - v-menu: vertical menu
 - content: "welcome to " + this.title
 - aside: side section for news feed or anything you want to use it for
 - footer: footer with the sponsors (if there's at least one), name of the author(s)
 - article: new paper article like section
 - search: search bar
 Structuration:
 ! : new line (header!h-menu means that the h-menu is under the header)
 | : at the right (content|aside means that the aside section is placed on the right of the content section)
 * @param {string} [title="My web page"] Title
 * @param {string} [name="index.html"] Name
 * @param {string} [path="index.html"] Path
 * @param {string} [author="Maximilian Berkmann"] Author
 * @param {number} [ver=1.0] Version
 * @param {string} [stct="header!h-menu!content|aside!footer"] Structure
 * @param {string} [type="html"] Type
 * @param {string} [subtitle="A simple web page"] Subtitle
 * @constructor
 * @this {WebPage}
 * @returns {WebPage} Web page
 * @see WebApp
 * @since 1.0
 */
function WebPage (title, name, path, author, ver, stct, type, subtitle) {
    this.title = title || "My web page";
    this.subtitle = subtitle || "A simple web page";
    this.type = type.normal() || "html";
    this.name = name + this.type || "index." + this.type;
    this.path = path + "/" + this.name || this.name;
    this.author = author || "Maximilian Berkmann";
    this.version = ver || 1.0;
    this.structure = stct || "header!h-menu!content|aside!footer";
    this.code = "";
    this.template = "";
    this.page = null;
    /* Structure:
     Components:
     - header: header with a title and a logo
     - h-menu: horizontal menu with icons
     - v-menu: vertical menu
     - content: "welcome to " + this.title
     - aside: side section for news feed or anything you want to use it for
     - footer: footer with the sponsors (if there's at least one), name of the author(s)
     - article: new paper article like section
     - search: search bar
     Structuration:
     ! : new line (header!h-menu means that the h-menu is under the header)
     | : at the right (content|aside means that the aside section is placed on the right of the content section)
     */
    //Templating /(\{\{)\w * (\}\}) */g

    this.word2code = function (word) {
        switch (word.normal()) {
            case "header": return "<header><img src='img/icon.png' /><hgroup><h1>{{title}}</h1><h3>{{subtitle}}</h3></hgroup></header>";
            case "h-menu": return "<menu class='h-menu'><li onClick=''>{{0}}</li><li onClick=''>{{1}}</li><li onClick=''>{{2}}</li></menu>";
            case "v-menu": return "<menu class='v-menu'><li onClick=''>{{0}}</li><li onClick=''>{{1}}</li><li onClick=''>{{2}}</li></menu>";
            case "content": return "<div id='content'>{{content}}</div>";
            case "aside": return "<aside>{{aside}}</aside>";
            case "footer": return "<footer>{{footer}}</footer>";
            case "article": return "<article id='{{article_title}}'><header>{{article_title}}</header>{{article_content}}<footer>{{article_footer}}</footer></div>";
            case "search": return "<form action='search.php' method='post'><input type='search' name='search' /><input type='image' src='img/search.png' alt='?' /></form>";
            default: return word
        }
    };

    this.genTemplate = function () { //Transform the structure into a template
        var cpnt = this.structure.split("!");
        this.template = "<table class='none'>";
        for (var i = 0; i < cpnt.length; i++) {
            this.template += "<tr>";
            var sct = cpnt.split("|");
            for(var j = 0; j < sct.length; i++) this.template += this.word2code(sct[i]);
            this.template += "</tr>";
        }
        this.template += "</table>";

        return this.template
    };

    this.genPage = function (params) { //Transform the template into a page
        this.page = new Template(this.title, this.name, this.template, ["title", "subtitle", "content", "aside", "footer", "0", "1", "2", "article_title", "article_content", "article_footer"]);
        return this.page.gen({
            title: this.title,
            subtitle: this.subtitle,
            content: params.content || $G["lorem"],
            aside: params.aside || "At the side",
            footer: params.footer || "An EssenceJS powered web page",
            article_content: params.articleContent || "Bla bla bla",
            article_title: params.articleTitle || "An article",
            article_footer: params.articleFooter || "By John Doe",
            0: "Home",
            1: "About us",
            2: "Contact us"
        });
    };

    return this;
}

/**
 * @description Web application
 * @param {string} [name="Web App"] Name
 * @param {string} [path=""] Path
 * @param {string} [author="Maximilian Berkmann"] Author
 * @param {number} [ver=1.0] Version
 * @param {string} [stct] Structure
 * @returns {WebApp} Web app
 * @this {WebApp}
 * @constructor
 * @see WebPage
 * @since 1.0
 */
function WebApp (name, path, author, ver, stct) {
    this.name = name || "Web App";
    this.path = path || "";
    this.author = author || "Maximilian Berkmann";
    this.version = ver || 1.0;
    this.dirs = ["img", "script", "style"]; //All dirs which are subdirectories of the path
    this.pages = [new WebPage(this.name, "index", this.path, this.author, this.ver, stct), new WebPage("Contact us", "contact", this.path, this.author, this.ver, stct), new WebPage("About us", "about", this.path, this.author, this.ver, stct)];

    this.build = function () { //Generate
        for(var i = 0; i < this.pages.length; i++) this.pages[i].genPage();
    };

    return this;
}

/**
 * @description Editor
 * @param {string} [id="#editor"] ID of the container
 * @param {string} [lang="none"] Language
 * @param {Preview} prev Preview
 * @param {Parser} [parser] Parser
 * @param {Toolbar} [tb=new Toolbar()] Toolbar
 * @this {Editor}
 * @returns {Editor} Editor
 * @constructor
 * @since 1.0
 */
function Editor (id, lang, prev, parser, tb) {
    this.id = id || "#editor";
    this.node = $n(this.id);
    this.linesId = "#lines";
    this.linesNode = $n(this.linesId);
    this.nbLines = 0;
    this.language = lang || "none";
    this.previewer = prev;
    this.parser = parser || (prev? this.previewer.associatedParser: null); //Sort of temporarily uncommented for linting sake
    this.code = $e(this.id).val();
    this.codeHistory = new virtualHistory(this.code);
    this.toolbar = tb || new Toolbar();
    this.toolbar.for = this;
    this.toggleLine = function (id) {
        $e("#" + id).setCSS("background", ($e("#" + id).css("background") === "rgba(0, 0, 0, 0)")? "red": "rgba(0, 0, 0, 0)");
    };
    this.update = function (n) {
        if (this.node != $n(this.id)) this.node = $n(this.id);
        if (this.linesNode != $n(this.linesId)) this.linesNode = $n(this.linesId);
        if (this.code != $e(this.id).val()) this.code = $e(this.id).val();

        n = n || (toPixel($e(this.id).css("height"))/(toPixel($e(this.id).css("fontSize")) * 1.12));
        $e(this.linesId).write("", true);
        this.nbLines = Math.round(n);
        for (var i = 1; i <= this.nbLines; i++) {
            $e(this.linesId).after("<span id = 'l_" + i+"' style = 'color: black;'>" + i+"</span><br />");
        }
        this.codeHistory.update(this.code);
        this.toolbar.update();
        for(i = 0; i < this.toolbar.tools.length; i++) this.toolbar.fn[i] = this[this.toolbar.tools[i]]
    };
    this.write = function (txt) {
        $e(this.id).after(txt);
        this.codeHistory.update(this.code); //To avoid adding code states that are the same even if the set will take care of duplicates
    };
    this.clear = function () {
        $e(this.id).write("");
        this.codeHistory.reset()
    };
    this.undo = function () {
        this.codeHistory.undo();
        $e(this.id).write(this.codeHistory.src)
    };
    this.redo = function () {
        this.codeHistory.redo();
        $e(this.id).write(this.codeHistory.src)
    };
    this.save = function () { //Save the actual code
        save($e(this.id).val(), "script" + getTimestamp() + ".ws", "webscript")
    };
    this.select = function () {
        this.node.select()
    };
    this.copy = function () {
        copyToClipboard($e(this.id).val(), "webscript")
    };
    this.paste = function (override) {
        override? $e(this.id).write(clipboardData.getData("webscript")): this.write(clipboardData.getData("webscript"))
    };
    this.load = function () {
        var file = prompt("File: ", ".ws");
        this.clear();
        getFileContent(file);
        $e(this.id).write($G["fct"])
    };
    this.generate = function () { //Save the parsed code
        if (this.previewer) /\<\?php([\s\S] * ?)\?\>/.test($e(this.id).val())? save($e(this.previewer.id).val(true), "script" + getTimestamp() + ".php", "php"): save($e(this.previewer.id).val(true), "script" + getTimestamp() + ".html", "html");
        else /\<\?php([\s\S] * ?)\?\>$/g.test($e(this.id).val())? save($e("#preview").val(true), "script" + getTimestamp() + ".php", "php"): save($e(prev.id).val(true), "script" + getTimestamp() + ".html", "html")
    };
    this.view = function () {
        this.previewer.run($e(this.id).val(), true)
    };
    this.highlightSynthax = function (code, lang) { //Highlight in the corresponding language and return an HTML result
        switch (lang.normal()) {
            case "html":
                //HTML synthax highlighting rules
                break;
            case "javascript":
                //JavaScript synthax highlighting rules
                break;
            case "css":
                //CSS synthax highlighting rules
                break;
            case "php":
                //PHP synthax highlighting rules
                break;
            case "mips":
                //MIPS synthax highlighting rules
                break;
            case "batch":
                //Batch synthax highlighting rules
                break;
            case "bash":
                //Bash synthax highlighting rules
                break;
            case "java":
                //Java synthax highlighting rules
                break;
            case "c++":
                //C/C++ synthax highlighting rules
                break;
            case "python":
                //Python synthax highlighting rules
                break;
            case "xml":
                //XML synthax highlighting rules
                break;
            case "webscript":
                code = code.replace(/(\<|\>|\/\>)([A-Za-z]*|)(\<|\>|\/\>)/g, "<span class = 'code-tag'>$1</span>");
                code = code.replace(/(\"|\')(.*)(\"|\')/g, "<span class = 'code-str'>$1</span>");
                code = code.replace(/(?!\"|\')(\d+)(?!\"|\')/g, "<span class = 'code-num'>$1</span>");
                code = code.replace(/([\s\S] * ?)(=)/g, "<span class = 'code-attr'>$1</span>");
                code = code.replace(/\<\!--([\s\S]*)--\>/g, "<span class = 'code-cmt'>$1</span>");
                code = code.replace(/\/\/(.*?)/g, "<span class = 'code-cmt'>$1</span>");
                code = code.replace(/=[A-Za-z0-9\.]+(| )/g, "<span class = 'code-val'>$1</span>");
                code = code.replace(/[=\{\}\[\]\(\)\;]/g, "<span class = 'code-op'>$1</span>");
                break;
            case "markdown":
                //Markdown synthax highlighting rules
                break;
            default: //Normal text
        }
        return code
    };

    return this;
}

/**
 * @descrition Previewer for IDEs.
 * @param {string} [id="#preview"] ID of the container
 * @param {string} [lang="none"] Language
 * @param {Parser} [parser=new Parser()"] Parser
 * @param {Editor} [editor=new Editor()"] Editor
 * @this {Preview}
 * @returns {Preview} Previewer
 * @constructor
 * @since 1.0
 */
function Preview (id, lang, parser, editor) {
    this.id = id || "#preview";
    this.node = $n(this.id);
    this.language = lang || "none";
    this.associatedParser = parser || new Parser();
    this.associatedEditor = editor || new Editor();
    this.update = function () {
        if (this.node != $n(this.id)) this.node = $n(this.id);
    };
    this.run = function (txt, parseFirst) {
        $e(this.id).write(parseFirst? this.associatedParser.run(txt): txt, true)
    };
    this.viewCode = function () {
        var win = open("", "Resulting code", "width = 800,height = 600,location = no,menubar = yes,scrollbars = yes,status = no,toolbar = yes"), code = escapeHTML($e(this.id).val(true));
        code = code.replace(/\n/g, "<br />");
        code = code.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
        win.document.write(this.associatedEditor.highlightSynthax(code, this.language));
        win.document.write("<style>" + Essence.css + "</style>")
    };

    return this;
}

/**
 * @description Debugger
 * @todo Work on it
 * @param {string} [id="#debugger"] ID of the container
 * @param {string} [lang="none"] Language
 * @returns {Debugger} Debugger
 * @this {Debugger}
 * @constructor
 * @since 1.0
 */
function Debugger (id, lang) {
    this.id = id || "#debugger";
    this.node = $n(this.id);
    this.language = lang || "none";
    this.update = function () {
        if (this.node != $n(this.id)) this.node = $n(this.id);
    };
    this.run = function () {
        //Useful node stuff: reportValidity(), validity{}, setCustomValidity()
    };

    return this;
}

/**
 * @description Dummy text
 * @type {string}
 * @returns {undefined}
 * @since 1.0
 * @memberof $G
 */
$G["lorem"] = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,";

/**
 * @description Language parser
 * @param {string} [from="WebScript"] Parsed language
 * @param {string} [to="DHTML"] Resulting language
 * @param {Function} [customParse= function(code){...] Custom parsing
 * @this {Parser}
 * @constructor
 * @since 1.0
 */
function Parser (from, to, customParse) {
    this.from = from || "WebScript";
    this.to = to || "DHTML";
    this.run = customParse || function (code) {
            var res = code;
            res = res.replace(/<tab \/>/gm, "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
            res = res.replace(/\{\{tab}}/gm, "\t");
            res = res.replace(/<info>(.*?)<\/info>/gm, "<span class='block info'>$1</span>");
            res = res.replace(/<question>(.*?)<\/question>/gm, "<span class='block question'>$1</span>");
            res = res.replace(/<error>(.*?)<\/error>/gm, "<span class='block error'>$1</span>");
            res = res.replace(/<warning>(.*?)<\/warning>/gm, "<span class='block warning'>$1</span>");
            res = res.replace(/<success>(.*?)<\/success>/gm, "<span class='block success'>$1</span>");
            res = res.replace(/(\{\{)LOREM(}})/ig, $G["lorem"]);
            res = res.replace(/(?:\{\{)LOREM\x7c(\d+)-(\d+)(?:}})/ig, $G["lorem"].chunk("$1", "$2"));
            res = res.replace(/(?:\{\{)HW(?:}})/ig, "Hello World !");
            res = res.replace(/<icon \/>/gm, "<img src='img/icon.png' class='icon'/>");
            res = res.replace(/<icon size=(?:"|')(\w+)(?:"|') \/>/gm, "<img src='img/icon.png' class='icon' style='width: $1; height: $1;' />");
            res = res.replace(/<icon name=(?:"|')(\w+)(?:"|') \/>/gm, "<img src='img/$1.png' class='icon' />");
            res = res.replace(/<(s|m|l|xs|xl):icon name=(?:\"|\')(\w+)(?:\"|\') \/>/gm, "<img src='img/$2.png' class='$1-icon' />");
            res = res.replace(/<js>([\s\S]*?)<\/js>/gm,"<script type='text/javascript'>$1<\/script>");
            res = res.replace(/<js src=(?:\"|\')(\w+)(?:\"|\') \/>/gm,"<script type='text/javascript' src='$1'><\/script>");
            res = res.replace(/<vb>([\s\S]*?)<\/vb>/gm, "<script type='text/vbscript'>$1<\/script>");
            res = res.replace(/<vb src=(?:\"|\')(\w+)(?:\"|\') \/>/gm,"<script type = 'text/vbscript' src='$1'><\/script>");
            res = res.replace(/<css>([\s\S]*?)<\/css>/gm, "<style type='text/css'>$1</style>");
            res = res.replace(/<css href=(?:\"|\')([A-Za-z_ -\.]+)(?:\"|\') \/>/gm, "<link rel='stylesheet' type='text/css' href='$1' />");
            res = res.replace(/<charset=(?:\"|\')(\w + )(?:\"|\') \/>/gm, "<meta charset='$1' />");
            res = res.replace(/<author name=(?:\"|\')(\w + )(?:\"|\') href=(?:\"|\')(\w+)(?:\"|\') \/>/gm, "<meta name='author' content='$1' /><link rel='author' href='$2' />");
            res = res.replace(/<desc>(.*?)<\/desc>/gm, "<meta name='description' content='$1' />");
            res = res.replace(/<copy>(.*?)<\/copy>/gm, "<meta name='copyrights' content='$1' />");
            res = res.replace(/<lbl>(.*?)<\/lbl>/gm, "<label>$1</label>");
            res = res.replace(/<submit \/>/gm, "<input type='submit' />");
            res = res.replace(/<submit val=(?:\"|\')(\w+)(?:\"|\') \/>/gm, "<input type='submit' value='$1' />");
            res = res.replace(/<reset \/>/gm, "<input type='reset' />");
            res = res.replace(/<reset val=(?:\"|\')(\w+)(?:\"|\') \/>/gm, "<input type='reset' value = '$1' />");
            res = res.replace(/<hdn name=(?:\"|\')(\w+)(?:\"|\')>(.*?)<\/hdn>/gm, "<input type='hidden' name='$1' value='$2' />");
            res = res.replace(/<hdn name=(?:\"|\')(\w+)(?:\"|\') id=(?:\"|\')(\w+)(?:\"|\')>(.*?)<\/hdn>/gm, "<input type='hidden' name='$1' value='$3' id='$2' />");
            res = res.replace(/<txt ((?:id|name|class)(\=(?:\"|\')(\w+)(?:\"|\'))(| ))\/>/gm, "<input type='text' />");
            res = res.replace(/<sql query=(?:\"|\')(.*?)(?:\"|\') \/>/gm, "<\?php\n\tif (mysqli_ping($$dbc)) {\n\t\t$r = mysqli_query($$dbc, '$1');\n\t}else printMsg('error', 'No ping');\n\?>");
            res = res.replace(/<sqlt table=(?:\"|\')(\w+)(?:\"|\') query=(?:\"|\')(.*?)(?:\"|\') \/>/gm, "<\?php\n\tif (mysqli_ping($$dbc)) {\n\t\techo 'Last updated at '._time().\"<br />\";selectTable($dbc, '$1', '$2');\n\t}else printMsg('error', 'No ping');\n\?>");
            return res
        }
}

/**
 * @description Toolbar
 * @param {string} [id="#toolbar"] ID of the container
 * @param {string[]} [tools=["undo", "redo", "clear", "save", "select", "copy", "paste", "load", "generate", "view"]] Tools
 * @param {*} mdl Module that is going to use it
 * @this {Toolbar}
 * @returns {Toolbar} Toolbar
 * @constructor
 * @since 1.0
 */
function Toolbar (id, tools, mdl) {
    this.id = id || "#toolbar";
    this.node = $n(this.id);
    this.tools = tools || ["undo", "redo", "clear", "save", "select", "copy", "paste", "load", "generate", "view"];
    this.fn = [];
    this.for = mdl;
    this.update = function () {
        if (this.node != $n(this.id)) this.node = $n(this.id);
        for(var i = 0; i < this.tools.length; i++) this.fn[i] = this.for[this.tools[i]]//Doesn't work out of Editor's scope
        /* $e(this.id).write("");
         for (var i = 0; i < this.tools.length; i++) {
         $e(this.id).after("<img src = 'img/" + this.tools[i] + ".png' title = '" + this.tools[i].capitalize() + "' alt = '" + this.tools[i] + "' onClick = '" + this[this.tools[i]] + "' class = 'tbicon' id = 'tool" + i+"' />", true);
         } */
    };

    return this;
}

/**
 * @description Integrated Development Environment
 * @param {string} [lang="none"] Language
 * @param {Editor} [edt=new Editor()] Editor
 * @param {Preview} [prev=new Preview()] Previewer
 * @param {Parser} [ps=new Parser()] Parser
 * @param {Debugger} [dbg=new Debugger()] Debugger
 * @param {Toolbar} [tb=new Toolbar()] Toolbar
 * @this {IDE}
 * @returns {IDE} IDE
 * @constructor
 * @see Editor Preview Parser Debugger
 * @since 1.0
 */
function IDE (lang, edt, prev, ps, dbg, tb) {
    this.editor = edt || new Editor();
    this.parser = ps || new Parser();
    this.preview = prev || new Preview();
    this.preview.associatedParser = this.parser;
    this.editor.previewer = this.preview;
    this.editor.parser = this.parser;
    this.debugger = dbg || new Debugger();
    this.language = lang || "none";
    this.init = function (to, l) {
        if (this.language != "none") l? this.editor.language = this.debugger.language = this.parser.from = this.language = l: this.editor.language = this.debugger.language = this.parser.from = this.language;
        if (to) {
            this.parser.to = to;
            this.preview.language = to;
        }
    };
    this.toolbar = tb || this.editor.toolbar;
    this.update = function (l) {
        this.editor.update(l);
        this.preview.update();
        this.debugger.update();
    };

    return this;
}

/**
 * @description Loading percentage
 * @type {number}
 * @default
 * @since 1.0
 * @memberof $G
 */
$G["i"] = 0;
/**
 * @description Loading bar
 * @param {string} [dlb="#dlb"] ID of the container
 * @param {Function} cb Callback
 * @param {number} [delay=30] Delay (in ms)
 * @returns {undefined}
 * @since 1.0
 * @func
 */
function loadBar (dlb, cb, delay) {
    if(!dlb) dlb = "#dlb";
    Essence.addCSS(dlb + " {border: none;background: #0F0;max-width: 200px;text-align: center;font-size: 28px;padding: 2px;}#bar {border: 1px ridge #CCC;text-align: center;width: 201px;});");
    if(!delay) delay = 30;
    $e(dlb).setCSS("position", "relative");
    $e(dlb).setCSS("width", $e(dlb).css("width") + $G["i"]);
    //or use a progress tag
    $e(dlb).write($G["i"] + "%");
    $G["i"]++;
    $G["timer"] = setTimeout("loadBar(" + dlb + ", " + cb + ", " + delay + ")", delay);
    if($G["i"] >= 100) {
        clearTimeout($G["timer"]);
        $G["i"] = 0;
        $e(dlb).write("Download finished");
        cb();
    }
}