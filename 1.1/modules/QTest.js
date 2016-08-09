<<<<<<< HEAD
/**
 * @module QTest
 * @description QA and tests
 * @version 1.0
 * @since 1.1
 * @license MIT
 * @author Maximilian Berkmann <maxieberkmann@gmail.com>
 * @copyright Maximilian Berkmann 2016
 * @requires ../essence
 * @requires Maths
 * @requires DOM
 * @namespace
 * @type {{name: string, version: number, run: QTest.run, description: string, dependency: Array, author: string, complete: boolean}}
 * @since 1.1
 * @exports File
 */
var QTest = {
    name: "QTest",
    version: 1,
    run: function () {

    },
    description: "QA and tests",
    dependency: ["Maths", "DOM"],
    author: "Maximilian Berkmann",
    complete: false,
    toString: function () {
        return "Module(name='" + this.name + "', version=" + this.version + ", description='" + this.description + "', author='" + this.author + "', complete=" + this.complete + ", run=" + this.run + ")";
    }
};

(function () {
    QTest.complete = true;
})();

/* eslint no-undef: 0 */

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
 * @source {@link https://scontent-lhr3-1.xx.fbcdn.net/hphotos-xfl1/v/t1.0-9/12705609_1071795346206130_3757520485028328706_n.jpg?oh=cb99a4624d9732414b787f7eb8437c73&oe = 57383223}
 */
function noobTest (fx, param) {
    try {
        fx(param);
    } catch(e) {
        location.href = "http://Stackoverflow.com/search?q=[js]+" + e.message;
    }
}

/**
 * @description Unit test object
 * @type {{total: number, bad: number, failRate: number, coverage: number, test: UnitTest.test, reset: UnitTest.reset, multiTest: UnitTest.multiTest, report: UnitTest.report}}
 * @since 1.1
 * @this UnitTest
 */
var UnitTest = {
    total: 0,
    bad: 0,
    failRate: 0,
    coverage: 0,
    test: function (then, expected, noisy) {
        this.total++;
        var res = then; //to avoid random changes while calling the same function/method with the same parameter(s)
        if (!res.equals(expected) || res !== expected) {
            this.bad++;
            console.log("[Unit] Expected " + expected + " but was " + res);
        } else if(noisy && res.equals(expected)) console.log("[Unit] The expection on " + expected + "was satisfied !"); //in case someone wants to not just see what failed
    },
    reset: function () {
        this.total = 0;
        this.bad = 0;
        this.failRate = 0;
        this.coverage = 0;
    },
    multiTest: function (pairs) {
        this.reset();
        console.time("Unit test");
        for (var i = 0; i < pairs.length - 1; i += 1) this.test(pairs[i], pairs[i + 1]);
        console.timeEnd("Unit test");
        this.report();
    },
    report: function () {
        this.failRate = markConv(this.bad, this.total);
        console.info("[Unit] Pass/Fail: " + (this.total - this.bad) + "/" + this.bad + " (" + this.failRate + "%); on " + BrowserDetect.info());
    },
=======
/**
 * @module QTest
 * @description QA and tests
 * @version 1.0
 * @since 1.1
 * @license MIT
 * @author Maximilian Berkmann <maxieberkmann@gmail.com>
 * @copyright Maximilian Berkmann 2016
 * @requires ../essence
 * @requires Maths
 * @requires DOM
 * @namespace
 * @type {{name: string, version: number, run: QTest.run, description: string, dependency: Array, author: string, complete: boolean}}
 * @since 1.1
 * @exports File
 */
var QTest = {
    name: "QTest",
    version: 1,
    run: function () {

    },
    description: "QA and tests",
    dependency: ["Maths", "DOM"],
    author: "Maximilian Berkmann",
    complete: false,
    toString: function () {
        return "Module(name='" + this.name + "', version=" + this.version + ", description='" + this.description + "', author='" + this.author + "', complete=" + this.complete + ", run=" + this.run + ")";
    }
};

(function () {
    QTest.complete = true;
})();

/* eslint no-undef: 0 */

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
 * @source {@link https://scontent-lhr3-1.xx.fbcdn.net/hphotos-xfl1/v/t1.0-9/12705609_1071795346206130_3757520485028328706_n.jpg?oh=cb99a4624d9732414b787f7eb8437c73&oe = 57383223}
 */
function noobTest (fx, param) {
    try {
        fx(param);
    } catch(e) {
        location.href = "http://Stackoverflow.com/search?q=[js]+" + e.message;
    }
}

/**
 * @description Unit test object
 * @type {{total: number, bad: number, failRate: number, coverage: number, test: UnitTest.test, reset: UnitTest.reset, multiTest: UnitTest.multiTest, report: UnitTest.report}}
 * @since 1.1
 * @this UnitTest
 */
var UnitTest = {
    total: 0,
    bad: 0,
    failRate: 0,
    coverage: 0,
    test: function (then, expected, noisy) {
        this.total++;
        var res = then; //to avoid random changes while calling the same function/method with the same parameter(s)
        if (!res.equals(expected) || res !== expected) {
            this.bad++;
            console.log("[Unit] Expected " + expected + " but was " + res);
        } else if(noisy && res.equals(expected)) console.log("[Unit] The expection on " + expected + "was satisfied !"); //in case someone wants to not just see what failed
    },
    reset: function () {
        this.total = 0;
        this.bad = 0;
        this.failRate = 0;
        this.coverage = 0;
    },
    multiTest: function (pairs) {
        this.reset();
        console.time("Unit test");
        for (var i = 0; i < pairs.length - 1; i += 1) this.test(pairs[i], pairs[i + 1]);
        console.timeEnd("Unit test");
        this.report();
    },
    report: function () {
        this.failRate = markConv(this.bad, this.total);
        console.info("[Unit] Pass/Fail: " + (this.total - this.bad) + "/" + this.bad + " (" + this.failRate + "%); on " + BrowserDetect.info());
    },
>>>>>>> 4dd0ddfc485b6426448ba21d404b62492c783a9b
};