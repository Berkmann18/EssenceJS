/**
 * @module File
 * @description File management and control
 * @version 1.0
 * @since 1.1
 * @license MIT
 * @author Maximilian Berkmann <maxieberkmann@gmail.com>
 * @copyright Maximilian Berkmann 2016
 * @requires ../essence
 * @namespace
 * @type {{name: string, version: number, run: File.run, description: string, dependency: Array, author: string, complete: boolean}}
 * @since 1.1
 * @exports File
 */
var File = {
    name: "File",
    version: 1,
    run: function () {

    },
    description: "File management and control",
    dependency: [],
    author: "Maximilian Berkmann",
    complete: false,
    toString: function () {
        return "Module(name='" + this.name + "', version=" + this.version + ", description='" + this.description + "', author='" + this.author + "', complete=" + this.complete + ", run=" + this.run + ")";
    }
};

(function () {
    File.complete = true;
})();

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
function getFilename(withExt) {
    return withExt? stripPath(location.pathname): stripPath(location.pathname).get(-stripPath(location.pathname).lastIndexOf(".") - 1);
}

/**
 * @description A bit like stripPath but which would preserve the directories that aren't listed in the local path
 * @param {string} path Path
 * @param {string} localPath Local path
 * @returns {string} Current path
 * @since 1.0
 * @func
 */
function getCurrentPath (path, localPath) {
    if (!localPath) localPath = "file:///";
    var parts = path.split("/"), res = "", pParts = localPath.split("/"), i = 0, j = 0;
    while(localPath.indexOf(parts[i]) > -1) i++;
    res = parts.get(i).join("/");

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
 * @param {string} path Path
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
 * @returns {undefined}
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
    rawFile.send(null)
}
