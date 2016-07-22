/**
 * @module Ajax
 * @description AJAX module for AJAX stuff
 * @version 1.0
 * @since 1.1
 * @license MIT
 * @author Maximilian Berkmann <maxieberkmann@gmail.com>
 * @copyright Maximilian Berkmann 2016
 * @requires ../essence
 * @namespace
 * @type {{name: string, version: number, run: Ajax.run, description: string, dependency: Array, author: string, complete: boolean}}
 * @since 1.1
 * @exports Ajax
 */
var Ajax = {
    name: "Ajax",
    version: 1,
    run: function () {

    },
    description: "AJAX stuff",
    dependency: [],
    author: "Maximilian Berkmann",
    complete: false,
    toString: function () {
        return "Module(name='" + this.name + "', version=" + this.version + ", description='" + this.description + "', author='" + this.author + "', complete=" + this.complete + ", run=" + this.run + ")";
    }
};

(function () {
    Ajax.complete = true
})();

/**
 * @description HTTP GET request. Equivalent to parseURL($name, function (x) {this = x})
 * @param {string} name Name of the key
 * @returns {string} Value of the key
 * @since 1.0
 * @func
 */
function GET (name) { //HTTP GET request, method <=> parseURL(name, function (x) {this = x})
    if (name === (new RegExp("[?&]" + encodeURIComponent(name) + "=([^&]*)")).exec(location.search)) return decodeURIComponent(name[1]);
}

/**
 * @description HTTP POST request
 * @param {string} path Path of the file to post to
 * @param {Object} params Parameters
 * @source StackOverflow
 * @returns {undefined}
 * @since 1.0
 * @func
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
 * @since 1.0
 * @func
 */
function PUT () {

}

/**
 * @description HTTP DELETE request
 * @returns {undefined}
 * @todo Fill it
 * @since 1.0
 * @func
 */
function DELETE () {

}

/* eslint no-undef: 0 */
/**
 * @description Load a document/file using AJAX
 * @param {string} url URL
 * @param {Function} callback What to do when the document/file is loaded
 * @returns {undefined}
 * @since 1.0
 * @func
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
 * @returns {string|XML} Response
 * @since 1.0
 * @func
 */
function AJAXpost (data, to, xml) {
    var xhr = window.XMLHttpRequest? new XMLHttpRequest(): new ActiveXObject("Microsoft.XMLHTTP"), res = "";
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
    return res
}
/* eslint no-undef: 2 */

/**
 * @description HTPP status message
 * @param {number} status HTTP status (e.g: xhr.status)
 * @returns {string} Status message
 * @since 1.0
 * @func
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