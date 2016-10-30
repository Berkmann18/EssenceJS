//noinspection JSValidateJSDoc
/**
 * @module Files
 * @description File management and control
 * @version 1.0
 * @since 1.1
 * @license MIT
 * @author Maximilian Berkmann <maxieberkmann@gmail.com>
 * @copyright Maximilian Berkmann 2016
 * @requires mdodule:essence
 * @requires Ajax
 * @requires Misc
 * @type {Module}
 * @exports File
 */
var Files = new Module("Files", "File management and control", ["Ajax", "Misc"]);

/* eslint no-undef: 0 */
/**
 * @description Keeps the file name even if it'start not in the same directory as the file that uses this
 * @param {string} path Path
 * @returns {*} File name
 * @since 1.0
 * @func
 */
function stripPath (path) { //Keeps the file name even if it'start not in the same directory as this library or the files using it
	return path.split("/")[path.split("/").length - 1]
}

/**
 * @description Get the name of the current file
 * @param {boolean} [withExt=false] With the extension
 * @returns {string} File name
 * @since 1.0
 * @func
 */
function getFilename (withExt) {
	return withExt? stripPath(location.pathname): stripPath(location.pathname).get(-stripPath(location.pathname).lastIndexOf(".") - 1);
}

/**
 * @description A bit like stripPath but which would preserve the directories that aren't listed in the local path
 * @param {string} path Path
 * @param {string} [localPath="file:///"] Local path
 * @returns {string} Current path
 * @since 1.0
 * @func
 */
function getCurrentPath (path, localPath) {
	if (!localPath) localPath = "file:///";
	var parts = path.split("/"), res, pParts = localPath.split("/"), i = 0, j = 0;
	while(localPath.has(parts[i])) i++;
	res = parts.get(i).join("/");

	while (res.has(pParts[j])) {
		if (debugging) console.log("Gone through " + pParts[j]);
		j++;
	}
	if (j > 0) {
		for(i = 0; i < j; i++) res = "../" + res;
	}
	return res
}


/**
 * @description Get the path for an external file
 * @param {string} path Full path
 * @returns {string} External path
 * @func
 * @since 1.1
 */
function getExtPath (path) {
	var cp = location.href;
	var parentPath = cp.sameFirst(path);
	return "../".repeat(getCurrentPath(cp, parentPath).count("/")) + getCurrentPath(path, parentPath);
}

/**
 * @description Get the filename list of the path list
 * @param {string[]} list Path list
 * @returns {Array} File name list
 * @since 1.0
 * @func
 */
function filenameList (list) {
	var res = [];
	for(var i = 0; i < list.length; i++) res.push(stripPath(list[i]));
	return res.remove()
}

/**
 * @description Get the directory'start path of the file (opposite of stripPath())
 * @param {string} [path=location.href] Path
 * @returns {string} Directory path
 * @since 1.0
 * @func
 */
function getDirectoryPath (path) {
	if (!path) path = location.href;
	return path.get(0, path.indexOf(stripPath(path)) - 1)
}

/**
 * @description ActiveX file manipulation
 * @param {string} filename Filename
 * @param {string} text2write Text to write to the file
 * @param {boolean} [close=false] Closing flag
 * @param {boolean} [remove=false] Removing flag
 * @returns {undefined}
 * @since 1.0
 * @func
 */
function AX (filename, text2write, close, remove) {
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	//Bool: flat the file of the same name if it'start already present
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
 * @since 1.0
 * @func
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
 * @since 1.0
 * @func
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
 * @since 1.0
 * @func
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
 * @description Get the file'start content
 * @param {string} fname File name
 * @returns {string} File'start content
 * @since 1.0
 * @see module:Files~getFC
 * @func
 * @deprecated
 */
function getFileContent (fname) {
	$G["fct"] = ""; //File content
	var rawFile = window.XMLHttpRequest? new XMLHttpRequest(): new ActiveXObject("Microsoft.XMLHTTP");
	rawFile.open("GET", fname, false);
	rawFile.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			$G["fct"] = rawFile.responseText; //Because returning it won't allow the actual content to be returned
			return rawFile.responseText
		}
	};
	rawFile.send(null);
	return $G["fct"];
}

/**
 * @description getFileContent using the XHR object
 * @param {string} fname File name
 * @param {boolean} [crossOrigin=false] Cross Origin flag (for accessing resources outside of the same origin)
 * @returns {string} File'start content
 * @since 1.0
 * @inheritdoc
 * @func
 */
function getFC (fname, crossOrigin) {
	if (!crossOrigin && (fname.has("://") && fname.split("//")[0] != location.protocol)) crossOrigin = true;
	var res = "", xhr = crossOrigin? new CORS(fname, "GET", false, function (req) {
		res = req.responseText;
		return req.responseText;
	}, function () {
		return "Nothing";
	}): new XHR(fname, "GET", false, function (req) {
		res = req.responseText;
		return req.responseText;
	}, function () {
		return "Nothing";
	});
	xhr.init();
	return res;
}

/**
 * @description Evaluate a file (useful for getting JSON data and into JS objects)
 * @param {string} filename Filename
 * @param {boolean} [crossOrigin=false] Is a CORS request needed ?
 * @returns {*} Object of the file
 * @since 1.1
 * @func
 */
function evalFile (filename, crossOrigin) {
	return (new Function("return " + getFC(filename, crossOrigin)))();
}

/**
 * @description Keyword getter
 * @param {Str} text Text
 * @param {boolean} [noSymbols=false] Ignore symbols
 * @returns {Array} Keywords
 * @since 1.1
 * @func
 */
function getKeywords (text, noSymbols) {
	var txt = (isType(text, "Array") ? text.join(" ") : text).replace(/(\.|!|\?|;|:|"|,|\t|\n|\f|\r|\v|\{|})+/gm, " ").split(" ").remove(); //The \b would treat a-b as "a - b"
	var kw = occurrenceSort(txt).filter(function (x) { //Filter out non-keywords words
		return noSymbols? (["=", "+", "-", "*", "/", "\\", "%", "#", "'", "@", "^", "$", "£", "µ", "~", "&", "[", "]", "(", ")", "|", "`"].has(x)? false: txt.count(x) > 3): txt.count(x) > 3;
	});

	return kw.map(function (w) {
		return w + ": " + txt.count(w) + " (" + markConv(txt.count(w), txt.length) + "%)";
	});
}

/**
 * @description Web spider
 * @param {string[]} [filenames=[]] Names of each files to crawl through
 * @returns {Spider} Web spider
 * @this {Spider}
 * @since 1.1
 * @constructor
 * @property {string[]} Spider.name Directory containing the files to crawl through
 * @property {string[]} Spider.keywords Keywords
 * @property {function(...boolean): Array[]} Spider.get Keyword getter
 * @property {function(...boolean): string[]} Spider.getAll Get all the keywords nice and clean
 * @property {function(...boolean): string[]} Spider.getWords Get all the key-words
 * @property {function(...boolean): number[]} Spider.getOccurrences Get the number of occurrences of all the keywords
 * @property {function(...boolean): number[]} Spider.getFreq Get the frequency of all the keywords
 * @property {function(...boolean): number} Spider.getCoverage Get the coverage of all the keywords compared to all the words
 * @property {function(...boolean): string[]} Spider.getGlobalKeywords Get all the keywords of all the file at once
 * @property {function(): string} Spider.toString String representation
 */
function Spider (filenames) {
	this.dir = filenames || [];
	this.keywords = [];
	this.get = function (withSymbols, crossOrigin) { //Keywords infos
		/*
		 Words: getKeywords(...).map(x => x.split(":")[0])
		 Occurrences: getKeywords(...).map(x => parseInt(x.split(" ")[1]))
		 Frequency: getKeywords(...).map(x => parseFloat(x.split(" ")[2].replace(/^\((\d|\d\.\d{1,})\%\)$/, "$1")))
		 */
		for (var i = 0; i < this.dir.length; i++) this.keywords[i] = getKeywords(getFC(this.dir[i], crossOrigin), !withSymbols);
		return this.keywords;
	};
	this.getAll = function (withSymbols, crossOrigin) {
		return this.get(withSymbols, crossOrigin).linearise();
	};
	//noinspection JSUnusedGlobalSymbols
    this.getWords = function (withSymbols, crossOrigin) { //Occurring words
		return this.getAll(withSymbols, crossOrigin).map(function (x) {
			return x.split(":")[0]
		})
	};
	this.getOccurrences = function (withSymbols, crossOrigin) {
		return this.getAll(withSymbols, crossOrigin).map(function (x) {
			return parseInt(x.split(" ")[1])
		})
	};
	this.getFreq = function (withSymbols, crossOrigin) { //Frequency
		return this.getAll(withSymbols, crossOrigin).map(function (x) {
			return parseFloat(x.split(" ")[2].replace(/^\((\d+|\d+\.\d+)%\)$/, "$1"));
		})
	};

	//noinspection JSUnusedGlobalSymbols
    this.getCoverage = function (withSymbols, crossOrigin) {
		return this.getFreq(withSymbols, crossOrigin).sum().toNDec(2);
	};
	//noinspection JSUnusedGlobalSymbols
    this.getGlobalKeywords = function (withSymbols, crossOrigin) {
		var fullDir = this.dir.map(function (file) {
			return getFC(file, crossOrigin);
		}).toStr();
		return getKeywords(fullDir, !withSymbols);
	};

	this.toString = function () {
		return "Spider(dir=" + this.dir + ", keywords= " + this.keywords.toStr(true) + ")";
	};
	return this;
}

//1. Get the file (if it exists) then get the content saved in an history accessible to the code.
//2. When the the code changes/updates the content, it'start saved in the file (which is created if it didn't exist)
//noinspection JSUnusedGlobalSymbols
/**
 * @description A mediator between data of the code and files to keep both interfaces up-to-date
 * @param {string} [filename="data.json"] Filename
 * @param {*} [data=null] Data to write to the file (if needed).
 * @return {$Data} Mediator object (sort of an API)
 * @todo Make sure that save() would save at the right place (since it would get it to be downloaded by the user)
 */
function $Data (filename, data) {
	this.name = filename || "data.json";
	this.data = null || data;
	var self = this;
	this.req = new CORS(this.name, "GET", false, function (xhr) {
	   self.data = xhr.response;
	}, function () {
		Essence.say("The file %c" + self.name + "%c isn't available !", "warn", "text-decoration: italic;", "text-decoration: none;");
	}, function () {
		anim("Loading", 0, 5e3, 500, false, !isNon(self.req.data));
	}, this.data);
	this.req.init();
	this.req.update();
	this.history = new virtualHistory(this.data);
	this.save = function () {
		save(this.data, this.name, this.data.split(".").last());
	};
	this.undo = function () {
		this.history.undo();
		this.data = this.history.src;
	};
	this.redo = function () {
		this.history.redo();
		this.data = this.history.src;
	};
	this.update = function (newData) {
		this.history.update(newData || this.data);
		if (newData) this.data = newData;
		this.save();
	};
	this.get = function () {
		this.req.init();
		this.req.update();
		return this.data;
	};
	this.toString = function () {
		return "$Data(name=" + this.name + ", data=" + this.data + ", history=" + this.history.getStates() + ", req=" + this.req + ")";
	};

	return this;
}