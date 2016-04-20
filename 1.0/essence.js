/*--Essence.js
Short description:
A JS library created by Maximilian Berkmann based on his previous one (Needledge.js) with some jQuery and Matlab implementation
 
The MIT License (MIT)
 
Copyright (c) [2016] [Maximilian Berkmann]
 
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
 
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
 
var Essence = {
	version: '1.0b',
	author: 'Maximilian Berkmann',
	description: 'library used for DHTML connexions, maths, database management and cryptography',
	source: (document.URL.indexOf("essence.min.js")>-1)? 'https://www.dropbox.com/s/1prjdvv9ku0ga92/essence.min.js?dl=0': 'https://www.dropbox.com/s/n2sz2mxz5zwc05t/essence.js?dl=0',
	element: $n,
	handleError: function(msg, url, line){
		alert("[Essence.js] An error has occurred (line "+line+" of "+url+").\n\nMessage: "+msg);
	},
	say: function(msg, type){
		type = (isNon(type))? "": type.slice(0, 4).toLowerCase();
		if(type=="info") console.info("[Essence.js] "+msg);
		else if(type=="erro") console.error("[Essence.js] "+msg);
		else if(type=="warn") console.warn("[Essence.js] "+msg);
		else console.log("[Essence.js] "+msg);
	},
	css: "*{font-family:Calibrie,Verdana,Segoe UI}body{height:100%;width:auto;padding:0}table{background:#000}table,td,th{border:1px solid #000;color:#000;background:#fff;cellspacing:0;cellpadding:2;border-collapse:true;}tr:nth-child(even) td{background:#ddd}.none,.none td,.none th{border:none}.inf{color:#008}.succ{color:#0f0}.err{color:#f00}.quest{color:#00f}.warn{color:#fc0}.info{border-color:#008;background-color:#00008f}.success{border-color:#080;background-color:#008f00}.error{border-color:#800;background-color:#8f0000}.question{border-color:#00f;background-color:#0000f8}.warning{border-color:#f8c808;background-color:#fc0}.block{color:#fff;background-repeat:repeat;background-position:0 center;border-style:solid;border-width:1px;-webkit-appearance:none;outline:0;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;width:100%;height:1.1em;line-height:200%;white-space:nowrap;min-height:16px;position:relative;margin:2px;padding:.3em 2px;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-touch-callout:none;border-radius:7px;-webkit-border-radius:7px;-moz-border-radius:7px}.icon{width:64px;height:64px;border:none;margin:2px}kbd{border:3px outset #ccc;background:#ccc;border-radius:5px;-webkit-border-radius:7px;-moz-border-radius:7px;-o-border-radius:7px;padding:2px;font-family:Consolas,Tahoma,Segoe UI}h1.title{text-decoration:underline}h2{color:#088}h3{color:#0ff}.code-tag,.code-inst{color:#00f}.code-cmt{color:#0f0}.code-str,.code-id{color:#00c0c0}.code-num,.code-class{color:#f00}.code-attr{color:#c00}.code-val{color:#fc0}.code-type{color:#800080}.code-doc, .code-op{color:#0ff},.code-var{color:#0000c0}.code-keyword{color:#f0f}",
	applyCSS: function(){
		if(isNon($n("style")) || $e("style").isEmpty()) $e("head").write($n("head").outerHTML+"<style type='text/css'>"+Essence.css+"</style>", true);
		else $n("style").innerHTML += Essence.css;
		if($e("html").val(true).indexOf("<body></body>")>-1){
			var ix=$e("html").val(true).indexOf("<body></body>");
			var bfr=$e("html").val(true).slice(0, ix), aft=$e("html").val(true).slice(ix+13, $e("html").val(true).length);
			$e("html").write(bfr+aft, true);
		}
	},
	d2r: Math.PI/180,//deg -> rad
	r2d: 180/Math.PI,//rad -> deg
	addCSS: function(nstyle){
		var s = document.createElement("style");
		s.innerText = nstyle;
		$n("head").appendChild(s);
	},
	addJS: function(nscript){
		var s = document.createElement("script");
		s.innerText = nscript;
		$n("head").appendChild(s);
	},
	update: function(){//to keep the script updated !!
		var scriptArr = $e("*script");
		for(i=0; i<scriptArr.length; i++){
			if(scriptArr[i].src.indexOf("essence.js")>-1 || scriptArr[i].src.indexOf("essence.min.js")>-1) scriptArr[i].src = this.source||Essence.source;
		}
		Essence.say("Essence.(min).js has been updated", "info");
	},
	e: Math.exp(1),//Napier's constant
	eps: Math.pow(2, -52),//Matlab's epsilon (useful when dealing with null values to keep them in the real range or just not null
	gcd: function(a, b){//Greatest Common Divisor
		return b? Essence.gcd(b, a%b): Math.abs(a);
	},
	emptyDoc: function(title, author){//empty the document and fill it with a basic structure
		$e("html").write("<head><title>"+(title||document.title)+"</title><meta charset='UTF-8' /><meta name='author' content="+(author||'unknown')+" /><script type='text/javascript' src="+Essence.source+"></script></head><body></body>", true);
	},
	editor: function(ctt){
		location.href = "data:text/html, <html contenteditable>"+(ctt? ctt+"</html>": "</html>");
	},
	processList: [["Name (signature)", "Author", "Size"]],
	addProcess: function(pcs){
		pcs.update();
		Essence.processList.push([pcs.name+" ("+pcs.sig+")", pcs.author, pcs.bitsize]);
		pcs.id = Essence.processList.length-1;
		Essence.processSize += pcs.bitsize;
	},
	processSize: 0,
	serverList: [["Name", "Author", "Maximum size"]],
	addServer: function(serv){
		serv.update();
		Essence.serverList.push([serv.name, serv.author, serv.maxsize]);
		Essence.serverSize += serv.maxsize;
	},
	serverSize: 0,
	toString: function(){
		return "[object Essence]";
	},
	txt2print: "",
	addToPrinter: function(txt, type){//allow the usage of print without having to directly touch to txt2print
		txt.indexOf("\r\n")>-1? this.print(txt, type): this.txt2print += txt;
	},
	print: function(txt, type){//works like the print in Java
		this.txt2print += txt;
		this.txt2print = this.txt2print.split("\b");
		for(i=0; i<this.txt2print.length; i++){
			this.say(this.txt2print[i], type);
		}
		this.txt2print = "";
	},
	preInit: function(){
		t1 = t1.getSeconds()*1000+t1.getMilliseconds();
	}, init: function(){
		t2 = new Date();
		t2 = t2.getSeconds()*1000+t2.getMilliseconds();
		t = (t2-t1>1000)? (t2-t1)/1000+"s": (t2-t1)+"ms";
		Essence.say("Page loaded in "+t, "succ");
	}
}
 
var t1 = new Date(), t2 = 0, t;
var $e = function(selector){//THE selector !!
	return new Element(selector);
}
 
function Element(selector){//The element object
	if(/^([\#\.\* _-\`\~\&]\W*|\S|undefined|null|())$/.test(selector)) throw new SyntaxError("Element cannot accept the selector '"+selector+"' as it's invalid.");//reject invalid selectors
	if(selector[0]=="#") this.node = document.querySelector(selector)||document.getElementById(selector.slice(1, selector.length));//id
	else if(selector[0]==".") this.node = document.querySelector(selector)||document.getElementByClassName(selector.slice(1, selector.length));//class
	else if(selector[0]=="*") this.node = document.querySelectorAll(selector.slice(1, selector.length))||document.getElementsByTagName(selector.slice(1, selector.length));//node array
	else this.node = document.querySelector(selector);
	 
	this.val = function(getHTML, withTags){//get the value of the element's node
		if(isType(this.node, "array")){
			var arr = [];
			for(i=0; i<this.node.length; i++){
				if(this.node[i].value && !getHTML && !withTags) arr.push(this.node[i].value);
				else if(this.node[i].innerHTML && getHTML && !withTags) arr.push(this.node[i].innerHTML);
				else if(this.node[i].innerText && !getHTML && !withTags) arr.push(this.node[i].innerText);
				else if(this.node[i].outerHTML && !getHTML && withTags) arr.push(this.node[i].outerHTML);
				else  arr.push(this.node[i].value? this.node[i].value: this.node[i].innerText);
			}
			return arr;
		}
		 
		if(this.node.value && !getHTML && !withTags) return this.node.value;
		else if(this.node.innerHTML && getHTML && !withTags) return this.node.innerHTML;
		else if(this.node.innerText && !getHTML && !withTags) return this.node.innerText;
		else if(this.node.outerHTML && !getHTML && withTags) return this.node.outerHTML;
		else return this.node.value? this.node.value: this.innerText;
	}
	 
	this.size = function(){
		return this.val().length;
	}
	 
	this.isEmpty = function(){//check if the value is empty/unexistent
		return this.val()===false || this.val()===undefined || this.val()===null || this.val()==="" || this.val()===[] || this.val()==={};
	}
	 
	this.write = function(nval, parseToHTML, incTags){//assign #nval as the value of the element's node
		//this.val(parseToHTML, incTags) = nval;
		if(isType(this.node, "array")){
			for(i=0; i<this.node.length; i++){
				if(this.node[i].value && !parseToHTML && !incTags) this.node[i].value = isType(nval, "array")? nval[i]: nval;
				else if(this.node[i].innerHTML && parseToHTML && !incTags) this.node[i].innerHTML = isType(nval, "array")? nval[i]: nval;
				else if(this.node[i].innerText && !getHTML && !withTags)this.node[i].innerText = isType(nval, "array")? nval[i]: nval;
				else if(this.node[i].outerHTML && !getHTML && withTags) this.node[i].outerHTML = isType(nval, "array")? nval[i]: nval;
				else this.node[i].value? (this.node[i].value = isType(nval, "array")? nval[i]: nval): (this.node[i].innerText = isType(nval, "array")? nval[i]: nval);
			}
			return arr;
		}
		 
		if(this.node.value && !parseToHTML && !incTags) this.node.value = nval;
		else if(this.node.innerHTML && parseToHTML && !incTags) this.node.innerHTML = nval;
		else if(this.node.innerText && !parseToHTML && !incTags) this.node.innerText = nval;
		else if(this.node.outerHTML && incTags && !parseToHTML) this.node.outerHTML = nval;
		else this.node.value? this.node.value = nval: this.innerText = nval;
	}
	 
	this.before = function(nval, parseToHTML, incTags){//write before (like a string/code unshift)
		if(isType(this.node, "array")){
			for(i=0; i<this.node.length; i++){
				if(this.node[i].value && !parseToHTML && !incTags) this.node[i].value = isType(nval, "array")? nval[i]+this.node[i].value: nval+this.node[i].value;
				else if(this.node[i].innerHTML && parseToHTML && !incTags) this.node[i].innerHTML = isType(nval, "array")? nval[i]+this.node[i].innerHTML: nval+ this.node[i].innerHTML;
				else if(this.node[i].innerText && !getHTML && !withTags) this.node[i].innerText = isType(nval, "array")? nval[i]+this.node[i].innerText: nval+this.node[i].innerText;
				else if(this.node[i].outerHTML && !getHTML && withTags) this.node[i].outerHTML = isType(nval, "array")? nval[i]+this.node[i].outerHTML: nval+this.node[i].outerHTML;
				else this.node[i].value? (this.node[i].value = isType(nval, "array")? nval[i]+this.node[i].value: nval+this.node[i].value): (this.node[i].innerText = isType(nval, "array")? nval[i]+this.node[i].innerText: nval+this.node[i].innerText);
			}
			return arr;
		}
		 
		if(this.node.value && !parseToHTML && !incTags) this.node.value = nval+this.node.value;
		else if(this.node.innerHTML && parseToHTML && !incTags) this.node.innerHTML = nval+this.node.innerHTML;
		else if(this.node.innerText && !parseToHTML && !incTags) this.node.innerText = nval+this.node.innerText;
		else if(this.node.outerHTML && incTags && !parseToHTML) this.node.outerHTML = nval+this.node.outerHTML;
		else this.node.value? this.node.value = nval+this.node.value: this.innerText = nval+this.innerText;
	}
	 
	this.after = function(nval, parseToHTML, incTags){//write after (like an array push)
		if(isType(this.node, "array")){
			for(i=0; i<this.node.length; i++){
				if(this.node[i].value && !parseToHTML && !incTags) this.node[i].value += isType(nval, "array")? nval[i]: nval;
				else if(this.node[i].innerHTML && parseToHTML && !incTags) this.node[i].innerHTML += isType(nval, "array")? nval[i]: nval;
				else if(this.node[i].innerText && !getHTML && !withTags)this.node[i].innerText += isType(nval, "array")? nval[i]: nval;
				else if(this.node[i].outerHTML && !getHTML && withTags) this.node[i].outerHTML += isType(nval, "array")? nval[i]: nval;
				else this.node[i].value? (this.node[i].value += isType(nval, "array")? nval[i]: nval): (this.node[i].innerText += isType(nval, "array")? nval[i]: nval);
			}
			return arr;
		}
		 
		if(this.node.value && !parseToHTML && !incTags) this.node.value += nval;
		else if(this.node.innerHTML && parseToHTML && !incTags) this.node.innerHTML += nval;
		else if(this.node.innerText && !parseToHTML && !incTags) this.node.innerText += nval;
		else if(this.node.outerHTML && incTags && !parseToHTML) this.node.outerHTML += nval;
		else this.node.value? this.node.value += nval: this.innerText += nval;
	}
	 
	this.remove = function(c, r){//remove the character from the string/array/number and return it with the r character as a joiner or a blank when r isn't specified
		if(isArray(this.val())){
			for(i=0; i<this.val().length; i++){
				if(this.val()[i]==c) this.write(this.val().slice(0, i).concat(this.val().slice(i+1, this.val().length)));
			}
		}
		this.write(this.val().split(c).join(r||""));//silent removing
	}
	 
	this.setCSS = function(prop, val){//change the css property
		if(isType(this.node, "array")){
			for(i=0; i<this.node.length; i++){
				this.node[i].style[prop] = isType(val, "array")? val[i]: val;
			}
		}
		else this.node.style[prop] = val;
	}
 
	this.setStyles = function(sAndV){//style and vals: [style0, val0, style1, val1, ...]
		for(i=0; i<sAndV.length-1; i+=2) this.setCSS(sAndV[i], sAndV[i+1]);
	}
 
	this.css = function(prop){//get the CSS property of the element's node
		if(isType(this.node, "array")){
			var arr = [];
			for(i=0; i<this.node.length; i++) arr.push(this.node[i].style[prop]);
			return arr;
		}
		return this.node.style[prop];
	}
 
	this.hasClass = function(className){//check if the element's node has the specified CSS class
		if(isType(this.node, "array")){
			var arr = [];
			for(i=0; i<this.node.length; i++) arr.push(new RegExp(' ' + className + ' ').test(' ' + this.node[i].className + ' ') || new RegExp(' ' + className + ' ').test(' ' + this.node[i][className] + ' ') || this.node[i].style.clasName == className);
		}
		return new RegExp(' ' + className + ' ').test(' ' + this.node.className + ' ') || new RegExp(' ' + className + ' ').test(' ' + this.node[className] + ' ') || this.node.style.clasName == className;
	}
	 
	this.hasCSS = function(prop){//check if the element's node has the specified CSS property
		if(isType(this.node, "array")){
			var arr = [];
			for(i=0; i<this.node.length; i++) arr.push(new RegExp(' ' + prop + ' ').test(' ' + this.node[i].style[prop] + ' ') || new RegExp(' ' + prop + ' ').test(' ' + this.node[i][prop] + ' '));
		}
		return new RegExp(' ' + prop + ' ').test(' ' + this.node.style[prop] + ' ') || new RegExp(' ' + prop + ' ').test(' ' + this.node[prop] + ' ');
	}
 
	this.addClass = function(className){//add a class to the element's node
		if(isType(this.node, "array")){
			for(i=0; i<this.node.length; i++){
				if(!this.node[i].hasClass(clasName)) this.node[i].className += ' ' + clasName;
			}
		}else{
			if(!this.hasClass(className)) this.node.className += ' ' + className;
		}
	}
 
	this.rmClass = function(className){//remove the class from the element's node
		var newClass = ' ' + this.node.className.replace(/[\t\r\n]/g, ' ') + ' ';
		if(isType(this.node, "array")){
			for(i=0; i<this.node.length; i++){
				newClass = ' ' + this.node[i].className.replace(/[\t\r\n]/g, ' ') + ' ';
				if(this.node[i].hasClass(clasName)){
					while(newClass.indexOf(' ' + className + ' ') >= 0) newClass = newClass.replace(' ' + className + ' ', ' ');
					this.node[i].className = newClass.replace(/^\s+|\s+$/g, '');
				}
			}
		}else{
			if(this.hasClass(className)){
				while(newClass.indexOf(' ' + className + ' ') >= 0) newClass = newClass.replace(' ' + className + ' ', ' ');
				this.node.className = newClass.replace(/^\s+|\s+$/g, '');
			}
		}
	}
 
	this.toggleCSS = function(prop, params){//toggle between two or more values
		if(prop=="visibility"){
			(this.css("visibility")=="visible")? this.setCSS("visibility", "hidden"): this.setCSS("visibility", "visible");
		}else if(prop=="enabled"){
			(this.css("enabled")=="enabled")? this.setCSS("enabled", "disabled"): this.setCSS("enabled", "enabled");
		}else if(!isNon(prop) && !isNon(params)){//for color, bgcolor, opacity, font-size, ...
			if(isNon(this.css(prop))) this.setCSS(prop, params[0]);
			for(i=0; i<params.length; i++){//slide through the parameters and go to the next one if the one already set is present
				if(this.css(prop)==params[i]){
					this.setCSS(prop, params[(i+1)%params.length]);
					break;
				}
			}
		}
	}
	 
	this.show = function(){
		this.setCSS("opacity", 1);
		this.setCSS("display", "block");
	}
 
	this.hide = function(){
		this.setCSS("opacity", 0);
		this.setCSS("display", "none");
	}
	 
	this.on = function(evt, act){//onEvt handler
		var evts = ["abort", "autocomplete", "autocompleteerror", "beforeunload", "blur", "cancel", "canplay", "canplaythrough", "change", "click", "close", "contextmenu", "cuechange",
		"dblclick", "devicemotion", "deviceorientation", "drag", "dragend", "dragenter", "dragleave", "dragover", "dragstart", "drop", "durationchange", "emptied", "ended", "error",
		"focus", "hashchange", "input", "invalid", "keydown", "keypress", "keyup", "languagechange", "load", "loadeddata", "loadedmetadata", "loadstart", "message", "mousedown",
		"mouseenter", "mouseleave", "mousemove", "mouseout", "mouseover", "mouseup", "mousewheel", "offline", "online", "pagehide", "pageshow", "pause", "play", "playing", "popstate",
		"progress", "ratechange", "reset", "resize", "scroll", "search", "seeked", "seeking", "select", "show", "stalled", "storage", "submit", "suspend", "timeupdate", "toggle",
		"transitionend", "unload", "volumechange", "waiting", "webkitanimationend", "webkitanimationiteration", "webkitanimationstart", "webkittransitionend", "wheel"];
		for(i=0; i<evts.length; i++){
			if(evt.normal()==evts[i]) this.node.addEventListener(evt, act, false);
		}
	}
	 
	this.toString = function(){
		return "[object Element]";
	}

	return this;
}
 
function $n(selector){//to get directly the node without having to use $e(selector).node
	return $e(selector).node;
}
 
function include(file, type){//include an external file/resource as a child of the document
	if(!type) type = (file.indexOf(".js")>0)? "script": "link";
	var el = document.createElement(type);
	if(type=="script") el.src = file;
	else el.href = file;
	el.type = (type=="script")? "text/javascript": "text/css";
	document.head.appendChild(el);
}
 
function print(st, isHTML, sw){//print something somewhere
	if(!sw) sw = "body";
	$e(sw).after(st, isHTML);
}
 
function println(st, sw){//same as print but with a new line just like in Java
	if(!sw) sw = "body";
	$e(sw).after(st+"<br />", true);
}
 
//DOM object modifications
Object.prototype.hasName = function(){
	return this.name!==undefined || this.title!==undefined;
}
 
Object.prototype.getName = function(){//get the object's name assuming it has one
	return this.name!==undefined? this.name: this.title;
}
 
Object.prototype.count = function hasNtimes(c){//counts how many times a character/property/number c is present in the object
	var n = 0;
	for(i=0; i<this.length; i++){
		if(this[i]===c) n++;
	}
	return n;
}

Object.prototype.positions = function(c){//get all the positions of a character/property/number c
	var pos = [];
	for(i=0; i<this.length; i++){
		if(this[i]===c) pos.push(i);
	}
	return pos;
}

Object.prototype.isIterable = function(){//check if an object is iteral hence if it's a string/array/object
	return isType(this, "String") || isType(this, "Array") || isType(this, "Object");
}

Array.prototype.first = function(){//get the first element of an array
  return this[0];
}
 
Array.prototype.last = function(){//get the last element of an array
  return this[this.length-1];
}
 
Array.prototype.lastIndex = function(){//get the index of the last element 
	return this.length-1;
}
 
Array.prototype.midIndex = function(under){//get the index of the middle element, if over is specified it get the right middle index
	return under? Math.floor(this.length/2)-1: Math.floor(this.length/2);
}
 
Array.prototype.even = function(){//get all the elements at an even position
	var e = [];
	for(i=0; i<this.length; i+=2) e.push(this[i]);
	return e;
}
 
Array.prototype.odd = function(){//get all the elements at an odd position
	var e = [];
	for(i=1; i<this.length; i+=2) e.push(this[i]);
	return e;
}
 
Array.prototype.max = function(start, end){//get the maximum value of the array
	var m = this[start||0];
	if((!start && !end) || (start==0 && end>=this.length-1)) for(i=1; i<this.length; i++) m = Math.max(m, this[i]);
	else if(start && !end) for(i=start+1; i<this.length; i++) m = Math.max(m, this[i]);
	else for(i=start+1; i<=end; i++) m = Math.max(m, this[i]);
	return m;
}
 
 
Array.prototype.median = function(){//median (middle cell)
	var arr = this.sort(function(a,b){return a - b;});
	var half = Math.floor(arr.length/2);
	return arr.length%2? arr[half]: (arr[half-1]+arr[half])/2;
}
 
Array.prototype.min = function(start, end){//get the minimum value of the array
	var m = this[start||0];
	if((!start && !end) || (start==0 && end>=this.length-1)) for(i=1; i<this.length; i++) m = Math.min(m, this[i]);
	else if(start && !end) for(i=start+1; i<this.length; i++) m = Math.min(m, this[i]);
	else for(i=start+1; i<=end; i++) m = Math.min(m, this[i]);
	return m;
}
 
Array.prototype.shuffle = function(n){//shuffle the array n times
	for(i=0; i<(n||this.length); i++) swap(this, randTo(this.length-1), randTo(this.length-1));
}
 
Array.prototype.maxLength = function(){//return the length of the longest cell
	var ml = 0;
	for(i=0; i<this.length; i++) ml = Math.max(ml, this[i].length);
	return ml;
}
 
Array.prototype.minLength = function(){//return the length of the shortest cell
	var ml = this[0].length;
	for(i=0; i<this.length; i++) ml = Math.min(ml, this[i].length);
	return ml;
}
 
Array.prototype.Fill2D = function(c){//same as fill() but it fill the array with c into two dimensions rather than one
	return this.fill(new Array(this.length).fill(c));
}
 
Array.prototype.all = function(callback){//check if all items of the array applies to the conditions specified by the callback function
	var bool = callback(this[0]);//callback can only be of the type boolean
	for(i=1; i<this.length; i++) bool = bool && callback(this[i]);
	return bool;
}
 
Array.prototype.remove = function(c){//remove c from the array without affecting the initial array
	//note: it will automatically remove undefined and it goes bunckers when trying to remove objects
	str = this;
	if(isArray(c)){
		for(i=0; i<c.length; i++) str = str.remove(c[i]);
	}else{
		for(i=0; i<str.length; i++){
			if(str[i]===c) str = str.slice(0, i).concat(str.slice(i+1, str.length));
		}
		str = str.map(function(x){//double check
			return x===c? undefined: x;
		});
		if(str.indexOf(undefined)!=-1 && str.length>0){
			var w = [];
			for(i=0; i<str.length; i++){
				if(str[i]!==undefined) w.push(isType(str[i], "Number")? parseFloat(str[i]): str[i]);
			}
			str = w;
		}
		return str;
	}
}
 
Array.prototype.debug = function(){//display in the console each elements of the array
	Essence.say("Debugging the following array: "+this);
	for(i=0; i<this.length; i++) Essence.say(i+": "+this[i]);
}
 
Array.prototype.getOccurences = function(){//gets the number of occurences of each characters in a string or each elements in an array
	var arr = rmDuplicates(this), res = [];
	for(i=0; i<arr.length; i++){
		res.push(arr[i]+":"+this.count(arr[i])+"["+this.positions(arr[i]).toStr(true)+"]");
		Essence.say(arr[i]+": "+this.positions(arr[i]).toStr(true));
	}
	return res;
}
 
Array.prototype.replace = function(Ci, Cf, toStr){//replace all the characters Ci by Cf in the array (if there's any Ci characters in the array)
	for(i=0; i<this.length; i++){
		if(this[i]==Ci) this[i] = Cf;
	}
}
 
Array.prototype.sum = function(start, end){//the sum of every terms of the array
	var s = 0;
	if((!start && !end) || (start==0 && end>=this.length-1)) for(i=0; i<this.length; i++) s += this[i];
	else if(start && !end) for(i=start; i<this.length; i++) s += this[i];
	else for(i=start; i<=end; i++) s += this[i];
	return s;
}
 
Array.prototype.prod = function(start, end){//the product of every terms of the array
	var s = 0;
	if((!start && !end) || (start==0 && end>=this.length-1)) for(i=0; i<this.length; i++) s *= this[i];
	else if(start && !end) for(i=start; i<this.length; i++) s *= this[i];
	else for(i=start; i<=end; i++) s *= this[i];
	return s;
}
 
Array.prototype.sum2d = function(start, end){//sum for 2D arrays where start = [i, j] and end [i, j]
	var s = 0;
	if((!start && !end) || (start==0 && end>=this.length-1)){
		for(i=0; i<this.length; i++){
			for(j=0; j<this[i].length; j++) s += this[i][j];
		}
	}else if(start && !end){
		for(i=start[0]; i<this.length; i++){
			for(j=start[1]; j<this[i].length; j++) s += this[i][j];
		}
	}else{
		for(i=start[0]; i<end[0];i++){
			for(j=start[1]; j<end[1]; j++) s += this[i][j];
		}
	}
	return s;
}
 
Array.prototype.mean = function(nbDec, start, end){//mean of a numerical array
	if(!start) start = 0;
	if(!end) end = this.lastIndex();
	var sum = this.sum(start, end);
	return (sum/(this.length-start)).toNDec(nbDec)+0;//to avoid getting the Number object representation rather than the actual result
}
 
Array.prototype.avg = function(nbDec, start, end){//timewise average of a numerical array
	if(!start) start = 0;
	if(!end) end = this.lastIndex();
	var sum = this.sum(start, end)-this.slice(start, end+1).max()-this.slice(start, end+1).min();
	return (sum/(this.length-2-start)).toNDec(nbDec)+0;
}
 
Array.prototype.variance = function(nbDec){//variance=SumOf(N^2)/N - Mean^2
	var mean = Math.pow(this.mean(nbDec), 2), sum = sumPow2(this, nbDec), n = this.length;
	return (sum/n-mean).toNDec(nbDec);
}
 
Array.prototype.stddev = function(nbDec){//standard deviation=sqrt(variance)
	var stdDev = Math.sqrt(this.variance(nbDec));
	return stdDev.toNDec(nbDec);
}
 
Array.prototype.rand = function(){//get a random cell of the array
	return this[Math.floor(randTo(this.length-1)%this.length)];
}
 
Array.prototype.quartile = function(n, nbDec){//Q1, Q2, Q3
	return this.length%2==0? ((this[Math.floor(n*this.length/4)-1]+this[Math.floor(n*this.length/4)])/2).toNDec(nbDec): (values[Math.floor(n*values.length/4)]).toNDec(nbDec);
}
 
Array.prototype.quintile = function(n, nbDec){//Q1, ..., Q4
	return this.length%2==0? ((this[Math.floor(n*this.length/5)-1]+this[Math.floor(n*this.length/5)])/2).toNDec(nbDec): (values[Math.floor(n*values.length/5)]).toNDec(nbDec);
}
 
Array.prototype.decile = function(n, nbDec){//D1, ..., D9
	return this.length%2==0? ((this[Math.floor(n*this.length/10)-1]+this[Math.floor(n*this.length/10)])/2).toNDec(nbDec): (values[Math.floor(n*values.length/10)]).toNDec(nbDec);
}
 
Array.prototype.percentile = function(n, nbDec){//P1, ..., P99
	return this.length%2==0? ((this[Math.floor(n*this.length/100)-1]+this[Math.floor(n*this.length/100)])/2).toNDec(nbDec): (values[Math.floor(n*values.length/100)]).toNDec(nbDec);
}
 
Array.prototype.getIncrement = function(nbDec){//get the average increment between the values of the array
	return nbDec==0? parseInt(((this.max()-this.min())/(this.length-1))):((this.max()-this.min())/(this.length-1)).toNDec(nbDec);
}
 
Array.prototype.increment = function(n){
	for(i=0; i<this.length; i++) this[i]+=n||1;
}
 
Array.prototype.iqr = function(nbDec){//Inter-Quartile Range
	return this.quartile(3, nbDec)-this.quartile(1, nbDec).toNDec(nbDec);
}
 
Array.prototype.get = function(start, end){//get the sub-array starting at the start index and ending at the end index
	var res = [];
    if(end<0) end = this.length-end;
	for(i=start; i<=(end||this.length-1); i++) res.push(this[i]);
	return res.remove();
}
 
Array.prototype.quickSort = function(left, right){//Fastest sorting algorithm re-adapted from https://www.nczonline.net/blog/2012/11/27/computer-science-in-javascript-quicksort/
	if(!left && !right){
		left = 0;
		right = this.lastIndex();
	}
	var i;
	if(this.length>1){
		var pivot = this[Math.floor((right+left)/2)], j = right;
		i = left;
		while(i<=j){
			while(this[i]<pivot) i++;
			while(this[j]>pivot) j--;
			if(i<=j){
				swap(this, i, j);
				i++;
				j--;
			}
		}
		if(left<i-1) this.quickSort(left, i-1);
		if(i<right) this.quickSort(i, right);
	}
	return this;
}
 
Array.prototype.revSort = function(left, right){//quickSort but in the opposite order
	if(!left && !right){
		left = 0;
		right = this.lastIndex();
	}
	var i;
	if(this.length>1){
		var pivot = this[Math.floor((right+left)/2)], j = right;
		i = left;
		while(i<=j){
			while(this[i]>pivot) i++;
			while(this[j]<pivot) j--;
			if(i<=j){
				swap(this, i, j);
				i++;
				j--;
			}
		}
		if(left>i-1) this.revSort(left, i-1);
		if(i>right) this.revSort(i, right);
	}
	return this;
}
 
Array.prototype.bubbleSort = function(order){//My version of the Bubble Sort
	var arr = this, j = 1, s = true;
	if(isNon(order) || isType(order, "string") && order[0].toLowerCase()=="a"){
		while(s){
			s = false;
			for(i=0; i<=arr.length-j; i++){
				if(arr[i]>arr[i+1]){
					arr = swap(arr, i, i+1);
					s = true;
				}
				if(i<arr.length-(j+1)){
					if(arr[i]>arr[i+2]) arr = swap(arr, i, i+2);
					if(arr[i+1]>arr[i+2]){
						arr = swap(arr, i+1, i+2); 
						s = true;
					}
				}
				if(i<arr.length-(j+2)){
					if(arr[i]>arr[i+3]) arr = swap(arr, i, i+3);
					if(arr[i+1]>arr[i+3]){
						arr = swap(arr, i+1, i+3); 
						//s = true;
					}
				}
			}
			j++;
		}
	}else if(order==1 || isType(order, "string") && order[0].toLowerCase()=="d"){//descending order
		while(s){
			s = false;
			for(i=0; i<=arr.length-j; i++){
				if(arr[i]<arr[i+1]){
					arr = swap(arr, i, i+1);
					s = true;
				}
				if(i<arr.length-(j+1)){
					if(arr[i]<arr[i+2]) arr = swap(arr, i, i+2);
					if(arr[i+1]<arr[i+2]){
						arr = swap(arr, i+1, i+2); 
						s = true;
					}
				}
				if(i<arr.length-(j+2)){
					if(arr[i]<arr[i+3]) arr = swap(arr, i, i+3);
					if(arr[i+1]<arr[i+3]){
						arr = swap(arr, i+1, i+3); 
					}
				}
			}
			j++;
		}
	}
	return arr;
}
 
Array.prototype.bruteForceSort = function(){
	for(i=0; i<this.length; i++){
		s = this[i]; pos = i;
		for(j=i+1; j<=this.length; j++){
			if(s>this[j]){
				s = this[j];
				pos = j;
			}
		}
		var temp = this[i];
		this[i] = s;
		this[pos] = temp;
	}
	return this;
}
 
Array.prototype.maxSort = function(){//My own sorting algorithm
	//Ignores repeated values and loose data
	var mn = this.min(), med = this.median(), mx = this.max(), unsorted = true, res = new Array(this.length), inc = this.getIncrement(3), q1 = this.quartile(1), q3 = this.quartile(3);
	//pre-sort some elements
	res[0] = mn;
	res[res.length-1] = mx;
	if(res.length%2!=0){
		res[res.length/2] = med;
		res[res.length/4] = q1;
		res[3*res.length/4] = q3;
	}
	for(i=1; i<this.length-1; i++){//add elements in the correct order that belongs to x
		if(this[i]==Math.floor(res[0]+i*inc)) res[i] = this[i];
		else if(this[i]==Math.round(res[0]+i*inc)) res[i] = this[i];
		else if(this[i]==Math.ceil(res[0]+i*inc)) res[i] = this[i];
		else if(this[i]>=Math.floor(res[0]+i*inc) && this[i]<=Math.ceil(res[0]+i*inc)) res[i] = this[i];
	}
	for(i=this.length-1; i>1; i--){//same thing but from the end to complete the missing ones
		if(this[i]==Math.floor(res[res.length-1]-i*inc) && isNon(res[i])) res[i] = this[i];
		else if(this[i]==Math.round(res[res.length-1]-i*inc) && isNon(res[i])) res[i] = this[i];
		else if(this[i]==Math.ceil(res[res.length-1]+i*inc) && isNon(res[i])) res[i] = this[i];
		else if(this[i]>=Math.floor(res[res.length-1]+i*inc) && this[i]<=Math.ceil(res[0]+i*inc) && isNon(res[i])) res[i] = this[i];
	}
	for(i=1; i<this.length-1; i++){
		for(j=0; j<this.length; j++){
			if(this[j]==Math.floor(res[0]+i*inc)) res[i] = this[j];
			else if(this[j]==Math.round(res[0]+i*inc)) res[i] = this[j];
			else if(this[j]==Math.ceil(res[0]+i*inc)) res[i] = this[j];
			else if(this[j]>=Math.floor(res[0]+i*inc) && this[j]<=Math.ceil(res[0]+i*inc)) res[i] = this[j];
		}
	}
	return res;
}
 
Array.prototype.cenSort = function(l, r){//Centre sort
	//Ignores repeated values and loose data
	var res = new Array(this.length);
	if(!l && !r){
		l = Math.floor(this.length/2);
		right = Math.ceil(this.length/2);
	}
	if(this.length<=1) return;
	var pivot = this[Math.floor((r+l)/2)], j = r, i = l;
	while(i<=j){
		while(this[i]<pivot) i--;
		while(this[j]>pivot) j++;
		if(i>=j){
			swap(this, i, j);
			i--;
			j++;
		}
	}
	 
	if(l>i-1) this.cenSort(l, i-1);
	if(i>r) this.cenSort(i, r);
	return res;
}
 
Array.prototype.spreadSort = function(){//unfinished, lost the sources
	var mid = this[this.midIndex()], l, r;
	l = r = mid;
	 
}
 
Array.prototype.setSort = function(){//a faster algorithm than quickSort only for integers where the extremities are known
	var t = [], l = this.length, narr = [];
	for(i=0; i<1000; i++) t[i] = 0;
	for(i=0; i<l; i++) t[this[i]] = 1;
	for (i = 0; i<1000; i++) {
		if(1 == t[i]) narr.push(i);
	}
	return narr;
}
 
Array.prototype.clean = function(noDuplic){//remove undesirable items
	var arr = [], j=0;
	for(i=0; i<this.length; i++){
		if(!isNon(this[i])) arr[j++] = this[i];
	}
	return noDuplic? rmDuplicates(arr).remove(undefined): arr;//take off (or not) duplicates of actual values and double clean it
}
 
Array.prototype.xclean = function(){//remove a righty of undesirable items
	return this.clean(true).remove([undefined, "undefined", null, "null"]); 
}
 
Array.prototype.rot = function(deg){//rotate a matrix by n%90 degrees. Useful for Rubik's cubes simulator and other matrix based simulations/calculations!
	var tmp;
	if(deg%90!=0) throw new Error("The absolute degree of rotation must be either 90° or 180°");
	if(this.numElm()==4 && this.length==2){//2x2 matrix
		if(deg==90){
			tmp = this[0][0];
			this[0][0] = this[1][0];
			this[1][0] = this[1][1];
			this[1][1] = this[0][1];
			this[0][1] = tmp;
		}else if(deg==-90){
			tmp = this[0][0];
			this[0][0] = this[0][1];
			this[0][1] = this[1][1];
			this[1][1] = this[1][0];
			this[1][0] = tmp;
		}else if(Math.abs(deg)==180){
			tmp = [this[0][0], this[0][1]];
			this[0][0] = this[1][1];
			this[1][1] = tmp[0];
			this[0][1] = this[1][0];
			this[1][0] = tmp[1];
		}
	}else if(this.numElm()==9 && this.length==3){//3x3 matrix
		if(deg==90){
			tmp = [this[0][0], this[0][1]];
			this[0][0] = this[2][0];
			this[2][0] = this[2][2];
			this[2][2] = this[0][2];
			this[0][2] = tmp[0];
			this[0][1] = this[1][0];
			this[1][0] = this[2][1];
			this[2][1] = this[1][2];
			this[1][2] = tmp[1];
		}else if(deg==-90){
			tmp = [this[0][0], this[0][1]];
			this[0][0] = this[0][2];
			this[0][2] = this[2][2];
			this[2][2] = this[2][0];
			this[2][0] = tmp[0];
			this[0][1] = this[1][2];
			this[1][2] = this[2][1];
			this[2][1] = this[1][0];
			this[1][0] = tmp[1];
		}else if(Math.abs(deg)==180){
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
	}else if(this.numElm()==16 && this.length==4){//4x4 matrix
		if(deg==90){
			tmp = [this[0][0], this[0][1]];
			this[0][0] = this[2][0];
			this[2][0] = this[2][2];
			this[2][2] = this[0][2];
			this[0][2] = tmp[0];
			this[0][1] = this[1][0];
			this[1][0] = this[2][1];
			this[2][1] = this[1][2];
			this[1][2] = tmp[1];
		}else if(deg==-90){
			tmp = [this[0][0], this[0][1]];
			this[0][0] = this[0][2];
			this[0][2] = this[2][2];
			this[2][2] = this[2][0];
			this[2][0] = tmp[0];
			this[0][1] = this[1][2];
			this[1][2] = this[2][1];
			this[2][1] = this[1][0];
			this[1][0] = tmp[1];
		}else if(Math.abs(deg)==180){
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
	}else throw "Unsupported matrix. Please wait or contact the developer to add this matrix\' support.";
	return this;
}
 
Array.prototype.numElm = function(){//get the number of elements in the N-dimensional array
	return this.toString().split(",").length;
}
 
Array.prototype.size = function(_str){//get the w*h size of the array
	return _str? this.length+"x"+this.maxLength(): [this.length, this.maxLength()];
}
 
Array.prototype.det = function(){//determinant of a matrix
	var d = 0;
	if(this.numElm()==4 && this.length==2) d = this[0][0]*this[1][1]-this[0][1]*this[1][0];
	else if(this.numElm()==9 && this.length==3){
		d = this[0][0]*(this[1][1]*this[2][2]-this[1][2]*this[2][1])-this[0][1]*(this[1][0]*this[2][2]-this[1][2]*this[2][0])+this[0][2]*(this[1][0]*this[2][1]-this[1][1]*this[2][0]);
	}else Essence.say("Unsupported matrix format", "error");
	return d;
}
 
Array.prototype.translate = function(){
	for(i=0; i<Math.round(this.length/2); i++){
		for(j=0; j<this[0].length; j++){
			if(!(1==i && 0==j && this[0].length>2)){
				var r = this[i][j];
				this[i][j] = this[j][i];
				this[j][i] = r;
			}
		}
	}
	if(this.size(true)=="4x4"){
		var t = this[3][2];
		this[3][2] = this[2][3];
		this[2][3] = t;
	}
	return this;
}
 
Array.prototype.lookFor = function(x){//look for an element x in the array and get its position
	for(i=0; i<this.length; i++){
		if(this[i]==x) return i;//i is the row number and j the column which oppose j being the x-coord and i the y-coord
	}
	return -1;
}
 
Array.prototype.divide = function(n){//divide the array into chunks of size=n
	var res = new Array(Math.round(this.length/n)).fill(""), k = 0;
	for(i=0; i<res.length; i++){
		for(j=0; j<n; j++) res[i] += this[k++];
	}
	return res;
}
 
Array.prototype.getAdjoint = function(){//this^*
	var m=this.translate(), res=mkArray(this.length, 2, Essence.eps);
	//+-+
	//-+-
	//+-+
	if(m.numElm()==4 && m.length==2){
		res[0]=[m[1][1], -m[1][0]];
		res[1]=[-m[0][1], m[0][1]];
	}else if(m.numElm()==9 && m.length==3){
		res[0]=[m[1][1]*m[2][2]-m[1][2]*m[2][1], -(m[1][0]*m[2][2]-m[1][2]*m[2][0]), m[1][0]*m[2][1]-m[1][1]*m[2][0]];
		res[1]=[-(m[0][1]*m[1][2]-m[0][2]*m[1][1]), m[0][0]*m[2][2]-m[0][2]*m[2][0], -(m[0][0]*m[2][1]-m[0][1]*m[2][0])];
		res[2]=[m[0][1]*m[1][2]-m[0][2]*m[1][1], -(m[0][0]*m[1][2]-m[0][2]*m[1][0]), m[0][0]*m[1][1]-m[0][1]*m[1][0]];
	}else Essence.say("Unsupported matrix format", "error");
	return res;
}
 
Array.prototype.dotProd = function(a){//a.this where a is a scalar and this a matrix
	var res=[];
	for(i=0; i<this.length; i++){
		res[i]=[];
		for(j=0; j<this[i].length; j++) res[i][j] = a*this[i][j];
	}
	return res;
}
 
Array.prototype.dotAdd = function(a){
	var res=[];
	for(i=0; i<this.length; i++){
		res[i]=[];
		for(j=0; j<this[i].length; j++) res[i][j] = a+this[i][j];
	}
	return res;
}
 
Array.prototype.dotSub = function(a, order){
	var res=[];
	order = order.toLowerCase().remove(" ");
	for(i=0; i<this.length; i++){
		res[i]=[];
		for(j=0; j<this[i].length; j++) res[i][j] = (order=="a-b")? a-this[i][j]: this[i][j]-a;
	}
	return res;
}
 
Array.prototype.dotFrac = function(a, order){//can also be used with doProd(1/a, this) when the order is b/a
	var res=[];
	order = order.toLowerCase().remove(" ");
	for(i=0; i<this.length; i++){
		res[i]=[];
		for(j=0; j<this[i].length; j++) res[i][j] = (order=="a/b")? a/this[i][j]: this[i][j]/a;
	}
	return res;
}
 
Array.prototype.toStr = function(clean){//str[]->str  str[][]->str
	var str = "";
	if(is2dArray(this)){
		for(i in this){
			if(this.hasOwnProperty(i)) str+=clean? this[i].join(", "): this[i].join("");
		}
		return clean? this.toStr().split("").join(", "): str;
	}else return this.join(clean? ", ": "");
}
 
Array.prototype.toInt = function(){//int[]->int
	var n = 0;
	for(i in this){
		if(this.hasOwnProperty(i)) n+=this[i]*Math.pow(10, this.length-i-1);
	}
	return n;
}
 
Array.prototype.inv = function(){//this^-1
	return this.dotProd(1/this.det(), this.getAdjoint());
}
 
Array.prototype.mix = function(){//mix up the array
	var mix=[], randPos = mixedRange(0, 1, this.length-1), res = [];
	for(i=0; i<this.length; i++) res[i] = this[randPos[i]];
	return res;
}
 
Array.prototype.append = function(arr){//pushing every elements of the array into the current one
	for(i=0; i<arr.length; i++) this.push(arr[i]);
}
 
Array.prototype.preppend = function(arr){//unshifting every elements of the array into the current one
	for(i=0; i<arr.length; i++) this.unshift(arr[i]);
}

Array.prototype.unique = function(){//List all the unique values of the array
	var u = [];
	for(i=0; i<this.length; i++){
		if(this.count(this[i])===1) u.push(this[i]);
	}
	return u;
}

Array.prototype.to1d = function(jointer){//N-dimensional arrays to 1D arrays
	var res = this;
	for(i=0; i<res.length; i++) res[i] = res[i].join(jointer||"");
	return res;
}

String.prototype.remove = function(c){//remove c from the string
	var str = this;
	if(isArray(c)){
		for(i in c) str = str.remove(i);
	}else{
		var v = str.split(c).map(function(x){
			return x===c? undefined: x;
		}).join("");
		return (v.indexOf(undefined)!=-1)? str.remove(undefined): v;
	}
}

String.prototype.toNDigits = function(n){//get the string (representing a number) to be a n-digit string
	var i=this;
	n = n||2;
	if(parseFloat(i)<Math.pow(10, n-1)){
		while(i.split(".")[0].length<n){
			i = "0"+i;
		}
	}
	return i;
}
 
String.prototype.mix = function(separator, jointer){//mix up the string
	seperator = isNon(separator)? "": separator;
	jointer = !jointer? separator: jointer;
	var mix=[], randPos = mixedRange(0, 1, this.length-1), iStr = this.split(seperator||""), fStr = [];
	for(i=0; i<this.length; i++) fStr[i] = iStr[randPos[i]];
	return fStr.join(jointer);
}
 
String.prototype.divide = function(n){//divide the string into equal n sized chunks
	var res = new Array(Math.round(this.length/n)).fill(""), k = 0;
	for(i=0; i<res.length; i++){
		for(j=0; j<n; j++) res[i] += this[k++];
	}
	return res;
}
 
String.prototype.capitalize = function(whole){//capitalize the first word or all
	var res = this.toString();
	if(whole){
		var str = res.split(" ");
		for(i=0; i<str.length; i++) str[i] = str[i].capitalize();
		return str.join(" ");
	}else return this.charAt(0).toUpperCase()+this.slice(1);//http://stackoverflow.com/questions/1026069/capitalize-the-first-letter-of-string-in-javascript/1026087#1026087
	return res;//because it will return the String object rather than the actual string
}
 
String.prototype.sum = function(){//ascii sum
	var sum = 0;
	for(i=0; i<this.length; i++) sum += this.charCodeAt(i);
	return sum;
}
 
String.prototype.prod = function(){
	var prod = 1;
	for(i=0; i<this.length; i++) prod *= this.charCodeAt(i);
	return prod;
}
 
String.prototype.mean = function(){
	var strArr = [];
	for(i=0; i<this.length; i++) strArr[i] = this.charCodeAt(i);
	return strArr.mean(2);
}
 
String.prototype.normal = function(){//more efficient codewise than a trim
	return this.toLowerCase().remove(" ");
}
 
String.prototype.getOccurences = function(){//gets the number of occurences of each characters in a string or each elements in an array
	var arr = rmDuplicates(this), res = [];
	for(i in arr){
		if(arr.hasOwnProperty(i)){
			res.push(arr[i]+":"+this.count(arr[i])+"{"+this.positions(arr[i]).toStr(true)+"}");
			Essence.say(arr[i]+": "+this.positions(arr[i]).toStr(true));
		}
	}
	return res;
}

String.prototype.chunk = function(s, e){//split the string into chunks
    if(e<0) e = this.split(" ").length-e;
    return this.split(" ").get(parseInt(s), parseInt(e)).join(" ");
}


String.prototype.get = function(start, end){//get the sub-string starting at the start index and ending at the end index (no trickness from substr/substring)
	var res = "";
    if(end<0) end = this.length-end;
	for(i=start; i<=(end||this.length-1); i++) res+=this[i];
	return res;
}

Number.prototype.length = function(){//count how many digits is in x (including seperatly the decimales when there's some)
	if((this+"").indexOf(".")!=-1) return [parseInt((this+"").split(".")[0]).length(), parseInt((this+"").split(".")[1]).length()];
	var l = 0, x = this;
	while(Math.floor(x)!=0){
	  x /= 10;
	  l++;
	}
	return l;
}
 
Number.prototype.toNDec = function(n){//a bit like .toFixed(n) and .toPrecision(n) but returning a double instead of a string
	var pow10s = Math.pow(10, n || 2);
	return (n)? Math.round(pow10s*this)/pow10s: this;
}
 
Number.prototype.toNDigits = function(n){//get the number to be a n-digit number
	var i=this+'';//because it won't work with other types than strings
	n = n||2;
	if(parseFloat(i)<Math.pow(10, n-1)){
		while(i.split(".")[0].length<n){
			i = "0"+i;
		}
	}
	return i;
}
 
Number.prototype.sign = function(str){//get the sign of the number
	return str? (this<0? "-": (this>0? "+": "")): (this<0? -1: (this>0? 1: 0));
}
 
Number.prototype.isPrime = function(n){//check the primeness of n
	for(i=2; i<n; i++){
		if(primeCheck(i, n)) return false;
	}
	return true;
}
 
Number.prototype.clean = function(nbDec){//clean the number to make it "normal"
	if(this==0) return 0;
	else if(this>0 && this[0]=="+") return nbDec? this.slice(1, this.length).toNDec(nbDec): this.slice(1, this.length);
	else if(this=="-") return this+1;
	else if(this=="+") return 1;
	else return nbDec? this.toNDec(nbDec): this;
}
 
Number.prototype.toArr = function(){//Number->Number[]
	var arr = new Array(this.length()), i = 0, n = this;
	while(n>0){
		arr[i] = n%10;
		i++;
		n/=10;
	}
	return n;
}
 
Function.prototype.inheritsFrom = function(parentClassOrObj){ 
	if (parentClassOrObj.constructor==Function){//Normal Inheritance 
		this.prototype = new parentClassOrObj;
		this.prototype.constructor = this;
		this.prototype.parent = parentClassOrObj.prototype;
	}else{//Pure Virtual Inheritance 
		this.prototype = parentClassOrObj;
		this.prototype.constructor = this;
		this.prototype.parent = parentClassOrObj;
	} 
	return this;
}
 
function exclude(file, type){//remove an external resource
	if(!type) type = (file.indexOf(".js")>0)? "script": "link";
	var el = document.createElement(type);
	if(type=="script") el.src = file;
	else el.href = file;
	el.type = (type=="script")? "text/javascript": "text/css";
	document.head.removeChild(el);
}
 
function addMetaData(n, ctt, httpe){//temporarily add a meta data (so until the page is closed)
	var el = document.createElement("meta");
	if(httpe) el.httpEquiv = httpe;
	else el.name = n;
	el.content = ctt;
	document.head.appendChild(el);
}
 
function xor(a, b){//exclusive or which can be used as a^b
	return (a && !b)||(!a && b);
}
 
function noRightClick(){//disable right clicks
	document.oncontextmenu = new Function("return false");
}
 
function reloadPage(lvl){//reload the page with 2 different level of reload
	if(lvl==1) location.reload();//reload the location of the window
	else if(lvl==2) location.href = location.href;//update the hyper reference of the window's location
	else reloadPage(1);// otherwise the first option is used
}
 
function redirect(to, dt, divId){//redirect to #to in #dt ms
	if(!dt) dt=3e3;//if dt hasn't an assign value so it will assign a default one
	var s = Math.floor(dt/1e3);//convert from ms to s
	$("#"+divId).write("<h2>Redirecting to <ins>"+to+"</ins> ...<br />in <span id='timeleft'>"+s+"</span>s</h2>", true);//write the Redirecting message to the screen
	s--;//countdown
	$e("#timeleft").write(s);
	setTimeout("location='"+to+"';",dt);//set the timeout for the redirection
}
 
function isValid(txt, type){//check if a text (generally from a field) is valid according to the given type
	var pattern, lenOK = true;
	switch(type.toLowerCase()){
		case "email":
			pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;//from SO
			lenOK = txt.length>=9 && txt.length<64;
			break;
		case "tel": pattern = /^\+(?:[0-9] ?){6,14}[0-9]$/;break;//from somewhere
		case "username":
			pattern = /^[A-Za-z_0-9-]+$/;
			lenOK = txt.length>3 && txt.length<=16;
			break;
		case "name": pattern = /^[:alpha:]{2,35}$/;
			break;
		case "price":
			pattern = /^[0-9]*\x2e[0-9]{2}$/;
			lenOK = txt.length>3;
			break;
		case "number": pattern = /\d/; break; // /^(\x2d|)[0-9]*$/ wouldn't accept floats
		case "date":
			pattern = /(\d{1, 2}\/d{1, 2}\/d{2, 4})/; // /^([0-9]{2}\x2f){2}\x2f([0-9]{2}|[0-9]{4})$/; //accept d/m/y*
			lenOK = txt.split("/")[0]<=31 && txt.split("/")[1]<=12;
			break;
		case "hex": pattern = /(#|0x)?([A-Fa-f0-9]){3}(([A-Fa-f0-9]){3})?/;break; //from CheatSheets (iOS)
		case "tag": pattern = /(\<(\/?[^\>]+)\>)/;break; //from CheatSheets (iOS)
		case "password": pattern = /|^\c]\w{8,}/;break;
		case "file": pattern = /^[\S]+([A-Za-z0-9_]*\.(jpg|png|gif|ico|bmp))$/;break;
		case "variable": pattern = /^[A-Za-z_$$]+[0-9]*[A-Za-z_$$]+$/;break;
		case "color": pattern = /^(#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6}))|(rgb\(([0-9]+\,\s){2}([0-9]+)\))|(rgba\(([0-9]+\,\s){3}((0|1|)\.[0-9]*)\))|(hsl\(([0-9]+\,\s){2}([0-9]+)\))|(hsla\(([0-9]+\,\s){3}((0|1|)\.[0-9]*)\))$/;break;
		case "url": pattern = /^((http(|s)\:\/\/)|((file|ftp)\:\/\/\/))(\/[A-Za-z0-9_-]*)|[A-Za-z0-9_-]$/;break;
		case "ip": pattern = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;break;//from http://code.tutsplus.com/tutorials/8-regular-expressions-you-should-know--net-6149
		case "time": pattern = /^[0-5][0-9](\x3a|\.)[0-5][0-9]|([0-5][0-9]\x3a[0-5][0-9]){0, 2}(\x3a|\.)[0-5][0-9]$/;break;//meh
		default: pattern = /\w/;
	}
	return pattern.test(txt) && lenOK;
}
 
function validate(fm, ignoreRequired){//check if a form is valid
	if(!fm) fm = document.forms[0];
	var valid = true;
	for(i=0; i<fm.length; i++){
		if(ignoreRequired || fm[i].required){
			//missing: select, datetime, datetime-local, time, month, range, search, week, url
			if(fm[i].name==="username" || fm[i].name==="price") valid = valid && isValid(fm[i].value, fm[i].name);
			else if(fm[i].type==="password" || fm[i].type==="email" || fm[i].type==="tel" || fm[i].type==="date" || fm[i].type==="hex" || fm[i].type==="variable" || fm[i].type==="file" || fm[i].type==="hidden")
				valid = valid && isValid(fm[i].value, fm[i].type);
			else if(fm[i].name==="price") valid = valid && isValid(fm[i].value, fm[i].name);
			else if(fm[i].name.indexOf("name")>=0) valid = valid && isValid(fm[i].value, "name");
			else if(fm[i].type==="checkbox" && fm[i].checked) valid = valid && true;
			else valid = valid && !isNon(fm[i].value);//radio, 
		}
	}
	return valid;
}
 
function isArray(obj){//check if #obj is an array
	return Object.prototype.toString.call(obj) === "[object Array]";
}
 
function is2dArray(obj){
	if(isArray(obj)){
		for(i=0; i<obj.length; i++){
			if(isArray(obj[i])) return true;
		}
	}else return false;
}
 
function isType(obj, type){//only works for native types (treats custom ones as objects)
	type = type[0].toUpperCase()+type.slice(1, type.length).toLowerCase();
	return Object.prototype.toString.call(obj) === "[object "+type+"]";
}
 
function isCustomType(obj, type){//same as isType but for custom types
	return getCustomType(obj).toLowerCase()===type.toLowerCase();
}
 
function getType(obj, preserve){//only works for native types. preserve would leave the [object type]
	var t = Object.prototype.toString.call(obj);
	return (preserve)? t: t.split(" ")[1].slice(0, t.split(" ")[1].length-1);
}
 
function getCustomType(obj, preserve){//same as getType but for custom types which won't work for native types
	var t = obj.toLocaleString();
	if(t.indexOf("[")>-1) return (preserve)? t: t.split(" ")[1].slice(0, t.split(" ")[1].length-1); //[object Type]
	else return t.split("(")[0].trim();
}
 
function timesLiteral(n){//converts $n "times" to an appropriate formulation
	switch(n){
		case 1: return "once";break;
		case 2: return "twice";break;
		default: return n+" times"; break;
	}
}
 
function escapeHTML(str){//get the html equivalent of the string
	var span = document.createElement('span');
	span.appendChild(document.createTextNode(str));
	return span.innerHTML;
}
 
function unescapeHTML(str){//get the string equivalent of the html code
	var span = document.createElement('span');
	span.removeChild(document.createTextNode(str));
	return span.innerText;
}
 
function isNon(val){//like isEmpty
	return (val===false || val===undefined || val===null || val==="" || val===[] || val==={});
}
 
function copy(el){//returns a copy of an element in order to do mutation-safe operations with it
	if(isType(el, "String") || isType(el, "Number") || isType(el, "Boolean")) return el; //as they are immutable types  
	else{
		var clone;
		for(i in el){
			if(el.hasOwnProperty(i)) clone[i] = el[i];
		}
		return clone;
	}
}
 
/*function clone(obj){//source: http://stackoverflow.com/questions/728360/most-elegant-way-to-clone-a-javascript-object by A.Levi
	var copy;
 
	//Handle the 3 simple types, and null or undefined
	if(obj==null || typeof obj!="object") return obj;
 
	//Handle Date
	if(obj instanceof Date)
		copy = new Date();
		copy.setTime(obj.getTime());
		return copy;
	}
 
	//Handle Array
	if(obj instanceof Array){
		copy = [];
		for(i=0, len=obj.length; i<len; i++) copy[i] = clone(obj[i]);
		return copy;
	}
 
	// Handle Object
	if(obj instanceof Object){
		copy = {};
		for(attr in obj){
			if(obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
		}
		return copy;
	}
	throw new Error("Unable to copy obj! Its type isn't supported.");
}*/
	 
function toMaxSize(){//resize the window to maximum size of the client/screen/device with the support of ActiveX, Java (mainly Processing) and VBS
	try{
		if(clientWidth || ActiveX || ActiveXObject) window.resizeTo(clientWidth, clientHeight);
		else if(client.Width) window.resizeTo(client.Width, client.Height);
		else if(client.width) window.resizeTo(client.width, client.height);
		else if(clientX) window.resizeTo(clientX, clientY);
		else if(client.X) window.resizeTo(client.X, client.Y);
		else if(client.x) window.resizeTo(client.x, client.y);
		else if(screenWidth) window.resizeTo(screenWidth, screenHeight);
		else if(screen.Width) window.resizeTo(screen.Width, screen.Height);
		else if(screen.width) window.resizeTo(screen.width, screen.height);
		else if(screenX) window.resizeTo(screenX, screenY);
		else if(screen.X) window.resizeTo(screen.X, screen.Y);
		else if(screen.x) window.resizeTo(screen.x, screen.y);
		else if(deviceWidth) window.resizeTo(deviceWidth, deviceHeight);
		else if(device.Width) window.resizeTo(device.Width, device.Height);
		else if(device.width) window.resizeTo(device.width, device.height);
		else if(deviceX) window.resizeTo(deviceX, deviceY);
		else if(device.X) window.resizeTo(device.X, device.Y);
		else if(device.x) window.resizeTo(device.x, device.y);
		else if(pageWidth) window.resizeTo(pageWidth, pageHeight);
		else if(page.Width) window.resizeTo(page.Width, page.Height);
		else if(page.width) window.resizeTo(page.width, page.height);
		else if(pageX) window.resizeTo(pageX, pageY);
		else if(page.X) window.resizeTo(page.X, page.Y);
		else if(page.x) window.resizeTo(page.x, page.y);
		else if(windowWidth) window.resizeTo(windowWidth, windowHeight);
		else if(window.Width) window.resizeTo(window.Width, window.Height);
		else if(window.width) window.resizeTo(window.width, window.height);
		else if(windowX) window.resizeTo(windowX, windowY);
		else if(window.X) window.resizeTo(window.X, window.Y);
		else if(window.x) window.resizeTo(window.x, window.y);
		else if(monitorWidth) monitor.resizeTo(monitorWidth, monitorHeight);
		else if(monitor.Width) monitor.resizeTo(monitor.Width, monitor.Height);
		else if(monitor.width) monitor.resizeTo(monitor.width, monitor.height);
		else if(monitorX) monitor.resizeTo(monitorX, monitorY);
		else if(monitor.X) monitor.resizeTo(monitor.X, monitor.Y);
		else if(monitor.x) monitor.resizeTo(monitor.x, monitor.y);
		else if(frameWidth) frame.resizeTo(frameWidth, frameHeight);
		else if(frame.Width) frame.resizeTo(frame.Width, frame.Height);
		else if(frame.width) frame.resizeTo(frame.width, frame.height);
		else if(frameX) frame.resizeTo(frameX, frameY);
		else if(frame.X) frame.resizeTo(frame.X, frame.Y);
		else if(frame.x) frame.resizeTo(frame.x, frame.y);
		else return false;
	}catch(e){}
}
 
function getScrenDim(){//dimension of the screen
	return [screen.width, screen.height];
}
 
function getWinDim(){//dimension of the window
	return [screen.availWidth, screen.availHeight];
}
 
function getCookie(c_name){//gather the cookie with the name c_name
	var i,x,y,ARRcookies=document.cookie.split(";");
	for(i=0;i<ARRcookies.length;i++){
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if(x==c_name) return unescape(y);
	}
}
  
function setCookie(c_name,value,exdays){//create a cookie with the corresponding informations
	exdays = exdays%99983489;//as 99983488 is the maximum value
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}
 
function getMetaData(){//get the meta-data of the current page
	var md = $n("*meta"), resN = [], resC = [];
	for(i=0; i<md.length; i++){
		resN[i] = md[i].name||md[i].httpEquiv||md[i].title;
		resC[i] = md[i].content||md[i].value;
	}
	return [resN, resC];
}
 
function getResources(rmEmpty){//get all the resources of a page apart from the in-CSS ones
	//maybe some specifications to filter up ? And also more info about those resources
	var links = $n("*link"), scripts = $n("*script"), stylesheets = $n("*style"), rsc = [], hypertxt = $n("*a"), img = $n("*img"), btnImg = $n("*input image"),
	inCSS = [$n("*div"), $n("*section"), $n("*td"), $n("*th"), $n("*li")];
	for(i=0; i<links.length; i++){
		if(!isNon(links[i])) rsc[i] = links[i].href;
		Essence.say(links[i].href.split("/")[links[i].href.split("/").length-1]+" has been added to the resources getter.", "info");
	}
	for(i=0; i<scripts.length; i++){
		if(!isNon(scripts[i])) rsc.push(scripts[i].src);
		Essence.say(scripts[i].src.split("/")[scripts[i].src.split("/").length-1]+" has been added to the resources getter.", "info");
	}
	for(i=0; i<hypertxt.length; i++){
		if(!isNon(hypertxt[i])) rsc.push(hypertxt[i].href);
		Essence.say(hypertxt[i].href.split("/")[hypertxt[i].href.split("/").length-1]+" has been added to the resources getter.", "info");
	}
	for(i=0; i<img.length; i++){
		if(!isNon(img[i])) rsc.push(img[i].src);
		Essence.say(img[i].src.split("/")[img[i].src.split("/").length-1]+" has been added to the resources getter.", "info");
	}
	for(i=0; i<btnImg.length; i++){
		if(!isNon(btnImg[i])) rsc.push(btnImg[i].src);
		Essence.say(btnImg[i].src.split("/")[btnImg[i].src.split("/").length-1]+" has been added to the resources getter.", "info");
	}
	for(i=0; i<inCSS.length; i++){
		for(j=0; j<inCSS[i].length; j++){
			rsc.push(inCSS[i][j].style.backgroundImage.slice(4, inCSS[i][j].style.backgroundImage.length-1));
			var x = inCSS[i][j].style.backgroundImage.slice(4, inCSS[i][j].style.backgroundImage.length-1);
			Essence.say(x.split("/")[x.split("/").length-1]+" has been added to the resources getter.", "info");
		}
	}//remove or not unecessary cells with a double check for one.
	Essence.say("Resource list: "+rsc.clean());
	//rsc = rsc.remove([null, "undefined", "null", "", " "]);//stops here
	//Essence.say("New resource list: "+rsc);
	return rmEmpty? rsc.clean(): rsc;
}

function gatherScripts(asList){//sort of getResources() but dedicated to only scripts and easier to use
	var $s = $n("*script"), res = asList? []: {};
	for(i=0; i<$s.length; i++) asList? res.push($s[i].src): res[$s[i].src.split("/")[$s[i].src.split("/").length-1]] = $s[i].src;
	return res;
}

function gatherStylesheets(asList){//same as gatherScripts but for stylesheets
	var $l = $n("*link"), res = asList? []: {};
	for(i=0; i<$l.length; i++) asList? res.push($l[i].href): res[$l[i].href.split("/")[$l[i].href.split("/").length-1]] = $l[i].href;
	return res;
}

function include_once(file, type, parentPath){//avoid including a file if it's already included
	if(!type) type = (file.indexOf(".js")>0)? "script": "style";
	var r = type==="script"? gatherScripts(true): gatherStylesheets(true);
	if(parentPath && (keyList(r, true).indexOf(parentPath+file)>-1 || valList(r, true).indexOf(parentPath+file)>-1)) return;
	else if(keyList(r, true).indexOf(file)>-1 || valList(r, true).indexOf(file)>-1) return;
	else include(file, type);
}

function stripTags(str){//Remove (X)HTML tags
	return str.replace(/\<[\s\S]+\>(.*?)\<\/[\s\S]+\>/, "$1");
}

function stripPath(path){//keeps the file name even if it's not in the same directory as this library or the files using it
	return path.split("/")[path.split("/").length-1];
}

function getLocalPath(path, localPath){//a bit like stripPath but which would preserve the directories that aren't listed in the local path
    if(!localPath) localPath = "file:///";
    var parts = path.split("/"), res = "", pParts = localPath.split("/"), i = 0, j = 0;
    while(localPath.indexOf(parts[i])>-1) i++;
    res = parts.get(i).join("/");

    while(res.indexOf(pParts[j])>-1){
        console.log("Gone through "+pParts[j]);
        j++;
    }
    if(j>0){
        for(i=0; i<j; i++) res = "../"+res;
    }

    return res;
}

function filenameList(list){//list containing only file names so no paths
    var res = [];
    for(i=0; i<list.length; i++) res.push(stripPath(list[i]));
    return res.remove("");
}

function getDirectoryPath(path){//get the directory's path of the file (so it's the opposite of of stripPath)
	if(!path) path = location.href;
	return path.get(0, path.indexOf(stripPath(path))-1);
}

function rand(min, max, integer){//the general random function
	if (!integer) return Math.random()*(max-min+1)+min;//Math.random() * (max - min) / min doesn't works for min=0
	else return Math.floor(Math.random()*(max-min+1)+min);
}

function randTo(max){
	return rand(0, max, true);//to only have to use the max value and already knowing the rest
}

function baseRand(min, max, base){//randomise a number in the selected base
	return parseInt(rand(min, max)).toString(base||10);
}

function randVar(var1, var2, integer){//return a random number between var1 and var2 which don't need to be ordered
	var mx = Math.max(var1, var2), mn = Math.min(var1, var2);//setting the max and min for the rand() call
	return rand(mn, mx, integer);
}

function lenRand(len, if0){//same as rand() but with the length instead of the max and min so it's a range based randomness
	if(if0) return Math.floor(Math.random()*(len+1));//if the first term is 0
	else return Math.floor(Math.random()*len);//otherwise if it's 1
}

function random16(){//Random float from <0, 1> with 16 bits of randomness as Math.random() creates repetitive patterns when applied over larger space
	return (65280*Math.random()+255*Math.random())/65535;
}

function randFloatSpread(range){//Random float from <-range/2, range/2> interval
	return range*(.5-Math.random());
}

function randArr(n, min, max, float, base){//generate an array with random numbers
	var r=[];
	for(i=0; i<n; i++) r[i] = (base)? conv(rand(min||0, max||100, !float||true), 10, base||10): rand(min||0, max||100, !float||true);
	return r;
}
 
function genNearlySortedArr(n, min, max){//generate a nearly sorted array
	var aI = range(n, min, max), res = [], ic;
	ic = aI.getIncrement(0);
	for(i=0; i<aI.length; i++){
		var r = rand(0, ic, true);
		res.push(aI[i]);
		if(i>0 && r==0) swap(res, i, i-1);
		else if(i>1 && r==ic) swap(res, i, i-2);
		 
	}
	return res;
}
 
function sumPow2(arr, nbDec){//for stddevs
	if(!isArray(arr)) return false;
	var sum=0;
	for(i=0; i<arr.length;i++) sum+=Math.pow(arr[i], 2);
	return sum.toNDec(nbDec);
}
 
function conv(n, from, to, float){//base convertion
	return float? parseFloat(n, from||2).toString(to||10): parseInt(n, from||2).toString(to||10);
}
 
function negateBin(bin, toArr){//it returns the negative form of a binary number using 2's complement
	var n=[], dec = 0;
	for(i=0; i<bin.length; i++) n[i]=1-parseInt(bin[i]);
	dec = conv(n.join(""));
	dec++;
	return toArr? conv(dec, 10, 2).split(""): conv(dec, 10, 2);
}
 
function min2dec(min){//minute to decimal
	return (50*min)/30;
}
 
function dec2min(dec){
	return (30*dec)/50;
}
 
function toS(i, withH, unformat){//hr:min:s.ms->s
	if(i=="undefined" || !i) i=(withH)? "00:00:00.000": "00:00.000";//avoid having errors
	if(typeof i!="String") i+="";
	if(i.length>=4 && i.indexOf(":")==1) return toS("0"+i, withH, unformat);//so times without the leading 0 or simply with a 1-digit first section could be read properly
	if(withH){
		var h, m, s, ms;//any parts that need to be extracted
		h=i.slice(0, 2);//the first section: hour
		m=i.slice(3, 5);//the second section: min
		s=i.slice(6, 8);//the third section: sec
		h=parseInt(h);//keep it as an int
		m=parseInt(m);
		s=parseInt(s);
		ms=i.slice(8, i.length);//the last section: ms
		ms=parseInt(ms*1000);//round it to avoid having too much digits and being at the right distance of the point
		ms=(ms<100 && ms[0]!=0)? "0"+ms: ms;
		s+=ms*0.001;//collapse the sec and ms together
		s+='';
		s.split(".")[0] = s.split(".")[0].toNDigits();
		if(s.length>6) s=s.slice(0, 5)||i.split(":")[1];//avoid having a malformatting
		var r=((h*360+m*60+Math.floor(s*1000)/1000)+"").slice(0, 7);
		if(unformat) return parseFloat(r);//return the time into seconds keeping the milliseconds
		else return parseFloat(r.toNDigits()); //keep it as an int with 7 characters
 
	}else{
		var m, s, ms;//any parts that need to be extracted
		m=i.slice(0, 2);//the first section: min
		m=parseInt(m);//keep it as an int
		s=i.slice(3, 5);//the second section: sec
		s=parseInt(s);
		ms=i.slice(5, i.length);//the last section: ms
		ms=parseInt(ms*1000);//round it to avoid having too much digits and being at the right distance of the point
		ms=(ms<100 && ms[0]!=0)? "0"+ms: ms;
		s+=ms*0.001;//collapse the sec and ms together
		s+='';
		s.split(".")[0] = s.split(".")[0].toNDigits();
		if(s.length>6) s=s.slice(0, 5)||i.split(":")[1];//avoid having a malformatting
		var r=((m*60+Math.floor(s*1000)/1000)+"").slice(0, 7);
		if(unformat) return parseFloat(r);//return the time into seconds keeping the milliseconds
		else return parseFloat(r.toNDigits()); //keep it as an int with 7 characters
 
	}
}
 
var sec2time = s2t = s2time, toSec = toS;//shortcuts
function s2time(i, withH){//invert of toS(i)
	var h=0, m=0, s=i;//min=0 to avoid incrementing an unvalued variable and s the time in seconds
	if(withH){
		s = (i%60).toNDigits(3);
		h = (i>=3600)? Math.floor(i/3600): 0;
		m = Math.floor((i-s-3600*h)/60);
		s = (s+"").slice(0, 6);
		m = (m<=0)? "00": m.toNDigits();
		h = (h<=0)? "00": h.toNDigits();
		return (h<=0)? m+":"+s: h+":"+m+":"+s;
	}else{
		s = (i%60).toNDigits(3);
		m = Math.floor(i/60);
		s = (s+"").slice(0, 6);
		m = (m<=0)? "00": m.toNDigits();
		return (m<=0)? s: m+":"+s;//return the result as min:s.ms
	}
}
 
function markConv(mark, initTotal, endTotal, precision){//to get mark/initTotal in the form x/endTotal
	return (mark/initTotal*(endTotal||100)).toNDec(precision||2);//useful for calculating percentages (endTotal=100)
}
 
function nthroot(x, n, nDec){
	var r=x/2;
	for(i=0; i<60; i++) r+=(x-Math.pow(r, n))/(Math.pow(r+1, n)-Math.pow(r, n));
	return r.toNDec(nDec||20);
}
 
function log(y, x){//LOGy(x) (log x to the base y)
  return Math.log(y)/Math.log(x||2);
}
 
function Bin(n, p, r){//Binomial distrib. where X~Bin(n, p) and it returns P(X=r)
	return C(n, r)*Math.pow(p, r)*Math.pow(1-p, n-r);
}
 
function BinCumul(n, p, r){//P(X<=r)
	 
}
 
function Norm(x){//P(z<x) where Z~N(0, 1) (or P(z>-x) is x is positive) == normalcdf(x)
	//return 1/Math.sqrt(2*Math.pi)
	var t=1/(1+.2316419*Math.abs(x));
	var d=.3989423*Math.exp(-x*x/2);
	var p=d*t*(.3193815+t*(-.3565638+t*(1.781478+t*(-1.821256+t*1.330274))));
	return p.toNDec(4);
}
function StdNorm(m, sd, x){//turn into the standard normal distribution
	return Norm((x-m)/sd);//P(Z<(x-m)/sd)
}
 
function Po(l, x){//Poisson distribution
	return (exp(-l)*Math.pow(l, x))/factorial(x).toNDec(4);
}
 
function PoCumul(l, x){
	 
}
 
function factorial(x){//x!
	var f=x;
	for(i=1; i<x; i++) f *= i;
	return f; //recursive way: (x==1)? 1: n*factorial(x-1);
}
 
function C(n, r){//nCr
	return factorial(n)/(factorial(r)*factorial(n-r));
}
 
function Bin2Norm(n, p, r, sign){//Binomial to Normal
	if(n*p>5 && n*(1-p)>5){
		var continuityCorrection = .5;
		if(sign==">=") continuityCorrection=-.5;
		r+=continuityCorrection;
		return StdNorm(n*p, Math.sqrt(n*p*(1-p)), r);
	}else return false;
}
 
function Bin2Po(n, p, r){//Binomial to Poisson
	if(n>50 && p<.1) return Po(n*p, r);
	else return false;
}
 
function Po2Norm(l){//Poisson to Normal
	if(l>10) return StdNorm(y, Math.sqrt(y));
	else return false;
}
 
function clamp(x, a, b){//Clamp value to range <a, b> to keep it in
	return (x<a)? a: ((x>b)? b: x);
}
 
function clampBottom(x, a){//Clamp value to range <a, inf<
	return (x<a)? a: x;
}
 
function clampTop(x, b){//lamp value to range >-inf, b>
	return (x>b)? b: x;
}
 
function mapLinear(x, a1, a2, b1, b2){//Linear mapping from range <a1, a2> to range <b1, b2>
	return b1+(x-a1)*(b2-b1)/(a2-a1);
}
 
function degToRad(deg){//degree to radiant
	return deg*Essence.d2r;
}
 
function radToDeg(rad){//radiant to degree
	return rad*Essence.r2d;
}
 
function celsToFahr(cel){//celsus to fahrenheit
	return 33.8*cels;
}
 
function fahrToCels(fahr){//fahrenheit to celsius
	return fahr/33.8;
}
 
function primeN(arr){//return the prime numbers of arr where non prime numbers that doesn't have divisors in the array are considered prime
	var newArr = arr.quickSort();
	for(i=0; i<arr.length; i++){
		if(arr[i]%2==0 && arr[i]!=2) newArr[i] = "x";
		for(j=0; j<i; j++){
			if(primeCheck(newArr[j], newArr[i])) newArr[i] = "x";
		}
	}
	return newArr.remove("x");
}
 
function primeCheck(a, b){//check the primeness of a toward b
	if(a>1 && b>1 && b%a==0 && b!=a) return true;
	else return false;
}
 
function getClosestRoot(x, n){//get the closest whole nth-root of x 
	var rof=0, er=0;
	if((x/2*x/2)/2-2<=x) rof = x/2;
	else if(x/3*x/3<=x) rof = x/3;
	for(p=1; p<=n; p++){
		for(i=1; i<x; i++){
			if(Math.pow(i, p)==x || Math.pow(i, p-1)*i==x) er=i;
			else if(Math.pow(i, p)>x || Math.pow(i, p-1)*i>x) er=i-.5;
		}
	}
	if(Math.pow(er, n)<=x) return er;
	else er = (Math.pow(n, -2)+x/Math.pow(n, 4)-x/Math.pow(n, 5)+Math.pow(x, n)/(Math.pow(n, Math.pow(n, 3)+3))+x/Math.pow(n, 2))/2;
	if(Math.pow(er, n)>x) er = (er+rof)/2;
	return (x/er+er)/2;
}
 
function simpleInterest(po, i, t){
	return po*(1+i*t);
}
 
function compoundInterest(po, i, t, n){
	return n>1? po*Math.pow(1+i/n, t*n): po*Math.pow(1+i, t);
}
 
function non0(x){//To get a number that is everything but not 0 (generally x>=0.0...1)
	if(x==0) return eps;
	else return x;
}
 
function toFrac(n, prec, up){//returns the fraction form of n (from StackOverFlow)
	var s = String(n), p = s.indexOf('.');
	if(p==-1) return s;
 
	var i = Math.floor(n)||'', dec = s.substring(p),  m = prec||Math.pow(10, dec.length-1), num = up? Math.ceil(dec*m): Math.round(dec*m), den = m, 
	g = Essence.gcd(num, den);
 
	if(den/g==1) return String(i+(num/g));
 
	if(i) i +=' and ';
	return i+ String(num/g)+'/'+String(den/g);
}
 
function clearNum(n, nDec, usFormat){//make a number more readable
	var sps = (Math.floor(n)+"").length/3, str = "";
	for(i=0; i<sps; i++){
		str = ((n-n%Math.pow(1000, i))%Math.pow(1000, i+1))/Math.pow(1000, i)+" "+str;
	}
	str = str.split(" ");
	str.pop();
	return str.join(usFormat? ",": " ")+(n%1).toNDec(nDec||3);
}
 
function getStep(a, b, nbDec){//get the increment value from a to b where a is the minimum value and b the maximum value of range where only those two values are known
	return [a, b].getIncrement(nbDec);
}
 
function quadraticSolver(a, b, c, nDec){//find the roots of ax^2+bx+c=0
	var d=Math.sqrt(b, 2)-4*a*c;
	return d==0? (-b/(2*a)).toNDec(nDec): [((-b-Math.sqrt(Math.abs(d)))/(2*a)+(d<0? "i": 0)).toNDec(nDec), (-b+Math.sqrt(Math.abs(d)))/(2*a)+(d<0? "i": 0).toNDec(nDec)];
}
 
function eqSolver(formula, res, a, b){//solve equations with a given formula and the result (e.g: x+y+x=res) and the range [a, b]
	a = a || -100;
	b = b || 200;
	var  r= mkArray(a>0? b-a: b-a+1, 2, 1);
	//translation from text to commands or to a computer readable string for eval()
	//str.replace(/([A-z]|[0-9])\x29$/m, "m") for end )
	//str.replace(/^\x28([A-z]|[0-9])/m, "m") for start (
	if(formula.search(/\^[0-9]/g)>0){//look for a ^n
		/*if(formula.charAt(formula.search(/\^[0-9]/g)-1)==")"){
			formula = formula.replace(/^\(/m, "Math.pow(");
			formula = formula.replace(/\)\^[0-9]/g, [A-z]+);
		}else{
			formula = formula.replace(/^\(/m, "Math.pow(");
			formula = formula.replace(/\^[0-9]/g, [A-z]+);
		}*/
		/*propposed by Jhonatan Sneider Salguero Villa
		[(].*?[)] (very simplistic, what is inside might not be a math expression)
		\d+\.\d+ (float)
		\d+ (int)
		[a-z]+ (variable)
		*/
		var expr = "([(].*?[)]|\\d+\\.\\d+|\\d+|[a-z]+)";
		var reg = RegExp(expr+"\\^"+expr);
		formula = formula.replace(reg, "Math.pow($1, $2)");
	}else if(formula.search(/e\^/g)>0){//look for a e^
		var expr = "([(].*?[)]|\\d+\\.\\d+|\\d+|[a-z]+)";
		var reg = RegExp("e\\^"+expr);
		formula = formula.replace(reg, "Math.exp($1)");
	}
	Essence.say("Formula now converted to "+formula, "info");
	//brute force using any values within [a, b]
	for(x=a; x<=b; x++){
		for(y=a; y<=b; y++){
			r[x][y] = "("+x+","+y+") "+eval(formula);
		}
	}
	return r.filter(function(n){if(n.split(") ")[1]==res) return n.split(") ")[0]+")";});//filter out the values which doesn't match the result and returns only (x, y)
}
 
function manuEqSolver(eq, max, dim, r){
	//eq is a string containing the equation, max the upper limit, dim the dimension (1: x, 2: x/y, 3: x/y/z)
	var res = mkArray(max+1, dim, 1), p = [];
	for(x=0; x<res.length; x++){
		if(dim==2){
			for(y=0; y<res.length; y++){
				res[x][y] = eval(eq);
				if(res[x][y]==r) p.push("x="+x+", y="+y);
			}
		}else if(dim==3){
			for(y=0; y<res.length; y++){
				for(z=0; z<res.length; z++){
					res[x][y][z] = eval(eq);
					if(res[x][y][z]==r) p.push("x="+x+", y="+y+", z="+z);
				}
			}
		}else{
			res[x] = eval(eq);
			if(res[x]==r) p.push("x="+x);
		}
	}
	return p;
}
 
 
function getNumFromStr(x){//remove the text from the string to keep the numbers
	return parseFloat(x.replace(/[A-Za-z_ ]+/g, ""));
}
 
function toPixel(x){//x unit -> y px
	var m = 1;
	switch(x.substring(String(getNumFromStr(x)).length, x.length)){
		case "em":
			m = 16;
			break;
		case "cm"://or 37.66 ?
			m = 37.781;
			break;
		case "mm"://or 3.7781  ?
			m = 3.766;
			break;
		case "ex":
			m = 7.156;
			break;
		case "in":
			m = 96;
			break;
		case "pt":
			m = 1.328;
			break;
		case "pc": //15.... ?
			m = 16;
			break;
		case "m": //15.... ?
			m = 3778.1;
			break;
		default: break;
	}
	return getNumFromStr(x)*m;
}
 
function fromPixel(x, unit){//x px -> y unit
	var m = 1;
	switch(unit){
		case "em":
			m = 1/16;
			break;
		case "cm":
			m = 1/37.781;
			break;
		case "mm":
			m = 1/3.766;
			break;
		case "ex":
			m = 1/7.156;
			break;
		case "in":
			m = 1/96;
			break;
		case "pt":
			m = 1/1.328;
			break;
		case "pc": //15.... ?
			m = 1/16;
			break;
		case "m": //15.... ?
			m = 1/3778.1;
			break;
		default: break;
	}
	return (x*m)+unit;
}
 
function convUnit(x, unit){//x => y unit
	return fromPixel(toPixel(x), unit);//demux(.*, px)->mux(px, .*)
}
 
function AX(filename, text2write, close, remove){//manipulate a file with ActiveX
	var fso=new ActiveXObject("Scripting.FileSystemObject");// Objets
// Bool: flat the file of the same name if it's already present
	fso.CreateTextFile(filename,true);
// opening type: 1-read only; 2-rewriting; 8-continue to write at the end, create (true) or not (false) the file if it doesn't exist
	var otf=fso.OpenTextFile(filename,1 ,true);
//WriteLn add a new line
// -the file has to be already opened in mode 2 or 8
	otf.Write(text2write);
/*the file has to be opened in the read mod
-Read read to the specified number of characters.*/
	otf.ReadAll();
	if(close){
		if(confirm("Do you realy want to close this file")) otf.Close();
	}
	if(remove){
		if(confirm("Do you realy want to delete this file")) fso.DeleteFile(filename);
	}
}
 
function execFile(file, ext){// execute a file
	var wshShell = new ActiveXObject("WScript.Shell");
	wshShell.Run(file+"."+ext, 1, true);
}
 
function copyToClipboard(txt, type){//works only for IE
	clipboardData.setData(type||'Text',txt);
}
 
function save(txt, name, type){//save into a file of the corresponding type
	var txtfile = new Blob([txt], {type:'text/'+(type||"plain")});
 
	var dlLink = document.createElement("a");
	dlLink.download = name;
	dlLink.innerHTML = "Download File";
	if(window.webkitURL != null) dlLink.href = window.webkitURL.createObjectURL(txtfile);//Chrome allows the link to be clicked without actually adding it to the DOM.
	else{//Firefox requires the link to be added to the DOM before it can be clicked.
		dlLink.href = window.URL.createObjectURL(txtfile);
		dlLink.onclick = function(evt){
			document.body.removeChild(evt.target);
		};
		dlLink.style.display = "none";
		document.body.appendChild(dlLink);
	}
	dlLink.click();
}
 
var fct = "";
function getFileContent(fname){
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", fname, false);
	rawFile.onreadystatechange = function(){
		if(rawFile.readyState === 4){
			if(rawFile.status === 200 || rawFile.status == 0){
				//alert("File content:\n\n"+rawFile.responseText);
				fct = rawFile.responseText;//because returning it won't allow the actual content to be returned
				return rawFile.responseText;
			}
		}
	}
	rawFile.send(null);
}
 
function getKey(keyStroke, tLC){//get informations about the pressed key
	var code = !document.all? keyStroke.which: event.keyCode;
	var char = tLC? String.fromCharCode(code).toLowerCase(): String.fromCharCode(code);
	return [char, code];
}
 
function getTime(){//hh:mm:ss
	var d = new Date();
	return d.getHours().toNDigits(2)+":"+d.getMinutes().toNDigits(2)+":"+d.getSeconds().toNDigits(2);
}
 
function getDate(short){//ddMMM
	var m = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], d = new Date();
	return short? d.getDate().toNDigits(2)+m[d.getMonth()]+d.getUTCFullYear(): d.getDate().toNDigits(2)+"/"+d.getMonth().toNDigits(2)+"/"+d.getUTCFullYear();
}
 
function getTimestamp(){//ddMMM-hh-mm-ss
	var d = new Date();
	return getDate(true)+"-"+getTime().replace(/\:/g, "-");
}
 
function genStr(len, filter){//generate a string
	var str="", az = new Array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"), AZ = new Array(), zero9 = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9"), common_char = new Array("&", "~", "\"", "#", "\'", "{", "[", "(", "-", "|", "`", "_", "\\", "^", "@", ")", "]", "+", "=", "}", "%", "*", "?", ",", ";", ".", "/", ":", "!", " ", ""),
	charlist;
	for(l=0; l<az.length; l++) AZ[l] = az[l].toUpperCase();
	charlist = az.concat(AZ, zero9, common_char);
	var c="", i=0;
	while(str.length<len){
		c = charlist[randTo(charlist.length-1)];
		if(filter.name=="specificChar"){
			while(c==filter.character) c = charlist[randTo(charlist.length-1)];
		}else if(filter.name=="noUpperCase"){
			c=c.toLowerCase();
		}else if(filter.name=="noLowerCase"){
			c=c.toUpperCase();
		}else if(filter.name=="cumultativeRepeat"){
			while(c==str[i-1]) c = charlist[randTo(charlist.length-1)];
		}else if(filter.name=="cumultativeSensitiveRepeat"){
			while(c===str[i-1]) c = charlist[randTo(charlist.length-1)];
		}else if(filter.name="noRepeat"){
			charlist.pop(i>0? str[i-1]: str[0]);
			c = charlist[randTo(charlist.length-1)];
		}
		str += c;
		i++;
	}
	if(str.length<len) str += charlist[randTo(charlist.length-1)];
	else if(str.length>len) str = str.slice(0, len+1);
	if(str=="") genStr(len, filter);//may cause overflows
	return str;
}
 
function Colour(r, g, b, a){//Processing's Color()
	this.constructor = function(r, g, b, a){
		if(isArray(r) && r.length>=3 && !g && !b){//Colour([r, g, b(, a)])
			this.red = r[0];
			this.green = r[1];
			this.blue = r[2];
			this.alpha = (r.length==4)? r[3]: 255;
		}else if(!g && !b && r && g!=0 && b!=0){//Colour(rgb(, a))
			this.red = this.green = this.blue = r;
			this.alpha = (r.length==2 && isType(r, "Array"))? r[1]: 255;
		}else if(!g && !b && r){//Colour(r, 0, 0)
			this.red = r;
			this.green = 0;
			this.blue = 0;
			this.alpha = (r.length==2)? r[1]: 255;
		}else if(g && !b && r){//Colour(r, r, r, g)
			this.red = this.green = this.blue = r;
			this.alpha = g;
		}else{//Colour(, g, b(, a))
			this.red = r||0;
			this.green = g||0;
			this.blue = b||0;
			this.alpha = a||255;
		}
		this.hex = "#"+conv(this.red, 10, 16).toNDigits()+""+conv(this.green, 10, 16).toNDigits()+""+conv(this.blue, 10, 16).toNDigits();
		this.rgba = "rgba("+this.red+", "+this.green+", "+this.blue+", "+this.alpha+")";
	}
	this.constructor(r, g, b, a);
	this.update = function(){
		this.hex = "#"+conv(this.red, 10, 16).toNDigits()+""+conv(this.green, 10, 16).toNDigits()+""+conv(this.blue, 10, 16).toNDigits();
		this.rgba = "rgba("+this.red+", "+this.green+", "+this.blue+", "+this.alpha+")";
	}
	this.getRGBAPerc = function(){
		return "rgba("+markConv(this.red, 255, 100)+", "+markConv(this.green, 255, 100)+", "+markConv(this.blue, 255, 100)+", "+markConv(this.alpha, 255, 100)+")";
	}
	 
	this.getMaxClr = function(){
		return Math.max(Math.max(this.red, g), b);
	}
	 
	this.getMinClr = function(){
		return Math.min(Math.min(this.red, g), b);
	}
	 
	this.negative = function(withAlpha){//negative mod
		//conv(parseInt(conv("EE", 16, 10))+parseInt(conv('11', 16, 10)), 10, 16)="FF"=255 (always)
		this.red = 255-parseInt(this.red);
		this.green = 255-parseInt(this.green);
		this.blue = 255-parseInt(this.blue);
		if(withAlpha) this.alpha = 255-parseInt(this.alpha);
		this.update();
	}
	 
	this.redNegative = function(){//invert the red
		this.red = 255-parseInt(this.red);
		this.update();
	}
	 
	this.greenNegative = function(){//invert the green
		this.green = 255-parseInt(this.green);
		this.update();
	}
	 
	this.blueNegative = function(){
		this.green = 255-parseInt(this.green);
		this.update();
	}
	 
	this.rand = function(hex){
		this.red = randTo(255);
		this.green = randTo(255);
		this.blue = randTo(255);
		this.update();
		return hex? this.hex: this.rgba;
	}
	 
	this.toLocaleString = function(){
		return "Colour(r="+this.red+", g="+this.green+", b="+this.blue+", a="+this.alpha+")";
	}
	 
	this.toString = function(){
		return "rgba("+this.red+", "+this.green+", "+this.blue+", "+this.alpha+")";
	}
	 
	this.get = function(){
		return [this.red, this.green, this.blue, this.alpha];
	}
	 
	this.increment = function(i){
		if(isNon(i)) i = 63.75;
		this.blue += i;
		if(this.blue>=255){
			this.blue -= 255;
			this.green += i;
		}
		if(this.green>=255){
			this.green -= 255;
			this.red += i;
		}
		this.update();
	}
	//this.getColourName = function()
	return this;
}
 
function hex2rgb(hex, toArray){//hexadecimal to RGB (tom StackOverFlow)
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	if(result){
		return (toArray)? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]: parseInt(result[1], 16) + ', ' + parseInt(result[2], 16) + ', ' + parseInt(result[3], 16);
	}else if(/^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i.exec(hex)){
		result = /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i.exec(hex);
		return (toArray)? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]: parseInt(result[1]+result[1], 16) + ', ' + parseInt(result[2]+result[2], 16) + ', ' + parseInt(result[3]+result[3], 16);
	}else return null;
}
 
function rgb2hex(rgb, toArray){//RGB to hexademical
	rgb = rgb.slice(4, rgb.length-1).split(", ");
	return toArray? [conv(rgb[0], 10, 16).toNDigits(), conv(rgb[1], 10, 16).toNDigits(), conv(rgb[2], 10, 16).toNDigits()]: "#"+conv(rgb[0], 10, 16).toNDigits()+conv(rgb[1], 10, 16).toNDigits()+conv(rgb[2], 10, 16).toNDigits();
}
 
function negateColour(elmt, attr, mod){//switch the colour of the elmt's attribute (that can be the background/border/font colour of an HTML element and which is in hex form) to it's red/green/blue/yellow/cyan/magenta/full negative version.
	mod=(mod)? mod[0].toLowerCase(): "x"; //to accept: r, R, red, Red, RED; for the red, ...
	var clrs=($e(elmt).css(attr).indexOf("rgb(")==0)? $e(elmt).css(attr).slice(4, $e(elmt).css(attr).length-1).split(", "): hex2rgb($e(elmt).css(attr), true), clr=new Colour();
	if(mod=="r"){
		clr.red = 255-parseInt(clrs[0]);
		clr.green = clrs[1];
		clr.blue = clrs[2];
	}else if(mod=="g"){
		clr.red = clrs[0];
		clr.green = 255-parseInt(clrs[0]);
		clr.blue = clrs[2];
	}else if(mod=="b"){
		clr.red = clrs[0];
		clr.green = clrs[1];
		clr.blue = 255-parseInt(clrs[2]);
	}else if(mod=="y"){
		clr.red = 255-parseInt(clrs[0]);
		clr.green = 255-parseInt(clrs[1]);
		clr.blue = clrs[2];
	}else if(mod=="c"){
		clr.red = clrs[0];
		clr.green = 255-parseInt(clrs[0]);
		clr.blue = 255-parseInt(clrs[2]);
	}else if(mod=="m"){
		clr.red = 255-parseInt(clrs[0]);
		clr.green = clrs[1];
		clr.blue = 255-parseInt(clrs[2]);
	}else if(mod=="a"||mod=="f"||mod=="w"){
		clr.red = 255-parseInt(clrs[0]);
		clr.green = 255-parseInt(clrs[1]);
		clr.blue = 255-parseInt(clrs[2]);
	}else{
		clr.red = clrs[0];
		clr.green = clrs[1];
		clr.blue = clrs[2];
	}
	clr.hex = "#"+conv(clr.red, 10, 16).toNDigits()+""+conv(clr.green, 10, 16).toNDigits()+""+conv(clr.blue, 10, 16).toNDigits();
	$e(elmt).setCSS(attr, clr.hex);
}
 
function colourNameToHex(clr){//Get the hexadecimal equivalent of the colour names
	switch(clr.normal()){
		case "aqua": return "#00ffff"; break;
		case "cyan": return "#00ffff"; break;
		case "black": return "#000000"; break;
		case "blue": return "#0000ff"; break;
		case "fuchsia": return "#ff00ff"; break;
		case "magenta": return "#f800f8"; break;
		case "gray": return "#808080"; break;
		case "grey": return "#808080"; break;
		case "green": return "#008000"; break;
		case "lime": return "#00ff00"; break;
		case "brown": return "#800000"; break;
		case "maroon": return "#800000"; break;
		case "navy": return "#000080"; break;
		case "olive": return "#808000"; break;
		case "purple": return "#800080"; break;
		case "red": return "#ff0000"; break;
		case "silver": return "#c0c0c0"; break;
		case "teal": return "#008080"; break;
		case "white": return "#ffffff"; break;
		case "yellow": return "#ffff00"; break;
		case "gold": return "#ffd700"; break;
		case "seagreen": return "#2e8b57"; break;
		case "pink": return "#ffc0cb"; break;
		case "skyblue": return "#87ceeb"; break;
		case "coral": return "#ff7f50"; break;
		case "tan": return "#d2b48c"; break;
		case "orange": return "#ffa500"; break;
		case "cream": return "#feffff"; break;
		case "lightgray": return "#d3d3d3"; break;
		case "salmon": return "#fa8072"; break;
		default: return null; break;
	}
}
 
function rgbList(inc, intOnly, debug){//loop through all the possible rgb colours mod inc
	var l = [];
	if(isNon(inc)) inc=63.75;
	for(r=0; r<257; r+=inc){
		for(g=0; g<257; g+=inc){
			for(b=0; b<257; b+=inc){
				if(debug) Essence.say("rgb("+(intOnly? [Math.round(r), Math.round(g), Math.round(b)].join(", "): [r, g, b].join(", "))+")");
				l.push("rgb("+(intOnly? [Math.round(r), Math.round(g), Math.round(b)].join(", "): [r, g, b].join(", "))+")");
			}
		}
	}
	return l;
}
 
function Person(fname, sname, lname, title, surname, num, country, city, sex, bday, jobs, activities, websites, quote){//A person
	this.firstName = fname||"";
	this.secondName = sname||"";
	this.lastName = lname||"";
	this.title = title||"";
	this.surname = surname|"";
	this.phoneNum = num||"none";
	this.country = country||"";
	this.city = city||"";
	this.sex = (sex.toLowerCase()=="male"||sex.toLowerCase()=="female")? sex: "other";
	this.birthday = bday;
	this.jobs = jobs||"unemployed";
	this.activities = activities||"none";
	this.websites = websites||"none";
	this.quote = quote||"";
	this.toString = function(){//weirdly showing "getName" which isn't the case of toLocaleString() 
		var str = "Person(";
		for(p in this){
			if(this.hasOwnProperty(p) && p!="toString") str += p+"="+this[p]+", ";
		}
		return str.substring(0, str.length-2)+")";
	}
	return this;
}
 
function Item(name, cat, price, amr, nb){//an item like the ones that can be bought/sold/traded/used
	this.name = name||"unknown";
	this.category = cat||"unknown";
	this.price = price||0;
	this.ageMinRequired = amr||.25;//3 months old+
	this.quantity = nb||1;
	this.firstMade = new Date().toLocaleString();
	 
	this.dublicate = function(n, dest){
		for(i=0; i<n; i++) dest.push(new Item(this.name, this.category, this.price, this.ageMinRequired, this.quantity));
	}
	this.remove = function(dest){
		dest.remove(this);
	}
	this.toString = function(){
		var str = "";
		for(p in this){
			if(this.hasOwnProperty(p) && p!="toString" && !isType(p, "function")) str += p+"="+this[p]+", ";
		}
		return str.substring(0, str.length-2);
	}
	return this;
}
 
function range(min, inc, max){//Matlab min:inc:max range
	var val = [], n = 0;
	if(min && !inc && !max && max!=0) return range(0, 1, min);
	else if(min && inc && !max && max!=0) return range(0, inc, min);
	if(!min) min = 0;
	if(!inc) inc = 1;
	if(!max) max = 100;
	if(inc>0){//ascending order
		for(i=min; i<=max; i+=inc) val[n++] = i;
	}else{//descending order
		for(i=min; i>=max; i+=inc) val[n++] = i;
	}
	return val;
}
 
function rangeToBase(min, inc, max, b){//same as range(...) but to the base b
	var val = [], n = 0;
	if(inc>0){
		for(i=min; i<=max; i+=inc) val[n++] = conv(i, 10, b);
	}else{
		for(i=min; i>=max; i+=inc) val[n++] = conv(i, 10, b);
	}
	return val;
}
 
function letterArray(first, last){//a letter pair array
	var f = first.charCodeAt(0), l = last.charCodeAt(0), arr = [], letterPair = "";
	for(firstLetter=f; firstLetter<=l; firstLetter++){
	  for(secondLetter=f; secondLetter<=l; secondLetter++){
		if(firstLetter != secondLetter){
		  letterPair = String.fromCharCode(firstLetter) + String.fromCharCode(secondLetter);
		  arr.push(letterPair);
		}
	  }
	}
	return arr;
}
 
function mixedRange(min, inc, max, noRepeat){//like randArr but with unique values and using a Fisher Yates-like approach
	var val=[], available = range(min, inc, max);
	if(noRepeat){
		//using while loops that have len=(min==0)? max-min/inc+1.. ?
		 
	}else{
		for(i=min; i<=max; i++){
			val[i] = available[randTo(available.length-1)];
		}
	}
	return val;
}
 
//arr.fill(new Array(...).fill(...)) is already there
function mkArray(len, dim, fill){//make an array of len^dim
	var arr = [];
	if(dim==1){
		if(!fill) arr = new Array(len);
		else{
			for(i=0; i<len; i++) arr[i] = fill;
		}
	}else if(dim==2){
		if(!fill){
			arr = new Array(len);
			for(i=0; i<len; i++) arr[i] = new Array(len);
		}else{
			for(i=0; i<len; i++){
				arr[i] = new Array(len);
				for(j=0; j<len; j++) arr[i][j] = fill;
			}
		}
	}else if(dim==3){
		if(!fill){
			arr = new Array(len);
			for(i=0; i<len; i++){
				arr[i] = new Array(len);
				for(j=0; j<len; j++) arr[i][j] = new Array(len);
			}
		}else{
			for(i=0; i<len; i++){
				arr[i] = new Array(len);
				for(j=0; j<len; j++){
					arr[i][j] = new Array(len);
					for(k=0; k<len; k++) arr[i][j][k] = fill;
				}
			}
		}
	}else if(dim==4){
		if(!fill){
			arr = new Array(len);
			for(i=0; i<len; i++){
				arr[i] = new Array(len);
				for(j=0; j<len; j++){
					arr[i][j] = new Array(len);
					for(k=0; k<len; k++) arr[i][j][k] = new Array(len);
				}
			}
		}else{
			for(i=0; i<len; i++){
				arr[i] = new Array(len);
				for(j=0; j<len; j++){
					arr[i][j] = new Array(len);
					for(k=0; k<len; k++){
						arr[i][j][k] = new Array(len);
						for(l=0; l<len; l++){
							arr[i][j][k][l] = fill;
						}
					}
				}
			}
		}
	}else return "Unvalid dimension. Only 1D-4D arrays can be made.";
	return arr;
}
 
function numArr(n, start){//Like an n-puzzle
	var na = [], x = start||0;
	for(i=0; i<n; i++){
		na[i] = [];
		for(j=0; j<n; j++) na[i][j] = x++;
	}
	return na;
}
//Depreciated on Chrome/Opera as [obj[e1], obj[e2]] = [obj[e2], obj[e1]] can done or [obj, e1] = [e1, obj]
function swap(obj, e1, e2){//swap two proprietary elements or two elements
	if(e2){
		var tmp = obj[e1];
		obj[e1] = obj[e2];
		obj[e2] = tmp;
		return obj;
	}else{
		var tmp = obj;
		obj = e1;
		e1 = tmp;
		return [obj, e1];
	}
}
 
function fisherYatesShuffle(obj){//Inspired by https://github.com/duereg/js-algorithms/blob/master/lib/algorithms/1-strings/shuffle.js
	var l = obj.length;
	while(l>0){
		if(obj.hasOwnProperty(l)) swap(obj, l, Math.floor(Math.random()*l--));
	}
	return obj;
}
 
function vectorProd(v1, v2){//v1 x v2
	var x=[], prod=[0, 0, 0];
	x[0]=["i", "j", "k"];
	x[1]=[v1.x, v1.y, v1.z];
	x[2]=[v2.x, v2.y, v2.z];
	prod[0] = v1.y*v2.z-v1.z*v2.y;//i
	prod[1] = v1.x*v2.z-v1.z*v2.x;//j
	prod[2] = v1.x*v2.y-v1.y*v2.x;//k
	return prod[0]+"i+"+prod[1]+"j+"+prod[2]+"k";
}
 
function vectorToPoint(v){//get the conversion of the vector to a point
	return new Pt(v.x, v.y, v.z);
}
 
function vectorToPointForm(r){//r=xi+yj+zk->(x, y, z)
	return "("+cleanNb(r.split("i")[0])+", "+cleanNb(r.split("i")[1].split("j")[0].slice(1, r.split("i")[1].split("j")[0].length))+", "+cleanNb(r.split("i")[1].split("j")[1].split("k")[0])+")";
}
function scalarProd(v1, v2){//v1.v2 (same as the dot product but for vectors)
	return v1.x*v2.x+v1.y*v2.y+v1.z*v2.z;
}
 
function union(a, b, c, toSort){//a union b (union c)
	return toSort? rmDuplicates(a.concat(b, c)).quickSort(): rmDuplicates(a.concat(b, c));
}
 
function intersection(a, b, c, toSort){//a intersection b (intersection c)
	var inter = [], _a = a.quickSort(), _b = b.quickSort(), _c = c? c.quickSort(): false;
	for(i in a){
		if(b.indexOf(a[i])>-1 && isNon(c)) inter.push(a[i]);
		else if(b.indexOf(a[i])>-1 && c.indexOf(a[i])>-1) inter.push(a[i]);
	}
	return toSort? rmDuplicates(inter).quickSort(): rmDuplicates(inter);
}
 
function complement(a, b, c, toSort){//a\b(\c) => a xor b (xor c)
	var cpt = [], _a = a.quickSort(), _b = b.quickSort(), _c = c? c.quickSort(): false;
	for(i in a){
		if(b.indexOf(a[i])==-1 && isNon(c)) cpt.push(a[i]);
		else if(b.indexOf(a[i])==-1 && c.indexOf(a[i])==-1) cpt.push(a[i]);
	}
	return toSort? rmDuplicates(cpt).quickSort(): rmDuplicates(cpt);
}
 
function symDif(a, b, c, toSort){//Symmetric difference: a union b - a intersection b => a only & b only
	var sd = [], _a = a.quickSort(), _b = b.quickSort(), _c = c? c.quickSortort(): false;
	for(i in a){
		if(b.indexOf(a[i])==-1 && isNon(c)) sd.push(a[i]);
		else if(b.indexOf(a[i])==-1 && c.indexOf(a[i])==-1) sd.push(a[i]);
	}
	for(i in b){
		if(a.indexOf(b[i])==-1 && isNon(c)) sd.push(b[i]);
		else if(a.indexOf(b[i])==-1 && c.indexOf(b[i])==-1) sd.push(b[i]);
	}
	if(c){
		for(i in c){
			if(a.indexOf(c[i])==-1 && b.indexOf(c[i])==-1) sd.push(c[i]);
		}   
	}
	return toSort? rmDuplicates(sd).quickSort(): rmDuplicates(sd);
}
 
function bitStr(a, b){//bit string of a mathematical set in relation to an other
	//Ba in b
	var ba = [];
	for(i in a) ba[i] = (a[i]==b[i])? 1: 0;
	return ba;
}
 
function toSameLength(a, b, cr){//make sure that a and b are of the same lengths and fill the empty spaces with cr
	if(!a.isIterable() || !b.isIterable()) throw new Error("invalid length equality operation on non-iterable objects");
	if(!cr) cr = " ";
	if(a.length>b.length){
		for(i=b.length; i<a.length; i++) isType(b[i], "String")? b += cr: b.push(cr);
	}else if(a.length<b.length){
		for(i=a.length; i<b.length; i++) isType(a[i], "String")? a += cr: a.push(cr);
	}
	return [a, b];
}
 
function And(a, b, cr, toArr){//logical a&b where a and b are sets
	toSameLength(a, b, cr|null);
	var res=toArr? new Array(a.length): (a[0] && b[0]);
	for(i in a){
		if(toArr) res[i] = a[i]&&b[i];
		else res = (res && a[i] && b[i]);
	}
	return res;
}
 
function Or(a, b, cr, toArr){//logical a|b where a and b are sets
	toSameLength(a, b, cr|null);
	var res=toArr? new Array(a.length): (a[0] || b[0]);
	for(i in a){
		if(toArr) res[i] = a[i]||b[i];
		else res = (res || a[i] || b[i]);
	}
	return res;
}
 
function Xor(a, b, cr, toArr){//logical a^b where a and b are sets
	toSameLength(a, b, cr|null);
	var res=toArr? new Array(a.length): xor(a[0], b[0]);
	for(i in a){
		if(toArr) res[i] = xor(a[i], b[i]);
		else res = xor(res, xor(a[i], b[i]));
	}
	return res;
}
 
function Imply(a, b, cr, toArr){//logical a=>b where a and b are sets
	toSameLength(a, b, cr|null);
	var res=toArr? new Array(a.length): (!a[0] || b[0]);
	for(i in a){
		if(toArr) res[i] = (!a[i] || b[i]);
		else res = (!res || (!a[i] || b[i]));
	}
	return res;
}
 
function manhattanDist(a, b){//return the Manhattan distance between two points a(xa, ya) and b(xb, yb) where b is generally the solved position of a
	return Math.abs(Math.abs(a[0]-b[0])+Math.abs(a[1]-b[1]));
}
 
function euclidianDist(a, b){//return the Euclidian distance  ...
	return Math.sqrt(Math.pow(a[0]-b[0], 2)+Math.pow(a[1]-b[1], 2));
}

function diagDist(a, b){//return the Diagonal distance  ...
	return Math.max(Math.abs(a[0]-b[0]), Math.abs(a[1]-b[1]));
}

function h(mtx, solvedMtx, hrt){//(heuristic) manhattan distance of each elements of a matrix mtx
	var res = new Array(mtx.length);
	for(i=0; i<mtx.length; i++){
		res[i] = new Array(mtx[i].length);
		for(j=0; j<mtx[i].length; j++){
			res[i][j] = hrt([i, j], lookfor(mtx[i][j], solvedMtx))||euclidianDist([i, j], lookfor(mtx[i][j], solvedMtx));
		}	   
	}
	Essence.say(console.table(res));
	return res.sum2d();
}

function lookfor(x, mtx, toCoord){//look for an element x in a matrix mtx
	for(i=0; i<mtx.length; i++){
		for(j=0; j<mtx[i].length; j++){
			if(mtx[i][j]==x) return toCoord? [j, i]: [i, j];//i is the row number and j the column which oppose j being the x-coord and i the y-coord
		}
	}
	return -1;
}

function keyList(map, propOnly){//returns a list of keys of a map
	var list = [];
	//ES6 only: if(propOnly) return keys(map);
	if(propOnly){
		for(var key in map){
			if(map.hasOwnProperty(key)) list.push(key);
		}
	}else for(var key in map) list.push(key);
	return list;
}

function valList(map, propOnly){//returns a list of values of a map
	var list = [];
	//ES6 only: if(propOnly) return values(map);
	if(propOnly){
		for(var key in map){
			if(map.hasOwnProperty(key)) list.push(map[key]);
		}
	}else for(var key in map) list.push(map[key]);
	return list;
}

function keyTable(map, propOnly){//same as above but in the form of the HTML table
	var table = hasName(map)? "<table cellspacing=0><caption>KeyTable: <i>"+map.getName()+"</i></caption><tr><th>Key</th><th>Value</th></tr>": "<table><caption>KeyTable</caption><tr><th>Key</th><th>Value</th></tr>";
	for(var key in map){
		table += (propOnly && map.hasOwnProperty(key))? "<tr><td>"+key+"</td><td>"+map[key]+"</td></tr>": "<tr><td>"+key+"</td><td>"+map[key]+"</td></tr>";
	}
	return table+"</table>";
}

function LinkedList(pl, nx, name){
	this.payload = pl||1;
	this.next = nx||{payload: 1, next: null};
	this.next.show = function(){
		return this.name+":"+this.next.payload+"->";
	}
	this.name = name;
	this.show = function(){
		return this.name+":"+this.payload+"->"+this.next.show();
	}
	 
	this.toString = function(){
		return "LinkedList("+this.show()+")";
	}
	return this;
}
 
function TreeNode(pl, l, r){//binary tree
	this.left = l;
	this.right = r;
	this.payload = pl||0;
	 
	this.add = function(l, r){
		this.left = l;
		this.right = r;
	}
	this.addLeft = function(childs){
		for(i=0; i<childs.length; i++){
			if(i==0) this.left = childs[0];
			else childs[i-1].left = childs[i];
		}
	}
	this.addRight = function(childs){
		for(i in childs){
			if(i==0) this.righttChild = childs[0];
			else childs[i-1].right = childs[i];
		}
	}
	this.traverse = function(){
		if(this.left) this.left.traverse();
		if(this.right) this.right.traverse();
		return this;
	}
	//Console printing
	this.printInOrder = function(){
		if(this.left) this.left.printInOrder();
		Essence.addToPrinter(this.payload+"->");
		if(this.right) this.right.printInOrder();
		Essence.addToPrinter("\r\n");
	}
	this.printPreOrder = function(){
		Essence.addToPrinter(this.payload+"->");
		if(this.left) this.left.printPreOrder();
		if(this.right) this.right.printPreOrder();
		Essence.addToPrinter("\r\n");
	}
	this.printPostOrder = function(){
		if(this.left) this.left.printPreOrder();
		if(this.right) this.right.printPreOrder();
		Essence.addToPrinter(this.payload+"->");
		Essence.addToPrinter("\r\n");
	}
	//Window printing
	this.inOrder = function(t, s, d, sym){
		if(!t) t = "";
		if(!s) s = "&nbsp;&nbsp;";
		if(!d) d = 0;
		if(!sym) sym = "|-";
		 
		if(this.left) this.left.inOrder(t+s, s, d+1, sym);
		println(t+sym+this.payload+s+" (deepth="+d+")");
		if(this.right) this.right.inOrder(t+s, s, d+1, sym);
	}
	this.preOrder = function(t, s, d, sym){
		if(!t) t = "";
		if(!s) s = "&nbsp;&nbsp;";
		if(!d) d = 0;
		if(!sym) sym = "|-";
		 
		println(t+sym+this.payload+s+" (deepth="+d+")");
		if(this.left) this.left.preOrder(t+s, s, d+1, sym);
		if(this.right) this.right.preOrder(t+s, s, d+1, sym);
	}
	this.postOrder = function(t, s, d, sym){
		if(!t) t = "";
		if(!s) s = "&nbsp;&nbsp;";
		if(!d) d = 0;
		if(!sym) sym = "|-";
		 
		if(this.left) this.left.postOrder(t+s, s, d+1, sym);
		if(this.right) this.right.postOrder(t+s, s, d+1, sym);
		println(t+sym+this.payload+s+" (deepth="+d+")");
	}
	//Getter
	this.getInOrder = function(sym){
		if(!sym) sym = "->";
		var order = "";
		 
		if(this.left) order += this.left.getInOrder(sym);
		order += sym+this.payload;
		if(this.right) order += this.right.getInOrder(sym);
		return order;
	}
	this.getPreOrder = function(sym){
		if(!sym) sym = "->";
		var order = "";
		 
		order += sym+this.payload;
		if(this.left) order += this.left.getPreOrder(sym);
		if(this.right) order += this.right.getPreOrder(sym);
		return order;
	}
	this.getPostOrder = function(sym){
		if(!sym) sym = "->";
		var order = "";
		 
		if(this.left) order += this.left.getPostOrder(sym);
		if(this.right) order += this.right.getPostOrder(sym);
		return order+sym+this.payload;
	}
	this.isLeaf = function(){//Is it an end of branch ?
		return !this.left && !this.right;
	}
	this.find = function(n, method){
		return (method.normal()==="bfs")? this.bfs(n): this.dfs(n);
	}
	this.dfs = function(n, d, td){//Deepth First Search
		if(!d) d = 0;//deepth
		if(!td) td = 0;//total deepth
		var stack = new Array();
		stack.push(this);
		while(stack!=[]){
			d = 0;
			var cur = stack.pop();
			try{
				if(cur.payload===n) return [d, td];
			}catch(e){
				return [-1, td];
			}
			if(cur.left) stack.push(cur.left);
			if(cur.right) stack.push(cur.right);
			d++;
			td++;
		}
	}
	this.bfs = function(n, b, tb){//Breadth First Search
		if(!b) b = 0;//breadth
		if(!tb) tb = 0;//total breadth
		var queue = new Array();
		queue.unshift(this);//add as the end
		while(queue!=[]){
			b = 0;
			var cur = queue.pop();//get the first element of the queue
			try{
				if(cur.payload===n) return [b, tb];
			}catch(e){
				return [-1, tb];
			}
			if(cur.left) queue.unshift(cur.left);
			if(cur.right) queue.unshift(cur.right);
			b++;
			tb++;
		}
	}
	this.sum = function(){
		var s = this.payload;
		if(this.left) s += this.left.sum();
		if(this.right) s += this.right.sum();
		return s;
	}
	this.min = function(){
		var m = this.payload;
		if(this.left) m = Math.min(m, this.left.min());
		if(this.right) m = Math.min(m, this.right.min());
		return m;
	}
	this.max = function(){
		var m = this.payload;
		if(this.left) m = Math.max(m, this.left.max());
		if(this.right) m = Math.max(m, this.right.max());
		return m;
	}
	this.nbOfBranches = function(n){
		if(!n) n = 0;
		if(this.left) n = this.left.nbOfBranches(n+1);
		if(this.right) n = this.right.nbOfBranches(n+1);
		return n;
	}
	this.avg = function(){
		return this.sum()/this.nbOfBranches();
	}
	this.printBFS = function(sym){
		if(!sym) sym = "->";
		var queue = new Array(), res = "";
		queue.unshift(this);//add as the end
		while(queue!=[]){
			var cur = queue.pop();//get the first element of the queue
			res += cur+sym;
			try{
				if(cur.left) queue.unshift(cur.left);
				if(cur.right) queue.unshift(cur.right);
			}catch(e){}
		}
		return sym;
	}
	this.toString = function(){
		/* Essence.txt2print = "";
		this.printInOrder();
		return "Tree("+Essence.txt2print+")"; */
		var str = "TreeNode(payload="+this.payload+", ";
		if(this.left) str += "left="+this.left.toString();
		if(this.right) str += "right="+this.right.toString();
		return str.substring(0, str.length)+")";
	}
	this.toArray = function(singly){
		var arr = [];
		if(this.left) singly? arr.push(this.left.toArray().toString().split(",")): arr.push(this.left.toArray());
		arr.push(this.payload);
		if(this.right) singly? arr.push(this.right.toArray().toString().split(",")): arr.push(this.right.toArray());
		return singly? arr.toString().split(","): arr;
	}
}
 
function Node(pl, nx, pv){
	this.payload = pl||1;
	this.next = nx||null;//or new node()
	this.prev = pv||null;
	 
	this.traverse = function(){
		if(this.next!=null) this.next.traverse();
		Essence.say("payload: "+this.payload);
	}
	 
	this.print = function(){
		if(this.next!=null) this.next.print();
		Essence.print(this.payload+"=>");
	}
	 
	this.printList = function(){
		if(this.next == null) Essence.txt2print += "->"+this.v;
		else this.next.printList();
		Essence.print("");
	}
	 
	this.last = function(){
		if(this.next == null) return this;
		else return this.next.last();
	}
	 
	this.append = function(n){
		if(this.next == null){
			this.next = new Node(n); //If there is no next node, link the new one here
			this.next.prev = this;
		}else this.next.append(n); //Else, append to next node
	}
	 
	this.remove = function(){
		var n = this.next;
		this.next = n.next;
		n.next.prev = this;
	}
	 
	this.reverse = function(){
		 if(this.next==null) return this;
		 else{
			var newHead = this.next.reverse();
			newHead.next = this;
			newHead.prev = null;
			this.prev = newHead;
			this.next = null;
			return newHead;
		}
	}
	 
	this.toString = function(){
		return "Node(payload="+this.payload+", previous="+this.prev+", next="+this.next+")";
	}
	 
	this.equals = function(node){
		return this.payload==node.payload && this.next.equals(node.next) && this.prev.equals(node.prev);
	}
	 
	this.find = function(n, d){
		if(!d) d = 0;
		if(this.payload===n) return d;
		if(this.next) return this.next.find(n, d+1);
		return [-1, d];
	}
}
 
function PathNode(g, h){//nodes for path finding algs
	this.f = g+h||1;
	this.parent = null;
}

NTreeNode.inheritsFrom(TreeNode);
function NTreeNode(pl, ch){//n-ary tree
	this.payload = pl||0;
	this.childs = ch||[];
	this.add = function(c){
		this.childs.push(c);
	}
	this.traverse = function(){
		for(var c in this.childs){
			if(this.childs.hasOwnProperty(c)) c.traverse();
		}
		return this;
	}
	//Console printing
	this.printInOrder = function(){
		if(this.left) this.left.printInOrder();
		Essence.addToPrinter(this.payload+"->");
		if(this.right) this.right.printInOrder();
		Essence.addToPrinter("\r\n");
	}
	this.printPreOrder = function(){
		Essence.addToPrinter(this.payload+"->");
		if(this.left) this.left.printPreOrder();
		if(this.right) this.right.printPreOrder();
		Essence.addToPrinter("\r\n");
	}
	this.printPostOrder = function(){
		if(this.left) this.left.printPreOrder();
		if(this.right) this.right.printPreOrder();
		Essence.addToPrinter(this.payload+"->");
		Essence.addToPrinter("\r\n");
	}
	//Window printing
	this.inOrder = function(t, s, d, sym){
		if(!t) t = "";
		if(!s) s = "&nbsp;&nbsp;";
		if(!d) d = 0;
		if(!sym) sym = "|-";
		 
		if(this.left) this.left.inOrder(t+s, s, d+1, sym);
		println(t+sym+this.payload+s+" (deepth="+d+")");
		if(this.right) this.right.inOrder(t+s, s, d+1, sym);
	}
	this.preOrder = function(t, s, d, sym){
		if(!t) t = "";
		if(!s) s = "&nbsp;&nbsp;";
		if(!d) d = 0;
		if(!sym) sym = "|-";
		 
		println(t+sym+this.payload+s+" (deepth="+d+")");
		if(this.left) this.left.preOrder(t+s, s, d+1, sym);
		if(this.right) this.right.preOrder(t+s, s, d+1, sym);
	}
	this.postOrder = function(t, s, d, sym){
		if(!t) t = "";
		if(!s) s = "&nbsp;&nbsp;";
		if(!d) d = 0;
		if(!sym) sym = "|-";
		 
		if(this.left) this.left.postOrder(t+s, s, d+1, sym);
		if(this.right) this.right.postOrder(t+s, s, d+1, sym);
		println(t+sym+this.payload+s+" (deepth="+d+")");
	}
	//Getter
	this.getInOrder = function(sym){
		if(!sym) sym = "->";
		var order = "";
		 
		if(this.left) order += this.left.getInOrder(sym);
		order += sym+this.payload;
		if(this.right) order += this.right.getInOrder(sym);
		return order;
	}
	this.getPreOrder = function(sym){
		if(!sym) sym = "->";
		var order = "";
		 
		order += sym+this.payload;
		if(this.left) order += this.left.getPreOrder(sym);
		if(this.right) order += this.right.getPreOrder(sym);
		return order;
	}
	this.getPostOrder = function(sym){
		if(!sym) sym = "->";
		var order = "";
		 
		if(this.left) order += this.left.getPostOrder(sym);
		if(this.right) order += this.right.getPostOrder(sym);
		return order+sym+this.payload;
	}
	this.isLeaf = function(){//Is it an end of branch ?
		return !isNon(this.childs);
	}
	this.find = function(n, method){
		return (method.normal()==="bfs")? this.bfs(n): this.dfs(n);
	}
	this.dfs = function(n, d, td){//Deepth First Search
		if(!d) d = 0;//deepth
		if(!td) td = 0;//total deepth
		for(var c in this.childs){
			if(this.childs.hasOwnProperty(c)) c.dfs(n, d+1, td++);
		}
		return [-1, td];
	}
	this.bfs = function(n, b, tb){//Breadth First Search
		if(!b) b = 0;//breadth
		if(!tb) tb = 0;//total breadth
		var queue = new Array();
		queue.unshift(this);//add as the end
		while(queue!=[]){
			b = 0;
			var cur = new TreeNode(queue.pop());//get the first element of the queue
			if(cur.payload===n) return [b, tb];
			if(cur.left) queue.unshift(cur.left);
			if(cur.right) queue.unshift(cur.right);
			b++;
			tb++;
		}
		return [-1, td];
	}
	this.sum = function(){
		var s = this.payload;
		if(this.left) s += this.left.sum();
		if(this.right) s += this.right.sum();
		return s;
	}
	this.min = function(){
		var m = this.payload;
		if(this.left) m = Math.min(m, this.left.min());
		if(this.right) m = Math.min(m, this.right.min());
		return m;
	}
	this.max = function(){
		var m = this.payload;
		if(this.left) m = Math.max(m, this.left.max());
		if(this.right) m = Math.max(m, this.right.max());
		return m;
	}
	this.nbOfBranches = function(n){
		if(!n) n = 0;
		if(this.left) n = this.left.nbOfBranches(n+1);
		if(this.right) n = this.right.nbOfBranches(n+1);
		return n;
	}
	this.avg = function(){
		return this.sum()/this.nbOfBranches();
	}
	this.printBFS = function(t){
		var queue = new Array(), tab = t||"-";//better and easier than a Queue/QueueList
		queue.unshift(this);//add as the end
		while(queue!=[]){
			var cur = new TreeNode(queue.pop());//get the first element of the queue
			println(tab+">"+cur.payload);
			tab += "-";
			if(cur.left) queue.unshift(cur.left);
			if(cur.right) queue.unshift(cur.right);
		}
	}
	this.toString = function(){
		/* Essence.txt2print = "";
		this.printInOrder();
		return "Tree("+Essence.txt2print+")"; */
		var str = "TreeNode(payload="+this.payload+", ";
		if(this.left) str += "left="+this.left.toString();
		if(this.right) str += "right="+this.right.toString();
		return str.substring(0, str.length)+")";
	}
	this.toArray = function(singly){
		var arr = [];
		if(this.left) singly? arr.push(this.left.toArray().toString().split(",")): arr.push(this.left.toArray());
		arr.push(this.payload);
		if(this.right) singly? arr.push(this.right.toArray().toString().split(",")): arr.push(this.right.toArray());
		return singly? arr.toString().split(","): arr;
	}
}
 
function Set(arr){//mathematical set
	this.value = (isType(arr, "arr")? arr: [arr])||[];
	 
	this.size = function(){
		return this.value.length;
	}
	 
	this.add = function(item){
		if(this.value.indexOf(item)==-1){
			 
			if(isType(item, "array")) this.value = this.value.concat(item);
			else this.value.push(item);
		}
	}
	 
	this.remove = function(item){
		if(this.value.indexOf(item)==-1){
			if(isType(item, "array")){
				for(i=0; i<item.length; i++) this.remove(item[i]);
			}
			else this.value = this.value.remove(item);
		}
	}
	 
	this.clear = function(){
		this.value = [];
	}
	 
	this.isEmpty = function(){
		return this.value === [];
	}
	 
	this.contains = function(item){
		if(isType(item, "array")){
			var c = true;
			for(i=0; i<item.length; i++){
				if(!c) return false; //reduce the cost of the operation by not doing any unecessary work
				c = c && this.contains(item[i]);
			}
			return c;
		}else return this.value.indexOf(item)==-1? false: true;
	}
	 
	this.equals = function(s){
		return this.value.toString()===s.value.toString();
	}
	 
	this.isSame = function(s){//check if both sets have the same elements but not necessarily in the same order
		if(this.equals(s)) return true;
		var same = true;
		for(i=0; i<s.size(); i++){
			if(!same) return false;
			same = same && this.contains(s.value[i]);
		}
	}
	 
	this.toString = function(){
		return "Set("+this.value.toString()+")";
	}
	 
	this.subset = function(s, e){
		return this.value.slice(s, e+1);
	}
	 
	this.get = function(i){
		return this.value[i];
	}
	 
	this.first = function(){
		return this.value[0];
	}
	 
	this.last = function(){
		return this.value[this.value.lastIndex()];
	}
	 
	this.min = function(s, e){
		return this.value.min(s, e);
	}
	 
	this.max = function(s, e){
		return this.value.max(s, e);
	}
	 
	this.median = function(s, e){
		return this.value.max(s, e);
	}
}
 
SortedSet.inheritsFrom(Set);
function SortedSet(arr){
	this.add = function(item){
		if(this.value.indexOf(item)==-1){
			if(isType(item, "array")) this.value = this.value.concat(item);
			else this.value.push(item);
		}
		this.value.quickSort();
	}
}
 
function Stack(arr, lim){
	this.value = isType(lim, "Number")? new Array(lim): [];
	this.limit = lim||null;
	if(arr) this.value.push(arr);
	 
	this.peek = function(){//returns the top value
		return this.value.last();
	}
	 
	this.ground = function(){//returns the bottom value
		return this.value[0];
	}
	 
	this.push = function(item){
		if(this.isFull()) throw new Error("Stack overflow !");
		isType(item, "array")? this.value.append(item): this.value.push(item);
	}
	 
	this.pop = function(){
		if(this.isEmpty()) throw new Error("Stack underflow !"); 
		var it = this.peek();
		this.value.pop(item);
		return it;
	}
	 
	this.isEmpty = function(){
		return this.value.length===0;
	}
	 
	this.isFull = function(){
		return this.lim!=null? this.value.length>=this.limit: false;
	}
	 
	this.size = function(){
		return this.value.length;
	}
	 
	this.toString = function(){
		return "Stack("+this.value.toString()+")";
	}
	 
	this.equals = function(s){
		return this.toString()===s.toString();
	}
}
 
function StackArray(sz){
	this.value = new Array(sz);
	this.top = -1;
	 
	this.peek = function(){//returns the top value
		return this.value[this.top];
	}
	 
	this.push = function(item){
		if(this.isFull()) throw new Error("Stack overflow !");
		if(isType(item, "array")){
			for(i=0; i<item.length; i++) this.push(item[i]);
		}else{
			this.top++;
			this.value[this.top] = item;
		}
	}
	 
	this.pop = function(item){
		if(this.isEmpty()) throw new Error("Stack underflow !"); 
		if(isType(item, "array")){
			for(i=0; i<item.length; i++) this.pop(item[i]);
		}else{
			var el = this.peek();
			this.top--;
			return el;
		}
	}
	 
	this.isEmpty = function(){
		return this.top<=-1;
	}
	 
	this.isFull = function(){
		return this.top>=this.value.length;
	}
	 
	this.size = function(){
		return this.top+1;
	}
	 
	this.toString = function(){
		return "Stack("+this.value.toString()+")";
	}
	 
	this.equals = function(s){
		return this.toString()===s.toString();
	}
}
 
function StackList(arr){
	this.top = new Node();
	 
	this.peek = function(){//returns the top value
		return (this.isEmpty()||this.top==null)? null: this.top.next.payload;
	}
	 
	this.push = function(item){ 
		if(isType(item, "array")){
			for(i=0; i<item.length; i++) this.push(item[i]);
		}else{
			var n = new Node(item, this.top);
			this.top = n;
		}
		return this;
	}
	 
	this.pop = function(n){
		if(!this.isEmpty()) throw new Error("I can't pop from an empty stack list");
		if(n){
			for(i=0; i<n; i++) this.pop();
		}else{
			var el = this.top.payload;
			this.top = this.top.next;
			return el;
		}
	}
	 
	this.isEmpty = function(){
		return this.top==null;
	}
	 
	this.size = function(n){
		return this.top!=null? this.size(n+1): n;
	}
}
 
function Queue(arr, lim){
	this.value = isType(lim, "Number")? new Array(lim): [];
	this.limit = lim||null;
	if(arr) this.value.push(arr);
	 
	this.enqueue = function(item){
		if(this.isFull()) throw new Error("Queue overflow !");
		isType(item, "array")? this.value.preppend(item): this.value.unshift(item);
	}
	 
	this.dequeue = function(){
		if(this.isEmpty()) throw new Error("Queue underflow !"); 
		var it = this.head();
		this.value.pop();
		return it;
	}
	 
	this.head = function(){//returns the first value
		return this.value.last();
	}
	 
	this.tail = function(){//returns the last value
		return this.value[0];
	}
	 
	this.isEmpty = function(){
		return this.value.length===0;
	}
	 
	this.isFull = function(){
		return this.lim!=null? this.value.length>=this.limit: false;
	}
	 
	this.size = function(){
		return this.value.length;
	}
	 
	this.toString = function(){
		return "Queue(head="+this.head()+", tail="+this.tail()+", value="+this.value.toString()+")";
	}
	 
	this.equals = function(queue){
		return this.toString()===queue.toString();
	}
}
 
function QueueArray(arr){
	this.value = arr||[];
	this.front = -1;
	this.back = -1;
	 
	this.enqueue = function(item){
		if(isType(item, "array")){
			for(i=0; i<item.length; i++) this.enqueue(item[i]);
		}else{
			if(this.isFull()) throw new Error("The queue is full");
			if(this.isEmpty()){
				this.front++;
				this.back++;
				this.value[this.back] = item;
			}else{
				this.back = (this.back+1)%this.value.length;
				this.value[this.back] = item;
			}
		}
	}
	 
	this.dequeue = function(){
		var val;
		if(this.isEmpty()) throw new Error("I can't dequeue from an empty queue");
		if(this.front==this.back){
			val = this.value[this.front];
			this.front = this.back = -1;
		}else {
			val = this.value[this.front];
			this.front = (this.front+1)%this.value.length;
		}
		return val;
	}
 
	this.isEmpty = function(){
		return this.front==-1 && this.back==-1;
	}
	 
	this.isFull = function(){
		return this.back>(this.front+1)%this.value.length;
	}
	 
	this.size = function(){
		return this.value.length;
	}
	 
	this.toString = function(){
		return "Queue(front="+this.front+", back="+this.back+", value="+this.value.toString()+")";
	}
	 
	this.equals = function(queue){
		return this.toString()===queue.toString();
	}
}
 
function QueueList(){
	this.front = null;
	this.back = null;
	this.len = 0;
	 
	this.enqueue = function(item){
		if(isType(item, "array")){
			for(i=0; i<item.length; i++) this.enqueue(item[i]);
		}else{
			var n = this.back!=null? new Node(item, this.back, null): new Node(item);
			if(this.back.prev!=null) this.back.prev = n;
			this.back = n;
			this.len++;
		}
		return this;
	}
	 
	this.dequeue = function(){
		if(this.isEmpty()) throw new Error("I can't dequeue an empty queue list");
		this.front = this.front.prev;
		this.len--;
		return this.front;
	}
 
	this.isEmpty = function(){
		return len==0 || this.back==null;
	}
	 
	this.size = function(n){
		return this.len;
	}
	 
	this.toString = function(){
		var str = "", crt = this.front;
		while(crt!=null){
			str += "<-"+crt.payload;
			crt = crt.prev;
		}
		return str;
	}
	 
	this.equals = function(queue){
		return this.toString()===queue.toString();
	}
	 
	this.remove = function(pl){
		var crt = this.front;
		while(crt!=null){
			if(crt.payload!=null && (crt.payload==pl || crt.payload.equals(pl))) crt = null;
			crt = crt.next;
		}
	}
	 
	this.insertAt = function(i, pl){
		this.back.next = new Node(pl);
		if(i==0) this.front = new Node(pl);
		else if(i==len) this.back = new Node(pl);
		else if(i>len) this.enqueue(pl);
	}
}
 
function Astar(){//A* path finding alg
	//inspired from http://heyes-jones.com/pseudocode.php
	//node.f (score) = g (sum of all cost to get at this point)+h (heuristic: estimate of what it will take to get the goal)
	var nodeGoal, nodeStart, nodeCurrent, nodeSucessor, _h;
	var openList = [nodeStart], closedList = [];
	while(openList!=[]){
		var scores = [], minScore = openList[0].f;
		for(i in openList){
			scores.push(openList[i].f);
			minScore = Math.min(minScore, openList[i].f);
		}
		nodeCurrent = openList.filter(function(x){if(x.f==minScore) return x;})[0];
		openList = openList.filter(function(x){if(x.f!=minScore) return x;});
		if(nodeCurrent==nodeGoal){
			throw "Solution found !";
			break;
			/*generate each states nodeSucessor that can come after nodeCurrent
			for each(nodeSucessor of nodeCurrent){
				nodeSuccessor.f = nodeCurrent.f+h(nodeSuccessor, nodeCurrent);
				var l = lookfor(nodeSuccessor, openList);
				if(l!=-1){
					l=l[0];
					//if the current node is better then continue
					if(nodeCurrent.f<openList[l] || (lookfor(nodeSuccessor, closedList)!=-1 && nodeCurrent.f<openList[lookfor(nodeSuccessor, closedList)[0])) continue;
					rmChar(openList, nodeSuccessor);
					rmChar(closedList, nodeSuccessor);
					nodeSuccessor.parent = nodeCurrent;
					_h = h(nodeSuccessor, nodeGoal);
					openList.push(nodeSuccessor);
				}
				closedList.push(nodeCurrent);
			}*/
		}
	}
}
 
function IDAstar(){//Iterative Depending A* path finding alg (for 15-puzzle or huge structures)
	 
}
 
function readCoord(str, isInt){//read and convert coordinates of the form (a, b) and gives the a and b
	var c=str.slice(1, str.length-1).split(", ");
	return (isInt)? [parseInt(c[0]), parseInt(c[1])]: c;
}
 
function rmConsecDuplicates(arr){//remove the consecutive duplicated values in an array
	var out = [];
	var j=0;
	for(i=0; i<arr.length; i++){
		if(i==0 || arr[i]!=arr[i-1]) out[j++] = arr[i];
	}
	j=0;
	for(i=0; i<arr.length-1; i++){//double enforced check
		if(arr[i]!=arr[i+1]) out[j++] = arr[i];
	}
	return out;
}
 
function rmDuplicates(arr){//remove the duplicated values in an array
	var out = rmConsecDuplicates(arr), dupPos = -1, j = 0;
	 
	for(i=0; i<arr.length; i++){//pre-filtering
		if(i==0 || arr[i]!=arr[i-1] || (i>=1 && arr[i]!=arr[i-2]) || (i>=2 && arr[i]!=arr[i-3])) out[j++] = arr[i];
	}
	for(i=0; i<out.length; i++){
		for(j=0; j<out.length; j++){
			if(i!=j && out[i]==out[j]) out[j] = undefined;
		}
	}
	return out.remove(undefined);
}
 
function Shape(x, y, b, v){//interface object
	this.x = x||0;
	this.y = y||0;
	this.border = b||1;
	this.vel = v||new Vector(0, 0);
	this.norm = this.vel.getNormal();
	 
	this.update = function(){
		this.x += this.vel.x;
		this.y += this.vel.y;
		this.norm = this.vel.getNormal();
	}
	 
	this.stop = function(){
		this.vel = this.norm = new Vector(0, 0);
	}
	 
	this.toString = function(){
		return "Shape(x="+this.x+", y="+this.y+", border="+this.border+", velocity="+this.vel+")";
	}
	 
	this.offset = function(s){
		return s=='l'?  x-1-border: (s=='r'? x+1+border: (s=='u'? y-1-border: y+1+border));
	}
	 
	this.bounce = function(n){
		this.vel.reflect(n);
	}
	 
	this.copy = function(){
		return new Shape(this.x, this.y, this.b, this.vel);
	}
	 
	this.mult = function(k){
		this.x *= k;
		this.y *= k;
		return this;
	}
	 
	this.div = function(k){
		this.x /= k;
		this.y /= k;
		return this;
	}
	 
	this.add = function(v){
		this.x += v.x;
		this.y += v.y;
		return this;
	}
	 
	this.sub = function(v){
		this.x -= v.x;
		this.y -= v.y;
		return this;
	}
	 
	this.draw = function(){
		 
	}
	 
	this.getSpeed = function(){
		return Math.sqrt(Math.pow(this.vel.x, 2)+Math.pow(this.vel.y, 2));
	}
}
 
function Box(x, y, z, w, h, d, bsz, bclr, bgclr, brd){//an obvious 2D/3D box
	this.x = x||0;
	this.y = y||0;
	this.z = z||0;
	this.width = w||10;
	this.height = h||10;
	this.deepth = d||.1;
	this.borderSize = bsz||1;
	this.borderColor = bclr||"#000";
	this.borderRadius = brd||0;
	this.backgroundColor = bgclr||"#fff";
	this.ratio = (this.height/this.width).toNDigits(4);
	this.ratio3d = [this.ratio, this.height/non0(this.deepth), this.width/non0(this.deepth)].mean(4);
	this.draw = function(){
		 
	}
	this.erase = function(){
		 
	}
	this.rot = function(alpha, beta, theta){//rotation
		 
	}
	this.translate = function(px, py, pz){
		 
	}
	this.toString = function(){
		with(this){
			return "Box(x="+x+", y="+y+", z="+z+", width="+width+", height="+height+", deepth="+deepth+", borderSize="+borderSize+", borderColor="+borderColor+", borderRadius="+borderRadius+", backgroundColor="+backgroundColor+")";
		}
	}
	return this;
}
 
AABB.inheritsFrom(Shape); //shorter than AABB.prototype = new Shape();AABB.prototype.constructor = AABB;
function AABB(px, py, pw, ph, b, v){//Axe Aligned Bounding Box
	this.x = px||0;
	this.y = py||this.y;
	this.w = pw||10;
	this.h = ph||this.w;
	this.border = b||1;
	this.vel = v||new Vector(0, 0);
	this.ratio = this.h/this.w;
	this.norm = this.vel.getNormal();
	 
	this.getPoints = function(){
		return [new Pt(this.x, this.y), new Pt(this.x+this.w, this.y), new Pt(this.x+this.w, this.y+this.h), new Pt(this.x, this.y+this.h)];
	}
	 
	this.equals = function(a){
		return this.x==a.x && this.y==a.y && this.w==a.w && this.h==a.h && this.border==a.border && this.vel.equals(a.vel);
	}
	 
	this.toString = function(){
		return "AABB(x="+this.x+", y="+this.y+", width="+this.w+", height="+this.h+", velocity="+this.vel.toString()+", border="+this.border+")";
	}
	 
	this.hit = function(obj, side){
		return s=='l'?  obj.offset('l')<=this.offset('r'): (s=='r'? obj.offset('r')>=this.offset('l'): (s=='u'? obj.offset('u')<=this.offset('d'): (s=='d'? obj.offset('d')>=this.offset('u'): (this.hit(obj, 'l')||this.hit(obj, 'r')||this.hit(obj, 'u')||this.hit(obj, 'd')))));
	}
	 
	this.copy = function(){
		return new AABB(this.x, this.y, this.w, this.h, this.b, this.vel);
	}
	 
	this.concat = function(a){
		this.w = a.x-this.x-this.w;//or w+a.x+a.w
		this.h = a.y-this.y-this.h;//or h+a.y+a.h
	}
	 
	this.deconcat = function(a){
		this.w = (a.x-this.x)/2;//(a.x+a.w)/2
		this.h = (a.y-this.y)/2;//(a.y+a.h)/2
	}
	 
	this.draw = function(){
		 
	}
	 
	this.getPerimeter = function(){
		return 2*this.w+2*this.h;
	}
	 
	this.getArea = function(){
		return this.w*this.h;
	}
	 
	this.getDiag = function(){
		return Math.sqrt(Math.pow(this.w, 2)+Math.pow(this.h, 2));
	}
}
 
Circ.inheritsFrom(Shape);
function Circ(px, py, pr, b, v){//Circle
	this.x = px||0;
	this.y = py||0;
	this.r = pr||10;
	this.border = b||1;
	this.vel = v||new Vector(0, 0);
	this.norm = this.vel.getNormal();
	 
	this.offset = function(s){
		return s=='l'?  this.x-this.r: (s=='r'? this.x+this.r: (s=='u'? this.y-this.r: this.y+this.r));
	}
	 
	this.equals = function(a){
		return this.x==a.x && this.y==a.y && this.r==a.r && this.border==a.border && this.vel.equals(a.vel);
	}
	 
	this.toString = function(){
		return "Circ(x="+this.x+", y="+this.y+", radius="+this.r+", velocity="+this.vel.toString()+")";
	}
	 
	this.hit = function(obj, s){//more like a getHit(obj) but for also circle/circle situations
		if(obj.hit(this, '')){
			this.bounce(obj.norm);
			this.update();
			return true;
		}
		return false;
	}
	 
	this.draw = function(){
		 
	}
	 
	this.getCircumference = function(){
		return 2*this.r*Math.PI;
	}
}
 
Pt.inheritsFrom(Shape);
function Pt(px, py){//Point
	this.prototype = Shape.prototype;
	this.x = px||0;
	this.y = py||0;
	this.vel = new Vector(0, 0);
	 
	this.equals = function(p){
		return this.x==p.x && this.y==p.y;
	}
	 
	this.toString = function(){
		return "Pt(x="+this.x+", y="+this.y+")";
	}
}
 
Line.inheritsFrom(Shape);
function Line(a, b){
	this.s = a;
	this.e = b;
	 
	this.equals = function(l){
		return this.s==l.s && this.e==l.e;
	}
	 
	this.toString = function(){
		return "Line(start="+this.s.toString()+", end="+e.toString()+")";
	}
}
 
Vector.inheritsFrom(Shape);
function Vector(px, py){
	this.prototype = Shape.prototype;
	this.x = px||0;
	this.y = py||0;
	 
	this.toString = function(){
		return "Vector(x="+this.x+", y="+this.y+")";
	}
	 
	this.equals = function(v){
		return this.x==v.x && this.y==v.y;
	}
	 
	this.copy = function(){
		return new Vector(this.x, this.y);
	}
	 
	this.normalise = function(){
		var v = Math.sqrt(Math.pow(this.x, 2)+Math.pow(this.y, 2));
		this.x /= v;
		this.y /= v;
	}
	 
	this.getNormal = function(){
		return new Vector(this.x/Math.sqrt(Math.pow(this.x, 2)+Math.pow(this.y, 2)), this.y/Math.sqrt(Math.pow(this.x, 2)+Math.pow(this.y, 2)));
	}
	 
	this.zero = function(){
		this.x = this.y = 0;
		return this;
	}
	 
	this.neg = function(){
		this.x = -x;
		this.y = -y;
		return this;
	}
	 
	this.dot = function(v){
		return this.x*v.x+this.y*v.y;
	}
	 
	this.cross = function(v){
		return this.x*v.y-this.y*v.x;
	}
	 
	this.lenSq = function(){
		return Math.pow(this.x, 2)+Math.pow(this.y, 2);
	}
	 
	this.length = function(){
		return Math.sqrt(this.lenSq());
	}
	 
	this.reflect = function(normal){//.. on a normal
		var n = this.normal.copy();
		n.mult(2*this.dot(this.normal));
		this.sub(n);
		return this;
	}
	 
	this.angle = function(v){
		return Math.acos((this.x*v.x+this.y*v.y)/(this.length()*v.length()))
	}
}
Polygon.inheritsFrom(Shape);
function Polygon(pts, b, v){
	this.points = pts;
	this.border = b||1;
	this.vel = v||new Vector(0, 0);
	this.norm = this.vel.getNormal();
	 
	this.equals = function(a){
		var eq = true;
		for(p in this.points){
			if(this.points.hasOwnProperty(p) && a.points.hasOwnProperty(p)) eq = eq && this.points[p].equals(a.points[p]);
		}
		return eq && this.border==a.border && this.vel.equals(a.vel);
	}
	 
	this.toString = function(){
		var ptStr = "[";
		for(p in this.points){
			if(this.points.hasOwnProperty(p)) ptStr += this.points[p].toString()+", ";
		}
		ptStr += "]";
		return "Polygon(points="+ptStr+", velocity="+this.vel.toString()+", border="+this.border+")";
	}
	 
	this.hit = function(obj, side){
		return s=='l'?  obj.offset('l')<=this.offset('r'): (s=='r'? obj.offset('r')>=this.offset('l'): (s=='u'? obj.offset('u')<=this.offset('d'): (s=='d'? obj.offset('d')>=this.offset('u'): (this.hit(obj, 'l')||this.hit(obj, 'r')||this.hit(obj, 'u')||this.hit(obj, 'd')))));
	}
	 
	this.copy = function(){
		return new Polygon(this.points, this.b, this.vel);
	}
	 
	this.draw = function(){
		 
	}
}
 
function simpleTable(caption, rows, id, style, split){//a basic html table
	var tab=(caption)? "<table id="+id+" style="+style+" cellspacing=0 cellpadding=2><caption>"+caption+"</caption>": "<table>";
	for(i=0; i<rows.length; i++){
		tab+="<tr>";
		if(split){
			for(j=0; j<rows[i].length; j++) tab+="<td>"+rows[i][j]+"</td>";
		}else  tab+="<td>"+rows[i]+"</td>";
		tab+="</tr>";
	}
	tab += "</table><style>table{background: #000;}table, td {border: 1px solid #000; color: #000; background: #fff;} tr:nth-child(even) td{background: #ddd;} tr td:hover{background: #bbb;}</style>";
	return tab;
}
 
function rowTable(caption, headerRows, rows, id, split, style){
	var tab=(caption)? "<table id="+id+" style="+style+" cellspacing=0 cellpadding=2><caption>"+caption+"</caption>": "<table>";
	//var rowspan=(headerRows.length<=rows.length)? rows.length/headerRows.length: headerRows.length/rows.length;
	//console.log(rowspan);
	for(i=0; i<rows.length; i++){
		tab += (headerRows)? "<tr><th>"+headerRows[i]+"</th>": "<tr>";
		if(split){
			for(j=0; j<rows[i].length; j++){
				tab +="<td>"+rows[i][j]+"</td>";
			}
		}else tab +="<td>"+rows[i]+"</td>";
		tab += "</tr>";
	}
	tab += "</table><style>table{background: #000;}table, td, th {border: 1px solid #000; color: #000; background: #fff;} tr:nth-child(even) td, tr:nth-child(even) th {background: #ddd;} tr td:hover, tr th:hover{background: #bbb;}</style>";
	return tab;
}
 
function colTable(caption, headerCols, cols, id, split, style){
	var tab=(caption)? "<table id="+id+" style="+style+" cellspacing=0 cellpadding=2><caption>"+caption+"</caption>": "<table>";
	//var colspan=(headerCols.length<=cols.length)? cols.length/headerCols.length: headerCols.length/cols.length;
	//console.log(colspan);
	if(headerCols){
		tab += "<tr>";
		for(i=0; i<headerCols.length; i++){
			tab += "<th>"+headerCols[i]+"</th>";
		}
		tab += "</tr>";
	}
	for(i=0; i<cols.length; i++){
		tab+="<tr>";
		if(split){
			for(j=0; j<cols[i].length; j++){
				tab += "<td>"+cols[j][i]+"</td>";
			}
		}else tab += "<td>"+cols[i]+"</td>";
		tab+="</tr>";
	}
	tab += "</table><style>table{background: #000;}table, td, th {border: 1px solid #000; color: #000; background: #fff;} tr:nth-child(even) td{background: #ddd;} tr td:hover{background: #bbb;}";
	return tab;
}
 
function complexTable(caption, headerRows, rows, headerCols, id, split, style){//mix of the column and row tables
	var tab=(caption)? "<table id="+id+" style="+style+" cellspacing=0 cellpadding=2><caption>"+caption+"</caption>": "<table><tr><td></td>";
	for(i=0; i<headerCols.length; i++) tab += "<th>"+headerCols[i]+"</th>";
	tab+="</tr>";
	for(i=0; i<rows.length; i++){
		tab += (headerRows)? "<tr><th>"+headerRows[i]+"</th>": "<tr>";
		if(split){
			for(j=0; j<rows[i].length; j++){
				tab +="<td>"+rows[i][j]+"</td>";
			}
		}else tab += "<td>"+rows[i]+"</td></tr>";
		tab += "</tr>";
	}
	tab += "</table><style>table{background: #000;}table, td, th {border: 1px solid #000; color: #000; background: #fff;} tr:nth-child(even) td{background: #ddd;} tr td:hover{background: #bbb;}</style>";
	return tab;
}
 
function colourTable(caption, cols, clrs, id, split, style){//a table with colored empty cells
	var tab=(caption)? "<table id="+id+" style="+style+" cellspacing=0 cellpadding=2><caption>"+caption+"</caption>": "<table>";
	if(cols){
		tab += "<tr>";
		for(i=0; i<cols.length; i++) tab += "<th>"+cols[i]+"</th>";
		tab += "</tr>";
	}
	for(i=0; i<clrs.length; i++){
		tab+="<tr>";
		if(split){
			for(j=0; j<clrs[i].length; j++) tab += isValid(clrs[i][j], "color")? "<td style='background:"+clrs[i][j]+";'><br /></td>": "<td>"+clrs[i][j]+"</td>";
		}else tab += "<td style='background:"+clrs[i]+";'><br /></td>";
		tab+="</tr>";
	}
	tab += "</table><style>table{background: #000;}table, td, th {border: 1px solid #000; color: #000; background: #fff;} tr:nth-child(even) td{background: #ddd;} tr td:hover{background: #bbb;}</style>";
	return tab;
}
 
function database(name, headR, cells, headC, admin, ver){//local database
	this.name = name||"Database";
	this.headerRow = (isNon(headR))? range(0, 1, 100): headR;
	this.content = (isNon(cells))? fillIn([], "..."): cells;
	this.headerCol = headC||["Index", "Value"];
	this.admin = admin||"Anonymous";
	this.version = ver||1.0;
	this.val = new Array(this.headRow.length);
	for(i=0; i<this.val.length; i++) this.val[i] = new Array(headC.length);
	for(i=0; i<this.headerCol.length; i++) this.val[0][i] = this.headerCol[i];
	for(i=0; i<this.content.length; i++){
		this.val[i][0] = (this.headerRow)? this.headerRow[i]: i;
		for(j=0; j<this.content[i].length; j++){
			this.val[i][j+1] = this.content[i][j];
		}
	}
	this.setStorage = function(){
		localStorage[this.name] = JSON.stringify(this.val);
	}
	this.html = complexTable(this.name, this.headerRow, this.content, this.headerCol, name);
	this.css = "<style>*{font-family: Consolas, Segoe UI, Tahoma;}table{background: #000;}table, td, th {border: 1px solid #000; color: #000; background: #fff;} tr:nth-child(even) td, tr:nth-child(even) th{background: #eee;}</style>";
	this.disp = function(elmId){
		var place = (elmId)? "#"+elmId: "body";
		$e(place).write(this.html+this.css,true);
		this.setStorage();
	}
	this.update = function(){
		if(localStorage[this.name]) this.val = JSON.parse(localStorage[this.name]);
		else this.setStorage();
	}
	this.searchAndRemove = function(vals){//vals=range|..
		for(n=0; n<vals.length; n++){
			for(i=0; i<this.val.length; i++){
				for(j=0; j<this.val.length; j++){
					if(this.val[i][j]==vals[n]) this.val[i][j] = null;
				}
			}
		}
	}
	this.remove = function(xs, ys){//vals=range|..
		for(i=0; i<xs.length; i++){
			for(j=0; j<ys.length; j++){
				this.val[ys[j]][xs[i]] = null;
			}
		}
	}
}
 
function char2hex(c){//character to hexadecimal
	return conv(c.charCodeAt(0), 10, 16);
}
 
function hex2char(h){//hexadecimal to character
	return String.fromCharCode(conv(h, 16));
}
 
function char2bin(c){//character to binary
	return conv(c.charCodeAt(0), 10, 2);
}
 
function bin2char(h){//binary to character
	return String.fromCharCode(conv(h, 2));
}
 
function trans(character, n){//caesar crypting
	var code = character.charCodeAt(0);
	return String.fromCharCode(code+n);
}
 
 
function encrypt(txt, key){
	if(!key){
		var len = txt.length, extra = 0;
		var mid = Math.floor(len/2);
		 
		mid = (len%2==0)? txt.charCodeAt(mid): (txt.charCodeAt(txt[mid-1])+txt.charCodeAt(txt[mid]))/2;
		if(mid >= 97 && mid <= 122) extra = 2;
		else if(mid >= 65 && mid <= 90) extra = 1;
		else if(mid-floor(mid/2)*2==0) extra = -1;
		else extra = 2;
		 
		key = Math.round((Math.pow(2, 7)+sumOfString(txt)-48)/prodOfString(txt))+extra;
	}
	var res="";
	for(i=0; i<txt.length; i++) res += trans(txt[i], key);
	len=mid=extra=undefined;
	 
	return res;
}
 
function decrypt(txt, key){
	var res="";
	if(key){
		for(i=1; i<=txt.length; i++) res += trans(txt[i-1], key);
	}else{
		res=new Array(131073);//2*Math.pow(2, 16)+1
		for(i=-65536; i<65537; i++){//
			res[i+65536] = "";
			for(j=0; j<txt.length; j++){
				res[i+65536] += trans(txt[j], i%65537);
			}
		}
	}
	console.log(console.table(res));
	return (!key)? complexTable("Decryption result for <i>"+txt+"</i>", range(-65536, 1, 65536), res, ["Key", "Result"], "decrypted_"+txt, false, Essence.css): txt+" => "+res;
	//simpleTable("Decryption result for <i>"+txt+"</i>", , res, "decrypt_"+txt, Essence.css);
}
 
function abcEncode(txt){//encode the alphabet (regardless of the case) to hex that doesn't take into account the numbers
	var code = new Array(txt.length);
	if(isType(txt, "string") || isType(txt, "array")){
		for(i in txt){
			switch(txt[i].toLowerCase()){
				case " ":code[i] = "00";break;
				case "a":code[i] = "01";break;
				case "b":code[i] = "02";break;
				case "c":code[i] = "03";break;
				case "d":code[i] = "04";break;
				case "e":code[i] = "05";break;
				case "f":code[i] = "06";break;
				case "g":code[i] = "07";break;
				case "h":code[i] = "08";break;
				case "i":code[i] = "09";break;
				case "j":code[i] = 0xA;break;
				case "k":code[i] = 0xB;break;
				case "l":code[i] = 0xC;break;
				case "m":code[i] = 0xD;break;
				case "n":code[i] = 0xE;break;
				case "o":code[i] = 0xF;break;
				case "p":code[i] = 0x10;break;
				case "q":code[i] = 0x11;break;
				case "r":code[i] = 0x12;break;
				case "s":code[i] = 0x13;break;
				case "t":code[i] = 0x14;break;
				case "u":code[i] = 0x15;break;
				case "v":code[i] = 0x16;break;
				case "w":code[i] = 0x17;break;
				case "x":code[i] = 0x18;break;
				case "y":code[i] = 0x19;break;
				case "z":code[i] = 0x1A;break;
				case ".":code[i] = 0x1B;break;
				case ",":code[i] = 0x1C;break;
				case "!":code[i] = 0x1D;break;
				case "?":code[i] = 0x1E;break;
				case "(":code[i] = 0x1F;break;
				case ")":code[i] = 0x20;break;
				case ":":code[i] = 0x21;break;
				case ";":code[i] = 0x22;break;
				case "@":code[i] = 0x23;break;
				case "~":code[i] = 0x24;break;
				case "\'":code[i] = 0x25;break;
				case "\"":code[i] = 0x26;break;
				case "#":code[i] = 0x27;break;
				case "{":code[i] = 0x28;break;
				case "}":code[i] = 0x29;break;
				case "-":code[i] = 0x2A;break;
				case "\\":code[i] = 0x2B;break;
				case "/":code[i] = 0x2C;break;
				case "£":code[i] = 0x2D;break;
				case "$":code[i] = 0x2E;break;
				case "€":code[i] = 0x2F;break;
				case "+":code[i] = 0x30;break;
				case "*":code[i] = 0x31;break;
				case "%":code[i] = 0x32;break;
				case "^":code[i] = 0x33;break;
				case "°":code[i] = 0x34;break;
				default: code[i] = "x";break;
			}
		}
		return isType(txt, "string")? code.join(""): code;
	}return Essence.say("The parameter of abcEncode must be a string or an array.", "err");
}
 
function abcDecode(txt){//encode the alphabet (regardless of the case) to hex that doesn't take into account the numbers
	var code = new Array(txt.length);
	if(isType(txt, "string") || isType(txt, "array")){
		for(i=0; i<txt.length; i+=2){
			switch(txt.substr(i, 2)){
				case "00":code[i] = " ";break;
				case "01":code[i] = "a";break;
				case "02":code[i] = "b";break;
				case "03":code[i] = "c";break;
				case "04":code[i] = "d";break;
				case "05":code[i] = "e";break;
				case "06":code[i] = "f";break;
				case "07":code[i] = "g";break;
				case "08":code[i] = "h";break;
				case "09":code[i] = "i";break;
				case "10":code[i] = "j";break;
				case "11":code[i] = "k";break;
				case "12":code[i] = "l";break;
				case "13":code[i] = "m";break;
				case "14":code[i] = "n";break;
				case "15":code[i] = "o";break;
				case "16":code[i] = "p";break;
				case "17":code[i] = "q";break;
				case "18":code[i] = "r";break;
				case "19":code[i] = "s";break;
				case "20":code[i] = "t";break;
				case "21":code[i] = "u";break;
				case "22":code[i] = "v";break;
				case "23":code[i] = "w";break;
				case "24":code[i] = "x";break;
				case "25":code[i] = "y";break;
				case "26":code[i] = "z";break;
				case "27":code[i] = ".";break;
				case "28":code[i] = ",";break;
				case "29":code[i] = "!";break;
				case "30":code[i] = "?";break;
				case "31":code[i] = "(";break;
				case "32":code[i] = ")";break;
				case "33":code[i] = ":";break;
				case "34":code[i] = ";";break;
				case "35":code[i] = "@";break;
				case "36":code[i] = "~";break;
				case "37":code[i] = "\'";break;
				case "38":code[i] = "\"";break;
				case "39":code[i] = "#";break;
				case "40":code[i] = "{";break;
				case "41":code[i] = "}";break;
				case "42":code[i] = "-";break;
				case "43":code[i] = "\\";break;
				case "44":code[i] = "/";break;
				case "45":code[i] = "£";break;
				case "46":code[i] = "$";break;
				case "47":code[i] = "€";break;
				case "48":code[i] = "+";break;
				case "49":code[i] = "*";break;
				case "50":code[i] = "%";break;
				case "51":code[i] = "^";break;
				case "52":code[i] = "°";break;
				default: code[i] = 0;break;
			}
		}
		return isType(txt, "string")? code.join(""): code;
	}return Essence.say("The parameter of abcDecode must be a string or an array.", "err");
}
 
var nav = navigator.appName.substring(0,3), ver = navigator.appVersion.substring(0,1)
function addFav(url, title, elmId){//url = http://www...." title = "My Website"
	var place = (elmId)? "#"+elmId: "body";
	if(nav == "Mic" && ver >= 4) $e(place).write('<a href="#" onClick="window.external.AddFavorite('+url+', '+title+');return(false);">Bookmark this webpage</a><br />', true);
	else $e(place).write('Press CTRL+D to add this webpage to your bookmarks!', true);
}
 
function checkBrowser(){
	this.ver=navigator.appVersion;
	this.dom=document.getElementById?1:0
	this.ie5=(this.ver.indexOf("MSIE 5")>-1 && this.dom)?1:0;
	this.ie4=(document.all && !this.dom)?1:0;
	this.ns5=(this.dom && parseInt(this.ver) >= 5) ?1:0;
	this.ns4=(document.layers && !this.dom)?1:0;
	this.bw=(this.ie5 || this.ie4 || this.ns4 || this.ns5);
	return this;
}
 
var BrowserDetect = {
	init: function(){
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function(data){
		for(var i=0;i<data.length;i++){
			var dataString = data[i].string, dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if(dataString){
				if(dataString.indexOf(data[i].subString) != -1) return data[i].identity;
			}else if(dataProp) return data[i].identity;
		}
	},
	searchVersion: function(dataString){
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
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
		}, {//for newer Netscapes (6+)
			string: navigator.userAgent, subString: "Netscape", identity: "Netscape"
		}, {
			string: navigator.userAgent, subString: "MSIE", identity: "Explorer", versionSearch: "MSIE"
		}, {
			string: navigator.userAgent, subString: "Gecko", identity: "Mozilla", versionSearch: "rv"
		}, {//for older Netscapes (4-)
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
BrowserDetect.init();
 
var pos=0;
function writemsg(msg, where){//type a message
	var maxl=msg.length+10;
	while(pos<maxl){
		txt=msg.substring(pos,0);
		where.write(txt);
		pos++;
	}
}
 
function dateTime(id){//Display the date and time at #id
	var date = new Date();
	var year = date.getFullYear(), month = date.getMonth();
	var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
	var d = date.getDate(), day = date.getDay(), h = date.getHours();
	var days = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saterday');
	var tt = "", GMT = date.getTimezoneOffset();
	if(h<10) h = "0"+h;
	m = date.getMinutes();
	if(h>12){
		h -= 12;
		tt = "PM";
	} else { tt = "AM"; }
	if(m<10) m = "0"+m;
	s = date.getSeconds();
	if(s<10) s = "0"+s;
	GMT = (GMT>=0)? "GMT+"+GMT: "GMT-"+GMT;
	var result = 'We\'re '+days[day]+' '+d+' '+months[month]+' '+year+' and it\'s '+h+':'+m+':'+s+' '+tt+' '+GMT;
	$e("#"+id).write(result, true);
	setTimeout('dateTime("'+id+'");',1000); 
	return true;
}
 
function viewHide(id){//for 2-ways view/hide of an element with a particular id
	if($e("#"+id).css("visibility")=="hidden"){
		$e("#"+id).setCSS("visibility", "visible");
		$e("#btn_"+id).write("Hide", true);
	}else{
		$e("#"+id).setCSS("visibility", "hidden");
		$e('#btn_'+id).write("View", true);
	}
	return true;
}
 
function process(name, auth, summup, ctt){
	this.name = name;
	this.author = auth || "Anonymous";
	this.bitsize = 0;//size in binary unit
	this.description = summup || "";
	this.content = ctt || "";
	this.sig = this.name[0]+this.name[this.name.length-1]+prodOfString(this.name)+this.author.slice(0, 2)+"-"+(getType(this.content))[0];
	//rights/privileges ?!
	this.update = function(){
		if(this.author!=auth || this.author=="Anonymous" || isNon(this.author)) this.sig = this.name[0]+this.name[this.name.length-1]+"-"+prodOfString(this.name)+this.author.slice(0, 2)+"-"+getType(this.content)[0];//h4ck
		else this.sig = this.name[0]+this.name[this.name.length-1]+prodOfString(this.name)+this.author.slice(0, 2)+"-"+(getType(this.content))[0];
		if(this.sig[this.sig.length-1]=="N") this.bitsize = 8*sumOfString(conv(this.content, 10, 2));
		else if(this.sig[this.sig.length-1]=="B") this.bitsize = 8;
		else if(this.sig[this.sig.length-1]=="A") this.bitsize = (is2dArray(this.content))? 8*numElm(this.content): 8*this.content.length;
		else if(this.sig[this.sig.length-1]=="O") this.bitsize = 0;
		else if(this.sig[this.sig.length-1]=="S") this.bitsize = 8*this.content.length;
		else this.bitsize = null;
	}
	this.update();
	this.askPermission = function(serv){
		this.update();
		serv.add(this);
	}
	this.destroy = function(){
		Essence.say("The process named "+this.name+" (created by "+this.author+") has been destroyed !", "info");
		//this = null;
	}
	Essence.addProcess(this);
}
 
function server(name, admin, type, ver, mxsz){//content<->> database issues to fix
	this.name = name;
	this.admin = admin;
	this.version = ver||1.0;
	this.maxsize = mxsz||Math.pow(2, 14);
	this.nb_slots = Math.pow(2, 6);
	this.slots = mkArray(this.nb_slots, 1, "empty");
	this.type = type || "data";
	this.type = this.type.toLowerCase();
	if(this.type=="data") this.data = new database(this.name, range(1, 1, this.maxsize), this.slots, ["Index", "Value"], this.admin, this.version);
	else if(this.type=="process") this.data = new database(this.name, range(1, 1, this.maxsize), this.slots, ["N°", "Name", "Author", "Description", "Content", "Bit size"], this.admin, this.version);
	else if(this.type=="storage") this.data = new database(this.name, range(1, 1, this.maxsize), this.slots, ["Key", "Value"], this.admin, this.version);
	else if(this.type=="authentification") this.data = new database(this.name, range(1, 1, this.maxsize), this.slots, ["Username", "Password", "Email", "Hash"], this.admin, this.version);
	else if(this.type=="register" || this.type=="details") this.data = new database(this.name, range(1, 1, this.maxsize), this.slots, ["First name", "Last Name", "Title", "Email", "Phone", "Sex", "City/Country", "Birthday", "Websites", "Job", "Quote"], this.admin, this.version);
	else if(this.type=="location") this.data = new database(this.name, range(1, 1, this.maxsize), this.slots, ["Name", "Longitude", "Latitude"], this.admin, this.version);
	 
	this.addProcess = function(pcs){
		if(pcs.sig[2]=="-" || pcs.bitsize>this.maxsize/this.nb_slots) console.log("[Server:"+name+"] The process named "+pcs.name+" has been rejected");
		else{
			var pos;
			for(i=0; i<this.nb_slots; i++){
				if(isNon(this.slots[i])){
					this.slots[i] = [pcs.name, pcs.author, pcs.description, pcs.content, pcs.bitsize];
					pos=i;
					i=this.nb_slots;break;
				}
			}
			if(this.slots[pos]!=[pcs.name, pcs.author, pcs.description, pcs.content, pcs.bitsize] && this.nb_slots<this.maxsize){//check if the process was added to the server
				this.nb_slots += this.maxsize/this.nb_slots;//extend by one slot
				this.slots[this.nb_slots] = [pcs.name, pcs.author, pcs.description, pcs.content, pcs.bitsize];
			}
		}
	}
	this.add = function(data){
		var pos;
		for(i=0; i<this.nb_slots; i++){
			if(isNon(this.slots[i])){
				this.slots[i] = JSON.stringify(this);
				pos=i;
				i=this.nb_slots;break;
			}
		}
		if(this.slots[pos]!=data && this.nb_slots<this.maxsize){//check if the process was added to the server
			this.nb_slots += this.maxsize/this.nb_slots;//extend by one slot
			this.slots[this.nb_slots] = JSON.stringify(this);
		}
	}
	this.rm = function(n){
		this.slots[n] = null;
	}
	this.store = function(){
		localStorage["server_"+this.name] = JSON.stringify(this);
	}
	this.update = function(){
		if(localStorage["server_"+this.name]){
			this.name = localStorage["server_"+this.name].name;
			this.admin = localStorage["server_"+this.name].admin;
			this.version = localStorage["server_"+this.name].version;
			this.maxsize = localStorage["server_"+this.name].maxsize;
			this.nb_slots = localStorage["server_"+this.name].nb_slots;
			this.slots = JSON.parse(localStorage["server_"+this.name].slots);
			this.data = localStorage["server_"+this.name].data;
		}else this.store();
	}
	this.fire = function(pcs){
		for(i in this.slots){
			if(this.slots[i][0]==pcs.name && this.slots[i][1]==pcs.author) this.rm(i);
		}
	}
	this.reset = function(){
		for(i in this.slots) this.rm(i);
	}
	Essence.addServer(this);
}
 
var img, src, size = 0, delay = 100, nb = -1, t1 = 0, t2 = 0, maxDelay = 2e4;//Image to load, image size, 20k ms
 
function setupConnexionEval(imgsrc, sz, dl, dm){
	window.defaultStatus = "Evalue the connexion and see the downloading speed";
	src = imgsrc||"img/random2000x2000.jpg"||"img\\random2000x2000.jpg";
	size = sz||7723*8;//7.723kB -> kb
	delay = dl||100;
	nb = -1;
	t1 = 0; t2 = 0;
	maxDelay = dm||2e4;
}
 
function CECheck(slt){//launch the verification of the connexion
	img=new Image();
	t1=new Date().getTime();
	img.src=src+"?t 1="+t1;
	nb=0;
	$e(slt).write("Verification in progress...");
	setTimeout("CETimer("+slt+")",delay);
}
 
function CETimer(slt){//Connexion Evaluation Timer
	nb++;
	$e(slt).yxy("Verification in progress...");
	if(nb*delay>=maxDelay) $e(slt).write(evalDownload(0));//end of the maximimun delay
	else{
		if(img.complete){
			t2=new Date().getTime();
			$e(slt).write(evalDownload(size/(t2-t1)));
			console.log("["+Date()+"] Connexion: "+toNDigits(size/(t2-t1), 3)+" kbps");
		}else setTimeout("CETimer("+slt+")",delay);
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
function evalDownload(kbps){
	nb=-1;
	res="";
	if(kbps==0) res="No connexion";
	else if(kbps>0 && kbps<=56) res="Low debit";
	else if(kbps>56 && kbps<=8e3) res="ADSL debit";
	else if(kbps>8e3 && kbps<=2e4) res="ADSL2+";
	else if(kbps>2e4 && kbps<=5e4) res="wire";
	else if(kbps>5e4 && kbps<=1e5) res="optical fibre";
	else res="Ethernet";
	return res+" (" + toNDigits(kbps, 3) +" kbps)";
}
 
function evalUpload(kbps){
	nb=-1;
	res="";
	if(kbps==0) res="No connexion";
	else if(kbps>0 && kbps<=56) res="Low debit";
	else if(kbps>56 && kbps<=1e3) res="ADSL+";
	else if(kbps>1e3 && kbps<=5e3) res="wire";
	else res="Ethernet";
	return res+" (" + toNDigits(kbps, 3) +" kbps)";
}
 
function evalPing(ms){
	nb=-1;
	res="";
	if(ms>0 && ms<=30) res="Excellent";
	else if(ms>30 && ms<=60) res="Really good";
	else if(ms>60 && ms<=100) res="Good";
	else if(ms>100 && ms<=200) res="Okay";
	else if(ms>200 && ms<=300) res="Poor";
	else if(ms>300 && ms<=400) res="Bad";
	else res="Really bad";
	return res+" (" + ping +" ms)";
}
 
//from somewhere, can't remember where
base64 = {};
base64.PADCHAR = '=';
base64.ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
base64.getbyte64 = function(s, i){
	// This is oddly fast, except on Chrome/V8.
	//  Minimal or no improvement in performance by using an
	//   object with properties mapping chars to value (eg. 'A': 0)
	var i = base64.ALPHA.indexOf(s.charAt(i));
	if(i == -1) throw "Cannot decode base64";
	return i;
};
 
base64.decode = function(s){
	// convert to string
	s += "";
	var getbyte64 = base64.getbyte64;
	var pads, i, b10;
	var imax = s.length;
	if(imax == 0) return s;
	if(imax%4 != 0) throw "Cannot decode base64";
 
	pads = 0;
	if(s.charAt(imax-1) == base64.PADCHAR){
		pads = 1;
		if(s.charAt(imax-2) == base64.PADCHAR) pads = 2;
		// either way, we want to ignore this last block
		imax -= 4;
	}
 
	var x = [];
	for(i = 0; i < imax; i += 4){
		b10 = (getbyte64(s,i) << 18) | (getbyte64(s,i+1) << 12) | (getbyte64(s,i+2) << 6) | getbyte64(s,i+3);
		x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff, b10 & 0xff));
	}
 
	switch(pads){
		case 1:
			b10 = (getbyte64(s,i) << 18) | (getbyte64(s,i+1) << 12) | (getbyte64(s,i+2) << 6);
			x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff));
			break;
		case 2:
			b10 = (getbyte64(s,i) << 18) | (getbyte64(s,i+1) << 12);
			x.push(String.fromCharCode(b10 >> 16));
			break;
	}
	return x.join('');
};
 
base64.getbyte = function(s,i){
	var x = s.charCodeAt(i);
	if(x > 255) throw "INVALID_CHARACTER_ERR: DOM Exception 5";
	return x;
};
 
base64.encode = function(s){
	if (arguments.length != 1) throw "SyntaxError: Not enough arguments";
	var padchar = base64.PADCHAR;
	var alpha   = base64.ALPHA;
	var getbyte = base64.getbyte;
 
	var i, b10, x = [];
 
   // convert to string
	s += "";
 
	var imax = s.length - s.length % 3;
 
	if(s.length == 0) return s;
	for(i = 0; i < imax; i += 3){
		b10 = (getbyte(s,i) << 16) || (getbyte(s,i+1) << 8) || getbyte(s,i+2);
		x.push(alpha.charAt(b10 >> 18));
		x.push(alpha.charAt((b10 >> 12) & 0x3F));
		x.push(alpha.charAt((b10 >> 6) & 0x3f));
		x.push(alpha.charAt(b10 & 0x3f));
	}
	switch(s.length - imax){
		case 1:
			b10 = getbyte(s,i) << 16;
			x.push(alpha.charAt(b10 >> 18) + alpha.charAt((b10 >> 12) & 0x3F) +padchar + padchar);
			break;
		case 2:
			b10 = (getbyte(s,i) << 16) || (getbyte(s,i+1) << 8);
			x.push(alpha.charAt(b10 >> 18) + alpha.charAt((b10 >> 12) & 0x3F) +alpha.charAt((b10 >> 6) & 0x3f) + padchar);
			break;
	}
	return x.join('');
};
 
//bScripts functions (info/error/...)
function msgBox(type, title, text, isHTML, style, customIcon){
	type = rmChar(type.toLowerCase(), " ");
	var dS = {//default style
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
		buttonText: "OK",//not really CSS related but whatever
	}, icon="", alt="";
	if(type=="info"){
		icon="img/info.png"; alt="i";
		dS.borderColor = "#088";
		dS.backgroundColor = "rgba(0,255,255,1)";
		console.info("[Essence.js] "+title+": "+text);
	}else if(type=="error"){
		icon="img/error.png"; alt="x";
		dS.borderColor = "#800";
		dS.backgroundColor = "rgba(255,0,0,1)";
		dS.textColor = "#FFF";
		console.error("[Essence.js] "+title+": "+text);
	}else if(type=="warning"){
		icon="img/warning.png"; alt="/!\\";
		dS.borderColor = "#840";
		dS.backgroundColor = "rgba(255,127,0,1)";
		dS.textColor = "#FFF";
		dS.buttonText = "Got it";
		console.warn("[Essence.js] "+title+": "+text);
	}else if(type=="question"){
		icon="img/question.png"; alt="?";
		dS.borderColor = "#008";
		dS.backgroundColor = "rgba(0,0,255,1)";
		dS.textColor = "#FFF";
		dS.buttonText = "Continue";
		console.log("[Essence.js] "+title+": "+text+" ?");
	}else if(type=="success"){
		icon="img/success.png"; alt = "v/";
		dS.borderColor = "#080";
		dS.backgroundColor = "rgba(0,255,0,1)";
		dS.textColor = "#FFF";
		dS.buttonText = "OK";
		console.log("[Essence.js] "+title+": "+text);
	}else if(type=="load"){
		icon="img/load.gif"; alt="o";
		dS.borderColor = "#888";
		dS.backgroundColor = "rgba(255,255,255,1)";
		dS.textColor = "#FFF";
		dS.buttonText = "Continue";
		console.log("[Essence.js] "+title+": "+text+"...");
	}else if(type=="custom"){
		icon=customIcon; alt=" ";
		if(style.borderColor) dS.borderColor = style.borderColor;
		if(style.borderSize) dS.borderSize = style.borderSize;
		if(style.borderRadius) dS.borderRadius = style.borderRadius;
		if(style.backgroundColor) dS.backgroundColor = style.backgroundColor;
		if(style.textColor) dS.textColor = style.textColor;
		if(style.textSize) dS.textSize = style.textSize;
		if(style.textFont) dS.textFont = style.textFont;
		if(style.buttonBorderColor) dS.buttonBorderColor = style.buttonBorderColor;
		if(style.buttonBorderSize) dS.buttonBorderSize = style.buttonBorderSize;
		if(style.buttonBorderRadius) dS.buttonBorderRadius = style.buttonBorderRadius;
		if(style.buttonColor) dS.buttonColor = style.buttonColor;
		if(style.buttonTextColor) dS.buttonTextColor = style.buttonTextColor;
		if(style.buttonTextSize) dS.buttonTextSize = style.buttonTextSize;
		if(style.buttonText) dS.buttonText = style.buttonText;
		console.log("[Essence.js] "+title+": "+text);
	}
	else icon=false;
	var msg = document.createElement("div"), header=document.createElement("span"), ctt=document.createElement("p"), btn=document.createElement("input"), img="<img src="+icon+" alt='"+alt+"' />";
	 
	msg.id = "overlay";
	header.id = "msgBoxHeader";
	ctt.id = "msg";
	btn.id = "msgBoxBtn";
	btn.type = "button";
	btn.value = dS.buttonText;
	img.id = "msgImg";
	 
	if(isHTML){
		header.innerHTML = title;
		ctt.innerHTML = text;
	}else{
		header.innerText = title;
		ctt.innerText = text;
	}
	if($e("#overlay").isEmpty()){
		Essence.handleError("The #overlay element is voided", "essence.js", 1336); 
		$e("#overlay").write("<div id='overlay'></div>", true);
		if(!$n("#overlay")) body.appendChild(document.createElement("div").id="overlay");
	}
	$e("#overlay").setStyles(["visibility", "hidden", "position", "absolute", "left", 0, "top", 0, "width", "100%", "height", "100%", "text-align", "center", "z-index", "1000", "background", "rgba(127,127,127,.5)"]);
	$e("div#overlay").setStyles(["width", "300px", "margin", "100px auto", "background", dS.backgroundColor, "border", dS.borderSize+" solid "+dS.borderColor, "padding", "15px", "textAlign", "center", "boxShadow", "3px 3px 3px #333", "borderRadius", dS.borderRadius]);
	$e("#msgBoxHeader").setStyles(["fontSize", parseInt(dS.textSize+2)+"px", "fontFamily", dS.textFont, "color", dS.textColor]);
	$e("#msg").setStyles(["fontSize", dS.textSize, "fontFamily", dS.textFont, "color", dS.textColor]);
	$e("#btnBoxBtn").setStyles(["border", dS.buttonBorderSize+" solid "+dS.buttonBorderColor, "color", dS.buttonTextColor, "fontSize", dS.buttonTextSize]);
	$e("#msgImg").setStyles(["position", "", "top", "2%", "left", "2%"]);
	msg.appendChild(header, img, ctt, btn);
	body.appendChild(msg);
	btn.onClick = function(){
		body.removeChild(msg);
	}
}
 
function genPassword(){//Generate a password
	var chars=[], sym = ["&", "~", "\"", "#", "\'", "{", "[", "(", "-", "|", "`", "_", "\\", "^", "@", ")", "]", "+", "=", "}", "%", "*", "?", ",", ";", ".", "/", ":", "!", " ", ""], word="";
	for(i=65; i<123; i++){
		if(i<=90 || i>=97) chars[i-65] = String.fromCharCode(i);
	}
	chars = chars.concat(sym, range(0, 1, 9)).remove(undefined);
	if(chars.indexOf(undefined)>-1) chars = chars.concat(sym, range(0, 1, 9)).remove(undefined);
	while(word.length<20){
		word += chars[randTo(chars.length-1)];
	}
	if(word.length<20) word += chars[randTo(chars.length-1)];
	return word;
}
 
function genHash(password){//to fix
	var hash="", k=toNDigits((821-sumOfString(password))/avgOfString(password)*password.charCodeAt(0), 1), rest, c;
	for(i=0; i<password.length; i++){
		rest=toNDigits(password.charCodeAt(i)+k, 1)%255;
		//c=clamp(password.charCodeAt(i)+k, 32, 126);
		c=toNDigits(Math.abs(password.charCodeAt(i)+k), 1);
		if(c<32) c+=48;
		//console.log("k="+k+"\trest ("+password.charCodeAt(i)+"+"+k+")="+rest+"\tc="+c);
		//console.log("Adjust: "+parseInt(48+Math.round(password.charCodeAt(password.length-1)/10+rest)));
		hash+=String.fromCharCode(clamp(c%127, 32, 126));
	}
	return hash;
}
 
function weekDay(d){//d must be in the form dd/mm/yyyy and it gives the day of the week of that date
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], k = parseInt(d.split("/")[0]), m = parseInt(d.split("/")[1]), y = parseInt(d.split("/")[2]), c;
	c = Math.floor(y/100); //centery
	y = y%100;
	return days[Math.round((1+2.6*m-0.2 + k+y + y/4 + c/4 - 2*c)%7)-1];
}
 
function dayOfWeek(d){//Daniel "Kinch" Sheppard's method
	var day = parseInt(d.split("/")[0]), m = [0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5], days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];//months from Jan to Dec
	var y = parseInt(d.split("/")[2])%100+Math.floor(d.split("/")[2]/4), c = Math.floor(d.split("/")[2]/100%4), cCode;
	if(c==0) cCode = 6;
	else if(c==1) cCode = 4;
	else if(c==2) cCode = 2;
	else cCode = 0;
	//console.log("m="+m[parseInt(d.split("/")[1])-1]+"\ny="+y+"\n"+"\ncCode="+cCode+"\nRes="+day+m[parseInt(d.split("/")[1])-1]+y+cCode);
	return days[(day+m[parseInt(d.split("/")[1])-1]+y+cCode)%7];
}
 
function linearGradient(clrI, clrF, n){
	var i=parseInt(conv(clrI, 16)), f=parseInt(conv(clrF, 16));
	n = parseInt(n)||10;
	var s=(f-i).sign(), grad=[], inc=(f-i)/(n-1);
	//console.log("i="+i+"\tf="+f+"\ns="+s+"\ninc="+inc);
	for(j=0; j<n; j++) grad.push(conv(i+j*inc, 10, 16));
	return grad;
}
 
function radialGradient(clrI, clrF, n){
 
}
 
function parseURL(p, action){//doing some PHP without PHP :) !!
	var urlQuery=location.href.split("?");
	if(urlQuery.length>1){
		var urlTerms=urlQuery[1].split("&")
		if(Object.prototype.toString.call(p) === "[object Array]"){//multi parameter parsing
			for(j=0; j<p.length; j++){
				for(i=0; i<urlTerms.length; i++){
					var param=urlTerms[i].split("=");
					if(param[0]==p[j]){
						if(Object.prototype.toString.call(action) === "[object Array]") action[j](param[1], param[0]);
						else action(param[1], param[0]);
					}
				}
			}
		}else{
			for(i=0; i<urlTerms.length; i++){
				var param=urlTerms[i].split("=");
				if(param[0]==p) action(param[1]);
			}
		}
	}
}
 
function GET(name){//HTTP GET request, method <=> parseURL(name, function(x){this=x})
	if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search)) return decodeURIComponent(name[1]);
}
	 
function POST(path, params){//HTTP POST request from somewhere on stackoverflow
	var form = document.createElement("form");
	form.setAttribute("method", "post");
	form.setAttribute("action", path);
 
	for(var key in params){
		if(params.hasOwnProperty(key)){
			var hiddenField = document.createElement("input");
			hiddenField.setAttribute("type", "hidden");
			hiddenField.setAttribute("name", key);
			hiddenField.setAttribute("value", params[key]);
			form.appendChild(hiddenField);
		}
	}
	document.body.appendChild(form);
	form.submit();
}
 
function PUT(){//HTTP PUT request
	 
}
 
function DELETE(){//HTTP DELETE request
	 
}
 
function alphabetSort(x){//sort alphabetically the elements in x
	if(!x.isIterable()) throw new Error("alphabetSort cannot sort non iterable objects");
	if(isType(x, "String")) return x.split("").quickSort().join("");

	var res = x, s = true, j = 1;
	while(s){
		s = false;
		for(k=0; k<=x.maxLength(); k++){
			for(i=0; i<=x.length; i++){
				if(x[i].length!=x[i+1]){
					var v = toSameLength(x[i].split(""), x[i+1].split("")).to1d();
					x[i] = v[0];
					x[i+1] = v[1];
				}
				if(x[i].charCodeAt(k)>x[i+1].charCodeAt(k)){
					x = swap(x, i, i+1);
					s = true && k>=x.maxLength()-1;
				}
				/*if(i<x.length-(j+1)){
					if(x[i].charCodeAt(j-1)>x[i+2].charCodeAt(j-1)) x = swap(x, i, i+2);
					if(x[i+1].charCodeAt(j-1)>x[i+2].charCodeAt(j-1)){
						x = swap(x, i+1, i+2); 
						s = true;
					}
				}
				if(i<x.length-(j+2)){
					if(x[i].charCodeAt(j-1)>x[i+3].charCodeAt(j-1)) x = swap(x, i, i+3);
					if(x[i+1].charCodeAt(j-1)>x[i+3].charCodeAt(j-1)){
						x = swap(x, i+1, i+3); 
						//s = true;
					}
				}*/
			}
			//j++;
		}
	}
}
 
function timeUp(act, pref, params){//time how long act() will take to be fully executed
	var t1 = new Date(), t2 = 0;
	t1 = (t1.getMinutes()*60+t1.getSeconds())*1000+t1.getMilliseconds();
	act(params);
	t2 = new Date();
	t2 = (t2.getMinutes()*60+t2.getSeconds())*1000+t2.getMilliseconds();
	if(isNon(pref) || pref.slice(0, 4).toLowerCase()=="auto" || pref.slice(0, 4).toLowerCase()=="none") return (t2-t1>1000)? (t2-t1)/1000+"s": (t2-t1)+"ms";
	else if(pref.toLowerCase()=="ms" || pref.slice(0, 8).toLowerCase()=="millisec") return (t2-t1)+"ms";
	else return (t2-t1)/1000+"s";
}
 
function binarySearch(list, x){//find if x exist in list
	list.quickSort();
	var i = 2, term = list[Math.floor(list.length/i)];
	while(term!=x && i>0){
		if(term==x) return true;
		else{
			i*=2;
			term = term<x? list[Math.floor(list.length/i)]: list[3*Math.floor(list.length/i)];
		}
	}
	return term==x;
	 
}
 
var dnM = false;
function daynightMode(exch){//switch between enabled or not for Day/Night page vision
	var h=new Date().getHours();
	if(exch) dnM = !dnM;
	if(dnM){
		if(h>=21) $e("body").setStyles(["backgroundColor", "#000", "color", "#fff"]);
		else $e("body").setStyles(["backgroundColor", "#fff", "color", "#000"]);
	}else Essence.say("You cannot use the day/night modder if it\'s disabled.", "warn");
}
 
function archive(name, data){//compressed data using Huffman's approach while differentiating uppercase and lowercase letters
	this.name = name;
	this.data = data;//data to compress
	this.dictionnary = [];//values should be in the format: letter=bitcode
	this.updateDict = function(){
		var lexiq = [], count, str = "", tmp = alphabetSort(data);
		for(i=0; i<data.length-1; i++){//fill lexiq
			if(tmp[i]!=tmp[i+1]) lexiq.push(tmp[i]);
		}
		lexiq = rmDuplicates(lexiq);
		//debugArr(lexiq);
		console.log(lexiq.getOccurences());
		count = new Array(lexiq.length);
		tmp = [];
		for(i=0; i<lexiq.length; i++){
			count[i] = data.count(lexiq[i]);
			Essence.say("lexiq["+i+"]="+lexiq[i]+" is present "+timesLiteral(count[i]), "inf");
			tmp[i] = lexiq[i]+count[i];
		}
		Essence.say("Lexiq of "+this.name+": "+lexiq+"\ncounts: "+count);
		//tree sorting
		/*for(i=0; i<lexiq.length; i++){
			if(count[i]==getMax(count)){//take off the most occurred character and h
				str += "0";
				lexiq = lexiq.remove(exiq[i]);
				count = count.remove(count[i]);
			}else str += "1";
 
			for(j=0; j<this.dictionnary.length; j++){
				if(this.dictionnary[i][0]==lexiq[i]) this.dictionnary[i] += str;
			}		   
		}*/
	}
	return this;
}
 
function Machine(name, ver, cpy, type){
	//ver (basis):= 1:binary, 2:ternary, 3:octal, 4:decimal, 5:hexadecimal, 6: base 36 
	this.capacity = cpy||1024;//pow(2, 10)bits=128B
	this.version = ver||5;
	this.name = name||"Machine_"+this.version;
	 
	switch(this.version){
		case 1: this.base = 2;break;
		case 2: this.base = 3;break;
		case 3: this.base = 8;break;
		case 4: this.base = 10;break;
		case 5: this.base = 16;break;
		case 6: this.base = 36;break;
		default: this.base = 16;break;
	}
	 
	this.operation = function(a, b, op){
		switch(op){
			case '+': return a+b;break;
			case '-': return a-b;break;
			case '*': return a*b;break;
			case '/': return a/b;break;
			case '%': return a%b;break;
			case '>>': return a>>b;break;
			case '<<': return a<<b;break;
			case '>>>': return a>>>b;break;
			case '>': return a>b;break;
			case '<': return a<b;break;
			case '|': return a|b;break;
			case '&': return a&b;break;
			case '^': return a^b;break;
			case '=': return a==b;break;
			case '!=': return a!=b;break;
			case '>=': return a>=b;break;
			case '<=': return a<=b;break;
			case '||': return a||b;break;
			case '&&': return a&&b;break;
			default: return a+""+b;break;
		}
	}
	 
	this.inv = function(data){
		if(!isType(data, "String")) data+="";
		for(i=0; i<data.length; i++) data[i] = parseInt(this.base)-1-parseFloat(data[i]);
		return data;
	}
	 
	this.memory = new Memory(this.capacity, type||"", this.name);
	this.send = function(msg, to){
		POST(to, "msg="+this.parse(msg));
	}
	 
	this.parse = function(data){//turn the machine string into a human readable one
		var res = "", deconvs = [];
		for(i=0; i<data.length; i++){
			deconvs[i] = conv(data[i], this.base);
			res += String.fromCharCode(conv(data[i], this.base));
		}
		console.log(deconvs);
		return JSON.parse(res);
	}
	 
	this.unparse = function(data){//turn the data into a machine readable string
		var nd = JSON.stringify(data), res = "", codes = [];
		for(i=0; i<nd.length; i++){
			codes[i] = nd.charCodeAt(i);
			res += this.base==2? conv(nd.charCodeAt(i).toNDigits(8), 10, this.base): conv(nd.charCodeAt(i), 10, this.base);
		}
		Essence.say(data+"= "+codes, "info");
		return this.base==2? res.divide(8): res.divide(2);
	}
	 
	this.store = function(data){
		this.memory.add(this.unparse(data));
		this.memory.save();
	}
	 
	this.show = function(){
		for(i=0; i<this.memory.slots.length; i++) Essence.say(this.memory.slots[i]);
	}
	 
	this.specs = function(){//toString variant
		return "Name: "+this.name+"\nCapacity: "+this.capacity+" bits\nMemory: \n"+this.memory.toString();
	}
}
 
function Memory(cpy, type, prefix){//stack memory
	this.capacity = cpy||1024;
	this.slots = new Array(this.capacity);
	this.type = type=="local"? "local": "session";
	this.name = prefix? prefix+"_"+this.type+"M"+log(this.capacity): this.type+"M"+log(this.capacity);
	this.free = 0;
	this.save = function(){
		for(i=0; i<this.slots.length; i++){
			if(this.type=="local") localStorage.setItem(this.name+"#"+i, this.slots[i]);
			else sessionStorage.setItem(this.name+"#"+i, this.slots[i]);
		}
	}
	 
	this.remove = function(data){
		this.slots.remove(JSON.stringify(data));
		if(this.type=="local") localStorage.setItem(this.getLocation(data), undefined);
		else sessionStorage.setItem(this.getLocation(data), undefined);
	}
	 
	this.getLocation = function(data){//get the memory location of a data
		if(this.type=="local"){
			for(i in localStorage){
				if(localStorage[i]==JSON.stringify(data)) return i;
			}
		}else{
			for(i in sessionStorage){
				if(sessionStorage[i]==JSON.stringify(data)) return i;
			}
		}
		return -1;
	}
	 
	this.clear = function(){
		this.slots = new Array(this.capacity);
		this.free = 0;
		if(this.type=="local"){
			for(i in localStorage){
				if(i.indexOf(this.name)>-1) localStorage.removeItem(i);
			}
		}else{
			for(i in sessionStorage){
				if(i.indexOf(this.name)>-1) sessionStorage.removeItem(i);
			}
		}
	}
	 
	this.add = function(data){//added but not saved
		this.slots[this.free++] = JSON.stringify(data);
	}
	 
	this.print = function(){
		Essence.say(this.name+"\'s slots: ", "info");
		for(i=0; i<this.slots.length; i++){
			try{Essence.say(i+": "+JSON.parse(this.slots[i]));}
			catch(err){Essence.say(i+": ");}
		}
	}
	 
	this.pop = function(){
		if(this.type=="local") localStorage.removeItem(this.getLocation(this.slots.last()));
		else sessionStorage.removeItem(this.getLocation(this.slots.last()));
		this.free--;
		this.slots.pop();
	}
	 
	this.toString = function(){
		return this.type.capitalize()+" memory "+this.name+": "+toStr(this.slots, true);
	}
}
 
function EvtShow(evt){
  alert("\tName: "+evt.name+"\nsource: "+evt.source+"\ndata: "+evt.data+"\ntarget: "+evt.target+"\ntime stamp: "+evt.timeStamp);
}
 
function evtLog(event){
  for(atr in event) Essence.say(atr+": "+event[atr]); 
}
 
/*function MyError(message) {
  this.name = 'MyError';
  this.message = message || 'Default Message';
  this.stack = (new Error()).stack;
}
MyError.prototype = Object.create(Error.prototype);
MyError.prototype.constructor = MyError;*/
 
function noobTest(fx, params){//source: https://scontent-lhr3-1.xx.fbcdn.net/hphotos-xfl1/v/t1.0-9/12705609_1071795346206130_3757520485028328706_n.jpg?oh=cb99a4624d9732414b787f7eb8437c73&oe=57383223
	try {
		fx(params);
	}catch(e){
		location.href = "http://stackoverflow.com/search?q=[js] + "+e.message;
	}
}
 
var oldTab = 'home';
function chTab(name){//change tabs
	$e('#tab_'+oldTab).rmClass('tabOn');
	$e('#tab_'+oldTab).addClass('tabOff');
	$e('#tab_'+name).rmClass('tabOff');
	$e('#tab_'+name).addClass('tabOn');
	$e('#contentTab_'+oldTab).style.display = 'none';
	$e('#contentTab_'+name).style.display = 'block';
	oldTab = name;
}
 
function animField(field){//animate a field that have the attribute for pointing at the id of the field
	for(l in $e("*label")){
		if($e("*label").hasOwnProperty(l) && l.htmlFor==field.id){
			l.write(field.value);
			field.value = "";
		}
	}
}
 
function WebPage(title, name, path, author, ver, stct, type){//Web page builder
	this.title = title||"My web page";
	this.type = type.normal()||"html";
	this.name = name+this.type||"index."+this.type;
	this.path = path+"/"+this.name||this.name;
	this.author = author||"Maximilian Berkmann";
	this.version = ver||1.0;
	this.structure = stct||"header!h-menu!content|aside!footer";
	this.code = "";
	this.template = "";
	/* Structure:
		Components:
			-header: header with a title and a logo
			-h-menu: horizontal menu with icons
			-v-menu: vertical menu
			-content: "welcome to "+this.title
			-aside: side section for news feed or anything you want to use it for
			-footer: footer with the sponsors (if there's at least one), name of the author(s)
			-article: new paper article like section
			-search: search bar
			 
		Structuration:
			! : new line (header!h-menu means that the h-menu is under the header)
			| : at the right (content|aside means that the aside section is placed on the right of the content section)
	*/
	//templating /(\{\{)\w*(\}\})*/g
	 
	this.word2code = function(word){
		switch(word.norm()){
			case "header": return "<header><img src='img/icon.png' /><hgroup><h1>{{title}}</h1><h3>{{subtitle}}</h3></hgroup></header>";
			case "h-menu": return "<menu class='h-menu'><li onClick=''>{{0}}</li><li onClick=''>{{1}}</li><li onClick=''>{{2}}</li></menu>";
			case "v-menu": return "<menu class='v-menu'><li onClick=''>{{0}}</li><li onClick=''>{{1}}</li><li onClick=''>{{2}}</li></menu>";
			case "content": return "<div id='content'>{{content}}</div>";
			case "aside": return "<aside>{{aside}}</aside>";
			case "footer": return "<footer>{{footer}}</footer>";
			case "article": return "<article id='{{article_title}}'><header>{{article_title}}</header>{{content}}<footer>{{article_footer}}</footer></div>";
			case "searc": return "<form action='search.php' method='post'><input type='search' name='search' /><input type='image' src='img/search.png' alt='?' /></form>";
			default: return word;
		}
	}
	 
	this.genTemplate = function(){//transform the structure into a template
		var cpnt = this.structure.split("!");
		this.template = "<table class='none'>";
		for(i=0; i<cpnt.length; i++){
			this.template += "<tr>";
			var sct = cpnt.split("|");
			for(j=0; j<sct.length; i++) this.template += this.word2code(sct[i]);
			this.template += "</tr>";
		}
		this.template += "</table>";
		 
		return this.template;
	}
	 
	this.genPage = function(){//transform the template into a page
		 
	}
}
 
function WebAppBuilder(name, path, author, ver, stct){
	this.name = name||"Web App";
	this.path = path||"";
	this.version = ver||1.0;
	this.author = author||"Maximilian Berkmann";
	this.dirs = ["img", "script", "style"]; //all dirs which are subdirectories of the path
	this.pages = [new WebPage(this.name, "index", this.path, this.author, this.ver, this.stct), new WebPage("Contact us", "contact", this.path, this.author, this.ver, this.stct), new WebPage("About us", "about", this.path, this.author, this.ver, this.stct)];

	this.build = function(){//generate
		for(i=0; i<this.pages.length; i++) this.pages[i].genPage();
	}
}
 
function virtualHistory(elm){//State history allowing undos and redos on the element while keeping track of the previous and following states
	this.src = elm;
	this.DEFAULT_STATE = elm;
	this.states = new Set(this.src);
	this.state = 0;
	 
	this.reset = function(){//go back to the default state
		this.src = this.DEFAULT_STATE;
	}
	 
	this.update = function(elm){//update the current state if needed
		if(this.src!=elm) this.add(elm);
	}
	 
	this.add = function(val){//add a state
		if(isType(val, "array")){
			for(i=0; i<val.length; i++) this.add(val[i]);
		}else{
			this.src = val;
			this.states.add(this.src);
			this.state++;
		}
	}
	 
	this.undo = function(){
		if(this.state==0) throw new Error("Set underflow, it's not possible to undo to a non-existent state.");
		this.state--;
		this.src = this.states.get(this.state);
	}
	 
	this.redo = function(){
		if(this.state==(this.states.size()-1)) throw new Error("Set overflow, it's not possible to redo to a non-existent state.");
		this.state++;
		this.src = this.states.get(this.state);
	}
	 
	this.get = function(i){
		return this.states.get(i);
	}
	 
	this.getStates = function(){
		return this.states.toString();
	}
	 
	this.isStateDefault = function(){//check if the current state is the default
		return this.src==this.DEFAULT_STATE;
	}
}
 
function Editor(id, language, prev, parser, tb){
	this.id = id||"#editor";
	this.node = $n(this.id);
	this.linesId = "#lines";
	this.linesNode = $n(this.linesId);
	this.nbLines = 0;
	this.language = language||"none";
	this.previewer = prev;
	//this.parser = parser||(prev? this.previewer.associatedParser: null);
	this.code = $e(this.id).val();
	this.codeHistory = new virtualHistory(this.code);
	this.toolbar = tb||new Toolbar();
	this.toolbar.for = this;
	this.toggleLine = function(id){
		$e("#"+id).setCSS("background", ($e("#"+id).css("background")=="rgba(0, 0, 0, 0)")? "red": "rgba(0, 0, 0, 0)");
	}
	this.update = function(n){
		if(this.node!=$n(this.id)) this.node = $n(this.id);
		if(this.linesNode!=$n(this.linesId)) this.linesNode = $n(this.linesId);
		if(this.code!=$e(this.id).val()) this.code = $e(this.id).val();
 
		n = n||(toPixel($e(this.id).css("height"))/(toPixel($e(this.id).css("fontSize"))*1.12));
		$e(this.linesId).write("", true);
		this.nbLines = Math.round(n);
		for(var i=1; i<=this.nbLines; i++){
			$e(this.linesId).after("<span id='l_"+i+"' style='color: black;'>"+i+"</span><br />");
		}
		this.codeHistory.update(this.code);
		this.toolbar.update();
		for(i=0; i<this.toolbar.tools.length; i++) this.toolbar.fn[i] = this[this.toolbar.tools[i]];
	}
	this.write = function(txt){
		$e(this.id).after(txt);
		this.codeHistory.update(this.code); //to avoid adding code states that are the same even if the set will take care of duplicates
	}
	this.clear = function(){
		$e(this.id).write("");
		this.codeHistory.reset();
	}
	this.undo = function(){
		this.codeHistory.undo();
		$e(this.id).write(this.codeHistory.src);
	}
	this.redo = function(){
		this.codeHistory.redo();
		$e(this.id).write(this.codeHistory.src);
	}
	this.save = function(){//save the actual code
		save($e(this.id).val(), "script"+getTimestamp()+".ws", "webscript");
	}
	this.select = function(){
		this.node.select();
	}
	this.copy = function(){
		copyToClipboard($e(this.id).val(), "webscript");
	}
	this.paste = function(override){
		override? $e(this.id).write(clipboardData.getData("webscript")): this.write(clipboardData.getData("webscript"));
	}
	this.load = function(){
		var file = prompt("File: ", ".ws");
		this.clear();
		getFileContent(file);
		$e(this.id).write(fct);
	}
	this.generate = function(){//save the parsed code
		if(this.previewer) /\<\?php([\s\S]*?)\?\>/.test($e(this.id).val())? save($e(this.previewer.id).val(true), "script"+getTimestamp()+".php", "php"): save($e(this.previewer.id).val(true), "script"+getTimestamp()+".html", "html");
		else /\<\?php([\s\S]*?)\?\>/.test($e(this.id).val())? save($e("#preview").val(true), "script"+getTimestamp()+".php", "php"): save($e(prev.id).val(true), "script"+getTimestamp()+".html", "html");
	}
	this.view = function(){
		this.previewer.run($e(this.id).val(), true);
	}
	this.highlightSynthax = function(code, lang){//highlight in the corresponding language and return an HTML result
		var res = code;
		switch(lang.normal()){
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
				break
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
				code = code.replace(/(\<|\>|\/\>)([A-Za-z]*|)(\<|\>|\/\>)/g, "<span class='code-tag'>$1</span>");
				code = code.replace(/(\"|\')(.*)(\"|\')/g, "<span class='code-str'>$1</span>");
				code = code.replace(/(?!\"|\')(\d+)(?!\"|\')/g, "<span class='code-num'>$1</span>");
				code = code.replace(/([\s\S]*?)(=)/g, "<span class='code-attr'>$1</span>");
				code = code.replace(/\<\!--([\s\S]*)--\>/g, "<span class='code-cmt'>$1</span>");
				code = code.replace(/\/\/(.*?)/g, "<span class='code-cmt'>$1</span>");
				code = code.replace(/=[A-Za-z0-9\.]+(| )/g, "<span class='code-val'>$1</span>");
				code = code.replace(/[=\{\}\[\]\(\)\;]/g, "<span class='code-op'>$1</span>");
				break;
			case "markdown":
				//Markdown synthax highlighting rules
				break;
			default: //normal text
		}
		return code;
	}
}   
 
function Preview(id, language, parser, editor){
	this.id = id||"#preview";
	this.node = $n(this.id);
	this.language = language||"none";
	this.associatedParser = parser||new Parser();
	this.associatedEditor = editor||new Editor();
	this.update = function(){
		if(this.node!=$n(this.id)) this.node = $n(this.id);
	}
	this.run = function(txt, parseFirst){
		$e(this.id).write(parseFirst? this.associatedParser.run(txt): txt, true);
	}
	this.viewCode = function(){
		var win = open("", "Resulting code", "width=800,height=600,location=no,menubar=yes,scrollbars=yes,status=no,toolbar=yes"), code = escapeHTML($e(wsIDE.preview.id).val(true));
		code = code.replace(/\n/g, "<br />");
		code = code.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
		win.document.write(this.associatedEditor.highlightSynthax(code, this.language));
		win.document.write("<style>"+Essence.css+"</style>");
	}
}
 
function Debugger(id, language){
	this.id = id||"#debugger";
	this.node = $n(this.id);
	this.language = language||"none";
	this.update = function(){
		if(this.node!=$n(this.id)) this.node = $n(this.id);
	}
	this.run = function(){
		//useful node stuff: reportValidity(), validity{}, setCustomValidity()
	}
}

function lorem(){
    return "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,";
}

function Parser(from, to, customParse){
	this.from = from|"WebScript";
	this.to = to||"DHTML";
	this.run = customParse||function(code){
		var res = code;
		res = res.replace(/\<tab \/\>/gm, "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
		res = res.replace(/\{{tab}}/gm, "\t");
		res = res.replace(/\<info\>(.*?)\<\/info\>/gm, "<span class='block info'>$1</span>");
		res = res.replace(/\<question\>(.*?)\<\/question\>/gm, "<span class='block question'>$1</span>");
		res = res.replace(/\<error\>(.*?)\<\/error\>/gm, "<span class='block error'>$1</span>");
		res = res.replace(/\<warning\>(.*?)\<\/warning\>/gm, "<span class='block warning'>$1</span>");
		res = res.replace(/\<success\>(.*?)\<\/success\>/gm, "<span class='block success'>$1</span>");
		if(!lorem) lorem = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,";
		res = res.replace(/(\{\{)LOREM(\}\})/ig, lorem);
		res = res.replace(/(?:\{\{)LOREM\x7c(\d+)-(\d+)(?:\}\})/ig, lorem.chunk("$1", "$2"));
		res = res.replace(/(?:\{\{)HW(?:\}\})/ig, "Hello World !");
		res = res.replace(/\<icon \/\>/gm, "<img src='img/icon.png' class='icon'/>");
		res = res.replace(/\<icon size=(?:\"|\')(\w+)(?:\"|\') \/\>/gm, "<img src='img/icon.png' class='icon' style='width: $1; height: $1;' />");
		res = res.replace(/\<icon name=(?:\"|\')(\w+)(?:\"|\') \/\>/gm, "<img src='img/$1.png' class='icon' />");
		res = res.replace(/\<(s|m|l|xs|xl):icon name=(?:\"|\')(\w+)(?:\"|\') \/\>/gm, "<img src='img/$2.png' class='$1-icon' />");
		res = res.replace(/\<js\>([\s\S]*?)\<\/js\>/gm,"\<script type='text/javascript'\>$1\<\/script\>");
		res = res.replace(/\<js src=(?:\"|\')(\w+)(?:\"|\') \/\>/gm,"\<script type='text/javascript'\ src='$1'>\<\/script\>");
		res = res.replace(/\<vb\>([\s\S]*?)\<\/vb\>/gm, "\<script type='text/vbscript'\>$1\<\/script\>");
		res = res.replace(/\<vb src=(?:\"|\')(\w+)(?:\"|\') \/\>/gm,"\<script type='text/vbscript'\ src='$1'>\<\/script\>");
		res = res.replace(/\<css\>([\s\S]*?)\<\/css\>/gm, "<style type='text/css'>$1</style>");
		res = res.replace(/\<css href=(?:\"|\')([A-Za-z_ -\.]+)(?:\"|\') \/\>/gm, "<link rel='stylesheet' type='text/css' href='$1' />");
		res = res.replace(/\<charset=(?:\"|\')(\w+)(?:\"|\') \/\>/gm, "<meta charset='$1' />");
		res = res.replace(/\<author name=(?:\"|\')(\w+)(?:\"|\') href=(?:\"|\')(\w+)(?:\"|\') \/\>/gm, "<meta name='author' content='$1' /><link rel='author' href='$2' />");
		res = res.replace(/\<desc\>(.*?)\<\/desc\>/gm, "<meta name='description' content='$1' />");
		res = res.replace(/\<copy\>(.*?)\<\/copy\>/gm, "<meta name='copyrights' content='$1' />");
		res = res.replace(/\<lbl\>(.*?)\<\/lbl\>/gm, "<label>$1</label>");
		res = res.replace(/\<submit \/\>/gm, "<input type='submit' />");
		res = res.replace(/\<submit val=(?:\"|\')(\w+)(?:\"|\') \/\>/gm, "<input type='submit' value='$1' />");
		res = res.replace(/\<reset \/\>/gm, "<input type='reset' />");
		res = res.replace(/\<reset val=(?:\"|\')(\w+)(?:\"|\') \/\>/gm, "<input type='reset' value='$1' />");
		res = res.replace(/\<hdn name=(?:\"|\')(\w+)(?:\"|\')\>(.*?)\<\/hdn\>/gm, "<input type='hidden' name='$1' value='$2' />");
		res = res.replace(/\<hdn name=(?:\"|\')(\w+)(?:\"|\') id=(?:\"|\')(\w+)(?:\"|\')\>(.*?)\<\/hdn\>/gm, "<input type='hidden' name='$1' value='$3' id='$2' />");
		res = res.replace(/<txt ((?:id|name|class)(\=(?:\"|\')(\w+)(?:\"|\'))(| ))\/>/gm, "<input type='text' />")
		res = res.replace(/\<sql query=(?:\"|\')(.*?)(?:\"|\') \/\>/gm, "\<\?php\n\tif(mysqli_ping($$dbc)){\n\t\t$r = mysqli_query($$dbc, '$1');\n\t}else printMsg('error', 'No ping');\n\?>");
		res = res.replace(/\<sqlt table=(?:\"|\')(\w+)(?:\"|\') query=(?:\"|\')(.*?)(?:\"|\') \/\>/gm, "\<\?php\n\tif(mysqli_ping($$dbc)){\n\t\techo 'Last updated at '._time().\"<br />\";selectTable($dbc, '$1', '$2');\n\t}else printMsg('error', 'No ping');\n\?>");
		return res;
	};
}
 
function Toolbar(id, tools, mdl){
	this.id = id||"#toolbar";
	this.node = $n(this.id);
	this.tools = tools||["undo", "redo", "clear", "save", "select", "copy", "paste", "load", "generate", "view"];
	this.fn = [];
	this.for = mdl;
	this.update = function(){
		if(this.node!=$n(this.id)) this.node = $n(this.id);
		for(i=0; i<this.tools.length; i++) this.fn[i] = this.for[this.tools[i]];//doesn't work out of Editor's scope
		/*$e(this.id).write("");
		for(i=0; i<this.tools.length; i++){
			$e(this.id).after("<img src='img/"+this.tools[i]+".png' title='"+this.tools[i].capitalize()+"' alt='"+this.tools[i]+"' onClick='"+this[this.tools[i]]+"' class='tbicon' id='tool"+i+"' />", true);
		}*/
	}
}
 
function IDE(lang, edt, prev, ps, dbg, tb){//Integrated Development Environment
	this.editor = edt||new Editor();
	this.parser = ps||new Parser();
	this.preview = prev||new Preview();
	this.preview.associatedParser = this.parser;
	this.editor.previewer = this.preview;
	this.editor.parser = this.parser;
	this.debugger = dbg||new Debugger();
	this.language = lang||"none";
	this.init = function(to, l){
		if(this.language!="none"){
			this.editor.language = this.debugger.language = this.parser.from = this.language;
		}
		if(to){
			this.parser.to = to;
			this.preview.language = to;
		}
	}
	this.toolbar = this.editor.toolbar;
	this.update = function(l){
		this.editor.update(l);
		this.preview.update();
		this.debugger.update();
	}
}
 
//AJAX
function loadDoc(url, callback){
	var xhr = window.XMLHttpRequest? new XMLHttpRequest(): new ActiveXObject("Microsoft.XMLHTTP");
	xhr.onreadystatechange = function(){
		if(xhr.readyState==4 && xhr.status==200) callback(xhr);
	};
	xhr.open("GET", url, true);
	xhr.send();
}
 
function AJAXpost(data, to, xml){
	var xhr =   window.XMLHttpRequest? new XMLHttpRequest(): new ActiveXObject("Microsoft.XMLHTTP"), res;
	xhr.onreadystatechange = function(){
		//request complete and HTTP OK response
		/*readyStates
		0: request not initialized
		1: server connection established
		2: request received 
		3: processing request 
		4: request finished and response is ready
		*/
		if(xhr.readyState==4 && xhr.status==200) res = xml? xhr.responseXML: xhr.responseText;
	};
	xhr.open("POST", to, true);
	if(xml){
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(data);
	}else{
		xhr.setRequestHeader("Content-Type", "text/plain");
		xhr.send(data);
	}
}
 
function getHTTPMsg(status){//status: xhr.status
	switch(status){
		//information
		case 100: return "Continue"; break;
		case 101: return "Switching Protocols"; break;
		//success
		case 200: return "OK"; break;
		case 201: return "Created"; break;
		case 202: return "Accepted"; break;
		case 203: return "Non-Authoriative Information"; break;
		case 204: return "No Content"; break;
		case 205: return "Reset Content"; break;
		case 206: return "Partial Content"; break;
		//redirection
		case 300: return "Multiple Choices"; break;
		case 301: return "Moved Permanently"; break;
		case 302: return "Found"; break;
		case 303: return "See Other"; break;
		case 304: return "Not Modified"; break;
		case 305: return "Use Proxy"; break;
		case 306: return "Unused"; break;
		case 307: return "Temporary Redirect"; break;
		//client error
		case 400: return "Bad Request"; break;
		case 401: return "Unauthorized"; break;
		case 402: return "Payment Required"; break;
		case 403: return "Forbidden"; break;
		case 404: return "Not Found"; break;
		case 405: return "Method Not Allowed"; break;
		case 406: return "Not Acceptable"; break;
		case 407: return "Proxy Authentification Required"; break;
		case 408: return "Request Timeout"; break;
		case 409: return "Conflict"; break;
		case 410: return "Gone"; break;
		case 411: return "Length Required"; break;
		case 412: return "Precondition Failed"; break;
		case 413: return "Requeust Entity Too Large"; break;
		case 414: return "Request-url Too Long"; break;
		case 415: return "Bad Request"; break;
		case 416: return "Unsupported Media Type"; break;
		case 417: return "Expectation Failed"; break;
		//server error
		case 500: return "Internal Server Error"; break;
		case 501: return "Not Implemented"; break;
		case 502: return "Bad Gateway"; break;
		case 503: return "Service Unavailable"; break;
		case 504: return "Gateway Timeout"; break;
		case 505: return "HTTP Version Not Supported"; break;
		default: return "Unknown status";
	}
}

function Template(name, path, txt, params){//JavaScript templating + conversion
	this.name = name||"Template";
	this.path = path||this.name+".jst";
	this.params = params||["name", "description", "version", "title", "path"];//{{params}}
	this.special = ["tab", "date", "time", "timestamp"];//%special%
	this.specialEq = ["&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", getDate(), getTime(), getTimestamp()];
	this.text = txt||"";//text/code containing the {{params}}
	this.gen = function(obj){//generate a text/code from the template using the keys of the object
		var res = this.text, k = keyList(obj, true);
		for(i=0; i<k.length; i++) res = res.replace("{{"+k[i]+"}}", obj[k[i]]);
		for(i=0; i<this.special.length; i++) res = res.replace("%"+this.special[i]+"%", this.specialEq[i]);
		return res;
	}
	this.save = function(obj, name, ext){//save the template into a file or the converted version
		if(obj) save(this.gen(obj), (name||this.name)+"."+(ext||".js"), ext||"javascript");
		else save(this.text, this.path, "javascript");
	}
}

function moveHTMLRange(id, n){//moove an HTML range left or right which was made using htmlRange
		$e("#"+id).write(parseFloat($e("#"+id).val())+n);
		$e("#"+id+"_val").write($e("#"+id).val());
	}

function htmlRange(id, min, val, max){//Dynamic HTML range
	if(!id) throw new Error("htmlRange needs to know the id of the element implementing the range");
	Essence.addCSS(".arrow{cursor: pointer;font-size: 20px;vertical-align: middle}");
	return '<b class="arrow" onClick="moveHTMLRange(\''+id+'\', -1)">&triangleleft;</b><input type="range" value='+(val||0)+' max='+(max||100)+' min='+(min||0)+' id="'+id+'" onChange="$e(\'#'+id+'_val\').write(this.value);" /><b class="arrow" onClick="moveHTMLRange(\''+id+'\', 1)">&triangleright;</b><span id="'+id+'_val">'+(val||"")+'</span>';
}

function labelFieldSwap(id, lbl){//HTML/JS animation swapping the field with the label
	//if(!$e("#"+id).isEmpty() && $e("#"+id).val()!=lbl && $e("#"+id).val()!=$e("#lbl_"+id).val()) return false;
	if($e("#lbl_"+id).isEmpty()) $e("#lbl_"+id).write("&ensp;", true);
	if($e("#"+id).isEmpty() || $e("#"+id).val()==="\b" || ($e("#"+id).val()!=lbl && $e("#"+id).val().length<2)){//the field isn't being filled so label inside the field
		//console.log("lbl inside");
		$e("#"+id).write($e("#lbl_"+id).val());
		$e("#lbl_"+id).write("&ensp;", true);
	}else{//the field is being filled up so label shown and no placeholding value in the field
		//console.log("lbl outside");
		$e("#lbl_"+id).write(lbl||$e("#"+id).val());
		if($e("#"+id).val()===lbl || $e("#"+id).val()==="") $e("#"+id).write("\b");
	}
}

function htmlInput(id, type, lbl){//Dynamic HTML input with an animation
	if(!id) throw new Error("htmlInput needs to know the id of the element implementing the input");
	if(!lbl) lbl = type||id;
	return "<label for='"+id+"' id='lbl_"+id+"'>&ensp;</label><br /><input type='"+(type||'text')+"' id='"+id+"' value='"+lbl+"' onFocus='labelFieldSwap(\""+id+"\", \""+lbl+"\")' onBlur='labelFieldSwap(\""+id+"\", \""+lbl+"\")' />";
}
