/**
 * @module Web
 * @description Web stuff
 * @version 1.0
 * @since 1.1
 * @license MIT
 * @author Maximilian Berkmann <maxieberkmann@gmail.com>
 * @copyright Maximilian Berkmann 2016
 * @requires module:essence
 * @requires DataStruct
 * @requires Misc
 * @type {Module}
 * @exports Web
 */
var Web = new Module("Web", "Web stuff", ["DataStruct", "Misc"], 1, function () {
	//if (!isValid($G["IP"], "ip")) getIP();
	//if (!isValid($G["IP"], "ip")) getPrivateIP();
});

/* eslint no-undef: 0 */

/**
 * @description Gather the cookie named $c_name
 * @param {string} c_name Cookie name
 * @returns {undefined|string} Cookie
 * @see module:Web~setCookie
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
 * @param {number} [exdays] Expiration days
 * @returns {undefined}
 * @see module:Web~getCookie
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
 * @description Cookie history
 * @type {{get: CookieHistory.get, set: CookieHistory.set, toObject: CookieHistory.toObject}}
 * @since 1.1
 * @see module:Web~setCookie
 * @see module:Web~getCookie
 * @property {function(): string[]} CookieHistory.get Get the list of cookies
 * @property {Function} CookieHistory.set Set the cookie for the list of cookies
 * @property {function(): Object} CookieHistory.toObject Get the dictionary form of the cookie history
 */
var CookieHistory = {
	get: function () {
		return document.cookie.split(";").map(function (x) {
			return x.split("=")[0]
		}).remove("CookieHistory", true);
	},
	set: function () {
		setCookie("CookieHistory", this.get());
	},
	toObject: function () {
		return Objectify(this.get(), document.cookie.split(";").filter(function (x) {
			return x.split("=")[0] != "CookieHistory"
		}).map(function (x) {
			return x.split("=")[1]
		}));
	}
};

/**
 * @description Local/session database
 * @param {string} [name="Database"] Database name
 * @param {Array|boolean} [headR=range(100)] Header rows
 * @param {Array} [cells=[].fill("...")] Cells
 * @param {Array|boolean} [headC=["Index", "Value"]] Header columns
 * @param {string} [admin="Anonymous"] Admin's name
 * @param {number} [ver=1.0] Version
 * @this database
 * @returns {database} Database
 * @property {string} database.name Name
 * @property {NumberLike[]} database.headerRow Row headers
 * @property {NumberLike[]} database.headerCol Column headers
 * @property {Array[]} database.content Content
 * @property {string} database.admin Administrator
 * @property {number} database.version Version
 * @property {Array[]} database.val Value (extended content) of the database
 * @property {Function} database.setStorage Store the database
 * @property {Code} database.html HTML code
 * @property {string} database.css CSS code
 * @property {function(?string)} database.disp Display the database
 * @property {Function} database.update Update the database
 * @property {function(*)} database.searchAndRemove Search and remove a value
 * @property {function(number, number)} database.remove Remove a cell from the database
 * @property {function(): string} database.toString String representation
 */
function database (name, headR, cells, headC, admin, ver) { //Local database
	this.name = name || "Database";
	this.headerRow = (isNon(headR))? range(100): headR;
	this.headerCol = headC || ["Index", "Value"];
	this.content = (isNon(cells))? new Array(this.headerCol.length).fill("..."): cells;
	this.admin = admin || "Anonymous";
	this.version = ver || 1.0;
	this.val = new Array(this.headerRow.length);
	for (var i = 0; i < this.val.length; i++) this.val[i] = new Array(this.headerCol.length).fill(" ");
	for (i = 0; i < this.headerCol.length; i++) this.val[0][i] = this.headerCol[i];
	for (i = 0; i < this.content.length; i++) {
		this.val[i][0] = (this.headerRow)? this.headerRow[i]: i;
		for (var j = 0; j < this.content[i].length; j++) {
			this.val[i][j + 1] = this.content[i][j];
			//console.log("Processing " + this.content[i][j] + " at ", i, j);
		}
	}
	this.setStorage = function () {
		localStorage[this.name] = JSON.stringify(this.val)
	};
	this.css = "#" + this.name + "table{font-family:Consolas,Segoe UI,Tahoma,sans-serif;background: #000;}#" + this.name + "table,#" + this.name + "td,#" + this.name + "th{border:1px solid #000;color:#000;background:#fff;}#" + this.name + "tr:nth-child(even) td,#" + this.name + "tr:nth-child(even) th{background:#eee;}";
	this.html = complexTable(this.name, this.headerRow, this.content, this.headerCol, this.name, false, this.css);
	this.disp = function (elmId) {
		$e(elmId? "#" + elmId: "body").write(this.html, true);
		this.setStorage();
	};
	this.update = function () {
		if (localStorage[this.name]) this.val = JSON.parse(localStorage[this.name]);
		else this.setStorage();
		this.html = complexTable(this.name, this.headerRow, this.content, this.headerCol, this.name, false, this.css);
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

	this.toString = function () {
		return "database(name=" + this.name + ", headerRow=" + this.headerRow + ", headerCol=" + this.headerCol + ", content=" + this.content + ", admin=" + this.admin + ", version=" + this.version + ")";
	};

	return this;
}

/**
 * @description Database
 * @param {string} [name="DB"] Name
 * @param {Array} [headers=["Index", "Value"]] Column headers
 * @param {Array} [rows=[range(1), new Array(range(1).length).fill("...")].translate()] Rows
 * @param {Array} [headerRows] Rows headers
 * @return {DB} DB
 * @this DB
 * @constructor
 * @property {string} DB.name Name
 * @property {NumberLike[]} DB.rows Row headers
 * @property {NumberLike[]} DB.headers Column headers (which should use the first column for indexes/ranks)
 * @property {Array} DB.val Content of the database
 * @property {Code} DB.html HTML code
 * @property {string} DB.css CSS code
 * @property {Function} DB.build Build the database
 * @property {function(number)} DB.fill Fill-in the database
 * @property {Function} DB.save Save the database
 * @property {Function} DB.update Update the database
 * @property {function(*, number, number)} DB.set Change the value of a cell
 * @property {function(number, number): *} DB.get Get the value of a cell
 * @property {function(*): number} DB.find Look for an item
 * @property {function(): Array} DB.see Get a viewable copy of the database
 * @property {function(?string)} DB.view Display the database
 * @property {function(Array, ?number)} database.add Add a cell (without the index/rank) to the database
 * @property {function(boolean)} DB.init Initialise the database
 * @property {function(): string} database.toString String representation
 * @property {function(number): Array} database.remove Remove a row from the database
 * @property {Function} DB.onBuild Building event listener
 * @property {Function} DB.onFill Filling event listener
 * @property {Function} DB.onSave Saving event listener
 * @property {Function} DB.onUpdate DB update event listener
 * @property {Function} DB.onSet DB row set event listener
 * @property {Function} DB.onGet DB row/cell gathering event listener
 * @property {Function} DB.onFind Research event listener
 * @property {Function} DB.onSee Visualisation event listener
 * @property {Function} DB.onView DOM display event listener
 * @property {Function} DB.onAdd Row addition/push event listener
 * @property {Function} DB.onInit Initialisation event listener
 */
function DB (name, headers, rows, headerRows) {
	this.name = name || "DB";
	this.head = headers || ["Index", "Value"];
	this.val = rows || [range(1), new Array(range(1).length).fill("...")].translate();
	this.css = "table#"+ this.name + "{font-family:Consolas,Segoe UI,Tahoma,sans-serif;background: #000;}table#"+ this.name + ", #"+ this.name + " td, #"+ this.name + " th{border:1px solid #000;color:#000;background:#fff;}#"+ this.name + " tr:nth-child(even) td,#"+ this.name + " tr:nth-child(even) th{background:#eee;}";
	this.html = "";
	this.rows = headerRows || false;
	//this.events = Tablify(["build", "fill", "save", "update", "set", "get", "find", "see", "view", "add", "init"], {data: null, name: "", timeStamp: new Date().getTime()});
	this.onBuild = this.onFill = this.onSave = this.onUpdate = this.onSet = this.onGet = this.onFind = this.onSee = this.onView = this.onAdd = this.onInit = $f;
	this.build = function () {
		this.html = isNon(this.rows)? colTable("", this.head, this.val, this.name, true, this.css)/*complexTable("", this.val.line(), this.val.block(1), this.head, this.name, true, this.css)*/: complexTable("", this.rows, this.val, this.head, this.name, true, this.css);
		this.onBuild(this.html);
	};
	this.fill = function (len) {
		this.val = [];
		for (var i = 0; i < len; i++) {
			this.val[i] = [i].append(new Array(range(len - 1 || 1).length).fill("..."));
		}
		this.onFill(this.val, len);
		return this.val;
	};
	this.save = function () {
		localStorage[this.name] = JSON.stringify(this.val);
		localStorage[this.name + "_head"] = JSON.stringify(this.head);
		localStorage[this.name + "_html"] = this.html;
		localStorage[this.name + "_rows"] = this.rows;
		this.onSave(localStorage[this.name], localStorage[this.name + "_head"], localStorage[this.name + "_html"], localStorage[this.name + "_rows"]);
	};
	this.update = function () {
		if (localStorage[this.name]) {
			this.val = JSON.parse(localStorage[this.name]);
			this.head = JSON.parse(localStorage[this.name + "_head"]);
			this.html = localStorage[this.name + "_html"];
			this.rows = (localStorage[this.name + "_rows"] == "false")? localStorage[this.name + "_rows"]: localStorage[this.name + "_rows"].split(","); //JSON.parse(localStorage[this.name + "_rows"]);
		} else this.save();
		this.onUpdate(this);
	};
	this.set = function (nval, i, j) {
		if (j === -1) {
			for (var k = 0; k < nval.length; k++) this.val[i || 0][k] = nval[k];
		} else this.val[i || 0][j || 0] = nval || null;
		this.onSet(nval, [i, j]);
	};
	this.get = function (i, j) {
		this.onGet(i, j);
		return isNon(j)? this.val[i || 0]: this.val[i || 0][j];
	};
	this.find = function (val) {
		var p = lookfor(val, this.val);
		this.onFind(val, p);
		return p;
	};
	this.see = function () {
		this.onSee(Copy(this.val).prepend(Copy(this.head).reverse()));
		return isNon(this.rows)? Copy(this.val).prepend([Copy(this.head)]): Copy(this.val).prepend(Copy(this.head).reverse());
	};
	this.view = function (id) {
		this.build();
		$e(id? "#" + id: "body").write(this.html, true);
		this.onView($e(id? "#" + id: "body").val(true), id);
	};
	this.add = function (vals, step) {
		this.val.push([parseFloat(this.val.last()[0]) + (step || 1)].concat(vals));
		this.onAdd(vals, this.val);
	};
	this.init = function (seeTable) {
		this.build();
		this.update();
		if (seeTable) console.table(this.see());
		this.onInit(this);
	};
	this.remove = function (i) {
		this.val[i || this.val.lastIndex()] = undefined;
		this.val.remove();
		return this.val;
	};

	this.toString = function () {
		return "DB(name=" + this.name + ", head=" + this.head + ", val=" + this.val + ", rows=" + this.rows + ")";
	};

	return this;
}

/**
 * @description Process
 * @param {string} name Name of the process
 * @param {string} [auth="Anonymous"] Author
 * @param {string} [summup=""] Summary
 * @param {string} [ctt=""] Content
 * @param {Function} [runnable=$f] Runnable method of the process
 * @returns {process} Process
 * @since 1.0
 * @property {string} process.name Name
 * @property {string} process.author Author
 * @property {number} process.bitsize Size in bits
 * @property {string} process.description Description
 * @property {string} process.content Content
 * @property {Function} process.update Update the process
 * @property {function(server)} process.askPermission Ask the permission to integrate a particular server
 * @property {Function} process.destroy Self-destruction
 */
function process (name, auth, summup, ctt, runnable) {
	this.name = name;
	this.author = auth || "Anonymous";
	this.bitsize = 0; //Size in binary unit
	this.description = summup || "";
	this.content = ctt || "";
	this.sig = this.name[0] + this.name[this.name.length - 1] + this.name.prod() + this.author.slice(0, 2) + "-" + (getType(this.content))[0];
	//Rights/privileges ?!
	this.update = function () {
		if (this.author != auth || this.author === "Anonymous" || isNon(this.author)) this.sig = this.name[0] + this.name[this.name.length-1] + "-" + this.name.prod() + this.author.slice(0, 2) + "-" + getType(this.content)[0]; //H4ck
		else this.sig = this.name[0] + this.name[this.name.length - 1] + this.name.prod() + this.author.slice(0, 2) + "-" + (getType(this.content))[0];
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
		Essence.processList = Essence.processList.remove();
	};
	Essence.addProcess(this);

	this.run = runnable || $f;

	return this;
}

/**
 * @description Server
 * @param {string} [name="Server"] Name
 * @param {string} [admin=""] Admin
 * @param {string} [type="data"] Type (data, process, storage, authentication, register, location)
 * @param {number} [ver=1.0] Version
 * @param {number} [mxsz=2⁶] Maximum size of the server's database
 * @returns {server} Server
 * @see module:Web~DB
 * @since 1.0
 * @throws {Error} Invalid server type
 * @property {string} server.name Name
 * @property {string} server.admin Administrator
 * @property {number} server.version Version
 * @property {number} server.maxsize Maximum size
 * @property {number} server.nb_slots Number of Slots
 * @property {Array} server.slots Slots
 * @property {string} server.type Server type
 * @property {DB} server.data Database
 * @property {function(process)} server.addProcess Process adder (only useful for process servers)
 * @property {function(*)} server.add Data adder (useless for process servers)
 * @property {function(number)} server.rm Remove a data from the server
 * @property {Function} server.store Store the server
 * @property {Function} server.update Update the server
 * @property {function(process)} server.fire Remove a process from the server
 * @property {Function} server.reset Reset the server
 * @property {function(): string} server.toString String representation
 * @property {function(Event, function(Event))} server.on OnEvt handler
 * @property {Event} server.event Event
 */
function server (name, admin, type, ver, mxsz) {
	this.name = name || "Server";
	this.admin = admin || "";
	this.version = ver || 1.0;
	this.maxsize = mxsz || Math.pow(2, 14);
	this.nb_slots = Math.pow(2, 6);
	this.slots = mkArray(this.nb_slots, 1, "empty");
	this.type = (type || "data").toLowerCase();
	if (this.type === "data") this.data = new DB("db_" + this.name, ["Index", "Value"], this.slots, range(1, 1, this.maxsize));//database(this.name, range(1, 1, this.maxsize), this.slots, ["Index", "Value"], this.admin, this.version);
	else if (this.type === "process") this.data = new DB("db_" + this.name, ["N°", "Name", "Author", "Description", "Content", "Bit size"], this.slots, range(1, 1, this.maxsize)); //database(this.name, range(1, 1, this.maxsize), this.slots, ["N°", "Name", "Author", "Description", "Content", "Bit size"], this.admin, this.version);
	else if (this.type === "storage") this.data = new DB("db_" + this.name, ["Key", "Value"], this.slots, range(1, 1, this.maxsize));//database(this.name, range(1, 1, this.maxsize), this.slots, ["Key", "Value"], this.admin, this.version);
	else if (this.type === "authentication") this.data = new DB("db_" + this.name, ["Username", "Password", "Email"], this.slots, range(1, 1, this.maxsize));//database(this.name, range(1, 1, this.maxsize), this.slots, ["Username", "Password", "Email", "Hash"], this.admin, this.version);
	else if (this.type === "register" || this.type =="details") this.data = new DB("db_" + this.name, ["First name", "Last Name", "Title", "Email", "Phone", "Sex", "City/Country", "Birthday", "Websites", "Job", "Quote"], this.slots, range(1, 1, this.maxsize));//database(this.name, range(1, 1, this.maxsize), this.slots, ["First name", "Last Name", "Title", "Email", "Phone", "Sex", "City/Country", "Birthday", "Websites", "Job", "Quote"], this.admin, this.version);
	else if (this.type === "location") this.data = new DB("db_" + this.name, ["Name", "Longitude", "Latitude"], this.slots, range(1, 1, this.maxsize));//database(this.name, range(1, 1, this.maxsize), this.slots, ["Name", "Longitude", "Latitude"], this.admin, this.version);
	else throw new Error(this.type + " is an invalid server type.");
	this.addProcess = function (pcs) {
		this.event = new Event("processAdded");
		if (pcs.sig.last() === "-" || pcs.bitsize > this.maxsize / this.nb_slots) console.log("[Server:" + name + "] The process named " + pcs.name + " has been rejected");
		else {
			var pos;
			for (var i = 0; i < this.nb_slots; i++) {
				if (isNon(this.slots[i])) {
					this.slots[i] = [pcs.name, pcs.author, pcs.description, pcs.content, pcs.bitsize];
					pos = i;
					i = this.nb_slots;
					break;
				}
			}
			if (this.slots[pos] != [pcs.name, pcs.author, pcs.description, pcs.content, pcs.bitsize] && this.nb_slots < this.maxsize) { //Check if the process was added to the server
				this.nb_slots += this.maxsize / this.nb_slots; //Extend by one slot
				this.slots[this.nb_slots] = [pcs.name, pcs.author, pcs.description, pcs.content, pcs.bitsize];
			}
		}
		this.event = null;
	};
	this.add = function (data) {
		this.event = new Event("added");
		var pos;
		for (var i = 0; i < this.nb_slots; i++) {
			if (isNon(this.slots[i]) || this.slots[i].equals([])) {
				this.slots[i] = JSON.stringify(data);
				pos = i;
				i = this.nb_slots;
				break;
			}
		}
		if (this.slots[pos] != data && this.nb_slots < this.maxsize) { //Check if the process was added to the server
			this.nb_slots += this.maxsize / this.nb_slots; //Extend by one slot
			this.slots[this.nb_slots] = JSON.stringify(data);
		}
		this.event = null;
	};
	this.rm = function (n) {
		this.event = new Event("remove");
		this.slots[n] = null;
		this.event = null;
	};
	this.store = function () {
		this.event = new Event("storage");
		localStorage["server_" + this.name] = JSON.stringify(this);
		this.event = null;
	};
	this.update = function () {
		this.event = new Event("update");
		if (localStorage["server_" + this.name]) {
			var self = JSON.parse(localStorage["server_" + this.name]);
			this.name = self.name;
			this.admin = self.admin;
			this.version = self.version;
			this.maxsize = self.maxsize;
			this.nb_slots = self.nb_slots;
			this.slots = self.slots;
			this.data = new DB(self.data.name, self.data.head, self.data.val, self.data.rows) || self.data;
		}else this.store();
		this.event = null;
	};
	this.fire = function (pcs) {
		this.event = new Event("fire");
		for (var i in this.slots) {
			if (this.slots.hasOwnProperty(i) && this.slots[i][0] === pcs.name && this.slots[i][1] === pcs.author) this.rm(i);
		}
		this.event = null;
	};
	this.reset = function () {
		this.event = new Event("reset");
		for (var i in this.slots) {
			if (this.slots.hasOwnProperty(i)) this.rm(i)
		}
		this.event = null;
	};

	this.toString = function () {
		return "server(name=" + this.name + ", admin=" + this.admin + ", type=" + this.type + ", version=" + this.version + ", maxsize=" + this.maxsize +", slots=[" + this.slots.toStr(true) + "])";
	};

	//Events listeners
	//this.listeners = Tablify(["processAdded", "added", "remove", "update", "fire", "reset", "storage"], false);

	this.on = function (evt, handler) {
		if (this.event.type === evt) handler(this.event);
	};

	Essence.addServer(this);

	return this;
}

/**
 * @description Data to temporally place in a semi-global scope
 * @type {*}
 * @default
 * @since 1.1
 * @external module:essence~$G
 * @memberof external:essence~$G
 */
$G["data"] = null;
/**
 * @description WiFi speed(s)
 * @type {NumberLike[]}
 * @default
 * @since 1.1
 * @external module:essence~$G
 * @memberof external:essence~$G
 */
$G["wifi"] = [];

/**
 * @description Launch the verification of the connection
 * @param {string} id ID of the element to be used
 * @param {string} [src="../img/random2000x2000.jpg"] Source of the image to use for the test
 * @param {number} [sz=610320] Size of the image (in Kb)
 * @param {number} [delay=100] Delay (in ms)
 * @param {number} [maxDelay=2e4] Maximum delay
 * @returns {undefined}
 * @see module:Web~CETimer
 * @since 1.0
 * @func
 */
function CECheck (id, src, sz, delay, maxDelay) {
	window.defaultStatus = "Evalue the connexion and see the downloading speed";
	if (!src) src = "../img/random2000x2000.jpg";
	if (!sz) sz = 60320; //7.54MB -> Kb
	if (!delay) delay = 100; //ms
	if (!maxDelay) maxDelay = 2e4;
	var img = new Image();
	$G["t1"] = new Date().getTime();
	$G["t2"] = 0;
	img.src = src + "?t1=" + $G["t1"]; //To prevent the browser to load a cached version of the image
	$G["data"] = img;

	$e("#" + id).write("Verification in progress...");
	setTimeout("CETimer('" + id + "', '" + img + "', 0, " + delay + ", " + maxDelay + ", " + sz + ")", delay); //Uncaught SyntaxError: Unexpected identifier
}

/**
 * @description Connection evaluation timer
 * @param {string} id ID of the element to be used
 * @param {HTMLImageElement} img Image to use for the test
 * @param {number} nb Number of attempts done
 * @param {number} [delay=100] Delay (in ms)
 * @param {number} [maxDelay=2e4] Maximum delay
 * @param {number} size Size of the image (in kb)
 * @returns {undefined}
 * @see module:Web~CECheck
 * @since 1.0
 * @func
 */
function CETimer (id, img, nb, delay, maxDelay, size) {
	nb++;
	if (!isType(img, "HTMLImageElement")) img = $G["data"]; //Assuming CECheck() was called before
	$e("#" + id).write("Verification in progress...");
	if (nb * delay >= maxDelay) $e("#" + id).write(evalDownload(0)); //End of the maximum delay
	else {
		if (img.complete) {
			$G["t2"] = new Date().getTime();
			$G["wifi"].push((size / ($G["t2"] - $G["t1"])).toNDec(3) + "kbps");
			$e("#" + id).write(evalDownload(size / ($G["t2"] - $G["t1"])));
			Essence.time("Connexion: " + (size / ($G["t2"] - $G["t1"]).toNDigits() + " kbps"));
			window.defaultStatus = "normal";
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
 * @param {number} kbps Speed (in kb/start)
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
	return res + " (" + kbps.toNDigits() +" kbps)"
}

/**
 * @description Evaluate the upload speed
 * @param {number} kbps Speed (in kb/start)
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
	return res + " (" + kbps.toNDigits() +" kbps)"
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
 * @description Evaluate the gigue (for either upload or download speed)
 * @param {NumberLike[]} [vals=$G["wifi"]] WiFi test'start values
 * @func
 * @since 1.1
 * @return {string} Gigue
 */
function evalGigue (vals) {
	var sd = (vals || $G["wifi"]).map(function (v) {
		return getNumFromStr(v)
	}).stddev(), res;

	if (sd >= 0 && sd < 5) res = "Synchronized connexion";
	else if (sd >= 5 && sd < 10) res = "Slightly synchronized connexion";
	else if (sd >= 10) res = "Asynchronous connexion";
	return res + " (" + sd + ")"
}

/**
 * @description WiFi tester.
 * @global
 * @since 1.1
 * @type {{down: number, up: number, ping: number, gigues: number[], type: string, vals: Array, imgs: Object[], elm: Element, test: WifiTest.test, testUp: WifiTest.testUp, testDown: WifiTest.testDown, testPing: WifiTest.testPing}}
 * @this WifiTest
 * @property {number} WifiTest.down Download speed
 * @property {number} WifiTest.up Upload speed
 * @property {number} WifiTest.ping Ping
 * @property {number[]} WifiTest.gigue Gigue for respectively uploads and downloads
 * @property {string} WifiTest.type WiFi type
 * @property {NumberLike[]} WifiTest.vals Buffered wifi test values
 * @property {Object[]} WifiTest.imgs Images for the tests
 * @property {Element} WifiTest.elm HTML element for outputs
 * @property {function(): string} WifiTest.test Global test
 * @property {function(): string} WifiTest.testUp Upload speed test
 * @property {function(): string} WifiTest.testDown Download speed test
 * @property {function(): string} WifiTest.testPing Ping test
 */
var WifiTest = {
	down: 0,
	up: 0,
	ping: 0,
	gigues: [0, 0], //Up, Down
	type: "",
	vals: [],
	imgs: [{ //images with the name "randomSxS.jpg"
		dim: 350, //px
		size: 1912 //239KB -> Kb
	}, {
		dim: 500,
		size: 3944 //493KB
	}, {
		dim: 750,
		size: 8480 //1.06MB
	}, {
		dim: 1e3,
		size: 15120 //1.89MB
	}, {
		dim: 1500,
		size: 34080 //4.26MB
	}, {
		dim: 2e3,
		size: 60320 //7.54MB
	}, {
		dim: 2500,
		size: 94400 //11.8MB
	}, {
		dim: 3e3,
		size: 135200 //16.9MB
	}, {
		dim: 3500,
		size: 184800 //23.1MB
	}, {
		dim: 4e3,
		size: 240800 //30.1MB
	}],
	elm: $e("#wifi", true) || $e("#wifitest", true) || $e("#test", true),
	test: function () {
		this.testUp();
		this.testDown();
		this.testPing();
		return "Ping/Up/Down/Gigue up/Gigue down: " + [this.ping, this.up, this.down, this.gigues[0], this.gigues[1]].join("/");
	},
	testUp: function () {
		//...
		this.vals = $G["wifi"];
		$G["wifi"] = [];
		//this.up = ...
		this.type = evalUpload(this.up).split(" ")[0];
		this.gigues[0] = parseFloat(evalGigue(this.vals).split(" ")[0]);
		return this.up + " Ko/start";
	},
	testDown: function () {
		var iState = this.elm.val();
		for (var i = 0; i < this.imgs;) {
			CECheck(this.elm.node.id, "../img/random" + this.imgs[i].dim + "x" + this.imgs[i].dim + ".jpg", this.imgs[i].size);
			while (this.elm.val() === iState || window.defaultStatus != "normal") {
				//wait
			}
			if (this.elm.val() != iState || window.defaultStatus === "normal") i++;
		}
		this.vals = $G["wifi"];
		$G["wifi"] = [];
		this.down = (this.vals.map(function (x) {
			return getNumFromStr(x);
		}).mean(2) / 8).toNDec(2);
		this.type = evalDownload(this.down).split(" ")[0];
		this.gigues[1] = parseFloat(evalGigue(this.vals).split(" ")[0]);
		return this.down + " Ko/start";
	},
	testPing: function () {
		//...
		this.type = evalPing(this.ping).split(" ")[0];
		return this.ping + "ms";
	}
};

/**
 * @description Getting the URL parameters just like in PHP.
 * @param {Str} p Parameter(start)
 * @param {function(...string)} action Action to be done with the value(start) of the parameter(start)
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
 * @see module:Web~WebApp
 * @since 1.0
 * @property {string} WebPage.title Title
 * @property {string} WebPage.subtitle Subtitle
 * @property {string} WebPage.type Document type
 * @property {string} WebPage.name Name of the file
 * @property {string} WebPage.path Path of the file
 * @property {string} WebPage.author Author
 * @property {number} WebPage.version Version
 * @property {string} WebPage.structure Page structure
 * @property {Code} WebPage.code Code
 * @property {Code} WebPage.template Code template
 * @property {Template|?string} WebPage.page Page
 * @property {function(string): Code} WebPage.word2code Word (components) to template code
 * @property {function(): Code} WebPage.genTemplate Transform the structure into a template
 * @property {function(Object): Code} WebPage.genPage Transform the template into a page
 */
function WebPage (title, name, path, author, ver, stct, type, subtitle) {
	this.title = title || "My web page";
	this.subtitle = subtitle || "A simple web page";
	this.type = type.normal() || "html";
	this.name = name + this.type || "index." + this.type;
	this.path = path + "/" + this.name || this.name;
	this.author = author || "Maximilian Berkmann";
	this.version = ver || 1.0;
	this.structure = stct || "header!height-menu!content|aside!footer";
	this.code = "";
	this.template = "";
	this.page = null;
	/* Structure:
	 Components:
	 - header: header with a title and a logo
	 - height-menu: horizontal menu with icons
	 - v-menu: vertical menu
	 - content: "welcome to " + this.title
	 - aside: side section for news feed or anything you want to use it for
	 - footer: footer with the sponsors (if there'start at least one), name of the author(start)
	 - article: new paper article like section
	 - search: search bar
	 Structuration:
	 ! : new line (header!height-menu means that the height-menu is under the header)
	 | : at the right (content|aside means that the aside section is placed on the right of the content section)
	 */
	//Templating /(\{\{)\width * (\}\}) */g

	this.word2code = function (word) {
		switch (word.normal()) {
			case "header": return "<header><img src='img/icon.png' /><hgroup><h1>{{title}}</h1><h3>{{subtitle}}</h3></hgroup></header>";
			case "height-menu": return "<menu class='height-menu'><li onClick=''>{{0}}</li><li onClick=''>{{1}}</li><li onClick=''>{{2}}</li></menu>";
			case "v-menu": return "<menu class='v-menu'><li onClick=''>{{0}}</li><li onClick=''>{{1}}</li><li onClick=''>{{2}}</li></menu>";
			case "content": return "<div id='content'>{{content}}</div>";
			case "aside": return "<aside>{{aside}}</aside>";
			case "footer": return "<footer>{{footer}}</footer>";
			case "article": return "<article id='{{article_title}}'><header>{{article_title}}</header>{{article_content}}<footer>{{article_footer}}</footer></div>";
			case "search": return "<form action='search.php' method='post'><input type='search' name='search' /><input type='image' src='img/search.png' alt='?' /></form>";
			default: return word
		}
	};

	this.genTemplate = function () {
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

	this.genPage = function (params) {
		this.page = new Template(this.title, this.name, this.template, ["title", "subtitle", "content", "aside", "footer", "0", "1", "2", "article_title", "article_content", "article_footer"]);
		this.page = this.page.gen({
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
		return this.page;
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
 * @see module:Web~WebPage
 * @since 1.0
 * @property {string} WebApp.name Name of the app
 * @property {string} WebPage.path Path of the file
 * @property {string} WebPage.author Author
 * @property {number} WebPage.version Version
 * @property {string[]} WebPage.dirs List of directories
 * @property {Template} WebPage.pages Pages
 * @property {Function} WebPage.build Build the pages
 */
function WebApp (name, path, author, ver, stct) {
	this.name = name || "Web App";
	this.path = path || "";
	this.author = author || "Maximilian Berkmann";
	this.version = ver || 1.0;
	this.dirs = ["img", "script", "style"]; //All dirs which are subdirectories of the path
	this.pages = [new WebPage(this.name, "index", this.path, this.author, this.version, stct), new WebPage("Contact us", "contact", this.path, this.author, this.version, stct), new WebPage("About us", "about", this.path, this.author, this.version, stct)];

	this.build = function () { //Generate
		for(var i = 0; i < this.pages.length; i++) this.pages[i].genPage();
	};

	return this;
}

/**
 * @description Editor
 * @param {string} [id="#editor"] ID of the container
 * @param {string} [lang="none"] Language
 * @param {?Preview} [prev=null] Preview
 * @param {Parser} [parser] Parser
 * @param {Toolbar} [tb=new Toolbar()] Toolbar
 * @this {Editor}
 * @returns {Editor} Editor
 * @todo Fill up the syntax highlighting list
 * @constructor
 * @since 1.0
 * @property {string} Editor.id ID of the element
 * @property {HTMLElement} Editor.node Node
 * @property {string} Editor.linesId ID of the lines' element
 * @property {number} Editor.nbLines Number of lines
 * @property {string} Editor.language Language
 * @property {?Preview} Editor.previewer Previewer
 * @property {?Parser} Editor.parser Parser
 * @property {Code} Editor.code Code
 * @property {virtualHistory} Editor.codeHistory Historic of the code
 * @property {Toolbar} Editor.toolbar Toolbar
 * @property {Editor} Editor.toolbar.for This editor
 * @property {function(string)} Editor.toggleLine Toggle line (when marked)
 * @property {function(number)} Editor.update Update
 * @property {Function} Editor.clear Clear the editor
 * @property {function(string)} Editor.write Clear the editor
 * @property {Function} Editor.undo Undo the editor
 * @property {Function} Editor.redo Redo the editor
 * @property {Function} Editor.save Save the code
 * @property {Function} Editor.select Select the code
 * @property {Function} Editor.copy Copy the code
 * @property {function(boolean)} Editor.paste Paste the code to the editor
 * @property {Function} Editor.load Load a file into the editor
 * @property {Function} Editor.generate Save the parsed code
 * @property {Function} Editor.view See the result
 * @property {function((Code), string): (Code)} Editor.highlightSyntax Highlight the syntax
 * @property {function(): string} Editor.toString String representation
 * @see module:Web~Toolbar
 */
function Editor (id, lang, prev, parser, tb) {
	this.id = id || "#editor";
	this.node = $n(this.id);
	this.linesId = "#lines";
	this.linesNode = $n(this.linesId);
	this.nbLines = 0;
	this.language = lang || "none";
	this.previewer = prev || null;
	this.parser = parser || (prev? this.previewer.associatedParser: null); //Sort of temporarily uncommented for linting sake
	this.code = $e(this.id).val();
	this.codeHistory = new virtualHistory(this.code);
	this.toolbar = tb || new Toolbar();
	this.toolbar.for = this;
	this.toggleLine = function (id) {
		$e("#" + id).toggleCSS("background", ["rgba(0, 0, 0, 0)", "red"]);
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
	this.save = function () {
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
		$e(this.id).write(getFileContent(file));
	};
	this.generate = function () { //Save the parsed code
		if (this.previewer) /<\?php([\s\S]*?)\?>/.test($e(this.id).val())? save($e(this.previewer.id).val(true), "script" + getTimestamp() + ".php", "php"): save($e(this.previewer.id).val(true), "script" + getTimestamp() + ".html", "html");
		else /<\?php([\s\S]*?)\?>$/g.test($e(this.id).val())? save($e("#preview").val(true), "script" + getTimestamp() + ".php", "php"): save($e(prev.id).val(true), "script" + getTimestamp() + ".html", "html")
	};
	this.view = function () {
		this.previewer.run($e(this.id).val(), true)
	};
	//noinspection JSUnusedGlobalSymbols
	this.highlightSyntax = function (code, lang) { //Highlight in the corresponding language and return an HTML result
		switch (lang.normal()) {
			case "html":
				//HTML syntax highlighting rules
				break;
			case "javascript":
				//JavaScript syntax highlighting rules
				break;
			case "css":
				//CSS syntax highlighting rules
				break;
			case "php":
				//PHP syntax highlighting rules
				break;
			case "mips":
				//MIPS syntax highlighting rules
				break;
			case "batch":
				//Batch syntax highlighting rules
				break;
			case "bash":
				//Bash syntax highlighting rules
				break;
			case "java":
				//Java syntax highlighting rules
				break;
			case "c++":
				//C/C++ syntax highlighting rules
				break;
			case "python":
				//Python syntax highlighting rules
				break;
			case "xml":
				//XML syntax highlighting rules
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
				//Markdown syntax highlighting rules
				break;
			default: //Normal text
		}
		return code
	};

	this.toString = function () {
		return "Editor(id=" + this.id + ", linesId=" + this.linesId + ", nbLines=" + this.nbLines + ", language=" + this.language + ", previewer=" + this.previewer + ", parser=" + this.parser + ", code=" + this.code + ", toolbar=" + this.toolbar + ")";
	};

	return this;
}

/**
 * @description Previewer for IDEs.
 * @param {string} [id="#preview"] ID of the container
 * @param {string} [lang="none"] Language
 * @param {Parser} [parser=new Parser()"] Parser
 * @param {Editor} [editor=new Editor()"] Editor
 * @this {Preview}
 * @returns {Preview} Previewer
 * @constructor
 * @since 1.0
 * @property {string} Preview.id ID of the element
 * @property {HTMLElement} Preview.node Node
 * @property {string} Preview.language Language
 * @property {Parser} Preview.associatedParser Associated parser
 * @property {Editor} Preview.associatedEditor Associated editor
 * @property {Function} Preview.update Update
 * @property {function(string, boolean)} Preview.run Run the code
 * @property {Function} Preview.viewCode See the code
 * @property {function(): string} Preview.toString String representation
 * @see module:Web~Parser
 * @see module:Web~Editor
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
		win.document.write(this.associatedEditor.highlightsyntax(code, this.language));
		win.document.write("<style>" + Essence.css + "</style>")
	};

	this.toString = function () {
		return "Preview(id=" + this.id + ", language=" + this.language + ", associatedParser=" + this.associatedParser + ", associatedEditor=" + this.associatedEditor + ")";
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
 * @property {string} Debugger.id ID of the element
 * @property {HTMLElement} Debugger.node Node
 * @property {string} Debugger.language Language
 * @property {function((Code))} Debugger.update Update
 * @property {Function} Debugger.run Run the code
 * @property {function(): string} Preview.toString String representation
 */
function Debugger (id, lang) {
	this.id = id || "#debugger";
	this.node = $n(this.id);
	this.language = lang || "none";
	this.update = function () {
		if (this.node != $n(this.id)) this.node = $n(this.id);
	};
	this.run = function (code) {
		//Useful node stuff: reportValidity(), validity{}, setCustomValidity()
	};
	this.toString = function () {
		return "Debugger(id=" + this.id + ", language=" + this.language + ")";
	};
	return this;
}

/**
 * @description Language parser
 * @param {string} [from="WebScript"] Parsed language
 * @param {string} [to="DHTML"] Resulting language
 * @param {function(Code): Code} [customParse=function(code){...}] Custom parsing
 * @this {Parser}
 * @constructor
 * @since 1.0
 * @property {string} Parser.from Origin language
 * @property {string} Parser.to Destination language
 * @property {function(Code): Code} Parser.run Run the code
 * @property {function(): string} Parser.toString String representation
 */
function Parser (from, to, customParse) {
	this.from = from || "WebScript";
	this.to = to || "DHTML";
	/**
	 * @param {Code} code Code to parse
	 * @type {Function}
	 * @returns {Code} Parsed code
	 */
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
		res = res.replace(/<icon size=(?:"|')(\w+)(?:"|') \/>/gm, "<img src='img/icon.png' class='icon' style='width: $1px; height: $1px;' />");
		res = res.replace(/<icon name=(?:"|')(\w+)(?:"|') \/>/gm, "<img src='img/$1.png' class='icon' />");
		res = res.replace(/<(s|m|l|xs|xl):icon name=(?:\"|\')(\w+)(?:\"|\') \/>/gm, "<img src='img/$2.png' class='$1-icon' />");
		//noinspection BadExpressionStatementJS
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
	};

	this.toString = function () {
		return "Parser(" + this.from + "->" + this.to + ")";
	};
}

/**
 * @description Toolbar
 * @param {string} [id="#toolbar"] ID of the container
 * @param {string[]} [tools=["undo", "redo", "clear", "save", "select", "copy", "paste", "load", "generate", "view"]] Tools
 * @param {*} [mdl=null] Module that is going to use it
 * @this {Toolbar}
 * @returns {Toolbar} Toolbar
 * @constructor
 * @since 1.0
 * @property {string} Toolbar.id ID of the element
 * @property {HTMLElement} Toolbar.node Node
 * @property {string[]} Toolbar.tools Tools
 * @property {string[]} Toolbar.fn Function associated with each tools
 * @property {*} Toolbar.for Owner of the toolbar (generally Editors or Preview)
 * @property {Function} Toolbar.update Update
 * @property {function(): string} Toolbar.toString String representation
 */
function Toolbar (id, tools, mdl) {
	this.id = id || "#toolbar";
	this.node = $n(this.id);
	this.tools = tools || ["undo", "redo", "clear", "save", "select", "copy", "paste", "load", "generate", "view"];
	this.fn = [];
	this.for = mdl || null;
	this.update = function () {
		if (this.node != $n(this.id)) this.node = $n(this.id);
		for(var i = 0; i < this.tools.length; i++) this.fn[i] = this.for[this.tools[i]]//Doesn't work out of Editor'start scope
		/* $e(this.id).write("");
		 for (var i = 0; i < this.tools.length; i++) {
		 $e(this.id).after("<img src = 'img/" + this.tools[i] + ".png' title = '" + this.tools[i].capitalize() + "' alt = '" + this.tools[i] + "' onClick = '" + this[this.tools[i]] + "' class = 'tbicon' id = 'tool" + i+"' />", true);
		 } */
	};

	this.toString = function () {
		return "Toolbar(id=" + this.id + ", tools=" + this.tools.toStr(true) + ", fn=" + this.fn + ", for=" + this.for + ")";
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
 * @see module:Web~Editor
 * @see module:Web~Preview
 * @see module:Web~Parser
 * @see module:Web~Debugger
 * @since 1.0
 * @property {string} IDE.language Language
 * @property {Editor} IDE.editor Editor
 * @property {Parser} IDE.parser Parser
 * @property {Preview} IDE.preview Previewer
 * @property {Parser} IDE.preview.associatedParser Parser
 * @property {Preview} IDE.editor.previewer Previewer
 * @property {Parser} IDE.editor.parser Parser
 * @property {Debugger} IDE.debugger Debugger
 * @property {function(string, string)} IDE.init Initializer
 * @property {Toolbar} IDE.toolbar Toolbar
 * @property {function(?number)} IDE.update Update
 * @property {function(): string} IDE.toString String representation
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

	this.toString = function () {
		return "IDE(editor=" + this.editor + ", parser=" + this.parser + ", preview=" + this.preview + ", debugger=" + this.debugger + ", language=" + this.language + ")";
	};

	return this;
}

/**
 * @description Loading percentage
 * @type {number}
 * @external module:essence~$G
 * @default
 * @since 1.0
 * @memberof external:essence~$G
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
	if (!dlb) dlb = "#dlb";
	Essence.addCSS(dlb + " {border: none;background: #0F0;max-width: 200px;text-align: center;font-size: 28px;padding: 2px;}#bar {border: 1px ridge #CCC;text-align: center;width: 201px;});");
	if (!delay) delay = 30;
	$e(dlb).setCSS("position", "relative");
	$e(dlb).setCSS("width", $e(dlb).css("width") + $G["i"]);
	//or use a progress tag
	$e(dlb).write($G["i"] + "%");
	$G["i"]++;
	$G["timer"] = setTimeout("loadBar(" + dlb + ", " + cb + ", " + delay + ")", delay);
	if ($G["i"] >= 100) {
		clearTimeout($G["timer"]);
		$G["i"] = 0;
		$e(dlb).write("Download finished");
		cb();
	}
}

/**
 * @description Console (like the terminal but on a webpage)
 * @param {string} [title="Console"] Title
 * @param {*} [entry=""] Entry on the console at first use
 * @param {string} [usr="User"] User
 * @constructor
 * @this {Console}
 * @returns {Console} Console
 * @since 1.1
 * @property {string} Console.title Title of the console
 * @property {Code} Console.val Entry of the console
 * @property {virtualHistory} Console.history Command history
 * @property {string} Console.user User
 * @property {function(): string} Console.exec Execute a command
 * @property {Code} Console.html HTML code
 * @property {function(Code, ?Code)} Console.out Output something to the console
 * @property {function(?string)} Console.place Place the console somewhere in the DOM
 * @property {function(?string)} Console.init Initialize the console
 */
function Console (title, entry, usr) {
	this.title = title || "Console";
	this.val = entry || "";
	this.history = new virtualHistory(this.val);
	this.user = usr || "User";
	this.exec = function (ins) {
		if (ins[0] != "/") this.out("<span class='error'>Invalid command</span>");
		else this.val = ins;
		this.history.add(ins);
		var cmd = ins.split(" ")[0].get(1).toLowerCase(), params = ins.split(" ").get(1);
		switch (cmd) {
			case "say":
				this.out(params.join(" "), "&lt" + this.user + "&gt;");
				break;
			case "help":
				this.out("<b>Help: </b><br />/say [text]" + tabs() + "Let the user say something on the console<br />/help" + tabs() + "Show this<br />/reload" + tabs() + "Reload the console<br />/title [title]" + tabs() + "/$" + tabs() + "Display EssenceJS'start version<br />/exp [...]" + tabs() + "Evaluate an expression");
				break;
			case "reload":
				this.val = "";
				$e("#consoleOut").write("");
				break;
			case "title":
				$e("#consoleTitle").write(params.join(" "));
				break;
			case "$":
				this.out("Essence v" + Essence.version);
				break;
			case "exp": //Caution, this can be used for XSS attacks
				this.out(eval(params.join(" ")), "$EXP&gt;");
				break;
			default:
				this.exec("/help");
		}
	};
	this.html = "<table id='console' cellpadding=0 cellspacing=0><thead><th id='consoleTitle'>" + this.title + "</th></thead><tr><td><span id='consoleOut'>" + this.val + "</span></td></tr><tr><td><input id='consoleIn' /></td></tr></table>";

	this.out = function (word, prefix) {
		$e("#consoleOut").after((prefix? "<span style='color: #0f0'>" + prefix + "</span> ": "") + word + "<br />", true);
	};

	this.place = function (id) {
		$e(id? "#" + id: "body").write(this.html, true);
	};

	this.init = function (id) {
		this.place(id || "console");
		$n("#consoleOut").innerHTML = (this.val || "Hello world !") + "<br/>";
		var self = this;

		/** @listens $e("#consoleIn").onchange */
		$e("#consoleIn").on("change", function () {
			/** @this $n("#consoleIn") */
			self.exec(this.value);
			/** @this $n("#consoleIn") */
			this.value = "";
		});
	};

	return this;
}

//noinspection JSUnusedGlobalSymbols
/**
 * @description Get the IP address of the client.<br />
 * Source: {@link http://stackoverflow.com/questions/391979/how-to-get-clients-ip-address-using-javascript-only|[SO] JS: How to get clients IP address}
 * @return {string} IP address
 * @since 1.1
 * @func
 */
function getIP () {
	var res = {}, cors = new CORS("http://api.ipify.org?format=jsonp&callback=_", "GET", false, function (data) {
		res = JSON.parse(data.response.replace(/_\((.*?)\);/, "$1"));
		/**
		 * @description IP address of the client
		 * @type {string}
		 * @external module:essence~$G
		 * @since 1.1
		 * @memberof external:essence~$G
		 */
		$G["IP"] = res.ip;
		return res;
	}, function () {
		Essence.say("IP gathering failed !", "warn");
	}, $f);
	cors.silence();
	cors.init();
	return res.ip || $G["IP"];
}

//noinspection JSUnusedGlobalSymbols
/**
 * @description Get the private IP address of the client.<br />
 * Source: {@link http://stackoverflow.com/questions/391979/how-to-get-clients-ip-address-using-javascript-only|[SO] JS: How to get clients IP address}
 * @author Mido (from SO)
 * @since 1.1
 * @func
 * @return {string} Private IP address
 */
function getPrivateIP () {
	//noinspection JSUnresolvedVariable
	var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection; //Compatibility for Firefox and Chrome/Opera
	var pc = new myPeerConnection({iceServers: []}),
		localIPs = {},
		ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;

	/**
	 * @description IP iterator
	 * @param {String} ip IP address
	 * @returns {undefined}
	 */
	function ipIterate (ip) {
		if (!localIPs[ip]) {
			/**
			 * @description Private IP address of the client
			 * @type {string}
			 * @external module:essence~$G
			 * @since 1.1
			 * @memberof external:essence~$G
			 */
			$G["privateIP"] = ip;
		}
		localIPs[ip] = true;
	}
	pc.createDataChannel(""); //create a bogus data channel
	pc.createOffer(function (sdp) {
		sdp.sdp.split("\n").forEach(function (line) {
			if (line.indexOf("candidate") < 0) return;
			line.match(ipRegex).forEach(ipIterate);
		});
		pc.setLocalDescription(sdp, $f, $f);
	}, $f); //Create offer and set local description
	pc.onicecandidate = function (ice) { //Listen for candidate events
		if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
		ice.candidate.candidate.match(ipRegex).forEach(ipIterate);
	};

	return $G["privateIP"];
}