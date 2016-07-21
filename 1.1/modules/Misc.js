/**
 * @module Misc
 * @description Miscellaneous stuff
 * @version 1.0
 * @since 1.1
 * @license MIT
 * @author Maximilian Berkmann <maxieberkmann@gmail.com>
 * @copyright Maximilian Berkmann 2016
 * @requires ../essence
 * @namespace
 * @type {{name: string, version: number, run: Misc.run, description: string, dependency: Array, author: string, complete: boolean}}
 * @since 1.1
 * @exports Misc
 */
var Misc = {
    name: "Misc",
    version: 1,
    run: function () {

    },
    description: "Miscellaneous",
    dependency: ["File"],
    author: "Maximilian Berkmann",
    complete: false,
    toString: function () {
        return "Module(name='" + this.name + "', version=" + this.version + ", description='" + this.description + "', author='" + this.author + "', complete=" + this.complete + ", run=" + this.run + ")";
    }
};

(function () {
    Misc.complete = true;
})();

/**
 * @description ASCII table
 * @param {NumberLike} [start=0] Starting decimal code
 * @param {number} [end=255] Ending decimal code
 * @returns {Array} ASCII table
 * @since 1.0
 * @func
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
 * @description A person
 * @param {string} fname First name
 * @param {string} sname Second name
 * @param {string} lname Last name
 * @param {string} title Title
 * @param {string} nickname Nickname
 * @param {NumberLike} [num="none"] Phone number
 * @param {string} country Country
 * @param {string} city City
 * @param {string} [sex="other"] Sex
 * @param {string} bday="01/01/2000" Birth date
 * @param {Str} [jobs="unemployed"] Job(s)
 * @param {Str} [activities="none"] Activitie(s)
 * @param {Str} [websites="none"] Website(s)
 * @param {string} [quote=""] Quote
 * @returns {Person} Person
 * @todo Making sure that getName() doesn't come up in this.toString()
 * @this Person
 * @constructor
 * @since 1.0
 * @func
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
 * @since 1.0
 * @func
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
        dest.remove(this)
    };
    this.toString = function () {
        var str = "";
        for (var p in this) {
            if (this.hasOwnProperty(p) && p != "toString" && !isType(p, "function")) str += p + "=" + this[p] + ", ";
        }
        return str.substring(0, str.length-2)
    };
    return this
}

/**
 * @description Letter pair array
 * @param {string} [first="a"] First letter
 * @param {string} [last="z"] Last letter
 * @returns {Array} Letter pair array
 * @since 1.0
 * @func
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
 * @description Remove the consecutive duplicated values in an array
 * @param {Array} arr Array
 * @returns {Array} Filtered array
 * @see rmDuplicates
 * @since 1.0
 * @func
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
 * @since 1.0
 * @func
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
 * @description Base64
 * @type {{PADCHAR: string, ALPHA: string, getbyte64: base64.getbyte64, decode: base64.decode, getbyte: base64.getbyte, encode: base64.encode}}
 * @source Somewhere
 * @global
 * @since 1.0
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
 * @since 1.0
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
 * @param {NumberLike|boolean} [prefix] Prefix
 * @returns {Memory} Memory
 * @this {Memory}
 * @constructor
 * @since 1.0
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
 * @since 1.0
 * @func
 */
function EvtShow (evt) {
    alert("\tName: " + evt.name + "\nsource: " + evt.source + "\ndata: " + evt.data + "\ntarget: " + evt.target + "\ntime stamp: " + evt.timeStamp)
}

/**
 * @description Event console log
 * @param {Event} event Event
 * @returns {undefined}
 * @since 1.0
 * @func
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
 * @param {string} fname Filename
 * @param {number} lineNum Line number
 * @constructor
 * @returns {InvalidParamError} Error
 * @extends {Error}
 * @this {InvalidParamError}
 * @since 1.0
 */
function InvalidParamError(msg, fname, lineNum) { //Invalid parameter
    this.name = "Invalid parameter error";
    this.fileName = fname;
    this.lineNumber = lineNum;
    this.message = msg || "The parameter used at " + this.lineNumber + " is invalid !";
    this.stack = (new Error()).stack;

    return this;
}

/**
 * @description Get the caller's trace's location
 * @returns {string} Trace location
 * @since 1.0
 * @func
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
 * @since 1.0
 * @func
 */
function getLineNum (noCols) {
    return noCols ? getTrace().split(":")[1] : getTrace().get(getTrace().indexOf(":") + 1).remove(")");
}


/**
 * @description Test an error
 * @param {Error} err Error
 * @returns {undefined}
 * @since 1.0
 * @func
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
 * @since 1.0
 * @func
 */
function noobTest (fx, param) { //Source: https://scontent-lhr3-1.xx.fbcdn.net/hphotos-xfl1/v/t1.0-9/12705609_1071795346206130_3757520485028328706_n.jpg?oh = cb99a4624d9732414b787f7eb8437c73&oe = 57383223
    try {
        fx(param);
    } catch(e) {
        location.href = "http://Stackoverflow.com/search?q=[js]+" + e.message;
    }
}

/**
 * @description System (a bit like in Java)
 * @type {{in: {recording: boolean, record: Sys.in.record, startRecording: Sys.in.startRecording, stopRecording: Sys.in.stopRecording, data: Array}, log: Sys.log, debug: Sys.debug, out: Sys.out, toString: Sys.toString}}
 * @global
 * @since 1.0
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
    debug: function (cb) {
        this.log("Debugging: " + cb.name);
        console.group();
        console.time("debug");
        cb(Array.from(arguments).get(1));
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
 * @param {*} keyStroke Keystroke
 * @returns {undefined}
 * @since 1.0
 * @func
 */
window.onkeypress = function (keyStroke) {
    Sys.in.record(keyStroke);
    $G["lastKeyPair"] = getKey(keyStroke);
};

/**
 * @description Typing recorder
 * @deprecated
 * @param {Function} [cb] Callback
 * @returns {string} Recorded keystrokes
 * @ignore
 * @see Sys
 * @since 1.0
 * @func
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
 * @description Turn a string into a RegExp
 * @param {string} str String
 * @returns {RegExp} Resulting regular expression
 * @see unRegExpify
 * @since 1.0
 * @func
 */
function RegExpify (str) {
    return new RegExp(str.replace(/[|\\{}()[\]^$+*?.:\'<>%]/g, "\\$&"), "gm");
}

/**
 * @description Turn a RegExp into a string
 * @param {RegExp} re RegExp
 * @returns {string|Array} Resulting string
 * @see RegExpify
 * @since 1.0
 * @func
 */
function unRegExpify (re) { //Turn a regular expression into a string
    return re.toString().get(1, re.toString().lastIndexOf("/") - 1).remove("\\");
}

/**
 * @description Join two arrays into an object
 * @param {Array} keyArr Key array
 * @param {Array} valArr Value array
 * @returns {{}} Resulting object
 * @since 1.0
 * @func
 */
function Objectify (keyArr, valArr) {
    var res = {};
    for (var i = 0; i < keyArr.length; i++) {
        res[keyArr[i]] = valArr[i];
    }
    return res;
}

/**
 * @description Name of a type to the type itself
 * @param {string} name Name
 * @param {*} [param] Parameters/value
 * @returns {*} Type
 * @since 1.0
 * @func
 */
function name2type(name, param) {
    switch(name) {
        case "Number": return Number(param, arguments.toArray().get(2));
        case "String": return String(param, arguments.toArray().get(2));
        case "Boolean": return Boolean(param, arguments.toArray().get(2));
        case "Function": return Function(param, arguments.toArray().get(2));
        case "Object": return Object(param, arguments.toArray().get(2));
        case "Date": return Date(param, arguments.toArray().get(2));
        /* eslint no-array-constructor: 0 */
        case "Array": return Array(param, arguments.toArray().get(2));
        case "RegExp": return RegExp(param, arguments.toArray().get(2));
        case "Error": return Error(param, arguments.toArray().get(2));
        case "File": return File(param, arguments.toArray().get(2));
        case "URL": return URL(param, arguments.toArray().get(2));
        case "FileReader": return FileReader(param, arguments.toArray().get(2));
        case "FileWriter": return FileWriter(param, arguments.toArray().get(2));
        case "Blob": return Blob(param, arguments.toArray().get(2));
        case "Element": return Element(param, arguments.toArray().get(2));
        case "Person": return Person(param, arguments.toArray().get(2));
        case "Item": return Item(param, arguments.toArray().get(2));
        case "Colour": return Colour(param, arguments.toArray().get(2));
        case "LinkedList": return LinkedList(param, arguments.toArray().get(2));
        case "TreeNode": return TreeNode(param, arguments.toArray().get(2));
        case "Node": return Node(param, arguments.toArray().get(2));
        case "PathNode": return PathNode(param, arguments.toArray().get(2));
        case "NTreeNode": return NTreeNode(param, arguments.toArray().get(2));
        case "Set": return Set(param, arguments.toArray().get(2));
        case "SortedSet": return SortedSet(param, arguments.toArray().get(2));
        case "Stack": return Stack(param, arguments.toArray().get(2));
        case "StackArray": return Stack(param, arguments.toArray().get(2));
        case "StackList": return StackList(param, arguments.toArray().get(2));
        case "Queue": return Queue(param, arguments.toArray().get(2));
        case "QueueArray": return QueueArray(param, arguments.toArray().get(2));
        case "QueueList": return QueueList(param, arguments.toArray().get(2));
        case "Shape": return Shape(param, arguments.toArray().get(2));
        case "Box": return Box(param, arguments.toArray().get(2));
        case "AABB": return AABB(param, arguments.toArray().get(2));
        case "Circ": return Circ(param, arguments.toArray().get(2));
        case "Pt": return Pt(param, arguments.toArray().get(2));
        case "Line": return Line(param, arguments.toArray().get(2));
        case "Vector": return Vector(param, arguments.toArray().get(2));
        case "Polygon": return Polygon(param, arguments.toArray().get(2));
        case "database": return database(param, arguments.toArray().get(2));
        case "process": return process(param, arguments.toArray().get(2));
        case "server": return server(param, arguments.toArray().get(2));
        case "Archive": return Archive(param, arguments.toArray().get(2));
        case "Machine": return Machine(param, arguments.toArray().get(2));
        case "Memory": return Memory(param, arguments.toArray().get(2));
        case "WebPage": return WebPage(param, arguments.toArray().get(2));
        case "WebApp": return WebApp(param, arguments.toArray().get(2));
        case "virtualHistory": return virtualHistory(param, arguments.toArray().get(2));
        case "Editor": return Editor(param, arguments.toArray().get(2));
        case "Preview": return Preview(param, arguments.toArray().get(2));
        case "Debugger": return Debugger(param, arguments.toArray().get(2));
        case "Parser": return Parser(param, arguments.toArray().get(2));
        case "Toolbar": return Toolbar(param, arguments.toArray().get(2));
        case "IDE": return IDE(param, arguments.toArray().get(2));
        case "Template": return Template(param, arguments.toArray().get(2));
        case "Stream": return Stream(param, arguments.toArray().get(2));
        case "MultiStream": return MultiStream(param, arguments.toArray().get(2));
        default: return name;
    }
}

/* eslint no-array-constructor: 2 */
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
 * @since 1.0
 * @func
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
 * @returns {Array} Dictionary
 * @since 1.0
 * @func
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
 * @description Convert an array into a human string
 * @param {Array} arr Array
 * @param {string} [cjt="and"] Conjunctions
 * @returns {string} Literal
 * @since 1.0
 * @func
 */
function arrayLiteral (arr, cjt) {
    return arr.length > 1? arr.get(-1).toStr(true) + " " + (cjt || "and") + " " + arr.last(): arr[0];
}