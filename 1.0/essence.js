"use strict";

/* global Essence:false, $G, Sys, base64 */
/* eslint no-unused-vars: 0 */
/* eslint no-undef: 0 */

/**
 * @description This is the main object of the library
 * @type {{version: string, author: string, description: string, source: string, element: $n, handleError: Essence.handleError, say: Essence.say, css: string, applyCSS: Essence.applyCSS, addCSS: Essence.addCSS, addJS: Essence.addJS, update: Essence.update, eps: number, emptyDoc: Essence.emptyDoc, editor: Essence.editor, processList: Array, global: null, addProcess: Essence.addProcess, processSize: number, erverList: Array, addServer: Essence.addServer, serverSize: number, toString: Essence.toString, txt2print: string, addToPrinter: Essence.addToPrinter, print: Essence.print, preInit: Essence.preInit, init: Essence.init, time: Essence.time, sayClr: Essence.sayClr, ask: Essence.ask}}
 * @this Essence
 * @license MIT
 */
var Essence = {
	version: "1.0b",
	author: "Maximilian Berkmann",
	description: "library used for DHTML connexions, maths, database management and cryptography",
	source: (document.URL.indexOf("essence.min.js")>-1)? "https://Www.dropbox.com/s/1prjdvv9ku0ga92/essence.min.js?dl=0": "https://Www.dropbox.com/s/n2sz2mxz5zwc05t/essence.js?dl=0",
	element: $n,
	handleError: function (msg, url, line) {
		getType(msg, "Error")? alert("[Essence.js] An error has occurred (line/column " + msg.lineNumber + "/" + msg.columnNumber + " of " + msg.fileName + ").\n\nMessage: " + msg.stack): alert("[Essence.js] An error has occurred (line " + line + " of " + url + ").\n\nMessage: " + msg)
	}, say: function (msg, type, style, style0) { //Say something in the console
		type = (isNon(type))? "": type.slice(0, 4).toLowerCase();
		if (style && !style0) {
			if (type === "info") console.info("%c[Essence.js]%c " + msg, "color: #00f; text-decoration: bold;-webkit-text-decoration: bold;-moz-text-decoration: bold;", "color: #000", style);
			else if (type === "erro") console.error("%c[Essence.js]%c " + msg, "color: #f00; text-decoration: bold;-webkit-text-decoration: bold;-moz-text-decoration: bold;", "color: #000", style);
			else if (type === "warn") console.warn("%c[Essence.js]%c " + msg, "color: #fc0; text-decoration: bold;-webkit-text-decoration: bold;-moz-text-decoration: bold;", "color: #000", style);
			else if (type === "succ") console.log("%c[Essence.js]%c " + msg, "color: #0f0; text-decoration: bold;-webkit-text-decoration: bold;-moz-text-decoration: bold;", "color: #000", style);
			else console.log("%c[Essence.js]%c " + msg, "color: #808080; text-decoration: bold;-webkit-text-decoration: bold;-moz-text-decoration: bold;", "color: #000", style);
		} else if (style0 && style0) {
			if (type === "info") console.info("%c[Essence.js]%c " + msg, "color: #00f; text-decoration: bold;-webkit-text-decoration: bold;-moz-text-decoration: bold;", "color: #000", style, style0);
			else if (type === "erro") console.error("%c[Essence.js]%c " + msg, "color: #f00; text-decoration: bold;-webkit-text-decoration: bold;-moz-text-decoration: bold;", "color: #000", style, style0);
			else if (type === "warn") console.warn("%c[Essence.js]%c " + msg, "color: #fc0; text-decoration: bold;-webkit-text-decoration: bold;-moz-text-decoration: bold;", "color: #000", style, style0);
			else if (type === "succ") console.log("%c[Essence.js]%c " + msg, "color: #0f0; text-decoration: bold;-webkit-text-decoration: bold;-moz-text-decoration: bold;", "color: #000", style, style0);
			else console.log("%c[Essence.js]%c " + msg, "color: #808080; text-decoration: bold;-webkit-text-decoration: bold;-moz-text-decoration: bold;", "color: #000", style, style0);
		} else {
			if (type === "info") console.info("%c[Essence.js]%c " + msg, "color: #00f; text-decoration: bold;-webkit-text-decoration: bold;-moz-text-decoration: bold;", "color: #000");
			else if (type === "erro") console.error("%c[Essence.js]%c " + msg, "color: #f00; text-decoration: bold;-webkit-text-decoration: bold;-moz-text-decoration: bold;", "color: #000");
			else if (type === "warn") console.warn("%c[Essence.js]%c " + msg, "color: #fc0; text-decoration: bold;-webkit-text-decoration: bold;-moz-text-decoration: bold;", "color: #000");
			else if (type === "succ") console.log("%c[Essence.js]%c " + msg, "color: #0f0; text-decoration: bold;-webkit-text-decoration: bold;-moz-text-decoration: bold;", "color: #000");
			else console.log("%c[Essence.js]%c " + msg, "color: #808080; text-decoration: bold;-webkit-text-decoration: bold;-moz-text-decoration: bold;", "color: #000");
		}
	},
	css: "@charset:'UTF-8';*{font-family:Calibrie,Verdana,sans-serif}body{height:100%;width:auto;padding:0}table{background:#000}table,td,th{border:1px solid #000;color:#000;background:#fff;border-collapse:collapsed}tr:nth-child(even) td{background:#ddd}.none,.none td,.none th{border:none}tr:hover td{background:#888}.inf{color:#008}.succ{color:#0f0}.err{color:#f00}.quest{color:#00f}.warn{color:#fc0}.info{border-color:#008;background-color:#00008f}.success{border-color:#080;background-color:#008f00}.error{border-color:#800;background-color:#8f0000}.question{border-color:#00f;background-color:#0000f8}.warning{border-color:#f8c808;background-color:#fc0}.block{color:#fff;background:repeat 0 center;border:1px solid;-webkit-appearance:none;outline:0;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;width:100%;height:1.1em;line-height:200%;white-space:nowrap;min-height:16px;position:relative;margin:2px;padding:.3em 2px;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-touch-callout:none;border-radius:7px;-webkit-border-radius:7px;-moz-border-radius:7px}.icon{width:64px;height:64px;border:none;margin:2px}kbd{border:3px outset #ccc;background:#ccc;border-radius:5px;-webkit-border-radius:7px;-moz-border-radius:7px;padding:2px;font-family:Consolas,Tahoma,Segoe UI}h1.title{text-decoration:underline}h2{color:#088}h3{color:#0ff}.code-tag,.code-inst{color:#00f}.code-cmt{color:#0f0}.code-str,.code-id{color:#00c0c0}.code-num,.code-class{color:#f00}.code-attr{color:#c00}.code-val{color:#fc0}.code-type{color:#800080}.code-doc,.code-op{color:#0ff}.code-var{color:#0000c0}.code-keyword{color:#f0f}.nocss{margin:auto;padding:auto;text-align:left;z-index:auto;background:transparent;border:none;border-radius:0;box-shadow:none;clear:none;color:inherit;float:none;content:normal;width:auto;height:auto;letter-spacing:normal;line-height:normal;max-width:none;max-height:none;min-width:0;min-height:0;opacity:1;overflow:visible;page-break-inside:auto;position:static;text-shadow:none;text-transform:none;transform:none;transition:none;vertical-align:baseline;visibility:visible;white-space:normal;word-spacing:normal}",
	applyCSS: function () {
		if (isNon($n("style")) || $e("style").isEmpty()) $e("head").write($n("head").outerHTML + "<style type = 'text/css'>" + Essence.css + "</style>", true);
		else $n("style").innerHTML += Essence.css;
		if ($e("html").val(true).indexOf("<body></body>")>-1) {
			var ix = $e("html").val(true).indexOf("<body></body>");
			var bfr = $e("html").val(true).slice(0, ix), aft = $e("html").val(true).slice(ix + 13, $e("html").val(true).length);
			$e("html").write(bfr + aft, true);
		}
	},
	addCSS: function (nstyle) {
		var s = document.createElement("style");
		s.innerText = nstyle;
		$n("head").appendChild(s);
	}, addJS: function (nscript) {
		var s = document.createElement("script");
		s.innerText = nscript;
		$n("head").appendChild(s);
	}, update: function () { //To keep the script updated !!
		var scriptArr = $e(" * script");
		for (var i = 0; i < scriptArr.length; i ++) {
			if (scriptArr[i].src.indexOf("essence.js")>-1 || scriptArr[i].src.indexOf("essence.min.js")>-1) scriptArr[i].src = this.source || Essence.source;
		}
		Essence.say("%cEssence.(min).js%c has been updated", "succ", "text-decoration: underline", "text-decoration: none");
	},
	eps: Math.pow(2,-52),//Matlab's epsilon (useful when dealing with null values to keep them in the real range or just not null
	emptyDoc: function (title, author) { //Empty the document and fill it with a basic structure
		$e("html").write("<head><title>" + (title || document.title) + "</title><meta charset = 'UTF-8' /><meta name = 'author' content = " + (author || "unknown") + " /><script type = 'text/javascript' src = " + Essence.source + "></script></head><body></body>", true);
	}, editor: function (ctt) {
		location.href = "data:text/html, <html contenteditable>" + (ctt? ctt + "</html>": "</html>");
	}, processList: [["Name (signature)", "Author", "Size"]],
	global: null,
	addProcess: function (pcs) {
		pcs.update();
		Essence.processList.push([pcs.name + " (" + pcs.sig + ")", pcs.author, pcs.bitsize]);
		pcs.id = Essence.processList.length-1;
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
		txt.indexOf("\n\r")>-1? this.print(txt, type): this.txt2print += txt;
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
		$G["t"] = ($G["t2"] - $G["t1"] > 1000)? ($G["t2"] - $G["t1"])/1000 + "s": ($G["t2"] - $G["t1"]) + "ms";
		Essence.say("Page loaded in %c" + $G["t"] + "%c", "succ", "font-style: italic", "font-style: none");
	}, time: function(msg, style, style0) { //Like Essence.say(msg) but with the timestamp
		console.log("[%c" + getTimestamp(true) + "%c] "+msg, "color: #f00;", "color: #000;", style, style0)
	}, sayClr: function (clrs) { //Display a RGB(A) coloured console log
		clrs.length === 4? console.log("%cr%cg%cb%ca(%c" + clrs.join(", %c") + "%c)", "color: #f00", "color: #0f0", "color: #00f", "color: #00f", "color: #000", "color: #f00", "color: #0f0", "color: #00f", "color: #00f", "color: #000"): console.log("%cr%cg%cb%c(%c" + clrs.join(", %c") + "%c)", "color: #f00", "color: #0f0", "color: #00f", "color: #00f", "color: #000", "color: #f00", "color: #0f0", "color: #00f", "color: #00f", "color: #000");
	}, ask: function (label, callback) { //Ask something to the user
		Sys.in.recording = true;
		Essence.say((label || "Is there a problem") + " ? (please type in the window and not the console)", "quest");
		while ($G["lastKeyPair"][1] != 96 /*$G["lastKeyPair"][1] != 13*/ && $G["lastKeyPair"][1] != 10) {//Quits on enter and `
			//Essence.say("waiting for an enter");
		}
		alert("OUT !!");
		Sys.in.recording = false;
		if(callback) callback(Sys.in.data.join(""));
		return Sys.in.data.join("");
	}
};

/**
 * @description Globals won't be globals !!
 * @type {{t1: Date, t2: number, t: null, lastKeyPair: Array}}
 */
var $G = {
	t1: new Date(),
	t2: 0,
	t: null,
	lastKeyPair: []
};

Essence.global = $G;

/**
 * @description Element selector
 * @param {string} selector A valid CSS selector
 * @returns {Element} Element
 */
var $e = function (selector) { //THE selector !!
	return new Element(selector)
};

/**
 * @description Element
 * @param {string} selector A valid CSS selector
 * @this Element
 * @returns {Element} Element object
 * @constructor
 */
function Element (selector) { //The element object
	if (/^([#\.\* _-`~&]\W*|\S|undefined|null|)$/.test(selector)) throw new InvalidParamError("Element cannot accept the selector '" + selector + "' as it's invalid."); //Reject invalid selectors
	if (selector[0] === "#") this.node = document.querySelector(selector) || document.getElementById(selector.slice(1, selector.length)); //Id
	else if (selector[0] === ".") this.node = document.querySelector(selector) || document.getElementByClassName(selector.slice(1, selector.length)); //Class
	else if (selector[0] === "*") this.node = document.querySelectorAll(selector.slice(1, selector.length)) || document.getElementsByTagName(selector.slice(1, selector.length)); //Node array
	else this.node = document.querySelector(selector);

	this.val = function (getHTML, withTags) { //Get the value of the element's node
		if (isType(this.node, "Array")) {
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

	this.isEmpty = function () { //Check if the value is empty/non-existent
		return this.val() === false || this.val() === undefined || this.val() === null || this.val() === "" || this.val() === [] || this.val() === {}
	};
	
	this.write = function (nval, parseToHTML, incTags) { //Assign #nval as the value of the element's node
		if (isType(this.node, "Array")) {
			for (var i = 0; i < this.node.length; i++) {
				if (this.node[i].value && !parseToHTML && !incTags) this.node[i].value = isType(nval, "Array")? nval[i]: nval;
				else if (this.node[i].innerHTML && parseToHTML && !incTags) this.node[i].innerHTML = isType(nval, "Array")? nval[i]: nval;
				else if (this.node[i].innerText && !parseToHTML && !incTags)this.node[i].innerText = isType(nval, "Array")? nval[i]: nval;
				else if (this.node[i].outerHTML && !parseToHTML && incTags) this.node[i].outerHTML = isType(nval, "Array")? nval[i]: nval;
				else this.node[i].value? (this.node[i].value = isType(nval, "Array")? nval[i]: nval): (this.node[i].innerText = isType(nval, "Array")? nval[i]: nval);
			}
		}
		
		if (this.node.value && !parseToHTML && !incTags) this.node.value = nval;
		else if (this.node.innerHTML && parseToHTML && !incTags) this.node.innerHTML = nval;
		else if (this.node.innerText && !parseToHTML && !incTags) this.node.innerText = nval;
		else if (this.node.outerHTML && incTags && !parseToHTML) this.node.outerHTML = nval;
		else this.node.value? this.node.value = nval: this.innerText = nval;
	};

	this.before = function (nval, parseToHTML, incTags) { //Write before (like a string/code unshift)
		if (isType(this.node, "Array")) {
			for (var i = 0; i < this.node.length; i++) {
				if (this.node[i].value && !parseToHTML && !incTags) this.node[i].value = isType(nval, "Array")? nval[i] + this.node[i].value: nval + this.node[i].value;
				else if (this.node[i].innerHTML && parseToHTML && !incTags) this.node[i].innerHTML = isType(nval, "Array")? nval[i] + this.node[i].innerHTML: nval+ this.node[i].innerHTML;
				else if (this.node[i].innerText && !parseToHTML && !incTags) this.node[i].innerText = isType(nval, "Array")? nval[i] + this.node[i].innerText: nval + this.node[i].innerText;
				else if (this.node[i].outerHTML && !parseToHTML && incTags) this.node[i].outerHTML = isType(nval, "Array")? nval[i] + this.node[i].outerHTML: nval + this.node[i].outerHTML;
				else this.node[i].value? (this.node[i].value = isType(nval, "Array")? nval[i] + this.node[i].value: nval + this.node[i].value): (this.node[i].innerText = isType(nval, "Array")? nval[i] + this.node[i].innerText: nval + this.node[i].innerText);
			}
		}
		
		if (this.node.value && !parseToHTML && !incTags) this.node.value = nval + this.node.value;
		else if (this.node.innerHTML && parseToHTML && !incTags) this.node.innerHTML = nval + this.node.innerHTML;
		else if (this.node.innerText && !parseToHTML && !incTags) this.node.innerText = nval + this.node.innerText;
		else if (this.node.outerHTML && incTags && !parseToHTML) this.node.outerHTML = nval + this.node.outerHTML;
		else this.node.value? this.node.value = nval + this.node.value: this.innerText = nval + this.innerText;
	};
	
	this.after = function (nval, parseToHTML, incTags) { //Write after (like an array push)
		if (isType(this.node, "Array")) {
			for (var i = 0; i < this.node.length; i++) {
				if (this.node[i].value && !parseToHTML && !incTags) this.node[i].value += isType(nval, "Array")? nval[i]: nval;
				else if (this.node[i].innerHTML && parseToHTML && !incTags) this.node[i].innerHTML += isType(nval, "Array")? nval[i]: nval;
				else if (this.node[i].innerText && !parseToHTML && !incTags)this.node[i].innerText += isType(nval, "Array")? nval[i]: nval;
				else if (this.node[i].outerHTML && !parseToHTML && incTags) this.node[i].outerHTML += isType(nval, "Array")? nval[i]: nval;
				else this.node[i].value? (this.node[i].value += isType(nval, "Array")? nval[i]: nval): (this.node[i].innerText += isType(nval, "Array")? nval[i]: nval);
			}
		}
		
		if (this.node.value && !parseToHTML && !incTags) this.node.value += nval;
		else if (this.node.innerHTML && parseToHTML && !incTags) this.node.innerHTML += nval;
		else if (this.node.innerText && !parseToHTML && !incTags) this.node.innerText += nval;
		else if (this.node.outerHTML && incTags && !parseToHTML) this.node.outerHTML += nval;
		else this.node.value? this.node.value += nval: this.innerText += nval;
	};
	
	this.remove = function (c, r) { //Remove the character from the string/array/number and return it with the r character as a joiner or a blank when r isn't specified
		if (isType(this.val(c, "Array"))) {
			for (var i = 0; i < this.size(); i++) {
				if (this.val()[i] == c) this.write(this.val().slice(0, i).concat(this.val().slice(i + 1, this.size())));
			}
		}
		this.write(this.val().split(c).join(r || "")); //Silent removing
	};

	this.setCSS = function (prop, val) { //Change the css property
		if (isType(this.node, "Array")) {
			for (var i = 0; i < this.node.length; i++) this.node[i].style[prop] = isType(val, "Array")? val[i]: val;
		} else this.node.style[prop] = val;
	};

	this.setStyles = function (sAndV) { //Style and vals: [style0, val0, style1, val1, ...]
		for(var i = 0; i < sAndV.length-1; i += 2) this.setCSS(sAndV[i], sAndV[i + 1]);
	};

	this.css = function (prop) { //Get the CSS property of the element's node
		if (isType(this.node, "Array")) {
			var arr = [];
			for(var i = 0; i < this.node.length; i++) arr.push(this.node[i].style[prop]);
			return arr
		}
		return this.node.style[prop]
	};

	this.hasClass = function (className) { //Check if the element's node has the specified CSS class
		if (isType(this.node, "Array")) {
			var arr = [];
			for(var i = 0; i < this.node.length; i++) arr.push(new RegExp(" " + className + " ").test(" " + this.node[i].className + " ") || new RegExp(" " + className + " ").test(" " + this.node[i][className] + " ") || this.node[i].style.clasName == className);
		}
		return new RegExp(" " + className + " ").test(" " + this.node.className + " ") || new RegExp(" " + className + " ").test(" " + this.node[className] + " ") || this.node.style.className == className
	};

	this.hasCSS = function (prop) { //Check if the element's node has the specified CSS property
		if (isType(this.node, "Array")) {
			var arr = [];
			for(var i = 0; i < this.node.length; i++) arr.push(new RegExp(" " + prop + " ").test(" " + this.node[i].style[prop] + " ") || new RegExp(" " + prop + " ").test(" " + this.node[i][prop] + " "));
		}
		return new RegExp(" " + prop + " ").test(" " + this.node.style[prop] + " ") || new RegExp(" " + prop + " ").test(" " + this.node[prop] + " ")
	};

	this.addClass = function (className) { //Add a class to the element's node
		if (isType(this.node, "Array")) {
			for (var i = 0; i < this.node.length; i++) {
				if (!this.node[i].hasClass(className)) this.node[i].className += " " + className;
			}
		} else {
			if (!this.hasClass(className)) this.node.className += " " + className;
		}
	};

	this.rmClass = function (className) { //Remove the class from the element's node
		var newClass = " " + this.node.className.replace(/[\t\r\n]/g, " ") + " ";
		if (isType(this.node, "Array")) {
			for (var i = 0; i < this.node.length; i++) {
				newClass = " " + this.node[i].className.replace(/[\t\r\n]/g, " ") + " ";
				if (this.node[i].hasClass(className)) {
					while(newClass.indexOf(" " + className + " ") >= 0) newClass = newClass.replace(" " + className + " ", " ");
					this.node[i].className = newClass.replace(/^\s + |\s + $/g, "");
				}
			}
		} else {
			if (this.hasClass(className)) {
				while(newClass.indexOf(" " + className + " ") >= 0) newClass = newClass.replace(" " + className + " ", " ");
				this.node.className = newClass.replace(/^\s + |\s + $/g, "");
			}
		}
	};

	this.toggleCSS = function (prop, params, stackLayer) { //Toggle between two or more values
		if(!stackLayer) stackLayer = 0;
		if(this.css(prop) === "" && stackLayer < 1) this.toggleCSS(prop, params, stackLayer + 1);
		if (prop === "visibility") {
			(this.css("visibility") === "visible")? this.setCSS("visibility", "hidden"): this.setCSS("visibility", "visible");
		}else if (prop === "enabled") {
			(this.css("enabled") === "enabled")? this.setCSS("enabled", "disabled"): this.setCSS("enabled", "enabled");
		}else if (!isNon(prop) && !isNon(params)) { //For color, bgcolor, opacity, font-size, ...
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
		for (var i = 0; i < evts.length; i++) {
			if (evt.normal() === evts[i]) this.node.addEventListener(evt, act, false);
		}
	};
	
	this.toString = function () {
		return "[object Element]"
	};

	this.tagName = function() { //get the enclosing tag's name
		return this.node.tagName.toLowerCase()
	};

	return this
}

/**
 * @description Element's node
 * @param {string} selector A valid CSS selector
 * @returns {HTMLElement} Element node
 */
function $n (selector) { //To get directly the node without having to use $e(selector).node
	return $e(selector).node
}

/**
 * @description Include an external file/resource as a child of the document
 * @param {string} file Filename
 * @param {string} [type="link"] Type of the file
 * @returns {undefined}
 */
function include (file, type) {
	if (!type) type = (file.indexOf(".js") > 0)? "script": "link";
	var el = document.createElement(type);
	if (type === "script") el.src = file;
	else el.href = file;
	el.type = (type === "script")? "text/javascript": "text/css";
	document.head.appendChild(el)
}

/**
 * @description Print onto something
 * @param {*} st Data to be printed
 * @param {boolean} [isHTML=false] Has to be formatted as an HTML code or not
 * @param {string} [sw="body"] Place to print $st
 * @returns {undefined}
 */
function print (st, isHTML, sw) {
	if (!sw) sw = "body";
	$e(sw).after(st, isHTML)
}

/**
 * @description Print-line onto something
 * @param {*} st Data to be printed
 * @param {string} [sw="body"] Place to print $st
 * @returns {undefined}
 */
function println (st, sw) {
	if (!sw) sw = "body";
	$e(sw).after(st + "<br />", true)
}

//DOM object modifications
/**
 * @description Name checker
 * @this Object
 * @returns {boolean} Presence of a name/title in the object
 */
Object.prototype.hasName = function () {
	return this.name !== undefined || this.title !== undefined
};

/**
 * @description Get the object's name assuming it has one
 * @this Object
 * @returns {string} Name/title of the object
 */
Object.prototype.getName = function () {
	return this.name !== undefined? this.name: this.title
};

/**
 * @description Counts how many times a character/property/number c is present in the object
 * @param {(string|number|boolean)} c Character data
 * @this Object
 * @returns {number} Number of occurrences of $c in the object
 */
Object.prototype.count = function (c) {
	var n = 0;
	for (var i = 0; i < this.length; i++) {
		if (this[i] === c) n++;
	}
	return n
};

/**
 * @description //Get all the positions of a character/property/number c
 * @param {(string|number)} c Character/property/number
 * @this Object
 * @returns {number[]} Array of positions
 */
Object.prototype.positions = function (c) {
	var pos = [];
	for (var i = 0; i < this.length; i++) {
		if (this[i] === c) pos.push(i);
	}
	return pos
};

/**
 * @description Check if an object is iteral hence if it's a string/array/object
 * @this Object
 * @returns {boolean} Iterability check result
 */
Object.prototype.isIterable = function () {
	return isType(this, "String") || isType(this, "Array") || isType(this, "Object")
};

/**
 * @description Self-destruction of the object
 * @this Object
 * @source https://Google.github.io/styleguide/javascriptguide.xml?showone=delete#delete
 * @returns {undefined}
 */
Object.prototype.delete = function () {
	this.property_ = null
};

/**
 * @description Equality check
 * @param {*} obj Object to compared to
 * @this Object
 * @returns {boolean} Equality check result
 */
Object.prototype.equals = function(obj) { //Check if obj and the current object are the same
	return this.toString() === obj.toString() || this.toLocaleString() === obj.toLocaleString()
};

/**
 * @description Multiple replacement
 * @param {Array[]} rules Rules containing (RegExp|String)/(RegExp|String) pairs
 * @this Object
 * @returns {*} Resulting object
 */
Object.prototype.multiReplace = function(rules) {
	var res = this.replace(rules[0][0], rules[0][1]);
	for (var i = 0; i < rules.length; i++) res = res.replace(rules[i][0], rules[i][1]);
	return res
};

/**
 * @description Generates an array representation of the object
 * @this Object
 * @returns {Array} Resulting array
 */
Object.prototype.toArray = function() {
	var res = [];
	for (var i in this) {
		if(this.hasOwnProperty(i)) res.push(this[i]);
	}
	return res;
};

/**
 * @description Comparison check
 * @param {*} obj Object to be compared to
 * @this Object
 * @returns {number|boolean} Comparison check result
 */
Object.prototype.compareTo = function(obj) {
	if(getType(this) != getType(obj)) return false;
	if((getType(this) === "Object" && getCustomType(this) === getCustomType(obj)) || getType(this) === getType(obj)) {
		return this.equals(obj)? 0: (this.toString() < obj.toString() || this.toLocaleString() < obj.toLocaleString())? -1: 1;
	}
};

/**
 * @description Get the first element of the array
 * @param {*} [nval] New value of the first element
 * @this Array
 * @returns {*} First element
 */
Array.prototype.first = function (nval) {
	return !isNon(nval)? this[0] = nval: this[0]
};

/**
 * @description Get the last element of the array
 * @param {*} [nval] New value of the last element
 * @this Array
 * @returns {*} Last element
 */
Array.prototype.last = function (nval) {
	return !isNon(nval)? this[this.length-1] = nval: this[this.length - 1]
};

/**
 * @description Returns the last index of the array
 * @this Array
 * @returns {number} Last index
 */
Array.prototype.lastIndex = function () {
	return this.length - 1
};

/**
 * @description Returns the middle index of the array
 * @param {boolean} [under=false] Indicates if we want the value under the virtual value
 * @this Array
 * @returns {number} Middle index
 */
Array.prototype.midIndex = function (under) {
	return under? Math.floor(this.length / 2) - 1: Math.floor(this.length / 2)
};

/**
 * @description Line of a 2D array
 * @param {number} [n=0] Index
 * @returns {Array} Line
 * @since 1.0
 * @this Array
 * @method
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
 */
Array.prototype.block = function (start, end) {
	return this.map(function (i) {
		return i.get(start, end);
	})
};

/**
 * @description Returns the values of the array that are in an even position
 * @this Array
 * @returns {Array} Array of elements
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
 */
Array.prototype.max = function (start, end) {
	var m = this[start || 0];
	if ((!start && !end) || (start === 0 && end >= this.length - 1)) for(var i = 1; i < this.length; i++) m = Math.max(m, this[i]);
	else if (start && !end) for(i = start + 1; i < this.length; i++) m = Math.max(m, this[i]);
	else for(i = start + 1; i <= end; i++) m = Math.max(m, this[i]);
	return m
};

/**
 * @description Get the median value of the array
 * @param {*} [nval] New value of the median cell
 * @this Array
 * @returns {*} Median
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
 */
Array.prototype.min = function (start, end) {
	var m = this[start || 0];
	if ((!start && !end) || (start === 0 && end >= this.length-1)) for(var i = 1; i < this.length; i++) m = Math.min(m, this[i]);
	else if (start && !end) for(i = start + 1; i < this.length; i++) m = Math.min(m, this[i]);
	else for(i = start + 1; i <= end; i++) m = Math.min(m, this[i]);
	return m
};

/**
 * @description Shuffles the array
 * @param {number} [n=this.length] Number of shuffles
 * @this Array
 * @returns {undefined}
 */
Array.prototype.shuffle = function (n) {
	for(var i = 0; i < (n || this.length); i++) swap(this, randTo(this.length - 1), randTo(this.length - 1))
};

/**
 * @description Return the length of the longest row
 * @this Array
 * @returns {number} Max length
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
 * @constructor
 */
Array.prototype.Fill2D = function (c) {
	return this.fill(new Array(this.length).fill(c))
};

/**
 * @description Remove a character/number/string from the array without affecting the initial one (it should !)
 * @param {*} c Data to remove
 * @todo Make it so that it will affect the initial array
 * @this Array
 * @returns {Array} Array after the operation
 */
Array.prototype.remove = function (c) {
	//Note: it will automatically remove undefined and it goes bunckers when trying to remove objects
	var arr = this;
	if (isType(c, "Array")) {
		for(var i = 0; i < c.length; i++) arr = arr.remove(c[i]);
		return arr;
	} else {
		for (i = 0; i < this.length; i++) {
			if (arr[i] === c) arr = arr.slice(0, i).concat(arr.slice(i + 1, arr.length));
		}
		arr = arr.map(function (x) { //Double check
			return x === c? undefined: x
		});
		if (arr.indexOf(undefined)!=-1 && arr.length > 0) {
			var w = [];
			for ( i = 0; i < arr.length; i++) {
				if (arr[i] !== undefined) w.push(isType(arr[i], "Number")? parseFloat(arr[i]): arr[i]);
			}
			arr = w;
		}
		return arr
	}
};

/**
 * @description Debug an array by displaying in the console each of its elements
 * @this Array
 * @returns {undefined}
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
 */
Array.prototype.getOccurrences = function (simplified) {
	var arr = rmDuplicates(this), res = [];
	for (var i = 0; i < arr.length; i++) res.push(arr[i] + ":" + this.count(arr[i]) + "{" + this.positions(arr[i]).toStr(true) + "}");
	if (simplified) {
		for (i = 0; i < res.length; i++) res[i] = parseInt(res[i].replace(/(?:.*?):(\d+)\{(.*?)\}/g, "$1"));
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
 */
Array.prototype.sum2d = function (start, end) {
	var s = 0;
	if ((!start && !end) || (start === 0 && end >= this.length-1)) {
		for (var i = 0; i < this.length; i++) {
			for(var j = 0; j < this[i].length; j++) s += this[i][j];
		}
	} else if (start && !end) {
		for (i = start[0]; i < this.length; i++) {
			for(j = start[1]; j < this[i].length; j++) s += this[i][j];
		}
	} else {
		for (i = start[0]; i < end[0]; i++) {
			for(j = start[1]; j < end[1]; j++) s += this[i][j];
		}
	}
	return s
};

/**
 * @description Mean of each elements
 * @param {number} [nbDec=2] Number of decimals
 * @param {number} [start=0] Starting position
 * @param {number} [end=this.length-1] Ending position
 * @returns {number} Mean
 */
Array.prototype.mean = function (nbDec, start, end) {
	if (!start) start = 0;
	if (!end) end = this.lastIndex();
	var sum = this.sum(start, end);
	return Number((sum / (this.length - start)).toNDec(nbDec)); //To avoid getting the Number object representation rather than the actual result
};

/**
 * @description Time-wise (Speedcubing) average of each times
 * @param {number} [nbDec=2] Number of decimals
 * @param {number} [start=0] Starting positions
 * @param {number} [end=this.length-1] Ending positions
 * @returns {number} Average
 */
Array.prototype.avg = function (nbDec, start, end) {
	if (!start) start = 0;
	if (!end) end = this.lastIndex();
	var sum = this.sum(start, end) - this.slice(start, end + 1).max() - this.slice(start, end + 1).min();
	return Number((sum / (this.length - 2 - start)).toNDec(nbDec))
};

/**
 * @description Variance
 * @this Array
 * @param {number} [nbDec=2] Number of decimals
 * @returns {number} Variance
 */
Array.prototype.variance = function (nbDec) {
	return (sumPow2(this, nbDec) / this.length - Math.pow(this.mean(nbDec), 2)).toNDec(nbDec)
};

/**
 * @description Standard deviation
 * @this Array
 * @param {number} [nbDec=2] Number of decimals
 * @returns {number} Standard deviation
 */
Array.prototype.stddev = function (nbDec) {
	var stdDev = Math.sqrt(this.variance(nbDec));
	return stdDev.toNDec(nbDec)
};

/**
 * @description Get a random cell of the array
 * @param {number} n Number of random elements to be returned
 * @this Array
 * @returns {*} Random element
 */
Array.prototype.rand = function (n) {
	if (n > 0) {
		var res = [];
		for (var i = 0; i < n; i++) res.push(this.rand());
		return res
	}else return this[Math.floor(randTo(this.length - 1) % this.length)]
};

/**
 * @description Quartile
 * @param {number} n Nth quartile
 * @param {number} [nbDec=2] Number of decimals
 * @this Array
 * @returns {*} Nth quartile
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
 */
Array.prototype.percentile = function (n, nbDec) { //P1, ..., P99
	return this.length % 2 === 0? ((this[Math.floor(n * this.length / 100) - 1] + this[Math.floor(n * this.length / 100)]) / 2).toNDec(nbDec): (this[Math.floor(n * this.length / 100)]).toNDec(nbDec)
};

/**
 * @description Get the average increment between the values of the array
 * @param {number} [nbDec=2] Number of decimals
 * @this Array
 * @returns {Number} Increment
 */
Array.prototype.getIncrement = function (nbDec) {
	return nbDec == 0? parseInt(((this.max() - this.min()) / (this.length - 1))): ((this.max() - this.min()) / (this.length - 1)).toNDec(nbDec)
};

/**
 * @description Increment every elements by n||1
 * @param {number} [n=1] Increment value
 * @returns {undefined}
 */
Array.prototype.increment = function (n) {
	for(var i = 0; i < this.length; i++) this[i] += n || 1
};

/**
 * @description Inter Quartile Range
 * @param {number} [nbDec=2] Number of decimals
 * @this Array
 * @returns {number} IQR
 */
Array.prototype.iqr = function (nbDec) { //Inter-Quartile Range
	return this.quartile(3, nbDec)-this.quartile(1, nbDec).toNDec(nbDec)
};

/**
 * @description Get the sub/ful-array
 * @param {number} [start=0] Starting position
 * @param {number} [end=this.length-1] Ending position
 * @this Array
 * @returns {Array} Resulting sub-array
 */
Array.prototype.get = function (start, end) {
	var res = [];
	if (start < 0 && !end) {
		end = start;
		start = 0;
	}
	if (end < 0) end = this.length + end - 1;
	for(var i = (start || 0); i <= (end || this.length-1); i++) res.push(this[i]);
	return res.remove()
};

/**
 * @description QuickSort adapted from https://Www.nczonline.net/blog/2012/11/27/computer-science-in-javascript-quicksort/
 * @param {number} left Left position
 * @param {number} right Right position
 * @this Array
 * @returns {Array} Sorted array
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
		if (left < i-1) this.quickSort(left, i-1);
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
 * @param {string|boolean} order Sorting order
 * @this Array
 * @returns {Array} Sorted array
 */
Array.prototype.bubbleSort = function (order) {
	var arr = this, j = 1, s = true;
	if (isNon(order) || isType(order, "String") && order[0].toLowerCase() === "a") {
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
						//s = true;
					}
				}
			}
			j++;
		}
	}else if (order === 1 || isType(order, "String") && order[0].toLowerCase() === "d") { //Descending order
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
						//s = true
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
 */
Array.prototype.maxSort = function () {
	//Ignores repeated values and loose data
	var mn = this.min(), med = this.median(), mx = this.max(), res = new Array(this.length), inc = this.getIncrement(3), q1 = this.quartile(1), q3 = this.quartile(3);
	//Pre-sort some elements
	res[0] = mn;
	res[res.length-1] = mx;
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
 * @description Set sort
 * @this Array
 * @returns {Array} New array
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
 */
Array.prototype.clean = function (noDuplic) { //Remove undesirable items
	var arr = [], j = 0;
	for (var i = 0; i < this.length; i++) {
		if (!isNon(this[i])) arr[j++] = this[i];
	}
	return noDuplic? rmDuplicates(arr).remove(undefined): arr; //Take off (or not) duplicates of actual values and double clean it
};

/**
 * @description eXtreme cleaning of the array
 * @this Array
 * @returns {Array} Cleaned array
 */
Array.prototype.xclean = function () {
	return this.clean(true).remove([undefined, "undefined", null, "null"]) 
};

/**
 * @description Substitute every elements from $s to $e with from $s to $e of the array $arr
 * @param {Array} arr Array
 * @param {number} [s=0] Starting position
 * @param {number} [e=this.length-1] Ending position
 * @this Array
 * @returns {Array} Modified array
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
 */
Array.prototype.numElm = function () {
	return this.linearise().length
};

/**
 * @description Size of the array
 * @param {boolean} [str=false] String format or not
 * @this Array
 * @returns {string|number[]} Size
 */
Array.prototype.size = function (str) { //Get the w * h size of the array
	return str? this.length + "x" + this.maxLength(): [this.length, this.maxLength()]
};

/**
 * @description Determinant of the matrix
 * @this Array
 * @returns {number} Determinant
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
 */
Array.prototype.translate = function () {
	if (this.size()[0] === this.size()[1]) { //NxN
		for (var i = 0; i < Math.round(this.length/2); i++) {
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
 */
Array.prototype.divide = function (n) {
	var res = new Array(Math.round(this.length/n)).fill(""), k = 0;
	for (var i = 0; i < res.length; i++) {
		for(var j = 0; j < n; j++) res[i] += this[k++];
	}
	return res
};

/**
 * @description Adjoint of the matrix
 * @this Array
 * @returns {Array} Adjoint matrix
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
 */
Array.prototype.isInvertible = function() {
	return this.det() != 0
};

/**
 * @description Dot product
 * @param {number} a Scalar
 * @this Array
 * @returns {Array} Resulting array
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
 * @returns {Array} Resulting array
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
 */
Array.prototype.dotSub = function (a, order) {
	var res = [];
	order = order.toLowerCase().remove(" ");
	for (var i = 0; i < this.length; i++) {
		res[i] = [];
		for(var j = 0; j < this[i].length; j++) res[i][j] = (order === "a-b")? a-this[i][j]: this[i][j]-a;
	}
	return res
};

/**
 * @description Dot Fraction
 * @param {number} a Scalar
 * @param {string} order Order
 * @returns {Array} Resulting array
 */
Array.prototype.dotFrac = function (a, order) {
	var res = [];
	order = order.toLowerCase().remove(" ");
	for (var i = 0; i < this.length; i++) {
		res[i] = [];
		for(var j = 0; j < this[i].length; j++) res[i][j] = (order === "a/b")? a/this[i][j]: this[i][j]/a;
	}
	return res
};

/**
 * @description String[]([]) to String
 * @param {boolean} [clean=false] Clean output
 * @this Array
 * @returns {string} String representation
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
 * @returns {Array} Inverse
 * @see Array.prototype.isInvertible
 */
Array.prototype.inv = function () {
	return this.isInvertible()? this.dotProd(1/this.det(), this.getAdjoint()): false;
};

/**
 * @description Mix up the array
 * @this Array
 * @returns {Array} Mixed array
 */
Array.prototype.mix = function () { //Mix up the array
	var randPos = mixedRange(0, 1, this.length - 1), res = [];
	for (var i = 0; i < this.length; i++) res[i] = this[randPos[i]];
	return res
};

/**
 * @description Few mixes
 * @this Array
 * @returns {Array} Mixed array
 */
Array.prototype.littleMix = function() {
	var res = [], ic;
	if (is2dArray(this)) {
		res = copy(this).linearise();
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
 * @description Push that adds elements of an array instead of the array itself
 * @this Array
 * @param {Array} arr Array used to append
 * @returns {Array} New array
 */
Array.prototype.append = function (arr) {
	for (var i = 0; i < arr.length; i++) this.push(arr[i])
	return this;
};

/**
 * @description Unshift that adds element of an array instead of the array itself
 * @this Array
 * @param {Array} arr Array used to prepend
 * @returns {Array} New array
 */
Array.prototype.prepend = function (arr) {
	for (var i = 0; i < arr.length; i++) this.unshift(arr[i])
	return this;
};

/**
 * @description List of unique elements of the array
 * @this Array
 * @returns {Array} Array of unique elements
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
 */
Array.prototype.to1d = function (jointer) {
	var res = this;
	for(var i = 0; i < res.length; i++) res[i] = res[i].join(jointer || "");
	return res
};

/**
 * @description 1D array to N-D array
 * @param {number} n Dimension
 * @this Array
 * @returns {Array} Resulting N-D array
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
 */
Array.prototype.linearise = function() {
	return this.toString().split(",");
};

/**
 * @description Ensure that all the elements are of the same length
 * @param {string|number} cr Filler
 * @returns {Array} Uniformed array
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
 * @see Array.prototype.unzip
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
	return res.length<this.length? res: this; //Make sure that the compressed array isn't longer than the initial one
};

/**
 * @description Unzip the array
 * @param {boolean} [noPairs=false] Keep pairs or not ?
 * @this Array
 * @returns {Array} Unzipped array
 * @see Array.prototype.zip
 */
Array.prototype.unzip = function (noPairs) {
	var res = [];
	for (var i = 0; i < this.length; i++) {
		if (/[\S\s](\@)(\d + )/g.test(this[i])) res.push(this[i][0].repeat(this[i][this[i].indexOf("@") + 1]));
		else res.push(this[i]);
	}
	return noPairs? res.join("").split(""): res;
};

/**
 * @description Trim the array
 * @param {string|boolean} side Side
 * @this Array
 * @returns {Array} res Trimed array
 */
Array.prototype.trimAll = function(side) { //Trimes every elements
	var res = [];
	side = side? side[0].toLowerCase(): "";
	for (var i = 0; i < this.length; i++) res[i] = (side === "l")? this[i].trimLeft(): ((side === "r")? this[i].trimRight(): this[i].trim());
	return res
};

/**
 * @description Sorted state check
 * @this Array
 * @returns {boolean} Sorted or not
 */
Array.prototype.isSorted = function() { //Check if the array is sorted
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
 */
Array.prototype.uniquePush = function(obj) { //Post-init duplicate safe push
	if (isType(obj, "Array")) {
		for (var i = 0; i < obj.length; i++) {
			if (this.indexOf(obj[i]) === -1) this.push(obj[i]);
		}
	} else if (this.indexOf(obj) > -1) throw "the object " + obj.toString() + "is already present in " + this.toString();
};

/**
 * @description Replace all occurrences of $str instead of just the first one
 * @param {string|number} str String/number
 * @param {string|number} nstr New string/number
 * @returns {Array|string} Result
 */
Array.prototype.replaceAll = function(str, nstr) {
	var res = this.replace(str, nstr), i = 0;
	while (res.indexOf(str) > -1 || i === this.length) {
		res = this.replace(str, nstr);
		i++;
	}
	return res;
};

/**
 * @description Neighbour check
 * @param {number|number[]} y Row number
 * @param {number|number[]} x Column number
 * @returns {Array} Neighbours
 */
Array.prototype.neighbour = function(y, x) {
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
				if(!isNon(this[y + seq[i][0]][x + seq[i][1]])) n.push(this[y + seq[i][0]][x + seq[i][1]]);
			} catch (e) {
				/* no-empty disabled */
			}
		}
	} else {
		try {
			if(!isNon(this[y - 1])) n.push(this[y - 1]);
			if(!isNon(this[y + 1])) n.push(this[y + 1]);
		} catch (e) {
			/* no-empty disabled */
		}
	}
	return n;
};

/**
 * @description Make sure all the cells are of the right type
 * @param {string} type Type
 * @this Array
 * @returns {Array} Sanitised array
 */
Array.prototype.sanitise = function(type) {
	for (var i = 0; i < this.length; i++) {
		for (var j = 0; j < this[i].length; j++) this[i][j] = name2type(type, this[i][j]);
	}
	return this;
};

/**
 * @description Remove the character $c from the string
 * @param {string} c Character
 * @this String
 * @returns {string} Resulting string
 */
String.prototype.remove = function (c) { //Remove c from the string
	var str = this;
	if (isType(c, "Array")) {
		for(var i in c) {
			if(c.hasOwnProperty(i)) str = str.remove(i);
		}
	} else {
		var v = str.split(c).map(function (x) {
			return x === c? undefined: x
		}).join("");
		return (v.indexOf(undefined) != -1)? str.remove(): v
	}
};

/**
 * @description to N digits
 * @param {number} [n=2] Number of digits
 * @this String
 * @returns {String} Resulting string
 */
String.prototype.toNDigits = function (n) {
	var i = this;
	n = n || 2;
	if (parseFloat(i) < Math.pow(10, n-1)) {
		while(i.split(".")[0].length < n) i = "0" + i;
	}
	return i
};

/**
 * @description Mix the string
 * @param {string} separator Separation character
 * @param {string} jointer Joining character
 * @this String
 * @returns {string} Mixed string
 */
String.prototype.mix = function (separator, jointer) {
	separator = isNon(separator)? "": separator;
	jointer = !jointer? separator: jointer;
	var randPos = mixedRange(0, 1, this.length - 1), iStr = this.split(separator), fStr = [];
	for(var i = 0; i < this.length; i++) fStr[i] = iStr[randPos[i]];
	return fStr.join(jointer)
};

/**
 * @description Divide the string into n-sized chunks
 * @this String
 * @param {number} n Number of chunks
 * @returns {string[]} Divided string
 */
String.prototype.divide = function (n) {
	var res = new Array(Math.round(this.length/n)).fill(""), k = 0;
	for (var i = 0; i < res.length; i++) {
		for(var j = 0; j < n; j++) res[i] += this[k++];
	}
	return res
};

/**
 * @description Capitalize the first letter(s)
 * @param {boolean} whole Every words or just the first one
 * @this String
 * @returns {string} String
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
 */
String.prototype.normal = function () {
	return this.toLowerCase().remove(" ")
};

/**
 * @description Get the occurrences of each characters as well as their positions
 * @type {Array.getOccurrences|*}
 * @see Array.prototype.getOccurrences
 * @returns {undefined}
 */
String.prototype.getOccurrences = Array.prototype.getOccurrences;

/**
 * @description Get a portion of the string
 * @param {number} [start=0] Starting position
 * @param {number} [end=this.length-1] Ending position
 * @this String
 * @returns {string} Resulting string
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
 * @see String.prototype.unzip
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
 * @see String.prototype.zip
 */
String.prototype.unzip = function (noPairs) { //Decompress the string (when being compressed using String.zip()) with(out) pairs
	var res = "";
	for (var i = 0; i < this.length; i++) {
		if (/[\S\s](\@)(\d + )/g.test(this[i])) res += this[i][0].repeat(this[i][this[i].indexOf("@") + 1]);
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
 */
String.prototype.replaceAll = function(str, nstr, sep) {
	var res = sep? this.split(sep).replace(str, nstr) : this.replace(str, nstr), i = 0;
	if (sep === "") return this.replace(RegExpify(str), nstr); //Avoid the infinite loop caused by sep = ""
	while (res.indexOf(str) > -1 || i === this.length) { //Look up the occurrences until there's none of them left or the interpreter reached the end
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
 */
String.prototype.chunk = function (start, end) {
	return this.split(" ").get(start, end).join(" ");
};

/**
 * @description Length of the number
 * @this Number
 * @returns {number|number[]} Length
 */
Number.prototype.length = function () {
	if (String(this).indexOf(".") > -1) return [parseInt(String(this).split(".")[0].length), parseInt(String(this).split(".")[1].length)];
	var l = 0, x = this;
	while (Math.floor(x) != 0) {
		x /= 10;
		l++;
		//console.log(x);
	}
	return l
};

/**
 * @description A FP fixing that preserve the number format
 * @param {number} n Number of decimals
 * @this Number
 * @returns {number} Floating point number
 */
Number.prototype.toNDec = function (n) { //A bit like .toFixed(n) and .toPrecision(n) but returning a double instead of a string
	var pow10s = Math.pow(10, n || 2);
	return (n)? Math.round(pow10s * this) / pow10s: this
};

/**
 * @description Keep a fixed amount of unit digits
 * @param {number} n Number of digits
 * @returns {string} New number
 */
Number.prototype.toNDigits = function (n) { //Get the number to be a n-digit number
	var i = this + ""; //Because it won't work with other types than strings
	n = n || 2;
	if (parseFloat(i) < Math.pow(10, n - 1)) {
		while (i.split(".")[0].length < n)  i = "0" + i;
	}
	return i
};

/**
 * @description Sign of the number
 * @param {boolean} str Symbols string representation ?
 * @returns {string|number} Sign
 */
Number.prototype.sign = function (str) { //Get the sign of the number
	return str? (this < 0? "-": (this > 0? " + ": "")): (this < 0? -1: (this > 0? 1: 0))
};

/**
 * @description Prime check
 * @param {number} n Number to check in relation
 * @returns {boolean} Prime check result
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
 */
Number.prototype.clean = function (nbDec) {
	if (this == 0) return 0;
	else if (this > 0 && this[0] == "+") return nbDec? this.slice(1, this.length).toNDec(nbDec): this.slice(1, this.length);
	else if (this == "-") return this + 1;
	else if (this == "+") return 1;
	else return nbDec? this.toNDec(nbDec): this
};

/**
 * @description Number to Number[]
 * @returns {Number[]} Number array
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
 * @description Inheritance
 * @param {*} parentClassOrObj Parent
 * @returns {Function} this Current function/constructor
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
 * @description Removes an external ressource
 * @param {string} file File name
 * @param {string} [type="link"] Type of the file
 * @returns {undefined}
 */
function exclude (file, type) {
	if (!type) type = (file.indexOf(".js")>0)? "script": "link";
	var el = document.createElement(type);
	if (type === "script") el.src = file;
	else el.href = file;
	el.type = (type === "script")? "text/javascript": "text/css";
	document.head.removeChild(el)
}

/**
 * @description Temporarily add meta-data to the page
 * @param {string} n Name
 * @param {string|number} ctt Content
 * @param {boolean} httpe HTTP Equiv specified ?
 * @returns {undefined}
 */
function addMetaData (n, ctt, httpe) {
	var el = document.createElement("meta");
	httpe? el.httpEquiv = httpe: el.name = n;
	el.content = ctt;
	document.head.appendChild(el)
}

/**
 * @description Exclusive or
 * @param {*} a Expression a
 * @param {*} b Expression b
 * @returns {boolean} Result
 */
function xor (a, b) {
	return (a && !b) || (!a && b)
}

/**
 * @description Disable right clicks
 * @returns {undefined}
 */
function noRightClick () {
	document.oncontextmenu = new Function("return false")
}

/**
 * @description Reloads the page
 * @param {number} [lvl==0] Level of reloadness
 * @returns {undefined}
 */
function reloadPage (lvl) { //Reload the page with 2 different level of reload
	if (lvl === 2) location.href = window.location.href; //Update the hyper reference of the window's location
	else location.reload(); //Reload the location of the window (implying lvl = 0||1)
}

/**
 * @description Redirect to somewhere
 * @param {string} to Place to be redirected to
 * @param {number} [dt=3e3] Time delay
 * @param {string} divId Id of the element to be used to inform the user about what's going on
 * @returns {undefined}
 */
function redirect (to, dt, divId) { //Redirect to #to in #dt ms
	if (!dt) dt = 3e3; //If dt hasn't an assign value so it will assign a default one
	var s = Math.floor(dt/1e3); //Convert from ms to s
	$e("#" + divId).write("<h2>Redirecting to <ins>" + to + "</ins> ...<br />in <span id=\'timeleft\'>" + s + "</span>s</h2>", true); //Write the Redirecting message to the screen
	s--; //Countdown
	$e("#timeleft").write(s);
	setTimeout("location = '" + to + "';", dt); //Set the timeout for the redirection
}

/**
 * @description Validity check
 * @param {string} txt Text
 * @param {string} type Type
 * @returns {boolean} Validity check result
 */
function isValid (txt, type) {
	var pattern, lenOK = true;
	switch (type.toLowerCase()) {
		case "email":
			pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //From SO
			lenOK = txt.length >= 9 && txt.length < 64;
			break;
		case "tel":
			pattern = /^\+(?:[0-9]?){6,14}[0-9]$/; //From somewhere
			break;
		case "username":
			pattern = /^[A-Za-z_0-9-]+$/;
			lenOK = txt.length > 3 && txt.length <= 16;
			break;
		case "name":
			pattern = /^[A-Za-z-]{2,35}$/;
			break;
		case "price":
			pattern = /^[0-9]*\x2e[0-9]{2}$/;
			lenOK = txt.length > 3;
			break;
		case "number":
			pattern = /\d/; // /^(\x2d|)[0-9] * $/ wouldn't accept floats
			break;
		case "date":
			pattern = /(\d{1,2}\/d{1,2}\/d{2,4})/; // /^([0-9]{2}\x2f){2}\x2f([0-9]{2}|[0-9]{4})$/; //Accept d/m/y*
			lenOK = txt.split("/")[1] <= 12 && txt.split("/")[0] <= 31;
			break;
		case "hex":
			pattern = /(#|0x)?([A-Fa-f0-9]){3}(([A-Fa-f0-9]){3})?/; //From CheatSheets (iOS)
			break;
		case "tag": //From CheatSheets (iOS)
			pattern = /(<(\/?[^>]+)>)/;
			break;
		case "password":
			pattern = /|^\c]\w{8,}/;
			break;
		case "file":
			pattern = /^[\S]+([A-Za-z0-9_]*\.(jpg|png|gif|ico|bmp))$/;
			break;
		case "variable":
			pattern = /^[A-Za-z_$]+[0-9]*[A-Za-z_$]*$/;
			break;
		case "color":
			pattern = /^(#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6}))|(rgb\(([0-9]+,\s){2}([0-9]+)\))|(rgba\(([0-9]+,\s){3}((0|1|)\.[0-9]*)\))|(hsl\(([0-9]+,\s){2}([0-9]+)\))|(hsla\(([0-9]+,\s){3}((0|1|)\.[0-9]*)\))$/;
			break;
		case "url":
			pattern = /^((http(|s):\/\/)|((file|ftp):\/\/\/))(\/[A-Za-z0-9_-]*)|[A-Za-z0-9_-]$/;
			break;
		case "ip":
			pattern = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/; //From http://code.tutsplus.com/tutorials/8-regular-expressions-you-should-know--net-6149
			break;
		case "time":
			pattern = /^[0-5][0-9](\x3a|\.)[0-5][0-9]|([0-5][0-9]\x3a[0-5][0-9]){0,2}(\x3a|\.)[0-5][0-9]$/;
			break;
		default: pattern = /\w/;
	}
	return pattern.test(txt) && lenOK
}

/**
 * @description Validation check on a form
 * @param {node} fm Form
 * @param {boolean} [ignoreRequired=false] Ignored the required attribute
 * @returns {boolean} Validation check
 * @see isValid
 */
function validate (fm, ignoreRequired) { //Check if a form is valid
	if (!fm) fm = document.forms[0];
	var valid = true;
	for (var i = 0; i < fm.length; i++) {
		if (ignoreRequired || fm[i].required) {
			//Missing: select, datetime, datetime-local, time, month, range, search, week, url
			if (fm[i].name === "username" || fm[i].name === "price") valid = valid && isValid(fm[i].value, fm[i].name);
			else if (fm[i].type === "password" || fm[i].type === "email" || fm[i].type === "tel" || fm[i].type === "date" || fm[i].type === "hex" || fm[i].type === "variable" || fm[i].type === "file" || fm[i].type === "hidden") valid = valid && isValid(fm[i].value, fm[i].type);
			else if (fm[i].name === "price") valid = valid && isValid(fm[i].value, fm[i].name);
			else if (fm[i].name.indexOf("name") >= 0) valid = valid && isValid(fm[i].value, "name");
			else if (fm[i].type === "checkbox" && fm[i].checked) valid = valid && true;
			else valid = valid && !isNon(fm[i].value); //Radio,
		}
	}
	return valid
}

/**
 * @description Type check
 * @param {*} obj Object
 * @param {string} type Type
 * @returns {boolean} Type check result
 * @see getType
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
 * @see getCustomType
 */
function isCustomType (obj, type) { //Same as isType but for custom types
	return getCustomType(obj).toLowerCase() === type.toLowerCase()
}

/**
 * @description Type getter
 * @param {*} obj Object
 * @param {boolean} [preserve=false] Preserve the format
 * @returns {string} Type
 */
function getType (obj, preserve) { //Only works for native types. preserve would leave the [object type]
	var t = Object.prototype.toString.call(obj);
	return preserve? t: t.split(" ")[1].slice(0, t.split(" ")[1].length-1)
}

/**
 * @description Custom type getter
 * @param {*} obj Object
 * @param {boolean} [preserve=false] Preserve the format
 * @returns {string} Custom type
 */
function getCustomType (obj, preserve) { //Same as getType but for custom types which won't work for native types
	var t = obj.toLocaleString();
	if (t.indexOf("[") > -1) return preserve? t: t.split(" ")[1].slice(0, t.split(" ")[1].length - 1); //[object Type]
	else return t.split("(")[0].trim()
}

/**
 * @description 2D array check
 * @param {*} obj Object
 * @returns {boolean} 2D array check resul
 * @see isType
 */
function is2dArray (obj) { //Check if an array has 2 dimensions (nxm matrix)
	if (isType(obj, "Array")) {
		for (var i = 0; i < obj.length; i++) {
			if (isType(obj[i], "Array")) return true
		}
	} else return false
}

/**
 * @description Converts $n "times" to an appropriate formulation
 * @param {number} n Number
 * @returns {string} Literal
 */
function timesLiteral (n) {
	switch (n) {
		case 1: return "once";
		case 2: return "twice";
		default: return n + " times";
	}
}

/**
 * @description Convert an array into a human string
 * @param {Array} arr Array
 * @param {string} [cjt="and"] Conjunctions
 * @returns {string} Literal
 */
function arrayLiteral (arr, cjt) {
	return arr.length > 1? arr.get(-1).toStr(true) + " " + (cjt || "and") + " " + arr.last(): arr[0];
}

/**
 * @description Get the HTML equivalent of the string
 * @param {string} str String
 * @returns {XML|string} HTML equivalent
 * @see escapeHTML
 */
function escapeHTML (str) {
	var span = document.createElement("span");
	span.appendChild(document.createTextNode(str));
	return span.innerHTML
}

/**
 * @description Get the string equivalent of the HTML code
 * @param {string} code HTML code
 * @returns {string} String equivalent
 * @see unescapeHTML
 */
function unescapeHTML (code) {
	var span = document.createElement("span");
	span.innerHTML = code;
	return span.innerText;
}

/**
 * @description Check if $val is nothing/empty
 * @param {*} val Value
 * @returns {boolean} Voidness/emptiness result
 */
function isNon (val) {
	return (val === false || val === undefined || val === null || val === "" || val === [] || val === {})
}

/**
 * @description Returns a copy of an element in order to do mutation-safe operations with it
 * @param {*} el Element
 * @returns {*} Copy of $el
 */
function copy (el) {
	if (isType(el, "String") || isType(el, "Number") || isType(el, "Boolean"))return el;
	var clone = {};
	for (var i in el) {
		if (el.hasOwnProperty(i)) clone[i] = el[i];
    }
	return isType(el, "Array") ? clone.toArray() : clone;
}

/**
 * @description Resize the window to maximum size of the client/screen/device with the support of ActiveX, Java (mainly Processing) and VBS
 * @returns {undefined}
 */
function toMaxSize () {
	try {
		if (clientWidth || ActiveX || ActiveXObject) window.resizeTo(clientWidth, clientHeight);
		else if (client.Width) window.resizeTo(client.Width, client.Height);
		else if (client.width) window.resizeTo(client.width, client.height);
		else if (clientX) window.resizeTo(clientX, clientY);
		else if (client.X) window.resizeTo(client.X, client.Y);
		else if (client.x) window.resizeTo(client.x, client.y);
		else if (screenWidth) window.resizeTo(screenWidth, screenHeight);
		else if (screen.Width) window.resizeTo(screen.Width, screen.Height);
		else if (screen.width) window.resizeTo(screen.width, screen.height);
		else if (screenX) window.resizeTo(screenX, screenY);
		else if (screen.X) window.resizeTo(screen.X, screen.Y);
		else if (screen.x) window.resizeTo(screen.x, screen.y);
		else if (deviceWidth) window.resizeTo(deviceWidth, deviceHeight);
		else if (device.Width) window.resizeTo(device.Width, device.Height);
		else if (device.width) window.resizeTo(device.width, device.height);
		else if (deviceX) window.resizeTo(deviceX, deviceY);
		else if (device.X) window.resizeTo(device.X, device.Y);
		else if (device.x) window.resizeTo(device.x, device.y);
		else if (pageWidth) window.resizeTo(pageWidth, pageHeight);
		else if (page.Width) window.resizeTo(page.Width, page.Height);
		else if (page.width) window.resizeTo(page.width, page.height);
		else if (pageX) window.resizeTo(pageX, pageY);
		else if (page.X) window.resizeTo(page.X, page.Y);
		else if (page.x) window.resizeTo(page.x, page.y);
		else if (windowWidth) window.resizeTo(windowWidth, windowHeight);
		else if (window.Width) window.resizeTo(window.Width, window.Height);
		else if (window.width) window.resizeTo(window.width, window.height);
		else if (windowX) window.resizeTo(windowX, windowY);
		else if (window.X) window.resizeTo(window.X, window.Y);
		else if (window.x) window.resizeTo(window.x, window.y);
		else if (monitorWidth) monitor.resizeTo(monitorWidth, monitorHeight);
		else if (monitor.Width) monitor.resizeTo(monitor.Width, monitor.Height);
		else if (monitor.width) monitor.resizeTo(monitor.width, monitor.height);
		else if (monitorX) monitor.resizeTo(monitorX, monitorY);
		else if (monitor.X) monitor.resizeTo(monitor.X, monitor.Y);
		else if (monitor.x) monitor.resizeTo(monitor.x, monitor.y);
		else if (frameWidth) frame.resizeTo(frameWidth, frameHeight);
		else if (frame.Width) frame.resizeTo(frame.Width, frame.Height);
		else if (frame.width) frame.resizeTo(frame.width, frame.height);
		else if (frameX) frame.resizeTo(frameX, frameY);
		else if (frame.X) frame.resizeTo(frame.X, frame.Y);
		else if (frame.x) frame.resizeTo(frame.x, frame.y);
		else throw new Error("It's not possible to maximise the size or you need to do more researches.");
	} catch(e) {
		Essence.say("An error occurred when trying to maximise the size Because of %c" + e, "err", "text-decoration: underline;");
	}
}

/**
 * @description Dimension of the screen
 * @returns {number[]} Screen dimensions
 */
function getScreenDim () {
	return [screen.width, screen.height]
}

/**
 * @description Dimension of the window
 * @returns {number[]} Window dimensions
 */
function getWinDim () {
	return [screen.availWidth, screen.availHeight]
}

/**
 * @description Gather the cookie named $c_name
 * @param {string} c_name Cookie name
 * @returns {string|undefined} Cookie
 * @see setCookie
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
 */
function setCookie (c_name, value, exdays) {
	exdays = exdays ? exdays % 0x5f5a081 : 0x5f5a080; //As 99983488 is the maximum value
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value = encodeURIComponent(value) + ((exdays === null) ? "" : "; expires = " + exdate.toUTCString());
	document.cookie = c_name + "=" + c_value
}

/**
 * @description Get the meta-data of the current page
 * @returns {string[]} Name and content results
 */
function getMetaData () {
	var md = $n("*meta"), resN = [], resC = [];
	for (var i = 0; i < md.length; i++) {
		resN[i] = md[i].name || md[i].httpEquiv || md[i].title;
		resC[i] = md[i].content || md[i].value;
	}
	return [resN, resC]
}

/**
 * @description Get all the resources of a page apart from the in-CSS ones
 * @param {boolean} rmEmpty Flag to remove empty resources from the list
 * @todo Maybe some specifications to filter up ? And also more info about those resources
 * @returns {Array} Resources
 */
function getResources (rmEmpty) {
	var links = $n("*link"), scripts = $n("*script"), stylesheets = $n("*style"), rsc = [], hypertxt = $n("*a"), img = $n("*img"), btnImg = $n("*input image"),
	inCSS = [$n("*div"), $n("*section"), $n("*td"), $n("*th"), $n("*li")];
	for (var i = 0; i < links.length; i++) {
		if (!isNon(links[i])) rsc[i] = links[i].href;
		Essence.say(links[i].href.split("/")[links[i].href.split("/").length - 1] + " has been added to the resources getter.", "info");
	}
	for (i = 0; i < scripts.length; i++) {
		if (!isNon(scripts[i])) rsc.push(scripts[i].src);
		Essence.say(scripts[i].src.split("/")[scripts[i].src.split("/").length - 1] + " has been added to the resources getter.", "info")
	}
	for (i = 0; i < stylesheets.length; i++) {
		if (!isNon(stylesheets[i])) rsc.push(stylesheets[i].src);
		Essence.say(stylesheets[i].src.split("/")[stylesheets[i].src.split("/").length - 1] + " has been added to the resources getter.", "info")
	}
	for (i = 0; i < hypertxt.length; i++) {
		if (!isNon(hypertxt[i])) rsc.push(hypertxt[i].href);
		Essence.say(hypertxt[i].href.split("/")[hypertxt[i].href.split("/").length - 1] + " has been added to the resources getter.", "info")
	}
	for (i = 0; i < img.length; i++) {
		if (!isNon(img[i])) rsc.push(img[i].src);
		Essence.say(img[i].src.split("/")[img[i].src.split("/").length - 1] + " has been added to the resources getter.", "info")
	}
	for (i = 0; i < btnImg.length; i++) {
		if (!isNon(btnImg[i])) rsc.push(btnImg[i].src);
		Essence.say(btnImg[i].src.split("/")[btnImg[i].src.split("/").length - 1] + " has been added to the resources getter.", "info")
	}
	for (i = 0; i < inCSS.length; i++) {
		for (var j = 0; j < inCSS[i].length; j++) {
			rsc.push(inCSS[i][j].style.backgroundImage.slice(4, inCSS[i][j].style.backgroundImage.length - 1));
			var x = inCSS[i][j].style.backgroundImage.slice(4, inCSS[i][j].style.backgroundImage.length - 1);
			Essence.say(x.split("/")[x.split("/").length - 1] + " has been added to the resources getter.", "info");
		}
	} //Remove or not unnecessary cells with a double check for one.
	Essence.say("Resource list: " + rsc.clean());
	return rmEmpty? rsc.clean(): rsc
}

/**
 * @description Get the list of scripts
 * @param {boolean} [asList=false] Result should be a list or an object
 * @returns {*} List/dictionary of scripts
 */
function gatherScripts (asList) { //Sort of getResources() but dedicated to only scripts and easier to use
	var $s = $n("*script"), res = asList? []: {};
	for(var i = 0; i<$s.length; i++) asList? res.push($s[i].src): res[$s[i].src.split("/")[$s[i].src.split("/").length - 1]] = $s[i].src;
	return res
}

/**
 * @description Get the list of stylesheets
 * @param {boolean} [asList=false] Result should be a list or an object
 * @returns {*} List/dictionary of stylesheets
 */
function gatherStylesheets (asList) {
	var $l = $n("*link"), res = asList? []: {};
	for(var i = 0; i<$l.length; i++) asList? res.push($l[i].href): res[$l[i].href.split("/")[$l[i].href.split("/").length - 1]] = $l[i].href;
	return res
}

/**
 * @description Avoid including a file if it's already included
 * @param {string} file Filename
 * @param {string} [type="link"] Type of the file
 * @param {string} [parentPath=""] Parent path
 * @returns {undefined|boolean} State
 * @see include
 */
function include_once (file, type, parentPath) {
	if (!type) type = (file.indexOf(".js") > 0)? "script": "style";
	var r = type === "script"? gatherScripts(true): gatherStylesheets(true);
	if (parentPath && (keyList(r, true).indexOf(parentPath + file) > -1 || valList(r, true).indexOf(parentPath + file) > -1)) return false;
	else if (keyList(r, true).indexOf(file) > -1 || valList(r, true).indexOf(file) > -1) return false;
	else include(file, type)
}

/**
 * @description Remove (X)HTML tags
 * @param {string} str String with potential tags
 * @returns {string} Tagless string
 */
function stripTags (str) {
	return str.replace(/<[\s\S]+>(.*?)<\/[\s\S]+>/, "$1")
}

/**
 * @description Keeps the file name even if it's not in the same directory as the file that uses this
 * @param {string} path Path
 * @returns {*} File name
 */
function stripPath (path) { //Keeps the file name even if it's not in the same directory as this library or the files using it
	return path.split("/")[path.split("/").length - 1]
}

/**
 * @description Get the name of the current file
 * @param {boolean} [withExt=false] With the extension
 * @returns {string} File name
 * @see stripPath
 */
function getFilename(withExt) {
	return withExt? stripPath(location.pathname): stripPath(location.pathname).get(-stripPath(location.pathname).lastIndexOf(".") - 1);
}

/**
 * @description A bit like stripPath but which would preserve the directories that aren't listed in the local path
 * @param {string} path Path
 * @param {string} localPath Local path
 * @returns {string} Current path
 */
function getCurrentPath (path, localPath) { //A bit like stripPath but which would preserve the directories that aren't listed in the local path
	if (!localPath) localPath = "file:///";
	var parts = path.split("/"), pParts = localPath.split("/"), i = 0, j = 0;
	while(localPath.indexOf(parts[i]) > -1) i++;
	var res = parts.get(i).join("/");

	while (res.indexOf(pParts[j]) > -1) {
		console.log("Gone through " + pParts[j]);
		j++;
	}
	if (j > 0) {
		for(i = 0; i < j; i++) res = "../" + res;
	}
	return res
}

/**
 * @description Get the filename list of the path list
 * @param {string[]} list Path list
 * @returns {Array} File name list
 * @see stripPath
 */
function filenameList (list) {
	var res = [];
	for(var i = 0; i < list.length; i++) res.push(stripPath(list[i]));
	return res.remove("")
}

/**
 * @description Get the directory's path of the file (opposite of stripPath())
 * @param {string} path Path
 * @returns {string} Directory path
 * @see stripPath
 */
function getDirectoryPath (path) {
	if (!path) path = location.href;
	return path.get(0, path.indexOf(stripPath(path)) - 1)
}

/**
 * @description Random number generator
 * @param {number} min Minimum (inclusive)
 * @param {number} max Maximum (inclusive)
 * @param {boolean} [integer=false] Integer or float/double
 * @returns {number} Random number
 */
function rand (min, max, integer) {
	if (!integer) return Math.random() * (max - min + 1) + min; //Math.random() * (max - min) / min doesn't works for min = 0
	else return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * @description Random number generator with 0 as the minimum
 * @param {number} max Maximum (inclusive)
 * @returns {number} Random number
 * @see rand
 */
function randTo (max) {
	return rand(0, max, true); //To only have to use the max value and already knowing the rest
}

/**
 * @description Random number generator in a specific base
 * @param {number} min Minimum (inclusive)
 * @param {number} max Maximum (inclusive)
 * @param {number} [base=10] Base
 * @returns {number|string} Random number
 * @see rand
 */
function baseRand (min, max, base) { //Randomise a number in the selected base
	return parseInt(rand(min, max)).toString(base || 10)
}

/**
 * @description Dynamic random number generator (between two variables)
 * @param {number} var1 Variable #1
 * @param {number} var2 Variable #2
 * @param {boolean} [integer=false] Integer or float/double
 * @returns {number} Random number
 * @see rand
 */
function randVar (var1, var2, integer) {
	var mx = Math.max(var1, var2), mn = Math.min(var1, var2); //Setting the max and min for the rand() call
	return rand(mn, mx, integer)
}

/**
 * @description Range random number generator
 * @param {number} len Length of the range
 * @param {boolean} [if0=false] If 0 is in the range or not
 * @returns {number} Random number
 */
function lenRand (len, if0) {
	if (if0) return Math.floor(Math.random() * (len + 1)); //If the first term is 0
	else return Math.floor(Math.random() * len); //Otherwise if it's 1
}

/**
 * @description Random float in [0; 1] with 16-bits of randomness as Math.random() creates repetitive patterns when applied over larger space
 * @source Three.js
 * @returns {number} Random float
 */
function random16 () { //Random float from <0, 1> with 16 bits of randomness
	return (65280 * Math.random() + 255 * Math.random()) / 65535
}

/**
 * @description Random float in [-range/2, range/2]
 * @param {number} range Range length
 * @source Three.js
 * @returns {number} Random float
 */
function randFloatSpread (range) {
	return range * (.5 - Math.random())
}

/**
 * @description Generate a nearly sorted array
 * @param {number} n Number of elements
 * @param {number} min Minimum
 * @param {number} max Maximum
 * @returns {Array} Nearly sorted array
 * @see swap
 */
function genNearlySortedArr (n, min, max) {
	var aI = range(min, 1, max).slice(0, n), res = [], ic;
	ic = aI.getIncrement(0);
	for (var i = 0; i < aI.length; i++) {
		var r = randTo(ic);
		res.push(aI[i]);
		if (i > 0 && r === 0) swap(res, i, i - 1);
		else if (i > 1 && r === ic) swap(res, i, i - 2);
	}
	return res
}

/**
 * @description Sum squared
 * @param {number[]} arr Array of numbers
 * @param {number} [nbDec=2] Number of decimals
 * @returns {*} Sum squared
 */
function sumPow2 (arr, nbDec) {
	if (!isType(arr, "Array")) return false;
	var sum = 0;
	for(var i = 0; i < arr.length;i++) sum += Math.pow(arr[i], 2);
	return sum.toNDec(nbDec)
}

/**
 * @description Base conversion
 * @param {number|string} n Number to convert
 * @param {number} [from=2] Initial base
 * @param {number} [to=10] Final base
 * @param {boolean} [float=false] FPR or not
 * @returns {string|number} Conversion
 */
function conv (n, from, to, float) {
	return float? parseFloat(n, from || 2).toString(to || 10): parseInt(n, from || 2).toString(to || 10)
}

/**
 * @description Negate a binary number using 2's complement
 * @param {number|string} bin Binary number
 * @param {boolean} [toArr=false] To array
 * @returns {number[]|string[]|number|string} Negated binary number
 * @see conv
 */
function negateBin (bin, toArr) {
	var n = [];
	for(var i = 0; i < bin.length; i++) n[i] = 1 - parseInt(bin[i]);
	var dec = conv(n.join(""));
	dec++;
	return toArr? conv(dec, 10, 2).split(""): conv(dec, 10, 2)
}

/**
 * @description Floating point binary number to decimal number
 * @param {number} bin Binary number
 * @todo Finish it
 * @returns {number} Decimal number
 */
function floatingPtBin (bin) {
	//%= .05859375 (sign) + .27734375 (exponent) + .6640625 (mantissa)
	/* Lookup table aid
	var s = new Stream(8, "x*2", 4);
	table(s.data.map(function (x) {
		return [(.05859375 * x), (.27734375 * x), (.6640625 * x), (.05859375 * x) + (.27734375 * x) + (.6640625 * x)];
	}))
	*/
	var s = (bin[0] === 1)? -1: 1, e, m; //sign, exponent, mantissa
	switch(bin.length) {
		case 8:
			e = ((bin[1] === 1)? 1: -1) * conv(bin.get(2, 3), 2);
			m = bin.get(4);
			m = m[0] * Math.pow(2, -1) + m[1] * Math.pow(2, -2) + m[2] * Math.pow(2, -3) + m[3] * Math.pow(2, -4);
			break;
		case 16:

			break;
		case 32:

			break;
		case 64:

			break;
		default:
			throw new Error("Invalid binary number!");
	}
	return s * Math.pow(2, e) * m;
}

/**
 * @description Minute to decimal
 * @param {number} min Minutes
 * @returns {number} Decimals
 * @see dec2min
 */
function min2dec (min) { //Minute to decimal
	return (50 * min) / 30
}

/**
 * @description Decimal to minute
 * @param {number} dec Decimals
 * @returns {number} Minutes
 * @see min2dec
 */
function dec2min (dec) {
	return (30 * dec) / 50
}

/**
 * @description Time to second
 * @param {string} i Time ([hh:]mm:ss.xx[x])
 * @returns {number} Seconds
 * @see sec2time
 */
function toS (i) {
	if (i == parseFloat(i)) return parseFloat(i);
	var withH = i.count(":") === 2;
	if (!i) i = withH? "00:00:00.000": "00:00.000"; //Avoid having errors
	if (!isType(i, "String")) i += "";
	if (i.length >= 4 && i.indexOf(":") == 1) return toS("0" + i); //So times without the leading 0 or simply with a 1-digit first section could be read properly
	
	var t = i.split(":");

	if (withH) {
		var h, m, s; //Any parts that need to be extracted
		h = parseInt(t[0]); //The first section: hour
		m = parseInt(t[1]); //The second section: min
		s = parseFloat(t[2]); //The third section: sec
		return h * 3600 + m * 60 + s.toNDec();
	} else {
		m = parseInt(t[0]); //The first section: min
		s = parseFloat(t[1]); //The second section: sec
		return m * 60 + s;
	}
}

/**
 * @description Second to time
 * @param {string} i Seconds
 * @param {boolean} [withH=false] Include hours
 * @returns {string} Time
 * @see toS
 */
function sec2time (i, withH) {
	var h = 0, m = 0, s = i;
	if (withH) {
		s = (i % 60).toNDigits();
		h = (i >= 3600)? Math.floor(i / 3600): 0;
		m = Math.floor((i - s - 3600 * h) / 60);
		m = (m <= 0)? "00": m.toNDigits();
		h = (h <= 0)? "00": h.toNDigits();
		return h + ":" + m+":" + s.get(0, Math.min(4, s.length-1))
	} else {
		s = (i % 60).toNDigits();
		m = Math.floor(i / 60).toNDigits();
		return (m <= 0)? s: m + ":" + s.get(0, Math.min(4, s.length-1)); //Return the result as min:s.ms
	}
}

/**
 * @description Alias/Shortcuts
 * @see sec2time toS
 */
var s2t = sec2time;
/**
 * @description Convert a mark (out of $initTotal) to an other (out of $endTotal)
 * @param {number} mark Mark
 * @param {number} initTotal Initial total
 * @param {number} [endTotal=100] Final total
 * @param {number} [nbDec=2] Number of decimals
 * @returns {number} Converted mark
 */
function markConv (mark, initTotal, endTotal, nbDec) {
	return (mark/initTotal * (endTotal || 100)).toNDec(nbDec || 2)
}

/**
 * @description Nth-root calculator
 * @param {number} x Number
 * @param {number} n Root
 * @param {number} [nbDec=20] Number of decimals
 * @returns {number} Nth-root
 */
function nthroot (x, n, nbDec) {
	var r = x / 2;
	for(var i = 0; i < 60; i++) r += (x - Math.pow(r, n)) / (Math.pow(r + 1, n) - Math.pow(r, n));
	return r.toNDec(nbDec || 20)
}

/**
 * @description Logarithm (LOGy(x))
 * @param {number} x Number
 * @param {number} [y=10] Base
 * @returns {number} Result
 */
function log (x, y) {
	return Math.log(x) / Math.log(y || 10)
}

/**
 * @description Neperian Logarithm
 * @param {number} x Number
 * @returns {number} Neperian logarithm
 * @see log
 */
function ln (x) {
	return log(x, Math.E);
}

/**
 * @description Greatest Common Divisor
 * @param {number} a Number a
 * @param {number} b Number b
 * @returns {number} GCD
 */
function gcd (a, b) {
	return b? gcd(b, a % b): Math.abs(a)
}

/**
 * @description Binomial distribution X~Bin(n, p)
 * @param {number} n Total number of attempts
 * @param {number} p Success probability
 * @param {number} r Number of attempts
 * @returns {number} Binomial distribution
 * @see C
 */
function Bin (n, p, r) { //Binomial distrib. where X~Bin(n, p) and it returns P(X = r)
	return C(n, r) * Math.pow(p, r) * Math.pow(1 - p, n - r)
}

/**
 * @description Cumultative binomial distribution (P(X<r)?)
 * @param {number} n Total number of attempts
 * @param {number} p Success probability
 * @param {number} r Number of attempts
 * @returns {number} Cumultative binomial distribution
 * @see Bin
 */
function BinCumul (n, p, r) { //P(X < r) ?
	var res = [];
	for (var i = 0; i < r; i++) res.push(Bin(n, p, r));
	return res.sum();
}

/**
 * @description Cumultative binomial distribution (P(X<=r))
 * @param {number} n Total number of attempts
 * @param {number} p Success probability
 * @param {number} r Number of attempts
 * @returns {number} Cumultative binomial distribution
 * @see factorial
 */
function BinCumulLT (n, p, r) { //P(X <= r) (adapted from http://stackoverflow.com/questions/1095650/how-can-i-efficiently-calculate-the-binomial-cumulative-distribution-function)
	var x = 1 - p, a = n - r, b = r + 1, c = a + b - 1, res = 0;
	for (var i = a; i < c + 1; i++) res += factorial(c) / (factorial(i) * factorial(c - i)) * Math.pow(x, i) * Math.pow((1 - x), c - i);
	return res;
}

/**
 * @description Normal distribution
 * @param {number} x Number
 * @returns {number} Normal distribution
 */
function Norm (x) { //P(z < x) where Z~N(0, 1) (or P(z>-x) if x is positive) === normalcdf(x)
	var t = 1 / (1 + .2316419 * Math.abs(x));
	var d = .3989423 * Math.exp(-x * x / 2);
	var p = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
	return p.toNDec(4)
}

/**
 * @description Standard normal distribution
 * @param {number} m Mean
 * @param {number} sd Standard deviation
 * @param {number} x Number
 * @returns {number} Standard normal distribution
 * @see Norm
 */
function StdNorm (m, sd, x) {
	return Norm((x - m) / sd); //P(Z<(x-m)/sd)
}

/**
 * @description Poisson distribution
 * @param {number} l Lambda
 * @param {number} x Number
 * @returns {number} Poisson distribution
 * @see factorial
 */
function Po (l, x) {
	return (Math.exp(-l) * Math.pow(l, x)) / factorial(x).toNDec(4)
}

/**
 * @description Cumultative poisson distribution
 * @param {number} l Lambda
 * @param {number} x Number
 * @returns {number} Cumultative poisson distribution
 * @see Po
 */
function PoCumul (l, x) {
	var res = [];
	for (var i = 0; i < r; i++) res.push(Po(l, x));
	return res.sum();
}

/**
 * @description factorial x!
 * @param {number} x Number
 * @returns {*} x!
 */
function factorial (x) {
	var f = x;
	for(var i = 1; i < x; i++) f *= i;
	return f; //Recursive way: (x === 1)? 1: n * factorial(x - 1)
}

/**
 * @description Combination/choose
 * @param {number} n Total
 * @param {number} r Number
 * @returns {number} nCr
 * @see factorial
 */
function C (n, r) {
	return factorial(n) / (factorial(r) * factorial(n - r))
}

/**
 * @description Binomial to Normal
 * @param {number} n Total number of attempts
 * @param {number} p Success probability
 * @param {number} r Number of attempts
 * @param {string} sign Sign used in the expression
 * @returns {number} Normal distribution
 * @see StdNorm
 */
function Bin2Norm (n, p, r, sign) { //Binomial to Normal
	if (n * p > 5 && n * (1 - p) > 5) {
		r += (sign === ">=")? -.5: .5; //Continuity correction
		return StdNorm(n * p, Math.sqrt(n * p * (1 - p)), r)
	} else return false
}

/**
 * @description Binomial to Poisson
 * @param {number} n Total number of attempts
 * @param {number} p Success probability
 * @param {number} r Number of attempts
 * @returns {number|boolean} Poisson distribution
 * @see Po
 */
function Bin2Po (n, p, r) { //Binomial to Poisson
	return (n > 50 && p < .1)? Po(n * p, r): false;
}

/**
 * @description Poisson to Normal
 * @param {number} l Lambda
 * @param {number} x Number
 * @returns {number|boolean} Normal distribution
 * @see StdNorm
 */
function Po2Norm (l, x) { //Poisson to Normal
	return (l > 10)? StdNorm(x, Math.sqrt(x)): false;
}

/**
 * @description Gaussian Error
 * @source http://stackoverflow.com/questions/1095650/how-can-i-efficiently-calculate-the-binomial-cumulative-distribution-function
 * @param {number} z Number
 * @returns {number} Gaussian error
 */
function erf (z) {
	var t = 1/(1 + .5 * Math.abs(z)), res;
	res = 1 - t * Math.exp(-z * z - 1.26551223 + t * (1.00002368 + t * ( 0.37409196 + t * ( 0.09678418 + t * (-0.18628806 + t * ( 0.27886807 + t * (-1.13520398 + t * ( 1.48851587 + t * (-0.82215223 + t * ( 0.17087277))))))))));
	return z > 0? res: -res;
}

/**
 * @description Normal estimate
 * @source http://stackoverflow.com/questions/1095650/how-can-i-efficiently-calculate-the-binomial-cumulative-distribution-function
 * @param {number} n Total number of attempts
 * @param {number} p Success probability
 * @param {number} r Number of attempts
 * @returns {number} Normal estimate
 */
function NormEstimate(n, p, r) {
	var u = n * p, o;
	o = Math.pow(u * (1 - p), .5);
	return .5 * (1 + erf((r - u) / (o * Math.pow(2, .5))));
}

/**
 * @description Clamp values to keep them within a range [a; b]
 * @param {number} x Number
 * @param {number} a Lowest bound
 * @param {number} b Highest bound
 * @returns {number} Clamped number
 */
function clamp (x, a, b) {
	return (x < a)? a: ((x > b)? b: x)
}

/**
 * @description Clamp values to keep them within a range ]-Inf; a]U[b; Inf[
 * @param {number} x Number
 * @param {number} a Lowest inner bound
 * @param {number} b Highest inner bound
 * @returns {number} Clamped number
 */
function revClamp(x, a, b) {
	return (a <= x && x <= b)? getClosest(x, [a, b]): x; 
}

/**
 * @description Clamp values to keep them within the range [a; Inf[
 * @param {number} x Number
 * @param {number} a Lowest bound
 * @returns {number} Clamped value
 */
function clampBottom (x, a) {
	return (x < a)? a: x
}

/**
 * @description Clamped values to keep them within the range ]-Inf; b]
 * @param {number} x Number
 * @param {number} b Highest bound
 * @returns {number} Clamped valued
 */
function clampTop (x, b) {
	return (x > b)? b: x
}

/**
 * @description Linear mapping from range [a1; a2] to range [b1; b2]d
 * @param {number} x Number
 * @param {number} a1 Lowest initial bound
 * @param {number} a2 Highest initial bound
 * @param {number} b1 Lowest final bound
 * @param {number} b2 Highest final bound
 * @returns {number} Mapped value
 */
function mapLinear (x, a1, a2, b1, b2) {
	return b1 + (x - a1) * (b2 - b1) / (a2 - a1)
}

/**
 * @description Degree to radiant
 * @param {number} deg Degrees
 * @returns {number} Radiant
 * @see rad2deg
 */
function deg2rad (deg) {
	return deg * Math.PI / 180
}

/**
 * @description Radiant to degree
 * @param {number} rad Radiant
 * @returns {number} Degree
 * @see deg2rad
 */
function rad2deg (rad) {
	return rad * 180 / Math.PI
}

/**
 * @description Celsius to fahrenheit
 * @param {number} cel Celsius
 * @returns {number} Fahrenheit
 * @see fahr2cels
 */
function cels2fahr (cel) {
	return cel * 33.8
}

/**
 * @description Fahrenheit to celsius
 * @param {number} fahr Fahrenheit
 * @returns {number} Celsius
 * @see cels2fahr
 */
function fahr2cels (fahr) {
	return fahr / 33.8
}

/**
 * @description Return the prime numbers of arr where non prime numbers that doesn't have divisors in the array are considered prime
 * @param {number[]} arr Array
 * @returns {Array} Prime numbers
 * @see primeCheck
 */
function primeN (arr) {
	var res = arr.quickSort();
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] % 2 === 0 && arr[i] != 2) res[i] = "x";
		for (var j = 0; j < i; j++) {
			if (primeCheck(res[j], res[i])) res[i] = "x";
		}
	}
	return res.remove("x")
}

/**
 * @description Primeness check of $a toward $b
 * @param {number} a Number a
 * @param {number} b Number b
 * @returns {boolean} Primeness
 */
function primeCheck (a, b) {
	return (a > 1 && b > 1 && b % a === 0 && b != a)
}

/**
 * @description Get the closest whole nth-root of x
 * @param {number} x Number
 * @param {number} n Nth-root
 * @returns {number} Closest root
 */
function getClosestRoot (x, n) {
	if (!n) n = 2;
	var rof = 0, er = 0;
	
	if ((x / 2 * x / 2) / 2 - 2 <= x) rof = x / 2;
	else if (x / 3 * x / 3 <= x) rof = x / 3;
	else rof = x / 4;
	if (Math.pow(rof, n) === x) return rof;

	for (var p = 1; p <= n; p++) {
		for (var i = 1; i < x; i++) {
			if (Math.pow(i, p) === x || Math.pow(i, p - 1) * i === x) er = i;
			else if (Math.pow(i, p) > x || Math.pow(i, p - 1) * i > x) er = i - .5;
		}
	}
	if (Math.pow(er, n) <= x) return er;
	else er = (Math.pow(n, -2) + x / Math.pow(n, 4)-x / Math.pow(n, 5) + Math.pow(x, n) / (Math.pow(n, Math.pow(n, 3) + 3)) + x / Math.pow(n, 2)) / 2;
	if (Math.pow(er, n) > x) er = (er + rof) / 2;
	var res = [rof, er, (x / er + er) / 2, (er + rof) / 2];
	var resMap = res.map(function (x) {
		return Math.pow(x, n);
	});
	return res[resMap.lookFor(getClosest(x, resMap))] * .9956973041;
}

/**
 * @description Simple interest
 * @param {number} po Balance
 * @param {number} i Interest
 * @param {number} t Time (in years)
 * @returns {number} Resulting balance
 */
function simpleInterest (po, i, t) {
	return po * (1 + i * (t || 1))
}

/**
 * @description Compound interest
 * @param {number} po Balance
 * @param {number} i Interest
 * @param {number} t Time (in years)
 * @param {number} n Time divisions
 * @returns {number} Resulting balance
 */
function compoundInterest (po, i, t, n) {
	return n > 1? po * Math.pow(1 + i/n, (t || 1) * n): po * Math.pow(1 + i, (t || 1))
}

/**
 * @description Everything but not 0
 * @param {number} x Number
 * @returns {*} Non-null number
 */
function non0 (x) {
	return (x === 0)? Essence.eps: x;
}

/**
 * @description Fraction form of n
 * @param {number} n Number
 * @param {number} prec Precision
 * @param {boolean} [up=false] Round up
 * @returns {string} Fraction
 */
function toFrac (n, prec, up) {
	var s = String(n), p = s.indexOf(".");
	if (p == -1) return s;
		
	var i = Math.floor(n) || "", dec = s.substring(p),  m = prec || Math.pow(10, dec.length-1), num = up? Math.ceil(dec * m): Math.round(dec * m), den = m,
	g = gcd(num, den);
	
	if (den/g === 1) return String(i + (num/g));
	if (i) i += " and ";
	return i + String(num/g) + "/" + String(den/g)
}

/**
 * @description Makes a number more readable
 * @param {number} n Number
 * @param {number} [nDec=3] Number of decimals
 * @param {boolean} [usFormat=false] US format
 * @returns {string} Clear number
 */
function clearNum (n, nDec, usFormat) {
	var sps = (Math.floor(n) + "").length/3, str = "";
	for (var i = 0; i < sps; i++) {
		str = ((n - n % Math.pow(1000, i)) % Math.pow(1000, i + 1)) / Math.pow(1000, i) + " " + str;
	}
	str = str.split(" ");
	str.pop();
	return str.join(usFormat? ",": " ") + (n % 1).toNDec(nDec || 3)
}

/**
 * @description Get the increment value from $a to $b
 * @param {number} a Minimum
 * @param {number} b Maximum
 * @param {number} [nbDec] Number of decimals
 * @returns {Number} Step
 * @see Array.prototype.getIncrement
 */
function getStep (a, b, nbDec) {
	return [a, b].getIncrement(nbDec)
}

/**
 * @description Quadratic equation solver
 * @param {number} a Constant a
 * @param {number} b Constant b
 * @param {number} c Constant c
 * @param {number} [nDec] Number of decimals
 * @returns {number|string[]|number[]} Solutions
 */
function quadraticSolver (a, b, c, nDec) {
	var d = Math.sqrt(b, 2) - 4 * a * c;
	return d === 0? (-b / (2 * a)).toNDec(nDec): [((-b - Math.sqrt(Math.abs(d))) / (2 * a) + (d < 0? "i": 0)).toNDec(nDec), (-b + Math.sqrt(Math.abs(d)))/(2 * a) + (d < 0? "i": 0).toNDec(nDec)]
}

/**
 * @description Solve equations with a given formula and the result (e.g: x + y + x = res) and the range [a, b]
 * @param {string} formula Formula
 * @param {Array} res Result(s)
 * @param {number} a Lowest bound
 * @param {number} b Highest bound
 * @returns {Array|*} Results
 */
function eqSolver (formula, res, a, b) {
	a = a || -100;
	b = b || 200;
	var  r= mkArray(a > 0? b - a: b - a + 1, 2, 1);
	//Translation from text to commands or to a computer readable string for eval()
	//Str.replace(/([A-z]|[0-9])\x29$/m, "m") for end )
	//Str.replace(/^\x28([A-z]|[0-9])/m, "m") for start (
	if (formula.search(/\^[0-9]/g)>0) { //Look for a ^n
		/* if (formula.charAt(formula.search(/\^[0-9]/g)-1) == ")") {
			formula = formula.replace(/^\(/m, "Math.pow(");
			formula = formula.replace(/\)\^[0-9]/g, [A-z] + );
		} else {
			formula = formula.replace(/^\(/m, "Math.pow(");
			formula = formula.replace(/\^[0-9]/g, [A-z] + );
		} */
		/* propposed by Jhonatan Sneider Salguero Villa
		[(]. * ?[)] (very simplistic, what is inside might not be a math expression)
		\d + \.\d+ (float)
		\d+ (int)
		[a-z]+ (variable)
		*/
		var expr = "([(]. * ?[)]|\\d + \\.\\d + |\\d + |[a-z] + )";
		var reg = new RegExp(expr + "\\^" + expr);
		formula = formula.replace(reg, "Math.pow($1, $2)");
	}else if (formula.search(/e\^/g)>0) { //Look for a e^
		expr = "([(]. * ?[)]|\\d + \\.\\d + |\\d + |[a-z] + )";
		reg = new RegExp("e\\^" + expr);
		formula = formula.replace(reg, "Math.exp($1)");
	}
	Essence.say("Formula now converted to %c" + formula, "info", "color: #00f;");
	//Brute force using any values within [a, b]
	for (var x = a; x <= b; x++) {
		for (var y = a; y <= b; y++) {
			r[x][y] = "(" + x+"," + y+") " + eval(formula);
		}
	}
	return r.filter(function (n) {
		if (n.split(") ")[1] == res) return n.split(") ")[0] + ")"
	}); //Filter out the values which doesn't match the result and returns only (x, y)
}

/**
 * @description Manual equation solver
 * @param {string} eq Equation
 * @param {number} max Upper limit
 * @param {number} dim Dimension (1: x, 2: x/y, 3: x/y/z)
 * @param {number} r Result of one of the sides
 * @returns {Array} Result(s)
 */
function manuEqSolver (eq, max, dim, r) {
	var res = mkArray(max + 1, dim, 1), p = [];
	for (var x = 0; x < res.length; x++) {
		if (dim === 2) {
			for (var y = 0; y < res.length; y++) {
				res[x][y] = eval(eq);
				if (res[x][y] === r) p.push("x = " + x + ", y = " + y);
			}
		} else if (dim === 3) {
			for (y = 0; y < res.length; y++) {
				for (var z = 0; z < res.length; z++) {
					res[x][y][z] = eval(eq);
					if (res[x][y][z] === r) p.push("x = " + x + ", y = " + y + ", z = " + z);
				}
			}
		} else {
			res[x] = eval(eq);
			if (res[x] === r) p.push("x = " + x);
		}
	}
	return p
}


/**
 * @description Remove the text from the string to keep the numbers
 * @param {string} x String
 * @returns {number} Number
 */
function getNumFromStr (x) { //Remove the text from the string to keep the numbers
	return parseFloat(x.replace(/[A-Za-z_ ]+ /g, ""))
}

/**
 * @description X unit to y px
 * @param {string} x Number with a unit
 * @source http://www.endmemo.com/sconvert/centimeterpixel.php
 * @returns {number} Pixels
 * @see fromPixel
 */
function toPixel (x) {
	var m = 1;
	switch (x.substring(String(getNumFromStr(x)).length, x.length)) {
		case "em":
			m = 16;
			break;
		case "km":
			m = 3779527.5593333;
			break;
		case "hm":
			m = 377952.75593333;
			break;
		case "m":
			m = 3779.5275593333;
			break;
		case "dm":
			m = 377.95275593333;
			break;
		case "cm":
			m = 37.795275593333;
			break;
		case "mm":
			m = 3.7795275593333;
			break;
		case "ɥm":
			m = 0.0037795275593333;
			break;
		case "nm":
			m = 3.7795275593333e-6;
			break;
		case "ex":
			m = 7.156;
			break;
		case "in":
			m = 96;
			break;
		case "pt":
			m = 1.3333333333333;
			break;
		case "pc":
			m = 16;
			break;
		case "ft":
			m = 1152;
			break;
		case "twip":
			m = 15;
			break;
		case "mi":
			m = 6082636.631643;
			break;
		case "yd":
			m = 3456.043540706;
			break;
		default: break;
	}
	return getNumFromStr(x) * m
}

/**
 * @description X px to y unit
 * @param {number} x Pixels
 * @param {string} unit Unit
 * @returns {string} Conversion
 * @see toPixel
 */
function fromPixel (x, unit) {
	var m = 1;
	switch (unit) {
		case "em":
			m = 1/16;
			break;
		case "km":
			m = 1/3779527.5593333;
			break;
		case "hm":
			m = 1/377952.75593333;
			break;
		case "m":
			m = 1/3779.5275593333;
			break;
		case "dm":
			m = 1/377.95275593333;
			break;
		case "cm":
			m = 1/37.795275593333;
			break;
		case "mm":
			m = 1/3.7795275593333;
			break;
		case "ɥm":
			m = 1/0.0037795275593333;
			break;
		case "nm":
			m = 1/3.7795275593333e-6;
			break;
		case "ex":
			m = 1/7.156;
			break;
		case "in":
			m = 1/96;
			break;
		case "pt":
			m = 1/1.3333333333333;
			break;
		case "pc":
			m = 1/16;
			break;
		case "ft":
			m = 1/1152;
			break;
		case "twip":
			m = 1/15;
			break;
		case "mi":
			m = 1/6082636.631643;
			break;
		case "yd":
			m = 1/3456.043540706;
			break;
		default: break;
	}
	return (x * m) + unit
}

/**
 * @description Unit converter
 * @param {string} x Number with unit
 * @param {string} unit Final unit
 * @returns {string} Result
 * @see fromPixel toPixel
 */
function convUnit (x, unit) { //x => y unit
	return fromPixel(toPixel(x), unit); //demux(. * , px)->mux(px, . * )
}

/**
 * @description ActiveX manipulation
 * @param {string} filename Filename
 * @param {string} text2write Text to write to the file
 * @param {boolean} [close=false] Closing flag
 * @param {boolean} [remove=false] Removing flag
 * @returns {undefined}
 */
function AX (filename, text2write, close, remove) { //Manipulate a file with ActiveX
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	//Bool: flat the file of the same name if it's already present
	fso.CreateTextFile(filename,true);
	//Opening type: 1-read only; 2-rewriting; 8-continue to write at the end, create (true) or not (false) the file if it doesn't exist
	var otf = fso.OpenTextFile(filename, 1, true);
	//WriteLn add a new line
	//- the file has to be already opened in mode 2 or 8
	otf.Write(text2write);
	/* the file has to be opened in the read mod
	- Read read to the specified number of characters. */
	otf.ReadAll();
	if (close && confirm("Do you really want to close this file ?")) otf.Close();
	if (remove && confirm("Do you really want to delete this file ?")) fso.DeleteFile(filename)
}

/**
 * @description Execute a file
 * @param {string} file File name
 * @param {string} ext Extension
 * @returns {undefined}
 */
function execFile (file, ext) {
	var wshShell = new ActiveXObject("WScript.Shell");
	wshShell.Run(file + "." + ext, 1, true)
}

/**
 * @description Copy to clipboard
 * @param {*} txt Text to copy
 * @param {string} type Type of the text
 * @returns {undefined}
 */
function copyToClipboard (txt, type) { //Works only for IE
	clipboardData.setData(type || "Text", txt)
}

/**
 * @description Save text into a file
 * @param {*} txt Text
 * @param {string} name Filename
 * @param {string} [type="plain"] Type
 * @returns {undefined}
 */
function save (txt, name, type) { //Save into a file of the corresponding type
	var txtfile = new Blob([txt], {type: "text/" + (type || "plain")});
	
	var dlLink = document.createElement("a");
	dlLink.download = name;
	dlLink.innerHTML = "Download File";
	if (window.webkitURL != null) dlLink.href = window.webkitURL.createObjectURL(txtfile); //Chrome allows the link to be clicked without actually adding it to the DOM.
	else { //Firefox requires the link to be added to the DOM before it can be clicked.
		dlLink.href = window.URL.createObjectURL(txtfile);
		dlLink.onclick = function (evt) {
			document.body.removeChild(evt.target);
		};
		dlLink.style.display = "none";
		document.body.appendChild(dlLink);
	}
	dlLink.click()
}

/**
 * @description Get the file's content
 * @param {string} fname File name
 * @returns {string} File content
 * @since 1.0
 * @func
 */
function getFileContent (fname) {
	$G["fct"] = ""; //File content
	var rawFile = window.XMLHttpRequest? new XMLHttpRequest(): new ActiveXObject("Microsoft.XMLHTTP");
	rawFile.open("GET", fname, false);
	rawFile.onreadystatechange = function () {
		if (rawFile.readyState === 4) {
			if (rawFile.status === 200 || rawFile.status == 0) {
				$G["fct"] = rawFile.responseText; //Because returning it won't allow the actual content to be returned
				return rawFile.responseText
			}
		}
	};
	rawFile.send(null);
	return $G["fct"];
}

/**
 * @description Get the information about the key pressed
 * @param {*} keyStroke Keystroke
 * @param {boolean} [tLC=false] To lower case
 * @returns {Array} Keystroke information
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
 */
function getTime (ms) {
	var d = new Date();
	return ms? d.getHours().toNDigits() + ":" + d.getMinutes().toNDigits() + ":" + d.getSeconds().toNDigits() + "." + d.getMilliseconds().toNDigits(): d.getHours().toNDigits() + ":" + d.getMinutes().toNDigits() + ":" + d.getSeconds().toNDigits()
}

/**
 * @description Get the date
 * @param {boolean} [short=false] Shortness (e.g: 26May2016 instead of 26/05/2016
 * @returns {string} Date
 */
function getDate (short) {
	var m = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], d = new Date();
	return short? d.getDate().toNDigits() + m[d.getMonth()] + d.getUTCFullYear(): d.getDate().toNDigits() + "/" + (d.getMonth() + 1).toNDigits() + "/" + d.getUTCFullYear()
}

/**
 * @description Get the timestamp
 * @param {boolean} [readable=false] Readable (dd/MM/yyyy hh:mm:ss.xxx) or not (ddMMM-hh-mm-ss)
 * @returns {string} Timestamp
 * @see getDate getTime
 */
function getTimestamp (readable) {
	return readable? getDate() + " " + getTime(true): getDate(true) + "-" + getTime().replace(/\:/g, "-")
}

/**
 * @description Date to number
 * @param {string} [d=getDate()] Date
 * @returns {number} Number
 * @see num2date
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
 * @see date2num
 */
function num2date (n) {
	var p = n.toString().split(".");
	return p[1].get(3) + "/" + p[1].get(-3) + "/" + p[0];
}

/**
 * @description ASCII table
 * @param {number} [start=0] Starting decimal code
 * @param {number} [end=255] Ending decimal code
 * @returns {Array} ASCII table
 */
function asciiTable(start, end) {
	if (start === "A-Z" && !end) {
		start = 65;
		end = 90;
	} else if (start === "a-z" && !end) {
		start = 97;
		end = 122;
	} else if (start === "A-z" && !end) {
		start = 65;
		end = 122;
	} else if (start === "printable" && !end) {
		start = 32;
		end = 126;
	}
	if (!start) start = 0;
	if (!end) end = 255;
	var res = [];

	for (var i = start; i <= end; i++) res.push(String.fromCharCode(i));
	return res;
}

/**
 * @description Generate a string
 * @param {number} len Length
 * @param {string} filter Filter (specific character, no uppercase/lowercase, cumultative/no (sensitive) repeat)
 * @returns {string} Generated string
 * @see asciiTable
 */
function genStr (len, filter) { //Generate a string
	var str = "", az = asciiTable("a-z"), AZ = asciiTable("A-Z"), zero9 = range(9), commonChar = ["&", "~", "\"", "#", "\'", "{", "[", "(", "-", "|", "`", "_", "\\", "^", "@", ")", "]", " + ", "=", "}", " % ", " * ", "?", ",", ";", ".", "/", ":", "!", " "],
	charlist;
	charlist = az.concat(AZ, zero9, commonChar);
	var c = "", i = 0;
	while (str.length < len) {
		c = charlist.rand();
		if (filter.name === "specificChar") {
			while(c === filter.character) c = charlist.rand();
		}else if (filter.name === "noUpperCase") {
			c = c.toLowerCase();
		}else if (filter.name === "noLowerCase") {
			c = c.toUpperCase();
		}else if (filter.name === "cumultativeRepeat") {
			while(c === str[i-1]) c = charlist.rand();
		}else if (filter.name === "cumultativeSensitiveRepeat") {
			while(c === str[i-1]) c = charlist.rand();
		}else if (filter.name === "noRepeat") {
			charlist.pop(i > 0? str[i - 1]: str[0]);
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
 * @description Colour (Processing's style)
 * @param {number} [r=0] Red
 * @param {number} [g=0] Green
 * @param {number} [b=0] Blue
 * @param {number} [a=255] Alpha
 * @returns {Colour} Colour
 * @this Colour
 * @constructor
 */
function Colour (r, g, b, a) {
	this.constructor = function (r, g, b, a) {
		if (isType(r, "Array") && r.length >= 3 && !g && !b) { //Colour([r, g, b(, a)])
			this.red = r[0];
			this.green = r[1];
			this.blue = r.last();
			this.alpha = (r.length === 4)? r[3]: 255;
		}else if (!g && !b && r && g != 0 && b != 0) { //Colour(rgb(, a))
			this.red = this.green = this.blue = r;
			this.alpha = (r.length === 2 && isType(r, "Array"))? r[1]: 255;
		}else if (!g && !b && r) { //Colour(r, 0, 0)
			this.red = r;
			this.green = 0;
			this.blue = 0;
			this.alpha = (r.length === 2)? r[1]: 255;
		}else if (g && !b && r) { //Colour(r, r, r, g)
			this.red = this.green = this.blue = r;
			this.alpha = g;
		} else { //Colour(, g, b(, a))
			this.red = r || 0;
			this.green = g || 0;
			this.blue = b || 0;
			this.alpha = a || 255;
		}
		this.hex = "#" + conv(this.red, 10, 16).toNDigits() + "" + conv(this.green, 10, 16).toNDigits() + "" + conv(this.blue, 10, 16).toNDigits();
		this.rgba = "rgba(" + this.red + ", " + this.green + ", " + this.blue + ", " + this.alpha + ")";
	};
	this.constructor(r, g, b, a);
	this.update = function () {
		this.hex = "#" + conv(this.red, 10, 16).toNDigits() + "" + conv(this.green, 10, 16).toNDigits() + "" + conv(this.blue, 10, 16).toNDigits();
		this.rgba = "rgba(" + this.red + ", " + this.green + ", " + this.blue + ", " + this.alpha + ")";
	};
	this.getRGBAPerc = function () {
		return "rgba(" + markConv(this.red, 255) + ", " + markConv(this.green, 255) + ", " + markConv(this.blue, 255) + ", " + markConv(this.alpha, 255) + ")"
	};

	this.getMaxClr = function () {
		return Math.max(Math.max(this.red, g), b)
	};

	this.getMinClr = function () {
		return Math.min(Math.min(this.red, g), b)
	};

	this.negative = function (withAlpha) { //Negative mod
		//conv(parseInt(conv("EE", 16)) + parseInt(conv('11', 16)), 10, 16)= "FF" = 255 (always)
		this.red = 255 - parseInt(this.red);
		this.green = 255 - parseInt(this.green);
		this.blue = 255 - parseInt(this.blue);
		if (withAlpha) this.alpha = 255 - parseInt(this.alpha);
		this.update();
	};

	this.redNegative = function () { //Invert the red
		this.red = 255 - parseInt(this.red);
		this.update();
	};
	
	this.greenNegative = function () { //Invert the green
		this.green = 255 - parseInt(this.green);
		this.update();
	};
	
	this.blueNegative = function () {
		this.green = 255 - parseInt(this.green);
		this.update();
	};
	
	this.rand = function (hex) {
		this.red = randTo(255);
		this.green = randTo(255);
		this.blue = randTo(255);
		this.update();
		return hex? this.hex: this.rgba
	};
	
	this.toLocaleString = function () {
		return "Colour(r = " + this.red + ", g = " + this.green + ", b = " + this.blue + ", a = " + this.alpha + ")"
	};
	
	this.toString = function () {
		return "rgba(" + this.red + ", " + this.green + ", " + this.blue + ", " + this.alpha + ")"
	};
	
	this.get = function () {
		return [this.red, this.green, this.blue, this.alpha]
	};
	
	this.increment = function (i) {
		if (isNon(i)) i = 63.75;
		this.blue += i;
		if (this.blue >= 255) {
			this.blue -= 255;
			this.green += i;
		}
		if (this.green >= 255) {
			this.green -= 255;
			this.red += i;
		}
		this.update();
	};
	//this.getColourName = function()
	return this
}

/**
 * @description Hexadecimal to RGB
 * @param {string} hex Hexadecimal
 * @param {boolean} [toArray=false] Result as an array
 * @returns {number[]|string} RGB equivalent
 * @see rgb2hex
 */
function hex2rgb (hex, toArray) { //Hexadecimal to RGB
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	if (result) {
		return toArray? [parseInt(result[1], 16), parseInt(result.last(), 16), parseInt(result[3], 16)]: parseInt(result[1], 16) + ", " + parseInt(result.last(), 16) + ", " + parseInt(result[3], 16)
	}else if (/^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i.exec(hex)) {
		result = /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i.exec(hex);
		return (toArray)? [parseInt(result[1], 16), parseInt(result.last(), 16), parseInt(result[3], 16)]: parseInt(result[1] + result[1], 16) + ", " + parseInt(result.last() + result.last(), 16) + ", " + parseInt(result[3] + result[3], 16)
	}else return null
}

/**
 * @description RGB to hexadecimal
 * @param {string} rgb RGB colour
 * @param {boolean} [toArray=false] Result as an array
 * @returns {string[]|number[]|string} Hexadecimal colour
 * @see hex2rgb
 */
function rgb2hex (rgb, toArray) { //RGB to hexademical
	rgb = rgb.slice(4, rgb.length - 1).split(", ");
	return toArray? [conv(rgb[0], 10, 16).toNDigits(), conv(rgb[1], 10, 16).toNDigits(), conv(rgb.last(), 10, 16).toNDigits()]: "#" + conv(rgb[0], 10, 16).toNDigits() + conv(rgb[1], 10, 16).toNDigits() + conv(rgb.last(), 10, 16).toNDigits()
}

/**
 * @description Switch the colour of the $elmt's attribute (that can be the background/border/font colour of an HTML element and which is in hex form) to it's red/green/blue/yellow/cyan/magenta/full negative version.
 * @param {string} elmt Element to be used
 * @param {string} attr Attribute to be used
 * @param {string} [mod="x"] Mod
 * @returns {undefined}
 */
function negateColour (elmt, attr, mod) {
	mod = mod? mod[0].toLowerCase(): "x"; //To accept: r, R, red, Red, RED; for the red, ...
	var clrs = ($e(elmt).css(attr).indexOf("rgb(") === 0)? $e(elmt).css(attr).slice(4, $e(elmt).css(attr).length-1).split(", "): hex2rgb($e(elmt).css(attr), true), clr = new Colour();
	if (mod === "r") {
		clr.red = 255 - parseInt(clrs[0]);
		clr.green = clrs[1];
		clr.blue = clrs.last();
	}else if (mod === "g") {
		clr.red = clrs[0];
		clr.green = 255 - parseInt(clrs[0]);
		clr.blue = clrs.last();
	}else if (mod === "b") {
		clr.red = clrs[0];
		clr.green = clrs[1];
		clr.blue = 255 - parseInt(clrs.last());
	}else if (mod === "y") {
		clr.red = 255 - parseInt(clrs[0]);
		clr.green = 255 - parseInt(clrs[1]);
		clr.blue = clrs.last();
	}else if (mod === "c") {
		clr.red = clrs[0];
		clr.green = 255 - parseInt(clrs[0]);
		clr.blue = 255 - parseInt(clrs.last());
	}else if (mod === "m") {
		clr.red = 255 - parseInt(clrs[0]);
		clr.green = clrs[1];
		clr.blue = 255 - parseInt(clrs.last());
	}else if (mod === "a" || mod === "f" || mod === "w") {
		clr.red = 255 - parseInt(clrs[0]);
		clr.green = 255 - parseInt(clrs[1]);
		clr.blue = 255 - parseInt(clrs.last());
	} else {
		clr.red = clrs[0];
		clr.green = clrs[1];
		clr.blue = clrs.last();
	}
	clr.hex = "#" + conv(clr.red, 10, 16).toNDigits() + "" + conv(clr.green, 10, 16).toNDigits() + "" + conv(clr.blue, 10, 16).toNDigits();
	$e(elmt).setCSS(attr, clr.hex)
}

/**
 * @description Get the hexadecimal equivalent of the colour names
 * @param {string} clr Colour name
 * @returns {string} Hexadecimal equivalent
 */
function colourName2Hex (clr) { //Get the hexadecimal equivalent of the colour names
	switch (clr.normal()) {
		case "aqua": return "#00ffff"; 
		case "cyan": return "#00ffff"; 
		case "black": return "#000000"; 
		case "blue": return "#0000ff"; 
		case "fuchsia": return "#ff00ff"; 
		case "magenta": return "#f800f8"; 
		case "gray": return "#808080"; 
		case "grey": return "#808080"; 
		case "green": return "#008000"; 
		case "lime": return "#00ff00"; 
		case "brown": return "#800000"; 
		case "maroon": return "#800000"; 
		case "navy": return "#000080"; 
		case "olive": return "#808000"; 
		case "purple": return "#800080"; 
		case "red": return "#ff0000"; 
		case "silver": return "#c0c0c0"; 
		case "teal": return "#008080"; 
		case "white": return "#ffffff"; 
		case "yellow": return "#ffff00"; 
		case "gold": return "#ffd700"; 
		case "seagreen": return "#2e8b57"; 
		case "pink": return "#ffc0cb"; 
		case "skyblue": return "#87ceeb"; 
		case "coral": return "#ff7f50"; 
		case "tan": return "#d2b48c"; 
		case "orange": return "#ffa500"; 
		case "cream": return "#feffff"; 
		case "lightgray": return "#d3d3d3"; 
		case "salmon": return "#fa8072"; 
		default: return null;
	}
}

/**
 * @description List of all possible RGB colours mod $inc
 * @param {number} [inc=63.75] Increment
 * @param {boolean} [intOnly=false] Only integers
 * @param {boolean} [debug=false] Debug all the elements
 * @returns {Array} RGB list
 */
function rgbList (inc, intOnly, debug) {
	var l = [];
	if (isNon(inc)) inc = 63.75;
	for (var r = 0; r < 257; r += inc) {
		for (var g = 0; g < 257; g += inc) {
			for (var b = 0; b < 257; b += inc) {
				if (debug) Essence.sayClr(intOnly? [Math.round(r), Math.round(g), Math.round(b)]: [r, g, b]);
				l.push("rgb(" + (intOnly? [Math.round(r), Math.round(g), Math.round(b)].join(", "): [r, g, b].join(", ")) + ")");
			}
		}
	}
	return l
}

/**
 * @description A person
 * @param {string} fname First name
 * @param {string} sname Second name
 * @param {string} lname Last name
 * @param {string} title Title
 * @param {string} nickname Nickname
 * @param {string|number} [num="none"] Phone number
 * @param {string} country Country
 * @param {string} city City
 * @param {string} [sex="other"] Sex
 * @param {string} bday="01/01/2000" Birth date
 * @param {string|string[]} [jobs="unemployed"] Job(s)
 * @param {string|string[]} [activities="none"] Activitie(s)
 * @param {string|string[]} [websites="none"] Website(s)
 * @param {string} [quote=""] Quote
 * @returns {Person} Person
 * @todo Making sure that getName() doesn't come up in this.toString()
 * @this Person
 * @constructor
 */
function Person (fname, sname, lname, title, nickname, num, country, city, sex, bday, jobs, activities, websites, quote) {
	this.firstName = fname || "";
	this.secondName = sname || "";
	this.lastName = lname || "";
	this.title = title || "";
	this.nickname = nickname || "";
	this.phoneNum = num || "none";
	this.country = country || "";
	this.city = city || "";
	this.sex = (sex.toLowerCase() === "male" || sex.toLowerCase() === "female")? sex: "other";
	this.birthday = bday || "01/01/2000";
	this.deathday = null;
	this.jobs = jobs || "unemployed";
	this.activities = activities || "none";
	this.websites = websites || "none";
	this.quote = quote || "";
	this.toString = function () { //Weirdly showing "getName" which isn't the case of toLocaleString()
		var str = "Person(";
		for (var p in this) {
			if (this.hasOwnProperty(p) && p != "toString") str += p + "=" + this[p] + ", ";
		}
		return str.substring(0, str.length-2) + ")"
	};

	this.genID = function () {
		return (this.lastName.get(0, 3) + this.birthday.split("/")[1] + this.firstName.get(0, 1) + this.secondName.get(0, 1) + this.birthday.split("/")[2] + this.sex[0]).toUpperCase();
	};

	this.getAge = function () {
		return (date2num(getDate()) - date2num(this.birthday)).toNDec(2);
	};

	this.isMajor = function () {
		return ((this.country.get(0, 1) === "UN" || this.country.toLowerCase() === "united states") && this.getAge() > 20) || ((this.country.get(0, 1) != "UN" || this.country.toLowerCase() != "united states") && this.getAge() > 18);
	};

	this.getFullName = function () {
		return this.firstName + " " + this.secondName + (this.nickname != ""? " \"" + this.nickname + "\" ": " ") + this.lastName;
	};

	this.summary = function () {
		return "Hello, I'm " + this.title + " " + this.getFullName() + " a " + this.getAge() + " years old " + this.country + "citizen from " + this.city + ". I'm " + arrayLiteral(this.jobs) + ". I enjoy " + arrayLiteral(this.activities) + ". To contact me either go on: " + arrayLiteral(this.websites) + " or call me at " + this.phoneNum + ".";
	};

	return this
}

/**
 * @description An item
 * @param {string} [name="unknown"] Name
 * @param {string} [cat="unknown"] Category
 * @param {number} [price=0] Price
 * @param {number} [amr=0.25] Age minimum required to use this
 * @param {number} nb Quantity
 * @returns {Item} Item
 * @this Item
 * @constructor
 */
function Item (name, cat, price, amr, nb) { //An item like the ones that can be bought/sold/traded/used
	this.name = name || "unknown";
	this.category = cat || "unknown";
	this.price = price || 0;
	this.ageMinRequired = amr || .25; //3 months old+
	this.quantity = nb || 1;
	this.firstMade = new Date().toLocaleString();
	
	this.dublicate = function (n, dest) {
		for (var i = 0; i < n; i++) dest.push(new Item(this.name, this.category, this.price, this.ageMinRequired, this.quantity));
	};
	this.remove = function (dest) {
		dest = dest.remove(this)
	};
	this.toString = function () {
		var str = "";
		for (var p in this) {
			if (this.hasOwnProperty(p) && p != "toString" && !isType(p, "Function")) str += p + "=" + this[p] + ", ";
		}
		return str.substring(0, str.length-2)
	};
	return this
}

/**
 * @description Matlab min:inc:max range
 * @param {number} [min=0] Minimum
 * @param {number} [inc=1] Increment
 * @param {number} [max=100] Maximum
 * @param {number|boolean} [nbDec=false] Number of decimals
 * @returns {number[]} Range
 */
function range (min, inc, max, nbDec) {
	var val = [], n = 0;
	if (min && !inc && !max && max != 0) return range(0, 1, min);
	else if (min && inc && !max && max != 0) return range(0, inc, min);
	if (!min) min = 0;
	if (!inc) inc = 1;
	if (!max) max = 100;
	if (inc > 0) { //Ascending order
		for (var i = min; i <= max; i += inc) val[n++] = Number(i).toNDec(nbDec);
	} else { //Descending order
		for (i = min; i >= max; i -= inc) val[n++] = Number(i).toNDec(nbDec);
	}
	return val
}

/**
 * @description Same as range() but to the base $b
 * @param {number} [min=0] Minimum
 * @param {number} [inc=1] Increment
 * @param {number} [max=100] Maximum
 * @param {number} [b=2] Base
 * @returns {Array} Range
 * @see conv
 */
function range2base (min, inc, max, b) { //Same as range(...) but to the base b
	var val = [], n = 0;
	if (inc > 0) {
		for (var i = min; i <= max; i += inc) val[n++] = conv(i, 10, b);
	} else {
		for (i = min; i >= max; i += inc) val[n++] = conv(i, 10, b);
	}
	return val
}

/**
 * @description Letter pair array
 * @param {string} [first="a"] First letter
 * @param {string} [last="z"] Last letter
 * @returns {Array} Letter pair array
 */
function letterArray (first, last) { //A letter pair array
	var f = first.charCodeAt(0) || 97, l = last.charCodeAt(0) || 122, arr = [], letterPair = "";
	for (var firstLetter = f; firstLetter <= l; firstLetter++) {
		for (var secondLetter = f; secondLetter <= l; secondLetter++) {
			if (firstLetter != secondLetter) {
				letterPair = String.fromCharCode(firstLetter) + String.fromCharCode(secondLetter);
				arr.push(letterPair);
			}
		}
	}
	return arr
}

/**
 * @description Like Array.rand() but with optionally unique values and using a Fisher Yates-like approach
 * @param {number} [min=0] Minimum
 * @param {number} [inc=1] Increment
 * @param {number} [max=100] Maximum
 * @param {boolean} [noRepeat=false] No repeated numbers
 * @returns {Array} Mixed range
 * @see range
 */
function mixedRange (min, inc, max, noRepeat) {
	var val = [], available = range(min, inc, max);
	if (noRepeat) {
		while (available.length > 0) {
			val.push(available.rand());
			available = available.remove(val.last());
		}
	} else {
		for(var i = min; i <= max; i++) val[i] = available.rand();
	}
	return val
}

/**
 * @description Make a $len^$dim array
 * @param {number} len Length
 * @param {number} dim Dimension
 * @param {*} [fill=false] Content to be used to fill
 * @returns {Array} Array
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
 * @returns {object|Array} Swapping result
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
 * @description Fisher-Yates shuffle
 * @param {Array|object|string} obj Object to shuffle
 * @returns {Array|object|string} Shuffled array
 * @see swap
 */
function fisherYatesShuffle (obj) { //Inspired by https://Github.com/duereg/js-algorithms/blob/master/lib/algorithms/1-strings/shuffle.js
	var l = obj.length;
	while (l > 0) {
		if (obj.hasOwnProperty(l)) swap(obj, l, Math.floor(Math.random() * l--));
	}
	return obj
}

/**
 * @description Vector product
 * @param {object} v1 Vector #1
 * @param {object} v2 Vector #2
 * @returns {string} Vector product
 */
function vectorProd (v1, v2) { //V1 x v2
	var x = [], prod = [0, 0, 0];
	x[0] = ["i", "j", "k"];
	x[1] = [v1.x, v1.y, v1.z];
	x.last([v2.x, v2.y, v2.z]);
	prod[0] = v1.y * v2.z - v1.z * v2.y; //I
	prod[1] = v1.x * v2.z - v1.z * v2.x; //J
	prod.last(v1.x * v2.y - v1.y * v2.x); //K
	return prod[0] + "i + " + prod[1] + "j + " + prod.last() + "k"
}

/**
 * @description Convert  a vector to a point
 * @param {object} v Vector
 * @returns {Pt} Point
 * @see Pt
 */
function vector2Point (v) { //Get the conversion of the vector to a point
	return new Pt(v.x, v.y, v.z)
}

/**
 * @description Convert a vector to a point form (R = xi + yj + zk->(x, y, z))
 * @param {object} r Vector
 * @returns {string} Point form
 */
function vector2PointForm (r) {
	return "(" + (r.split("i")[0]).clean() + ", " + (r.split("i")[1].split("j")[0].slice(1, r.split("i")[1].split("j")[0].length)).clean() + ", " + (r.split("i")[1].split("j")[1].split("k")[0]).clean() + ")";
}

/**
 * @description Scalar/dot product
 * @param {object} v1 Vector #1
 * @param {object} v2 Vector #2
 * @returns {number} Scalar product
 */
function scalarProd (v1, v2) {
	return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z
}

/**
 * @description Union
 * @param {Array} a Array a
 * @param {Array} b Array b
 * @param {Array} [c] Array c
 * @param {boolean} [toSort=false] Sort the elements
 * @returns {Array} a union b (union c)
 */
function union (a, b, c, toSort) {
	return toSort? rmDuplicates(a.concat(b, c)).quickSort(): rmDuplicates(a.concat(b, c))
}

/**
 * @description Intersection
 * @param {Array} a Array a
 * @param {Array} b Array b
 * @param {Array} [c] Array c
 * @param {boolean} [toSort=false] Sort the elements
 * @returns {Array} a intersection b (intersection c)
 */
function intersection (a, b, c, toSort) {
	var inter = [];
	a = a.quickSort();
	b = b.quickSort();
	c = c? c.quickSort(): false;

	for (var i in a) {
		if(a.hasOwnProperty(i)) {
			if (b.indexOf(a[i]) > -1 && isNon(c)) inter.push(a[i]);
			else if (b.indexOf(a[i]) > -1 && c.indexOf(a[i]) > -1) inter.push(a[i]);
		}
	}
	return toSort? rmDuplicates(inter).quickSort(): rmDuplicates(inter)
}

/**
 * @description Complement
 * @param {Array} a Array a
 * @param {Array} b Array b
 * @param {Array} [c] Array c
 * @param {boolean} [toSort=false] Sort the elements
 * @returns {Array} a\b(\c) => a xor b (xor c)
 */
function complement (a, b, c, toSort) {
	var cpt = [];
	a = a.quickSort();
	b = b.quickSort();
	c = c? c.quickSort(): false;

	for (var i in a) {
		if(a.hasOwnProperty(i)) {
			if (b.indexOf(a[i]) === -1 && isNon(c)) cpt.push(a[i]);
			else if (b.indexOf(a[i]) === -1 && c.indexOf(a[i]) === -1) cpt.push(a[i]);
		}
	}
	return toSort? rmDuplicates(cpt).quickSort(): rmDuplicates(cpt)
}

/**
 * @description Symmetric difference
 * @param {Array} a Array a
 * @param {Array} b Array b
 * @param {Array} [c] Array c
 * @param {boolean} [toSort=false] Sort the elements
 * @returns {Array} a union b - a intersection b => a only & b only
 */
function symDif (a, b, c, toSort) {
	var sd = [];
	a = a.quickSort();
	b = b.quickSort();
	c = c? c.quickSortort(): false;
	for (var i in a) {
		if(a.hasOwnProperty(i)) {
			if (b.indexOf(a[i]) === -1 && isNon(c)) sd.push(a[i]);
			else if (b.indexOf(a[i]) === -1 && c.indexOf(a[i]) === -1) sd.push(a[i]);
		}
	}
	for (i in b) {
		if(b.hasOwnProperty(i)) {
			if (a.indexOf(b[i]) === -1 && isNon(c)) sd.push(b[i]);
			else if (a.indexOf(b[i]) === -1 && c.indexOf(b[i]) === -1) sd.push(b[i])
		}
	}
	if (c) {
		for (i in c) {
			if (c.hasOwnProperty(i) && a.indexOf(c[i]) === -1 && b.indexOf(c[i]) === -1) sd.push(c[i]);
		}
	}
	return toSort? rmDuplicates(sd).quickSort(): rmDuplicates(sd)
}

/**
 * @description Bit string of a set in relation to an other
 * @param {Array} a Array a
 * @param {Array} b Array b
 * @returns {Array} Bit string
 */
function bitStr (a, b) {
	var ba = []; //Ba in b
	for(var i in a) {
		if(a.hasOwnProperty(i)) ba[i] = (a[i] === b[i])? 1: 0;
	}
	return ba
}

/**
 * @description Make sure that $a and $b are of the same lengths and fill the empty spaces with $cr
 * @param {string|Array} a Element a
 * @param {string|Array} b Element b
 * @param {string} [cr=" "] Filling character
 * @returns {Array} Resized elements
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
 * @description Logical and for arrays
 * @param {Array} a Array a
 * @param {Array} b Array b
 * @param {string|null} [cr=null] Filling character
 * @param {boolean} [toArr=false] To array
 * @returns {Array|boolean} Result
 */
function And (a, b, cr, toArr) {
	toSameLength(a, b, cr || null);
	var res = toArr? new Array(a.length): (a[0] && b[0]);
	for (var i in a) {
		if (a.hasOwnProperty(i)) {
			if (toArr) res[i] = a[i] && b[i];
			else res = (res && a[i] && b[i]);
		}
	}
	return res
}

/**
 * @description Logical or for arrays
 * @param {Array} a Array a
 * @param {Array} b Array b
 * @param {string|null} [cr=null] Filling character
 * @param {boolean} [toArr=false] To array
 * @returns {Array|boolean} Result
 */
function Or (a, b, cr, toArr) {
	toSameLength(a, b, cr || null);
	var res = toArr? new Array(a.length): (a[0] || b[0]);
	for (var i in a) {
		if (a.hasOwnProperty(i)) {
			if (toArr) res[i] = a[i] || b[i];
			else res = (res || a[i] || b[i]);
		}
	}
	return res
}

/**
 * @description Logical xor for arrays
 * @param {Array} a Array a
 * @param {Array} b Array b
 * @param {string|null} [cr=null] Filling character
 * @param {boolean} [toArr=false] To array
 * @returns {Array|boolean} Result
 */
function Xor (a, b, cr, toArr) {
	toSameLength(a, b, cr || null);
	var res = toArr? new Array(a.length): xor(a[0], b[0]);
	for (var i in a) {
		if (a.hasOwnProperty(i)) {
			if (toArr) res[i] = xor(a[i], b[i]);
			else res = xor(res, xor(a[i], b[i]));
		}
	}
	return res
}

/**
 * @description Logical imply for arrays
 * @param {Array} a Array a
 * @param {Array} b Array b
 * @param {string|null} [cr=null] Filling character
 * @param {boolean} [toArr=false] To array
 * @returns {Array|boolean} Result
 */
function Imply (a, b, cr, toArr) {
	toSameLength(a, b, cr || null);
	var res = toArr? new Array(a.length): (!a[0] || b[0]);
	for (var i in a) {
		if(a.hasOwnProperty(i)) {
			if (toArr) res[i] = (!a[i] || b[i]);
			else res = (!res || (!a[i] || b[i]));
		}
	}
	return res
}

/**
 * @description Manhattan distance between two points
 * @param {number[]} a Initial point
 * @param {number[]} b Final point
 * @returns {number} Distance
 */
function manhattanDist (a, b) {
	return Math.abs(Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]))
}

/**
 * @description Euclidian distance between two points
 * @param {number[]} a Initial point
 * @param {number[]} b Final point
 * @returns {number} Distance
 */
function euclidianDist (a, b) {
	return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2))
}

/**
 * @description Diagonal distance between two points
 * @param {number[]} a Initial point
 * @param {number[]} b Final point
 * @returns {number} Distance
 */
function diagDist (a, b) { //Return the Diagonal distance  ...
	return Math.max(Math.abs(a[0] - b[0]), Math.abs(a[1] - b[1]))
}

/**
 * @description Heuristic of a matrix
 * @param {Array} mtx Matrix
 * @param {Array} solvedMtx Solved matrix (goal)
 * @param {Function} [hrt=euclidiantDist] Heuristic method
 * @returns {number} Result
 * @see euclidianDist
 */
function h (mtx, solvedMtx, hrt) {
	var res = new Array(mtx.length);
	for (var i = 0; i < mtx.length; i++) {
		res[i] = new Array(mtx[i].length);
		for (var j = 0; j < mtx[i].length; j++) {
			res[i][j] = hrt([i, j], lookfor(mtx[i][j], solvedMtx)) || euclidianDist([i, j], lookfor(mtx[i][j], solvedMtx));
		}	  
	}
	Essence.say(console.table(res));
	return res.sum2d()
}

/**
 * @description Look for an element in a matrix
 * @param {*} x Element to look for
 * @param {Array} mtx Matrix
 * @param {boolean} [toCoord=false] Coordinate representation
 * @returns {number[]|number} Position
 */
function lookfor (x, mtx, toCoord) {
	for (var i = 0; i < mtx.length; i++) {
		for (var j = 0; j < mtx[i].length; j++) {
			if (mtx[i][j] === x) return toCoord? [j, i]: [i, j]; //I is the row number and j the column which oppose j being the x-coord and i the y-coord
		}
	}
	return -1
}

/**
 * @description List of keys of a map (like keys in ES6)
 * @param {Array} map Map
 * @param {boolean} [propOnly=false] Properties only
 * @returns {Array} Key list
 * @see valList
 */
function keyList (map, propOnly) {
	var list = [];
	//ES6 only: if (propOnly) return keys(map)
	if (propOnly) {
		for (var key in map) {
			if (map.hasOwnProperty(key)) list.push(key);
		}
	}else for(key in map) list.push(key);
	return list
}

/**
 * @description List of values of a map (like values in ES6)
 * @param {Array} map Map
 * @param {boolean} [propOnly=false] Properties only
 * @returns {Array} Value list
 * @see keyList
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
 */
function keyTable (map, propOnly) { //Same as above but in the form of the HTML table
	var table = map.hasName()? "<table cellspacing=0><caption>KeyTable: <i>" + map.getName() + "</i></caption><tr><th>Key</th><th>Value</th></tr>": "<table><caption> KeyTable</caption><tr><th>Key</th><th>Value</th></tr>";
	for (var key in map) {
		table += (propOnly && map.hasOwnProperty(key))? "<tr><td>" + key + "</td><td>" + map[key] + "</td></tr>": "<tr><td>" + key + "</td><td>" + map[key] + "</td></tr>";
	}
	return table + "</table>"
}

/**
 * @description Linked list
 * @param {*} [pl=1] Payload
 * @param {LinkedList} [nx={payload: 1, next: null}] Next
 * @param {string} name Name of the linked list
 * @returns {LinkedList} Linked list
 * @this LinkedList
 * @constructor
 */
function LinkedList (pl, nx, name) {
	this.payload = pl || 1;
	this.next = nx || {payload: 1, next: null};
	this.name = name;
	this.next.show = function () {
		return name + ":" + next.payload + "->"
	};
	this.show = function () {
		return this.name + ":" + this.payload + "->" + this.next.show()
	};
	
	this.toString = function () {
		return "LinkedList(" + this.show() + ")"
	};
	return this
}

/**
 * @description Binary tree node
 * @param {*} [pl=0] Payload
 * @param {TreeNode} [l] Left child
 * @param {TreeNode} [r] Right child
 * @this TreeNode
 * @returns {TreeNode} Tree node
 * @constructor
 */
function TreeNode (pl, l, r) { //Binary tree
	this.left = l;
	this.right = r;
	this.payload = pl || 0;
	
	this.add = function (l, r) {
		this.left = l;
		this.right = r;
	};
	this.addLeft = function (childs) {
		for (var i = 0; i < childs.length; i++) {
			if (childs.hasOwnProperty(i)) {
				if (i === 0) this.left = childs[0];
				else childs[i-1].left = childs[i];
			}
		}
	};
	this.addRight = function (childs) {
		for (var i in childs) {
			if (childs.hasOwnProperty(i)) {
				if (i === 0) this.right = childs[0];
				else childs[i-1].right = childs[i];
			}
		}
	};
	this.traverse = function () {
		if (this.left) this.left.traverse();
		if (this.right) this.right.traverse();
		return this
	};
	//Console printing
	this.printInOrder = function () {
		if (this.left) this.left.printInOrder();
		Essence.addToPrinter(this.payload + "->");
		if (this.right) this.right.printInOrder();
		Essence.addToPrinter("\r\n");
	};
	this.printPreOrder = function () {
		Essence.addToPrinter(this.payload + "->");
		if (this.left) this.left.printPreOrder();
		if (this.right) this.right.printPreOrder();
		Essence.addToPrinter("\r\n")
	};
	this.printPostOrder = function () {
		if (this.left) this.left.printPreOrder();
		if (this.right) this.right.printPreOrder();
		Essence.addToPrinter(this.payload + "->");
		Essence.addToPrinter("\r\n")
	};
	//Window printing
	this.inOrder = function (t, s, d, sym) {
		if (!t) t = "";
		if (!s) s = "&nbsp;&nbsp;";
		if (!d) d = 0;
		if (!sym) sym = "|-";
		
		if (this.left) this.left.inOrder(t + s, s, d + 1, sym);
		println(t + sym + this.payload + s+" (deepth = " + d+")");
		if (this.right) this.right.inOrder(t + s, s, d + 1, sym);
	};
	this.preOrder = function (t, s, d, sym) {
		if (!t) t = "";
		if (!s) s = "&nbsp;&nbsp;";
		if (!d) d = 0;
		if (!sym) sym = "|-";
		
		println(t + sym + this.payload + s+" (deepth = " + d+")");
		if (this.left) this.left.preOrder(t + s, s, d + 1, sym);
		if (this.right) this.right.preOrder(t + s, s, d + 1, sym)
	};
	this.postOrder = function (t, s, d, sym) {
		if (!t) t = "";
		if (!s) s = "&nbsp;&nbsp;";
		if (!d) d = 0;
		if (!sym) sym = "|-";
		
		if (this.left) this.left.postOrder(t + s, s, d + 1, sym);
		if (this.right) this.right.postOrder(t + s, s, d + 1, sym);
		println(t + sym + this.payload + s+" (deepth = " + d+")")
	};

	//Getter
	this.getInOrder = function (sym) {
		if (!sym) sym = "->";
		var order = "";
		
		if (this.left) order += this.left.getInOrder(sym);
		order += sym + this.payload;
		if (this.right) order += this.right.getInOrder(sym);
		return order
	};
	this.getPreOrder = function (sym) {
		if (!sym) sym = "->";
		var order = "";
		
		order += sym + this.payload;
		if (this.left) order += this.left.getPreOrder(sym);
		if (this.right) order += this.right.getPreOrder(sym);
		return order
	};
	this.getPostOrder = function (sym) {
		if (!sym) sym = "->";
		var order = "";
		
		if (this.left) order += this.left.getPostOrder(sym);
		if (this.right) order += this.right.getPostOrder(sym);
		return order + sym + this.payload
	};
	this.isLeaf = function () { //Is it an end of branch ?
		return !this.left && !this.right
	};
	this.find = function (n, method) {
		return (method.normal() === "bfs")? this.bfs(n): this.dfs(n)
	};
	this.dfs = function (n, d, td) { //Depth First Search
		if (!d) d = 0; //Depth
		if (!td) td = 0; //Total depth
		var stack = [];
		stack.push(this);
		while (stack != []) {
			d = 0;
			var cur = stack.pop();
			try {
				if (cur.payload === n) return [d, td]
			} catch (e) {
				return [-1, td]
			}
			if (cur.left) stack.push(cur.left);
			if (cur.right) stack.push(cur.right);
			d++;
			td++;
		}
	};
	this.bfs = function (n, b, tb) { //Breadth First Search
		if (!b) b = 0; //Breadth
		if (!tb) tb = 0; //Total breadth
		var queue = [];
		queue.unshift(this); //Add as the end
		while (queue != []) {
			b = 0;
			var cur = queue.pop(); //Get the first element of the queue
			try {
				if (cur.payload === n) return [b, tb]
			} catch(e) {
				return [-1, tb]
			}
			if (cur.left) queue.unshift(cur.left);
			if (cur.right) queue.unshift(cur.right);
			b++;
			tb++;
		}
	};
	this.sum = function () {
		var s = this.payload;
		if (this.left) s += this.left.sum();
		if (this.right) s += this.right.sum();
		return s
	};
	this.min = function () {
		var m = this.payload;
		if (this.left) m = Math.min(m, this.left.min());
		if (this.right) m = Math.min(m, this.right.min());
		return m
	};
	this.max = function () {
		var m = this.payload;
		if (this.left) m = Math.max(m, this.left.max());
		if (this.right) m = Math.max(m, this.right.max());
		return m
	};
	this.nbOfBranches = function (n) {
		if (!n) n = 0;
		if (this.left) n = this.left.nbOfBranches(n + 1);
		if (this.right) n = this.right.nbOfBranches(n + 1);
		return n
	};
	this.avg = function () {
		return this.sum()/this.nbOfBranches()
	};
	this.printBFS = function (sym) {
		if (!sym) sym = "->";
		var queue = [], res = "";
		queue.unshift(this); //Add as the end
		while (queue!=[]) {
			var cur = queue.pop(); //Get the first element of the queue
			res += cur + sym;
			try {
				if (cur.left) queue.unshift(cur.left);
				if (cur.right) queue.unshift(cur.right);
			} catch(e) {
				Essence.say(e + " caused " + this + ".printBFS(" + sym + ") to go wrong", "err");
			}
		}
		return sym
	};
	this.toString = function () {
		/* Essence.txt2print = "";
		this.printInOrder();
		return "Tree(" + Essence.txt2print + ")" */
		var str = "TreeNode(payload = " + this.payload + ", ";
		if (this.left) str += "left = " + this.left.toString();
		if (this.right) str += "right = " + this.right.toString();
		return str.substring(0, str.length) + ")"
	};
	this.toArray = function (singly) {
		var arr = [];
		if (this.left) singly? arr.push(this.left.toArray().toString().split(",")): arr.push(this.left.toArray());
		arr.push(this.payload);
		if (this.right) singly? arr.push(this.right.toArray().toString().split(",")): arr.push(this.right.toArray());
		return singly? arr.toString().split(","): arr
	};

	return this;
}

/**
 * @description Node
 * @param {*} [pl=1] Payload
 * @param {Node} [nx] Next node
 * @param {Node} [pv] Previous node
 * @this Node
 * @return {Node} Node
 * @constructor
 */
function Node (pl, nx, pv) {
	this.payload = pl || 1;
	this.next = nx; //Or new node()
	this.prev = pv;

	this.traverse = function () {
		if (this.next) this.next.traverse();
		Essence.say("payload: " + this.payload);
	};
	
	this.print = function () {
		if (this.next != null) this.next.print();
		Essence.print(this.payload + "=>");
	};
	
	this.printList = function () {
		if (this.next === null) Essence.txt2print += "->" + this.v;
		else this.next.printList();
		Essence.print("");
	};
	
	this.last = function () {
		if (this.next === null) return this;
		else return this.next.last()
	};
	
	this.append = function (n) {
		if (this.next === null) {
			this.next = new Node(n); //If there is no next node, link the new one here
			this.next.prev = this;
		}else this.next.append(n); //Else, append to next node
	};

	this.remove = function () {
		var n = this.next;
		this.next = n.next;
		n.next.prev = this;
	};

	this.reverse = function () {
		if (this.next == null) return this;
		else {
			var newHead = this.next.reverse();
			newHead.next = this;
			newHead.prev = null;
			this.prev = newHead;
			this.next = null;
			return newHead
		}
	};
		
	this.toString = function () {
		return "Node(payload = " + this.payload + ", previous = " + this.prev + ", next = " + this.next + ")"
	};
	
	this.equals = function (node) {
		return this.payload === node.payload && this.next.equals(node.next) && this.prev.equals(node.prev)
	};
	
	this.find = function (n, d) {
		if (!d) d = 0;
		if (this.payload === n) return d;
		if (this.next) return this.next.find(n, d + 1);
		return [-1, d]
	};

	return this;
}

/**
 * @description Path node
 * @param {number} g Total current cost
 * @param {number} h Total current heuristic
 * @returns {PathNode} Path node
 * @this PathNode
 * @constructor
 */
function PathNode (g, h) { //Nodes for path finding algs
	this.f = g + h || 1;
	this.parent = null;
	return this;
}

NTreeNode.inheritsFrom(TreeNode);
/**
 * @description N-ary tree node
 * @see TreeNode
 * @param {*} pl Payload
 * @param {TreeNode[]} ch Childs
 * @returns {NTreeNode} NTreeNode
 * @this NTreeNode
 * @constructor
 */
function NTreeNode (pl, ch) {
	this.payload = pl || 0;
	this.childs = ch || [];
	this.add = function (c) {
		this.childs.push(c);
	};
	this.traverse = function () {
		for (var c in this.childs) {
			if (this.childs.hasOwnProperty(c)) c.traverse();
		}
		return this
	};
	//Console printing
	this.printInOrder = function () {
		for (var i = 0; i < this.childs - 1; i++) {
			this.childs[i].printInOrder();
			Essence.addToPrinter(this.payload + "->");
			this.childs[i + 1].printInOrder();
			Essence.addToPrinter("\r\n");
		}
	};
	this.printPreOrder = function () {
		for (var i = 0; i < this.childs - 1; i++) {
			Essence.addToPrinter(this.payload + "->");
			this.childs[i].printInOrder();
			this.childs[i + 1].printInOrder();
			Essence.addToPrinter("\r\n");
		}
	};
	this.printPostOrder = function () {
		for (var i = 0; i < this.childs - 1; i++) {
			this.childs[i].printInOrder();
			this.childs[i + 1].printInOrder();
			Essence.addToPrinter(this.payload + "->");
			Essence.addToPrinter("\r\n");
		}
	};
	//Window printing
	this.inOrder = function (t, s, d, sym) {
		if (!t) t = "";
		if (!s) s = "&nbsp;&nbsp;";
		if (!d) d = 0;
		if (!sym) sym = "|-";

		for (var i = 0; i < this.childs - 1; i++) {
			this.childs[i].inOrder(t + s, s, d + 1, sym);
			println(t + sym + this.payload + s+" (deepth= " + d+")");
			this.childs[i].inOrder(t + s, s, d + 1, sym);
			Essence.addToPrinter("\r\n");
		}
	};
	this.preOrder = function (t, s, d, sym) {
		if (!t) t = "";
		if (!s) s = "&nbsp;&nbsp;";
		if (!d) d = 0;
		if (!sym) sym = "|-";

		for (var i = 0; i < this.childs - 1; i++) {
			println(t + sym + this.payload + s+" (deepth= " + d+")");
			this.childs[i].inOrder(t + s, s, d + 1, sym);
			this.childs[i].inOrder(t + s, s, d + 1, sym);
			Essence.addToPrinter("\r\n");
		}
	};
	this.postOrder = function (t, s, d, sym) {
		if (!t) t = "";
		if (!s) s = "&nbsp;&nbsp;";
		if (!d) d = 0;
		if (!sym) sym = "|-";

		for (var i = 0; i < this.childs - 1; i++) {
			this.childs[i].inOrder(t + s, s, d + 1, sym);
			this.childs[i].inOrder(t + s, s, d + 1, sym);
			println(t + sym + this.payload + s+" (deepth = " + d+")");
			Essence.addToPrinter("\r\n");
		}
	};
	//Getter
	this.getOrder = function (sym) {
		return this.childs.join(sym || "->");
	};

	this.isLeaf = function () { //Is it an end of branch ?
		return !isNon(this.childs)
	};

	this.find = function (n, method) {
		return (method.normal() === "bfs")? this.bfs(n): this.dfs(n)
	};
	this.dfs = function (n, d, td) { //Deepth First Search
		if (!d) d = 0; //Deepth
		if (!td) td = 0; //Total deepth
		for (var c in this.childs) {
			if (this.childs.hasOwnProperty(c)) c.dfs(n, d + 1, td++);
		}
		return [-1, td]
	};
	this.bfs = function (n, b, tb) { //Breadth First Search
		if (!b) b = 0; //Breadth
		if (!tb) tb = 0; //Total breadth
		var queue = [];
		queue.unshift(this); //Add as the end
		while (queue != []) {
			b = 0;
			var cur = new TreeNode(queue.pop()); //Get the first element of the queue
			if (cur.payload === n) return [b, tb];
			if (cur.left) queue.unshift(cur.left);
			if (cur.right) queue.unshift(cur.right);
			b++;
			tb++;
		}
		return [-1, tb]
	};
	this.sum = function () {
		var s = this.payload;
		for (var c in this.childs) {
			if (this.childs.hasOwnProperty(c)) s += c.payload;
		}
		return s
	};
	this.min = function () {
		var m = this.payload;
		for (var c in this.childs) {
			if (this.childs.hasOwnProperty(c)) m = Math.min(m, c.payload);
		}
		return m
	};
	this.max = function () {
		var m = this.payload;
		for (var c in this.childs) {
			if (this.childs.hasOwnProperty(c)) m = Math.max(m, c.payload);
		}
		return m
	};
	this.nbOfBranches = function (n) {
		if (!n) n = 0;
		for (var c in this.childs) {
			if (this.childs.hasOwnProperty(c)) n = c.nbOfBranches(n + 1);
		}
		return n
	};
	this.avg = function () {
		return this.sum() / this.nbOfBranches()
	};
	this.printBFS = function (t) {
		var queue = [], tab = t || "-"; //Better and easier than a Queue/QueueList
		queue.unshift(this); //Add as the end
		while (queue != []) {
			var cur = new TreeNode(queue.pop()); //Get the first element of the queue
			println(tab + ">" + cur.payload);
			tab += "-";
			for (var c in this.childs) {
				if (this.childs.hasOwnProperty(c)) queue.unshift(c);
			}
		}
	};
	this.toString = function () {
		/* Essence.txt2print = "";
		this.printInOrder();
		return "Tree(" + Essence.txt2print + ")" */
		var str = "TreeNode(payload= " + this.payload + ", ";
		for (var c in this.childs) {
			if (this.childs.hasOwnProperty(c)) str += c.toString();
		}
		return str.substring(0, str.length) + ")"
	};
	this.toArray = function (singly) {
		var arr = [];
		arr.push(this.payload);
		for (var c in this.childs) {
			if (this.childs.hasOwnProperty(c)) singly? arr.push(c.toArray().toString().split(",")): arr.push(c.toArray());
		}
		return singly? arr.toString().split(","): arr
	};

	return this;
}

/**
 * @description Mathematical set
 * @param {Array|*} [arr=[]] Array or element
 * @returns {Set} Set
 * @constructor
 * @this Set
 */
function Set (arr) {
	this.value = (isType(arr, "Array")? arr: [arr]) || [];
	this.size = function () {
		return this.value.length
	};
	
	this.add = function (item) {
		if (this.value.indexOf(item) === -1) {	
			if (isType(item, "Array")) this.value = this.value.concat(item);
			else this.value.push(item)
		}
	};

	this.remove = function (item) {
		if (this.value.indexOf(item) !== -1) {
			if (isType(item, "Array")) {
				for(var i = 0; i < item.length; i++) this.remove(item[i]);
			} else this.value = this.value.remove(item)
		}
	};

	this.clear = function () {
		this.value = []
	};

	this.isEmpty = function () {
		return this.value === []
	};

	this.contains = function (item) {
		if (isType(item, "Array")) {
			var c = true;
			for (var i = 0; i < item.length; i++) {
				if (!c) return false; //Reduce the cost of the operation by not doing any unecessary work
				c = c && this.contains(item[i]);
			}
			return c
		} else return this.value.indexOf(item) != -1
	};

	this.equals = function (s) {
		return this.value.toString() === s.value.toString()
	};

	this.isSame = function (s) { //Check if both sets have the same elements but not necessarily in the same order
		if (this.equals(s)) return true;
		var same = true;
		for (var i = 0; i < s.size(); i++) {
			if (!same) return false;
			same = same && this.contains(s.value[i]);
		}
		return same
	};
	
	this.toString = function () {
		return "Set(" + this.value.toString() + ")"
	};
	
	this.subset = function (s, e) {
		return this.value.slice(s, e + 1)
	};
	
	this.get = function (i) {
		return this.value[i]
	};
	
	this.first = function () {
		return this.value[0]
	};
	
	this.last = function () {
		return this.value[this.value.lastIndex()]
	};
	
	this.min = function (s, e) {
		return this.value.min(s, e)
	};
	
	this.max = function (s, e) {
		return this.value.max(s, e)
	};
	
	this.median = function (s, e) {
		return this.value.max(s, e)
	};

	return this;
}

SortedSet.inheritsFrom(Set);
/**
 * @description Sorted mathematical set
 * @this SortedSet
 * @see Set
 * @param {Array} arr Array
 * @returns {SortedSet} Sorted set
 * @constructor
 */
function SortedSet (arr) {
	this.value = arr || [];
	this.add = function (item) {
		if (this.value.indexOf(item) === -1) {
			if (isType(item, "Array")) this.value = this.value.concat(item);
			else this.value.push(item);
		}
		this.value.quickSort();
	};

	return this;
}

/**
 * @description Stack
 * @param {Array} [arr] Array
 * @param {number|null} [lim=null] Limit
 * @returns {Stack} Stack
 * @this Stack
 * @constructor
 */
function Stack (arr, lim) {
	this.value = isType(lim, "Number")? new Array(lim): [];
	this.limit = lim || null;
	if (arr) this.value.push(arr);
	
	this.peek = function () { //Returns the top value
		return this.value.last()
	};
	
	this.ground = function () { //Returns the bottom value
		return this.value[0]
	};
	
	this.push = function (item) {
		if (this.isFull()) throw new Error("Stack overflow !");
		isType(item, "Array")? this.value.append(item): this.value.push(item);
	};
	
	this.pop = function () {
		if (this.isEmpty()) throw new Error("Stack underflow !");
		var it = this.peek();
		this.value.pop(it);
		return it
	};
	
	this.isEmpty = function () {
		return this.value.length === 0
	};
	
	this.isFull = function () {
		return this.lim != null? this.value.length >= this.limit: false
	};
	
	this.size = function () {
		return this.value.length
	};
	
	this.toString = function () {
		return "Stack(" + this.value.toString() + ")"
	};
	
	this.equals = function (s) {
		return this.toString() === s.toString()
	};

	return this;
}

/**
 * @description Stack array
 * @param {number} sz Array size
 * @returns {StackArray} Stack array
 * @this StackArray
 * @see Stack
 * @constructor
 */
function StackArray (sz) {
	this.value = new Array(sz);
	this.top = -1;
	
	this.peek = function () { //Returns the top value
		return this.value[this.top]
	};
	
	this.push = function (item) {
		if (this.isFull()) throw new Error("Stack overflow !");
		if (isType(item, "Array")) {
			for(var i = 0; i < item.length; i++) this.push(item[i]);
		} else {
			this.top++;
			this.value[this.top] = item;
		}
	};
	
	this.pop = function (item) {
		if (this.isEmpty()) throw new Error("Stack underflow !");
		if (isType(item, "Array")) {
			for(var i = 0; i < item.length; i++) this.pop(item[i]);
		} else {
			var el = this.peek();
			this.top--;
			return el
		}
	};
		
	this.isEmpty = function () {
		return this.top<=-1
	};
	
	this.isFull = function () {
		return this.top >= this.value.length
	};
	
	this.size = function () {
		return this.top + 1
	};
	
	this.toString = function () {
		return "Stack(" + this.value.toString() + ")"
	};
	
	this.equals = function (s) {
		return this.toString() === s.toString()
	};

	return this;
}

/**
 * @description Stack list
 * @param {Array|*} [arr] Array or element
 * @returns {StackList} Stack list
 * @this StackList
 * @see Stack
 * @constructor
 */
function StackList (arr) {
	this.top = new Node();
	
	this.peek = function () { //Returns the top value
		return (this.isEmpty() || this.top == null)? null: this.top.next.payload
	};
	
	this.push = function (item) { 
		if (isType(item, "Array")) {
			for(var i = 0; i < item.length; i++) this.push(item[i]);
		} else {
			var n = new Node(item, this.top);
			this.top = n;
		}
		return this
	};
	if (arr) this.push(arr);

	this.pop = function (n) {
		if (!this.isEmpty()) throw new Error("I can't pop from an empty stack list");
		if (n) {
			for(var i = 0; i < n; i++) this.pop();
		} else {
			var el = this.top.payload;
			this.top = this.top.next;
			return el
		}
	};
	
	this.isEmpty = function () {
		return this.top == null
	};
	
	this.size = function (n) {
		return this.top != null? this.size(n + 1): n
	};

	return this;
}

/**
 * @description Queue
 * @param {Array|*} [arr] Array or element
 * @param {number|null} [lim=null] Limit
 * @returns {Queue} Queue
 * @this Queue
 * @constructor
 */
function Queue (arr, lim) {
	this.value = isType(lim, "Number")? new Array(lim): [];
	this.limit = lim || null;
	if (arr) this.value.push(arr);
	
	this.enqueue = function (item) {
		if (this.isFull()) throw new Error("Queue overflow !");
		isType(item, "Array")? this.value.preppend(item): this.value.unshift(item);
	};
	
	this.dequeue = function () {
		if (this.isEmpty()) throw new Error("Queue underflow !");
		var it = this.head();
		this.value.pop();
		return it
	};
	
	this.head = function () { //Returns the first value
		return this.value.last()
	};
	
	this.tail = function () { //Returns the last value
		return this.value[0]
	};
	
	this.isEmpty = function () {
		return this.value.length === 0
	};
	
	this.isFull = function () {
		return this.lim != null? this.value.length >= this.limit: false
	};
	
	this.size = function () {
		return this.value.length
	};
	
	this.toString = function () {
		return "Queue(head = " + this.head() + ", tail = " + this.tail() + ", value = " + this.value.toString() + ")"
	};
	
	this.equals = function (queue) {
		return this.toString() === queue.toString()
	};

	return this;
}

/**
 * @description Queue array
 * @param {Array|*} [arr=[]] Array or element
 * @returns {QueueArray} QueueArray
 * @this QueueArray
 * @see Queue
 * @constructor
 */
function QueueArray (arr) {
	this.value = arr || [];
	this.front = -1;
	this.back = -1;
	
	this.enqueue = function (item) {
		if (isType(item, "Array")) {
			for(var i = 0; i < item.length; i++) this.enqueue(item[i]);
		} else {
			if (this.isFull()) throw new Error("The queue is full");
			if (this.isEmpty()) {
				this.front++;
				this.back++;
				this.value[this.back] = item;
			} else {
				this.back = (this.back + 1) % this.value.length;
				this.value[this.back] = item;
			}
		}
	};
	
	this.dequeue = function () {
		var val;
		if (this.isEmpty()) throw new Error("I can't dequeue from an empty queue");
		if (this.front === this.back) {
			val = this.value[this.front];
			this.front = this.back = -1;
		}else {
			val = this.value[this.front];
			this.front = (this.front + 1) % this.value.length;
		}
		return val
	};

	this.isEmpty = function () {
		return this.front === -1 && this.back === -1
	};
	
	this.isFull = function () {
		return this.back>(this.front + 1) % this.value.length
	};
	
	this.size = function () {
		return this.value.length
	};
	
	this.toString = function () {
		return "Queue(front = " + this.front + ", back = " + this.back + ", value = " + this.value.toString() + ")"
	};
	
	this.equals = function (queue) {
		return this.toString() === queue.toString()
	};

	return this;
}

/**
 * @description Queue list
 * @this QueueList
 * @returns {QueueList} QueueList
 * @todo Probably add the pre-init similar to StackList() ?
 * @constructor
 * @see Queue
 */
function QueueList () {
	this.front = null;
	this.back = null;
	this.len = 0;
	
	this.enqueue = function (item) {
		if (isType(item, "Array")) {
			for(var i = 0; i < item.length; i++) this.enqueue(item[i]);
		} else {
			var n = this.back != null? new Node(item, this.back, null): new Node(item);
			if (this.back.prev != null) this.back.prev = n;
			this.back = n;
			this.len++;
		}
		return this
	};
	
	this.dequeue = function () {
		if (this.isEmpty()) throw new Error("I can't dequeue an empty queue list");
		this.front = this.front.prev;
		this.len--;
		return this.front
	};

	this.isEmpty = function () {
		return this.len === 0 || this.back === null
	};
	
	this.size = function () {
		return this.len
	};
	
	this.toString = function () {
		var str = "", crt = this.front;
		while (crt != null) {
			str += "<-"+ crt.payload;
			crt = crt.prev;
		}
		return str
	};
	
	this.equals = function (queue) {
		return this.toString() === queue.toString()
	};
	
	this.remove = function (pl) {
		var crt = this.front;
		while (crt != null) {
			if (crt.payload != null && (crt.payload == pl || crt.payload.equals(pl))) crt = null;
			crt = crt.next;
		}
	};
	
	this.insertAt = function (i, pl) {
		this.back.next = new Node(pl);
		if (i === 0) this.front = new Node(pl);
		else if (i === this.len) this.back = new Node(pl);
		else if (i > this.len) this.enqueue(pl);
	};

	return this;
}

/**
 * @description A* path finding algorithm
 * @todo Make sure it works properly
 * @param {PathNode} start Starting node
 * @param {PathNode} goal Ending node
 * @returns {undefined}
 * @see PathNode
 */
function Astar (start, goal) {
	//Inspired from http://Heyes-jones.com/pseudocode.php
	//PathNode.f (score) = g (sum of all cost to get at this point) + h (heuristic: estimate of what it will take to get the goal)
	var nodeGoal = goal, nodeCurrent, nodeSucessor, _h;
	var openList = [start], closedList = [];
	while (openList.length > 0) {
		var scores = [], minScore = openList[0].f;
		for (var i in openList) {
			if (openList.hasOwnProperty(i)) {
				scores.push(openList[i].f);
				minScore = Math.min(minScore, openList[i].f);
			}
		}
		nodeCurrent = openList.filter(function (x) {
			if (x.f === minScore) return x
		})[0];
		openList = openList.filter(function (x) {
			if (x.f != minScore) return x
		});
		if (nodeCurrent === nodeGoal) {
			//Generate each states nodeSucessor that can come after nodeCurrent
			for (nodeSucessor in nodeCurrent) {
				if (nodeCurrent.hasOwnProperty(nodeSuccessor)) {
					nodeSuccessor.f = nodeCurrent.f + h(nodeSuccessor, nodeCurrent);
					var l = lookfor(nodeSuccessor, openList);
					if (l != -1) {
						l = l[0];
						//If the current node is better then continue
						if (nodeCurrent.f < openList[l] || (lookfor(nodeSuccessor, closedList) != -1 && nodeCurrent.f < openList[lookfor(nodeSuccessor, closedList)][0])) continue;
						openList = openList.remove(nodeSuccessor);
						closedList = closedList.remove(nodeSuccessor);
						nodeSuccessor.parent = nodeCurrent;
						_h = h(nodeSuccessor, nodeGoal);
						openList.push(nodeSuccessor);
					}
					closedList.push(nodeCurrent);
				}
			}
			throw "Solution found !"
		}
	}
}

/**
 * @description A* algorithm v2
 * @param {number[]} start Starting node
 * @param {number[]} goal Ending node
 * @param {Array} grid Grid
 * @returns {undefined}
 * @see reconPath, euclidianDist
 */
function A(start, goal, grid) { //JS version of https://en.wikipedia.org/wiki/A*_search_algorithm
	var closedSet = [], openSet = [start], cameFrom = [], gScore = [0], fScore = [euclidianDist(start, goal)];

	while (openSet.length > 0) {
		var current = openSet[fScore.indexOf(fScore.min())];
		if (current === goal) return reconPath(cameFrom, current, grid);
		openSet = openSet.remove(current);
		closedSet.push(current);
		var n = grid.neighbour(current[0], current[1]);
		Essence.say("neighbour of " + current + ":\n" + n.toStr(true), "info");
		for (var i = 0; i < n; i++) {
			if (closedSet.indexOf(n[i]) > -1) continue;
			var tentativeGScore = gScore[closedSet.indexOf(current)] + 1;
			if (closedSet.indexOf(n[i]) === -1) openSet.push(n[i]);
			else if (tentativeGScore >= gScore[i]) break;
		}

		cameFrom[i] = current;
		gScore[i] = tentativeGScore;
		fScore[i] = gScore[i] + euclidianDist(n[i], goal);
	}
}

/**
 * @description Path reconstructor
 * @param {Array} cameFrom List of visited nodes
 * @param {Array} current Current node
 * @param {Array} grid Grid
 * @returns {Array} Reconstructed path
 */
function reconPath(cameFrom, current, grid) {
	var totalPath = [current];
	while (current in keyList(cameFrom)) {
		current = cameFrom[grid.lookFor(current)];
		totalPath.append(current);
	}
	return totalPath;
}

/**
 * @description Iterative Depending A* path finding algorithm
 * @returns {undefined}
 * @see Astar
 */
function IDAstar () {
	
}

/**
 * @description Read and convert coordinates to code readable data
 * @param {string} str Coordinates
 * @param {boolean} isInt Convert the cells into integers
 * @returns {string[]|number[]} Coordinates
 */
function readCoord (str, isInt) {
	var c = str.slice(1, str.length - 1).split(", ");
	return isInt? [parseInt(c[0]), parseInt(c[1])]: c
}

/**
 * @description Remove the consecutive duplicated values in an array
 * @param {Array} arr Array
 * @returns {Array} Filtered array
 */
function rmConsecDuplicates (arr) {
	var out = [];
	var j = 0;
	for (var i = 0; i < arr.length; i++) {
		if (i === 0 || arr[i] != arr[i - 1]) out[j++] = arr[i];
	}
	j = 0;
	for (i = 0; i < arr.length - 1; i++) { //Double enforced check
		if (arr[i] != arr[i + 1]) out[j++] = arr[i];
	}
	return out
}

/**
 * @description Remove the duplicates of an array
 * @param {Array} arr Array
 * @returns {Array} Filtered array
 * @see rmConsecDuplicates
 */
function rmDuplicates (arr) {
	var out = rmConsecDuplicates(arr), j = 0;
	
	for (var i = 0; i < arr.length; i++) { //Pre-filtering
		if (i === 0 || arr[i] != arr[i-1] || (i >= 1 && arr[i] != arr[i-2]) || (i >= 2 && arr[i] != arr[i-3])) out[j++] = arr[i];
	}
	for (i = 0; i < out.length; i++) {
		for (j = 0; j < out.length; j++) {
			if (i != j && out[i] === out[j]) out[j] = undefined;
		}
	}
	return out.remove(undefined)
}

/**
 * @description Shape
 * @param {number} [x=0] X-coordinate
 * @param {number} [y=0] Y-coordinate
 * @param {number} [b=1] Border
 * @param {Vector} [v=new Vector()] Velocity
 * @constructor
 * @interface
 */
function Shape (x, y, b, v) {
	this.x = x || 0;
	this.y = y || 0;
	this.border = b || 1;
	this.vel = v || new Vector();
	this.norm = this.vel.getNormal();
	
	this.update = function () {
		this.x += this.vel.x;
		this.y += this.vel.y;
		this.norm = this.vel.getNormal();
	};
	
	this.stop = function () {
		this.vel = this.norm = new Vector();
	};
	
	this.toString = function () {
		return "Shape(x = " + this.x + ", y = " + this.y + ", border = " + this.border + ", velocity = " + this.vel + ")"
	};
	
	this.offset = function (s) {
		return (s === "l") ?  this.x - 1 - this.border: ((s === "r")? this.x + 1+ this.border: ((s === "u")? this.y - 1 - this.border: this.y + 1 + border))
	};
	
	this.bounce = function (n) {
		this.vel.reflect(n);
	};
	
	this.copy = function () {
		//return new Shape(this.x, this.y, this.b, this.vel)
	};
	
	this.mult = function (k) {
		this.x *= k;
		this.y *= k;
		return this
	};
	
	this.div = function (k) {
		this.x /= k;
		this.y /= k;
		return this
	};
	
	this.add = function (v) {
		this.x += v.x;
		this.y += v.y;
		return this
	};
	
	this.sub = function (v) {
		this.x -= v.x;
		this.y -= v.y;
		return this
	};
	
	this.draw = function () {
		
	};
	
	this.getSpeed = function () {
		return Math.sqrt(Math.pow(this.vel.x, 2) + Math.pow(this.vel.y, 2))
	};

	return this;
}

/**
 * @description A 2D/3D box
 * @param {number} [x=0] X-coordinate
 * @param {number} [y=0] Y-coordinate
 * @param {number} [z=0] Z-coordinate
 * @param {number} [w=10] Width
 * @param {number} [h=10] Height
 * @param {number} [d=.1] Depth
 * @param {number} [bsz=1] Border size
 * @param {string} [bclr="#000"] Border colour
 * @param {string} [bgclr="#fff"] Background colour
 * @param {number} [brd=0] Border radius
 * @returns {Box} Box
 * @this Box
 * @constructor
 */
function Box (x, y, z, w, h, d, bsz, bclr, bgclr, brd) {
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
	this.width = w || 10;
	this.height = h || 10;
	this.deepth = d || .1;
	this.borderSize = bsz || 1;
	this.borderColor = bclr || "#000";
	this.borderRadius = brd || 0;
	this.backgroundColor = bgclr || "#fff";
	this.ratio = (this.height/this.width).toNDigits(4);
	this.ratio3d = [this.ratio, this.height/non0(this.deepth), this.width/non0(this.deepth)].mean(4);
	this.draw = function () {
		
	};
	this.erase = function () {
		
	};
	this.rot = function (alpha, beta, theta) { //Rotation
		
	};
	this.translate = function (px, py, pz) {
		
	};
	this.toString = function () {
		return "Box(x = " + this.x + ", y = " + this.y + ", z = " + this.z + ", width = " + this.width + ", height = " + this.height + ", deepth = " + this.deepth + ", borderSize = " + this.borderSize + ", borderColor = " + this.borderColor + ", borderRadius = " + this.borderRadius + ", backgroundColor = " + this.backgroundColor + ")"
	};

	return this;
}

AABB.inheritsFrom(Shape);
/**
 * @description Axe Aligned Bounding Box
 * @param {number} [x=0] X-coordinate
 * @param {number} [y=0] Y-coordinate
 * @param {number} [w=10] Width
 * @param {number} [h=10] Height
 * @param {number} [b=1] Border
 * @param {Vector} [v=new Vector()] Velocity
 * @returns {AABB} AABB
 * @this AABB
 * @constructor
 * @see Shape
 */
function AABB (x, y, w, h, b, v) {
	this.x = x || 0;
	this.y = y || this.y;
	this.w = w || 10;
	this.h = h || this.w;
	this.border = b || 1;
	this.vel = v || new Vector();
	this.ratio = this.h / this.w;
	this.norm = this.vel.getNormal();
	
	this.getPoints = function () {
		return [new Pt(this.x, this.y), new Pt(this.x + this.w, this.y), new Pt(this.x + this.w, this.y + this.h), new Pt(this.x, this.y + this.h)]
	};
	
	this.equals = function (a) {
		return this.x == a.x && this.y == a.y && this.w == a.w && this.h == a.h && this.border == a.border && this.vel.equals(a.vel)
	};
	
	this.toString = function () {
		return "AABB(x = " + this.x + ", y = " + this.y + ", width = " + this.w + ", height = " + this.h + ", velocity = " + this.vel.toString() + ", border = " + this.border + ")"
	};
	
	this.hit = function (obj, s) {
		return (s === "l")?  obj.offset("l") <= this.offset("r"): ((s === "r")? obj.offset("r") >= this.offset("l"): ((s === "u")? obj.offset("u") <= this.offset("d"): ((s === "d")? obj.offset("d") >= this.offset("u"): (this.hit(obj, "l") || this.hit(obj, "r") || this.hit(obj, "u") || this.hit(obj, "d")))))
	};
	
	this.copy = function () {
		return new AABB(this.x, this.y, this.w, this.h, this.b, this.vel)
	};
	
	this.concat = function (a) {
		this.w = a.x - this.x - this.w; //Or w + a.x + a.w
		this.h = a.y - this.y - this.h; //Or h + a.y + a.h
	};

	this.deconcat = function (a) {
		this.w = (a.x - this.x) / 2; //(a.x + a.w)/2
		this.h = (a.y - this.y) / 2; //(a.y + a.h)/2
	};

	this.draw = function () {
		
	};

	this.getPerimeter = function () {
		return 2 * this.w + 2*this.h
	};

	this.getArea = function () {
		return this.w * this.h
	};

	this.getDiag = function () { //Diagnal
		return Math.sqrt(Math.pow(this.w, 2) + Math.pow(this.h, 2))
	};

	return this;
}

Circ.inheritsFrom(Shape);
/**
 * @description Circle
 * @param {number} [x=0] X-coordinate
 * @param {number} [y=0] Y-coordinate
 * @param {number} [r=10] Radius
 * @param {number} [b=1] Border
 * @param {Vector} [v=new Vector()] Velocity
 * @returns {Circ} Circle
 * @this Circ
 * @constructor
 * @see Shape
 */
function Circ (x, y, r, b, v) {
	this.x = x || 0;
	this.y = y || 0;
	this.r = r || 10;
	this.border = b || 1;
	this.vel = v || new Vector();
	this.norm = this.vel.getNormal();
	
	this.offset = function (s) {
		return (s === "l")?  this.x - this.r: ((s === "r")? this.x + this.r: ((s === "u")? this.y - this.r: this.y + this.r))
	};
	
	this.equals = function (a) {
		return this.x === a.x && this.y === a.y && this.r === a.r && this.border === a.border && this.vel.equals(a.vel)
	};
	
	this.toString = function () {
		return "Circ(x = " + this.x + ", y = " + this.y + ", radius = " + this.r + ", velocity = " + this.vel.toString() + ")"
	};
	
	this.hit = function (obj, s) { //More like a getHit(obj) but for also circle/circle situations
		if (obj.hit(this, "")) {
			this.bounce(obj.norm);
			this.update();
			return true
		}
		return false
	};
	
	this.draw = function () {
		
	};
	
	this.getCircumference = function () {
		return 2 * this.r * Math.PI
	};

	return this;
}

Pt.inheritsFrom(Shape);
/**
 * @description A point
 * @param {number} [x=0] X-coordinate
 * @param {number} [y=0] Y-coordinate
 * @returns {Pt} Point
 * @this Pt
 * @see Shape
 * @constructor
 */
function Pt (x, y) {
	this.prototype = Shape.prototype;
	this.x = x || 0;
	this.y = y || 0;
	this.vel = new Vector();
	
	this.equals = function (p) {
		return this.x == p.x && this.y == p.y
	};
	
	this.toString = function () {
		return "Pt(x = " + this.x + ", y = " + this.y + ")"
	};

	return this;
}

Line.inheritsFrom(Shape);
/**
 * @description Line
 * @param {number[]} a Starting point
 * @param {number[]} b Ending point
 * @returns {Line} Line
 * @this Line
 * @see Shape
 * @constructor
 */
function Line (a, b) {
	this.s = a;
	this.e = b;
	
	this.equals = function (l) {
		return this.s.equals(l.s) && this.e.equals(l.e)
	};
	
	this.toString = function () {
		return "Line(start = " + this.s.toString() + ", end = " + this.e.toString() + ")"
	};

	return this;
}

Vector.inheritsFrom(Shape);
/**
 * @description Vector
 * @see Shape
 * @this Vector
 * @param {number} [x=0] X-coordinate
 * @param {number} [y=0] Y-coordinate
 * @returns {Vector} Vector
 * @constructor
 */
function Vector (x, y) {
	this.prototype = Shape.prototype; //To avoid bugs
	this.x = x || 0;
	this.y = y || 0;
	
	this.toString = function () {
		return "Vector(x = " + this.x + ", y = " + this.y + ")"
	};
	
	this.equals = function (v) {
		return this.x == v.x && this.y == v.y
	};
	
	this.copy = function () {
		return new Vector(this.x, this.y)
	};
	
	this.normalise = function () {
		var v = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
		this.x /= v;
		this.y /= v;
	};
	
	this.getNormal = function () {
		return new Vector(this.x / Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)), this.y / Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)))
	};
	
	this.zero = function () {
		this.x = this.y = 0;
		return this
	};
	
	this.neg = function () {
		this.x = -this.x;
		this.y = -this.y;
		return this
	};
	
	this.dot = function (v) {
		return this.x * v.x + this.y * v.y
	};
	
	this.cross = function (v) {
		return this.x * v.y-this.y * v.x
	};
	
	this.lenSq = function () {
		return Math.pow(this.x, 2) + Math.pow(this.y, 2)
	};
	
	this.length = function () {
		return Math.sqrt(this.lenSq())
	};
	
	this.reflect = function (normal) { //.. on a normal
		var n = normal.copy() || this.normal.copy();
		n.mult(2 * this.dot(normal || this.normal));
		this.sub(n);
		return this
	};
	
	this.angle = function (v) {
		return Math.acos((this.x * v.x + this.y * v.y)/(this.length() * v.length()))
	};

	return this;
}

Polygon.inheritsFrom(Shape);
/**
 * @description Polygon
 * @this Polygon
 * @see Shape
 * @param {Array} pts Points
 * @param {number} [b=1] Border
 * @param {Vector} [v=new Vector()] Velocity
 * @returns {Polygon} Polygon
 * @constructor
 */
function Polygon (pts, b, v) {
	this.points = pts;
	this.border = b || 1;
	this.vel = v || new Vector();
	this.norm = this.vel.getNormal();
	
	this.equals = function (a) {
		var eq = true;
		for (var p in this.points) {
			if (this.points.hasOwnProperty(p) && a.points.hasOwnProperty(p)) eq = eq && this.points[p].equals(a.points[p]);
		}
		return eq && this.border === a.border && this.vel.equals(a.vel)
	};
	
	this.toString = function () {
		var ptStr = "[";
		for (var p in this.points) {
			if (this.points.hasOwnProperty(p)) ptStr += this.points[p].toString() + ", ";
		}
		ptStr += "]";
		return "Polygon(points = " + ptStr + ", velocity = " + this.vel.toString() + ", border = " + this.border + ")"
	};
	
	this.hit = function (obj, s) {
		return (s === "l")?  obj.offset("l") <= this.offset("r"): ((s === "r")? obj.offset("r") >= this.offset("l"): ((s === "u")? obj.offset("u") <= this.offset("d"): ((s === "d")? obj.offset("d") >= this.offset("u"): (this.hit(obj, "l") || this.hit(obj, "r") || this.hit(obj, "u") || this.hit(obj, "d")))))
	};
	
	this.copy = function () {
		return new Polygon(this.points, this.b, this.vel)
	};
	
	this.draw = function () {
		
	};

	return this;
}

/**
 * @description A basic HTML table
 * @param {NumberLike} caption Caption
 * @param {Array} rows Rows of the table
 * @param {string} id ID of the table
 * @param {string} [style] Style of table
 * @param {boolean} [split=false] Split rows into multiple columns
 * @param {string[]} [cellIds] Ids of each cells
 * @returns {string} HTML code
 * @since 1.0
 * @func
 */
function simpleTable (caption, rows, id, style, split, cellIds) {
	if (isNon(style)) style = "";
	var tab = "<table id='" + (id || "t") + "' style='" + style + "' cellspacing=0 cellpadding=2>" + (caption? "<caption>" + caption + "</caption>": "");
	for (var i = 0; i < rows.length; i++) {
		tab += "<tr>";
		if (split) {
			for(var j = 0; j < rows[i].length; j++) tab += "<td id='" + (id || "t") + (isNon(cellIds)? i+"_"+j: cellIds[i][j]) + "'>" + rows[i][j] + "</td>";
		} else  tab += "<td id='" + (id || "t") + (isNon(cellIds)? i: cellIds[i]) + "'>" + rows[i] + "</td>";
		tab += "</tr>";
	}
	tab += "</table><style>table{background: #000;}table, td {border: 1px solid #000; color: #000; background: #fff;} tr:nth-child(even) td{background: #ddd;} tr td:hover{background: #bbb;}</style>";
	return tab
}

/**
 * @description Row HTML table
 * @param {string|number} caption Caption
 * @param {Array} headerRows Row headers
 * @param {Array} rows Rows of the table
 * @param {string} id ID of the table
 * @param {boolean} [split=false] Split rows into multiple columns
 * @param {string} [style] Style of table
 * @param {string[]} [cellIds] Ids of each cells
 * @returns {string} HTML code
 */
function rowTable (caption, headerRows, rows, id, split, style, cellIds) {
	if (isNon(style)) style = "";
	var tab = "<table id='" + (id || "t") + "' style='" + style + "' cellspacing=0 cellpadding=2>" + (caption? "<caption>" + caption + "</caption>": "");
	//var rowspan = (headerRows.length <= rows.length)? rows.length/headerRows.length: headerRows.length/rows.length;
	//console.log(rowspan);
	for (var i = 0; i < rows.length; i++) {
		tab += headerRows? "<tr><th>" + headerRows[i] + "</th>": "<tr>";
		if (split) {
			for (var j = 0; j < rows[i].length; j++) {
				tab += "<td id='" + (id || "t") + (isNon(cellIds)? i+"_"+j: cellIds[i][j]) + "'>" + rows[i][j] + "</td>";
			}
		} else tab += "<td id='" + (id || "t") + (isNon(cellIds)? i: cellIds[i]) + "'>" + rows[i] + "</td>";
		tab += "</tr>";
	}
	tab += "</table><style>table{background: #000;}table, td, th{border: 1px solid #000; color: #000; background: #fff;}tr:nth-child(even) td, tr:nth-child(even) th{background: #ddd;}tr td:hover, tr th:hover{background: #bbb;}</style>";
	return tab
}

/**
 * @description Column HTML table
 * @param {string|number} caption Caption
 * @param {Array} headerCols Row headers
 * @param {Array} cols Cols of the table
 * @param {string} id ID of the table
 * @param {boolean} [split=false] Split columns into multiple rows
 * @param {string} [style] Style of table
 * @param {string[]} [cellIds] Ids of each cells
 * @returns {string} HTML code
 */
function colTable (caption, headerCols, cols, id, split, style, cellIds) {
	if (isNon(style)) style = "";
	var tab = "<table id='" + (id || "t") + "' style='" + style + "' cellspacing=0 cellpadding=2>" + (caption? "<caption>" + caption + "</caption>": "");
	//var colspan = (headerCols.length <= cols.length)? cols.length/headerCols.length: headerCols.length/cols.length;
	//console.log(colspan);
	if (headerCols) {
		tab += "<tr>";
		for (var i = 0; i < headerCols.length; i++) {
			tab += "<th>" + headerCols[i] + "</th>";
		}
		tab += "</tr>";
	}
	for (i = 0; i < cols.length; i++) {
		tab +="<tr>";
		if (split) {
			for (var j = 0; j < cols[i].length; j++) {
				tab += "<td id='" + (id || "t") + (isNon(cellIds)? i+"_"+j: cellIds[i][j]) + "'>" + cols[j][i] + "</td>";
			}
		} else tab += "<td id='" + (id || "t") + (isNon(cellIds)? i: cellIds[i]) + "'>" + cols[i] + "</td>";
		tab += "</tr>"
	}
	tab += "</table><style>table{background: #000;}table, td, th{border: 1px solid #000; color: #000; background: #fff;}tr:nth-child(even) td{background: #ddd;}tr td:hover{background: #bbb;}</style>";
	return tab
}

/**
 * @description Complex HTML table
 * @param {string|number} caption Caption
 * @param {Array} headerRows Row headers
 * @param {Array} rows Rows of the table
 * @param {Array} headerCols Columns Headers
 * @param {string} id ID of the table
 * @param {boolean} [split=false] Split rows into multiple columns
 * @param {string} [style] Style of table
 * @param {string[]} [cellIds] Ids of each cells
 * @returns {string} HTML code
 */
function complexTable (caption, headerRows, rows, headerCols, id, split, style, cellIds) {
	if (isNon(style)) style = "";
	var tab = "<table id='" + (id || "t") + "' style='" + style + "' cellspacing=0 cellpadding=2>" + (caption? "<caption>" + caption + "</caption><tr><td></td>": "<tr><td></td>");
	for(var i = 0; i < headerCols.length; i++) tab += "<th>" + headerCols[i] + "</th>";
	tab += "</tr>";
	for (i = 0; i < rows.length; i++) {
		tab += (headerRows)? "<tr><th>" + headerRows[i] + "</th>": "<tr>";
		if (split) {
			for (var j = 0; j < rows[i].length; j++) {
				tab += "<td id='" + (id || "t") + (isNon(cellIds)? i + "_" + j: cellIds[i][j]) + "'>" + rows[i][j] + "</td>";
			}
		} else tab += "<td id='" + (id || "t") + (isNon(cellIds)? i: cellIds[i]) + "'>" + rows[i] + "</td></tr>";
		tab += "</tr>";
	}
	tab += "</table><style>table{background: #000;}table, td, th{border: 1px solid #000; color: #000; background: #fff;}tr:nth-child(even) td{background: #ddd;}tr td:hover{background: #bbb;}</style>";
	return tab
}

/**
 * @description HTML table with coloured empty cells
 * @param {NumberLike} caption Caption
 * @param {Array} cols Columns
 * @param {string[]} clrs Colours list
 * @param {string} id ID of the table
 * @param {boolean} [split=false] Split the cells into multiple ones
 * @param {string} [style] Style of the table
 * @returns {string} Colour HTML table
 * @since 1.0
 * @func
 */
function colourTable (caption, cols, clrs, id, split, style) {
	var tab = "<table id='" + (id || "c") + "' style='" + style + "' cellspacing=0 cellpadding=2>" + (caption? "<caption>" + caption + "</caption>": "");
	if (cols) {
		tab += "<tr>";
		for(var i = 0; i < cols.length; i++) tab += "<th>" + cols[i] + "</th>";
		tab += "</tr>";
	}
	for (i = 0; i < clrs.length; i++) {
		tab +="<tr>";
		if (split) {
			for(var j = 0; j < clrs[i].length; j++) tab += isValid(clrs[i][j], "color")? "<td style='background:" + clrs[i][j] + ";'><br /></td>": "<td>" + clrs[i][j] + "</td>";
		} else tab += "<td style='background:" + clrs[i] + ";'><br /></td>";
		tab +="</tr>"
	}
	tab += "</table><style>table{background: #000;}table, td, th{border: 1px solid #000; color: #000; background: #fff;}tr:nth-child(even) td{background: #ddd;}tr td:hover{background: #bbb;}</style>";
	return tab
}

/**
 * @description Compare two matrices and display a table with all the different elements of $b in regards to $a
 * @param {Array} a Matrice a
 * @param {Array} b Matrice b
 * @param {boolean} [toHTML=false] HTML output
 * @returns {*} Comparison table result
 */
function tableCompare(a, b, toHTML) { //Compare two matrices and display a table with all the different elements
	if(a.size(true) != b.size(true)) throw new Error("You can't compare two matrices of different sizes");
	var res = copy(a);
	for (var i = 0; i < res.length; i++) {
		for (var j = 0; j < res[i].length; j++) res[i][j] = (a[i][j] === b[i][j])? "": b[i][j];
	}
	toHTML? println(simpleTable("Comparison", res)): console.table(res);
	return res;
}

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
			console.log("Processing " + this.content[i][j] + " at ", i, j);
		}
	}
	this.setStorage = function () {
		localStorage[this.name] = JSON.stringify(this.val)
	};
	this.html = complexTable(this.name, this.headerRow, this.content, this.headerCol, name);
	this.css = "<style>*{font-family:Consolas,Segoe UI,Tahoma,sans-serif;}table{background: #000;}table,td,th{border:1px solid #000;color:#000;background:#fff;}tr:nth-child(even) td,tr:nth-child(even) th{background:#eee;}</style>";
	this.disp = function (elmId) {
		var place = (elmId)? "#" + elmId: "body";
		$e(place).write(this.html + this.css, true);
		this.setStorage();
	};
	this.update = function () {
		if (localStorage[this.name]) this.val = JSON.parse(localStorage[this.name]);
		else this.setStorage();
		this.html = complexTable(this.name, this.headerRow, this.content, this.headerCol, name);
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
 * @description Database
 * @param {string} [name="DB"] Name
 * @param {Array} [headers=["Index", "Value"]] Column headers
 * @param {Array} [rows=[range(1), new Array(range(1).length).fill("...")].translate()] Rows
 * @param {Array} [headerRows] Rows headers
 * @return {DB} DB
 * @this DB
 * @constructor
 */
function DB (name, headers, rows, headerRows) {
	this.name = name || "DB";
	this.head = headers || ["Index", "Value"];
	this.val = rows || [range(1), new Array(range(1).length).fill("...")].translate();
	this.css = "<style>*{font-family:Consolas,Segoe UI,Tahoma,sans-serif;}table{background: #000;}table,td,th{border:1px solid #000;color:#000;background:#fff;}tr:nth-child(even) td,tr:nth-child(even) th{background:#eee;}</style>";
	this.html = "";
	this.rows = headerRows || false;
	this.build = function () {
		this.html = isNon(this.rows)? complexTable("", this.val.line(), this.val.block(1), this.head, this.name, true, this.css): complexTable("", this.rows, this.val, this.head, this.name, true, this.css);
	};
	this.fill = function (len) {
		this.val = [];
		for (var i = 0; i < len; i++) {
			this.val[i] = [i].append(new Array(range(len - 1 || 1).length).fill("..."));
		}
		return this.val;
	};
	this.save = function () {
		localStorage[this.name] = JSON.stringify(this.val);
		localStorage[this.name + "_head"] = JSON.stringify(this.head);
		localStorage[this.name + "_html"] = this.html;
		localStorage[this.name + "_rows"] = this.rows;
	};
	this.update = function () {
		if (localStorage[this.name]) {
			this.val = JSON.parse(localStorage[this.name]);
			this.head = JSON.parse(localStorage[this.name + "_head"]);
			this.html = localStorage[this.name + "_html"];
			this.rows = localStorage[this.name + "_rows"].split(",");//JSON.parse(localStorage[this.name + "_rows"]);
		} else this.save();
	};
	this.set = function (nval, i, j) {
		if ( j === -1) {
			for (var k = 0; k < nval.length; k++) this.val[i || 0][k] = nval[k];
		} else this.val[i || 0][j || 0] = nval || null;
	};
	this.get = function (i, j) {
		return !isNon(j)? this.val[i || 0][j]: this.val[i || 0];
	};
	this.find = function (val) {
		return lookfor(val, this.val);
	};
	this.see = function () {
		return copy(this.val).prepend(copy(this.head).reverse());
	};
	this.view = function (id) {
		var place = id? "#" + id: "body";
		$e(place).write(this.html + this.css, true);
	};
	this.add = function (vals) {
		this.val.append(vals.unshift(parseInt(this.val.last()[0]) + 1));
	};
	this.init = function () {
		this.build();
		this.update();
		console.table(this.see());
	};
	return this;
}

/**
 * @description Character to hexadecimal
 * @param {string} c Character
 * @returns {string} Hexadecimal code
 * @see hex2char
 */
function char2hex (c) {
	return conv(c.charCodeAt(0), 10, 16)
}

/**
 * @description Hexadecimal to character
 * @param {string|number} h Hexadecimal code
 * @returns {string} Character
 * @see char2hex
 */
function hex2char (h) {
	return String.fromCharCode(conv(h, 16))
}

/**
 * @description Character to binary
 * @param {string} c Character
 * @returns {string} Binary code
 * @see bin2char
 */
function char2bin (c) {
	return conv(c.charCodeAt(0), 10, 2)
}

/**
 * @description Binary to character
 * @param {number|string} b Binary code
 * @returns {string} Character
 * @see char2bin
 */
function bin2char (b) {
	return String.fromCharCode(conv(b, 2))
}

/**
 * @description Caesar crypting
 * @param {string|number} character Character to encrypt
 * @param {number} n Key
 * @returns {string} Cryped character
 */
function trans (character, n) {
	var code = character.charCodeAt(0);
	return String.fromCharCode(code + n)
}

/**
 * @description Text to number converter
 * @param {string} txt Text
 * @param {number} [base=10] Base
 * @returns {string} Converted text
 * @see num2txt
 */
function txt2num (txt, base) {
	var res = "";
	for (var i = 0; i < txt.length; i++) res += conv(txt.charCodeAt(i), 10, base || 10) + " ";
	return res.trimRight();
}

/**
 * @description Number to text
 * @param {number|string} num Number
 * @param {number} [base=10] Base
 * @returns {string} Converted number
 * @see txt2num
 */
function num2txt (num, base) {
	var res = "";
	for (var i = 0; i < num.split(" ").length; i++) res += String.fromCharCode(conv(num.split(" ")[i], base || 10));
	return res;
}

/**
 * @description Encrypt a text
 * @param {string} txt Text
 * @param {number} [key] Key
 * @returns {string} Encrypted text
 * @see decrypt
 */
function encrypt (txt, key) {
	if (!key) {
		var len = txt.length, extra = 0;
		var mid = Math.floor(len/2);
		
		mid = (len % 2 === 0)? txt.charCodeAt(mid): (txt.charCodeAt(txt[mid - 1]) + txt.charCodeAt(txt[mid])) / 2;
		if (mid >= 97 && mid <= 122) extra = 2;
		else if (mid >= 65 && mid <= 90) extra = 1;
		else if (mid - Math.floor(mid/2) * 2 === 0) extra = -1;
		else extra = 2;
		
		key = Math.round((Math.pow(2, 7) + txt.sum() - 48) / txt.prod()) + extra;
	}
	var res = "";
	for(var i = 0; i < txt.length; i++) res += trans(txt[i], key);
	len = mid = extra = undefined;
	
	return res
}

/**
 * @description Decrypt a text
 * @param {string} txt Encrypted text
 * @param {number} [key] Key
 * @returns {string} Decrypted text
 * @see encrypt
 */
function decrypt (txt, key) {
	var res = "";
	if (key) {
		for(var i = 1; i <= txt.length; i++) res += trans(txt[i - 1], key);
	} else {
		res = new Array(131073); //2 * Math.pow(2, 16) + 1
		for (i = -65536; i < 65537; i++) {
			res[i + 65536] = "";
			for (var j = 0; j < txt.length; j++) {
				res[i + 65536] += trans(txt[j], i % 65537);
			}
		}
	}
	console.log(console.table(res));
	return (!key)? complexTable("Decryption result for <i>" + txt + "</i>", range(-65536, 1, 65536), res, ["Key", "Result"], "decrypted_" + txt, false, Essence.css): txt + " => " + res;
	//simpleTable("Decryption result for <i>" + txt + "</i>", , res, "decrypt_" + txt, Essence.css)
}

/**
 * @description Alphabetically encode (regardless of the case) to hexadecimal
 * @param {string} txt Text
 * @returns {string} Encoded text
 * @see abcDecode
 */
function abcEncode (txt) {
	var code = new Array(txt.length);
	if (isType(txt, "String") || isType(txt, "Array")) {
		for (var i in txt) {
			if(txt.hasOwnProperty(i)) {
				switch (txt[i].toLowerCase()) {
					case " ": code[i] = "00";break;
					case "a": code[i] = "01";break;
					case "b": code[i] = "02";break;
					case "c": code[i] = "03";break;
					case "d": code[i] = "04";break;
					case "e": code[i] = "05";break;
					case "f": code[i] = "06";break;
					case "g": code[i] = "07";break;
					case "h": code[i] = "08";break;
					case "i": code[i] = "09";break;
					case "j": code[i] = 0xA;break;
					case "k": code[i] = 0xB;break;
					case "l": code[i] = 0xC;break;
					case "m": code[i] = 0xD;break;
					case "n": code[i] = 0xE;break;
					case "o": code[i] = 0xF;break;
					case "p": code[i] = 0x10;break;
					case "q": code[i] = 0x11;break;
					case "r": code[i] = 0x12;break;
					case "s": code[i] = 0x13;break;
					case "t": code[i] = 0x14;break;
					case "u": code[i] = 0x15;break;
					case "v": code[i] = 0x16;break;
					case "w": code[i] = 0x17;break;
					case "x": code[i] = 0x18;break;
					case "y": code[i] = 0x19;break;
					case "z": code[i] = 0x1A;break;
					case ".": code[i] = 0x1B;break;
					case ",": code[i] = 0x1C;break;
					case "!": code[i] = 0x1D;break;
					case "?": code[i] = 0x1E;break;
					case "(": code[i] = 0x1F;break;
					case ")": code[i] = 0x20;break;
					case ":":code[i] = 0x21;break;
					case ";": code[i] = 0x22;break;
					case "@": code[i] = 0x23;break;
					case "~": code[i] = 0x24;break;
					case "\'": code[i] = 0x25;break;
					case "\"": code[i] = 0x26;break;
					case "#": code[i] = 0x27;break;
					case "{": code[i] = 0x28;break;
					case "}": code[i] = 0x29;break;
					case "-": code[i] = 0x2A;break;
					case "\\": code[i] = 0x2B;break;
					case "/": code[i] = 0x2C;break;
					case "£": code[i] = 0x2D;break;
					case "$": code[i] = 0x2E;break;
					case "€": code[i] = 0x2F;break;
					case "+": code[i] = 0x30;break;
					case "*": code[i] = 0x31;break;
					case "%": code[i] = 0x32;break;
					case "^": code[i] = 0x33;break;
					case "°": code[i] = 0x34;break;
					default: code[i] = "x";
				}
			}
		}
		return isType(txt, "String")? code.join(""): code
	}
	return Essence.say("The parameter of abcEncode must be a string or an array.", "err")
}

/**
 * @description Alphabetically decode from hexadecimal to lowercase text.
 * @param {string} txt Hexadecimal code
 * @returns {string} Alphabtical text
 * @see abcEncode
 */
function abcDecode (txt) {
	var code = new Array(txt.length);
	if (isType(txt, "String") || isType(txt, "Array")) {
		for (var i = 0; i < txt.length; i += 2) {
			switch (txt.substr(i, 2)) {
				case "00": code[i] = " ";break;
				case "01": code[i] = "a";break;
				case "02": code[i] = "b";break;
				case "03": code[i] = "c";break;
				case "04": code[i] = "d";break;
				case "05": code[i] = "e";break;
				case "06": code[i] = "f";break;
				case "07": code[i] = "g";break;
				case "08": code[i] = "h";break;
				case "09": code[i] = "i";break;
				case "10": code[i] = "j";break;
				case "11": code[i] = "k";break;
				case "12": code[i] = "l";break;
				case "13": code[i] = "m";break;
				case "14": code[i] = "n";break;
				case "15": code[i] = "o";break;
				case "16": code[i] = "p";break;
				case "17": code[i] = "q";break;
				case "18": code[i] = "r";break;
				case "19": code[i] = "s";break;
				case "20": code[i] = "t";break;
				case "21": code[i] = "u";break;
				case "22": code[i] = "v";break;
				case "23": code[i] = "w";break;
				case "24": code[i] = "x";break;
				case "25": code[i] = "y";break;
				case "26": code[i] = "z";break;
				case "27": code[i] = ".";break;
				case "28": code[i] = ",";break;
				case "29": code[i] = "!";break;
				case "30": code[i] = "?";break;
				case "31": code[i] = "(";break;
				case "32": code[i] = ")";break;
				case "33": code[i] = ":";break;
				case "34": code[i] = ";";break;
				case "35": code[i] = "@";break;
				case "36": code[i] = "~";break;
				case "37": code[i] = "\'";break;
				case "38": code[i] = "\"";break;
				case "39": code[i] = "#";break;
				case "40": code[i] = "{";break;
				case "41": code[i] = "}";break;
				case "42": code[i] = "-";break;
				case "43": code[i] = "\\";break;
				case "44": code[i] = "/";break;
				case "45": code[i] = "£";break;
				case "46": code[i] = "$";break;
				case "47": code[i] = "€";break;
				case "48": code[i] = "+";break;
				case "49": code[i] = "*";break;
				case "50": code[i] = "%";break;
				case "51": code[i] = "^";break;
				case "52": code[i] = "°";break;
				default: code[i] = 0;
			}
		}
		return isType(txt, "String")? code.join(""): code
	}
	return Essence.say("The parameter of abcDecode must be a string or an array.", "err")
}

/**
 * @description Data encryption
 * @param {string|number} data Data
 * @returns {string|number} Encrypted data
 * @see ilDecrypt
 */
function ilEncrypt(data) {
	var res = isType(data, "String")? data.split(""): data;
	for (var i = 0; i < res.length; i++) res[i] = String.fromCharCode(abcModulus(data[i].charCodeAt(0) * data.length));
	return isType(data, "String")? res.join(""): res;
}

/**
 * @description Data decryption
 * @param {string|number} data Data
 * @returns {string|number} Decrypted data
 * @see ilEncrypt
 */
function ilDecrypt(data) {
	var res = isType(data, "String")? data.split(""): data;
	for (var i = 0; i < res.length; i++) res[i] = String.fromCharCode(abcModulus(data[i].charCodeAt(0) / data.length));
	return isType(data, "String")? res.join(""): res;
}

/**
 * @description RSA algorithm keys
 * @param {number} p Number #1
 * @param {number} q Number #2
 * @returns {number[]} Public key
 * @todo Find out how to get $e and $d
 * @constructor
 */
function RSA(p, q) {
	var n = p * q, z = (p - 1) * (q - 1), e, d; //1 < e < n & gcd(e, z) = 1

	Essence.say([n, d]); //Private key
	return [n, e]; //Public keys
}

/**
 * @description Encrypt/decrypt a message with the public/private key
 * @param {number} msg Message
 * @param {number[]} key Key
 * @returns {number} Encrypted/decrypted code
 * @see RSA
 */
function cryptRSA(msg, key) { //Encrypt $msg with the public/private key $key to encrypt/decrypt the message
	return Math.pow(msg, key[1]) % key[0];
}

/**
 * @description Keeps an ascii code in the alphabetical range in the ascii table
 * @param {number} code Ascii code
 * @returns {number} Clamped code
 * @see revClamp clamp
 */
function abcClamp(code) {
	return code === 32? 32: revClamp(clamp(code, 65, 122), 90, 97);
}

/**
 * @description x % b where x < a isn't allowed
 * @param {number} x Number
 * @param {number} a Lowest bound
 * @param {number} b Module
 * @returns {number} Result
 */
function modRange(x, a, b) {
	var r = x % (b + 1);
	return r + (r < a)? a + r: 0;
}

/**
 * @description Alphabetical modulus
 * @param {number} code Ascii code
 * @returns {number} Moded ascii code
 */
function abcModulus(code) {
	var m = code % 123;
	if (90 < m && m < 97) return m + abcModulus(Math.abs(getClosest(m, [90, 97]) - m));
	return m + ((m < 65 && m != 32)? 65 + m: 0);
}

/**
 * @description Brute force through R to find an x such that min <= x <= max and the condition is true for x
 * @param {number} min Minimum
 * @param {string} cond Condition
 * @param {number} max Maximum
 * @returns {number|boolean} X or false
 */
function bruteForceNum(min, cond, max) { //Brute force through R to find a x such that min <= x <= max and cond is true for x
	for (var x = min; x < max; x++) {
		if(eval(cond.replace(RegExpify("x"), x))) return x;
	}
	return false;
}

/**
 * @description (Ask to) bookmark a webpage
 * @param {string} url URL of the webpage
 * @param {string} title Title
 * @param {string} [elmId="body"] Element ID
 * @returns {undefined}
 */
function addFav (url, title, elmId) { //Url = http://Www...." title = "My Website"
	var place = elmId? "#" + elmId: "body";
	if (navigator.appName.substring(0, 3) === "Mic" && navigator.appVersion.substring(0, 1) >= 4) $e(place).write("<a href=\"#\" onClick=\"window.external.AddFavorite(" + url + ", " + title + ");return false;\">Bookmark this webpage</a><br />", true);
	else $e(place).write("Press CTRL + D to add this webpage to your bookmarks!", true)
}

/**
 * @description Browser check
 * @returns {checkBrowser} Browser check
 */
function checkBrowser () {
	this.ver = navigator.appVersion;
	this.dom = document.getElementById? 1: 0;
	this.ie5 = (this.ver.indexOf("MSIE 5") > -1 && this.dom)? 1: 0;
	this.ie4 = (document.all && !this.dom)? 1: 0;
	this.ns5 = (this.dom && parseInt(this.ver) >= 5)? 1: 0;
	this.ns4 = (document.layers && !this.dom)? 1: 0;
	this.bw = (this.ie5 || this.ie4 || this.ns4 || this.ns5);
	return this
}

/**
 * @description Browser detection system
 * @type {{init: BrowserDetect.init, searchString: BrowserDetect.searchString, searchVersion: BrowserDetect.searchVersion, dataBrowser: Array, dataOS: Array}}
 */
var BrowserDetect = { //Browser detection system
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i = 0;i < data.length;i++) {
			var dataString = data[i].string, dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) !=-1) return data[i].identity
			}else if (dataProp) return data[i].identity
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index ==-1) return;
		return parseFloat(dataString.substring(index + this.versionSearchString.length + 1))
	},
	dataBrowser: [{
		string: navigator.userAgent, subString: "Chrome", identity: "Chrome"
	}, {
		string: navigator.userAgent, subString: "OmniWeb", versionSearch: "OmniWeb/", identity: "OmniWeb"
	}, {
		string: navigator.vendor, subString: "Apple", identity: "Safari", versionSearch: "Version"
	}, {
		prop: window.opera, identity: "Opera", versionSearch: "Version"
	}, {
		string: navigator.vendor, subString: "iCab", identity: "iCab"
	}, {
		string: navigator.vendor, subString: "KDE", identity: "Konqueror"
	}, {
		string: navigator.userAgent, subString: "Firefox", identity: "Firefox"
	}, {
		string: navigator.vendor, subString: "Camino", identity: "Camino"
	}, { //For newer Netscapes (6+)
		string: navigator.userAgent, subString: "Netscape", identity: "Netscape"
	}, {
		string: navigator.userAgent, subString: "MSIE", identity: "Explorer", versionSearch: "MSIE"
	}, {
		string: navigator.userAgent, subString: "Gecko", identity: "Mozilla", versionSearch: "rv"
	}, { //For older Netscapes (4-)
		string: navigator.userAgent, subString: "Mozilla", identity: "Netscape", versionSearch: "Mozilla"
	}],
	dataOS: [{
		string: navigator.platform, subString: "Win", identity: "Windows"
	}, {
		string: navigator.platform, subString: "Mac", identity: "Mac"
	}, {
		string: navigator.userAgent, subString: "iPhone", identity: "iPhone/iPod"
	}, {
		string: navigator.userAgent, subString: "Android", identity: "HTC/Samsung/LG"
	}, {
		string: navigator.userAgent, subString: "BlackBerry", identity: "BlackBerry"
	}, {
		string: navigator.platform, subString: "Linux", identity: "Linux"
	}]
};
//BrowserDetect.init();

/**
 * @description Type a message
 * @param {string} msg Message
 * @param {Element|string} where Place to type the message
 * @param {boolean} [HTML=false] HTML flag
 * @returns {undefined}
 * @see $e writeMsg2
 */
function writeMsg (msg, where, HTML) {
	var txt, pos = 0;
	while (pos < msg.length + 10) {
		txt = msg.substring(pos, 0);
		isCustomType(where, "element")? where.write(txt, HTML): $e(where).write(txt, HTML);
		pos++;
	}
}

/**
 * @description Type a message
 * @param {string} msg Message
 * @param {string} slc Place to type the message
 * @param {boolean} [HTML=false] HTML flag
 * @param {number} [speed=150] Speed
 * @param {string} [txt=""] Text
 * @param {number} [pos=0] Position
 * @returns {undefined}
 * @see $n writeMsg
 */
function writeMsg2 (msg, slc, HTML, speed, txt, pos) {
	if(!txt) txt = "";
	if(!pos) pos = 0;
	if (pos < msg.length + 10) {
		txt = msg.substring(pos, 0);
		HTML? $n(slc).innerHTML = txt: $n(slc).innerText = txt;
		pos++;
		setTimeout("writeMsg2('" + msg + "', '" + slc + "', " + HTML + ", " + speed + ", '" + txt + "', " + pos + ")", speed || 150);
	}
}

/**
 * @description Display the date and at time at a particular place
 * @param {string} id ID of the element to be used
 * @returns {undefined}
 */
function dateTime (id) {
	var date = new Date();
	var year = date.getFullYear(), month = date.getMonth();
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var d = date.getDate(), day = date.getDay(), h = date.getHours();
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saterday"];
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
	GMT = (GMT >= 0)? "GMT + " + GMT: "GMT-" + GMT;
	var result = "We're " + days[day] + " " + d + " " + months[month] + " " + year + " and it's " + h + ":" + m + ":" + s + " " + tt + " " + GMT;
	$e("#" + id).write(result, true);
	setTimeout("dateTime(\"" + id + "\");", 1000);
}

/**
 * @description View/hide of an element with a particular id
 * @param {string} id ID
 * @param {number} [stackLayer=0] Stack layer
 * @returns {undefined}
 */
function viewHide (id, stackLayer) {
	if(!stackLayer) stackLayer = 0;
	if($e("#" + id).css("visibility") === "" && stackLayer < 1) viewHide(id, stackLayer + 1);
	if ($e("#" + id).css("visibility") === "visible") {
		$e("#" + id).setCSS("visibility", "hidden");
		$e("#btn_" + id).write("Hide");
	} else {
		$e("#" + id).setCSS("visibility", "visible");
		$e("#btn_" + id).write("View");
	}
}

/**
 * @description Process
 * @param {string} name Name of the process
 * @param {string} [auth="Anonymous"] Author
 * @param {string} [summup=""] Summary
 * @param {string} [ctt=""] Content
 * @returns {process} Process
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
 * @see database process
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
            };;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
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
 * @description Base64
 * @type {{PADCHAR: string, ALPHA: string, getbyte64: base64.getbyte64, decode: base64.decode, getbyte: base64.getbyte, encode: base64.encode}}
 * @source Somewhere
 */
var base64 = {
	PADCHAR: "=",
	ALPHA: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 + /",
	getbyte64: function (s, i) {
	/* "This is oddly fast, except on Chrome/V8.
		 Minimal or no improvement in performance by using an
		 object with properties mapping chars to value (eg. 'A': 0)" */
		i = this.ALPHA.indexOf(s.charAt(i || 0));
		if (i === -1) throw "Cannot decode base64";
		return i
	},
	decode: function (s) { // convert to string
		s += "";
		var gb64 = this.gb64;
		var pads, i, b10;
		var imax = s.length;
		if (imax === 0) return s;
		if (imax % 4 != 0) throw "Cannot decode base64";
		
		pads = 0;
		if (s.charAt(imax-1) === base64.PADCHAR) {
			pads = 1;
			if (s.charAt(imax-2) === base64.PADCHAR) pads = 2;
			// either way, we want to ignore this last block
			imax -= 4;
		}
	
		var x = [];
		for (i = 0; i < imax; i += 4) {
			b10 = (gb64(s, i) << 18) | (gb64(s, i + 1) << 12) | (gb64(s, i + 2) << 6) | gb64(s, i + 3);
			x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff, b10 & 0xff));
		}
		
		switch (pads) {
			case 1: 
				b10 = (gb64(s, i) << 18) | (gb64(s, i + 1) << 12) | (gb64(s, i + 2) << 6);
				x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff));
				break;
			case 2: 
				b10 = (gb64(s, i) << 18) | (gb64(s, i + 1) << 12);
				x.push(String.fromCharCode(b10 >> 16));
				break;
		}
		return x.join("")
	},
	getbyte: function (s, i) {
		var x = s.charCodeAt(i || 0);
		if (x > 255) throw "INVALID_CHARACTER_ERR: DOM Exception 5";
		return x
	},
	encode: function (s) {
		if (arguments.length != 1) throw "SyntaxError: Only arguments please";
		var pc = this.PADCHAR;
		var alpha = this.ALPHA;
		var gb = this.gb;
		
		var i, b10, x = [];

		s += "";
		
		var imax = s.length - s.length % 3;
		
		if (s.length === 0) return s;
		for (i = 0; i < imax; i += 3) {
			b10 = (gb(s, i) << 16) || (gb(s, i + 1) << 8) || gb(s, i + 2);
			x.push(alpha.charAt(b10 >> 18));
			x.push(alpha.charAt((b10 >> 12) & 0x3F));
			x.push(alpha.charAt((b10 >> 6) & 0x3f));
			x.push(alpha.charAt(b10 & 0x3f));
		}
		switch (s.length - imax) {
			case 1: 
				b10 = gb(s, i) << 16;
				x.push(alpha.charAt(b10 >> 18) + alpha.charAt((b10 >> 12) & 0x3F) + pc + pc);
				break;
			case 2: 
				b10 = (gb(s, i) << 16) || (gb(s, i + 1) << 8);
				x.push(alpha.charAt(b10 >> 18) + alpha.charAt((b10 >> 12) & 0x3F) + alpha.charAt((b10 >> 6) & 0x3f) + pc);
				break;
		}
		return x.join("")
	}
};

//BScripts functions (info/error/...)
/**
 * @description Message boxes
 * @param {string} type Type
 * @param {string} title Title
 * @param {string} text Text
 * @param {boolean} [isHTML=false] HTML flag
 * @param {Object} style Style
 * @param {string} [customIcon] Custom icon
 * @returns {undefined}
 * @todo Work on it
 */
function msgBox (type, title, text, isHTML, style, customIcon) {
	type = type.normal();
	var dS = { //Default style
		borderColor: "#bababa",
		borderSize: "1px",
		borderRadius: 5,
		backgroundColor: "#fbfbfb",
		textColor: "#000",
		textSize: "14px",
		textFont: "Calibrie",
		buttonBorderColor: "#aaa",
		buttonBorderSize: .8,
		buttonBorderRadius: 5,
		buttonColor: "#ccc",
		buttonTextColor: "#000",
		buttonTextSize: "14px",
		buttonText: "OK"
	}, icon = "", alt = "";
	if (type === "info") {
		icon = "img/info.png"; alt = "i";
		dS.borderColor = "#088";
		dS.backgroundColor = "rgba(0,255,255,1)";
		console.info("[Essence.js] " + title + ": " + text);
	} else if (type === "error") {
		icon = "img/error.png"; alt = "x";
		dS.borderColor = "#800";
		dS.backgroundColor = "rgba(255,0,0,1)";
		dS.textColor = "#FFF";
		console.error("[Essence.js] " + title + ": " + text);
	} else if (type === "warning") {
		icon = "img/warning.png"; alt = "/!\\";
		dS.borderColor = "#840";
		dS.backgroundColor = "rgba(255,127,0,1)";
		dS.textColor = "#FFF";
		dS.buttonText = "Got it";
		console.warn("[Essence.js] " + title + ": " + text);
	} else if (type === "question") {
		icon = "img/question.png"; alt = "?";
		dS.borderColor = "#008";
		dS.backgroundColor = "rgba(0,0,255,1)";
		dS.textColor = "#FFF";
		dS.buttonText = "Continue";
		console.log("[Essence.js] " + title + ": " + text + " ?");
	} else if (type === "success") {
		icon = "img/success.png"; alt = "v/";
		dS.borderColor = "#080";
		dS.backgroundColor = "rgba(0,255,0,1)";
		dS.textColor = "#FFF";
		dS.buttonText = "OK";
		console.log("[Essence.js] " + title + ": " + text);
	} else if (type === "load") {
		icon = "img/load.gif"; alt = "o";
		dS.borderColor = "#888";
		dS.backgroundColor = "rgba(255,255,255,1)";
		dS.textColor = "#FFF";
		dS.buttonText = "Continue";
		console.log("[Essence.js] " + title + ": " + text + "...");
	} else if (type === "custom") {
		icon = customIcon; alt = " ";
		if (style.borderColor) dS.borderColor = style.borderColor;
		if (style.borderSize) dS.borderSize = style.borderSize;
		if (style.borderRadius) dS.borderRadius = style.borderRadius;
		if (style.backgroundColor) dS.backgroundColor = style.backgroundColor;
		if (style.textColor) dS.textColor = style.textColor;
		if (style.textSize) dS.textSize = style.textSize;
		if (style.textFont) dS.textFont = style.textFont;
		if (style.buttonBorderColor) dS.buttonBorderColor = style.buttonBorderColor;
		if (style.buttonBorderSize) dS.buttonBorderSize = style.buttonBorderSize;
		if (style.buttonBorderRadius) dS.buttonBorderRadius = style.buttonBorderRadius;
		if (style.buttonColor) dS.buttonColor = style.buttonColor;
		if (style.buttonTextColor) dS.buttonTextColor = style.buttonTextColor;
		if (style.buttonTextSize) dS.buttonTextSize = style.buttonTextSize;
		if (style.buttonText) dS.buttonText = style.buttonText;
		console.log("[Essence.js] " + title + ": " + text);
	} else icon = false;
	var msg = document.createElement("div"), header = document.createElement("span"), ctt = document.createElement("p"), btn = document.createElement("input"), img = "<img src = " + icon + " alt = '" + alt + "' />";
	
	msg.id = "overlay";
	header.id = "msgBoxHeader";
	ctt.id = "msg";
	btn.id = "msgBoxBtn";
	btn.type = "button";
	btn.value = dS.buttonText;
	img.id = "msgImg";
	
	if (isHTML) {
		header.innerHTML = title;
		ctt.innerHTML = text;
	} else {
		header.innerText = title;
		ctt.innerText = text;
	}
	if ($e("#overlay").isEmpty()) {
		Essence.handleError("The #overlay element is voided", "essence.js", 1336);
		$e("#overlay").write("<div id = 'overlay'></div>", true);
		if (!$n("#overlay")) document.body.appendChild(document.createElement("div").id = "overlay")
	}
	$e("#overlay").setStyles(["visibility", "hidden", "position", "absolute", "left", 0, "top", 0, "width", "100 % ", "height", "100 % ", "text-align", "center", "z-index", "1000", "background", "rgba(127,127,127,.5)"]);
	$e("div#overlay").setStyles(["width", "300px", "margin", "100px auto", "background", dS.backgroundColor, "border", dS.borderSize + " solid " + dS.borderColor, "padding", "15px", "textAlign", "center", "boxShadow", "3px 3px 3px #333", "borderRadius", dS.borderRadius]);
	$e("#msgBoxHeader").setStyles(["fontSize", parseInt(dS.textSize + 2) + "px", "fontFamily", dS.textFont, "color", dS.textColor]);
	$e("#msg").setStyles(["fontSize", dS.textSize, "fontFamily", dS.textFont, "color", dS.textColor]);
	$e("#btnBoxBtn").setStyles(["border", dS.buttonBorderSize + " solid " + dS.buttonBorderColor, "color", dS.buttonTextColor, "fontSize", dS.buttonTextSize]);
	$e("#msgImg").setStyles(["position", "", "top", "2 % ", "left", "2 % "]);
	msg.appendChild(header, img, ctt, btn);
	document.body.appendChild(msg);
	btn.onClick = function () {
		document.body.removeChild(msg);
	}
}

/**
 * @description Generate a password
 * @returns {string} Password
 * @see genHash
 */
function genPassword () {
	var chars = [], sym = ["&", "~", "\"", "#", "\'", "{", "[", "(", "-", "|", "`", "_", "\\", "^", "@", ")", "]", " + ", "=", "}", " % ", " * ", "?", ",", ";", ".", "/", ":", "!", " ", ""], word = "";
	for (var i = 65; i < 123; i++) {
		if (i <= 90 || i >= 97) chars[i-65] = String.fromCharCode(i);
	}
	chars = chars.concat(sym, range(0, 1, 9)).remove(undefined);
	if (chars.indexOf(undefined) > -1) chars = chars.concat(sym, range(0, 1, 9)).remove(undefined);
	while (word.length < 20) word += chars[randTo(chars.length-1)];
	if (word.length < 20) word += chars[randTo(chars.length-1)];
	return word
}

/**
 * @description Generate a hash
 * @param {string} password Password
 * @todo To fix
 * @returns {string} Hash
 * @see genPassword
 */
function genHash (password) {
	var hash = "", k = (821 - password.sum()) / password.prod() * password.charCodeAt(0).toNDigits(1), rest, c;
	for (var i = 0; i < password.length; i++) {
		rest = password.charCodeAt(i) + k.toNDigits(1) % 255;
		//c = clamp(password.charCodeAt(i) + k, 32, 126);
		c = Math.abs(password.charCodeAt(i) + k).toNDigits(1);
		if (c < 32) c += 48;
		//console.log("k= " + k + "\trest (" + password.charCodeAt(i) + " + " + k + ")=" + rest + "\tc=" + c);
		//console.log("Adjust: " + parseInt(48 + Math.round(password.charCodeAt(password.length - 1) / 10 + rest)));
		hash += String.fromCharCode(clamp(c % 127, 32, 126));
	}
	return hash
}

/**
 * @description Gives the week day of the given data
 * @param {string} d Date (in the form dd/mm/yyyy)
 * @todo Getting it right
 * @returns {string} Week day
 */
function weekDay (d) { //D must be in the form dd/mm/yyyy and it gives the day of the week of that date
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], k = parseInt(d.split("/")[0]), m = parseInt(d.split("/")[1]), y = parseInt(d.split("/").last()), c;
	c = Math.floor(y / 100); //Century
	y = y % 100;
	return days[Math.round((1 + 2.6 * m - 0.2 + k + y + y / 4 + c / 4 - 2 * c) % 7) - 1]
}

/**
 * @description Kinch's week day finder
 * @param {string} d Date
 * @author Daniel "Kinch" Sheppard
 * @returns {string} Week day
 */
function dayOfWeek (d) { //Daniel "Kinch" Sheppard's method
	var day = parseInt(d.split("/")[0]), m = [0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5], days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]; //Months from Jan to Dec
	var y = parseInt(d.split("/").last()) % 100 + Math.floor(d.split("/").last() / 4), c = Math.floor(d.split("/").last() / 100 % 4), cCode;
	if (c === 0) cCode = 6;
	else if (c === 1) cCode = 4;
	else if (c === 2) cCode = 2;
	else cCode = 0;
	//console.log("m=" + m[parseInt(d.split("/")[1]) - 1] + "\ny=" + y + "\n" + "\ncCode = " + cCode + "\nRes = " + day + m[parseInt(d.split("/")[1]) - 1] + y + cCode);
	return days[(day + m[parseInt(d.split("/")[1]) - 1] + y + cCode) % 7]
}

/**
 * @description Linear gradient
 * @param {string|number} clrI Initial colour
 * @param {string|number} clrF Final colour
 * @param {number} [n=10] Number of shades
 * @returns {Array} Shades
 */
function linearGradient (clrI, clrF, n) {
	var i = parseInt(conv(clrI, 16)), f = parseInt(conv(clrF, 16));
	n = parseInt(n) || 10;
	var /*s = (f - i).sign(), */grad = [], inc = (f - i) / (n - 1);
	//console.log("i = " + i + "\tf = " + f + "\ns = " + s + "\ninc = " + inc);
	for(var j = 0; j < n; j++) grad.push(conv(i + j * inc, 10, 16));
	return grad
}

/**
 * @description Radial gradient
 * @param {string|number} clrI Initial colour
 * @param {string|number} clrF Final colour
 * @param {number} [n=10] Number of shades
 * @todo Add the essential part to make it work
 * @returns {Array} Shades
 */
function radialGradient (clrI, clrF, n) {
	var i = parseInt(conv(clrI, 16)), f = parseInt(conv(clrF, 16)), grad;
	n = parseInt(n) || 10;
	//Radial gradient
	return grad;
}

/**
 * @description Getting the URL parameters just like in PHP.
 * @param {string|string[]} p Parameter(s)
 * @param {Function} action Action to be done with the value(s) of the parameter(s)
 * @returns {undefined}
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
 * @description HTTP GET request. Equivalent to parseURL($name, function (x) {this = x})
 * @param {string} name Name of the key
 * @returns {string} Value of the key
 */
function GET (name) { //HTTP GET request, method <=> parseURL(name, function (x) {this = x})
	//noinspection JSValidateTypes
	if (name === (new RegExp("[?&]" + encodeURIComponent(name) + "=([^&]*)")).exec(location.search)) return decodeURIComponent(name[1]);
}

/**
 * @description HTTP POST request
 * @param {string} path Path of the file to post to
 * @param {Object} params Parameters
 * @source StackOverflow
 * @returns {undefined}
 */
function POST (path, params) {
	var form = document.createElement("form");
	form.setAttribute("method", "post");
	form.setAttribute("action", path);
	
	for (var key in params) {
		if (params.hasOwnProperty(key)) {
			var hiddenField = document.createElement("input");
			hiddenField.setAttribute("type", "hidden");
			hiddenField.setAttribute("name", key);
			hiddenField.setAttribute("value", params[key]);
			form.appendChild(hiddenField);
		}
	}
	document.body.appendChild(form);
	form.submit()
}

/**
 * @description HTTP PUT request
 * @returns {undefined}
 * @todo Fill it
 */
function PUT () {
	
}

/**
 * @description HTTP DELETE request
 * @returns {undefined}
 * @todo Fill it
 */
function DELETE () {
	
}

/**
 * @description Sort alphabetically an string|array
 * @param {string|Array} x String/array to alphabetically sort
 * @returns {string|Array} Sorted string|array
 */
function alphabetSort (x) {
	if (!x.isIterable()) throw new Error("alphabetSort cannot sort non iterable objects");
	if (isType(x, "String")) return x.split("").quickSort().join("");

	var res = x.uniform(), s = true, j = 1;
	while (s) {
		s = false;
		for (var k = 0; k < res.maxLength(); k++) {
			for (var i = 0; i < res.length - j; i++) {
				if (k == 0 && res[i].charAt(k) > res[i + 1].charAt(k)) { //Sort the by the first letter
					swap(res, i, i + 1);
					s = true;
				} else if (res[i].charAt(k - 1) === res[i + 1].charAt(k - 1) && res[i].charAt(k) > res[i + 1].charAt(k)) {
					swap(res, i, i + 1);
					s = true;
				}
			}
			j++;
		}
	}
	return res.trimAll("r")
}

// function occurrenceSort(arr) { //Sort the array from the most occurred element to the least the occured one
// 	var ol = occurrenceList(arr), res = arr;
// 	console.log(ol);
// 	for (var l in ol) {
// 		if (ol.hasOwnProperty(l)) {
// 			var c = l;
// 			for (var i in ol) {
// 				if (ol.hasOwnProperty(i) && ol[i] < ol[l]) c = i;
// 			}
// 			if (l != c) swap(res, l, c);
// 		}
// 	}
// 	return res;
// 	/*
// function sSort(x){
//	for(i = 1; i<x.length; i++){
//	 var k = i;
//	 for(j = i+1; j<x.length; i++){
//		if (x[j] < x[k]) k = j;
//	 }
//	 if (i != k) swap(x, i, k);
//	 Essence.say(x);
//	}
//	return x;
// }
// 	*/
// }

/**
 * @description Sort the array/string from the most occurring item to the least occurring ones
 * @param {Array|string} arr Array/string to sort
 * @returns {Array} Sorted occurrence list
 */
function occurrenceSort(arr) {
	var tmp = rmDuplicates(arr), res = [], counts = [];
	for (var i = 0; i < tmp.length; i++) counts[i] = arr.count(tmp[i]);
	while(tmp.length > 0) {
		for (i = 0; i < tmp.length; i++) {
			if (counts[i] === counts.max()) {
				res.push(tmp[i]);
				counts = counts.remove(counts[i]);
				tmp = tmp.remove(tmp[i]);
			}
		}
	}
	return res;
}

/**
 * @description Time how long an action took
 * @param {Function} act Action
 * @param {string} [pref="auto"] Preference (auto/none, ms/millisec, s/sec)
 * @param {*} params Parameters
 * @returns {string} Time
 */
function timeUp (act, pref, params) {
	var t1 = new Date(), t2 = 0;
	t1 = (t1.getMinutes() * 60 + t1.getSeconds()) * 1000 + t1.getMilliseconds();
	act(params);
	t2 = new Date();
	t2 = (t2.getMinutes() * 60 + t2.getSeconds()) * 1000 + t2.getMilliseconds();
	if (isNon(pref) || pref.slice(0, 4).toLowerCase() === "auto" || pref.slice(0, 4).toLowerCase() === "none") return (t2-t1 > 1000)? (t2-t1)/1000 + "s": (t2-t1) + "ms";
	else if (pref.toLowerCase() === "ms" || pref.slice(0, 8).toLowerCase() === "millisec") return (t2-t1) + "ms";
	else return (t2-t1)/1000 + "s"
}

/**
 * @description Find if x is in the list
 * @param {Array} list List
 * @param {*} x Element/term to find
 * @returns {boolean} Found or not
 */
function binarySearch (list, x) {
	list.quickSort();
	var i = 2, term = list[Math.floor(list.length / i)];
	while (term != x && i > 0) {
		if (term === x) return true;
		else {
			i *= 2;
			term = term < x? list[Math.floor(list.length / i)]: list[3 * Math.floor(list.length / i)];
		}
	}
	return term === x	
}

/**
 * @description Day/night mode
 * @type {boolean}
 */
$G["dnM"] = false;
/**
 * @description Switch between enabled or not for the day/night page vision
 * @param {boolean} [exch=false] Switch the mode
 * @returns {undefined}
 */
function daynightMode (exch) { //Switch between enabled or not for Day/Night page vision
	var h = new Date().getHours();
	if (exch) $G["dnM"] = !$G["dnM"];
	if ($G["dnM"]) {
		if (h >= 21) $e("body").setStyles(["backgroundColor", "#000", "color", "#fff"]);
		else $e("body").setStyles(["backgroundColor", "#fff", "color", "#000"]);
	} else Essence.say("You cannot use the day/night modder if it\'s disabled.", "warn")
}

/**
 * @description Compressed data using Huffman's approach while differentiating uppercase from lowercase letters
 * @param {string} [name="Archive"] Name of the archive
 * @param {string} [data=""] Data to compress
 * @returns {Archive} Archive
 * @constructor
 * @this {Archive}
 */
function Archive (name, data) { //Compressed data using Huffman's approach while differentiating uppercase and lowercase letters
	this.name = name || "Archive";
	this.data = data || ""; //Data to compress
	this.dictionnary = []; //Values should be in the format: letter = bitcode
	this.result = [];
	this.updateDict = function () {
		var lexiq = [], count, tmp = alphabetSort(data);
		for (var i = 0; i < this.data.length - 1; i++) { //Fill lexiq
			if (tmp[i] != tmp[i+ 1]) lexiq.push(tmp[i]);
		}
		lexiq = rmDuplicates(lexiq);
		//lexiq.debug();
		//console.log(lexiq.getOccurrences());
		count = new Array(lexiq.length);
		tmp = [];
		for (i = 0; i < lexiq.length; i++) {
			count[i] = data.count(lexiq[i]);
			//Essence.say("lexiq[" + i + "]=" + lexiq[i] + " is present " + timesLiteral(count[i]), "inf");
			tmp[i] = lexiq[i] + count[i];
		}
		//Essence.say("Lexiq of " + this.name + ": " + lexiq + "\ncounts: " + count);

		this.dictionnary = occurrenceSort(this.data);

		for (i = 0; i < this.dictionnary.length; i++) {
			this.result[i] = conv(i, 10, 2);
		}
	};

	this.getResult = function () {
		this.updateDict();
		var res = this.data;
		for (var i = 0; i < this.data.length; i++) {
			console.log(i + "// " + this.dictionnary[this.dictionnary.indexOf(this.data[i])]);
			res = res.replace(RegExpify(this.dictionnary[this.dictionnary.indexOf(this.data[i])]), this.result[i]);
		}

		return res;
	};
	return this
}

/**
 * @description Virtual Web Machine
 * @param {string} [name="Machine_5"] Name of the VWM
 * @param {number} [ver=5] Version of the VWM
 * @param {number} [cpy=1024] Capacity of the VWM (in bits).
 * @param {string} [type=""] Type of the memory used
 * @constructor
 * @this {Machine}
 * @returns {Machine} VWM
 * @see Memory
 */
function Machine (name, ver, cpy, type) {
	//ver (basis) := 1: binary, 2: ternary, 3: octal, 4: decimal, 5: hexadecimal, 6: base 36
	this.capacity = cpy || 1024; //pow(2, 10) bits = 128B
	this.version = ver || 5;
	this.name = name || "Machine_" + this.version;

	switch (this.version) {
		case 1: this.base = 2; break;
		case 2: this.base = 3; break;
		case 3: this.base = 8; break;
		case 4: this.base = 10; break;
		case 5: this.base = 16; break;
		case 6: this.base = 36; break;
		default: this.base = 16; break;
	}

	this.operation = function (a, b, op) {
		switch (op.normal()) {
			case "+": return a + b;
			case "-": return a - b;
			case "*": return a * b;
			case "/": return a / b;
			case "%": return a % b;
			case ">>": return a >> b;
			case "<<": return a << b;
			case ">>>": return a >>> b;
			case ">": return a > b;
			case "<": return a < b;
			case "|": return a | b;
			case "&": return a & b;
			case "^": return a ^ b;
			case "=": return a === b;
			case "!=": return a != b;
			case ">=": return a >= b;
			case "<=": return a <= b;
			case "||": return a || b;
			case "&&": return a && b;
			case "e": return a * Math.pow(10, b);
			case "e^": case "exp":
				return [Math.exp(a), Math.exp(b)];
			case "log": return log(a, b);
			case "++": return [a++, b++];
			case "--": return [a--, b--];
			case "+=": return a += b;
			case "-=": return a -= b;
			case "*=": return a *= b;
			case "/=": return a /= b;
			case "%=": return a %= b;
			case ".=": return a.concat(b);
			default: return a + "" + b;
		}
	};

	this.inv = function (data) {
		if (!isType(data, "String")) data += "";
		for(var i = 0; i < data.length; i++) data[i] = parseInt(this.base) - 1 - parseFloat(data[i]);
		return data
	};

	this.memory = new Memory(this.capacity, type || "", this.name);
	this.send = function (msg, to) {
		POST(to, "msg=" + this.parse(msg));
	};

	this.parse = function (data) { //Turn the machine string into a human readable one
		if (!isType(data, "Array")) data = this.base === 2? data.divide(8): data.divide(2);
		var res = "", deconvs = [];
		for (var i = 0; i < data.length; i++) {
			deconvs[i] = conv(data[i], this.base);
			res += String.fromCharCode(conv(data[i], this.base));
		}
		Essence.say(deconvs);
		return JSON.parse(res); //prone to errors when this.base != 16
	};

	this.unparse = function (data, noArr) { //Turn the data into a machine readable string
		var nd = JSON.stringify(data), res = "", codes = [];
		for (var i = 0; i < nd.length; i++) {
			codes[i] = nd.charCodeAt(i);
			res += this.base === 2? conv(nd.charCodeAt(i).toNDigits(8), 10, this.base): conv(nd.charCodeAt(i), 10, this.base);
		}
		//Essence.say("\'" + data + "\'= " + codes, "info");
		return noArr? res: (this.base === 2? res.divide(8): res.divide(2));
	};

	this.store = function (data) {
		this.memory.add(this.unparse(data));
		this.memory.save();
	};

	this.show = function () {
		for(var i = 0; i < this.memory.slots.length; i++) Essence.say(this.memory.slots[i]);
	};

	this.specs = function () { //Specifications about the machine
		return "Name: " + this.name + "\nCapacity: " + this.capacity + " bits\nMemory: \n" + this.memory.toString()
	};

	this.toString = function () {
		return "Machine("+ this.specs() + ")";
	};

	this.conv = function (data, base) {
		return conv(data, base || 36, this.base);
	};

	return this;
}

/**
 * @description Stack memory
 * @param {number} [cpy=1024] Capacity (in bits).
 * @param {string} [type="session"] Memory type
 * @param {string|number|boolean} [prefix] Prefix
 * @returns {Memory} Memory
 * @this {Memory}
 * @constructor
 */
function Memory (cpy, type, prefix) {
	this.capacity = cpy || 1024;
	this.slots = new Array(this.capacity);
	this.type = type === "local"? "local": "session";
	this.name = prefix? prefix + "_" + this.type + "M" + log(this.capacity): this.type + "M" + log(this.capacity);
	this.free = 0;
	this.save = function () {
		for (var i = 0; i < this.slots.length; i++) {
			if (this.type === "local") localStorage.setItem(this.name + "#" + i, this.slots[i]);
			else sessionStorage.setItem(this.name + "#" + i, this.slots[i]);
		}
	};

	this.remove = function (data) {
		this.slots.remove(JSON.stringify(data));
		if (this.type === "local") localStorage.setItem(this.getLocation(data), undefined);
		else sessionStorage.setItem(this.getLocation(data), undefined);
	};

	this.getLocation = function (data) { //Get the memory location of a data
		if (this.type === "local") {
			for (var i in localStorage) {
				if (localStorage.hasOwnProperty(i) && localStorage[i] === JSON.stringify(data)) return i
			}
		} else {
			for (i in sessionStorage) {
				if (sessionStorage.hasOwnProperty(i) && sessionStorage[i] === JSON.stringify(data)) return i
			}
		}
		return -1
	};

	this.clear = function () {
		this.slots = new Array(this.capacity);
		this.free = 0;
		if (this.type === "local") {
			for (var i in localStorage) {
				if (localStorage.hasOwnProperty(i) && i.indexOf(this.name) > -1) localStorage.removeItem(i);
			}
		} else {
			for (i in sessionStorage) {
				if (sessionStorage.hasOwnProperty(i) && i.indexOf(this.name) > -1) sessionStorage.removeItem(i);
			}
		}
	};

	this.add = function (data) { //Added but not saved
		this.slots[this.free++] = JSON.stringify(data);
	};

	this.print = function () {
		Essence.say(this.name + "\'s slots: ", "info");
		for (var i = 0; i < this.slots.length; i++) {
			try {
				Essence.say(i + ": " + JSON.parse(this.slots[i]))
			} catch(err) {
				Essence.say(i + ": ")
			}
		}
	};

	this.pop = function () {
		if (this.type === "local") localStorage.removeItem(this.getLocation(this.slots.last()));
		else sessionStorage.removeItem(this.getLocation(this.slots.last()));
		this.free--;
		this.slots.pop();
	};

	this.toString = function () {
		return this.type.capitalize() + " memory " + this.name + ": " + this.slots.toStr(true)
	};

	return this;
}

/**
 * @description Show some information about the event
 * @param {Event} evt Event
 * @returns {undefined}
 */
function EvtShow (evt) {
	alert("\tName: " + evt.name + "\nsource: " + evt.source + "\ndata: " + evt.data + "\ntarget: " + evt.target + "\ntime stamp: " + evt.timeStamp)
}

/**
 * @description Event console log
 * @param {Event} event Event
 * @returns {undefined}
 */
function evtLog (event) {
	for(var atr in event) {
		if (event.hasOwnProperty(atr)) Essence.say(atr + ": " + event[atr])
	}
}
/* Types
- EvalError: instance representing an error that occurs regarding the global function eval()
- InternalError: instance representing an error that occurs when an internal error in the JavaScript engine is thrown. E.g. "too much recursion"
- RangeError: instance representing an error that occurs when a numeric variable or parameter is outside of its valid range
- ReferenceError: instance representing an error that occurs when de-referencing an invalid reference
- SynthaxError: instance representing a syntax error that occurs while parsing code in eval()
- TypeError: instance representing an error that occurs when a variable or parameter is not of a valid type
- URIError: instance representing an error that occurs when encodeURI() or decodeURI() are passed invalid parameters
function MyError(message) { //From Mozilla ?
  this.name = 'MyError';
  this.message = message || 'Default Message';
  this.stack = (new Error()).stack
}
MyError.prototype = Object.create(Error.prototype);
MyError.prototype.constructor = MyError; */

InvalidParamError.inheritsFrom(Error);
/**
 * @description Invalid parameter error
 * @param {string} [msg="The parameter used at $lineNum is invalid"]  Message
 * @param {string} [fname=getFilename(true)] Filename
 * @param {number} [lineNum] Line number
 * @constructor
 * @returns {InvalidParamError} Error
 * @this {InvalidParamError}
 */
function InvalidParamError(msg, fname, lineNum) { //Invalid parameter
	this.name = "Invalid parameter error";
	this.fileName = fname || getFilename(true);
	this.lineNumber = lineNum;
	this.message = msg || "The parameter used at " + this.lineNumber + " is invalid !";
	this.stack = (new Error()).stack;

	return this;
}

/**
 * @description Test an error
 * @param {Error} err Error
 * @returns {undefined}
 */
function testErr(err) {
	try {
		throw err;
	} catch (e) {
		Essence.say("%cTested error%c:\n" + e.stack, "erro", "text-decoration: underline; color: #000;", "text-decoration: none; color: #000;");
	}
}

/**
 * @description Error testing for beginner's
 * @param {Function} fx Function
 * @param {*} [param] Parameter
 * @returns {undefined}
 */
function noobTest (fx, param) { //Source: https://scontent-lhr3-1.xx.fbcdn.net/hphotos-xfl1/v/t1.0-9/12705609_1071795346206130_3757520485028328706_n.jpg?oh = cb99a4624d9732414b787f7eb8437c73&oe = 57383223
	try {
		fx(param);
	} catch(e) {
		location.href = "http://Stackoverflow.com/search?q=[js]+" + e.message;
	}
}

/**
 * @description Old/initial tab
 * @type {string}
 */
$G["oldTab"] = "home";
/**
 * @description Change tabs
 * @param {string} name Name of the tab to switch to
 * @returns {undefined}
 */
function chTab (name) {
	$e("#tab_" + $G["oldTab"]).rmClass("tabOn");
	$e("#tab_" + $G["oldTab"]).addClass("tabOff");
	$e("#tab_" + name).rmClass("tabOff");
	$e("#tab_" + name).addClass("tabOn");
	$e("#contentTab_" + $G["oldTab"]).setCSS("display", "none");
	$e("#contentTab_" + name).setCSS("display", "block");
	$G["oldTab"] = name
}

/**
 * @description Move an HTML range left or right which was made using htmlRange
 * @param {string} id ID of the element
 * @param {number} [n=1] Incrementation
 * @returns {undefined}
 * @see htmlRange
 */
function moveHTMLRange (id, n) { //Moove an HTML range left or right which was made using htmlRange
	$e("#" + id).write(parseFloat($e("#" + id).val()) + (n || 1));
	$e("#" + id + "_val").write($e("#" + id).val())
}

/**
 * @description Dynamic HTML range
 * @param {string} id ID of the element
 * @param {number} [min=0] Minimum
 * @param {number} [val=0] Default value
 * @param {number} [max=100] Maximimum
 * @returns {string} HTML code
 * @see moveHTMLRange
 */
function htmlRange (id, min, val, max) {
	if (!id) throw new Error("htmlRange needs to know the id of the element implementing the range");
	Essence.addCSS(".arrow{cursor: pointer;font-size: 20px;vertical-align: middle}");
	return "<b class=\"arrow\" onClick=\"moveHTMLRange('" + id + "', -1)\">&triangleleft;</b><input type=\"range\" value=" + (val || 0) + " max=" + (max || 100) + " min=" + (min || 0) + " id=\"" + id + "\" onChange=\"$e('#" + id + "_val').write(this.value);\" /><b class=\"arrow\" onClick=\"moveHTMLRange('" + id + "', 1)\">&triangleright;</b><span id=\"" + id + "_val\">" + (val || "") + "</span>"
}

/**
 * @description HTML/JS animation swapping the field with the label
 * @param {string} id ID of the element
 * @param {string} lbl Label
 * @returns {undefined}
 * @see htmlInput
 */
function labelFieldSwap (id, lbl) {
	//if (!$e("#" + id).isEmpty() && $e("#" + id).val()!= lbl && $e("#" + id).val()!=$e("#lbl_" + id).val()) return false
	if ($e("#lbl_" + id).isEmpty()) $e("#lbl_" + id).write("&ensp;", true);
	if ($e("#" + id).isEmpty() || $e("#" + id).val() === "\b" || ($e("#" + id).val()!= lbl && $e("#" + id).size() < 2)) { //The field isn't being filled so label inside the field
		$e("#" + id).write($e("#lbl_" + id).val());
		$e("#lbl_" + id).write("&ensp;", true);
	} else { //The field is being filled up so label shown and no placeholding value in the field
		$e("#lbl_" + id).write(lbl || $e("#" + id).val());
		if ($e("#" + id).val() === lbl || $e("#" + id).val() === "") $e("#" + id).write("\b");
	}
}

/**
 * @description HTML/JS animation swapping the password field with the label
 * @param {string} id ID of the element
 * @param {string} lbl Label
 * @returns {undefined}
 * @see htmlPassword
 */
function labelPwSwap (id, lbl) {
	if ($e("#lbl_" + id).isEmpty()) $e("#lbl_" + id).write("&ensp;", true);
	if ($e("#" + id).isEmpty() || $e("#" + id).val() === "\b" || ($e("#" + id).val() != lbl && $e("#" + id).size() < 2)) { //The field isn't being filled so label inside the field
		$e("#" + id).type = "text";
		$e("#" + id).write($e("#lbl_" + id).val());
		$e("#lbl_" + id).write("&ensp;", true);
	} else { //The field is being filled up so label shown and no placeholding value in the field
		$e("#" + id).type = "password";
		$e("#lbl_" + id).write(lbl || $e("#" + id).val());
		if ($e("#" + id).val() === lbl || $e("#" + id).val() === "") $e("#" + id).write("\b");
	}
}

/**
 * @description Dynamic HTML input with an animation
 * @param {string} id ID of the element
 * @param {string} [type="text"] Input type
 * @param {string} lbl Label
 * @returns {string} HTML code
 * @see labelFieldSwap
 */
function htmlInput (id, type, lbl) {
	if (!id) throw new Error("htmlInput needs to know the id of the element implementing the input");
	if (!lbl) lbl = type || id;
	return "<label for='" + id + "' id='lbl_" + id + "'>&ensp;</label><br /><input type='" + (type || "text") + "' id='" + id + "' value='" + lbl + "' onFocus='labelFieldSwap(\"" + id + "\", \"" + lbl + "\")' onBlur='labelFieldSwap(\"" + id + "\", \"" + lbl + "\")' />"
}

/**
 * @description Dynamic HTML password input with an animation
 * @param {string} id ID of the element
 * @param {string} lbl Label
 * @returns {string} HTML code
 * @see labelPwSwap
 */
function htmlPassword (id, lbl) {
	if (!id) throw new Error("htmlPassword needs to know the id of the element implementing the input");
	if (!lbl) lbl = id;
	return "<label for='" + id + "' id='lbl_" + id + "'>&ensp;</label><br /><input type='text' id='" + id + "' value='" + lbl + "' onFocus='labelPwSwap(\"" + id + "\", \"" + lbl + "\")' onBlur='labelPwSwap(\"" + id + "\", \"" + lbl + "\")' />"
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
 * @description State history allowing undos and redos on the element while keeping track of the previous and following states
 * @param {*} elm Element
 * @this {virtualHistory}
 * @constructor
 * @returns {virtualHistory} Virtual history
 */
function virtualHistory (elm) {
	this.src = elm;
	this.DEFAULT_STATE = elm;
	this.states = new Set(this.src);
	this.state = 0;
	
	this.reset = function () { //Go back to the default state
		this.src = this.DEFAULT_STATE;
	};
	
	this.update = function (elm) { //Update the current state if needed
		if (this.src != elm) this.add(elm);
	};
	
	this.add = function (val) { //Add a state
		if (isType(val, "Array")) {
			for (var i = 0; i < val.length; i++) this.add(val[i]);
		} else {
			this.src = val;
			this.states.add(this.src);
			this.state++;
		}
	};

	this.get = function (i) {
		return this.states.get(i)
	};

	this.undo = function () {
		if (this.state === 0) throw new Error("Set underflow, it's not possible to undo to a non-existent state.");
		this.state--;
		this.src = this.get(this.state);
	};
	
	this.redo = function () {
		if (this.state ==(this.states.size()-1)) throw new Error("Set overflow, it's not possible to redo to a non-existent state.");
		this.state++;
		this.src = this.get(this.state);
	};
	
	this.getStates = function () {
		return this.states.toString()
	};
	
	this.isStateDefault = function () { //Check if the current state is the default
		return this.src == this.DEFAULT_STATE
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
 */
function Editor (id, lang, prev, parser, tb) {
	this.id = id || "#editor";
	this.node = $n(this.id);
	this.linesId = "#lines";
	this.linesNode = $n(this.linesId);
	this.nbLines = 0;
	this.language = lang || "none";
	this.previewer = prev;
	//this.parser = parser || (prev? this.previewer.associatedParser: null);
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
 */
$G["lorem"] = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,";

/**
 * @description Language parser
 * @param {string} [from="WebScript"] Parsed language
 * @param {string} [to="DHTML"] Resulting language
 * @param {Function} [customParse= function(code){...] Custom parsing
 * @this {Parser}
 * @constructor
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
		res = res.replace(/<icon size=(?:"|')(\w+)(?:"|') \/>/gm, "<img src='img/icon.png' class='icon' style='width: $1px; height: $1px;' />");
		res = res.replace(/<icon name=(?:"|')(\w+)(?:"|') \/>/gm, "<img src='img/$1.png' class='icon' />");
		res = res.replace(/<(s|m|l|xs|xl):icon name=(?:"|')(\w+)(?:"|') \/>/gm, "<img src='img/$2.png' class='$1-icon' />");
		res = res.replace(/<js>([\s\S]*?)<\/js>/gm,"<script type='text/javascript'>$1<\/script>");
		res = res.replace(/<js src=(?:"|')(\w+)(?:\"|\') \/>/gm,"<script type='text/javascript' src='$1'><\/script>");
		res = res.replace(/<vb>([\s\S]*?)<\/vb>/gm, "<script type='text/vbscript'>$1<\/script>");
		res = res.replace(/<vb src=(?:"|')(\w+)(?:\"|\') \/>/gm,"<script type = 'text/vbscript' src='$1'><\/script>");
		res = res.replace(/<css>([\s\S]*?)<\/css>/gm, "<style type='text/css'>$1</style>");
		res = res.replace(/<css href=(?:"|')([A-Za-z_ -\.]+)(?:"|') \/>/gm, "<link rel='stylesheet' type='text/css' href='$1' />");
		res = res.replace(/<charset=(?:"|')(\w + )(?:"|') \/>/gm, "<meta charset='$1' />");
		res = res.replace(/<author name=(?:"|')(\w + )(?:"|') href=(?:"|')(\w+)(?:"|') \/>/gm, "<meta name='author' content='$1' /><link rel='author' href='$2' />");
		res = res.replace(/<desc>(.*?)<\/desc>/gm, "<meta name='description' content='$1' />");
		res = res.replace(/<copy>(.*?)<\/copy>/gm, "<meta name='copyrights' content='$1' />");
		res = res.replace(/<lbl>(.*?)<\/lbl>/gm, "<label>$1</label>");
		res = res.replace(/<submit \/>/gm, "<input type='submit' />");
		res = res.replace(/<submit val=(?:"|')(\w+)(?:"|') \/>/gm, "<input type='submit' value='$1' />");
		res = res.replace(/<reset \/>/gm, "<input type='reset' />");
		res = res.replace(/<reset val=(?:"|')(\w+)(?:"|') \/>/gm, "<input type='reset' value = '$1' />");
		res = res.replace(/<hdn name=(?:"|')(\w+)(?:"|')>(.*?)<\/hdn>/gm, "<input type='hidden' name='$1' value='$2' />");
		res = res.replace(/<hdn name=(?:"|')(\w+)(?:"|') id=(?:"|')(\w+)(?:"|')>(.*?)<\/hdn>/gm, "<input type='hidden' name='$1' value='$3' id='$2' />");
		res = res.replace(/<txt ((?:id|name|class)(=(?:"|')(\w+)(?:"|'))(| ))\/>/gm, "<input type='text' />");
		res = res.replace(/<sql query=(?:"|')(.*?)(?:"|') \/>/gm, "<\?php\n\tif (mysqli_ping($$dbc)) {\n\t\t$r = mysqli_query($$dbc, '$1');\n\t}else printMsg('error', 'No ping');\n\?>");
		res = res.replace(/<sqlt table=(?:"|')(\w+)(?:"|') query=(?:"|')(.*?)(?:"|') \/>/gm, "<\?php\n\tif (mysqli_ping($$dbc)) {\n\t\techo 'Last updated at '._time().\"<br />\";selectTable($dbc, '$1', '$2');\n\t}else printMsg('error', 'No ping');\n\?>");
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
 * @param {Toolbar} [tb=this.editor.toolbar] Toolbar
 * @this {IDE}
 * @returns {IDE} IDE
 * @constructor
 * @see Editor Parser Preview Debugger
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
		if (this.language != "none") this.editor.language = this.debugger.language = this.parser.from = this.language;
		else this.editor.language = this.debugger.language = this.parser.from = l;
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

//AJAX
/**
 * @description Load a document/file using AJAX
 * @param {string} url URL
 * @param {Function} callback What to do when the document/file is loaded
 * @returns {undefined}
 */
function loadDoc (url, callback) {
	var xhr = window.XMLHttpRequest? new XMLHttpRequest(): new ActiveXObject("Microsoft.XMLHTTP");
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) callback(xhr);
	};
	xhr.open("GET", url, true);
	xhr.send()
}

/**
 * @description AJAX post
 * @param {*} data Data to send
 * @param {string} to Receiving URL
 * @param {boolean} xml XML/Text flag
 * @returns {undefined}
 */
function AJAXpost (data, to, xml) {
	var xhr = window.XMLHttpRequest? new XMLHttpRequest(): new ActiveXObject("Microsoft.XMLHTTP"), res;
	xhr.onreadystatechange = function () {
		//Request complete and HTTP OK response
		/* readyStates
		0: request not initialized
		1: server connection established
		2: request received 
		3: processing request 
		4: request finished and response is ready
		*/
		if (xhr.readyState === 4 && xhr.status === 200) res = xml? xhr.responseXML: xhr.responseText;
	};
	xhr.open("POST", to, true);
	if (xml) {
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(data);
	} else {
		xhr.setRequestHeader("Content-Type", "text/plain");
		xhr.send(data);
	}
}

/**
 * @description Load a JSON file
 * @param {string} [file="data"] Filename (without the '.json' bit)
 * @param {Function} cb Callback
 * @func
 * @since 1.1
 * @returns {*} JSON data
 */
function loadJSON (file, cb) {
	var xhr = window.XMLHttpRequest? new XMLHttpRequest(): new ActiveXObject("Microsoft.XMLHTTP");
	xhr.overrideMimeType("application/json");
	xhr.open("GET", (file || "data") + ".json", true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) cb(xhr.responseText);
	};
	xhr.send(null);
}

/**
 * @description Get a JSON file
 * @param {string} file JSON file
 * @return {*} JSON data
 */
function getJSON (file) {
	return loadJSON(file, function (ans) {
		return JSON.parse(ans);
	});
}

/**
 * @description HTPP status message
 * @param {number} status HTTP status (e.g: xhr.status)
 * @returns {string} Status message
 */
function getHTTPMsg (status) {
	switch (status) {
		//Information
		case 100: return "Continue";
		case 101: return "Switching Protocols";
		//Success
		case 200: return "OK";
		case 201: return "Created";
		case 202: return "Accepted";
		case 203: return "Non-Authoriative Information";
		case 204: return "No Content";
		case 205: return "Reset Content";
		case 206: return "Partial Content";
		//Redirection
		case 300: return "Multiple Choices";
		case 301: return "Moved Permanently";
		case 302: return "Found";
		case 303: return "See Other";
		case 304: return "Not Modified";
		case 305: return "Use Proxy";
		case 306: return "Unused";
		case 307: return "Temporary Redirect";
		//Client error
		case 400: return "Bad Request";
		case 401: return "Unauthorized";
		case 402: return "Payment Required";
		case 403: return "Forbidden";
		case 404: return "Not Found";
		case 405: return "Method Not Allowed";
		case 406: return "Not Acceptable";
		case 407: return "Proxy Authentification Required";
		case 408: return "Request Timeout";
		case 409: return "Conflict";
		case 410: return "Gone";
		case 411: return "Length Required";
		case 412: return "Precondition Failed";
		case 413: return "Requeust Entity Too Large";
		case 414: return "Request-url Too Long";
		case 415: return "Bad Request";
		case 416: return "Unsupported Media Type";
		case 417: return "Expectation Failed";
		//Server error
		case 500: return "Internal Server Error";
		case 501: return "Not Implemented";
		case 502: return "Bad Gateway";
		case 503: return "Service Unavailable";
		case 504: return "Gateway Timeout";
		case 505: return "HTTP Version Not Supported";
		default: return "Unknown status"
	}
}

/**
 * @description Cross Origin Resource Sharing request maker
 * @source {@link https://stackoverflow.com/questions/3076414/ways-to-circumvent-the-same-origin-policy}
 * @param {string} [method="get"] Method
 * @param {string} url URL
 * @returns {XMLHttpRequest} CORS request
 * @example
 * var request = createCORSRequest("get", "http://www.stackoverflow.com/");
 if (request){
    request.onload = function() {
        // ...
    };
    request.onreadystatechange = handler;
    request.send();
 }
 * @since 1.1
 * @func
 */
function createCORSRequest (method, url) {
	var xhr = window.XMLHttpRequest? new XMLHttpRequest(): new ActiveXObject("Microsoft.XMLHTTP");
	if ("withCredentials" in xhr) xhr.open(method || "get", url, true);
	else if (typeof XDomainRequest != "undefined") {
		xhr = new XDomainRequest();
		xhr.open(method || "get", url);
	} else xhr = null;
	return xhr;
}

/**
 * @description Templating + conversion
 	* @param {string} [name="Template"] Name
 * @param {string} [path="Template.jst"] Path
 * @param {string} [txt=""] Text/code containing the {{params}}
 * @param {string[]} [params=["tab", "date", "time", "timestamp", "br"]] Parameters
 * @param {boolean} [consoleSpecial=false] Resulting text formated to the console
 * @constructor
 * @this {Template}
 * @returns {Template} Template
 */
function Template (name, path, txt, params, consoleSpecial) {
	this.name = name || "Template";
	this.path = path || this.name + ".jst";
	this.params = params || ["name", "description", "version", "title", "path"]; //{{params}}
	this.special = ["tab", "date", "time", "timestamp", "br"]; // %special%
	this.specialEq = ["&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", getDate(), getTime(), getTimestamp(), "<br />"];
	if (consoleSpecial) {
		this.specialEq[0] = "\t";
		this.specialEq[4] = "\n";
	}
	this.text = txt || ""; //Text/code containing the {{params}}
	this.gen = function (obj) { //Generate a text/code from the template using the keys of the object
		var res = this.text, k = keyList(obj, true);
		for(var i = 0; i < k.length; i++) res = res.replace(RegExpify("{{" + k[i] + "}}"), obj[k[i]]);
		if (res.index)
		for(i = 0; i < this.special.length; i++) res = res.replace(RegExpify("%" + this.special[i] + "%"), this.specialEq[i], " ");
		return res
	};
	this.save = function (obj, name, ext) { //Save the template into a file or the converted version
		if (obj) save(this.gen(obj), (name || this.name) + "." + (ext || ".js"), ext || "javascript");
		else save(this.text, this.path, "javascript")
	};

	return this;
}

/**
 * @description System (a bit like in Java)
 * @type {{in: {recording: boolean, record: Sys.in.record, startRecording: Sys.in.startRecording, stopRecording: Sys.in.stopRecording, data: Array}, log: Sys.log, debug: Sys.debug, out: Sys.out, toString: Sys.toString}}
 */
var Sys = { //System
	in: {
		recording: false,
		record: function (keyStroke) { //Record the user input
			if (this.recording) this.data.push(getKey(keyStroke)[0]);
		},
		startRecording: function (keyStroke) {
			this.recording = true;
			this.record(keyStroke);
		},
		stopRecording: function () {
			this.recording = false;
			return this.data.last()
		}, data: []//Slot data containing the data typed in the window and not the console
	},
	log: function (data) {
		console.log("[System]  " + data);
	},
	debug: function (cb, args) {
		this.log("Debugging: " + cb.name);
		console.group();
		console.time("debug");
		cb(args);
		console.timeEnd("Time");
		console.trace();
		console.groupEnd();
	},
	out: function () {
		Essence.addToPrinter("\b" + this.in.data);
		return Essence.txt2print;
	}, toString: function () {
		return "[object System]";
	}
};

/**
 * @description Start the keystroke recording
 * @param {keyStroke} keyStroke Keystroke
 * @returns {undefined}
 */
window.onkeypress = function (keyStroke) {
	Sys.in.record(keyStroke);
	$G["lastKeyPair"] = getKey(keyStroke);
};

/**
 * @description Turn a string into a RegExp
 * @param {string} str String
 * @returns {RegExp} Resulting regular expression
 * @see unRegExpify
 */
function RegExpify (str) {
	return new RegExp(str.replace(/[|\\{}()[\]^$+*?.:\'<>%]/g, "\\$&"), "gm");
}

/**
 * @description Turn a RegExp into a string
 * @param {RegExp} re RegExp
 * @returns {string|Array} Resulting string
 * @see RegExpify
 */
function unRegExpify (re) { //Turn a regular expression into a string
	return re.toString().get(1, re.toString().lastIndexOf("/") - 1).remove("\\");
}

/**
 * @description Get the occurence list
 * @param {string} list String
 * @returns {{}} Occurent object list
 */
function occurrenceList (list) {
	if (!list.isIterable()) throw new Error("It must be an iterable object !");
	var nums = list.getOccurrences(true), chars = [], oc = list.getOccurrences(), res = {};
	for (var i = 0; i < oc.length; i++) chars[i] = oc[i].split(":")[0];
	for (i = 0; i < nums.length; i++) res[chars[i]] = nums[i];
	return res;
}

/**
 * @description Join two arrays into an object
 * @param {Array} keyArr Key array
 * @param {Array} valArr Value array
 * @returns {{}} Resulting object
 */
function Objectify (keyArr, valArr) {
	var res = {};
	for (var i = 0; i < keyArr.length; i++) {
		res[keyArr[i]] = valArr[i];
	}
	return res;
}

/**
 * @description Is $a closer to $x than $b
 * @param {number} x Number x
 * @param {number} a Number a
 * @param {number} b Number b
 * @returns {boolean} Truth
 */
function isCloser (x, a, b) {
	return Math.abs(x - a) < Math.abs(x - b);
}

/**
 * @description Get the closest option from the options to $x
 * @param {number} x Number
 * @param {number[]} opt Options
 * @returns {number} Closest number
 * @see isCloser
 */
function getClosest (x, opt) {
	var closest = opt[0];
	for (var i = 1; i < opt.length; i++) closest = isCloser(x, closest, opt[i])? closest: opt[i];
	return closest;
}

/**
 * @description Stream
 * @param {number} [initVal=0] Initial value
 * @param {string} [formula="x + 1"] Formula
 * @param {number} [nbVals] Number of values
 * @this {Stream}
 * @returns {Stream} Stream
 * @constructor
 */
function Stream (initVal, formula, nbVals) {
	this.start = initVal || 0;
	this.formula = formula || "x + 1";
	this.data = [this.start];

	this.next = function () { //use PEG.js to solve the issue ?
		this.data.push(eval(this.formula.multiReplace([
			[/x/g, this.data.last()], [/x0/g, this.start],
			[/pi/ig, Math.PI], [/e/ig, Math.E], [/sqrt(2)/ig, Math.SQRT2],
			[/(pow|max|min)\((.*?),(| )(.*?)\)/, "Math.$1($2, $3)"],
			[/(sqrt|cbrt|cos|sin|tan|acos|asin|cosh|sinh|tanh|acosh|asinh|atanh|exp|abs)\((.*?)\)/, "Math.$1($2)"],
			[/(ln|log|nthroot|clampTop|clampBottom)\((.*?),(| )(.*?)\)/, "$1($2, $3)"],
			[/(clamp)\((.*?),(| )(.*?),(| )(.*?)\)/, "$1($2, $3, $)"],
		])));
	};

	if (nbVals) {
		for (var i = 1; i < nbVals; i++) this.next();
	}

	this.toString = function () {
		return "Stream(start=" + this.start + ", formula=" + this.formula + ", data=" + this.data.toStr(true) + ")";
	};

	return this;
}

/**
 * @description Stream with multiple variables
 * @param {number} [initVal=0] Initial value
 * @param {string} [formula="x + y"] Formula
 * @param {number} [nbVals] Number of values
 * @returns {MultiStream} Multi-variable stream
 * @this {MultiStream}
 * @constructor
 * @see Stream
 */
function MultiStream (initVal, formula, nbVals) { //Stream with multiple variables
	this.start = initVal || 0;
	this.formula = formula || "x + y";
	this.data = [this.start];
	this.results = [];

	this.next = function () { //use PEG.js to solve the issue ?
		this.data.push(this.data.last().map(function (x) {
			return x + 1;
		}));
		this.results.push(this.compute(this.data.last()));
	};

	this.compute = function (data) { //Turn an expression into a number
		return eval(this.formula.multiReplace([
			[/x/g, data[0]], [/x0/g, this.start[0]],
			[/y/g, data[1]], [/y0/g, this.start[1]],
			[/z/g, data[2]], [/z0/g, this.start[2]],
			[/pi/ig, Math.PI], [/e/ig, Math.E], [/sqrt(2)/ig, Math.SQRT2],
			[/(pow|max|min)\((.*?),(| )(.*?)\)/, "Math.$1($2, $3)"], //fails on first occurrence
			[/(sqrt|cbrt|cos|sin|tan|acos|asin|cosh|sinh|tanh|acosh|asinh|atanh|exp|abs|e\^)\((.*?)\)/, "Math.$1($2)"],
			[/(ln|log|nthroot|clampTop|clampBottom)\((.*?),(| )(.*?)\)/, "$1($2, $3)"],
			[/(clamp)\((.*?),(| )(.*?),(| )(.*?)\)/, "$1($2, $3, $4)"]
		]))
	};

	this.results = [this.compute(this.start)];

	if (nbVals > 1) {
		for (var i = 1; i < nbVals; i++) this.next();
	}

	this.toString = function () {
		return "Stream(start=" + this.start.toStr(true) + ", formula=" + this.formula + ", data=" + this.data.toStr(true) + ", results=" + this.results.toStr(true) + ")";
	};

	return this;
}

/**
 * @description Numerical graph
 * @param {string} formula Formula
 * @param {number[]} [dims=[50, 50]] Dimensions
 * @param {string[]} [lbls=["x", "y"]] Axis labels
 * @param {string} [name="Graph"] Name
 * @param {number} precision Precision
 * @returns {Graph} Numerical graph
 * @this {Graph}
 * @constructor
 */
function Graph (formula, dims, lbls, name, precision) { //N-dimensional graph
	this.labels = lbls || ["x", "y"];
	this.name = name || "Graph";
	this.dimension = dims || new Array(this.labels.length).fill(50);
	this.equation = new Equation(formula); //y=...
	// this.stream = new Stream(0, this.formula.split("=")[1], this.dimension[0]);
	this.data = precision? range(0, precision, this.dimension[0], (Number(precision)).length()[1]): range(this.dimension[0]);
	for (var i = 0; i < this.data.length; i++) this.data[i] = [this.data[i], this.equation.compute({x: this.data[i]})];

	this.toString = function () {
		return "Graph(name=" + this.name + ", labels=" + this.labels.toStr(true) + ", dimension=" + this.dimension + ", equation=" + this.equation + ", data=" + this.data + ")";
	};

	return this;
}

/**
 * @description Single parametric equation
 * @param {string} [formula="y=x"] Formula
 * @returns {Equation} Equation
 * @this {Equation}
 * @constructor
 */
function Equation (formula) {
	this.formula = formula.normal() || "y=x";
	this.leftSide = this.formula.split("=")[0];
	this.rightSide = this.formula.split("=")[1];
	this.compute = function (data) {
		return eval(this.rightSide.multiReplace([
			[/x/g, data.x || 0], [/y/g, data.y || 0], [/z/g, data.z || 0],
			[/pi/ig, Math.PI], [/e/ig, Math.E], [/sqrt(2)/ig, Math.SQRT2],
			[/(pow|max|min)\((.*?),(.*?)\)/, "Math.$1($2, $3)"], //fails on first occurrence
			[/(sqrt|cbrt|cos|sin|tan|acos|asin|cosh|sinh|tanh|acosh|asinh|atanh|exp|abs|e\^)\((.*?)\)/, "Math.$1($2)"],
			[/(ln|log|nthroot|clampTop|clampBottom)\((.*?),(.*?)\)/, "$1($2, $3)"],
			[/(clamp)\((.*?),(.*?),(.*?)\)/, "$1($2, $3, $4)"]
		]))
	};

	this.toString = function () {
		return "Equation(" + this.formula + ")";
	};

	return this;
}

/**
 * @description Name of a type to the type itself
 * @param {string} name Name
 * @param {*} [param] Parameters/value
 * @returns {*} Type
 */
function name2type(name, param) {
	switch(name) {
		case "Number": return Number(param);
		case "String": return String(param);
		case "Boolean": return Boolean(param);
		case "Function": return Function(param);
		case "Object": return Object(param);
		case "Date": return Date(param);
		case "Array": return Array(param);
		case "RegExp": return RegExp(param);
		case "Error": return Error(param);
		case "File": return File(param);
		case "URL": return URL(param);
		case "FileReader": return FileReader(param);
		case "FileWriter": return FileWriter(param);
		case "Blob": return Blob(param);
		case "Element": return Element(param);
		case "Person": return Person(param);
		case "Item": return Item(param);
		case "Colour": return Colour(param);
		case "LinkedList": return LinkedList(param);
		case "TreeNode": return TreeNode(param);
		case "Node": return Node(param);
		case "PathNode": return PathNode(param);
		case "NTreeNode": return NTreeNode(param);
		case "Set": return Set(param);
		case "SortedSet": return SortedSet(param);
		case "Stack": return Stack(param);
		case "StackArray": return Stack(param);
		case "StackList": return StackList(param);
		case "Queue": return Queue(param);
		case "QueueArray": return QueueArray(param);
		case "QueueList": return QueueList(param);
		case "Shape": return Shape(param);
		case "Box": return Box(param);
		case "AABB": return AABB(param);
		case "Circ": return Circ(param);
		case "Pt": return Pt(param);
		case "Line": return Line(param);
		case "Vector": return Vector(param);
		case "Polygon": return Polygon(param);
		case "database": return database(param);
		case "process": return process(param);
		case "server": return server(param);
		case "Archive": return Archive(param);
		case "Machine": return Machine(param);
		case "Memory": return Memory(param);
		case "WebPage": return WebPage(param);
		case "WebApp": return WebApp(param);
		case "virtualHistory": return virtualHistory(param);
		case "Editor": return Editor(param);
		case "Preview": return Preview(param);
		case "Debugger": return Debugger(param);
		case "Parser": return Parser(param);
		case "Toolbar": return Toolbar(param);
		case "IDE": return IDE(param);
		case "Template": return Template(param);
		case "Stream": return Stream(param);
		case "MultiStream": return MultiStream(param);
		default: return name;
	}
}

/**
 * @description Permutation
 * @param {string|Array} data Data
 * @todo Make it work well
 * @returns {string|Array} Permuation list
 */
function Permutation(data) {
	console.log("data=" + data);
	console.log("->" + data.get(-1));
	var perm = [data];
	perm.append((data.length > 1)? Permutation(data.get(-1)): data);
	console.log("perm=" + perm);
	return perm;
}

/**
 * @description Typing recorder
 * @deprecated
 * @param {Function} [cb] Callback
 * @returns {string} Recorded keystrokes
 * @see Sys
 */
function stup(cb) {
	alert("You have 10s to type something !");
	Sys.in.recording = true;
	Sys.in.data = [];
	setTimeout(function () {
		Sys.in.recording = false;
		alert("Stop !!");
		if(cb) cb(Sys.in.data.join(""));
		return Sys.in.data.join("");
	}, 1e4);
	while(Sys.in.data.length === 0 || $G["las"]) {
		if(!Sys.in.recording) break;
	}
	return Sys.in.data.join("");
}

/**
 * @description Loading percentage
 * @type {number}
 */
$G["i"] = 0;
/**
 * @description Loading bar
 * @param {string} [dlb="#dlb"] ID of the container
 * @param {Function} cb Callback
 * @param {number} [delay=30] Delay (in ms)
 * @returns {undefined}
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

/**
 * @description Generate an array of all possible binary numbers with x digits or less
 * @param {number} x Number of digits
 * @returns {Array} Array of possible binary numbers
 */
function binaryCases(x) {
	var end = parseInt("1".repeat(x)), res = [], i = 0;
	do {
		res.push(conv(i++, 10, 2));
	} while(i <= conv(end));
	return res;
}

/**
 * @description Get the truth table of an expression
 * @param {string} exp Expression
 * @returns {Array} Truth table
 */
function truthTable(exp) { //Get the truth table of an expression
	// /(([a-z])(\+|\x2a))+/g
	var ascii = asciiTable("a-z"), vars = [], rows, res = [];
	for (var i = 0; i < ascii.length; i++) {
		if(exp.indexOf(ascii[i]) > -1) vars.push(ascii[i]);
	}
	Essence.say("variables: " + vars.toStr(true), "info");
	rows = binaryCases(vars.length);
	for (i = 0; i < rows.length; i++) {
		var cexp = exp;
		for (var j = 0; j < vars.length; j++) cexp = cexp.multiReplace([[vars[j], rows[i][j]]]);
		Essence.say("current exp: " + cexp, "info");
		res.push(eval(cexp));
	}
	return [vars, rows, res];
}

/**
 * @description Get the DNF form of an expression
 * @param {string} exp Expression
 * @returns {string} DNF
 * @see getCNF
 */
function getDNF(exp) {
	var tt = truthTable(exp), dnf = "";
	//code here
	return dnf;
}

/**
 * @description Get the CNF form of an expression
 * @param {string} exp Expression
 * @returns {string} CNF
 * @see getDNF
 */
function getCNF(exp) {
	var tt = truthTable(exp), cnf = "";
	//code here
	return cnf;
}

/**
 * @description Event-trace table
 * @param {string} [name="Event table"] Name
 * @param {string[]} [srcs=[getFilename(true)]] Sources
 * @returns {EventTable} Event table
 * @constructor
 * @this {EventTable}
 */
function EventTable(name, srcs) {
	this.name = name ||"Event table";
	this.sources = srcs || [getFilename(true)];
	this.table = [["Source", "Event", "Timestamp"]];
	this.add = function (evt) {
		this.table.push([evt.source || getFilename(true), evt.event, evt.timestamp || (new Date()).getTime()]);
		this.sources.uniquePush(evt.source || getFilename(true));
	};

	this.make = function (nb, space) {
		var ts = (new Date()).getTime();
		if(!space) space = 1;
		for (var i = 0; i < (nb || 1e3); i += space) {
			this.add({
				timestamp: ts + i
			});
		}
	};

	this.fill = function (src, desc) {
		var ts = (new Date()).getTime();
		var pos = lookfor(ts, this.table);
		if (pos === -1 && ts > this.table.last()[2]) this.add({source: src, event: desc, timestamp: ts});
		else {
			this.table[pos[0]][0] = src;
			this.table[pos[0]][1] = desc;
		}
	};

	this.getCleanTable = function () {
		var table = [];
		for (var i = 0; i < this.table.length; i++) {
			if (!isNon(this.table[i][1])) table.push(this.table[i]);
		}

		return table;
	};

	this.lookAt = function (ts) {
		var pos = lookfor(ts || (new Date()).getTime(), this.table)[0];
		return "'" + this.table[pos][1] + "' at " + this.table[pos][0];
	};

	return this;
}

/**
 * @description Get the caller's trace's location
 * @returns {string} Trace location
 */
function getTrace () {
	var err = function () {
		try {
			throw Error("")
		} catch(e) {
			return e;
		}
		//return new Error("");
	};
	var fn = stripPath(err().stack.split("\n").last());
	return fn.split(" ").last();
}

/**
 * @description Get the caller's trace's line number and column number
 * @param {boolean} [noCols=false] Remove the column number
 * @returns {string} Line number (with the column number)
 * @see getTrace
 */
function getLineNum (noCols) {
	return noCols? getTrace().split(":")[1]: getTrace().get(getTrace().indexOf(":") + 1).remove(")");
}

/**
 * @description Finite-state Automaton
 * @param {RegExp} re Regular expression
 * @constructor
 * @returns {FA} FA
 * @todo
 * 1. Read more about it
 * 2. Decide whether using NFA or DFA
 * 3. Work on it
 * @this {FA}
 */
function FA (re) {
	this.regexp = re;
	this.states = [];

	return this;
}

/**
 * @description Human RegExp to dictionnary (language)
 * @param {string} exp Human RegExp (simplified RegExp)
 * @todo Work on it
 * @returns {Array} Dictionnary
 */
function exp2dict (exp) {
	var re = RegExpify(exp), res = [], grp = [
		/([a-z]+\|[a-z]+)+/gm, //...|...
		/([a-z]+)\*/gm, //...*
		/([a-z]+)\+/gm, //...+
		/([a-z]+)\?/gm //...?
	];
	//matches: re.exec(str).last()
	return res;
}

/**
 * @description Evaluate a file (useful for getting JSON data and into JS objects)
 * @param {string} filename Filename
 * @returns {*} Object of the file
 */
function evalFile (filename) {
	return (new Function("return " + getFileContent(filename)))();
}

/**
 * @description Make tabs up
 * @param {number} [n=1] Number of tabs
 * @returns {string} Tabs
 */
function tabs (n) {
	return "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".repeat(n || 1);
}