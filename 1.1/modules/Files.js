/**
 * @module File
 * @description File management and control
 * @version 1.0
 * @since 1.1
 * @license MIT
 * @author Maximilian Berkmann <maxieberkmann@gmail.com>
 * @copyright Maximilian Berkmann 2016
 * @requires module:../essence
 * @namespace
 * @type {Module}
 * @since 1.1
 * @exports File
 */
var Files = new Module("Files", "File management and control");

/* eslint no-undef: 0 */
/**
 * @description Keeps the file name even if it's not in the same directory as the file that uses this
 * @param {string} path Path
 * @returns {*} File name
 * @since 1.0
 * @func
 */
function stripPath (path) { //Keeps the file name even if it's not in the same directory as this library or the files using it
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
        console.log("Gone through " + pParts[j]);
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
    return res.remove("")
}

/**
 * @description Get the directory's path of the file (opposite of stripPath())
 * @param {string} [path=location.href] Path
 * @returns {string} Directory path
 * @since 1.0
 * @func
 */
function getDirectoryPath (path) { //Get the directory's path of the file (so it's the opposite of of stripPath)
    if (!path) path = location.href;
    return path.get(0, path.indexOf(stripPath(path)) - 1)
}

/**
 * @description ActiveX manipulation
 * @param {string} filename Filename
 * @param {string} text2write Text to write to the file
 * @param {boolean} [close=false] Closing flag
 * @param {boolean} [remove=false] Removing flag
 * @returns {undefined}
 * @since 1.0
 * @func
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
 * @description Get the file's content
 * @param {string} fname File name
 * @returns {string} File's content
 * @since 1.0
 * @see getFC
 * @func
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

//getFileContent's equivalent using XHR
/**
 * @description getFileContent using the XHR object
 * @param {string} fname File name
 * @returns {string} File's content
 * @since 1.0
 * @alias getFileContent
 * @func
 */
function getFC (fname) {
    var res = "", xhr = new XHR(fname, "GET", false, function (req) {
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
 * @returns {*} Object of the file
 * @since 1.1
 * @func
 */
function evalFile (filename) {
    return (new Function("return " + getFileContent(filename)))();
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
    var txt = (isType(text, "Array") ? text.join(" ") : text).replace(/(\.|!|\?|;|:|"|,|\t|\n|\f|\r|\v|\{|})+/gm, " ").split(" ").remove(""); //The \b would treat a-b as "a - b"
    var kw = occurrenceSort(txt).filter(function (x) { //Filter out non-keywords words
        return noSymbols ? (["=", "+", "-", "*", "/", "\\", "%", "#", "'", "@", "^", "$", "£", "µ", "~", "&", "[", "]", "(", ")", "|", "`"].has(x)? false: txt.count(x) > 3) : txt.count(x) > 3;
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
 * @property {Function} Spider.get Keyword getter
 * @property {Function} Spider.getAll Get all the keywords nice and clean
 * @property {Function} Spider.getWords Get all the key-words
 * @property {Function} Spider.getOccurrences Get the number of occurrences of all the keywords
 * @property {Function} Spider.getFreq Get the frequency of all the keywords
 * @property {Function} Spider.getCoverage Get the coverage of all the keywords compared to all the words
 * @property {Function} Spider.getGlobalKeywords Get all the keywords of all the file at once
 * @property {Function} Spider.toString String representation
 */
function Spider (filenames) {
    this.dir = filenames || [];
    this.keywords = [];
    this.get = function (withSymbols) { //Keywords infos
        /*
        Words: getKeywords(...).map(x => x.split(":")[0])
        Occurrences: getKeywords(...).map(x => parseInt(x.split(" ")[1]))
        Frequency: getKeywords(...).map(x => parseFloat(x.split(" ")[2].replace(/^\((\d|\d\.\d{1,})\%\)$/, "$1")))
         */
        for (var i = 0; i < this.dir.length; i++) this.keywords[i] = getKeywords(getFileContent(this.dir[i]), !withSymbols);
        return this.keywords;
    };
    this.getAll = function (withSymbols) {
        return this.get(withSymbols).linearise();
    };
    this.getWords = function (withSymbols) { //Occurrencing words
      return this.getAll(withSymbols).map(function (x) {
          return x.split(":")[0]
      })
    };
    this.getOccurrences = function (withSymbols) {
        return this.getAll(withSymbols).map(function (x) {
            return parseInt(x.split(" ")[1])
        })
    };
    this.getFreq = function (withSymbols) { //Frequency
        return this.getAll(withSymbols).map(function (x) {
            return parseFloat(x.split(" ")[2].replace(/^\((\d{1,}|\d{1,}\.\d{1,})%\)$/, "$1"));
        })
    };

    this.getCoverage = function (withSymbols) {
        return this.getFreq(withSymbols).sum().toNDec(2);
    };
    this.getGlobalKeywords = function (withSymbols) {
        var fullDir = this.dir.map(function (file) {
           return getFileContent(file);
        }).toStr();
        return getKeywords(fullDir, !withSymbols);
    };

    this.toString = function () {
        return "Spider(dir=" + this.dir + ", keywords= " + this.keywords.toStr(true) + ")";
    };
    return this;
}