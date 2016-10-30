"use strict";
/* global Essence:false, $G, Sys, base64, UnitTest, modules, debugging */
/* eslint no-unused-vars: 0 */
/* eslint no-undef: 0 */

/**
 * @module essence
 * @description Core module of the framework
 * @license MIT
 * @author Maximilian Berkmann <maxieberkmann@gmail.com>
 * @copyright Maximilian Berkmann 2016
 * @typedef {(number|string)} NumberLike
 * @typedef {(number|number[])} Nums
 * @typedef {(string|string[])} Str
 * @typedef {(number|boolean)} Bool
 * @typedef {(Array|Object|string)} Iterable
 * @typedef {(Array|Object)} Dict
 * @typedef {(XML|string)} Code
 * @typedef {(Node|TreeNode|NTreeNode|PathNode)} Node
 * @requires modules/Files
 * @requires modules/DOM
 * @requires modules/UI
 * @requires modules/Web
 * @requires modules/Misc
 * @requires modules/Ajax
 * @requires modules/DataStruct
 * @requires modules/Maths
 * @requires modules/Security
 * @requires modules/QTest
 */
/**
 * @description This is the main object of the library as well as being the core module of the framework.
 * @type {{version: string, author: string, description: string, source: string, element: $n, handleError: Essence.handleError, say: Essence.say, applyCSS: Essence.applyCSS, addCSS: Essence.addCSS, addJS: Essence.addJS, update: Essence.update, eps: number, emptyDoc: Essence.emptyDoc, editor: Essence.editor, processList: Array, global: ?Object, addProcess: Essence.addProcess, processSize: number, serverList: Array, addServer: Essence.addServer, serverSize: number, toString: Essence.toString, txt2print: string, addToPrinter: Essence.addToPrinter, print: Essence.print, preInit: Essence.preInit, init: Essence.init, time: Essence.time, sayClr: Essence.sayClr, ask: Essence.ask, isComplete: Essence.isComplete, loadedModules: Array}}
 * @this Essence
 * @namespace
 * @exports essence
 * @since 1.0
 * @property {NumberLike} Essence.version EssenceJS' version
 * @property {string} Essence.author Author
 * @property {string} Essence.description Description of EssenceJS
 * @property {string} Essence.source Source of the script
 * @property {HTMLElement} Essence.element $n element
 * @property {function((string|Error), (URL|string), NumberLike)} Essence.handleError Error handler
 * @property {function(...string)} Essence.say EssenceJS's console logger
 * @property {function(boolean)} Essence.applyCSS Apply EssenceJS's CSS
 * @property {function(Code)} Essence.addCSS Add CSS rules
 * @property {function(string)} Essence.addJS Add JS commands
 * @property {Function} Essence.update EssenceJS' self update's mechanism
 * @property {number} Essence.eps Matlab's epsilon
 * @property {function(string, string)} Essence.emptyDoc Empty the document
 * @property {function(Code)} Essence.editor In-browser editor
 * @property {process[]} Essence.processList Process list
 * @property {Object} Essence.global $G
 * @property {function(process)} Essence.addProcess Process adder
 * @property {number} Essence.processSize Total process size
 * @property {server[]} Essence.serverList Server list
 * @property {function(server)} Essence.addServer Server adder
 * @property {number} Essence.serverSize Total server size
 * @property {function(): string} Essence.toString String representation of EssenceJS's namespace
 * @property {string} Essence.txt2pring Text to print
 * @property {function(string, string)} Essence.addToPrinter Add text to the printer and print them
 * @property {function(string, string)} Essence.print Print stuff to the screen
 * @property {Function} Essence.preInit Pre-initialisation
 * @property {Function} Essence.init Initialisation
 * @property {function(...string)} Essence.time Say something with the time stamped
 * @property {function(NumberLike[])} Essence.sayClr Log the colour
 * @property {function(string, function(string))} Essence.ask Ask something to the user
 * @property {function(): boolean} Essence.isComplete Module inclusion completeness check
 * @property {string[]} Essence.loadedModules List of loaded modules
 * @property {Function} Essence.updateAll Update all modules
 */
var Essence = {
		version: "1.1b",
		author: "Maximilian Berkmann",
		description: "library used for DHTML connexions, maths, database management and cryptography",
		source: "http://berkmann18.github.io/rsc/essence.js",
		element: $n,
		handleError: function (msg, url, line) {
			isType(msg, "Error")? alert("[Essence.js] An error has occurred (line/column " + msg.lineNumber + "/" + msg.columnNumber + " of " + msg.fileName + ").\n\nMessage: " + msg.stack): alert("[Essence.js] An error has occurred (line " + line + " of " + url + ").\n\nMessage: " + msg)
		}, say: function (msg, type, style, style0, style1, style2) { //Say something in the console
			type = isNon(type)? "": type.slice(0, 4).toLowerCase();
			if (style && !style0) {
				if (type === "info") console.info("%c[EssenceJS]%c " + msg, "color: #00f; text-decoration: bold;-webkit-text-decoration: bold;-moz-text-decoration: bold;", "color: #000", style);
				else if (type === "erro") console.error("%c[EssenceJS]%c " + msg, "color: #f00; text-decoration: bold;-webkit-text-decoration: bold;-moz-text-decoration: bold;", "color: #000", style);
				else if (type === "warn") console.warn("%c[EssenceJS]%c " + msg, "color: #fc0; text-decoration: bold;-webkit-text-decoration: bold;-moz-text-decoration: bold;", "color: #000", style);
				else if (type === "succ") console.log("%c[EssenceJS]%c " + msg, "color: #0f0; text-decoration: bold;-webkit-text-decoration: bold;-moz-text-decoration: bold;", "color: #000", style);
				else console.log("%c[EssenceJS]%c " + msg, "color: #808080; text-decoration: bold;-webkit-text-decoration: bold;-moz-text-decoration: bold;", "color: #000", style);
			} else if (style && style0 && !style1) {
				if (type === "info") console.info("%c[EssenceJS]%c " + msg, "color: #00f; text-decoration: bold;-webkit-text-decoration: bold;-moz-text-decoration: bold;", "color: #000", style, style0);
				else if (type === "erro") console.error("%c[EssenceJS]%c " + msg, "color: #f00; text-decoration: bold;-webkit-text-decoration: bold;-moz-text-decoration: bold;", "color: #000", style, style0);
				else if (type === "warn") console.warn("%c[EssenceJS]%c " + msg, "color: #fc0; text-decoration: bold;-webkit-text-decoration: bold;-moz-text-decoration: bold;", "color: #000", style, style0);
				else if (type === "succ") console.log("%c[EssenceJS]%c " + msg, "color: #0f0; text-decoration: bold;-webkit-text-decoration: bold;-moz-text-decoration: bold;", "color: #000", style, style0);
				else console.log("%c[EssenceJS]%c " + msg, "color: #808080; text-decoration: bold;-webkit-text-decoration: bold;-moz-text-decoration: bold;", "color: #000", style, style0);
			} else if (style && style0 && style1 && !style2) {
				if (type === "info") console.info("%c[EssenceJS]%c " + msg, "color: #00f; text-decoration: bold;-webkit-text-decoration: bold;-moz-text-decoration: bold;", "color: #000", style, style0, style1);
				else if (type === "erro") console.error("%c[EssenceJS]%c " + msg, "color: #f00; text-decoration: bold;-webkit-text-decoration: bold;-moz-text-decoration: bold;", "color: #000", style, style0, style1);
				else if (type === "warn") console.warn("%c[EssenceJS]%c " + msg, "color: #fc0; text-decoration: bold;-webkit-text-decoration: bold;-moz-text-decoration: bold;", "color: #000", style, style0, style1);
				else if (type === "succ") console.log("%c[EssenceJS]%c " + msg, "color: #0f0; text-decoration: bold;-webkit-text-decoration: bold;-moz-text-decoration: bold;", "color: #000", style, style0, style1);
				else console.log("%c[EssenceJS]%c " + msg, "color: #808080; text-decoration: bold;-webkit-text-decoration: bold;-moz-text-decoration: bold;", "color: #000", style, style0, style1);
			} else if (style && style0 && style1 && style2) {
				if (type === "info") console.info("%c[EssenceJS]%c " + msg, "color: #00f; text-decoration: bold;-webkit-text-decoration: bold;-moz-text-decoration: bold;", "color: #000", style, style0, style1, style2);
				else if (type === "erro") console.error("%c[EssenceJS]%c " + msg, "color: #f00; text-decoration: bold;-webkit-text-decoration: bold;-moz-text-decoration: bold;", "color: #000", style, style0, style1, style2);
				else if (type === "warn") console.warn("%c[EssenceJS]%c " + msg, "color: #fc0; text-decoration: bold;-webkit-text-decoration: bold;-moz-text-decoration: bold;", "color: #000", style, style0, style1, style2);
				else if (type === "succ") console.log("%c[EssenceJS]%c " + msg, "color: #0f0; text-decoration: bold;-webkit-text-decoration: bold;-moz-text-decoration: bold;", "color: #000", style, style0, style1, style2);
				else console.log("%c[EssenceJS]%c " + msg, "color: #808080; text-decoration: bold;-webkit-text-decoration: bold;-moz-text-decoration: bold;", "color: #000", style, style0, style1, style2);
			} else {
				if (type === "info") console.info("%c[EssenceJS]%c " + msg, "color: #00f; text-decoration: bold;-webkit-text-decoration: bold;-moz-text-decoration: bold;", "color: #000");
				else if (type === "erro") console.error("%c[EssenceJS]%c " + msg, "color: #f00; text-decoration: bold;-webkit-text-decoration: bold;-moz-text-decoration: bold;", "color: #000");
				else if (type === "warn") console.warn("%c[EssenceJS]%c " + msg, "color: #fc0; text-decoration: bold;-webkit-text-decoration: bold;-moz-text-decoration: bold;", "color: #000");
				else if (type === "succ") console.log("%c[EssenceJS]%c " + msg, "color: #0f0; text-decoration: bold;-webkit-text-decoration: bold;-moz-text-decoration: bold;", "color: #000");
				else console.log("%c[EssenceJS]%c " + msg, "color: #808080; text-decoration: bold;-webkit-text-decoration: bold;-moz-text-decoration: bold;", "color: #000");
			}
		},
		applyCSS: function (nonMinify) {
			include_once(getExtPath(getDirectoryPath(gatherScripts()[gatherScripts()["essence.min.js"]? "essence.min.js": "essence.js"])) + (nonMinify? "essence.css": "essence.min.css"), "link", getDirectoryPath());
			/*if ($end("html").val(true).indexOf("<body></body>") > -1) { //A bit of cleaning
			 var ix = $end("html").val(true).indexOf("<body></body>");
			 var bfr = $end("html").val(true).slice(0, ix), aft = $end("html").val(true).slice(ix + 13, $end("html").val(true).length);
			 $end("html").write(bfr + aft, true);
			 }*/
		},
		addCSS: function (nstyle) {
			if ($n("style", true) === null) {
				var s = document.createElement("style");
				s.innerText = nstyle;
				//start.media = "all";
				s.type = "text/css";
				s.id = "EssenceCSS";
				$n("head").appendChild(s);
			} else if ($e("style[type='text/css']", true) != null) $e("style[type='text/css']").after(nstyle);
			else $e("style").after(nstyle);
		}, addJS: function (nscript) {
			if ($n("script", true) === null) {
				var s = document.createElement("script");
				s.innerText = nscript;
				s.type = "text/javascript";
				$n("head").appendChild(s);
			} else $e("script[type='text/javascript']").after(nscript);
		}, update: function () { //To keep the script updated !!
			var $s = $n("*script").toArray();
			var scripts = filenameList($s.map(function (script) {
				return script.src;
			}));
			for (var i = 0; i < scripts.length; i++) {
				if (stripPath(scripts[i]) === "essence.js" || stripPath(scripts[i]) === "essence.min.js") $s[i].src = Essence.source;
			}
			Essence.say("%cEssence(.min).js%c has been updated", "succ", "text-decoration: underline", "text-decoration: none");
		},
		/** @const {number} Essence.eps Epsilon */
		eps: Math.pow(2, -52), //Matlab'start epsilon (useful when dealing with null values to keep them in the real range or just not null
		emptyDoc: function (title, author) { //Empty the document and fill it with a basic structure
			$e("html").write("<head><title>" + (title || document.title) + "</title><meta charset='UTF-8' /><meta name='author' content=" + (author || "unknown") + " /><script type='text/javascript' src=" + Essence.source + "></script></head><body></body>", true);
		}, editor: function (ctt) {
			location.href = "data:text/html, <html contenteditable>" + (ctt? ctt + "</html>": "</html>");
		}, processList: [["Name (signature)", "Author", "Size"]],
		global: null,
		addProcess: function (pcs) {
			pcs.update();
			Essence.processList.push([pcs.name + " (" + pcs.sig + ")", pcs.author, pcs.bitsize]);
			pcs.id = Essence.processList.length - 1;
			Essence.processSize += pcs.bitsize;
		}, processSize: 0, serverList: [["Name", "Author", "Maximum size"]],
		addServer: function (serv) {
			serv.update();
			Essence.serverList.push([serv.name, serv.author, serv.maxsize]);
			Essence.serverSize += serv.maxsize;
		}, serverSize: 0,
		toString: function () {
			return "[object Essence]"
		}, txt2print: "",
		addToPrinter: function (txt, type) { //Allow the usage of print without having to directly touch to txt2print
			txt.has("\n\r")? this.print(txt, type): this.txt2print += txt;
		}, print: function (txt, type) { //Works like the print in Java
			if (txt) this.txt2print += txt;
			this.txt2print = this.txt2print.split("\b");
			for (var i = 0; i < this.txt2print.length; i++) {
				this.say(this.txt2print[i], type);
			}
			this.txt2print = "";
		}, preInit: function () {
			$G["t1"] = $G["t1"].getSeconds() * 1000 + $G["t1"].getMilliseconds();
		}, init: function () {
			$G["t2"] = new Date();
			$G["t2"] = $G["t2"].getSeconds() * 1000 + $G["t2"].getMilliseconds();
			$G["t"] = ($G["t2"] - $G["t1"] > 1000)? ($G["t2"] - $G["t1"]) / 1000 + "start": ($G["t2"] - $G["t1"]) + "ms";
			Essence.say("Page loaded in %c" + $G["t"] + "%c", "succ", "font-style: italic", "font-style: none");
		}, time: function(msg, style, style0) { //Like Essence.say(msg) but with the timestamp
			console.log("[%c" + getTimestamp(true) + "%c] "+msg, "color: #00f;", "color: #000;", style || "", style0 || "")
		}, sayClr: function (clrs) { //Display a RGB(A) coloured console log
			clrs.length === 4? console.log("%cr%cg%cb%ca(%c" + clrs.join(", %c") + "%c)", "color: #f00", "color: #0f0", "color: #00f", "color: #00f", "color: #000", "color: #f00", "color: #0f0", "color: #00f", "color: #00f", "color: #000"): console.log("%cr%cg%cb%c(%c" + clrs.join(", %c") + "%c)", "color: #f00", "color: #0f0", "color: #00f", "color: #00f", "color: #000", "color: #f00", "color: #0f0", "color: #00f", "color: #00f", "color: #000");
		}, ask: function (label, callback) { //Ask something to the user
			Sys.in.recording = true;
			Essence.say((label || "Is there a problem") + " ? (please type in the window and not the console)", "quest");
			while ($G["lastKeyPair"][1] != 96 /*$G["lastKeyPair"][1] != 13*/ && $G["lastKeyPair"][1] != 10) { //Quits on enter and `
				//Essence.say("waiting for an enter");
			}
			alert("OUT !!");
			Sys.in.recording = false;
			if(callback) callback(Sys.in.data.join(""));
			return Sys.in.data.join("");
		}, isComplete: function () {
			var complete = true;
			this.loadedModules = [];
			for (var i = 0; i < modules.length; i++) {
				try {
					eval(window[modules[i]].loaded);
				} catch (e) {
					Essence.say("The module " + modules[i] + " is not right !", "warn");
					init(modules[i]);
				} finally {
					complete &= window[modules[i]].loaded;
				}
				if (window[modules[i]].loaded) this.loadedModules.push(window[modules[i]]);
			}
			return !!complete;
		}, loadedModules: [],
		updateAll: function () {
			this.update();
			this.isComplete();
			this.loadedModules.map(function (m) {
				m.update();
			})
		}
	},
	/**
	 * @description List of modules
	 * @global
	 * @type {string[]}
	 * @since 1.1
	 */
	modules = [],
	/**
	 * @description Debugging flag
	 * @global
	 * @type {boolean}
	 * @since 1.1
	 */
	debugging = false,
	/**
	 * @description Empty function
	 * @global
	 * @type {Function}
	 * @since 1.1
	 * @readonly
	 * @returns {undefined}
	 */
	$f = function () {},
	/**
	 * @description Test mode on/off
	 * @type {boolean}
	 * @global
	 * @since 1.1
	 */
	testMode = false;

/**
 * @description EssenceJS Module
 * @param {string} [name="Module"] Name
 * @param {string} [desc=""] Description
 * @param {string[]} [dpc=[]] Dependencies
 * @param {number} [ver=1] Version
 * @param {Function} [rn=function () {}] Run method
 * @param {string} [pathVer=Essence.version.substr(0, 3)] Path's version
 * @constructor
 * @this Module
 * @returns {Module} Module
 * @property {string} Module.name Name of the module
 * @property {number} Module.version Version of the module
 * @property {string[]} Module.dependency Dependencies
 * @property {string} Module.description Description of the module
 * @property {Function} Module.run Runner method
 * @property {boolean} Module.loaded Loading flag
 * @property {string} Module.path Path of the module
 * @property {Function} Module.load Load the module as well as initializing its dependencies
 * @property {function(): string} Module.toString String representation
 * @property {function(): number} Module.getWeight Weight of the module on EssenceJS's module ecosystem
 * @property {Function} Module.update Update the module
 * @since 1.1
 */
function Module (name, desc, dpc, ver, rn, pathVer) {
	this.name = name || "Module";
	this.version = ver || 1;
	this.dependency = dpc || [];
	this.description = desc || "";
	this.run = rn || $f;
	this.loaded = false;
	this.path = (pathVer? pathVer : Essence.version.substr(0, 3)) + "/modules/" + this.name + ".js";

	this.load = function () {
		if (debugging) Essence.say("Loading " + this.name);
		if (this.dependency.length > 0) {
			if (debugging) Essence.say("Initiating dependencies for %c" + this.name + "%c", "info", "color: #f0f", "color: #000");
			//For less redundancy here: this.dependency -> complement(this.dependency, modules)
			init(this.dependency, false, false, pathVer);
		}
		/*if (gatherExternalScripts(true).has(this.path) || filenameList(gatherExternalScripts(true)).has(this.path)) */this.loaded = true;
	};

	this.toString = function () {
		return "Module(name='" + this.name + "', version=" + this.version + ", dependency=[" + this.dependency + "], description='" + this.description + "', loaded=" + this.loaded + ", run=" + this.run + ", path='" + this.path + "')";
	};

	this.getWeight = function () {
		var dpcs = moduleList().line(3).get(1), weight = 0, names = moduleList().line().get(1); //List of dependencies of all loaded modules
		for (var i = 0; i < dpcs.length; i++) {
			if (dpcs[i].has(this.name) && names[i] != this.name && dpcs[i].count(this.name) < 2) weight++;
			else if (names[i] === this.name && dpcs[i].has(this.name)) weight--; //Penalty
		}
		return weight;
	};

	this.update = function () { //This method should not be used before EssenceJS is fully implemented onto the environment using it
		var $s = $n("*script").toArray();
		var scripts = filenameList($s.map(function (script) {
			return script.src;
		}));
		for (var i = 0; i < scripts.length; i++) {
			if (stripPath(scripts[i]) === this.name + ".js") $s[i].src = "http://berkmann18.github.io/rsc/modules/" + this.name + ".js";
			else if (stripPath(scripts[i]) === this.name + ".min.js") $s[i].src = "http://berkmann18.github.io/rsc/modules/" + this.name + ".min.js";
		}

		Essence.say(this.name.capitalize() + "(.min).js has been updated", "succ");
	};
	return this;
}

/**
 * @description ES6-like module loader
 * @func
 * @param {Str} mdl Module
 * @param {NumberLike} [ver] Version of the directory containing it
 * @param {string} [extpath] External path
 * @returns {undefined}
 * @since 1.1
 * @example <caption>Example 1:</caption>
 * require("myModule"); //It will import the script located at "modules/myModule.js"
 * require(["moduleA", "moduleB", "moduleC"]); //It will import "modules/moduleA.js", "modules/moduleB.js" and "modules/moduleC.js"
 * @example <caption>Example 2:</caption>
 * require("myModule", 1.1); //It will import the script located at "1.1/modules/myModule.js"
 * @see module:essence~$require
 * @deprecated
 */
function require (mdl, ver, extpath) {
	if (isType(mdl, "Array")) {
		for (var i = 0; i < mdl.length; i++) { //noinspection JSDeprecatedSymbols
			require(mdl[i], ver);
		}
	} else if (modules.indexOf(mdl) === -1) {
		include_once((ver? ver + "/": "") + "modules/" + mdl + ".js", "script", extpath || getDirectoryPath());
		modules.push(mdl);
		if (debugging) console.log("The module %c%start%c is now included into %c%start    " + getTimestamp(true), "color: red; text-decoration: bold; -webkit-text-decoration: bold; -moz-text-decoration: bold;", mdl, "color: #000; text-decoration: none;", " text-decoration: bold; -webkit-text-decoration: bold; -moz-text-decoration: bold;", getFilename());
	} else if (debugging) console.log("The module %c%start%c is already included into %c%start    " + getTimestamp(true), "color: red; text-decoration: bold; -webkit-text-decoration: bold; -moz-text-decoration: bold;", mdl, "color: #000; text-decoration: none;", " text-decoration: bold; -webkit-text-decoration: bold; -moz-text-decoration: bold;", getFilename());
}

/**
 * @description ES6-like module loader
 * @func
 * @param {Str} mdl Module
 * @returns {undefined}
 * @since 1.1
 * @example <caption>Example 1:</caption>
 * require("myModule"); //It will import the script located at "modules/myModule.js"
 * require(["moduleA", "moduleB", "moduleC"]); //It will import "modules/moduleA.js", "modules/moduleB.js" and "modules/moduleC.js"
 */
function $require (mdl) {
	var toND = function (x, n) {
		var i = this + ""; //Because it won't work with other types than strings
		n = n || 2;
		if (parseFloat(i) < Math.pow(10, n - 1)) {
			while (i.split(".")[0].length < n)  i = "0" + i;
		}
		return i
	}, getT = function () {
		var d = new Date();

		return getDate() + " " + toND(d.getHours(), 2) + ":" + toND(d.getMinutes(), 2) + ":" + toND(d.getSeconds(), 2) + "." + toND(d.getMilliseconds(), 2)
	}, stripP = function (p) {
		return p.split("/")[p.split("/").length - 1]
	}, _g = function (x, start, end) {
		var res = "";
		if (start < 0 && !end) {
			end = start;
			start = 0;
		}
		if (end < 0) end = x.length + end - 1;
		for (var i = (start || 0); i <= (end || x.length - 1); i++) res += x[i];

		return res
	},getFn = function () {
		return _g(stripP(location.pathname), (-stripP(location.pathname).lastIndexOf(".") - 1));
	};
	if (isType(mdl, "Array")) {
		for (var i = 0; i < mdl.length; i++) $require(mdl[i]);
	} else if (modules.indexOf(mdl) === -1) {
		gatherScripts()["essence.min.js"]? include_once(getExtPath(getDirectoryPath(gatherScripts()["essence.min.js"])) + "modules/" + mdl + ".min.js", "script"): include_once(getExtPath(getDirectoryPath(gatherScripts()["essence.js"])) + "modules/" + mdl + ".js", "script");
		modules.push(mdl);
		if (debugging) console.log("The module %c%start%c is now included into %c%start    " + getT(), "color: red; text-decoration: bold; -webkit-text-decoration: bold; -moz-text-decoration: bold;", mdl, "color: #000; text-decoration: none;", " text-decoration: bold; -webkit-text-decoration: bold; -moz-text-decoration: bold;", getFn());
	} else if (debugging) console.log("The module %c%start%c is already included into %c%start    " + getT(), "color: red; text-decoration: bold; -webkit-text-decoration: bold; -moz-text-decoration: bold;", mdl, "color: #000; text-decoration: none;", " text-decoration: bold; -webkit-text-decoration: bold; -moz-text-decoration: bold;", getFn());
}

/**
 * @description Run a module that was already imported (see {@link require}) after initiating its dependencies
 * @func
 * @since 1.1
 * @param {Str} module Module
 * @param {NumberLike} [ver] Directory version
 * @returns {undefined}
 * @example
 * run("myModule"); //will run myModule.run()
 * run(["moduleA", "moduleB"]); //will run moduleA.run() then moduleB.run() (unless module is a dependency of moduleA in which case it will be ran before)
 */
function run (module, ver) {
	if (isType(module, "Array")) {
		for (var i = 0; i < module.length; i++) run(module[i], ver);
	} else if (modules.indexOf(module) > -1) {
		/**
		 * @description Go onto the running phase of the module
		 * @inner
		 * @func
		 * @returns {undefined}
		 */
		var go = function () {
			try {
				if (debugging) Essence.say("Running " + module + "    " + getTimestamp(true), "info");
				/*init(window[module].dependency, false, function (x) {
				 if (debugging) Essence.say("%c" + x + "%c from %c" + module + "%c'start dependency has been initiated !!    " + getTimestamp(true), "info", "color: #c0f", "color: #000", "color: #f0c", "color: #000");
				 //console.info("")
				 }, ver);*/
				if (!window[module].loaded) window[module].load();
				window[module].run();
			} catch (e) {
				Essence.time("The module %c" + module + "%c have problems regarding it'start run method.", "color: #c0f", "color: #000");
			}
		}, /**
		 * @description Retry to get the module to be usable and launch go()
		 * @inner
		 * @func
		 * @param {number} [stackLayer=0] Stack layer
		 * @returns {undefined}
		 */
		retry = function (stackLayer) {
			if (!stackLayer) stackLayer = 0;
			Essence.say("The module %c" + module + "%c isn't available !    " + getTimestamp(true), "erro", "color: #c0f", "color: #000");
			if (debugging) Essence.say("Retrying to run %c" + module + "%c    " + getTimestamp(true), "info", "color: #c0f", "color: #000");
			if (window[module]) go();
			else if (stackLayer <= 2) setTimeout(retry(stackLayer + 1), 1);
			else Essence.say("It'start not possible to run %c" + module + "%c :( !    " + getTimestamp(true) + "\nModule: " + window[module], "info", "color: #c0f", "color: #000");
			init(module);
		};
		window[module]? go(): retry();
	} else Essence.say("The module %c" + module + "%c isn't in the list !!    " + getTimestamp(true), "erro", "color: #c0f", "color: #000");
}

/**
 * @description Initiate a module
 * @param {Str} mdls Module(start)
 * @param {function(*)|boolean} [mid] Mid-execution function
 * @param {function(*)|boolean} [cb] Callback function
 * @param {NumberLike} [ver] Version (if the modules are in a version based partitioning (end.g: 1.0/modules/ModuleA.js, 1.1/modules/ModuleA.js, beta/modules/ModuleA.js)
 * @param {*} [argsMid] Arguments for the mid()
 * @param {*} [argsCB] Arguments for the cb()
 * @since 1.0
 * @returns {undefined}
 * @func
 * @example <caption>Example 1:</caption>
 * init("myModule"); //Initiate the module myModule
 * init(["moduleA", "moduleB"]); //Initiate the modules moduleA and moduleB
 * @example <caption>Example 2:</caption>
 * init("myModule", function () {}, function () {
 *   Essence.say("myModule has been fully initiated !", "info");
 * }, "alpha"); //Initiate the myModule.js module located at alpha/modules/ and with a callback
 * init(["moduleA", "moduleB"], function (mdl) {
 *   Essence.say("Midway through " + mdl, "info");
 * }, function (mdl) {
 *   Essence.say("Finished initiating " + mdl, "succ");
 * });
 */
function init (mdls, mid, cb, ver, argsMid, argsCB) {
	if (isType(mdls, "Array")) {
		for (var i = 0; i < mdls.length; i++) init(mdls[i], mid, cb, ver, mdls[i], mdls[i]);
	} else {
		if (debugging) Essence.say("Initiating " + mdls);
		if (modules.indexOf(mdls) === -1) $require(mdls);
		else if (debugging) Essence.say("The module %c" + mdls + "%c was already initiated !!", "info", "color: #c0f", "color: #000");
		if (mid) mid(argsMid || mdls); //Used when initiating a module that has dependencies
		setTimeout(function () { //Delayed running to leave some time for the module to be fully available to this page
			//if (!window[mdls].loaded) window[mdls].load();
			run(mdls);
			if (cb) cb(argsCB || mdls);
		}, 1);
	}
}

/**
 * @ignore
 * @external module/File~getDirectoryPath
 * @inheritdoc
 * @param {string} [path=location.href] Path
 * @returns {string} Directory path
 * @since 1.1
 */
var getDirectoryPath = function (path) {
	if(!path) path = location.href;
	return path.substring(0, path.indexOf(path.split("/")[path.split("/").length - 1]))
}, /**
 * @ignore
 * @external module/DOM~gatherScripts
 * @inheritdoc
 * @param {boolean} [asList=false] Result should be a list or an object
 * @returns {*} List/dictionary of scripts
 */
gatherScripts = function (asList) {
	var $s = $n("*script"), res = asList? []: {};
	for(var i = 0; i < $s.length; i++) asList? res.push($s[i].src): res[$s[i].src.split("/")[$s[i].src.split("/").length - 1]] = $s[i].src;
	return res
}, /**
 * @ignore
 * @external module/DOM~gatherStylesheets
 * @inheritdoc
 * @param {boolean} [asList=false] Result should be a list or an object
 * @returns {*} List/dictionary of stylesheets
 */
gatherStylesheets = function (asList) {
	var $l = $n("*link"), res = asList? []: {};
	for(var i = 0; i<$l.length; i++) asList? res.push($l[i].href): res[$l[i].href.split("/")[$l[i].href.split("/").length - 1]] = $l[i].href;
	return res
},/**
 * @ignore
 * @inheritdoc
 * @external module/File~getCurrentPath
 * @param {string} path Path
 * @param {string} [localPath="file:///"] Local path
 * @returns {string} Current path
 */
getCurrentPath = function (path, localPath) {
	if (!localPath) localPath = "file:///";
	var parts = path.split("/"), res, pParts = localPath.split("/"), i = 0, j = 0, _get = function (o, start, end) {
		var r = [];
		if (start < 0 && !end) {
			end = start;
			start = 0;
		}
		if (end < 0) end = o.length + end - 1;
		for (var i = (start || 0); i <= (end || o.length - 1); i++) r.push(o[i]);
		return r.filter(function (x) {
			return x != undefined;
		});
	};
	while (localPath.indexOf(parts[i]) > -1) i++;
	res = _get(parts, i).join("/");

	while (res.indexOf(pParts[j]) > -1) {
		console.log("Gone through " + pParts[j]);
		j++;
	}
	if (j > 0) {
		for(i = 0; i < j; i++) res = "../" + res;
	}
	return res
}, /**
 * @ignore
 * @inheritdoc
 * @external module/File:getExtPath
 * @param {string} path Full path
 * @returns {string} External path
 */
getExtPath = function (path) {
	var cp = location.href, sF = function (s0, s1) {
		var sf = "", pos = -1;
		while (pos <= Math.min(s0.length, s1.length)) {
			pos++;
			if (s0[pos] === s1[pos]) sf += s0[pos];
			else break;
		}
		return sf;
	}, ct = function (o, c) {
		var n = 0;
		for (var i = 0; i < o.length; i++) {
			if (o[i] === c) n++;
		}
		return n
	};
	var parentPath = sF(cp, path);
	return "../".repeat(ct(getCurrentPath(cp, parentPath), "/")) + getCurrentPath(path, parentPath);
}, /**
 * @ignore
 * @inheritdoc
 * @external module/File:filenameList
 * @returns {Array} File name list
 */ filenameList = function (list) {
	var res = [];
	for(var i = 0; i < list.length; i++) res.push(stripPath(list[i]));
	return res.remove()
};

/**
 * @summary Module Loading section
 * @since 1.1
 * @returns {undefined}
 * @func
 */
(function () {
	//document.scripts[i].ownerDocument may be useful to correct the link of the included modules
	if (debugging) Essence.say("Initiating the Module Loader");
	$require(["Files", "DOM", "UI", "Web", "Maths", "Ajax", "DataStruct", "Security", "Misc", "QTest"]);
	/* init(["Web", "Maths", "Ajax", "DataStruct", "Security", "Misc", "QTest"], function (mdl) {
	 Essence.say(mdl + " on the way!", "info");
	 }, function (mdl) {
	 Essence.say(mdl + " is ready!", "succ");
	 }, 1.1); */
	setTimeout(function () {
		run(modules, Essence.version.substr(0, 3));
	}, 690);
	setTimeout(function () {
		if (debugging) {
			if (Essence.isComplete()) {
				Essence.say("Essence is complete !", "succ");

			} else Essence.time("List of loaded modules: " + Essence.loadedModules.map(function (m) {
					return m.name;
				}).toStr(true));
		}
		if (!filenameList(gatherExternalScripts(true)).has("essence.js")) Essence.source = Essence.source.replace(".js", ".min.js");
		if (testMode) UnitTest.multiTest(UnitTest.libTests);
		UnitTest.libTests = [
			//essence

			//Ajax
			/*[GET("_ijt"), function () {
			 var val = null;
			 parseURL("_ijt", function (x) {
			 val = x;
			 });
			 return val;
			 }, "GET],*/
			//DataStruct
			[binarySearch(["hi", " ", "dude"], " ", "BinarySearch"), true],
			//[binarySearch(["hi", " ", "dude"], "!", "BinarySearch"), false],
			//[search(["hi", " ", "dude"], "!", "Search"), -1],
			[Perm("abc"), ["abc", "acb", "cab", "cba", "bac", "bca"], "Perm"],
			//DOM
			[unescapeHTML(escapeHTML("<p>Hi</p>")), "<p>Hi</p>", "Un(escape)"],
			[escapeHTML(unescapeHTML("&lt;p&gt;Hi&lt;/p&gt;")), "&lt;p&gt;Hi&lt;/p&gt;", "Es(unescape)"],
			//Files
			[getDirectoryPath() + stripPath(location.href), location.href, "Path"],
			//Maths
			[min2dec(dec2min(.56)), .56, "min<->dec"],
			[toS(s2t(75.23)), 75.23, "start<->time"],
			[isPrime(23), true, "Prime"],
			[isPrime(25), false, "!Prime"],
			//Misc
			[rmDuplicates("hello world !"), "helo wrd!", "NoDuplic"],
			[unRegExpify(RegExpify("Hi ${name}")), "Hi ${name}", "RE<->"],
			//QTest
			//Security
			[decrypt(encrypt("Hello", 5), -5), "Hello"," de(encrypt)"],
			[encrypt(decrypt("Hello", -5), 5), "Hello", "en(decrypt)"],
			[abcDecode(abcEncode("Lorem")), "Lorem", "de(encode)"],
			[abcEncode(abcDecode("6415180513")), "6415180513", "en(decode)"],
			[ilDecrypt(ilEncrypt("Hello")), "Hello", "il-De(En)"],
			[ilEncrypt(ilDecrypt("Hello")), "Hello", "il-En(De)"], //Result: £¡¡«
			//[RSA(RSA("Secrete", keys), ??), "Secrete", "RSA"],
			[fromFSHA(toFSHA("password")), "password", "fromFSHA(to)"],
			[toFSHA(fromFSHA("password")), "password", "toFSHA(from)"]
			//UI

			//Web
		];
		if (debugging && !Essence.loadedModules.map(function (m) {
				return m.name;
			}).equals(modules)
		) Essence.say("The following modules weren't loaded: " + complement(modules, Essence.loadedModules.map(function (m) {
				return m.name;
			}))
		);
		if (Essence.source.has("essence.min")) { //If it'start the minimised version, change the modules to their minimised version as well
			var $s = $n("*script").toArray();
			for (var i = 0; i < $s.length; i++) {
				if (!$s[i].src.has(".min.js")) $s[i].src.replace(".js", ".min.js");
			}
		}
	}, 1e3);
})();

/**
 * @description Globals won't be globals !!
 * @type {{t1: Date, t2: number, t: ?number, lastKeyPair: Array}}
 * @default
 * @since 1.0
 * @global
 */
var $G = {
	t1: new Date(),
	t2: 0,
	t: null,
	lastKeyPair: [],
	lorem: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,"
};

//noinspection JSValidateTypes
Essence.global = $G;

/**
 * @description Element selector
 * @param {string} selector A CSS selector
 * @param {boolean} [silence=false] Flag to use when <code>selector</code> doesn't exist yet (end.g: a particular selector used by a JS object/function which may not be in the page yet).
 * @returns {?Element} Element
 * @since 1.0
 * @func
 */
function $e (selector, silence) { //THE selector !!
	if (silence) {
		try {
			return new Element(selector)
		} catch (e) {
			if (debugging) Essence.say("%c$e(\"" + selector + "\")%c isn't there (yet).", "warn", "color: #f00", "color: #000");
			return null;
		}
	} else return new Element(selector);
}

/**
 * @description Element'start node
 * @param {string} selector A CSS selector
 * @param {boolean} [silence=false] Flag to use when <code>selector</code> doesn't exist yet (end.g: a particular selector used by a JS object/function which may not be in the page yet).
 * @returns {HTMLElement} Element node
 * @since 1.0
 * @func
 */
function $n (selector, silence) { //To get directly the node without having to use $end(selector).node
	return (silence && isNon($e(selector, silence)))? null: $e(selector).node;
}

/**
 * @description Element
 * @param {string} selector A CSS selector
 * @this Element
 * @returns {Element} Element object
 * @constructor
 * @since 1.0
 * @throws {InvalidParamError} Invalid parameter
 * @property {HTMLElement} Element.node Node
 * @property {function(boolean, boolean): (NumberLike|XML)} Element.val Get the node's value
 * @property {function(): number} Element.size Get the node's value's size
 * @property {function(): boolean} Element.isEmpty Check if the node's value is empty
 * @property {function(*, boolean, boolean)} Element.write Write something to the node
 * @property {function(*, boolean, boolean)} Element.before Write something to the node before its value
 * @property {function(*, boolean, boolean)} Element.after Write something to the node after its value
 * @property {function(string, ?string)} Element.remove Remove a character/string from the node's value and optionally insert jointers
 * @property {function(string, string)} Element.setCSS Set a CSS rule or change a CSS property
 * @property {function(string[])} Element.setStyles Set multiple CSS rules
 * @property {function(string): NumberLike} Element.css Get the value of a CSS property
 * @property {function(string): boolean} Element.hasClass Check if the node is affiliated to a class
 * @property {function(string): boolean} Element.hasCSS Check if the node's CSS include a particular rule
 * @property {function(string)} Element.addClass Affiliate the node to a particular class
 * @property {function(string)} Element.rmClass Disjoin the node from a particular class
 * @property {function(string, (Str|Nums), number)} Element.toggleCSS Toggle a CSS property
 * @property {Function} Element.show Show the node
 * @property {Function} Element.hide Hide the node
 * @property {function(string)} Element.on Event handler
 * @property {function(): string} Element.toString String representation of the element
 * @property {function(): string} Element.tagName Tagname of the element
 * @property {Function} Element.scrollBottom Scroll to the bottom of the node
 * @property {Function} Element.scrollTop Scroll to the top of the node
 * @property {Function} Element.scrollLeft Scroll to the left of the node
 * @property {Function} Element.scrollRight Scroll to the right of the node
 * @property {function(number, number)} Element.scroll Scroll in any directions
 * @property {function(string, number)} Element.autoScroll Auto scrolling animation
 * @property {function(string, *): *} Element.attr Get/set the attribute of the node
 * @property {function(string)} Element.rmAttr Remove an attribute from the node
 * @property {Function} Element.invColour Invert the colour and background colour (by negation)
 * @property {function(): string[]} Element.classes Get an array of classes of the element
 * @property {function(function(HTMLElement))} Element.multi Execute a callback on all nodes of a $e("*...") element
 * @property {function(string, Array)} Element.multiElm Execute a method on all elements of a $e("*...") element
 */
function Element (selector) { //The element object
	if (/^([#.*_-`~&]\W*|\S|undefined|null|)$/.test(selector)) throw new InvalidParamError("Element cannot accept the selector '" + selector + "' as it'start invalid."); //Reject invalid selectors
	if (selector[0] === "#") this.node = document.querySelector(selector) || document.getElementById(selector.slice(1, selector.length)); //Id
	else if (selector[0] === ".") this.node = document.querySelector(selector) || document.getElementByClassName(selector.slice(1, selector.length)); //Class
	else if (selector[0] === "*") this.node = document.querySelectorAll(selector.slice(1, selector.length)) || document.getElementsByTagName(selector.slice(1, selector.length)); //Node array
	else this.node = document.querySelector(selector);
	if (this.node === null) throw new Error("The node $n(\"" + selector + "\") doesn't exist !!");

	this.val = function (getHTML, withTags) { //Get the value of the element'start node
		if (isType(this.node, "array")) {
			var arr = [];
			for (var i = 0; i < this.node.length; i++) {
				if (this.node[i].value && !getHTML && !withTags) arr.push(this.node[i].value);
				else if (this.node[i].innerHTML && getHTML && !withTags) arr.push(this.node[i].innerHTML);
				else if (this.node[i].innerText && !getHTML && !withTags) arr.push(this.node[i].innerText);
				else if (this.node[i].outerHTML && !getHTML && withTags) arr.push(this.node[i].outerHTML);
				else arr.push(this.node[i].value? this.node[i].value: this.node[i].innerText);
			}
			return arr
		}
		if (this.node.value && !getHTML && !withTags) return this.node.value;
		else if (this.node.innerHTML && getHTML && !withTags) return this.node.innerHTML;
		else if (this.node.innerText && !getHTML && !withTags) return this.node.innerText;
		else if (this.node.outerHTML && !getHTML && withTags) return this.node.outerHTML;
		else return this.node.value? this.node.value: this.innerText
	};

	this.size = function () {
		return this.val().length
	};

	this.isEmpty = function () {
		return isNon(this.val());
	};

	this.write = function (nval, parseToHTML, incTags) {
		if (typeof this.val(true) == "undefined") this.node.innerText = "?";
		if (isType(this.node, "array")) {
			for (var i = 0; i < this.node.length; i++) {
				if (this.node[i].value && !parseToHTML && !incTags) this.node[i].value = isType(nval, "array")? nval[i]: nval;
				else if (this.node[i].innerHTML && parseToHTML && !incTags) this.node[i].innerHTML = isType(nval, "array")? nval[i]: nval;
				else if (this.node[i].innerText && !parseToHTML && !incTags)this.node[i].innerText = isType(nval, "array")? nval[i]: nval;
				else if (this.node[i].outerHTML && !parseToHTML && incTags) this.node[i].outerHTML = isType(nval, "array")? nval[i]: nval;
				else this.node[i].value? (this.node[i].value = isType(nval, "array")? nval[i]: nval): (this.node[i].innerText = isType(nval, "array")? nval[i]: nval);
			}
		}

		if (this.node.value && !parseToHTML && !incTags) this.node.value = nval;
		else if (this.node.innerHTML && parseToHTML && !incTags) this.node.innerHTML = nval;
		else if (this.node.innerText && !parseToHTML && !incTags) this.node.innerText = nval;
		else if (this.node.outerHTML && incTags && !parseToHTML) this.node.outerHTML = nval;
		else this.node.value? this.node.value = nval: this.innerText = nval;
	};

	this.before = function (nval, parseToHTML, incTags) {
		if (typeof this.val(true) == "undefined") this.node.innerText = "?";
		if (isType(this.node, "array")) {
			for (var i = 0; i < this.node.length; i++) {
				if (this.node[i].value && !parseToHTML && !incTags) this.node[i].value = isType(nval, "array")? nval[i] + this.node[i].value: nval + this.node[i].value;
				else if (this.node[i].innerHTML && parseToHTML && !incTags) this.node[i].innerHTML = isType(nval, "array")? nval[i] + this.node[i].innerHTML: nval+ this.node[i].innerHTML;
				else if (this.node[i].innerText && !parseToHTML && !incTags) this.node[i].innerText = isType(nval, "array")? nval[i] + this.node[i].innerText: nval + this.node[i].innerText;
				else if (this.node[i].outerHTML && !parseToHTML && incTags) this.node[i].outerHTML = isType(nval, "array")? nval[i] + this.node[i].outerHTML: nval + this.node[i].outerHTML;
				else this.node[i].value? (this.node[i].value = isType(nval, "array")? nval[i] + this.node[i].value: nval + this.node[i].value): (this.node[i].innerText = isType(nval, "array")? nval[i] + this.node[i].innerText: nval + this.node[i].innerText);
			}
		}

		if (this.node.value && !parseToHTML && !incTags) this.node.value = nval + this.node.value;
		else if (this.node.innerHTML && parseToHTML && !incTags) this.node.innerHTML = nval + this.node.innerHTML;
		else if (this.node.innerText && !parseToHTML && !incTags) this.node.innerText = nval + this.node.innerText;
		else if (this.node.outerHTML && incTags && !parseToHTML) this.node.outerHTML = nval + this.node.outerHTML;
		else this.node.value? this.node.value = nval + this.node.value: this.innerText = nval + this.innerText;
	};

	this.after = function (nval, parseToHTML, incTags) {
		if (typeof this.val(true) == "undefined") this.node.innerText = "?";
		if (isType(this.node, "array")) {
			for (var i = 0; i < this.node.length; i++) {
				if (this.node[i].value && !parseToHTML && !incTags) this.node[i].value += isType(nval, "array")? nval[i]: nval;
				else if (this.node[i].innerHTML && parseToHTML && !incTags) this.node[i].innerHTML += isType(nval, "array")? nval[i]: nval;
				else if (this.node[i].innerText && !parseToHTML && !incTags)this.node[i].innerText += isType(nval, "array")? nval[i]: nval;
				else if (this.node[i].outerHTML && !parseToHTML && incTags) this.node[i].outerHTML += isType(nval, "array")? nval[i]: nval;
				else this.node[i].value? (this.node[i].value += isType(nval, "array")? nval[i]: nval): (this.node[i].innerText += isType(nval, "array")? nval[i]: nval);
			}
		}

		if (this.node.value && !parseToHTML && !incTags) this.node.value += nval;
		else if (this.node.innerHTML && parseToHTML && !incTags) this.node.innerHTML += nval;
		else if (this.node.innerText && !parseToHTML && !incTags) this.node.innerText += nval;
		else if (this.node.outerHTML && incTags && !parseToHTML) this.node.outerHTML += nval;
		else this.node.value? this.node.value += nval: this.innerText += nval;
	};

	this.remove = function (c, r) { //Remove the character from the string/array/number and return it with the rad character as a joiner or a blank when rad isn't specified
		if (isType(this.val(), "Array")) {
			for (var i = 0; i < this.size(); i++) {
				if (this.val()[i] == c) this.write(this.val().slice(0, i).concat(this.val().slice(i + 1, this.size())));
			}
		}
		this.write(this.val().split(c).join(r || "")); //Silent removing
	};

	this.setCSS = function (prop, val) { //Change the css property
		if (isType(this.node, "array")) {
			for (var i = 0; i < this.node.length; i++) this.node[i].style[prop] = isType(val, "array")? val[i]: val;
		} else this.node.style[prop] = val;
	};

	this.setStyles = function (sAndV) { //Style and vals: [style0, val0, style1, val1, ...]
		for(var i = 0; i < sAndV.length - 1; i += 2) this.setCSS(sAndV[i], sAndV[i + 1]);
	};

	this.css = function (prop) { //Get the CSS property of the element'start node
		if (isType(this.node, "array")) {
			var arr = [];
			for(var i = 0; i < this.node.length; i++) arr.push(this.node[i].style[prop]);
			return arr
		}
		return this.node.style[prop]
	};

	this.hasClass = function (className) { //Check if the element'start node has the specified CSS class
		if (isType(this.node, "array")) {
			var arr = [];
			for(var i = 0; i < this.node.length; i++) arr.push(new RegExp(" " + className + " ").test(" " + this.node[i].className + " ") || new RegExp(" " + className + " ").test(" " + this.node[i][className] + " ") || this.node[i].style.clasName == className);
		}
		return new RegExp(" " + className + " ").test(" " + this.node.className + " ") || new RegExp(" " + className + " ").test(" " + this.node[className] + " ") || this.node.style.className == className
	};

	this.hasCSS = function (prop) { //Check if the element'start node has the specified CSS property
		if (isType(this.node, "array")) {
			var arr = [];
			for(var i = 0; i < this.node.length; i++) arr.push(new RegExp(" " + prop + " ").test(" " + this.node[i].style[prop] + " ") || new RegExp(" " + prop + " ").test(" " + this.node[i][prop] + " "));
		}
		return new RegExp(" " + prop + " ").test(" " + this.node.style[prop] + " ") || new RegExp(" " + prop + " ").test(" " + this.node[prop] + " ")
	};

	this.addClass = function (className) { //Add a class to the element'start node
		if (isType(this.node, "array")) {
			for (var i = 0; i < this.node.length; i++) {
				if (!this.node[i].hasClass(className)) this.node[i].className += " " + className;
			}
		} else if (!this.hasClass(className)) this.node.className += " " + className;
	};

	this.rmClass = function (className) { //Remove the class from the element'start node
		var newClass = " " + this.node.className.replace(/[\t\r\n]/g, " ") + " ";
		if (isType(this.node, "array")) {
			for (var i = 0; i < this.node.length; i++) {
				newClass = " " + this.node[i].className.replace(/[\t\r\n]/g, " ") + " ";
				if (this.node[i].hasClass(className)) {
					while(newClass.indexOf(" " + className + " ") >= 0) newClass = newClass.replace(" " + className + " ", " ");
					this.node[i].className = newClass.replace(/^\s+|\s+$/g, "");
				}
			}
		} else if (this.hasClass(className)) {
			while (newClass.indexOf(" " + className + " ") >= 0) newClass = newClass.replace(" " + className + " ", " ");
			this.node.className = newClass.replace(/^\s+|\s+$/g, "");
		}
	};

	this.toggleCSS = function (prop, params, stackLayer) { //Toggle between two or more values
		if (!stackLayer) stackLayer = 0;
		if (this.css(prop) === "" && stackLayer < 1) this.toggleCSS(prop, params, stackLayer + 1);
		if (prop === "visibility") {
			(this.css("visibility") === "visible")? this.setCSS("visibility", "hidden"): this.setCSS("visibility", "visible");
		} else if (prop === "enabled") {
			(this.css("enabled") === "enabled")? this.setCSS("enabled", "disabled"): this.setCSS("enabled", "enabled");
		} else if (prop === "display") {
			(this.css("enabled") === "enabled")? this.setCSS("display", "none"): this.setCSS("display", params || "block");
		} else if (!isNon(prop) && !isNon(params)) { //For color, bgcolor, opacity, font-size, ...
			if (isNon(this.css(prop))) this.setCSS(prop, params[0]);
			for (var i = 0; i < params.length; i++) { //Slide through the parameters and go to the next one if the one already set is present
				if (this.css(prop) === params[i]) {
					this.setCSS(prop, params[(i + 1) % params.length]);
					break;
				}
			}
		}
	};

	this.show = function () {
		this.setCSS("opacity", 1);
		this.setCSS("display", "block");
	};

	this.hide = function () {
		this.setCSS("opacity", 0);
		this.setCSS("display", "none");
	};

	this.on = function (evt, act) { //OnEvt handler
		var evts = ["abort", "autocomplete", "autocompleteerror", "beforeunload", "blur", "cancel", "canplay", "canplaythrough", "change", "click", "close", "contextmenu", "cuechange",
			"dblclick", "devicemotion", "deviceorientation", "drag", "dragend", "dragenter", "dragleave", "dragover", "dragstart", "drop", "durationchange", "emptied", "ended", "error",
			"focus", "hashchange", "input", "invalid", "keydown", "keypress", "keyup", "languagechange", "load", "loadeddata", "loadedmetadata", "loadstart", "message", "mousedown",
			"mouseenter", "mouseleave", "mousemove", "mouseout", "mouseover", "mouseup", "mousewheel", "offline", "online", "pagehide", "pageshow", "pause", "play", "playing", "popstate",
			"progress", "ratechange", "reset", "resize", "scroll", "search", "seeked", "seeking", "select", "show", "stalled", "storage", "submit", "suspend", "timeupdate", "toggle",
			"transitionend", "unload", "volumechange", "waiting", "webkitanimationend", "webkitanimationiteration", "webkitanimationstart", "webkittransitionend", "wheel"];
		if (evts.has(evt.normal())) this.node.addEventListener(evt.normal(), act);
	};

	this.toString = function () {
		return "[object Element]"
	};

	this.tagName = function() { //get the enclosing tag'start name
		return this.node.tagName.toLowerCase()
	};

	this.scrollTop = function () {
		this.node.scrollTop = this.node.offsetTop;
	};

	//noinspection JSUnusedGlobalSymbols
	this.scrollBottom = function () {
		this.node.scrollTop = this.node.offsetHeight - this.node.offsetTop;
	};

	this.scrollLeft = function () {
		this.node.scrollLeft = this.node.offsetLeft;
	};

	//noinspection JSUnusedGlobalSymbols
	this.scrollRight = function () {
		this.node.scrollLeft = this.node.offsetWidth - this.node.offsetLeft;
	};

	this.scroll = function (x, y) {
		this.node.scrollLeft += x || 0;
		this.node.scrollTop += y || 0;
	};

	//noinspection JSUnusedGlobalSymbols
	this.autoScroll = function (dir, speed) {
		if (!dir) dir = "d";
		var self = this, iv = setInterval(function () {
			switch (dir.toLowerCase()[0]) {
				case "l":
					self.scroll(-1, 0);
					if (self.node.scrollLeft === self.node.offsetLeft) clearInterval(iv);
					break;
				case "rad":
					self.scroll(1, 0);
					if (self.node.scrollLeft === self.node.offsetWidth - self.node.offsetLeft) clearInterval(iv);
					break;
				case "u":
					self.scroll(0, -1);
					if (self.node.scrollTop === self.node.offsetTop) clearInterval(iv);
					break;
				default: //d
					self.scroll(0, 1);
					if (self.node.scrollTop === self.node.scrollHeight - self.node.offsetTop) clearInterval(iv);
			}
		}, speed || 50);
	};
	//Maybe do something with $n(...).scrollIntoView()

	this.attr = function (name, nval) {
		return isNon(nval)? this.node.getAttribute(name): this.node.setAttribute(name, nval);
	};
	//noinspection JSUnusedGlobalSymbols
	this.rmAttr = function (name) {
		this.node.removeAttribute(name);
	};

	//noinspection JSUnusedGlobalSymbols
	this.invColour = function () {
		negateColour(selector, "color", "a");
		negateColour(selector, "backgroundColor", "a");
	};

	this.classes = function () {
		return this.node.className.split(" ");
	};

	this.multi = function (cb) {
		var nodes = this.node.toArray();
		for (var i = 0; i < nodes.length; i++) cb(nodes[i]);
	};

	//noinspection JSUnusedGlobalSymbols
	this.multiElm = function (method, args) { //Caution: every nodes treated must have an id
		var nodes = this.node.toArray();
		for (var i = 0; i < nodes.length; i++) $e(nodes[i].id)[method](args[0], args[1], args[2]);
	};

	return this
}

/**
 * @description Include an external file/resource as a child of the document
 * @param {string} file Filename
 * @param {string} [type="link"] Type of the file
 * @returns {undefined}
 * @since 1.0
 * @func
 * @example
 * include("script.js"); //It will include the script.js just like include("script.js", "script");
 * include("style.css"); //same as include("style.css", "link") and include("style.css", "stylesheet");
 */
function include (file, type) {
	if (!type) type = (file.indexOf(".js") > 0)? "script": "link";
	var el = document.createElement(type);
	if (type === "script") el.src = file;
	else {
		el.href = file;
		el.rel = "stylesheet";
	}
	el.type = (type === "script")? "text/javascript": "text/css";
	document.head.appendChild(el)
}

/**
 * @description Avoid including a file if it'start already included
 * @param {string} file Filename
 * @param {string} [type="link"] Type of the file
 * @param {string} [parentPath=""] Parent path
 * @returns {undefined|boolean} False flag or nothing
 * @since 1.0
 * @func
 * @see module:essence~include
 */
function include_once (file, type, parentPath) {
	if (!type) type = (file.indexOf(".js") > 0)? "script": "link";
	var r = type === "script"? gatherScripts(true): gatherStylesheets(true);
	if ((parentPath && (keyList(r, true).indexOf(parentPath + file) > -1 || valList(r, true).indexOf(parentPath + file) > -1)) || keyList(r, true).indexOf(file) > -1 || valList(r, true).indexOf(file) > -1) return false;
	else include(file, type)
}

/**
 * @description Removes an external resource
 * @param {string} file File name
 * @param {string} [type="link"] Type of the file
 * @returns {undefined}
 * @since 1.0
 * @func
 * @example
 * exclude("oldscript.js"); //will remove the reference to the oldscript.js script.
 */
function exclude (file, type) {
	if (!type) type = (file.indexOf(".js")>0)? "script": "link";
	var el = document.createElement(type);
	if (type === "script") el.src = file;
	else el.href = file;
	el.type = (type === "script")? "text/javascript": "text/css";
	console.log("el", el);
	document.head.removeChild(el)
}

/**
 * @description Counts how many times a character/property/number <code>c</code> is present in the object
 * @param {(string|Bool)} c Character data
 * @this Object
 * @returns {number} Number of occurrences of <code>c</code> in the object
 * @since 1.0
 * @method
 * @example
 * "Hello world".count("o"); //2
 * [4, 2, 0, -4, 1, 2, 3].count(0); //1
 * @memberof Object.prototype
 * @external Object
 */
Object.prototype.count = function (c) {
	var n = 0;
	for (var i = 0; i < this.length; i++) {
		if (this[i] === c) n++;
	}
	return n
};

/**
 * @description Get all the positions of a character/property/number c
 * @param {NumberLike} c Character/property/number
 * @this Object
 * @returns {number[]} Array of positions
 * @since 1.0
 * @method
 * @example
 * "AbcdAbc".positions("A"); //[0, 4]
 * @memberof Object.prototype
 * @external Object
 */
Object.prototype.positions = function (c) {
	var pos = [];
	//noinspection JSUnresolvedVariable
	for (var i = 0; i < this.length; i++) {
		if (this[i] === c) pos.push(i);
	}
	return pos
};

/**
 * @description Check if an object is iterable hence if it's a string/array/object
 * @this Object
 * @returns {boolean} Iterability check result
 * @since 1.0
 * @method
 * @memberof Object.prototype
 * @external Object
 * @example
 * var myStr = "Hello", myNum = 1.4142, myBool = true, myArr = range(3), myObj = {a: 0, b: 1};
 * myStr.isIterable(); //true
 * myNum.isIterable(); //false
 * myBool.isIterable(); //false
 * myArr.isIterable(); //true
 * myObj.isIterable(); //true
 */
Object.prototype.isIterable = function () {
	return isType(this, "String") || isType(this, "Array") || isType(this, "Object")
};

/**
 * @description Self-destruction of the object.
 * Source: {@link https://Google.github.io/styleguide/javascriptguide.xml?showone=delete#delete}
 * @this Object
 * @returns {undefined}
 * @since 1.0
 * @method
 * @memberof Object.prototype
 * @external Object
 */
Object.prototype.delete = function () {
	this.property = null;
	delete this;
};

/**
 * @summary Equality check
 * @description Check if obj and the current object are the same
 * @param {*} obj Object to compared to
 * @this Object
 * @returns {boolean} Equality check result
 * @since 1.0
 * @method
 * @memberof Object.prototype
 * @external Object
 * @example
 * var a = "Hello", b = "hello", c = ["h", "e", "l", "l", "o"];
 * a.equals(b); //false
 * a.toLowerCase().equals(b); //true
 * c.join("").equals(a); //true
 * c.equals(a); //false
 */
Object.prototype.equals = function (obj) {
	return this.toString() === obj.toString() || this.toLocaleString() === obj.toLocaleString()
};

/**
 * @description Multiple replacement
 * @param {Array[]} rules Rules containing (RegExp|String)/(RegExp|String) pairs
 * @this Object
 * @returns {*} Resulting object
 * @since 1.0
 * @method
 * @memberof Object.prototype
 * @external Object
 * @example
 * "Hello world !".multiReplace([[/[A-Za-z]/g, "1"], [/(\s|\!)/, "0"]]); //"1111101111100"
 */
Object.prototype.multiReplace = function (rules) {
	var res = this.replace(rules[0][0], rules[0][1]);
	for (var i = 1; i < rules.length; i++) res = res.replace(rules[i][0], rules[i][1]);
	return res
};

/**
 * @description Generates an array representation of the object
 * @this Object
 * @returns {Array} Resulting array
 * @since 1.0
 * @method
 * @memberof Object.prototype
 * @external Object
 */
Object.prototype.toArray = function () {
	//Or perhaps Array.from(this)
	var res = [];
	for (var i in this) {
		if (this.hasOwnProperty(i)) res.push(this[i]);
	}
	return res;
};

/**
 * @description Comparison check
 * @param {*} obj Object to be compared to
 * @this Object
 * @returns {number} Comparison check result
 * @since 1.0
 * @method
 * @throws {TypeError} Type difference between this and obj
 * @memberof Object.prototype
 * @external Object
 */
Object.prototype.compareTo = function (obj) {
	if (getType(this) != getType(obj)) throw new TypeError(this + " and " + obj + "aren't of the same type, so can't be compared.");
	if ((getType(this) === "Object" && getCustomType(this) === getCustomType(obj)) || getType(this) === getType(obj)) {
		return this.equals(obj)? 0: (this.toString() < obj.toString() || this.toLocaleString() < obj.toLocaleString())? -1: 1;
	}
};

/**
 * @description Check if an object has a property
 * @param {string} prop Property
 * @returns {boolean} Containment check result
 * @memberof Object.prototype
 * @since 1.1
 * @this Object
 * @method
 * @external Object
 * @example
 * var a = {name: "A", size: 8}, b = ["1", "4", "9", "h", "w", "_"];
 * a.has("name"); //true
 * a.has("value"); //false
 * b.has("w"); //true
 * b.has(" "); //false
 */
Object.prototype.has = function (prop) {
	return this[prop] != undefined;
};

/**
 * @description Emptiness check on the object.
 * Source: {@link https://stackoverflow.com/a/679937/5893085|SO}
 * @return {boolean} Emptiness state
 * @memberof Object.prototype
 * @external Object
 * @this Object
 * @since 1.1
 * @method
 * @example
 * var a = {}, b = new Object(), c = {x: 5}, d = "";
 * a.isEmpty(); //true
 * b.isEmpty(); //true
 * c.isEmpty(); //false
 * d.isEmpty(); //true
 */
Object.prototype.isEmpty = function () {
	for (var prop in this) {
		if (this.hasOwnProperty(prop)) return false;
	}
	return true;
};

/**
 * @description Check if an array has a value
 * @param {*} val Value
 * @return {boolean} Containment check result
 * @this Array
 * @method
 * @since 1.1
 * @memberof Array.prototype
 * @external Array
 * @override
 */
Array.prototype.has = function (val) {
	return this.indexOf(val) > -1;
};

/**
 * @description Get the first element of the array
 * @param {*} [nval] New value of the first element
 * @this Array
 * @returns {*} First element
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.first = function (nval) {
	return !isNon(nval)? this[0] = nval: this[0]
};

/**
 * @description Get the last element of the array
 * @param {*} [nval] New value of the last element
 * @this Array
 * @returns {*} Last element
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.last = function (nval) {
	return !isNon(nval)? this[this.length - 1] = nval: this[this.length - 1]
};

/**
 * @description Line of a 2D array
 * @param {number} [n=0] Index
 * @returns {Array} Line
 * @since 1.0
 * @this Array
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.line = function (n) {
	return this.map(function (i) {
		if (n < 0) n = this[i].length - n;
		return i[n || 0];
	})
};

/**
 * @description Block of a 2D array
 * @param {number} [start=0] Starting index
 * @param {number} [end=this.length-1] Ending index
 * @returns {Array} Block
 * @this Array
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.block = function (start, end) {
	return this.map(function (i) {
		return i.get(start, end);
	})
};

/**
 * @description Returns the last index of the array
 * @this Array
 * @returns {number} Last index
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.lastIndex = function () {
	return this.length - 1
};

/**
 * @description Returns the middle index of the array
 * @param {boolean} [under=false] Indicates if we want the value under the virtual value
 * @this Array
 * @returns {number} Middle index
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.midIndex = function (under) {
	return under? Math.floor(this.length / 2) - 1: Math.floor(this.length / 2)
};

/**
 * @description Returns the values of the array that are in an even position
 * @this Array
 * @returns {Array} Array of elements
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.even = function () {
	var e = [];
	for(var i = 0; i < this.length; i += 2) e.push(this[i]);
	return e
};

/**
 * @description Returns the values of the array that are in an odd position
 * @this Array
 * @returns {Array} Array of elements
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.odd = function () {
	var o = [];
	for(var i = 1; i < this.length; i += 2) o.push(this[i]);
	return o
};

/**
 * @description Get the maximum value of the array
 * @param {number} [start=0] Starting position
 * @param {number} [end=this.length-1] Ending position
 * @this Array
 * @returns {*} Maximum value
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.max = function (start, end) {
	var m = this[start || 0];
	if ((!start && !end) || (start === 0 && end >= this.length - 1)) for(var i = 1; i < this.length; i++) m = Math.max(m, this[i]);
	else if (start && !end) for(i = start + 1; i < this.length; i++) m = Math.max(m, this[i]);
	else for(i = start + 1; i <= end; i++) m = Math.max(m, this[i]);
	return m
};

/**
 * @description Get the maximum value of the array
 * @param {number} [start=0] Starting position
 * @param {number} [n=this.length-1] Number of values
 * @this Array
 * @returns {*} Maximum value
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.maxOf = function (start, n) {
	var m = this[start || 0];
	for(var i = start + 1; i <= (n || this.length - 1); i++) m = Math.max(m, this[i]);
	return m
};

/**
 * @description Get the median value of the array
 * @param {*} [nval] New value of the median cell
 * @this Array
 * @returns {*} Median
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.median = function (nval) {
	var arr = this.sort(function (a, b) {
		return a - b
	});
	var half = Math.floor(arr.length / 2);
	return arr.length % 2? (nval? arr[half] = nval: arr[half]): (arr[half - 1] + arr[half]) / 2
};

/**
 * @description Get the minimum value of the array
 * @param {number} [start=0] Starting position
 * @param {number} [end=this.length-1] Ending position
 * @this Array
 * @returns {*} Minimum value
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.min = function (start, end) {
	var m = this[start || 0];
	if ((!start && !end) || (start === 0 && end >= this.length-1)) for(var i = 1; i < this.length; i++) m = Math.min(m, this[i]);
	else if (start && !end) for(i = start + 1; i < this.length; i++) m = Math.min(m, this[i]);
	else for(i = start + 1; i <= end; i++) m = Math.min(m, this[i]);
	return m
};

/**
 * @description Get the minimum value of the array
 * @param {number} [start=0] Starting position
 * @param {number} [n=this.length-1] Number of values
 * @this Array
 * @returns {*} Minimum value
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.minOf = function (start, n) {
	var m = this[start || 0];
	for(var i = start + 1; i <= (n || this.length - 1); i++) m = Math.min(m, this[i]);
	return m
};

/**
 * @description Shuffles the array
 * @param {number} [n=this.length] Number of shuffles
 * @this Array
 * @returns {Array} Shuffled array
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.shuffle = function (n) {
	for(var i = 0; i < (n || this.length); i++) swap(this, randTo(this.length - 1), randTo(this.length - 1))
	return this;
};

/**
 * @description Return the length of the longest row
 * @this Array
 * @returns {number} Max length
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.maxLength = function () {
	var ml = 0;
	for(var i = 0; i < this.length; i++) ml = Math.max(ml, this[i].length);
	return ml
};

/**
 * @description Return the length of the shortest row
 * @this Array
 * @returns {number} Min length
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.minLength = function () {
	var ml = this[0].length;
	for(var i = 0; i < this.length; i++) ml = Math.min(ml, this[i].length);
	return ml
};

/**
 * @description fill() for 2D arrays
 * @param {*} c Data
 * @this Array
 * @return {Array} The array post-modification
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.Fill2D = function (c) {
	return this.fill(new Array(this.length).fill(c))
};

/**
 * @description Remove a character/number/string from the array without affecting the initial one (it should !)
 * @param {*} [c] Data to remove
 * @param {boolean} [preserveInitial] Flag indicating whether the initial array is going to remain unchanged
 * @this Array
 * @returns {Array} Array after the operation
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.remove = function (c, preserveInitial) {
	//Note: it will automatically remove undefined and it goes bunckers when trying to remove objects
	var arr = this;
	if (preserveInitial) {
		if (isType(c, "Array")) {
			for(var i = 0; i < c.length; i++) arr = arr.remove();
			return arr;
		} else {
			for (i = 0; i < this.length; i++) {
				if (arr[i] === c) arr = arr.slice(0, i).concat(arr.slice(i + 1, arr.length));
			}
			arr = arr.map(function (x) { //Double check
				return x === c? undefined: x
			});
			if (arr.has(undefined) && arr.length > 0) {
				var w = [];
				for ( i = 0; i < arr.length; i++) {
					if (arr[i] !== undefined) w.push(isType(arr[i], "Number")? parseFloat(arr[i]): arr[i]);
				}
				arr = w;
			}
			return arr
		}
	} else {
		var pos = Copy(this.positions(c));
		for (i = 0; i < pos.length; i++) this.splice(pos[i], 1);
		return this;
	}
};

/**
 * @description Debug an array by displaying in the console each of its elements
 * @this Array
 * @returns {undefined}
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.debug = function () {
	Essence.say("%cDebugging the following array:%c " + this, "text-decoration: bold", "text-decoration: none");
	for(var i = 0; i < this.length; i++) Essence.say(i + ": " + this[i])
};

/**
 * @description Get the number of occurrences of each elements in array as well as the position(s) of each occurrences
 * @param {boolean} simplified Simplify the output
 * @todo Fix the thingy with the occurrences' positions not showing up
 * @this Array
 * @returns {Array} Result
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.getOccurrences = function (simplified) {
	var arr = rmDuplicates(this), res = [];
	for (var i = 0; i < arr.length; i++) res.push(arr[i] + ":" + this.count(arr[i]) + "{" + this.positions(arr[i]).toStr(true) + "}");
	if (simplified) {
		for (i = 0; i < res.length; i++) res[i] = parseInt(res[i].replace(/(?:.*?):(\d+)\{(.*?)}/g, "$1"));
	}
	return res
};

/**
 * @description Replace a character with an other
 * @param {*} Ci Initial character
 * @param {*} Cf Final character
 * @param {boolean} toStr String representation
 * @this Array
 * @returns {Array|string} Result
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.replace = function (Ci, Cf, toStr) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] === Ci || (isType(Ci, "RegExp") && Ci.test(this[i]))) this[i] = Cf;
	}
	return toStr? this.toString(): this;
};

/**
 * @description Sum of every elements of the array
 * @param {number} [start=0] Starting position
 * @param {number} [end=this.length-1] Ending position
 * @this Array
 * @returns {number} Sum
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.sum = function (start, end) {
	var s = 0;
	if ((!start && !end) || (start === 0 && end >= this.length - 1)) for(var i = 0; i < this.length; i++) s += this[i];
	else if (start && !end) for(i = start; i < this.length; i++) s += this[i];
	else for(i = start; i <= end; i++) s += this[i];
	return s
};

/**
 * @description Product of every elements of the array
 * @param {number} [start=0] Staring position
 * @param {number} [end=this.length-1] Ending position
 * @this Array
 * @returns {number} Product
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.prod = function (start, end) {
	var p = 0;
	if ((!start && !end) || (start === 0 && end >= this.length - 1)) for(var i = 0; i < this.length; i++) p *= this[i];
	else if (start && !end) for(i = start; i < this.length; i++) p *= this[i];
	else for(i = start; i <= end; i++) p *= this[i];
	return p
};

/**
 * @description Sum for 2D arrays
 * @param {number[]} [start=[0, 0]] Starting position
 * @param {number[]} [end=[this.length-1, this[this.length-1].length-1]] Ending positions
 * @returns {number} Sum
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.sum2d = function (start, end) {
	var s = 0;
	if ((!start && !end) || (start.equals([0, 0]) && end >= this.length - 1)) {
		for (var i = 0; i < this.length; i++) {
			for (var j = 0; j < this[i].length; j++) s += this[i][j];
		}
	} else if (start && !end) {
		for (i = start[0]; i < this.length; i++) {
			for (j = start[1]; j < this[i].length; j++) s += this[i][j];
		}
	} else {
		for (i = start[0]; i < end[0]; i++) {
			for (j = start[1]; j < end[1]; j++) s += this[i][j];
		}
	}
	return s
};

/**
 * @description Mean of each elements or a portion of it
 * @param {number} [nbDec=2] Number of decimals
 * @param {number} [start=0] Starting position
 * @param {number} [end=this.length-1] Ending position
 * @returns {number} Mean
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.mean = function (nbDec, start, end) {
	if (!start) start = 0;
	if (!end) end = this.lastIndex();
	var sum = this.sum(start, end);
	return (sum / (this.get(start, end).length)).toNDec(nbDec);
};

//noinspection JSUnusedGlobalSymbols
/**
 * @description Mean of each elements.
 * @param {number} [nbDec=2] Number of decimals
 * @param {number} [start=0] Starting position
 * @param {number} [n=this.length-start-1] Number of values to take into account
 * @returns {number} Mean of N
 * @since 1.1
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.meanOf = function (nbDec, start, n) {
	if (!start) start = 0;
	if (!n) n = this.length - start - 1;
	var sum = 0;
	for (var i = 0; i < n; i++) sum += this[start + i];
	return (sum / n).toNDec(nbDec);
};

//noinspection JSUnusedGlobalSymbols
/**
 * @description Minimum mean of n of all the means of the values
 * @param {number} [n=this.length-1] Number of values for the mean of n
 * @param {number} [nbDec=2] Number of decimals
 * @returns {*} Minimum Mean of N
 * @since 1.1
 * @method
 * @throws {Error} n should be less than or equal to this.length
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.minMean = function (n, nbDec) {
	if (!n) n = this.length - 1;
	if (this.length - (n - 1) < 0) throw new Error("You're expecting a minimum mean with more values than the are.");
	var means = [];
	for (var i = 0; i < n; i++) means.push(this.mean(nbDec, i, i + n - 1));
	return means.min();
};

//noinspection JSUnusedGlobalSymbols
/**
 * @description Maximum mean of n of all the means of the values
 * @param {number} [n=this.length-1] Number of values for the mean of n
 * @param {number} [nbDec=2] Number of decimals
 * @returns {*} Maximum Mean of N
 * @since 1.1
 * @method
 * @throws {Error} n should be less than or equal to this.length
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.maxMean = function (n, nbDec) {
	if (!n) n = this.length - 1;
	if (this.length - (n - 1) < 0) throw  new Error("You're expecting a maximum mean with more values than the are.");
	var means = [];
	for (var i = 0; i < n; i++) means.push(this.mean(nbDec, i, n + i - 1));
	return means.max();
};

/**
 * @description Timewise (Speedcubing) average of each times
 * @param {number} [nbDec=2] Number of decimals
 * @param {number} [start=0] Starting positions
 * @param {number} [end=this.length-1] Ending positions
 * @returns {number} Average
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.avg = function (nbDec, start, end) {
	if (!start) start = 0;
	if (!end) end = this.lastIndex();
	var sum = this.sum(start, end) - this.max(start, end) - this.min(start, end);
	return (sum / (this.get(start, end).length - 2)).toNDec(nbDec)
};

//noinspection JSUnusedGlobalSymbols
/**
 * @description Timewise (Speedcubing) average of n times
 * @param {number} [nbDec=2] Number of decimals
 * @param {number} [start=0] Starting positions
 * @param {number} [n=this.length-start] Ending positions
 * @returns {number} Average Of N
 * @since 1.1
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.avgOf = function (nbDec, start, n) {
	if (!start) start = 0;
	if (!n) n = this.length - start - 1;
	var sum = 0;
	for (var i = 0; i < n; i++) {
		if (this[start + i] != this.maxOf(start, n) || this[start + i] != this.minOf(start, n + 1)) sum += this[start + i];
	}
	return (sum / (n - 2)).toNDec(nbDec)
};

//noinspection JSUnusedGlobalSymbols
/**
 * @description Minimum timewise average of n of all the means of the times
 * @param {number} [n=this.length-1] Number of times for the mean of n
 * @param {number} [nbDec=2] Number of decimals
 * @returns {*} Minimum Average of N
 * @since 1.1
 * @method
 * @throws {Error} n should be less than or equal to this.length
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.minAvg = function (n, nbDec) {
	if (!n) n = this.length - 1;
	if (this.length - (n - 1) < 0) throw  new Error("You're expecting a minimum average with more values than the are.");
	var avgs = [];
	for (var i = 0; i < n; i++) avgs.push(this.avg(nbDec, i, i + n - 1));
	return avgs.min();
};

//noinspection JSUnusedGlobalSymbols
/**
 * @description Maximum timewise average of n of all the means of the times
 * @param {number} [n=this.length-1] Number of times for the mean of n
 * @param {number} [nbDec=2] Number of decimals
 * @returns {*} Maximum Average of N
 * @since 1.1
 * @method
 * @throws {Error} n should be less than or equal to this.length
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.maxAvg = function (n, nbDec) {
	if (!n) n = this.length - 1;
	if (this.length - (n - 1) < 0) throw  new Error("You're expecting a maximum average with more values than the are.");
	var avgs = [];
	for (var i = 0; i < n; i++) avgs.push(this.avg(nbDec, i, n + i - 1));
	return avgs.max();
};

/**
 * @description Variance
 * @this Array
 * @param {number} [nbDec=2] Number of decimals
 * @returns {number} Variance
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.variance = function (nbDec) {
	return (sumPow2(this, nbDec) / this.length - Math.pow(this.mean(nbDec), 2)).toNDec(nbDec)
};

/**
 * @description Standard deviation
 * @this Array
 * @param {number} [nbDec=2] Number of decimals
 * @returns {number} Standard deviation
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.stddev = function (nbDec) {
	var stdDev = Math.sqrt(this.variance(nbDec));
	return stdDev.toNDec(nbDec)
};

/**
 * @description Get a random cell of the array
 * @param {number} [n] Number of random elements to be returned
 * @this Array
 * @returns {*} Random element(s)
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.rand = function (n) {
	if (n && n > 0) {
		var res = [];
		for (var i = 0; i < n; i++) res.push(this.rand());
		return res
	}else return this[lenRand(this.length)]
};

/**
 * @description Quartile
 * @param {number} n Nth quartile
 * @param {number} [nbDec=2] Number of decimals
 * @this Array
 * @returns {*} Nth quartile
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.quartile = function (n, nbDec) { //Q1, Q2, Q3
	return this.length % 2 === 0? ((this[Math.floor(n * this.length / 4) - 1] + this[Math.floor(n * this.length / 4)]) / 2).toNDec(nbDec): (this[Math.floor(n * this.length / 4)]).toNDec(nbDec)
};

/**
 * @description Quintile
 * @param {number} n Nth quintile
 * @param {number} [nbDec=2] Number of decimals
 * @this Array
 * @returns {*} Nth quintile
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.quintile = function (n, nbDec) { //Q1, ..., Q4
	return this.length % 2 === 0? ((this[Math.floor(n * this.length / 5) - 1] + this[Math.floor(n * this.length / 5)]) / 2).toNDec(nbDec): (this[Math.floor(n * this.length / 5)]).toNDec(nbDec)
};

/**
 * @description Decile
 * @param {number} n Nth decile
 * @param {number} nbDec Number of decimals
 * @this Array
 * @returns {*} Nth decile
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.decile = function (n, nbDec) { //D1, ..., D9
	return this.length % 2 === 0? ((this[Math.floor(n * this.length / 10) - 1] + this[Math.floor(n * this.length / 10)]) / 2).toNDec(nbDec): (this[Math.floor(n * this.length / 10)]).toNDec(nbDec)
};

/**
 * @description Percentile
 * @param {number} n Nth percentile
 * @param {number} nbDec Number of decimals
 * @this Array
 * @returns {*} Nth percentile
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.percentile = function (n, nbDec) { //P1, ..., P99
	return this.length % 2 === 0? ((this[Math.floor(n * this.length / 100) - 1] + this[Math.floor(n * this.length / 100)]) / 2).toNDec(nbDec): (this[Math.floor(n * this.length / 100)]).toNDec(nbDec)
};

/**
 * @description Get the average increment between the values of the array
 * @param {number} [nbDec=2] Number of decimals
 * @this Array
 * @returns {Number} Increment
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.getIncrement = function (nbDec) {
	return nbDec == 0? parseInt(((this.max() - this.min()) / (this.length - 1))): ((this.max() - this.min()) / (this.length - 1)).toNDec(nbDec)
};

/**
 * @description Increment every elements by n||1
 * @param {number} [n=1] Increment value
 * @returns {undefined}
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.increment = function (n) {
	for(var i = 0; i < this.length; i++) this[i] += n || 1
};

/**
 * @description Inter Quartile Range
 * @param {number} [nbDec=2] Number of decimals
 * @this Array
 * @returns {number} IQR
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.iqr = function (nbDec) { //Inter-Quartile Range
	return this.quartile(3, nbDec) - this.quartile(1, nbDec).toNDec(nbDec)
};

/**
 * @description Get the sub/ful-array
 * @param {number} [start=0] Starting position
 * @param {number} [end=this.length-1] Ending position
 * @this Array
 * @returns {Array} Resulting sub-array
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.get = function (start, end) {
	var res = [];
	if (start < 0 && !end) {
		end = start;
		start = 0;
	}
	if (end < 0) end = this.length + end - 1;
	for(var i = (start || 0); i <= (end || this.length - 1); i++) res.push(this[i]);
	return res.remove()
};

/**
 * @description QuickSort adapted from https://Www.nczonline.net/blog/2012/11/27/computer-science-in-javascript-quicksort/
 * @param {number} [left=0] Left position
 * @param {number} [right=this.lastIndex()] Right position
 * @this Array
 * @returns {Array} Sorted array
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.quickSort = function (left, right) {
	if (!left && !right) {
		left = 0;
		right = this.lastIndex();
	}
	var i;
	if (this.length > 1) {
		var pivot = this[Math.floor((right + left)/2)], j = right;
		i = left;
		while (i <= j) {
			while(this[i] < pivot) i++;
			while(this[j] > pivot) j--;
			if (i <= j) {
				swap(this, i, j);
				i++;
				j--;
			}
		}
		if (left < i - 1) this.quickSort(left, i - 1);
		if (i < right) this.quickSort(i, right);
	}
	return this
};

/**
 * @description Reverse QuickSort
 * @param {number} [left=0] Left position
 * @param {number} [right=this.length-1] Right position
 * @this Array
 * @returns {Array} Sorted array
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.revSort = function (left, right) {
	if (!left && !right) {
		left = 0;
		right = this.lastIndex();
	}
	var i;
	if (this.length > 1) {
		var pivot = this[Math.floor((right + left) / 2)], j = right;
		i = left;
		while (i <= j) {
			while(this[i] > pivot) i++;
			while(this[j] < pivot) j--;
			if (i <= j) {
				swap(this, i, j);
				i++;
				j--;
			}
		}
		if (left > i-1) this.revSort(left, i - 1);
		if (i > right) this.revSort(i, right);
	}
	return this
};

/**
 * @description BubbleSort (my version)
 * @param {(NumberLike|boolean)} [order="a"] Sorting order
 * @this Array
 * @returns {Array} Sorted array
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.bubbleSort = function (order) {
	var arr = this, j = 1, s = true;
	if (isNon(order) || isType(order, "string") && order[0].toLowerCase() === "a") {
		while (s) {
			s = false;
			for (var i = 0; i <= arr.length - j; i++) {
				if (arr[i] > arr[i + 1]) {
					arr = swap(arr, i, i + 1);
					s = true;
				}
				if (i < arr.length - (j + 1)) {
					if (arr[i] > arr[i + 2]) arr = swap(arr, i, i + 2);
					if (arr[i + 1] > arr[i + 2]) {
						arr = swap(arr, i + 1, i + 2);
						s = true;
					}
				}
				if (i < arr.length - (j + 2)) {
					if (arr[i] > arr[i + 3]) arr = swap(arr, i, i + 3);
					if (arr[i + 1] > arr[i + 3]) {
						arr = swap(arr, i + 1, i + 3);
						//start = true;
					}
				}
			}
			j++;
		}
	}else if (order  === 1 || order[0].toLowerCase() === "d") { //Descending order
		while (s) {
			s = false;
			for (i = 0; i <= arr.length - j; i++) {
				if (arr[i] < arr[i + 1]) {
					arr = swap(arr, i, i + 1);
					s = true;
				}
				if (i < arr.length - (j + 1)) {
					if (arr[i] < arr[i + 2]) arr = swap(arr, i, i + 2);
					if (arr[i + 1]<arr[i + 2]) {
						arr = swap(arr, i + 1, i + 2);
						s = true;
					}
				}
				if (i < arr.length - (j + 2)) {
					if (arr[i] < arr[i + 3]) arr = swap(arr, i, i + 3);
					if (arr[i + 1] < arr[i + 3]) {
						arr = swap(arr, i + 1, i + 3);
						//start = true
					}
				}
			}
			j++;
		}
	}
	return arr
};

/**
 * @description Brute force sort
 * @this Array
 * @returns {Array} Sorted array
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.bruteForceSort = function () {
	for (var i = 0; i < this.length; i++) {
		var s = this[i], pos = i;
		for (var j = i + 1; j <= this.length; j++) {
			if (s > this[j]) {
				s = this[j];
				pos = j;
			}
		}
		var temp = this[i];
		this[i] = s;
		this[pos] = temp;
	}
	return this
};

/**
 * @description Max's Sort (mine)
 * @this Array
 * @returns {Array} Sorted Array
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.maxSort = function () {
	//Ignores repeated values and loose data
	var med = this.median(), res = new Array(this.length), inc = this.getIncrement(3), q1 = this.quartile(1), q3 = this.quartile(3);
	//Pre-sort some elements
	res[0] = this.min();
	res.last(this.max());
	if(parseInt(res.length / 2) === (res.length / 2)) res[res.length / 2] = med;
	if(parseInt(res.length / 4) === (res.length / 4)) res[res.length / 4] = q1;
	if(parseInt(3 * res.length / 4) === (3 * res.length / 4)) res[3 * res.length / 4] = q3;

	for (var i = 1; i < this.length - 1; i++) { //Add elements in the correct order that belongs to x
		if (this[i] === Math.floor(res[0] + i * inc)) res[i] = this[i];
		else if (this[i] === Math.round(res[0] + i * inc)) res[i] = this[i];
		else if (this[i] == Math.ceil(res[0] + i * inc)) res[i] = this[i];
		else if (this[i] >= Math.floor(res[0] + i * inc) && this[i] <= Math.ceil(res[0] + i * inc)) res[i] = this[i]
	}
	console.log("current result: " + res.toStr(true));
	for (i = this.length - 1; i > 1; i--) { //Same thing but from the end to complete the missing ones
		if (this[i] === Math.floor(res[res.length - 1] - i * inc) && isNon(res[i])) res[i] = this[i];
		else if (this[i] === Math.round(res[res.length - 1] - i * inc) && isNon(res[i])) res[i] = this[i];
		else if (this[i] === Math.ceil(res[res.length - 1] + i * inc) && isNon(res[i])) res[i] = this[i];
		else if (this[i] >= Math.floor(res[res.length - 1] + i * inc) && this[i]<= Math.ceil(res[0] + i * inc) && isNon(res[i])) res[i] = this[i]
	}
	console.log("current result: " + res.toStr(true));
	for (i = 1; i < this.length - 1; i++) {
		for (var j = 0; j < this.length; j++) {
			if (this[j] === Math.floor(res[0] + i * inc)) res[i] = this[j];
			else if (this[j] === Math.round(res[0] + i * inc)) res[i] = this[j];
			else if (this[j] === Math.ceil(res[0] + i * inc)) res[i] = this[j];
			else if (this[j] >= Math.floor(res[0] + i * inc) && this[j] <= Math.ceil(res[0] + i * inc)) res[i] = this[j];
		}
	}
	return res
};

/**
 * @description Centre sort
 * @param {number} [l=0] Left position
 * @param {number} [r=this.length-1] Right position]
 * @returns {Array} Sorted array
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.cenSort = function (l, r) {
	//Ignores repeated values and loose database
	var res = new Array(this.length);
	if (!l && !r) {
		l = Math.floor(this.length / 2);
		r = Math.ceil(this.length / 2);
	}
	if (this.length <= 1) return this;
	var pivot = this[Math.floor((r + l)/2)], j = r, i = l;
	while (i <= j) {
		while(this[i] < pivot) i--;
		while(this[j] > pivot) j++;
		if (i >= j) {
			swap(this, i, j);
			i--;
			j++;
		}
	}

	if (l > i-1) this.cenSort(l, i - 1);
	if (i > r) this.cenSort(i, r);
	return res
};

/**
 * @description Set sort.
 * Source: somewhere.
 * @this Array
 * @returns {Array} New array
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.setSort = function () { //A faster algorithm than quickSort only for integers where the extremities are known
	var t = [], l = this.length, res = [];
	for(var i = 0; i < 1000; i++) t[i] = 0;
	for(i = 0; i < l; i++) t[this[i]] = 1;
	for (i = 0; i < 1000; i++) {
		if (1 === t[i]) res.push(i);
	}
	return res
};

/**
 * @description Clean the array
 * @param {boolean} [noDuplic=false] No duplicates
 * @this Array
 * @returns {Array} Cleaned array
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.clean = function (noDuplic) { //Remove undesirable items
	var arr = [], j = 0;
	for (var i = 0; i < this.length; i++) {
		if (!isNon(this[i])) arr[j++] = this[i];
	}
	return noDuplic? rmDuplicates(arr).remove(): arr; //Take off (or not) duplicates of actual values and double clean it
};

/**
 * @description eXtreme cleaning of the array
 * @this Array
 * @returns {Array} Cleaned array
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.xclean = function () {
	return this.clean(true).remove()
};

/**
 * @description Substitute every elements from $s to $e with from $s to $e of the array $arr
 * @param {Array} arr Array
 * @param {number} [s=0] Starting position
 * @param {number} [e=this.length-1] Ending position
 * @this Array
 * @returns {Array} Modified array
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.chg = function(arr, s, e) {
	s = s || 0;
	e = e || this.length - 1;
	var a = this.get(s, e), b = arr.get(s, e);

	for (var i = 0; i < a.length; i++) a[i] = b[i]
	return a;
};

/**
 * @description Exchange of elements between two arrays
 * @param {Array} arr Array
 * @param {number} s Starting position
 * @param {number} e Ending position
 * @returns {Array} Current resulting array
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.exchange = function(arr, s, e) {
	s = s || 0;
	e = e || this.length - 1;
	var a = this.get(s, e), b = arr.get(s, e);

	for (var i = 0; i < a.length; i++) {
		var tmp = a[i];
		a[i] = b[i];
		b[i] = tmp;
	}
	return a;
};

/**
 * @description Rotate an array by $deg%90 deg
 * @param {number} deg Degree of rotation
 * @todo Finish the section for 4x4+ matrices
 * @this Array
 * @returns {Array} Rotated array
 * @since 1.0
 * @method
 * @throws {Error} deg isn't a multiple of 90°
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.rot = function (deg) {
	var tmp;
	if (deg % 90 != 0) throw new Error("The absolute degree of rotation must be either 90° or 180°");
	if (this.numElm() === 4 && this.length === 2) { //2x2 matrix
		if (deg === 90) {
			tmp = this[0][0];
			this[0][0] = this[1][0];
			this[1][0] = this[1][1];
			this[1][1] = this[0][1];
			this[0][1] = tmp;
		}else if (deg === -90) {
			tmp = this[0][0];
			this[0][0] = this[0][1];
			this[0][1] = this[1][1];
			this[1][1] = this[1][0];
			this[1][0] = tmp;
		}else if (Math.abs(deg) === 180) {
			tmp = [this[0][0], this[0][1]];
			this[0][0] = this[1][1];
			this[1][1] = tmp[0];
			this[0][1] = this[1][0];
			this[1][0] = tmp[1];
		}
	}else if (this.numElm() === 9 && this.length === 3) { //3x3 matrix
		if (deg === 90) {
			tmp = [this[0][0], this[0][1]];
			this[0][0] = this[2][0];
			this[2][0] = this[2][2];
			this[2][2] = this[0][2];
			this[0][2] = tmp[0];
			this[0][1] = this[1][0];
			this[1][0] = this[2][1];
			this[2][1] = this[1][2];
			this[1][2] = tmp[1];
		}else if (deg ==-90) {
			tmp = [this[0][0], this[0][1]];
			this[0][0] = this[0][2];
			this[0][2] = this[2][2];
			this[2][2] = this[2][0];
			this[2][0] = tmp[0];
			this[0][1] = this[1][2];
			this[1][2] = this[2][1];
			this[2][1] = this[1][0];
			this[1][0] = tmp[1];
		}else if (Math.abs(deg) === 180) {
			tmp = [this[0][0], this[0][1], this[0][2], this[1][0]];
			this[0][0] = this[2][2];
			this[2][2] = tmp[0];
			this[0][2] = this[2][0];
			this[2][0] = tmp[2];
			this[0][1] = this[2][1];
			this[2][1] = tmp[1];
			this[1][0] = this[1][2];
			this[1][2] = tmp[3];
		}
	}else if (this.numElm() === 16 && this.length === 4) { //4x4 matrix although I'm trying to make this as responsive as I get for 4x4+ matrices
		if (deg === 90) {
			tmp = this[0].get(-1); //Get all but the last element of the first row
			for (var j = 0; j < 1/*this.length / 2*/; j++) { //Weird error
				tmp = this[j].get(-1);
				for (var i = 0; i < this.maxLength() - 1; i++) {
					if(j > 0) Essence.say("#" + i);
					if(j > 0) Essence.say(this[j][i] + "<-" +  this[this.length - 1 - i][j]);
					this[j][i] = this[this.length - 1 - i][j];
					if(j > 0) Essence.say(this[this.length - 1 - i][j] + "<-" +  this[this.length - 1 - j][this.length - 1 - i]);
					this[this.length - 1 - i][j] = this[this.length - 1 - j][this.length - 1 - i];
					if(j > 0) Essence.say(this[this.length - 1 - j][this.length - 1 - i] + "<-" +  this[i][this.length - 1 - j]);
					this[this.length - 1 - j][this.length - 1 - i] = this[i][this.length - 1 - j];
					if(j > 0) Essence.say(this[i][this.length - 1 - j] + "<-" +  tmp[i]);
					this[i][this.length - 1 - j] = tmp[i];
				}
			}
		} else if (deg === -90) {
			tmp = [this[0][0], this[0][1]];
			this[0][0] = this[0].last();
			this[0].last(this.last().last());
			this.last().last(this.last()[0]);
			this.last()[0] = tmp[0];
			this[0][1] = this[1].last();
			this[1].last(this.last()[1]);
			this.last()[1] = this[1][0];
			this[1][0] = tmp[1];
		} else if (Math.abs(deg) === 180) {
			tmp = [this[0][0], this[0][1], this[0].last(), this[1][0]];
			this[0][0] = this.last().last();
			this.last().last(tmp[0]);
			this[0].last(this.last()[0]);
			this.last()[0] = tmp.last();
			this[0][1] = this.last()[1];
			this.last()[1] = tmp[1];
			this[1][0] = this[1].last();
			this[1].last(tmp[3]);
		}
	}else throw "Unsupported matrix. Please wait or contact the developer to add this matrix\' support.";
	return this
};

/**
 * @description Number of elements
 * @this Array
 * @returns {number} Number of elements
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.numElm = function () {
	return this.linearise().length
};

/**
 * @description Size of the array
 * @param {boolean} [str=false] String format or not
 * @this Array
 * @returns {string|number[]} Size
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.size = function (str) { //Get the width * height size of the array
	return str? this.length + "x" + this.maxLength(): [this.length, this.maxLength()]
};

/**
 * @description Determinant of the matrix
 * @this Array
 * @returns {number} Determinant
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.det = function () {
	var d = 0;
	if (this.numElm() === 4 && this.length === 2) d = this[0][0] * this[1][1]-this[0][1] * this[1][0];
	else if (this.numElm() === 9 && this.length === 3) {
		d = this[0][0] * (this[1][1] * this.last().last()-this[1].last() * this.last()[1])-this[0][1] * (this[1][0] * this.last().last()-this[1].last() * this.last()[0]) + this[0].last() * (this[1][0] * this.last()[1]-this[1][1] * this.last()[0]);
	}else Essence.say("Unsupported matrix format", "error");
	return d
};

/**
 * @description Translate the array
 * @this Array
 * @returns {Array} Translated array
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.translate = function () {
	if (this.size()[0] === this.size()[1]) { //NxN
		for (var i = 0; i < Math.round(this.length / 2); i++) {
			for (var j = 0; j < this[0].length; j++) {
				if (!(1 === i && 0 === j && this[0].length > 2)) {
					var r = this[i][j];
					this[i][j] = this[j][i] || "";
					this[j][i] = r;
				}
			}
		}
		if (this.size(true) === "4x4") {
			var t = this[2].last();
			this[2].last(this.last()[2]);
			this.last()[2] = t
		}
	} else { //NxM
		var arr = new Array(this.maxLength()).fill([]);
		for (i = 0; i < this.maxLength(); i++) arr[i] = this.line(i)
		return arr;
	}
	return this
};

/**
 * @description Look for some $x in the array
 * @param {*} x Element looked for
 * @returns {number} Position of the element
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.lookFor = function (x) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] === x || this[i].equals(x)) return i;
	}
	return -1
};

/**
 * @description Divide the array into an array with n-sized cells
 * @this Array
 * @param {number} n Size of each chunks
 * @returns {Array} Resulting array
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.divide = function (n) {
	var res = new Array(Math.round(this.length / n)).fill(""), k = 0;
	for (var i = 0; i < res.length; i++) {
		for(var j = 0; j < n; j++) res[i] += this[k++];
	}
	return res
};

/**
 * @description Adjoint of the matrix
 * @this Array
 * @returns {Array} Adjoint matrix
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.getAdjoint = function () {
	var m = this.translate(), res = mkArray(this.length, 2, Essence.eps);
	//+-+
	//-+-
	//+-+
	if (m.numElm() === 4 && m.length === 2) {
		res[0] = [m[1][1], -m[1][0]];
		res[1] = [-m[0][1], m[0][1]];
	}else if (m.numElm() === 9 && m.length === 3) {
		res[0] = [m[1][1] * m.last().last()-m[1].last() * m.last()[1], -(m[1][0] * m.last().last()-m[1].last() * m.last()[0]), m[1][0] * m.last()[1]-m[1][1] * m.last()[0]];
		res[1] = [-(m[0][1] * m[1].last()-m[0].last() * m[1][1]), m[0][0] * m.last().last()-m[0].last() * m.last()[0], -(m[0][0] * m.last()[1]-m[0][1] * m.last()[0])];
		res.last([m[0][1] * m[1].last()-m[0].last() * m[1][1], -(m[0][0] * m[1].last()-m[0].last() * m[1][0]), m[0][0] * m[1][1]-m[0][1] * m[1][0]]);
	}else Essence.say("Unsupported matrix format", "error");
	return res
};

/**
 * @description Invertibility check
 * @this Array
 * @returns {boolean} Is it invertible ?
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.isInvertible = function() {
	return this.det() != 0
};

/**
 * @description Dot product
 * @param {number} a Scalar
 * @this Array
 * @returns {Array} Resulting array
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.dotProd = function (a) { //A.this where a is a scalar and this a matrix
	var res = [];
	for (var i = 0; i < this.length; i++) {
		res[i] = [];
		for(var j = 0; j < this[i].length; j++) res[i][j] = a * this[i][j];
	}
	return res
};

/**
 * @description Dot addition
 * @param {number} a Scalar
 * @since 1.0
 * @method
 * @returns {Array} Resulting array
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.dotAdd = function (a) {
	var res = [];
	for (var i = 0; i < this.length; i++) {
		res[i] = [];
		for(var j = 0; j < this[i].length; j++) res[i][j] = a + this[i][j];
	}
	return res
};

/**
 * @description Dot subtraction
 * @param {number} a Scalar
 * @param {string} [order=false] Order
 * @this Array
 * @returns {Array} Resulting array
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.dotSub = function (a, order) {
	var res = [];
	order = order.toLowerCase().remove();
	for (var i = 0; i < this.length; i++) {
		res[i] = [];
		for(var j = 0; j < this[i].length; j++) res[i][j] = (order === "a-b")? a - this[i][j]: this[i][j] - a;
	}
	return res
};

/**
 * @description Dot Fraction
 * @param {number} a Scalar
 * @param {string} order Order
 * @returns {Array} Resulting array
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.dotFrac = function (a, order) {
	var res = [];
	order = order.toLowerCase().remove();
	for (var i = 0; i < this.length; i++) {
		res[i] = [];
		for(var j = 0; j < this[i].length; j++) res[i][j] = (order === "a/b")? a / this[i][j]: this[i][j] / a;
	}
	return res
};

/**
 * @description String[]([]) to String
 * @param {boolean} [clean=false] Clean output
 * @this Array
 * @returns {string} String representation
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.toStr = function (clean) {
	var str = "";
	if (is2dArray(this)) {
		for (var i in this) {
			if (this.hasOwnProperty(i)) str += clean? this[i].join(", "): this[i].join("");
		}
		return clean? this.toStr().split("").join(", "): str
	}else return this.join(clean? ", ": "")
};

/**
 * @description Number[] to Number
 * @returns {number} Integer representation
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.toInt = function () {
	var n = 0;
	for (var i in this) {
		if (this.hasOwnProperty(i)) n += this[i] * Math.pow(10, this.length - i - 1);
	}
	return n
};

/**
 * @description Invert the matrix
 * @this Array
 * @returns {?Array} Inverse
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.inv = function () {
	return this.isInvertible()? this.dotProd(1 / this.det() * this.getAdjoint()): null;
};

/**
 * @description Mix up the array
 * @this Array
 * @returns {Array} Mixed array
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.mix = function () { //Mix up the array
	var randPos = mixedRange(0, 1, this.length - 1, true), res = [];
	for (var i = 0; i < this.length; i++) res[i] = this[randPos[i]];
	return res
};

/**
 * @description Few mixes
 * @this Array
 * @returns {Array} Mixed array
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.littleMix = function () {
	var res = [], ic;
	if (is2dArray(this)) {
		res = Copy(this).linearise();
		res = res.littleMix().toNcol(this.size()[1]).sanitise(getType(this[0][0])); //Assuming all cells are of the same type
	} else {
		ic = this.getIncrement(0);
		for (var i = 0; i < this.length; i++) {
			var r = randTo(ic);
			res.push(this[i]);
			if (i > 0 && r === 0) swap(res, i, i - 1);
			else if (i > 1 && r === ic) swap(res, i, i - 2);
		}
	}
	return res
};

/**
 * @description Push that adds elements of an array instead of the array itself (just like Array.concat)
 * @this Array
 * @param {Array} arr Array used to append
 * @returns {Array} New array
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 * @deprecated
 */
Array.prototype.append = function (arr) {
	for (var i = 0; i < arr.length; i++) this.push(arr[i]);
	return this;
};

/**
 * @description Unshift that adds element of an array instead of the array itself
 * @this Array
 * @param {Array} arr Array used to prepend
 * @returns {Array} New array
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.prepend = function (arr) {
	for (var i = 0; i < arr.length; i++) this.unshift(arr[i]);
	return this;
};

/**
 * @description List of unique elements of the array
 * @this Array
 * @returns {Array} Array of unique elements
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.unique = function () {
	var u = [];
	for (var i = 0; i < this.length; i++) {
		if (this.count(this[i]) === 1) u.push(this[i]);
	}
	return u
};

/**
 * @description N-D array to 1D array
 * @param {boolean} [jointer=false] Jointer
 * @returns {Array} res Resulting 1D array
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.to1d = function (jointer) {
	var res = Copy(this);
	for(var i = 0; i < res.length; i++) res[i] = res[i].join(jointer || "");
	return res
};

/**
 * @description 1D array to N-D array
 * @param {number} n Dimension
 * @this Array
 * @returns {Array} Resulting N-D array
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.toNd = function (n) {
	if(!n) n = 2;
	var sz = nthroot(this.length, n, 0), res = [], k = 0; //Size of the sz**n
	for (var i = 0; i < sz; i++) {
		res[i] = [];
		for (var j = 0; j < sz; j++) res[i][j] = this[k++];
	}
	return res;
};

/**
 * @description 1D array to N-column array
 * @param {number} n Number of columns
 * @this Array
 * @returns {Array} Resulting array
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.toNcol = function (n) {
	var res = [], k = 0; //Size of the sz**n
	for (var i = 0; i < this.length / n; i++) {
		res[i] = [];
		for (var j = 0; j < n; j++) res[i][j] = this[k++];
	}
	return res;
};

/**
 * @description 1D array to N-row array
 * @param {number} n Number of rows
 * @this Array
 * @returns {Array} Resulting array
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.toNrow = function (n) {
	var res = [], k = 0; //Size of the sz**n
	for (var i = 0; i < n; i++) {
		res[i] = [];
		for (var j = 0; j < this.length / n; j++) res[i][j] = this[k++];
	}
	return res;
};

/**
 * @description Linear 1D array
 * @this Array
 * @returns {Array} Linearised array
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.linearise = function() {
	return this.toString().split(",");
};

/**
 * @description Ensure that all the elements are of the same length
 * @param {NumberLike} [cr=" "] Filler
 * @returns {Array} Uniformed array
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.uniform = function (cr) {
	var res = this, ml = res.maxLength();
	for (var i = 0; i < res.length; i++) {
		while(res[i].length < ml) isType(res[i], "Array")? res[i].push(cr || " "): res[i] += cr || " ";
	}
	return res
};

/**
 * @description Zip the array
 * @this Array
 * @returns {Array} Zipped array
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.zip = function () {
	var res = [], j;
	for (var i = 0; i < this.length; i++) {
		if (this[i] === this[i + 1]) {
			j = 1;
			while(this[i] === this[i + j]) j++;
			res.push(this[i] + "@" + j);
			i += j-1;
		}else res.push(this[i]);
	}
	return res.length < this.length? res: this; //Make sure that the compressed array isn't longer than the initial one
};

/**
 * @description Unzip the array
 * @param {boolean} [noPairs=false] Keep pairs or not ?
 * @this Array
 * @returns {Array} Unzipped array
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.unzip = function (noPairs) {
	var res = [];
	for (var i = 0; i < this.length; i++) {
		if (/[\S\s](@)(\d+)/g.test(this[i])) res.push(this[i][0].repeat(this[i][this[i].indexOf("@") + 1]));
		else res.push(this[i]);
	}
	return noPairs? res.join("").split(""): res;
};

/**
 * @description Trim the array
 * @param {(string|boolean)} side Side
 * @this Array
 * @returns {Array} res Trimed array
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.trimAll = function (side) { //Trimes every elements
	var res = [];
	side = side? side[0].toLowerCase(): "";
	//noinspection JSUnresolvedFunction
	for (var i = 0; i < this.length; i++) res[i] = (side === "l")? this[i].trimLeft(): ((side === "rad")? this[i].trimRight(): this[i].trim());
	return res
};

/**
 * @description Sorted state check
 * @this Array
 * @returns {boolean} Sorted or not
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.isSorted = function () { //Check if the array is sorted
	if (this[0] > this[1]) return false;
	for (var i = 1; i < this.length; i++) {
		if (this[i] > this[i+1]) return false
	}
	return true
};

/**
 * @description Ensure that the element isn't pushed when it's already there
 * @this Array
 * @param {*} obj Object
 * @returns {undefined}
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.uniquePush = function (obj) { //Post-init duplicate safe push
	if (isType(obj, "Array")) {
		for (var i = 0; i < obj.length; i++) {
			if (this.indexOf(obj[i]) === -1) this.push(obj[i]);
		}
	} else if (this.has(obj)) throw "the object " + obj.toString() + "is already present in " + this.toString();
	else this.push(obj);
};

/**
 * @description Replace all occurrences of $str instead of just the first one
 * @param {NumberLike} str String/number
 * @param {NumberLike} nstr New string/number
 * @returns {(Array|string)} Result
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.replaceAll = function (str, nstr) {
	var res = this.replace(str, nstr), i = 0;
	while (res.has(str) || i === this.length) {
		res = this.replace(str, nstr);
		i++;
	}
	return res;
};

/**
 * @description Neighbour check
 * @param {Nums} y Row number
 * @param {Nums} x Column number
 * @returns {Array} Neighbours
 * @since 1.0
 * @method
 * @throws {RangeError} y|x is too big
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.neighbour = function (y, x) {
	var n = [], seq;
	if (isType(y, "Array")) {
		x = parseInt(y[1]);
		y = parseInt(y[0]);
	} else {
		y = parseInt(y);
		x = parseInt(x);
	}
	if (y >= this.length) throw new RangeError("The y-coord is out of bounds");
	if (x >= this.maxLength()) throw new RangeError("The x-coord is out of bounds");
	if (is2dArray(this)) {
		seq = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]];
		for (var i = 0; i < seq.length; i++) {
			try {
				if (!isNon(this[y + seq[i][0]][x + seq[i][1]])) n.push(this[y + seq[i][0]][x + seq[i][1]]);
			} catch (e) {
				/* eslint no-empty: 0 */
			}
		}
	} else {
		try {
			if (!isNon(this[y - 1])) n.push(this[y - 1]);
			if (!isNon(this[y + 1])) n.push(this[y + 1]);
		} catch (e) {}
	}
	return n;
};

/**
 * @description Make sure all the cells are of the right type
 * @param {string} type Type
 * @this Array
 * @returns {Array} Sanitised array
 * @since 1.0
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.sanitise = function (type) {
	for (var i = 0; i < this.length; i++) {
		for (var j = 0; j < this[i].length; j++) this[i][j] = name2Type(type, this[i][j]);
	}
	return this;
};

/**
 * @description Get a portion of the array
 * @param {number} [denominator=2] How many parts (half by default)
 * @param {number} [numerator=1] Position of the part (1st half by default)
 * @returns {Array} Portion of the array
 * @since 1.1
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.portion = function (denominator, numerator) {
	return (this.length % 2 === 0)? this.get((numerator || 1) * Math.round(this.length) / (denominator || 2)): this.get(Math.floor((numerator || 1) * Math.floor(this.length) / (denominator || 2)));
};

/**
 * @description Remove the first element <code>n</code> of the array (so not all values equal to n).
 * @param {*} n Element
 * @param {boolean} [preserveInitial] Flag indicating whether the initial array is going to remain unchanged
 * @returns {Array.<*>} Array without that first element n
 * @see external:Array.remove
 * @since 1.1
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.removeFirst = function (n, preserveInitial) {
	var self = this;
	return preserveInitial? this.filter(function (x, i) {
		return x != n || i != self.indexOf(n);
	}): this.splice(this.indexOf(n), 1);
};

//noinspection JSUnusedGlobalSymbols
/**
 * @description Remove the last element <code>n</code> of the array (so not all values equal to n).
 * @param {*} n Element
 * @param {boolean} [preserveInitial] Flag indicating whether the initial array is going to remain unchanged
 * @return {Array.<*>} Array without that last element n
 * @see external:Array.remove
 * @since 1.1
 * @method
 * @memberof Array.prototype
 * @external Array
 */
Array.prototype.removeLast = function (n, preserveInitial) {
	var self = this;
	return preserveInitial? this.filter(function (x, i) {
		return x != n || i != self.lastIndexOf(n);
	}): this.splice(this.lastIndexOf(n), 1);
};

/**
 * @description Performs a binary search on the host array. This method can either be
 * injected into Array.prototype or called with a specified scope like this:
 * binaryIndexOf.call(someArray, searchElement);<br />Source: {@link http://oli.me.uk/2013/06/08/searching-javascript-arrays-with-a-binary-search/}
 * @param {*} searchElement The item to search for within the array.
 * @return {number} The index of the element which defaults to -1 when not found.
 * @since 1.1
 * @method
 * @memberof Array.prototype
 * @external Array
 * @this Array
 */

Array.prototype.binaryIndexOf = function (searchElement) {
	var minIndex = 0, maxIndex = this.length - 1, currentIndex, currentElement, resultIndex;

	while (minIndex <= maxIndex) {
		resultIndex = currentIndex = (minIndex + maxIndex) >> 1;
		currentElement = this[currentIndex];

		if (currentElement < searchElement)  minIndex = currentIndex + 1;
		else if (currentElement > searchElement) maxIndex = currentIndex - 1;
		else return currentIndex;
	}

	return ~maxIndex;
};

/**
 * @description Place an item at the right place (to not mess up the order).
 * @param {*} n Term to place
 * @returns {Array} Modified array
 * @this Array
 * @since 1.1
 * @method
 * @memberof Array.prototype
 * @external Array
 * @example
 * var arr = [0, 1, 2, 4];
 * arr.place(3); //arr = [0, 1, 2, 3, 4]
 */
Array.prototype.place = function (n) {
	this.splice(Math.abs(this.binaryIndexOf(n)), 0, n);
	return this;
};
/**
 * @description Place items of an array at the right places (to not mess up the order).
 * @param {Array} arr Array containing the terms to place
 * @returns {Array} Modified array
 * @this Array
 * @since 1.1
 * @method
 * @memberof Array.prototype
 * @external Array
 * @example
 * var arr = [0, 1, 2, 4, 8];
 * arr.multiPlace([3, 5, 6, 7, 9]); //arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 */
Array.prototype.multiPlace = function (arr) {
	for (var i = 0; i < arr.length; i++) this.place(arr[i]);
	return this;
};

/**
 * @description Check if the string has a character
 * @inheritdoc
 * @param {*} val Character
 * @returns {boolean} Containment check result
 * @this String
 * @method
 * @since 1.1
 * @memberof String.prototype
 * @external String
 */
String.prototype.has = Array.prototype.has;

/**
 * @inheritdoc
 * @description Get the last element of the string
 * @param {*} [nval] New value of the last element
 * @this String
 * @returns {*} Last element
 * @since 1.0
 * @method
 * @memberof String.prototype
 * @external String
 */
String.prototype.last = function (nval) {
	return this.split("").last(nval);
};

String.prototype.splice = function (index, count, add) {
	if (index < 0) {
		index = this.length + index;
		if (index < 0) {
			index = 0;
		}
	}
	return this.slice(0, index) + (add || "") + this.slice(index + count);
};

/**
 * @description Remove the character $c from the string
 * @param {string} c Character
 * @this String
 * @returns {string} Resulting string
 * @since 1.0
 * @method
 * @memberof String.prototype
 * @external String
 */
String.prototype.remove = function (c) { //Remove c from the string
	var str = this;
	if (isType(c, "Array")) {
		for (var i in c) {
			if (c.hasOwnProperty(i)) str = str.remove();
		}
		return str;
	} else {
		var v = str.split(c).map(function (x) {
			return x === c? undefined: x
		}).join("");
		return v.has(undefined)? str.remove(): v
	}
};

/**
 * @description A FP fix that preserve for Number like strings.
 * @param {NumberLike} [n=2] Number of decimals
 * @this String
 * @returns {string} Floating point number
 * @since 1.0
 * @method
 * @memberof String.prototype
 * @external String
 */
String.prototype.toNDec = function (n) {
	return Number(this).toFixed(n || 2);
};

/**
 * @description to N digits
 * @param {number} [n=2] Number of digits
 * @this String
 * @returns {String} Resulting string
 * @since 1.0
 * @method
 * @memberof String.prototype
 * @external String
 */
String.prototype.toNDigits = function (n) {
	var i = this;
	n = n || 2;
	if (parseFloat(i) < Math.pow(10, n - 1)) {
		while (i.split(".")[0].length < n) i = "0" + i;
	}
	return i
};

/**
 * @description Mix the string
 * @param {string} separator Separation character
 * @param {string} jointer Joining character
 * @this String
 * @returns {string} Mixed string
 * @memberof String.prototype
 * @external String
 */
String.prototype.mix = function (separator, jointer) {
	separator = isNon(separator)? "": separator;
	jointer = !jointer? separator: jointer;
	var randPos = mixedRange(0, 1, this.length - 1), iStr = this.split(separator), fStr = [];
	for (var i = 0; i < this.length; i++) fStr[i] = iStr[randPos[i]];
	return fStr.join(jointer)
};

/**
 * @description Divide the string into n-sized chunks
 * @this String
 * @param {number} n Number of chunks
 * @returns {string[]} Divided string
 * @since 1.0
 * @method
 * @memberof String.prototype
 * @external String
 */
String.prototype.divide = function (n) {
	var res = new Array(Math.round(this.length / n)).fill(""), k = 0;
	for (var i = 0; i < res.length; i++) {
		for (var j = 0; j < n; j++) res[i] += this[k++];
	}
	return res
};

/**
 * @description Capitalize the first letter(s)
 * @param {boolean} whole Every words or just the first one
 * @this String
 * @returns {string} String
 * @since 1.0
 * @method
 * @memberof String.prototype
 * @external String
 */
String.prototype.capitalize = function (whole) {
	var res = this.toString(); //Because it will return the String object rather than the actual string
	if (whole) {
		var str = res.split(" ");
		for(var i = 0; i < str.length; i++) str[i] = str[i].capitalize();
		return str.join(" ")
	}else return this.charAt(0).toUpperCase() + this.slice(1); //http://stackoverflow.com/questions/1026069/capitalize-the-first-letter-of-string-in-javascript/1026087#1026087
};

/**
 * @description Ascii sum
 * @this String
 * @returns {number} Ascii sum
 * @since 1.0
 * @method
 * @memberof String.prototype
 * @external String
 */
String.prototype.sum = function () {
	var sum = 0;
	for(var i = 0; i < this.length; i++) sum += this.charCodeAt(i);
	return sum
};

/**
 * @description Ascii product
 * @this String
 * @returns {number} Ascii product
 * @since 1.0
 * @method
 * @memberof String.prototype
 * @external String
 */
String.prototype.prod = function () {
	var prod = 1;
	for(var i = 0; i < this.length; i++) prod *= this.charCodeAt(i);
	return prod
};

/**
 * @description Ascii mean
 * @this String
 * @returns {number} Mean
 * @since 1.0
 * @method
 * @memberof String.prototype
 * @external String
 */
String.prototype.mean = function () {
	var strArr = [];
	for(var i = 0; i < this.length; i++) strArr[i] = this.charCodeAt(i);
	return strArr.mean(2)
};

/**
 * @description Normalise the string
 * @this String
 * @returns {string} Normalised string
 * @since 1.0
 * @method
 * @memberof String.prototype
 * @external String
 */
String.prototype.normal = function () {
	return this.toLowerCase().remove()
};

/**
 * @description Get the occurrences of each characters as well as their positions
 * @type {Array.getOccurrences|*}
 * @returns {undefined}
 * @since 1.0
 * @method
 * @see external:Array.prototype.getOccurrences
 * @inheritdoc
 * @memberof String.prototype
 * @external String
 */
String.prototype.getOccurrences = Array.prototype.getOccurrences;

/**
 * @description Get a portion of the string
 * @param {number} [start=0] Starting position
 * @param {number} [end=this.length-1] Ending position
 * @this String
 * @returns {string} Resulting string
 * @since 1.0
 * @method
 * @memberof String.prototype
 * @external String
 */
String.prototype.get = function (start, end) {
	var res = "";
	if (start < 0 && !end) {
		end = start;
		start = 0;
	}
	if (end < 0) end = this.length + end - 1;
	for(var i = (start || 0); i <= (end || this.length - 1); i++) res += this[i];

	return res
};

/**
 * @description Zip the string
 * @this String
 * @returns {string} Zipped string
 * @since 1.0
 * @method
 * @memberof String.prototype
 * @external String
 */
String.prototype.zip = function () { //Compress the string
	var res = "", j;
	for (var i = 0; i < this.length; i++) {
		if (this[i] === this[i + 1]) {
			j = 1;
			while(this[i] === this[i + j]) j++;
			res += this[i] + "@" + j;
			i += j - 1;
		} else res += this[i];
	}
	return res.length < this.length? res: this; //Make sure that the compression doesn't end up making the string longer
};

/**
 * @description Unzip the string
 * @param {boolean} [noPairs=false] Pairs or not ?
 * @this String
 * @returns {string} Unzipped string
 * @since 1.0
 * @method
 * @memberof String.prototype
 * @external String
 */
String.prototype.unzip = function (noPairs) { //Decompress the string (when being compressed using String.zip()) with(out) pairs
	var res = "";
	for (var i = 0; i < this.length; i++) {
		if (/[\S\s](\@)(\d+)/g.test(this[i])) res += this[i][0].repeat(this[i][this[i].indexOf("@") + 1]);
		else res += this[i];
	}
	return noPairs? res.split("").join(""): res;
};

/**
 * @description Replace all the occurrences of $str instead of just the first one
 * @param {string} str String
 * @param {string} nstr New string
 * @param {string} sep Separation
 * @this String
 * @returns {string} Modified string
 * @since 1.0
 * @method
 * @memberof String.prototype
 * @external String
 */
String.prototype.replaceAll = function(str, nstr, sep) {
	var res = sep? this.split(sep).replace(str, nstr) : this.replace(str, nstr), i = 0;
	if (sep === "") return this.replace(RegExpify(str), nstr); //Avoid the infinite loop caused by sep = ""
	while (res.has(str) || i === this.length) { //Look up the occurrences until there'start none of them left or the interpreter reached the end
		res = this.replace(str, nstr);
		i++;
	}
	return sep? res.join(sep): res;
};

/**
 * @description Chunk the string into substrings of words
 * @param {number} [start=0] Starting position
 * @param {number} [end=this.length-1] Ending position
 * @this String
 * @returns {string} Chunked string
 * @since 1.0
 * @method
 * @memberof String.prototype
 * @external String
 */
String.prototype.chunk = function (start, end) {
	return this.split(" ").get(start, end).join(" ");
};

/**
 * @description Return the chunk that is the same at the beginning of both string
 * @param {string} str String
 * @this String
 * @returns {string} Same string
 * @method
 * @since 1.1
 * @memberof String.prototype
 * @external String
 */
String.prototype.sameFirst = function (str) {
	var sf = "", pos = -1;
	while (pos <= Math.min(this.length, str.length)) {
		pos++;
		//(this[pos] === str[pos])? sf += this[pos]: break;
		if (this[pos] === str[pos]) sf += this[pos];
		else break;
	}
	return sf;
};

//noinspection JSUnusedGlobalSymbols
/**
 * @description Return the chunk that is the same at the end of both string
 * @param {string} str String
 * @this String
 * @returns {string} Same string
 * @method
 * @since 1.1
 * @memberof String.prototype
 * @external String
 */
String.prototype.sameLast = function (str) {
	var sf = "", pos = 1, minLen = Math.min(this.length, str.length);
	while (pos <= minLen) {
		//(this[this.length - pos] === str[str.length - pos])? sf = this[this.length - pos] + sf: break;
		if (this[this.length - pos] === str[str.length - pos]) sf = this[this.length - pos] + sf;
		else break;
		pos++;
	}
	return sf;
};

/**
 * @description String equivalent of Array.map
 * @param {Function} cb Callback function
 * @param {string} [sep=""] Seperator/jointor
 * @return {string} Mapped string
 * @memberof String.prototype
 * @since 1.1
 * @method
 * @external String
 * @this String
 */
String.prototype.map = function (cb, sep) {
	return this.split(sep || "").map(cb).join(sep || "");
};

/**
 * @description Reverse a string
 * @memberOf String.prototype
 * @param {string} [splitter=""] Splitting/joining string
 * @return {string} Reversed string
 * @method
 * @since 1.1
 * @external String
 * @this String
 */
String.prototype.reverse = function (splitter) {
	return this.split(splitter || "").reverse().join(splitter || "");
};

//noinspection JSUnusedGlobalSymbols
/**
 * @description Minify a string/code
 * @param {boolean} [noComment=false] Remove HTML/CSS like comments
 * @param {boolean} [noSpace=false] Remove spaces
 * @method
 * @since 1.1
 * @external String
 * @return {string} Minified version of the string/code
 */
String.prototype.minify = function (noComment, noSpace) {
	var min = noSpace? this.trim().replace(/(\t|\n|\s)/gm, ""): this.trim().replace(/(\t|\n|\s{2,})/gm, "");
	return noComment? min.replace(/(<!--(.*?)-->|\/\*+(.*?)\*+\/)/gm, ""): min;
};

/**
 * @description Get a portion of the string
 * @inheritdoc
 * @param {number} [denominator=2] How many parts (halfs by default)
 * @param {number} [numerator=1] Position of the part (1st half by default)
 * @returns {String} Portion of the string
 * @this String
 * @method
 * @since 1.1
 * @memberof String.prototype
 * @external String
 */
String.prototype.portion = function (denominator, numerator) {
	return this.split("").portion(denominator, numerator).join("");
};

/**
 * @description Length of the number
 * @this Number
 * @returns {Nums} Length
 * @since 1.0
 * @method
 * @memberof Number.prototype
 * @external Number
 */
Number.prototype.length = function () {
	if (String(this).has(".")) return [parseInt(String(this).split(".")[0].length), parseInt(String(this).split(".")[1].length)];
	var l = 0, x = this;
	while (Math.floor(x) != 0) {
		x /= 10;
		l++;
		console.log(x);
	}
	return l
};

/**
 * @description A FP fixing that preserve the number format
 * @param {number} [n=2] Number of decimals
 * @this Number
 * @returns {number} Floating point number
 * @since 1.0
 * @method
 * @memberof Number.prototype
 * @external Number
 */
Number.prototype.toNDec = function (n) { //A bit like .toFixed(n) and .toPrecision(n) but returning a double instead of a string
	var pow10s = Math.pow(10, n || 2);
	return Math.round(pow10s * this) / pow10s
};

/**
 * @description Keep a fixed amount of unit digits
 * @param {number} [n=2] Number of digits
 * @returns {string} New number
 * @since 1.0
 * @method
 * @memberof Number.prototype
 * @external Number
 */
Number.prototype.toNDigits = function (n) { //Get the number to be a n-digit number
	var i = this + ""; //Because it won't work with other types than strings
	n = n || 2;
	if (parseFloat(i) < Math.pow(10, n - 1)) {
		while (i.split(".")[0].length < n) i = "0" + i;
	}
	return i
};

/**
 * @description Sign of the number
 * @param {boolean} str Symbols string representation ?
 * @returns {NumberLike} Sign
 * @since 1.0
 * @method
 * @memberof Number.prototype
 * @external Number
 */
Number.prototype.sign = function (str) { //Get the sign of the number
	return str? (this < 0? "-": (this > 0? " + ": "")): (this < 0? -1: (this > 0? 1: 0))
};

/**
 * @description Prime check
 * @param {number} n Number to check in relation
 * @returns {boolean} Prime check result
 * @since 1.0
 * @method
 * @memberof Number.prototype
 * @external Number
 */
Number.prototype.isPrime = function (n) {
	for (var i = 2; i < n; i++) {
		if (primeCheck(i, n)) return false
	}
	return true
};

/**
 * @description Clean the number
 * @param {number} [nbDec=2] Number of decimals
 * @returns {*} Cleaned number
 * @since 1.0
 * @method
 * @memberof Number.prototype
 * @external Number
 */
Number.prototype.clean = function (nbDec) {
	if (this === 0) return 0;
	else if (this > 0 && this[0] == "+") return nbDec? this.slice(1, this.length).toNDec(nbDec): this.slice(1, this.length);
	else if (this == "-") return this + 1;
	else if (this == "+") return 1;
	else return nbDec? this.toNDec(nbDec): this
};

/**
 * @description Number to Number[]
 * @returns {number[]} Number array
 * @since 1.0
 * @method
 * @memberof Number.prototype
 * @external Number
 */
Number.prototype.toArr = function () {
	var arr = new Array(this.length()), i = 0, n = this;
	while (n > 0) {
		arr[i] = n % 10;
		i++;
		n /= 10;
	}
	return arr
};

/**
 * @description Inheritance.<br />
 * Source: Somewhere
 * @param {*} parentClassOrObj Parent
 * @returns {function(*)} this Current function/constructor
 * @since 1.0
 * @method
 * @memberof Function.prototype
 * @external Function
 */
Function.prototype.inheritsFrom = function (parentClassOrObj) {
	if (parentClassOrObj.constructor === Function) { //Normal Inheritance
		this.prototype = new parentClassOrObj;
		this.prototype.constructor = this;
		this.prototype.parent = parentClassOrObj.prototype;
	} else { //Pure Virtual Inheritance
		this.prototype = parentClassOrObj;
		this.prototype.constructor = this;
		this.prototype.parent = parentClassOrObj;
	}
	return this
};

/**
 * @description Type check
 * @param {*} obj Object
 * @param {string} type Type
 * @returns {boolean} Type check result
 * @since 1.0
 * @func
 */
function isType (obj, type) { //Only works for native types (treats custom ones as objects)
	type = type[0].toUpperCase() + type.slice(1, type.length).toLowerCase();
	return Object.prototype.toString.call(obj) === "[object " + type + "]"
}

/**
 * @description Custom type check
 * @param {*} obj Object
 * @param {string} type Type
 * @returns {boolean} Custom type check result
 * @since 1.0
 * @func
 */
function isCustomType (obj, type) { //Same as isType but for custom types
	return getCustomType(obj).toLowerCase() === type.toLowerCase()
}

/**
 * @description Type getter
 * @param {*} obj Object
 * @param {boolean} [preserve=false] Preserve the format
 * @returns {string} Type
 * @since 1.0
 * @func
 */
function getType (obj, preserve) { //Only works for native types. preserve would leave the [object type]
	var t = Object.prototype.toString.call(obj);
	return preserve? t: t.split(" ")[1].slice(0, t.split(" ")[1].length-1)
}

/**
 * @description Custom type getter
 * @param {*} obj Object
 * @param {boolean} [preserve=false] Preserve the format of strings like [object Element]
 * @returns {string} Custom type
 * @since 1.0
 * @func
 */
function getCustomType (obj, preserve) { //Same as getType but for custom types which won't work for native types
	var t = obj.toLocaleString();
	if (t.indexOf("[") === 0) return preserve? t: t.split(" ")[1].slice(0, t.split(" ")[1].length - 1); //[object Type]
	else return t.split("(")[0].trim()
}

/**
 * @description 2D array check
 * @param {*} obj Object
 * @returns {boolean} 2D array check result
 * @since 1.0
 * @func
 */
function is2dArray (obj) { //Check if an array has 2 dimensions (nxm matrix)
	if (isType(obj, "Array")) {
		for (var i = 0; i < obj.length; i++) {
			if (isType(obj[i], "Array")) return true
		}
	} else return false
}

/**
 * @description Check if $val is nothing/empty
 * @param {*} val Value
 * @returns {boolean} Voidness/emptyness result
 * @since 1.0
 * @func
 */
function isNon (val) {
	return (val === false || val === undefined || val === null || val === "" || val.equals([]) || val.equals({}))
}

/**
 * @description Check if a variable/object exist or not.
 * @param {*} obj Object/variable to check
 * @return {boolean} Existence result
 * @since 1.1
 * @func
 * @example
 * var a = undefined, b, c = null;
 * exist(a); //true because: a in window === true
 * exist(b); //true because: b in window === true
 * exist(c); //true because: (typeof c !== "undefined" && c !== undefined) === true
 * exist(d); //false
 */
function exist (obj) {
	/* eslint no-shadow-restricted-names: 0 */
	var undefined, t;
	try {
		//noinspection JSUnusedAssignment
		t = typeof obj !== "undefined" || obj !== undefined || obj in window;
		/* eslint no-shadow-restricted-names: 2 */
	} catch (e) {
		t = false;
	}
	return t;
}

/**
 * @description Returns a copy of an element in order to do mutation-safe operations with it
 * @param {*} el Element
 * @returns {*} Copy of <code>el</code>
 * @since 1.0
 * @func
 */
function Copy (el) {
	if (isType(el, "String") || isType(el, "Number") || isType(el, "Boolean")) return el; //As they are immutable types
	else{
		var clone = {};
		for (var i in el) {
			if (el.hasOwnProperty(i)) clone[i] = el[i];
		}
		return isType(el, "Array")? clone.toArray(): clone;
	}
}

/**
 * @description Get the information about the key pressed
 * @param {*} keyStroke Keystroke
 * @param {boolean} [tLC=false] To lower case
 * @returns {Array} Keystroke information
 * @since 1.0
 * @func
 */
function getKey (keyStroke, tLC) { //Get information about the key pressed
	var code = !document.all? keyStroke.which: event.keyCode;
	var char = tLC? String.fromCharCode(code).toLowerCase(): String.fromCharCode(code);
	return [char, code]
}

/**
 * @description Get the time (in the format: hh:mm:ss[.xxx])
 * @param {boolean} [ms=false] Include milliseconds
 * @returns {string} Time
 * @since 1.0
 * @func
 */
function getTime (ms) {
	var d = new Date();
	return ms? d.getHours().toNDigits() + ":" + d.getMinutes().toNDigits() + ":" + d.getSeconds().toNDigits() + "." + d.getMilliseconds().toNDigits(): d.getHours().toNDigits() + ":" + d.getMinutes().toNDigits() + ":" + d.getSeconds().toNDigits()
}

/**
 * @description Get the date
 * @param {boolean} [short=false] Shortness (end.g: 26May2016 instead of 26/05/2016
 * @returns {string} Date
 * @since 1.0
 * @func
 */
function getDate (short) {
	var m = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], d = new Date();
	return short? d.getDate().toNDigits() + m[d.getMonth()] + d.getUTCFullYear(): d.toLocaleDateString();
}

/**
 * @description Get the timestamp
 * @param {boolean} [readable=false] Readable (dd/MM/yyyy hh:mm:ss.xxx) or not (ddMMM-hh-mm-ss)
 * @returns {string} Timestamp
 * @since 1.0
 * @see module:essence~getDate
 * @see module:essence~getTime
 * @func
 */
function getTimestamp (readable) {
	return readable? getDate() + " " + getTime(true): getDate(true) + "-" + getTime().replace(/:/g, "-")
}

//noinspection JSUnusedGlobalSymbols
/**
 * @description Date to textual format
 * @param {Date} d Date
 * @returns {string} Textual format (in dd/mm/yyyy)
 * @see module:essence~txt2date
 * @func
 * @since 1.1
 * @throws {Error} d isn't a Date
 */
function date2txt (d) {
	if (!isType(d, "Date")) throw new Error("$d is not a Date object");

	return d.getDate().toNDigits() + "/" + (d.getMonth() + 1).toNDigits() + "/" + d.getFullYear();
}

//noinspection JSUnusedGlobalSymbols
/**
 * @description Textual date (in dd/mm/yyyy) to Date
 * @param {string} txt Textual date
 * @returns {Date} Date
 * @see module:essence~date2txt
 * @func
 * @since 1.1
 */
function txt2date (txt) {
	var p = txt.split("/");
	return new Date(p[2], p[1] - 1, p[0]);
}

/**
 * @description Display the date and at time at a particular place
 * @param {string} [id] ID of the element to be used
 * @returns {undefined}
 * @since 1.0
 * @func
 */
function dateTime (id) {
	var date = new Date();
	var year = date.getFullYear(), month = date.getMonth();
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var d = date.getDate(), day = date.getDay(), h = date.getHours();
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var tt = "", GMT = date.getTimezoneOffset(), m, s;
	if (h < 10) h = "0" + h;
	m = date.getMinutes();
	if (h > 12) {
		h -= 12;
		tt = "PM";
	} else tt = "AM";
	if (m < 10) m = "0" + m;
	s = date.getSeconds();
	if (s < 10) s = "0" + s;
	GMT = (GMT >= 0)? "GMT+" + GMT: "GMT-" + GMT;
	var result = "We're " + days[day] + " " + d + " " + months[month] + " " + year + " and it'start " + h + ":" + m + ":" + s + " " + tt + " " + GMT;
	$e("#" + id || "body").write(result);
	setTimeout("dateTime(\"" + id + "\");", 1000);
}

/**
 * @description Kinch'start week day finder
 * @param {string} d Date
 * @author Daniel "Kinch" Sheppard
 * @returns {string} Week day
 * @since 1.0
 * @func
 */
function dayOfWeek (d) {
	var day = parseInt(d.split("/")[0]), m = [0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5], days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]; //Months from Jan to Dec
	var y = parseInt(d.split("/").last()) % 100 + Math.floor(d.split("/").last() / 4), c = Math.floor(d.split("/").last() / 100 % 4), cCode;
	if (c === 0) cCode = 6;
	else if (c === 1) cCode = 4;
	else if (c === 2) cCode = 2;
	else cCode = 0;
	return days[(day + m[parseInt(d.split("/")[1]) - 1] + y + cCode) % 7]
}

/**
 * @description Date to number
 * @param {string} [d=getDate()] Date
 * @returns {number} Number
 * @see module:essence~num2date
 * @since 1.0
 * @func
 */
function date2num (d) {
	if(!d) d = getDate();
	var p = d.split("/");
	return parseFloat(parseFloat(p[2] + "." + p[1]).toNDec() + "0" + p[0]);
}

/**
 * @description Number to date
 * @param {number} n Number
 * @returns {string} Date
 * @see module:essence~date2num
 * @since 1.0
 * @func
 */
function num2date (n) {
	var p = n.toString().split(".");
	return p[1].get(3) + "/" + p[1].get(-3) + "/" + p[0];
}

//noinspection JSUnusedGlobalSymbols
/**
 * @description Date difference calculator.<br />
 * Source: {@link http://www.htmlgoodies.com/html5/javascript/calculating-the-difference-between-two-dates-in-javascript.html}
 * @param {Date} [from=new Date()] Starting date
 * @param {Date} to Ending date
 * @param {string} [part="d"] Part
 * @param {boolean} [round=false] Rounding flag
 * @returns {number} Difference
 * @func
 * @since 1.1
 */
function dateDiff (from, to, part, round) {
	if (!from) from = new Date();
	var divideBy = { //in ms
		y: 959230512000,
		m: 2628028800.0000005,
		w: 604800000,
		d: 86400000,
		h: 3600000,
		min: 60000,
		s: 1000,
		ms: 1
	};

	return round? Math.round( (to - from) / divideBy[part || "d"]): (to - from) / divideBy[part];
}

//noinspection JSUnusedGlobalSymbols
/**
 * @description Date (days/weeks/months/years) to seconds
 * @param {number} [d=0] Days
 * @param {number} [w=0] Weeks
 * @param {number} [m=0] Months
 * @param {number} [y=0] Years
 * @returns {number} Seconds
 * @func
 * @since 1.1
 * @see module:essence~s2date
 */
function date2s (d, w, m, y) {
	return (d || 0) * 86400 + (w || 0) * 7 * 86400 + (m || 0) * 30.417 * 86400 + (y || 0) * 365 * 30.417 * 86400;
}

//noinspection JSUnusedGlobalSymbols
/**
 * @description Seconds to days/weeks/months/years
 * @param {number} s Seconds
 * @param {string} [what="d"] Option
 * @returns {number} Result
 * @func
 * @since 1.1
 * @see module:essence~date2s
 */
function s2date (s, what) {
	if (!what) what = "d";
	switch (what.toLowerCase()[0]) {
		case "width": return s / (7 * 86400); //Weeks
		case "m": return s / (30.417 * 86400); //Months
		case "y": return s / (365 * 30.417 * 86400); //Years
		default: return s / 86400; //Days
	}
}

/**
 * @description Generate a string
 * @param {number} len Length
 * @param {Object} filter Filter (specific character, no uppercase/lowercase, cumulative/no (sensitive) repeat)
 * {
 *  name: "specificChar/noUpperCase/noLowerCase/cumulativeRepeat/cumulativeSensitiveRepeat/noRepeat",
 *  character: *
 * }
 * @returns {string} Generated string
 * @since 1.0
 * @func
 */
function genStr (len, filter) { //Generate a string
	var str = "", az = asciiTable("a-z"), AZ = asciiTable("A-Z"), zero9 = range(9), commonChar = ["&", "~", "\"", "#", "\'", "{", "[", "(", "-", "|", "`", "_", "\\", "^", "@", ")", "]", " + ", "=", "}", " % ", " * ", "?", ",", ";", ".", "/", ":", "!", " "],
		charlist;
	charlist = az.concat(AZ, zero9, commonChar);
	var c = "", i = 0;
	while (str.length < len) {
		c = charlist.rand();
		if (filter.name === "specificChar") {
			//noinspection JSUnresolvedVariable
			while(c === filter.character) c = charlist.rand();
		}else if (filter.name === "noUpperCase") {
			c = c.toLowerCase();
		}else if (filter.name === "noLowerCase") {
			c = c.toUpperCase();
		}else if (filter.name === "cumulativeRepeat") {
			while(c == str[i-1]) c = charlist.rand();
		}else if (filter.name === "cumulativeSensitiveRepeat") {
			while(c === str[i-1]) c = charlist.rand();
		}else if (filter.name === "noRepeat") {
			charlist = charlist.remove();
			c = charlist.rand();
		}
		str += c;
		i++;
	}
	if (str.length < len) str += charlist.rand();
	else if (str.length > len) str = str.slice(0, len + 1);
	if (str === "") genStr(len, filter); //May cause overflows
	return str
}

/**
 * @description Make a $len^$dim array
 * @param {number} len Length
 * @param {number} dim Dimension
 * @param {*} [fill=false] Content to be used to fill
 * @returns {Array} Array
 * @since 1.0
 * @func
 * @throws {Error} Invalid/unsupported dimension
 */
function mkArray (len, dim, fill) { //Arr.fill(new Array(...).fill(...)) is already there
	var arr = [];
	if (dim === 1) {
		if (isNon(fill)) arr = new Array(len);
		else {
			for(var i = 0; i < len; i++) arr[i] = fill;
		}
	}else if (dim === 2) {
		if (isNon(fill)) {
			arr = new Array(len);
			for(i = 0; i < len; i++) arr[i] = new Array(len);
		} else {
			for (i = 0; i < len; i++) {
				arr[i] = new Array(len);
				for(var j = 0; j < len; j++) arr[i][j] = fill;
			}
		}
	}else if (dim === 3) {
		if (isNon(fill)) {
			arr = new Array(len);
			for (i = 0; i < len; i++) {
				arr[i] = new Array(len);
				for(j = 0; j < len; j++) arr[i][j] = new Array(len);
			}
		} else {
			for (i = 0; i < len; i++) {
				arr[i] = new Array(len);
				for (j = 0; j < len; j++) {
					arr[i][j] = new Array(len);
					for(var k = 0; k < len; k++) arr[i][j][k] = fill;
				}
			}
		}
	}else if (dim === 4) {
		if (isNon(fill)) {
			arr = new Array(len);
			for (i = 0; i < len; i++) {
				arr[i] = new Array(len);
				for (j = 0; j < len; j++) {
					arr[i][j] = new Array(len);
					for(k = 0; k < len; k++) arr[i][j][k] = new Array(len);
				}
			}
		} else {
			for (i = 0; i < len; i++) {
				arr[i] = new Array(len);
				for (j = 0; j < len; j++) {
					arr[i][j] = new Array(len);
					for (k = 0; k < len; k++) {
						arr[i][j][k] = new Array(len);
						for (var l = 0; l < len; l++) {
							arr[i][j][k][l] = fill;
						}
					}
				}
			}
		}
	} else throw new Error("Unvalid dimension. Only 1D-4D arrays can be made.");
	return arr
}

/**
 * @description Numerical array (like an n-puzzle)
 * @param {number} n Size of the array (matrix)
 * @param {number} [start=0] Starting number
 * @returns {number[]} Numerical array
 * @since 1.0
 * @func
 */
function numArr (n, start) { //Like an n-puzzle
	var na = [], x = start || 0;
	for (var i = 0; i < n; i++) {
		na[i] = [];
		for(var j = 0; j < n; j++) na[i][j] = x++;
	}
	return na
}

/**
 * @description Swap two (proprietary) elements
 * @param {*} obj Object/first element to swap
 * @param {*} e1 First proprietary/second element to swap
 * @param {*} [e2] Second proprietary element to swap
 * @returns {Dict} Swapping result
 * @since 1.0
 * @func
 */
function swap (obj, e1, e2) { //Swap two proprietary elements or two elements
	var tmp;
	if (e2) { //Affect the original object
		tmp = obj[e1];
		obj[e1] = obj[e2];
		obj[e2] = tmp;
		return obj
	} else { //Preserves the original object
		tmp = obj;
		obj = e1;
		e1 = tmp;
		return [obj, e1]
	}
}

/**
 * @description Make sure that $a and $b are of the same lengths and fill the empty spaces with $cr
 * @param {string|Array} a Element a
 * @param {string|Array} b Element b
 * @param {string} [cr=" "] Filling character
 * @returns {Array} Resized elements
 * @since 1.0
 * @func
 * @throws {Error} a and b must be iterable
 */
function toSameLength (a, b, cr) {
	if (!a.isIterable() || !b.isIterable()) throw new Error("invalid length equality operation on non-iterable objects");
	if (!cr) cr = " ";
	if (a.length > b.length) {
		for(var i = b.length; i < a.length; i++) isType(b[i], "String")? b += cr: b.push(cr);
	} else if (a.length < b.length) {
		for(i = a.length; i < b.length; i++) isType(a[i], "String")? a += cr: a.push(cr);
	}
	return [a, b]
}

/**
 * @description Look for an element in a matrix
 * @param {*} x Element to look for
 * @param {Array} mtx Matrix
 * @param {boolean} [toCoord=false] Coordinate representation
 * @returns {Nums} Position
 * @since 1.0
 * @func
 */
function lookfor (x, mtx, toCoord) {
	for (var i = 0; i < mtx.length; i++) {
		for (var j = 0; j < mtx[i].length; j++) {
			if (mtx[i][j] === x || mtx[i][j].equals(x)) return toCoord? [j, i]: [i, j]; //I is the row number and j the column which oppose j being the x-coord and i the y-coord
		}
	}
	return -1
}

/**
 * @description List of keys of a map (like keys in ES6)
 * @param {Array} map Map
 * @param {boolean} [propOnly=false] Properties only
 * @returns {Array} Key list
 * @since 1.0
 * @func
 */
function keyList (map, propOnly) {
	var list = [];
	//ES6 only: if (propOnly) return keys(map)
	if (propOnly) {
		for (var key in map) {
			if (map.hasOwnProperty(key)) list.push(key);
		}
	} else for(key in map) list.push(key);
	return list
}

/**
 * @description List of values of a map (like values in ES6)
 * @param {Array} map Map
 * @param {boolean} [propOnly=false] Properties only
 * @returns {Array} Value list
 * @since 1.0
 * @func
 */
function valList (map, propOnly) {
	var list = [];
	//ES6 only: if (propOnly) return values(map)
	if (propOnly) {
		for (var key in map) {
			if (map.hasOwnProperty(key)) list.push(map[key]);
		}
	}else for(key in map) list.push(map[key]);
	return list
}

/**
 * @description Same as keyList() but returns an HTML table
 * @param {Array} map Map
 * @param {boolean} [propOnly=false] Properties only
 * @returns {string} HTML table
 * @since 1.0
 * @func
 */
function keyTable (map, propOnly) { //Same as above but in the form of the HTML table
	var table = "<table cellspacing=0><caption>KeyTable" + ((map.name || map.title)? ": <i>" + (map.name || map.title) + "</i>": "") + "</caption><tr><th>Key</th><th>Value</th></tr>";
	for (var key in map) {
		table += (propOnly && map.hasOwnProperty(key))? "<tr><td>" + key + "</td><td>" + map[key] + "</td></tr>": "<tr><td>" + key + "</td><td>" + map[key] + "</td></tr>";
	}
	return table + "</table>"
}

/**
 * @description Character to hexadecimal
 * @param {string} c Character
 * @returns {string} Hexadecimal code
 * @since 1.0
 * @func
 */
function char2hex (c) {
	return conv(c.charCodeAt(0), 10, 16)
}

/**
 * @description Hexadecimal to character
 * @param {NumberLike} h Hexadecimal code
 * @returns {string} Character
 * @since 1.0
 * @func
 */
function hex2char (h) {
	return String.fromCharCode(conv(h, 16))
}

/**
 * @description Character to binary
 * @param {string} c Character
 * @returns {string} Binary code
 * @since 1.0
 * @func
 */
function char2bin (c) {
	return conv(c.charCodeAt(0), 10, 2)
}

/**
 * @description Binary to character
 * @param {NumberLike} b Binary code
 * @returns {string} Character
 * @since 1.0
 * @func
 */
function bin2char (b) {
	return String.fromCharCode(conv(b, 2))
}

/**
 * @description Text to number converter
 * @param {string} txt Text
 * @param {number} [base=10] Base
 * @returns {string} Converted text
 * @since 1.0
 * @func
 */
function txt2num (txt, base) {
	var res = "";
	for (var i = 0; i < txt.length; i++) res += conv(txt.charCodeAt(i), 10, base || 10) + " ";
	return res.trimRight();
}

/**
 * @description Number to text
 * @param {NumberLike} num Number
 * @param {number} [base=10] Base
 * @returns {string} Converted number
 * @since 1.0
 * @func
 */
function num2txt (num, base) {
	var res = "";
	for (var i = 0; i < num.split(" ").length; i++) res += String.fromCharCode(conv(num.split(" ")[i], base || 10));
	return res;
}

/**
 * @description Time how long an action took
 * @param {function(*)} act Action
 * @param {string} [pref="auto"] Preference (auto/none, ms/millisec, start/sec)
 * @param {*} [params] Parameters
 * @returns {string} Time
 * @since 1.0
 * @func
 */
function timeUp (act, pref, params) {
	var t1 = new Date();
	t1 = (t1.getMinutes() * 60 + t1.getSeconds()) * 1000 + t1.getMilliseconds();
	act(params);
	var t2 = new Date();
	t2 = (t2.getMinutes() * 60 + t2.getSeconds()) * 1000 + t2.getMilliseconds();
	if (isNon(pref) || pref.slice(0, 4).toLowerCase() === "auto" || pref.slice(0, 4).toLowerCase() === "none") return (t2-t1 > 1000)? (t2-t1)/1000 + "start": (t2-t1) + "ms";
	else if (pref.toLowerCase() === "ms" || pref.slice(0, 8).toLowerCase() === "millisec") return (t2-t1) + "ms";
	else return (t2-t1)/1000 + "start";
}