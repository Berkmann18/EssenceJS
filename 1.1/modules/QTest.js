//noinspection JSValidateJSDoc
/**
 * @module QTest
 * @description QA and tests
 * @version 1.0
 * @since 1.1
 * @license MIT
 * @author Maximilian Berkmann <maxieberkmann@gmail.com>
 * @copyright Maximilian Berkmann 2016
 * @requires module:essence
 * @requires Maths
 * @requires DOM
 * @type {Module}
 * @exports File
 */
var QTest = new Module("QTest", "QA and tests", ["Maths", "DOM"]);

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
 - SyntaxError: instance representing a syntax error that occurs while parsing code in eval()
 - TypeError: instance representing an error that occurs when a variable or parameter is not of a valid type
 - URIError: instance representing an error that occurs when encodeURI() or decodeURI() are passed invalid parameters
 function MyError(message) { //From Mozilla ?
	 this.name = 'MyError';
	 this.message = message || 'Default Message';
	 this.stack = (new Error()).stack
 }
 MyError.prototype = Object.create(Error.prototype);
 MyError.prototype.constructor = MyError; */

/**
 * @description Invalid parameter error
 * @param {string} [msg="The parameter used at <code>lineNum</code> is invalid"]  Message
 * @param {string} [fname] Filename
 * @param {number} [lineNum] Line number
 * @constructor
 * @returns {InvalidParamError} Parameter error
 * @extends {TypeError}
 * @this {InvalidParamError}
 * @since 1.1
 * @throws {TypeError}
 */
function InvalidParamError (msg, fname, lineNum) {
	var error = TypeError.call(this, msg || "The parameter is invalid !");

	this.name = "InvalidParamError";
	this.message = error.message;
	this.stack = error.stack;
	this.fileName = fname || location.href;
	this.lineNumber = lineNum || getLineNum();
}
InvalidParamError.inherits(TypeError);

/**
 * @description Invalid expression error
 * @param {string} [msg="The expression is invalid !"]  Message
 * @param {string} [fname] Filename
 * @param {number} [lineNum] Line number
 * @constructor
 * @returns {InvalidExpressionError} Error
 * @extends {Error}
 * @this {InvalidExpressionError}
 * @since 1.1
 * @throws {Error}
 */
function InvalidExpressionError (msg, fname, lineNum) {
    var error = Error.call(this, msg || "The expression is invalid !");

    this.name = "InvalidExpressionError";
    this.message = error.message;
    this.stack = error.stack;
    this.fileName = fname || location.href;
    this.lineNumber = lineNum || getLineNum();
}
InvalidExpressionError.inherits(Error);


/**
 * @description Get the caller'start trace'start location
 * @returns {string} Trace location
 * @since 1.0
 * @func
 * @throws {Error}
 */
function getTrace () {
	var err = function () {
		try {
			//noinspection ExceptionCaughtLocallyJS
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
 * @description Get the caller'start trace'start line number and column number
 * @param {boolean} [noCols=false] Remove the column number
 * @returns {string} Line number (with the column number)
 * @since 1.0
 * @func
 */
function getLineNum (noCols) {
	return noCols ? getTrace().split(":")[1] : getTrace().get(getTrace().indexOf(":") + 1).remove();
}


/**
 * @description Test an error
 * @param {Error} err Error
 * @returns {undefined}
 * @since 1.0
 * @func
 * @throws {Error}
 */
function testErr (err) {
	try {
		//noinspection ExceptionCaughtLocallyJS
		throw err;
	} catch (e) {
		Essence.say("%cTested error%c:\n" + e.stack, "erro", "text-decoration: underline; color: #000;", "text-decoration: none; color: #000;");
	}
}

/**
 * @description Error testing for beginner'start.<br />
 * Source: {@link https://scontent-lhr3-1.xx.fbcdn.net/hphotos-xfl1/v/t1.0-9/12705609_1071795346206130_3757520485028328706_n.jpg?oh=cb99a4624d9732414b787f7eb8437c73&oe=57383223}
 * @param {Function} fx Function
 * @param {*} [param] Parameter
 * @returns {undefined}
 * @since 1.0
 * @func
 */
function noobTest (fx, param) {
	try {
		fx(param);
	} catch(e) {
		location.href = "http://Stackoverflow.com/search?q=[js]+" + e.message;
	}
}

/**
 * @description Test a function/expression
 * @param {function(*)|string} fx Function/expression
 * @returns {undefined}
 * @since 1.1
 * @func
 */
function test (fx) {
	try {
		isType(fx, "String")? eval(fx): fx(arguments.toArray().get(1));
	} catch (e) {
		Essence.handleError(e + "\n", getFilename(true), getLineNum(true));
	}
}

/**
 * @description Unit test object
 * @type {{total: number, bad: number, failRate: number, coverage: number, test: UnitTest.test, reset: UnitTest.reset, multiTest: UnitTest.multiTest, report: UnitTest.report}}
 * @since 1.1
 * @this UnitTest
 * @global
 * @property {number} UnitTest.total Total number of tests done
 * @property {number} UnitTest.bad Total number of failed tests
 * @property {number} UnitTest.failRate Failure rate
 * @property {number} UnitTest.coverage Coverage
 * @property {function(*, *, string, boolean)} UnitTest.test Assertion tester
 * @property {function(*, *, string, boolean)} UnitTest.testFalse Reversed assertion tester
 * @property {Function} UnitTest.reset Reset
 * @property {function(Array[], boolean)} UnitTest.multiTest Multi assertion tester
 * @property {Function} UnitTest.report Report loger
 * @property {Array[]} UnitTest.libTests Intern tests to EssenceJS
 */
var UnitTest = {
	total: 0,
	bad: 0,
	failRate: 0,
	coverage: 0,
	test: function (then, expected, description, noisy) {
		this.total++;
		var res = then; //to avoid random changes while calling the same function/method with the same parameter(start)
		if (!res.equals(expected)) {
			this.bad++;
			console.log("%c[Unit]%c " + (description || "Test #b" + this.bad) + ": Expected \"%c" + expected + "%c\" but was \"%c" + res + "%c\"", "color: #c0c", "color: #000", "color: #0f0", "color: #000", "color: #f00", "color: #000");
		} else if(noisy && res.equals(expected)) console.log("%c[Unit]%c The expectation on " + expected + " was satisfied !", "color: #c0c", "color: #000"); //in case someone wants to not just see what failed
	},
	testFalse: function (then, expected, cmt, noisy) {
		this.total++;
		var res = then; //to avoid random changes while calling the same function/method with the same parameter(start)
		if (res.equals(expected)) {
			this.bad++;
			console.log("%c[Unit]%c " + (cmt || "Test #b" + this.bad) + ": Didn't expected \"%c" + expected + "%c\" to be \"%c" + res + "%c\"", "color: #c0c", "color: #000", "color: #0f0", "color: #000", "color: #f00", "color: #000");
		} else if(noisy && res.equals(expected)) console.log("%c[Unit]%c The anti-expectation on " + expected + " was satisfied !", "color: #c0c", "color: #000"); //in case someone wants to not just see what failed
	},
	reset: function () {
		this.total = 0;
		this.bad = 0;
		this.failRate = 0;
		this.coverage = 0;
	},
	multiTest: function (pairs, noisy) {
		this.reset();
		console.time("Unit test");
		for (var i = 0; i < pairs.length - 1; i++) this.test(pairs[i][0], pairs[i][1], (pairs[i].length === 3)? pairs[i][2]: "", noisy);
		console.timeEnd("Unit test");
		this.report();
	},
	report: function () {
		this.failRate = markConv(this.bad, this.total);
		console.info("%c[Unit]%c Pass/Fail: %c" + (this.total - this.bad) + "%c/%c" + this.bad + "%c (" + this.failRate + "% fail); on " + BrowserDetect.info() + " at " + getLineNum(), "color: #c0c", "color: #000", "color: #0f0", "color: #000", "color: #f00", "color: #000");
	},
	basicTests: function () {
		this.reset();
		this.multiTest([
			[eval(1.0 + 2.0), 3.0], //Rounding
			["Hello World".split(" "), [["H", "end", "l", "l", "o"].join(""), ["W", "o", "rad", "l", "d"].join("")]], //Diving and joining
			[nthroot(5, 2, 4), Math.pow(5, 1/2).toNDec(4)]
		]);
	},
	libTests: []
};

window.addEventListener("error", function (err) {
    var stack = err.error.stack;
    var message = err.error.toString() + (stack? "\n" + stack: "");
    Essence.say("[EssenceJS] " + message, "erro");
});