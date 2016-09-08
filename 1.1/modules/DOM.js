/**
 * @module DOM
 * @description Document-Object Model stuff
 * @version 1.0
 * @since 1.1
 * @license MIT
 * @author Maximilian Berkmann <maxieberkmann@gmail.com>
 * @copyright Maximilian Berkmann 2016
 * @requires module:essence
 * @requires Misc
 * @type {Module}
 * @exports DOM
 */
var DOM = new Module("DOM", "DOM stuff", ["Misc"], 1, function () {
    BrowserDetect.init();
});
/* eslint no-undef: 0 */

/**
 * @description Print onto something
 * @param {*} st Data to be printed
 * @param {boolean} [isHTML=false] Has to be formatted as an HTML code or not
 * @param {string} [sw="body"] Place to print <code>st</code>
 * @returns {undefined}
 * @see module:DOM~println
 * @since 1.0
 * @func
 */
function print (st, isHTML, sw) {
    $e(sw || "body").after(st, isHTML)
}

/**
 * @description Print-line onto something
 * @param {*} st Data to be printed
 * @param {string} [sw="body"] Place to print <code>st</code>
 * @returns {undefined}
 * @see module:DOM~print
 * @since 1.0
 * @func
 */
function println (st, sw) {
    $e(sw || "body").after(st + "<br />", true)
}

/**
 * @description Temporarily add meta-data to the page
 * @param {string} n Name
 * @param {NumberLike} ctt Content
 * @param {boolean} [httpe=false] HTTP Equiv specified ?
 * @returns {undefined}
 * @see module:DOM~getMetaData
 * @since 1.0
 * @func
 */
function addMetaData (n, ctt, httpe) {
    /* exported addMetaData */
    var el = document.createElement("meta");
    httpe? el.httpEquiv = n: el.name = n;
    el.content = ctt;
    document.head.appendChild(el)
}

/**
 * @description Get the meta-data of the current page
 * @returns {string[]} Name and content results
 * @see module:DOM~addMetaData
 * @since 1.0
 * @func
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
 * @description Disable right clicks
 * @returns {undefined}
 * @since 1.0
 * @func
 */
function noRightClick () {
    document.oncontextmenu = new Function("return false")
}

/**
 * @description Redirect to somewhere
 * @param {string} to Place to be redirected to
 * @param {number} [dt=3e3] Time delay (in ms)
 * @param {string} divId Id of the element to be used to inform the user about what's going on
 * @returns {undefined}
 * @since 1.0
 * @func
 */
function redirect (to, dt, divId) { //Redirect to #to in #dt ms
    if (!dt) dt = 3e3; //If dt hasn't an assign value so it will assign a default one
    var s = Math.floor(dt / 1e3); //Convert from ms to s
    $e("#" + divId).write("<h2> Redirecting to <ins>" + to + "</ins> ...<br />in <span id = 'timeleft'>" + s +"</span >s</h2>", true); //Write the Redirecting message to the screen
    s--; //Countdown
    $e("#timeleft").write(s);
    setTimeout("location = '" + to + "';", dt); //Set the timeout for the redirection
}

/**
 * @description Validity check
 * @param {string} txt Text
 * @param {string} type Type
 * @returns {boolean} Validity check result
 * @see module:DOM~validate
 * @since 1.0
 * @func
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
 * @see module:DOM~isValid
 * @since 1.0
 * @func
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
 * @description Get the HTML equivalent of the string
 * @param {string} str String
 * @returns {Code} HTML equivalent
 * @see module:DOM~unescapeHTML
 * @since 1.0
 * @func
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
 * @see module:DOM~escapeHTML
 * @since 1.0
 * @func
 */
function unescapeHTML (code) {
    var span = document.createElement("span");
    span.innerHTML = code;
    return span.innerText;
}

/**
 * @description Get all the resources of a page apart from the in-CSS ones
 * @param {boolean} rmEmpty Flag to remove empty resources from the list
 * @todo Maybe some specifications to filter up ? And also more info about those resources
 * @returns {Array} Resources
 * @since 1.0
 * @func
 */
function getResources (rmEmpty) {
    var links = $n("*link"), scripts = $n("*script"), rsc = [], hypertxt = $n("*a"), img = $n("*img"), btnImg = $n("*input image"),
        inCSS = [$n("*div"), $n("*section"), $n("*td"), $n("*th"), $n("*li")];
    for (var i = 0; i < links.length; i++) {
        if (!isNon(links[i])) rsc[i] = links[i].href;
        Essence.say(links[i].href.split("/")[links[i].href.split("/").length - 1] + " has been added to the resources getter.", "info");
    }
    for (i = 0; i < scripts.length; i++) {
        if (!isNon(scripts[i])) rsc.push(scripts[i].src);
        Essence.say(scripts[i].src.split("/")[scripts[i].src.split("/").length - 1] + " has been added to the resources getter.", "info")
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
 * @see module:DOM~gatherStylesheets
 * @todo Perhaps use document.scripts.toArray() instead ?
 * @since 1.0
 * @func
 */
function gatherScripts (asList) { //Sort of getResources() but dedicated to only scripts and easier to use
    var $s = $n("*script"), res = asList? []: {};
    for (var i = 0; i<$s.length; i++) asList? res.push($s[i].src): res[$s[i].src.split("/")[$s[i].src.split("/").length - 1]] = $s[i].src;
    return res
}

/**
 * @description Gather internal scripts.
 * @param {boolean} [format=false] Format to an easy-to-use array
 * @returns {Array} Internal scripts
 * @since 1.1
 * @func
 */
function gatherInternalScripts (format) {
    return format? document.scripts.toArray().filter(function (x) {
        return x.text != "";
    }).map(function (x) {
        return x.src;
    }): document.scripts.toArray().filter(function (x) {
        return x.text != "";
    });
}

/**
 * @description Gather external scripts.
 * @param {boolean} [format=false] Format to an easy-to-use array
 * @returns {Array} External scripts
 * @since 1.1
 * @func
 */
function gatherExternalScripts (format) {
    return format? document.scripts.toArray().filter(function (x) {
        return x.src != "";
    }).map(function (x) {
        return x.src;
    }): document.scripts.toArray().filter(function (x) {
        return x.src != "";
    });
}

/**
 * @description Get the list of stylesheets
 * @param {boolean} [asList=false] Result should be a list or an object
 * @returns {*} List/dictionary of stylesheets
 * @see module:DOM~gatherScripts
 * @since 1.0
 * @func
 */
function gatherStylesheets (asList) {
    var $l = $n("*link"), $s = $n("*style"), res = asList? []: {};
    for (var i = 0; i<$l.length; i++) asList? res.push($l[i].href): res[$l[i].href.split("/")[$l[i].href.split("/").length - 1]] = $l[i].href;
    for ( i = 0; i<$s.length; i++) asList? res.push($s[i].href): res[$s[i].href.split("/")[$s[i].href.split("/").length - 1]] = $s[i].href;
    return res
}

/**
 * @description Gather internal stylesheets.
 * @param {boolean} [format=false] Format to easy-to-use array
 * @returns {Array} Internal stylesheets
 * @since 1.1
 * @func
 */
function gatherInternalStylesheets (format) {
    return format? document.styleSheets.toArray().filter(function (x) {
        return x.ownerNode.tagName === "STYLE";
    }).map(function (x) {
        return x.href;
    }): document.styleSheets.toArray().filter(function (x) {
        return x.ownerNode.tagName === "STYLE";
    });
}

/**
 * @description Gather external stylesheets.
 * @param {boolean} [format=false] Format to easy-to-use array
 * @returns {Array} External stylesheets
 * @since 1.1
 * @func
 */
function gatherExternalStylesheets (format) {
    return format? document.styleSheets.toArray().filter(function (x) {
        return x.ownerNode.tagName === "LINK";
    }).map(function (x) {
        return x.href;
    }): document.styleSheets.toArray().filter(function (x) {
        return x.ownerNode.tagName === "LINK";
    });
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
    if (!id) id = "t";
    var tab = "<table id='" + id + "' style='" + style + "' cellspacing=0 cellpadding=2>" + (caption? "<caption>" + caption + "</caption>": "");
    for (var i = 0; i < rows.length; i++) {
        tab += "<tr>";
        if (split) {
            for(var j = 0; j < rows[i].length; j++) tab += "<td id='" + id + (isNon(cellIds)? i+"_"+j: cellIds[i][j]) + "'>" + rows[i][j] + "</td>";
        } else  tab += "<td id='" + id + (isNon(cellIds)? i: cellIds[i]) + "'>" + rows[i] + "</td>";
        tab += "</tr>";
    }
    tab += "</table><style>#"+ id + " table{background: #000;}#"+ id + " table, #"+ id + " td {border: 1px solid #000; color: #000; background: #fff;}#"+ id + " tr:nth-child(even) td{background: #ddd;}#"+ id + " tr td:hover{background: #bbb;}</style>";
    return tab
}

/**
 * @description Row HTML table
 * @param {NumberLike} caption Caption
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
    if (!id) id = "t";
    var tab = "<table id='" + id + "' style='" + style + "' cellspacing=0 cellpadding=2>" + (caption? "<caption>" + caption + "</caption>": "");
    //var rowspan = (headerRows.length <= rows.length)? rows.length/headerRows.length: headerRows.length/rows.length;
    //console.log(rowspan);
    for (var i = 0; i < rows.length; i++) {
        tab += headerRows? "<tr><th>" + headerRows[i] + "</th>": "<tr>";
        if (split) {
            for (var j = 0; j < rows[i].length; j++) {
                tab += "<td id='" + id + (isNon(cellIds)? i+"_"+j: cellIds[i][j]) + "'>" + rows[i][j] + "</td>";
            }
        } else tab += "<td id='" + id + (isNon(cellIds)? i: cellIds[i]) + "'>" + rows[i] + "</td>";
        tab += "</tr>";
    }
    tab += "</table><style>#"+ id + " table{background: #000;}#"+ id + " table, #"+ id + " td, #"+ id + " th{border: 1px solid #000; color: #000; background: #fff;}#"+ id + " tr:nth-child(even) td, #"+ id + " tr:nth-child(even) th{background: #ddd;}#"+ id + " tr td:hover, #"+ id + " tr th:hover{background: #bbb;}</style>";
    return tab
}

/**
 * @description Column HTML table
 * @param {NumberLike} caption Caption
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
    if (!id) id = "t";
    var tab = "<table id='" + id + "' style='" + style + "' cellspacing=0 cellpadding=2>" + (caption? "<caption>" + caption + "</caption>": "");
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
                tab += "<td id='" + id + (isNon(cellIds)? i+"_"+j: cellIds[i][j]) + "'>" + cols[i][j] + "</td>";
            }
        } else tab += "<td id='" + id + (isNon(cellIds)? i: cellIds[i]) + "'>" + cols[i] + "</td>";
        tab += "</tr>"
    }
    tab += "</table><style>#"+ id + " table{background: #000;}#"+ id + " table, #"+ id + " td, #"+ id + " th{border: 1px solid #000; color: #000; background: #fff;}#"+ id + " tr:nth-child(even) td{background: #ddd;}#"+ id + " tr td:hover{background: #bbb;}</style>";
    return tab
}

/**
 * @description Complex HTML table
 * @param {NumberLike} caption Caption
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
    if (!id) id = "t";
    var tab = "<table id='" + id + "' style='" + style + "' cellspacing=0 cellpadding=2>" + (caption? "<caption>" + caption + "</caption><tr><td></td>": "<tr><td></td>");
    for(var i = 0; i < headerCols.length; i++) tab += "<th>" + headerCols[i] + "</th>";
    tab += "</tr>";
    for (i = 0; i < rows.length; i++) {
        tab += (headerRows)? "<tr><th>" + headerRows[i] + "</th>": "<tr>";
        if (split) {
            for (var j = 0; j < rows[i].length; j++) {
                tab += "<td id='" + id + (isNon(cellIds)? i + "_" + j: cellIds[i][j]) + "'>" + rows[i][j] + "</td>";
            }
        } else tab += "<td id='" + id + (isNon(cellIds)? i: cellIds[i]) + "'>" + rows[i] + "</td></tr>";
        tab += "</tr>";
    }
    tab += "</table><style>#"+ id + " table{background: #000;}#"+ id + " table, #"+ id + " td, #"+ id + " th{border: 1px solid #000; color: #000; background: #fff;}#"+ id + " tr:nth-child(even) td{background: #ddd;}#"+ id + " tr td:hover{background: #bbb;}</style>";
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
    if (!id) id = "c";
    var tab = "<table id='" + id + "' style='" + style + "' cellspacing=0 cellpadding=2>" + (caption? "<caption>" + caption + "</caption>": "");
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
    tab += "</table><style>#"+ id + " table{background: #000;}#"+ id + " table, #"+ id + " td, #"+ id + " th{border: 1px solid #000; color: #000; background: #fff;}#"+ id + " tr:nth-child(even) td{background: #ddd;}#"+ id + " tr td:hover{background: #bbb;}</style>";
    return tab
}

/**
 * @description Compare two matrices and display a table with all the different elements of $b in regards to $a
 * @param {Array} a Matrix a
 * @param {Array} b Matrix b
 * @param {boolean} [toHTML=false] HTML output
 * @returns {*} Comparison table result
 * @since 1.0
 * @func
 * @throws {Error} Uncomparable matrices
 */
function tableCompare (a, b, toHTML) { //Compare two matrices and display a table with all the different elements
    if(a.size(true) != b.size(true)) throw new Error("You can't compare two matrices of different sizes");
    var res = Copy(a);
    for (var i = 0; i < res.length; i++) {
        for (var j = 0; j < res[i].length; j++) res[i][j] = (a[i][j] === b[i][j])? "": b[i][j];
    }
    toHTML? println(simpleTable("Comparison", res)): console.table(res);
    return res;
}

/**
 * @description (Ask to) bookmark a webpage
 * @param {string} url URL of the webpage
 * @param {string} title Title
 * @param {string} [elmId="body"] Element ID
 * @returns {undefined}
 * @since 1.0
 * @func
 */
function addFav (url, title, elmId) {
    var place = elmId? "#" + elmId: "body";
    if (navigator.appName.substring(0, 3) === "Mic" && navigator.appVersion.substring(0, 1) >= 4) $e(place).write("<a href=\"#\" onClick=\"window.external.AddFavorite(" + url + ", " + title + ");return false;\">Bookmark this webpage</a><br />", true);
    else $e(place).write("Press CTRL + D to add this webpage to your bookmarks!", true)
}

/**
 * @description Browser check.<br />
 * Source: somewhere
 * @returns {checkBrowser} Browser check
 * @this checkBrowser
 * @since 1.0
 * @constructor
 */
function checkBrowser () {
    this.ver = navigator.appVersion;
    this.dom = document.getElementById? 1: 0;
    this.ie5 = (this.ver.has("MSIE 5") && this.dom)? 1: 0;
    this.ie4 = (document.all && !this.dom)? 1: 0;
    this.ns5 = (this.dom && parseInt(this.ver) >= 5)? 1: 0;
    this.ns4 = (document.layers && !this.dom)? 1: 0;
    this.bw = (this.ie5 || this.ie4 || this.ns4 || this.ns5);
    return this
}

/**
 * @description Browser detection system.<br />
 * Source: somewhere
 * @type {{init: BrowserDetect.init, searchString: BrowserDetect.searchString, searchVersion: BrowserDetect.searchVersion, dataBrowser: Array, dataOS: Array, info: BrowserDetect.info}}
 * @since 1.0
 * @global
 * @property {Function} BrowserDetect.init Initializer
 * @property {function(Object): Object} BrowserDetect.searchString String search
 * @property {function(string): number} BrowserDetect.searchVersion Version search
 * @property {Object[]} BrowserDetect.dataBrowser Browser data
 * @property {Object[]} BrowserDetect.dataOS OS data
 * @property {function(): string} BrowserDetect.info Information about the browser
 */
var BrowserDetect = { //Browser detection system
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "Unknown browser";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "xx.yy";
        this.OS = this.searchString(this.dataOS) || "Unknown OS";
    },
    searchString: function (data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string, dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.has(data[i].subString)) return data[i].identity
            }else if (dataProp) return data[i].identity
        }
    },
    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index === -1) return;
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
        string: navigator.userAgent, subString: "Android", identity: "HTC/Samsung/LG/Nexus"
    }, {
        string: navigator.userAgent, subString: "BlackBerry", identity: "BlackBerry"
    }, {
        string: navigator.platform, subString: "Linux", identity: "Linux"
    }],
    info: function () {
        return this.browser + "/" + this.version + " (" + this.OS + ")";
    }
};

/**
 * @description Type a message
 * @param {string} msg Message
 * @param {Element|string} where Place to type the message
 * @param {boolean} [HTML=false] HTML flag
 * @returns {undefined}
 * @see module:DOM~writeMsg2
 * @since 1.0
 * @func
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
 * @param {number} [delay=150] Inter-character delay
 * @param {string} [txt=""] Text
 * @param {number} [pos=0] Position
 * @returns {undefined}
 * @see module:DOM~writeMsg
 * @since 1.0
 * @func
 */
function writeMsg2 (msg, slc, HTML, delay, txt, pos) {
    if(!txt) txt = "";
    if(!pos) pos = 0;
    if (pos < msg.length + 10) {
        txt = msg.substring(pos, 0);
        HTML? $n(slc).innerHTML = txt: $n(slc).innerText = txt;
        pos++;
        setTimeout("writeMsg2('" + msg + "', '" + slc + "', " + HTML + ", " + delay + ", '" + txt + "', " + pos + ")", delay || 150);
    }
}

/**
 * @description Templating + conversion
 * @param {string} [name="Template"] Name
 * @param {string} [txt=""] Text/code containing the {{params}}
 * @param {string[]} [params=["tab", "date", "time", "timestamp", "br"]] Parameters
 * @param {boolean} [consoleSpecial=false] Resulting text formatted to the console
 * @constructor
 * @this {Template}
 * @returns {Template} Template
 * @since 1.0
 * @func
 * @property {string} Template.name Name
 * @property {string} Template.path Path (for saving)
 * @property {string[]} Template.params Parameters (in {{...}})
 * @property {string[]} Template.special Special parameters
 * @property {string[]} Template.specialEq Special parameters equivalence
 * @property {string} Template.text Raw text/code containing the parameters
 * @property {function(Object): (Code)} Template.gen Text/code generator
 * @property {function(Object, string, string)} Template.save Save the generated text/code in the specified path
 */
function Template (name, txt, params, consoleSpecial) {
    this.name = name || "Template";
    this.path = this.name + ".jst";
    this.params = params || ["name", "description", "version", "title", "path"]; //{{params}}
    this.special = ["tab", "date", "time", "timestamp", "br"]; //%special%
    this.specialEq = ["&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", getDate(), getTime(true), getTimestamp(true), "<br />"];
    if (consoleSpecial) {
        this.specialEq[0] = "\t";
        this.specialEq[4] = "\n";
    }
    this.text = txt || ""; //Text/code containing the {{params}}
    this.gen = function (obj) { //Generate a text/code from the template using the keys of the object
        var res = this.text, k = keyList(obj, true);
        for(var i = 0; i < k.length; i++) res = res.replace(RegExpify("{{" + k[i] + "}}"), obj[k[i]]);
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
 * @description Remove (X)HTML tags
 * @param {string} str String with potential tags
 * @returns {string} Tagless string
 * @since 1.0
 * @func
 */
function stripTags (str) {
    return str.replace(/<[\s\S]+>(.*?)<\/[\s\S]+>/, "$1")
}

/**
 * @description Make tabs up
 * @param {number} [n=1] Number of tabs
 * @returns {string} Tabs
 * @func
 * @since 1.1
 */
function tabs (n) {
    return "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".repeat(n || 1);
}

/**
 * @description A Document templating system that will change the DOM with the use of data-* attributes or {{*}}
 * @global
 * @type {{attrs: string[], assoc: Array, get: DocTemplate.get, getAll: DocTemplate.getAll, getVal: DocTemplate.getVal, getValAll: DocTemplate.getValAll, associate: DocTemplate.associate, associateAll: DocTemplate.associateAll, template: Template, deMustache: DocTemplate.deMustache}}
 * @since 1.1
 * @this DocTemplate
 * @property {string[]} DocTemplate.attrs Attributes (either preceded by data- attributes in HTML elements or between {{ and }})
 * @property {Array} DocTemplate.assoc Associations What the templating system is going to use to associate/change the elements with data-[attr] or the {{attr}} strings
 * @property {function(Str, *)} DocTemplate.add Add attribute(s)/association(s) pairs
 * @property {function(string, boolean): (Array|NodeList)} DocTemplate.get Get the HTML elements with the attribute data-[<code>attrName</code>]
 * @property {function(boolean): (Array[]|NodeList[])} DocTemplate.getAll Get All the HTML elements with a data-* attribute
 * @property {function(string): Array} DocTemplate.getVal Get the values of the data-[<code>attrName</code>] attributes
 * @property {function(): Array} DocTemplate.getVallAll Get all the values of the data-[attr] attributes
 * @property {function(string, boolean)} DocTemplate.associate Place the corresponding association (in <code>DocTemplate.assoc</code>) in the HTML element's inner value
 * @property {function(boolean)} DocTemplate.associateAll Place the associations (in <code>DocTemplate.assoc</code>) in the HTML element's inner values
 * @property {Template} DocTemplate.template Mustache template (<span style='color: red;'>warning: This might mess up some JS generated HTML content</span>)
 * @property {Function} DocTemplate.deMustache Change all the mustached variables in the HTML body
 */
var DocTemplate = {
    attrs: ["lorem", "greet", "date", "time", "timestamp", "essence"],
    assoc: [$G["lorem"], "Welcome !", getDate(), getTime(true), getTimestamp(true), "EssenceJS v" + Essence.version],
    add: function (attr, assoc) {
        isType(attr, "Array")? this.attrs.append(attr): this.attrs.push(attr);
        isType(assoc, "Array")? this.assoc.append(assoc): this.assoc.push(assoc);
    },
    get: function (attrName, toArr) {
        return toArr? $n("*[data-" + attrName + "]").toArray(): $n("*[data-" + attrName + "]");
    },
    getAll: function (oneDim) {
        var nodeLists = this.attrs.map(function (a) {
            return $n("*[data-" + a + "]");
        });
        return oneDim? nodeLists.map(function (nodeList) {
            return nodeList.toArray();
        }): nodeLists;
    },
    getVal: function (attrName) {
        return this.get(attrName, true).map(function (node) {
            return node.getAttribute("data-" + attrName);
        })
    },
    getValAll: function () {
        var pos = -1;
        return this.getAll(true).map(function (nodeList) {
            pos++;
            return nodeList.map(function (node) {
                return node.getAttribute("data-" + DocTemplate.attrs[pos]);
            });
        })
    },
    associate: function (attrName, html) {
        var self = this;
        this.get(attrName, true).map(function (node) {
            html? node.innerHTML = self.assoc[self.attrs.indexOf(attrName)]: node.innerText = self.assoc[self.attrs.indexOf(attrName)];
        })
    },
    associateAll: function (html) {
        var self = this;
        for (var i = 0; i < this.attrs.length; i++) {
            this.get(this.attrs[i], true).map(function (node) {
                html? node.innerHTML = self.assoc[i]: node.innerText = self.assoc[i];
            })
        }
    },
    template: new Template("DocTemplate", $e("body").val(true), this.attrs),
    deMustache: function () {
        $e("body").write(this.template.gen(Objectify(this.attrs, this.assoc)), true);
    }
};