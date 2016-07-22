/**
 * @module UI
 * @description User Interfaces and stuff
 * @version 1.0
 * @since 1.1
 * @license MIT
 * @author Maximilian Berkmann <maxieberkmann@gmail.com>
 * @copyright Maximilian Berkmann 2016
 * @requires ../essence
 * @requires Maths
 * @namespace
 * @type {{name: string, version: number, run: UI.run, description: string, dependency: Array, author: string, complete: boolean}}
 * @since 1.1
 * @exports UI
 */
var UI = {
    name: "UI",
    version: 1,
    run: function () {

    },
    description: "UI stuff",
    dependency: ["Maths"],
    author: "Maximilian Berkmann",
    complete: false,
    toString: function () {
        return "Module(name='" + this.name + "', version=" + this.version + ", description='" + this.description + "', author='" + this.author + "', complete=" + this.complete + ", run=" + this.run + ")";
    }
};

(function () {
    UI.complete = true;
})();

/* eslint no-undef: 0 */
/**
 * @description Resize the window to maximum size of the client/screen/device with the support of ActiveX, Java (mainly Processing) and VBS
 * @returns {undefined}
 * @since 1.0
 * @func
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
 * @since 1.0
 * @func
 */
function getScreenDim () {
    return [screen.width, screen.height]
}

/**
 * @description Dimension of the window
 * @returns {number[]} Window dimensions
 * @since 1.0
 * @func
 */
function getWinDim () {
    return [screen.availWidth, screen.availHeight]
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
 * @since 1.0
 * @func
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
 * @since 1.0
 * @func
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
 * @returns {NumberLike[]|string} Hexadecimal colour
 * @see hex2rgb
 * @since 1.0
 * @func
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
 * @since 1.0
 * @func
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
 * @since 1.0
 * @func
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
 * @since 1.0
 * @func
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
 * @description Shape
 * @param {number} [x=0] X-coordinate
 * @param {number} [y=0] Y-coordinate
 * @param {number} [b=1] Border
 * @param {Vector} [v=new Vector()] Velocity
 * @constructor
 * @interface
 * @since 1.0
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
        return new Shape(this.x, this.y, this.b, this.vel)
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

/* eslint no-unused-vars: 0 */
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
 * @todo Work on draw(), erase(), rot() and translate()
 * @this Box
 * @constructor
 * @since 1.0
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
    /* eslint no-undef: 0 */
    this.rot = function (alpha, beta, theta) { //Rotation

    };
    this.translate = function (px, py, pz) {

    };
    this.toString = function () {
        return "Box(x=" + this.x + ", y=" + this.y + ", z=" + this.z + ", width=" + this.width + ", height=" + this.height + ", deepth=" + this.deepth + ", borderSize=" + this.borderSize + ", borderColor=" + this.borderColor + ", borderRadius=" + this.borderRadius + ", backgroundColor=" + this.backgroundColor + ")"
    };

    return this;
}
/* eslint no-unused-vars: 2 */

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
 * @implements {Shape}
 * @see Shape
 * @since 1.0
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
        return "AABB(x=" + this.x + ", y=" + this.y + ", width=" + this.w + ", height=" + this.h + ", velocity=" + this.vel.toString() + ", border=" + this.border + ")"
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

    this.getDiag = function () { //Diagonal
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
 * @implements {Shape}
 * @see Shape
 * @since 1.0
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
        return "Circ(x=" + this.x + ", y=" + this.y + ", radius=" + this.r + ", velocity=" + this.vel.toString() + ")"
    };

    this.hit = function (obj, s) { //More like a getHit(obj) but for also circle/circle situations
        if (obj.hit(this, s || "")) {
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
 * @description Point
 * @param {number} [x=0] X-coordinate
 * @param {number} [y=0] Y-coordinate
 * @returns {Pt} Point
 * @this Pt
 * @see Shape
 * @implements {Shape}
 * @constructor
 * @since 1.0
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
 * @implements {Shape}
 * @constructor
 * @since 1.0
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
 * @description 2D vector
 * @see Shape
 * @this Vector
 * @param {number} [x=0] X-coordinate
 * @param {number} [y=0] Y-coordinate
 * @returns {Vector} Vector
 * @implements {Shape}
 * @constructor
 * @since 1.0
 */
function Vector (x, y) {
    this.prototype = Shape.prototype; //To avoid bugs
    this.x = x || 0;
    this.y = y || 0;

    this.toString = function () {
        return "Vector(x=" + this.x + ", y=" + this.y + ")"
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
        var n = normal || this.normal.copy();
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
 * @implements {Shape}
 * @constructor
 * @since 1.0
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
        return "Polygon(points=" + ptStr + ", velocity=" + this.vel.toString() + ", border=" + this.border + ")"
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
 * @description Message boxes
 * @param {string} type Type
 * @param {string} title Title
 * @param {string} text Text
 * @param {boolean} [isHTML=false] HTML flag
 * @param {Object} style Style
 * @param {string} [customIcon] Custom icon
 * @returns {undefined}
 * @todo Work on it
 * @since 1.0
 * @func
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
 * @description Linear gradient
 * @param {NumberLike} clrI Initial colour
 * @param {NumberLike} clrF Final colour
 * @param {number} [n=10] Number of shades
 * @returns {Array} Shades
 * @since 1.0
 * @func
 */
function linearGradient (clrI, clrF, n) {
    var i = parseInt(conv(clrI, 16)), f = parseInt(conv(clrF, 16));
    n = parseInt(n) || 10;
    var /*s = (f - i).sign(), */grad = [], inc = (f - i) / (n - 1);
    //console.log("i = " + i + "\tf = " + f + "\ns = " + s + "\ninc = " + inc);
    for(var j = 0; j < n; j++) grad.push(conv(i + j * inc, 10, 16));
    return grad
}

/* eslint no-unused-vars: 0 */
/**
 * @description Radial gradient
 * @param {NumberLike} clrI Initial colour
 * @param {NumberLike} clrF Final colour
 * @param {number} [n=10] Number of shades
 * @todo Add the essential part to make it work
 * @returns {Array} Shades
 * @since 1.0
 * @func
 */
function radialGradient (clrI, clrF, n) {
    var i = parseInt(conv(clrI, 16)), f = parseInt(conv(clrF, 16)), grad;
    n = parseInt(n) || 10;
    //Radial gradient
    return grad;
}
/* eslint no-unused-vars: 2 */

/**
 * @description Day/night mode
 * @type {boolean}
 * @default
 * @since 1.0
 * @func
 */
$G["dnM"] = false;
/**
 * @description Switch between enabled or not for the day/night page vision
 * @param {boolean} [exch=false] Switch the mode
 * @returns {undefined}
 * @since 1.0
 * @func
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
 * @description Old/initial tab
 * @type {string}
 * @since 1.0
 * @func
 */
$G["oldTab"] = "home";
/**
 * @description Change tabs
 * @param {string} name Name of the tab to switch to
 * @returns {undefined}
 * @since 1.0
 * @func
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
 * @since 1.0
 * @func
 */
function moveHTMLRange (id, n) { //Move an HTML range left or right which was made using htmlRange
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
 * @since 1.0
 * @func
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
 * @since 1.0
 * @func
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
 * @since 1.0
 * @func
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
 * @since 1.0
 * @func
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
 * @since 1.0
 * @func
 */
function htmlPassword (id, lbl) {
    if (!id) throw new Error("htmlPassword needs to know the id of the element implementing the input");
    if (!lbl) lbl = id;
    return "<label for='" + id + "' id='lbl_" + id + "'>&ensp;</label><br /><input type='text' id='" + id + "' value='" + lbl + "' onFocus='labelPwSwap(\"" + id + "\", \"" + lbl + "\")' onBlur='labelPwSwap(\"" + id + "\", \"" + lbl + "\")' />"
}