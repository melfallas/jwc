/**
 *
 * Copyrights
 *
 * Portions created or assigned to Cisco Systems, Inc. are
 * Copyright (c) 2010 Cisco Systems, Inc.  All Rights Reserved.
 */
/*build/dist/CAXL-release-2014.04.10787/src/webinit.js*/
;
(function () {
    var jabberwerx = {};
    jabberwerx.system = {
        jQuery_NoConflict: function () {
            var jq = jQuery.noConflict(true);
            if (typeof (window.jQuery) == "undefined") {
                window.jQuery = jq;
            }
            if (typeof (window.$) == "undefined") {
                window.$ = jq;
            }
            return jq;
        },
        serializeXMLToString: function (node) {
            if (node && (typeof (XMLSerializer) != "undefined")) {
                return new XMLSerializer().serializeToString(node)
            }
            return null;
        },
        setTimeout: function (func, delay) {
            return window.setTimeout(func, delay);
        },
        clearTimeout: function (timeoutID) {
            window.clearTimeout(timeoutID);
        },
        setInterval: function (func, delay) {
            return window.setInterval(func, delay);
        },
        clearInterval: function (intervalID) {
            window.clearInterval(intervalID);
        },
        getConsole: function () {
            return window.console || null;
        },
        getLocale: function () {
            return navigator.userLanguage || navigator.language;
        }
    };
    jabberwerx.system.createXMLDocument = (function () {
        var fn = function () {
            fn = function () {
                return Windows.Data.Xml.Dom.XmlDocument();
            };
            try {
                return fn();
            } catch (ex) {
                fn = function () {
                    var doc = new ActiveXObject("Msxml2.DOMDocument.3.0");
                    doc.async = false;
                    return doc;
                }
                try {
                    return fn();
                } catch (ex) {
                    fn = function () {
                        return document.implementation.createDocument(null, null, null);
                    }
                    try {
                        return fn();
                    } catch (ex) {
                        fn = function () {
                            throw new Error("No document constructor available.");
                        }
                        return fn();
                    }
                }
            }
        }
        return function () {
            try {
                return fn();
            } catch (ex) {
                console.log("Could not create XML Document: " + ex.message);
                throw ex;
            }
        }
    })();
    jabberwerx.system.parseXMLFromString = function (xmlstr) {
        var dom = null;
        try {
            dom = jabberwerx.system.createXMLDocument();
            dom.loadXML(xmlstr);
        } catch (ex) {
            try {
                dom = (new DOMParser()).parseFromString(xmlstr, "text/xml");
            } catch (ex) {
                dom = null;
            }
        }
        dom = dom ? dom.documentElement : null;
        if (!dom || (dom.nodeName == "parsererror") || (jabberwerx.$("parsererror", dom).length > 0)) {
            throw new TypeError("Parse error in trying to parse" + xmlstr);
        }
        return dom;
    };
    if (typeof (Node) != "undefined" && Node.prototype && typeof (Object.defineProperty) != "undefined") {
        Object.defineProperty(Node.prototype, "xml", {
            get: function () {
                return jabberwerx.system.serializeXMLToString(this);
            },
            enumerable: true,
            writeable: false,
            configurable: false
        });
    }
    jabberwerx.system.getLocation = function () {
        return (document && document.location) || {};
    };
    window.jabberwerx = jabberwerx;
})();
/*build/dist/CAXL-release-2014.04.10787/src/third_party/jquery/jquery-1.9.1.js*/
/*!
 * jQuery JavaScript Library v1.9.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2012 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-2-4
 */
(function (window, undefined) {
    var
        readyList, rootjQuery, core_strundefined = typeof undefined,
        document = window.document,
        location = window.location,
        _jQuery = window.jQuery,
        _$ = window.$,
        class2type = {},
        core_deletedIds = [],
        core_version = "1.9.1",
        core_concat = core_deletedIds.concat,
        core_push = core_deletedIds.push,
        core_slice = core_deletedIds.slice,
        core_indexOf = core_deletedIds.indexOf,
        core_toString = class2type.toString,
        core_hasOwn = class2type.hasOwnProperty,
        core_trim = core_version.trim,
        jQuery = function (selector, context) {
            return new jQuery.fn.init(selector, context, rootjQuery);
        },
        core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        core_rnotwhite = /\S+/g,
        rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        rquickExpr = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        rvalidchars = /^[\],:{}\s]*$/,
        rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
        rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
        rmsPrefix = /^-ms-/,
        rdashAlpha = /-([\da-z])/gi,
        fcamelCase = function (all, letter) {
            return letter.toUpperCase();
        },
        completed = function (event) {
            if (document.addEventListener || event.type === "load" || document.readyState === "complete") {
                detach();
                jQuery.ready();
            }
        },
        detach = function () {
            if (document.addEventListener) {
                document.removeEventListener("DOMContentLoaded", completed, false);
                window.removeEventListener("load", completed, false);
            } else {
                document.detachEvent("onreadystatechange", completed);
                window.detachEvent("onload", completed);
            }
        };
    jQuery.fn = jQuery.prototype = {
        jquery: core_version,
        constructor: jQuery,
        init: function (selector, context, rootjQuery) {
            var match, elem;
            if (!selector) {
                return this;
            }
            if (typeof selector === "string") {
                if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {
                    match = [null, selector, null];
                } else {
                    match = rquickExpr.exec(selector);
                }
                if (match && (match[1] || !context)) {
                    if (match[1]) {
                        context = context instanceof jQuery ? context[0] : context;
                        jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
                        if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                            for (match in context) {
                                if (jQuery.isFunction(this[match])) {
                                    this[match](context[match]);
                                } else {
                                    this.attr(match, context[match]);
                                }
                            }
                        }
                        return this;
                    } else {
                        elem = document.getElementById(match[2]);
                        if (elem && elem.parentNode) {
                            if (elem.id !== match[2]) {
                                return rootjQuery.find(selector);
                            }
                            this.length = 1;
                            this[0] = elem;
                        }
                        this.context = document;
                        this.selector = selector;
                        return this;
                    }
                } else if (!context || context.jquery) {
                    return (context || rootjQuery).find(selector);
                } else {
                    return this.constructor(context).find(selector);
                }
            } else if (selector.nodeType) {
                this.context = this[0] = selector;
                this.length = 1;
                return this;
            } else if (jQuery.isFunction(selector)) {
                return rootjQuery.ready(selector);
            }
            if (selector.selector !== undefined) {
                this.selector = selector.selector;
                this.context = selector.context;
            }
            return jQuery.makeArray(selector, this);
        },
        selector: "",
        length: 0,
        size: function () {
            return this.length;
        },
        toArray: function () {
            return core_slice.call(this);
        },
        get: function (num) {
            return num == null ? this.toArray() : (num < 0 ? this[this.length + num] : this[num]);
        },
        pushStack: function (elems) {
            var ret = jQuery.merge(this.constructor(), elems);
            ret.prevObject = this;
            ret.context = this.context;
            return ret;
        },
        each: function (callback, args) {
            return jQuery.each(this, callback, args);
        },
        ready: function (fn) {
            jQuery.ready.promise().done(fn);
            return this;
        },
        slice: function () {
            return this.pushStack(core_slice.apply(this, arguments));
        },
        first: function () {
            return this.eq(0);
        },
        last: function () {
            return this.eq(-1);
        },
        eq: function (i) {
            var len = this.length,
                j = +i + (i < 0 ? len : 0);
            return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
        },
        map: function (callback) {
            return this.pushStack(jQuery.map(this, function (elem, i) {
                return callback.call(elem, i, elem);
            }));
        },
        end: function () {
            return this.prevObject || this.constructor(null);
        },
        push: core_push,
        sort: [].sort,
        splice: [].splice
    };
    jQuery.fn.init.prototype = jQuery.fn;
    jQuery.extend = jQuery.fn.extend = function () {
        var src, copyIsArray, copy, name, options, clone, target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[1] || {};
            i = 2;
        }
        if (typeof target !== "object" && !jQuery.isFunction(target)) {
            target = {};
        }
        if (length === i) {
            target = this;
            --i;
        }
        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) {
                        continue;
                    }
                    if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && jQuery.isArray(src) ? src : [];
                        } else {
                            clone = src && jQuery.isPlainObject(src) ? src : {};
                        }
                        target[name] = jQuery.extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    };
    jQuery.extend({
        noConflict: function (deep) {
            if (window.$ === jQuery) {
                window.$ = _$;
            }
            if (deep && window.jQuery === jQuery) {
                window.jQuery = _jQuery;
            }
            return jQuery;
        },
        isReady: false,
        readyWait: 1,
        holdReady: function (hold) {
            if (hold) {
                jQuery.readyWait++;
            } else {
                jQuery.ready(true);
            }
        },
        ready: function (wait) {
            if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
                return;
            }
            if (!document.body) {
                return setTimeout(jQuery.ready);
            }
            jQuery.isReady = true;
            if (wait !== true && --jQuery.readyWait > 0) {
                return;
            }
            readyList.resolveWith(document, [jQuery]);
            if (jQuery.fn.trigger) {
                jQuery(document).trigger("ready").off("ready");
            }
        },
        isFunction: function (obj) {
            return jQuery.type(obj) === "function";
        },
        isArray: Array.isArray || function (obj) {
            return jQuery.type(obj) === "array";
        },
        isWindow: function (obj) {
            return obj != null && obj == obj.window;
        },
        isNumeric: function (obj) {
            return !isNaN(parseFloat(obj)) && isFinite(obj);
        },
        type: function (obj) {
            if (obj == null) {
                return String(obj);
            }
            return typeof obj === "object" || typeof obj === "function" ? class2type[core_toString.call(obj)] || "object" : typeof obj;
        },
        isPlainObject: function (obj) {
            if (!obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
                return false;
            }
            try {
                if (obj.constructor && !core_hasOwn.call(obj, "constructor") && !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                    return false;
                }
            } catch (e) {
                return false;
            }
            var key;
            for (key in obj) { }
            return key === undefined || core_hasOwn.call(obj, key);
        },
        isEmptyObject: function (obj) {
            var name;
            for (name in obj) {
                return false;
            }
            return true;
        },
        error: function (msg) {
            throw new Error(msg);
        },
        parseHTML: function (data, context, keepScripts) {
            if (!data || typeof data !== "string") {
                return null;
            }
            if (typeof context === "boolean") {
                keepScripts = context;
                context = false;
            }
            context = context || document;
            var parsed = rsingleTag.exec(data),
                scripts = !keepScripts && [];
            if (parsed) {
                return [context.createElement(parsed[1])];
            }
            parsed = jQuery.buildFragment([data], context, scripts);
            if (scripts) {
                jQuery(scripts).remove();
            }
            return jQuery.merge([], parsed.childNodes);
        },
        parseJSON: function (data) {
            if (window.JSON && window.JSON.parse) {
                return window.JSON.parse(data);
            }
            if (data === null) {
                return data;
            }
            if (typeof data === "string") {
                data = jQuery.trim(data);
                if (data) {
                    if (rvalidchars.test(data.replace(rvalidescape, "@").replace(rvalidtokens, "]").replace(rvalidbraces, ""))) {
                        return (new Function("return " + data))();
                    }
                }
            }
            jQuery.error("Invalid JSON: " + data);
        },
        parseXML: function (data) {
            var xml, tmp;
            if (!data || typeof data !== "string") {
                return null;
            }
            try {
                if (window.DOMParser) {
                    tmp = new DOMParser();
                    xml = tmp.parseFromString(data, "text/xml");
                } else {
                    xml = new ActiveXObject("Microsoft.XMLDOM");
                    xml.async = "false";
                    xml.loadXML(data);
                }
            } catch (e) {
                xml = undefined;
            }
            if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
                jQuery.error("Invalid XML: " + data);
            }
            return xml;
        },
        noop: function () { },
        globalEval: function (data) {
            if (data && jQuery.trim(data)) {
                (window.execScript || function (data) {
                    window["eval"].call(window, data);
                })(data);
            }
        },
        camelCase: function (string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        },
        nodeName: function (elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },
        each: function (obj, callback, args) {
            var value, i = 0,
                length = obj.length,
                isArray = isArraylike(obj);
            if (args) {
                if (isArray) {
                    for (; i < length; i++) {
                        value = callback.apply(obj[i], args);
                        if (value === false) {
                            break;
                        }
                    }
                } else {
                    for (i in obj) {
                        value = callback.apply(obj[i], args);
                        if (value === false) {
                            break;
                        }
                    }
                }
            } else {
                if (isArray) {
                    for (; i < length; i++) {
                        value = callback.call(obj[i], i, obj[i]);
                        if (value === false) {
                            break;
                        }
                    }
                } else {
                    for (i in obj) {
                        value = callback.call(obj[i], i, obj[i]);
                        if (value === false) {
                            break;
                        }
                    }
                }
            }
            return obj;
        },
        trim: core_trim && !core_trim.call("\uFEFF\xA0") ? function (text) {
            return text == null ? "" : core_trim.call(text);
        } : function (text) {
            return text == null ? "" : (text + "").replace(rtrim, "");
        },
        makeArray: function (arr, results) {
            var ret = results || [];
            if (arr != null) {
                if (isArraylike(Object(arr))) {
                    jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
                } else {
                    core_push.call(ret, arr);
                }
            }
            return ret;
        },
        inArray: function (elem, arr, i) {
            var len;
            if (arr) {
                if (core_indexOf) {
                    return core_indexOf.call(arr, elem, i);
                }
                len = arr.length;
                i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
                for (; i < len; i++) {
                    if (i in arr && arr[i] === elem) {
                        return i;
                    }
                }
            }
            return -1;
        },
        merge: function (first, second) {
            var l = second.length,
                i = first.length,
                j = 0;
            if (typeof l === "number") {
                for (; j < l; j++) {
                    first[i++] = second[j];
                }
            } else {
                while (second[j] !== undefined) {
                    first[i++] = second[j++];
                }
            }
            first.length = i;
            return first;
        },
        grep: function (elems, callback, inv) {
            var retVal, ret = [],
                i = 0,
                length = elems.length;
            inv = !!inv;
            for (; i < length; i++) {
                retVal = !!callback(elems[i], i);
                if (inv !== retVal) {
                    ret.push(elems[i]);
                }
            }
            return ret;
        },
        map: function (elems, callback, arg) {
            var value, i = 0,
                length = elems.length,
                isArray = isArraylike(elems),
                ret = [];
            if (isArray) {
                for (; i < length; i++) {
                    value = callback(elems[i], i, arg);
                    if (value != null) {
                        ret[ret.length] = value;
                    }
                }
            } else {
                for (i in elems) {
                    value = callback(elems[i], i, arg);
                    if (value != null) {
                        ret[ret.length] = value;
                    }
                }
            }
            return core_concat.apply([], ret);
        },
        guid: 1,
        proxy: function (fn, context) {
            var args, proxy, tmp;
            if (typeof context === "string") {
                tmp = fn[context];
                context = fn;
                fn = tmp;
            }
            if (!jQuery.isFunction(fn)) {
                return undefined;
            }
            args = core_slice.call(arguments, 2);
            proxy = function () {
                return fn.apply(context || this, args.concat(core_slice.call(arguments)));
            };
            proxy.guid = fn.guid = fn.guid || jQuery.guid++;
            return proxy;
        },
        access: function (elems, fn, key, value, chainable, emptyGet, raw) {
            var i = 0,
                length = elems.length,
                bulk = key == null;
            if (jQuery.type(key) === "object") {
                chainable = true;
                for (i in key) {
                    jQuery.access(elems, fn, i, key[i], true, emptyGet, raw);
                }
            } else if (value !== undefined) {
                chainable = true;
                if (!jQuery.isFunction(value)) {
                    raw = true;
                }
                if (bulk) {
                    if (raw) {
                        fn.call(elems, value);
                        fn = null;
                    } else {
                        bulk = fn;
                        fn = function (elem, key, value) {
                            return bulk.call(jQuery(elem), value);
                        };
                    }
                }
                if (fn) {
                    for (; i < length; i++) {
                        fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
                    }
                }
            }
            return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet;
        },
        now: function () {
            return (new Date()).getTime();
        }
    });
    jQuery.ready.promise = function (obj) {
        if (!readyList) {
            readyList = jQuery.Deferred();
            if (document.readyState === "complete") {
                setTimeout(jQuery.ready);
            } else if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", completed, false);
                window.addEventListener("load", completed, false);
            } else {
                document.attachEvent("onreadystatechange", completed);
                window.attachEvent("onload", completed);
                var top = false;
                try {
                    top = window.frameElement == null && document.documentElement;
                } catch (e) { }
                if (top && top.doScroll) {
                    (function doScrollCheck() {
                        if (!jQuery.isReady) {
                            try {
                                top.doScroll("left");
                            } catch (e) {
                                return setTimeout(doScrollCheck, 50);
                            }
                            detach();
                            jQuery.ready();
                        }
                    })();
                }
            }
        }
        return readyList.promise(obj);
    };
    jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });

    function isArraylike(obj) {
        var length = obj.length,
            type = jQuery.type(obj);
        if (jQuery.isWindow(obj)) {
            return false;
        }
        if (obj.nodeType === 1 && length) {
            return true;
        }
        return type === "array" || type !== "function" && (length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj);
    }
    rootjQuery = jQuery(document);
    var optionsCache = {};

    function createOptions(options) {
        var object = optionsCache[options] = {};
        jQuery.each(options.match(core_rnotwhite) || [], function (_, flag) {
            object[flag] = true;
        });
        return object;
    }
    jQuery.Callbacks = function (options) {
        options = typeof options === "string" ? (optionsCache[options] || createOptions(options)) : jQuery.extend({}, options);
        var
            firing, memory, fired, firingLength, firingIndex, firingStart, list = [],
            stack = !options.once && [],
            fire = function (data) {
                memory = options.memory && data;
                fired = true;
                firingIndex = firingStart || 0;
                firingStart = 0;
                firingLength = list.length;
                firing = true;
                for (; list && firingIndex < firingLength; firingIndex++) {
                    if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
                        memory = false;
                        break;
                    }
                }
                firing = false;
                if (list) {
                    if (stack) {
                        if (stack.length) {
                            fire(stack.shift());
                        }
                    } else if (memory) {
                        list = [];
                    } else {
                        self.disable();
                    }
                }
            },
            self = {
                add: function () {
                    if (list) {
                        var start = list.length;
                        (function add(args) {
                            jQuery.each(args, function (_, arg) {
                                var type = jQuery.type(arg);
                                if (type === "function") {
                                    if (!options.unique || !self.has(arg)) {
                                        list.push(arg);
                                    }
                                } else if (arg && arg.length && type !== "string") {
                                    add(arg);
                                }
                            });
                        })(arguments);
                        if (firing) {
                            firingLength = list.length;
                        } else if (memory) {
                            firingStart = start;
                            fire(memory);
                        }
                    }
                    return this;
                },
                remove: function () {
                    if (list) {
                        jQuery.each(arguments, function (_, arg) {
                            var index;
                            while ((index = jQuery.inArray(arg, list, index)) > -1) {
                                list.splice(index, 1);
                                if (firing) {
                                    if (index <= firingLength) {
                                        firingLength--;
                                    }
                                    if (index <= firingIndex) {
                                        firingIndex--;
                                    }
                                }
                            }
                        });
                    }
                    return this;
                },
                has: function (fn) {
                    return fn ? jQuery.inArray(fn, list) > -1 : !!(list && list.length);
                },
                empty: function () {
                    list = [];
                    return this;
                },
                disable: function () {
                    list = stack = memory = undefined;
                    return this;
                },
                disabled: function () {
                    return !list;
                },
                lock: function () {
                    stack = undefined;
                    if (!memory) {
                        self.disable();
                    }
                    return this;
                },
                locked: function () {
                    return !stack;
                },
                fireWith: function (context, args) {
                    args = args || [];
                    args = [context, args.slice ? args.slice() : args];
                    if (list && (!fired || stack)) {
                        if (firing) {
                            stack.push(args);
                        } else {
                            fire(args);
                        }
                    }
                    return this;
                },
                fire: function () {
                    self.fireWith(this, arguments);
                    return this;
                },
                fired: function () {
                    return !!fired;
                }
            };
        return self;
    };
    jQuery.extend({
        Deferred: function (func) {
            var tuples = [
                ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
                ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
                ["notify", "progress", jQuery.Callbacks("memory")]
            ],
                state = "pending",
                promise = {
                    state: function () {
                        return state;
                    },
                    always: function () {
                        deferred.done(arguments).fail(arguments);
                        return this;
                    },
                    then: function () {
                        var fns = arguments;
                        return jQuery.Deferred(function (newDefer) {
                            jQuery.each(tuples, function (i, tuple) {
                                var action = tuple[0],
                                    fn = jQuery.isFunction(fns[i]) && fns[i];
                                deferred[tuple[1]](function () {
                                    var returned = fn && fn.apply(this, arguments);
                                    if (returned && jQuery.isFunction(returned.promise)) {
                                        returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify);
                                    } else {
                                        newDefer[action + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
                                    }
                                });
                            });
                            fns = null;
                        }).promise();
                    },
                    promise: function (obj) {
                        return obj != null ? jQuery.extend(obj, promise) : promise;
                    }
                },
                deferred = {};
            promise.pipe = promise.then;
            jQuery.each(tuples, function (i, tuple) {
                var list = tuple[2],
                    stateString = tuple[3];
                promise[tuple[1]] = list.add;
                if (stateString) {
                    list.add(function () {
                        state = stateString;
                    }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
                }
                deferred[tuple[0]] = function () {
                    deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
                    return this;
                };
                deferred[tuple[0] + "With"] = list.fireWith;
            });
            promise.promise(deferred);
            if (func) {
                func.call(deferred, deferred);
            }
            return deferred;
        },
        when: function (subordinate) {
            var i = 0,
                resolveValues = core_slice.call(arguments),
                length = resolveValues.length,
                remaining = length !== 1 || (subordinate && jQuery.isFunction(subordinate.promise)) ? length : 0,
                deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
                updateFunc = function (i, contexts, values) {
                    return function (value) {
                        contexts[i] = this;
                        values[i] = arguments.length > 1 ? core_slice.call(arguments) : value;
                        if (values === progressValues) {
                            deferred.notifyWith(contexts, values);
                        } else if (!(--remaining)) {
                            deferred.resolveWith(contexts, values);
                        }
                    };
                },
                progressValues, progressContexts, resolveContexts;
            if (length > 1) {
                progressValues = new Array(length);
                progressContexts = new Array(length);
                resolveContexts = new Array(length);
                for (; i < length; i++) {
                    if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
                        resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues));
                    } else {
                        --remaining;
                    }
                }
            }
            if (!remaining) {
                deferred.resolveWith(resolveContexts, resolveValues);
            }
            return deferred.promise();
        }
    });
    jQuery.support = (function () {
        var support, all, a, input, select, fragment, opt, eventName, isSupported, i, div = document.createElement("div");
        div.setAttribute("className", "t");
        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        all = div.getElementsByTagName("*");
        a = div.getElementsByTagName("a")[0];
        if (!all || !a || !all.length) {
            return {};
        }
        select = document.createElement("select");
        opt = select.appendChild(document.createElement("option"));
        input = div.getElementsByTagName("input")[0];
        a.style.cssText = "top:1px;float:left;opacity:.5";
        support = {
            getSetAttribute: div.className !== "t",
            leadingWhitespace: div.firstChild.nodeType === 3,
            tbody: !div.getElementsByTagName("tbody").length,
            htmlSerialize: !!div.getElementsByTagName("link").length,
            style: /top/.test(a.getAttribute("style")),
            hrefNormalized: a.getAttribute("href") === "/a",
            opacity: /^0.5/.test(a.style.opacity),
            cssFloat: !!a.style.cssFloat,
            checkOn: !!input.value,
            optSelected: opt.selected,
            enctype: !!document.createElement("form").enctype,
            html5Clone: document.createElement("nav").cloneNode(true).outerHTML !== "<:nav></:nav>",
            boxModel: document.compatMode === "CSS1Compat",
            deleteExpando: true,
            noCloneEvent: true,
            inlineBlockNeedsLayout: false,
            shrinkWrapBlocks: false,
            reliableMarginRight: true,
            boxSizingReliable: true,
            pixelPosition: false
        };
        input.checked = true;
        support.noCloneChecked = input.cloneNode(true).checked;
        select.disabled = true;
        support.optDisabled = !opt.disabled;
        try {
            delete div.test;
        } catch (e) {
            support.deleteExpando = false;
        }
        input = document.createElement("input");
        input.setAttribute("value", "");
        support.input = input.getAttribute("value") === "";
        input.value = "t";
        input.setAttribute("type", "radio");
        support.radioValue = input.value === "t";
        input.setAttribute("checked", "t");
        input.setAttribute("name", "t");
        fragment = document.createDocumentFragment();
        fragment.appendChild(input);
        support.appendChecked = input.checked;
        support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;
        if (div.attachEvent) {
            div.attachEvent("onclick", function () {
                support.noCloneEvent = false;
            });
            div.cloneNode(true).click();
        }
        for (i in {
            submit: true,
            change: true,
            focusin: true
        }) {
            div.setAttribute(eventName = "on" + i, "t");
            support[i + "Bubbles"] = eventName in window || div.attributes[eventName].expando === false;
        }
        div.style.backgroundClip = "content-box";
        div.cloneNode(true).style.backgroundClip = "";
        support.clearCloneStyle = div.style.backgroundClip === "content-box";
        jQuery(function () {
            var container, marginDiv, tds, divReset = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
                body = document.getElementsByTagName("body")[0];
            if (!body) {
                return;
            }
            container = document.createElement("div");
            container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";
            body.appendChild(container).appendChild(div);
            div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
            tds = div.getElementsByTagName("td");
            tds[0].style.cssText = "padding:0;margin:0;border:0;display:none";
            isSupported = (tds[0].offsetHeight === 0);
            tds[0].style.display = "";
            tds[1].style.display = "none";
            support.reliableHiddenOffsets = isSupported && (tds[0].offsetHeight === 0);
            div.innerHTML = "";
            div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
            support.boxSizing = (div.offsetWidth === 4);
            support.doesNotIncludeMarginInBodyOffset = (body.offsetTop !== 1);
            if (window.getComputedStyle) {
                support.pixelPosition = (window.getComputedStyle(div, null) || {}).top !== "1%";
                support.boxSizingReliable = (window.getComputedStyle(div, null) || {
                    width: "4px"
                }).width === "4px";
                marginDiv = div.appendChild(document.createElement("div"));
                marginDiv.style.cssText = div.style.cssText = divReset;
                marginDiv.style.marginRight = marginDiv.style.width = "0";
                div.style.width = "1px";
                support.reliableMarginRight = !parseFloat((window.getComputedStyle(marginDiv, null) || {}).marginRight);
            }
            if (typeof div.style.zoom !== core_strundefined) {
                div.innerHTML = "";
                div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
                support.inlineBlockNeedsLayout = (div.offsetWidth === 3);
                div.style.display = "block";
                div.innerHTML = "<div></div>";
                div.firstChild.style.width = "5px";
                support.shrinkWrapBlocks = (div.offsetWidth !== 3);
                if (support.inlineBlockNeedsLayout) {
                    body.style.zoom = 1;
                }
            }
            body.removeChild(container);
            container = div = tds = marginDiv = null;
        });
        all = select = fragment = opt = a = input = null;
        return support;
    })();
    var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        rmultiDash = /([A-Z])/g;

    function internalData(elem, name, data, pvt) {
        if (!jQuery.acceptData(elem)) {
            return;
        }
        var thisCache, ret, internalKey = jQuery.expando,
            getByName = typeof name === "string",
            isNode = elem.nodeType,
            cache = isNode ? jQuery.cache : elem,
            id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
        if ((!id || !cache[id] || (!pvt && !cache[id].data)) && getByName && data === undefined) {
            return;
        }
        if (!id) {
            if (isNode) {
                elem[internalKey] = id = core_deletedIds.pop() || jQuery.guid++;
            } else {
                id = internalKey;
            }
        }
        if (!cache[id]) {
            cache[id] = {};
            if (!isNode) {
                cache[id].toJSON = jQuery.noop;
            }
        }
        if (typeof name === "object" || typeof name === "function") {
            if (pvt) {
                cache[id] = jQuery.extend(cache[id], name);
            } else {
                cache[id].data = jQuery.extend(cache[id].data, name);
            }
        }
        thisCache = cache[id];
        if (!pvt) {
            if (!thisCache.data) {
                thisCache.data = {};
            }
            thisCache = thisCache.data;
        }
        if (data !== undefined) {
            thisCache[jQuery.camelCase(name)] = data;
        }
        if (getByName) {
            ret = thisCache[name];
            if (ret == null) {
                ret = thisCache[jQuery.camelCase(name)];
            }
        } else {
            ret = thisCache;
        }
        return ret;
    }

    function internalRemoveData(elem, name, pvt) {
        if (!jQuery.acceptData(elem)) {
            return;
        }
        var i, l, thisCache, isNode = elem.nodeType,
            cache = isNode ? jQuery.cache : elem,
            id = isNode ? elem[jQuery.expando] : jQuery.expando;
        if (!cache[id]) {
            return;
        }
        if (name) {
            thisCache = pvt ? cache[id] : cache[id].data;
            if (thisCache) {
                if (!jQuery.isArray(name)) {
                    if (name in thisCache) {
                        name = [name];
                    } else {
                        name = jQuery.camelCase(name);
                        if (name in thisCache) {
                            name = [name];
                        } else {
                            name = name.split(" ");
                        }
                    }
                } else {
                    name = name.concat(jQuery.map(name, jQuery.camelCase));
                }
                for (i = 0, l = name.length; i < l; i++) {
                    delete thisCache[name[i]];
                }
                if (!(pvt ? isEmptyDataObject : jQuery.isEmptyObject)(thisCache)) {
                    return;
                }
            }
        }
        if (!pvt) {
            delete cache[id].data;
            if (!isEmptyDataObject(cache[id])) {
                return;
            }
        }
        if (isNode) {
            jQuery.cleanData([elem], true);
        } else if (jQuery.support.deleteExpando || cache != cache.window) {
            delete cache[id];
        } else {
            cache[id] = null;
        }
    }
    jQuery.extend({
        cache: {},
        expando: "jQuery" + (core_version + Math.random()).replace(/\D/g, ""),
        noData: {
            "embed": true,
            "object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            "applet": true
        },
        hasData: function (elem) {
            elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando];
            return !!elem && !isEmptyDataObject(elem);
        },
        data: function (elem, name, data) {
            return internalData(elem, name, data);
        },
        removeData: function (elem, name) {
            return internalRemoveData(elem, name);
        },
        _data: function (elem, name, data) {
            return internalData(elem, name, data, true);
        },
        _removeData: function (elem, name) {
            return internalRemoveData(elem, name, true);
        },
        acceptData: function (elem) {
            if (elem.nodeType && elem.nodeType !== 1 && elem.nodeType !== 9) {
                return false;
            }
            var noData = elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()];
            return !noData || noData !== true && elem.getAttribute("classid") === noData;
        }
    });
    jQuery.fn.extend({
        data: function (key, value) {
            var attrs, name, elem = this[0],
                i = 0,
                data = null;
            if (key === undefined) {
                if (this.length) {
                    data = jQuery.data(elem);
                    if (elem.nodeType === 1 && !jQuery._data(elem, "parsedAttrs")) {
                        attrs = elem.attributes;
                        for (; i < attrs.length; i++) {
                            name = attrs[i].name;
                            if (!name.indexOf("data-")) {
                                name = jQuery.camelCase(name.slice(5));
                                dataAttr(elem, name, data[name]);
                            }
                        }
                        jQuery._data(elem, "parsedAttrs", true);
                    }
                }
                return data;
            }
            if (typeof key === "object") {
                return this.each(function () {
                    jQuery.data(this, key);
                });
            }
            return jQuery.access(this, function (value) {
                if (value === undefined) {
                    return elem ? dataAttr(elem, key, jQuery.data(elem, key)) : null;
                }
                this.each(function () {
                    jQuery.data(this, key, value);
                });
            }, null, value, arguments.length > 1, null, true);
        },
        removeData: function (key) {
            return this.each(function () {
                jQuery.removeData(this, key);
            });
        }
    });

    function dataAttr(elem, key, data) {
        if (data === undefined && elem.nodeType === 1) {
            var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
            data = elem.getAttribute(name);
            if (typeof data === "string") {
                try {
                    data = data === "true" ? true : data === "false" ? false : data === "null" ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
                } catch (e) { }
                jQuery.data(elem, key, data);
            } else {
                data = undefined;
            }
        }
        return data;
    }

    function isEmptyDataObject(obj) {
        var name;
        for (name in obj) {
            if (name === "data" && jQuery.isEmptyObject(obj[name])) {
                continue;
            }
            if (name !== "toJSON") {
                return false;
            }
        }
        return true;
    }
    jQuery.extend({
        queue: function (elem, type, data) {
            var queue;
            if (elem) {
                type = (type || "fx") + "queue";
                queue = jQuery._data(elem, type);
                if (data) {
                    if (!queue || jQuery.isArray(data)) {
                        queue = jQuery._data(elem, type, jQuery.makeArray(data));
                    } else {
                        queue.push(data);
                    }
                }
                return queue || [];
            }
        },
        dequeue: function (elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type),
                startLength = queue.length,
                fn = queue.shift(),
                hooks = jQuery._queueHooks(elem, type),
                next = function () {
                    jQuery.dequeue(elem, type);
                };
            if (fn === "inprogress") {
                fn = queue.shift();
                startLength--;
            }
            hooks.cur = fn;
            if (fn) {
                if (type === "fx") {
                    queue.unshift("inprogress");
                }
                delete hooks.stop;
                fn.call(elem, next, hooks);
            }
            if (!startLength && hooks) {
                hooks.empty.fire();
            }
        },
        _queueHooks: function (elem, type) {
            var key = type + "queueHooks";
            return jQuery._data(elem, key) || jQuery._data(elem, key, {
                empty: jQuery.Callbacks("once memory").add(function () {
                    jQuery._removeData(elem, type + "queue");
                    jQuery._removeData(elem, key);
                })
            });
        }
    });
    jQuery.fn.extend({
        queue: function (type, data) {
            var setter = 2;
            if (typeof type !== "string") {
                data = type;
                type = "fx";
                setter--;
            }
            if (arguments.length < setter) {
                return jQuery.queue(this[0], type);
            }
            return data === undefined ? this : this.each(function () {
                var queue = jQuery.queue(this, type, data);
                jQuery._queueHooks(this, type);
                if (type === "fx" && queue[0] !== "inprogress") {
                    jQuery.dequeue(this, type);
                }
            });
        },
        dequeue: function (type) {
            return this.each(function () {
                jQuery.dequeue(this, type);
            });
        },
        delay: function (time, type) {
            time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
            type = type || "fx";
            return this.queue(type, function (next, hooks) {
                var timeout = setTimeout(next, time);
                hooks.stop = function () {
                    clearTimeout(timeout);
                };
            });
        },
        clearQueue: function (type) {
            return this.queue(type || "fx", []);
        },
        promise: function (type, obj) {
            var tmp, count = 1,
                defer = jQuery.Deferred(),
                elements = this,
                i = this.length,
                resolve = function () {
                    if (!(--count)) {
                        defer.resolveWith(elements, [elements]);
                    }
                };
            if (typeof type !== "string") {
                obj = type;
                type = undefined;
            }
            type = type || "fx";
            while (i--) {
                tmp = jQuery._data(elements[i], type + "queueHooks");
                if (tmp && tmp.empty) {
                    count++;
                    tmp.empty.add(resolve);
                }
            }
            resolve();
            return defer.promise(obj);
        }
    });
    var nodeHook, boolHook, rclass = /[\t\r\n]/g,
        rreturn = /\r/g,
        rfocusable = /^(?:input|select|textarea|button|object)$/i,
        rclickable = /^(?:a|area)$/i,
        rboolean = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,
        ruseDefault = /^(?:checked|selected)$/i,
        getSetAttribute = jQuery.support.getSetAttribute,
        getSetInput = jQuery.support.input;
    jQuery.fn.extend({
        attr: function (name, value) {
            return jQuery.access(this, jQuery.attr, name, value, arguments.length > 1);
        },
        removeAttr: function (name) {
            return this.each(function () {
                jQuery.removeAttr(this, name);
            });
        },
        prop: function (name, value) {
            return jQuery.access(this, jQuery.prop, name, value, arguments.length > 1);
        },
        removeProp: function (name) {
            name = jQuery.propFix[name] || name;
            return this.each(function () {
                try {
                    this[name] = undefined;
                    delete this[name];
                } catch (e) { }
            });
        },
        addClass: function (value) {
            var classes, elem, cur, clazz, j, i = 0,
                len = this.length,
                proceed = typeof value === "string" && value;
            if (jQuery.isFunction(value)) {
                return this.each(function (j) {
                    jQuery(this).addClass(value.call(this, j, this.className));
                });
            }
            if (proceed) {
                classes = (value || "").match(core_rnotwhite) || [];
                for (; i < len; i++) {
                    elem = this[i];
                    cur = elem.nodeType === 1 && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : " ");
                    if (cur) {
                        j = 0;
                        while ((clazz = classes[j++])) {
                            if (cur.indexOf(" " + clazz + " ") < 0) {
                                cur += clazz + " ";
                            }
                        }
                        elem.className = jQuery.trim(cur);
                    }
                }
            }
            return this;
        },
        removeClass: function (value) {
            var classes, elem, cur, clazz, j, i = 0,
                len = this.length,
                proceed = arguments.length === 0 || typeof value === "string" && value;
            if (jQuery.isFunction(value)) {
                return this.each(function (j) {
                    jQuery(this).removeClass(value.call(this, j, this.className));
                });
            }
            if (proceed) {
                classes = (value || "").match(core_rnotwhite) || [];
                for (; i < len; i++) {
                    elem = this[i];
                    cur = elem.nodeType === 1 && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "");
                    if (cur) {
                        j = 0;
                        while ((clazz = classes[j++])) {
                            while (cur.indexOf(" " + clazz + " ") >= 0) {
                                cur = cur.replace(" " + clazz + " ", " ");
                            }
                        }
                        elem.className = value ? jQuery.trim(cur) : "";
                    }
                }
            }
            return this;
        },
        toggleClass: function (value, stateVal) {
            var type = typeof value,
                isBool = typeof stateVal === "boolean";
            if (jQuery.isFunction(value)) {
                return this.each(function (i) {
                    jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
                });
            }
            return this.each(function () {
                if (type === "string") {
                    var className, i = 0,
                        self = jQuery(this),
                        state = stateVal,
                        classNames = value.match(core_rnotwhite) || [];
                    while ((className = classNames[i++])) {
                        state = isBool ? state : !self.hasClass(className);
                        self[state ? "addClass" : "removeClass"](className);
                    }
                } else if (type === core_strundefined || type === "boolean") {
                    if (this.className) {
                        jQuery._data(this, "__className__", this.className);
                    }
                    this.className = this.className || value === false ? "" : jQuery._data(this, "__className__") || "";
                }
            });
        },
        hasClass: function (selector) {
            var className = " " + selector + " ",
                i = 0,
                l = this.length;
            for (; i < l; i++) {
                if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) {
                    return true;
                }
            }
            return false;
        },
        val: function (value) {
            var ret, hooks, isFunction, elem = this[0];
            if (!arguments.length) {
                if (elem) {
                    hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
                    if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
                        return ret;
                    }
                    ret = elem.value;
                    return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "" : ret;
                }
                return;
            }
            isFunction = jQuery.isFunction(value);
            return this.each(function (i) {
                var val, self = jQuery(this);
                if (this.nodeType !== 1) {
                    return;
                }
                if (isFunction) {
                    val = value.call(this, i, self.val());
                } else {
                    val = value;
                }
                if (val == null) {
                    val = "";
                } else if (typeof val === "number") {
                    val += "";
                } else if (jQuery.isArray(val)) {
                    val = jQuery.map(val, function (value) {
                        return value == null ? "" : value + "";
                    });
                }
                hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
                if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
                    this.value = val;
                }
            });
        }
    });
    jQuery.extend({
        valHooks: {
            option: {
                get: function (elem) {
                    var val = elem.attributes.value;
                    return !val || val.specified ? elem.value : elem.text;
                }
            },
            select: {
                get: function (elem) {
                    var value, option, options = elem.options,
                        index = elem.selectedIndex,
                        one = elem.type === "select-one" || index < 0,
                        values = one ? null : [],
                        max = one ? index + 1 : options.length,
                        i = index < 0 ? max : one ? index : 0;
                    for (; i < max; i++) {
                        option = options[i];
                        if ((option.selected || i === index) && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                            value = jQuery(option).val();
                            if (one) {
                                return value;
                            }
                            values.push(value);
                        }
                    }
                    return values;
                },
                set: function (elem, value) {
                    var values = jQuery.makeArray(value);
                    jQuery(elem).find("option").each(function () {
                        this.selected = jQuery.inArray(jQuery(this).val(), values) >= 0;
                    });
                    if (!values.length) {
                        elem.selectedIndex = -1;
                    }
                    return values;
                }
            }
        },
        attr: function (elem, name, value) {
            var hooks, notxml, ret, nType = elem.nodeType;
            if (!elem || nType === 3 || nType === 8 || nType === 2) {
                return;
            }
            if (typeof elem.getAttribute === core_strundefined) {
                return jQuery.prop(elem, name, value);
            }
            notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
            if (notxml) {
                name = name.toLowerCase();
                hooks = jQuery.attrHooks[name] || (rboolean.test(name) ? boolHook : nodeHook);
            }
            if (value !== undefined) {
                if (value === null) {
                    jQuery.removeAttr(elem, name);
                } else if (hooks && notxml && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
                    return ret;
                } else {
                    elem.setAttribute(name, value + "");
                    return value;
                }
            } else if (hooks && notxml && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                return ret;
            } else {
                if (typeof elem.getAttribute !== core_strundefined) {
                    ret = elem.getAttribute(name);
                }
                return ret == null ? undefined : ret;
            }
        },
        removeAttr: function (elem, value) {
            var name, propName, i = 0,
                attrNames = value && value.match(core_rnotwhite);
            if (attrNames && elem.nodeType === 1) {
                while ((name = attrNames[i++])) {
                    propName = jQuery.propFix[name] || name;
                    if (rboolean.test(name)) {
                        if (!getSetAttribute && ruseDefault.test(name)) {
                            elem[jQuery.camelCase("default-" + name)] = elem[propName] = false;
                        } else {
                            elem[propName] = false;
                        }
                    } else {
                        jQuery.attr(elem, name, "");
                    }
                    elem.removeAttribute(getSetAttribute ? name : propName);
                }
            }
        },
        attrHooks: {
            type: {
                set: function (elem, value) {
                    if (!jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
                        var val = elem.value;
                        elem.setAttribute("type", value);
                        if (val) {
                            elem.value = val;
                        }
                        return value;
                    }
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function (elem, name, value) {
            var ret, hooks, notxml, nType = elem.nodeType;
            if (!elem || nType === 3 || nType === 8 || nType === 2) {
                return;
            }
            notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
            if (notxml) {
                name = jQuery.propFix[name] || name;
                hooks = jQuery.propHooks[name];
            }
            if (value !== undefined) {
                if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
                    return ret;
                } else {
                    return (elem[name] = value);
                }
            } else {
                if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                    return ret;
                } else {
                    return elem[name];
                }
            }
        },
        propHooks: {
            tabIndex: {
                get: function (elem) {
                    var attributeNode = elem.getAttributeNode("tabindex");
                    return attributeNode && attributeNode.specified ? parseInt(attributeNode.value, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : undefined;
                }
            }
        }
    });
    boolHook = {
        get: function (elem, name) {
            var
                prop = jQuery.prop(elem, name),
                attr = typeof prop === "boolean" && elem.getAttribute(name),
                detail = typeof prop === "boolean" ? getSetInput && getSetAttribute ? attr != null : ruseDefault.test(name) ? elem[jQuery.camelCase("default-" + name)] : !!attr : elem.getAttributeNode(name);
            return detail && detail.value !== false ? name.toLowerCase() : undefined;
        },
        set: function (elem, value, name) {
            if (value === false) {
                jQuery.removeAttr(elem, name);
            } else if (getSetInput && getSetAttribute || !ruseDefault.test(name)) {
                elem.setAttribute(!getSetAttribute && jQuery.propFix[name] || name, name);
            } else {
                elem[jQuery.camelCase("default-" + name)] = elem[name] = true;
            }
            return name;
        }
    };
    if (!getSetInput || !getSetAttribute) {
        jQuery.attrHooks.value = {
            get: function (elem, name) {
                var ret = elem.getAttributeNode(name);
                return jQuery.nodeName(elem, "input") ? elem.defaultValue : ret && ret.specified ? ret.value : undefined;
            },
            set: function (elem, value, name) {
                if (jQuery.nodeName(elem, "input")) {
                    elem.defaultValue = value;
                } else {
                    return nodeHook && nodeHook.set(elem, value, name);
                }
            }
        };
    }
    if (!getSetAttribute) {
        nodeHook = jQuery.valHooks.button = {
            get: function (elem, name) {
                var ret = elem.getAttributeNode(name);
                return ret && (name === "id" || name === "name" || name === "coords" ? ret.value !== "" : ret.specified) ? ret.value : undefined;
            },
            set: function (elem, value, name) {
                var ret = elem.getAttributeNode(name);
                if (!ret) {
                    elem.setAttributeNode((ret = elem.ownerDocument.createAttribute(name)));
                }
                ret.value = value += "";
                return name === "value" || value === elem.getAttribute(name) ? value : undefined;
            }
        };
        jQuery.attrHooks.contenteditable = {
            get: nodeHook.get,
            set: function (elem, value, name) {
                nodeHook.set(elem, value === "" ? false : value, name);
            }
        };
        jQuery.each(["width", "height"], function (i, name) {
            jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
                set: function (elem, value) {
                    if (value === "") {
                        elem.setAttribute(name, "auto");
                        return value;
                    }
                }
            });
        });
    }
    if (!jQuery.support.hrefNormalized) {
        jQuery.each(["href", "src", "width", "height"], function (i, name) {
            jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
                get: function (elem) {
                    var ret = elem.getAttribute(name, 2);
                    return ret == null ? undefined : ret;
                }
            });
        });
        jQuery.each(["href", "src"], function (i, name) {
            jQuery.propHooks[name] = {
                get: function (elem) {
                    return elem.getAttribute(name, 4);
                }
            };
        });
    }
    if (!jQuery.support.style) {
        jQuery.attrHooks.style = {
            get: function (elem) {
                return elem.style.cssText || undefined;
            },
            set: function (elem, value) {
                return (elem.style.cssText = value + "");
            }
        };
    }
    if (!jQuery.support.optSelected) {
        jQuery.propHooks.selected = jQuery.extend(jQuery.propHooks.selected, {
            get: function (elem) {
                var parent = elem.parentNode;
                if (parent) {
                    parent.selectedIndex;
                    if (parent.parentNode) {
                        parent.parentNode.selectedIndex;
                    }
                }
                return null;
            }
        });
    }
    if (!jQuery.support.enctype) {
        jQuery.propFix.enctype = "encoding";
    }
    if (!jQuery.support.checkOn) {
        jQuery.each(["radio", "checkbox"], function () {
            jQuery.valHooks[this] = {
                get: function (elem) {
                    return elem.getAttribute("value") === null ? "on" : elem.value;
                }
            };
        });
    }
    jQuery.each(["radio", "checkbox"], function () {
        jQuery.valHooks[this] = jQuery.extend(jQuery.valHooks[this], {
            set: function (elem, value) {
                if (jQuery.isArray(value)) {
                    return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0);
                }
            }
        });
    });
    var rformElems = /^(?:input|select|textarea)$/i,
        rkeyEvent = /^key/,
        rmouseEvent = /^(?:mouse|contextmenu)|click/,
        rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
        rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

    function returnTrue() {
        return true;
    }

    function returnFalse() {
        return false;
    }
    jQuery.event = {
        global: {},
        add: function (elem, types, handler, data, selector) {
            var tmp, events, t, handleObjIn, special, eventHandle, handleObj, handlers, type, namespaces, origType, elemData = jQuery._data(elem);
            if (!elemData) {
                return;
            }
            if (handler.handler) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
                selector = handleObjIn.selector;
            }
            if (!handler.guid) {
                handler.guid = jQuery.guid++;
            }
            if (!(events = elemData.events)) {
                events = elemData.events = {};
            }
            if (!(eventHandle = elemData.handle)) {
                eventHandle = elemData.handle = function (e) {
                    return typeof jQuery !== core_strundefined && (!e || jQuery.event.triggered !== e.type) ? jQuery.event.dispatch.apply(eventHandle.elem, arguments) : undefined;
                };
                eventHandle.elem = elem;
            }
            types = (types || "").match(core_rnotwhite) || [""];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || "").split(".").sort();
                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                special = jQuery.event.special[type] || {};
                handleObj = jQuery.extend({
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                    namespace: namespaces.join(".")
                }, handleObjIn);
                if (!(handlers = events[type])) {
                    handlers = events[type] = [];
                    handlers.delegateCount = 0;
                    if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                        if (elem.addEventListener) {
                            elem.addEventListener(type, eventHandle, false);
                        } else if (elem.attachEvent) {
                            elem.attachEvent("on" + type, eventHandle);
                        }
                    }
                }
                if (special.add) {
                    special.add.call(elem, handleObj);
                    if (!handleObj.handler.guid) {
                        handleObj.handler.guid = handler.guid;
                    }
                }
                if (selector) {
                    handlers.splice(handlers.delegateCount++, 0, handleObj);
                } else {
                    handlers.push(handleObj);
                }
                jQuery.event.global[type] = true;
            }
            elem = null;
        },
        remove: function (elem, types, handler, selector, mappedTypes) {
            var j, handleObj, tmp, origCount, t, events, special, handlers, type, namespaces, origType, elemData = jQuery.hasData(elem) && jQuery._data(elem);
            if (!elemData || !(events = elemData.events)) {
                return;
            }
            types = (types || "").match(core_rnotwhite) || [""];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || "").split(".").sort();
                if (!type) {
                    for (type in events) {
                        jQuery.event.remove(elem, type + types[t], handler, selector, true);
                    }
                    continue;
                }
                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                handlers = events[type] || [];
                tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
                origCount = j = handlers.length;
                while (j--) {
                    handleObj = handlers[j];
                    if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
                        handlers.splice(j, 1);
                        if (handleObj.selector) {
                            handlers.delegateCount--;
                        }
                        if (special.remove) {
                            special.remove.call(elem, handleObj);
                        }
                    }
                }
                if (origCount && !handlers.length) {
                    if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
                        jQuery.removeEvent(elem, type, elemData.handle);
                    }
                    delete events[type];
                }
            }
            if (jQuery.isEmptyObject(events)) {
                delete elemData.handle;
                jQuery._removeData(elem, "events");
            }
        },
        trigger: function (event, data, elem, onlyHandlers) {
            var handle, ontype, cur, bubbleType, special, tmp, i, eventPath = [elem || document],
                type = core_hasOwn.call(event, "type") ? event.type : event,
                namespaces = core_hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
            cur = tmp = elem = elem || document;
            if (elem.nodeType === 3 || elem.nodeType === 8) {
                return;
            }
            if (rfocusMorph.test(type + jQuery.event.triggered)) {
                return;
            }
            if (type.indexOf(".") >= 0) {
                namespaces = type.split(".");
                type = namespaces.shift();
                namespaces.sort();
            }
            ontype = type.indexOf(":") < 0 && "on" + type;
            event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);
            event.isTrigger = true;
            event.namespace = namespaces.join(".");
            event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
            event.result = undefined;
            if (!event.target) {
                event.target = elem;
            }
            data = data == null ? [event] : jQuery.makeArray(data, [event]);
            special = jQuery.event.special[type] || {};
            if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
                return;
            }
            if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                bubbleType = special.delegateType || type;
                if (!rfocusMorph.test(bubbleType + type)) {
                    cur = cur.parentNode;
                }
                for (; cur; cur = cur.parentNode) {
                    eventPath.push(cur);
                    tmp = cur;
                }
                if (tmp === (elem.ownerDocument || document)) {
                    eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                }
            }
            i = 0;
            while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
                event.type = i > 1 ? bubbleType : special.bindType || type;
                handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle");
                if (handle) {
                    handle.apply(cur, data);
                }
                handle = ontype && cur[ontype];
                if (handle && jQuery.acceptData(cur) && handle.apply && handle.apply(cur, data) === false) {
                    event.preventDefault();
                }
            }
            event.type = type;
            if (!onlyHandlers && !event.isDefaultPrevented()) {
                if ((!special._default || special._default.apply(elem.ownerDocument, data) === false) && !(type === "click" && jQuery.nodeName(elem, "a")) && jQuery.acceptData(elem)) {
                    if (ontype && elem[type] && !jQuery.isWindow(elem)) {
                        tmp = elem[ontype];
                        if (tmp) {
                            elem[ontype] = null;
                        }
                        jQuery.event.triggered = type;
                        try {
                            elem[type]();
                        } catch (e) { }
                        jQuery.event.triggered = undefined;
                        if (tmp) {
                            elem[ontype] = tmp;
                        }
                    }
                }
            }
            return event.result;
        },
        dispatch: function (event) {
            event = jQuery.event.fix(event);
            var i, ret, handleObj, matched, j, handlerQueue = [],
                args = core_slice.call(arguments),
                handlers = (jQuery._data(this, "events") || {})[event.type] || [],
                special = jQuery.event.special[event.type] || {};
            args[0] = event;
            event.delegateTarget = this;
            if (special.preDispatch && special.preDispatch.call(this, event) === false) {
                return;
            }
            handlerQueue = jQuery.event.handlers.call(this, event, handlers);
            i = 0;
            while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
                event.currentTarget = matched.elem;
                j = 0;
                while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
                    if (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) {
                        event.handleObj = handleObj;
                        event.data = handleObj.data;
                        ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
                        if (ret !== undefined) {
                            if ((event.result = ret) === false) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                        }
                    }
                }
            }
            if (special.postDispatch) {
                special.postDispatch.call(this, event);
            }
            return event.result;
        },
        handlers: function (event, handlers) {
            var sel, handleObj, matches, i, handlerQueue = [],
                delegateCount = handlers.delegateCount,
                cur = event.target;
            if (delegateCount && cur.nodeType && (!event.button || event.type !== "click")) {
                for (; cur != this; cur = cur.parentNode || this) {
                    if (cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click")) {
                        matches = [];
                        for (i = 0; i < delegateCount; i++) {
                            handleObj = handlers[i];
                            sel = handleObj.selector + " ";
                            if (matches[sel] === undefined) {
                                matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [cur]).length;
                            }
                            if (matches[sel]) {
                                matches.push(handleObj);
                            }
                        }
                        if (matches.length) {
                            handlerQueue.push({
                                elem: cur,
                                handlers: matches
                            });
                        }
                    }
                }
            }
            if (delegateCount < handlers.length) {
                handlerQueue.push({
                    elem: this,
                    handlers: handlers.slice(delegateCount)
                });
            }
            return handlerQueue;
        },
        fix: function (event) {
            if (event[jQuery.expando]) {
                return event;
            }
            var i, prop, copy, type = event.type,
                originalEvent = event,
                fixHook = this.fixHooks[type];
            if (!fixHook) {
                this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {};
            }
            copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
            event = new jQuery.Event(originalEvent);
            i = copy.length;
            while (i--) {
                prop = copy[i];
                event[prop] = originalEvent[prop];
            }
            if (!event.target) {
                event.target = originalEvent.srcElement || document;
            }
            if (event.target.nodeType === 3) {
                event.target = event.target.parentNode;
            }
            event.metaKey = !!event.metaKey;
            return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function (event, original) {
                if (event.which == null) {
                    event.which = original.charCode != null ? original.charCode : original.keyCode;
                }
                return event;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (event, original) {
                var body, eventDoc, doc, button = original.button,
                    fromElement = original.fromElement;
                if (event.pageX == null && original.clientX != null) {
                    eventDoc = event.target.ownerDocument || document;
                    doc = eventDoc.documentElement;
                    body = eventDoc.body;
                    event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
                    event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
                }
                if (!event.relatedTarget && fromElement) {
                    event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
                }
                if (!event.which && button !== undefined) {
                    event.which = (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)));
                }
                return event;
            }
        },
        special: {
            load: {
                noBubble: true
            },
            click: {
                trigger: function () {
                    if (jQuery.nodeName(this, "input") && this.type === "checkbox" && this.click) {
                        this.click();
                        return false;
                    }
                }
            },
            focus: {
                trigger: function () {
                    if (this !== document.activeElement && this.focus) {
                        try {
                            this.focus();
                            return false;
                        } catch (e) { }
                    }
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function () {
                    if (this === document.activeElement && this.blur) {
                        this.blur();
                        return false;
                    }
                },
                delegateType: "focusout"
            },
            beforeunload: {
                postDispatch: function (event) {
                    if (event.result !== undefined) {
                        event.originalEvent.returnValue = event.result;
                    }
                }
            }
        },
        simulate: function (type, elem, event, bubble) {
            var e = jQuery.extend(new jQuery.Event(), event, {
                type: type,
                isSimulated: true,
                originalEvent: {}
            });
            if (bubble) {
                jQuery.event.trigger(e, null, elem);
            } else {
                jQuery.event.dispatch.call(elem, e);
            }
            if (e.isDefaultPrevented()) {
                event.preventDefault();
            }
        }
    };
    jQuery.removeEvent = document.removeEventListener ? function (elem, type, handle) {
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handle, false);
        }
    } : function (elem, type, handle) {
        var name = "on" + type;
        if (elem.detachEvent) {
            if (typeof elem[name] === core_strundefined) {
                elem[name] = null;
            }
            elem.detachEvent(name, handle);
        }
    };
    jQuery.Event = function (src, props) {
        if (!(this instanceof jQuery.Event)) {
            return new jQuery.Event(src, props);
        }
        if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;
            this.isDefaultPrevented = (src.defaultPrevented || src.returnValue === false || src.getPreventDefault && src.getPreventDefault()) ? returnTrue : returnFalse;
        } else {
            this.type = src;
        }
        if (props) {
            jQuery.extend(this, props);
        }
        this.timeStamp = src && src.timeStamp || jQuery.now();
        this[jQuery.expando] = true;
    };
    jQuery.Event.prototype = {
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        preventDefault: function () {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue;
            if (!e) {
                return;
            }
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            }
        },
        stopPropagation: function () {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue;
            if (!e) {
                return;
            }
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            e.cancelBubble = true;
        },
        stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = returnTrue;
            this.stopPropagation();
        }
    };
    jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function (orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function (event) {
                var ret, target = this,
                    related = event.relatedTarget,
                    handleObj = event.handleObj;
                if (!related || (related !== target && !jQuery.contains(target, related))) {
                    event.type = handleObj.origType;
                    ret = handleObj.handler.apply(this, arguments);
                    event.type = fix;
                }
                return ret;
            }
        };
    });
    if (!jQuery.support.submitBubbles) {
        jQuery.event.special.submit = {
            setup: function () {
                if (jQuery.nodeName(this, "form")) {
                    return false;
                }
                jQuery.event.add(this, "click._submit keypress._submit", function (e) {
                    var elem = e.target,
                        form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.form : undefined;
                    if (form && !jQuery._data(form, "submitBubbles")) {
                        jQuery.event.add(form, "submit._submit", function (event) {
                            event._submit_bubble = true;
                        });
                        jQuery._data(form, "submitBubbles", true);
                    }
                });
            },
            postDispatch: function (event) {
                if (event._submit_bubble) {
                    delete event._submit_bubble;
                    if (this.parentNode && !event.isTrigger) {
                        jQuery.event.simulate("submit", this.parentNode, event, true);
                    }
                }
            },
            teardown: function () {
                if (jQuery.nodeName(this, "form")) {
                    return false;
                }
                jQuery.event.remove(this, "._submit");
            }
        };
    }
    if (!jQuery.support.changeBubbles) {
        jQuery.event.special.change = {
            setup: function () {
                if (rformElems.test(this.nodeName)) {
                    if (this.type === "checkbox" || this.type === "radio") {
                        jQuery.event.add(this, "propertychange._change", function (event) {
                            if (event.originalEvent.propertyName === "checked") {
                                this._just_changed = true;
                            }
                        });
                        jQuery.event.add(this, "click._change", function (event) {
                            if (this._just_changed && !event.isTrigger) {
                                this._just_changed = false;
                            }
                            jQuery.event.simulate("change", this, event, true);
                        });
                    }
                    return false;
                }
                jQuery.event.add(this, "beforeactivate._change", function (e) {
                    var elem = e.target;
                    if (rformElems.test(elem.nodeName) && !jQuery._data(elem, "changeBubbles")) {
                        jQuery.event.add(elem, "change._change", function (event) {
                            if (this.parentNode && !event.isSimulated && !event.isTrigger) {
                                jQuery.event.simulate("change", this.parentNode, event, true);
                            }
                        });
                        jQuery._data(elem, "changeBubbles", true);
                    }
                });
            },
            handle: function (event) {
                var elem = event.target;
                if (this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox")) {
                    return event.handleObj.handler.apply(this, arguments);
                }
            },
            teardown: function () {
                jQuery.event.remove(this, "._change");
                return !rformElems.test(this.nodeName);
            }
        };
    }
    if (!jQuery.support.focusinBubbles) {
        jQuery.each({
            focus: "focusin",
            blur: "focusout"
        }, function (orig, fix) {
            var attaches = 0,
                handler = function (event) {
                    jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true);
                };
            jQuery.event.special[fix] = {
                setup: function () {
                    if (attaches++ === 0) {
                        document.addEventListener(orig, handler, true);
                    }
                },
                teardown: function () {
                    if (--attaches === 0) {
                        document.removeEventListener(orig, handler, true);
                    }
                }
            };
        });
    }
    jQuery.fn.extend({
        on: function (types, selector, data, fn, one) {
            var type, origFn;
            if (typeof types === "object") {
                if (typeof selector !== "string") {
                    data = data || selector;
                    selector = undefined;
                }
                for (type in types) {
                    this.on(type, selector, data, types[type], one);
                }
                return this;
            }
            if (data == null && fn == null) {
                fn = selector;
                data = selector = undefined;
            } else if (fn == null) {
                if (typeof selector === "string") {
                    fn = data;
                    data = undefined;
                } else {
                    fn = data;
                    data = selector;
                    selector = undefined;
                }
            }
            if (fn === false) {
                fn = returnFalse;
            } else if (!fn) {
                return this;
            }
            if (one === 1) {
                origFn = fn;
                fn = function (event) {
                    jQuery().off(event);
                    return origFn.apply(this, arguments);
                };
                fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
            }
            return this.each(function () {
                jQuery.event.add(this, types, fn, data, selector);
            });
        },
        one: function (types, selector, data, fn) {
            return this.on(types, selector, data, fn, 1);
        },
        off: function (types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) {
                handleObj = types.handleObj;
                jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
                return this;
            }
            if (typeof types === "object") {
                for (type in types) {
                    this.off(type, selector, types[type]);
                }
                return this;
            }
            if (selector === false || typeof selector === "function") {
                fn = selector;
                selector = undefined;
            }
            if (fn === false) {
                fn = returnFalse;
            }
            return this.each(function () {
                jQuery.event.remove(this, types, fn, selector);
            });
        },
        bind: function (types, data, fn) {
            return this.on(types, null, data, fn);
        },
        unbind: function (types, fn) {
            return this.off(types, null, fn);
        },
        delegate: function (selector, types, data, fn) {
            return this.on(types, selector, data, fn);
        },
        undelegate: function (selector, types, fn) {
            return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
        },
        trigger: function (type, data) {
            return this.each(function () {
                jQuery.event.trigger(type, data, this);
            });
        },
        triggerHandler: function (type, data) {
            var elem = this[0];
            if (elem) {
                return jQuery.event.trigger(type, data, elem, true);
            }
        }
    });
    (function (window, undefined) {
        var i, cachedruns, Expr, getText, isXML, compile, hasDuplicate, outermostContext, setDocument, document, docElem, documentIsXML, rbuggyQSA, rbuggyMatches, matches, contains, sortOrder, expando = "sizzle" + -(new Date()),
            preferredDoc = window.document,
            support = {},
            dirruns = 0,
            done = 0,
            classCache = createCache(),
            tokenCache = createCache(),
            compilerCache = createCache(),
            strundefined = typeof undefined,
            MAX_NEGATIVE = 1 << 31,
            arr = [],
            pop = arr.pop,
            push = arr.push,
            slice = arr.slice,
            indexOf = arr.indexOf || function (elem) {
                var i = 0,
                    len = this.length;
                for (; i < len; i++) {
                    if (this[i] === elem) {
                        return i;
                    }
                }
                return -1;
            },
            whitespace = "[\\x20\\t\\r\\n\\f]",
            characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            identifier = characterEncoding.replace("w", "w#"),
            operators = "([*^$|!~]?=)",
            attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace + "*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",
            pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace(3, 8) + ")*)|.*)\\)|)",
            rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
            rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
            rcombinators = new RegExp("^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*"),
            rpseudo = new RegExp(pseudos),
            ridentifier = new RegExp("^" + identifier + "$"),
            matchExpr = {
                "ID": new RegExp("^#(" + characterEncoding + ")"),
                "CLASS": new RegExp("^\\.(" + characterEncoding + ")"),
                "NAME": new RegExp("^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]"),
                "TAG": new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
                "ATTR": new RegExp("^" + attributes),
                "PSEUDO": new RegExp("^" + pseudos),
                "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
                "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                    whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
            },
            rsibling = /[\x20\t\r\n\f]*[+~]/,
            rnative = /^[^{]+\{\s*\[native code/,
            rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            rinputs = /^(?:input|select|textarea|button)$/i,
            rheader = /^h\d$/i,
            rescape = /'|\\/g,
            rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
            runescape = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,
            funescape = function (_, escaped) {
                var high = "0x" + escaped - 0x10000;
                return high !== high ? escaped : high < 0 ? String.fromCharCode(high + 0x10000) : String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
            };
        try {
            slice.call(preferredDoc.documentElement.childNodes, 0)[0].nodeType;
        } catch (e) {
            slice = function (i) {
                var elem, results = [];
                while ((elem = this[i++])) {
                    results.push(elem);
                }
                return results;
            };
        }

        function isNative(fn) {
            return rnative.test(fn + "");
        }

        function createCache() {
            var cache, keys = [];
            return (cache = function (key, value) {
                if (keys.push(key += " ") > Expr.cacheLength) {
                    delete cache[keys.shift()];
                }
                return (cache[key] = value);
            });
        }

        function markFunction(fn) {
            fn[expando] = true;
            return fn;
        }

        function assert(fn) {
            var div = document.createElement("div");
            try {
                return fn(div);
            } catch (e) {
                return false;
            } finally {
                div = null;
            }
        }

        function Sizzle(selector, context, results, seed) {
            var match, elem, m, nodeType, i, groups, old, nid, newContext, newSelector;
            if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
                setDocument(context);
            }
            context = context || document;
            results = results || [];
            if (!selector || typeof selector !== "string") {
                return results;
            }
            if ((nodeType = context.nodeType) !== 1 && nodeType !== 9) {
                return [];
            }
            if (!documentIsXML && !seed) {
                if ((match = rquickExpr.exec(selector))) {
                    if ((m = match[1])) {
                        if (nodeType === 9) {
                            elem = context.getElementById(m);
                            if (elem && elem.parentNode) {
                                if (elem.id === m) {
                                    results.push(elem);
                                    return results;
                                }
                            } else {
                                return results;
                            }
                        } else {
                            if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) {
                                results.push(elem);
                                return results;
                            }
                        }
                    } else if (match[2]) {
                        push.apply(results, slice.call(context.getElementsByTagName(selector), 0));
                        return results;
                    } else if ((m = match[3]) && support.getByClassName && context.getElementsByClassName) {
                        push.apply(results, slice.call(context.getElementsByClassName(m), 0));
                        return results;
                    }
                }
                if (support.qsa && !rbuggyQSA.test(selector)) {
                    old = true;
                    nid = expando;
                    newContext = context;
                    newSelector = nodeType === 9 && selector;
                    if (nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
                        groups = tokenize(selector);
                        if ((old = context.getAttribute("id"))) {
                            nid = old.replace(rescape, "\\$&");
                        } else {
                            context.setAttribute("id", nid);
                        }
                        nid = "[id='" + nid + "'] ";
                        i = groups.length;
                        while (i--) {
                            groups[i] = nid + toSelector(groups[i]);
                        }
                        newContext = rsibling.test(selector) && context.parentNode || context;
                        newSelector = groups.join(",");
                    }
                    if (newSelector) {
                        try {
                            push.apply(results, slice.call(newContext.querySelectorAll(newSelector), 0));
                            return results;
                        } catch (qsaError) { } finally {
                            if (!old) {
                                context.removeAttribute("id");
                            }
                        }
                    }
                }
            }
            return select(selector.replace(rtrim, "$1"), context, results, seed);
        }
        isXML = Sizzle.isXML = function (elem) {
            var documentElement = elem && (elem.ownerDocument || elem).documentElement;
            return documentElement ? documentElement.nodeName !== "HTML" : false;
        };
        setDocument = Sizzle.setDocument = function (node) {
            var doc = node ? node.ownerDocument || node : preferredDoc;
            if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
                return document;
            }
            document = doc;
            docElem = doc.documentElement;
            documentIsXML = isXML(doc);
            support.tagNameNoComments = assert(function (div) {
                div.appendChild(doc.createComment(""));
                return !div.getElementsByTagName("*").length;
            });
            support.attributes = assert(function (div) {
                div.innerHTML = "<select></select>";
                var type = typeof div.lastChild.getAttribute("multiple");
                return type !== "boolean" && type !== "string";
            });
            support.getByClassName = assert(function (div) {
                div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
                if (!div.getElementsByClassName || !div.getElementsByClassName("e").length) {
                    return false;
                }
                div.lastChild.className = "e";
                return div.getElementsByClassName("e").length === 2;
            });
            support.getByName = assert(function (div) {
                div.id = expando + 0;
                div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
                docElem.insertBefore(div, docElem.firstChild);
                var pass = doc.getElementsByName && doc.getElementsByName(expando).length === 2 +
                    doc.getElementsByName(expando + 0).length;
                support.getIdNotName = !doc.getElementById(expando);
                docElem.removeChild(div);
                return pass;
            });
            Expr.attrHandle = assert(function (div) {
                div.innerHTML = "<a href='#'></a>";
                return div.firstChild && typeof div.firstChild.getAttribute !== strundefined && div.firstChild.getAttribute("href") === "#";
            }) ? {} : {
                    "href": function (elem) {
                        return elem.getAttribute("href", 2);
                    },
                    "type": function (elem) {
                        return elem.getAttribute("type");
                    }
                };
            if (support.getIdNotName) {
                Expr.find["ID"] = function (id, context) {
                    if (typeof context.getElementById !== strundefined && !documentIsXML) {
                        var m = context.getElementById(id);
                        return m && m.parentNode ? [m] : [];
                    }
                };
                Expr.filter["ID"] = function (id) {
                    var attrId = id.replace(runescape, funescape);
                    return function (elem) {
                        return elem.getAttribute("id") === attrId;
                    };
                };
            } else {
                Expr.find["ID"] = function (id, context) {
                    if (typeof context.getElementById !== strundefined && !documentIsXML) {
                        var m = context.getElementById(id);
                        return m ? m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ? [m] : undefined : [];
                    }
                };
                Expr.filter["ID"] = function (id) {
                    var attrId = id.replace(runescape, funescape);
                    return function (elem) {
                        var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                        return node && node.value === attrId;
                    };
                };
            }
            Expr.find["TAG"] = support.tagNameNoComments ? function (tag, context) {
                if (typeof context.getElementsByTagName !== strundefined) {
                    return context.getElementsByTagName(tag);
                }
            } : function (tag, context) {
                var elem, tmp = [],
                    i = 0,
                    results = context.getElementsByTagName(tag);
                if (tag === "*") {
                    while ((elem = results[i++])) {
                        if (elem.nodeType === 1) {
                            tmp.push(elem);
                        }
                    }
                    return tmp;
                }
                return results;
            };
            Expr.find["NAME"] = support.getByName && function (tag, context) {
                if (typeof context.getElementsByName !== strundefined) {
                    return context.getElementsByName(name);
                }
            };
            Expr.find["CLASS"] = support.getByClassName && function (className, context) {
                if (typeof context.getElementsByClassName !== strundefined && !documentIsXML) {
                    return context.getElementsByClassName(className);
                }
            };
            rbuggyMatches = [];
            rbuggyQSA = [":focus"];
            if ((support.qsa = isNative(doc.querySelectorAll))) {
                assert(function (div) {
                    div.innerHTML = "<select><option selected=''></option></select>";
                    if (!div.querySelectorAll("[selected]").length) {
                        rbuggyQSA.push("\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)");
                    }
                    if (!div.querySelectorAll(":checked").length) {
                        rbuggyQSA.push(":checked");
                    }
                });
                assert(function (div) {
                    div.innerHTML = "<input type='hidden' i=''/>";
                    if (div.querySelectorAll("[i^='']").length) {
                        rbuggyQSA.push("[*^$]=" + whitespace + "*(?:\"\"|'')");
                    }
                    if (!div.querySelectorAll(":enabled").length) {
                        rbuggyQSA.push(":enabled", ":disabled");
                    }
                    div.querySelectorAll("*,:x");
                    rbuggyQSA.push(",.*:");
                });
            }
            if ((support.matchesSelector = isNative((matches = docElem.matchesSelector || docElem.mozMatchesSelector || docElem.webkitMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)))) {
                assert(function (div) {
                    support.disconnectedMatch = matches.call(div, "div");
                    matches.call(div, "[s!='']:x");
                    rbuggyMatches.push("!=", pseudos);
                });
            }
            rbuggyQSA = new RegExp(rbuggyQSA.join("|"));
            rbuggyMatches = new RegExp(rbuggyMatches.join("|"));
            contains = isNative(docElem.contains) || docElem.compareDocumentPosition ? function (a, b) {
                var adown = a.nodeType === 9 ? a.documentElement : a,
                    bup = b && b.parentNode;
                return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
            } : function (a, b) {
                if (b) {
                    while ((b = b.parentNode)) {
                        if (b === a) {
                            return true;
                        }
                    }
                }
                return false;
            };
            sortOrder = docElem.compareDocumentPosition ? function (a, b) {
                var compare;
                if (a === b) {
                    hasDuplicate = true;
                    return 0;
                }
                if ((compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition(b))) {
                    if (compare & 1 || a.parentNode && a.parentNode.nodeType === 11) {
                        if (a === doc || contains(preferredDoc, a)) {
                            return -1;
                        }
                        if (b === doc || contains(preferredDoc, b)) {
                            return 1;
                        }
                        return 0;
                    }
                    return compare & 4 ? -1 : 1;
                }
                return a.compareDocumentPosition ? -1 : 1;
            } : function (a, b) {
                var cur, i = 0,
                    aup = a.parentNode,
                    bup = b.parentNode,
                    ap = [a],
                    bp = [b];
                if (a === b) {
                    hasDuplicate = true;
                    return 0;
                } else if (!aup || !bup) {
                    return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : 0;
                } else if (aup === bup) {
                    return siblingCheck(a, b);
                }
                cur = a;
                while ((cur = cur.parentNode)) {
                    ap.unshift(cur);
                }
                cur = b;
                while ((cur = cur.parentNode)) {
                    bp.unshift(cur);
                }
                while (ap[i] === bp[i]) {
                    i++;
                }
                return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
            };
            hasDuplicate = false;
            [0, 0].sort(sortOrder);
            support.detectDuplicates = hasDuplicate;
            return document;
        };
        Sizzle.matches = function (expr, elements) {
            return Sizzle(expr, null, null, elements);
        };
        Sizzle.matchesSelector = function (elem, expr) {
            if ((elem.ownerDocument || elem) !== document) {
                setDocument(elem);
            }
            expr = expr.replace(rattributeQuotes, "='$1']");
            if (support.matchesSelector && !documentIsXML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && !rbuggyQSA.test(expr)) {
                try {
                    var ret = matches.call(elem, expr);
                    if (ret || support.disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
                        return ret;
                    }
                } catch (e) { }
            }
            return Sizzle(expr, document, null, [elem]).length > 0;
        };
        Sizzle.contains = function (context, elem) {
            if ((context.ownerDocument || context) !== document) {
                setDocument(context);
            }
            return contains(context, elem);
        };
        Sizzle.attr = function (elem, name) {
            var val;
            if ((elem.ownerDocument || elem) !== document) {
                setDocument(elem);
            }
            if (!documentIsXML) {
                name = name.toLowerCase();
            }
            if ((val = Expr.attrHandle[name])) {
                return val(elem);
            }
            if (documentIsXML || support.attributes) {
                return elem.getAttribute(name);
            }
            return ((val = elem.getAttributeNode(name)) || elem.getAttribute(name)) && elem[name] === true ? name : val && val.specified ? val.value : null;
        };
        Sizzle.error = function (msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg);
        };
        Sizzle.uniqueSort = function (results) {
            var elem, duplicates = [],
                i = 1,
                j = 0;
            hasDuplicate = !support.detectDuplicates;
            results.sort(sortOrder);
            if (hasDuplicate) {
                for (;
                    (elem = results[i]); i++) {
                    if (elem === results[i - 1]) {
                        j = duplicates.push(i);
                    }
                }
                while (j--) {
                    results.splice(duplicates[j], 1);
                }
            }
            return results;
        };

        function siblingCheck(a, b) {
            var cur = b && a,
                diff = cur && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
            if (diff) {
                return diff;
            }
            if (cur) {
                while ((cur = cur.nextSibling)) {
                    if (cur === b) {
                        return -1;
                    }
                }
            }
            return a ? 1 : -1;
        }

        function createInputPseudo(type) {
            return function (elem) {
                var name = elem.nodeName.toLowerCase();
                return name === "input" && elem.type === type;
            };
        }

        function createButtonPseudo(type) {
            return function (elem) {
                var name = elem.nodeName.toLowerCase();
                return (name === "input" || name === "button") && elem.type === type;
            };
        }

        function createPositionalPseudo(fn) {
            return markFunction(function (argument) {
                argument = +argument;
                return markFunction(function (seed, matches) {
                    var j, matchIndexes = fn([], seed.length, argument),
                        i = matchIndexes.length;
                    while (i--) {
                        if (seed[(j = matchIndexes[i])]) {
                            seed[j] = !(matches[j] = seed[j]);
                        }
                    }
                });
            });
        }
        getText = Sizzle.getText = function (elem) {
            var node, ret = "",
                i = 0,
                nodeType = elem.nodeType;
            if (!nodeType) {
                for (;
                    (node = elem[i]); i++) {
                    ret += getText(node);
                }
            } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                if (typeof elem.textContent === "string") {
                    return elem.textContent;
                } else {
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                        ret += getText(elem);
                    }
                }
            } else if (nodeType === 3 || nodeType === 4) {
                return elem.nodeValue;
            }
            return ret;
        };
        Expr = Sizzle.selectors = {
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: true
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: true
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                "ATTR": function (match) {
                    match[1] = match[1].replace(runescape, funescape);
                    match[3] = (match[4] || match[5] || "").replace(runescape, funescape);
                    if (match[2] === "~=") {
                        match[3] = " " + match[3] + " ";
                    }
                    return match.slice(0, 4);
                },
                "CHILD": function (match) {
                    match[1] = match[1].toLowerCase();
                    if (match[1].slice(0, 3) === "nth") {
                        if (!match[3]) {
                            Sizzle.error(match[0]);
                        }
                        match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
                        match[5] = +((match[7] + match[8]) || match[3] === "odd");
                    } else if (match[3]) {
                        Sizzle.error(match[0]);
                    }
                    return match;
                },
                "PSEUDO": function (match) {
                    var excess, unquoted = !match[5] && match[2];
                    if (matchExpr["CHILD"].test(match[0])) {
                        return null;
                    }
                    if (match[4]) {
                        match[2] = match[4];
                    } else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
                        match[0] = match[0].slice(0, excess);
                        match[2] = unquoted.slice(0, excess);
                    }
                    return match.slice(0, 3);
                }
            },
            filter: {
                "TAG": function (nodeName) {
                    if (nodeName === "*") {
                        return function () {
                            return true;
                        };
                    }
                    nodeName = nodeName.replace(runescape, funescape).toLowerCase();
                    return function (elem) {
                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                    };
                },
                "CLASS": function (className) {
                    var pattern = classCache[className + " "];
                    return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function (elem) {
                        return pattern.test(elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "");
                    });
                },
                "ATTR": function (name, operator, check) {
                    return function (elem) {
                        var result = Sizzle.attr(elem, name);
                        if (result == null) {
                            return operator === "!=";
                        }
                        if (!operator) {
                            return true;
                        }
                        result += "";
                        return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
                    };
                },
                "CHILD": function (type, what, argument, first, last) {
                    var simple = type.slice(0, 3) !== "nth",
                        forward = type.slice(-4) !== "last",
                        ofType = what === "of-type";
                    return first === 1 && last === 0 ? function (elem) {
                        return !!elem.parentNode;
                    } : function (elem, context, xml) {
                        var cache, outerCache, node, diff, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling",
                            parent = elem.parentNode,
                            name = ofType && elem.nodeName.toLowerCase(),
                            useCache = !xml && !ofType;
                        if (parent) {
                            if (simple) {
                                while (dir) {
                                    node = elem;
                                    while ((node = node[dir])) {
                                        if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                                            return false;
                                        }
                                    }
                                    start = dir = type === "only" && !start && "nextSibling";
                                }
                                return true;
                            }
                            start = [forward ? parent.firstChild : parent.lastChild];
                            if (forward && useCache) {
                                outerCache = parent[expando] || (parent[expando] = {});
                                cache = outerCache[type] || [];
                                nodeIndex = cache[0] === dirruns && cache[1];
                                diff = cache[0] === dirruns && cache[2];
                                node = nodeIndex && parent.childNodes[nodeIndex];
                                while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
                                    if (node.nodeType === 1 && ++diff && node === elem) {
                                        outerCache[type] = [dirruns, nodeIndex, diff];
                                        break;
                                    }
                                }
                            } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) {
                                diff = cache[1];
                            } else {
                                while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
                                    if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                                        if (useCache) {
                                            (node[expando] || (node[expando] = {}))[type] = [dirruns, diff];
                                        }
                                        if (node === elem) {
                                            break;
                                        }
                                    }
                                }
                            }
                            diff -= last;
                            return diff === first || (diff % first === 0 && diff / first >= 0);
                        }
                    };
                },
                "PSEUDO": function (pseudo, argument) {
                    var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                    if (fn[expando]) {
                        return fn(argument);
                    }
                    if (fn.length > 1) {
                        args = [pseudo, pseudo, "", argument];
                        return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
                            var idx, matched = fn(seed, argument),
                                i = matched.length;
                            while (i--) {
                                idx = indexOf.call(seed, matched[i]);
                                seed[idx] = !(matches[idx] = matched[i]);
                            }
                        }) : function (elem) {
                            return fn(elem, 0, args);
                        };
                    }
                    return fn;
                }
            },
            pseudos: {
                "not": markFunction(function (selector) {
                    var input = [],
                        results = [],
                        matcher = compile(selector.replace(rtrim, "$1"));
                    return matcher[expando] ? markFunction(function (seed, matches, context, xml) {
                        var elem, unmatched = matcher(seed, null, xml, []),
                            i = seed.length;
                        while (i--) {
                            if ((elem = unmatched[i])) {
                                seed[i] = !(matches[i] = elem);
                            }
                        }
                    }) : function (elem, context, xml) {
                        input[0] = elem;
                        matcher(input, null, xml, results);
                        return !results.pop();
                    };
                }),
                "has": markFunction(function (selector) {
                    return function (elem) {
                        return Sizzle(selector, elem).length > 0;
                    };
                }),
                "contains": markFunction(function (text) {
                    return function (elem) {
                        return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
                    };
                }),
                "lang": markFunction(function (lang) {
                    if (!ridentifier.test(lang || "")) {
                        Sizzle.error("unsupported lang: " + lang);
                    }
                    lang = lang.replace(runescape, funescape).toLowerCase();
                    return function (elem) {
                        var elemLang;
                        do {
                            if ((elemLang = documentIsXML ? elem.getAttribute("xml:lang") || elem.getAttribute("lang") : elem.lang)) {
                                elemLang = elemLang.toLowerCase();
                                return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
                            }
                        } while ((elem = elem.parentNode) && elem.nodeType === 1);
                        return false;
                    };
                }),
                "target": function (elem) {
                    var hash = window.location && window.location.hash;
                    return hash && hash.slice(1) === elem.id;
                },
                "root": function (elem) {
                    return elem === docElem;
                },
                "focus": function (elem) {
                    return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                },
                "enabled": function (elem) {
                    return elem.disabled === false;
                },
                "disabled": function (elem) {
                    return elem.disabled === true;
                },
                "checked": function (elem) {
                    var nodeName = elem.nodeName.toLowerCase();
                    return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
                },
                "selected": function (elem) {
                    if (elem.parentNode) {
                        elem.parentNode.selectedIndex;
                    }
                    return elem.selected === true;
                },
                "empty": function (elem) {
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                        if (elem.nodeName > "@" || elem.nodeType === 3 || elem.nodeType === 4) {
                            return false;
                        }
                    }
                    return true;
                },
                "parent": function (elem) {
                    return !Expr.pseudos["empty"](elem);
                },
                "header": function (elem) {
                    return rheader.test(elem.nodeName);
                },
                "input": function (elem) {
                    return rinputs.test(elem.nodeName);
                },
                "button": function (elem) {
                    var name = elem.nodeName.toLowerCase();
                    return name === "input" && elem.type === "button" || name === "button";
                },
                "text": function (elem) {
                    var attr;
                    return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type);
                },
                "first": createPositionalPseudo(function () {
                    return [0];
                }),
                "last": createPositionalPseudo(function (matchIndexes, length) {
                    return [length - 1];
                }),
                "eq": createPositionalPseudo(function (matchIndexes, length, argument) {
                    return [argument < 0 ? argument + length : argument];
                }),
                "even": createPositionalPseudo(function (matchIndexes, length) {
                    var i = 0;
                    for (; i < length; i += 2) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                }),
                "odd": createPositionalPseudo(function (matchIndexes, length) {
                    var i = 1;
                    for (; i < length; i += 2) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                }),
                "lt": createPositionalPseudo(function (matchIndexes, length, argument) {
                    var i = argument < 0 ? argument + length : argument;
                    for (; --i >= 0;) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                }),
                "gt": createPositionalPseudo(function (matchIndexes, length, argument) {
                    var i = argument < 0 ? argument + length : argument;
                    for (; ++i < length;) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                })
            }
        };
        for (i in {
            radio: true,
            checkbox: true,
            file: true,
            password: true,
            image: true
        }) {
            Expr.pseudos[i] = createInputPseudo(i);
        }
        for (i in {
            submit: true,
            reset: true
        }) {
            Expr.pseudos[i] = createButtonPseudo(i);
        }

        function tokenize(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
            if (cached) {
                return parseOnly ? 0 : cached.slice(0);
            }
            soFar = selector;
            groups = [];
            preFilters = Expr.preFilter;
            while (soFar) {
                if (!matched || (match = rcomma.exec(soFar))) {
                    if (match) {
                        soFar = soFar.slice(match[0].length) || soFar;
                    }
                    groups.push(tokens = []);
                }
                matched = false;
                if ((match = rcombinators.exec(soFar))) {
                    matched = match.shift();
                    tokens.push({
                        value: matched,
                        type: match[0].replace(rtrim, " ")
                    });
                    soFar = soFar.slice(matched.length);
                }
                for (type in Expr.filter) {
                    if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
                        matched = match.shift();
                        tokens.push({
                            value: matched,
                            type: type,
                            matches: match
                        });
                        soFar = soFar.slice(matched.length);
                    }
                }
                if (!matched) {
                    break;
                }
            }
            return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
        }

        function toSelector(tokens) {
            var i = 0,
                len = tokens.length,
                selector = "";
            for (; i < len; i++) {
                selector += tokens[i].value;
            }
            return selector;
        }

        function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir,
                checkNonElements = base && dir === "parentNode",
                doneName = done++;
            return combinator.first ? function (elem, context, xml) {
                while ((elem = elem[dir])) {
                    if (elem.nodeType === 1 || checkNonElements) {
                        return matcher(elem, context, xml);
                    }
                }
            } : function (elem, context, xml) {
                var data, cache, outerCache, dirkey = dirruns + " " + doneName;
                if (xml) {
                    while ((elem = elem[dir])) {
                        if (elem.nodeType === 1 || checkNonElements) {
                            if (matcher(elem, context, xml)) {
                                return true;
                            }
                        }
                    }
                } else {
                    while ((elem = elem[dir])) {
                        if (elem.nodeType === 1 || checkNonElements) {
                            outerCache = elem[expando] || (elem[expando] = {});
                            if ((cache = outerCache[dir]) && cache[0] === dirkey) {
                                if ((data = cache[1]) === true || data === cachedruns) {
                                    return data === true;
                                }
                            } else {
                                cache = outerCache[dir] = [dirkey];
                                cache[1] = matcher(elem, context, xml) || cachedruns;
                                if (cache[1] === true) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            };
        }

        function elementMatcher(matchers) {
            return matchers.length > 1 ? function (elem, context, xml) {
                var i = matchers.length;
                while (i--) {
                    if (!matchers[i](elem, context, xml)) {
                        return false;
                    }
                }
                return true;
            } : matchers[0];
        }

        function condense(unmatched, map, filter, context, xml) {
            var elem, newUnmatched = [],
                i = 0,
                len = unmatched.length,
                mapped = map != null;
            for (; i < len; i++) {
                if ((elem = unmatched[i])) {
                    if (!filter || filter(elem, context, xml)) {
                        newUnmatched.push(elem);
                        if (mapped) {
                            map.push(i);
                        }
                    }
                }
            }
            return newUnmatched;
        }

        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            if (postFilter && !postFilter[expando]) {
                postFilter = setMatcher(postFilter);
            }
            if (postFinder && !postFinder[expando]) {
                postFinder = setMatcher(postFinder, postSelector);
            }
            return markFunction(function (seed, results, context, xml) {
                var temp, i, elem, preMap = [],
                    postMap = [],
                    preexisting = results.length,
                    elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
                    matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
                    matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                if (matcher) {
                    matcher(matcherIn, matcherOut, context, xml);
                }
                if (postFilter) {
                    temp = condense(matcherOut, postMap);
                    postFilter(temp, [], context, xml);
                    i = temp.length;
                    while (i--) {
                        if ((elem = temp[i])) {
                            matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
                        }
                    }
                }
                if (seed) {
                    if (postFinder || preFilter) {
                        if (postFinder) {
                            temp = [];
                            i = matcherOut.length;
                            while (i--) {
                                if ((elem = matcherOut[i])) {
                                    temp.push((matcherIn[i] = elem));
                                }
                            }
                            postFinder(null, (matcherOut = []), temp, xml);
                        }
                        i = matcherOut.length;
                        while (i--) {
                            if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1) {
                                seed[temp] = !(results[temp] = elem);
                            }
                        }
                    }
                } else {
                    matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
                    if (postFinder) {
                        postFinder(null, results, matcherOut, xml);
                    } else {
                        push.apply(results, matcherOut);
                    }
                }
            });
        }

        function matcherFromTokens(tokens) {
            var checkContext, matcher, j, len = tokens.length,
                leadingRelative = Expr.relative[tokens[0].type],
                implicitRelative = leadingRelative || Expr.relative[" "],
                i = leadingRelative ? 1 : 0,
                matchContext = addCombinator(function (elem) {
                    return elem === checkContext;
                }, implicitRelative, true),
                matchAnyContext = addCombinator(function (elem) {
                    return indexOf.call(checkContext, elem) > -1;
                }, implicitRelative, true),
                matchers = [function (elem, context, xml) {
                    return (!leadingRelative && (xml || context !== outermostContext)) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
                }];
            for (; i < len; i++) {
                if ((matcher = Expr.relative[tokens[i].type])) {
                    matchers = [addCombinator(elementMatcher(matchers), matcher)];
                } else {
                    matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
                    if (matcher[expando]) {
                        j = ++i;
                        for (; j < len; j++) {
                            if (Expr.relative[tokens[j].type]) {
                                break;
                            }
                        }
                        return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1)).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens((tokens = tokens.slice(j))), j < len && toSelector(tokens));
                    }
                    matchers.push(matcher);
                }
            }
            return elementMatcher(matchers);
        }

        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var matcherCachedRuns = 0,
                bySet = setMatchers.length > 0,
                byElement = elementMatchers.length > 0,
                superMatcher = function (seed, context, xml, results, expandContext) {
                    var elem, j, matcher, setMatched = [],
                        matchedCount = 0,
                        i = "0",
                        unmatched = seed && [],
                        outermost = expandContext != null,
                        contextBackup = outermostContext,
                        elems = seed || byElement && Expr.find["TAG"]("*", expandContext && context.parentNode || context),
                        dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1);
                    if (outermost) {
                        outermostContext = context !== document && context;
                        cachedruns = matcherCachedRuns;
                    }
                    for (;
                        (elem = elems[i]) != null; i++) {
                        if (byElement && elem) {
                            j = 0;
                            while ((matcher = elementMatchers[j++])) {
                                if (matcher(elem, context, xml)) {
                                    results.push(elem);
                                    break;
                                }
                            }
                            if (outermost) {
                                dirruns = dirrunsUnique;
                                cachedruns = ++matcherCachedRuns;
                            }
                        }
                        if (bySet) {
                            if ((elem = !matcher && elem)) {
                                matchedCount--;
                            }
                            if (seed) {
                                unmatched.push(elem);
                            }
                        }
                    }
                    matchedCount += i;
                    if (bySet && i !== matchedCount) {
                        j = 0;
                        while ((matcher = setMatchers[j++])) {
                            matcher(unmatched, setMatched, context, xml);
                        }
                        if (seed) {
                            if (matchedCount > 0) {
                                while (i--) {
                                    if (!(unmatched[i] || setMatched[i])) {
                                        setMatched[i] = pop.call(results);
                                    }
                                }
                            }
                            setMatched = condense(setMatched);
                        }
                        push.apply(results, setMatched);
                        if (outermost && !seed && setMatched.length > 0 && (matchedCount + setMatchers.length) > 1) {
                            Sizzle.uniqueSort(results);
                        }
                    }
                    if (outermost) {
                        dirruns = dirrunsUnique;
                        outermostContext = contextBackup;
                    }
                    return unmatched;
                };
            return bySet ? markFunction(superMatcher) : superMatcher;
        }
        compile = Sizzle.compile = function (selector, group) {
            var i, setMatchers = [],
                elementMatchers = [],
                cached = compilerCache[selector + " "];
            if (!cached) {
                if (!group) {
                    group = tokenize(selector);
                }
                i = group.length;
                while (i--) {
                    cached = matcherFromTokens(group[i]);
                    if (cached[expando]) {
                        setMatchers.push(cached);
                    } else {
                        elementMatchers.push(cached);
                    }
                }
                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
            }
            return cached;
        };

        function multipleContexts(selector, contexts, results) {
            var i = 0,
                len = contexts.length;
            for (; i < len; i++) {
                Sizzle(selector, contexts[i], results);
            }
            return results;
        }

        function select(selector, context, results, seed) {
            var i, tokens, token, type, find, match = tokenize(selector);
            if (!seed) {
                if (match.length === 1) {
                    tokens = match[0] = match[0].slice(0);
                    if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && !documentIsXML && Expr.relative[tokens[1].type]) {
                        context = Expr.find["ID"](token.matches[0].replace(runescape, funescape), context)[0];
                        if (!context) {
                            return results;
                        }
                        selector = selector.slice(tokens.shift().value.length);
                    }
                    i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
                    while (i--) {
                        token = tokens[i];
                        if (Expr.relative[(type = token.type)]) {
                            break;
                        }
                        if ((find = Expr.find[type])) {
                            if ((seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && context.parentNode || context))) {
                                tokens.splice(i, 1);
                                selector = seed.length && toSelector(tokens);
                                if (!selector) {
                                    push.apply(results, slice.call(seed, 0));
                                    return results;
                                }
                                break;
                            }
                        }
                    }
                }
            }
            compile(selector, match)(seed, context, documentIsXML, results, rsibling.test(selector));
            return results;
        }
        Expr.pseudos["nth"] = Expr.pseudos["eq"];

        function setFilters() { }
        Expr.filters = setFilters.prototype = Expr.pseudos;
        Expr.setFilters = new setFilters();
        setDocument();
        Sizzle.attr = jQuery.attr;
        jQuery.find = Sizzle;
        jQuery.expr = Sizzle.selectors;
        jQuery.expr[":"] = jQuery.expr.pseudos;
        jQuery.unique = Sizzle.uniqueSort;
        jQuery.text = Sizzle.getText;
        jQuery.isXMLDoc = Sizzle.isXML;
        jQuery.contains = Sizzle.contains;
    })(window);
    var runtil = /Until$/,
        rparentsprev = /^(?:parents|prev(?:Until|All))/,
        isSimple = /^.[^:#\[\.,]*$/,
        rneedsContext = jQuery.expr.match.needsContext,
        guaranteedUnique = {
            children: true,
            contents: true,
            next: true,
            prev: true
        };
    jQuery.fn.extend({
        find: function (selector) {
            var i, ret, self, len = this.length;
            if (typeof selector !== "string") {
                self = this;
                return this.pushStack(jQuery(selector).filter(function () {
                    for (i = 0; i < len; i++) {
                        if (jQuery.contains(self[i], this)) {
                            return true;
                        }
                    }
                }));
            }
            ret = [];
            for (i = 0; i < len; i++) {
                jQuery.find(selector, this[i], ret);
            }
            ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
            ret.selector = (this.selector ? this.selector + " " : "") + selector;
            return ret;
        },
        has: function (target) {
            var i, targets = jQuery(target, this),
                len = targets.length;
            return this.filter(function () {
                for (i = 0; i < len; i++) {
                    if (jQuery.contains(this, targets[i])) {
                        return true;
                    }
                }
            });
        },
        not: function (selector) {
            return this.pushStack(winnow(this, selector, false));
        },
        filter: function (selector) {
            return this.pushStack(winnow(this, selector, true));
        },
        is: function (selector) {
            return !!selector && (typeof selector === "string" ? rneedsContext.test(selector) ? jQuery(selector, this.context).index(this[0]) >= 0 : jQuery.filter(selector, this).length > 0 : this.filter(selector).length > 0);
        },
        closest: function (selectors, context) {
            var cur, i = 0,
                l = this.length,
                ret = [],
                pos = rneedsContext.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;
            for (; i < l; i++) {
                cur = this[i];
                while (cur && cur.ownerDocument && cur !== context && cur.nodeType !== 11) {
                    if (pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors)) {
                        ret.push(cur);
                        break;
                    }
                    cur = cur.parentNode;
                }
            }
            return this.pushStack(ret.length > 1 ? jQuery.unique(ret) : ret);
        },
        index: function (elem) {
            if (!elem) {
                return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
            }
            if (typeof elem === "string") {
                return jQuery.inArray(this[0], jQuery(elem));
            }
            return jQuery.inArray(elem.jquery ? elem[0] : elem, this);
        },
        add: function (selector, context) {
            var set = typeof selector === "string" ? jQuery(selector, context) : jQuery.makeArray(selector && selector.nodeType ? [selector] : selector),
                all = jQuery.merge(this.get(), set);
            return this.pushStack(jQuery.unique(all));
        },
        addBack: function (selector) {
            return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
        }
    });
    jQuery.fn.andSelf = jQuery.fn.addBack;

    function sibling(cur, dir) {
        do {
            cur = cur[dir];
        } while (cur && cur.nodeType !== 1);
        return cur;
    }
    jQuery.each({
        parent: function (elem) {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null;
        },
        parents: function (elem) {
            return jQuery.dir(elem, "parentNode");
        },
        parentsUntil: function (elem, i, until) {
            return jQuery.dir(elem, "parentNode", until);
        },
        next: function (elem) {
            return sibling(elem, "nextSibling");
        },
        prev: function (elem) {
            return sibling(elem, "previousSibling");
        },
        nextAll: function (elem) {
            return jQuery.dir(elem, "nextSibling");
        },
        prevAll: function (elem) {
            return jQuery.dir(elem, "previousSibling");
        },
        nextUntil: function (elem, i, until) {
            return jQuery.dir(elem, "nextSibling", until);
        },
        prevUntil: function (elem, i, until) {
            return jQuery.dir(elem, "previousSibling", until);
        },
        siblings: function (elem) {
            return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
        },
        children: function (elem) {
            return jQuery.sibling(elem.firstChild);
        },
        contents: function (elem) {
            return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.merge([], elem.childNodes);
        }
    }, function (name, fn) {
        jQuery.fn[name] = function (until, selector) {
            var ret = jQuery.map(this, fn, until);
            if (!runtil.test(name)) {
                selector = until;
            }
            if (selector && typeof selector === "string") {
                ret = jQuery.filter(selector, ret);
            }
            ret = this.length > 1 && !guaranteedUnique[name] ? jQuery.unique(ret) : ret;
            if (this.length > 1 && rparentsprev.test(name)) {
                ret = ret.reverse();
            }
            return this.pushStack(ret);
        };
    });
    jQuery.extend({
        filter: function (expr, elems, not) {
            if (not) {
                expr = ":not(" + expr + ")";
            }
            return elems.length === 1 ? jQuery.find.matchesSelector(elems[0], expr) ? [elems[0]] : [] : jQuery.find.matches(expr, elems);
        },
        dir: function (elem, dir, until) {
            var matched = [],
                cur = elem[dir];
            while (cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery(cur).is(until))) {
                if (cur.nodeType === 1) {
                    matched.push(cur);
                }
                cur = cur[dir];
            }
            return matched;
        },
        sibling: function (n, elem) {
            var r = [];
            for (; n; n = n.nextSibling) {
                if (n.nodeType === 1 && n !== elem) {
                    r.push(n);
                }
            }
            return r;
        }
    });

    function winnow(elements, qualifier, keep) {
        qualifier = qualifier || 0;
        if (jQuery.isFunction(qualifier)) {
            return jQuery.grep(elements, function (elem, i) {
                var retVal = !!qualifier.call(elem, i, elem);
                return retVal === keep;
            });
        } else if (qualifier.nodeType) {
            return jQuery.grep(elements, function (elem) {
                return (elem === qualifier) === keep;
            });
        } else if (typeof qualifier === "string") {
            var filtered = jQuery.grep(elements, function (elem) {
                return elem.nodeType === 1;
            });
            if (isSimple.test(qualifier)) {
                return jQuery.filter(qualifier, filtered, !keep);
            } else {
                qualifier = jQuery.filter(qualifier, filtered);
            }
        }
        return jQuery.grep(elements, function (elem) {
            return (jQuery.inArray(elem, qualifier) >= 0) === keep;
        });
    }

    function createSafeFragment(document) {
        var list = nodeNames.split("|"),
            safeFrag = document.createDocumentFragment();
        if (safeFrag.createElement) {
            while (list.length) {
                safeFrag.createElement(list.pop());
            }
        }
        return safeFrag;
    }
    var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" + "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
        rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
        rleadingWhitespace = /^\s+/,
        rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        rtagName = /<([\w:]+)/,
        rtbody = /<tbody/i,
        rhtml = /<|&#?\w+;/,
        rnoInnerhtml = /<(?:script|style|link)/i,
        manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
        rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
        rscriptType = /^$|\/(?:java|ecma)script/i,
        rscriptTypeMasked = /^true\/(.*)/,
        rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        wrapMap = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: jQuery.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        },
        safeFragment = createSafeFragment(document),
        fragmentDiv = safeFragment.appendChild(document.createElement("div"));
    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;
    jQuery.fn.extend({
        text: function (value) {
            return jQuery.access(this, function (value) {
                return value === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value));
            }, null, value, arguments.length);
        },
        wrapAll: function (html) {
            if (jQuery.isFunction(html)) {
                return this.each(function (i) {
                    jQuery(this).wrapAll(html.call(this, i));
                });
            }
            if (this[0]) {
                var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
                if (this[0].parentNode) {
                    wrap.insertBefore(this[0]);
                }
                wrap.map(function () {
                    var elem = this;
                    while (elem.firstChild && elem.firstChild.nodeType === 1) {
                        elem = elem.firstChild;
                    }
                    return elem;
                }).append(this);
            }
            return this;
        },
        wrapInner: function (html) {
            if (jQuery.isFunction(html)) {
                return this.each(function (i) {
                    jQuery(this).wrapInner(html.call(this, i));
                });
            }
            return this.each(function () {
                var self = jQuery(this),
                    contents = self.contents();
                if (contents.length) {
                    contents.wrapAll(html);
                } else {
                    self.append(html);
                }
            });
        },
        wrap: function (html) {
            var isFunction = jQuery.isFunction(html);
            return this.each(function (i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
            });
        },
        unwrap: function () {
            return this.parent().each(function () {
                if (!jQuery.nodeName(this, "body")) {
                    jQuery(this).replaceWith(this.childNodes);
                }
            }).end();
        },
        append: function () {
            return this.domManip(arguments, true, function (elem) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    this.appendChild(elem);
                }
            });
        },
        prepend: function () {
            return this.domManip(arguments, true, function (elem) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    this.insertBefore(elem, this.firstChild);
                }
            });
        },
        before: function () {
            return this.domManip(arguments, false, function (elem) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(elem, this);
                }
            });
        },
        after: function () {
            return this.domManip(arguments, false, function (elem) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(elem, this.nextSibling);
                }
            });
        },
        remove: function (selector, keepData) {
            var elem, i = 0;
            for (;
                (elem = this[i]) != null; i++) {
                if (!selector || jQuery.filter(selector, [elem]).length > 0) {
                    if (!keepData && elem.nodeType === 1) {
                        jQuery.cleanData(getAll(elem));
                    }
                    if (elem.parentNode) {
                        if (keepData && jQuery.contains(elem.ownerDocument, elem)) {
                            setGlobalEval(getAll(elem, "script"));
                        }
                        elem.parentNode.removeChild(elem);
                    }
                }
            }
            return this;
        },
        empty: function () {
            var elem, i = 0;
            for (;
                (elem = this[i]) != null; i++) {
                if (elem.nodeType === 1) {
                    jQuery.cleanData(getAll(elem, false));
                }
                while (elem.firstChild) {
                    elem.removeChild(elem.firstChild);
                }
                if (elem.options && jQuery.nodeName(elem, "select")) {
                    elem.options.length = 0;
                }
            }
            return this;
        },
        clone: function (dataAndEvents, deepDataAndEvents) {
            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
            return this.map(function () {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
            });
        },
        html: function (value) {
            return jQuery.access(this, function (value) {
                var elem = this[0] || {},
                    i = 0,
                    l = this.length;
                if (value === undefined) {
                    return elem.nodeType === 1 ? elem.innerHTML.replace(rinlinejQuery, "") : undefined;
                }
                if (typeof value === "string" && !rnoInnerhtml.test(value) && (jQuery.support.htmlSerialize || !rnoshimcache.test(value)) && (jQuery.support.leadingWhitespace || !rleadingWhitespace.test(value)) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
                    value = value.replace(rxhtmlTag, "<$1></$2>");
                    try {
                        for (; i < l; i++) {
                            elem = this[i] || {};
                            if (elem.nodeType === 1) {
                                jQuery.cleanData(getAll(elem, false));
                                elem.innerHTML = value;
                            }
                        }
                        elem = 0;
                    } catch (e) { }
                }
                if (elem) {
                    this.empty().append(value);
                }
            }, null, value, arguments.length);
        },
        replaceWith: function (value) {
            var isFunc = jQuery.isFunction(value);
            if (!isFunc && typeof value !== "string") {
                value = jQuery(value).not(this).detach();
            }
            return this.domManip([value], true, function (elem) {
                var next = this.nextSibling,
                    parent = this.parentNode;
                if (parent) {
                    jQuery(this).remove();
                    parent.insertBefore(elem, next);
                }
            });
        },
        detach: function (selector) {
            return this.remove(selector, true);
        },
        domManip: function (args, table, callback) {
            args = core_concat.apply([], args);
            var first, node, hasScripts, scripts, doc, fragment, i = 0,
                l = this.length,
                set = this,
                iNoClone = l - 1,
                value = args[0],
                isFunction = jQuery.isFunction(value);
            if (isFunction || !(l <= 1 || typeof value !== "string" || jQuery.support.checkClone || !rchecked.test(value))) {
                return this.each(function (index) {
                    var self = set.eq(index);
                    if (isFunction) {
                        args[0] = value.call(this, index, table ? self.html() : undefined);
                    }
                    self.domManip(args, table, callback);
                });
            }
            if (l) {
                fragment = jQuery.buildFragment(args, this[0].ownerDocument, false, this);
                first = fragment.firstChild;
                if (fragment.childNodes.length === 1) {
                    fragment = first;
                }
                if (first) {
                    table = table && jQuery.nodeName(first, "tr");
                    scripts = jQuery.map(getAll(fragment, "script"), disableScript);
                    hasScripts = scripts.length;
                    for (; i < l; i++) {
                        node = fragment;
                        if (i !== iNoClone) {
                            node = jQuery.clone(node, true, true);
                            if (hasScripts) {
                                jQuery.merge(scripts, getAll(node, "script"));
                            }
                        }
                        callback.call(table && jQuery.nodeName(this[i], "table") ? findOrAppend(this[i], "tbody") : this[i], node, i);
                    }
                    if (hasScripts) {
                        doc = scripts[scripts.length - 1].ownerDocument;
                        jQuery.map(scripts, restoreScript);
                        for (i = 0; i < hasScripts; i++) {
                            node = scripts[i];
                            if (rscriptType.test(node.type || "") && !jQuery._data(node, "globalEval") && jQuery.contains(doc, node)) {
                                if (node.src) {
                                    jQuery.ajax({
                                        url: node.src,
                                        type: "GET",
                                        dataType: "script",
                                        async: false,
                                        global: false,
                                        "throws": true
                                    });
                                } else {
                                    jQuery.globalEval((node.text || node.textContent || node.innerHTML || "").replace(rcleanScript, ""));
                                }
                            }
                        }
                    }
                    fragment = first = null;
                }
            }
            return this;
        }
    });

    function findOrAppend(elem, tag) {
        return elem.getElementsByTagName(tag)[0] || elem.appendChild(elem.ownerDocument.createElement(tag));
    }

    function disableScript(elem) {
        var attr = elem.getAttributeNode("type");
        elem.type = (attr && attr.specified) + "/" + elem.type;
        return elem;
    }

    function restoreScript(elem) {
        var match = rscriptTypeMasked.exec(elem.type);
        if (match) {
            elem.type = match[1];
        } else {
            elem.removeAttribute("type");
        }
        return elem;
    }

    function setGlobalEval(elems, refElements) {
        var elem, i = 0;
        for (;
            (elem = elems[i]) != null; i++) {
            jQuery._data(elem, "globalEval", !refElements || jQuery._data(refElements[i], "globalEval"));
        }
    }

    function cloneCopyEvent(src, dest) {
        if (dest.nodeType !== 1 || !jQuery.hasData(src)) {
            return;
        }
        var type, i, l, oldData = jQuery._data(src),
            curData = jQuery._data(dest, oldData),
            events = oldData.events;
        if (events) {
            delete curData.handle;
            curData.events = {};
            for (type in events) {
                for (i = 0, l = events[type].length; i < l; i++) {
                    jQuery.event.add(dest, type, events[type][i]);
                }
            }
        }
        if (curData.data) {
            curData.data = jQuery.extend({}, curData.data);
        }
    }

    function fixCloneNodeIssues(src, dest) {
        var nodeName, e, data;
        if (dest.nodeType !== 1) {
            return;
        }
        nodeName = dest.nodeName.toLowerCase();
        if (!jQuery.support.noCloneEvent && dest[jQuery.expando]) {
            data = jQuery._data(dest);
            for (e in data.events) {
                jQuery.removeEvent(dest, e, data.handle);
            }
            dest.removeAttribute(jQuery.expando);
        }
        if (nodeName === "script" && dest.text !== src.text) {
            disableScript(dest).text = src.text;
            restoreScript(dest);
        } else if (nodeName === "object") {
            if (dest.parentNode) {
                dest.outerHTML = src.outerHTML;
            }
            if (jQuery.support.html5Clone && (src.innerHTML && !jQuery.trim(dest.innerHTML))) {
                dest.innerHTML = src.innerHTML;
            }
        } else if (nodeName === "input" && manipulation_rcheckableType.test(src.type)) {
            dest.defaultChecked = dest.checked = src.checked;
            if (dest.value !== src.value) {
                dest.value = src.value;
            }
        } else if (nodeName === "option") {
            dest.defaultSelected = dest.selected = src.defaultSelected;
        } else if (nodeName === "input" || nodeName === "textarea") {
            dest.defaultValue = src.defaultValue;
        }
    }
    jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (name, original) {
        jQuery.fn[name] = function (selector) {
            var elems, i = 0,
                ret = [],
                insert = jQuery(selector),
                last = insert.length - 1;
            for (; i <= last; i++) {
                elems = i === last ? this : this.clone(true);
                jQuery(insert[i])[original](elems);
                core_push.apply(ret, elems.get());
            }
            return this.pushStack(ret);
        };
    });

    function getAll(context, tag) {
        var elems, elem, i = 0,
            found = typeof context.getElementsByTagName !== core_strundefined ? context.getElementsByTagName(tag || "*") : typeof context.querySelectorAll !== core_strundefined ? context.querySelectorAll(tag || "*") : undefined;
        if (!found) {
            for (found = [], elems = context.childNodes || context;
                (elem = elems[i]) != null; i++) {
                if (!tag || jQuery.nodeName(elem, tag)) {
                    found.push(elem);
                } else {
                    jQuery.merge(found, getAll(elem, tag));
                }
            }
        }
        return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], found) : found;
    }

    function fixDefaultChecked(elem) {
        if (manipulation_rcheckableType.test(elem.type)) {
            elem.defaultChecked = elem.checked;
        }
    }
    jQuery.extend({
        clone: function (elem, dataAndEvents, deepDataAndEvents) {
            var destElements, node, clone, i, srcElements, inPage = jQuery.contains(elem.ownerDocument, elem);
            if (jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">")) {
                clone = elem.cloneNode(true);
            } else {
                fragmentDiv.innerHTML = elem.outerHTML;
                fragmentDiv.removeChild(clone = fragmentDiv.firstChild);
            }
            if ((!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
                destElements = getAll(clone);
                srcElements = getAll(elem);
                for (i = 0;
                    (node = srcElements[i]) != null; ++i) {
                    if (destElements[i]) {
                        fixCloneNodeIssues(node, destElements[i]);
                    }
                }
            }
            if (dataAndEvents) {
                if (deepDataAndEvents) {
                    srcElements = srcElements || getAll(elem);
                    destElements = destElements || getAll(clone);
                    for (i = 0;
                        (node = srcElements[i]) != null; i++) {
                        cloneCopyEvent(node, destElements[i]);
                    }
                } else {
                    cloneCopyEvent(elem, clone);
                }
            }
            destElements = getAll(clone, "script");
            if (destElements.length > 0) {
                setGlobalEval(destElements, !inPage && getAll(elem, "script"));
            }
            destElements = srcElements = node = null;
            return clone;
        },
        buildFragment: function (elems, context, scripts, selection) {
            var j, elem, contains, tmp, tag, tbody, wrap, l = elems.length,
                safe = createSafeFragment(context),
                nodes = [],
                i = 0;
            for (; i < l; i++) {
                elem = elems[i];
                if (elem || elem === 0) {
                    if (jQuery.type(elem) === "object") {
                        jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
                    } else if (!rhtml.test(elem)) {
                        nodes.push(context.createTextNode(elem));
                    } else {
                        tmp = tmp || safe.appendChild(context.createElement("div"));
                        tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
                        wrap = wrapMap[tag] || wrapMap._default;
                        tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];
                        j = wrap[0];
                        while (j--) {
                            tmp = tmp.lastChild;
                        }
                        if (!jQuery.support.leadingWhitespace && rleadingWhitespace.test(elem)) {
                            nodes.push(context.createTextNode(rleadingWhitespace.exec(elem)[0]));
                        }
                        if (!jQuery.support.tbody) {
                            elem = tag === "table" && !rtbody.test(elem) ? tmp.firstChild : wrap[1] === "<table>" && !rtbody.test(elem) ? tmp : 0;
                            j = elem && elem.childNodes.length;
                            while (j--) {
                                if (jQuery.nodeName((tbody = elem.childNodes[j]), "tbody") && !tbody.childNodes.length) {
                                    elem.removeChild(tbody);
                                }
                            }
                        }
                        jQuery.merge(nodes, tmp.childNodes);
                        tmp.textContent = "";
                        while (tmp.firstChild) {
                            tmp.removeChild(tmp.firstChild);
                        }
                        tmp = safe.lastChild;
                    }
                }
            }
            if (tmp) {
                safe.removeChild(tmp);
            }
            if (!jQuery.support.appendChecked) {
                jQuery.grep(getAll(nodes, "input"), fixDefaultChecked);
            }
            i = 0;
            while ((elem = nodes[i++])) {
                if (selection && jQuery.inArray(elem, selection) !== -1) {
                    continue;
                }
                contains = jQuery.contains(elem.ownerDocument, elem);
                tmp = getAll(safe.appendChild(elem), "script");
                if (contains) {
                    setGlobalEval(tmp);
                }
                if (scripts) {
                    j = 0;
                    while ((elem = tmp[j++])) {
                        if (rscriptType.test(elem.type || "")) {
                            scripts.push(elem);
                        }
                    }
                }
            }
            tmp = null;
            return safe;
        },
        cleanData: function (elems, acceptData) {
            var elem, type, id, data, i = 0,
                internalKey = jQuery.expando,
                cache = jQuery.cache,
                deleteExpando = jQuery.support.deleteExpando,
                special = jQuery.event.special;
            for (;
                (elem = elems[i]) != null; i++) {
                if (acceptData || jQuery.acceptData(elem)) {
                    id = elem[internalKey];
                    data = id && cache[id];
                    if (data) {
                        if (data.events) {
                            for (type in data.events) {
                                if (special[type]) {
                                    jQuery.event.remove(elem, type);
                                } else {
                                    jQuery.removeEvent(elem, type, data.handle);
                                }
                            }
                        }
                        if (cache[id]) {
                            delete cache[id];
                            if (deleteExpando) {
                                delete elem[internalKey];
                            } else if (typeof elem.removeAttribute !== core_strundefined) {
                                elem.removeAttribute(internalKey);
                            } else {
                                elem[internalKey] = null;
                            }
                            core_deletedIds.push(id);
                        }
                    }
                }
            }
        }
    });
    var iframe, getStyles, curCSS, ralpha = /alpha\([^)]*\)/i,
        ropacity = /opacity\s*=\s*([^)]*)/,
        rposition = /^(top|right|bottom|left)$/,
        rdisplayswap = /^(none|table(?!-c[ea]).+)/,
        rmargin = /^margin/,
        rnumsplit = new RegExp("^(" + core_pnum + ")(.*)$", "i"),
        rnumnonpx = new RegExp("^(" + core_pnum + ")(?!px)[a-z%]+$", "i"),
        rrelNum = new RegExp("^([+-])=(" + core_pnum + ")", "i"),
        elemdisplay = {
            BODY: "block"
        },
        cssShow = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        cssNormalTransform = {
            letterSpacing: 0,
            fontWeight: 400
        },
        cssExpand = ["Top", "Right", "Bottom", "Left"],
        cssPrefixes = ["Webkit", "O", "Moz", "ms"];

    function vendorPropName(style, name) {
        if (name in style) {
            return name;
        }
        var capName = name.charAt(0).toUpperCase() + name.slice(1),
            origName = name,
            i = cssPrefixes.length;
        while (i--) {
            name = cssPrefixes[i] + capName;
            if (name in style) {
                return name;
            }
        }
        return origName;
    }

    function isHidden(elem, el) {
        elem = el || elem;
        return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem);
    }

    function showHide(elements, show) {
        var display, elem, hidden, values = [],
            index = 0,
            length = elements.length;
        for (; index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
                continue;
            }
            values[index] = jQuery._data(elem, "olddisplay");
            display = elem.style.display;
            if (show) {
                if (!values[index] && display === "none") {
                    elem.style.display = "";
                }
                if (elem.style.display === "" && isHidden(elem)) {
                    values[index] = jQuery._data(elem, "olddisplay", css_defaultDisplay(elem.nodeName));
                }
            } else {
                if (!values[index]) {
                    hidden = isHidden(elem);
                    if (display && display !== "none" || !hidden) {
                        jQuery._data(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
                    }
                }
            }
        }
        for (index = 0; index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
                continue;
            }
            if (!show || elem.style.display === "none" || elem.style.display === "") {
                elem.style.display = show ? values[index] || "" : "none";
            }
        }
        return elements;
    }
    jQuery.fn.extend({
        css: function (name, value) {
            return jQuery.access(this, function (elem, name, value) {
                var len, styles, map = {},
                    i = 0;
                if (jQuery.isArray(name)) {
                    styles = getStyles(elem);
                    len = name.length;
                    for (; i < len; i++) {
                        map[name[i]] = jQuery.css(elem, name[i], false, styles);
                    }
                    return map;
                }
                return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
            }, name, value, arguments.length > 1);
        },
        show: function () {
            return showHide(this, true);
        },
        hide: function () {
            return showHide(this);
        },
        toggle: function (state) {
            var bool = typeof state === "boolean";
            return this.each(function () {
                if (bool ? state : isHidden(this)) {
                    jQuery(this).show();
                } else {
                    jQuery(this).hide();
                }
            });
        }
    });
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function (elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity");
                        return ret === "" ? "1" : ret;
                    }
                }
            }
        },
        cssNumber: {
            "columnCount": true,
            "fillOpacity": true,
            "fontWeight": true,
            "lineHeight": true,
            "opacity": true,
            "orphans": true,
            "widows": true,
            "zIndex": true,
            "zoom": true
        },
        cssProps: {
            "float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function (elem, name, value, extra) {
            if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                return;
            }
            var ret, type, hooks, origName = jQuery.camelCase(name),
                style = elem.style;
            name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName));
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
            if (value !== undefined) {
                type = typeof value;
                if (type === "string" && (ret = rrelNum.exec(value))) {
                    value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
                    type = "number";
                }
                if (value == null || type === "number" && isNaN(value)) {
                    return;
                }
                if (type === "number" && !jQuery.cssNumber[origName]) {
                    value += "px";
                }
                if (!jQuery.support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
                    style[name] = "inherit";
                }
                if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
                    try {
                        style[name] = value;
                    } catch (e) { }
                }
            } else {
                if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
                    return ret;
                }
                return style[name];
            }
        },
        css: function (elem, name, extra, styles) {
            var num, val, hooks, origName = jQuery.camelCase(name);
            name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName));
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
            if (hooks && "get" in hooks) {
                val = hooks.get(elem, true, extra);
            }
            if (val === undefined) {
                val = curCSS(elem, name, styles);
            }
            if (val === "normal" && name in cssNormalTransform) {
                val = cssNormalTransform[name];
            }
            if (extra === "" || extra) {
                num = parseFloat(val);
                return extra === true || jQuery.isNumeric(num) ? num || 0 : val;
            }
            return val;
        },
        swap: function (elem, options, callback, args) {
            var ret, name, old = {};
            for (name in options) {
                old[name] = elem.style[name];
                elem.style[name] = options[name];
            }
            ret = callback.apply(elem, args || []);
            for (name in options) {
                elem.style[name] = old[name];
            }
            return ret;
        }
    });
    if (window.getComputedStyle) {
        getStyles = function (elem) {
            return window.getComputedStyle(elem, null);
        };
        curCSS = function (elem, name, _computed) {
            var width, minWidth, maxWidth, computed = _computed || getStyles(elem),
                ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined,
                style = elem.style;
            if (computed) {
                if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
                    ret = jQuery.style(elem, name);
                }
                if (rnumnonpx.test(ret) && rmargin.test(name)) {
                    width = style.width;
                    minWidth = style.minWidth;
                    maxWidth = style.maxWidth;
                    style.minWidth = style.maxWidth = style.width = ret;
                    ret = computed.width;
                    style.width = width;
                    style.minWidth = minWidth;
                    style.maxWidth = maxWidth;
                }
            }
            return ret;
        };
    } else if (document.documentElement.currentStyle) {
        getStyles = function (elem) {
            return elem.currentStyle;
        };
        curCSS = function (elem, name, _computed) {
            var left, rs, rsLeft, computed = _computed || getStyles(elem),
                ret = computed ? computed[name] : undefined,
                style = elem.style;
            if (ret == null && style && style[name]) {
                ret = style[name];
            }
            if (rnumnonpx.test(ret) && !rposition.test(name)) {
                left = style.left;
                rs = elem.runtimeStyle;
                rsLeft = rs && rs.left;
                if (rsLeft) {
                    rs.left = elem.currentStyle.left;
                }
                style.left = name === "fontSize" ? "1em" : ret;
                ret = style.pixelLeft + "px";
                style.left = left;
                if (rsLeft) {
                    rs.left = rsLeft;
                }
            }
            return ret === "" ? "auto" : ret;
        };
    }

    function setPositiveNumber(elem, value, subtract) {
        var matches = rnumsplit.exec(value);
        return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value;
    }

    function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
        var i = extra === (isBorderBox ? "border" : "content") ? 4 : name === "width" ? 1 : 0,
            val = 0;
        for (; i < 4; i += 2) {
            if (extra === "margin") {
                val += jQuery.css(elem, extra + cssExpand[i], true, styles);
            }
            if (isBorderBox) {
                if (extra === "content") {
                    val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                }
                if (extra !== "margin") {
                    val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                }
            } else {
                val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                if (extra !== "padding") {
                    val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                }
            }
        }
        return val;
    }

    function getWidthOrHeight(elem, name, extra) {
        var valueIsBorderBox = true,
            val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
            styles = getStyles(elem),
            isBorderBox = jQuery.support.boxSizing && jQuery.css(elem, "boxSizing", false, styles) === "border-box";
        if (val <= 0 || val == null) {
            val = curCSS(elem, name, styles);
            if (val < 0 || val == null) {
                val = elem.style[name];
            }
            if (rnumnonpx.test(val)) {
                return val;
            }
            valueIsBorderBox = isBorderBox && (jQuery.support.boxSizingReliable || val === elem.style[name]);
            val = parseFloat(val) || 0;
        }
        return (val +
            augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles)) + "px";
    }

    function css_defaultDisplay(nodeName) {
        var doc = document,
            display = elemdisplay[nodeName];
        if (!display) {
            display = actualDisplay(nodeName, doc);
            if (display === "none" || !display) {
                iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(doc.documentElement);
                doc = (iframe[0].contentWindow || iframe[0].contentDocument).document;
                doc.write("<!doctype html><html><body>");
                doc.close();
                display = actualDisplay(nodeName, doc);
                iframe.detach();
            }
            elemdisplay[nodeName] = display;
        }
        return display;
    }

    function actualDisplay(name, doc) {
        var elem = jQuery(doc.createElement(name)).appendTo(doc.body),
            display = jQuery.css(elem[0], "display");
        elem.remove();
        return display;
    }
    jQuery.each(["height", "width"], function (i, name) {
        jQuery.cssHooks[name] = {
            get: function (elem, computed, extra) {
                if (computed) {
                    return elem.offsetWidth === 0 && rdisplayswap.test(jQuery.css(elem, "display")) ? jQuery.swap(elem, cssShow, function () {
                        return getWidthOrHeight(elem, name, extra);
                    }) : getWidthOrHeight(elem, name, extra);
                }
            },
            set: function (elem, value, extra) {
                var styles = extra && getStyles(elem);
                return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, jQuery.support.boxSizing && jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles) : 0);
            }
        };
    });
    if (!jQuery.support.opacity) {
        jQuery.cssHooks.opacity = {
            get: function (elem, computed) {
                return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? (0.01 * parseFloat(RegExp.$1)) + "" : computed ? "1" : "";
            },
            set: function (elem, value) {
                var style = elem.style,
                    currentStyle = elem.currentStyle,
                    opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + value * 100 + ")" : "",
                    filter = currentStyle && currentStyle.filter || style.filter || "";
                style.zoom = 1;
                if ((value >= 1 || value === "") && jQuery.trim(filter.replace(ralpha, "")) === "" && style.removeAttribute) {
                    style.removeAttribute("filter");
                    if (value === "" || currentStyle && !currentStyle.filter) {
                        return;
                    }
                }
                style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + " " + opacity;
            }
        };
    }
    jQuery(function () {
        if (!jQuery.support.reliableMarginRight) {
            jQuery.cssHooks.marginRight = {
                get: function (elem, computed) {
                    if (computed) {
                        return jQuery.swap(elem, {
                            "display": "inline-block"
                        }, curCSS, [elem, "marginRight"]);
                    }
                }
            };
        }
        if (!jQuery.support.pixelPosition && jQuery.fn.position) {
            jQuery.each(["top", "left"], function (i, prop) {
                jQuery.cssHooks[prop] = {
                    get: function (elem, computed) {
                        if (computed) {
                            computed = curCSS(elem, prop);
                            return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
                        }
                    }
                };
            });
        }
    });
    if (jQuery.expr && jQuery.expr.filters) {
        jQuery.expr.filters.hidden = function (elem) {
            return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 || (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || jQuery.css(elem, "display")) === "none");
        };
        jQuery.expr.filters.visible = function (elem) {
            return !jQuery.expr.filters.hidden(elem);
        };
    }
    jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function (prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function (value) {
                var i = 0,
                    expanded = {},
                    parts = typeof value === "string" ? value.split(" ") : [value];
                for (; i < 4; i++) {
                    expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                }
                return expanded;
            }
        };
        if (!rmargin.test(prefix)) {
            jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
        }
    });
    var r20 = /%20/g,
        rbracket = /\[\]$/,
        rCRLF = /\r?\n/g,
        rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
        rsubmittable = /^(?:input|select|textarea|keygen)/i;
    jQuery.fn.extend({
        serialize: function () {
            return jQuery.param(this.serializeArray());
        },
        serializeArray: function () {
            return this.map(function () {
                var elements = jQuery.prop(this, "elements");
                return elements ? jQuery.makeArray(elements) : this;
            }).filter(function () {
                var type = this.type;
                return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !manipulation_rcheckableType.test(type));
            }).map(function (i, elem) {
                var val = jQuery(this).val();
                return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function (val) {
                    return {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    };
                }) : {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    };
            }).get();
        }
    });
    jQuery.param = function (a, traditional) {
        var prefix, s = [],
            add = function (key, value) {
                value = jQuery.isFunction(value) ? value() : (value == null ? "" : value);
                s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
            };
        if (traditional === undefined) {
            traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
        }
        if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
            jQuery.each(a, function () {
                add(this.name, this.value);
            });
        } else {
            for (prefix in a) {
                buildParams(prefix, a[prefix], traditional, add);
            }
        }
        return s.join("&").replace(r20, "+");
    };

    function buildParams(prefix, obj, traditional, add) {
        var name;
        if (jQuery.isArray(obj)) {
            jQuery.each(obj, function (i, v) {
                if (traditional || rbracket.test(prefix)) {
                    add(prefix, v);
                } else {
                    buildParams(prefix + "[" + (typeof v === "object" ? i : "") + "]", v, traditional, add);
                }
            });
        } else if (!traditional && jQuery.type(obj) === "object") {
            for (name in obj) {
                buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
            }
        } else {
            add(prefix, obj);
        }
    }
    jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function (i, name) {
        jQuery.fn[name] = function (data, fn) {
            return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
        };
    });
    jQuery.fn.hover = function (fnOver, fnOut) {
        return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
    };
    var
        ajaxLocParts, ajaxLocation, ajax_nonce = jQuery.now(),
        ajax_rquery = /\?/,
        rhash = /#.*$/,
        rts = /([?&])_=[^&]*/,
        rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        rnoContent = /^(?:GET|HEAD)$/,
        rprotocol = /^\/\//,
        rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        _load = jQuery.fn.load,
        prefilters = {},
        transports = {},
        allTypes = "*/".concat("*");
    try {
        ajaxLocation = location.href;
    } catch (e) {
        ajaxLocation = document.createElement("a");
        ajaxLocation.href = "";
        ajaxLocation = ajaxLocation.href;
    }
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];

    function addToPrefiltersOrTransports(structure) {
        return function (dataTypeExpression, func) {
            if (typeof dataTypeExpression !== "string") {
                func = dataTypeExpression;
                dataTypeExpression = "*";
            }
            var dataType, i = 0,
                dataTypes = dataTypeExpression.toLowerCase().match(core_rnotwhite) || [];
            if (jQuery.isFunction(func)) {
                while ((dataType = dataTypes[i++])) {
                    if (dataType[0] === "+") {
                        dataType = dataType.slice(1) || "*";
                        (structure[dataType] = structure[dataType] || []).unshift(func);
                    } else {
                        (structure[dataType] = structure[dataType] || []).push(func);
                    }
                }
            }
        };
    }

    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
        var inspected = {},
            seekingTransport = (structure === transports);

        function inspect(dataType) {
            var selected;
            inspected[dataType] = true;
            jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
                    options.dataTypes.unshift(dataTypeOrTransport);
                    inspect(dataTypeOrTransport);
                    return false;
                } else if (seekingTransport) {
                    return !(selected = dataTypeOrTransport);
                }
            });
            return selected;
        }
        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
    }

    function ajaxExtend(target, src) {
        var deep, key, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src) {
            if (src[key] !== undefined) {
                (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
            }
        }
        if (deep) {
            jQuery.extend(true, target, deep);
        }
        return target;
    }
    jQuery.fn.load = function (url, params, callback) {
        if (typeof url !== "string" && _load) {
            return _load.apply(this, arguments);
        }
        var selector, response, type, self = this,
            off = url.indexOf(" ");
        if (off >= 0) {
            selector = url.slice(off, url.length);
            url = url.slice(0, off);
        }
        if (jQuery.isFunction(params)) {
            callback = params;
            params = undefined;
        } else if (params && typeof params === "object") {
            type = "POST";
        }
        if (self.length > 0) {
            jQuery.ajax({
                url: url,
                type: type,
                dataType: "html",
                data: params
            }).done(function (responseText) {
                response = arguments;
                self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
            }).complete(callback && function (jqXHR, status) {
                self.each(callback, response || [jqXHR.responseText, status, jqXHR]);
            });
        }
        return this;
    };
    jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (i, type) {
        jQuery.fn[type] = function (fn) {
            return this.on(type, fn);
        };
    });
    jQuery.each(["get", "post"], function (i, method) {
        jQuery[method] = function (url, data, callback, type) {
            if (jQuery.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = undefined;
            }
            return jQuery.ajax({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            });
        };
    });
    jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ajaxLocation,
            type: "GET",
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: true,
            processData: true,
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": window.String,
                "text html": true,
                "text json": jQuery.parseJSON,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                url: true,
                context: true
            }
        },
        ajaxSetup: function (target, settings) {
            return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function (url, options) {
            if (typeof url === "object") {
                options = url;
                url = undefined;
            }
            options = options || {};
            var
                parts, i, cacheURL, responseHeadersString, timeoutTimer, fireGlobals, transport, responseHeaders, s = jQuery.ajaxSetup({}, options),
                callbackContext = s.context || s,
                globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
                deferred = jQuery.Deferred(),
                completeDeferred = jQuery.Callbacks("once memory"),
                statusCode = s.statusCode || {},
                requestHeaders = {},
                requestHeadersNames = {},
                state = 0,
                strAbort = "canceled",
                jqXHR = {
                    readyState: 0,
                    getResponseHeader: function (key) {
                        var match;
                        if (state === 2) {
                            if (!responseHeaders) {
                                responseHeaders = {};
                                while ((match = rheaders.exec(responseHeadersString))) {
                                    responseHeaders[match[1].toLowerCase()] = match[2];
                                }
                            }
                            match = responseHeaders[key.toLowerCase()];
                        }
                        return match == null ? null : match;
                    },
                    getAllResponseHeaders: function () {
                        return state === 2 ? responseHeadersString : null;
                    },
                    setRequestHeader: function (name, value) {
                        var lname = name.toLowerCase();
                        if (!state) {
                            name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
                            requestHeaders[name] = value;
                        }
                        return this;
                    },
                    overrideMimeType: function (type) {
                        if (!state) {
                            s.mimeType = type;
                        }
                        return this;
                    },
                    statusCode: function (map) {
                        var code;
                        if (map) {
                            if (state < 2) {
                                for (code in map) {
                                    statusCode[code] = [statusCode[code], map[code]];
                                }
                            } else {
                                jqXHR.always(map[jqXHR.status]);
                            }
                        }
                        return this;
                    },
                    abort: function (statusText) {
                        var finalText = statusText || strAbort;
                        if (transport) {
                            transport.abort(finalText);
                        }
                        done(0, finalText);
                        return this;
                    }
                };
            deferred.promise(jqXHR).complete = completeDeferred.add;
            jqXHR.success = jqXHR.done;
            jqXHR.error = jqXHR.fail;
            s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");
            s.type = options.method || options.type || s.method || s.type;
            s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(core_rnotwhite) || [""];
            if (s.crossDomain == null) {
                parts = rurl.exec(s.url.toLowerCase());
                s.crossDomain = !!(parts && (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] || (parts[3] || (parts[1] === "http:" ? 80 : 443)) != (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? 80 : 443))));
            }
            if (s.data && s.processData && typeof s.data !== "string") {
                s.data = jQuery.param(s.data, s.traditional);
            }
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
            if (state === 2) {
                return jqXHR;
            }
            fireGlobals = s.global;
            if (fireGlobals && jQuery.active++ === 0) {
                jQuery.event.trigger("ajaxStart");
            }
            s.type = s.type.toUpperCase();
            s.hasContent = !rnoContent.test(s.type);
            cacheURL = s.url;
            if (!s.hasContent) {
                if (s.data) {
                    cacheURL = (s.url += (ajax_rquery.test(cacheURL) ? "&" : "?") + s.data);
                    delete s.data;
                }
                if (s.cache === false) {
                    s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + ajax_nonce++) : cacheURL + (ajax_rquery.test(cacheURL) ? "&" : "?") + "_=" + ajax_nonce++;
                }
            }
            if (s.ifModified) {
                if (jQuery.lastModified[cacheURL]) {
                    jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
                }
                if (jQuery.etag[cacheURL]) {
                    jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
                }
            }
            if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
                jqXHR.setRequestHeader("Content-Type", s.contentType);
            }
            jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
            for (i in s.headers) {
                jqXHR.setRequestHeader(i, s.headers[i]);
            }
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
                return jqXHR.abort();
            }
            strAbort = "abort";
            for (i in {
                success: 1,
                error: 1,
                complete: 1
            }) {
                jqXHR[i](s[i]);
            }
            transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
            if (!transport) {
                done(-1, "No Transport");
            } else {
                jqXHR.readyState = 1;
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxSend", [jqXHR, s]);
                }
                if (s.async && s.timeout > 0) {
                    timeoutTimer = setTimeout(function () {
                        jqXHR.abort("timeout");
                    }, s.timeout);
                }
                try {
                    state = 1;
                    transport.send(requestHeaders, done);
                } catch (e) {
                    if (state < 2) {
                        done(-1, e);
                    } else {
                        throw e;
                    }
                }
            }

            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                if (state === 2) {
                    return;
                }
                state = 2;
                if (timeoutTimer) {
                    clearTimeout(timeoutTimer);
                }
                transport = undefined;
                responseHeadersString = headers || "";
                jqXHR.readyState = status > 0 ? 4 : 0;
                if (responses) {
                    response = ajaxHandleResponses(s, jqXHR, responses);
                }
                if (status >= 200 && status < 300 || status === 304) {
                    if (s.ifModified) {
                        modified = jqXHR.getResponseHeader("Last-Modified");
                        if (modified) {
                            jQuery.lastModified[cacheURL] = modified;
                        }
                        modified = jqXHR.getResponseHeader("etag");
                        if (modified) {
                            jQuery.etag[cacheURL] = modified;
                        }
                    }
                    if (status === 204) {
                        isSuccess = true;
                        statusText = "nocontent";
                    } else if (status === 304) {
                        isSuccess = true;
                        statusText = "notmodified";
                    } else {
                        isSuccess = ajaxConvert(s, response);
                        statusText = isSuccess.state;
                        success = isSuccess.data;
                        error = isSuccess.error;
                        isSuccess = !error;
                    }
                } else {
                    error = statusText;
                    if (status || !statusText) {
                        statusText = "error";
                        if (status < 0) {
                            status = 0;
                        }
                    }
                }
                jqXHR.status = status;
                jqXHR.statusText = (nativeStatusText || statusText) + "";
                if (isSuccess) {
                    deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
                } else {
                    deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
                }
                jqXHR.statusCode(statusCode);
                statusCode = undefined;
                if (fireGlobals) {
                    globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
                }
                completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
                    if (!(--jQuery.active)) {
                        jQuery.event.trigger("ajaxStop");
                    }
                }
            }
            return jqXHR;
        },
        getScript: function (url, callback) {
            return jQuery.get(url, undefined, callback, "script");
        },
        getJSON: function (url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        }
    });

    function ajaxHandleResponses(s, jqXHR, responses) {
        var firstDataType, ct, finalDataType, type, contents = s.contents,
            dataTypes = s.dataTypes,
            responseFields = s.responseFields;
        for (type in responseFields) {
            if (type in responses) {
                jqXHR[responseFields[type]] = responses[type];
            }
        }
        while (dataTypes[0] === "*") {
            dataTypes.shift();
            if (ct === undefined) {
                ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
            }
        }
        if (ct) {
            for (type in contents) {
                if (contents[type] && contents[type].test(ct)) {
                    dataTypes.unshift(type);
                    break;
                }
            }
        }
        if (dataTypes[0] in responses) {
            finalDataType = dataTypes[0];
        } else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break;
                }
                if (!firstDataType) {
                    firstDataType = type;
                }
            }
            finalDataType = finalDataType || firstDataType;
        }
        if (finalDataType) {
            if (finalDataType !== dataTypes[0]) {
                dataTypes.unshift(finalDataType);
            }
            return responses[finalDataType];
        }
    }

    function ajaxConvert(s, response) {
        var conv2, current, conv, tmp, converters = {},
            i = 0,
            dataTypes = s.dataTypes.slice(),
            prev = dataTypes[0];
        if (s.dataFilter) {
            response = s.dataFilter(response, s.dataType);
        }
        if (dataTypes[1]) {
            for (conv in s.converters) {
                converters[conv.toLowerCase()] = s.converters[conv];
            }
        }
        for (;
            (current = dataTypes[++i]);) {
            if (current !== "*") {
                if (prev !== "*" && prev !== current) {
                    conv = converters[prev + " " + current] || converters["* " + current];
                    if (!conv) {
                        for (conv2 in converters) {
                            tmp = conv2.split(" ");
                            if (tmp[1] === current) {
                                conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                                if (conv) {
                                    if (conv === true) {
                                        conv = converters[conv2];
                                    } else if (converters[conv2] !== true) {
                                        current = tmp[0];
                                        dataTypes.splice(i--, 0, current);
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    if (conv !== true) {
                        if (conv && s["throws"]) {
                            response = conv(response);
                        } else {
                            try {
                                response = conv(response);
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: conv ? e : "No conversion from " + prev + " to " + current
                                };
                            }
                        }
                    }
                }
                prev = current;
            }
        }
        return {
            state: "success",
            data: response
        };
    }
    jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function (text) {
                jQuery.globalEval(text);
                return text;
            }
        }
    });
    jQuery.ajaxPrefilter("script", function (s) {
        if (s.cache === undefined) {
            s.cache = false;
        }
        if (s.crossDomain) {
            s.type = "GET";
            s.global = false;
        }
    });
    jQuery.ajaxTransport("script", function (s) {
        if (s.crossDomain) {
            var script, head = document.head || jQuery("head")[0] || document.documentElement;
            return {
                send: function (_, callback) {
                    script = document.createElement("script");
                    script.async = true;
                    if (s.scriptCharset) {
                        script.charset = s.scriptCharset;
                    }
                    script.src = s.url;
                    script.onload = script.onreadystatechange = function (_, isAbort) {
                        if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
                            script.onload = script.onreadystatechange = null;
                            if (script.parentNode) {
                                script.parentNode.removeChild(script);
                            }
                            script = null;
                            if (!isAbort) {
                                callback(200, "success");
                            }
                        }
                    };
                    head.insertBefore(script, head.firstChild);
                },
                abort: function () {
                    if (script) {
                        script.onload(undefined, true);
                    }
                }
            };
        }
    });
    var oldCallbacks = [],
        rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (ajax_nonce++));
            this[callback] = true;
            return callback;
        }
    });
    jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {
        var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
        if (jsonProp || s.dataTypes[0] === "jsonp") {
            callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
            if (jsonProp) {
                s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
            } else if (s.jsonp !== false) {
                s.url += (ajax_rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
            }
            s.converters["script json"] = function () {
                if (!responseContainer) {
                    jQuery.error(callbackName + " was not called");
                }
                return responseContainer[0];
            };
            s.dataTypes[0] = "json";
            overwritten = window[callbackName];
            window[callbackName] = function () {
                responseContainer = arguments;
            };
            jqXHR.always(function () {
                window[callbackName] = overwritten;
                if (s[callbackName]) {
                    s.jsonpCallback = originalSettings.jsonpCallback;
                    oldCallbacks.push(callbackName);
                }
                if (responseContainer && jQuery.isFunction(overwritten)) {
                    overwritten(responseContainer[0]);
                }
                responseContainer = overwritten = undefined;
            });
            return "script";
        }
    });
    var xhrCallbacks, xhrSupported, xhrId = 0,
        xhrOnUnloadAbort = window.ActiveXObject && function () {
            var key;
            for (key in xhrCallbacks) {
                xhrCallbacks[key](undefined, true);
            }
        };

    function createStandardXHR() {
        try {
            return new window.XMLHttpRequest();
        } catch (e) { }
    }

    function createActiveXHR() {
        try {
            return new window.ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) { }
    }
    jQuery.ajaxSettings.xhr = window.ActiveXObject ? function () {
        return !this.isLocal && createStandardXHR() || createActiveXHR();
    } : createStandardXHR;
    xhrSupported = jQuery.ajaxSettings.xhr();
    jQuery.support.cors = !!xhrSupported && ("withCredentials" in xhrSupported);
    xhrSupported = jQuery.support.ajax = !!xhrSupported;
    if (xhrSupported) {
        jQuery.ajaxTransport(function (s) {
            if (!s.crossDomain || jQuery.support.cors) {
                var callback;
                return {
                    send: function (headers, complete) {
                        var handle, i, xhr = s.xhr();
                        if (s.username) {
                            xhr.open(s.type, s.url, s.async, s.username, s.password);
                        } else {
                            xhr.open(s.type, s.url, s.async);
                        }
                        if (s.xhrFields) {
                            for (i in s.xhrFields) {
                                xhr[i] = s.xhrFields[i];
                            }
                        }
                        if (s.mimeType && xhr.overrideMimeType) {
                            xhr.overrideMimeType(s.mimeType);
                        }
                        if (!s.crossDomain && !headers["X-Requested-With"]) {
                            headers["X-Requested-With"] = "XMLHttpRequest";
                        }
                        try {
                            for (i in headers) {
                                xhr.setRequestHeader(i, headers[i]);
                            }
                        } catch (err) { }
                        xhr.send((s.hasContent && s.data) || null);
                        callback = function (_, isAbort) {
                            var status, responseHeaders, statusText, responses;
                            try {
                                if (callback && (isAbort || xhr.readyState === 4)) {
                                    callback = undefined;
                                    if (handle) {
                                        xhr.onreadystatechange = jQuery.noop;
                                        if (xhrOnUnloadAbort) {
                                            delete xhrCallbacks[handle];
                                        }
                                    }
                                    if (isAbort) {
                                        if (xhr.readyState !== 4) {
                                            xhr.abort();
                                        }
                                    } else {
                                        responses = {};
                                        status = xhr.status;
                                        responseHeaders = xhr.getAllResponseHeaders();
                                        if (typeof xhr.responseText === "string") {
                                            responses.text = xhr.responseText;
                                        }
                                        try {
                                            statusText = xhr.statusText;
                                        } catch (e) {
                                            statusText = "";
                                        }
                                        if (!status && s.isLocal && !s.crossDomain) {
                                            status = responses.text ? 200 : 404;
                                        } else if (status === 1223) {
                                            status = 204;
                                        }
                                    }
                                }
                            } catch (firefoxAccessException) {
                                if (!isAbort) {
                                    complete(-1, firefoxAccessException);
                                }
                            }
                            if (responses) {
                                complete(status, statusText, responses, responseHeaders);
                            }
                        };
                        if (!s.async) {
                            callback();
                        } else if (xhr.readyState === 4) {
                            setTimeout(callback);
                        } else {
                            handle = ++xhrId;
                            if (xhrOnUnloadAbort) {
                                if (!xhrCallbacks) {
                                    xhrCallbacks = {};
                                    jQuery(window).unload(xhrOnUnloadAbort);
                                }
                                xhrCallbacks[handle] = callback;
                            }
                            xhr.onreadystatechange = callback;
                        }
                    },
                    abort: function () {
                        if (callback) {
                            callback(undefined, true);
                        }
                    }
                };
            }
        });
    }
    var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/,
        rfxnum = new RegExp("^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i"),
        rrun = /queueHooks$/,
        animationPrefilters = [defaultPrefilter],
        tweeners = {
            "*": [function (prop, value) {
                var end, unit, tween = this.createTween(prop, value),
                    parts = rfxnum.exec(value),
                    target = tween.cur(),
                    start = +target || 0,
                    scale = 1,
                    maxIterations = 20;
                if (parts) {
                    end = +parts[2];
                    unit = parts[3] || (jQuery.cssNumber[prop] ? "" : "px");
                    if (unit !== "px" && start) {
                        start = jQuery.css(tween.elem, prop, true) || end || 1;
                        do {
                            scale = scale || ".5";
                            start = start / scale;
                            jQuery.style(tween.elem, prop, start + unit);
                        } while (scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations);
                    }
                    tween.unit = unit;
                    tween.start = start;
                    tween.end = parts[1] ? start + (parts[1] + 1) * end : end;
                }
                return tween;
            }]
        };

    function createFxNow() {
        setTimeout(function () {
            fxNow = undefined;
        });
        return (fxNow = jQuery.now());
    }

    function createTweens(animation, props) {
        jQuery.each(props, function (prop, value) {
            var collection = (tweeners[prop] || []).concat(tweeners["*"]),
                index = 0,
                length = collection.length;
            for (; index < length; index++) {
                if (collection[index].call(animation, prop, value)) {
                    return;
                }
            }
        });
    }

    function Animation(elem, properties, options) {
        var result, stopped, index = 0,
            length = animationPrefilters.length,
            deferred = jQuery.Deferred().always(function () {
                delete tick.elem;
            }),
            tick = function () {
                if (stopped) {
                    return false;
                }
                var currentTime = fxNow || createFxNow(),
                    remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
                    temp = remaining / animation.duration || 0,
                    percent = 1 - temp,
                    index = 0,
                    length = animation.tweens.length;
                for (; index < length; index++) {
                    animation.tweens[index].run(percent);
                }
                deferred.notifyWith(elem, [animation, percent, remaining]);
                if (percent < 1 && length) {
                    return remaining;
                } else {
                    deferred.resolveWith(elem, [animation]);
                    return false;
                }
            },
            animation = deferred.promise({
                elem: elem,
                props: jQuery.extend({}, properties),
                opts: jQuery.extend(true, {
                    specialEasing: {}
                }, options),
                originalProperties: properties,
                originalOptions: options,
                startTime: fxNow || createFxNow(),
                duration: options.duration,
                tweens: [],
                createTween: function (prop, end) {
                    var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                    animation.tweens.push(tween);
                    return tween;
                },
                stop: function (gotoEnd) {
                    var index = 0,
                        length = gotoEnd ? animation.tweens.length : 0;
                    if (stopped) {
                        return this;
                    }
                    stopped = true;
                    for (; index < length; index++) {
                        animation.tweens[index].run(1);
                    }
                    if (gotoEnd) {
                        deferred.resolveWith(elem, [animation, gotoEnd]);
                    } else {
                        deferred.rejectWith(elem, [animation, gotoEnd]);
                    }
                    return this;
                }
            }),
            props = animation.props;
        propFilter(props, animation.opts.specialEasing);
        for (; index < length; index++) {
            result = animationPrefilters[index].call(animation, elem, props, animation.opts);
            if (result) {
                return result;
            }
        }
        createTweens(animation, props);
        if (jQuery.isFunction(animation.opts.start)) {
            animation.opts.start.call(elem, animation);
        }
        jQuery.fx.timer(jQuery.extend(tick, {
            elem: elem,
            anim: animation,
            queue: animation.opts.queue
        }));
        return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
    }

    function propFilter(props, specialEasing) {
        var value, name, index, easing, hooks;
        for (index in props) {
            name = jQuery.camelCase(index);
            easing = specialEasing[name];
            value = props[index];
            if (jQuery.isArray(value)) {
                easing = value[1];
                value = props[index] = value[0];
            }
            if (index !== name) {
                props[name] = value;
                delete props[index];
            }
            hooks = jQuery.cssHooks[name];
            if (hooks && "expand" in hooks) {
                value = hooks.expand(value);
                delete props[name];
                for (index in value) {
                    if (!(index in props)) {
                        props[index] = value[index];
                        specialEasing[index] = easing;
                    }
                }
            } else {
                specialEasing[name] = easing;
            }
        }
    }
    jQuery.Animation = jQuery.extend(Animation, {
        tweener: function (props, callback) {
            if (jQuery.isFunction(props)) {
                callback = props;
                props = ["*"];
            } else {
                props = props.split(" ");
            }
            var prop, index = 0,
                length = props.length;
            for (; index < length; index++) {
                prop = props[index];
                tweeners[prop] = tweeners[prop] || [];
                tweeners[prop].unshift(callback);
            }
        },
        prefilter: function (callback, prepend) {
            if (prepend) {
                animationPrefilters.unshift(callback);
            } else {
                animationPrefilters.push(callback);
            }
        }
    });

    function defaultPrefilter(elem, props, opts) {
        var prop, index, length, value, dataShow, toggle, tween, hooks, oldfire, anim = this,
            style = elem.style,
            orig = {},
            handled = [],
            hidden = elem.nodeType && isHidden(elem);
        if (!opts.queue) {
            hooks = jQuery._queueHooks(elem, "fx");
            if (hooks.unqueued == null) {
                hooks.unqueued = 0;
                oldfire = hooks.empty.fire;
                hooks.empty.fire = function () {
                    if (!hooks.unqueued) {
                        oldfire();
                    }
                };
            }
            hooks.unqueued++;
            anim.always(function () {
                anim.always(function () {
                    hooks.unqueued--;
                    if (!jQuery.queue(elem, "fx").length) {
                        hooks.empty.fire();
                    }
                });
            });
        }
        if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
            opts.overflow = [style.overflow, style.overflowX, style.overflowY];
            if (jQuery.css(elem, "display") === "inline" && jQuery.css(elem, "float") === "none") {
                if (!jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay(elem.nodeName) === "inline") {
                    style.display = "inline-block";
                } else {
                    style.zoom = 1;
                }
            }
        }
        if (opts.overflow) {
            style.overflow = "hidden";
            if (!jQuery.support.shrinkWrapBlocks) {
                anim.always(function () {
                    style.overflow = opts.overflow[0];
                    style.overflowX = opts.overflow[1];
                    style.overflowY = opts.overflow[2];
                });
            }
        }
        for (index in props) {
            value = props[index];
            if (rfxtypes.exec(value)) {
                delete props[index];
                toggle = toggle || value === "toggle";
                if (value === (hidden ? "hide" : "show")) {
                    continue;
                }
                handled.push(index);
            }
        }
        length = handled.length;
        if (length) {
            dataShow = jQuery._data(elem, "fxshow") || jQuery._data(elem, "fxshow", {});
            if ("hidden" in dataShow) {
                hidden = dataShow.hidden;
            }
            if (toggle) {
                dataShow.hidden = !hidden;
            }
            if (hidden) {
                jQuery(elem).show();
            } else {
                anim.done(function () {
                    jQuery(elem).hide();
                });
            }
            anim.done(function () {
                var prop;
                jQuery._removeData(elem, "fxshow");
                for (prop in orig) {
                    jQuery.style(elem, prop, orig[prop]);
                }
            });
            for (index = 0; index < length; index++) {
                prop = handled[index];
                tween = anim.createTween(prop, hidden ? dataShow[prop] : 0);
                orig[prop] = dataShow[prop] || jQuery.style(elem, prop);
                if (!(prop in dataShow)) {
                    dataShow[prop] = tween.start;
                    if (hidden) {
                        tween.end = tween.start;
                        tween.start = prop === "width" || prop === "height" ? 1 : 0;
                    }
                }
            }
        }
    }

    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing);
    }
    jQuery.Tween = Tween;
    Tween.prototype = {
        constructor: Tween,
        init: function (elem, options, prop, end, easing, unit) {
            this.elem = elem;
            this.prop = prop;
            this.easing = easing || "swing";
            this.options = options;
            this.start = this.now = this.cur();
            this.end = end;
            this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
        },
        cur: function () {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
        },
        run: function (percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            if (this.options.duration) {
                this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
            } else {
                this.pos = eased = percent;
            }
            this.now = (this.end - this.start) * eased + this.start;
            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this);
            }
            if (hooks && hooks.set) {
                hooks.set(this);
            } else {
                Tween.propHooks._default.set(this);
            }
            return this;
        }
    };
    Tween.prototype.init.prototype = Tween.prototype;
    Tween.propHooks = {
        _default: {
            get: function (tween) {
                var result;
                if (tween.elem[tween.prop] != null && (!tween.elem.style || tween.elem.style[tween.prop] == null)) {
                    return tween.elem[tween.prop];
                }
                result = jQuery.css(tween.elem, tween.prop, "");
                return !result || result === "auto" ? 0 : result;
            },
            set: function (tween) {
                if (jQuery.fx.step[tween.prop]) {
                    jQuery.fx.step[tween.prop](tween);
                } else if (tween.elem.style && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
                    jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
                } else {
                    tween.elem[tween.prop] = tween.now;
                }
            }
        }
    };
    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function (tween) {
            if (tween.elem.nodeType && tween.elem.parentNode) {
                tween.elem[tween.prop] = tween.now;
            }
        }
    };
    jQuery.each(["toggle", "show", "hide"], function (i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function (speed, easing, callback) {
            return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
        };
    });
    jQuery.fn.extend({
        fadeTo: function (speed, to, easing, callback) {
            return this.filter(isHidden).css("opacity", 0).show().end().animate({
                opacity: to
            }, speed, easing, callback);
        },
        animate: function (prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop),
                optall = jQuery.speed(speed, easing, callback),
                doAnimation = function () {
                    var anim = Animation(this, jQuery.extend({}, prop), optall);
                    doAnimation.finish = function () {
                        anim.stop(true);
                    };
                    if (empty || jQuery._data(this, "finish")) {
                        anim.stop(true);
                    }
                };
            doAnimation.finish = doAnimation;
            return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
        },
        stop: function (type, clearQueue, gotoEnd) {
            var stopQueue = function (hooks) {
                var stop = hooks.stop;
                delete hooks.stop;
                stop(gotoEnd);
            };
            if (typeof type !== "string") {
                gotoEnd = clearQueue;
                clearQueue = type;
                type = undefined;
            }
            if (clearQueue && type !== false) {
                this.queue(type || "fx", []);
            }
            return this.each(function () {
                var dequeue = true,
                    index = type != null && type + "queueHooks",
                    timers = jQuery.timers,
                    data = jQuery._data(this);
                if (index) {
                    if (data[index] && data[index].stop) {
                        stopQueue(data[index]);
                    }
                } else {
                    for (index in data) {
                        if (data[index] && data[index].stop && rrun.test(index)) {
                            stopQueue(data[index]);
                        }
                    }
                }
                for (index = timers.length; index--;) {
                    if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
                        timers[index].anim.stop(gotoEnd);
                        dequeue = false;
                        timers.splice(index, 1);
                    }
                }
                if (dequeue || !gotoEnd) {
                    jQuery.dequeue(this, type);
                }
            });
        },
        finish: function (type) {
            if (type !== false) {
                type = type || "fx";
            }
            return this.each(function () {
                var index, data = jQuery._data(this),
                    queue = data[type + "queue"],
                    hooks = data[type + "queueHooks"],
                    timers = jQuery.timers,
                    length = queue ? queue.length : 0;
                data.finish = true;
                jQuery.queue(this, type, []);
                if (hooks && hooks.cur && hooks.cur.finish) {
                    hooks.cur.finish.call(this);
                }
                for (index = timers.length; index--;) {
                    if (timers[index].elem === this && timers[index].queue === type) {
                        timers[index].anim.stop(true);
                        timers.splice(index, 1);
                    }
                }
                for (index = 0; index < length; index++) {
                    if (queue[index] && queue[index].finish) {
                        queue[index].finish.call(this);
                    }
                }
                delete data.finish;
            });
        }
    });

    function genFx(type, includeWidth) {
        var which, attrs = {
            height: type
        },
            i = 0;
        includeWidth = includeWidth ? 1 : 0;
        for (; i < 4; i += 2 - includeWidth) {
            which = cssExpand[i];
            attrs["margin" + which] = attrs["padding" + which] = type;
        }
        if (includeWidth) {
            attrs.opacity = attrs.width = type;
        }
        return attrs;
    }
    jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function (name, props) {
        jQuery.fn[name] = function (speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
        };
    });
    jQuery.speed = function (speed, easing, fn) {
        var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
        };
        opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
        if (opt.queue == null || opt.queue === true) {
            opt.queue = "fx";
        }
        opt.old = opt.complete;
        opt.complete = function () {
            if (jQuery.isFunction(opt.old)) {
                opt.old.call(this);
            }
            if (opt.queue) {
                jQuery.dequeue(this, opt.queue);
            }
        };
        return opt;
    };
    jQuery.easing = {
        linear: function (p) {
            return p;
        },
        swing: function (p) {
            return 0.5 - Math.cos(p * Math.PI) / 2;
        }
    };
    jQuery.timers = [];
    jQuery.fx = Tween.prototype.init;
    jQuery.fx.tick = function () {
        var timer, timers = jQuery.timers,
            i = 0;
        fxNow = jQuery.now();
        for (; i < timers.length; i++) {
            timer = timers[i];
            if (!timer() && timers[i] === timer) {
                timers.splice(i--, 1);
            }
        }
        if (!timers.length) {
            jQuery.fx.stop();
        }
        fxNow = undefined;
    };
    jQuery.fx.timer = function (timer) {
        if (timer() && jQuery.timers.push(timer)) {
            jQuery.fx.start();
        }
    };
    jQuery.fx.interval = 13;
    jQuery.fx.start = function () {
        if (!timerId) {
            timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval);
        }
    };
    jQuery.fx.stop = function () {
        clearInterval(timerId);
        timerId = null;
    };
    jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    jQuery.fx.step = {};
    if (jQuery.expr && jQuery.expr.filters) {
        jQuery.expr.filters.animated = function (elem) {
            return jQuery.grep(jQuery.timers, function (fn) {
                return elem === fn.elem;
            }).length;
        };
    }
    jQuery.fn.offset = function (options) {
        if (arguments.length) {
            return options === undefined ? this : this.each(function (i) {
                jQuery.offset.setOffset(this, options, i);
            });
        }
        var docElem, win, box = {
            top: 0,
            left: 0
        },
            elem = this[0],
            doc = elem && elem.ownerDocument;
        if (!doc) {
            return;
        }
        docElem = doc.documentElement;
        if (!jQuery.contains(docElem, elem)) {
            return box;
        }
        if (typeof elem.getBoundingClientRect !== core_strundefined) {
            box = elem.getBoundingClientRect();
        }
        win = getWindow(doc);
        return {
            top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
            left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
        };
    };
    jQuery.offset = {
        setOffset: function (elem, options, i) {
            var position = jQuery.css(elem, "position");
            if (position === "static") {
                elem.style.position = "relative";
            }
            var curElem = jQuery(elem),
                curOffset = curElem.offset(),
                curCSSTop = jQuery.css(elem, "top"),
                curCSSLeft = jQuery.css(elem, "left"),
                calculatePosition = (position === "absolute" || position === "fixed") && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
                props = {},
                curPosition = {},
                curTop, curLeft;
            if (calculatePosition) {
                curPosition = curElem.position();
                curTop = curPosition.top;
                curLeft = curPosition.left;
            } else {
                curTop = parseFloat(curCSSTop) || 0;
                curLeft = parseFloat(curCSSLeft) || 0;
            }
            if (jQuery.isFunction(options)) {
                options = options.call(elem, i, curOffset);
            }
            if (options.top != null) {
                props.top = (options.top - curOffset.top) + curTop;
            }
            if (options.left != null) {
                props.left = (options.left - curOffset.left) + curLeft;
            }
            if ("using" in options) {
                options.using.call(elem, props);
            } else {
                curElem.css(props);
            }
        }
    };
    jQuery.fn.extend({
        position: function () {
            if (!this[0]) {
                return;
            }
            var offsetParent, offset, parentOffset = {
                top: 0,
                left: 0
            },
                elem = this[0];
            if (jQuery.css(elem, "position") === "fixed") {
                offset = elem.getBoundingClientRect();
            } else {
                offsetParent = this.offsetParent();
                offset = this.offset();
                if (!jQuery.nodeName(offsetParent[0], "html")) {
                    parentOffset = offsetParent.offset();
                }
                parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
                parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
            }
            return {
                top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
                left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
            };
        },
        offsetParent: function () {
            return this.map(function () {
                var offsetParent = this.offsetParent || document.documentElement;
                while (offsetParent && (!jQuery.nodeName(offsetParent, "html") && jQuery.css(offsetParent, "position") === "static")) {
                    offsetParent = offsetParent.offsetParent;
                }
                return offsetParent || document.documentElement;
            });
        }
    });
    jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function (method, prop) {
        var top = /Y/.test(prop);
        jQuery.fn[method] = function (val) {
            return jQuery.access(this, function (elem, method, val) {
                var win = getWindow(elem);
                if (val === undefined) {
                    return win ? (prop in win) ? win[prop] : win.document.documentElement[method] : elem[method];
                }
                if (win) {
                    win.scrollTo(!top ? val : jQuery(win).scrollLeft(), top ? val : jQuery(win).scrollTop());
                } else {
                    elem[method] = val;
                }
            }, method, val, arguments.length, null);
        };
    });

    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
    }
    jQuery.each({
        Height: "height",
        Width: "width"
    }, function (name, type) {
        jQuery.each({
            padding: "inner" + name,
            content: type,
            "": "outer" + name
        }, function (defaultExtra, funcName) {
            jQuery.fn[funcName] = function (margin, value) {
                var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
                    extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
                return jQuery.access(this, function (elem, type, value) {
                    var doc;
                    if (jQuery.isWindow(elem)) {
                        return elem.document.documentElement["client" + name];
                    }
                    if (elem.nodeType === 9) {
                        doc = elem.documentElement;
                        return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
                    }
                    return value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
                }, type, chainable ? margin : undefined, chainable, null);
            };
        });
    });
    window.jQuery = window.$ = jQuery;
    if (typeof define === "function" && define.amd && define.amd.jQuery) {
        define("jquery", [], function () {
            return jQuery;
        });
    }
})(window);
/*build/dist/CAXL-release-2014.04.10787/src/third_party/jquery/jquery.jstore-all.js*/
/*!
 * jStore - Persistent Client-Side Storage
 *
 * Copyright (c) 2009 Eric Garside (http://eric.garside.name)
 * 
 * Dual licensed under:
 * 	MIT: http://www.opensource.org/licenses/mit-license.php
 *	GPLv3: http://www.opensource.org/licenses/gpl-3.0.html
 */
(function ($) {
    function toIntegersAtLease(n) {
        return n < 10 ? '0' + n : n;
    }
    Date.prototype.toJSON = function (date) {
        return this.getUTCFullYear() + '-' +
            toIntegersAtLease(this.getUTCMonth()) + '-' +
            toIntegersAtLease(this.getUTCDate());
    };
    var escapeable = /["\\\x00-\x1f\x7f-\x9f]/g;
    var meta = {
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"': '\\"',
        '\\': '\\\\'
    };
    $.quoteString = function (string) {
        if (escapeable.test(string)) {
            return '"' + string.replace(escapeable, function (a) {
                var c = meta[a];
                if (typeof c === 'string') {
                    return c;
                }
                c = a.charCodeAt();
                return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
            }) + '"';
        }
        return '"' + string + '"';
    };
    $.toJSON = function (o, compact) {
        var type = typeof (o);
        if (type == "undefined")
            return "undefined";
        else if (type == "number" || type == "boolean")
            return o + "";
        else if (o === null)
            return "null";
        if (type == "string") {
            return $.quoteString(o);
        }
        if (type == "object" && typeof o.toJSON == "function")
            return o.toJSON(compact);
        if (type != "function" && typeof (o.length) == "number") {
            var ret = [];
            for (var i = 0; i < o.length; i++) {
                ret.push($.toJSON(o[i], compact));
            }
            if (compact)
                return "[" + ret.join(",") + "]";
            else
                return "[" + ret.join(", ") + "]";
        }
        if (type == "function") {
            throw new TypeError("Unable to convert object of type 'function' to json.");
        }
        var ret = [];
        for (var k in o) {
            var name;
            type = typeof (k);
            if (type == "number")
                name = '"' + k + '"';
            else if (type == "string")
                name = $.quoteString(k);
            else
                continue;
            var val = $.toJSON(o[k], compact);
            if (typeof (val) != "string") {
                continue;
            }
            if (compact)
                ret.push(name + ":" + val);
            else
                ret.push(name + ": " + val);
        }
        return "{" + ret.join(", ") + "}";
    };
    $.compactJSON = function (o) {
        return $.toJSON(o, true);
    };
    $.evalJSON = function (src) {
        return eval("(" + src + ")");
    };
    $.secureEvalJSON = function (src) {
        var filtered = src;
        filtered = filtered.replace(/\\["\\\/bfnrtu]/g, '@');
        filtered = filtered.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
        filtered = filtered.replace(/(?:^|:|,)(?:\s*\[)+/g, '');
        if (/^[\],:{}\s]*$/.test(filtered))
            return eval("(" + src + ")");
        else
            throw new SyntaxError("Error parsing JSON, source is not valid.");
    };
})(jQuery);
(function () {
    var initializing = false,
        fnTest = /xyz/.test(function () {
            xyz;
        }) ? /\b_super\b/ : /.*/;
    this.Class = function () { };
    Class.extend = function (prop) {
        var _super = this.prototype;
        initializing = true;
        var prototype = new this();
        initializing = false;
        for (var name in prop) {
            prototype[name] = typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name]) ? (function (name, fn) {
                return function () {
                    var tmp = this._super;
                    this._super = _super[name];
                    var ret = fn.apply(this, arguments);
                    this._super = tmp;
                    return ret;
                };
            })(name, prop[name]) : prop[name];
        }

        function Class() {
            if (!initializing && this.init)
                this.init.apply(this, arguments);
        }
        Class.prototype = prototype;
        Class.constructor = Class;
        Class.extend = arguments.callee;
        return Class;
    };
})();
(function ($) {
    this.jStoreDelegate = Class.extend({
        init: function (parent) {
            this.parent = parent;
            this.callbacks = {};
        },
        bind: function (event, callback) {
            if (!$.isFunction(callback)) return this;
            if (!this.callbacks[event]) this.callbacks[event] = [];
            this.callbacks[event].push(callback);
            return this;
        },
        trigger: function () {
            var parent = this.parent,
                args = [].slice.call(arguments),
                event = args.shift(),
                handlers = this.callbacks[event];
            if (!handlers) return false;
            $.each(handlers, function () {
                this.apply(parent, args)
            });
            return this;
        }
    });
})(jQuery);
(function ($) {
    var rxJson;
    try {
        rxJson = new RegExp('^("(\\\\.|[^"\\\\\\n\\r])*?"|[,:{}\\[\\]0-9.\\-+Eaeflnr-u \\n\\r\\t])+?$')
    } catch (e) {
        rxJson = /^(true|false|null|\[.*\]|\{.*\}|".*"|\d+|\d+\.\d+)$/
    }
    $.jStore = {};
    $.extend($.jStore, {
        EngineOrder: [],
        Availability: {},
        Engines: {},
        Instances: {},
        CurrentEngine: null,
        defaults: {
            project: null,
            engine: null,
            autoload: true,
            flash: 'jStore.Flash.html'
        },
        isReady: false,
        isFlashReady: false,
        delegate: new jStoreDelegate($.jStore).bind('jStore-ready', function (engine) {
            $.jStore.isReady = true;
            if ($.jStore.defaults.autoload) engine.connect();
        }).bind('flash-ready', function () {
            $.jStore.isFlashReady = true;
        }),
        ready: function (callback) {
            if ($.jStore.isReady) callback.apply($.jStore, [$.jStore.CurrentEngine]);
            else $.jStore.delegate.bind('jStore-ready', callback);
        },
        fail: function (callback) {
            $.jStore.delegate.bind('jStore-failure', callback);
        },
        flashReady: function (callback) {
            if ($.jStore.isFlashReady) callback.apply($.jStore, [$.jStore.CurrentEngine]);
            else $.jStore.delegate.bind('flash-ready', callback);
        },
        use: function (engine, project, identifier) {
            project = project || $.jStore.defaults.project || location.hostname.replace(/\./g, '-') || 'unknown';
            var e = $.jStore.Engines[engine.toLowerCase()] || null,
                name = (identifier ? identifier + '.' : '') + project + '.' + engine;
            if (!e) throw 'JSTORE_ENGINE_UNDEFINED';
            e = new e(project, name);
            if ($.jStore.Instances[name]) throw 'JSTORE_JRI_CONFLICT';
            if (e.isAvailable()) {
                $.jStore.Instances[name] = e;
                if (!$.jStore.CurrentEngine) {
                    $.jStore.CurrentEngine = e;
                }
                $.jStore.delegate.trigger('jStore-ready', e);
            } else {
                if (!e.autoload)
                    throw 'JSTORE_ENGINE_UNAVILABLE';
                else {
                    e.included(function () {
                        if (this.isAvailable()) {
                            $.jStore.Instances[name] = this;
                            if (!$.jStore.CurrentEngine) {
                                $.jStore.CurrentEngine = this;
                            }
                            $.jStore.delegate.trigger('jStore-ready', this);
                        } else $.jStore.delegate.trigger('jStore-failure', this);
                    }).include();
                }
            }
        },
        setCurrentEngine: function (name) {
            if (!$.jStore.Instances.length)
                return $.jStore.FindEngine();
            if (!name && $.jStore.Instances.length >= 1) {
                $.jStore.delegate.trigger('jStore-ready', $.jStore.Instances[0]);
                return $.jStore.CurrentEngine = $.jStore.Instances[0];
            }
            if (name && $.jStore.Instances[name]) {
                $.jStore.delegate.trigger('jStore-ready', $.jStore.Instances[name]);
                return $.jStore.CurrentEngine = $.jStore.Instances[name];
            }
            throw 'JSTORE_JRI_NO_MATCH';
        },
        FindEngine: function () {
            $.each($.jStore.EngineOrder, function (k) {
                if ($.jStore.Availability[this]()) {
                    $.jStore.use(this, $.jStore.defaults.project, 'default');
                    return false;
                }
            })
        },
        load: function () {
            if ($.jStore.defaults.engine)
                return $.jStore.use($.jStore.defaults.engine, $.jStore.defaults.project, 'default');
            try {
                $.jStore.FindEngine();
            } catch (e) { }
        },
        safeStore: function (value) {
            switch (typeof value) {
                case 'object':
                case 'function':
                    return $.jStore.compactJSON(value);
                case 'number':
                case 'boolean':
                case 'string':
                case 'xml':
                    return value;
                case 'undefined':
                default:
                    return '';
            }
        },
        safeResurrect: function (value) {
            return rxJson.test(value) ? $.evalJSON(value) : value;
        },
        store: function (key, value) {
            if (!$.jStore.CurrentEngine) return false;
            if (!value)
                return $.jStore.CurrentEngine.get(key);
            return $.jStore.CurrentEngine.set(key, value);
        },
        remove: function (key) {
            if (!$.jStore.CurrentEngine) return false;
            return $.jStore.CurrentEngine.rem(key);
        },
        get: function (key) {
            return $.jStore.store(key);
        },
        set: function (key, value) {
            return $.jStore.store(key, value);
        }
    })
    $.extend($.fn, {
        store: function (key, value) {
            if (!$.jStore.CurrentEngine) return this;
            var result = $.jStore.store(key, value);
            return !value ? result : this;
        },
        removeStore: function (key) {
            $.jStore.remove(key);
            return this;
        },
        getStore: function (key) {
            return $.jStore.store(key);
        },
        setStore: function (key, value) {
            $.jStore.store(key, value);
            return this;
        }
    })
})(jQuery);
(function ($) {
    this.StorageEngine = Class.extend({
        init: function (project, name) {
            this.project = project;
            this.jri = name;
            this.data = {};
            this.limit = -1;
            this.includes = [];
            this.delegate = new jStoreDelegate(this).bind('engine-ready', function () {
                this.isReady = true;
            }).bind('engine-included', function () {
                this.hasIncluded = true;
            });
            this.autoload = false;
            this.isReady = false;
            this.hasIncluded = false;
        },
        include: function () {
            var self = this,
                total = this.includes.length,
                count = 0;
            $.each(this.includes, function () {
                $.ajax({
                    type: 'get',
                    url: this,
                    dataType: 'script',
                    cache: true,
                    success: function () {
                        count++;
                        if (count == total) self.delegate.trigger('engine-included');
                    }
                })
            });
        },
        isAvailable: function () {
            return false;
        },
        interruptAccess: function () {
            if (!this.isReady) throw 'JSTORE_ENGINE_NOT_READY';
        },
        ready: function (callback) {
            if (this.isReady) callback.apply(this);
            else this.delegate.bind('engine-ready', callback);
            return this;
        },
        included: function (callback) {
            if (this.hasIncluded) callback.apply(this);
            else this.delegate.bind('engine-included', callback);
            return this;
        },
        get: function (key) {
            this.interruptAccess();
            return this.data[key] || null;
        },
        set: function (key, value) {
            this.interruptAccess();
            this.data[key] = value;
            return value;
        },
        rem: function (key) {
            this.interruptAccess();
            var beforeDelete = this.data[key];
            this.data[key] = null;
            return beforeDelete;
        }
    });
})(jQuery);
(function ($) {
    var sessionAvailability = $.jStore.Availability.session = function () {
        return !!window.sessionStorage;
    },
        localAvailability = $.jStore.Availability.local = function () {
            return !!(window.localStorage || window.globalStorage);
        };
    this.jStoreDom = StorageEngine.extend({
        init: function (project, name) {
            this._super(project, name);
            this.type = 'DOM';
            this.limit = 5 * 1024 * 1024;
        },
        connect: function () {
            this.delegate.trigger('engine-ready');
        },
        get: function (key) {
            this.interruptAccess();
            var out = this.db.getItem(key);
            return $.jStore.safeResurrect((out && out.value ? out.value : out));
        },
        set: function (key, value) {
            this.interruptAccess();
            this.db.setItem(key, $.jStore.safeStore(value));
            return value;
        },
        rem: function (key) {
            this.interruptAccess();
            var out = this.get(key);
            this.db.removeItem(key);
            return out
        }
    })
    this.jStoreLocal = jStoreDom.extend({
        connect: function () {
            this.db = !window.globalStorage ? window.localStorage : window.globalStorage[location.hostname];
            this._super();
        },
        isAvailable: localAvailability
    })
    this.jStoreSession = jStoreDom.extend({
        connect: function () {
            this.db = sessionStorage;
            this._super();
        },
        isAvailable: sessionAvailability
    })
    $.jStore.Engines.local = jStoreLocal;
    $.jStore.Engines.session = jStoreSession;
    $.jStore.EngineOrder[1] = 'local';
})(jQuery);
(function ($) {
    var avilability = $.jStore.Availability.flash = function () {
        return !!($.jStore.hasFlash('8.0.0'));
    }
    this.jStoreFlash = StorageEngine.extend({
        init: function (project, name) {
            this._super(project, name);
            this.type = 'Flash';
            var self = this;
            $.jStore.flashReady(function () {
                self.flashReady()
            });
        },
        connect: function () {
            var name = 'jstore-flash-embed-' + this.project;
            $(document.body).append('<iframe style="height:1px;width:1px;position:absolute;left:0;top:0;margin-left:-100px;" ' + 'id="jStoreFlashFrame" src="' + $.jStore.defaults.flash + '"></iframe>');
        },
        flashReady: function (e) {
            var iFrame = $('#jStoreFlashFrame')[0];
            if (iFrame.Document && $.isFunction(iFrame.Document['jStoreFlash'].f_get_cookie)) this.db = iFrame.Document['jStoreFlash'];
            else if (iFrame.contentWindow && iFrame.contentWindow.document) {
                var doc = iFrame.contentWindow.document;
                if ($.isFunction($('object', $(doc))[0].f_get_cookie)) this.db = $('object', $(doc))[0];
                else if ($.isFunction($('embed', $(doc))[0].f_get_cookie)) this.db = $('embed', $(doc))[0];
            }
            if (this.db) this.delegate.trigger('engine-ready');
        },
        isAvailable: avilability,
        get: function (key) {
            this.interruptAccess();
            var out = this.db.f_get_cookie(key);
            return out == 'null' ? null : $.jStore.safeResurrect(out);
        },
        set: function (key, value) {
            this.interruptAccess();
            this.db.f_set_cookie(key, $.jStore.safeStore(value));
            return value;
        },
        rem: function (key) {
            this.interruptAccess();
            var beforeDelete = this.get(key);
            this.db.f_delete_cookie(key);
            return beforeDelete;
        }
    })
    $.jStore.Engines.flash = jStoreFlash;
    $.jStore.EngineOrder[2] = 'flash';
    $.jStore.hasFlash = function (version) {
        var pv = $.jStore.flashVersion().match(/\d+/g),
            rv = version.match(/\d+/g);
        for (var i = 0; i < 3; i++) {
            pv[i] = parseInt(pv[i] || 0);
            rv[i] = parseInt(rv[i] || 0);
            if (pv[i] < rv[i]) return false;
            if (pv[i] > rv[i]) return true;
        }
        return true;
    }
    $.jStore.flashVersion = function () {
        try {
            try {
                var axo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.6');
                try {
                    axo.AllowScriptAccess = 'always';
                } catch (e) {
                    return '6,0,0';
                }
            } catch (e) { }
            return new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').replace(/\D+/g, ',').match(/^,?(.+),?$/)[1];
        } catch (e) {
            try {
                if (navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin) {
                    return (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1];
                }
            } catch (e) { }
        }
        return '0,0,0';
    }
    window.flash_ready = function () {
        $.jStore.delegate.trigger('flash-ready');
    }
})(jQuery);
(function ($) {
    var avilability = $.jStore.Availability.gears = function () {
        return !!(window.google && window.google.gears)
    }
    this.jStoreGears = StorageEngine.extend({
        init: function (project, name) {
            this._super(project, name);
            this.type = 'Google Gears';
            this.includes.push('http://code.google.com/apis/gears/gears_init.js');
            this.autoload = true;
        },
        connect: function () {
            var db = this.db = google.gears.factory.create('beta.database');
            db.open('jstore-' + this.project);
            db.execute('CREATE TABLE IF NOT EXISTS jstore (k TEXT UNIQUE NOT NULL PRIMARY KEY, v TEXT NOT NULL)');
            this.updateCache();
        },
        updateCache: function () {
            var result = this.db.execute('SELECT k,v FROM jstore');
            while (result.isValidRow()) {
                this.data[result.field(0)] = $.jStore.safeResurrect(result.field(1));
                result.next();
            }
            result.close();
            this.delegate.trigger('engine-ready');
        },
        isAvailable: avilability,
        set: function (key, value) {
            this.interruptAccess();
            var db = this.db;
            db.execute('BEGIN');
            db.execute('INSERT OR REPLACE INTO jstore(k, v) VALUES (?, ?)', [key, $.jStore.safeStore(value)]);
            db.execute('COMMIT');
            return this._super(key, value);
        },
        rem: function (key) {
            this.interruptAccess();
            var db = this.db;
            db.execute('BEGIN');
            db.execute('DELETE FROM jstore WHERE k = ?', [key]);
            db.execute('COMMIT');
            return this._super(key);
        }
    })
    $.jStore.Engines.gears = jStoreGears;
    $.jStore.EngineOrder[3] = 'gears';
})(jQuery);
(function ($) {
    var avilability = $.jStore.Availability.html5 = function () {
        return !!window.openDatabase
    }
    this.jStoreHtml5 = StorageEngine.extend({
        init: function (project, name) {
            this._super(project, name);
            this.type = 'HTML5';
            this.limit = 1024 * 200;
        },
        connect: function () {
            var db = this.db = openDatabase('jstore-' + this.project, '1.0', this.project, this.limit);
            if (!db) throw 'JSTORE_ENGINE_HTML5_NODB';
            db.transaction(function (db) {
                db.executeSql('CREATE TABLE IF NOT EXISTS jstore (k TEXT UNIQUE NOT NULL PRIMARY KEY, v TEXT NOT NULL)');
            });
            this.updateCache();
        },
        updateCache: function () {
            var self = this;
            this.db.transaction(function (db) {
                db.executeSql('SELECT k,v FROM jstore', [], function (db, result) {
                    var rows = result.rows,
                        i = 0,
                        row;
                    for (; i < rows.length; ++i) {
                        row = rows.item(i);
                        self.data[row.k] = $.jStore.safeResurrect(row.v);
                    }
                    self.delegate.trigger('engine-ready');
                });
            });
        },
        isAvailable: avilability,
        set: function (key, value) {
            this.interruptAccess();
            this.db.transaction(function (db) {
                db.executeSql('INSERT OR REPLACE INTO jstore(k, v) VALUES (?, ?)', [key, $.jStore.safeStore(value)]);
            });
            return this._super(key, value);
        },
        rem: function (key) {
            this.interruptAccess();
            this.db.transaction(function (db) {
                db.executeSql('DELETE FROM jstore WHERE k = ?', [key])
            })
            return this._super(key);
        }
    })
    $.jStore.Engines.html5 = jStoreHtml5;
    $.jStore.EngineOrder[0] = 'html5';
})(jQuery);
(function ($) {
    var avilability = $.jStore.Availability.ie = function () {
        return !!window.ActiveXObject;
    }
    this.jStoreIE = StorageEngine.extend({
        init: function (project, name) {
            this._super(project, name);
            this.type = 'IE';
            this.limit = 64 * 1024;
        },
        connect: function () {
            this.db = $('<div style="display:none;behavior:url(\'#default#userData\')" id="jstore-' + this.project + '"></div>').appendTo(document.body).get(0);
            this.delegate.trigger('engine-ready');
        },
        isAvailable: avilability,
        get: function (key) {
            this.interruptAccess();
            this.db.load(this.project);
            return $.jStore.safeResurrect(this.db.getAttribute(key));
        },
        set: function (key, value) {
            this.interruptAccess();
            this.db.setAttribute(key, $.jStore.safeStore(value));
            this.db.save(this.project);
            return value;
        },
        rem: function (key) {
            this.interruptAccess();
            var beforeDelete = this.get(key);
            this.db.removeAttribute(key);
            this.db.save(this.project);
            return beforeDelete;
        }
    })
    $.jStore.Engines.ie = jStoreIE;
    $.jStore.EngineOrder[4] = 'ie';
})(jQuery);
/*build/dist/CAXL-release-2014.04.10787/src/third_party/jquery/jquery-migrate-1.1.1.js*/
/*!
 * jQuery Migrate - v1.1.1 - 2013-02-16
 * https://github.com/jquery/jquery-migrate
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors; Licensed MIT
 */
(function (jQuery, window, undefined) {
    var warnedAbout = {};
    jQuery.migrateWarnings = [];
    if (!jQuery.migrateMute && window.console && console.log) {
        console.log("JQMIGRATE: Logging is active");
    }
    if (jQuery.migrateTrace === undefined) {
        jQuery.migrateTrace = true;
    }
    jQuery.migrateReset = function () {
        warnedAbout = {};
        jQuery.migrateWarnings.length = 0;
    };

    function migrateWarn(msg) {
        if (!warnedAbout[msg]) {
            warnedAbout[msg] = true;
            jQuery.migrateWarnings.push(msg);
            if (window.console && console.warn && !jQuery.migrateMute) {
                //console.warn("JQMIGRATE: " + msg);
                if (jQuery.migrateTrace && console.trace) {
                    //console.trace();
                }
            }
        }
    }

    function migrateWarnProp(obj, prop, value, msg) {
        if (Object.defineProperty) {
            try {
                Object.defineProperty(obj, prop, {
                    configurable: true,
                    enumerable: true,
                    get: function () {
                        migrateWarn(msg);
                        return value;
                    },
                    set: function (newValue) {
                        migrateWarn(msg);
                        value = newValue;
                    }
                });
                return;
            } catch (err) { }
        }
        jQuery._definePropertyBroken = true;
        obj[prop] = value;
    }
    if (document.compatMode === "BackCompat") {
        migrateWarn("jQuery is not compatible with Quirks Mode");
    }
    var attrFn = jQuery("<input/>", {
        size: 1
    }).attr("size") && jQuery.attrFn,
        oldAttr = jQuery.attr,
        valueAttrGet = jQuery.attrHooks.value && jQuery.attrHooks.value.get || function () {
            return null;
        },
        valueAttrSet = jQuery.attrHooks.value && jQuery.attrHooks.value.set || function () {
            return undefined;
        },
        rnoType = /^(?:input|button)$/i,
        rnoAttrNodeType = /^[238]$/,
        rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        ruseDefault = /^(?:checked|selected)$/i;
    migrateWarnProp(jQuery, "attrFn", attrFn || {}, "jQuery.attrFn is deprecated");
    jQuery.attr = function (elem, name, value, pass) {
        var lowerName = name.toLowerCase(),
            nType = elem && elem.nodeType;
        if (pass) {
            if (oldAttr.length < 4) {
                migrateWarn("jQuery.fn.attr( props, pass ) is deprecated");
            }
            if (elem && !rnoAttrNodeType.test(nType) && (attrFn ? name in attrFn : jQuery.isFunction(jQuery.fn[name]))) {
                return jQuery(elem)[name](value);
            }
        }
        if (name === "type" && value !== undefined && rnoType.test(elem.nodeName) && elem.parentNode) {
            migrateWarn("Can't change the 'type' of an input or button in IE 6/7/8");
        }
        if (!jQuery.attrHooks[lowerName] && rboolean.test(lowerName)) {
            jQuery.attrHooks[lowerName] = {
                get: function (elem, name) {
                    var attrNode, property = jQuery.prop(elem, name);
                    return property === true || typeof property !== "boolean" && (attrNode = elem.getAttributeNode(name)) && attrNode.nodeValue !== false ? name.toLowerCase() : undefined;
                },
                set: function (elem, value, name) {
                    var propName;
                    if (value === false) {
                        jQuery.removeAttr(elem, name);
                    } else {
                        propName = jQuery.propFix[name] || name;
                        if (propName in elem) {
                            elem[propName] = true;
                        }
                        elem.setAttribute(name, name.toLowerCase());
                    }
                    return name;
                }
            };
            if (ruseDefault.test(lowerName)) {
                migrateWarn("jQuery.fn.attr('" + lowerName + "') may use property instead of attribute");
            }
        }
        return oldAttr.call(jQuery, elem, name, value);
    };
    jQuery.attrHooks.value = {
        get: function (elem, name) {
            var nodeName = (elem.nodeName || "").toLowerCase();
            if (nodeName === "button") {
                return valueAttrGet.apply(this, arguments);
            }
            if (nodeName !== "input" && nodeName !== "option") {
                migrateWarn("jQuery.fn.attr('value') no longer gets properties");
            }
            return name in elem ? elem.value : null;
        },
        set: function (elem, value) {
            var nodeName = (elem.nodeName || "").toLowerCase();
            if (nodeName === "button") {
                return valueAttrSet.apply(this, arguments);
            }
            if (nodeName !== "input" && nodeName !== "option") {
                migrateWarn("jQuery.fn.attr('value', val) no longer sets properties");
            }
            elem.value = value;
        }
    };
    var matched, browser, oldInit = jQuery.fn.init,
        oldParseJSON = jQuery.parseJSON,
        rquickExpr = /^(?:[^<]*(<[\w\W]+>)[^>]*|#([\w\-]*))$/;
    jQuery.fn.init = function (selector, context, rootjQuery) {
        var match;
        if (selector && typeof selector === "string" && !jQuery.isPlainObject(context) && (match = rquickExpr.exec(selector)) && match[1]) {
            if (selector.charAt(0) !== "<") {
                migrateWarn("$(html) HTML strings must start with '<' character");
            }
            if (context && context.context) {
                context = context.context;
            }
            if (jQuery.parseHTML) {
                return oldInit.call(this, jQuery.parseHTML(jQuery.trim(selector), context, true), context, rootjQuery);
            }
        }
        return oldInit.apply(this, arguments);
    };
    jQuery.fn.init.prototype = jQuery.fn;
    jQuery.parseJSON = function (json) {
        if (!json && json !== null) {
            migrateWarn("jQuery.parseJSON requires a valid JSON string");
            return null;
        }
        return oldParseJSON.apply(this, arguments);
    };
    jQuery.uaMatch = function (ua) {
        ua = ua.toLowerCase();
        var match = /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
        return {
            browser: match[1] || "",
            version: match[2] || "0"
        };
    };
    if (!jQuery.browser) {
        matched = jQuery.uaMatch(navigator.userAgent);
        browser = {};
        if (matched.browser) {
            browser[matched.browser] = true;
            browser.version = matched.version;
        }
        if (browser.chrome) {
            browser.webkit = true;
        } else if (browser.webkit) {
            browser.safari = true;
        }
        jQuery.browser = browser;
    }
    migrateWarnProp(jQuery, "browser", jQuery.browser, "jQuery.browser is deprecated");
    jQuery.sub = function () {
        function jQuerySub(selector, context) {
            return new jQuerySub.fn.init(selector, context);
        }
        jQuery.extend(true, jQuerySub, this);
        jQuerySub.superclass = this;
        jQuerySub.fn = jQuerySub.prototype = this();
        jQuerySub.fn.constructor = jQuerySub;
        jQuerySub.sub = this.sub;
        jQuerySub.fn.init = function init(selector, context) {
            if (context && context instanceof jQuery && !(context instanceof jQuerySub)) {
                context = jQuerySub(context);
            }
            return jQuery.fn.init.call(this, selector, context, rootjQuerySub);
        };
        jQuerySub.fn.init.prototype = jQuerySub.fn;
        var rootjQuerySub = jQuerySub(document);
        migrateWarn("jQuery.sub() is deprecated");
        return jQuerySub;
    };
    jQuery.ajaxSetup({
        converters: {
            "text json": jQuery.parseJSON
        }
    });
    var oldFnData = jQuery.fn.data;
    jQuery.fn.data = function (name) {
        var ret, evt, elem = this[0];
        if (elem && name === "events" && arguments.length === 1) {
            ret = jQuery.data(elem, name);
            evt = jQuery._data(elem, name);
            if ((ret === undefined || ret === evt) && evt !== undefined) {
                migrateWarn("Use of jQuery.fn.data('events') is deprecated");
                return evt;
            }
        }
        return oldFnData.apply(this, arguments);
    };
    var rscriptType = /\/(java|ecma)script/i,
        oldSelf = jQuery.fn.andSelf || jQuery.fn.addBack;
    jQuery.fn.andSelf = function () {
        migrateWarn("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()");
        return oldSelf.apply(this, arguments);
    };
    if (!jQuery.clean) {
        jQuery.clean = function (elems, context, fragment, scripts) {
            context = context || document;
            context = !context.nodeType && context[0] || context;
            context = context.ownerDocument || context;
            migrateWarn("jQuery.clean() is deprecated");
            var i, elem, handleScript, jsTags, ret = [];
            jQuery.merge(ret, jQuery.buildFragment(elems, context).childNodes);
            if (fragment) {
                handleScript = function (elem) {
                    if (!elem.type || rscriptType.test(elem.type)) {
                        return scripts ? scripts.push(elem.parentNode ? elem.parentNode.removeChild(elem) : elem) : fragment.appendChild(elem);
                    }
                };
                for (i = 0;
                    (elem = ret[i]) != null; i++) {
                    if (!(jQuery.nodeName(elem, "script") && handleScript(elem))) {
                        fragment.appendChild(elem);
                        if (typeof elem.getElementsByTagName !== "undefined") {
                            jsTags = jQuery.grep(jQuery.merge([], elem.getElementsByTagName("script")), handleScript);
                            ret.splice.apply(ret, [i + 1, 0].concat(jsTags));
                            i += jsTags.length;
                        }
                    }
                }
            }
            return ret;
        };
    }
    var eventAdd = jQuery.event.add,
        eventRemove = jQuery.event.remove,
        eventTrigger = jQuery.event.trigger,
        oldToggle = jQuery.fn.toggle,
        oldLive = jQuery.fn.live,
        oldDie = jQuery.fn.die,
        ajaxEvents = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",
        rajaxEvent = new RegExp("\\b(?:" + ajaxEvents + ")\\b"),
        rhoverHack = /(?:^|\s)hover(\.\S+|)\b/,
        hoverHack = function (events) {
            if (typeof (events) !== "string" || jQuery.event.special.hover) {
                return events;
            }
            if (rhoverHack.test(events)) {
                migrateWarn("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'");
            }
            return events && events.replace(rhoverHack, "mouseenter$1 mouseleave$1");
        };
    if (jQuery.event.props && jQuery.event.props[0] !== "attrChange") {
        jQuery.event.props.unshift("attrChange", "attrName", "relatedNode", "srcElement");
    }
    if (jQuery.event.dispatch) {
        migrateWarnProp(jQuery.event, "handle", jQuery.event.dispatch, "jQuery.event.handle is undocumented and deprecated");
    }
    jQuery.event.add = function (elem, types, handler, data, selector) {
        if (elem !== document && rajaxEvent.test(types)) {
            migrateWarn("AJAX events should be attached to document: " + types);
        }
        eventAdd.call(this, elem, hoverHack(types || ""), handler, data, selector);
    };
    jQuery.event.remove = function (elem, types, handler, selector, mappedTypes) {
        eventRemove.call(this, elem, hoverHack(types) || "", handler, selector, mappedTypes);
    };
    jQuery.fn.error = function () {
        var args = Array.prototype.slice.call(arguments, 0);
        migrateWarn("jQuery.fn.error() is deprecated");
        args.splice(0, 0, "error");
        if (arguments.length) {
            return this.bind.apply(this, args);
        }
        this.triggerHandler.apply(this, args);
        return this;
    };
    jQuery.fn.toggle = function (fn, fn2) {
        if (!jQuery.isFunction(fn) || !jQuery.isFunction(fn2)) {
            return oldToggle.apply(this, arguments);
        }
        migrateWarn("jQuery.fn.toggle(handler, handler...) is deprecated");
        var args = arguments,
            guid = fn.guid || jQuery.guid++,
            i = 0,
            toggler = function (event) {
                var lastToggle = (jQuery._data(this, "lastToggle" + fn.guid) || 0) % i;
                jQuery._data(this, "lastToggle" + fn.guid, lastToggle + 1);
                event.preventDefault();
                return args[lastToggle].apply(this, arguments) || false;
            };
        toggler.guid = guid;
        while (i < args.length) {
            args[i++].guid = guid;
        }
        return this.click(toggler);
    };
    jQuery.fn.live = function (types, data, fn) {
        migrateWarn("jQuery.fn.live() is deprecated");
        if (oldLive) {
            return oldLive.apply(this, arguments);
        }
        jQuery(this.context).on(types, this.selector, data, fn);
        return this;
    };
    jQuery.fn.die = function (types, fn) {
        migrateWarn("jQuery.fn.die() is deprecated");
        if (oldDie) {
            return oldDie.apply(this, arguments);
        }
        jQuery(this.context).off(types, this.selector || "**", fn);
        return this;
    };
    jQuery.event.trigger = function (event, data, elem, onlyHandlers) {
        if (!elem && !rajaxEvent.test(event)) {
            migrateWarn("Global events are undocumented and deprecated");
        }
        return eventTrigger.call(this, event, data, elem || document, onlyHandlers);
    };
    jQuery.each(ajaxEvents.split("|"), function (_, name) {
        jQuery.event.special[name] = {
            setup: function () {
                var elem = this;
                if (elem !== document) {
                    jQuery.event.add(document, name + "." + jQuery.guid, function () {
                        jQuery.event.trigger(name, null, elem, true);
                    });
                    jQuery._data(this, name, jQuery.guid++);
                }
                return false;
            },
            teardown: function () {
                if (this !== document) {
                    jQuery.event.remove(document, name + "." + jQuery._data(this, name));
                }
                return false;
            }
        };
    });
})(jQuery, window);
/*build/dist/CAXL-release-2014.04.10787/src/jabberwerx.js*/
;
(function (jabberwerx) {
    var jq = jabberwerx.system.jQuery_NoConflict();
    jabberwerx.$ = jq;
    jabberwerx = jq.extend(jabberwerx, {
        version: '2014.04.0',
        _config: {
            persistDuration: 30,
            unsecureAllowed: false,
            capabilityFeatures: [],
            httpBindingURL: "/httpbinding",
            baseReconnectCountdown: 30,
            enabledMechanisms: ["DIGEST-MD5", "PLAIN"]
        },
        _getInstallURL: function () {
            return this._getInstallPath();
        },
        _getInstallPath: function () {
            var p = this._config.installPath;
            if (!p) {
                var target = String(arguments[0] || "jabberwerx") + ".js";
                p = jabberwerx.$("script[src$='" + target + "']").slice(0, 1).attr("src");
                p = p.substring(0, p.indexOf(target));
            }
            return p.charAt(p.length - 1) == '/' ? p : p + '/';
        },
        parseTimestamp: function (timestamp) {
            var result = /^([0-9]{4})(?:-?)([0-9]{2})(?:-?)([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2}(?:\.([0-9]+))?)(?:(Z|[-+]?[0-9]{2}:[0-9]{2})?)$/.exec(timestamp);
            if (!result) {
                throw new TypeError("timestamp string not recognized");
            }
            var ts, offset = 0;
            ts = Date.UTC(Number(result[1]), Number(result[2]) - 1, Number(result[3]), Number(result[4]), Number(result[5]), Number(result[6]), 0);
            if (result[8] && result[8] != "Z") {
                result = /^([-+]?[0-9]{2}):([0-9]{2})$/.exec(result[8]);
                if (result) {
                    offset += Number(result[1]) * 3600000;
                    offset += Number(result[2]) * 60000;
                }
            }
            return new Date(ts - offset);
        },
        generateTimestamp: function (ts, legacy) {
            var padFN = function (val, amt) {
                var result = "";
                if (amt > 1) {
                    result = arguments.callee(parseInt(val / 10), amt - 1);
                }
                return result + String(parseInt(val % 10));
            };
            if (!(ts && ts instanceof Date)) {
                throw new TypeError("Expected Date object");
            }
            var date = [padFN(ts.getUTCFullYear(), 4), padFN(ts.getUTCMonth() + 1, 2), padFN(ts.getUTCDate(), 2)];
            var time = [padFN(ts.getUTCHours(), 2), padFN(ts.getUTCMinutes(), 2), padFN(ts.getUTCSeconds(), 2)];
            if (legacy) {
                return date.join("") + "T" + time.join(":");
            } else {
                return date.join("-") + "T" + time.join(":") + "Z";
            }
        },
        _init: function () {
            this._inited = true;
            if (typeof jabberwerx_config != 'undefined') {
                for (var name in jabberwerx_config) {
                    var val = jabberwerx_config[name];
                    if (jabberwerx.$.isArray(val) && val.concat) {
                        val = val.concat();
                    }
                    this._config[name] = val;
                }
            }
        },
        reset: function () {
            if (this.client) {
                this.client.disconnect();
            }
        },
        reduce: function (obj, fn, value) {
            if (!jabberwerx.$.isFunction(fn)) {
                throw new TypeError("expected function object");
            }
            jabberwerx.$.each(obj, function (idx, item) {
                value = fn(item, value);
                return true;
            });
            return value;
        },
        unique: function (arr) {
            if (!jabberwerx.$.isArray(arr)) {
                return arr;
            }
            var specified = {};
            for (var idx = arr.length - 1; idx >= 0; idx--) {
                var item = arr[idx];
                if (!specified[item]) {
                    specified[item] = true;
                } else {
                    arr.splice(idx, 1);
                }
            }
            return arr;
        },
        isText: function (o) {
            return (o && o.ownerDocument && o.nodeType == 3 && typeof o.nodeName == "string");
        },
        isElement: function (o) {
            return (o && (o.ownerDocument !== undefined) && (o.nodeType == 1) && (typeof o.nodeName == "string"));
        },
        isDocument: function (o) {
            return (o && (o.documentElement !== undefined) && (o.nodeType == 9) && (typeof o.nodeName == "string"));
        },
        client: null,
        _inited: false
    });
    jabberwerx._config.debug = {
        on: true
    };
    jabberwerx.NodeBuilder = function (data) {
        var parent, doc, ns = null;
        if (data instanceof jabberwerx.NodeBuilder) {
            this.parent = parent = arguments[0];
            data = arguments[1];
            doc = parent.document;
            ns = parent.namespaceURI;
        }
        if (jabberwerx.isDocument(data)) {
            doc = data;
            data = doc.documentElement;
            ns = data.namespaceURI || data.getAttribute("xmlns") || ns;
        } else if (jabberwerx.isElement(data)) {
            if (!doc) {
                doc = data.ownerDocument;
            } else if (data.ownerDocument !== doc) {
                data = (doc.importNode) ? doc.importNode(data, true) : data.cloneNode(true);
            }
            if (parent && parent.data) {
                parent.data.appendChild(data);
            }
            if (!doc.documentElement) {
                doc.appendChild(data);
            }
            ns = data.namespaceURI || data.getAttribute("xmlns") || ns;
        } else if (data) {
            if (!doc) {
                doc = this._createDoc();
            }
            var ename, ln, pre;
            ename = this._parseName(data, ns);
            ns = ename.namespaceURI;
            data = this._createElem(doc, ns, ename.localName, ename.prefix);
        } else if (!parent) {
            doc = this._createDoc();
        }
        this.document = doc;
        this.data = data;
        this.namespaceURI = ns;
    };
    jabberwerx.NodeBuilder.prototype = {
        attribute: function (name, val) {
            var ename = this._parseName(name);
            if (ename.prefix && ename.prefix != "xml" && ename.prefix != "xmlns") {
                var xmlns = "xmlns:" + ename.prefix;
                if (!this.data.getAttribute(xmlns)) {
                    this.attribute(xmlns, ename.namespaceURI || "");
                }
            } else if (ename.prefix == "xml") {
                ename.namespaceURI = "http://www.w3.org/XML/1998/namespace";
            } else if (ename.prefix == "xmlns" || ename.localName == "xmlns") {
                ename.namespaceURI = "http://www.w3.org/2000/xmlns/";
            } else if (!ename.prefix && ename.namespaceURI !== null) {
                throw new TypeError("namespaced attributes not supported");
            }
            var doc = this.document;
            var elem = this.data;
            if (typeof (doc.createNode) != "undefined") {
                var attr = doc.createNode(2, ename.qualifiedName, ename.namespaceURI || "");
                attr.value = val || "";
                elem.setAttributeNode(attr);
            } else if (typeof (elem.setAttributeNS) != "undefined") {
                elem.setAttributeNS(ename.namespaceURI || "", ename.qualifiedName, val || "");
            } else {
                throw new TypeError("unsupported platform");
            }
            return this;
        },
        text: function (val) {
            if (!val) {
                return this;
            }
            var txt = this.document.createTextNode(val);
            this.data.appendChild(txt);
            return this;
        },
        element: function (name, attrs) {
            if (!attrs) {
                attrs = {};
            }
            if (typeof (name) != "string") {
                throw new TypeError("name is not a valid expanded name");
            }
            var builder = new jabberwerx.NodeBuilder(this, name);
            for (var key in attrs) {
                if (key == 'xmlns') {
                    continue;
                }
                builder.attribute(key, attrs[key]);
            }
            return builder;
        },
        node: function (n) {
            if (!n) {
                throw new TypeError("node must exist");
            }
            if (jabberwerx.isDocument(n)) {
                n = n.documentElement;
            }
            if (jabberwerx.isElement(n)) {
                return new jabberwerx.NodeBuilder(this, n);
            } else if (jabberwerx.isText(n)) {
                return this.text(n.nodeValue);
            } else {
                throw new TypeError("Node must be an XML node");
            }
            return this;
        },
        xml: function (val) {
            var wrapper = (this.namespaceURI) ? "<wrapper xmlns='" + this.namespaceURI + "'>" : "<wrapper>";
            wrapper += val + "</wrapper>";
            var parsed = this._parseXML(wrapper);
            var that = this;
            jabberwerx.$(parsed).contents().each(function () {
                if (jabberwerx.isElement(this)) {
                    new jabberwerx.NodeBuilder(that, this);
                } else if (jabberwerx.isText(this)) {
                    that.text(this.nodeValue);
                }
            });
            return this;
        },
        _parseName: function (name, ns) {
            var ptn = /^(?:\{(.*)\})?(?:([^\s{}:]+):)?([^\s{}:]+)$/;
            var m = name.match(ptn);
            if (!m) {
                throw new TypeError("name '" + name + "' is not a valid ename");
            }
            var retval = {
                namespaceURI: m[1],
                localName: m[3],
                prefix: m[2]
            };
            if (!retval.localName) {
                throw new TypeError("local-name not value");
            }
            retval.qualifiedName = (retval.prefix) ? retval.prefix + ":" + retval.localName : retval.localName;
            if (!retval.namespaceURI) {
                if (name.indexOf("{}") == 0) {
                    retval.namespaceURI = "";
                } else {
                    retval.namespaceURI = ns || null;
                }
            }
            return retval;
        },
        _createDoc: jabberwerx.system.createXMLDocument,
        _parseXML: jabberwerx.system.parseXMLFromString,
        _createElem: function (doc, ns, ln, pre) {
            var parent = this.parent;
            var elem;
            var qn = pre ? (pre + ":" + ln) : ln;
            var declare = true;
            if (parent && parent.data) {
                if (parent.namespaceURI == ns || ns == null || ns == undefined) {
                    declare = false;
                }
            } else {
                declare = (ns != null && ns != undefined);
            }
            if (typeof (doc.createNode) != "undefined") {
                elem = doc.createNode(1, qn, ns || "");
                if (declare) {
                    var decl = doc.createNode(2, (pre ? "xmlns:" + pre : "xmlns"), "http://www.w3.org/2000/xmlns/");
                    decl.value = ns || "";
                    elem.setAttributeNode(decl);
                }
            } else if (typeof (doc.createElementNS) != "undefined") {
                elem = doc.createElementNS(ns || "", qn);
                if (declare) {
                    elem.setAttributeNS("http://www.w3.org/2000/xmlns/", (pre ? "xmlns:" + pre : "xmlns"), ns || "");
                }
            } else {
                throw Error("unsupported platform");
            }
            if (!doc.documentElement) {
                doc.appendChild(elem);
            } else if (parent && parent.data) {
                parent.data.appendChild(elem);
            }
            return elem;
        }
    };
    jabberwerx.xhtmlim = {};
    jabberwerx.xhtmlim.allowedStyles = ["background-color", "color", "font-family", "font-size", "font-style", "font-weight", "margin-left", "margin-right", "text-align", "text-decoration"];
    jabberwerx.xhtmlim.allowedTags = {
        br: [],
        em: [],
        strong: [],
        a: ["style", "href", "type"],
        blockquote: ["style"],
        cite: ["style"],
        img: ["style", "alt", "height", "src", "width"],
        li: ["style"],
        ol: ["style"],
        p: ["style"],
        span: ["style"],
        ul: ["style"],
        body: ["style", "xmlns", "xml:lang"]
    }
    jabberwerx.xhtmlim.sanitize = function (xhtmlNode) {
        var filterNodes = function (fNode) {
            var myKids = fNode.children();
            var fDOM = fNode.get(0);
            if (jabberwerx.xhtmlim.allowedTags[fDOM.nodeName] === undefined) {
                fNode.replaceWith(fDOM.childNodes);
                fNode.remove();
            } else {
                var i = 0;
                while (i < fDOM.attributes.length) {
                    var aName = fDOM.attributes[i].nodeName;
                    if (jabberwerx.$.inArray(aName, jabberwerx.xhtmlim.allowedTags[fDOM.nodeName]) == -1) {
                        fNode.removeAttr(aName);
                    } else {
                        if (aName == "href" || aName == "src") {
                            var aValue = fDOM.attributes[i].nodeValue;
                            if (aValue.indexOf("javascript:") == 0) {
                                fNode.replaceWith(fDOM.childNodes);
                                fNode.remove();
                            }
                        } else if (aName == "style") {
                            var rProps = jabberwerx.$.map(fDOM.attributes[i].value.split(';'), function (oneStyle, idx) {
                                return jabberwerx.$.inArray(oneStyle.split(':')[0], jabberwerx.xhtmlim.allowedStyles) != -1 ? oneStyle : null;
                            });
                            fNode.attr("style", rProps.join(';'));
                        }
                        ++i;
                    }
                }
            }
            for (var i = 0; i < myKids.length; ++i) {
                if (jabberwerx.isElement(myKids[i])) {
                    filterNodes(jabberwerx.$(myKids[i]));
                }
            }
        }
        if (!jabberwerx.isElement(xhtmlNode)) {
            throw new TypeError("xhtmlNode must be a DOM");
        }
        if (jabberwerx.xhtmlim.allowedTags[xhtmlNode.nodeName] === undefined) {
            throw new TypeError("xhtmlNode must be an allowed tag")
        }
        filterNodes(jabberwerx.$(xhtmlNode));
        return xhtmlNode;
    }
    jabberwerx._init();
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/jwapp/JWCore.js*/
;
(function (jabberwerx) {
    jabberwerx.util = {};
    var initializing = false;
    jabberwerx.JWBase = function () { };
    jabberwerx.JWBase.prototype.init = function () { };
    jabberwerx.JWBase.prototype.destroy = function () {
        return null;
    };
    jabberwerx.JWBase.prototype.getClassName = function () {
        return this._className || '';
    };
    jabberwerx.JWBase.prototype.toString = function () {
        return '[' + this.getClassName() + ']';
    };
    jabberwerx.JWBase.prototype.shouldBeSavedWithGraph = function () {
        return false;
    };
    jabberwerx.JWBase.prototype.shouldBeSerializedInline = function () {
        return false;
    };
    jabberwerx.JWBase.prototype.willBeSerialized = function () { };
    jabberwerx.JWBase.prototype.wasUnserialized = function () {
        jabberwerx.$.each(this._observerInfo, function (eventName, info) {
            info.observers = jabberwerx.$.grep(info.observers, function (observer, i) {
                return typeof observer.target != 'undefined';
            });
        });
    };
    jabberwerx.JWBase.prototype.graphUnserialized = function () { }
    jabberwerx.JWBase.prototype.invocation = function (methodName, boundArguments) {
        return jabberwerx.util.generateInvocation(this, methodName, boundArguments);
    };
    var __jwa__createOverrideChain = function (base, override) {
        if (base !== undefined && override === undefined) {
            return base;
        }
        if (!jabberwerx.$.isFunction(base) || !jabberwerx.$.isFunction(override)) {
            return override;
        }
        return function () {
            var tmp = this._super;
            this._super = base;
            var retval = override.apply(this, arguments);
            this._super = tmp;
            return retval;
        };
    };
    jabberwerx.JWBase.mixin = function (prop) {
        prop = jabberwerx.$.extend(true, {}, prop);
        for (var name in prop) {
            this.prototype[name] = __jwa__createOverrideChain(prop[name], this.prototype[name]);
        }
    };
    jabberwerx.JWBase.intercept = function (prop) {
        prop = jabberwerx.$.extend(true, {}, prop);
        for (var name in prop) {
            this.prototype[name] = __jwa__createOverrideChain(this.prototype[name], prop[name]);
        }
    };
    jabberwerx.JWBase.extend = function (prop, className) {
        var _super = this.prototype;
        initializing = true;
        var prototype = new this();
        initializing = false;
        for (var name in prop) {
            prototype[name] = __jwa__createOverrideChain(_super[name], prop[name]);
        };
        var _superClass = jabberwerx.$.extend({}, this);

        function JWBase() {
            if (!initializing) {
                if (arguments.length == 2 && typeof arguments[0] == 'string' && arguments[0] == '__jw_rehydrate__') {
                    var obj = arguments[1];
                    for (var p in obj) {
                        this[p] = obj[p];
                    }
                } else {
                    this._guid = jabberwerx.util.newObjectGUID(className || "");
                    this._jwobj_ = true;
                    this._className = (typeof className == 'undefined' ? null : className);
                    this._observerInfo = {};
                    for (var p in this) {
                        if (typeof this[p] != 'function') {
                            this[p] = jabberwerx.util.clone(this[p]);
                        }
                    }
                    if (this.init) {
                        this.init.apply(this, arguments);
                    }
                }
            }
        };
        for (var name in _superClass) {
            JWBase[name] = _superClass[name];
        }
        JWBase.prototype = prototype;
        prototype.constructor = JWBase;
        return JWBase;
    };
    jabberwerx.util.Error = function (message) {
        this.message = message;
    };
    jabberwerx.util.Error.prototype = new jabberwerx.util.Error();
    jabberwerx.util.Error.extend = function (message, extension) {
        var f = function (message, extension) {
            this.message = message || this.message;
            for (var p in extension) {
                this[p] = extension[p];
            }
        };
        f.prototype = new this(message);
        for (var p in extension) {
            f.prototype[p] = extension[p];
        }
        return f;
    }
    jabberwerx.util.NotSupportedError = jabberwerx.util.Error.extend("This operation is not supported");
    jabberwerx.util._invocations = {};
    jabberwerx.util.generateInvocation = function (object, methodName, boundArguments) {
        var objectTag = '_global_';
        if (jabberwerx.util.isJWObjRef(object)) {
            objectTag = object._guid;
        }
        var f = jabberwerx.util._invocations[objectTag + '.' + methodName]
        if (typeof f != 'undefined') {
            return f;
        }
        if (typeof boundArguments != 'undefined') {
            if (typeof boundArguments != 'object' || !(boundArguments instanceof Array)) {
                boundArguments = [boundArguments];
            }
        } else {
            boundArguments = [];
        }
        var f = function () {
            return jabberwerx.util.invoke.apply(arguments.callee, [arguments.callee].concat(boundArguments, Array.prototype.slice.call(arguments)));
        };
        f.object = object;
        f.methodName = methodName;
        f._jwinvocation_ = true;
        jabberwerx.util._invocations[objectTag + '.' + methodName] = f;
        return f;
    };
    jabberwerx.util.invoke = function () {
        var invocation = arguments[0];
        var args = Array.prototype.slice.call(arguments, 1);
        if (typeof invocation.object == 'undefined' || !invocation.object) {
            return window[invocation.methodName].apply(window, args);
        } else {
            return invocation.object[invocation.methodName].apply(invocation.object, args);
        }
    };
    jabberwerx.util.eventNames = ['jw_valueChanged', 'jw_collectionChanged',];
    jabberwerx.util.registerEventName = function (name) {
        if (jabberwerx.util.eventNames.indexOf(name) == -1) {
            jabberwerx.util.eventNames.push(name);
        } else {
            throw new jabberwerx.util.EventNameAlreadyRegisteredError('JW event name ' + name + ' already registered!');
        }
    };
    jabberwerx.util.EventNameAlreadyRegisteredError = jabberwerx.util.Error.extend('That event name is already registered!');
    jabberwerx.util._objectUIDCounter = 0;
    jabberwerx.util.newObjectGUID = function (className) {
        jabberwerx.util._objectUIDCounter = (jabberwerx.util._objectUIDCounter + 1 == Number.MAX_VALUE) ? 0 : jabberwerx.util._objectUIDCounter + 1;
        return '_jwobj_' + className.replace(/\./g, "_") + '_' + (new Date().valueOf() + jabberwerx.util._objectUIDCounter).toString();
    };
    jabberwerx.util._escapeString = function (str) {
        return ('"' + str.replace(/(["\\])/g, '\\$1') + '"').replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r");
    };
    jabberwerx.util.isString = function (it) {
        return !!arguments.length && it != null && (typeof it == "string" || it instanceof String);
    };
    jabberwerx.util.isArray = function (it) {
        return it && (it instanceof Array || typeof it == "array");
    };
    jabberwerx.util._getParts = function (arr, obj, cb) {
        return [jabberwerx.util.isString(arr) ? arr.split("") : arr, obj || window, jabberwerx.util.isString(cb) ? new Function("item", "index", "array", cb) : cb];
    };
    jabberwerx.util.map = function (arr, callback, thisObject) {
        var _p = jabberwerx.util._getParts(arr, thisObject, callback);
        arr = _p[0];
        var outArr = (arguments[3] ? (new arguments[3]()) : []);
        for (var i = 0; i < arr.length; ++i) {
            outArr.push(_p[2].call(_p[1], arr[i], i, arr));
        }
        return outArr;
    };
    jabberwerx.util.isJWObjGUID = function (ref) {
        return (typeof ref == 'string' && (ref.indexOf('_jwobj_') == 0 || ref.indexOf('"_jwobj_') == 0));
    }
    jabberwerx.util.isJWObjRef = function (ref) {
        return (ref && typeof ref == 'object' && typeof ref._jwobj_ == 'boolean' && ref._jwobj_);
    }
    jabberwerx.util.isJWInvocation = function (ref) {
        return (ref && (typeof ref._jwinvocation_ != 'undefined'));
    };
    jabberwerx.util.clone = function (arg) {
        if (typeof arg == 'object' && arg != null) {
            if (arg instanceof Array) {
                var copy = [];
                for (var i = 0; i < arg.length; i++) {
                    copy.push(jabberwerx.util.clone(arg[i]));
                }
            }
            if (typeof copy == 'undefined') {
                var copy = {};
            }
            for (var p in arg) {
                copy[p] = jabberwerx.util.clone(arg[p]);
            }
            if (typeof arg.prototype != 'undefined') {
                copy.prototype = arg.prototype;
            }
        } else {
            var copy = arg;
        }
        return copy;
    };
    jabberwerx.util.slugify = function (string, separator) {
        return string.toLowerCase().replace('-', separator).replace(/[^%a-z0-9 _-]/g, '').replace(/\s+/g, (typeof separator != 'undefined' ? separator : '-'));
    };
    jabberwerx.util.encodeSerialization = function (s) {
        if (s) {
            return jabberwerx.util.crypto.b64Encode(jabberwerx.util.crypto.utf8Encode(s));
        }
        return '';
    }
    jabberwerx.util.decodeSerialization = function (s) {
        if (s) {
            return jabberwerx.util.crypto.utf8Decode(jabberwerx.util.crypto.b64Decode(s));
        }
        return '';
    }
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (elt) {
            var len = this.length;
            var from = Number(arguments[1]) || 0;
            from = (from < 0) ? Math.ceil(from) : Math.floor(from);
            if (from < 0)
                from += len;
            for (; from < len; from++) {
                if (from in this && this[from] === elt) return from;
            }
            return -1;
        };
    }
    jabberwerx.util.unserializeXMLDoc = function (s, wrap) {
        if (!s && !wrap) {
            return null;
        }
        if (typeof wrap == 'string') {
            s = '<' + wrap + '>' + s + '</' + wrap + '>';
        }
        var builder = new jabberwerx.NodeBuilder("nbwrapper");
        builder.xml(s);
        var unwrapped = builder.data.childNodes[0];
        builder.data.removeChild(unwrapped);
        builder.document.removeChild(builder.data);
        builder.document.appendChild(unwrapped);
        return builder.document;
    };
    jabberwerx.util.unserializeXML = function (s, wrap) {
        var d = jabberwerx.util.unserializeXMLDoc(s, wrap);
        return (d ? d.documentElement : d);
    };
    jabberwerx.util.serializeXML = function (n) {
        try {
            if (n.hasOwnProperty("xml")) {
                return n.xml;
            } else if (n.getXml) {
                return n.getXml();
            } else {
                return jabberwerx.system.serializeXMLToString(n);
            }
        } catch (e) {
            return n.xml || null;
        }
    };
    jabberwerx.util.debug = {
        consoleDelegate: null,
        console: jabberwerx.system.getConsole() || null
    }
    jabberwerx.$.each(['log', 'dir', 'warn', 'error', 'info', 'debug'], function (i, e) {
        jabberwerx.util.debug[e] = function (a, streamName) {
            if (!jabberwerx._config.debug.on || (jabberwerx.util.isString(streamName) && !jabberwerx._config.debug[streamName])) {
                return;
            }
            if (jabberwerx.util.isString(streamName)) {
                a = '[' + streamName + '] ' + a;
            }
            try {
                jabberwerx.util.debug.console[e](a);
            } catch (ex) { }
            if (jabberwerx.util.debug.consoleDelegate) {
                jabberwerx.util.debug.consoleDelegate[e](a);
            }
        }
    });
    jabberwerx.util.setDebugStream = function (streamName, value) {
        jabberwerx._config.debug[streamName] = (typeof value == 'undefined' ? true : value);
    };
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/jwapp/JWPersist.js*/
;
(function (jabberwerx) {
    jabberwerx.util.config = {
        maxGraphAge: 30
    };
    var __MULTI_KEY_STORE = "_jw_store_.",
        __MULTI_KEY_TIMESTAMP = "_jw_store_timestamp_.",
        __MULTI_KEY_INDEX = "_jw_store_keys_.",
        __JW_STORE = "_jw_store_",
        __JW_STORE_TIMESTAMP = "_jw_store_timestamp_";

    function __remove(key) {
        if (!jabberwerx.$.jStore || !jabberwerx.$.jStore.isReady || !jabberwerx.$.jStore.CurrentEngine.isReady) {
            throw new jabberwerx.util.JWStorageRequiresjQueryjStoreError();
        }
        try {
            jabberwerx.$.jStore.remove(__MULTI_KEY_STORE + key);
            jabberwerx.$.jStore.remove(__MULTI_KEY_TIMESTAMP + key);
            jabberwerx.$.jStore.remove(__MULTI_KEY_INDEX + key);
            jabberwerx.$.jStore.remove(__JW_STORE + key);
            jabberwerx.$.jStore.remove(__JW_STORE_TIMESTAMP + key);
        } catch (e) {
            jabberwerx.util.debug.warn("jStore exception (" + e.message + ") trying to remove " + key);
        }
    };

    function __timestamp(key, value) {
        if (!jabberwerx.$.jStore || !jabberwerx.$.jStore.isReady || !jabberwerx.$.jStore.CurrentEngine.isReady) {
            throw new jabberwerx.util.JWStorageRequiresjQueryjStoreError();
        }
        if (value !== undefined) {
            jabberwerx.$.jStore.store(__JW_STORE_TIMESTAMP + key, value);
        } else {
            value = jabberwerx.$.jStore.store(__JW_STORE_TIMESTAMP + key);
            if (!value) {
                value = jabberwerx.$.jStore.store(__MULTI_KEY_TIMESTAMP + key);
            }
        }
        return value;
    };

    function __store(key, value) {
        if (!jabberwerx.$.jStore || !jabberwerx.$.jStore.isReady || !jabberwerx.$.jStore.CurrentEngine.isReady) {
            throw new jabberwerx.util.JWStorageRequiresjQueryjStoreError();
        }
        var keystr = __JW_STORE + key;
        if (value !== undefined) {
            try {
                value = jabberwerx.util.serialize(value);
                value = __escapeJSON(value);
                jabberwerx.$.jStore.store(keystr, value);
                __timestamp(key, new Date().getTime());
            } catch (e) {
                jabberwerx.util.debug.warn("jStore exception (" + e.message + ") trying to write " + keystr);
            }
        } else {
            try {
                value = jabberwerx.$.jStore.store(keystr);
            } catch (e) {
                jabberwerx.util.debug.warn("jStore exception (" + e.message + ") trying to read " + keystr);
                value = null;
            }
            if (value) {
                if (jabberwerx.util.isString(value)) {
                    try {
                        value = __unescapeJSON(value);
                        value = eval("(" + value + ")");
                    } catch (e) {
                        jabberwerx.util.debug.warn("Could not evaluate json string returned from storage:" + e);
                        value = null;
                    }
                } else {
                    jabberwerx.util.debug.warn("Non string returned from storage");
                    value = null;
                }
            } else {
                keystr = __MULTI_KEY_INDEX + key;
                value = jabberwerx.$.jStore.store(keystr);
                if (value) {
                    if (!jabberwerx.$.isPlainObject(value)) {
                        jabberwerx.util.debug.warn("Unknown object type returned from storage");
                        value = null;
                    }
                    for (var onekey in value) {
                        value[onekey] = jabberwerx.$.jStore.store(__MULTI_KEY_STORE + onekey);
                        __remove(onekey);
                        value[onekey] = eval('(' + value[onekey] + ')');
                    }
                } else {
                    value = null;
                }
            }
            __remove(key);
        }
        return value;
    };

    function __jsonPrep(treeRoot) {
        var registry = {};

        function fixupRef(ref) {
            if (jabberwerx.util.isJWObjRef(ref)) {
                if (ref.shouldBeSavedWithGraph && !ref.shouldBeSavedWithGraph()) {
                    return undefined;
                }
                if (!ref._className) {
                    return undefined;
                }
                if (!ref.shouldBeSerializedInline || !ref.shouldBeSerializedInline()) {
                    if (registry[ref._guid] === undefined) {
                        registry[ref._guid] = ref;
                        ref.willBeSerialized && ref.willBeSerialized();
                        fixupTree(ref);
                    }
                    return ref._guid;
                } else {
                    ref.willBeSerialized && ref.willBeSerialized();
                    return ref;
                }
            }
            if (jabberwerx.util.isJWInvocation(ref)) {
                return {
                    object: ref.object._guid,
                    methodName: ref.methodName,
                    _jwinvocation_: true
                };
            }
            return ref;
        };

        function fixupTree(root) {
            var recurse = arguments.callee;
            if (jabberwerx.util.isJWObjRef(root) || jabberwerx.$.isPlainObject(root)) {
                for (var p in root) {
                    if (root.hasOwnProperty(p)) {
                        root[p] = fixupRef(root[p]);
                        recurse(root[p]);
                    }
                }
            } else if (jabberwerx.$.isArray(root)) {
                for (var i = 0; i < root.length; ++i) {
                    root[i] = fixupRef(root[i]);
                    recurse(root[i]);
                }
            }
        };
        fixupTree(treeRoot);
        treeRoot = fixupRef(treeRoot);
        return registry;
    };
    var __escapeJSON = function (json) {
        return "JWA-" + json;
    };
    var __unescapeJSON = function (json) {
        return json.slice(4);
    };
    jabberwerx.util._markGraph = function (tag, root) {
        if (jabberwerx.util._graphRegistry) {
            if (root && (!root.shouldBeSerializedInline || !root.shouldBeSerializedInline())) {
                jabberwerx.util._graphRegistry[tag] = {
                    timestamp: new Date(),
                    value: root,
                    graph: jabberwerx.util.findReachableGUIDs(root)
                };
            } else {
                delete jabberwerx.util._graphRegistry[tag];
            }
        }
    };
    jabberwerx.util.serialize = function (it, prettyPrint, _indentStr) {
        var f = function (it, prettyPrint, _indentStr) {
            if (it === undefined) {
                return "undefined";
            }
            var objtype = typeof it;
            if (objtype == "number" || objtype == "boolean") {
                return it + "";
            }
            if (it === null) {
                return "null";
            }
            if (jabberwerx.util.isString(it)) {
                return jabberwerx.util._escapeString(it);
            }
            if ((typeof it.nodeType == 'number') && (typeof it.cloneNode == 'function')) {
                return '{}';
            }
            var recurse = arguments.callee;
            var newObj;
            _indentStr = _indentStr || "";
            var nextIndent = prettyPrint ? _indentStr + "\t" : "";
            if (typeof it.__json__ == "function") {
                newObj = it.__json__();
                if (it !== newObj) {
                    return recurse(newObj, prettyPrint, nextIndent);
                }
            }
            if (typeof it.json == "function") {
                newObj = it.json();
                if (it !== newObj) {
                    return recurse(newObj, prettyPrint, nextIndent);
                }
            }
            var sep = prettyPrint ? " " : "";
            var newLine = prettyPrint ? "\n" : "";
            var val;
            if (jabberwerx.util.isArray(it)) {
                var res = jabberwerx.util.map(it, function (obj) {
                    val = recurse(obj, prettyPrint, nextIndent);
                    if (typeof val != "string") {
                        val = "undefined";
                    }
                    return newLine + nextIndent + val;
                });
                return "[" + res.join("," + sep) + newLine + _indentStr + "]";
            }
            if (objtype == "function") {
                return null;
            }
            var output = [];
            if (!('responseText' in it) && !('responseXML' in it)) {
                try {
                    for (var key in it) {
                        break;
                    }
                } catch (e) {
                    return "null";
                }
                for (var key in it) {
                    if (it[key] === undefined) {
                        continue;
                    }
                    var keyStr;
                    if (typeof key == "number") {
                        keyStr = '"' + key + '"';
                    } else if (typeof key == "string") {
                        keyStr = jabberwerx.util._escapeString(key);
                    } else {
                        continue;
                    }
                    val = recurse(it[key], prettyPrint, nextIndent);
                    if (typeof val != "string") {
                        continue;
                    }
                    output.push(newLine + nextIndent + keyStr + ":" + sep + val);
                }
            }
            return "{" + output.join("," + sep) + newLine + _indentStr + "}";
        };
        return f(it, prettyPrint, _indentStr);
    }
    jabberwerx.util.findReachableGUIDs = function (start) {
        var traversedGUIDs = {};
        (function f(root, depth) {
            if (typeof root == 'object' && root != null) {
                var s = '';
                for (var p = 0; p < depth; p++) {
                    s += '   ';
                }
                if (jabberwerx.util.isArray(root)) {
                    for (var i = 0; i < root.length; i++) {
                        if (root[i]) {
                            f(root[i], depth + 1);
                        }
                    }
                } else if (jabberwerx.util.isJWObjRef(root)) {
                    if (traversedGUIDs[root._guid] === undefined) {
                        traversedGUIDs[root._guid] = root;
                        for (var p in root) {
                            if (root[p]) {
                                f(root[p], depth + 1);
                            }
                        }
                    }
                } else if (root.constructor == Object) {
                    for (var p in root) {
                        try {
                            if (root[p] && typeof root[p] == 'object') {
                                f(root[p], depth + 1);
                            }
                        } catch (e) {
                            jabberwerx.util.debug.log('Exception throw while searching for reachable GUIDs: ' +
                                ' Property: ' + p +
                                ' Exception: ' + e.message);
                        }
                    }
                }
            }
        })(start, 0);
        return traversedGUIDs;
    };
    jabberwerx.util.saveGraph = function (root, tag, callback) {
        try {
            var objRefs = __jsonPrep(root);
            objRefs[tag] = root;
            var serializedRoot = __store(tag, objRefs);
            var serialized = {};
            serialized[tag] = '{"reference":' + serializedRoot + ',"timestamp":' + __timestamp(tag) + '}';
            if (callback) {
                callback(serialized);
            }
            return serialized;
        } catch (e) {
            jabberwerx.util.debug.warn("Could not store '" + tag + "'(" + e.message + ")");
            throw (e);
        }
    };
    jabberwerx.util.loadGraph = function (tag) {
        var tagStore = {};
        var knitter;
        var __creator = function (base) {
            return eval('new ' + base._className + '("__jw_rehydrate__", base)');
        }
        knitter = function (arg, registry) {
            if (!arg) {
                return arg;
            }
            switch (typeof arg) {
                case 'string':
                    if (jabberwerx.util.isJWObjGUID(arg)) {
                        if (registry[arg] === undefined) {
                            jabberwerx.util.debug.warn("Unrecognized GUID: " + arg, 'persistence');
                        }
                        return knitter(registry[arg], registry);
                    }
                    break;
                case 'object':
                    if (jabberwerx.util.isJWInvocation(arg)) {
                        var typeObject = knitter(arg.object, registry);
                        if (!typeObject) {
                            return null;
                        }
                        return jabberwerx.util.generateInvocation(typeObject, arg.methodName);
                    }
                    if (jabberwerx.util.isJWObjRef(arg)) {
                        if (arg.__knitted) {
                            return arg;
                        }
                        if (registry[arg._guid] === undefined) {
                            arg = __creator(arg);
                        } else { }
                        arg.__knitted = true;
                    }
                    for (var key in arg) {
                        if (key != '_guid') {
                            arg[key] = knitter(arg[key], registry);
                        }
                    }
                    break;
                case 'array':
                    for (var i in arg) {
                        arg[i] = knitter(arg[i], registry);
                    }
                    break;
            }
            return arg;
        };
        tagStore = null;
        var ts = jabberwerx.util.getLoadedGraphAge(tag);
        if (ts && (ts.getTime() < jabberwerx.util.getMaxGraphAge() * 1000)) {
            tagStore = __store(tag);
        }
        if (!tagStore) {
            __remove(tag);
            return null;
        }
        try {
            var root = null;
            if (!jabberwerx.util.isJWObjRef(tagStore[tag])) {
                root = tagStore[tag];
                delete tagStore[tag];
            }
            for (var p in tagStore) {
                if (tagStore.hasOwnProperty(p)) {
                    tagStore[p] = __creator(tagStore[p]);
                }
            }
            if (!root) {
                root = tagStore[tag];
            }
            root = knitter(root, tagStore);
            for (var guid in tagStore) {
                tagStore[guid].wasUnserialized && tagStore[guid].wasUnserialized();
            }
            for (var guid in tagStore) {
                delete tagStore[guid].__knitted;
                tagStore[guid].graphUnserialized && tagStore[guid].graphUnserialized();
            }
            return root;
        } catch (e) {
            jabberwerx.util.debug.warn('Could not load ' + tag + " ( " + e + ")");
            throw (e);
        }
    };
    jabberwerx.util.isGraphSaved = function (tag) {
        return __timestamp(tag) != null;
    };
    jabberwerx.util.clearGraph = function (tag) {
        __remove(tag);
    };
    jabberwerx.util.getLoadedGraphTimestamp = function (tag) {
        if (tag) {
            var ts = __timestamp(tag);
            if (ts) {
                var rd = new Date();
                rd.setTime(ts);
                return rd;
            }
        }
        return null;
    };
    jabberwerx.util.getLoadedGraphAge = function (tag) {
        var t = jabberwerx.util.getLoadedGraphTimestamp(tag);
        if (t) {
            return new Date(new Date().getTime() - t.getTime());
        }
        return null;
    };
    jabberwerx.util.getMaxGraphAge = function () {
        if (typeof (jabberwerx._config.persistDuration) != "number") {
            jabberwerx._config.persistDuration = parseInt(jabberwerx._config.persistDuration);
        }
        return jabberwerx._config.persistDuration;
    }
    jabberwerx.util.setMaxGraphAge = function (age) {
        if (age && typeof age == "number" && age > 0) {
            jabberwerx._config.persistDuration = age;
        }
        return jabberwerx.util.getMaxGraphAge();
    }
    jabberwerx.util.JWStorageRequiresjQueryjStoreError = jabberwerx.util.Error.extend('JW storage features require jQuery-jStore.');
    jabberwerx.util._graphRegistry = null;
    jabberwerx.$.jStore && jabberwerx.$(document).ready(function () {
        jabberwerx.$.jStore.EngineOrder = jabberwerx._config.engineOrder ? jabberwerx._config.engineOrder : ['local', 'html5', 'gears', 'ie'];
        jabberwerx.$.jStore.ready(function (engine) {
            jabberwerx.util.debug.log("jStore ready(" + engine.type + ")", "persistence");
            engine.ready(function () {
                jabberwerx.util.debug.log("jStore engine ready: " + engine.type, "persistence");
            });
        });
        if (!jabberwerx.$.jStore.isReady) {
            jabberwerx.$.jStore.load();
        }
        return true;
    });
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/jwapp/JWModel.js*/
;
(function (jabberwerx) {
    jabberwerx.JWModel = jabberwerx.JWBase.extend({
        init: function () { },
        shouldBeSavedWithGraph: function () {
            return true;
        }
    }, 'JWModel');
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/jwapp/JWApp.js*/
;
(function (jabberwerx) {
    var _jwappinst = null;
    var _jwappclass = "";
    jabberwerx.JWApp = jabberwerx.JWBase.extend({
        init: function () {
            this._super();
            this.appCreate();
        },
        shouldBeSavedWithGraph: function () {
            return true;
        },
        appCreate: function () { },
        appInitialize: function () { }
    }, "JWApp");
    jabberwerx.util.persistedApplicationClass = function (appClass) {
        if (!appClass) {
            return _jwappclass;
        }
        _jwappclass = appClass;
        _jwappinst = null;
        jabberwerx.$(document).bind("ready", function () {
            jabberwerx.$.jStore.ready(function (engine) {
                engine.ready(function () {
                    _jwappinst = jabberwerx.util.loadApp();
                });
            });
            return true;
        });
        jabberwerx.$(window).bind("unload", function () {
            try {
                jabberwerx.util.saveApp();
            } catch (e) {
                jabberwerx.util.debug.log('Exception persisting application: ' + e.message);
            }
            _jwappinst = null;
        });
        return appClass;
    }
    jabberwerx.util.persistedApplicationInstance = function () {
        return _jwappinst;
    }
    jabberwerx.util.loadApp = function (className) {
        var appInst = null;
        var cn = className;
        if (!cn) {
            cn = _jwappclass;
        }
        if (cn) {
            appInst = jabberwerx.util.loadGraph(cn);
            if (!appInst) {
                eval('appInst = new ' + cn + '()');
            }
            appInst.appInitialize();
        }
        return appInst;
    };
    jabberwerx.util.saveApp = function (appInst) {
        var ai = appInst;
        if (!ai) {
            ai = _jwappinst;
        }
        if (ai) {
            jabberwerx.util.saveGraph(ai, ai.getClassName());
            if (!appInst) {
                _jwappinst = null;
            }
        }
    };
    _jwappclass = '';
    _jwappinst = null;
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/util/crypt.js*/
;
(function (jabberwerx) {
    jabberwerx.util.crypto = {};
    jabberwerx.util.crypto.b64Encode = function (input) {
        var table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var output = "";
        for (var idx = 0; idx < input.length; idx += 3) {
            var data = input.charCodeAt(idx) << 16 | input.charCodeAt(idx + 1) << 8 | input.charCodeAt(idx + 2);
            output += table.charAt((data >>> 18) & 0x003f) +
                table.charAt((data >>> 12) & 0x003f);
            output += ((idx + 1) < input.length) ? table.charAt((data >>> 6) & 0x003f) : "=";
            output += ((idx + 2) < input.length) ? table.charAt(data & 0x003f) : "=";
        }
        return output;
    };
    jabberwerx.util.crypto.b64Decode = function (input) {
        var table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var output = "";
        for (var idx = 0; idx < input.length; idx += 4) {
            var h = [table.indexOf(input.charAt(idx)), table.indexOf(input.charAt(idx + 1)), table.indexOf(input.charAt(idx + 2)), table.indexOf(input.charAt(idx + 3))];
            var data = (h[0] << 18) | (h[1] << 12) | (h[2] << 6) | h[3];
            if (input.charAt(idx + 2) == '=') {
                data = String.fromCharCode((data >>> 16) & 0x00ff);
            } else if (input.charAt(idx + 3) == '=') {
                data = String.fromCharCode((data >>> 16) & 0x00ff, (data >>> 8) & 0x00ff);
            } else {
                data = String.fromCharCode((data >>> 16) & 0x00ff, (data >>> 8) & 0x00ff, data & 0x00ff);
            }
            output += data;
        }
        return output;
    };
    jabberwerx.util.crypto.utf8Encode = function (input) {
        var output = "";
        var i = -1;
        var x, y;
        while (++i < input.length) {
            x = input.charCodeAt(i);
            y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
            if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
                x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
                i++;
            }
            if (x <= 0x7F)
                output += String.fromCharCode(x);
            else if (x <= 0x7FF)
                output += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F), 0x80 | (x & 0x3F));
            else if (x <= 0xFFFF)
                output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
            else if (x <= 0x1FFFFF)
                output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07), 0x80 | ((x >>> 12) & 0x3F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
        }
        return output;
    }
    jabberwerx.util.crypto.utf8Decode = function (input) {
        var output = "";
        for (idx = 0; idx < input.length; idx++) {
            var c = [input.charCodeAt(idx), input.charCodeAt(idx + 1), input.charCodeAt(idx + 2), input.charCodeAt(idx + 3)];
            var pt;
            if (0x7f >= c[0]) {
                pt = c[0];
            } else if (0xc2 <= c[0] && 0xdf >= c[0] && 0x80 <= c[1] && 0xbf >= c[1]) {
                pt = ((c[0] & 0x001f) << 6) | (c[1] & 0x003f);
                idx += 1;
            } else if (((0xe0 == c[0] && 0xa0 <= c[1] && 0xbf >= c[1]) || (0xe1 <= c[0] && 0xec >= c[0] && 0x80 <= c[1] && 0xbf >= c[1]) || (0xed == c[0] && 0x80 <= c[1] && 0x9f >= c[1]) || (0xee <= c[0] && 0xef >= c[0] && 0x80 <= c[1] && 0xbf >= c[1])) && 0x80 <= c[2] && 0xbf >= c[2]) {
                pt = ((c[0] & 0x000f) << 12) | ((c[1] & 0x003f) << 6) | (c[2] & 0x003f);
                idx += 2;
            } else if (((0xf0 == c[0] && 0x90 <= c[1] && 0xbf >= c[1]) || (0xf1 <= c[0] && 0xf3 >= c[0] && 0x80 <= c[1] && 0xbf >= c[1]) || (0xf4 == c[0] && 0x80 <= c[1] && 0x8f >= c[1]) || (0xf5 <= c[0] && 0xf7 >= c[0] && 0x80 <= c[1] && 0xbf >= c[1])) && 0x80 <= c[2] && 0xbf >= c[2] && 0x80 <= c[3] && 0xbf >= c[3]) {
                pt = ((c[0] & 0x0007) << 18) | ((c[1] & 0x003f) << 12) | ((c[2] & 0x003f) << 6) | (c[3] & 0x003f);
                idx += 3;
            } else {
                throw new Error("invalid UTF-8 at position: " + idx);
            }
            output += String.fromCharCode(pt);
        }
        return output;
    };
    jabberwerx.util.crypto.str2hex = function (input, useUpperCase) {
        var hex_tab = useUpperCase ? "0123456789ABCDEF" : "0123456789abcdef";
        var output = "";
        var x;
        for (var i = 0; i < input.length; i++) {
            x = input.charCodeAt(i);
            output += hex_tab.charAt((x >>> 4) & 0x0F) +
                hex_tab.charAt(x & 0x0F);
        }
        return output;
    }
    jabberwerx.util.crypto.b64_sha1 = function (input) {
        return jabberwerx.util.crypto.b64Encode(jabberwerx.util.crypto.str_sha1(input));
    }
    jabberwerx.util.crypto.str_sha1 = function (input) {
        var rstr2binb = function (input) {
            var output = Array(input.length >> 2);
            for (var i = 0; i < output.length; i++)
                output[i] = 0;
            for (var i = 0; i < input.length * 8; i += 8)
                output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);
            return output;
        }
        var binb2rstr = function (input) {
            var output = "";
            for (var i = 0; i < input.length * 32; i += 8) {
                output += String.fromCharCode((input[i >> 5] >>> (24 - i % 32)) & 0xFF);
            }
            return output;
        }
        var safe_add = function (x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        }
        var bit_rol = function (num, cnt) {
            return (num << cnt) | (num >>> (32 - cnt));
        }
        var sha1_ft = function (t, b, c, d) {
            if (t < 20) return (b & c) | ((~b) & d);
            if (t < 40) return b ^ c ^ d;
            if (t < 60) return (b & c) | (b & d) | (c & d);
            return b ^ c ^ d;
        }
        var sha1_kt = function (t) {
            return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514;
        }
        var binb_sha1 = function (x, len) {
            x[len >> 5] |= 0x80 << (24 - len % 32);
            x[((len + 64 >> 9) << 4) + 15] = len;
            var w = Array(80);
            var a = 1732584193;
            var b = -271733879;
            var c = -1732584194;
            var d = 271733878;
            var e = -1009589776;
            for (var i = 0; i < x.length; i += 16) {
                var olda = a;
                var oldb = b;
                var oldc = c;
                var oldd = d;
                var olde = e;
                for (var j = 0; j < 80; j++) {
                    if (j < 16) {
                        w[j] = x[i + j];
                    } else {
                        w[j] = bit_rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
                    }
                    var t = safe_add(safe_add(bit_rol(a, 5), sha1_ft(j, b, c, d)), safe_add(safe_add(e, w[j]), sha1_kt(j)));
                    e = d;
                    d = c;
                    c = bit_rol(b, 30);
                    b = a;
                    a = t;
                }
                a = safe_add(a, olda);
                b = safe_add(b, oldb);
                c = safe_add(c, oldc);
                d = safe_add(d, oldd);
                e = safe_add(e, olde);
            }
            return Array(a, b, c, d, e);
        }
        return binb2rstr(binb_sha1(rstr2binb(input), input.length * 8));
    }
    jabberwerx.util.crypto.hex_md5 = function (input) {
        return jabberwerx.util.crypto.str2hex(jabberwerx.util.crypto.rstr_md5(input));
    }
    jabberwerx.util.crypto.rstr_md5 = function (input) {
        function md5_cmn(q, a, b, x, s, t) {
            return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
        }

        function md5_ff(a, b, c, d, x, s, t) {
            return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
        }

        function md5_gg(a, b, c, d, x, s, t) {
            return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
        }

        function md5_hh(a, b, c, d, x, s, t) {
            return md5_cmn(b ^ c ^ d, a, b, x, s, t);
        }

        function md5_ii(a, b, c, d, x, s, t) {
            return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
        }
        var safe_add = function (x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        }
        var bit_rol = function (num, cnt) {
            return (num << cnt) | (num >>> (32 - cnt));
        }
        var rstr2binl = function (input) {
            var output = Array(input.length >> 2);
            for (var i = 0; i < output.length; i++) {
                output[i] = 0;
            }
            for (var i = 0; i < input.length * 8; i += 8) {
                output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
            }
            return output;
        }
        var binl2rstr = function (input) {
            var output = "";
            for (var i = 0; i < input.length * 32; i += 8) {
                output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
            }
            return output;
        }
        var binl_md5 = function (x, len) {
            x[len >> 5] |= 0x80 << ((len) % 32);
            x[(((len + 64) >>> 9) << 4) + 14] = len;
            var a = 1732584193;
            var b = -271733879;
            var c = -1732584194;
            var d = 271733878;
            for (var i = 0; i < x.length; i += 16) {
                var olda = a;
                var oldb = b;
                var oldc = c;
                var oldd = d;
                a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
                d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
                c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
                b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
                a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
                d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
                c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
                b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
                a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
                d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
                c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
                b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
                a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
                d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
                c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
                b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
                a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
                d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
                c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
                b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
                a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
                d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
                c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
                b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
                a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
                d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
                c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
                b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
                a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
                d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
                c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
                b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
                a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
                d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
                c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
                b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
                a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
                d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
                c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
                b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
                a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
                d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
                c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
                b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
                a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
                d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
                c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
                b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
                a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
                d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
                c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
                b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
                a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
                d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
                c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
                b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
                a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
                d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
                c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
                b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
                a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
                d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
                c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
                b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
                a = safe_add(a, olda);
                b = safe_add(b, oldb);
                c = safe_add(c, oldc);
                d = safe_add(d, oldd);
            }
            return Array(a, b, c, d);
        }
        return binl2rstr(binl_md5(rstr2binl(input), input.length * 8));
    }
    jabberwerx.util.crypto.generateUUID = function () {
        var parts = [];
        for (var idx = 0; idx < 16; idx++) {
            parts[idx] = Math.floor(Math.random() * 256);
        }
        parts[6] = (parts[6] & 0x0f) | 0x40;
        parts[8] = (parts[8] & 0x3f) | 0x80;
        var result = "";
        for (var idx = 0; idx < parts.length; idx++) {
            var val = parts[idx];
            if (idx == 4 || idx == 6 || idx == 8 || idx == 10) {
                result += "-";
            }
            result += ((val >>> 4) & 0x0f).toString(16);
            result += (val & 0x0f).toString(16);
        }
        return result;
    }
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/model/Rendezvous.js*/
;
(function (jabberwerx) {
    jabberwerx.Rendezvousable = {
        startRendezvous: function (ctx) {
            this._rendezvousCtx = ctx;
            return false;
        },
        finishRendezvous: function () {
            this._rendezvousCtx && this._rendezvousCtx.finish(this);
            delete this._rendezvousCtx;
        },
        rendezvousContext: null
    };
    jabberwerx.Rendezvous = jabberwerx.JWModel.extend({
        init: function (cb) {
            this._super();
            if (!(cb && jabberwerx.$.isFunction(cb))) {
                throw new TypeError("cb must be a function");
            }
            this._callback = cb;
        },
        start: function (rnz) {
            this._ready = true;
            if (jabberwerx.$.inArray(rnz, this._rendezvousers) != -1) {
                return true;
            }
            if (rnz.startRendezvous && rnz.startRendezvous(this)) {
                this._rendezvousers.push(rnz);
                return true;
            }
            return false;
        },
        finish: function (rnz) {
            var pos = rnz ? jabberwerx.$.inArray(rnz, this._rendezvousers) : -1;
            if (pos != -1) {
                this._rendezvousers.splice(pos, 1);
            }
            if (this._ready && !this._rendezvousers.length) {
                this._callback(this);
                this._ready = false;
            }
            return (pos != -1);
        },
        isRunning: function () {
            return this._ready && (this._rendezvousers.length > 0);
        },
        _ready: false,
        _rendezvousers: []
    }, "jabberwerx.Rendezvous");
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/model/SASL.js*/
;
(function (jabberwerx) {
    jabberwerx.SASLMechanism = jabberwerx.JWBase.extend({
        init: function (client, encoded) {
            this._super();
            this.mechanismName = this.constructor.mechanismName;
            this._encoded = Boolean(encoded);
            if (!(client && client instanceof jabberwerx.Client)) {
                throw new TypeError("client must be a jabberwerx.Client");
            }
            this.client = client;
        },
        evaluate: function (input) {
            if (input && !jabberwerx.isElement(input)) {
                throw new TypeError("input must be undefined or an element");
            }
            var output = null;
            var failure = null;
            var data;
            if (!input) {
                if (this.started) {
                    jabberwerx.util.debug.log("SASL mechanism already started!");
                    throw this._handleFailure();
                }
                this.started = true;
                try {
                    data = this.evaluateStart();
                    data = this._encodeData(data);
                    output = new jabberwerx.NodeBuilder("{urn:ietf:params:xml:ns:xmpp-sasl}auth").attribute("mechanism", this.mechanismName).text(data).data;
                } catch (ex) {
                    jabberwerx.util.debug.log("SASL failed to initialize: " + ex);
                    throw this._handleFailure(ex);
                }
            } else {
                if (!this.started) {
                    jabberwerx.util.debug.log("SASL mechanism not yet started!");
                    throw this._handleFailure();
                }
                switch (input.nodeName) {
                    case "success":
                        try {
                            if (!this.complete) {
                                data = jabberwerx.$(input).text();
                                data = this._decodeData(data);
                                data = this.evaluateChallenge(data);
                            }
                        } catch (ex) {
                            jabberwerx.util.debug.log("SASL failed to evaluate success data: " + ex);
                            throw this._handleFailure(ex);
                        }
                        if (data || !this.complete) {
                            jabberwerx.util.debug.log("SASL failed to complete upon <success/>");
                            throw this._handleFailure();
                        }
                        break;
                    case "failure":
                        {
                            var failure = this._handleFailure(jabberwerx.$(input).children().get(0)); jabberwerx.util.debug.log("SASL failure from server: " + failure.message);
                            throw failure;
                        }
                        break;
                    case "challenge":
                        if (this.complete) {
                            jabberwerx.util.debug.log("SASL received challenge after completion!");
                            throw this._handleFailure();
                        }
                        try {
                            data = jabberwerx.$(input).text();
                            data = this._decodeData(data);
                            data = this.evaluateChallenge(data);
                            data = this._encodeData(data);
                            output = new jabberwerx.NodeBuilder("{urn:ietf:params:xml:ns:xmpp-sasl}response").text(data).data;
                        } catch (ex) {
                            jabberwerx.util.debug.log("SASL failed to evaluate challenge data: " + ex);
                            throw this._handleFailure(ex);
                        }
                        break;
                    default:
                        jabberwerx.util.debug.log("unexpected stanza received!");
                        throw this._handleFailure();
                        break;
                }
            }
            return output;
        },
        _decodeData: function (data) {
            if (!data) {
                return "";
            }
            if (!this._encoded) {
                return jabberwerx.util.crypto.utf8Decode(jabberwerx.util.crypto.b64Decode(data));
            }
            return data;
        },
        _encodeData: function (data) {
            if (!data) {
                return "";
            }
            if (!this._encoded) {
                return jabberwerx.util.crypto.b64Encode(jabberwerx.util.crypto.utf8Encode(data));
            }
            return data;
        },
        evaluateStart: function () {
            throw new Error("not implemented!");
        },
        evaluateChallenge: function (inb) {
            throw new Error("not implemented!");
        },
        _handleFailure: function (cond) {
            this.complete = true;
            if (cond instanceof jabberwerx.SASLMechanism.SASLAuthFailure) {
                return cond;
            } else if (jabberwerx.isElement(cond)) {
                var msg = "{urn:ietf:params:xml:ns:xmpp-sasl}" + cond.nodeName;
                return new jabberwerx.SASLMechanism.SASLAuthFailure(msg);
            } else {
                return new jabberwerx.SASLMechanism.SASLAuthFailure();
            }
        },
        getProperties: function () {
            return (this.client && this.client._connectParams) || {};
        },
        client: null,
        mechanismName: "",
        complete: false,
        started: false
    }, "jabberwerx.SASLMechanism");
    jabberwerx.SASLMechanism.SASLAuthFailure = jabberwerx.util.Error.extend("{urn:ietf:params:xml:ns:xmpp-sasl}temporary-auth-failure");
    jabberwerx.SASLMechanism._baseExtend = jabberwerx.SASLMechanism.extend;
    jabberwerx.SASLMechanism.extend = function (props, type, mechname) {
        if (!(mechname && typeof (mechname) == "string")) {
            throw new TypeError("name must be a non-empty string");
        }
        var subtype = jabberwerx.SASLMechanism._baseExtend(props, type);
        subtype.mechanismName = mechname.toUpperCase();
        if (jabberwerx.sasl && jabberwerx.sasl instanceof jabberwerx.SASLMechanismFactory) {
            jabberwerx.sasl.addMechanism(subtype);
        }
        return subtype;
    };
    jabberwerx.SASLMechanismFactory = jabberwerx.JWBase.extend({
        init: function (mechs) {
            this._super();
            if (!mechs) {
                if (jabberwerx._config.enabledMechanisms) {
                    mechs = jabberwerx._config.enabledMechanisms;
                } else {
                    mechs = [];
                }
            }
            this.mechanisms = mechs.concat();
        },
        createMechanismFor: function (client, mechs) {
            if (!jabberwerx.$.isArray(mechs)) {
                throw new TypeError("mechs must be an array of mechanism names");
            }
            if (!(client && client instanceof jabberwerx.Client)) {
                throw new TypeError("client must be an isntance of jabberwerx.Client");
            }
            mechs = mechs.concat();
            for (var idx = 0; idx < mechs.length; idx++) {
                mechs[idx] = String(mechs[idx]).toUpperCase();
            }
            var selected = null;
            for (var idx = 0; !selected && idx < this.mechanisms.length; idx++) {
                var candidate = this._mechsAvail[this.mechanisms[idx]];
                if (!candidate) {
                    continue;
                }
                for (var jdx = 0; !selected && jdx < mechs.length; jdx++) {
                    if (mechs[jdx] != candidate.mechanismName) {
                        continue;
                    }
                    try {
                        selected = new candidate(client);
                    } catch (ex) {
                        jabberwerx.util.debug.log("could not create SASLMechanism for " +
                            candidate.mechanismName + ": " + ex);
                        selected = null;
                    }
                }
            }
            return selected;
        },
        addMechanism: function (type) {
            if (!(jabberwerx.$.isFunction(type) && type.mechanismName)) {
                throw new TypeError("type must be the constructor for a SASLMechanism type");
            }
            this._mechsAvail[type.mechanismName] = type;
        },
        removeMechanism: function (type) {
            if (!(jabberwerx.$.isFunction(type) && type.mechanismName)) {
                throw new TypeError("type must be the constructor for a SASLMechanism type");
            }
            this._mechsAvail[type.mechanismName] = undefined;
            delete this._mechsAvail[type.mechanismName];
        },
        _mechsAvail: {},
        mechanisms: []
    }, "jabberwerx.SASLMechanismFactory");
    if (!(jabberwerx.sasl && jabberwerx.sasl instanceof jabberwerx.SASLMechanismFactory)) {
        jabberwerx.sasl = new jabberwerx.SASLMechanismFactory(jabberwerx._config.enabledMechanisms);
    }
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/model/SASLMechs.js*/
;
(function (jabberwerx) {
    jabberwerx.SASLPlainMechanism = jabberwerx.SASLMechanism.extend({
        init: function (client) {
            this._super(client);
        },
        evaluateStart: function () {
            var params = this.getProperties();
            if (!this.client.isSecure()) {
                throw new jabberwerx.SASLMechanism.SASLAuthFailure("{urn:ietf:params:xml:ns:xmpp-sasl}mechanism-too-weak");
            }
            var nilChar = String.fromCharCode(0);
            var usr = (params && params.jid && params.jid.getNode()) || "";
            var pwd = (params && params.password) || "";
            return nilChar + usr + nilChar + pwd;
        },
        evaluateChallenge: function (inb) {
            if (inb || this.complete) {
                throw new jabberwerx.SASLMechanism.SASLAuthFailure();
            }
            this.complete = true;
        }
    }, "jabberwerx.SASLPlainMechanism", "PLAIN");
    jabberwerx.SASLDigestMd5Mechanism = jabberwerx.SASLMechanism.extend({
        init: function (client) {
            this._super(client);
        },
        evaluateStart: function () {
            this._stage = this._generateResponse;
            return null;
        },
        evaluateChallenge: function (inb) {
            var inprops, outprops;
            if (this.complete && !this._stage) {
                return;
            }
            if (!this._stage) {
                jabberwerx.util.debug.log("DIGEST-MD5 in bad stage");
                throw new jabberwerx.SASLMechanism.SASLAuthFailure();
            }
            inprops = this._decodeProperties(inb);
            outprops = this._stage(inprops);
            return this._encodeProperties(outprops);
        },
        _generateResponse: function (inprops) {
            var params = this.getProperties();
            var user, pass, domain;
            user = (params.jid && params.jid.getNode()) || "";
            domain = (params.jid && params.jid.getDomain()) || "";
            pass = params.password || "";
            var realm = inprops.realm || domain;
            var nonce = inprops.nonce;
            var nc = inprops.nc || "00000001";
            var cnonce = this._cnonce((user + "@" + realm).length);
            var uri = "xmpp/" + domain;
            var qop = "auth";
            var A1;
            A1 = jabberwerx.util.crypto.rstr_md5(jabberwerx.util.crypto.utf8Encode(user + ":" + realm + ":" + pass));
            A1 = A1 + jabberwerx.util.crypto.utf8Encode(":" + nonce + ":" + cnonce);
            var A2;
            A2 = jabberwerx.util.crypto.utf8Encode("AUTHENTICATE:" + uri);
            var rsp = [jabberwerx.util.crypto.str2hex(jabberwerx.util.crypto.rstr_md5(A1)), nonce, nc, cnonce, qop, jabberwerx.util.crypto.str2hex(jabberwerx.util.crypto.rstr_md5(A2))].join(":");
            rsp = jabberwerx.util.crypto.hex_md5(jabberwerx.util.crypto.utf8Encode(rsp));
            var outprops = {
                "charset": "utf-8",
                "digest-uri": uri,
                "cnonce": cnonce,
                "nonce": nonce,
                "nc": nc,
                "qop": qop,
                "username": user,
                "realm": realm,
                "response": rsp
            };
            this._authProps = outprops;
            this._stage = this._verifyRspAuth;
            return outprops;
        },
        _verifyRspAuth: function (inprops) {
            if (inprops) {
                inprops = jabberwerx.$.extend({}, inprops, this._authProps || {});
                var params = this.getProperties();
                var user, pass, domain;
                user = (params.jid && params.jid.getNode()) || "";
                domain = (params.jid && params.jid.getDomain()) || "";
                pass = params.password || "";
                var realm = inprops.realm || domain;
                var nonce = inprops.nonce;
                var nc = inprops.nc || "00000001";
                var cnonce = inprops.cnonce;
                var uri = "xmpp/" + domain;
                var qop = "auth";
                var A1;
                A1 = jabberwerx.util.crypto.rstr_md5(jabberwerx.util.crypto.utf8Encode(user + ":" + realm + ":" + pass));
                A1 = A1 + jabberwerx.util.crypto.utf8Encode(":" + nonce + ":" + cnonce);
                var A2;
                A2 = jabberwerx.util.crypto.utf8Encode(":" + uri);
                var rsp = [jabberwerx.util.crypto.str2hex(jabberwerx.util.crypto.rstr_md5(A1)), nonce, nc, cnonce, qop, jabberwerx.util.crypto.str2hex(jabberwerx.util.crypto.rstr_md5(A2))].join(":");
                rsp = jabberwerx.util.crypto.hex_md5(jabberwerx.util.crypto.utf8Encode(rsp));
                if (rsp != inprops.rspauth) {
                    jabberwerx.util.debug.log("response auth values do not match");
                    throw new jabberwerx.SASLMechanism.SASLAuthFailure();
                }
            }
            this.complete = true;
            this._stage = null;
        },
        _decodeProperties: function (str) {
            var ptn = /([^"()<>\{\}\[\]@,;:\\\/?= \t]+)=(?:([^"()<>\{\}\[\]@,;:\\\/?= \t]+)|(?:"([^"]+)"))/g;
            var props = {};
            var field;
            if (!str) {
                str = "";
            }
            while (field = ptn.exec(str)) {
                props[field[1]] = field[2] || field[3] || "";
            }
            return props;
        },
        _encodeProperties: function (props) {
            var quoted = {
                "username": true,
                "realm": true,
                "nonce": true,
                "cnonce": true,
                "digest-uri": true,
                "response": true
            };
            var tmp = [];
            for (var name in props) {
                var val = quoted[name] ? '"' + props[name] + '"' : props[name];
                tmp.push(name + "=" + val);
            }
            return tmp.join(",");
        },
        _stage: null,
        _cnonce: function (size) {
            var data = "";
            for (var idx = 0; idx < size; idx++) {
                data += String.fromCharCode(Math.random() * 256);
            }
            return jabberwerx.util.crypto.b64Encode(data);
        }
    }, "jabberwerx.SASLDigestMd5Mechanism", "DIGEST-MD5");
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/model/Translator.js*/
;
(function (jabberwerx) {
    jabberwerx.Translator = jabberwerx.JWBase.extend({
        init: function () {
            this._super();
        },
        format: function (istr) {
            var ostr = this._updates[istr] || this._mappings[istr];
            if (!ostr) {
                ostr = istr;
            }
            var ptn = /\{([0-9]+)\}/g;
            var args = jabberwerx.$.makeArray(arguments).slice(1);
            var substFn = function (match, idx) {
                idx = parseInt(idx);
                if (isNaN(idx)) {
                    return match;
                }
                var found = args[idx];
                if (found === null || found === undefined) {
                    return match;
                }
                return found;
            };
            var ostr = ostr.replace(ptn, substFn);
            return ostr;
        },
        load: function (locale) {
            if (!locale) {
                locale = jabberwerx.system.getLocale();
            }
            if (this.locale == locale) {
                return;
            }
            var filterFN = function (l) {
                return function () {
                    var lang = (jabberwerx.$(this).attr("xml:lang") || "").toLowerCase();
                    return (lang == l) ? this : null;
                };
            };
            var localeFull = locale.toLowerCase();
            var localePart = locale.split("-")[0].toLowerCase();
            var tmpLinks = jabberwerx.$("link[rel='translation'][type='text/javascript']");
            var links = jabberwerx.$();
            links = jabberwerx.$.merge(links, tmpLinks.map(filterFN("")));
            links = jabberwerx.$.merge(links, tmpLinks.map(filterFN(localePart)));
            links = jabberwerx.$.merge(links, tmpLinks.map(filterFN(localeFull)));
            if (!links.length) {
                throw new TypeError("no translation links found");
            }
            var mappings = {};
            var processed = 0;
            links.each(function () {
                var url = jabberwerx.$(this).attr("href");
                if (!url) {
                    return;
                }
                var data = null;
                var completeFn = function (xhr, status) {
                    if (status != "success") {
                        return;
                    }
                    data = xhr.responseText;
                };
                var setup = {
                    async: false,
                    cache: true,
                    complete: completeFn,
                    dataType: "text",
                    processData: false,
                    timeout: 1000,
                    url: url
                };
                jabberwerx.$.ajax(setup);
                if (!data) {
                    jabberwerx.util.debug.log("no translation data returned from " + url);
                }
                try {
                    data = eval("(" + data + ")");
                } catch (ex) {
                    jabberwerx.util.debug.log("could not parse translation data from " + url);
                }
                mappings = jabberwerx.$.extend(mappings, data);
                processed++;
            });
            if (!processed) {
                throw new TypeError("no valid translations found");
            }
            this._mappings = mappings;
            this.locale = locale;
        },
        addTranslation: function (key, value) {
            if (!(key && typeof (key) == "string")) {
                throw new TypeError();
            }
            if (!(value && typeof (value) == "string")) {
                throw new TypeError();
            }
            this._updates[key] = value;
        },
        removeTranslation: function (key) {
            if (!(key && typeof (key) == "string")) {
                throw new TypeError();
            }
            delete this._updates[key];
        },
        locale: undefined,
        _mappings: {},
        _updates: {}
    }, "jabberwerx.Translator");
    jabberwerx.l10n = new jabberwerx.Translator();
    jabberwerx._ = (function (l10n) {
        var fn;
        fn = function () {
            return l10n.format.apply(l10n, arguments);
        };
        fn.instance = l10n;
        return fn;
    })(jabberwerx.l10n);
    try {
        jabberwerx.l10n.load(jabberwerx.system.getLocale());
        jabberwerx.util.debug.log("Loaded translation for " + jabberwerx.system.getLocale());
    } catch (e) {
        jabberwerx.util.debug.log("Could not find a translation for " + jabberwerx.system.getLocale());
    }
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/model/JID.js*/
;
(function (jabberwerx) {
    var _jidCache = {};
    var _lookupCache = function (val) {
        if (!val) {
            throw new jabberwerx.JID.InvalidJIDError();
        }
        val = val.toString();
        var jid = _jidCache[val];
        if (jid) {
            return jid;
        }
        var resSep = val.lastIndexOf('/');
        val = (resSep != -1) ? val.substring(0, resSep).toLowerCase() +
            "/" + val.substring(resSep + 1) : val.toLowerCase();
        jid = _jidCache[val];
        if (jid) {
            return jid;
        }
        return null;
    };
    jabberwerx.JID = jabberwerx.JWModel.extend({
        init: function (arg) {
            if (arg instanceof jabberwerx.JID) {
                arg = {
                    "node": arg.getNode() || null,
                    "domain": arg.getDomain() || null,
                    "resource": arg.getResource() || null
                };
            } else if (typeof (arg) == "string") {
                var result = /^(?:([^\/]+)@)?([^@\/]+)(?:\/(.+))?$/.exec(arg);
                if (!result) {
                    throw new jabberwerx.JID.InvalidJIDError("JID did not match the form 'node@domain/resource'");
                }
                arg = {
                    "node": (result[1] || undefined),
                    "domain": result[2],
                    "resource": (result[3] || undefined)
                };
            } else if (!arg) {
                throw new jabberwerx.JID.InvalidJIDError("argument must be defined and not null");
            } else {
                arg = jabberwerx.$.extend({}, arg);
            }
            var prepFN = function (test) {
                if (/[ \t\n\r@\:\<\>\&'"\/]/.test(test)) {
                    throw new jabberwerx.JID.InvalidJIDError("invalid characters found");
                }
                return test.toLowerCase();
            };
            if (!arg.domain) {
                throw new jabberwerx.JID.InvalidJIDError("'' or null or undefined domain not allowed");
            } else {
                arg.domain = prepFN(arg.domain, true);
            }
            if (arg.node == "") {
                throw new jabberwerx.JID.InvalidJIDError("'' node with @ not allowed");
            } else if (arg.node) {
                if (arg.unescaped) {
                    arg.node = jabberwerx.JID.escapeNode(arg.node);
                }
                arg.node = prepFN(arg.node, true);
            }
            if (arg.resouce == "") {
                throw new jabberwerx.JID.InvalidJIDError("'' resource with / not allowed");
            }
            this._domain = arg.domain;
            this._node = arg.node || "";
            this._resource = arg.resource || "";
            this._full = "" +
                (arg.node ? arg.node + "@" : "") +
                arg.domain +
                (arg.resource ? "/" + arg.resource : "");
            if (!_jidCache[this.toString()]) {
                _jidCache[this.toString()] = this;
            }
        },
        getBareJID: function () {
            if (!this.getResource()) {
                return this;
            } else {
                return new jabberwerx.JID({
                    "node": this.getNode(),
                    "domain": this.getDomain()
                });
            }
        },
        getBareJIDString: function () {
            return this.getBareJID().toString();
        },
        getDomain: function () {
            return this._domain;
        },
        getNode: function () {
            return this._node;
        },
        getResource: function () {
            return this._resource;
        },
        toString: function () {
            return this._full;
        },
        toDisplayString: function () {
            var result = this.getDomain();
            var part;
            part = this.getNode();
            if (part) {
                result = jabberwerx.JID.unescapeNode(part) + "@" + result;
            }
            part = this.getResource();
            if (part) {
                result = result + "/" + part;
            }
            return result;
        },
        equals: function (jid) {
            try {
                jid = jabberwerx.JID.asJID(jid);
                return this.toString() == jid.toString();
            } catch (ex) {
                return false;
            }
        },
        compareTo: function (jid) {
            jid = jabberwerx.JID.asJID(jid);
            var cmp = function (v1, v2) {
                if (v1 < v2) {
                    return -1;
                } else if (v1 > v2) {
                    return 1;
                }
                return 0;
            };
            var result;
            if ((result = cmp(this.getDomain(), jid.getDomain())) != 0) {
                return result;
            }
            if ((result = cmp(this.getNode(), jid.getNode())) != 0) {
                return result;
            }
            if ((result = cmp(this.getResource(), jid.getResource())) != 0) {
                return result;
            }
            return 0;
        },
        shouldBeSerializedInline: function () {
            return false;
        },
        wasUnserialized: function () {
            _jidCache[this.toString()] = this;
        },
        _node: "",
        _domain: "",
        _resource: "",
        _full: ""
    }, 'jabberwerx.JID');
    jabberwerx.JID.InvalidJIDError = jabberwerx.util.Error.extend.call(TypeError, "The JID is invalid");
    jabberwerx.JID.asJID = function (val) {
        var jid = null;
        if (val instanceof jabberwerx.JID) {
            return val;
        }
        jid = _lookupCache(val);
        if (!jid) {
            jid = new jabberwerx.JID(val);
            var lookup = jid.toString();
            if (_jidCache[lookup] && _jidCache[lookup] != jid) {
                jid = _jidCache[lookup];
            } else {
                _jidCache[lookup] = jid;
            }
            _jidCache[val.toString()] = jid;
        }
        return jid;
    };
    jabberwerx.JID.clearCache = function () {
        _jidCache = {};
    }, jabberwerx.JID.escapeNode = function (input) {
        if (typeof (input) != "string") {
            throw new TypeError("input must be a string");
        }
        if (input.charAt(0) == ' ' || input.charAt(input.length - 1) == ' ') {
            throw new TypeError("input cannot start or end with ' '");
        }
        var ptn = /([ "&'\/:<>@])|(\\)(20|22|26|27|2f|3a|3c|3e|40|5c)/gi;
        var repFN = function (found, m1, m2, m3) {
            switch (m1 || m2) {
                case ' ':
                    return "\\20";
                case '"':
                    return "\\22";
                case '&':
                    return "\\26";
                case '\'':
                    return "\\27";
                case '/':
                    return "\\2f";
                case ':':
                    return "\\3a";
                case '<':
                    return "\\3c";
                case '>':
                    return "\\3e";
                case '@':
                    return "\\40";
                case '\\':
                    return "\\5c" + m3;
            }
            return found;
        };
        return input.replace(ptn, repFN);
    };
    jabberwerx.JID.unescapeNode = function (input) {
        if (typeof (input) != "string") {
            throw new TypeError("input must be a string");
        }
        var ptn = /(\\20|\\22|\\26|\\27|\\2f|\\3a|\\3c|\\3e|\\40|\\5c)/gi;
        var repFN = function (found, m1) {
            switch (m1) {
                case "\\20":
                    return ' ';
                case "\\22":
                    return '"';
                case "\\26":
                    return '&';
                case "\\27":
                    return '\'';
                case "\\2f":
                    return '/';
                case "\\3a":
                    return ':';
                case "\\3c":
                    return '<';
                case "\\3e":
                    return '>';
                case "\\40":
                    return '@';
                case "\\5c":
                    return '\\';
            }
            return found;
        };
        return input.replace(ptn, repFN);
    };
    var tjid = jabberwerx.JID.asJID("foo");
    if ((tjid + "") !== "foo") {
        jabberwerx.JID.prototype.toString = function () {
            return this._full || "";
        };
    }
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/model/Events.js*/
;
(function (jabberwerx) {
    var _jwaNotifierBinding = function (dispatch, name, mode) {
        var key = 'on:' + name.toLowerCase();
        var notifier = dispatch[key];
        if (!notifier && (mode == 'create')) {
            notifier = new jabberwerx.EventNotifier(dispatch, name);
            dispatch[key] = notifier;
        } else if (notifier && (mode == 'destroy')) {
            delete dispatch[key];
        }
        return notifier;
    };
    var _jwaDispatchBinding = function (src, name, mode) {
        var dispatch = (src instanceof jabberwerx.EventDispatcher) ? src : src._eventDispatch;
        if (!(dispatch && dispatch instanceof jabberwerx.EventDispatcher)) {
            if (mode != 'create') {
                return;
            }
            dispatch = new jabberwerx.EventDispatcher(src);
            src._eventDispatch = dispatch;
        }
        return _jwaNotifierBinding(dispatch, name, mode);
    };
    jabberwerx.EventObject = function (notifier, data) {
        this.notifier = notifier;
        this.name = notifier.name;
        this.source = notifier.dispatcher.source;
        this.data = data;
        this.selected = undefined;
    };
    jabberwerx.EventNotifier = jabberwerx.JWBase.extend({
        init: function (dispatcher, name) {
            this._super();
            this.dispatcher = dispatcher;
            this.name = name.toLowerCase();
            this._callbacks = [];
        },
        bind: function (cb) {
            this.bindWhen(undefined, cb);
        },
        bindWhen: function (selector, cb) {
            if (!jabberwerx.$.isFunction(cb)) {
                new TypeError("callback must be a function");
            }
            this.unbind(cb);
            switch (typeof selector) {
                case 'undefined':
                    break;
                case 'function':
                    break;
                case 'string':
                    var filter = selector;
                    selector = function (data, evt) {
                        var node;
                        if (data instanceof jabberwerx.Stanza) {
                            node = data.getDoc();
                        } else {
                            node = data;
                        }
                        var selected = jabberwerx.$(filter, node);
                        switch (selected.length) {
                            case 0:
                                return false;
                            case 1:
                                return selected[0];
                            default:
                                return selected;
                        }
                        return false;
                    };
                    break;
                default:
                    throw new TypeError("selector must be undefined or function or string");
            }
            this._callbacks.push({
                'filter': filter,
                'selector': selector,
                'cb': cb
            });
        },
        unbind: function (cb) {
            this._callbacks = jabberwerx.$.grep(this._callbacks, function (value) {
                return value['cb'] !== cb;
            });
        },
        trigger: function (data, delegated, cb) {
            var evt;
            if (data instanceof jabberwerx.EventObject) {
                evt = data;
                evt.notifier = this;
            } else {
                evt = new jabberwerx.EventObject(this, data);
            }
            if (!delegated) {
                delegated = _jwaNotifierBinding(jabberwerx.globalEvents, this.name);
            } else if (!(delegated instanceof jabberwerx.EventNotifier)) {
                throw new TypeError("delegated must be a EventNotifier");
            }
            if (cb && !jabberwerx.$.isFunction(cb)) {
                throw new TypeError("cb must be a function");
            }
            return this.dispatcher.process(this, evt, delegated, cb);
        },
        process: function (evt, delegated, cb) {
            var results = false;
            jabberwerx.reduce(this._callbacks, function (item) {
                var cb = item['cb'];
                var filter = item['selector'];
                var retval;
                if (!cb || !jabberwerx.$.isFunction(cb)) {
                    return;
                }
                var selected = undefined;
                if (filter) {
                    selected = filter(evt.data);
                    if (!selected) {
                        return;
                    }
                }
                try {
                    evt.selected = selected;
                    retval = cb.call(cb, evt);
                } catch (ex) { }
                if (retval !== undefined) {
                    results = results || Boolean(retval);
                }
            });
            if (delegated && delegated !== this) {
                var fn = function (delegatedResults) {
                    results = results || delegatedResults;
                    if (cb) {
                        cb(results);
                    }
                };
                delegated.trigger(evt, null, fn);
            } else if (cb) {
                cb(results);
            }
        },
        shouldBeSavedWithGraph: function () {
            return true;
        },
        wasUnserialized: function () {
            var callbacks = this._callbacks;
            callbacks = jabberwerx.$.map(callbacks, function (oneCB, oneKey) {
                if (jabberwerx.util.isJWInvocation(oneCB.cb)) {
                    var method = oneCB.cb.methodName,
                        target = oneCB.cb.object;
                    if (!(target && method && target[method])) {
                        jabberwerx.util.debug.log("throwing out bad callback: " + target + "[" + method + "]");
                        return null;
                    }
                }
                if (oneCB.filter && !oneCB.selector && (typeof oneCB.filter == 'string')) {
                    var oneFilter = oneCB.filter;
                    oneCB.selector = function (data, evt) {
                        var node;
                        if (data instanceof jabberwerx.Stanza) {
                            node = data.getDoc();
                        } else {
                            node = data;
                        }
                        var selected = jabberwerx.$(oneFilter, node);
                        switch (selected.length) {
                            case 0:
                                return false;
                            case 1:
                                return selected[0];
                            default:
                                return selected;
                        }
                        return false;
                    };
                }
                return oneCB;
            });
            this._callbacks = callbacks;
        }
    }, "jabberwerx.EventNotifier");
    jabberwerx.EventDispatcher = jabberwerx.JWBase.extend({
        init: function (src) {
            this._super();
            this.source = src;
            if (src !== jabberwerx && jabberwerx.globalEvents) {
                this.globalEvents = jabberwerx.globalEvents;
            }
        },
        process: function (notifier, evt, delegated, cb) {
            var op = {
                notifier: notifier,
                event: evt,
                delegated: delegated,
                callback: cb
            };
            if (this._queue) {
                this._queue.push(op);
                return;
            }
            this._queue = [op];
            while (op = this._queue.shift()) {
                op.notifier.process(op.event, op.delegated, op.callback);
            }
            delete this._queue;
        },
        shouldBeSavedWithGraph: function () {
            return true;
        },
        wasUnserialized: function () {
            jabberwerx.globalEvents = this.globalEvents;
        }
    }, "jabberwerx.EventDispatcher");
    jabberwerx.GlobalEventDispatcher = jabberwerx.EventDispatcher.extend({
        init: function () {
            this._super(jabberwerx);
            if (jabberwerx.globalEvents && jabberwerx.globalEvents !== this) {
                throw new Error("only one global events dispatcher can exist!");
            }
        },
        bind: function (name, cb) {
            var notifier = _jwaNotifierBinding(this, name, 'create');
            notifier.bind(cb);
        },
        bindWhen: function (name, selector, cb) {
            var notifier = _jwaNotifierBinding(this, name, 'create');
            notifier.bindWhen(selector, cb);
        },
        unbind: function (name, cb) {
            var notifier = _jwaNotifierBinding(this, name);
            if (notifier) {
                notifier.unbind(cb);
            }
        },
        shouldBeSerializedInline: function () {
            return false;
        },
        shouldBeSavedWithGraph: function () {
            return true;
        },
        willBeSerialized: function () {
            this.source = undefined;
        },
        wasUnserialized: function () {
            this.source = jabberwerx;
        }
    }, "jabberwerx.GlobalEventDispatcher");
    if (!(jabberwerx.globalEvents && jabberwerx.globalEvents instanceof jabberwerx.GlobalEventDispatcher)) {
        jabberwerx.globalEvents = new jabberwerx.GlobalEventDispatcher();
    }
    jabberwerx.JWModel.prototype.event = function (name) {
        return _jwaDispatchBinding(this, name);
    };
    jabberwerx.JWModel.prototype.applyEvent = function (name) {
        return _jwaDispatchBinding(this, name, 'create');
    };
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/model/Entity.js*/
;
(function (jabberwerx) {
    var __jwesAsKey = function (jid, node) {
        return "[" + (jid || "") + "]:[" + (node || "") + "]";
    };
    jabberwerx.Entity = jabberwerx.JWModel.extend({
        init: function (key, ctrl) {
            this._super();
            if (!key && !(key.jid || key.node)) {
                throw new TypeError("key must contain a jid and/or a node");
            }
            if (key.jid) {
                this.jid = jabberwerx.JID.asJID(key.jid);
            }
            if (key.node) {
                this.node = key.node;
            }
            this._mapKey = __jwesAsKey(this.jid, this.node);
            var cache;
            if (ctrl instanceof jabberwerx.Controller) {
                this.controller = ctrl;
                cache = ctrl.client && ctrl.client.entitySet;
            } else if (ctrl && ctrl.register && ctrl.unregister && ctrl.entity) {
                cache = ctrl;
            }
            if (cache) {
                this.cache = cache;
                this._eventing = {
                    "added": cache.event("entityCreated"),
                    "updated": cache.event("entityUpdated"),
                    "deleted": cache.event("entityDestroyed")
                };
            } else {
                this._eventing = {
                    "added": null,
                    "updated": null,
                    "deleted": null
                };
            }
            this.applyEvent('primaryPresenceChanged');
            this.applyEvent("resourcePresenceChanged");
        },
        destroy: function () {
            if (this.cache) {
                this.cache.unregister(this);
            }
            this._super();
        },
        apply: function (entity, noupdate) {
            if (!(entity && entity instanceof jabberwerx.Entity)) {
                throw new TypeError("entity is not valid");
            }
            jabberwerx.$.extend(this, {
                _displayName: entity._displayName,
                _groups: jabberwerx.$.extend([], entity._groups),
                _presenceList: jabberwerx.$.extend([], entity._presenceList),
                properties: jabberwerx.$.extend(true, {}, entity.properties),
                features: jabberwerx.$.extend([], entity.features),
                identities: jabberwerx.$.extend([], entity.identities)
            });
            if (!noupdate) {
                this.update();
            }
            return this;
        },
        __toStringValue: function () {
            return "entity<" + this.getClassName() + ">[" +
                this._mapKey + "]: " +
                this.getDisplayName();
        },
        matches: function (entity) {
            if (entity === this) {
                return true;
            }
            if (!entity) {
                return false;
            }
            return this._mapKey == entity._mapKey;
        },
        isActive: function () {
            return (this._presenceList.length > 0 && this._presenceList[0].getType() != "unavailable");
        },
        getPrimaryPresence: function () {
            return this._presenceList[0] || null;
        },
        getAllPresence: function () {
            return this._presenceList;
        },
        getResourcePresence: function (resource) {
            var fullJid = this.jid.getBareJIDString() + '/' + resource;
            var presence = null;
            jabberwerx.$.each(this._presenceList, function () {
                if (this.getFrom() == fullJid) {
                    presence = this;
                    return false;
                }
                return true;
            });
            return presence;
        },
        updatePresence: function (presence, quiet) {
            var retVal = false;
            if (!presence) {
                if (this.getPrimaryPresence()) {
                    var len = this._presenceList.length;
                    for (var i = 0; i < len; i++) {
                        var tpres = this._presenceList.pop();
                        !quiet && this.event("resourcePresenceChanged").trigger({
                            fullJid: tpres.getFromJID(),
                            presence: null,
                            nowAvailable: false
                        });
                    } !quiet && this.event("primaryPresenceChanged").trigger({
                        presence: null,
                        fullJid: this.jid.getBareJID()
                    });
                    retVal = true;
                }
            } else {
                if (!(presence instanceof jabberwerx.Presence)) {
                    throw new TypeError("presence is not a valid type");
                }
                var jid = presence.getFromJID();
                if (jid.getBareJIDString() != this.jid.getBareJIDString()) {
                    throw new jabberwerx.Entity.InvalidPresenceError("presence is not for this entity: " + this);
                }
                if (presence.getType() && presence.getType() != "unavailable") {
                    throw new jabberwerx.Entity.InvalidPresenceError("presence is not the correct type");
                }
                var resPresence = this.getResourcePresence(jid.getResource());
                var nowAvailable;
                if (!resPresence || resPresence.getType() == "unavailable") {
                    nowAvailable = Boolean(!presence.getType());
                } else {
                    nowAvailable = false;
                }
                var primaryPresence = this._presenceList[0] || null;
                this._removePresenceFromList(jid.toString());
                if (presence.getType() != "unavailable") {
                    if (this._className != "jabberwerx.TemporaryEntity") {
                        if (!this.isActive()) {
                            this._clearPresenceList();
                        }
                        this._insertPresence(presence);
                    }

                } else {
                    this._handleUnavailable(presence);
                } !quiet && this.event("resourcePresenceChanged").trigger({
                    fullJid: jid,
                    presence: presence,
                    nowAvailable: nowAvailable
                });
                if (primaryPresence !== this._presenceList[0]) {
                    var primaryJid;
                    primaryPresence = this._presenceList[0] || null;
                    primaryJid = primaryPresence ? primaryPresence.getFromJID() : jid.getBareJID();
                    !quiet && this.event("primaryPresenceChanged").trigger({
                        presence: primaryPresence,
                        fullJid: primaryJid
                    });
                    retVal = true;
                }
            }
            return retVal;
        },
        _handleUnavailable: function (presence) { },
        _insertPresence: function (presence) {
            var ipos;
            for (ipos = 0;
                (ipos < this._presenceList.length) && (presence.compareTo(this._presenceList[ipos]) < 0); ++ipos);
            this._presenceList.splice(ipos, 0, presence);
        },
        _clearPresenceList: function () {
            this._presenceList = [];
        },
        _removePresenceFromList: function (jid) {
            for (var i = 0; i < this._presenceList.length; i++) {
                if (this._presenceList[i].getFrom() == jid) {
                    this._presenceList.splice(i, 1);
                    return true;
                }
            }
            return false;
        },
        getDisplayName: function () {
            var name = this._displayName;
            if (!name) {
                var jid = (this.jid && this.jid.toDisplayString());
                name = (this.node ? "{" + this.node + "}" : "") + (jid || "");
            }
            return name;
        },
        setDisplayName: function (name) {
            var nval = (String(name) || "");
            var oval = this._displayName;
            if (oval != nval) {
                this._displayName = nval;
                this.update();
            }
        },
        _displayName: "",
        getGroups: function () {
            return this._groups;
        },
        setGroups: function (groups) {
            if (jabberwerx.$.isArray(groups)) {
                groups = jabberwerx.unique(groups.concat([]));
            } else if (groups) {
                groups = [groups.toString()];
            } else {
                groups = [];
            }
            this._groups = groups;
            this.update();
        },
        _groups: [],
        update: function () {
            if (this.controller && this.controller.updateEntity) {
                this.controller.updateEntity(this);
            } else if (this._eventing["updated"]) {
                this._eventing["updated"].trigger(this);
            }
        },
        remove: function () {
            if (this.controller && this.controller.removeEntity) {
                this.controller.removeEntity(this);
            } else {
                this.destroy();
            }
        },
        hasFeature: function (feat) {
            if (!feat) {
                return false;
            }
            var result = false;
            jabberwerx.$.each(this.features, function () {
                result = String(this) == feat;
                return !result;
            });
            return result;
        },
        hasIdentity: function (id) {
            if (!id) {
                return false;
            }
            var result = false;
            jabberwerx.$.each(this.identities, function () {
                result = String(this) == id;
                return !result;
            });
            return result;
        },
        toString: function () {
            return this.__toStringValue();
        },
        jid: null,
        node: "",
        properties: {},
        features: [],
        identities: [],
        _presenceList: []
    }, 'jabberwerx.Entity');
    jabberwerx.Entity.InvalidPresenceError = jabberwerx.util.Error.extend("The provided presence is not valid for this entity");
    jabberwerx.EntitySet = jabberwerx.JWModel.extend({
        init: function () {
            this._super();
            this.applyEvent("entityCreated");
            this.applyEvent("entityDestroyed");
            this.applyEvent("entityUpdated");
            this.applyEvent("entityRenamed");
            this.applyEvent("entityAdded");
            this.applyEvent("entityRemoved");
            this.applyEvent("batchUpdateStarted");
            this.applyEvent("batchUpdateEnded");
        },
        entity: function (jid, node) {
            return this._map[__jwesAsKey(jid, node)];
        },
        register: function (entity) {
            if (!(entity && entity instanceof jabberwerx.Entity)) {
                throw new TypeError("entity is not an Entity");
            }
            var prev = this.entity(entity.jid, entity.node);
            if (prev === entity) {
                return false;
            }
            if (prev) {
                this.unregister(prev);
            }
            this._updateToMap(entity);
            this.event("entityAdded").trigger(entity);
            return true;
        },
        unregister: function (entity) {
            var present = (this.entity(entity.jid, entity.node) !== undefined);
            this._removeFromMap(entity);
            if (present) {
                this.event("entityRemoved").trigger(entity);
            }
            return present;
        },
        _renameEntity: function (entity, njid, nnode) {
            var ojid = entity.jid;
            var onode = entity.node;
            this._removeFromMap(entity);
            if (njid) {
                njid = jabberwerx.JID.asJID(njid);
            } else {
                njid = undefined;
            }
            entity.jid = njid;
            if (nnode) {
                nnode = String(nnode);
            } else {
                nnode = undefined;
            }
            entity.node = nnode;
            this._updateToMap(entity);
            var data = {
                entity: entity,
                jid: ojid,
                node: nnode
            };
            this.event("entityRenamed").trigger(data);
        },
        each: function (op, entityClass) {
            if (!jabberwerx.$.isFunction(op)) {
                throw new TypeError('operator must be a function');
            }
            var that = this;
            jabberwerx.$.each(this._map, function () {
                var retcode;
                if (this instanceof (entityClass || jabberwerx.Entity)) {
                    retcode = op(this);
                }
                return (retcode != false);
            });
        },
        toArray: function () {
            var arr = [];
            this.each(function (entity) {
                arr.push(entity);
            });
            return arr;
        },
        getAllGroups: function () {
            var groups = [];
            this.each(function (entity) {
                jabberwerx.$.merge(groups, entity.getGroups());
            });
            return jabberwerx.unique(groups);
        },
        _map: {},
        _updateToMap: function (ent) {
            var key = __jwesAsKey(ent.jid, ent.node);
            ent._mapKey = key;
            this._map[key] = ent;
        },
        _removeFromMap: function (ent) {
            delete this._map[__jwesAsKey(ent.jid, ent.node)];
        },
        _batchCount: 0,
        _batchQueue: [],
        startBatch: function () {
            var count = this._batchCount;
            this._batchCount++;
            if (count == 0) {
                this._enableBatchTriggers(true);
                this._batchQueue = [];
                this.event("batchUpdateStarted").trigger();
            }
            return (count != 0);
        },
        endBatch: function () {
            var running = true;
            switch (this._batchCount) {
                case 0:
                    running = false;
                    break;
                case 1:
                    running = false;
                    this._enableBatchTriggers(false);
                    var bq = this._batchQueue;
                    this._batchQueue = [];
                    this.event("batchUpdateEnded").trigger(bq);
                default:
                    this._batchCount--;
                    break;
            }
            return running;
        },
        _addBatchedEvent: function (notifier, edata) {
            this._batchQueue.push({
                name: notifier.name,
                data: edata
            });
        },
        _enableBatchTriggers: function (enable) {
            var that = this;
            jabberwerx.$.each(["entityCreated", "entityDestroyed", "entityRenamed", "entityUpdated", "entityAdded", "entityRemoved"], function () {
                var notifier = that.event(this);
                if (!enable && notifier._superTrigger) {
                    notifier.trigger = notifier._superTrigger;
                    delete notifier._superTrigger;
                } else if (enable && !notifier._superTrigger) {
                    notifier._superTrigger = notifier.trigger;
                    notifier.trigger = function (data) {
                        that._addBatchedEvent(notifier, data);
                        return (!that.suppressBatchedEvents && notifier._superTrigger.apply(notifier, arguments));
                    }
                }
            });
        },
        suppressBatchedEvents: false
    }, 'jabberwerx.EntitySet');
    jabberwerx.EntitySet.EntityAlreadyExistsError = jabberwerx.util.Error.extend('That JID is already taken!.');
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/model/Stanza.js*/
;
(function (jabberwerx) {
    jabberwerx.Stanza = jabberwerx.JWModel.extend({
        init: function (root) {
            this._super();
            var builder = new jabberwerx.NodeBuilder();
            if (jabberwerx.isElement(root)) {
                builder = builder.node(root);
            } else if (typeof (root) == "string") {
                if (!(/^\{[^\}]*\}/.test(root))) {
                    root = "{jabber:client}" + root;
                }
                builder = builder.element(root);
            } else {
                throw new TypeError("root must be an element or expanded-name");
            }
            this._DOM = builder.data;
            var date = new Date();
            var dateString = jabberwerx.$(builder.data).find("delay[xmlns='urn:xmpp:delay'][stamp]").attr("stamp");
            if (!dateString) {
                dateString = jabberwerx.$(builder.data).find("x[xmlns='jabber:x:delay'][stamp]").attr("stamp");
            }
            if (dateString) {
                try {
                    date = jabberwerx.parseTimestamp(dateString);
                } catch (ex) {
                    jabberwerx.util.debug.log("could not parse delay: " + ex);
                }
            }
            this.timestamp = date;
        },
        getNode: function () {
            return this._DOM;
        },
        getDoc: function () {
            return this.getNode().ownerDocument;
        },
        xml: function () {
            return jabberwerx.util.serializeXML(this._DOM);
        },
        pType: function () {
            return this.getNode().nodeName;
        },
        _getAttrValue: function (name) {
            return this.getNode().getAttribute(name);
        },
        _setAttrValue: function (name, val) {
            if (val === undefined || val === null) {
                this.getNode().removeAttribute(name);
            } else {
                this.getNode().setAttribute(name, val);
            }
        },
        _getChildText: function (name) {
            var nnode = new jabberwerx.NodeBuilder(name).data;
            var nodens = (nnode.namespaceURI) ? nnode.namespaceURI : this.getNode().namespaceURI;
            var matches = jabberwerx.$(this.getNode()).children(nnode.nodeName).map(function (idx, child) {
                return child.namespaceURI == nodens ? child : null;
            });
            return matches.length ? jabberwerx.$(matches[0]).text() : null;
        },
        _setChildText: function (name, val) {
            var n = jabberwerx.$(this.getNode()).children(name);
            if (val === undefined || val === null) {
                n.remove();
            } else {
                if (!n.length) {
                    n = jabberwerx.$(new jabberwerx.NodeBuilder(this.getNode()).element(name).data);
                }
                n.text(val);
            }
        },
        getType: function () {
            return this._getAttrValue("type");
        },
        setType: function (type) {
            this._setAttrValue("type", type || undefined);
        },
        getID: function () {
            return this._getAttrValue("id");
        },
        setID: function (id) {
            this._setAttrValue("id", id || undefined);
        },
        getFrom: function () {
            return this._getAttrValue("from") || null;
        },
        getFromJID: function () {
            var addr = this.getFrom();
            if (addr) {
                try {
                    addr = jabberwerx.JID.asJID(addr);
                } catch (ex) {
                    jabberwerx.util.debug.log("could not parse 'from' address: " + ex);
                    addr = null;
                }
            }
            return addr;
        },
        setFrom: function (addr) {
            addr = (addr) ? jabberwerx.JID.asJID(addr) : undefined;
            this._setAttrValue("from", addr);
        },
        getTo: function () {
            return this._getAttrValue("to") || null;
        },
        getToJID: function () {
            var addr = this.getTo();
            if (addr) {
                try {
                    addr = jabberwerx.JID.asJID(addr);
                } catch (ex) {
                    jabberwerx.util.debug.log("could not parse 'to' address: " + ex);
                    addr = null;
                }
            }
            return addr;
        },
        setTo: function (addr) {
            addr = (addr) ? jabberwerx.JID.asJID(addr) : undefined;
            this._setAttrValue("to", addr);
        },
        isError: function () {
            return this.getType() == "error";
        },
        getErrorInfo: function () {
            var err = jabberwerx.$(this.getNode()).children("error");
            if (this.isError() && err.length) {
                err = jabberwerx.Stanza.ErrorInfo.createWithNode(err.get(0));
            } else {
                err = null;
            }
            return err;
        },
        clone: function () {
            var cpy = jabberwerx.Stanza.createWithNode(this.getNode());
            cpy.timestamp = this.timestamp;
            return cpy;
        },
        swap: function (include_from) {
            var cpy = this.clone();
            cpy.setTo(this.getFromJID());
            cpy.setFrom(include_from ? this.getToJID() : null);
            return cpy;
        },
        errorReply: function (err) {
            if (!(err && err instanceof jabberwerx.Stanza.ErrorInfo)) {
                throw new TypeError("err must be an ErrorInfo");
            }
            var retval = this.swap();
            retval.setType("error");
            var builder = new jabberwerx.NodeBuilder(retval.getNode()).xml(err.getNode().xml);
            return retval;
        },
        willBeSerialized: function () {
            this.timestamp = this.timestamp.getTime();
            this._serializedXML = this._DOM.xml;
            delete this._DOM;
        },
        wasUnserialized: function () {
            if (this._serializedXML && this._serializedXML.length) {
                this._DOM = jabberwerx.util.unserializeXML(this._serializedXML);
                delete this._serializedXML;
            }
            this.timestamp = this.timestamp ? new Date(this.timestamp) : new Date();
        },
        timestamp: null,
        _DOM: null
    }, "jabberwerx.Stanza");
    jabberwerx.Stanza.generateID = function () {
        return jabberwerx.util.crypto.b64_sha1(jabberwerx.util.crypto.generateUUID());
    };
    jabberwerx.Stanza.ErrorInfo = jabberwerx.JWModel.extend({
        init: function (type, cond, text) {
            this._super();
            this.type = type || "wait";
            this.condition = cond || "{urn:ietf:params:xml:ns:xmpp-stanzas}internal-server-error";
            this.text = text || "";
            this.toString = this._toErrString;
        },
        getNode: function () {
            var builder = new jabberwerx.NodeBuilder("error");
            builder.attribute("type", this.type);
            builder.element(this.condition);
            if (this.text) {
                builder.element("{urn:ietf:params:xml:ns:xmpp-stanzas}text").text(this.text);
            }
            return builder.data;
        },
        wasUnserialized: function () {
            this.toString = this._toErrString;
        },
        _toErrString: function () {
            return this.condition;
        },
        type: "",
        condition: "",
        text: ""
    }, "jabberwerx.Stanza.ErrorInfo");
    jabberwerx.Stanza.ErrorInfo.createWithNode = function (node) {
        if (!jabberwerx.isElement(node)) {
            throw new TypeError("node must be an Element");
        }
        node = jabberwerx.$(node);
        var type = node.attr("type");
        var cond = node.children("[xmlns='urn:ietf:params:xml:ns:xmpp-stanzas']:not(text)").map(function () {
            return "{urn:ietf:params:xml:ns:xmpp-stanzas}" + this.nodeName;
        }).get(0);
        var text = node.children("text[xmlns='urn:ietf:params:xml:ns:xmpp-stanzas']").text();
        return new jabberwerx.Stanza.ErrorInfo(type, cond, text);
    };
    jabberwerx.Stanza.ERR_BAD_REQUEST = new jabberwerx.Stanza.ErrorInfo("modify", "{urn:ietf:params:xml:ns:xmpp-stanzas}bad-request");
    jabberwerx.Stanza.ERR_CONFLICT = new jabberwerx.Stanza.ErrorInfo("modify", "{urn:ietf:params:xml:ns:xmpp-stanzas}conflict");
    jabberwerx.Stanza.ERR_FEATURE_NOT_IMPLEMENTED = new jabberwerx.Stanza.ErrorInfo("cancel", "{urn:ietf:params:xml:ns:xmpp-stanzas}feature-not-implemented");
    jabberwerx.Stanza.ERR_FORBIDDEN = new jabberwerx.Stanza.ErrorInfo("auth", "{urn:ietf:params:xml:ns:xmpp-stanzas}forbidden");
    jabberwerx.Stanza.ERR_INTERNAL_SERVER_ERROR = new jabberwerx.Stanza.ErrorInfo("wait", "{urn:ietf:params:xml:ns:xmpp-stanzas}internal-server-error");
    jabberwerx.Stanza.ERR_ITEM_NOT_FOUND = new jabberwerx.Stanza.ErrorInfo("cancel", "{urn:ietf:params:xml:ns:xmpp-stanzas}item-not-found");
    jabberwerx.Stanza.ERR_JID_MALFORMED = new jabberwerx.Stanza.ErrorInfo("modify", "{urn:ietf:params:xml:ns:xmpp-stanzas}jid-malformed");
    jabberwerx.Stanza.ERR_NOT_ACCEPTABLE = new jabberwerx.Stanza.ErrorInfo("modify", "{urn:ietf:params:xml:ns:xmpp-stanzas}not-acceptable");
    jabberwerx.Stanza.ERR_NOT_ALLOWED = new jabberwerx.Stanza.ErrorInfo("cancel", "{urn:ietf:params:xml:ns:xmpp-stanzas}not-allowed");
    jabberwerx.Stanza.ERR_NOT_AUTHORIZED = new jabberwerx.Stanza.ErrorInfo("auth", "{urn:ietf:params:xml:ns:xmpp-stanzas}not-authorized");
    jabberwerx.Stanza.ERR_SERVICE_UNAVAILABLE = new jabberwerx.Stanza.ErrorInfo("wait", "{urn:ietf:params:xml:ns:xmpp-stanzas}service-unavailable");
    jabberwerx.Stanza.ERR_REMOTE_SERVER_TIMEOUT = new jabberwerx.Stanza.ErrorInfo("wait", "{urn:ietf:params:xml:ns:xmpp-stanzas}remote-server-timeout");
    jabberwerx.Stanza.createWithNode = function (node) {
        if (!jabberwerx.isElement(node)) {
            throw new TypeError("node must be an element");
        }
        var stanza;
        switch (node.nodeName) {
            case "iq":
                stanza = new jabberwerx.IQ(node);
                break;
            case "message":
                stanza = new jabberwerx.Message(node);
                break;
            case "presence":
                stanza = new jabberwerx.Presence(node);
                break;
            default:
                stanza = new jabberwerx.Stanza(node);
                break;
        }
        return stanza;
    };
    jabberwerx.IQ = jabberwerx.Stanza.extend({
        init: function (packet) {
            if (packet) {
                if (!jabberwerx.isElement(packet)) {
                    throw new TypeError("packet must be an &lt;iq/&gt; Element");
                }
                if (packet.nodeName != "iq") {
                    throw new TypeError("packet must be an &lt;iq/&gt; Element");
                }
            }
            this._super(packet || "{jabber:client}iq");
        },
        getQuery: function () {
            return jabberwerx.$(this.getNode()).children(":not(error)").get(0);
        },
        setQuery: function (payload) {
            if (payload && !jabberwerx.isElement(payload)) {
                throw new TypeError("Node must be an element");
            }
            var q = jabberwerx.$(this.getNode()).children(":not(error)");
            q.remove();
            if (payload) {
                new jabberwerx.NodeBuilder(this.getNode()).node(payload);
            }
        },
        reply: function (payload) {
            var retval = this.swap();
            try {
                jabberwerx.$(retval.getNode()).empty();
            } catch (ex) {
                var n = retval.getNode();
                for (var idx = 0; idx < n.childNodes.length; idx++) {
                    n.removeChild(n.childNodes[idx]);
                }
            }
            if (payload) {
                var builder = new jabberwerx.NodeBuilder(retval.getNode());
                if (jabberwerx.isElement(payload)) {
                    builder.node(payload);
                } else if (typeof (payload) == "string") {
                    builder.xml(payload);
                } else {
                    throw new TypeError("payload must be an Element or XML representation of an Element");
                }
            }
            retval.setType("result");
            return retval;
        }
    }, "jabberwerx.IQ");
    jabberwerx.Message = jabberwerx.Stanza.extend({
        init: function (packet) {
            if (packet) {
                if (!jabberwerx.isElement(packet)) {
                    throw new TypeError("Must be a <message/> element");
                }
                if (packet.nodeName != "message") {
                    throw new TypeError("Must be a <message/> element");
                }
            }
            this._super(packet || "{jabber:client}message");
        },
        getBody: function () {
            return this._getChildText("body");
        },
        setBody: function (body) {
            this.setHTML();
            this._setChildText("body", body || undefined);
        },
        getHTML: function () {
            var ret = jabberwerx.$(this.getNode()).find("html[xmlns='http://jabber.org/protocol/xhtml-im']>body[xmlns='http://www.w3.org/1999/xhtml']:first");
            if (ret.length && !this._isSanitized) {
                this.setHTML(ret.children().get());
                return this.getHTML();
            }
            return ret.length ? ret.get(0) : null;
        },
        setHTML: function (html) {
            var htmlNode;
            if (html && !jabberwerx.util.isString(html) && !jabberwerx.isElement(html) && (!jabberwerx.$.isArray(html) || !html.length)) {
                throw new TypeError("html must be a string, DOM or an array");
            }
            this._isSanitized = false;
            var htmlNode = jabberwerx.$(this.getNode()).find("html[xmlns='http://jabber.org/protocol/xhtml-im']");
            if (htmlNode) {
                htmlNode.remove();
            }
            this._setChildText("body", null);
            if (html) {
                htmlNode = html;
                if (jabberwerx.util.isString(html)) {
                    try {
                        htmlNode = jabberwerx.util.unserializeXML(html);
                    } catch (ex) {
                        jabberwerx.util.debug.log("setHTML could not parse: '" + html + "'");
                        throw ex;
                    }
                }
                if (jabberwerx.$.isArray(html) || htmlNode.nodeName != "body") {
                    var newBodyBuilder = new jabberwerx.NodeBuilder("{http://www.w3.org/1999/xhtml}body");
                    if (jabberwerx.$.isArray(html)) {
                        jabberwerx.$.each(html, function (index, item) {
                            newBodyBuilder.node(item);
                        });
                    } else if (jabberwerx.util.isString(html)) {
                        newBodyBuilder.xml(html);
                    } else {
                        newBodyBuilder.node(html);
                    }
                    html = newBodyBuilder.data;
                }
                jabberwerx.xhtmlim.sanitize(html);
                html = new jabberwerx.NodeBuilder("{http://jabber.org/protocol/xhtml-im}html").node(html).parent.data;
                this._setChildText("body", jabberwerx.$(html).text());
                jabberwerx.$(this.getNode()).append(html);
                this._isSanitized = true;
            }
        },
        getSubject: function () {
            return this._getChildText("subject");
        },
        setSubject: function (subject) {
            this._setChildText("subject", subject || undefined);
        },
        getThread: function () {
            return this._getChildText("thread") || null;
        },
        setThread: function (thread) {
            this._setChildText("thread", thread || undefined);
        },
        _isSanitized: false
    }, "jabberwerx.Message");
    jabberwerx.Message.translate = function (content, displayName) {
        var xep0245Found = false;
        var textNodeFound = false;
        var translatedContent = null;
        var findTextNodes = function (element, displayName) {
            if (!xep0245Found && !textNodeFound) {
                if (jabberwerx.isText(element)) {
                    var replace = translateSlashMe(jabberwerx.$(element).text(), displayName);
                    if (xep0245Found) {
                        jabberwerx.$(element).replaceWith(replace);
                    } else {
                        textNodeFound = true;
                    }
                } else if (element.hasChildNodes()) {
                    for (var i = 0; i < element.childNodes.length; i++) {
                        findTextNodes(element.childNodes[i], displayName);
                    }
                }
            }
        };
        var translateSlashMe = function (rawText, displayName) {
            var slashMe = "/me ";
            if (rawText.substring(0, slashMe.length).toLowerCase() == slashMe) {
                xep0245Found = true;
                return ("* " + displayName + " " + rawText.substring(slashMe.length));
            }
            return rawText;
        };
        if (typeof content == "string") {
            content = translateSlashMe(content, displayName);
        } else if (jabberwerx.isElement(content)) {
            for (var i = 0; i < content.childNodes.length; i++) {
                if (!xep0245Found && !textNodeFound) {
                    findTextNodes(content.childNodes[i], displayName);
                } else {
                    break;
                }
            }
        } else {
            throw new jabberwerx.Message.InvalidContentFormat();
        }
        if (xep0245Found) {
            translatedContent = content;
        }
        return translatedContent;
    };
    jabberwerx.Message.InvalidContentFormat = jabberwerx.util.Error.extend('The content parameter must be of type string or a jQuery object.');
    jabberwerx.Presence = jabberwerx.Stanza.extend({
        init: function (packet) {
            if (packet) {
                if (!jabberwerx.isElement(packet)) {
                    throw new TypeError("packet must be a &lt;presence/&gt; Element");
                }
                if (packet.nodeName != "presence") {
                    throw new TypeError("packet must be a &lt;presence/&gt; Element");
                }
            }
            this._super(packet || "{jabber:client}presence");
        },
        getPriority: function () {
            var pri = this._getChildText("priority");
            pri = (pri) ? parseInt(pri) : 0;
            return !isNaN(pri) ? pri : 0;
        },
        setPriority: function (pri) {
            if (pri !== undefined && pri !== null && typeof (pri) != "number") {
                throw new TypeError("new priority must be a number or undefined");
            }
            this._setChildText("priority", pri);
        },
        getShow: function () {
            return this._getChildText("show") || jabberwerx.Presence.SHOW_NORMAL;
        },
        setShow: function (show) {
            if (show && (show != jabberwerx.Presence.SHOW_AWAY && show != jabberwerx.Presence.SHOW_CHAT && show != jabberwerx.Presence.SHOW_DND && show != jabberwerx.Presence.SHOW_XA)) {
                throw new TypeError("show must be undefined or one of 'away', 'chat', 'dnd', or 'xa'");
            }
            this._setChildText("show", show || undefined);
        },
        getStatus: function () {
            return this._getChildText("status") || null;
        },
        setStatus: function (status) {
            this._setChildText("status", status || undefined);
        },
        compareTo: function (presence) {
            if (!(presence && presence instanceof jabberwerx.Presence)) {
                throw new TypeError("presence must be an instanceof jabberwerx.Presence");
            }
            var p1, p2;
            p1 = this.getPriority() || 0;
            p2 = presence.getPriority() || 0;
            if (p1 > p2) {
                return 1;
            } else if (p1 < p2) {
                return -1;
            }
            p1 = this.timestamp;
            p2 = presence.timestamp;
            if (p1 > p2) {
                return 1;
            } else if (p1 < p2) {
                return -1;
            }
            return 0;
        },
        setPresence: function (show, status, priority) {
            if (show) {
                this.setShow(show);
            }
            if (status) {
                this.setStatus(status);
            }
            if (priority !== undefined && priority !== null) {
                this.setPriority(priority);
            }
            return this;
        }
    }, "jabberwerx.Presence");
    jabberwerx.Presence.SHOW_AWAY = "away";
    jabberwerx.Presence.SHOW_CHAT = "chat";
    jabberwerx.Presence.SHOW_DND = "dnd";
    jabberwerx.Presence.SHOW_NORMAL = "";
    jabberwerx.Presence.SHOW_XA = "xa";
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/model/User.js*/
;
(function (jabberwerx) {
    jabberwerx.User = jabberwerx.Entity.extend({
        init: function (jid, cache) {
            this._super({
                jid: jid
            }, cache);
        }
    }, 'jabberwerx.User');
    jabberwerx.LocalUser = jabberwerx.User.extend({
        getDisplayName: function () {
            return this._displayName || jabberwerx.JID.unescapeNode(this.jid.getNode());
        }
    }, 'jabberwerx.LocalUser');
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/model/Stream.js*/
;
(function (jabberwerx) {
    jabberwerx.Stream = jabberwerx.JWModel.extend({
        init: function () {
            this.applyEvent("streamOpened");
            this.applyEvent("streamClosed");
            this.applyEvent("streamElementsReceived");
            this.applyEvent("streamElementsSent");
            this._recvQ = new jabberwerx.Stream.Queue();
            this._sendQ = new jabberwerx.Stream.Queue();
            this._xhrs = new jabberwerx.Stream.Queue();
            this._xhrSetup = {
                cache: false,
                xhr: this.invocation("_createXHR", jabberwerx.$.ajaxSettings.xhr),
                beforeSend: this.invocation("_prepareXHR"),
                complete: this.invocation("_handleXHR"),
                contentType: "text/xml",
                dataType: "text",
                global: false,
                processData: false,
                type: "POST"
            };
        },
        getProperties: function () {
            return jabberwerx.$.extend(true, {}, this._boshProps);
        },
        isOpen: function () {
            return this._opened;
        },
        isSecure: function () {
            return this._boshProps.secure || false;
        },
        getDomain: function () {
            return this._boshProps.domain || null;
        },
        getSessionID: function () {
            return this._boshProps.sid || null;
        },
        getTimeout: function () {
            return this._boshProps.timeout || 60;
        },
        open: function (params) {
            if (this.isOpen()) {
                throw new jabberwerx.Stream.AlreadyOpenError();
            }
            this._reset();
            this._boshProps = jabberwerx.$.extend({}, params || {});
            if (!this._boshProps.domain) {
                throw new TypeError("domain must be specified");
            }
            if (!this._boshProps.timeout) {
                this._boshProps.timeout = jabberwerx.Stream.DEFAULT_TIMEOUT;
            }
            if (!this._boshProps.wait) {
                this._boshProps.wait = jabberwerx.Stream.DEFAULT_WAIT;
            }
            var url = jabberwerx.Stream.URL_PARSER.exec(this._boshProps.httpBindingURL || "");
            if (!url) {
                throw new TypeError("httpBindingURL not specified correctly");
            }
            var myProto = jabberwerx.system.getLocation().protocol;
            if (!url[1]) {
                url[1] = myProto || "";
            } else if (myProto && url[1] != myProto) {
                jabberwerx.util.debug.warn("BOSH URL has different protocol than webserver: " + url[1] + " != " + myProto);
            }
            if (!url[2]) {
                url[2] = jabberwerx.system.getLocation().host || "";
            }
            if (!url[3]) {
                url[3] = "";
            }
            this._boshProps.networkAttempts = 0;
            this._storeConnectionInfo(url[1], url[2], url[3]);
            this._boshProps.operation = "open";
            this._sendRequest();
            this._boshProps.heartbeat = jabberwerx.system.setInterval(this.invocation("_heartbeat"), jabberwerx.Stream.HEARTBEAT_INTERVAL);
        },
        _storeConnectionInfo: function (protocol, hostPort, resource) {
            this._boshProps.httpBindingURL = protocol + "//" +
                hostPort + "/" +
                resource;
            this._boshProps.secure = this._boshProps.secure || (protocol == "https:");
            this._boshProps.crossSite = (jabberwerx.system.getLocation().protocol != protocol) || (jabberwerx.system.getLocation().host != hostPort);
        },
        reopen: function () {
            if (!this.isOpen()) {
                throw new jabberwerx.Stream.NotOpenError();
            }
            this._boshProps.opening = jabberwerx.system.setTimeout(this.invocation("_handleOpen"), 2000);
            this._boshProps.operation = "reopen";
            this._sendRequest({
                restart: true
            });
        },
        close: function () {
            if (this.isOpen() && this._boshProps && !this._boshProps.networkBackoff) {
                delete this._boshProps.resend;
                delete this._boshProps.networkBackoff;
                this._boshProps.networkAttempts = 0;
                this._sendRequest({
                    type: "terminate"
                }, this._sendQ.empty());
            } else {
                this._reset();
            }
        },
        send: function (elem) {
            if (!jabberwerx.isElement(elem)) {
                throw new TypeError("elem must be a DOM element");
            }
            if (!this.isOpen()) {
                throw new jabberwerx.Stream.NotOpenError();
            }
            this._sendQ.enque(elem);
        },
        _sendRequest: function (props, data) {
            props = jabberwerx.$.extend({}, this._boshProps, props);
            data = data || [];
            var rid = 0,
                body;
            var resend = false;
            if (props.resend) {
                try {
                    body = jabberwerx.util.unserializeXML(props.resend.body);
                    resend = true;
                } catch (ex) {
                    jabberwerx.util.debug.log("Exception: " + ex.message + " trying to parse resend body: " + props.resend.body);
                    delete props.resend;
                    return;
                }
                rid = props.resend.id;
                data = jabberwerx.$(body).children();
                props.rid = rid + 1;
                delete props.resend;
            } else {
                if (this._xhrs.size() > 1 && data.length) {
                    this._sendQ.enque(data);
                    return;
                }
                if (!props.rid) {
                    var initial;
                    initial = Math.floor(Math.random() * 4294967296);
                    initial = (initial <= 32768) ? initial + 32768 : initial;
                    props.rid = initial;
                } else if (this._boshProps.rid >= 9007199254740991) {
                    var err = new jabberwerx.Stream.ErrorInfo("{urn:ietf:params:xml:ns:xmpp-streams}policy-violation", "BOSH maximum rid exceeded");
                    this._handleClose(err.getNode());
                    return;
                }
                rid = props.rid++;
                body = new jabberwerx.NodeBuilder("{http://jabber.org/protocol/httpbind}body");
                if (props.type) {
                    body.attribute("type", props.type);
                }
                locale = jabberwerx.system.getLocale();
                if (!props.sid) {
                    if (data.length) {
                        this._sendQ.enque(data);
                        data = [];
                    }
                    if (locale) {
                        body.attribute("xml:lang", locale);
                    }
                    body.attribute("xmlns:xmpp", "urn:xmpp:xbosh").attribute("hold", "1").attribute("ver", "1.9").attribute("to", props.domain).attribute("wait", props.wait || 30).attribute("{urn:xmpp:xbosh}xmpp:version", "1.0");
                    if (props.jid) {
                        body.attribute("from", jabberwerx.JID.asJID(props.jid).getBareJIDString());
                    }
                } else {
                    body.attribute("sid", props.sid);
                    if (props.restart) {
                        if (locale) {
                            body.attribute("xml:lang", locale);
                        }
                        body.attribute("{urn:xmpp:xbosh}xmpp:restart", "true").attribute("to", props.domain);
                        this._boshProps.restart = true;
                    }
                }
                body.attribute("rid", rid);
                if (data.length) {
                    for (var idx = 0; idx < data.length; idx++) {
                        body.node(data[idx]);
                    }
                }
                body = body.data;
            }
            if (!props.requests) {
                props.requests = new jabberwerx.Stream.Queue();
            }
            props.requests.enque({
                id: rid,
                body: jabberwerx.util.serializeXML(body)
            });
            var setup = {
                async: true,
                data: props.requests.tail().body,
                timeout: props.wait * 1000 + 5000,
                url: props.httpBindingURL
            };
            setup = jabberwerx.$.extend(setup, this._xhrSetup);
            if (this._boshProps.crossSite && !jabberwerx.$.support.cors && typeof (XDomainRequest) != "undefined") {
                setup.crossDomain = false;
            }
            if (this._boshProps) {
                this._boshProps = props;
            }
            if (!resend && data.length) {
                this.event("streamElementsSent").trigger(jabberwerx.$(data));
            }
            var xhr = jabberwerx.$.ajax(setup);
        },
        _createXHR: function (xhrFn) {
            xhrFn = jabberwerx.$.ajaxSettings.xhr;
            var xhr = null;
            if (this._boshProps.crossSite && !jabberwerx.$.support.cors && typeof (XDomainRequest) !== "undefined") {
                var that = this;
                var done = this._boshProps.type == "terminate";
                var xdr = new XDomainRequest();
                var xhr = {
                    readyState: 0,
                    abort: function () {
                        xdr.abort();
                        this.readyState = 0;
                    },
                    open: function () {
                        xdr.open.apply(xdr, arguments);
                        this.readyState = 1;
                        this.onreadystatechange && this.onreadystatechange.call(this);
                        this.async = arguments[2] || true;
                    },
                    send: function () {
                        this.readyState = 2;
                        this.onreadystatechange && this.onreadystatechange.call(this);
                        xdr.send.apply(xdr, arguments);
                    },
                    setRequestHeader: function () { },
                    getResponseHeader: function () { },
                    getAllResponseHeaders: function () { }
                };
                var onreadyCB = function (status) {
                    xhr.onreadystatechange && xhr.onreadystatechange.call(this, status);
                };
                xdr.onload = function () {
                    xhr.responseText = xdr.responseText;
                    xhr.status = 200;
                    xhr.readyState = 4;
                    onreadyCB();
                };
                xdr.onprogress = function () {
                    xhr.readyState = 3;
                    onreadyCB();
                };
                xdr.onerror = function () {
                    xhr.readyState = 4;
                    xhr.status = 500;
                    onreadyCB("error");
                };
                xdr.ontimeout = function () {
                    xhr.readyState = 4;
                    xhr.status = 408;
                    onreadyCB("timeout");
                };
            } else {
                xhr = xhrFn();
            }
            return xhr;
        },
        _heartbeat: function () {
            var elems = this._recvQ.empty();
            if (elems.length) {
                elems = jabberwerx.$(elems);
                this.event("streamElementsReceived").trigger(elems);
            }
            if (this._boshProps.networkBackoff) {
                this._boshProps.networkBackoff--;
                return;
            }
            if (!this.isOpen() && !this._boshProps.operation) {
                return;
            }
            if (!this._sendQ.size() && this._xhrs.size() && !this._boshProps.resend) {
                return;
            }
            this._sendRequest({}, this._sendQ.empty());
        },
        _prepareXHR: function (xhr, settings) {
            this._xhrs.enque(xhr);
        },
        _handleXHR: function (xhr, status) {
            if (this._dehydrated || !this._xhrs || (this._xhrs.size() === 0)) {
                return;
            }
            this._xhrs.deque(xhr);
            var failFn = function (err, resend) {
                var boshProps = this._boshProps;
                if (!boshProps) {
                    return;
                }
                if (boshProps.type == "terminate") {
                    this._handleClose();
                    return;
                }
                if (boshProps.networkAttempts++ < 3) {
                    jabberwerx.util.debug.log("network timeout retry " +
                        boshProps.networkAttempts);
                    if (resend) {
                        resend = boshProps.requests.pop();
                    }
                    if (resend) {
                        boshProps.resend = resend;
                    }
                    boshProps.networkBackoff = jabberwerx.Stream.NETWORK_BACKOFF_COUNT * Math.pow(boshProps.networkAttempts, 2);
                    return;
                }
                this._handleClose(err && err.getNode());
            };
            if (status != "success") {
                var err;
                switch (status) {
                    case "timeout":
                        err = jabberwerx.Stream.ERR_REMOTE_SERVER_TIMEOUT;
                        break;
                    case "error":
                        err = jabberwerx.Stream.ERR_SERVICE_UNAVAILABLE;
                        break;
                    case "parseerror":
                        err = jabberwerx.Stream.ERR_XML_NOT_WELL_FORMED;
                        break;
                    default:
                        err = jabberwerx.Stream.ERR_UNDEFINED_CONDITION;
                        break;
                }
                failFn.call(this, err, true);
                return;
            }
            var dom = xhr.responseText;
            if (!dom) {
                failFn.call(this, jabberwerx.Stream.ERR_XML_NOT_WELL_FORMED);
                return;
            }
            try {
                dom = jabberwerx.util.unserializeXML(dom);
            } catch (ex) {
                failFn.call(this, jabberwerx.Stream.ERR_XML_NOT_WELL_FORMED);
                return;
            }
            if (!dom) {
                failFn.call(this, jabberwerx.Stream.ERR_XML_NOT_WELL_FORMED);
                return;
            }
            dom = jabberwerx.$(dom);
            if (!dom.is("body[xmlns='http://jabber.org/protocol/httpbind']")) {
                failFn.call(this, jabberwerx.Stream.ERR_SERVICE_UNAVAILABLE);
                return;
            }
            this._boshProps.networkAttempts = 0;
            if (this._boshProps && this._boshProps.requests) {
                this._boshProps.requests.deque();
            }
            var content = dom.children();
            if (!this._boshProps.sid) {
                var attr;
                attr = dom.attr("sid");
                if (attr) {
                    this._boshProps.sid = attr;
                }
                attr = dom.attr("wait");
                if (attr) {
                    this._boshProps.wait = parseInt(attr);
                }
                attr = dom.attr("inactivity");
                if (attr) {
                    this._boshProps.timeout = parseInt(attr);
                }
            }
            if (content.length) {
                var feats = null,
                    err = null;
                content = content.map(function () {
                    switch (this.nodeName) {
                        case "stream:features":
                            feats = this;
                            break;
                        case "stream:error":
                            err = this;
                            break;
                        default:
                            return this;
                    }
                    return null;
                });
                if (feats) {
                    this._handleOpen(feats);
                }
                if (content.length) {
                    this._recvQ.enque(content.get());
                }
                if (err) {
                    this._handleClose(err);
                    return;
                }
            }
            var err;
            switch (dom.attr("type") || this._boshProps.type) {
                case "terminate":
                    if (!this._boshProps.type) {
                        switch (dom.attr("condition") || "") {
                            case "":
                                err = null;
                                break;
                            case "bad-request":
                                err = jabberwerx.Stream.ERR_BAD_REQUEST;
                                break;
                            case "host-gone":
                                err = jabberwerx.Stream.ERR_SERVICE_UNAVAILABLE;
                                break;
                            case "other-request":
                                err = jabberwerx.Stream.ERR_CONFLICT;
                                break;
                            case "policy-violation":
                                err = jabberwerx.Stream.ERR_POLICY_VIOLATION;
                                break;
                            case "system-shutdown":
                                err = jabberwerx.Stream.ERR_SYSTEM_SHUTDOWN;
                                break;
                            case "see-other-uri":
                                var uri = dom.children("uri").text();
                                if (!uri || uri == "") {
                                    err = jabberwerx.Stream.ERR_XML_NOT_WELL_FORMED;
                                    break;
                                }
                                var uriParts = jabberwerx.Stream.URL_PARSER.exec(uri);
                                var protocol = uriParts[1];
                                var hostPort = uriParts[2];
                                var resource = uriParts[3];
                                var origParts = jabberwerx.Stream.URL_PARSER.exec(this._boshProps.httpBindingURL);
                                var origProtocol = origParts[1];
                                var origHostPort = origParts[2];
                                if (origProtocol == "http:") {
                                    var tmpOrigHostPort = "." + origHostPort;
                                    var tmpHostPort = "." + hostPort;
                                    var diff = tmpHostPort.length - tmpOrigHostPort.length;
                                    var validDomain = diff >= 0 && tmpHostPort.lastIndexOf(tmpOrigHostPort) === diff;
                                    if (!((protocol == origProtocol) && (validDomain))) {
                                        err = jabberwerx.Stream.ERR_POLICY_VIOLATION;
                                        break;
                                    }
                                } else if (origProtocol == "https:") {
                                    if ((!protocol || protocol == "") || (!hostPort || hostPort == "")) {
                                        err = jabberwerx.Stream.ERR_XML_NOT_WELL_FORMED;
                                        break;
                                    }
                                } else {
                                    err = jabberwerx.Stream.ERR_XML_NOT_WELL_FORMED;
                                    break;
                                }
                                this._storeConnectionInfo(protocol, hostPort, resource);
                                return;
                            default:
                                err = jabberwerx.Stream.ERR_UNDEFINED_CONDITION;
                                break;
                        }
                    }
                    this._handleClose(err && err.getNode());
                    return;
                case "error":
                    break;
            }
        },
        _handleOpen: function (feats) {
            if (this._boshProps.opening) {
                jabberwerx.system.clearTimeout(this._boshProps.opening);
                delete this._boshProps.opening;
            }
            delete this._boshProps.restart;
            delete this._boshProps.operation;
            if (!jabberwerx.isElement(feats)) {
                feats = new jabberwerx.NodeBuilder("{http://etherx.jabber.org/streams}stream:features");
                feats.element("{urn:ietf:params:xml:ns:xmpp-bind}bind");
                feats.element("{urn:ietf:params:xml:ns:xmpp-session}session");
                feats = feats.data;
            }
            var that = this;
            jabberwerx.system.setTimeout(function () {
                that._opened = true;
                that.event("streamOpened").trigger(feats);
            }, 1);
        },
        _handleClose: function (err) {
            var open = this.isOpen();
            var oper = this._boshProps.operation;
            this._reset();
            if (open || oper) {
                var that = this;
                jabberwerx.system.setTimeout(function () {
                    that.event("streamClosed").trigger(err);
                }, 10);
            }
        },
        _reset: function () {
            jabberwerx.system.clearInterval(this._boshProps.heartbeat);
            this._opened = false;
            this._boshProps = {};
            this._sendQ.empty();
            this._xhrs.empty();
            this._recvQ.empty();
        },
        willBeSerialized: function () {
            this._dehydrated = true;
            if (this.isOpen()) {
                jabberwerx.system.clearInterval(this._boshProps.heartbeat);
            }
            if (this._boshProps) {
                if (this._boshProps.networkAttempts) {
                    this._boshProps.networkAttempts--;
                }
                this._boshProps.networkBackoff = jabberwerx.Stream.NETWORK_BACKOFF_COUNT;
            }
            var elems;
            elems = this._sendQ.empty();
            elems = jabberwerx.$.map(elems, function () {
                return jabberwerx.util.serializeXML(this);
            });
            this._sendQ.enque(elems);
            elems = this._recvQ.empty();
            elems = jabberwerx.$.map(elems, function () {
                return jabberwerx.util.serializeXML(this);
            });
            this._recvQ.empty();
            delete this._xhrs;
        },
        wasUnserialized: function () {
            this._xhrs = new jabberwerx.Stream.Queue();
            var elems;
            elems = this._sendQ.empty();
            elems = jabberwerx.$.map(elems, function () {
                return jabberwerx.util.unserializeXML(String(this));
            });
            this._sendQ.enque(elems);
            delete this._dehydrated;
            if (this.isOpen()) {
                this._boshProps.resend = this._boshProps.requests.deque();
                this._boshProps.heartbeat = jabberwerx.system.setInterval(this.invocation("_heartbeat"), jabberwerx.Stream.HEARTBEAT_INTERVAL);
            }
        },
        _opened: false,
        _boshProps: {},
        _xhrSetup: {},
        _xhrs: null,
        _sendQ: null,
        _recvQ: null
    }, "jabberwerx.Stream");
    jabberwerx.Stream.Queue = jabberwerx.JWModel.extend({
        init: function () {
            this._super();
        },
        head: function () {
            return this._q || null;
        },
        tail: function () {
            return this._q[this._q.length - 1] || null;
        },
        enque: function (item) {
            for (var idx = 0; idx < arguments.length; idx++) {
                item = arguments[idx];
                var tmp = [this._q.length, 0].concat(item);
                this._q.splice.apply(this._q, tmp);
            }
            return this.size();
        },
        deque: function (item) {
            if (item !== undefined) {
                var idx = jabberwerx.$.inArray(item, this._q);
                if (idx != -1) {
                    this._q.splice(idx, 1);
                } else {
                    item = null;
                }
            } else {
                item = this._q.shift() || null;
            }
            return item;
        },
        pop: function () {
            return this._q.pop() || null;
        },
        find: function (cmp) {
            if (!jabberwerx.$.isFunction(cmp)) {
                throw new TypeError("comparator must be a function");
            }
            var result = null;
            jabberwerx.$.each(this._q, function () {
                result = cmp(this);
                return (result !== undefined);
            });
            return result;
        },
        empty: function () {
            var q = this._q;
            this._q = [];
            return q;
        },
        size: function () {
            return this._q.length;
        },
        _q: []
    }, "jabberwerx.Stream.Queue");
    jabberwerx.Stream.URL_PARSER = /^(?:([0-9a-zA-Z]+\:)\/\/)?(?:([^\/]+))?(?:\/(.*))?$/;
    jabberwerx.Stream.DEFAULT_TIMEOUT = 300;
    jabberwerx.Stream.DEFAULT_WAIT = 30;
    jabberwerx.Stream.HEARTBEAT_INTERVAL = 10;
    jabberwerx.Stream.NETWORK_BACKOFF_COUNT = 50;
    jabberwerx.Stream.NotOpenError = jabberwerx.util.Error.extend("Stream not open");
    jabberwerx.Stream.AlreadyOpenError = jabberwerx.util.Error.extend("Stream is already open");
    jabberwerx.Stream.ErrorInfo = jabberwerx.JWModel.extend({
        init: function (cond, text) {
            this._super();
            this.condition = cond || "{urn:ietf:params:xml:ns:xmpp-streams}undefined-condition";
            this.text = text || "";
            this.toString = this._toErrString;
        },
        getNode: function () {
            var builder = new jabberwerx.NodeBuilder("{http://etherx.jabber.org/streams}stream:error");
            builder.element(this.condition);
            if (this.text) {
                builder.element("{urn:ietf:params:xml:ns:xmpp-streams}text").text(this.text);
            }
            return builder.data;
        },
        wasUnserialized: function () {
            this.toString = this._toErrString;
        },
        _toErrString: function () {
            return this.condition;
        },
        condition: "",
        text: ""
    }, "jabberwerx.Stream.ErrorInfo");
    jabberwerx.Stream.ErrorInfo.createWithNode = function (node) {
        if (!jabberwerx.isElement(node)) {
            throw new TypeError("node must be an Element");
        }
        node = jabberwerx.$(node);
        var cond = node.children("[xmlns='urn:ietf:params:xml:ns:xmpp-streams']:not(text)").map(function () {
            return "{urn:ietf:params:xml:ns:xmpp-streams}" + this.nodeName;
        }).get(0);
        var text = node.children("text[xmlns='urn:ietf:params:xml:ns:xmpp-streams']").text();
        return new jabberwerx.Stream.ErrorInfo(cond, text);
    };
    jabberwerx.Stream.ERR_BAD_REQUEST = new jabberwerx.Stream.ErrorInfo("{urn:ietf:params:xml:ns:xmpp-streams}bad-request");
    jabberwerx.Stream.ERR_CONFLICT = new jabberwerx.Stream.ErrorInfo("{urn:ietf:params:xml:ns:xmpp-streams}conflict");
    jabberwerx.Stream.ERR_POLICY_VIOLATION = new jabberwerx.Stream.ErrorInfo("{urn:ietf:params:xml:ns:xmpp-streams}policy-violation");
    jabberwerx.Stream.ERR_REMOTE_CONNECTION_FAILED = new jabberwerx.Stream.ErrorInfo("{urn:ietf:params:xml:ns:xmpp-streams}remote-connection-failed");
    jabberwerx.Stream.ERR_REMOTE_SERVER_TIMEOUT = new jabberwerx.Stream.ErrorInfo("{urn:ietf:params:xml:ns:xmpp-streams}remote-server-timeout");
    jabberwerx.Stream.ERR_SERVICE_UNAVAILABLE = new jabberwerx.Stream.ErrorInfo("{urn:ietf:params:xml:ns:xmpp-streams}service-unavailable");
    jabberwerx.Stream.ERR_SYSTEM_SHUTDOWN = new jabberwerx.Stream.ErrorInfo("{urn:ietf:params:xml:ns:xmpp-streams}system-shutdown");
    jabberwerx.Stream.ERR_UNDEFINED_CONDITION = new jabberwerx.Stream.ErrorInfo("{urn:ietf:params:xml:ns:xmpp-streams}undefined-condition");
    jabberwerx.Stream.ERR_XML_NOT_WELL_FORMED = new jabberwerx.Stream.ErrorInfo("{urn:ietf:params:xml:ns:xmpp-streams}xml-not-well-formed");
    jabberwerx.Stream.ERR_POLICY_VIOLATION = new jabberwerx.Stream.ErrorInfo("{urn:ietf:params:xml:ns:xmpp-streams}policy-violation");
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/model/Client.js*/
;
(function (jabberwerx) {
    jabberwerx.ClientEntityCache = jabberwerx.EntitySet.extend({
        init: function () {
            this._super();
        },
        register: function (entity) {
            if (!(entity && entity instanceof jabberwerx.Entity)) {
                throw new TypeError("entity is not an Entity");
            }
            var prev = this.entity(entity.jid, entity.node);
            if (prev && prev !== entity) {
                throw new jabberwerx.EntitySet.EntityAlreadyExistsError();
            } else if (!prev) {
                this.event("entityCreated").trigger(entity);
            }
            return this._super(entity);
        },
        unregister: function (entity) {
            var result = this._super(entity);
            if (result) {
                this.event("entityDestroyed").trigger(entity);
            }
            return result;
        },
        localUser: function (jid) {
            var ent = this.entity(jid);
            if (!(ent && ent instanceof jabberwerx.LocalUser)) {
                ent = new jabberwerx.LocalUser(jid, this);
                this.register(ent);
            }
            return ent;
        },
        server: function (serverDomain) {
            var ent = this.entity(serverDomain);
            if (!ent || !(ent instanceof jabberwerx.Server)) {
                ent = new jabberwerx.Server(serverDomain, this);
                this.register(ent);
            }
            return ent;
        },
        temporaryEntity: function (jid) {
            var ent = this.entity(jid);
            if (!(ent && ent instanceof jabberwerx.TemporaryEntity)) {
                ent = new jabberwerx.TemporaryEntity(jid, this);
                this.register(ent);
            }
            return ent;
        }
    }, "jabberwerx.ClientEntityCache");
    jabberwerx.Client = jabberwerx.JWModel.extend({
        init: function (resourceName) {
            this._super();
            this.applyEvent('clientStatusChanged');
            this.applyEvent('beforeIqSent');
            this.applyEvent('iqSent');
            this.applyEvent('beforeIqReceived');
            this.applyEvent('iqReceived');
            this.applyEvent('afterIqReceived');
            this.applyEvent('beforeMessageSent');
            this.applyEvent('messageSent');
            this.applyEvent('beforeMessageReceived');
            this.applyEvent('messageReceived');
            this.applyEvent('afterMessageReceived');
            this.applyEvent('beforePresenceSent');
            this.applyEvent('presenceSent');
            this.applyEvent('beforePresenceReceived');
            this.applyEvent('presenceReceived');
            this.applyEvent('afterPresenceReceived');
            this.applyEvent('reconnectCountdownStarted');
            this.applyEvent('reconnectCancelled');
            this.applyEvent('clientConnected');
            this.applyEvent('clientDisconnected');
            this.entitySet = new jabberwerx.ClientEntityCache();
            if (resourceName && typeof resourceName == 'string') {
                this.resourceName = resourceName;
            } else {
                this._autoResourceName = true;
            }
            this._stream = new jabberwerx.Stream();
            this.event('afterIqReceived').bindWhen('iq[type="get"] *[xmlns="urn:xmpp:time"]', this.invocation('_handleEntityTime'));
            this.event('afterIqReceived').bindWhen('iq[type="get"] *[xmlns="jabber:iq:time"]', this.invocation('_handleIqTime'));
            this.event('presenceReceived').bind(this.invocation('_handlePresenceIn'));
        },
        destroy: function () {
            jabberwerx.$.each(this.controllers, function () {
                this.destroy();
            });
            this._super();
        },
        _setStreamHandler: function (evt, funcName) {
            this._clearStreamHandler(evt);
            this._streamHandlers[evt] = funcName;
            this._stream.event(evt).bind(this.invocation(this._streamHandlers[evt]));
        },
        _clearStreamHandler: function (evt) {
            if (this._streamHandlers[evt] !== undefined) {
                this._stream.event(evt).unbind(this.invocation(this._streamHandlers[evt]));
                delete this._streamHandlers[evt];
            }
        },
        _clearStreamHandlers: function () {
            this._clearStreamHandler('streamOpened');
            this._clearStreamHandler('streamClosed');
            this._clearStreamHandler('streamElementsReceived');
            this._clearStreamHandler('streamElementsSent');
            this._streamHandlers = {};
        },
        _newConnectParams: function (cjid, password, arg) {
            cjid = jabberwerx.JID.asJID(cjid);
            return {
                jid: cjid,
                password: password,
                username: cjid.getNode(),
                domain: cjid.getDomain(),
                resource: this.resourceName,
                httpBindingURL: arg.httpBindingURL || jabberwerx._config.httpBindingURL,
                secure: arg.unsecureAllowed || jabberwerx._config.unsecureAllowed || false,
                timeout: arg.timeout || null,
                wait: arg.wait || null,
                arg: arg
            };
        },
        connect: function (jid, password, arg) {
            var __createEntities = function (client) {
                var user;
                jabberwerx.$.each(client.entitySet.toArray(), function () {
                    if (this instanceof jabberwerx.LocalUser) {
                        if (client._connectParams.jid.equals(this.jid)) {
                            user = this;
                        } else {
                            this.remove();
                        }
                    }
                });
                client.connectedUser = user || client.entitySet.localUser(client._connectParams.jid);
                client._setFullJid();
                var server;
                jabberwerx.$.each(client.entitySet.toArray(), function () {
                    if (this instanceof jabberwerx.Server) {
                        if (client._connectParams.jid.getDomain() == this.jid.getDomain()) {
                            server = this;
                        } else {
                            this.remove();
                        }
                    }
                });
                client.connectedServer = server || client.entitySet.server(client._connectParams.jid.getDomain());
            }
            var __bindCallbacks = function (client) {
                var successCB = client._connectParams.arg.successCallback;
                var errorCB = client._connectParams.arg.errorCallback;
                if (successCB || errorCB) {
                    var fn = function (evt) {
                        var evtCon = (evt.data.next == jabberwerx.Client.status_connected);
                        var evtDiscon = (evt.data.next == jabberwerx.Client.status_disconnected);
                        if (evtCon || evtDiscon) {
                            client.event('clientStatusChanged').unbind(fn);
                            if (successCB && evtCon) {
                                successCB(client);
                            } else if (errorCB && evt.data.error && evtDiscon) {
                                errorCB(evt.data.error);
                            }
                        }
                    };
                    client.event('clientStatusChanged').bind(fn);
                }
            }
            if (this.clientStatus != jabberwerx.Client.status_disconnected) {
                jabberwerx.util.debug.log("client not disconnected!");
                return;
            }
            if (!arg) {
                arg = {};
            }
            this.cancelReconnect();
            this._clearStreamHandlers();
            this._stream.close();
            try {
                var cjid = jabberwerx.JID.asJID(jid);
                if (!cjid.getNode()) {
                    arg.register = true;
                    cjid = new jabberwerx.JID({
                        domain: cjid.getDomain(),
                        node: "CAXL_" + jabberwerx.util.crypto.generateUUID()
                    });
                    if (!password) {
                        password = jabberwerx.util.crypto.b64_sha1(jabberwerx.util.crypto.generateUUID());
                    }
                }
                this._connectParams = this._newConnectParams(cjid, password, arg);
                this._openStream();
                __createEntities(this);
                __bindCallbacks(this);
                if (this._connectParams.arg.reconnecting) {
                    this.setClientStatus(jabberwerx.Client.status_reconnecting);
                    this._connectParams.arg.reconnecting = false;
                } else {
                    this.setClientStatus(jabberwerx.Client.status_connecting);
                }
                this._connectionAttempts++;
            } catch (ex) {
                this._connectParams = {};
                throw new jabberwerx.Client.ConnectionError(ex.message || 'invalid connection information');
            }
        },
        _filterStreamOpts: function (cparams) {
            cparams = cparams || {};
            return {
                jid: cparams.jid,
                domain: cparams.domain,
                timeout: cparams.timeout,
                wait: cparams.wait,
                secure: cparams.secure,
                httpBindingURL: cparams.httpBindingURL
            };
        },
        _openStream: function () {
            if (this._connectParams.arg.register) {
                this._setStreamHandler('streamOpened', '_handleRegistrationOpened');
            } else {
                this._setStreamHandler('streamOpened', '_handleAuthOpened');
            }
            this._setStreamHandler('streamClosed', '_handleClosed');
            var streamOpts = this._filterStreamOpts(this._connectParams);
            try {
                this._stream.open(streamOpts);
            } catch (ex) {
                this._clearStreamHandlers();
                throw ex;
            }
        },
        _handleRegistrationOpened: function () {
            try {
                this._clearStreamHandler('streamOpened');
                var registerIQ = new jabberwerx.IQ();
                registerIQ.setType("set");
                registerIQ.setID(jabberwerx.Stanza.generateID());
                var builder = new jabberwerx.NodeBuilder('{jabber:iq:register}query');
                builder = builder.element("username").text(this._connectParams.username).parent;
                builder = builder.element("password").text(this._connectParams.password).parent;
                registerIQ.setQuery(builder.data);
                this._setStreamHandler('streamElementsReceived', '_handleRegisterElements');
                this._stream.send(registerIQ.getNode());
            } catch (ex) {
                this._handleConnectionException(ex);
            }
        },
        _handleRegisterElements: function (elem) {
            try {
                this._clearStreamHandler('streamElementsReceived');
                var errNode = jabberwerx.$(elem.data).find("error");
                if (errNode && errNode.length != 0) {
                    this._connectParams.arg.register = false;
                    this._handleConnectionException(errNode);
                } else {
                    this._stream.close();
                }
            } catch (ex) {
                this._handleConnectionException(ex);
            }
        },
        _handleAuthOpened: function (feats) {
            try {
                this._clearStreamHandler('streamOpened');
                this._connectParams.feats = jabberwerx.$(feats.data);
                var supportedMechs = []
                jabberwerx.$(feats.data).find("mechanisms[xmlns='urn:ietf:params:xml:ns:xmpp-sasl']>mechanism").each(function () {
                    supportedMechs.push(jabberwerx.$(this).text().toUpperCase());
                });
                this._authMech = jabberwerx.sasl.createMechanismFor(this, supportedMechs);
                if (!this._authMech) {
                    throw new jabberwerx.Client.ConnectionError("{urn:ietf:params:xml:ns:xmpp-sasl}mechanism-too-weak");
                }
                this._setStreamHandler('streamElementsReceived', '_handleAuthElements');
                this._handleAuthElements();
            } catch (ex) {
                this._handleConnectionException(ex);
            }
        },
        _handleAuthElements: function (elem) {
            try {
                elem = elem && jabberwerx.$(elem.data).get(0);
                elem = this._authMech.evaluate(elem);
                if (elem) {
                    this._stream.send(elem);
                } else {
                    var authComplete = this._authMech.complete;
                    this._authMech = undefined;
                    delete this._authMech;
                    if (!authComplete) {
                        throw new jabberwerx.SASLMechanism.SASLAuthFailure();
                    } else {
                        this._setStreamHandler('streamOpened', '_handleBindOpened');
                        this._stream.reopen();
                    }
                }
            } catch (ex) {
                this._handleConnectionException(ex);
            }
            return true;
        },
        _handleBindOpened: function (feats) {
            try {
                this._clearStreamHandler('streamOpened');
                this._connectParams.bindJID = null;
                feats = jabberwerx.$(feats.data);
                this._connectParams.feats = feats;
                if (feats.find("bind[xmlns='urn:ietf:params:xml:ns:xmpp-bind']").length > 0) {
                    var bindIQ = new jabberwerx.IQ();
                    bindIQ.setType("set");
                    bindIQ.setID(jabberwerx.Stanza.generateID());
                    var builder = new jabberwerx.NodeBuilder('{urn:ietf:params:xml:ns:xmpp-bind}bind');
                    if (this.resourceName) {
                        builder = builder.element("resource").text(this._connectParams.resource).parent;
                    }
                    bindIQ.setQuery(builder.data);
                    this._setStreamHandler("streamElementsReceived", "_handleBindElements");
                    this._stream.send(bindIQ.getNode());
                } else {
                    this._handleConnected();
                }
            } catch (ex) {
                this._handleConnectionException(ex);
            }
        },
        _handleBindElements: function (elements) {
            try {
                var ele = jabberwerx.$(elements.data);
                var newjid = ele.find("bind>jid");
                if (newjid.length > 0) {
                    this._connectParams.bindJID = jabberwerx.$(newjid).text();
                    var jid = jabberwerx.JID.asJID(this._connectParams.bindJID);
                    this.resourceName = jid.getResource();
                    this._handleConnected();
                } else {
                    this._handleConnectionException(ele.children("error").get(0));
                }
            } catch (ex) {
                this._handleConnectionException(ex);
            }
        },
        _handleClosed: function (err) {
            var msg = 'closed: ' + (err && err.data ? jabberwerx.util.serializeXML(err.data) : 'no error');
            jabberwerx.util.debug.log(msg);
            if (this._connectParams.arg.register) {
                this._connectParams.arg.register = false;
                jabberwerx.system.setTimeout(this.invocation("_openStream"), 500);
            } else {
                this._disconnected(err.data);
            }
        },
        _handleConnectionException: function (ex) {
            this._clearStreamHandlers();
            try {
                this._stream.close();
            } catch (e) { };
            var n = this._exceptionToErrorNode(ex);
            jabberwerx.util.debug.log("Exception during connection: " + jabberwerx.util.serializeXML(n));
            this._disconnected(n);
        },
        _exceptionToErrorNode: function (ex) {
            if (jabberwerx.isElement(ex)) {
                return ex;
            }
            var err = new jabberwerx.NodeBuilder("error");
            if (ex instanceof jabberwerx.SASLMechanism.SASLAuthFailure) {
                err.element(ex.message);
            } else if (ex instanceof TypeError) {
                err.element("{urn:ietf:params:xml:ns:xmpp-stanzas}bad-request");
                if (ex.message) {
                    err.element("text").text(ex.message);
                }
            } else {
                var errNode = jabberwerx.$(ex).find("conflict");
                if (errNode && errNode.length != 0) {
                    var ns = jabberwerx.$(errNode).attr("xmlns");
                    err.element("{" + ns + "}conflict");
                } else {
                    var emsg = (ex && ex.message) ? ex.message : "{urn:ietf:params:xml:ns:xmpp-stanzas}internal-server-error";
                    try {
                        err.element(emsg);
                    } catch (e) {
                        err.element("{urn:ietf:params:xml:ns:xmpp-stanzas}internal-server-error");
                        err.element("text").text(emsg);
                    }
                }
            }
            return err.data;
        },
        disconnect: function () {
            if (this.isConnected()) {
                if (this._autoResourceName) {
                    this.resourceName = null;
                }
                this.setClientStatus(jabberwerx.Client.status_disconnecting);
                this._stream.close();
                this._connectionAttempts = 0;
            }
        },
        isConnected: function () {
            if (this._connectedRendezvous) {
                return true;
            }
            return (this.clientStatus == jabberwerx.Client.status_connected && this._stream.isOpen());
        },
        setClientStatus: function (status, error, cb) {
            var prev = this.clientStatus;
            this.clientStatus = status;
            if (prev && (prev != status)) {
                var data = {
                    previous: prev,
                    next: status,
                    error: error
                };
                this.event('clientStatusChanged').trigger(data, null, cb);
            } else if (cb != null) {
                cb();
            }
            jabberwerx.util.debug.log('client status: ' + this.getClientStatusString(status), 'clientStatus');
        },
        getClientStatusString: function (status) {
            switch (status) {
                case jabberwerx.Client.status_connected:
                    return jabberwerx._("Connected to {0} as {1}.", (this.connectedServer ? this.connectedServer.jid : jabberwerx._("(unknown)")), (this.connectedUser ? this.connectedUser.jid : jabberwerx._("(unknown)")));
                case jabberwerx.Client.status_connecting:
                    return jabberwerx._("Attempting to connect");
                case jabberwerx.Client.status_error:
                    return jabberwerx._("Connection error");
                case jabberwerx.Client.status_disconnecting:
                    return jabberwerx._("Disconnecting");
                case jabberwerx.Client.status_reconnecting:
                    return jabberwerx._("Reconnecting");
                default:
                    return jabberwerx._("Disconnected");
            }
        },
        getCurrentPresence: function (primary) {
            var me = this.connectedUser;
            return (me && (primary ? me.getPrimaryPresence() : me.getResourcePresence(this.resourceName))) || null;
        },
        sendStanza: function (rootName, type, to, content) {
            var s;
            if (rootName instanceof jabberwerx.Stanza) {
                s = rootName.clone();
            } else if (jabberwerx.isElement(rootName)) {
                s = jabberwerx.Stanza.createWithNode(rootName);
            } else {
                s = new jabberwerx.Stanza(rootName);
                if (to) {
                    s.setTo(to.toString());
                }
                if (type) {
                    s.setType(type.toString());
                }
                if (content) {
                    if (typeof content == 'string') {
                        try {
                            content = jabberwerx.util.unserializeXML(content);
                        } catch (ex) {
                            jabberwerx.util.debug.log("sendStanza could not parse: '" + content + "'");
                            throw ex;
                        }
                    }
                    new jabberwerx.NodeBuilder(s.getNode()).node(content);
                }
                s = jabberwerx.Stanza.createWithNode(s.getNode());
            }
            type = s.pType();
            this.event('before' + type + 'Sent').trigger(s);
            this._stream.send(s.getNode());
            if (s instanceof jabberwerx.Presence) {
                var presence = s;
                type = presence.getType();
                if ((!type || (type == "unavailable")) && !presence.getTo()) {
                    presence = presence.clone();
                    presence.setFrom(this.fullJid.toString());
                    this.connectedUser.updatePresence(presence);
                }
            }
        },
        sendMessage: function (to, body, subject, type, thread) {
            this._assertConnected();
            var m = new jabberwerx.Message();
            if (to instanceof jabberwerx.Entity) {
                to = to.jid;
            } else {
                to = jabberwerx.JID.asJID(to);
            }
            m.setTo(to);
            m.setBody(body);
            if (subject) {
                m.setSubject(subject);
            }
            if (thread) {
                m.setThread(thread);
            }
            if (type) {
                m.setType(type);
            }
            if (type === undefined || type == 'chat') {
                new jabberwerx.NodeBuilder(m.getNode()).element('{http://jabber.org/protocol/xhtml-im}html').element('{http://www.w3.org/1999/xhtml}body').text(body);
            }
            this.sendStanza(m);
        },
        sendIQ: function (type, to, content, callback, timeout) {
            return this.sendIq.apply(this, arguments);
        },
        sendIq: function (type, to, content, callback, timeout) {
            if (callback !== undefined && !jabberwerx.$.isFunction(callback)) {
                throw new TypeError("callback must be a function");
            }
            if (timeout !== undefined && typeof (timeout) != "number" && !(timeout instanceof Number)) {
                throw new TypeError("timeout must be a number");
            }
            var i = new jabberwerx.IQ();
            if (type) {
                i.setType(type);
            }
            if (to) {
                i.setTo(to);
            }
            var id = jabberwerx.Stanza.generateID();
            i.setID(id);
            if (content) {
                if (typeof (content) == 'string') {
                    try {
                        content = jabberwerx.util.unserializeXML(content);
                    } catch (ex) {
                        jabberwerx.util.debug.log("sendIQ could not parse: '" + content + "'");
                        throw ex;
                    }
                }
                new jabberwerx.NodeBuilder(i.getNode()).node(content);
            }
            if (callback) {
                var that = this;
                var tid = undefined;
                var fn = function (evt) {
                    var elem = evt.data;
                    if (jabberwerx.isDocument(elem)) {
                        elem = elem.documentElement;
                    } else if (elem instanceof jabberwerx.Stanza) {
                        elem = elem.getNode();
                    }
                    elem = jabberwerx.$(elem);
                    if (elem.attr("type") != "result" && elem.attr("type") != "error") {
                        return;
                    }
                    if (elem.attr("id") != id) {
                        return;
                    }
                    var iqto = to;
                    if (!iqto) {
                        iqto = (jabberwerx.JID.asJID(elem.attr("from")).getResource() === "") ? that.fullJid.getBareJIDString() : that.fullJid.toString();
                    }
                    if (elem.attr("from") != iqto) {
                        return;
                    }
                    try {
                        callback(elem.get()[0]);
                    } catch (ex) {
                        jabberwerx.util.debug.log("sendIq callback threw exception: " + ex);
                    }
                    evt.notifier.unbind(arguments.callee);
                    if (tid) {
                        jabberwerx.system.clearTimeout(tid);
                        tid = undefined;
                    }
                    return true;
                };
                timeout = Number(timeout || 0);
                if (timeout > 0) {
                    var tfn = function () {
                        if (tid) {
                            that.event('beforeIqReceived').unbind(fn);
                            var iq = i.errorReply(jabberwerx.Stanza.ERR_REMOTE_SERVER_TIMEOUT);
                            iq.setFrom(to);
                            callback(iq.getNode());
                        }
                    }
                    tid = jabberwerx.system.setTimeout(tfn, timeout * 1000);
                }
                var idSel = '[id="' + id + '"]';
                this.event('beforeIqReceived').bind(fn);
            }
            this.sendStanza(i);
            return id;
        },
        sendPresence: function (show, status, to) {
            var p = new jabberwerx.Presence();
            if (typeof show == 'string') {
                p.setShow(show);
            }
            if (typeof status == 'string') {
                p.setStatus(status);
            }
            if (to !== undefined) {
                p.setTo(to);
            }
            this.sendStanza(p);
        },
        selectNodes: function (stanzaDoc, selector) {
            var filteredDoc = stanzaDoc;
            jabberwerx.util.debug.log('running jquery with selector: ' + selector + " on doc:\n\n" + filteredDoc.xml, 'stanzaSelectors');
            var result = jabberwerx.$(selector, filteredDoc);
            var nodes = [];
            result.each(function () {
                nodes.push(this);
            });
            if (nodes.length == 1) {
                return nodes[0];
            }
            if (nodes.length == 0) {
                return null;
            }
            return nodes;
        },
        getAllPresenceForEntity: function (jid) {
            var retVal = [];
            jid = jabberwerx.JID.asJID(jid);
            var entity = this.entitySet.entity(jid.getBareJIDString());
            if (entity) {
                if (!jid.getResource()) {
                    retVal = entity.getAllPresence();
                } else {
                    retVal = [entity.getResourcePresence(jid.getResource())];
                }
            }
            return retVal;
        },
        getPrimaryPresenceForEntity: function (jid) {
            jid = jabberwerx.JID.asJID(jid);
            var entity = this.entitySet.entity(jid.getBareJIDString());
            if (entity) {
                if (jid.getResource()) {
                    return entity.getResourcePresence(jid.getResource());
                } else {
                    return entity.getPrimaryPresence();
                }
            }
            return null;
        },
        _handlePresenceIn: function (eventObj) {
            var entity;
            var presence = eventObj.data;
            var type = presence.getType();
            if (!type || type == 'unavailable') {
                var bareJidStr = presence.getFromJID().getBareJIDString();
                if (bareJidStr) {
                    if (presence.getType() == 'unavailable') {
                        entity = this.entitySet.entity(bareJidStr);
                        if (entity) {
                            entity.updatePresence(presence);
                        }
                    } else {
                        entity = this._findOrCreateEntity(bareJidStr);
                        entity.updatePresence(presence);
                    }
                }
            }
        },
        _findOrCreateEntity: function (jid) {
            var entity = this.entitySet.entity(jid);
            if (!entity) {
                entity = this.entitySet.temporaryEntity(jid);
            }
            return entity;
        },
        _cleanupEntityCache: function () {
            this.entitySet.startBatch();
            var that = this;
            this.entitySet.each(function (entity) {
                if (entity.controller && entity.controller.cleanupEntity) {
                    entity.controller.cleanupEntity(entity);
                } else if ((entity.controller === that.entitySet) || (entity instanceof jabberwerx.TemporaryEntity)) {
                    entity.destroy();
                }
            });
            this.entitySet.endBatch();
        },
        willBeSerialized: function () {
            if (this._connectParams && this._connectParams.password) {
                if (jabberwerx._config.baseReconnectCountdown == 0) {
                    this._connectParams.password = "";
                } else {
                    this._connectParams.password = jabberwerx.util.encodeSerialization(this._connectParams.password);
                }
            }
            this._stopReceiveQueue(false);
            this._stanzaRecvQ = jabberwerx.$.map(this._stanzaRecvQ, function () {
                return this.xml;
            });
        },
        wasUnserialized: function () {
            if (this._connectParams && this._connectParams.password) {
                this._connectParams.password = jabberwerx.util.decodeSerialization(this._connectParams.password);
            }
        },
        graphUnserialized: function () {
            if (this._stanzaRecvQ.length) {
                this._stanzaRecvQ = jabberwerx.$.map(this._stanzaRecvQ, function () {
                    return jabberwerx.util.unserializeXML(this);
                });
                this._startReceiveQueue(true);
            }
        },
        _assertConnected: function () {
            if (!this.isConnected()) {
                throw new jabberwerx.Client.NotConnectedError();
            }
        },
        _handleConnected: function () {
            if (jabberwerx._config.baseReconnectCountdown == 0) {
                this._connectParams.password = "";
            }
            this._clearStreamHandler("streamOpened");
            this._setStreamHandler("streamElementsReceived", "_handleElementsReceived");
            this._setStreamHandler("streamElementsSent", "_handleElementsSent");
            if (this._connectParams.bindJID) {
                var jid = jabberwerx.JID.asJID(this._connectParams.bindJID);
                if (!jid.getBareJID().equals(this.connectedUser.jid)) {
                    this.entitySet._renameEntity(this.connectedUser, jid.getBareJID());
                    if (this.connectedServer.jid.getDomain() != jid.getDomain()) {
                        this.entitySet._renameEntity(this.connectedServer, jid.getDomain());
                    }
                }
                this.resourceName = jid.getResource();
                this._setFullJid();
            }
            this._connectParams.bindJID = null;
            this.entitySet.startBatch();
            var rnz = new jabberwerx.Rendezvous(this.invocation("_completeConnected"));
            this._connectedRendezvous = rnz;
            var that = this;
            var delayed = jabberwerx.reduce(this.controllers, function (ctrl, value) {
                return rnz.start(ctrl) || value;
            });
            if (!delayed) {
                this._completeConnected();
            }
        },
        _connected: function () {
            this.event('clientConnected').trigger();
        },
        _disconnected: function (err) {
            if (jabberwerx._config.baseReconnectCountdown == 0) {
                this._connectParams.password = "";
                delete this._connectParams.password;
            }
            if ((this.clientStatus != jabberwerx.Client.status_disconnecting) && (this.clientStatus != jabberwerx.Client.status_connecting) && this._shouldReconnect(err)) {
                this._startReconnectCountdown();
            }
            this._clearStreamHandlers();
            if (this.connectedUser) {
                this.connectedUser.updatePresence();
            }
            this.connectedUser = null;
            this._setFullJid();
            this.connectedServer = null;
            this._authMech = undefined;
            delete this._authMech;
            this._cleanupEntityCache();
            //Llama la funcion para enviar mensaje de cerrar el Iframe.
            registerMultisessionEvents('CloseIframe');
            if (this._autoResourceName && (this._countDownOn == 0)) {
                this.resourceName = null;
            }
            delete this._connectedRendezvous;
            this._stopReceiveQueue(true);
            this.setClientStatus(jabberwerx.Client.status_disconnected, err);
            this.event('clientDisconnected').trigger(err);
        },
        _handleElementsReceived: function (evt) {
            var elements = jabberwerx.$(evt.data).get();
            this._stanzaRecvQ = this._stanzaRecvQ.concat(elements);
            this._startReceiveQueue(false);
        },
        _handleElementsSent: function (evt) {
            var elements = jabberwerx.$(evt.data);
            for (var i = 0; i < elements.length; ++i) {
                this._handleElementOut(elements.get(i));
            }
        },
        cancelReconnect: function () {
            if (this._reconnectTimerID !== null) {
                jabberwerx.system.clearTimeout(this._reconnectTimerID);
                this._reconnectTimerID = null;
                this._countDownOn = 0;
                this.event('reconnectCancelled').trigger();
            }
        },
        isSecure: function () {
            return this._stream.isSecure();
        },
        _shouldReconnect: function (err) {
            return jabberwerx.$("system-shutdown, conflict", err).length === 0;
        },
        _startReconnectCountdown: function () {
            var base = Number(jabberwerx._config.baseReconnectCountdown);
            if (base > 0) {
                var reconnectCountdown = base + Math.round((Math.random() - 0.5) * (base / 5));
                this._reconnectTimerID = jabberwerx.system.setTimeout(this.invocation('_reconnectTimeoutHandler'), reconnectCountdown * 1000);
                this._countDownOn = reconnectCountdown;
                this.event('reconnectCountdownStarted').trigger(reconnectCountdown);
            }
        },
        _reconnectTimeoutHandler: function () {
            this._countDownOn = 0;
            this._reconnectTimerID = null;
            this._connectParams.arg.reconnecting = true;
            try {
                this.connect(this._connectParams.jid, this._connectParams.password, this._connectParams.arg);
            } catch (ex) {
                jabberwerx.util.debug.log("Failed to reconnect: " + ex.message);
            }
        },
        _handleElementOut: function (stanza) {
            stanza = jabberwerx.Stanza.createWithNode(stanza);
            var stanzaType = stanza.pType();
            this.event(stanzaType + "Sent").trigger(stanza);
        },
        _startReceiveQueue: function () {
            if (this._stanzaRecvWorker || !this._stanzaRecvQ.length) {
                return;
            }
            this._stanzaRecvWorker = jabberwerx.system.setTimeout(this.invocation("_processReceiveQueue"), jabberwerx.Client.STANZA_PROCESS_INTERVAL);
        },
        _stopReceiveQueue: function (clear) {
            if (this._stanzaRecvWorker) {
                jabberwerx.system.clearTimeout(this._stanzaRecvWorker);
                delete this._stanzaRecvWorker;
            }
            if (clear) {
                this._stanzaRecvQ = [];
            }
        },
        _processReceiveQueue: function () {
            var idx = 0;
            delete this._stanzaRecvWorker;
            for (idx = 0; idx < jabberwerx.Client.STANZA_PROCESS_COUNT; idx++) {
                var processStanza = function (stanza, stanzaType, notifiers, that, handled) {
                    var handleStanza = function (results) {
                        handled = handled || Boolean(results);
                        if (!handled) {
                            if (notifiers.length) {
                                notifiers.shift().trigger(stanza, undefined, handleStanza);
                            } else {
                                if (!results && stanzaType == 'iq' && (stanza.getType() == 'get' || stanza.getType() == 'set')) {
                                    stanza = stanza.errorReply(jabberwerx.Stanza.ERR_FEATURE_NOT_IMPLEMENTED);
                                    that.sendStanza(stanza);
                                }
                            }
                        }
                    };
                    handleStanza(false);
                }
                var stanza = this._stanzaRecvQ.shift();
                if (!stanza) {
                    return;
                }
                stanza = jabberwerx.Stanza.createWithNode(stanza);
                var stanzaType = stanza.pType();
                var notifiers = [this.event('before' + stanzaType + 'Received'), this.event(stanzaType + 'Received'), this.event('after' + stanzaType + 'Received')];
                var that = this;
                var handled = false;
                processStanza(stanza, stanzaType, notifiers, that, handled);
            }
            this._startReceiveQueue(true);
        },
        _handleIqTime: function (evt) {
            var now = new Date();
            var tz;
            tz = now.toString();
            tz = tz.substring(tz.lastIndexOf(' ') + 1);
            var iq = evt.data;
            iq = iq.reply();
            var query = new jabberwerx.NodeBuilder(iq.getQuery());
            query.element('display').text(now.toLocaleString());
            query.element('utc').text(jabberwerx.generateTimestamp(now, true));
            query.element('tz').text(tz);
            this.sendStanza(iq);
            return true;
        },
        _handleEntityTime: function (evt) {
            var now = new Date();
            var tzo;
            var h, m;
            tzo = now.getTimezoneOffset();
            h = tzo / 60;
            m = tzo % 60;
            tzo = (tzo > 0 ? '-' : '+') +
                (h < 10 ? '0' + h : h) + ':' +
                (m < 10 ? '0' + m : m);
            var iq = evt.data;
            iq = iq.reply();
            var query = new jabberwerx.NodeBuilder(iq.getQuery());
            query.element('tzo').text(tzo);
            query.element('utc').text(jabberwerx.generateTimestamp(now, false));
            this.sendStanza(iq);
            return true;
        },
        _generateUsername: function () {
            return hex_md5(this._guid + ((this._connectionAttempts) + (new Date().valueOf)));
        },
        _generatePassword: function (username) {
            return hex_md5(username + Math.floor(Math.random() * 3000) + 2);
        },
        _completeConnected: function (rnz) {
            delete this._connectedRendezvous;
            this.entitySet.endBatch();
            this.setClientStatus(jabberwerx.Client.status_connected, null, this.invocation("_connected"));
        },
        _setFullJid: function () {
            this.fullJid = this.connectedUser ? jabberwerx.JID.asJID(this.connectedUser.jid + (this.resourceName ? "/" + this.resourceName : "")) : null;
        },
        controllers: {},
        resourceName: null,
        connectedUser: null,
        fullJid: null,
        _stream: null,
        _streamHandlers: [],
        clientStatus: 3,
        connectedServer: null,
        entitySet: null,
        autoRegister: false,
        _stanzaRecvQ: [],
        _connectionAttempts: 0,
        _reconnectTimerID: null,
        _connectParams: {},
        _autoResourceName: false,
        _countDownOn: 0
    }, 'jabberwerx.Client');
    try {
        Object.defineProperty(jabberwerx.Client.prototype, "fullJid", {
            get: function () {
                return this.connectedUser ? jabberwerx.JID.asJID(this.connectedUser.jid + (this.resourceName ? "/" + this.resourceName : "")) : null;
            },
            enumerable: true,
            writeable: false,
            configurable: false
        });
        jabberwerx.Client._setFullJid = function () { };
    } catch (ex) { }
    jabberwerx.Client.status_connecting = 1;
    jabberwerx.Client.status_connected = 2;
    jabberwerx.Client.status_disconnected = 3;
    jabberwerx.Client.status_disconnecting = 4;
    jabberwerx.Client.status_reconnecting = 5;
    jabberwerx.Client.NotConnectedError = jabberwerx.util.Error.extend('The client is not connected.');
    jabberwerx.Client.ConnectionError = jabberwerx.util.Error.extend();
    jabberwerx.Client.DisconnectError = jabberwerx.util.Error.extend();
    jabberwerx.Client.STANZA_PROCESS_INTERVAL = 1;
    jabberwerx.Client.STANZA_PROCESS_COUNT = 5;
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/model/MUCRoom.js*/
;
(function (jabberwerx) {
    jabberwerx.MUCOccupant = jabberwerx.Entity.extend({
        //Inicia la configuracion de las salas de chats.
        init: function (room, nick) {
            if (!(room && room instanceof jabberwerx.MUCRoom)) {
                throw new TypeError("room must be a non-null instance of jabberwerx.MUCRoom");
            }
            if (!nick) {
                throw new TypeError("nick must be a non-empty string");
            }
            var jid = new jabberwerx.JID({
                node: room.jid.getNode(),
                domain: room.jid.getDomain(),
                resource: nick
            });
            this._super({
                jid: jid
            }, room.occupants);
            this.room = room;
            room.occupants.register(this);
        },
        getNickname: function () {
            return this.jid.getResource();
        },
        getDisplayName: function () {
            return this.getNickname();
        },
        setDisplayName: function (name) { },
        updatePresence: function (presence) {
            if (!(presence && presence instanceof jabberwerx.Presence)) {
                throw new TypeError("must provide a valid non-subscription Presence");
            }
            if (presence.getFrom() != this.jid) {
                throw new TypeError("presence not appropriate to this occupant");
            }
            var type = presence.getType() || "";
            if (type && type != "unavailable") {
                throw new TypeError("must provide a valid non-subscription Presence");
            }
            if (type == "unavailable") {
                this._presenceList.splice(0, 1);
            } else if (this._presenceList.length) {
                this._presenceList[0] = presence;
            } else {
                this._presenceList.push(presence);
            }
            this.event("resourcePresenceChanged").trigger({
                fullJid: this.jid,
                presence: presence,
                nowAvailable: false
            });
            this.event("primaryPresenceChanged").trigger({
                fullJid: this.jid,
                presence: (presence.getType() == "unavailable" ? null : presence)
            });
            return true;
        },
        isMe: function () {
            return (this.room && this.room.me == this);
        },
        room: null
    }, "jabberwerx.MUCOccupant");
    jabberwerx.MUCOccupantCache = jabberwerx.EntitySet.extend({
        init: function (room) {
            if (!(room && room instanceof jabberwerx.MUCRoom)) {
                throw new TypeError("must provide a valid MUCRoom");
            }
            this._super();
            this.room = room;
        },
        register: function (entity) {
            if (!(entity && entity instanceof jabberwerx.MUCOccupant)) {
                throw new TypeError("only MUCOccupants can be registered");
            }
            if (this._super(entity)) {
                this.event("entityCreated").trigger(entity);
            }
        },
        unregister: function (entity) {
            if (!(entity && entity instanceof jabberwerx.MUCOccupant)) {
                throw new TypeError("only MUCOccupants can be registered");
            }
            if (this._super(entity)) {
                if (this.room.me === entity) {
                    this.room.me = null;
                }
                this.event("entityDestroyed").trigger(entity);
            }
        },
        _clear: function () {
            var that = this;
            jabberwerx.$.each(this.toArray(), function () {
                that.unregister(this);
            });
        },
        rename: function (entity, njid) {
            this._renameEntity(entity, njid, "");
        },
        occupant: function (nick) {
            if (!nick) {
                throw new TypeError("nickname must be a non-empty string");
            }
            var jid = this.room.jid;
            jid = new jabberwerx.JID({
                node: jid.getNode(),
                domain: jid.getDomain(),
                resource: nick
            });
            return this.entity(jid);
        },
        room: null
    }, "jabberwerx.MUCOccupantCache");
    jabberwerx.MUCRoom = jabberwerx.Entity.extend({
        init: function (jid, ctrl) {
            if (!(ctrl && ctrl instanceof jabberwerx.MUCController)) {
                throw new TypeError("MUCController must be provided");
            }
            this._super({
                jid: jabberwerx.JID.asJID(jid).getBareJID()
            }, ctrl);
            this._state = "offline";
            this.occupants = new jabberwerx.MUCOccupantCache(this);
            this.applyEvent("roomCreated");
            this.applyEvent("roomEntered");
            this.applyEvent("roomExited");
            this.applyEvent("errorEncountered");
            this.applyEvent("beforeRoomBroadcastSent");
            this.applyEvent("roomBroadcastSent");
            this.applyEvent("roomBroadcastReceived");
            this.applyEvent("beforeRoomSubjectChanging");
            this.applyEvent("roomSubjectChanging");
            this.applyEvent("roomSubjectChanged");
            if (this.controller.client) {
                var client = this.controller.client;
                client.event("presenceReceived").bindWhen(this.invocation("_filterRoomErrored"), this.invocation("_handleRoomErrored"));
                client.event("messageReceived").bindWhen(this.invocation("_filterMessageReceived"), this.invocation("_handleMessageReceived"));
                client.event("presenceSent").bindWhen("presence:not([to]):not([type])", this.invocation("_handlePresenceSent"));
            }
        },
        destroy: function () {
            this.exit();
            if (this.controller.client) {
                var client = this.controller.client;
                client.event("presenceReceived").unbind(this.invocation("_handleRoomErrored"));
                client.event("messageReceived").unbind(this.invocation("_handleMessageReceived"));
                client.event("presenceSent").unbind(this.invocation("_handlePresenceSent"));
            }
            this._super();
        },
        getDisplayName: function () {
            return jabberwerx.JID.unescapeNode(this.jid.getNode());
        },
        setDisplayName: function (name) { },
        enter: function (nick, enterArgs) {
            var cbmap = enterArgs ? (jabberwerx.$.isFunction(enterArgs) ? {
                successCallback: enterArgs,
                errorCallback: enterArgs
            } : enterArgs) : {};
            if (enterArgs && ((cbmap.successCallback && !jabberwerx.$.isFunction(cbmap.successCallback)) || (cbmap.errorCallback && !jabberwerx.$.isFunction(cbmap.errorCallback)) || (cbmap.configureCallback && !jabberwerx.$.isFunction(cbmap.configureCallback)))) {
                throw new TypeError("Defined callback must be a function");
            }
            if (!nick || !jabberwerx.util.isString(nick)) {
                throw new TypeError("Nick must be a non-empty string");
            }
            if (!this.controller.client.isConnected()) {
                throw new jabberwerx.Client.NotConnectedError();
            }
            if (this._state == "initializing") {
                throw new jabberwerx.MUCRoom.RoomActiveError();
            } else if (this.isActive()) {
                if (this.me && (this.me.getNickname() != nick)) {
                    throw new jabberwerx.MUCRoom.RoomActiveError();
                }
                if (cbmap.successCallback) {
                    cbmap.successCallback.call(this);
                }
                return;
            }
            var that = this;
            this._state = "initializing";
            var fn = function (evt) {
                if (evt.name == "roomcreated") {
                    that._origApply = that.applyConfig;
                    that.applyConfig = that._creationApply;
                    if (cbmap.configureCallback) {
                        cbmap.configureCallback.call(that);
                    } else {
                        that.applyConfig(new jabberwerx.XDataForm("submit"));
                    }
                } else {
                    if (evt.name == "errorencountered") {
                        that._state = "offline";
                        that.exit();
                        if (cbmap.errorCallback) {
                            cbmap.errorCallback.call(that, jabberwerx.Stanza.ErrorInfo.createWithNode(evt.data.error), evt.data.aborted);
                        }
                    } else if (evt.name == "roomentered" && cbmap.successCallback) {
                        cbmap.successCallback.call(that);
                    }
                    that.event("errorEncountered").unbind(arguments.callee);
                    that.event("roomEntered").unbind(arguments.callee);
                    that.event("roomCreated").unbind(arguments.callee);
                }
            };
            this.event("errorEncountered").bind(fn);
            this.event("roomEntered").bind(fn);
            this.event("roomCreated").bind(fn);
            this.me = new jabberwerx.MUCOccupant(this, nick);
            var stanza = this.controller.client.getCurrentPresence();
            if (stanza) {
                stanza = stanza.clone();
            } else {
                stanza = new jabberwerx.Presence();
                stanza.setPresence('', '');
            }
            stanza.setTo(this.me.jid);
            var builder = new jabberwerx.NodeBuilder(stanza.getNode());
            var xtag = builder.element("{http://jabber.org/protocol/muc}x");
            if (enterArgs && enterArgs.password) {
                xtag.element("password").text(enterArgs.password);
            }
            this.controller.client.sendStanza(stanza);
        },
        exit: function () {
            if (this.isActive() && this.controller.client.isConnected()) {
                var stanza = new jabberwerx.Presence();
                stanza.setTo(this.me.jid);
                stanza.setType("unavailable");
                this.controller.client.sendStanza(stanza);
            } else if (this.me) {
                if (this.isActive()) {
                    this._state = "offline";
                    this.event("roomExited").trigger();
                }
                if (this.me != null) {
                    this.me.remove();
                }
            }
        },
        changeNickname: function (nick, cb) {
            if (this.me && this.me.getNickname() == nick) {
                return;
            }
            if (!nick) {
                throw new TypeError("nickname must be a non-empty string");
            }
            if (cb && !jabberwerx.$.isFunction(cb)) {
                throw new TypeError("callback must be a function or undefined");
            }
            if (!this.isActive()) {
                throw new jabberwerx.MUCRoom.RoomNotActiveError();
            }
            var jid = new jabberwerx.JID({
                node: this.jid.getNode(),
                domain: this.jid.getDomain(),
                resource: nick
            });
            var stanza = this.controller.client.getCurrentPresence().clone();
            stanza.setTo(jid);
            if (cb) {
                var that = this;
                var fn = function (evt) {
                    var err = (evt.name == "errorencountered") ? evt.data : undefined;
                    if (err || (evt.name == "entityrenamed" && evt.data === that.me)) {
                        cb.call(that, err);
                        that.event("errorEncountered").unbind(arguments.callee);
                        that.occupants.event("entityRenamed").unbind(arguments.callee);
                    }
                };
                this.event("errorEncountered").bind(fn);
                this.occupants.event("entityRenamed").bind(fn);
            }
            this.controller.client.sendStanza(stanza);
        },
        changeSubject: function (subject, cb) {
            if (cb && !jabberwerx.$.isFunction(cb)) {
                throw new TypeError("callback must be a function or undefined");
            }
            if (!this.isActive()) {
                throw new jabberwerx.MUCRoom.RoomNotActiveError();
            }
            var stanza = new jabberwerx.Message();
            stanza.setTo(this.jid);
            stanza.setType("groupchat");
            stanza.setSubject(subject || "");
            if (cb) {
                var that = this;
                var fn = function (evt) {
                    var err = (evt.name == "errorencountered") ? evt.data : undefined;
                    cb.call(that, err);
                    that.event("errorEncountered").unbind(arguments.callee);
                    that.event("roomSubjectChanged").unbind(arguments.callee);
                };
                this.event("errorEncountered").bind(fn);
                this.event("roomSubjectChanged").bind(fn);
            }
            this.event("beforeRoomSubjectChanging").trigger(stanza);
            this.controller.client.sendStanza(stanza);
            this.event("roomSubjectChanging").trigger(stanza);
        },
        sendBroadcast: function (msg) {
            if (!msg) {
                return;
            }
            if (!this.isActive()) {
                throw new jabberwerx.MUCRoom.RoomNotActiveError();
            }
            var stanza = new jabberwerx.Message();
            stanza.setTo(this.jid);
            stanza.setType("groupchat");
            if (jabberwerx.isElement(msg) || jabberwerx.$.isArray(msg)) {
                stanza.setHTML(msg);
            } else {
                stanza.setBody(msg);
            }
            this.event("beforeRoomBroadcastSent").trigger(stanza);
            this.controller.client.sendStanza(stanza);
            this.event("roomBroadcastSent").trigger(stanza);
        },
        getPrimaryPresence: function () {
            if (this.me) {
                return this.getResourcePresence(this.me.getNickname());
            }
            return null;
        },
        isActive: function () {
            return Boolean(this._state == "active");
            return Boolean(this.getPrimaryPresence());
        },
        updatePresence: function (presence) {
            if (!(presence && presence instanceof jabberwerx.Presence)) {
                throw new TypeError("must provide a valid non-subscription Presence");
            }
            var jid = presence.getFromJID();
            if (jid.getBareJIDString() != this.jid) {
                throw new TypeError("presence not appropriate to this room");
            }
            var type = presence.getType() || "";
            if (type && type != "unavailable") {
                throw new TypeError("must provide a valid non-subscription Presence");
            }
            var node = jabberwerx.$(presence.getNode()).children("x[xmlns^='http://jabber.org/protocol/muc']");
            var item = node.children("item");
            var status = node.children("status");
            var occupant = this.occupants.entity(jid);
            var result = (occupant && occupant.isMe());
            this._removePresenceFromList(jid);
            switch (type) {
                case "":
                    this._presenceList.push(presence);
                    if (!occupant) {
                        occupant = new jabberwerx.MUCOccupant(this, jid.getResource());
                    }
                    var prsCount = occupant.getAllPresence().length;
                    occupant.updatePresence(presence);
                    if (occupant.isMe() && prsCount == 0) {
                        if (node.children("status[code='201']").length == 1) {
                            this.event("roomCreated").trigger();
                            return;
                        } else {
                            this._state = "active";
                            this.event("roomEntered").trigger();
                        }
                    }
                    break;
                case "unavailable":
                    if (occupant && occupant.getPrimaryPresence() !== null) {
                        if (status.attr("code") == "303") {
                            var nnick = item.attr("nick");
                            var onick = occupant.nick;
                            var njid = new jabberwerx.JID({
                                node: this.jid.getNode(),
                                domain: this.jid.getDomain(),
                                resource: nnick
                            });
                            var tmpprs = presence.clone();
                            this.occupants.rename(occupant, njid);
                            result = false;
                        } else {
                            var myself = occupant.isMe();
                            occupant.updatePresence(presence);
                            if (myself) {
                                this._state = "offline";
                                this.event("roomExited").trigger();
                                this.occupants._clear();
                                this._presenceList = [];
                            }
                            occupant.destroy();
                        }
                    }
                    break;
            }
            this.event("resourcePresenceChanged").trigger({
                fullJid: jid,
                presence: presence,
                nowAvailable: false
            });
            if (result) {
                this.event("primaryPresenceChanged").trigger({
                    fullJid: (type != "unavailable") ? jid : this.jid,
                    presence: (type != "unavailable") ? presence : null
                });
            }
            return result;
        },
        invite: function (toJids, reason, mediated) {
            if (!this.isActive()) {
                throw new jabberwerx.MUCRoom.RoomNotActiveError();
            }
            var result = [];
            if (!reason) {
                reason = jabberwerx.MUCRoom.DefaultInviteReason;
            }
            if (!toJids) {
                toJids = [];
            } else if (!jabberwerx.$.isArray(toJids)) {
                toJids = [toJids];
            }
            var iMsg = new jabberwerx.Message();
            var updateMessage;
            updateMessage = function (jid) {
                return iMsg;
            }
            if (mediated) {
                iMsg.setTo(this.jid);
                var xe = new jabberwerx.NodeBuilder(iMsg.getNode()).element('{http://jabber.org/protocol/muc#user}x').element('invite');
                xe.element('reason').text(reason);
                updateMessage = function (jid) {
                    xe.attribute('to', jid.toString());
                    return iMsg;
                };
            } else {
                new jabberwerx.NodeBuilder(iMsg.getNode()).element('{jabber:x:conference}x').attribute("reason", reason).attribute("jid", this.jid.getBareJID().toString());
                updateMessage = function (jid) {
                    iMsg.setTo(jid);
                    return iMsg;
                };
            }
            for (var i = 0; i < toJids.length; i++) {
                try {
                    var tjid = jabberwerx.JID.asJID(toJids[i]).getBareJID();
                    this.controller.client.sendStanza(updateMessage(tjid));
                    result.push(tjid);
                } catch (ex) {
                    if (!(ex instanceof jabberwerx.JID.InvalidJIDError)) {
                        throw ex;
                    }
                }
            }
            return result;
        },
        fetchConfig: function (configCallback) {
            if (!jabberwerx.$.isFunction(configCallback)) {
                throw new TypeError("fetchConfig requires a callback function");
            }
            if (this._state == "offline") {
                throw new jabberwerx.MUCRoom.RoomNotActiveError();
            }
            var qb = new jabberwerx.NodeBuilder('{http://jabber.org/protocol/muc#owner}query').data;
            this.controller.client.sendIQ("get", this.jid, qb, function (stanza) {
                var iq = new jabberwerx.IQ(stanza);
                if (iq.isError()) {
                    configCallback(null, iq.getErrorInfo());
                } else {
                    var frm = jabberwerx.$("x", iq.getNode()).get(0);
                    if (!frm) {
                        configCallback(null, jabberwerx.Stanza.ERR_SERVICE_UNAVAILABLE);
                    } else {
                        configCallback(new jabberwerx.XDataForm(null, frm));
                    }
                }
            });
        },
        applyConfig: function (configForm, configCallback) {
            if (configForm && !(configForm instanceof jabberwerx.XDataForm)) {
                throw new TypeError("configForm must be null or an XDataForm");
            }
            if (configCallback && !jabberwerx.$.isFunction(configCallback)) {
                throw new TypeError("A defined configCallback must be a function");
            }
            if (this._state == "offline") {
                throw new jabberwerx.MUCRoom.RoomNotActiveError();
            }
            var cancel = (!configForm || configForm.getType() == "cancel");
            if (cancel && configCallback) {
                configCallback();
            }
            var that = this;
            var iqcb = cancel ? function (stanza) { } : function (stanza) {
                if (configCallback) {
                    configCallback(new jabberwerx.IQ(stanza).getErrorInfo());
                }
            };
            configForm = configForm ? configForm : new jabberwerx.XDataForm("cancel");
            var nb = new jabberwerx.NodeBuilder('{http://jabber.org/protocol/muc#owner}query');
            nb.node(configForm.getDOM());
            this.controller.client.sendIQ("set", this.jid, nb.data, iqcb);
        },
        _matchesRoomJid: function (jid) {
            return this.jid.getBareJIDString() == jid.getBareJIDString();
        },
        _matchesRoomJid: function (jid) {
            return this.jid.getBareJIDString() == jid.getBareJIDString();
        },
        _handlePresenceSent: function (evt) {
            if (this.isActive()) {
                var stanza = evt.data.clone();
                stanza.setTo(this.me.jid);
                this.controller.client.sendStanza(stanza);
            }
        },
        _filterRoomErrored: function (data) {
            if ((data.pType() == "presence") && (data.getType() == "error") && this._matchesRoomJid(data.getFromJID())) {
                return data;
            }
            return null;
        },
        _handleRoomErrored: function (evt) {
            var data = evt.data;
            var err = jabberwerx.$(data.getNode()).children("error").get(0);
            var op = "";
            switch (data.pType()) {
                case "message":
                    if (data.getSubject()) {
                        op = "changeSubject";
                    } else if (data.getBody()) {
                        op = "sendBroadcast";
                    }
                    break;
                case "presence":
                    if (this.isActive()) {
                        op = "changeNickname";
                    } else {
                        op = "enter";
                    }
                    break;
            }
            if (err) {
                this.event("errorEncountered").trigger({
                    operation: op,
                    error: err
                });
            }
            return true;
        },
        _filterMessageReceived: function (data) {
            if ((data.pType() == "message") && this._matchesRoomJid(data.getFromJID())) {
                return data;
            }
            return null;
        },
        _handleMessageReceived: function (evt) {
            var stanza = evt.data;
            switch (stanza.getType()) {
                case "error":
                    this._handleRoomErrored(evt);
                    break;
                case "groupchat":
                    {
                        var subject = stanza.getSubject();
                        if (subject !== null) {
                            this.properties.subject = subject;
                            this.update();
                            this.event("roomSubjectChanged").trigger(stanza);
                        } else {
                            var body = jabberwerx.$.trim(stanza.getBody());
                            if (body) {
                                this.event("roomBroadcastReceived").trigger(stanza);
                            }
                        }
                    }
                    break;
                case "chat":
                    if (this.controller.client) {
                        var entity = this.occupants.entity(stanza.getFrom());
                        var chat = this.controller.client.controllers.chat;
                        if (chat) {
                            if (!chat.getSession(entity.jid)) {
                                var session = chat.openSession(entity.jid);
                                console.log(session);
                                session.event('chatReceived').trigger(stanza);
                            }
                        }
                    }
                    break;
                default:
                    break;
            }
            return true;
        },
        _creationApply: function (configForm, configCallback) {
            if (!configForm || (configForm.getType() == "cancel")) {
                this.applyConfig = this._origApply;
                delete this._origApply;
                if (configCallback) {
                    configCallback();
                }
                this.applyConfig(configForm);
                var stanza = new jabberwerx.Presence();
                stanza.setTo(this.me.jid);
                stanza.setType("unavailable");
                this.controller.client.sendStanza(stanza);
                this.occupants._clear();
                this._presenceList = [];
                this.event("errorEncountered").trigger({
                    operation: "enter",
                    error: jabberwerx.Stanza.ERR_BAD_REQUEST.getNode(),
                    aborted: true
                });
            } else {
                var that = this;
                this._origApply.call(this, configForm, function (cerr) {
                    if (configCallback) {
                        configCallback(cerr);
                    }
                    if (!cerr) {
                        that.applyConfig = that._origApply;
                        delete that._origApply;
                        that._state = "active";
                        that.event("roomEntered").trigger();
                        that._presenceList[0]
                        that.event("resourcePresenceChanged").trigger({
                            fullJid: that.me.jid,
                            presence: that._presenceList[0],
                            nowAvailable: false
                        });
                        that.event("primaryPresenceChanged").trigger({
                            fullJid: that.me.jid,
                            presence: that._presenceList[0]
                        });
                    }
                });
            }
        },
        _state: "offline",
        occupants: null,
        me: null
    }, "jabberwerx.MUCRoom");
    jabberwerx.MUCRoom.RoomActiveError = jabberwerx.util.Error.extend("room already active");
    jabberwerx.MUCRoom.RoomNotActiveError = jabberwerx.util.Error.extend("room is not active");
    jabberwerx.MUCRoom.DefaultInviteReason = "You have been invited to a conference room.";
    jabberwerx.MUCRoom.DefaultSubjectChange = "has changed the subject to: {0}";
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/model/Server.js*/
;
(function (jabberwerx) {
    jabberwerx.Server = jabberwerx.Entity.extend({
        init: function (serverDomain, cache) {
            this._super({
                jid: serverDomain
            }, cache);
        }
    }, 'jabberwerx.Server');
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/model/Contact.js*/
;
(function (jabberwerx) {
    jabberwerx.Contact = jabberwerx.User.extend({
        init: function (jid, ctrl) {
            this._super(jid, ctrl);
        }
    }, "jabberwerx.Contact");
    jabberwerx.RosterContact = jabberwerx.Contact.extend({
        init: function (item, roster, base) {
            if (!(roster && roster instanceof jabberwerx.RosterController)) {
                throw new TypeError("roster must be provided");
            }
            if (base && !(base instanceof jabberwerx.Entity)) {
                throw new TypeError("Provided base must be an entity");
            }
            this._super(jabberwerx.$(item).attr("jid"), roster);
            this._initializing = true;
            this.setItemNode(item);
            if (base) {
                this.properties = jabberwerx.$.extend(true, this.properties, base.properties);
                this.features = jabberwerx.$.extend(this.features, base.features);
                this.identities = jabberwerx.$.extend(this.identities, base.identities);
                this._groups = jabberwerx.$.extend(this._groups, base._groups);
                this._presenceList = jabberwerx.$.extend([], base._presenceList);
                if (!this._displayName) {
                    this._displayName = base._displayName;
                }
            }
            delete this._initializing;
        },
        setItemNode: function (node) {
            if (!(node && jabberwerx.isElement(node))) {
                throw new TypeError("node cannot be null");
            }
            if (this._node !== node) {
                this._node = node;
                node = jabberwerx.$(node);
                var oldSub = this.properties.subscription;
                this.properties.subscription = node.attr("subscription") || "";
                this.properties.ask = node.attr("ask") || "";
                this.properties.name = node.attr("name") || "";
                var newSub = this.properties.subscription;
                if (!(!oldSub || oldSub == "from" || oldSub == "none") && (!newSub || newSub == "from" || newSub == "none")) {
                    this.updatePresence(null, true);
                } else if (!(!newSub || newSub == "from" || newSub == "none") && !this.getPrimaryPresence()) {
                    var prs = new jabberwerx.Presence();
                    prs.setType("unavailable");
                    var jid = jabberwerx.JID.asJID(node.attr("jid")).getBareJID();
                    prs.setFrom(jid);
                    this.updatePresence(prs, true);
                }
                this._displayName = this.properties.name;
                this._groups = node.children("group").map(function () {
                    return jabberwerx.$(this).text();
                }).get() || [];
                if (!this._initializing && this._eventing["updated"]) {
                    this._eventing["updated"].trigger(this);
                }
            }
        },
        getItemNode: function () {
            return this._node;
        },
        getDisplayName: function () {
            return this.properties.name || this._super();
        },
        setDisplayName: function (name) {
            if (name != this._displayName) {
                this.controller.updateContact(this.jid, name);
            }
        },
        setGroups: function (groups) {
            this.controller.updateContact(this.jid, null, groups);
        },
        remove: function () {
            this.controller.deleteContact(this.jid);
        },
        _handleUnavailable: function (presence) {
            if (this.properties.subscription == "both" || this.properties.subscription == "to" || this.properties.temp_sub) {
                var pres = this.getPrimaryPresence();
                if (!pres) {
                    this._insertPresence(presence);
                } else if (pres.getType() == "unavailable") {
                    this._clearPresenceList();
                    this._insertPresence(presence);
                }
            }
        },
        _node: null
    }, 'jabberwerx.RosterContact');
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/model/TemporaryEntity.js*/
;
(function (jabberwerx) {
    jabberwerx.TemporaryEntity = jabberwerx.Entity.extend({
        init: function (jid, cache) {
            this._super({
                jid: jid
            }, cache);
        }
    }, 'jabberwerx.TemporaryEntity');
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/model/ErrorReporter.js*/
;
(function (jabberwerx) {
    jabberwerx.ErrorReporter = jabberwerx.JWBase.extend({
        init: function () {
            this._super();
        },
        getMessage: function (err) {
            if (err) {
                if (jabberwerx.isElement(err)) {
                    var msg;
                    var textMsg;
                    for (var i = 0; i < err.childNodes.length; i++) {
                        var node = err.childNodes[i];
                        if (node.nodeName == 'text') {
                            textMsg = jabberwerx.$(node).text();
                        } else {
                            var error = '{' + node.getAttribute('xmlns') + '}' + node.nodeName;
                            msg = this._errorMap[error];
                            if (msg) {
                                return msg;
                            }
                        }
                    }
                    if (textMsg) {
                        return textMsg;
                    }
                } else if (err.message) {
                    var msg = this._errorMap[err.message];
                    if (msg) {
                        return msg;
                    }
                }
            }
            return this._errorMap[""];
        },
        addMessage: function (key, value) {
            if (!value || typeof (value) != "string") {
                throw new TypeError("value must be a string.");
            }
            if (key) {
                this._errorMap[key] = value;
            }
        },
        _errorMap: {
            "": "Operation failed",
            "{urn:ietf:params:xml:ns:xmpp-sasl}mechanism-too-weak": "You are not authorized to perform this action.",
            "{urn:ietf:params:xml:ns:xmpp-sasl}not-authorized": "Credenciales incorrectas. Por favor intente de nuevo.",
            "{urn:ietf:params:xml:ns:xmpp-sasl}temporary-auth-failure": "Unable to login. Check username and password.",
            "{urn:ietf:params:xml:ns:xmpp-stanzas}bad-request": "The request was not valid.",
            "{urn:ietf:params:xml:ns:xmpp-stanzas}conflict": "Conflicting names were encountered.",
            "{urn:ietf:params:xml:ns:xmpp-stanzas}feature-not-implemented": "This feature is not yet implemented. Sorry for the inconvenience.",
            "{urn:ietf:params:xml:ns:xmpp-stanzas}forbidden": "You are not authorized to perform this action.",
            "{urn:ietf:params:xml:ns:xmpp-stanzas}internal-server-error": "An unknown server error occurred. Contact your administrator.",
            "{urn:ietf:params:xml:ns:xmpp-stanzas}item-not-found": "The requested item could not be found.",
            "{urn:ietf:params:xml:ns:xmpp-stanzas}jid-malformed": "The JID is not valid.",
            "{urn:ietf:params:xml:ns:xmpp-stanzas}not-acceptable": "The given information was not acceptable.",
            "{urn:ietf:params:xml:ns:xmpp-stanzas}not-allowed": "You are not allowed to perform this action.",
            "{urn:ietf:params:xml:ns:xmpp-stanzas}not-authorized": "You are not authorized to perform this action.",
            "{urn:ietf:params:xml:ns:xmpp-stanzas}registration-required": "You must register with the service before continuing.",
            "{urn:ietf:params:xml:ns:xmpp-stanzas}remote-server-not-found": "Could not find the requested server.",
            "{urn:ietf:params:xml:ns:xmpp-stanzas}remote-server-timeout": "Unable to contact the server.",
            "{urn:ietf:params:xml:ns:xmpp-stanzas}service-unavailable": "This service is not available. Try again later.",
            "{urn:ietf:params:xml:ns:xmpp-stanzas}undefined-condition": "An unknown error occurred. Contact your administrator.",
            "{urn:ietf:params:xml:ns:xmpp-stanzas}unexpected-request": "Did not expect the request at this time.",
            "{urn:ietf:params:xml:ns:xmpp-streams}conflict": "This resource is logged in elsewhere.",
            "{urn:ietf:params:xml:ns:xmpp-streams}service-unavailable": "Could not reach the account server."
        }
    }, "jabberwerx.ErrorReporter");
    jabberwerx.errorReporter = new jabberwerx.ErrorReporter();
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/model/ChatSession.js*/
;
(function (jabberwerx) {
    jabberwerx.ChatSession = jabberwerx.JWModel.extend({
        init: function (client, jid, thread) {
            this._super();
            this._statesReady = false;
            if (client instanceof jabberwerx.Client) {
                this.client = client;
                this.controller = client.controllers.chat || new jabberwerx.ChatController(client);
            } else {
                throw new TypeError("client must be a jabberwerx.Client");
            }
            this.jid = jabberwerx.JID.asJID(jid);
            if (!thread) {
                thread = this._generateRandomThreadValue();
            }
            this.thread = thread;
            this.applyEvent('beforeChatSent');
            this.applyEvent('chatSent');
            this.applyEvent('chatReceived');
            this.applyEvent('threadUpdated');
            this.applyEvent('chatStateChanged');
            this.applyEvent('lockedResourceChanged');
            this.privateMessage = this.controller.isPrivateMessage(this.jid);
            if (this.privateMessage) {
                this._MUCController = client.controllers.muc || new jabberwerx.MUCController(client);
            }
            this._bindHandlers();
            var handlerFunc = this.invocation("_entityChangedHandler");
            this._getEntitySet().event("entityCreated").bind(handlerFunc);
            this._getEntitySet().event("entityDestroyed").bind(handlerFunc);
            if (this.privateMessage) {
                this._getEntitySet().event("entityRenamed").bind(this.invocation("_entityRenamedHandler"));
            }
        },
        _bindHandlers: function () {
            this._handlerList = [{
                event: "messageReceived",
                filter: this.invocation("_chatReceivedFilter"),
                handler: this.invocation("_chatReceivedHandler")
            }, {
                event: "messageReceived",
                filter: this.invocation("_remoteStateChangedFilter"),
                handler: this.invocation("_remoteStateChangedHandler")
            }, {
                event: "presenceReceived",
                filter: this.invocation("_presenceReceivedFilter"),
                handler: this.invocation("_presenceChangeHandler")
            }];
            var evt, client = this.client;
            for (var idx = 0; idx < this._handlerList.length; idx++) {
                evt = this._handlerList[idx];
                client.event(evt.event).bindWhen(evt.filter, evt.handler);
            }
        },
        _getEntitySet: function () {
            if (this.privateMessage) {
                return this._MUCController.room(this.jid).occupants;
            } else {
                return this.client.entitySet;
            }
        },
        getEntity: function () {
            if (!this._entity) {
                if (this.privateMessage) {
                    this._entity = this._getEntitySet().entity(this.jid);
                } else {
                    var jid = this.jid.getBareJID();
                    this._entity = this._getEntitySet().entity(jid) || new jabberwerx.TemporaryEntity(jid, this._getEntitySet());
                }
            }
            return this._entity;
        },
        _entityChangedHandler: function (evt) {
            if (this.privateMessage && (this.jid.toString() != evt.data.jid.toString())) {
                return;
            }
            if (this.jid.getBareJIDString() != evt.data.jid.getBareJIDString()) {
                return;
            }
            switch (evt.name.substring("entity".length)) {
                case "destroyed":
                    this._entity = undefined;
                    break;
                case "created":
                    this._entity = evt.data;
                    break;
            }
        },
        _entityRenamedHandler: function (evt) {
            if (evt.data.jid && (evt.data.jid == this.jid)) {
                this.jid = evt.data.entity.jid;
                this._unbindHandlers();
                this._bindHandlers();
            }
        },
        sendMessage: function (body) {
            if (!body) {
                return;
            }
            this._statesReady = true;
            var msg = this._generateMessage('active', body);
            this.localState = 'active';
            this.event('chatStateChanged').trigger({
                jid: null,
                state: this.localState
            });
            this.event('beforeChatSent').trigger(msg);
            this.client.sendStanza(msg);
            this.event('chatSent').trigger(msg);
        },
        setChatState: function (state) {
            var retVal = false;
            if (this._setChatStateProperty(state)) {
                retVal = true;
                var msg = this._generateMessage(state);
                if (msg && this.client.isConnected()) {
                    this.client.sendStanza(msg);
                }
            }
            return retVal;
        },
        _setChatStateProperty: function (state) {
            var retVal = false;
            if (jabberwerx.$.inArray(state, ['active', 'composing', 'paused', 'inactive', 'gone']) >= 0) {
                if (state != this.localState) {
                    this.localState = state;
                    this.event('chatStateChanged').trigger({
                        jid: null,
                        state: this.localState
                    });
                    retVal = true;
                }
            } else {
                var err = new jabberwerx.ChatSession.StateNotSupportedError("The chat state '" +
                    state + "' is not supported. Should be one of 'active', 'composing'," + "'paused', 'inactive' or 'gone'");
                throw err;
            }
            return retVal;
        },
        destroy: function () {
            this._unbindHandlers();
            var handlerFunc = this.invocation("_entityChangedHandler");
            this._getEntitySet().event("entityCreated").unbind(handlerFunc);
            this._getEntitySet().event("entityDestroyed").unbind(handlerFunc);
            if (this.privateMessage) {
                this._getEntitySet().event("entityRenamed").unbind(this.invocation("_entityRenamedHandler"));
            }
            this.setChatState('gone');
            this.controller.closeSession(this);
            this._super();
        },
        _unbindHandlers: function () {
            var client = this.client;
            jabberwerx.$.each(this._handlerList, function () {
                client.event(this.event).unbind(this.handler);
            });
        },
        _generateMessage: function (chatstate, body) {
            if (!this._statesReady) {
                return null;
            }
            var msg = null;
            if (body) {
                msg = new jabberwerx.Message();
                msg.setThread(this.thread);
                if (jabberwerx.isElement(body) || jabberwerx.$.isArray(body)) {
                    msg.setHTML(body);
                } else {
                    msg.setBody(body);
                }
            }
            if (this.controller.sendChatStates) {
                msg = msg || new jabberwerx.Message();
                var nodeBuilder = new jabberwerx.NodeBuilder(msg.getNode());
                nodeBuilder.element('{http://jabber.org/protocol/chatstates}' + chatstate);
            }
            if (msg) {
                msg.setType('chat');
                msg.setTo(this.jid);
            }
            return msg;
        },
        _matchesSessionJid: function (jid) {
            return (this.privateMessage) ? jid.toString() == this.jid.toString() : jid.getBareJIDString() == this.jid.getBareJIDString();
        },
        _chatReceivedFilter: function (data) {
            if ((data.pType() == "message") && (data.getType() != "groupchat") && this._matchesSessionJid(data.getFromJID())) {
                return data;
            }
            return false;
        },
        _chatReceivedHandler: function (eventObj) {
            var msg = eventObj.data;
            this._updateLockedResource(msg.getFromJID());
            this._updateThread(msg.getThread());
            this._statesReady = !msg.isError();
            if (msg.getBody() || msg.isError()) {
                this.event('chatReceived').trigger(msg);
            }
            return false;
        },
        _updateLockedResource: function (jid) {
            if (this.privateMessage) {
                return;
            }
            if (jid.getResource() != this.jid.getResource()) {
                this.jid = jid;
                this.event('lockedResourceChanged').trigger(this.jid);
            }
        },
        _updateThread: function (thread) {
            if (thread && thread != this.thread) {
                this.thread = thread;
                this.event('threadUpdated').trigger({
                    jid: this.jid,
                    thread: this.thread
                });
            }
        },
        _remoteStateChangedFilter: function (data) {
            if ((data.pType() == "message") && (data.getType() == "chat") && this._matchesSessionJid(data.getFromJID())) {
                return jabberwerx.$(data.getNode()).find("*[xmlns='http://jabber.org/protocol/chatstates']").get(0);
            }
            return false;
        },
        _remoteStateChangedHandler: function (eventObj) {
            var stateNode = eventObj.selected;
            if (this.remoteState != stateNode.nodeName) {
                this.remoteState = stateNode.nodeName;
                this.event('chatStateChanged').trigger({
                    jid: this.jid,
                    state: this.remoteState
                });
                if (this.remoteState == "gone") {
                    this._updateLockedResource(eventObj.data.getFromJID().getBareJID());
                    this.thread = this._generateRandomThreadValue();
                }
            }
            return false;
        },
        _presenceChangeHandler: function (eventObj) {
            this._updateLockedResource(eventObj.data.getFromJID().getBareJID());
            return false;
        },
        _generateRandomThreadValue: function () {
            var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
            var string_length = 10;
            var threadValue = '';
            for (var i = 0; i < string_length; i++) {
                var rnum = Math.floor(Math.random() * chars.length);
                threadValue += chars.substring(rnum, rnum + 1);
            }
            return 'JW_' + threadValue;
        },
        _presenceReceivedFilter: function (presence) {
            var type = presence.getType();
            if (this._matchesSessionJid(presence.getFromJID()) && (!type || type == 'unavailable')) {
                return presence;
            }
            return false;
        },
        jid: null,
        thread: null,
        localState: null,
        remoteState: null,
        client: null,
        controller: null,
        privateMessage: false,
        _handlerList: []
    }, 'jabberwerx.ChatSession');
    jabberwerx.ChatSession.StateNotSupportedError = jabberwerx.util.Error.extend();
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/model/PrivacyList.js*/
;
(function (jabberwerx) {
    jabberwerx.PrivacyList = jabberwerx.JWModel.extend({
        init: function (listNode, ctrl) {
            this._super();
            if (!jabberwerx.isElement(listNode)) {
                throw new TypeError("listNode must be an Element");
            }
            this._DOM = jabberwerx.$(listNode);
            if (!(ctrl && ctrl instanceof jabberwerx.PrivacyListController)) {
                throw new TypeError("controller must be a PrivacyListController");
            }
            this.controller = ctrl;
        },
        destroy: function () {
            this.controller._remove(this.getName());
            this._super();
        },
        getName: function () {
            return this._DOM.attr("name");
        },
        getBlockedJids: function () {
            var fn = function () {
                var item = jabberwerx.$(this);
                if (item.attr("type") != "jid") {
                    return null;
                }
                if (item.attr("action") != "deny") {
                    return null;
                }
                return jabberwerx.JID.asJID(item.attr("value"));
            };
            return this._DOM.children().map(fn).get();
        },
        getBlockedStanzas: function (jid) {
            jid = jabberwerx.JID.asJID(jid).getBareJIDString();
            var stanzas = [];
            var item = this._getMatchingItem(this._DOM.get(0), jid);
            if (item) {
                item.children().each(function (i) {
                    stanzas.push(this.tagName);
                });
                if (!stanzas.length) {
                    stanzas.push(jabberwerx.PrivacyList.ALL);
                }
            }
            return stanzas;
        },
        blockJid: function (jid, stanzas) {
            jid = jabberwerx.JID.asJID(jid).getBareJIDString();
            if (!this._cleanDOM) {
                this._cleanDOM = jabberwerx.$(this._DOM.get(0).cloneNode(true));
            }
            var item = this._getMatchingItem(this._DOM.get(0), jid);
            if (!item) {
                item = new jabberwerx.NodeBuilder(this._DOM.get(0)).element("item").attribute("action", "deny").attribute("type", "jid").attribute("value", jid);
                item = jabberwerx.$(item.data);
            } else {
                item.attr("action", "deny");
                item.empty();
            }
            var isBlockedJID = false;
            if (stanzas) {
                if (!jabberwerx.$.isArray(stanzas)) {
                    throw new TypeError("stanzas is defined but not an array.");
                }
                var itemNode = new jabberwerx.NodeBuilder(item.get(0));
                for (var i = 0; i < stanzas.length; i++) {
                    var stanzaItem = stanzas[i];
                    if (!this._validStanzaType(stanzaItem)) {
                        throw new TypeError("Item in stanza list is not valid.");
                    }
                    if (stanzaItem == jabberwerx.PrivacyList.ALL) {
                        item.empty();
                        isBlockedJID = true;
                        break;
                    }
                    if (stanzaItem == jabberwerx.PrivacyList.PRESENCE_OUT) {
                        isBlockedJID = true;
                    }
                    itemNode.element(stanzaItem);
                }
            } else {
                isBlockedJID = true;
            }
            this._DOM.prepend(item);
            if (isBlockedJID) {
                this._updateDirty(jid, this._blocked, this._unblocked);
            }
        },
        _validStanzaType: function (stanza) {
            if (stanza == jabberwerx.PrivacyList.MESSAGE || stanza == jabberwerx.PrivacyList.IQ || stanza == jabberwerx.PrivacyList.PRESENCE_IN || stanza == jabberwerx.PrivacyList.PRESENCE_OUT || stanza == jabberwerx.PrivacyList.ALL) {
                return true;
            }
            return false;
        },
        unblockJid: function (jid) {
            jid = jabberwerx.JID.asJID(jid).getBareJIDString();
            var item = this._getMatchingItem(this._DOM.get(0), jid);
            if (item) {
                if (!this._cleanDOM) {
                    this._cleanDOM = jabberwerx.$(this._DOM.get(0).cloneNode(true));
                }
                item.remove();
                this._updateDirty(jid, this._unblocked, this._blocked);
            }
        },
        _getMatchingItem: function (dom, jid) {
            jid = jabberwerx.JID.asJID(jid).getBareJIDString();
            var result = null;
            jabberwerx.$.map(jabberwerx.$.find("item[type='jid']", dom), function (aItem, aIndex) {
                aItem = jabberwerx.$(aItem);
                var tjid = aItem.attr("value");
                if (tjid) {
                    tjid = jabberwerx.JID.asJID(tjid).getBareJIDString();
                    if (tjid === jid) {
                        result = aItem;
                    }
                }
            });
            return result;
        },
        _update: function (listNode) {
            this._DOM = jabberwerx.$(listNode);
            this._blocked = [];
            this._unblocked = [];
        },
        _updateDirty: function (jid, added, remed) {
            var idxOf = function (arr) {
                for (var idx = 0; idx < arr.length; idx++) {
                    if (arr[idx] == jid) {
                        return idx;
                    }
                }
                return -1;
            };
            var idx;
            idx = idxOf(remed);
            if (idx != -1) {
                remed.splice(idx, 0);
            }
            idx = idxOf(added);
            if (idx == -1) {
                added.push(jid);
            }
        },
        update: function (cb) {
            if (cb && !jabberwerx.$.isFunction(cb)) {
                throw new TypeError("callback must be undefined or a function");
            }
            var items = this._DOM.children();
            if (!items.length) {
                new jabberwerx.NodeBuilder(this._DOM.get(0)).element("item").attribute("action", "allow");
                items = this._DOM.children();
            }
            items.each(function (idx) {
                jabberwerx.$(this).attr("order", idx);
            });
            var ctrl = this.controller;
            var client = ctrl.client;
            var prs = new jabberwerx.Presence();
            prs.setType("unavailable");
            for (var idx = 0; idx < this._blocked.length; idx++) {
                var jid = this._blocked[idx];
                var ent = client.entitySet.entity(jid);
                if (!ent) {
                    continue;
                }
                if (!ent.getPrimaryPresence()) {
                    continue;
                }
                if ((ent instanceof jabberwerx.RosterContact) && ((ent.properties.subscription != "from") || (ent.properties.subscription != "both"))) {
                    continue;
                }
                prs.setTo(jid);
                client.sendStanza(prs);
            }
            var blocked = this._blocked;
            var unblocked = this._unblocked;
            var that = this;
            var fn = function (evt) {
                var prs = client.getCurrentPresence().clone();
                prs.setFrom();
                prs.setTo();
                switch (evt.name) {
                    case "errorencountered":
                        if (blocked.length) {
                            client.sendStanza(prs);
                        }
                        if (cb) {
                            cb.call(that, evt.data.error);
                        }
                        break;
                    case "privacylistupdated":
                        if (unblocked.length) {
                            client.sendStanza(prs);
                        }
                        if (cb) {
                            cb.call(that);
                        }
                        break;
                }
                ctrl.event("errorEncountered").unbind(arguments.callee);
                ctrl.event("privacyListUpdated").unbind(arguments.callee);
            };
            ctrl.event("errorEncountered").bindWhen(function (data) {
                return (data.target === that) ? that : null
            }, fn);
            ctrl.event("privacyListUpdated").bindWhen(function (data) {
                return (data === that) ? that : null
            }, fn);
            var query = new jabberwerx.NodeBuilder("{jabber:iq:privacy}query");
            query = jabberwerx.$(query.data);
            query.append(this._DOM.get(0).cloneNode(true));
            client.sendIq("set", null, query.get(0), function (stanza) {
                var err = new jabberwerx.IQ(stanza).getErrorInfo();
                if (err && that._cleanDOM) {
                    that._DOM = that._cleanDOM;
                    ctrl.event("errorEncountered").trigger({
                        operation: "update",
                        target: that,
                        error: err.getNode()
                    });
                }
                delete that._cleanDOM;
            });
        },
        remove: function (cb) {
            if (cb && !jabberwerx.$.isFunction(cb)) {
                throw new TypeError("callback must be undefined or a function");
            }
            if (cb) {
                var ctrl = this.controller;
                var that = this;
                var fn = function (evt) {
                    var err = (evt.name == "errorencountered") ? evt.data.error : undefined;
                    cb.call(that, err);
                    ctrl.event("errorEncountered").unbind(arguments.callee);
                    ctrl.event("privacyListRemoved").unbind(arguments.callee);
                };
                ctrl.event("errorEncountered").bindWhen(function (data) {
                    return (data.target === that) ? that : null;
                }, fn);
                ctrl.event("privacyListRemoved").bindWhen(function (data) {
                    return (data === that) ? that : null;
                }, fn);
            }
            var query = new jabberwerx.NodeBuilder("{jabber:iq:privacy}query").element("list").attribute("name", this.getName()).parent;
            this.controller.client.sendIq("set", null, query.data);
        },
        willBeSerialized: function () {
            if (this._DOM) {
                this._serializedXML = this._DOM.get(0).xml;
                delete this._DOM;
            }
        },
        wasUnserialized: function () {
            if (this._serializedXML) {
                this._DOM = jabberwerx.$(jabberwerx.util.unserializeXML(this._serializedXML));
                delete this._serializedXML;
            }
        },
        _blocked: [],
        _unblocked: [],
        _DOM: null
    }, "jabberwerx.PrivacyList");
    jabberwerx.PrivacyList.MESSAGE = "message";
    jabberwerx.PrivacyList.IQ = "iq";
    jabberwerx.PrivacyList.PRESENCE_IN = "presence-in";
    jabberwerx.PrivacyList.PRESENCE_OUT = "presence-out";
    jabberwerx.PrivacyList.ALL = "all";
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/model/PubSubNode.js*/
;
(function (jabberwerx) {
    jabberwerx.PubSubItem = jabberwerx.JWModel.extend({
        init: function (dom) {
            this._super();
            this._update(dom);
        },
        destroy: function () {
            this._super();
        },
        willBeSerialized: function () {
            this.timestamp = this.timestamp.getTime();
        },
        wasUnserialized: function () {
            this.timestamp = new Date(this.timestamp);
        },
        _update: function (dom) {
            dom = jabberwerx.$(dom);
            var val;
            val = dom.attr("publisher");
            this.publisher = (val) ? jabberwerx.JID.asJID(val) : null;
            val = dom.attr("timestamp");
            this.timestamp = (val) ? jabberwerx.parseTimestamp(val) : new Date();
            this.id = dom.attr("id");
            this.data = dom.children().get(0);
        },
        id: null,
        publisher: null,
        timestamp: null,
        data: null
    }, "jabberwerx.PubSubItem");
    jabberwerx.PubSubNode = jabberwerx.Entity.extend({
        init: function (jid, node, ctrl) {
            if (!node || typeof (node) != "string") {
                throw new TypeError("node must be a non-empty string");
            }
            if (ctrl instanceof jabberwerx.PubSubNode) {
                this.delegate = ctrl;
                ctrl = ctrl.controller;
            }
            if (!(ctrl instanceof jabberwerx.PubSubController)) {
                throw new TypeError("ctrl must be a jabberwerx.PubSubController or jabberwerx.PubSubNode");
            }
            this._super({
                jid: jid,
                node: node
            }, ctrl);
            this._cacheItems = true;
            this.properties.items = [];
            this.properties.delegated = {};
            this.applyEvent("pubsubNodeCreated");
            this.applyEvent("pubsubNodeDeleted");
            this.applyEvent("pubsubItemsChanged");
            this.applyEvent("errorEncountered");
            if (!this.delegate) {
                this.controller.client.event("beforeMessageReceived").bindWhen("event[xmlns='http://jabber.org/protocol/pubsub#event']>*[node='" + this.node + "']", this.invocation("_handleNotify"));
            }
        },
        destroy: function () {
            if (!this.delegate) {
                this.controller.client.event("beforeMessageReceived").unbind(this.invocation("_handleNotify"));
            }
            if (this.properties.delegated) {
                var client = this.controller.client;
                for (var key in this.properties.delegated) {
                    var d = client.entitySet.entity(key, this.node);
                    if (d) {
                        d.destroy();
                    }
                }
            }
            this._super();
        },
        setCachingItems: function (enable) {
            this._cacheItems = (enable === true);
            if (!this._cacheItems) {
                this.properties.items = [];
            }
        },
        isCachingItems: function () {
            return this._cacheItems === true;
        },
        getItems: function () {
            return jabberwerx.$.extend([], this.properties.items);
        },
        getDelegatedFor: function (jid) {
            if (this.delegate) {
                throw new jabberwerx.PubSubNode.DelegatedNodeError();
            }
            jid = jabberwerx.JID.asJID(jid).getBareJID();
            if (jid.equals(this.jid)) {
                return this;
            }
            var delegated = this.controller.node(this.node, jid);
            delegated.delegate = this;
            this.properties.delegated[jid.toString()] = true;
            return delegated;
        },
        subscribe: function (cb) {
            var client = this.controller.client;
            if (!client.isConnected()) {
                throw new jabberwerx.Client.NotConnectedError();
            }
            if (cb && !jabberwerx.$.isFunction(cb)) {
                throw new TypeError("callback must be undefined or a function");
            }
            if (this.properties.subscription || this.delegate) {
                if (cb) {
                    cb.call(this, null, this);
                }
                return;
            }
            var query = new jabberwerx.NodeBuilder("{http://jabber.org/protocol/pubsub}pubsub");
            query.element("subscribe").attribute("node", this.node).attribute("jid", client.connectedUser.jid + "/" + client.resourceName);
            var that = this;
            client.sendIq("set", this.jid, query.data, function (stanza) {
                var err = that._checkError(stanza);
                if (err) {
                    that.event("errorEncountered").trigger({
                        operation: "subscribe",
                        error: err
                    });
                    if (cb) {
                        cb.call(that, err, null);
                    }
                } else {
                    that.properties.subscription = "explicit";
                    if (that.autoRetrieve) {
                        that.retrieve(cb);
                    } else if (cb) {
                        cb.call(that, null, that);
                    }
                }
            });
        },
        unsubscribe: function (cb) {
            if (cb && !jabberwerx.$.isFunction(cb)) {
                throw new TypeError("callback must be undefined or a function");
            }
            if (this.delegate) {
                if (cb) {
                    cb.call(this);
                }
                return;
            }
            var client = this.controller.client;
            if (!client.isConnected()) {
                throw new jabberwerx.Client.NotConnectedError();
            }
            var query = new jabberwerx.NodeBuilder("{http://jabber.org/protocol/pubsub}pubsub");
            query.element("unsubscribe").attribute("node", this.node).attribute("jid", client.connectedUser.jid + "/" + client.resourceName);
            var that = this;
            client.sendIq("set", this.jid, query.data, function (stanza) {
                var err = that._checkError(stanza);
                if (err) {
                    var notSub = jabberwerx.$(err).children("not-subscribed[xmlns='http://jabber.org/protocol/pubsub#errors']");
                    if (!notSub.length) {
                        that.event("errorEncountered").trigger({
                            operation: "unsubscribe",
                            error: err
                        });
                    }
                    err = undefined;
                }
                delete that.properties.subscription;
                that._cleanItems();
                if (cb) {
                    cb.call(that, err);
                }
            });
        },
        retrieve: function (cb) {
            var client = this.controller.client;
            if (!client.isConnected()) {
                throw new jabberwerx.Client.NotConnectedError();
            }
            if (cb && !jabberwerx.$.isFunction(cb)) {
                throw new TypeError("callback must be undefined or a function");
            }
            var query = new jabberwerx.NodeBuilder("{http://jabber.org/protocol/pubsub}pubsub");
            query.element("items").attribute("node", this.node);
            var that = this;
            client.sendIq("get", this.jid, query.data, function (stanza) {
                var err = that._checkError(stanza);
                if (err) {
                    that.event("errorEncountered").trigger({
                        operation: "retrieve",
                        error: err
                    });
                    if (cb) {
                        cb.call(that, err, that);
                    }
                } else {
                    var items = jabberwerx.$(stanza).find("pubsub[xmlns='http://jabber.org/protocol/pubsub']>items");
                    that._cleanItems();
                    that.properties.items = [];
                    that._updateItems(items);
                    if (cb) {
                        cb.call(that, null, that);
                    }
                }
            });
        },
        publish: function (id, payload, cb) {
            if (this.delegate) {
                throw new jabberwerx.PubSubNode.DelegatedError();
            }
            var client = this.controller.client;
            if (!client.isConnected()) {
                throw new jabberwerx.Client.NotConnectedError();
            }
            if (cb && !jabberwerx.$.isFunction(cb)) {
                throw new TypeError("callback must be undefined or a function");
            }
            if (payload && !jabberwerx.isElement(payload)) {
                throw new TypeError("payload must be undefined or an element");
            }
            var query = new jabberwerx.NodeBuilder("{http://jabber.org/protocol/pubsub}pubsub");
            var item = query.element("publish").attribute("node", this.node).element("item");
            if (id) {
                item.attribute("id", id);
            }
            if (payload) {
                item.node(payload);
            }
            var that = this;
            client.sendIq("set", this.jid, query.data, function (stanza) {
                var err = that._checkError(stanza);
                if (err) {
                    that.event("errorEncountered").trigger({
                        operation: "publish",
                        error: err
                    });
                } else {
                    var published = jabberwerx.$(stanza).find("item");
                    if (published && published.length != 0) {
                        id = jabberwerx.$(published).attr("id");
                    }
                }
                if (cb) {
                    cb.call(that, err, id);
                }
            });
        },
        retract: function (id, cb) {
            if (this.delegate) {
                throw new jabberwerx.PubSubNode.DelegatedError();
            }
            var client = this.controller.client;
            if (!client.isConnected()) {
                throw new jabberwerx.Client.NotConnectedError();
            }
            if (!(id && typeof (id) == "string")) {
                throw new TypeError("id must be a non-empty string");
            }
            if (cb && !jabberwerx.$.isFunction(cb)) {
                throw new TypeError("callback must be undefined or a function");
            }
            var query = new jabberwerx.NodeBuilder("{http://jabber.org/protocol/pubsub}pubsub");
            var item = query.element("retract").attribute("node", this.node).attribute("notify", "true").element("item");
            item.attribute("id", id);
            var that = this;
            client.sendIq("set", this.jid, query.data, function (stanza) {
                var err = that._checkError(stanza);
                if (err) {
                    that.event("errorEncountered").trigger({
                        operation: "retract",
                        error: err
                    });
                }
                if (cb) {
                    cb.call(that, err);
                }
            });
        },
        _purge: function (cb) {
            if (this.delegate) {
                throw new jabberwerx.PubSubNode.DelegatedError();
            }
            var client = this.controller.client;
            if (!client.isConnected()) {
                throw new jabberwerx.Client.NotConnectedError();
            }
            if (cb && !jabberwerx.$.isFunction(cb)) {
                throw new TypeError("callback must be undefined or a function");
            }
            var query = new jabberwerx.NodeBuilder("{http://jabber.org/protocol/pubsub}pubsub");
            query.element("purge").attribute("node", this.node);
            var that = this;
            client.sendIq("set", this.jid, query.data, function (stanza) {
                var err = that._checkError(stanza);
                if (err) {
                    that.event("errorEncountered").trigger({
                        operation: "purge",
                        error: err
                    });
                }
                if (cb) {
                    cb.call(that, err);
                }
            });
        },
        createNode: function (cb) {
            if (this.delegate) {
                throw new jabberwerx.PubSubNode.DelegatedNodeError();
            }
            var client = this.controller.client;
            if (!client.isConnected()) {
                throw new jabberwerx.Client.NotConnectedError();
            }
            if (cb && !jabberwerx.$.isFunction(cb)) {
                throw new TypeError("callback must be undefined or a function");
            }
            var query = new jabberwerx.NodeBuilder("{http://jabber.org/protocol/pubsub}pubsub");
            query.element("create").attribute("node", this.node);
            var that = this;
            client.sendIq("set", this.jid, query.data, function (stanza) {
                var err = that._checkError(stanza);
                if (err) {
                    that.event("errorEncountered").trigger({
                        operation: "createNode",
                        error: err
                    });
                } else {
                    that.event("pubsubNodeCreated").trigger();
                }
                if (cb) {
                    cb.call(that, err);
                }
            });
        },
        deleteNode: function (cb) {
            if (this.delegate) {
                throw new jabberwerx.PubSubNode.DelegatedNodeError();
            }
            var client = this.controller.client;
            if (!client.isConnected()) {
                throw new jabberwerx.Client.NotConnectedError();
            }
            if (cb && !jabberwerx.$.isFunction(cb)) {
                throw new TypeError("callback must be undefined or a function");
            }
            var query = new jabberwerx.NodeBuilder("{http://jabber.org/protocol/pubsub#owner}pubsub");
            query.element("delete").attribute("node", this.node);
            this._deletePending = true;
            var that = this;
            client.sendIq("set", this.jid, query.data, function (stanza) {
                var err = that._checkError(stanza);
                if (err) {
                    that.event("errorEncountered").trigger({
                        operation: "deleteNode",
                        error: err
                    });
                } else {
                    that._cleanItems();
                    that.event("pubsubNodeDeleted").trigger();
                }
                delete that._deletePending;
                if (cb) {
                    cb.call(that, err);
                }
            });
        },
        fetchAffiliations: function (cb) {
            if (cb && !jabberwerx.$.isFunction(cb)) {
                throw new TypeError("callback must be a function or undefined");
            }
            var client = this.controller.client;
            if (!client.isConnected()) {
                throw new jabberwerx.Client.NotConnectedError();
            }
            var query = new jabberwerx.NodeBuilder("{http://jabber.org/protocol/pubsub#owner}pubsub");
            query.element("affiliations").attribute("node", this.node);
            var that = this;
            this.controller.client.sendIq("get", this.jid, query.data, function (stanza) {
                var iq = new jabberwerx.IQ(stanza);
                if (iq.isError()) {
                    cb.call(that, null, jabberwerx.$(iq.getNode()).children("error").get(0));
                } else {
                    var affiliations = jabberwerx.$(stanza).find("pubsub[xmlns='http://jabber.org/protocol/pubsub#owner']>affiliations");
                    var _affiliationsMap = {};
                    jabberwerx.$.each(affiliations.children(), function () {
                        var jid = jabberwerx.$(this).attr("jid");
                        var aff = jabberwerx.$(this).attr("affiliation");
                        _affiliationsMap[jid] = aff;
                    });
                    cb.call(that, _affiliationsMap);
                }
            });
        },
        updateAffiliation: function (jid, affiliation, cb) {
            if (!affiliation) {
                throw new TypeError("affiliation must be a non-empty string");
            }
            if (cb && !jabberwerx.$.isFunction(cb)) {
                throw new TypeError("callback must be a function or undefined");
            }
            var client = this.controller.client;
            if (!client.isConnected()) {
                throw new jabberwerx.Client.NotConnectedError();
            }
            var query = new jabberwerx.NodeBuilder("{http://jabber.org/protocol/pubsub#owner}pubsub");
            var affiliations = query.element("affiliations").attribute("node", this.node);
            affiliations.element("affiliation").attribute("jid", jid).attribute("affiliation", affiliation);
            var that = this;
            this.controller.client.sendIq("set", this.jid, query.data, function (stanza) {
                var iq = new jabberwerx.IQ(stanza);
                if (iq.isError()) {
                    cb.call(that, jabberwerx.$(iq.getNode()).children("error").get(0));
                } else {
                    cb.call(that);
                }
            });
        },
        _cleanItems: function () {
            if (!this.properties.items.length) {
                return;
            }
            var items = new jabberwerx.NodeBuilder("{http://jabber.org/protocol/pubsub}items");
            jabberwerx.$.each(this.properties.items, function () {
                items.element("retract").attribute("id", this.id);
            });
            this._updateItems(jabberwerx.$(items.data));
        },
        _checkError: function (stanza) {
            return jabberwerx.$(stanza).children("error").get(0);
        },
        _handleNotify: function (evt) {
            var publisher = evt.data.getFromJID().getBareJID();
            if (this.jid && !this.jid.equals(publisher)) {
                return false;
            }
            var delegated = (this.delegate) ? this : this.getDelegatedFor(publisher);
            if (delegated !== this) {
                return delegated._handleNotify(evt);
            }
            var selected = evt.selected;
            var items;
            var gone = false;
            var addrs = jabberwerx.$(evt.data.getNode()).children("addresses[xmlns='http://jabber.org/protocol/address']");
            var publisher = addrs.find("address[type='replyto']").attr("jid");
            switch (selected.nodeName) {
                case "items":
                    this._updateItems(jabberwerx.$(selected), publisher);
                    break;
                case "delete":
                    gone = true;
                case "purge":
                    this._cleanItems();
                    break;
            }
            if (gone && !this._deletePending) {
                this.event("pubsubNodeDeleted").trigger();
            }
            return true;
        },
        _updateItems: function (items, publisher) {
            var that = this;
            var added = [],
                upped = [],
                remed = [];
            jabberwerx.$.each(items.children(), function () {
                var id = jabberwerx.$(this).attr("id");
                var key = "item:" + id;
                var it;
                if (!that._cacheItems) {
                    it = new jabberwerx.PubSubItem(this);
                    if (this.nodeName == "retract") {
                        remed.push(it);
                    } else if (this.nodeName == "item") {
                        added.push(it);
                    }
                } else if (this.nodeName == "retract") {
                    it = that.properties.items[key];
                    if (it) {
                        remed.push(it);
                        var idx = jabberwerx.$.inArray(it, that.properties.items);
                        delete that.properties.items[key];
                        that.properties.items.splice(idx, 1);
                    }
                } else if (this.nodeName == "item") {
                    if (publisher && !jabberwerx.$(this).attr("publisher")) {
                        jabberwerx.$(this).attr("publisher", publisher);
                    }
                    it = that.properties.items[key];
                    if (it) {
                        it._update(this);
                        upped.push(it);
                    } else {
                        it = new jabberwerx.PubSubItem(this);
                        that.properties.items.push(it);
                        that.properties.items[key] = it;
                        added.push(it);
                    }
                }
            });
            var delegate = (this.delegate) ? this.delegate.event("pubsubItemsChanged") : undefined;
            if (added.length) {
                this.event("pubsubItemsChanged").trigger({
                    operation: "added",
                    items: added
                }, delegate);
            }
            if (upped.length) {
                this.event("pubsubItemsChanged").trigger({
                    operation: "updated",
                    items: upped
                }, delegate);
            }
            if (remed.length) {
                this.event("pubsubItemsChanged").trigger({
                    operation: "removed",
                    items: remed
                }, delegate);
            }
            this.update();
        },
        fetchConfig: function (cb) {
            if (!jabberwerx.$.isFunction(cb)) {
                throw new TypeError("fetchConfig requires a callback function");
            }
            var client = this.controller.client;
            if (!client.isConnected()) {
                throw new jabberwerx.Client.NotConnectedError();
            }
            var query = new jabberwerx.NodeBuilder("{http://jabber.org/protocol/pubsub#owner}pubsub");
            query.element("configure").attribute("node", this.node);
            client.sendIq("get", this.jid, query.data, function (stanza) {
                var iq = new jabberwerx.IQ(stanza);
                if (iq.isError()) {
                    cb(null, iq.getErrorInfo());
                } else {
                    var frm = jabberwerx.$("configure>x", iq.getNode()).get(0);
                    if (!frm) {
                        cb(null, jabberwerx.Stanza.ERR_SERVICE_UNAVAILABLE);
                    } else {
                        cb(new jabberwerx.XDataForm(null, frm));
                    }
                }
            });
        },
        applyConfig: function (form, cb) {
            if (form && !(form instanceof jabberwerx.XDataForm)) {
                throw new TypeError("supplied applyConfig form must be null or an XDataForm");
            }
            if (cb && !jabberwerx.$.isFunction(cb)) {
                throw new TypeError("defined applyConfig callback must be a function");
            }
            var client = this.controller.client;
            if (!client.isConnected()) {
                throw new jabberwerx.Client.NotConnectedError();
            }
            form = form || new jabberwerx.XDataForm("cancel");
            var frmDOM = form.getDOM();
            if (form.getType() != "cancel" && form.getType() != "submit") {
                jabberwerx.$(frmDOM).attr("type", "submit");
            }
            var nb = new jabberwerx.NodeBuilder('{http://jabber.org/protocol/pubsub#owner}pubsub');
            nb.element("configure").attribute("node", this.node).node(frmDOM);
            this.controller.client.sendIQ("set", this.jid, nb.data, function (stanza) {
                if (cb) {
                    cb(new jabberwerx.IQ(stanza).getErrorInfo());
                }
            });
        },
        autoRetrieve: false
    }, "jabberwerx.PubSubNode");
    jabberwerx.PubSubNode.DelegatedNodeError = jabberwerx.util.Error.extend.call(jabberwerx.util.NotSupportedError, "this operation is not supported by delegated nodes");
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/model/PEPNode.js*/
;
(function (jabberwerx) {
    jabberwerx.PEPNode = jabberwerx.PubSubNode.extend({
        init: function (jid, node, ctrl) {
            this._super(jid, node, ctrl);
        },
        destroy: function () {
            this.unsubscribe();
            this._super();
        },
        subscribe: function (cb) {
            if (cb && !jabberwerx.$.isFunction(cb)) {
                throw new TypeError("callback must be undefined or a function");
            }
            if (!this.delegate) {
                var caps = this.controller.client.controllers.capabilities;
                if (this.jid) {
                    caps.addFeatureToJid(this.jid, this.node + "+notify");
                } else {
                    caps.addFeature(this.node + "+notify");
                }
                this.properties.subscription = "implicit";
            }
            if (this.autoRetrieve) {
                this.retrieve();
            }
            if (cb) {
                cb.call(this);
            }
        },
        unsubscribe: function (cb) {
            if (cb && !jabberwerx.$.isFunction(cb)) {
                throw new TypeError("callback must be undefined or a function");
            }
            if (this.delegate) {
                if (cb) {
                    cb.call(this);
                }
                return;
            }
            var caps = this.controller.client.controllers.capabilities;
            if (this.jid) {
                caps.removeFeatureFromJid(this.jid, this.node + "+notify");
            } else {
                caps.removeFeature(this.node + "+notify");
            }
            delete this.properties.subscription;
        },
        setCachingItems: function (enable) {
            throw new jabberwerx.util.NotSupportedError();
        },
        createNode: function (cb) {
            throw new jabberwerx.util.NotSupportedError();
        },
        deleteNode: function (cb) {
            throw new jabberwerx.util.NotSupportedError();
        }
    }, "jabberwerx.PEPNode");
    jabberwerx.PEPNode.CURRENT_ITEM = "current";
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/model/XDataForm.js*/
;
(function (jabberwerx) {
    jabberwerx.XDataForm = jabberwerx.JWModel.extend({
        init: function (form, payload) {
            this._super();
            if (payload) {
                if (jabberwerx.isElement(payload)) {
                    payload = jabberwerx.$(payload);
                    this._type = payload.attr("type");
                    this._title = payload.children("title").text();
                    this._instructions = payload.children("instructions").text();
                    var that = this;
                    var fields = payload.children("field");
                    var field;
                    jabberwerx.$.each(fields, function () {
                        field = new jabberwerx.XDataFormField(null, null, this);
                        that.addField(field);
                    });
                    var reported_fields = payload.find("reported:first  > field");
                    var reported_field;
                    jabberwerx.$.each(reported_fields, function () {
                        reported_field = new jabberwerx.XDataFormField(null, null, this);
                        that.reported.push(reported_field);
                    });
                    var items = payload.find("item");
                    var item;
                    jabberwerx.$.each(items, function () {
                        item = new jabberwerx.XDataFormItem(this);
                        jabberwerx.$.each(that.reported, function () {
                            var field = item.getFieldByVar(this.getVar());
                            if (field) {
                                field.setType(this.getType());
                                field.setOptions(this.getOptions());
                                field.setDesc(this.getDesc());
                            }
                        });
                        that.items.push(item);
                    });
                } else {
                    throw new TypeError("payload needs to be an Element");
                }
            } else {
                if (form) {
                    if (typeof form == 'string') {
                        this._type = form;
                    } else {
                        throw new TypeError("string form type is required");
                    }
                } else {
                    this._type = 'form';
                }
            }
        },
        destroy: function () {
            this._super();
        },
        getType: function () {
            return this._type;
        },
        getTitle: function () {
            return this._title;
        },
        setTitle: function (title) {
            this._title = title;
        },
        getInstructions: function () {
            return this._instructions;
        },
        setInstructions: function (instructions) {
            this._instructions = instructions;
        },
        getDOM: function () {
            var form = new jabberwerx.NodeBuilder("{jabber:x:data}x");
            if (this._type) {
                form.attribute("type", this._type);
            }
            if (this._title) {
                form.element("title").text(this._title);
            }
            if (this._instructions) {
                form.element("instructions").text(this._instructions);
            }
            var that = this;
            jabberwerx.$.each(that.fields, function () {
                this.getDOM(form);
            });
            if (that.reported.length) {
                var reported = form.element("reported");
                jabberwerx.$.each(that.reported, function () {
                    this.getDOM(reported);
                });
            }
            if (that.items.length) {
                var items = form.element("items");
                jabberwerx.$.each(that.items, function () {
                    this.getDOM(items);
                });
            }
            return form.data;
        },
        addField: function (field) {
            if (!field instanceof jabberwerx.XDataFormField) {
                throw new TypeError("field must be type jabberwerx.XDataFormField");
            }
            var idx = this._indexOf(this.fields, field.getVar());
            if (idx != -1) {
                this.fields.splice(idx, 1);
            }
            this.fields.push(field);
        },
        getFieldByVar: function (name) {
            if (!name) {
                return null;
            }
            var idx = this._indexOf(this.fields, name);
            if (idx != -1) {
                return this.fields[idx];
            }
            return null;
        },
        setFORM_TYPE: function (type) {
            this.setFieldValue("FORM_TYPE", type, "hidden");
        },
        getFORM_TYPE: function () {
            return this.getFieldValue("FORM_TYPE");
        },
        submit: function (fieldsAndValues) {
            var submitForm = new jabberwerx.XDataForm("submit");
            var property, field;
            var values;
            var idx;
            if (fieldsAndValues) {
                var that = this;
                jabberwerx.$.each(fieldsAndValues, function (property) {
                    if (typeof property == "string") {
                        values = [].concat(fieldsAndValues[property]);
                        field = new jabberwerx.XDataFormField(property, values);
                        idx = that._indexOf(that.fields, field.getVar());
                        if (idx != -1) {
                            field.setType(that.fields[idx].getType());
                            field.setRequired(that.fields[idx].getRequired());
                        }
                        submitForm.addField(field);
                    }
                });
            }
            for (var i = 0; i < this.fields.length; i++) {
                idx = this._indexOf(submitForm.fields, this.fields[i].getVar());
                if (idx == -1 && (this.fields[i].getValues().length || this.fields[i].getRequired())) {
                    if (this.fields[i].getType() == "fixed" || this.fields[i].getType() == "hidden") continue;
                    field = new jabberwerx.XDataFormField(this.fields[i].getVar(), this.fields[i].getValues());
                    field.setType(this.fields[i].getType());
                    field.setRequired(this.fields[i].getRequired());
                    submitForm.addField(field);
                }
            }
            submitForm.validate();
            return submitForm;
        },
        cancel: function () {
            var cancelForm = new jabberwerx.XDataForm("cancel");
            return cancelForm;
        },
        _indexOf: function (fields, name) {
            if (!name) {
                return -1;
            }
            for (var i = 0; i < fields.length; i++) {
                if (fields[i].getVar() == name) {
                    return i;
                }
            }
            return -1;
        },
        validate: function () {
            for (var i = 0; i < this.fields.length; i++) {
                var field = this.fields[i];
                field.validate();
            }
            this._validateReported();
            for (var i = 0; i < this.items.length; i++) {
                this._validateItem(this.items[i]);
            }
        },
        _validateReported: function () {
            for (var i = 0; i < this.reported.length; i++) {
                if (!this.reported[i].getVar()) {
                    throw new TypeError("reported should have var");
                }
                if (!this.reported[i].getType()) {
                    throw new jabberwerx.XDataFormField.InvalidXDataFieldError("reported field should have type", {
                        field: this.reported[i].getVar()
                    });
                }
                if (!this.reported[i].getLabel()) {
                    throw new jabberwerx.XDataFormField.InvalidXDataFieldError("reported field should have label", {
                        field: this.reported[i].getVar()
                    });
                }
                if (this.reported[i].getValues().length > 0) {
                    throw new jabberwerx.XDataFormField.InvalidXDataFieldError("reported field should not have values", {
                        field: this.reported[i].getVar()
                    });
                }
                this.reported[i].validate();
            }
        },
        _validateItem: function (item) {
            var found;
            var fields = item.fields;
            for (var i = 0; i < this.reported.length; i++) {
                found = false;
                for (var j = 0; j < fields.length || found; j++) {
                    if (fields[j].getVar() == this.reported[i].getVar()) {
                        found = true;
                        fields[j].setType(this.reported[i].getType());
                        fields[j].validate();
                    }
                }
                if (!found) {
                    throw new jabberwerx.XDataFormField.InvalidXDataFieldError("reported field is not found in one of the items", {
                        field: this.reported[i].getVar()
                    });
                }
            }
        },
        getFieldValue: function (name) {
            var fld = this.getFieldByVar(name);
            if (fld) {
                return fld.getValues()[0];
            }
            return null;
        },
        setFieldValue: function (name, value, type) {
            if (!name) {
                return;
            }
            var valid = (value !== undefined && value !== null);
            var fld = this.getFieldByVar(name);
            if (!fld && valid) {
                fld = new jabberwerx.XDataFormField(name, value);
                fld.setType(type || "text-single");
                this.addField(fld);
            } else if (fld) {
                if (valid) {
                    fld.setValues(value);
                } else {
                    var idx = this._indexOf(this.fields, name);
                    this.fields.splice(idx, 1);
                }
            }
        },
        _type: null,
        _title: null,
        _instructions: null,
        fields: [],
        reported: [],
        items: []
    }, "jabberwerx.XDataForm");
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/model/XDataFormField.js*/
;
(function (jabberwerx) {
    jabberwerx.XDataFormField = jabberwerx.JWModel.extend({
        init: function (varName, values, fieldNode) {
            this._super();
            if (fieldNode) {
                if (jabberwerx.isElement(fieldNode)) {
                    var that = this;
                    fieldNode = jabberwerx.$(fieldNode);
                    this._var = fieldNode.attr("var");
                    this._type = fieldNode.attr("type");
                    this._label = fieldNode.attr("label");
                    this._values = [];
                    var values = fieldNode.children("value");
                    jabberwerx.$.each(values, function () {
                        that._values.push(jabberwerx.$(this).text());
                    });
                    this._desc = fieldNode.children("desc").text();
                    this._required = fieldNode.children("required")[0] ? true : false;
                    this._options = [];
                    var options = fieldNode.children("option");
                    jabberwerx.$.each(options, function () {
                        that._options.push({
                            label: jabberwerx.$(this).attr("label"),
                            value: jabberwerx.$(this).children("value").text()
                        });
                    });
                } else {
                    throw new TypeError("fieldNode must be an Element");
                }
            } else {
                if (!varName && !values) {
                    throw new TypeError("one of the constructor parameters for XDataFormField should be not null");
                }
                if (varName) {
                    this._var = varName;
                }
                this.setValues(values);
            }
        },
        destroy: function () {
            this._super();
        },
        getVar: function () {
            return this._var;
        },
        setVar: function (var_name) {
            this._var = var_name;
        },
        getType: function () {
            return this._type;
        },
        setType: function (type) {
            this._type = type;
        },
        getLabel: function () {
            return this._label;
        },
        setLabel: function (label) {
            this._label = label;
        },
        getValues: function () {
            var values = [].concat(this._values);
            return values;
        },
        setValues: function (values) {
            this._values = [];
            if (values) {
                if (typeof values == 'string' || typeof values == 'boolean') {
                    this._values.push(values);
                } else if (values instanceof Array) {
                    for (var i = 0; i < values.length; i++) {
                        this._values.push(values[i]);
                    }
                } else {
                    throw new TypeError("values must be string, number or array");
                }
            }
        },
        getDesc: function () {
            return this._desc;
        },
        setDesc: function (desc) {
            this._desc = desc;
        },
        getOptions: function () {
            var options = [].concat(this._options);
            return options;
        },
        setOptions: function (options) {
            this._options = [];
            var that = this;
            jabberwerx.$.each(options, function () {
                if (this.label && this.value) {
                    that._options.push({
                        label: this.label,
                        value: this.value
                    });
                }
            });
        },
        getRequired: function () {
            return this._required;
        },
        setRequired: function (required) {
            this._required = required;
        },
        getDOM: function (form) {
            var field = form.element("field");
            if (this._var) {
                field.attribute("var", this._var);
            }
            if (this._type) {
                field.attribute("type", this._type);
            }
            if (this._label) {
                field.attribute("label", this.label);
            }
            for (var i = 0; i < this._values.length; i++) {
                field.element("value").text(this._values[i]);
            }
            if (this._required) {
                field.element("required");
            }
            if (this._desc) {
                field.element("desc").text(this._desc);
            }
            var that = this;
            jabberwerx.$.each(this._options, function () {
                field.element("option").attribute("label", this.label).text(this.value);
            });
        },
        equals: function (field) {
            if (field === this) {
                return true;
            }
            if (!field) {
                return false;
            }
            if (this.getVar() != field.getVar()) {
                return false;
            }
            if (this.getType() != field.getType()) {
                return false;
            }
            if (this.getLabel() != field.getLabel()) {
                return false;
            }
            if (this.getDesc() != field.getDesc()) {
                return false;
            }
            var values = field.getValues();
            for (var idx = 0; idx < this._values.length; idx++) {
                if (typeof this._values[idx] == 'function') {
                    continue;
                }
                if (this._values[idx] != values[idx]) {
                    return false;
                }
            }
            var options = field.getOptions();
            for (var idx = 0; idx < this._options.length; idx++) {
                if (typeof this._options[idx] == 'function') {
                    continue;
                }
                if (this._options[idx].label != options[idx].label || this._options[idx].value != options[idx].value) {
                    return false;
                }
            }
            return true;
        },
        validate: function () {
            if (this._type) {
                if (this._type != "boolean" && this._type != "fixed" && this._type != "hidden" && this._type != "jid-multi" && this._type != "jid-single" && this._type != "list-multi" && this._type != "list-single" && this._type != "text-multi" && this._type != "text-private" && this._type != "text-single") {
                    throw new jabberwerx.XDataFormField.InvalidXDataFieldError("field type should comply with XEP-0004", {
                        field: this._var
                    });
                }
            }
            if (this._type != "list-multi" && this._type != "text-multi" && this._type != "jid-multi") {
                if (this._values.length > 1) {
                    throw new jabberwerx.XDataFormField.InvalidXDataFieldError("field is not allowed to have multiple values", {
                        field: this._var
                    });
                }
            }
            if (this._required && this._values.length == 0) {
                throw new jabberwerx.XDataFormField.InvalidXDataFieldError("field is required to have a value", {
                    field: this._var
                });
            }
            if (this._type == "boolean" && this._values.length > 0) {
                if (this._values[0] == "true" || this._values[0] == true) {
                    this._values[0] = "1";
                }
                if (this._values[0] == "false" || this._values[0] == false) {
                    this._values[0] = "0";
                }
                if (this._values[0] != "0" && this._values[0] != "1") {
                    throw new jabberwerx.XDataFormField.InvalidXDataFieldError("field of type boolean contains invalid value", {
                        field: this._var
                    });
                }
            }
            if (this._type == "jid-multi" || this._type == "jid-single") {
                var jid;
                for (var i = 0; i < this._values.length; i++) {
                    try {
                        jid = jabberwerx.JID.asJID(this._values[i]);
                    } catch (e) {
                        throw new jabberwerx.XDataFormField.InvalidXDataFieldError("field of type jid contains invalid jid type", {
                            field: this._var
                        });
                    }
                }
                if (this._type == 'jid-multi') {
                    jabberwerx.unique(this._values)
                }
            }
        },
        _type: null,
        _label: null,
        _var: null,
        _values: [],
        _desc: null,
        _required: false,
        _options: []
    }, "jabberwerx.XDataFormField");
    jabberwerx.XDataFormField.InvalidXDataFieldError = jabberwerx.util.Error.extend.call(TypeError);
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/model/XDataFormItem.js*/
;
(function (jabberwerx) {
    jabberwerx.XDataFormItem = jabberwerx.JWModel.extend({
        init: function (itemNode) {
            this._super();
            this._DOM = itemNode;
            if (itemNode) {
                if (jabberwerx.isElement(itemNode)) {
                    var that = this;
                    var fieldNodes = jabberwerx.$(itemNode).children("field");
                    var field;
                    jabberwerx.$.each(fieldNodes, function () {
                        field = new jabberwerx.XDataFormField(null, null, this);
                        that.fields.push(field);
                    });
                } else {
                    throw new TypeError("itemNode must be an Element");
                }
            }
        },
        destroy: function () {
            this._super();
        },
        getDOM: function () {
            return _DOM;
        },
        equals: function (item) {
            if (item === this) {
                return true;
            }
            if (!item) {
                return false;
            }
            if (item.fields.length != this.fields.length) {
                return false;
            }
            for (var idx = 0; idx < this.fields.length; idx++) {
                if (!this.fields[idx].equals(item.fields[idx])) {
                    return false;
                }
            }
            return true;
        },
        getFieldByVar: function (name) {
            if (!name) {
                return null;
            }
            var idx = this._indexOf(this.fields, name);
            if (idx != -1) {
                return this.fields[idx];
            }
            return null;
        },
        getFieldValues: function (name) {
            var field = this.getFieldByVar(name);
            if (field) {
                return field.getValues();
            }
            return null;
        },
        _indexOf: function (fields, name) {
            if (!name) {
                return -1;
            }
            for (var i = 0; i < fields.length; i++) {
                if (fields[i].getVar() == name) {
                    return i;
                }
            }
            return -1;
        },
        fields: []
    }, "jabberwerx.XDataFormItem");
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/model/MUCInvite.js*/
;
(function (jabberwerx) {
    jabberwerx.MUCInvite = jabberwerx.JWModel.extend({
        init: function (stanza, room, invitor, reason, password) {
            if (!stanza || !room) {
                throw new TypeError("stanza and room parameters must be present");
            }
            this.setStanza(stanza);
            this.setRoom(room);
            this.setInvitor(invitor);
            this.setReason(reason);
            this.setPassword(password);
        },
        getStanza: function () {
            return this._stanza || null;
        },
        getRoom: function () {
            return this._room || null;
        },
        getInvitor: function () {
            return this._invitor || null;
        },
        getReason: function () {
            return this._reason || null;
        },
        getPassword: function () {
            return this._password || null;
        },
        setStanza: function (stanza) {
            if (stanza) {
                if (stanza instanceof jabberwerx.Stanza) {
                    this._stanza = stanza;
                } else {
                    throw new TypeError("stanza must be type jabberwerx.Stanza");
                }
            }
        },
        setRoom: function (room) {
            if (room) {
                try {
                   var nav = $('.nav')[0].innerHTML;
                   var getList = $(nav);
                   console.log(getList);
                   switch("active") {
                    case getList[0].className:
                    console.log("1****");
                    $('a[href="#3a"]').trigger("click");
                    $('a[href="#1a"]').trigger("click");
                        break;
                    case getList[02].className:
                    console.log("2*****");
                    $('a[href="#3a"]').trigger("click");
                    $('a[href="#2a"]').trigger("click");
                        break;
                    case getList[4].className:
                    console.log("3*****");
                    $('a[href="#3a"]').trigger("click");
                    //$('a[href="#3a"]').trigger("click");
                        break;    
                    default:
                        console.log("No data");
                } 
                    this._room = jabberwerx.JID.asJID(room);
                } catch (e) {
                    throw new TypeError("room must be type jabberwerx.JID or convertible to a jabberwerx.JID");
                }
            }
        },
        setInvitor: function (invitor) {
            if (invitor) {
                try {
                    this._invitor = jabberwerx.JID.asJID(invitor);
                } catch (e) {
                    throw new TypeError("invitor must be type jabberwerx.JID or convertible to a jabberwerx.JID");
                }
            }
        },
        setReason: function (reason) {
            if (reason) {
                if (typeof reason == "string" || reason instanceof String) {
                    this._reason = reason;
                } else {
                    throw new TypeError("reason must be a string");
                }
            }
        },
        setPassword: function (password) {
            if (password) {
                if (typeof password == "string" || password instanceof String) {
                    this._password = password;
                } else {
                    throw new TypeError("password must be a string");
                }
            }
        }
    }, "jabberwerx.MUCInvite");
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/controller/Controller.js*/
;
(function (jabberwerx) {
    jabberwerx.Controller = jabberwerx.JWModel.extend({
        init: function (client, name) {
            this._super();
            if (!name || typeof name != 'string') {
                throw new TypeError("name must be a non-empty string");
            }
            if (!(client instanceof jabberwerx.Client)) {
                throw new TypeError("client must be a jabberwerx.Client");
            }
            this.client = client;
            this.name = name;
            var orig = client.controllers[name];
            if (orig) {
                orig.destroy();
            }
            client.controllers[name] = this;
        },
        destroy: function () {
            if (this.client && this.client.controllers && this.client.controllers[this.name]) {
                delete this.client.controllers[this.name];
                delete this.client;
            }
            this._super();
        },
        updateEntity: function (entity) {
            if (!(entity && entity instanceof jabberwerx.Entity && entity.controller === this)) {
                throw new TypeError("invalid entity to update");
            }
            this.client.entitySet.event("entityUpdated").trigger(entity);
            return entity;
        },
        removeEntity: function (entity) {
            if (!(entity && entity instanceof jabberwerx.Entity && entity.controller === this)) {
                throw new TypeError("invalid entity to delete");
            }
            entity.destroy();
            return entity;
        },
        cleanupEntity: function (entity) { },
        client: null,
        name: ''
    }, 'jabberwerx.Controller');
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/controller/RosterController.js*/
;
(function (jabberwerx) {
    jabberwerx.RosterController = jabberwerx.Controller.extend({
        init: function (client) {
            this._super(client, "roster");
            this.applyEvent("errorEncountered");
            this.applyEvent("subscriptionReceived");
            this.applyEvent("unsubscriptionReceived");
            this.applyEvent("rosterFetched");
            var that = this;
            var policyKeys = ["autoaccept", "autoaccept_in_domain", "autoremove"];
            var policyDefaults = jabberwerx._config.subscriptions;
            jabberwerx.$.each(policyKeys, function () {
                var key = this;
                if (policyDefaults !== undefined && policyDefaults[key] !== undefined) {
                    that[key] = policyDefaults[key];
                }
                return true;
            });
            client.event("iqReceived").bindWhen("[type='set'] query[xmlns='jabber:iq:roster']", this.invocation("_handleRosterUpdate"));
            client.event("presenceReceived").bindWhen("[type='subscribe'], [type='subscribed'], [type='unsubscribe'], [type='unsubscribed']", this.invocation("_handleSubscription"));
        },
        destroy: function () {
            var client = this.client;
            client.event("iqReceived").unbind(this.invocation("_handleRosterUpdate"));
            client.event("presenceReceived").unbind(this.invocation("_handleSubscription"));
            this._super();
        },
        updateEntity: function (entity) {
            if (!(entity && entity instanceof jabberwerx.RosterContact)) {
                throw new TypeError("entity must be a contact");
            }
            this.updateContact(entity.jid);
        },
        removeEntity: function (entity) {
            if (!(entity && entity instanceof jabberwerx.RosterContact)) {
                throw new TypeError("entity must be a contact");
            }
            this.deleteContact(entity.jid);
        },
        startRendezvous: function (ctx) {
            this._super(ctx);
            this.fetch();
            return true;
        },
        finishRendezvous: function () {
            this.client.entitySet.endBatch();
            this.event("rosterfetched").trigger();
            return this._super();
        },
        fetch: function (callback) {
            if (!this.client.isConnected()) {
                throw new jabberwerx.Client.NotConnectedError();
            }
            if (callback !== undefined && !jabberwerx.$.isFunction(callback)) {
                throw new TypeError('The callback param must be a function');
            }
            var that = this;
            this.client.entitySet.startBatch();
            this.client.sendIq('get', null, "<query xmlns='jabber:iq:roster'/>", function (stanza) {
                var error = that._checkError(stanza);
                if (error) {
                    that.event("errorEncountered").trigger({
                        operation: "fetch",
                        error: error
                    });
                }
                var items = jabberwerx.$('item', stanza).map(function () {
                    return this.xml;
                }).get();
                that._fetchedPendingItems = items;
                that._processFetchedItem();
                if (callback) {
                    callback.call(that, error);
                }
            }, 20);
        },
        _processFetchedItem: function () {
            if (!this.client) {
                return;
            }
            var cache = this.client.entitySet;
            var count = 0;
            do {
                var contact = this._fetchedPendingItems.shift();
                if (!contact) {
                    delete this._fetchPendingWorker;
                    this.finishRendezvous();
                    return;
                }
                try {
                    contact = jabberwerx.util.unserializeXML(contact);
                } catch (ex) {
                    jabberwerx.util.debug.log("Could not parse contact XML: " + contact);
                    throw ex;
                }
                var jid = jabberwerx.$(contact).attr("jid");
                var ent = cache.entity(jid);
                var username = jid.split('@')[0];
                jabberwerx.$(contact).attr("name", this._findUserInfoFromList(username).displayname);
                contact = new jabberwerx.RosterContact(contact, this, ent);
                if (ent) {
                    ent.destroy();
                }
                cache.register(contact);
                count++;
            } while (count < jabberwerx.RosterController.FETCH_ITEM_PROCESS_COUNT);
            this._fetchPendingWorker = jabberwerx.system.setTimeout(this.invocation("_processFetchedItem"), jabberwerx.RosterController.FETCH_ITEM_PROCESS_INTERVAL);
        },
        _findUserInfoFromList: function (p_username) {
            var objectResult = {};
            var p_userArray = getFromLocalStorage("adusrlst");
            if (p_userArray != null && typeof p_userArray !== 'undefined' && p_userArray.length > 0) {
                objectResult = p_userArray.find(x => x.username == p_username);
                if (objectResult == undefined || objectResult == null || !objectResult.displayname) {
                    objectResult = this._createDefaultUserInfo(p_username);
                }
            }
            else {
                objectResult = this._createDefaultUserInfo(p_username);
            }
            return objectResult;
        },
        _getUserFromLocalStorage: function (p_itemName) {
            var objectResult = {};
            // Verify LocalStorage
            if (typeof (Storage) !== "undefined") {
                objectResult = JSON.parse(localStorage.getItem(p_itemName));
            } else {
                // LocalStorage not supported
            }
            return objectResult;
        },
        _createDefaultUserInfo: function (p_username) {
            return {
                displayname: p_username,
                username: p_username,
                firstname: p_username,
                lastName: '',
                middlename: ''
            };
        },
        addContact: function (jid, nickname, groups, callback) {
            this._updateContact(jid, nickname, groups, callback, true);
        },
        updateContact: function (jid, nickname, groups, callback) {
            this._updateContact(jid, nickname, groups, callback, true);
        },
        _updateContact: function (jid, nickname, groups, callback, addContact) {
            if (callback !== undefined && !jabberwerx.$.isFunction(callback)) {
                throw new TypeError('The callback param must be a function');
            }
            if (!this.client.isConnected()) {
                throw new jabberwerx.Client.NotConnectedError();
            }
            var that = this;
            jid = jabberwerx.JID.asJID(jid).getBareJID();
            var entity = this.client.entitySet.entity(jid);
            if (entity && ((groups === null) || (groups === undefined))) {
                groups = entity.getGroups();
            } else {
                if (typeof groups == 'string' || groups instanceof String) {
                    groups = [groups.toString()];
                }
                if (!(groups instanceof Array) || !groups.length || (groups.length == 1 && (groups[0] == ""))) {
                    groups = (this.defaultGroup && [this.defaultGroup.toString()]) || [];
                }
            }
            var nick;
            if (nickname === null || nickname === undefined) {
                nick = (entity && entity.getDisplayName()) || null;
            } else {
                nick = nickname.toString();
            }
            var builder = new jabberwerx.NodeBuilder('{jabber:iq:roster}query');
            var rosterItem = builder.element('item');
            rosterItem.attribute('jid', jid.toString());
            if (nick) {
                rosterItem.attribute('name', nick);
            }
            for (var i = 0; i < groups.length; i++) {
                rosterItem.element('group').text(groups[i]);
            }
            if (callback) {
                this.client.sendIq("set", null, builder.data, function (stanza) {
                    if (stanza) {
                        var err = that._checkError(stanza);
                        callback.call(that, err);
                    }
                });
            } else {
                this.client.sendIq("set", null, builder.data);
            }
            if (addContact || this.autoSubscription) {
                this.subscribe(jid);
            }
        },
        subscribe: function (jid) {
            if (!this.client.isConnected()) {
                throw new jabberwerx.Client.NotConnectedError();
            }
            jid = jabberwerx.JID.asJID(jid).getBareJID();
            var entity = this.client.entitySet.entity(jid);
            if (entity && entity instanceof jabberwerx.RosterContact) {
                if (entity.properties.subscription == "to" || entity.properties.subscription == "both") {
                    return;
                }
            }
            this.client.sendStanza("presence", "subscribe", jid);
        },
        unsubscribe: function (jid) {
            if (!this.client.isConnected()) {
                throw new jabberwerx.Client.NotConnectedError();
            }
            jid = jabberwerx.JID.asJID(jid).getBareJID();
            this._clearAckAck(jid);
            var entity = this.client.entitySet.entity(jid);
            if (entity && entity instanceof jabberwerx.RosterContact) {
                if (entity.properties.subscription == "both") {
                    this.client.sendStanza("presence", "unsubscribe", jid);
                } else if (entity.properties.subscription == "to" || entity.properties.subscription == "none") {
                    this.deleteContact(jid);
                }
            }
        },
        deleteContact: function (jid, callback) {
            if (!this.client.isConnected()) {
                throw new jabberwerx.Client.NotConnectedError();
            }
            if (callback !== undefined && !jabberwerx.$.isFunction(callback)) {
                throw new TypeError('The callback param must be a function');
            }
            var that = this;
            var jid = new jabberwerx.JID.asJID(jid).getBareJID();
            var builder = new jabberwerx.NodeBuilder('{jabber:iq:roster}query');
            builder = builder.element('item');
            builder = builder.attribute('jid', jid.toString());
            builder = builder.attribute('subscription', 'remove');
            this.client.sendIq('set', null, builder.document.xml, function (stanza) {
                var error = that._checkError(stanza);
                if (callback) {
                    callback.call(that, error);
                }
            });
        },
        eachContact: function (op) {
            this.client.entitySet.each(op, jabberwerx.RosterContact);
        },
        acceptSubscription: function (contact, nickname, groups) {
            if (!this.client.isConnected()) {
                throw new jabberwerx.Client.NotConnectedError();
            }
            contact = jabberwerx.JID.asJID(contact).getBareJID();
            this._clearAckAck(contact);
            this.client.sendStanza("presence", "subscribed", contact);
            this.updateContact(contact, nickname, groups);
        },
        denySubscription: function (contact) {
            if (!this.client.isConnected()) {
                throw new jabberwerx.Client.NotConnectedError();
            }
            contact = jabberwerx.JID.asJID(contact).getBareJID();
            this._clearAckAck(contact);
            this.client.sendStanza("presence", "unsubscribed", contact);
            if (this.autoSubscription) {
                var entity = this.client.entitySet.entity(contact);
                if (entity && entity instanceof jabberwerx.RosterContact) {
                    this.deleteContact(contact);
                }
            }
        },
        willBeSerialized: function () {
            if (this._fetchedPendingWorker) {
                jabberwerx.system.clearTimeout(this._fetchedPendingWorker);
                delete this._fetchedPendingWorker;
            }
        },
        graphUnserialized: function () {
            if (this._fetchedPendingItems && this._fetchedPendingItems.length) {
                this._processFetchedItem();
            }
        },
        _clearAckAck: function (jid) {
            var entity = this.client.entitySet.entity(jabberwerx.JID.asJID(jid).getBareJID());
            if (entity) {
                delete entity.properties.ackack;
            }
        },
        cleanupEntity: function (entity) {
            if (this._fetchPendingWorker) {
                this._fetchedPendingItems = [];
                jabberwerx.system.clearInterval(this._fetchPendingWorker);
                delete this._fetchPendingWorker;
            }
            if (entity instanceof jabberwerx.RosterContact) {
                entity.destroy();
            }
        },
        _checkError: function (parentElement) {
            var error = undefined;
            var child = jabberwerx.$(parentElement).children("error")[0];
            if (child && child.nodeName == 'error') {
                error = child;
            }
            return error;
        },
        _autoAccept: function (prs) {
            var from = prs.getFromJID();
            this._clearAckAck(from);
            var entity = this.client.entitySet.entity(from);
            var handled = this.autoaccept == jabberwerx.RosterController.AUTOACCEPT_ALWAYS;
            if (!handled && this.autoaccept_in_domain && from.getDomain() == this.client.connectedUser.jid.getDomain()) {
                handled = true;
            }
            if (!handled && this.autoaccept == jabberwerx.RosterController.AUTOACCEPT_IN_ROSTER && entity) {
                var props = entity.properties;
                handled = props["subscription"] == "to" || props["subscription"] == "none" || props["ask"] == "subscribe";
            }
            if (handled) {
                this.acceptSubscription(from);
            }
            return handled;
        },
        _autoRemove: function (prs) {
            var from = prs.getFromJID();
            this._clearAckAck(from);
            this.client.sendStanza("presence", "unsubscribed", from);
            var entity = this.client.entitySet.entity(from.getBareJID());
            var handled = (this.autoSubscription && this.autoremove) || entity.properties.subscription == "from" || entity.properties.subscription == "none";
            if (handled) {
                this.deleteContact(from);
            }
            return handled;
        },
        _handleSubscription: function (evt) {
            var prs = evt.data;
            switch (prs.getType()) {
                case "subscribe":
                    var handled = this._autoAccept(prs);
                    this.event("subscriptionReceived").trigger({
                        stanza: prs,
                        handled: handled
                    });
                    break;
                case "subscribed":
                    var e = this.client.entitySet.entity(prs.getFromJID().getBareJID());
                    if (!e || e.properties.ackack === undefined) {
                        this.client.sendStanza("presence", "subscribe", prs.getFrom());
                        if (e) {
                            e.properties.ackack = true;
                        }
                    }
                    break;
                case "unsubscribe":
                    var handled = this._autoRemove(prs);
                    this.event("unsubscriptionReceived").trigger({
                        stanza: prs,
                        handled: handled
                    });
                    break;
                case "unsubscribed":
                    this._clearAckAck(prs.getFromJID());
                    this.client.sendStanza("presence", "unsubscribe", prs.getFrom());
                    break;
            }
            return true;
        },
        _handleRosterUpdate: function (evt) {
            var node = jabberwerx.$(evt.selected);
            var item = node.children('item');
            var jid = item.attr('jid');
            var subscr = item.attr("subscription");
            var entity = this.client.entitySet.entity(jid);
            if (subscr != "remove") {
                item = item.get()[0];
                if (entity && entity instanceof jabberwerx.RosterContact) {
                    entity.setItemNode(item);
                } else {
                    var contact = new jabberwerx.RosterContact(item, this, entity);
                    if (entity) {
                        entity.destroy();
                    }
                    this.client.entitySet.register(contact);
                }
            } else if (entity && entity instanceof jabberwerx.RosterContact) {
                delete entity.properties.subscription;
                delete entity.properties.ask;
                entity.destroy();
            }
            return true;
        },
        _fetchedPendingItems: [],
        autoSubscription: true,
        autoaccept: 'in-roster',
        autoaccept_in_domain: true,
        autoremove: true,
        defaultGroup: ""
    }, 'jabberwerx.RosterController');
    jabberwerx.RosterController.FETCH_ITEM_PROCESS_INTERVAL = 5;
    jabberwerx.RosterController.FETCH_ITEM_PROCESS_COUNT = 1;
    jabberwerx.RosterController.AUTOACCEPT_NEVER = "never";
    jabberwerx.RosterController.AUTOACCEPT_IN_ROSTER = "in-roster";
    jabberwerx.RosterController.AUTOACCEPT_ALWAYS = "always";
    jabberwerx.RosterController.mixin(jabberwerx.Rendezvousable);
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/controller/CapabilitiesController.js*/
;
(function (jabberwerx) {
    jabberwerx.CapabilitiesController = jabberwerx.Controller.extend({
        init: function (client) {
            this._super(client, "capabilities");
            this.client.event('beforePresenceSent').bind(this.invocation('_beforePresenceHandler'));
            this.client.event('presenceSent').bind(this.invocation('_resendCaps'));
            this.client.event('iqReceived').bindWhen("*[type='get'] query[xmlns='http://jabber.org/protocol/disco#info']", this.invocation('_discoInfoHandler'));
            jabberwerx.globalEvents.bind("resourcePresenceChanged", this.invocation("_handleResourcePresenceUpdate"));
            this.addFeature('http://jabber.org/protocol/caps');
            this.addFeature('http://jabber.org/protocol/disco#info');
        },
        destroy: function () {
            this.client.event('beforePresenceSent').unbind(this.invocation('_beforePresenceHandler'));
            this.client.event('presenceSent').unbind(this.invocation('_resendCaps'));
            this.client.event('iqReceived').unbind(this.invocation('_discoInfoHandler'));
            jabberwerx.globalEvents.unbind("resourcePresenceChanged", this.invocation("_handleResourcePresenceUpdate"));
            this._super();
        },
        _updatePresence: function (jid) {
            if ((this.client.isConnected()) && (this.client.getCurrentPresence() != null)) {
                var p = this.client.getCurrentPresence().clone();
                jabberwerx.$(p.getNode()).find("c[xmlns='http://jabber.org/protocol/caps']").remove();
                if (jid) {
                    p.setTo(jid);
                }
                this.client.sendStanza(p);
            }
        },
        addFeature: function (feature) {
            var retVal = false;
            if (typeof feature == 'string') {
                if (!this.containsFeature(feature)) {
                    this._featureSet.push(feature);
                    this._featureSet.sort();
                    retVal = true;
                }
            }
            if (retVal) {
                this._updatePresence();
            }
            return retVal;
        },
        removeFeature: function (feature) {
            var retVal = false;
            if (typeof feature == 'string' || feature instanceof String) {
                var index = jabberwerx.$.inArray(feature, this._featureSet);
                if (index >= 0) {
                    this._featureSet.splice(index, 1);
                    retVal = true;
                }
            }
            if (retVal) {
                this._updatePresence();
            }
            return retVal;
        },
        addFeatureToJid: function (jid, feature) {
            if (!(feature && typeof feature == 'string')) {
                throw new TypeError("feature must be non empty string");
            }
            var validatedJid = jabberwerx.JID.asJID(jid).getBareJID();
            if (!this._featureSetPerJid[validatedJid]) {
                this._featureSetPerJid[validatedJid] = new jabberwerx.CapabilitiesController.JidFeatureSet(this);
            }
            var retVal = this._featureSetPerJid[validatedJid].addFeature(feature);
            if (retVal) {
                this._updatePresence(jid);
            }
            return retVal;
        },
        containsFeatureForJid: function (jid, feature) {
            if (!(feature && typeof feature == 'string')) {
                throw new TypeError("feature must be non empty string");
            }
            var validatedJid = jabberwerx.JID.asJID(jid).getBareJID();
            if (this._featureSetPerJid[validatedJid]) {
                return this._featureSetPerJid[validatedJid].containsFeature(feature);
            } else {
                return false;
            }
        },
        removeFeatureFromJid: function (jid, feature) {
            var retVal = false;
            if (!(feature && typeof feature == 'string')) {
                throw new TypeError("feature must be non empty string");
            }
            var validatedJid = jabberwerx.JID.asJID(jid).getBareJID();
            if (this._featureSetPerJid[validatedJid]) {
                retVal = this._featureSetPerJid[validatedJid].removeFeature(feature);
                if (this._featureSetPerJid[validatedJid].extraFeatures.length == 0) {
                    delete this._featureSetPerJid[validatedJid];
                }
            }
            if (retVal) {
                this._updatePresence(jid);
            }
            return retVal;
        },
        _resendCaps: function (eventObj) {
            var presence = eventObj.data;
            if (!(presence.getTo() || presence.getType() || presence.getShow() == 'unavailable')) {
                for (var jid in this._featureSetPerJid) {
                    var p = presence.clone();
                    jabberwerx.$(p.getNode()).find("c[xmlns='http://jabber.org/protocol/caps']").remove();
                    p.setTo(jid);
                    this.client.sendStanza(p);
                }
            }
        },
        attachCapabilitiesToPresence: function (presence) {
            if (!(presence && presence instanceof jabberwerx.Presence)) {
                throw new TypeError("presence must be a jabberwerx.Presence");
            }
            var builder = jabberwerx.$(presence.getNode()).find("c[xmlns='http://jabber.org/protocol/caps']").map(function () {
                return new jabberwerx.NodeBuilder(this);
            })[0];
            var ver_attr = jabberwerx.$(presence.getNode()).find("c[ver]").map(function () {
                return new jabberwerx.NodeBuilder(this);
            })[0];
            if (!ver_attr) {
                var ver = null;
                if (!builder) {
                    builder = new jabberwerx.NodeBuilder(presence.getNode()).element("{http://jabber.org/protocol/caps}c");
                }
                if (presence.getTo()) {
                    var jid = presence.getToJID();
                    ver = this.getVerificationStringForJid(jid);
                }
                if (!ver) {
                    ver = this.generateVerificationString();
                }
                builder.attribute("hash", "sha-1");
                builder.attribute("node", this.node);
                builder.attribute("ver", ver);
            }
        },
        getVerificationStringForJid: function (jid) {
            var ver = null;
            var validatedJid = jabberwerx.JID.asJID(jid).getBareJID();
            if (this._featureSetPerJid[validatedJid]) {
                ver = this._featureSetPerJid[validatedJid].ver;
            }
            return ver;
        },
        getVerificationString: function (nodeVal) {
            var ver = null;
            if (nodeVal == this.node + '#' + this.generateVerificationString()) {
                ver = this.generateVerificationString();
            } else {
                for (var jid in this._featureSetPerJid) {
                    if (nodeVal == this.node + '#' + this._featureSetPerJid[jid].ver) {
                        ver = this._featureSetPerJid[jid].ver;
                        break;
                    }
                }
            }
            return ver;
        },
        getFeaturesForVerificationString: function (ver) {
            var features = [];
            if (!(ver && typeof ver == 'string')) {
                throw new TypeError("version must be non empty string");
            }
            if (ver == this.generateVerificationString()) {
                features = this.getFeatureSet();
            } else {
                for (var jid in this._featureSetPerJid) {
                    if (ver == this._featureSetPerJid[jid].ver) {
                        features = jabberwerx.unique(this.getFeatureSet().concat(this._featureSetPerJid[jid].extraFeatures));
                        features.sort();
                    }
                }
            }
            return features;
        },
        getFeatureSet: function () {
            return this._featureSet;
        },
        containsFeature: function (feature) {
            var retVal = false;
            for (var i = 0; i < this._featureSet.length; i++) {
                if (this._featureSet[i] == feature) {
                    retVal = true;
                    break;
                }
            }
            return retVal;
        },
        generateVerificationString: function (features) {
            var feats = (features ? jabberwerx.unique(this._featureSet.concat(features)) : this._featureSet);
            return jabberwerx.CapabilitiesController._generateVerificationString([this._getIdentity()], feats, []);
        },
        _getIdentity: function () {
            return (this.identity.category ? this.identity.category : '') + '/' +
                (this.identity.type ? this.identity.type : '') + '//' +
                (this.identity.name ? this.identity.name : '');
        },
        _beforePresenceHandler: function (eventObj) {
            var presence = eventObj.data;
            if (!(presence.getType() || presence.getShow() == 'unavailable')) {
                this.attachCapabilitiesToPresence(presence);
            }
            return false;
        },
        _discoInfoHandler: function (eventObj) {
            jabberwerx.util.debug.log("received disco#info request...");
            var iq = eventObj.data;
            var iqResult = this._createDiscoInfoResponse(iq);
            this.client.sendStanza(iqResult);
            return true;
        },
        _createDiscoInfoResponse: function (iq) {
            var iqResult = null;
            var nodeValue = jabberwerx.$(iq.getQuery()).attr('node');
            var ver = null;
            if (nodeValue) {
                ver = this.getVerificationString(nodeValue);
            }
            if (!nodeValue || ver) {
                var builder = new jabberwerx.NodeBuilder("{http://jabber.org/protocol/disco#info}query");
                if (ver) {
                    builder.attribute('node', this.node + '#' + ver);
                }
                var identity = {
                    "category": this.identity.category,
                    "type": this.identity.type
                };
                if (this.identity.name) {
                    identity.name = this.identity.name;
                }
                builder.element('identity', identity);
                var features = null;
                if (!nodeValue) {
                    features = this._featureSet;
                } else {
                    features = this.getFeaturesForVerificationString(ver);
                }
                jabberwerx.$.each(features, function () {
                    builder.element('feature', {
                        "var": this
                    });
                    return true;
                });
                iqResult = iq.reply(builder.data);
            } else {
                iqResult = iq.errorReply(jabberwerx.Stanza.ERR_ITEM_NOT_FOUND);
            }
            return iqResult;
        },
        _findCapsInfo: function (jid) {
            var result = [];
            for (var ver in this._capsCache) {
                var ci = this._capsCache[ver];
                if (ci.getReferences(jid).length > 0) {
                    result.push(ci);
                }
            }
            return result;
        },
        _firstCapsInfo: function (jid) {
            var ret = this._findCapsInfo(jid);
            if (ret.length > 0) {
                return ret[0];
            }
            return null;
        },
        isSupportedFeature: function (jid, feature) {
            if (!jabberwerx.util.isString(feature)) {
                throw new TypeError("Feature must be a non empty string");
            }
            jid = jabberwerx.JID.asJID(jid);
            var caps = this._findCapsInfo(jid);
            for (var i = 0; i < caps.length; ++i) {
                if (jabberwerx.$.inArray(feature, caps[i].features) != -1) {
                    return true;
                }
            }
            return false;
        },
        getSupportedResources: function (jid, feature) {
            if (!jabberwerx.util.isString(feature) || feature == "") {
                throw new TypeError("Feature must be a non empty string");
            }
            jid = jabberwerx.JID.asJID(jid).getBareJID();
            var caps = this._findCapsInfo(jid);
            var resmap = {};
            for (var j = 0; j < caps.length; ++j) {
                var ci = caps[j];
                if (jabberwerx.$.inArray(feature, ci.features) != -1) {
                    var refs = ci.getReferences(jid);
                    for (var i = 0; i < refs.length; ++i) {
                        resmap[refs[i].toString()] = refs[i];
                    }
                }
            }
            var result = [];
            jabberwerx.$.each(resmap, function (idx, jidstr) {
                result.push(resmap[idx]);
            });
            return result;
        },
        getFeatures: function (jid) {
            jid = jabberwerx.JID.asJID(jid);
            var result = [];
            var caps = this._findCapsInfo(jid);
            for (var i = 0; i < caps.length; ++i) {
                result = result.concat(caps[i].features);
            }
            return jabberwerx.unique(result);
        },
        getIdentities: function (jid) {
            jid = jabberwerx.JID.asJID(jid);
            var ids = [];
            var caps = this._findCapsInfo(jid);
            for (var i = 0; i < caps.length; ++i) {
                ids = ids.concat(caps[i].identities);
            }
            return jabberwerx.$.map(jabberwerx.unique(ids), function (id, idx) {
                var idParts = id.split("/");
                return {
                    category: idParts[0],
                    type: idParts[1],
                    xmlLang: idParts[2],
                    name: idParts[3]
                };
            });
        },
        _newCapsInfo: function (jid, ver, node) {
            var ci = new jabberwerx.CapabilitiesController.CapsInfo(this, node, ver);
            ci.addReference(jid);
            this._capsCache[ver] = ci;
            this.client.controllers.disco.fetchInfo(jid, ci.id, function (identities, features, forms, err) {
                if (err) {
                    ci.validate();
                } else {
                    ci._populate(identities, features, forms);
                }
                ci._capsController._updateRefs(ci.ver);
            });
        },
        _updateRefs: function (ver) {
            var ujids = [];
            var ci = this._capsCache[ver];
            for (var i = 0; i < ci.items.length; ++i) {
                var bstr = jabberwerx.JID.asJID(ci.items[i]).getBareJIDString();
                if (jabberwerx.$.inArray(bstr, ujids) == -1) {
                    ujids.push(bstr);
                }
            }
            for (var i = 0; i < ujids.length; ++i) {
                var entity = this.client.entitySet.entity(ujids[i]);
                if (entity) {
                    this.client.entitySet.event("entityUpdated").trigger(entity);
                }
            }
        },
        _clearRefs: function () {
            for (var ver in this._capsCache) {
                this._capsCache[ver].clearReferences();
            }
        },
        _removeInvalid: function () {
            for (var ver in this._capsCache) {
                var ci = this._capsCache[ver];
                if (ci.status != "valid") {
                    delete this._capsCache[ver];
                }
            }
        },
        _handleResourcePresenceUpdate: function (evt) {
            if (!this._handle115Receiving) {
                return false;
            }
            if (!this.client.connectedUser) {
                return false;
            }
            var _myjid = jabberwerx.JID.asJID(this.client.connectedUser.jid + '/' + this.client.resourceName);
            var presence = evt.data.presence;
            var ce = presence ? jabberwerx.$(presence.getNode()).find("c[xmlns='http://jabber.org/protocol/caps']") : null;
            if (!ce || ce.length == 0) {
                return false;
            }
            var jid = evt.data.fullJid;
            var ver = ce.attr("ver");
            var node = ce.attr("node");
            if (jid.equals(_myjid) && !this._capsCache[ver]) {
                var ci = new jabberwerx.CapabilitiesController.CapsInfo(this, node, ver);
                ci._populate(this._getIdentity(), this._featureSet, []);
                ci.addReference(_myjid);
                this._capsCache[ver] = ci;
                return false;
            }
            var entity = this.client.entitySet.entity(jid.getBareJID());
            if (!entity) {
                return false;
            }
            var oldci = this._firstCapsInfo(jid);
            if (presence && presence.getType() != 'unavailable') {
                ci = this._capsCache[ver];
                if (oldci && (oldci === ci)) {
                    return false;
                } else if (oldci) {
                    oldci.removeReference(jid);
                }
                if (ci) {
                    ci.addReference(jid);
                } else {
                    this._newCapsInfo(jid, ver, node);
                    return false;
                }
            } else if (oldci) {
                oldci.removeReference(jid);
            }
            this.client.entitySet.event("entityUpdated").trigger(entity);
            return false;
        },
        identity: {
            category: 'client',
            name: 'Cisco AJAX XMPP Library',
            type: 'pc',
            toString: function () {
                return (this.category ? this.category : '') + '/' +
                    (this.type ? this.type : '') + '//' +
                    (this.name ? this.name : '');
            }
        },
        node: 'http://jabber.cisco.com/caxl',
        _featureSet: ['http://jabber.org/protocol/disco#info'],
        _featureSetPerJid: {},
        _capsCache: {},
        _handle115Receiving: true,
        _updateCaps: false
    }, 'jabberwerx.CapabilitiesController');
    jabberwerx.CapabilitiesController.JidFeatureSet = jabberwerx.JWModel.extend({
        init: function (capsController) {
            this._super();
            this._capsController = capsController;
        },
        _capsController: {},
        extraFeatures: [],
        ver: null,
        addFeature: function (feature) {
            var retVal = false;
            if (!(feature && typeof feature == 'string')) {
                throw new TypeError("feature must be non empty string");
            }
            if (!this.containsFeature(feature)) {
                this.extraFeatures.push(feature);
                this.extraFeatures.sort();
                this.ver = this._capsController.generateVerificationString(this.extraFeatures);
                retVal = true;
            }
            return retVal;
        },
        containsFeature: function (feature) {
            var retVal = false;
            if (!(feature && typeof feature == 'string')) {
                throw new TypeError("feature must be non empty string");
            }
            var index = jabberwerx.$.inArray(feature, this.extraFeatures);
            if (index >= 0) {
                retVal = true;
            }
            return retVal;
        },
        removeFeature: function (feature) {
            var retVal = false;
            if (!(feature && typeof feature == 'string')) {
                throw new TypeError("feature must be non empty string");
            }
            var index = jabberwerx.$.inArray(feature, this.extraFeatures);
            if (index >= 0) {
                this.extraFeatures.splice(index, 1);
                this.ver = this._capsController.generateVerificationString(this.extraFeatures);
                retVal = true;
            }
            return retVal;
        }
    }, "jabberwerx.CapabilitiesController.JidFeatureSet");
    jabberwerx.CapabilitiesController.CapsInfo = jabberwerx.JWModel.extend({
        init: function (capsController, node, ver) {
            this._super();
            if (!capsController || !(capsController instanceof jabberwerx.CapabilitiesController)) {
                throw new TypeError("CapsInfo must be created with a valid CapabilitiesController");
            }
            this._capsController = capsController;
            this._node = node;
            this.ver = (ver ? ver : "");
            this._lockedVer = this.ver != "";
            this.id = this._node + "#" + this.ver;
        },
        validate: function () {
            this.status = "invalid";
            this.id = this._node + '#' + this.ver;
            var deduped = [].concat(this.identities);
            jabberwerx.unique(deduped);
            if (deduped.length != this.identities.length) {
                return false;
            }
            for (var i = 0; i < deduped.length; ++i) {
                var idparts = deduped[i].split("/");
                if ((idparts.length != 4) || (!idparts[0] || !idparts[1])) {
                    return false;
                }
            }
            deduped = [].concat(this.features);
            jabberwerx.unique(deduped);
            if (deduped.length != this.features.length) {
                return false;
            }
            var reqNS = 0;
            for (var i = 0; i < deduped.length; ++i) {
                if (!deduped[i]) {
                    return false;
                }
                if ((deduped[i] == "http://jabber.org/protocol/disco#info") || (deduped[i] == "http://jabber.org/protocol/caps")) {
                    reqNS++;
                }
            }
            if (reqNS != 2) {
                return false;
            }
            var uforms = {};
            for (var i = 0; i < this.forms.length; ++i) {
                var oneform = this.forms[i];
                var ftfld = oneform.getFieldByVar("FORM_TYPE");
                if (!ftfld || (ftfld.getType() != "hidden")) {
                    continue;
                }
                deduped = [].concat(ftfld.getValues());
                jabberwerx.unique(deduped);
                if (deduped.length == 0) { } else if (deduped.length != 1) { } else if (!deduped[0]) { } else if (uforms[deduped[0]]) { } else {
                    uforms[deduped[0]] = oneform;
                    continue;
                }
                return false;
            }
            var newVer = this._generateVerString();
            if (!this._lockedVer) {
                this.ver = newVer;
            }
            if (newVer == this.ver) {
                this.status = "valid";
                this.id = this.ver;
            }
            return this.status == "valid";
        },
        _generateVerString: function () {
            return jabberwerx.CapabilitiesController._generateVerificationString(this.identities, this.features, this.forms);
        },
        _populate: function (identities, features, forms) {
            this.identities = [];
            this.features = [];
            this.forms = [];
            this.status = "invalid";
            this.id = this._node + '#' + this.ver;
            if (identities) {
                this.identities = this.identities.concat(identities);
            }
            if (features) {
                this.features = this.features.concat(features);
            }
            if (forms) {
                this.forms = this.forms.concat(forms);
            }
            this.identities.sort();
            this.features.sort();
            return this.validate();
        },
        addReference: function (jid) {
            if (this.indexOfReference(jid, true) == -1) {
                this.items.push(jid.toString());
            }
        },
        removeReference: function (jid) {
            var idx = this.indexOfReference(jid, true);
            if (idx != -1) {
                this.items.splice(idx, 1);
            }
        },
        hasReference: function (jid) {
            return this.indexOfReference(jid) != -1;
        },
        indexOfReference: function (jid, exact) {
            var tjid = jabberwerx.JID.asJID(jid);
            exact = exact || (tjid.getResource() != '');
            if (!exact) {
                tjid = tjid.getBareJID();
            }
            for (var i = 0; i < this.items.length; ++i) {
                var ijid = jabberwerx.JID.asJID(this.items[i]);
                if ((exact && tjid.equals(ijid)) || (!exact && tjid.equals(ijid.getBareJID()))) {
                    return i;
                }
            }
            return -1;
        },
        getReferences: function (jid) {
            var result = [];
            var tjid = jabberwerx.JID.asJID(jid);
            var exact = tjid.getResource() != '';
            for (var i = 0; i < this.items.length; ++i) {
                var ijid = jabberwerx.JID.asJID(this.items[i]);
                if (exact && ijid.equals(tjid)) {
                    return [ijid];
                }
                if (!exact && ijid.getBareJID().equals(tjid)) {
                    result.push(ijid);
                }
            }
            return result;
        },
        _clearReferences: function () {
            this.items = [];
        },
        _capsController: {},
        _node: '',
        ver: '',
        status: "invalid",
        identities: [],
        features: [],
        forms: [],
        items: []
    }, "jabberwerx.CapabilitiesController.CapsInfo");
    jabberwerx.CapabilitiesController._generateVerificationString = function (identities, features, forms, noEncode) {
        var prepFactor = function (fact) {
            return jabberwerx.util.crypto.utf8Encode(fact.replace(/</g, "&lt;"));
        }
        var __arrayToVerStr = function (arr) {
            var vstrings = jabberwerx.$.map(arr, function (ele) {
                return prepFactor(ele);
            });
            vstrings.sort();
            return vstrings.join('<') + '<';
        };
        var __formsToVerStr = function (forms) {
            var formStrs = jabberwerx.$.map(forms, function (form) {
                var ftfld = form.getFieldByVar("FORM_TYPE");
                if (!ftfld || (ftfld.getType() != "hidden")) {
                    return null;
                }
                var fieldStrs = jabberwerx.$.map(form.fields, function (field) {
                    var fstr = field.getVar();
                    if (fstr == "FORM_TYPE") {
                        return null;
                    }
                    var valueStrs = jabberwerx.$.map(field.getValues(), function (val) {
                        return prepFactor(val);
                    });
                    valueStrs.sort();
                    return prepFactor(fstr) + "<" + valueStrs.join("<");
                });
                fieldStrs.sort();
                return prepFactor(form.getFORM_TYPE()) + "<" + fieldStrs.join("<") + "<";
            });
            formStrs.sort();
            return formStrs.join("");
        };
        var baseStr = ""
        if (identities && identities.length > 0) {
            baseStr += __arrayToVerStr(identities);
        }
        if (features && features.length > 0) {
            baseStr += __arrayToVerStr(features);
        }
        if (forms && forms.length > 0) {
            baseStr += __formsToVerStr(forms);
        }
        if (!noEncode) {
            baseStr = jabberwerx.util.crypto.b64_sha1(baseStr);
        }
        return baseStr;
    }
    jabberwerx.Client.intercept({
        init: function () {
            this._super.apply(this, arguments);
            var capController = new jabberwerx.CapabilitiesController(this);
            if (jabberwerx._config.capabilityFeatures) {
                for (var i = 0; i < jabberwerx._config.capabilityFeatures.length; i++) {
                    capController.addFeature(jabberwerx._config.capabilityFeatures[i]);
                }
            }
            if (jabberwerx._config.capabilityIdentity) {
                capController.identity.category = jabberwerx._config.capabilityIdentity.category;
                capController.identity.type = jabberwerx._config.capabilityIdentity.type;
                capController.identity.name = jabberwerx._config.capabilityIdentity.name;
                capController.node = jabberwerx._config.capabilityIdentity.node;
            }
        },
        _connected: function () {
            this._super.apply(this, arguments);
            if (!this.getCurrentPresence()) {
                this.sendPresence();
            }
        }
    });
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/controller/ChatController.js*/
;
(function (jabberwerx) {
    jabberwerx.ChatController = jabberwerx.Controller.extend({
        init: function (client) {
            this._super(client, 'chat');
            var caps = client.controllers.capabilities || new jabberwerx.CapabilitiesController(client);
            caps.addFeature('http://jabber.org/protocol/chatstates');
            caps.addFeature('http://jabber.org/protocol/xhtml-im');
            this.applyEvent('chatSessionOpened');
            this.applyEvent('chatSessionClosed');
            this.client.event('afterMessageReceived').bindWhen('message[type!="groupchat"]' + '[type!="error"] body', this.invocation('_messageHandler'));
        },
        openSession: function (jid, thread) {
            var chatSession = null;
            jid = jabberwerx.JID.asJID(jid);
            chatSession = this.getSession(jid);
            if (!chatSession) {
                chatSession = new jabberwerx.ChatSession((this.client) ? this.client : client, jid, thread);
                this._chatSessions.push(chatSession);
                this.event('chatSessionOpened').trigger({
                    chatSession: chatSession,
                    userCreated: true
                });
            }
            return chatSession;
        },
        closeSession: function (session) {
            var index = this._getChatSessionIndex(session);
            if (index >= 0) {
                var closedChatSession = this._chatSessions[index];
                this._chatSessions.splice(index, 1);
                this.event('chatSessionClosed').trigger(closedChatSession);
                closedChatSession.destroy();
                delete closedChatSession;
                return true;
            }
            return false;
        },
        getSession: function (jid) {
            var index = this._getChatSessionIndex(jid);
            return (index >= 0) ? this._chatSessions[index] : null;
        },
        _messageHandler: function (eventObj) {
            var msg = eventObj.data;
            var from = msg.getFromJID();
            if (this._getChatSessionIndex(from) < 0) {
                var chatSession = new jabberwerx.ChatSession(this.client, from, msg.getThread());
                this._chatSessions.push(chatSession);
                this.event('chatSessionOpened').trigger({
                    chatSession: chatSession,
                    userCreated: false
                });
                chatSession._chatReceivedHandler(eventObj);
                return true;
            }
            return false;
        },
        _getChatSessionIndex: function (session) {
            var index = -1;
            var jid;
            if (session instanceof jabberwerx.ChatSession) {
                jid = session.jid;
            } else {
                try {
                    jid = jabberwerx.JID.asJID(session);
                } catch (e) {
                    return index;
                }
            }
            if (!jid) {
                return index;
            }
            var privateMessage = this.isPrivateMessage(jid);
            var jidStr = (privateMessage) ? jid.toString() : jid.getBareJIDString();
            for (var i = 0; i < this._chatSessions.length; i++) {
                var chatJidStr = (privateMessage) ? this._chatSessions[i].jid.toString() : this._chatSessions[i].jid.getBareJIDString();
                if (chatJidStr == jidStr) {
                    index = i;
                    break;
                }
            }
            return index;
        },
        isPrivateMessage: function (jid) {
            if (!(jid instanceof jabberwerx.JID)) {
                throw new TypeError("jid must be of type jabberwerx.JID");
            }
            var mucJid = jid.getBareJID();
            var entity = (this.client) ? this.client.entitySet.entity(mucJid) : client.entitySet.entity(mucJid);
            return (entity && entity instanceof jabberwerx.MUCRoom);
        },
        sendChatStates: true,
        _chatSessions: []
    }, 'jabberwerx.ChatController');
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/controller/MUCController.js*/
;
(function (jabberwerx) {
    jabberwerx.MUCController = jabberwerx.Controller.extend({
        init: function (client) {
            this._super(client, "muc");
            this.INVITE_SELECTOR = "message[type!='error']>x[xmlns='" + this.MUC_USER_NS + "']>invite";
            var caps = client.controllers.capabilities || jabberwerx.CapabilitiesController(client);
            caps.addFeature('http://jabber.org/protocol/muc');
            caps.addFeature(this.MUC_USER_NS);
            caps.addFeature('jabber:x:conference');
            caps.addFeature('http://jabber.org/protocol/xhtml-im');
            this.applyEvent('mucInviteReceived');
            this.client.event("messageReceived").bindWhen("message[type!='error']>x[xmlns='jabber:x:conference']", this.invocation("_handleDirectInvite"));
            this.client.event("messageReceived").bindWhen(this.INVITE_SELECTOR, this.invocation("_handleMediatedInvite"));
        },
        destroy: function () {
            this._super();
        },
        updateEntity: function (entity) {
            if (!(entity && entity instanceof jabberwerx.MUCRoom)) {
                throw new TypeError("entity must be a MUCRoom");
            }
            this.client.entitySet.event("entityUpdated").trigger(entity);
        },
        removeEntity: function (entity) {
            if (!(entity && entity instanceof jabberwerx.MUCRoom)) {
                throw new TypeError("entity must be a MUCRoom");
            }
            if (entity.isActive() && this.client.isConnected()) {
                entity.event("roomExited").bind(function (evt) {
                    entity.event("roomExited").unbind(arguments.callee);
                    entity.destroy();
                });
                entity.exit();
            } else {
                entity.destroy();
            }
        },
        //Establece el nombre de la sala.
        room: function (jid) {
            jid = jabberwerx.JID.asJID(jid).getBareJID();
            var room = this.client.entitySet.entity(jid);
            if (!(room && room instanceof jabberwerx.MUCRoom)) {
                var ent = room;
                room = new jabberwerx.MUCRoom(jid, this);
                if (ent) {
                    room.apply(ent);
                    ent.remove();
                }
                this.client.entitySet.register(room);
            }
            return room;
        },
        cleanupEntity: function (entity) {
            if (entity instanceof jabberwerx.MUCRoom) {
                entity.remove();
            }
        },
        _handleDirectInvite: function (evtObj) {
            var msg = evtObj.data;
            if (jabberwerx.$(this.INVITE_SELECTOR, msg.getDoc()).length == 0) {
                var invitor = msg.getFromJID();
                var x = jabberwerx.$(evtObj.selected);
                var room = x.attr("jid");
                var reason = x.attr("reason");
                this._handleInvite(msg, room, invitor, reason);
                return true;
            }
            return false;
        },
        _handleMediatedInvite: function (evtObj) {
            var msg = evtObj.data;
            var invite = evtObj.selected;
            var invitor = jabberwerx.$(invite).attr("from");
            var room = msg.getFromJID();
            var reason = jabberwerx.$("reason", invite).text() || null;
            var password = jabberwerx.$("password", evtObj.data.getDoc()).text() || null;
            this._handleInvite(msg, room, invitor, reason, password);
            return true;
        },
        _handleInvite: function (stanza, room, invitor, reason, password) {
            var mucInvite = new jabberwerx.MUCInvite(stanza, room, invitor, reason, password);
            var ent = this.client.entitySet.entity(mucInvite.getRoom());
            if (!(ent && ent instanceof jabberwerx.MUCRoom && ent.isActive())) {
                this.event('mucInviteReceived').trigger(mucInvite);
            }
        },
        _sendSearchIq: function (muc, callback, form) {
            var queryString = "{jabber:iq:search}query";
            var query = new jabberwerx.NodeBuilder(queryString);
            var type = "get";
            if (form) {
                if (this.escapeSearch) {
                    try {
                        var roomName = jabberwerx.$.trim(form.getFieldValue("room-name"));
                        form.setFieldValue("room-name", jabberwerx.JID.escapeNode(roomName));
                    } catch (e) {
                        callback(null, e);
                        return;
                    }
                }
                query.node(form.getDOM());
                type = "set";
            }
            this.client.sendIQ(type, muc, query.data, function (stanza) {
                var iq = new jabberwerx.IQ(stanza);
                if (iq.isError()) {
                    callback(null, iq.getErrorInfo());
                } else {
                    var form = jabberwerx.$("x", iq.getNode()).get(0);
                    if (!form) {
                        callback(null, jabberwerx.Stanza.ERR_SERVICE_UNAVAILABLE);
                    } else {
                        callback(new jabberwerx.XDataForm(null, form));
                    }
                }
            });
        },
        startSearch: function (muc, callback) {
            muc = jabberwerx.JID.asJID(muc).getDomain();
            if (!jabberwerx.$.isFunction(callback)) {
                throw new TypeError("The variable 'callback' must be a function.");
            }
            this._sendSearchIq(muc, callback);
        },
        submitSearch: function (muc, form, callback) {
            muc = jabberwerx.JID.asJID(muc).getDomain();
            if (!jabberwerx.$.isFunction(callback)) {
                throw new TypeError("The variable 'callback' must be a function.");
            }
            if (!(form && form instanceof jabberwerx.XDataForm)) {
                throw new TypeError("form must be an XDataForm");
            }
            this._sendSearchIq(muc, callback, form);
        },
        MUC_USER_NS: "http://jabber.org/protocol/muc#user",
        INVITE_SELECTOR: "",
        escapeSearch: true
    }, "jabberwerx.MUCController");
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/controller/PrivacyListController.js*/
;
(function (jabberwerx) {
    jabberwerx.PrivacyListController = jabberwerx.Controller.extend({
        init: function (client) {
            this._super(client, "privacyList");
            this.applyEvent("errorEncountered");
            this.applyEvent("privacyListApplied");
            this.applyEvent("privacyListUpdated");
            this.applyEvent("privacyListRemoved");
            this.client.event('afterIqReceived').bindWhen("[type='set'] query[xmlns='jabber:iq:privacy'] list", this.invocation('_handlePrivacyListUpdate'));
        },
        destroy: function () {
            this.client.event('afterIqReceived').unbind(this.invocation('_handlePrivacyListUpdate'));
            this._super();
        },
        fetch: function (list, callback) {
            if (!this.client.isConnected()) {
                throw new jabberwerx.Client.NotConnectedError();
            }
            if (callback !== undefined && !jabberwerx.$.isFunction(callback)) {
                throw new TypeError('The callback param must be a function');
            }
            if (!list || typeof list != 'string') {
                throw new TypeError('Privacy list name should be non empty string.');
            }
            this._doFetch(list, true, callback);
        },
        _doFetch: function (list, create, callback) {
            var that = this;
            var errorOccured = false;
            var removed = false;
            this.client.sendIq('get', null, "<query xmlns='jabber:iq:privacy'><list name='" + list + "'/></query>", function (stanza) {
                var error = that._checkError(stanza);
                var prvListNode = jabberwerx.$(stanza).find("list").get(0);
                var list_name = prvListNode.getAttribute("name");
                var privListObj = that._privacyLists[list_name];
                if (error) {
                    var item_not_found = jabberwerx.$(error).find("item-not-found").get(0);
                    if (item_not_found) {
                        if (!create) {
                            if (that._privacyLists[list_name]) {
                                that.event("privacyListRemoved").trigger(that._privacyLists[list_name]);
                                that._privacyLists[list_name].destroy();
                                removed = true;
                            }
                        } else {
                            error = null;
                        }
                    } else {
                        errorOccured = true;
                    }
                }
                if (errorOccured) {
                    that.event("errorEncountered").trigger({
                        operation: "fetch",
                        error: error,
                        target: that._privacyLists[list_name]
                    });
                } else {
                    if (!removed) {
                        if (that._privacyLists[list_name]) {
                            that._privacyLists[list_name]._update(prvListNode);
                        } else {
                            privListObj = that._privacyLists[list_name] = new jabberwerx.PrivacyList(prvListNode, that);
                        }
                        that.event("privacyListUpdated").trigger(that._privacyLists[list_name]);
                    }
                }
                if (callback) {
                    callback.call(that, privListObj, error);
                }
            });
        },
        _remove: function (list) {
            if (this._privacyLists[list]) {
                delete this._privacyLists[list];
            }
        },
        _checkError: function (parentElement) {
            return jabberwerx.$(parentElement).children("error")[0];
        },
        apply: function (list, callback) {
            if (!this.client.isConnected()) {
                throw new jabberwerx.Client.NotConnectedError();
            }
            if (callback !== undefined && !jabberwerx.$.isFunction(callback)) {
                throw new TypeError('The callback param must be a function');
            }
            var list_name;
            if (list) {
                if (typeof list == 'string') {
                    list_name = list;
                } else if (list instanceof jabberwerx.PrivacyList) {
                    list_name = list.getName();
                } else {
                    throw new TypeError('Privacy list name should be string or PrivacyList or empty.');
                }
            }
            var queryNode = new jabberwerx.NodeBuilder("{jabber:iq:privacy}query").attribute("type", "set");
            var activeNode = queryNode.element("active");
            if (list) {
                activeNode.attribute("name", list_name);
            }
            var that = this;
            this.client.sendIq('set', null, queryNode.data, function (stanza) {
                var error = that._checkError(stanza);
                if (error) {
                    that.event("errorEncountered").trigger({
                        operation: "apply",
                        error: error
                    });
                } else {
                    that.event("privacyListApplied").trigger({
                        list: list_name
                    });
                }
                if (callback) {
                    callback.call(that, error);
                }
            });
        },
        _handlePrivacyListUpdate: function (evt) {
            var list_name = jabberwerx.$(evt.selected).attr("name")
            var iq = new jabberwerx.IQ();
            iq.setTo(evt.data.getFrom());
            iq.setFrom();
            iq.setType("result");
            iq.setID(evt.data.getID());
            this.client.sendStanza(iq);
            this._doFetch(list_name);
            return true;
        },
        _privacyLists: {}
    }, 'jabberwerx.PrivacyListController');
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/controller/PrivateStorageController.js*/
;
(function (jabberwerx) {
    jabberwerx.PrivateStorageController = jabberwerx.Controller.extend({
        init: function (client) {
            this._super(client, "privateStorage");
        },
        destroy: function () {
            this._super();
        },
        fetch: function (ename, callback) {
            if (!this.client.isConnected()) {
                throw new jabberwerx.Client.NotConnectedError();
            }
            if (!jabberwerx.$.isFunction(callback)) {
                throw new TypeError('The callback param must be a function');
            }
            if (!ename) {
                throw new TypeError('Private storage element name should not be empty.');
            }
            var query = new jabberwerx.NodeBuilder("{jabber:iq:private}query");
            var prv_elem = query.element(ename);
            var that = this;
            this.client.sendIq("get", null, query.data, function (stanza) {
                var error = that._checkError(stanza);
                var private_data = jabberwerx.$(stanza).find(prv_elem.data.tagName + "[xmlns='" + prv_elem.data.getAttribute("xmlns") + "']").get(0);
                if (callback) {
                    callback.call(that, private_data, error);
                }
            });
        },
        update: function (private_elm) {
            if (!jabberwerx.isElement(private_elm)) {
                throw new TypeError('Private storage should be an element.');
            }
            var query = new jabberwerx.NodeBuilder("{jabber:iq:private}query").node(private_elm).parent;
            this.client.sendIq("set", null, query.data);
        },
        remove: function (ename) {
            if (!ename) {
                throw new TypeError('Private storage element name should not be empty.');
            }
            var query = new jabberwerx.NodeBuilder("{jabber:iq:private}query").element(ename).parent;
            this.client.sendIq("set", null, query.data);
        },
        _checkError: function (parentElement) {
            return jabberwerx.$(parentElement).children("error")[0];
        }
    }, 'jabberwerx.PrivateStorageController');
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/controller/DiscoController.js*/
;
(function (jabberwerx) {
    jabberwerx.DiscoController = jabberwerx.Controller.extend({
        init: function (client) {
            this._super(client, "disco");
            this.applyEvent("discoInitialized");
            this.client.event("clientStatusChanged").bind(this.invocation("_handleStatusChange"));
        },
        destroy: function () {
            this.client.event('clientStatusChanged').unbind(this.invocation('_handleStatusChange'));
            this._super();
        },
        _handleStatusChange: function (evt) {
            switch (evt.data.next) {
                case jabberwerx.Client.status_connected:
                    break;
                case jabberwerx.Client.status_disconnected:
                    this._pendingJids = [];
                    this._initialized = false;
                    break;
            }
        },
        startRendezvous: function (ctx) {
            this._super(ctx);
            this._walkDisco();
            return true;
        },
        finishRendezvous: function () {
            this._initialized = true;
            this.event("discoInitialized").trigger();
            return this._super();
        },
        _walkDisco: function () {
            var info = new jabberwerx.NodeBuilder("{http://jabber.org/protocol/disco#info}query");
            this.client.sendIq("get", this.client.connectedServer.jid, info.data, this.invocation('_handleDiscoInfo'));
            var items = new jabberwerx.NodeBuilder("{http://jabber.org/protocol/disco#items}query");
            this.client.sendIq("get", this.client.connectedServer.jid, items.data, this.invocation('_handleDiscoItems'));
        },
        _handleDiscoInfo: function (stanza) {
            var jid = stanza.getAttribute("from");
            if (stanza.getAttribute("type") != "error") {
                var server = this.client.entitySet.entity(jid);
                if (!server) {
                    server = new jabberwerx.Server(jid, this);
                    this.client.entitySet.register(server);
                }
                var identities = jabberwerx.$(stanza).find("identity");
                server.identities = [];
                jabberwerx.$.each(identities, function () {
                    server.identities.push(this.getAttribute("category") + "/" + this.getAttribute("type"));
                });
                var features = jabberwerx.$(stanza).find("feature");
                server.features = [];
                jabberwerx.$.each(features, function () {
                    server.features.push(this.getAttribute("var"));
                });
                if (server.controller === this && identities.get(0).getAttribute("name")) {
                    server.setDisplayName(identities.get(0).getAttribute("name"));
                } else {
                    server.update();
                }
            }
            if (jid != this.client.connectedServer.jid) {
                var idx = -1;
                for (var i = 0; i < this._pendingJids.length; i++) {
                    if (this._pendingJids[i] == jid) {
                        idx = i;
                        break;
                    }
                }
                if (idx >= 0) {
                    this._pendingJids.splice(idx, 1);
                }
                if (this._pendingJids.length == 0) {
                    this.finishRendezvous();
                }
            }
        },
        _handleDiscoItems: function (stanza) {
            var jStanza = jabberwerx.$(stanza);
            var items = jStanza.find("item");
            if (items.length == 0 || jStanza.attr("type") == 'error') {
                this.finishRendezvous();
                return;
            }
            var info = new jabberwerx.NodeBuilder("{http://jabber.org/protocol/disco#info}query");
            var that = this;
            jabberwerx.$.each(items, function () {
                var item = that.client.entitySet.entity(this.getAttribute("jid"));
                if (!item) {
                    item = new jabberwerx.Server(this.getAttribute("jid"), that);
                    that.client.entitySet.register(item);
                }
                that._pendingJids.push(this.getAttribute("jid"));
                that.client.sendIq("get", this.getAttribute("jid"), info.data, that.invocation('_handleDiscoInfo'), that.timeout);
            });
        },
        cleanupEntity: function (entity) {
            entity.remove();
        },
        findByIdentity: function (identity) {
            if (!this._initialized) {
                throw new TypeError("Disco controller has not been initialized.");
            }
            var entities = [];
            this.client.entitySet.each(function (entity) {
                if (entity.hasIdentity(identity)) {
                    entities.push(entity);
                }
            });
            return entities;
        },
        fetchInfo: function (jid, node, cb) {
            jid = jabberwerx.JID.asJID(jid);
            if (!jabberwerx.$.isFunction(cb)) {
                throw new TypeError("cb must be a function.");
            }
            var info = new jabberwerx.NodeBuilder(this._DISCO_INFO);
            if (node) {
                if (typeof (node) == "string") {
                    info.attribute("node", node);
                } else {
                    throw new TypeError("If node is defined, it must be a string.");
                }
            }
            var callbacks = this._fetchInfoMap[this._jwesAsKey(jid, node)];
            if (!callbacks) {
                this._fetchInfoMap[this._jwesAsKey(jid, node)] = [cb];
            } else {
                callbacks.push(cb);
                return;
            }
            var that = this;
            this.client.sendIq("get", jid, info.data, function (stanza) {
                var identities = [];
                var features = [];
                var extras = [];
                var err = null;
                if (stanza) {
                    var iq = new jabberwerx.IQ(stanza);
                    if (iq.isError()) {
                        err = iq.getErrorInfo();
                    } else {
                        var contents = jabberwerx.$(iq.getQuery()).contents();
                        for (index = 0; index < contents.length; index++) {
                            var content = contents[index];
                            switch (content.nodeName) {
                                case ("identity"):
                                    content = jabberwerx.$(content);
                                    var identity = content.attr("category") + "/";
                                    identity = identity + (content.attr("type") ? content.attr("type") : "") + "/";
                                    identity = identity + (content.attr("xml:lang") ? content.attr("xml:lang") : "") + "/";
                                    identity = identity + (content.attr("name") ? content.attr("name") : "");
                                    identities.push(identity);
                                    break;
                                case ("feature"):
                                    features.push(jabberwerx.$(content).attr("var"));
                                    break;
                                case ("x"):
                                    if (content.getAttribute("xmlns") == "jabber:x:data") {
                                        extras.push(new jabberwerx.XDataForm(null, content));
                                    }
                                    break;
                            }
                        }
                    }
                }
                var callbacks = that._fetchInfoMap[that._jwesAsKey(jid, node)];
                for (i = 0; i < callbacks.length; i++) {
                    callbacks[i](identities, features, extras, err);
                }
                delete that._fetchInfoMap[that._jwesAsKey(jid, node)];
            }, this.timeout);
        },
        _jwesAsKey: function (jid, node) {
            return "[" + (jid || "") + "]:[" + (node || "") + "]";
        },
        _fetchInfoMap: {},
        _DISCO_INFO: "{http://jabber.org/protocol/disco#info}query",
        timeout: 30,
        findByFeature: function (feature) {
            if (!this._initialized) {
                throw new TypeError("Disco controller has not been initialized.");
            }
            var entities = [];
            this.client.entitySet.each(function (entity) {
                if (entity.hasFeature(feature)) {
                    entities.push(entity);
                }
            });
            return entities;
        },
        _initialized: false,
        _pendingJids: []
    }, 'jabberwerx.DiscoController');
    jabberwerx.DiscoController.mixin(jabberwerx.Rendezvousable);
    jabberwerx.Client.intercept({
        init: function () {
            this._super.apply(this, arguments);
            var discoController = new jabberwerx.DiscoController(this);
        }
    });
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/controller/PubSubController.js*/
;
(function (jabberwerx) {
    jabberwerx.PubSubController = jabberwerx.Controller.extend({
        init: function (client, name) {
            this._super(client, name || "pubsub");
            this._cleanupMode = jabberwerx.PubSubController.CLEANUP_ALL;
        },
        destroy: function () {
            var that = this;
            this.client.entitySet.each(function (node) {
                if (node.controller === that) {
                    node.remove();
                }
            });
            this._super();
        },
        node: function (node, jid) {
            if (!(node && typeof (node) == "string")) {
                throw new TypeError("node must be a non-empty string");
            }
            jid = this._prepareJid(jid);
            var pstype = this._getNodeClass();
            var pubsub = this.client.entitySet.entity(jid, node);
            if (!(pubsub && pubsub instanceof pstype)) {
                var tmp = pubsub;
                pubsub = new pstype(jid, node, this);
                if (tmp) {
                    pubsub.apply(tmp);
                    tmp.remove();
                }
                this.client.entitySet.register(pubsub);
            }
            return pubsub;
        },
        _prepareJid: function (jid) {
            return jabberwerx.JID.asJID(jid).getBareJID();
        },
        _getNodeClass: function () {
            return jabberwerx.PubSubNode;
        },
        cleanupEntity: function (entity) {
            if (this._cleanupMode == jabberwerx.PubSubController.CLEANUP_ALL) {
                entity.remove();
            } else if (this._cleanupMode == jabberwerx.PubSubController.CLEANUP_DELEGATES) {
                if (entity.delegate) {
                    entity.remove()
                } else {
                    entity.properties.delegates = {};
                }
            } else { }
        },
        _removeNodesFromEntitySet: function (mode) {
            if (mode) {
                var oldmode = this._cleanupMode;
                this._cleanupMode = mode;
            }
            var that = this;
            this.client.entitySet.each(function (node) {
                if (node.controller === that) {
                    that.cleanupEntity(node);
                }
            });
            if (oldmode !== undefined) {
                this._cleanupMode = oldmode;
            }
        },
        _cleanupMode: null
    }, "jabberwerx.PubSubController");
    jabberwerx.PubSubController.CLEANUP_ALL = "all";
    jabberwerx.PubSubController.CLEANUP_DELEGATES = "delegates";
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/controller/PEPController.js*/
;
(function (jabberwerx) {
    jabberwerx.PEPController = jabberwerx.PubSubController.extend({
        init: function (client) {
            this._super(client, "pep");
            this._cleanupMode = jabberwerx.PubSubController.CLEANUP_DELEGATES;
        },
        destroy: function () {
            this._super();
        },
        node: function (node, jid) {
            return this._super(node, jid);
        },
        _prepareJid: function (jid) {
            return (jid) ? this._super(jid) : undefined;
        },
        _getNodeClass: function () {
            return jabberwerx.PEPNode;
        }
    }, "jabberwerx.PEPController");
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/jabberwerx.ui.js*/
;
(function (jabberwerx) {
    jabberwerx.ui = {
        version: '2014.04.0',
        _config: {
            themeName: 'default',
            showStatus: 'light'
        },
        getThemeImageURL: function (fileName) {
            return this.getThemeURL() + 'images/' + fileName;
        },
        getThemeURL: function () {
            return jabberwerx._getInstallURL() + 'resources/themes/' + this._config.themeName + '/';
        },
        _init: function () {
            this._inited = true;
            var config = {};
            config = jabberwerx.$.extend(true, config, this._config);
            if (typeof (jabberwerx_config) != "undefined") {
                config = jabberwerx.$.extend(true, config, (jabberwerx_config || {}));
            }
            jabberwerx._config.ui = config;
        },
        _months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        _getTimeDisplayString: function (date) {
            date = date || new Date();
            var min = date.getMinutes();
            min = (min < 10 ? "0" + min : "" + min);
            var hours = date.getHours();
            var meridian = (hours >= 12 ? "pm" : "am");
            hours = (hours === 0 ? 12 : (hours > 12 ? hours - 12 : hours));
            return hours + ":" + min + meridian;
        },
        _getDayDisplayString: function (date, now) {
            now = now || new Date();
            date = date || new Date();
            var year = date.getFullYear();
            var month = date.getMonth();
            var day = date.getDate();
            var dayString = '';
            if (now.getFullYear() != year || now.getMonth() != month || now.getDate() != day) {
                dayString = jabberwerx.ui._months[month] + " " + (day < 10 ? "0" : "") + day;
            }
            if (now.getFullYear() != year) {
                dayString += ', ' + year.toString();
            }
            return dayString;
        },
        getDateDisplayString: function (date) {
            var dayString = jabberwerx.ui._getDayDisplayString(date)
            if (dayString.length) {
                dayString += ' ';
            }
            return dayString + jabberwerx.ui._getTimeDisplayString(date);
        }
    };
    if (typeof jabberwerx_ui_config != 'undefined' && typeof jabberwerx_ui_config.themeName != 'undefined') {
        jabberwerx.ui._config.themeName = jabberwerx_ui_config.themeName;
    }
    if (!jabberwerx._config.installPath) {
        jabberwerx._config.installPath = jabberwerx._getInstallPath("jabberwerx.ui");
    }
    jabberwerx.ui._init();
    var url = jabberwerx.ui.getThemeURL() + "css/styles.css";
    var styles = jabberwerx.$("head link[rel='stylesheet'][href='" + url + "']");
    if (!styles.length) {
        jabberwerx.$("head").prepend('<link rel="stylesheet" href="' + url + '" type="text/css" media="screen" />');
    }
    jabberwerx.ui.JWApp = jabberwerx.JWApp.extend({});
    jabberwerx.app = {
        persistedApplicationClass: jabberwerx.util.persistedApplicationClass,
        persistedApplicationInstance: jabberwerx.util.persistedApplicationInstance
    }
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/jwapp/JWView.js*/
;
(function (jabberwerx) {
    jabberwerx.ui.JWView = jabberwerx.JWModel.extend({
        init: function () {
            this._super();
            this.applyEvent("viewRendered");
            this.applyEvent("viewRemoved");
            this.applyEvent("viewActivated");
            this.applyEvent("viewDeactivated");
        },
        destroy: function () {
            this.remove();
            this._super();
        },
        parent: function () {
            var found = null;
            var pn = this.jq && this.jq.get(0).parentNode;
            while (!found && pn) {
                found = pn.jw_view || null;
                pn = pn.parentNode;
            }
            return found;
        },
        dimensions: function (dim) {
            if (!dim) {
                return {
                    width: this.width() || 0,
                    height: this.height() || 0
                };
            }
            if (this.jq) {
                if (dim.width) {
                    this.width(dim.width, true);
                }
                if (dim.height) {
                    this.height(dim.height, true);
                }
                this.update();
            }
            return this;
        },
        width: function (w, noupdate) {
            if (w === undefined) {
                return (this.jq && this.jq.width()) || 0;
            }
            if (this.jq) {
                this.jq.width(w);
                w = this.jq.width();
                var delta = this.jq.outerWidth(true) - this.jq.width();
                this.jq.width(w - Math.max(delta, 0));
                !noupdate && this.update();
            }
            return this;
        },
        height: function (h, noupdate) {
            if (h === undefined) {
                return (this.jq && this.jq.height()) || 0;
            }
            if (this.jq) {
                this.jq.height(h);
                h = this.jq.height();
                var delta = (this.jq.outerHeight(true) - this.jq.height());
                this.jq.height(h - Math.max(delta, 0));
                !noupdate && this.update();
            }
            return this;
        },
        render: function (doc) {
            if (!this.jq) {
                if (!doc) {
                    doc = document;
                } else if (!jabberwerx.isDocument(doc)) {
                    throw new TypeError("document is not valid");
                }
                var data = this.createDOM(doc);
                if (!data) {
                    throw new ReferenceError("data not created");
                }
                this.jq = jabberwerx.$(data);
                this.jq.get(0).jw_view = this;
                this.event("viewRendered").trigger(this.jq);
                this.update();
            }
            return this.jq;
        },
        show: function () {
            if (this.jq && !this._isVisible()) {
                this.jq.show();
            }
            return this;
        },
        hide: function () {
            if (this.jq && this._isVisible()) {
                this.jq.hide();
            }
            return this;
        },
        createDOM: function (doc) {
            return null;
        },
        remove: function () {
            if (this.jq) {
                var jq = this.jq;
                this.destroyDOM();
                this.jq = null;
                jq.remove();
                this.event("viewRemoved").trigger(jq);
            }
            return this;
        },
        destroyDOM: function () { },
        update: function () {
            return Boolean(this.jq);
        },
        shouldBeSavedWithGraph: function () {
            return true;
        },
        willBeSerialized: function () {
            this._super();
            if (this.jq && this.persistOptions() == jabberwerx.ui.JWView.persist_html) {
                if (this.jq.get(0).xml) {
                    this._persistedHTML = this.jq.get(0).xml;
                } else {
                    this._persistedHTML = this.jq.get(0).outerHTML;
                }
            }
            this.jq = null;
            return true;
        },
        wasUnserialized: function () {
            this._super();
            this._savedRender = this.render;
            this.render = this.restoreRender;
            this.jq = null;
            return true;
        },
        restoreRender: function (doc) {
            if (!this.jq) {
                if (!doc) {
                    doc = document;
                } else if (!jabberwerx.isDocument(doc)) {
                    throw new TypeError("document is not valid");
                }
                var data = this.restoreDOM(doc);
                if (!data) {
                    throw new ReferenceError("data not created");
                }
                this.jq = jabberwerx.$(data);
                this.jq.get(0).jw_view = this;
                this.render = this._savedRender;
                this.restoreUpdate();
            }
            return this.jq;
        },
        restoreDOM: function (doc) {
            var res = null;
            if (this._persistedHTML) {
                res = jabberwerx.$(this._persistedHTML, doc).get(0);
                this._persistedHTML = null;
            } else {
                res = this.createDOM(doc);
            }
            return res;
        },
        restoreUpdate: function () {
            return true;
        },
        persistOptions: function (opts) {
            if (opts === undefined) {
                return this._persistOpts;
            }
            this._persistOpts = opts;
            return this;
        },
        _persistOpts: 0,
        _isVisible: function () {
            return this.jq && this.jq.is(":visible");
        },
        jq: null
    }, "JWView");
    jabberwerx.ui.JWView.persist_none = 0;
    jabberwerx.ui.JWView.persist_html = 1;
})(jabberwerx);
;
(function (jabberwerx) {
    jabberwerx.ui.Emoticons = jabberwerx.JWModel.extend({
        init: function () {
            this._super();
            var emojiListArray = this.emoticons;
            var result = Object.keys(emojiListArray).map(function (key) {
                return String(key);
            });
            this._emojiArrayList = result;
        },
        translate: function (rawText) {
            var that = this;
            var findTextNodes = function (element) {
                if (jabberwerx.isText(element)) {
                    var replace = that._translate(jabberwerx.$(element).text());
                    jabberwerx.$(element).replaceWith(replace);
                } else if (element.hasChildNodes()) {
                    for (var i = 0; i < element.childNodes.length; i++) {
                        findTextNodes(element.childNodes[i]);
                    }
                }
            };
            if (typeof rawText == 'string') {
                return this._translate(rawText);
            } else if (rawText instanceof jabberwerx.$) {
                for (var i = 0; i < rawText.length; i++) {
                    findTextNodes(rawText[i]);
                }
                return rawText;
            } else {
                throw new jabberwerx.ui.Emoticons.InvalidRawTextFormat();
            }
        },
        _translate: function (rawText) {
            var translationContainer = jabberwerx.$('<translationContainer/>');
            if (rawText.length > 1024) {
                translationContainer.append(rawText);
            } else if (rawText) {
                if (!this._imageFolder) {
                    this._imageFolder = jabberwerx.ui.getThemeImageURL("emoticons/");
                }
                
                // Reestructuración del Esquema para emoticones
                var SPLIT_MESSAGE_CHAR = " ";
                // Capturar emoticones y establecerles el SPLIT_MESSAGE_CHAR
                var emojiList = jabberwerx.ui.emoticons.emoticons;
                for(var emojiKey in emojiList) {
                    var index = rawText.indexOf(emojiKey);
                    switch(emojiKey) {
                        case ':/':
                            var coincidence = rawText.substr(index, 3);
                            if(coincidence != '://') {
                                rawText = rawText.replace(emojiKey, emojiKey + ' ');
                            }
                            break;
                        case ':o':
                            // Caso de emoji :o reemplaza por :o ffice
                            var coincidence = rawText.substr(index, 7);
                            if(coincidence != ':office') {
                                rawText = rawText.replace(emojiKey, emojiKey + ' ');
                            }
                            break;
                        case ':s':
                            // Caso de emoji :s reemplaza por :s ushi
                            var coincidence = rawText.substr(index, 6);
                            if(coincidence != ':sushi') {
                                rawText = rawText.replace(emojiKey, emojiKey + ' ');
                            }
                            break;
                        case '*_*':
                            // Caso de emoji (*_*) reemplaza por (*_* )
                            var coincidence = rawText.substr(index, 4);
                            if(coincidence != '*_*)') {
                                rawText = rawText.replace(emojiKey, emojiKey + ' ');
                            }
                            break;
                        default:
                            // Cualquier otro caso, adicionar al emoji un espacio
                            rawText = rawText.replace(emojiKey, emojiKey + ' ');
                            break;
                    }
                }
                // Realizar split de los tokens en la cadena
                var spaceSplitMessageArray = rawText.split(SPLIT_MESSAGE_CHAR);
                // Excluir de la transformación los archivos que inician con "<img", "src='
                if(spaceSplitMessageArray.length == 0 || spaceSplitMessageArray[0] == '<img') {
                    translationContainer.append(rawText);
                }
                else {
                    for (var i = 0; i < spaceSplitMessageArray.length; i++) {
                        var wordElement = spaceSplitMessageArray[i];
                        if (wordElement != SPLIT_MESSAGE_CHAR && wordElement != '') {
                            if (this._emojiArrayList.indexOf(spaceSplitMessageArray[i]) != -1) {
                                // Si palabra corresponde a un emoji construir la imagen del mismo
                                var appendContent = 
                                "<img src='" + this._imageFolder + this.emoticons[spaceSplitMessageArray[i]] 
                                + "' title='" + spaceSplitMessageArray[i] + "' alt='" + spaceSplitMessageArray[i] + "' />"
                                + " ";
                                translationContainer.append(appendContent);
                            } else {
                                // Si palabra no es un emoji solamente adjuntarla
                                var appendContent = spaceSplitMessageArray[i] + " ";
                                translationContainer.append(appendContent);
                            }
                        }
                    }
                }
            }
            return translationContainer.contents();
        },
       SIMPLE_EMOTICONS: {
        ":)":'smiley.gif',
        ':P': 'tongue.gif',
        ':D':'big_smile.gif',
        ":'-)":'laughCry.gif',
        'XD':'big_smile.gif',
        '0:)':'angelic.gif',
        "(BLUSH)":'blush.gif',
        ":[":'blush.gif',
        ":*":'kiss.gif',
        '*-*':'dazed.gif',
        '*_*':'dazed.gif',
        "(*_*)":'love.gif',
        '(COOL)':'cool.gif',
        ':cool': 'cool.gif',
        'B)': 'cool.gif',
        ":-B": 'geek.gif',
        "B-)": 'geek.gif',
        ":(": 'frown.gif',
        ':-<': 'frown.gif',
        ':-&lt;': 'frown.gif',
        '(disapproval)':'dissaproval.gif',
        ':O': 'surprise.gif',
        ':-O': 'surprise.gif',
        ':o': 'surprise.gif',
        ':-o': 'surprise.gif',
        ':/':'confused_face.gif',
        ':-S': 'Undecided.gif',
        ':s': 'Undecided.gif',
        ';)': 'wink.gif',
        ';-)': 'wink.gif',
        'x_x':'dead.gif',
        "|:-\\":'disaprovalFace.gif',
        '=.=':'closeEyes.gif',
        '#)': 'sleep.gif',
        ">:(":'angry.gif',
        '&gt;:(':'angry.gif',
        ':-@': 'angry.gif',
        '(weary)':'weary-face.gif',
        "X-0": 'crazy.gif',
        ":'(":'cry.gif',
        ':-x': 'closed.gif',
        ':x': 'closed.gif',
        ':!':'scared.gif',
        '*-*':'dazed.gif',
        'o_o': 'rollEyes.gif',
        "(:-$":"sick2.gif",
        "(idea)": 'lightbulb.gif',
        ':idea': 'lightbulb.gif',
        '(facepalm)': 'sigh.gif',
        '(screaming)': 'face-screaming.gif',
        '(y)':'thumbs-up-sign.gif',
        '(n)':'thumbs-down-sign.gif',
        '(peace)':'victory-hand.gif',
        '(ok)':'ok-hand-sign.gif',
        '(rockon)':'rockOnn.gif',
        '(loveyou)':'LoveYou.gif',
        '(raisehand)':'raised-hand-with-fingers.gif',
        '(highfive)':'highfive.gif',
        '(lovegesture)':'hand-with-index.gif',
        '(pointright)':'right.gif',
        '(pointleft)':'left.gif',
        '(pointup)':'up.gif',
        '(pointdown)':'down.gif',
        '(comingfist)':'fisted-hand.gif',
        '(fist)':'raised-fist.gif',
        '(muscle)':'flexed-biceps.gif',
        '(claphands)':'clapping-hands.gif',
        '(moon)':'moon.gif',
        '(sun)':'sun.gif',
        '(*)':'star.gif',
        '(lightening)':'high-voltage.gif',
        '(cloud)':'cloud.gif',
        '(rain)':'cloudRain.gif',
        ':duck':'duck.gif',
        ':pumpkin':'Pumpkin.gif',
        ':koala':'Koala.gif',
        '[:]':'sparky.gif',
        '(poo)':'poo.gif',
        ':pizza':'pizza.gif',
        '(pizza)':'pizza.gif',
        ':burger':'burger.gif',
        '(burger)':'burger.gif',
        ':sushi':'suchi.gif',
        '(egg)':'egg.gif',
        '(^)':'cake2x.gif',
        'C(_)':'coffeegood.gif',
        ':champagne':'Champagne.gif',
        ':cheers':'Clinking glass.gif',
        ':fireworks':'fireworks.gif',
        '<:-P':'party.gif',
        '&lt;:-P':'party.gif',
        ':present':'present2x.gif',
        ':balloon':'Celebration.gif',
        '(fire)':'fire.gif',
        ':email':'mail.gif',
        ':wfh':'wfh.gif',
        ':office':'office.gif',
        ':jabber':'jabber.gif',
        ':webex':'webex.gif',
        "<3": 'heart.gif',
        "&lt;3":'heart.gif',
        "</3": 'heart_broken.gif',
        '&lt;/3':'heart_broken.gif',
        ":brokenheart": 'heart_broken.gif',
        "(>.<)":'persevering.gif',
        "(&gt;.&lt;)":'persevering.gif',
        '(:kevin)':'kevin.gif',
       },

       emoticons: {
        ":)":'smiley.gif',
        ':P': 'tongue.gif',
        ':D':'big_smile.gif',
        ":'-)":'laughCry.gif',
        'XD':'big_smile.gif',
        '0:)':'angelic.gif',
        "(BLUSH)":'blush.gif',
        ":[":'blush.gif',
        ":*":'kiss.gif',
        '*-*':'dazed.gif',
        '*_*':'dazed.gif',
        "(*_*)":'love.gif',
        '(COOL)':'cool.gif',
        ':cool': 'cool.gif',
        'B)': 'cool.gif',
        ":-B": 'geek.gif',
        "B-)": 'geek.gif',
        ":(": 'frown.gif',
        ':-<': 'frown.gif',
        ':-&lt;': 'frown.gif',
        '(disapproval)':'dissaproval.gif',
        ':O': 'surprise.gif',
        ':-O': 'surprise.gif',
        ':o': 'surprise.gif',
        ':-o': 'surprise.gif',
        ':/':'confused_face.gif',
        ':-S': 'Undecided.gif',
        ':s': 'Undecided.gif',
        ';)': 'wink.gif',
        ';-)': 'wink.gif',
        'x_x':'dead.gif',
        "|:-\\":'disaprovalFace.gif',
        '=.=':'closeEyes.gif',
        '#)': 'sleep.gif',
        ">:(":'angry.gif',
        '&gt;:(':'angry.gif',
        ':-@': 'angry.gif',
        '(weary)':'weary-face.gif',
        "X-0": 'crazy.gif',
        ":'(":'cry.gif',
        ':-x': 'closed.gif',
        ':x': 'closed.gif',
        ':!':'scared.gif',
       '*-*':'dazed.gif',
        'o_o': 'rollEyes.gif',
        "(:-$":"sick2.gif",
        "(idea)": 'lightbulb.gif',
        ':idea': 'lightbulb.gif',
        '(facepalm)': 'sigh.gif',
        '(screaming)': 'face-screaming.gif',
        '(y)':'thumbs-up-sign.gif',
        '(n)':'thumbs-down-sign.gif',
        '(peace)':'victory-hand.gif',
        '(ok)':'ok-hand-sign.gif',
        '(rockon)':'rockOnn.gif',
        '(loveyou)':'LoveYou.gif',
        '(raisehand)':'raised-hand-with-fingers.gif',
        '(highfive)':'highfive.gif',
        '(lovegesture)':'hand-with-index.gif',
        '(pointright)':'right.gif',
        '(pointleft)':'left.gif',
        '(pointup)':'up.gif',
        '(pointdown)':'down.gif',
        '(comingfist)':'fisted-hand.gif',
        '(fist)':'raised-fist.gif',
        '(muscle)':'flexed-biceps.gif',
        '(claphands)':'clapping-hands.gif',
        '(moon)':'moon.gif',
        '(sun)':'sun.gif',
        '(*)':'star.gif',
        '(lightening)':'high-voltage.gif',
        '(cloud)':'cloud.gif',
        '(rain)':'cloudRain.gif',
        ':duck':'duck.gif',
        ':pumpkin':'Pumpkin.gif',
        ':koala':'Koala.gif',
        '[:]':'sparky.gif',
        '(poo)':'poo.gif',
        ':pizza':'pizza.gif',
        '(pizza)':'pizza.gif',
        ':burger':'burger.gif',
        '(burger)':'burger.gif',
        ':sushi':'suchi.gif',
        '(egg)':'egg.gif',
        '(^)':'cake2x.gif',
        'C(_)':'coffeegood.gif',
        ':champagne':'Champagne.gif',
        ':cheers':'Clinking glass.gif',
        ':fireworks':'fireworks.gif',
        '<:-P':'party.gif',
        '&lt;:-P':'party.gif',
        ':present':'present2x.gif',
        ':balloon':'Celebration.gif',
        '(fire)':'fire.gif',
        ':email':'mail.gif',
        ':wfh':'wfh.gif',
        ':office':'office.gif',
        ':jabber':'jabber.gif',
        ':webex':'webex.gif',
        "<3": 'heart.gif',
        "&lt;3":'heart.gif',
        "</3": 'heart_broken.gif',
        '&lt;/3':'heart_broken.gif',
        ":brokenheart": 'heart_broken.gif',
        "(>.<)":'persevering.gif',
        "(&gt;.&lt;)":'persevering.gif',
        '(:kevin)':'kevin.gif',
        //**Emoticones animados**//
        '(wavehand)':'hismiley.gif',
        '(laughoutloud)':'roflsmiley.gif',
        '(tearsofjoy)':'satisfactionsmile.gif',
        '(smileofsatisfaction)':'satisfacSmiles.gif',
        '(chuckle)':'gigglesmiley.gif',
        '(beingcool)':'coolsmiley.gif',
        '(claps)':'clapping.gif',
        '(raiseeyebrows)':'raiseeye.gif',
        '(feelingshy)':'shysmiley.gif',
        '(eyeswithlove)':'inlovesmiley.gif',
        '(sadwithtears)':'sadsmilesmiley.gif',
        '(cryoutloud)':'cryload.gif',
        '(feelingawkward)':'akwardanimated.gif',
        '(burstintotears)':'cryinganimated.gif',
        '(dizzy)':'dizzy.gif',
        '(frown)':'worriedsmiley.gif',
        '(rollingeyes)':'thinkingsmiley.gif',
        '(beingcrazy)':'crazyg.gif',
        '(angryface)':'angryapp.gif.gif',
        '(scared)':'scaredAnimated.gif',
        '(questionmark)':'question.gif',
        '(speechless)':'speechlessanimated.gif',
        '(thumbsup)':'thumbs.gif',
        '(shakehands)':'handshakeg.gif',
        '(okay)':'okg.gif',
        '(noworries)':'noworries.gif',
        '(confetti)':'partyg.gif',
        '(clinkingglasses)':'beerg.gif',
        '(popchampagne)':'champagne-.gif',
        '(dancingpoo)':'tenor.gif'
    },
        _emoticonRegex: null,
        _imageFolder: null
    });
    jabberwerx.ui.Emoticons.InvalidRawTextFormat = jabberwerx.util.Error.extend('The rawText parameter must be of type string.');
    jabberwerx.ui.emoticons = new jabberwerx.ui.Emoticons();
})(jabberwerx);
;
(function (jabberwerx) {
    jabberwerx.ui.TextInput = jabberwerx.ui.JWView.extend({
        init: function () {
            this._super();
            this.applyEvent("textSend");
            this.applyEvent("textTypingStarted");
            this.applyEvent("textTypingEnded");
            this.applyEvent("textTypingIdled");
        },
        width: function (w, noupdate) {
            var res = this._super(w, true);
            if (w !== undefined) {
                this._configureControl();
                !noupdate && this.update();
            }
            return res;
        },
        height: function (h, noupdate) {
            var res = this._super(h, true);
            if (h !== undefined) {
                this._configureControl();
                !noupdate && this.update();
            }
            return res;
        },
        update: function () {
            if (!this._super()) {
                return false;
            }
            this._configureControl();
            return true;
        },
        _addEmoItem: function(emojiName, emojiForm) {
            var emojiFileName = emojiName;
            var emojiName = emojiName.split('.')[0];
            jabberwerx.$("<i/>").appendTo(emojiForm).attr('id', emojiName)
            .html("<img src='caxl/resources/themes/default/images/emoticons/" + emojiFileName 
            + "' alt='" + emojiName + "' title='" + emojiName + "' />")
            .click(this.invocation("_sendEmoji"));
        },
        createDOM: function (doc) {
            var chatFileInputId = jabberwerx.chatFileInputId + 1;
            var fileFormats = ".xls,.xlsx,.pdf,.csv,.doc,.docx,.ppt,.pptx,.ppts,.rtf,.odt,.ott,.odm,.ods,.ots,.odg,.otg,.odp,.odb,.oxt,.mp4,.avi,.wmv,.mov,.divx,.mpeg,.jpeg,.png,.jpg,.tiff,.mp3";
            var builder = jabberwerx.$("<div/>", doc).addClass("chat_input_wrapper");
            jabberwerx.$("<div/>").appendTo(builder).addClass("send_button").text("Enviar").click(this.invocation("_send"));
            var form = jabberwerx.$("<form/>").appendTo(builder).attr("id", "formChatFile" + chatFileInputId).addClass("file_chat_form");
            jabberwerx.$("<label/>").appendTo(form).attr("for", "chat_file_input" + chatFileInputId).addClass("custom-file-upload").html("<i class='fa fa-lg fa-paperclip'></i>");
            jabberwerx.$("<input/>").appendTo(form).attr('type', 'file').attr("id", "chat_file_input" + chatFileInputId).attr("accept", fileFormats).addClass("chat_file_input").change(this.invocation("_sendFile"));
            jabberwerx.$("<textarea/>").appendTo(builder).addClass("chat_input").attr("rows", "3")
            .click(jabberwerx.closeEmoticonPopup)
            .bind("keypress", this.invocation("_handleKeyPress")).bind("keyup", this.invocation("_handleKeyUp"));
            jabberwerx.$("<div/>").appendTo(builder).addClass("emoticon_input").attr("data-toggle", "popover").attr("data-content", "test").html("<i class='fa fa-lg fa-smile-o'></i>").click(this.invocation("_openEmojiPopup"));
            var emojiForm = jabberwerx.$("<div/>").appendTo(builder).addClass("emoticon_popup hide_popup");
            var emojiList = jabberwerx.ui.emoticons.SIMPLE_EMOTICONS;
            // Agregar uno a uno los emojis del Enum jabberwerx.ui.emoticons.emoticons
            try {
                var tempEmoji = "";
                for(var emojiKey in emojiList) {
                    var emojiName = emojiList[emojiKey];
                    if(tempEmoji != emojiName) {
                        this._addEmoItem(emojiName, emojiForm);
                        tempEmoji = emojiName;
                    }
                }
            } catch (error) {
                console.log('load_emoji_fail: ' + error);
            }
            jabberwerx.chatFileInputId = jabberwerx.chatFileInputId + 1;
            return builder;
        },
        restoreDOM: function (doc) {
            var res = this.createDOM(doc);
            res.find(".chat_input").val(this._persistedText);
            return res;
        },
        destroyDOM: function () {
            if (this._timer) {
                jabberwerx.system.clearTimeout(this._timer);
                this._timer;
            }
        },
        willBeSerialized: function () {
            if (this.jq) {
                this._persistedText = this.jq.find(".chat_input").val();
            } else this._persistedText = "";
            if (this._timer) {
                jabberwerx.system.clearTimeout(this._timer);
                this._timer = null;
            }
            this._count = 0;
            return this._super();
        },
        text: function (val) {
            var textArea = this.jq.find(".chat_input");
            if (val === undefined) {
                return (textArea && textArea.val()) || "";
            }
            if (textArea) {
                textArea.val(val);
                this.update();
            }
            return this;
        },
  /**
   * Evento _openEmojiPopup definición:
   * usado para desplegar el contenedor de emoticones
   */
        _openEmojiPopup: function () {
            this.jq.find(".emoticon_popup").removeClass("hide_popup");
            this.jq.find(".emoticon_popup").addClass("show_popup");
        },
        
 /**
   *Evento _sendEmoji definición:
   *  Evento para envío de código de emoticon al chat input 
   * @param {var} val - variable que obtiene el valor del emoji para enviarlo
   */
        _sendEmoji: function (val) {
            var emojiName = $(val.currentTarget).attr("id");
            this.jq.find(".emoticon_popup").removeClass("show_popup");
            this.jq.find(".emoticon_popup").addClass("hide_popup");
            var text = this.jq.find(".chat_input").val();
            // Crear array de emoticones en base al Enum jabberwerx.ui.emoticons.emoticons
            var emojiList = jabberwerx.ui.emoticons.emoticons;
            var emojiValuesList = Object.keys(emojiList).map(function(key) {
                return [emojiList[key].split('.')[0], key];
            });
            // Eliminar duplicados del array de emoticones
            var hash = {};
            var uniqueEmojiValuesList = emojiValuesList.filter(function(originalItem) {
                var exists = !hash[originalItem[0]] || false;
                hash[originalItem[0]] = true;
                return exists;
            });
            // Convertir a objeto enum invertido con nombres como índice
            var nameEmoticonsEnum = new Object();
            
            for(var key in uniqueEmojiValuesList) {
                nameEmoticonsEnum[uniqueEmojiValuesList[key][0]] = uniqueEmojiValuesList[key][1];
            }
            // Agregar al chat_input el código del emoticon correspondiente en base a su nombre
            var emojiCode = nameEmoticonsEnum[emojiName];
            this.jq.find(".chat_input").val(text + " " + emojiCode + " ");
        },
   /**
   *Evento _send definición:
   *  Evento para la funcionlidad de envio en el chat
   */     
        _send: function () {
            var textArea = this.jq.find(".chat_input");
            var data = textArea.val();
            var that = this;
            var cb = function (result) {
                if (result) {
                    if (that._timer) {
                        jabberwerx.system.clearTimeout(that._timer);
                        that._timer = null;
                    }
                    that._count = 0;
                    textArea.val("");
                }
            };
            if (data.length > 0) {
                this.event("textSend").trigger(data, null, cb);
            }
            textArea.focus();
        },

/**
   * evento _sendFile definición:
   *  Evento para envío de archivos
   * @param {var} val - variable que obtiene el id del valor.
   */
        _sendFile: function (val) {
            var now = new Date();
            var dateURL = now.getFullYear() + "" + now.getMonth() + "" + now.getDay() + "/" + now.getHours();
            var id = $(val.currentTarget).attr("id");
            var fileChat = document.getElementById(id).files[0];
            var fileName = fileChat.name;
            if (fileChat.size > 15728640) {
                $('<div></div>').html("El tamaño del archivo excede el limite permitido (15mb)").dialog({
                    title: "Error",
                    resizable: false,
                    modal: true,
                    buttons: {
                        'Ok': function () {
                            $(this).dialog('close');
                        }
                    }
                });
            } else {
                var formdata = new FormData();
                formdata.append("dateURL", dateURL);
                formdata.append("fileChat", fileChat);

                var xhr = new XMLHttpRequest();
                var url = jabberwerx.ipServices + "/JabberFileManager/UploadDownloadFileServlet";
                xhr.open("POST", url, true);
                xhr.send(formdata);
                xhr.onload = function (e) {
                    if (this.status == 200) {
                        console.log(this.responseText);
                    }
                };
                // Construir URL con indicación del usuario al que se envía el archivo
                var customUrl = jabberwerx.fileStorageDomain + 
                    '/JabberFileManager/GetFile?filename=custom/';
                var data = customUrl + dateURL + "/" + fileName.replace(/\s/g, '');
                jabberwerx.tempTransferedFilename = fileName.replace(/\s/g, '');
                var textArea = this.jq.find(".chat_input");
                var that = this;
                var cb = function (result) {
                    if (result) {
                        if (that._timer) {
                            jabberwerx.system.clearTimeout(that._timer);
                            that._timer = null;
                        }
                        that._count = 0;
                        textArea.val("");
                    }
                };
                if (data.length > 0) {
                    this.event("textSend").trigger(data, null, cb);
                }
                textArea.focus();
            }
        },
        /**
   * evento _handleKeyPress definición:
   * el evento keyup solo se activará una vez que haya liberado la tecla.
   * @returns {true} retorna valor de tipo boolean falso
   * @returns {true} retorna valor de tipo boolean verdadero
   */
        _handleKeyPress: function (evt) {
            if (evt.keyCode == 13) {
                this._send();
                return false;
            }
            return true;
        },


        /**
   * evento _handleKeyUp definición:
   * El evento que se activa cuando el usuario libera una tecla. Solo se dispara una vez por keypres.
   */
        _handleKeyUp: function (evt) {
            var data = this.jq.find(".chat_input").val();
            var count = data.length;
            if (this._count == 0 && count != 0) {
                this.event("textTypingStarted").trigger(data);
                if (this._timer) {
                    jabberwerx.system.clearTimeout(this._timer);
                    this._timer = null;
                }
                if (this.idleTime > 0) {
                    this._timer = jabberwerx.system.setTimeout(this.invocation("_handleIdle"), this.idleTime * 1000);
                }
            } else if (this._count != 0 && count == 0) {
                this.event("textTypingEnded").trigger(data);
                if (this._timer) {
                    jabberwerx.system.clearTimeout(this._timer);
                    this._timer = null;
                }
            }
            this._count = count;
        },
        _handleIdle: function (evt) {
            this.event("textTypingIdled").trigger();
            this._timer = null;
            this._count = 0;
        },
        _configureControl: function () {
            if (!this.jq) return this;
            var w = this.width(),
                h = this.height();
            if (!w || !h) return this;
            var delta = (this.jq.outerWidth(true) - w) / 2;
            var textArea = this.jq.find(".chat_input");
            textArea.css("left", delta + 40);
            var sendButton = this.jq.find(".send_button");
            sendButton.css("right", delta);
            delta = (this.jq.outerHeight(true) - h) / 2;
            textArea.css("bottom", delta);
            sendButton.css("bottom", delta);
            w = w - sendButton.outerWidth(true);
            delta = (sendButton.outerWidth(true) - sendButton.width()) +
                (textArea.outerWidth(true) - textArea.width());
            delta += 2;
            textArea.width(w - delta - 40);
            delta = this.jq.outerHeight(true) - h;
            textArea.height(h - delta - 2);
            sendButton.height(textArea.height());
            sendButton.css("line-height", textArea.height() + "px");
            return this;
        },
        _persistedText: null,
        _timer: null,
        _count: 0,
        idleTime: 30
    }, "jabberwerx.ui.TextInput");
})(jabberwerx);
;
(function (jabberwerx) {
    jabberwerx.ui.MessageHistory = jabberwerx.ui.JWView.extend({
/**
   * Función init definición:
   * función que  inicializa toda la página web.
   */
        init: function () {
            this._super();
            this.persistOptions(jabberwerx.ui.JWView.persist_html);
            this.applyEvent("historyMessageAppended");
        },

        /**
   * Función clearHistory definición:
   * método utlizado para limpiar el historico.
   */
        clearHistory: function () {
            this.jq && this.jq.find("div.chat_incoming").empty();
        },
        addMessage: function (entity, msg) {
            var message = "";
            var cssClassName = "messageView";
            if (msg.isError()) {
                var errorNode = msg.getNode().getElementsByTagName('error').item(0);
                if (errorNode) {
                    message = jabberwerx.errorReporter.getMessage(errorNode);
                }
                cssClassName = cssClassName + " error";
            } else {
                message = msg.getHTML();
                if (!message) {
                    message = msg.getBody();
                }
            }
            var msgView = new jabberwerx.ui.MessageView({
                content: message,
                displayName: entity.getDisplayName(),
                timestamp: msg.timestamp,
                cssClassName: cssClassName
            });
            var msgViewHtml = msgView.render();
            this.event("historyMessageAppended").trigger(msgViewHtml);

            // Find the sender chat display name
            var userRender = msgViewHtml.context.jw_view.displayName;
            userRender = jabberwerx.getMessageViewDisplayName(userRender.split('@')[0]);
            // Codigo formato style de mensajes de Escritorio a Web.
            var time = msgViewHtml.context.jw_view.timestamp;
            var timeNow = time.split("-").pop();
            var divMensajeHTML = msgViewHtml.context.innerHTML;
            var spanMessageDOM = $(divMensajeHTML)[2];
            var spanMessageInnerHTML = $(divMensajeHTML)[2].innerHTML;
            var spanStyleList = spanMessageDOM.querySelectorAll("span[style]");
            var isTextSelector = false;
            var html = "";
            if (spanStyleList.length <= 0) {
                isTextSelector = true;
            }
            var spanStyleHTML;
            if (isTextSelector) {
                //formato de mensaje web
                spanStyleHTML = spanMessageInnerHTML;
            } else {
                //formato de mensaje escritorio
                spanStyleHTML = $(spanMessageInnerHTML)[0].innerHTML;
                if(spanStyleHTML.includes('http') && !spanStyleHTML.includes('JabberFileManager') ){
                    html = spanStyleHTML;
                    spanStyleHTML = '<a href="'+ html +'" target="_blank"> '+html+'</a> ';
                    }
                if (spanStyleHTML == '') {
                    spanStyleHTML = spanMessageInnerHTML;
                }
            }
                msgViewHtml.context.innerHTML = '<span class="time">' + timeNow + '</span><b> ' + userRender + ': </b><span class="message">' + spanStyleHTML + '</span>';
           
            // Replace JW_ expresions in chat views
            var chatViewDOM = $.parseHTML(this.jq[0].innerHTML)[0].children;
            var newChatViewDOM = [];
            var arrayLength = chatViewDOM.length;
            for (var i = 0; i < arrayLength; i++) {
                var spanMessageObject = $(chatViewDOM[i].children[2]);
                var spanMessageText = $(spanMessageObject[0]).text();
                if(spanMessageText == null || spanMessageText == undefined) {
                    console.log('JW Warning');
                    console.log(spanMessageObject);
                }
                // Eliminar del ChatView textos del tipo JW_eUB8Xp7p7 y connect1951860558
                if (!/^JW_/.test(spanMessageText) && !/^connect[0-9]{3,50} *$/i.test(spanMessageText)) {
                    newChatViewDOM.push(chatViewDOM[i]);
                }
            }            
            // Generate html string from new badge text
            var badgeText = '';
            var badge = $.parseHTML(this.jq[0].innerHTML)[1];
            if (badge) {
                var badgeHTMLText = $(badge).html();
                badgeText = badgeHTMLText ? '<div class="chat_badge">' + $(badge).html() + '</div>' : '';
            }
            // Generate html string with the newChatViewDOM
            var newChatViewText = '';
            for (var i = 0; i < newChatViewDOM.length; i++) {
                newChatViewText += '<div class="messageView">' + $(newChatViewDOM[i]).html() + '</div>';
            }
            newChatViewText = '<div class="chat_incoming" style="height: 243px; width: 328.011px;">'
                + newChatViewText + '</div>' + badgeText;
            // Replace the chat innerHTML without JW_ expresion
            this.jq[0].innerHTML = newChatViewText;
            this.jq.find("div.chat_incoming").append(msgViewHtml);
            this._scrollToBottom();
        },
        setBadge: function (data) {
            if (this.jq) {
                var badge = this.jq.find("div.chat_badge");
                if (!data) {
                    badge.remove();
                } else {
                    if (badge.length) {
                        badge.empty();
                    } else {
                        badge = jabberwerx.$("<div/>", this.jq.get(0).ownerDocument).addClass("chat_badge").appendTo(this.jq);
                    }
                    badge.append(data);
                    var statusOne = data[0].innerHTML;
                    if (statusOne.includes(jabberwerx.CHAT_BADGE_LEFT_CONVERSATION_STATE)) {
                        var delayInMilliseconds = 3000;
                        setTimeout(function () {
                            badge.remove();
                        }, delayInMilliseconds);
                    }
                }
            }
        },
        update: function () {
            if (!this._super()) {
                return false;
            }
            this._configureControl();
            this._scrollToBottom();
            return true;
        },
        createDOM: function (doc) {
            var builder = jabberwerx.$("<div/>", doc).addClass("chat_wrapper").click(jabberwerx.closeEmoticonPopup);
            jabberwerx.$("<div/>").addClass("chat_incoming").appendTo(builder);
            return builder.get(0);
        },
        restoreUpdate: function () {
            this._configureControl();
            this._scrollToBottom();
            return true;
        },
        _scrollToBottom: function () {
            if (this.jq) {
                this.jq.find("div.chat_incoming").get(0).scrollTop = this.jq.find("div.chat_incoming").get(0).scrollHeight;
            }
        },
        _findUserInfoFromList: function (p_username) {
            var objectResult = {};
            var p_userArray = getFromLocalStorage("adusrlst");
            if (p_userArray != null && typeof p_userArray !== 'undefined' && p_userArray.length > 0) {
                objectResult = p_userArray.find(x => x.username == p_username);
                if (objectResult == undefined || objectResult == null || !objectResult.displayname) {
                    objectResult = this._createDefaultUserInfo(p_username);
                }
            }
            else {
                objectResult = this._createDefaultUserInfo(p_username);
            }
            return objectResult;
        },
        _getUserFromLocalStorage: function (p_itemName) {
            var objectResult = {};
            // Verify LocalStorage 
            if (typeof (Storage) !== "undefined") {
                objectResult = JSON.parse(localStorage.getItem(p_itemName));
            } else {
                // LocalStorage not supported 
            }
            return objectResult;
        },
        _createDefaultUserInfo: function (p_username) {
            return {
                displayname: p_username,
                username: p_username,
                firstname: p_username,
                lastName: '',
                middlename: ''
            };
        },
        _configureControl: function () {
            if (!this.jq) return this;
            var w = this.jq.width(),
                h = this.jq.height();
            if (!w || !h) return this;
            var div = this.jq.find("div.chat_incoming");
            var delta = div.outerHeight(true) - div.height();
            div.height(h - Math.max(delta, 0));
            delta = div.outerWidth(true) - div.width();
            div.width(w - Math.max(delta, 0));
        }
    }, "jabberwerx.ui.MessageHistory");
})(jabberwerx);
;
(function (jabberwerx) {
    jabberwerx.ui.ConsoleView = jabberwerx.ui.JWView.extend({
        init: function (client) {
            this._super();
            if (!client || !(client instanceof jabberwerx.Client)) {
                throw new TypeError("Client must be a jabberwerx.client");
            }
            this._client = client;
            this._client._stream.event("streamOpened").bind(this.invocation("_streamOpenedHandler"));
            this._client._stream.event("streamClosed").bind(this.invocation("_streamClosedHandler"));
            this._client._stream.event("streamElementsReceived").bind(this.invocation("_streamReceivedHandler"));
            this._client._stream.event("streamElementsSent").bind(this.invocation("_streamSentHandler"));
            this._opts = {};
            this._mixinLogMethods();
            this._messageTemplate = null;
            this._templates = [];
            this._filters = [];
        },
        destroy: function () {
            this._client._stream.event("streamOpened").unbind(this.invocation("_streamOpenedHandler"));
            this._client._stream.event("streamClosed").unbind(this.invocation("_streamClosedHandler"));
            this._client._stream.event("streamElementsReceived").unbind(this.invocation("_streamReceivedHandler"));
            this._client._stream.event("streamElementsSent").unbind(this.invocation("_streamSentHandler"));
            jabberwerx.util.debug.consoleDelegate = null;
            this._super();
        },
        height: function (h, noupdate) {
            var result = this._super(h, true);
            if ((h !== undefined) && this.jq) {
                var entryPaneHeight = (jabberwerx.$("#console-xml-entry").length ? jabberwerx.$("#console-xml-entry").outerHeight(true) : 0);
                var filterBarHeight = (jabberwerx.$("#filter-bar").length ? jabberwerx.$("#filter-bar").outerHeight(true) : 0);
                jabberwerx.ui.ConsoleView._forceFit(jabberwerx.$("#console-log-div"), {
                    height: this.jq.height() - entryPaneHeight - filterBarHeight
                });
                if (!noupdate) {
                    this.update();
                }
            }
            return result;
        },
        width: function (w, noupdate) {
            var result = this._super(w, true);
            if ((w !== undefined) && this.jq) {
                var wo = {
                    width: this.jq.width()
                };
                jabberwerx.ui.ConsoleView._forceFit(jabberwerx.$("#filter-bar", this.jq), wo);
                jabberwerx.ui.ConsoleView._forceFit(jabberwerx.$("#console-log-div", this.jq), wo);
                jabberwerx.ui.ConsoleView._forceFit(jabberwerx.$("#console-xml-entry", this.jq), wo);
                if (!noupdate) {
                    this.update();
                }
            }
            return result;
        },
        update: function () {
            if (!this._super()) {
                return false;
            }
            if (this._persistedXMLEntry && this._persistedXMLEntry.length) {
                jabberwerx.$("#console-xml-entry", this.jq).val(this._persistedXMLEntry);
            }
            delete this._persistedXMLEntry;
            if (this._persistedLog) {
                for (var oneLog in this._persistedLog) {
                    if (this._persistedLog.hasOwnProperty(oneLog)) {
                        jabberwerx.$("#console-log-table", this.jq).append(this._persistedLog[oneLog]);
                    }
                }
            }
            delete this._persistedLog;
            return true;
        },
        willBeSerialized: function () {
            this._persistedXMLEntry = this.text();
            this._persistedLog = {};
            var pcount = jabberwerx._config.persistedLogCount !== undefined ? jabberwerx._config.persistedLogCount : 5;
            var log = jabberwerx.$("#console-log-table", this.jq).find("tr.log_message");
            for (var i = Math.max(log.length - pcount, 0); i < log.length; ++i) {
                var tstr = jabberwerx.util.serializeXML(log[i]) || log[i].outerHTML || "";
                this._persistedLog[i] = tstr;
            }
            this._super();
            this._messageTemplate = null;
            this.templates = null;
            return true;
        },
        clear: function () {
            if (this.jq) {
                jabberwerx.$(".log_message", jabberwerx.$("#console-log-table")).remove();
            }
        },
        _nowTimeString: function () {
            var pad0 = function (ti, nd) {
                var retstr = ti.toString();
                while (retstr.length < nd) {
                    retstr = "0" + retstr;
                }
                return retstr;
            }
            var d = new Date();
            var result = pad0(d.getHours(), 2) + ":";
            result += pad0(d.getMinutes(), 2) + ":";
            result += pad0(d.getSeconds(), 2) + ":";
            result += pad0(d.getMilliseconds(), 3);
            return result;
        },
        _xmpp2html: function (node, parent) {
            var repeatChar = function (rchar, num) {
                var result = [];
                for (var i = 0; i < num; ++i) {
                    result.push(rchar)
                }
                return result.join("");
            };
            var escapeHTML = function (val) {
                switch (val) {
                    case '<':
                        return "&lt;";
                    case '>':
                        return "&gt;";
                    case '&':
                        return "&amp;";
                }
                return val;
            };
            switch (node.get(0).nodeType) {
                case 1:
                    {
                        var htmlDOM = (node.contents().length ? this._templates["element"].clone() : this._templates["simple-element"].clone()); parent.append(htmlDOM); htmlDOM.find("#element-name").text(node.get(0).nodeName);
                        var attrs = [];
                        var spaces = [];
                        for (var i = 0; i < node.get(0).attributes.length; ++i) {
                            var aName = node.get(0).attributes[i].nodeName;
                            if (aName.indexOf("xml") == 0) {
                                spaces.push(aName);
                            } else {
                                attrs.push(aName)
                            }
                        }
                        attrs.sort(); spaces.sort(); attrs = spaces.concat(attrs);
                        if (attrs.length) {
                            var attrInsert = htmlDOM.find("#attributes");
                            var oneAttr = this._templates["attribute"].clone();
                            oneAttr.addClass("xml_first_attrib");
                            oneAttr.find("#spacer:first").text("\u00A0");
                            oneAttr.find("#attrib-val:first").text(node.attr(attrs[0]));
                            oneAttr.find("#attrib-name:first").text(attrs[0]);
                            attrInsert.append(oneAttr);
                            var offset = repeatChar("\u00A0", (node.get(0).nodeName.length + 1) * 2 + 1);
                            for (var i = 1; i < attrs.length; ++i) {
                                attrInsert.append(jabberwerx.$("<br/>"));
                                oneAttr = this._templates["attribute"].clone();
                                oneAttr.find("#spacer:first").text(offset);
                                oneAttr.find("#attrib-name:first").text(attrs[i]);
                                oneAttr.find("#attrib-val:first").text(node.attr(attrs[i]));
                                attrInsert.append(oneAttr);
                            }
                        }
                        var childContainer = htmlDOM.find("#child-container");
                        var that = this; node.contents().each(function (idx, element) {
                            that._xmpp2html(jabberwerx.$(element), childContainer);
                        });
                        break;
                    };
                case 3:
                    {
                        jabberwerx.$("<div/>").addClass("xml_text").text(node.text().replace(/[<>&]/g, escapeHTML)).appendTo(parent);
                        break;
                    };
            }
        },
        _setupFilterCriteria: function (message, mType, msgContainer) {
            msgContainer.attr("mtype", mType);
            if ((mType == "sent_xml") || (mType == "received_xml")) {
                message = jabberwerx.$(message);
                msgContainer.attr("node-name", message.get(0).nodeName);
                if ((mType == "sent_xml") && message.attr("to")) {
                    msgContainer.attr("jid", message.attr("to"))
                } else if (mType == "received_xml") {
                    msgContainer.attr("jid", message.attr("from"));
                }
            }
        },
        _makeFilterLinks: function (mType, htmlDOM) {
            var linkDOM = htmlDOM.find("#element-name:first");
            linkDOM.addClass("filter_element");
            var filter = {
                filterBy: 'node-name',
                criteria: linkDOM.text()
            };
            var that = this;
            linkDOM.click(function () {
                that._filter(filter);
            });
            var attrName = (mType == "sent_xml") ? "to" : "from";
            linkDOM = htmlDOM.find("#attributes:first").find("#attrib-template").map(function (idx, ele) {
                ele = jabberwerx.$(ele);
                if (ele.find("#attrib-name:first").text() == attrName) {
                    return ele.find("#attrib-val:first");
                } else {
                    return null;
                }
            });
            if (linkDOM.length) {
                linkDOM = linkDOM.get(0);
                linkDOM.addClass("filter_jid");
                var jidFilter = {
                    filterBy: 'jid',
                    criteria: linkDOM.text()
                };
                linkDOM.click(function () {
                    that._filter(jidFilter);
                });
            }
        },
        _filterRow: function (row) {
            var hideRow = false;
            for (var i = 0; i < this._filters.length; ++i) {
                hideRow = hideRow || (row.attr(this._filters[i].filterBy) != this._filters[i].criteria);
            }
            if (hideRow) {
                row.hide();
            } else {
                row.show();
            }
            return hideRow;
        },
        _filter: function (filter) {
            var inList = false;
            for (var i = 0; i < this._filters.length; ++i) {
                inList = inList || ((this._filters[i].filterBy == filter.filterBy) && (this._filters[i].criteria == filter.criteria));
            }
            if (!inList) {
                this._filters.push(filter);
                jabberwerx.$("tr[" + filter.filterBy + "!='" + filter.criteria + "']:visible", jabberwerx.$("#console-log-table")).hide();
                this._updateBreadcrumbs();
                this._scrollToBottom();
            }
            return false;
        },
        _clearFilters: function () {
            this._filters = [];
            jabberwerx.$("tr", jabberwerx.$("#console-log-table")).show();
            this._updateBreadcrumbs();
            this._scrollToBottom();
        },
        _updateBreadcrumbs: function () {
            fstr = [];
            for (var i = 0; i < this._filters.length; ++i) {
                fstr.push(this._filters[i].criteria);
            }
            jabberwerx.$("#active-filters").text(fstr.join(" >> "));
        },
        _addConsoleMessage: function (message, mType) {
            var dType = "Unknown";
            if (mType == "sent_xml") {
                dType = "Sent";
            } else if (mType == "received_xml") {
                dType = "Recv";
            } else if (mType == "jwa_log") {
                dType = "Log";
            } else {
                mType = "jwa_log";
            }
            if (!this._messageTemplate) {
                return;
            }
            var logMsg = this._messageTemplate.clone();
            this._setupFilterCriteria(message, mType, logMsg);
            var detailDOM = jabberwerx.$("<span/>").addClass("detail-top");
            if (mType == "jwa_log") {
                detailDOM.text(message);
            } else {
                this._xmpp2html(jabberwerx.$(message), detailDOM);
                this._makeFilterLinks(mType, detailDOM);
            }
            detailDOM.appendTo(logMsg.children(".details")[0]);
            logMsg.children(".type").text(dType);
            logMsg.children(".timestamp").text(this._nowTimeString());
            logMsg.children(".details").addClass(mType);
            var shouldScroll = jabberwerx.$("#console-log-div").get(0);
            shouldScroll = shouldScroll.scrollTop >= (shouldScroll.scrollHeight - shouldScroll.clientHeight);
            logMsg.appendTo(jabberwerx.$("#console-log-table"));
            var showing = this._filterRow(logMsg);
            if (!showing) {
                this._scrollToBottom();
            }
        },
        _scrollToBottom: function () {
            var ld = jabberwerx.$("#console-log-div");
            if (ld.length) {
                ld.get(0).scrollTop = ld.get(0).scrollHeight;
            }
        },
        createDOM: function (doc) {
            var consoleView = jabberwerx.$("<div/>", doc).addClass("jabberwerx console_view").attr("id", "jwa-console-view");
            consoleView[0].consoleView = this;
            jabberwerx.$("<div/>").appendTo(consoleView).addClass("console_toolbar").attr("id", "filter-bar").append(jabberwerx.$("<input type='button' value='" + jabberwerx._("Clear Filter") + "'/>").addClass("console_toolbar_btn").attr("id", "clear-filter-btn").bind("click", this.invocation("_clearFilters"))).append(jabberwerx.$("<input type='button' value='" + jabberwerx._("Clear Console") + "'/>").addClass("console_toolbar_btn").attr("id", "clear-console-btn").bind("click", this.invocation("clear"))).append(jabberwerx.$("<span/>").addClass("active_filters").attr("id", "active-filters"));
            jabberwerx.$("<div/>").appendTo(consoleView).addClass("log_div").attr("id", "console-log-div");
            jabberwerx.$("<table/>").appendTo(jabberwerx.$("#console-log-div", consoleView)).append(jabberwerx.$("<col/>").attr("width", "25px")).append(jabberwerx.$("<col/>").attr("width", "50px")).append(jabberwerx.$("<col/>").attr("width", "100%")).append(jabberwerx.$("<tbody/>").attr("id", "console-log-table"));
            if (!this._opts.noXMLEntry) {
                jabberwerx.$("<textarea/>").appendTo(consoleView).attr("id", "console-xml-entry").bind("keypress", this.invocation("_handleKeyPress"));
            }
            var template = jabberwerx.$("<table/>").addClass("template").attr("id", "console-message-template");
            template.appendTo(consoleView);
            this._messageTemplate = jabberwerx.$("<tr/>").addClass("log_message");
            this._messageTemplate.appendTo(template);
            jabberwerx.$("<td/>").addClass("type").attr("valign", "top").appendTo(this._messageTemplate);
            jabberwerx.$("<td/>").addClass("timestamp").attr("valign", "top").appendTo(this._messageTemplate);
            jabberwerx.$("<td/>").addClass("details").attr("valign", "top").appendTo(this._messageTemplate);
            template.append(jabberwerx.$("<tr/>").append(jabberwerx.$("<span/>").addClass("xml_attrib").attr("id", "attrib-template").append(jabberwerx.$("<span/>").attr("id", "spacer")).append(jabberwerx.$("<span/>").addClass("xml_attrib_name").attr("id", "attrib-name")).append(jabberwerx.$("<span/>").addClass("xml_char").text("='")).append(jabberwerx.$("<span/>").addClass("xml_attrib_val").attr("id", "attrib-val")).append(jabberwerx.$("<span/>").addClass("xml_char").text("'"))));
            template.append(jabberwerx.$("<tr/>").append(jabberwerx.$("<div/>").addClass("xml_element").attr("id", "simple-element-template").append(jabberwerx.$("<span/>").addClass("xml_char").text("<")).append(jabberwerx.$("<span/>").addClass("xml_element_name").attr("id", "element-name")).append(jabberwerx.$("<span/>").addClass("xml_attributes").attr("id", "attributes")).append(jabberwerx.$("<span/>").addClass("xml_char").text("/>"))));
            template.append(jabberwerx.$("<tr/>").append(jabberwerx.$("<span/>").attr("id", "element-template").append(jabberwerx.$("<div/>").addClass("xml_element").attr("id", "element-open").append(jabberwerx.$("<span/>").addClass("xml_char").text("<")).append(jabberwerx.$("<span/>").addClass("xml_element_name").attr("id", "element-name")).append(jabberwerx.$("<span/>").addClass("xml_attributes").attr("id", "attributes")).append(jabberwerx.$("<span/>").addClass("xml_char").text(">")).append(jabberwerx.$("<span/>").addClass("xml_child_container").attr("id", "child-container"))).append(jabberwerx.$("<div/>").addClass("xml_element").attr("id", "element-close").append(jabberwerx.$("<span/>").addClass("xml_char").text("</")).append(jabberwerx.$("<span/>").addClass("xml_element_name").attr("id", "element-name")).append(jabberwerx.$("<span/>").addClass("xml_char").text(">")))));
            this._templates = [];
            this._templates["attribute"] = jabberwerx.$("#attrib-template", template);
            this._templates["simple-element"] = jabberwerx.$("#simple-element-template", template);
            this._templates["element"] = jabberwerx.$("#element-template", template);
            this._mixinLogMethods();
            return consoleView;
        },
        text: function (val) {
            if (val === undefined) {
                return (this.jq && this.jq.find("#console-xml-entry").val()) || "";
            }
            if (this.jq) {
                this.jq.find("#console-xml-entry").val(val);
            }
            return this;
        },
        _handleKeyPress: function (evt) {
            if (evt.keyCode == 13) {
                var tstr = jabberwerx.$.trim(this.text());
                if (tstr == "") {
                    return false;
                }
                try {
                    var sendxml = jabberwerx.$(jabberwerx.util.unserializeXML("<nswrapper xmlns='jabber:client'>" + tstr + "</nswrapper>"));
                    sendxml = jabberwerx.$(sendxml.children()[0]).clone()[0];
                    if ((sendxml.nodeName != "iq") && (sendxml.nodeName != "message") && (sendxml.nodeName != "presence")) {
                        this._addConsoleMessage(jabberwerx._("Attempted to send an invalid XMPP stanza (must be iq, message or presence), make sure the entered value is a valid XMPP stanza and try again."), "jwa_log");
                        return false;
                    }
                    try {
                        sendxml = new jabberwerx.Stanza(sendxml);
                        this._client.sendStanza(sendxml);
                        this.text("");
                    } catch (ex) {
                        this._addConsoleMessage(jabberwerx._("An unhandled error occurred attempting to send the stanza: {0}.", ex.message), "jwa_log");
                    }
                } catch (ex) {
                    this._addConsoleMessage(jabberwerx._("Attempted to send invalid XML, make sure the entered value is valid XML and try again."), "jwa_log");
                }
                return false;
            }
            return true;
        },
        _streamOpenedHandler: function (evt) {
            this._addConsoleMessage(jabberwerx._("[Console] Stream opened with {0} {1}", this._client.connectedServer.jid.toString(), jabberwerx.util.serializeXML(evt.data)), "jwa_log");
        },
        _streamClosedHandler: function (evt) {
            var cmsg = jabberwerx._("[Console] Stream closed") + (evt && evt.data ? jabberwerx._("with error:") + jabberwerx.errorReporter.getMessage(evt.data) + " (" + jabberwerx.util.serializeXML(evt.data) + ')' : ".");
            this._addConsoleMessage(cmsg, "jwa_log");
        },
        _streamReceivedHandler: function (evt) {
            var elements = jabberwerx.$(evt.data);
            for (var i = 0; i < elements.length; ++i) {
                this._addConsoleMessage(elements.get(i), "received_xml");
            }
        },
        _streamSentHandler: function (evt) {
            var elements = jabberwerx.$(evt.data);
            for (var i = 0; i < elements.length; ++i) {
                this._addConsoleMessage(elements.get(i), "sent_xml");
            }
        },
        _mixinLogMethods: function () {
            var that = this;
            jabberwerx.$.each(['log', 'dir', 'warn', 'error', 'info', 'debug'], function (i, e) {
                that[e] = function (a) {
                    if (!jabberwerx.util.isString(a)) {
                        a = jabberwerx._("Unknown log message type ({0}) passed to ConsoleView. {1}, Console view only supports String messages.", (typeof a), e);
                    }
                    that._addConsoleMessage(a, "jwa_log");
                }
            });
            jabberwerx.util.debug.consoleDelegate = this;
        }
    }, 'jabberwerx.ui.ConsoleView');
    jabberwerx.ui.ConsoleView._forceFit = function (ele, dim) {
        if (!ele || !ele.length) {
            return;
        }
        if (dim.width !== undefined) {
            ele.width(dim.width);
            ele.width(ele.width() - Math.max(ele.outerWidth(true) - ele.width(), 0));
        }
        if (dim.height !== undefined) {
            ele.height(dim.height);
            ele.height(ele.height() - Math.max(ele.outerHeight(true) - ele.height(), 0));
        }
    }
})(jabberwerx);
;
(function (jabberwerx) {
    jabberwerx.ui.TabbedView = jabberwerx.ui.JWView.extend({
        init: function () {
            this._super();
            this._tabList = [];
            this.applyEvent("tabActivated");
            this.applyEvent("tabDeactivated");
        },
        destroy: function () {
            jabberwerx.$.each(this._tabList.concat(), function () {
                this.remove();
            });
            this._super();
        },
        addTab: function (id, content) {
            var tab = this.getTab(id);
            if (tab) {
                throw new jabberwerx.ui.TabbedView.TabAlreadyExistsError("tab for " + id + " already exists");
            }
            tab = new jabberwerx.ui.TabbedView.Tab(this, content, id);
            this._tabList[id] = tab;
            this._tabList.push(tab);
            if (this.jq) {
                var tc = this.jq.find(".tabcontent");
                tab._wrapper.render().appendTo(tc).hide();
                var tl = this.jq.find(".tablist");
                tab.render().appendTo(tl);
                if (this._tabList.length == 1) {
                    tab.activate();
                }
            }
            return tab;
        },
        removeTab: function (id) {
            var tab = this.getTab(id);
            if (tab) {
                tab.remove();
                return true;
            }
            return false;
        },
        _removeFromTabList: function (tab) {
            var pos = jabberwerx.$.inArray(tab, this._tabList);
            this._tabList.splice(pos, 1);
            delete this._tabList[tab.id];
        },
        getTab: function (id) {
            if (!(id && typeof (id) == "string")) {
                throw new TypeError("id is not valid");
            }
            return this._tabList[id];
        },
        getActiveTab: function () {
            if (!this.jq) {
                return null;
            }
            var activeDOM = this.jq.find(".tablist .tab.active").get(0);
            return (activeDOM && activeDOM.jw_view) || null;
        },
        getTabCount: function () {
            return this._tabList.length;
        },
        getAllTabs: function () {
            return this._tabList.concat();
        },
        tabListSize: function (size) {
            if (size === undefined) {
                return this._tabListSize;
            } else if (!(typeof (size) == "number" && size > 0)) {
                throw new jabberwerx.ui.TabbedView.tabListSizeInvalidError();
            }
            this._tabListSize = size;
            this.width(this.width());
            return this;
        },
        width: function (w, noupdate) {
            var result = this._super(w, true);
            if (w !== undefined && this.jq) {
                var w = this.width() - 30;
                var tl = this.jq.find(".tablist");
                var tc = this.jq.find(".tabcontent");
                var tabListSize = this.tabListSize();

                tl.width(tabListSize);
                var delta = (tc.outerWidth() - tc.width()) - 2;
                w = w - tabListSize - delta
                tc.width(w);
                if (this.getActiveTab()) {
                    this.getActiveTab().update();
                }
                if (!noupdate) {
                    this.update();
                }
            }
            return result;
        },
        height: function (h, noupdate) {
            var result = this._super(h, true);
            if (h !== undefined && this.jq) {
                var h = this.height();
                var tl = this.jq.find(".tablist");
                var delta = tl.outerHeight() - tl.height();
                tl.height(h - delta);
                var tc = this.jq.find(".tabcontent");
                delta = tc.outerHeight() - tc.height();
                tc.height(h - delta);
                if (this.getActiveTab()) {
                    this.getActiveTab().update();
                }
                if (!noupdate) {
                    this.update();
                }
            }
            return result;
        },
        _calculateContentHeight: function () {
            if (this.jq) {
                var container = this.jq.find(".tabcontent");
                var size = container.height();
                return size;
            }
            return 0;
        },
        _calculateContentWidth: function () {
            if (this.jq) {
                var container = this.jq.find(".tabcontent");
                var size = container.width();
                return size;
            }
            return 0;
        },
        update: function () {
            if (!this._super()) {
                return false;
            }
            var tc = this.jq.find(".tabcontent");
            var tl = this.jq.find(".tablist");
            jabberwerx.$.each(this._tabList, function () {
                if (!this.jq) {
                    this._wrapper.render().appendTo(tc).hide();
                    this.render().appendTo(tl);
                }
            });
            if (!this.getActiveTab() && this._tabList.length) {
                this._tabList[0].activate();
            }
            return true;
        },
        createDOM: function (doc) {
            var builder = jabberwerx.$("<div/>", doc).addClass("jabberwerx tabpane");

            var tablist = jabberwerx.$("<div/>").appendTo(builder).addClass("tablist").addClass("col-md-3");
            var content = jabberwerx.$("<div/>").appendTo(builder).addClass("tabcontent").addClass("col-md-9");

            return builder.get(0);
        },
        restoreDOM: function (doc) {
            var res = jabberwerx.$(this.createDOM(doc));
            var tc = res.find(".tabcontent");
            var tl = res.find(".tablist");
            jabberwerx.$.each(this._tabList, function () {
                this._wrapper.render().appendTo(tc).hide();
                this.render().appendTo(tl);
            });
            return res.get(0);
        },
        show: function () {
            this._super();
            var t = this.getActiveTab();
            if (t) {
                t.show();
                t._wrapper.show();
                t.update();
            }
        },
        _tabListSize: 150
    }, "jabberwerx.ui.TabbedView");
    jabberwerx.ui.TabbedView.TabAlreadyExistsError = jabberwerx.util.Error.extend("the identified tab already exists");
    jabberwerx.ui.TabbedView.tabListSizeInvalidError = jabberwerx.util.Error.extend("the tabListSize is invalid");
    jabberwerx.ui.TabbedView.ContentWrapper = jabberwerx.ui.JWView.extend({
        init: function (tabview, content, id) {
            this._super();
            this.tabview = tabview;
            this.content = content;
            this.id = id;
        },
        destroy: function () {
            this.content.destroy();
            this.content = null;
            this._super();
        },
        isActive: function () {
            return Boolean(this.jq && this.jq.hasClass("active"));
        },
        _activate: function () {
            if (this.jq && !this.isActive()) {
                this.jq.addClass("active");
                this.show();
                this.content.event("viewActivated").trigger({
                    "type": "focus"
                });
            }
        },
        _deactivate: function () {
            if (this.jq && this.isActive()) {
                this.jq.removeClass("active");
                this.hide();
                this.content.event("viewDeactivated").trigger({
                    "type": "blur"
                });
            }
        },
        dimensions: function (dim) {
            return this.content.dimensions(dim);
        },
        height: function (h, noupdate) {
            return this.content.height(h, noupdate);
        },
        width: function (w, noupdate) {
            return this.content.width(w, noupdate);
        },
        show: function () {
            this._super();
            this.content.show();
            this.update();
            return this;
        },
        hide: function () {
            this.content.hide();
            return this._super();
        },
        update: function () {
            if (!this._super()) {
                return false;
            }
            this.dimensions({
                height: this.tabview._calculateContentHeight(),
                width: this.tabview._calculateContentWidth()
            });
            return true;
        },
        destroyDOM: function () {
            this.content && this.content.remove();
            this._super();
        },
        createDOM: function (doc) {
            var builder = jabberwerx.$("<div/>", doc).addClass("tabdata").attr("id", "jabberwerx_tabdata_" + this.id);
            this.content.render().appendTo(builder);
            return builder.get(0);
        },
        restoreDOM: function (doc) {
            var res = jabberwerx.$(this.createDOM(doc));
            if (this._persistedIsActive) {
                res.addClass("active");
                this.content.jq.addClass("active");
                this._persistedIsActive = null;
            }
            return res.get(0);
        },
        willBeSerialized: function () {
            if (this.isActive()) {
                this._persistedIsActive = true;
            }
            return this._super();
        }
    }, "jabberwerx.ui.TabbedView.ContentWrapper");
    jabberwerx.ui.TabbedView.Tab = jabberwerx.ui.JWView.extend({
        init: function (tabview, content, id) {
            this._super();
            if (!(id && typeof (id) == "string")) {
                throw new TypeError("id must be a non-empty string");
            }
            if (content instanceof jabberwerx.ui.TabbedView.ContentWrapper) { } else if (content instanceof jabberwerx.ui.JWView) {
                content = new jabberwerx.ui.TabbedView.ContentWrapper(tabview, content, id);
            } else {
                throw new TypeError("content is not an instance of jabberwerx.ui.JWView");
            }
            this.tabview = tabview;
            this._wrapper = content;
            this.content = content.content;
            this.id = id;
            if (jabberwerx.$.isFunction(this.content.setTabControl)) {
                this.content.setTabControl(this);
            }
            this.persistOptions(jabberwerx.ui.JWView.persist_html);
        },
        destroy: function () {
            this._wrapper.destroy();
            this._super();
        },
        label: function (val) {
            if (val === undefined) {
                // Establecer nombre de los tabs eliminando identificadores numéricos de ChatRooms
                var regex = /[0-9]{3,50}$/i;
                return this._labelTxt.replace(regex, "");
            }
            if (this._labelTxt != val) {
                this._labelTxt = val;
                this.update();
            }
            return this;
        },
        hide: function () {
            this._activateAdjacentTab();
            this._wrapper.hide();
            this._super();
            return this
        },
        isActive: function () {
            return Boolean(this.jq && this.jq.hasClass("active"));
        },
        activate: function () {
            var retval = this.jq && !this.isActive();
            if (retval) {
                var prev = this.tabview.getActiveTab();
                prev && prev._deactivate();
                this.jq.addClass("active");
                this._wrapper._activate();
                $('.muc_btn_show_users').trigger('click');
                this.tabview.event("tabActivated").trigger(this);
            }
            this.cancelAttention();
            return retval;
        },
        _deactivate: function () {
            if (this.isActive()) {
                this.jq.removeClass("active");
                this._wrapper._deactivate();
                this.tabview.event("tabDeactivated").trigger(this);
                return true;
            }
            return false;
        },
        requestAttention: function (data) {
            if (!this.isActive() && this.jq && !this._attentionInfo) {
                if (data) {
                    if (data instanceof jabberwerx.$) { } else if (jabberwerx.isElement(data)) {
                        data = jabberwerx.$(data);
                    } else {
                        data = jabberwerx.$("<div/>").append(data).contents();
                    }
                }
                var notify = {
                    id: "",
                    data: data
                };
                this._attentionInfo = notify;
                this._flashAttention(false);
                return true;
            }
            return false;
        },
        cancelAttention: function () {
            if (this._attentionInfo) {
                jabberwerx.system.clearTimeout(this._attentionInfo.id);
                this._flashAttention(true);
                delete this._attentionInfo;
            }
        },
        _flashAttention: function (cancel) {
            var notify = this._attentionInfo;
            if (!notify) {
                return;
            }
            cancel = Boolean(cancel || this.jq.hasClass("attn"));
            if (cancel) {
                this.jq.removeClass("attn");
                if (notify.data) {
                    notify.data.remove();
                }
            } else {
                this.jq.addClass("attn");
                if (notify.data) {
                    this.jq.find(".notification").append(notify.data);
                }
            }
            notify.id = jabberwerx.system.setTimeout(this.invocation("_flashAttention"), 1000);
        },
        update: function () {
            if (!this._super()) {
                return false;
            }
            var label = this.label() || this.id;
            this.jq.attr("title", label);
            this.jq.find(".tab_label").text(label);
            this._wrapper.update();
            return true;
        },
        _handleTabClick: function (evt) {
            this.activate();
            return false;
        },
        _handleClose: function (evt) {
            //Deletes opened chat from session chats in database
            var username = jabberwerx.systemUsername;
            var chat = (this.id).replace("chat:", "");
            var action = "delete";
            var xhr = new XMLHttpRequest();
            var url = jabberwerx.ipServices + "/JabberFileManager/GetSessionChatsServlet?username=" + username + "&chat=" + chat + "&action=" + action;
            xhr.open("POST", url, true);
            xhr.send(new FormData());
            xhr.onload = function (e) {
                if (this.status == 200) {
                    console.log("chat deleted: " + this.responseText);
                }
            };

            this.destroy();
            return false;
        },
        createDOM: function (doc) {
            var tabId = "jabberwerx_tabctrl_" + jabberwerx.util.slugify(this.id);
            var builder = jabberwerx.$("<div/>", doc).addClass("tab").bind("click", this.invocation("_handleTabClick")).attr("id", tabId);
            if (!jabberwerx.util.slugify(this.id).includes("room")) {
                jabberwerx.$("<img/>").appendTo(builder).attr("src", jabberwerx.ui.getThemeImageURL("icon-close2.gif")).attr("alt", "Close").attr("title", "Close").bind("click", this.invocation("_handleClose")).addClass("closer");
            }
            var link = jabberwerx.$("<a href='#'/>").appendTo(builder).bind("click", this.invocation("_handleTabClick")).text(this.label() || this.id).addClass("tab_link tab_label");
            return builder.get(0);
        },
        restoreDOM: function (doc) {
            var res = jabberwerx.$(this._super(doc));
            res.find(".tab").bind("click", this.invocation("_handleTabClick"));
            res.find("a").bind("click", this.invocation("_handleTabClick"));
            res.find("img").bind("click", this.invocation("_handleClose"));
            if (this._wrapper && this._wrapper._isActive) {
                res.addClass("active");
            }
            return res;
        },
        destroyDOM: function () {
            this.cancelAttention();
            this._activateAdjacentTab();
            if (this.content.parent() === this._wrapper) {
                if (jabberwerx.$.isFunction(this.content.setTabControl)) {
                    this.content.setTabControl(null);
                }
                this._wrapper.remove();
                this.content = null;
            }
            this.tabview._removeFromTabList(this);
            this._super();
        },
        _activateAdjacentTab: function () {
            if (this.isActive()) {
                var tab = this.jq.next(".tab:not(:hidden)");
                if (!tab.length) {
                    tab = this.jq.prev(".tab:not(:hidden)");
                }
                if (tab.length) {
                    tab.get(0).jw_view.activate();
                } else {
                    this._deactivate();
                }
            }
        },
        _wrapper: null,
        content: null,
        id: null,
        tabview: null
    }, "jabberwerx.ui.TabbedView.Tab");
    jabberwerx.ui.Tabbable = {
        getTabControl: function () {
            return this._tabCtrl || null;
        },
        setTabControl: function (tab) {
            if (tab && !(tab instanceof jabberwerx.ui.TabbedView.Tab)) {
                throw new TypeError("tab is not a TabbedView.Tab");
            }
            this._tabCtrl = tab;
        }
    };
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/views/SelfPresenceView.js*/
;
(function (jabberwerx) {
    jabberwerx.ui.SelfPresenceView = jabberwerx.ui.JWView.extend({
        init: function (client, primaryPresence) {
            this._super();
            if (!(client && client instanceof jabberwerx.Client)) {
                throw new TypeError("client must be a jabberwerx.Client");
            }
            this.applyEvent("presenceSelected");
            var choices = jabberwerx.$.extend({}, jabberwerx.ui.SelfPresenceView.default_status_choices);
            jabberwerx.$.each(choices, function (n, v) {
                choices[n] = jabberwerx.$.map(v, function (v) {
                    return jabberwerx._(v);
                });
                return true;
            });
            this._choices = choices;
            this.client = client;
            this.client.event("clientStatusChanged").bind(this.invocation("_handleClientStatusChange"));
            if (this.client.isConnected()) {
                if (primaryPresence) {
                    this.client.connectedUser.event("primaryPresenceChanged").bind(this.invocation("_handlePresenceChange"));
                } else {
                    this.client.connectedUser.event("resourcePresenceChanged").bind(this.invocation("_handlePresenceChange"));
                }
            }
            this.persistOptions(jabberwerx.ui.JWView.persist_html);
            this._primaryPresence = (primaryPresence ? true : false);
        },
        destroy: function () {
            var evt = this._primaryPresence ? "primaryPresenceChanged" : "resourcePresenceChanged";
            this.client.connectedUser.event(evt).unbind(this.invocation("_handlePresenceChange"));
            this.client.event("clientStatusChanged").unbind(this.invocation("_handleClientStatusChange"));
            this._super();
        },
        getStatusChoices: function (show) {
            show = this._validateShow(show);
            return [].concat(this._choices[show] || undefined);
        },
        setStatusChoices: function (show, choices) {
            show = this._validateShow(show);
            if (choices) {
                choices = jabberwerx.$.makeArray(choices);
            }
            if (!choices || !choices.length) {
                delete this._choices[show];
            } else {
                this._choices[show] = choices.concat();
            }
            this.update();
        },
        _validateShow: function (show) {
            if (!show) {
                show = "available";
            }
            show = String(show).toLowerCase();
            if (show != "available" && show != "chat" && show != "away" && show != "xa" && show != "dnd" && show != "unavailable") {
                throw new TypeError("show value not correct");
            }
            return show;
        },
        createDOM: function (doc) {
            var data = jabberwerx.$("<div/>").addClass("jabberwerx self presence show").text(" ");
            jabberwerx.$("<select/>").bind("change", this.invocation("_handleSelectChange")).appendTo(data);
            return data.get(0);
        },
        restoreDOM: function (doc) {
            var res = jabberwerx.$(this._super(doc));
            res.find("select").bind("change", this.invocation("_handleSelectChange"));
            return res.get(0);
        },
        update: function () {
            if (!this._super()) {
                return false;
            }
            var show, status;
            var prs = this.client.getCurrentPresence(this._primaryPresence);
            if (prs) {
                show = prs.getShow() || prs.getType() || "available";
                status = prs.getStatus() || "";
            } else {
                show = "unavailable";
                status = "";
            }
            var selector = this.jq.find("select");
            selector.empty();
            var groupings = {};
            for (var idx in jabberwerx.ui.SelfPresenceView.sortedShows) {
                if (this._choices[jabberwerx.ui.SelfPresenceView.sortedShows[idx]]) {
                    var optgroup = this._createStatusGroup(jabberwerx.ui.SelfPresenceView.sortedShows[idx], this._choices[jabberwerx.ui.SelfPresenceView.sortedShows[idx]]);
                    if (optgroup.length) {
                        groupings[jabberwerx.ui.SelfPresenceView.sortedShows[idx]] = optgroup;
                        optgroup.appendTo(selector);
                    }
                }
            }
            this._displayCurrentStatus(selector, groupings, show, status);
            this.event("viewRendered").trigger(this.jq);
            return true;
        },
        _createStatusGroup: function (show, choices) {
            var optgroup = jabberwerx.$("<optgroup/>").attr("label", (choices && choices[0]) || jabberwerx._(show)).addClass("presence show").addClass(show);
            if (!choices) {
                choices = [];
            }
            for (var idx = 0; idx < choices.length; idx++) {
                var status = choices[idx];
                if (!status) {
                    continue;
                }
                this._createStatusOption(show, status).appendTo(optgroup);
            }
            return optgroup;
        },
        _createStatusOption: function (show, status) {
            return jabberwerx.$("<option/>").text(status).val(show + ":" + status);
        },
        _displayCurrentStatus: function (selector, groupings, show, status) {
            var choices = this.getStatusChoices(show);
            var optgroup = groupings[show];
            if (!optgroup) {
                optgroup = this._createStatusGroup(show).appendTo(selector);
            }
            if (jabberwerx.$.trim(status || "") == "") {
                status = choices[0] || jabberwerx._(show);
            }
            var opts = optgroup.find("option[value^='" + show + ":']");
            if (opts.length) {
                opts = jabberwerx.$.map(opts, function (element, index) {
                    var opt = jabberwerx.$(element).val();
                    if (opt == (show + ":" + status)) {
                        return element;
                    }
                    return null;
                });
            }
            if (!opts.length) {
                opts = this._createStatusOption(show, status).prependTo(optgroup);
            }
            selector.val(show + ":" + status);
            selector.width(this.jq.width() - Math.abs(selector.outerWidth(true) - selector.outerWidth(false)) - 200);
            if (show == "unavailable" && !this.allowUnavailable) {
                selector.attr("disabled", true);
            } else {
                selector.removeAttr("disabled");
                if (!this.allowUnavailable && groupings["unavailable"]) {
                    groupings["unavailable"].remove();
                }
            }
            var title = choices[0] || jabberwerx._(show);
            if (status) {
                title = title + " :: " + status;
            }
            this.jq.attr("title", title).removeClass("chat available away xa dnd unavailable").addClass(show);
        },
        _getPresenceImage: function (show) {
            var url = "icon-presence-" + (show || "unavailable") + ".png";
            return jabberwerx.ui.getThemeImageURL(url);
        },
        _handleSelectChange: function (evt) {
            var selector = jabberwerx.$(evt.target);
            var opt = selector.find("option:selected");
            var optgroup = opt.parent();
            var show, status = selector.val();
            try {
                var pos = status.indexOf(":");
                if (pos != -1) {
                    show = this._validateShow(status.substring(0, pos));
                    status = status.substring(pos + 1);
                } else {
                    show = undefined;
                }
                var data = {
                    show: show,
                    status: status,
                    priority: null
                };
                var result;
                result = this.event("presenceSelected").trigger(data) || [];
                result = jabberwerx.reduce(result, function (item, value) {
                    return Boolean(item) || value;
                }, false);
                if (!result) {
                    this._sendPresence(data.show, data.status, data.priority);
                }
            } catch (ex) {
                jabberwerx.util.debug.log("could not handle selection change: " + ex);
            }
            this.update();
            return false;
        },
        _sendPresence: function (show, status, priority) {
            var presence = new jabberwerx.Presence();
            var logoff = false;
            show = this._validateShow(show);
            switch (show || "available") {
                case "unavailable":
                    logoff = true;
                    presence.setType("unavailable");
                    break;
                case "available":
                    break;
                default:
                    presence.setShow(show);
            }
            if (status) {
                presence.setStatus(status);
            }
            priority = parseInt(priority);
            if (!isNaN(priority) && !logoff) {
                presence.setPriority(priority);
            }
            this.client.sendStanza(presence);
            if (logoff) {
                this.client.disconnect();
            }
        },
        _handleClientStatusChange: function (evt) {
            switch (evt.data.next) {
                case jabberwerx.Client.status_connected:
                    if (this._primaryPresence) {
                        this.client.connectedUser.event("primaryPresenceChanged").bind(this.invocation("_handlePresenceChange"));
                    } else {
                        this.client.connectedUser.event("resourcePresenceChanged").bind(this.invocation("_handlePresenceChange"));
                    }
                case jabberwerx.Client.status_disconnected:
                    this.update();
                    break;
            }
        },
        _handlePresenceChange: function (evt) {
            if (evt.source !== this.client.connectedUser) {
                evt.notifier.unbind(this.invocation("_handlePresenceChange"));
            } else if (this._primaryPresence || evt.data.fullJid.getResource() == this.client.resourceName) {
                this.update();
            }
        },
        client: null,
        allowUnavailable: false
    }, "jabberwerx.ui.SelfPresenceView");
    jabberwerx.ui.SelfPresenceView.default_status_choices = {
        "available": ["Disponible"],
        "away": ["Ausente"],
        "dnd": ["No molestar"]
    };
    jabberwerx.ui.SelfPresenceView.sortedShows = ["chat", "available", "away", "xa", "dnd"];
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/views/ContactPresenceView.js*/
;
(function (jabberwerx) {
    jabberwerx.ui.ContactPresenceView = jabberwerx.ui.JWView.extend({
        init: function (entity, delegate) {
            this._super();
            if (!(entity && entity instanceof jabberwerx.Entity)) {
                throw new TypeError("entity must be a jabberwerx.Entity");
            }
            this.entity = entity;
            this.applyEvent("viewActivated");
            this.applyEvent("contactDeleted");

            if (delegate) {
                this.delegate = delegate;
            } else {
                entity.event("primaryPresenceChanged").bind(this.invocation("_onPrimaryPresenceChanged"));
                entity.cache.event("entityUpdated").bind(this.invocation("_onEntityUpdated"));
                entity.cache.event("entityRenamed").bind(this.invocation("_onEntityUpdated"));
                entity.cache.event("entityDestroyed").bind(this.invocation("_onEntityDestroyed"));
                entity.cache.event("entityCreated").bind(this.invocation("_onEntityCreated"));
            }
            this.persistOptions(jabberwerx.ui.JWView.persist_html);
        },
        createDOM: function (doc) {
            var rosterItemIdFull = this.entity.jid._full;
            if (rosterItemIdFull.indexOf('@') != -1) {
                var rosterItemUserName = rosterItemIdFull.split('@')[0];
                this.entity.setDisplayName(jabberwerx.getEntityDisplayName(rosterItemUserName));
            }
            var builder = jabberwerx.$("<div/>", doc).addClass("jabberwerx contact presence show");
            var link = jabberwerx.$("<a/>").appendTo(builder).addClass("contactlink").attr("href", encodeURI("#" + this.entity.jid)).bind("click", this.invocation("_onClick"));
            jabberwerx.$("<span/>").appendTo(link).addClass("displayname").text(this.entity.getDisplayName());
            builder.append(" ");
            jabberwerx.$("<span/>").appendTo(builder).addClass("status").text("\u00a0");
            if (this.delegate) {
                var deleteButton = jabberwerx.$("<button/>").appendTo(builder).addClass("rosterDeleteButton").attr("href", encodeURI("#" + this.entity.jid)).attr("data-toggle", "popover").attr("data-content", "test").html("<i class='fa fa-trash'></i>").bind("click", this.invocation("_onDeleted"));
            }
            return builder.get(0);
        },
        restoreDOM: function (doc) {
            var res = jabberwerx.$(this._super(doc));
            res.find("a.contactlink").bind("click", this.invocation("_onClick"));
            return res;
        },
        update: function () {
            if (!this._super()) {
                return false;
            }
            var presence = this.entity.getPrimaryPresence();
            var presenceType = null;
            var presenceShow = null;
            if (presence) {
                presenceType = presence.getType();
                presenceShow = presence.getShow();
            }
            var show = (presence && (presence.getType() || presence.getShow() || "available")) || "unknown";
            var status = (presence && presence.getStatus()) || "";
            var title = jabberwerx._(jabberwerx.ui.ContactPresenceView.show_status[show]) + (status ? " :: " + status : "");
            var nombreSesion = document.getElementById("username").value;
            //Nota: se cambia por innerHTML por que en la version 42 de firefox no existe innerText
            if (this.jq.context.innerHTML.indexOf(nombreSesion) != -1) {
                //si es el usuario oculto la clase css
                this.jq.removeClass("available").addClass(show).attr("title", title);
            } else {
                //sino entonces muestro todo
                show = show == 'unknown' ? 'unavailable' : show;
                this.jq.removeClass("chat available away xa dnd unavailable unknown").addClass(show).attr("title", title);
            }

            //this.jq.removeClass("chat available away xa dnd unavailable unknown").addClass(show).attr("title", title);
            
            //Establece el link de contacto del chatview y elimina el código generado de jabber.
            this.jq.find("a").attr("title", title);
            this.jq.find("span.status").text(status || title);
            this.jq.find("span.displayname").text(this.entity.getDisplayName());
            // Actualizar displayname de los contactos 
            var rosterItemIdFull = this.entity.jid._full;
                var rosterItemUserName = rosterItemIdFull.split('@')[0];
                this.entity.setDisplayName(jabberwerx.getEntityDisplayName(rosterItemUserName));
            return true;
        },
        _onPrimaryPresenceChanged: function (event) {
            this.update();
        },
        _onEntityUpdated: function (event) {
            this.update();
        },
        _onEntityDestroyed: function (event) {
            var newEntity = event.data;
            if (this.entity.jid.equals(newEntity.jid)) {
                this.entity = this.entity.cache.entity(this.entity.jid) || new jabberwerx.TemporaryEntity(this.entity.jid, this.entity.cache);
                this.update();
            }
        },
        _onEntityCreated: function (event) {
            var newEntity = event.data;
            if (this.entity.jid.equals(newEntity.jid)) {
                this.entity = newEntity;
                if (!this.delegate) {
                    this.entity.event("primaryPresenceChanged").bind(this.invocation("_onPrimaryPresenceChanged"));
                }
                this.update();
            }
        },
        _onClick: function (evt) {
            this.event("viewActivated").trigger({
                type: "click"
            });
            return false;
        },
        _onDeleted: function (evt) {
            this.event("contactDeleted").trigger({
                type: "click"
            });
            return false;
        },
        entity: null
    }, 'jabberwerx.ui.ContactPresenceView');
    jabberwerx.ui.ContactPresenceView.show_status = {
        "chat": "Ready to Chat!",
        "available": "(Disponible)",
        "away": "(Ausente)",
        "xa": "Extended Away",
        "dnd": "(No molestar)",
        "unavailable": "(Desconectado)",
        "unknown": "(Desconocido)"
    };
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/views/RosterView.js*/
;
(function (jabberwerx) {
    jabberwerx.ui.RosterView = jabberwerx.ui.JWView.extend({
        init: function (cache, mode) {
            this._super();
            if (!(cache && cache instanceof jabberwerx.EntitySet)) {
                throw new TypeError("cache must be a jabberwerx.EntitySet");
            }
            this.cache = cache;
            this._filteringCB = [];
            this._sortingCB = this.invocation("sortEntityByDisplayName");
            if (!mode) {
                mode = jabberwerx.ui.RosterView.groupmode_collapsed;
            } else if ((mode != jabberwerx.ui.RosterView.groupmode_collapsed) && (mode != jabberwerx.ui.RosterView.groupmode_expanded) && (mode != jabberwerx.ui.RosterView.groupmode_single)) {
                throw new TypeError("mode is not a valid value");
            }
            this._default_state = mode;
            this._groupingCB = this.invocation("groupByGroups");
            this.applyEvent("rosterItemSelected");
            this.applyEvent("rosterItemDeleted");
            this.applyEvent("rosterGroupingRendered");
            this.applyEvent("rosterItemRendered");
            this._enableEntityEvents(true);
            var invoker = this.invocation("_handleBatchEntityEvents");
            this.cache.event("batchUpdateStarted").bind(invoker);
            this.cache.event("batchupdateEnded").bind(invoker);
            this._groupings = [];
            this._rebuildGroupings(true);
        },
        destroy: function () {
            this._enableEntityEvents(false);
            var invoker = this.invocation("_handleBatchEntityEvents");
            this.cache.event("batchUpdateStarted").unbind(invoker);
            this.cache.event("batchupdateEnded").unbind(invoker);
            jabberwerx.globalEvents.unbind("primaryPresenceChanged", this.invocation("_handlePrimaryPresence"));
            this._super();
        },
        _enableEntityEvents: function (enable) {
            var invoker = this.invocation("_handleEntityEvent");
            var that = this;
            jabberwerx.$.each(["entityAdded", "entityRemoved", "entityUpdated", "entityRenamed"], function () {
                var evt = that.cache.event(this);
                if (enable) {
                    evt.bind(invoker);
                } else {
                    evt.unbind(invoker);
                }
            });
        },
        filterByActive: function (entity) {
            return entity.isActive();
        },
        filterByContacts: function (entity) {
            return entity instanceof jabberwerx.Contact;
        },
        groupByGroups: function (entity) {
            return (entity && entity.getGroups()) || [];
        },
        sortByDisplayName: function (a, b) {
            var displayA = a.getDisplayName().toLowerCase();
            var displayB = b.getDisplayName().toLowerCase();
            if (a < b) {
                return -1;
            } else if (a > b) {
                return 1;
            }
            return 0;
        },
        sortEntityByDisplayName: function (a, b) {
            var displayA = a.entity.getDisplayName().toLowerCase();
            var displayB = b.entity.getDisplayName().toLowerCase();
            if (displayA < displayB) {
                return -1;
            } else if (displayA > displayB) {
                return 1;
            }
            return 0;
        },
        createDOM: function (doc) {
            var data = jabberwerx.$("<div></div>", doc).addClass("jabberwerx roster");
            jabberwerx.$.each(this._groupings, function (idx) {
                this.render().appendTo(data);
            });
            return data.get(0);
        },
        destroyDOM: function (doc) {
            jabberwerx.$.each(this._groupings, function () {
                this.destroy();
            });
            this._groupings = [];
        },
        getDefaultGroupingName: function () {
            return this._DefaultGroupingName;
        },
        setDefaultGroupingName: function (name) {
            if (!name) {
                throw new TypeError("name cannot be empty");
            }
            name = String(name);
            if (name != this._DefaultGroupingName) {
                this._DefaultGroupingName = name;
                if (this._groupings[""]) {
                    this._groupings[""].update();
                }
            }
        },
        grouping: function (name) {
            return this._groupings[name || ""] || null;
        },
        update: function () {
            if (!this._super()) {
                return false;
            }
            this._renderGroupings(this._groupings);
            return true;
        },
        _rebuildGroupings: function (initial) {
            var that = this;
            jabberwerx.$.each(this.cache.toArray(), function () {
                if (initial) {
                    this.event("primaryPresenceChanged").bind(that.invocation("_handlePrimaryPresence"));
                }
                that._updateEntity(this);
            });
        },
        _updateEntity: function (entity, noUpdate) {
            var groupings = [];
            var combineFilter = function (filter, value) {
                return filter(entity) && value;
            };
            var showEntity = jabberwerx.reduce(this._filteringCB, combineFilter, true);
            var that = this;
            var grpWalk = function (grpName) {
                if (grpName != '') {
                    var grpView = groupings[grpName];
                    if (!grpView) {
                        grpView = that._groupings[grpName];
                    }
                    if (!grpView) {
                        grpView = new jabberwerx.ui.RosterView.Grouping(that, grpName, that._default_state);
                        that._groupings[grpName] = grpView;
                        var idx = that._sortGrouping(that._groupings, grpView);
                        that._groupings.splice(idx, 0, grpView);
                    }
                    if (!groupings[grpName]) {
                        groupings[grpName] = grpView;
                        groupings.push(grpView);
                    }
                    grpView._updateEntity(entity, showEntity, noUpdate);
                }
            };
            if (this._default_state != jabberwerx.ui.RosterView.groupmode_single) {
                var grpList = this._groupingCB(entity) || [];
                jabberwerx.$.each(grpList, function () {
                    grpWalk(String(this));
                    return true;
                });
            }
            if (!groupings.length) {
                grpWalk("");
            }
            jabberwerx.$.each(this._groupings.concat(), function () {
                if (this.name in groupings) {
                    return;
                }
                if (!this._removeEntity(entity)) {
                    var idx;
                    idx = jabberwerx.$.inArray(this, that._groupings);
                    that._groupings.splice(idx, 1);
                    delete that._groupings[this.name];
                    this.destroy();
                }
            });
            if (!noUpdate) {
                this._renderGroupings(this._groupings);
            }
        },
        _removeEntity: function (entity, noUpdate) {
            var that = this;
            jabberwerx.$.each(this._groupings.concat(), function () {
                if (!this._removeEntity(entity)) {
                    var idx = jabberwerx.$.inArray(this, that._groupings);
                    that._groupings.splice(idx, 1);
                    delete that._groupings[this.name];
                    this.destroy();
                }
            });
            if (!noUpdate) {
                this.update();
            }
        },
        _handleBatchEntityEvents: function (evt) {
            if (evt.name == "batchupdatestarted") {
                this._enableEntityEvents(false);
            } else if (evt.name == "batchupdateended") {
                for (var idx = 0; idx < evt.data.length; ++idx) {
                    this._doEntityEvent(evt.data[idx].name, evt.data[idx].data, true);
                }
                this._renderGroupings(this._groupings);
                this._enableEntityEvents(true);
            }
        },
        _renderGroupings: function (groupings) {
            var that = this;
            var _renderGrouping = function (index, view) {
                if (index == 0) {
                    view.render().prependTo(that.jq);
                } else {
                    that._groupings[index - 1].jq.after(view.render());
                }
                view.update();
            }
            jabberwerx.$.each(groupings, _renderGrouping);
        },
        _handleEntityEvent: function (evt) {
            this._doEntityEvent(evt.name, evt.data, false);
        },
        _doEntityEvent: function (event, entity, noUpdate) {
            switch (event) {
                case "entityrenamed":
                    entity = entity.entity;
                case "entityadded":
                    entity.event("primaryPresenceChanged").bind(this.invocation("_handlePrimaryPresence"));
                case "entityupdated":
                    this._updateEntity(entity, noUpdate);
                    break;
                case "entityremoved":
                    entity.event("primaryPresenceChanged").unbind(this.invocation("_handlePrimaryPresence"));
                    this._removeEntity(entity, noUpdate);
                    break;
            }
        },
        _handlePrimaryPresence: function (evt) {
            var entity = evt.source;
            if (this.cache.entity(entity.jid)) {
                this._updateEntity(entity);
            }
        },
        _sortEntity: function (arr, val) {
            var high, low, idx;
            high = arr.length;
            low = -1;
            idx = 0;
            var compare = 0;
            while ((high - low) > 1) {
                idx = (high + low) >> 1;
                compare = this._sortingCB(arr[idx], val);
                if (compare < 0) {
                    low = idx;
                } else if (compare > 0) {
                    high = idx;
                } else {
                    while ((idx > 0) && (this._sortingCB(arr[idx], arr[idx - 1]) == 0)) {
                        idx = idx - 1;
                    }
                    break;
                }
            }
            if (idx < 0) {
                idx = 0;
            } else if (idx > arr.length) {
                idx = arr.length;
            } else {
                idx = (compare < 0) ? idx + 1 : idx;
            }
            return idx;
        },
        _sortGrouping: function (arr, val) {
            var high, low, idx;
            high = arr.length;
            low = -1;
            idx = 0;
            var compare = 0;
            while ((high - low) > 1) {
                idx = (high + low) >> 1;
                var nameA = arr[idx].name.toLowerCase();
                var nameB = val.name.toLowerCase();
                compare = (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
                if (compare < 0) {
                    low = idx;
                } else if (compare > 0) {
                    high = idx;
                } else {
                    break;
                }
            }
            if (idx < 0) {
                idx = 0;
            } else if (idx > arr.length) {
                idx = arr.length;
            } else {
                idx = (compare < 0) ? idx + 1 : idx;
            }
            return idx;
        },
        addFilter: function (filter) {
            if (jabberwerx.$.isFunction(filter)) {
                var idx = jabberwerx.$.inArray(filter, this._filteringCB);
                if (idx == -1) {
                    this._filteringCB.push(filter);
                    this._rebuildGroupings();
                }
            } else {
                throw new TypeError("filter must be a function");
            }
        },
        removeFilter: function (filter) {
            var idx = jabberwerx.$.inArray(filter, this._filteringCB);
            if (idx != -1) {
                this._filteringCB.splice(idx, 1);
                this._rebuildGroupings();
            }
        },
        clearFilters: function () {
            this._filteringCB = [];
            this._rebuildGroupings();
        },
        setSort: function (sort) {
            if (jabberwerx.$.isFunction(sort)) {
                this._sortingCB = sort;
                this._rebuildGroupings();
            } else if (sort == null) {
                this._sortingCB = this.invocation("sortEntityByDisplayName");
                this._rebuildGroupings();
            } else {
                throw new TypeError("sort must be a function or null");
            }
        },
        graphUnserialized: function () {
            this._super();
            var idx = 0;
            for (idx = 0; idx < this._groupings.length; idx = idx + 1) {
                var name = this._groupings[idx].name;
                this._groupings[name] = this._groupings[idx];
            }
        },
        _sortingCB: null,
        _filteringCB: null,
        _groupingCB: null,
        _DefaultGroupingName: "Unfiled",
        cache: null
    }, "jabberwerx.ui.RosterView");
    jabberwerx.ui.RosterView.groupmode_collapsed = 1;
    jabberwerx.ui.RosterView.groupmode_expanded = 2;
    jabberwerx.ui.RosterView.groupmode_single = 4;
    jabberwerx.ui.RosterView.Grouping = jabberwerx.ui.JWView.extend({
        init: function (roster, name, mode) {
            this._super();
            this.mode = mode || jabberwerx.ui.RosterView.groupmode_collapsed;
            this._itemsMap = [];
            this.roster = roster;
            this.name = name;
            this._visibleItems = {
                size: 0
            };
            this.event("viewRendered").bind(this.invocation("_handleRendered"));
        },
        expand: function () {
            if (this.mode == jabberwerx.ui.RosterView.groupmode_collapsed) {
                this.mode = jabberwerx.ui.RosterView.groupmode_expanded;
                this.update();
                return true;
            }
            return false;
        },
        collapse: function () {
            if (this.mode == jabberwerx.ui.RosterView.groupmode_expanded) {
                this.mode = jabberwerx.ui.RosterView.groupmode_collapsed;
                this.update();
                return true;
            }
            return false;
        },
        toggle: function () {
            return (this.expand() || this.collapse());
        },
        _updateEntity: function (entity, showEntity, noUpdate) {
            if (this._restoreItemsMap) {
                var idx = 0;
                for (idx = 0; idx < this._itemsMap.length; idx = idx + 1) {
                    var name = this._itemsMap[idx].entity._guid;
                    this._itemsMap[name] = this._itemsMap[idx];
                }
                this._restoreItemsMap = false;
            }
            var sortIndex = 0;
            var view = this._itemsMap[entity._guid];
            var origIdx = -1;
            if (!view) {
                view = new jabberwerx.ui.ContactPresenceView(entity, this.roster);
                view.event("viewActivated").bind(this.invocation("_handleItemActivated"));
                view.event("contactDeleted").bind(this.invocation("_handleContactDeleted"));
                view.event("viewRendered").bind(this.invocation("_handleRendered"));
                this._itemsMap[entity._guid] = view;
            } else {
                origIdx = jabberwerx.$.inArray(view, this._itemsMap);
                this._itemsMap.splice(origIdx, 1);
            }
            sortIndex = this.roster._sortEntity(this._itemsMap, view);
            this._itemsMap.splice(sortIndex, 0, view);
            if (view.jq && (sortIndex == origIdx)) {
                sortIndex = -1;
            }
            if (showEntity && !this._visibleItems[view._guid]) {
                this._visibleItems[view._guid] = view;
                this._visibleItems.size++;
            } else if (!showEntity && this._visibleItems[view._guid]) {
                delete this._visibleItems[view._guid];
                this._visibleItems.size--;
            }
            if (!noUpdate) {
                this._renderEntityView(view, sortIndex, showEntity);
            } else {
                view._needsRender = true;
            }
            return (this._itemsMap.length);
        },
        _renderEntityView: function (view, sortIndex, showEntity) {
            if (this.jq) {
                var mustRender = !view.jq;
                if (sortIndex == 0) {
                    view.render().prependTo(this.jq.children("div.items"));
                } else if (sortIndex != -1) {
                    this._itemsMap[sortIndex - 1].jq.after(view.render());
                }
                if (!mustRender) {
                    view.update();
                }
                delete view._needsRender;
                view.jq.toggle(showEntity);
            }
        },
        _removeEntity: function (entity) {
            var key = entity._guid;
            var view = this._itemsMap[key];
            if (view) {
                var idx = jabberwerx.$.inArray(view, this._itemsMap);
                this._itemsMap.splice(idx, 1);
                delete this._itemsMap[key];
                if (this._visibleItems[view._guid]) {
                    delete this._visibleItems[view._guid];
                    this._visibleItems.size--;
                }
                view.destroy();
            }
            return (this._itemsMap.length);
        },
        createDOM: function (doc) {
            var data = jabberwerx.$("<div/>", doc).addClass("jabberwerx group section");
            if (this.mode == jabberwerx.ui.RosterView.groupmode_single) {
                data.addClass("single");
            }
            var heading, items;
            heading = jabberwerx.$("<div/>").appendTo(data).addClass("group title");
            jabberwerx.$("<span/>").appendTo(heading).addClass("extrainfo");
            heading = jabberwerx.$("<a/>").appendTo(heading).bind("click", this.invocation("_handleExpandCollapse")).attr("href", "#");
            jabberwerx.$("<span/>").appendTo(heading).addClass("displayname").text(this.name || this.roster.getDefaultGroupingName());
            items = jabberwerx.$("<div/>").appendTo(data).addClass("group items").hide();
            var idx = 0;
            for (idx = 0; idx < this._itemsMap.length; ++idx) {
                items.append(this._itemsMap[idx].render());
                delete this._itemsMap[idx]._needsRender;
            }
            return data.get(0);
        },
        graphUnserialized: function () {
            this._super();
            var idx = 0;
            for (idx = 0; idx < this._itemsMap.length; idx = idx + 1) {
                var name = this._itemsMap[idx].entity._guid;
                this._itemsMap[name] = this._itemsMap[idx];
            }
        },
        update: function () {
            if (!this._super()) {
                return false;
            }
            this._updateHeader();
            var that = this;
            jabberwerx.$.each(this._itemsMap, function () {
                if (this._needsRender) {
                    that._updateEntity(this.entity, Boolean(that._visibleItems[this._guid]));
                }
            });
            return true;
        },
        _updateHeader: function () {
            if (!this.jq) {
                return;
            }
            var heading = this.jq.children("div.title");
            var items = this.jq.children("div.items");
            if (this.mode == jabberwerx.ui.RosterView.groupmode_single) {
                this.jq.addClass("single");
            } else {
                this.jq.removeClass("single");
            }
            heading.removeClass("expanded collapsed");
            heading.find("span.displayname").text(this.name || this.roster.getDefaultGroupingName());
            var totals = this._calculateInfo();
            // Counter: the counter exclude the status unknow
            heading.find("span.extrainfo").text((totals.active < 0 || totals.total < 0) ? "" : (totals.active <= 0 ? 0 : totals.active) + "/" + totals.total);
            switch (this.mode) {
                case jabberwerx.ui.RosterView.groupmode_single:
                    heading.hide();
                    items.show();
                    break;
                case jabberwerx.ui.RosterView.groupmode_collapsed:
                    var css = (this.jq.children("div.items").length) ? "collapsed" : "";
                    items.hide();
                    css && heading.addClass(css);
                    break;
                case jabberwerx.ui.RosterView.groupmode_expanded:
                    var css = (this.jq.children("div.items").length) ? "expanded" : "";
                    items.show();
                    css && heading.addClass(css);
                    break;
            }
        },
        _calculateInfo: function () {
            var activeCount = 0;
            for (var name in this._visibleItems) {
                if (name == "size") {
                    continue;
                }
                if (!this._visibleItems[name].entity.isActive()) {
                    continue;
                }
                activeCount++;
            }
            var totalCount = this._itemsMap.length;
            return {
                active: activeCount,
                total: totalCount - $('.unknown').length
            };
        },
        _handleExpandCollapse: function (evt) {
            this.toggle();
            return false;
        },
        _handleContactDeleted: function (evt) {
            var data = {
                type: evt.data.type,
                item: evt.source
            }
            this.roster.event("rosterItemDeleted").trigger(data);
        },
        _handleItemActivated: function (evt) {
            var data = {
                type: evt.data.type,
                item: evt.source
            }
            this.roster.event("rosterItemSelected").trigger(data);
        },
        _handleRendered: function (evt) {
            if (evt.source === this) {
                var oldUpdate = this.update;
                this.update = this._updateHeader;
                this.roster.event("rosterGroupingRendered").trigger({
                    "grouping": evt.source,
                    "dom": evt.data
                });
                this.update = oldUpdate;
            } else if (evt.source instanceof jabberwerx.ui.ContactPresenceView) {
                this.roster.event("rosterItemRendered").trigger({
                    "item": evt.source,
                    "dom": evt.data
                });
            }
        },
        roster: null,
        mode: 0
    }, "jabberwerx.ui.RosterView.Grouping");
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/views/MessageView.js*/
;
(function (jabberwerx) {
    jabberwerx.ui.MessageView = jabberwerx.ui.JWView.extend({
        init: function (data) {
            this._super();
            var replace = function (val) {
                switch (val) {
                    case '<':
                        return "&lt;";
                    case '>':
                        return "&gt;";
                    case '&':
                        return "&amp;";
                }
                return val;
            };
            if (data.content) {
                var msgData = jabberwerx.$("<span/>").addClass("message");
                var translation = jabberwerx.Message.translate(data.content, data.displayName);
                if (translation) {
                    msgData.addClass("jabberwerx messageView xep245_presentation");
                    data.content = translation;
                }
                if (typeof data.content == "string") {
                    var content = String(data.content).replace(/[<>&]/g, replace);
                    if (data.content == "Your chat application does not support downloading this file") {
                        var url = jabberwerx.ipServices + "/JabberFileManager/UploadDownloadFileServlet?filename=";
                        content = "<img src='images/download-icon.png' alt='Download File' height='16' width='16'>&nbsp<a href='" + url + jabberwerx.tempTransferedFile + "' target='" + jabberwerx.FILE_DOWNLOAD_TARGET + "'>" + jabberwerx.tempTransferedFilename + "</a>"
                    }
                    if (data.content.includes("JabberFileManager")) {
                        var fileName = data.content.split("/")[7];
                        jabberwerx.tempTransferedFilename = fileName;
                        content = "<img src='images/download-icon.png' alt='Download File' height='16' width='16'>&nbsp<a href='" + data.content + "' target='" + jabberwerx.FILE_DOWNLOAD_TARGET + "'>" + jabberwerx.tempTransferedFilename + "</a>"
                    }
                    content = String(content).replace("GetFile", "UploadDownloadFileServlet");
                    content = content.replace(/\n/g, "<br>");
                    content = jabberwerx.ui.emoticons.translate(content);
                    msgData.append(content);
                } else if (jabberwerx.isElement(data.content)) {
                    var xhtml = jabberwerx.$(data.content.xml);
                    xhtml = jabberwerx.$("<div/>").append(xhtml);
                    var replaceXhtml = xhtml.children("p:first");
                    replaceXhtml.replaceWith(replaceXhtml.contents());
                    xhtml = jabberwerx.ui.emoticons.translate(xhtml);
                    msgData.append(xhtml.contents());
                    msgData.find('a[href]').attr('target', jabberwerx.FILE_DOWNLOAD_TARGET);
                }
                this.content = msgData;
            }
            this.timestamp = jabberwerx.ui.getDateDisplayString(data.timestamp);
            this.displayName = data.displayName;
            if (typeof data.cssClassName != 'undefined') {
                this.cssClassName = data.cssClassName;
            }
        },
        createDOM: function (doc) {
            var dName =  jabberwerx.formatMessageName(this.displayName);
            var builder = jabberwerx.$("<div/>", doc);
            builder.addClass(this.cssClassName);
            jabberwerx.$("<span/>").addClass("time").text(this.timestamp).appendTo(builder);
            jabberwerx.$("<b/>").text(" " + dName + ": ").appendTo(builder);
            this.content.appendTo(builder);
            return builder.get(0);
        },
        timestamp: '',
        displayName: '',
        content: null,
        cssClassName: ''
    }, 'jabberwerx.ui.MessageView');
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/views/AuthenticationView.js*/
;
(function (jabberwerx) {
    jabberwerx.ui.AuthenticationView = jabberwerx.ui.JWView.extend({
        init: function (client, domain) {
            this._super();
            if (!(client && client instanceof jabberwerx.Client)) {
                throw new TypeError("client must be a jabberwerx.Client");
            }
            this.client = client;
            if (domain) {
                this.domain = jabberwerx.JID.asJID(domain).getDomain();
            }
        },
        createDOM: function (doc) {
            var data = jabberwerx.$("<form/>", doc).bind("submit", this.invocation("_login"));
            var authDiv = jabberwerx.$("<div/>").appendTo(data).addClass("authDiv");
            var userDiv = jabberwerx.$("<div/>").appendTo(authDiv).addClass("input-group").addClass("username_div").addClass("inputContainer");
            jabberwerx.$("<span id='sizing-addon2' />").appendTo(userDiv).attr("for", "username").attr("class", "input-group-addon").text(jabberwerx._("Usuario:"));
            jabberwerx.$("<input id='username' type='text' class='form-control' placeholder='Usuario' aria-describedby='sizing-addon2' />").appendTo(userDiv);
            var passDiv = jabberwerx.$("<div/>").appendTo(authDiv).addClass("password_div").addClass("input-group").addClass("inputContainer");
            jabberwerx.$("<span id='sizing-addon2' />").appendTo(passDiv).attr("for", "password").attr("class", "input-group-addon").text(jabberwerx._("Contraseña:"));
            jabberwerx.$("<input id='password' type='password' class='form-control' placeholder='Contraseña' aria-describedby='sizing-addon2'/>").appendTo(passDiv).addClass("password");
            var submitDiv = jabberwerx.$("<div/>").appendTo(authDiv).addClass("submit_div").addClass("inputContainer");
            jabberwerx.$("<input type='submit'/>").appendTo(submitDiv).addClass("auth_submit").addClass("btn").addClass("login-btn").attr("value", jabberwerx._("Login"));//.attr("ng-Click", "toggleLeft(alert('hola');)");
            var statusDiv = jabberwerx.$("<div/>").appendTo(authDiv).attr("class", "auth_status_div").addClass("inputContainer").text("\u00A0");
            jabberwerx.$("<span/>").appendTo(statusDiv).addClass("auth_status");
            return data.get(0);
        },
        restoreDOM: function (doc) {
            var res = jabberwerx.$(this.createDOM(doc));
            if (this._persistedUsername) {
                res.find('input.username').val(this._persistedUsername);
                this._persistedUsername = null;
            }
            if (this._persistedPassword) {
                res.find('input.password').val(jabberwerx.util.decodeSerialization(this._persistedPassword));
                this._persistedPassword = null;
            }
            if (this._persistedError) {
                res.find('span.auth_status').text(this._persistedError);
                this._persistedError = null;
            }
            return res.get(0);
        },
        _login: function (evt) {
            try {
                this._updateStatus();
                var userQuery = this.jq.find("input#username");
                var username = userQuery.val();
                jabberwerx.systemUsername = username;
                var passQuery = this.jq.find("input#password");
                var password = passQuery.val();
                if (jabberwerx._config.baseReconnectCountdown == 0) {
                    passQuery.val('');
                }
                var submitQuery = this.jq.find("input.auth_submit");
                var domainname;
                if (!this.domain) {
                    var atIdx = (this.allowAtSymbol) ? username.lastIndexOf('@') : username.indexOf('@');
                    domainname = username.substring(atIdx + 1);
                    username = username.substring(0, atIdx);
                }
                if (!this.allowAtSymbol && /@/.test(username)) {
                    throw new jabberwerx.JID.InvalidJIDError("invalid characters found");
                }
                var userJid;
                try {
                    userJid = new jabberwerx.JID({
                        "node": username,
                        "domain": domainname || this.domain
                    });
                } catch (ex) {
                    userJid = new jabberwerx.JID({
                        "node": username,
                        "domain": domainname || this.domain,
                        "unescaped": true
                    });
                }
                if (!userJid.getNode()) {
                    throw new jabberwerx.ui.AuthenticationView.MissingJIDNode();
                }
                var that = this;
                var onSuccess = function () {
                    userQuery.removeAttr("disabled");
                    passQuery.removeAttr("disabled");
                    submitQuery.removeAttr("disabled");
                    that._updateStatus();
                }
                var onError = function (evt) {
                    userQuery.removeAttr("disabled");
                    passQuery.removeAttr("disabled");
                    submitQuery.removeAttr("disabled");
                    that._updateStatus(evt);
                }
                var arg = {
                    successCallback: onSuccess,
                    errorCallback: onError,
                    register: this._register
                };
                userQuery.attr("disabled", "disabled");
                passQuery.attr("disabled", "disabled");
                this.client.connect(userJid, password, arg);
            } catch (ex) {
                userQuery.removeAttr("disabled");
                passQuery.removeAttr("disabled");
                submitQuery.removeAttr("disabled");
                this._updateStatus(ex);
            }
            return false;
        },
        _updateStatus: function (error) {
            var statusArea = this.jq.find("span.auth_status");
            if (!error) {
                statusArea.text("\u00A0");
            } else if (error instanceof jabberwerx.JID.InvalidJIDError) {
                statusArea.text(jabberwerx.ui.AuthenticationView.invalid_user);
            } else {
                var msg = jabberwerx.errorReporter.getMessage(error);
                statusArea.text(msg);
                $( "#initial_container" ).hide();
            }
        },
        willBeSerialized: function () {
            if (this.jq) {
                this._persistedUsername = this.jq.find('input.username').val();
                if (jabberwerx._config.baseReconnectCountdown != 0) {
                    this._persistedPassword = jabberwerx.util.encodeSerialization(this.jq.find('input.password').val());
                }
                this._persistedError = this.jq.find("span.auth_status").text();
            }
            return this._super();
        },
        _persistedUsername: null,
        _persistedPassword: null,
        _persistedError: null,
        _register: false,
        client: null,
        domain: null,
        allowAtSymbol: false
    }, 'jabberwerx.ui.AuthenticationView');
    jabberwerx.ui.AuthenticationView.invalid_user = "Usuario invalido.";
    jabberwerx.ui.AuthenticationView.default_error_message = "Login fallido. Intente de nuevo.";
    jabberwerx.ui.AuthenticationView.MissingJIDNode = jabberwerx.util.Error.extend("A node and domain must be specified in the JID (user@domain).");
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/views/ChatView.js*/
;
(function (jabberwerx) {
    jabberwerx.ui.ChatView = jabberwerx.ui.JWView.extend({
        init: function (session) {
            this._super();
            if (!(session && session instanceof jabberwerx.ChatSession)) {
                throw new TypeError("session must be a jabberwerx.ChatSession");
            }
            this.session = session;
            this.session.event("chatReceived").bind(this.invocation("_handleChat"));
            this.session.event("chatSent").bind(this.invocation("_handleChat"));
            this.session.event("chatStateChanged").bind(this.invocation("_handleChatState"));
        },
        destroy: function () {
            this.session.event("chatReceived").unbind(this.invocation("_handleChat"));
            this.session.event("chatSent").unbind(this.invocation("_handleChat"));
            this.session.event("chatStateChanged").unbind(this.invocation("_handleChatState"));
            if (this.session) {
                this.session.destroy();
            }
            this._super();
        },
        width: function (w, noupdate) {
            var result = this._super(w, true);
            if (w !== undefined && this.jq) {
                w = this.width();
                w = w - (this.jq.outerWidth(true) - w);
                if (w != 0) {
                    this._presenceView.width(w, true);
                    this._messageListView.width(w, true);
                    this._messageInput.width(w, true);
                    if (!noupdate) {
                        this.update();
                    }
                }
            }
            return result;
        },
        height: function (h, noupdate) {
            var result = this._super(h, true);
            if (h !== undefined && this.jq) {
                h = this.height();
                if (h) {
                    var delta = this._presenceView.jq.outerHeight(true) +
                        this._messageInput.jq.outerHeight(true);
                    h -= delta;
                    this._messageListView.height(h, true);
                }
                if (!noupdate) {
                    this.update();
                }
            }
            return result;
        },
        _handleChat: function (evt) {
            var msg = evt.data;
            var client = this.session.client;
            var tab;
            var entity;
            if (evt.name == "chatsent") {
                entity = client.connectedUser;
                tab = null;
            } else if (evt.name == "chatreceived") {
                entity = this.session.getEntity();
                tab = this.getTabControl();
            }
            if (this._messageListView) {
                this._messageListView.addMessage(entity, msg);
            }
            if (tab) {
                tab.requestAttention();
            }
        },
        _handleChatState: function (evt) {
            var info = evt.data;
            if (!info.jid) {
                return;
            }
            var data = this.session.getEntity().getDisplayName();
            data = data ? data.split(" ")[0].substr(0, 10) : "";
            switch (info.state) {
                case "composing":
                    data = jabberwerx._("{0} " + jabberwerx.CHAT_BADGE_IS_WRITING_STATE, data);
                    break;
                case "gone":
                    data = jabberwerx._("{0} " + jabberwerx.CHAT_BADGE_LEFT_CONVERSATION_STATE, data);
                    break;
                default:
                    data = null;
                    break;
            }
            if (this._messageListView) {
                jabberwerx.util.debug.log("badge: " + data);
                if (data) {
                    data = jabberwerx.$("<span/>").text(data);
                }
                this._messageListView.setBadge(data);
            }
        },
        update: function () {
            if (!this._super()) {
                return false;
            }
            this._presenceView.update();
            this._messageListView.update();
            this._messageInput.update();
            return true;
        },
        _handleText: function (evt) {
            switch (evt.name) {
                case "textsend":
                    if (evt.data == "/clear") {
                        this.clearHistory();
                        this.session.setChatState("active");
                    } else {
                        this.session.sendMessage(evt.data);
                    }
                    break;
                case "texttypingstarted":
                    this.session.setChatState("composing");
                    break;
                case "texttypingended":
                    this.session.setChatState("active");
                    break;
                case "texttypingidled":
                    this.session.setChatState("paused");
                    break;
            }
            return true;
        },
        clearHistory: function () {
            this._messageListView && this._messageListView.clearHistory();
        },
        setTabControl: function (tab) {
            this._super(tab);
            if (tab) {
                var entity = this.session.getEntity();
                var cache = entity.cache;
                tab.label(entity.getDisplayName());
                cache.event("entityAdded").bindWhen(this.invocation("_selectEntity"), this.invocation("_handleEntityChanged"));
                cache.event("entityRemoved").bindWhen(this.invocation("_selectEntity"), this.invocation("_handleEntityChanged"));
                cache.event("entityUpdated").bindWhen(this.invocation("_selectEntity"), this.invocation("_handleEntityChanged"));
                cache.event("entityRenamed").bindWhen(this.invocation("_selectEntity"), this.invocation("_handleEntityChanged"));
            } else {
                var cache = this.session.getEntity().cache;
                cache.event("entityAdded").unbind(this.invocation("_handleEntityChanged"));
                cache.event("entityRemoved").unbind(this.invocation("_handleEntityChanged"));
                cache.event("entityUpdated").unbind(this.invocation("_handleEntityChanged"));
                cache.event("entityRenamed").unbind(this.invocation("_handleEntityChanged"));
            }
        },
        _selectEntity: function (data) {
            var entity = this.session.getEntity();
            var test = (data instanceof jabberwerx.Entity) ? data : data.entity;
            if (this.getTabControl() && entity.matches(test)) {
                return entity;
            }
            return undefined;
        },
        _handleEntityChanged: function (evt) {
            var entity = evt.selected;
            var tab = this.getTabControl();
            if (tab) {
                tab.label(entity.getDisplayName());
            }
        },
        createDOM: function (doc) {
            var chatView = jabberwerx.$("<div/>", doc).addClass("jabberwerx chatview");
            this._presenceView = new
                jabberwerx.ui.ContactPresenceView(this.session.getEntity());
            this._presenceView.render().appendTo(chatView);
            this._messageListView = new jabberwerx.ui.MessageHistory(this.session);
            this._messageListView.render().appendTo(chatView);
            this._messageInput = new jabberwerx.ui.TextInput();
            this._messageInput.event("textSend").bind(this.invocation("_handleText"));
            this._messageInput.event("textTypingStarted").bind(this.invocation("_handleText"));
            this._messageInput.event("textTypingEnded").bind(this.invocation("_handleText"));
            this._messageInput.event("textTypingIdled").bind(this.invocation("_handleText"));
            this._messageInput.render().appendTo(chatView);
            return chatView;
        },
        restoreDOM: function (doc) {
            var chatView = jabberwerx.$("<div/>", doc).addClass("jabberwerx chatview");
            this._presenceView.render().appendTo(chatView);
            this._messageListView.render().appendTo(chatView);
            this._messageInput.render().appendTo(chatView);
            return chatView;
        },
        destroyDOM: function () {
            this._presenceView.destroy();
            this._presenceView = null;
            this._messageListView.destroy();
            this._messageListView = null;
            this._messageInput.destroy();
            this._messageInput = null;
        },
        _presenceView: null,
        _messageListView: null,
        _messageInput: null
    }, 'jabberwerx.ui.ChatView');
    jabberwerx.ui.ChatView.mixin(jabberwerx.ui.Tabbable);
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/views/MucView.js*/
;
(function (jabberwerx) {
    jabberwerx.ui.MucView = jabberwerx.ui.JWView.extend({
        init: function (mucRoom) {
            this._super();
            if (!(mucRoom && mucRoom instanceof jabberwerx.MUCRoom)) {
                throw new TypeError("mucRoom must be a jabberwerx.MUCRoom");
            }
            this._MucRoom = mucRoom;
            this._MucRoom.event("roomBroadcastReceived").bind(this.invocation("_handleChat"));
            this._MucRoom.event("roomSubjectChanged").bind(this.invocation("_handleSubjectChange"));
            this._MucRosterSize = jabberwerx.ui.MucView.defaultOccupantsListSize;
        },
        destroy: function () {
            this._MucRoom.event("roomBroadcastReceived").unbind(this.invocation("_handleChat"));
            this._MucRoom.event("roomSubjectChanged").unbind(this.invocation("_handleSubjectChange"));
            this._MucRoom.exit();
            this._super();
        },
        _handleSubjectChange: function (evt) {
            var subject = evt.data.getSubject();
            this._setTitle(this.jq, subject);
            var jid = evt.data.getFromJID();
            var occupant = this._MucRoom.occupants.entity(jid);
            if (!occupant) {
                occupant = this._createMUCOccupant(jid);
            }
            if (evt.data.getBody() || evt.data.getHTML()) {
                this._messageListView.addMessage(occupant, evt.data);
            } else {
                var msg = evt.data.clone();
                msg.setBody("/me " + jabberwerx._(jabberwerx.MUCRoom.DefaultSubjectChange, subject));
            }
        },
        _setTitle: function (jq, subject) {
            if (jq) {
                //Establece el header del chatview y limpia codigo por defecto de jabber.
                var regex=/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+/g;
                var roomName = this._MucRoom.getDisplayName().match(regex);
                var subject = subject || "";
                jq.find(".muc_title").text(roomName + ": ");
                jq.find('.muc_title').prop('title', subject);
            }
        },
        _handleChat: function (evt) {
            var msg = evt.data;
            var jid = msg.getFromJID();
            var occupant = this._MucRoom.occupants.entity(jid);
            if (!occupant) {
                occupant = this._createMUCOccupant(jid);
            }
            if (this._messageListView) {
                this._messageListView.addMessage(occupant, msg);
            }
        },
        _createMUCOccupant: function (jid) {
            var occupant = new jabberwerx.Entity({
                jid: jid
            });
            var dispName = jid.getResource() || jabberwerx.JID.unescapeNode(jid.getNode() || "") || jid.getDomain();
            occupant.setDisplayName(dispName);
            return occupant;
        },
        occupantsListSize: function (size) {
            if (size == undefined) {
                return this._MucRosterSize;
            } else if (!(typeof (size) == "number" && size > 0)) {
                throw new jabberwerx.ui.MucView.occupantsListSizeInvalidError();
            }
            this._MucRosterSize = size;
            this.width(this.width());
            return this;
        },
        height: function (h, noupdate) {
            var result = this._super(h, true);
            if (h && this.jq) {
                var titleView = this.jq.find(".muc_title");
                var height = h - titleView.outerHeight(true) -
                    this._messageInput.jq.outerHeight(true);
                this._messageListView.height(height, true);
                this._MucRoster.height(h, true);
                this.jq.find(".jabberwerx.chatview").height(h, true);
                if (!noupdate) {
                    this.update();
                }
            }
            return result;
        },
        width: function (w, noupdate) {
            var result = this._super(w, true);
            if (w && this.jq) {
                w = this.jq.width();
                var occupantsListSize = this.occupantsListSize();
                this._MucRoster.width(occupantsListSize);
                var mucInterface = this.jq.find(".jabberwerx.chatview");
                var delta = (mucInterface.innerWidth() - mucInterface.width());
                if (delta < 1) {
                    delta = 2;
                }
                var width = w - occupantsListSize - delta;
                this.jq.find(".muc_header").width(width);
                this.jq.find(".muc_btn_show_users").width(width * 0.1);
                this.jq.find(".muc_title").width(width * 0.6);
                this._messageListView.width(width, true);
                this._messageInput.width(width, true);
                if (!noupdate) {
                    this.update();
                }
            }
            return result;
        },
        update: function () {
            if (!this._super()) {
                return false;
            }
            this._MucRoster.update();
            this._messageListView.update();
            this._messageInput.update();
            return true;
        },
        _send: function (evt) {
            var msg = evt.data;
            if (jabberwerx.$.isArray(msg)) {
                msg = 'foo';
            } else if (jabberwerx.isElement(msg)) {
                msg = jabberwerx.$(msg).text();
            }
            var match = /^\/(subject|topic|nick)\s+(.+)/.exec(msg || "");
            switch ((match && match[1]) || msg) {
                case "subject":
                case "topic":
                    this._MucRoom.changeSubject(match[2]);
                    break;
                case "nick":
                    this._MucRoom.changeNickname(match[2]);
                    break;
                case "/clear":
                    this.clearHistory();
                    break;
                default:
                    this._MucRoom.sendBroadcast(evt.data);
                    break;
            }
            return true;
        },
        clearHistory: function () {
            if (this._messageListView) {
                this._messageListView.clearHistory();
            }
        },
        setTabControl: function (tab) {
            this._super(tab);
            if (tab) {
                tab.label(this._MucRoom.getDisplayName());
                this._MucRoom.event("roomBroadcastReceived").bind(this.invocation("_handleSubjectChangeOrBroadcast"));
                this._MucRoom.event("roomSubjectChanged").bind(this.invocation("_handleSubjectChangeOrBroadcast"));
            } else {
                this._MucRoom.event("roomBroadcastReceived").unbind(this.invocation("_handleSubjectChangeOrBroadcast"));
                this._MucRoom.event("roomSubjectChanged").unbind(this.invocation("_handleSubjectChangeOrBroadcast"));
            }
        },
        _handleSubjectChangeOrBroadcast: function (evt) {
            var tab = this.getTabControl();
            if (tab) {
                tab.requestAttention();
            }
        },

        _toggleUsers: function (evt) {

            var mucview = $(evt.currentTarget).parent().parent().parent();

            mucview.removeClass("expanded");
            mucview.addClass("collapsed");
            mucview.find(".muc_btn_show_users").html("");
            mucview.find(".roster").width("0px");
            mucview.find(".chatview").width("" + (mucview.width() - 8) + "px");
            mucview.find(".chat_wrapper").width("" + (mucview.width() - 7) + "px");
            mucview.find(".chat_incoming").width("" + (mucview.width() - 7) + "px");
            mucview.find(".chat_input_wrapper").width("" + (mucview.width() - 8) + "px");
            mucview.find(".chat_input").width("" + (mucview.width() * 0.6 + 15) + "px");
        },
        createDOM: function (doc) {
            var mucView = jabberwerx.$("<div/>", doc).addClass("jabberwerx mucview expanded");
            this._MucRoster = new
                jabberwerx.ui.RosterView(this._MucRoom.occupants, jabberwerx.ui.RosterView.groupmode_single);
            this._MucRoster.render().appendTo(mucView);
            var mucInterface = jabberwerx.$("<div/>").appendTo(mucView).addClass("jabberwerx chatview");
            var mucHeader = jabberwerx.$("<div/>").appendTo(mucInterface).addClass("muc_header");
            jabberwerx.$("<div/>").appendTo(mucHeader).addClass("muc_btn_show_users").html("<").click(this.invocation("_toggleUsers"));
            jabberwerx.$("<div/>").appendTo(mucHeader).addClass("muc_title");
            this._setTitle(mucView);
            this._messageListView = new jabberwerx.ui.MessageHistory();
            this._messageListView.render().appendTo(mucInterface);
            this._messageInput = new jabberwerx.ui.TextInput();
            this._messageInput.event("textSend").bind(this.invocation("_send"));
            this._messageInput.render().appendTo(mucInterface);
            return mucView;
        },
        _messageListView: null,
        _messageInput: null,
        _MucRosterSize: 0
    }, 'jabberwerx.ui.MucView');
    jabberwerx.ui.MucView.occupantsListSizeInvalidError = jabberwerx.util.Error.extend("the occupantsListSize is invalid");
    jabberwerx.ui.MucView.defaultOccupantsListSize = 180;
    jabberwerx.ui.MucView.mixin(jabberwerx.ui.Tabbable);
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/views/SubscriptionView.js*/
;
(function (jabberwerx) {
    jabberwerx.ui.SubscriptionView = jabberwerx.ui.JWView.extend({
        init: function (roster, contact, defaults) {
            this._super();
            if (!(roster && roster instanceof jabberwerx.RosterController)) {
                throw new TypeError("roster must be a jabberwerx.RosterController");
            }
            this.roster = roster;
            this._contact = jabberwerx.JID.asJID(contact).getBareJID();
            this._defaultNick = ((defaults && typeof defaults.nickname == "string") ? defaults.nickname : jabberwerx.JID.unescapeNode(this._contact.getNode()));
            this._defaultGroup = defaults && typeof defaults.group == "string" && defaults.group;
            this.applyEvent("actionComplete");
        },
        createDOM: function (doc) {
            var builder = jabberwerx.$("<div/>", doc).addClass("jabberwerx subscription_view");
            var contactDiv = jabberwerx.$("<div/>").addClass("contact_div").appendTo(builder);
            jabberwerx.$("<label/>").attr("for", "contact").text(jabberwerx._("Contact:")).appendTo(contactDiv);
            jabberwerx.$("<span/>").addClass("contact").attr("id", "contact").attr("title", this._contact.toDisplayString()).text(this._contact.toDisplayString()).appendTo(contactDiv);
            var nickDiv = jabberwerx.$("<div/>").addClass("nick_div").appendTo(builder);
            jabberwerx.$("<label/>").attr("for", "nick").text(jabberwerx._("Nickname:")).appendTo(nickDiv);
            var nickInput = jabberwerx.$('<input type="text"/>').addClass("nick").attr("id", "nick").appendTo(nickDiv);
            if (this._defaultNick) {
                nickInput.val(this._defaultNick);
            }
            var groupDiv = jabberwerx.$("<div/>").addClass("group_div").appendTo(builder);
            jabberwerx.$("<label/>").attr("for", "group").text(jabberwerx._("Group:")).appendTo(groupDiv);
            jabberwerx.$('<input type="text"/>').addClass("group_input").attr("id", "new_group").blur(this.invocation("_groupEntered")).keyup(this.invocation("_groupKeyup")).appendTo(groupDiv).hide();
            var groupSelect = jabberwerx.$("<select/>").addClass("group_select").attr("id", "group").change(this.invocation("_groupSelected")).appendTo(groupDiv);
            var groups = this.roster.client.entitySet.getAllGroups();
            if (this._defaultGroup && jabberwerx.$.inArray(this._defaultGroup, groups) == -1) {
                groups.push(this._defaultGroup);
            }
            var that = this;
            jabberwerx.$.each(groups, function (key, val) {
                that._createGroupOption(val).appendTo(groupSelect);
            });
            this._createGroupOption(jabberwerx._("New...")).appendTo(groupSelect);
            this._sortGroupSelection(groupSelect);
            if (this._defaultGroup) {
                groupSelect.val(this._defaultGroup);
            } else {
                this._defaultGroup = (groupSelect.val() != jabberwerx._("New...") ? groupSelect.val() : null);
            }
            var actionDiv = jabberwerx.$("<div/>").addClass("action_div").appendTo(builder);
            jabberwerx.$("<input/>").addClass("action_button").addClass("accept").attr("type", "button").val(jabberwerx._("Accept")).click(this.invocation("acceptSubscription")).appendTo(actionDiv);
            jabberwerx.$("<input/>").addClass("action_button").addClass("deny").attr("type", "button").val(jabberwerx._("Deny")).click(this.invocation("denySubscription")).appendTo(actionDiv);
            jabberwerx.$("<input/>").addClass("action_button").addClass("ignore").attr("type", "button").val(jabberwerx._("Ignore")).click(this.invocation("ignoreSubscription")).appendTo(actionDiv);
            return builder.get(0);
        },
        show: function () {
            if (this.jq) {
                this.jq.show();
            }
        },
        hide: function () {
            if (this.jq) {
                this.jq.hide();
            }
        },
        acceptSubscription: function () {
            this.roster.acceptSubscription(this._contact, this.getNickname(), this.getGroup());
            this.event("actionComplete").trigger({
                action: jabberwerx.ui.SubscriptionView.ACTION_ACCEPT
            });
        },
        denySubscription: function () {
            this.roster.denySubscription(this._contact);
            this.event("actionComplete").trigger({
                action: jabberwerx.ui.SubscriptionView.ACTION_DENY
            });
        },
        ignoreSubscription: function () {
            this.event("actionComplete").trigger({
                action: jabberwerx.ui.SubscriptionView.ACTION_IGNORE
            });
        },
        getNickname: function () {
            return (this.jq && this.jq.find("#nick").val()) || this._defaultNick || "";
        },
        getGroup: function () {
            return (this.jq && this.jq.find("#group").val()) || this._defaultGroup || "";
        },
        _groupSelected: function (evt) {
            var groupSelect = jabberwerx.$(evt.target);
            if (groupSelect.val() == jabberwerx._("new")) {
                groupSelect.hide();
                this.jq.find("#new_group").val("").show()[0].focus();
            }
        },
        _groupEntered: function (evt) {
            var groupInput = jabberwerx.$(evt.target);
            var groupSelectElement = this.jq.find("#group");
            if (groupInput.val() && groupInput.val() != jabberwerx._("new")) {
                if (!(jabberwerx.$("[value='" + groupInput.val() + "']", groupSelectElement).length)) {
                    groupSelectElement.append(this._createGroupOption(groupInput.val()));
                    this._sortGroupSelection(groupSelectElement);
                }
                groupInput.hide();
                groupSelectElement.val(groupInput.val()).show();
            } else {
                groupInput.val("");
            }
        },
        _groupKeyup: function (evt) {
            if ((evt.which && evt.which == 13) || evt.keyCode == 13) {
                this._groupEntered(evt);
            }
        },
        _sortGroupSelection: function (selection) {
            var arr = [];
            selection.contents().each(function () {
                arr.push(this.value);
            });
            var newPos = jabberwerx.$.inArray("New...", arr);
            if (newPos != -1) {
                arr.splice(newPos, 1);
            }
            arr.sort(function (a, b) {
                a = a.toLowerCase();
                b = b.toLowerCase();
                if (a > b) return 1;
                if (a < b) return -1;
                return 0;
            });
            selection.contents().each(function () {
                var val = arr.shift() || jabberwerx._("new");
                this.value = val;
                this.text = val;
            });
        },
        _createGroupOption: function (groupName) {
            return jabberwerx.$("<option/>").addClass("group_option").val(groupName).text(groupName);
        },
        roster: null,
        _contact: null,
        _defaultNick: null,
        _defaultGroup: null
    }, 'jabberwerx.ui.SubscriptionView');
    jabberwerx.ui.SubscriptionView.ACTION_ACCEPT = "accept";
    jabberwerx.ui.SubscriptionView.ACTION_DENY = "deny";
    jabberwerx.ui.SubscriptionView.ACTION_IGNORE = "ignore";
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/views/MUCInviteView.js*/
;
(function (jabberwerx) {
    jabberwerx.ui.MUCInviteView = jabberwerx.ui.JWView.extend({
        init: function (muc, mucInvite, nickname) {
            this._super();
            if (!(muc && muc instanceof jabberwerx.MUCController)) {
                throw new TypeError("muc must be a jabberwerx.MUCController");
            }
            if (!(mucInvite && mucInvite instanceof jabberwerx.MUCInvite)) {
                throw new TypeError("mucInvite must be a jabberwerx.MUCInvite");
            }
            this.muc = muc;
            this.mucInvite = mucInvite;
            this._nick = ((typeof nickname == "string" || nickname instanceof String) && nickname) || (this.muc.client.connectedUser && this.muc.client.connectedUser.getDisplayName());
            this.applyEvent("actionComplete");
        },
        createDOM: function (doc) {
            var builder = jabberwerx.$("<div/>", doc).addClass("jabberwerx muc_invite_view");
            var roomDiv = jabberwerx.$("<div/>").addClass("room_div").appendTo(builder);
            jabberwerx.$("<label/>").attr("for", "room").text(jabberwerx._("Room:")).appendTo(roomDiv);
            jabberwerx.$("<span/>").addClass("room").attr("id", "room").attr("title", jabberwerx.JID.unescapeNode(this.mucInvite.getRoom().getNode())).text(jabberwerx.JID.unescapeNode(this.mucInvite.getRoom().getNode())).appendTo(roomDiv);
            if (this.mucInvite.getInvitor()) {
                var invitorDiv = jabberwerx.$("<div/>").addClass("invitor_div").appendTo(builder);
                jabberwerx.$("<label/>").attr("for", "invitor").text(jabberwerx._("Invitor:")).appendTo(invitorDiv);
                jabberwerx.$("<span/>").addClass("invitor").attr("id", "invitor").attr("title", this.mucInvite.getInvitor().getBareJID().toDisplayString()).text(this.mucInvite.getInvitor().getBareJID().toDisplayString()).appendTo(invitorDiv);
            }
            if (this.mucInvite.getReason()) {
                var reasonDiv = jabberwerx.$("<div/>").addClass("reason_div").appendTo(builder);
                jabberwerx.$("<label/>").attr("for", "reason").text(jabberwerx._("Reason:")).appendTo(reasonDiv);
                jabberwerx.$("<span/>").addClass("reason").attr("id", "reason").text(this.mucInvite.getReason()).appendTo(reasonDiv);
            }
            var nickDiv = jabberwerx.$("<div/>").addClass("nick_div").appendTo(builder);
            jabberwerx.$("<label/>").attr("for", "nick").text(jabberwerx._("Nickname:")).appendTo(nickDiv);
            var nickInput = jabberwerx.$('<input type="text"/>').addClass("nick").attr("id", "nick").val(this._nick || "").appendTo(nickDiv);
            var actionDiv = jabberwerx.$("<div/>").addClass("action_div").appendTo(builder);
            jabberwerx.$('<input type="button"/>').addClass("action_button").addClass("join").val(jabberwerx._("Join")).click(this.invocation("joinRoom")).appendTo(actionDiv);
            jabberwerx.$('<input type="button"/>').addClass("action_button").addClass("ignore").val(jabberwerx._("Ignore")).click(this.invocation("ignoreInvite")).appendTo(actionDiv);
            var errorMsgDiv = jabberwerx.$("<div/>").addClass("error_msg_div").appendTo(builder);
            jabberwerx.$("<span/>").addClass("error_msg").hide().appendTo(errorMsgDiv);
            return builder.get(0);
        },
        show: function () {
            if (this.jq) {
                this.jq.show();
            }
        },
        hide: function () {
            if (this.jq) {
                this.jq.hide();
            }
        },
        joinRoom: function () {
            var nick = jabberwerx.$(".jabberwerx.muc_invite_view .nick_div #nick").val();
            var errorSpan = jabberwerx.$(".jabberwerx.muc_invite_view .error_msg_div .error_msg");
            if (!nick) {
                errorSpan.text(jabberwerx._("A nickname must be specified"));
                errorSpan.show();
            } else {
                errorSpan.hide();
                jabberwerx.$(".jabberwerx.muc_invite_view .action_button.join").attr("disabled", "true");
                jabberwerx.$(".jabberwerx.muc_invite_view .action_button.ignore").attr("disabled", "true");
                var room = this.muc.room(this.mucInvite.getRoom());
                var that = this;
                var cb = function (err) {
                    var actionObj = {
                        action: jabberwerx.ui.MUCInviteView.ACTION_JOIN
                    };
                    err && (actionObj.error = err);
                    jabberwerx.$(".jabberwerx.muc_invite_view .action_button.join").removeAttr("disabled");
                    jabberwerx.$(".jabberwerx.muc_invite_view .action_button.ignore").removeAttr("disabled");
                    that.event("actionComplete").trigger(actionObj);
                };
                room.enter(nick, {
                    successCallback: cb,
                    errorCallback: cb,
                    password: this.mucInvite.getPassword()
                });
            }
        },
        ignoreInvite: function () {
            this.event("actionComplete").trigger({
                action: jabberwerx.ui.MUCInviteView.ACTION_IGNORE
            });
        },
        muc: null,
        mucInvite: null,
        _nick: null
    }, 'jabberwerx.ui.MUCInviteView');
    jabberwerx.ui.MUCInviteView.ACTION_JOIN = "join";
    jabberwerx.ui.MUCInviteView.ACTION_IGNORE = "ignore";
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/views/XDataFormView.js*/
;
(function (jabberwerx) {
    jabberwerx.ui.XDataFormView = jabberwerx.ui.JWView.extend({
        init: function (dataForm) {
            this._super();
            this._dataForm = dataForm;
            if (!(dataForm && dataForm instanceof jabberwerx.XDataForm)) {
                throw new TypeError("dataForm must be a XDataForm");
            }
            this.applyEvent("xdataItemSelected");
        },
        update: function () {
            var retval = this._super();
            if (retval) {
                var controlsWidth = this.jq.get(0).clientWidth;
                this.jq.children(":not(.result_table)").width(controlsWidth);
            }
            return retval;
        },
        createDOM: function (doc) {
            var div = jabberwerx.$("<div/>", doc).addClass("jabberwerx xdata_form_view");
            if (this._dataForm.getTitle()) {
                var titleRow = jabberwerx.$("<tr/>");
                var titleCell = jabberwerx.$("<div/>").text(this._dataForm.getTitle()).addClass("title").appendTo(div);
            }
            if (this._dataForm.getInstructions()) {
                var instrRow = jabberwerx.$("<tr/>");
                var instrCell = jabberwerx.$("<div/>").text(this._dataForm.getInstructions()).addClass("instr").appendTo(div);
            }
            var that = this;
            var table;
            var fields = this._dataForm.fields;
            var reported = this._dataForm.reported;
            var items = this._dataForm.items;
            var addFields = true;
            var result = false;
            if (fields.length) {
                if (this._dataForm.getType() == "result") {
                    if (reported.length || items.length) {
                        addFields = false;
                    } else {
                        result = true;
                    }
                }
                if (addFields) {
                    jabberwerx.$.each(fields, function () {
                        table = jabberwerx.$("<table/>").appendTo(div);
                        var fieldRow = jabberwerx.$("<tr/>");
                        if (that._addFieldToForm(fieldRow, this, result)) {
                            fieldRow.appendTo(table);
                        }
                    });
                }
            }
            if (reported.length) {
                table = jabberwerx.$("<table cellspacing='0' cellpadding='0'/>").addClass("result_table").appendTo(div);
                var reportedRow = jabberwerx.$("<tr/>").addClass("result_row").appendTo(table);
                jabberwerx.$.each(reported, function () {
                    that._addReportedToForm(reportedRow, this);
                });
            }
            if (items.length) {
                if (!table) {
                    table = jabberwerx.$("<table cellspacing='0' cellpadding='0'/>").addClass("result_table").appendTo(div);
                }
                jabberwerx.$.each(items, function (n) {
                    var item = this;
                    var itemRow = jabberwerx.$("<tr/>").addClass((n + 1) % 2 == 0 ? "even" : "odd").attr("id", item._guid).appendTo(table);
                    itemRow.bind('click', function () {
                        that.event("xdataItemSelected").trigger({
                            selected: item
                        });
                    });
                    that._addItemToForm(itemRow, this);
                });
            }
            return div[0];
        },
        _addFieldToForm: function (fieldRow, field, result) {
            if (field.getType() == "hidden") {
                return false;
            }
            if (field.getVar()) {
                fieldRow.attr("id", field.getVar());
            }
            if (field.getLabel()) {
                jabberwerx.$("<td />").addClass("field_label").text(field.getLabel()).appendTo(fieldRow);
            }
            var fieldType = field.getType() || "text-single";
            var fieldValue = jabberwerx.$("<td />").addClass("field_value").addClass(fieldType).appendTo(fieldRow);
            switch (fieldType) {
                case 'boolean':
                    var check = jabberwerx.$("<input type='checkbox'/>").attr("title", field.getDesc()).appendTo(fieldValue);
                    if (field.getDesc()) {
                        check.attr("title", field.getDesc());
                    }
                    if (field.getValues()[0] == "1") {
                        check.prop("checked", true);
                    }
                    if (result) {
                        check.attr("disabled", "disabled");
                    }
                    break;
                case 'fixed':
                    var fixed = fieldValue.text(field.getValues()[0]);
                    if (field.getDesc()) {
                        fixed.attr("title", field.getDesc());
                    }
                    if (!field.getLabel()) {
                        fieldValue.removeClass("field_value");
                    }
                    break;
                case 'hidden':
                    break;
                case 'jid-single':
                    var jid_single = jabberwerx.$("<input type='text'/>").addClass("line-single").attr("size", "1").attr("title", field.getDesc()).appendTo(fieldValue);
                    if (field.getValues().length > 0) {
                        jid_single.attr("value", field.getValues()[0]);
                    }
                    if (field.getDesc()) {
                        jid_single.attr("title", field.getDesc());
                    }
                    if (result) {
                        jid_single.attr("disabled", "disabled");
                    }
                    break;
                case 'jid-multi':
                    var jid_multi = jabberwerx.$("<textarea/>").attr("row", "2").attr("wrap", "off").addClass("line-multi").appendTo(fieldValue);
                    if (field.getDesc()) {
                        jid_multi.attr("title", field.getDesc());
                    }
                    var jids = "";
                    for (var i = 0; i < field.getValues().length; i++) {
                        jids = jids + field.getValues()[i];
                        if (i < field.getValues().length - 1) {
                            jids = jids + '\r';
                        }
                    }
                    if (field.getValues().length > 0) {
                        jid_multi.text(jids);
                    }
                    if (result) {
                        jid_multi.attr("disabled", "disabled");
                    }
                    break;
                case 'list-single':
                    var list_single = jabberwerx.$("<select/>").attr("size", "1").addClass("list-single").appendTo(fieldValue);
                    if (field.getDesc()) {
                        list_single.attr("title", field.getDesc());
                    }
                    jabberwerx.$.each(field.getOptions(), function () {
                        var option = jabberwerx.$("<option/>").attr("value", this.value).text(this.label || this.value).appendTo(list_single);
                        var option_value = this.value;
                        jabberwerx.$.each(field.getValues(), function () {
                            if (this == option_value) {
                                option.prop("selected", true);
                            }
                        });
                    });
                    if (result) {
                        list_single.attr("disabled", "disabled");
                    }
                    break;
                case 'list-multi':
                    var list_multi = jabberwerx.$("<select/>").addClass("list-multi").attr("size", "3").attr("multiple", "multiple").appendTo(fieldValue);
                    if (field.getDesc()) {
                        list_multi.attr("title", field.getDesc());
                    }
                    jabberwerx.$.each(field.getOptions(), function () {
                        var option = jabberwerx.$("<option/>").attr("value", this.value).text(this.label || this.value).appendTo(list_multi);
                        var option_value = this.value;
                        jabberwerx.$.each(field.getValues(), function () {
                            if (this == option_value) {
                                option.prop("selected", true);
                            }
                        });
                    });
                    if (result) {
                        list_multi.attr("disabled", "disabled");
                    }
                    break;
                case 'text-single':
                    var text_single = jabberwerx.$("<input type='text'/>").addClass("line-single").appendTo(fieldValue);
                    if (field.getDesc()) {
                        text_single.attr("title", field.getDesc());
                    }
                    if (field.getValues().length > 0) {
                        text_single.attr("value", field.getValues()[0]);
                    }
                    if (result) {
                        text_single.attr("disabled", "disabled");
                    }
                    break;
                case 'text-multi':
                    var text_multi = jabberwerx.$("<textarea/>").attr("row", "2").attr("wrap", "off").addClass("line-multi").appendTo(fieldValue);
                    if (field.getDesc()) {
                        text_multi.attr("title", field.getDesc());
                    }
                    var lines = "";
                    for (var i = 0; i < field.getValues().length; i++) {
                        lines = lines + field.getValues()[i];
                        if (i < field.getValues().length - 1) {
                            lines = lines + '\r';
                        }
                    }
                    if (field.getValues().length > 0) {
                        text_multi.text(lines);
                    }
                    if (result) {
                        text_multi.attr("disabled", "disabled");
                    }
                    break;
                case 'text-private':
                    var text_private = jabberwerx.$("<input type='password'/>").addClass("line-single").appendTo(fieldValue);
                    if (field.getDesc()) {
                        text_private.attr("title", field.getDesc());
                    }
                    if (field.getValues().length > 0) {
                        text_private.attr("value", field.getValues()[0]);
                    }
                    if (result) {
                        text_private.attr("disabled", "disabled");
                    }
                    break;
            }
            return true;
        },
        _addResultFieldToForm: function (fieldRow, field) {
            if (field.getType() == "hidden") {
                return false;
            }
            var fieldType = field.getType() || "text-single";
            var fieldValue = jabberwerx.$("<td />").addClass("field_value").addClass(fieldType).appendTo(fieldRow);
            if (field.getVar()) {
                fieldValue.attr("id", field.getVar());
            }
            switch (fieldType) {
                case 'boolean':
                    var check = jabberwerx.$("<img/>").appendTo(fieldValue);
                    if (field.getValues()[0] == "1") {
                        check.attr("src", jabberwerx.ui.getThemeImageURL("icon-boolean-true.png"));
                    } else {
                        check.attr("src", jabberwerx.ui.getThemeImageURL("icon-boolean-false.png"));
                    }
                    break;
                case 'fixed':
                case 'jid-single':
                case 'text-single':
                case 'list-single':
                    if (field.getValues().length > 0) {
                        if (fieldType == "jid-single") {
                            fieldValue.append((jabberwerx.JID.unescapeNode(field.getValues()[0]) || "\u00A0") + "<br/>");
                        } else {
                            fieldValue.append((field.getValues()[0] || "\u00A0") + "<br/>");
                        }
                    } else {
                        fieldValue.text("\u00A0");
                    }
                    break;
                case 'text-private':
                    if (field.getValues().length > 0) {
                        fieldValue.append("******");
                    } else {
                        fieldValue.text("\u00A0");
                    }
                    break;
                case 'jid-multi':
                case 'text-multi':
                case 'list-multi':
                    var lines = "";
                    for (var i = 0; i < field.getValues().length; i++) {
                        if (fieldType == "jid-multi") {
                            lines = lines + jabberwerx.JID.unescapeNode(field.getValues()[i]);
                        } else {
                            lines = lines + field.getValues()[i];
                        }
                        if (i < field.getValues().length - 1) {
                            lines = lines + '<br/>';
                        }
                    }
                    if (field.getValues().length > 0) {
                        fieldValue.append(lines);
                    } else {
                        fieldValue.text("\u00A0");
                    }
                    break;
            }
            return true;
        },
        _addReportedToForm: function (row, field) {
            if (field.getType() == 'hidden') {
                return;
            }
            var cell = jabberwerx.$("<th/>").addClass("field_reported").text(field.getLabel() || field.getVar() || "\u00A0").appendTo(row);
            if (field.getVar()) {
                cell.attr("id", field.getVar());
            }
        },
        _addItemToForm: function (row, item) {
            var that = this;
            jabberwerx.$.each(item.fields, function () {
                that._addResultFieldToForm(row, this);
            });
        },
        submit: function () {
            var submitFields = {};
            var that = this;
            var fields = this._dataForm.fields;
            var values = [];
            jabberwerx.$.each(fields, function () {
                values = that.getFieldValues(this);
                if (this.getVar()) {
                    if (values.length) {
                        submitFields[this.getVar()] = values;
                    } else if (this.getValues().length > 0) {
                        submitFields[this.getVar()] = [];
                    }
                }
            });
            jabberwerx.$("*", this.jq).removeClass("form_validation_error");
            try {
                var submit = this._dataForm.submit(submitFields);
            } catch (e) {
                jabberwerx.$("#" + e.field, this.jq).addClass("jabberwerx xdata_form_view form_validation_error");
                throw e;
            }
            return submit;
        },
        cancel: function () {
            var cancel = this._dataForm.cancel();
            jabberwerx.$("*", this.jq).removeClass("form_validation_error");
            return cancel;
        },
        getFieldValues: function (field) {
            var values = [];
            var html_elem;
            if (field && field instanceof jabberwerx.XDataFormField && field.getVar()) {
                switch (field.getType()) {
                    case 'fixed':
                        break;
                    case 'hidden':
                        break;
                    case 'boolean':
                        html_elem = this.jq.find("#" + this._escapeFieldVar(field.getVar()) + " td input");
                        if (html_elem.attr("type") == "checkbox") {
                            if (html_elem.is(":checked")) {
                                values.push(true);
                            } else {
                                values.push(false);
                            }
                        }
                        break;
                    case 'jid-single':
                    case 'text-single':
                        html_elem = this.jq.find("#" + this._escapeFieldVar(field.getVar()) + " td input");
                        if (html_elem.attr("type") == "text") {
                            var html_value = html_elem.val();
                            if (html_value && html_value != "") {
                                values.push(html_value);
                            }
                        }
                        break;
                    case 'jid-multi':
                    case 'text-multi':
                        html_elem = this.jq.find("#" + this._escapeFieldVar(field.getVar()) + " td textarea");
                        var html_value = html_elem.val();
                        var values = [];
                        if (html_value && html_value != "") {
                            values = html_value.split("\n");
                        }
                        for (var i = 0; i < values.length; i++) {
                            values[i] = values[i].replace("\r", "");
                        }
                        break;
                    case 'list-multi':
                    case 'list-single':
                        html_elem = this.jq.find("#" + this._escapeFieldVar(field.getVar()) + " td select");
                        var html_value = html_elem.val();
                        if (html_value != undefined) {
                            values = [].concat(html_value);
                        }
                        break;
                    case 'text-private':
                        html_elem = this.jq.find("#" + this._escapeFieldVar(field.getVar()) + " td input");
                        if (html_elem.attr("type") == "password") {
                            var html_value = html_elem.val();
                            if (html_value && html_value != "") {
                                values.push(html_value);
                            }
                        }
                        break;
                }
            }
            return values;
        },
        _escapeFieldVar: function (v) {
            return (v || "").replace(/[\!\"\#\$\%\&\'\(\)\*\+\,\.\/\:\;\<\=\>\?\@\[\\\]\^\`\{\|\}\~]/g, function (str) {
                return "\\" + str;
            });
        },
        _dataForm: null
    }, 'jabberwerx.ui.XDataFormView');
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/views/MUCSearchView.js*/
;
(function (jabberwerx) {
    jabberwerx.ui.MUCSearchView = jabberwerx.ui.JWView.extend({
        init: function (controller, muc) {
            this._super();
            if (!(controller && controller instanceof jabberwerx.MUCController)) {
                throw new TypeError("controller must be a jabberwerx.MUCController.");
            }
            this.controller = controller;
            this.muc = jabberwerx.JID.asJID(muc);
            this.applyEvent("actionComplete");
        },
        destroy: function () {
            this._super();
        },
        createDOM: function (doc) {
            var div = jabberwerx.$("<div/>", doc).addClass("jabberwerx muc_search_view");
            jabberwerx.$("<div/>").addClass("muc_search_criteria").appendTo(div);
            jabberwerx.$("<div/>").addClass("muc_search_error").appendTo(div);
            var buttons = jabberwerx.$("<div/>").addClass("muc_search_buttons").appendTo(div);
            jabberwerx.$("<input type='button'/>").addClass("muc_search_button_search").attr("value", jabberwerx._("Search")).attr("disabled", "disabled").click(this.invocation("_search")).appendTo(buttons);
            jabberwerx.$("<input type='button'/>").addClass("muc_search_button_join").attr("value", jabberwerx._("Join")).click(this.invocation("_join")).attr("disabled", "disabled").appendTo(buttons);
            jabberwerx.$("<input type='button'/>").addClass("muc_search_button_cancel").attr("value", jabberwerx._("Cancel")).click(this.invocation("_cancel")).appendTo(buttons);
            jabberwerx.$("<div/>").addClass("muc_search_results").appendTo(div);
            this.hide();
            this.controller.startSearch(this.muc, this.invocation('_handleSearchCriteria'));
            return div[0];
        },
        _handleSearchCriteria: function (form, error) {
            if (form) {
                var formView = new jabberwerx.ui.XDataFormView(form);
                var searchCriteriaDiv = jabberwerx.$(".muc_search_criteria", this.jq);
                formView.render().appendTo(searchCriteriaDiv);
                formView.dimensions({
                    width: this.jq.width(),
                    height: searchCriteriaDiv.height()
                });
                this.jq.find(".muc_search_button_search").removeAttr("disabled");
            } else {
                jabberwerx.$(".muc_search_button_search", this.jq).attr("disabled", "disabled");
                this._showError(error);
            }
            this.show();
        },
        _handleConfigSubmit: function (form, error) {
            if (form) {
                var formView = new jabberwerx.ui.XDataFormView(form);
                var that = this;
                formView.event("xdataItemSelected").bind(function (evt) {
                    that.jq.find(".muc_search_button_join").removeAttr("disabled");
                    var resultTable = that.jq.find(".muc_search_results table.result_table");
                    resultTable.find("tr.selected").removeClass("selected");
                    that._selectedItem = evt.data.selected;
                    resultTable.find("tr#" + evt.data.selected._guid).addClass("selected");
                });
                var searchResultsDiv = jabberwerx.$(".muc_search_results", this.jq);
                searchResultsDiv.empty();
                this.update();
                var dim = {
                    width: searchResultsDiv.width(),
                    height: searchResultsDiv.height()
                };
                formView.render().appendTo(searchResultsDiv);
                formView.dimensions(dim);
            } else {
                this._showError(error);
            }
        },
        update: function () {
            var retval = this._super();
            if (retval) {
                var criteria = jabberwerx.$(".muc_search_criteria", this.jq);
                criteria.height(this._criteriaViewSize);
                criteria.width(this.jq.width() - (this.jq.outerWidth(true) - this.jq.width()));
                var height = this.jq.get(0).clientHeight -
                    jabberwerx.$(".muc_search_criteria").outerHeight(true) -
                    jabberwerx.$(".muc_search_buttons").outerHeight(true) -
                    (this.jq.outerHeight(true) - this.jq.height());
                jabberwerx.util.debug.log("search results height: " + height);
                var results = jabberwerx.$(".muc_search_results", this.jq);
                results.height(height);
                results.width(this.jq.width() - (this.jq.outerWidth(true) - this.jq.width()));
            }
            return retval;
        },
        getCriteriaViewSize: function () {
            return _criteriaViewSize;
        },
        setCriteriaViewSize: function (size) {
            this._criteriaViewSize = size;
        },
        show: function () {
            if (this.jq) {
                this.jq.show();
            }
        },
        hide: function () {
            if (this.jq) {
                this.jq.hide();
            }
        },
        _search: function () {
            jabberwerx.$(".muc_search_error", this.jq).empty();
            var form_view = jabberwerx.$("div.muc_search_criteria .xdata_form_view", this.jq).get(0).jw_view;
            var form = null;
            if (form_view) {
                try {
                    form = form_view.submit();
                } catch (e) {
                    this._showError(e);
                    return;
                }
            }
            this.controller.submitSearch(this.muc, form, this.invocation('_handleConfigSubmit'));
        },
        _join: function () {
            var room = this.controller.room(this._selectedItem.getFieldByVar("jid").getValues()[0]);
            var action = {
                action: jabberwerx.ui.MUCSearchView.ACTION_SUBMITTED,
                submitted: room
            };
            this.event("actionComplete").trigger(action);
        },
        _cancel: function () {
            this.destroy();
        },
        _showError: function (error) {
            var msg;
            if (error instanceof jabberwerx.Stanza.ErrorInfo) {
                msg = jabberwerx.errorReporter.getMessage(error.getNode());
                if (!msg) {
                    msg = error.getNode().xml;
                }
            } else if (error instanceof TypeError) {
                msg = error.message;
            } else {
                msg = error;
            }
            jabberwerx.$(".muc_search_error", this.jq).text(msg);
            if (!this._error) {
                var height = jabberwerx.$(".muc_search_criteria", this.jq).height() -
                    jabberwerx.$(".muc_search_error", this.jq).height();
                jabberwerx.$(".muc_search_criteria", this.jq).height(height);
                if ((jabberwerx.$(".xdata_form_view", this.jq).get(0) && jabberwerx.$(".xdata_form_view", this.jq).get(0).jw_view)) {
                    jabberwerx.$(".xdata_form_view", this.jq).get(0).jw_view.height(height);
                }
            }
            this._error = true;
        },
        controller: null,
        muc: null,
        _criteriaViewSize: 150,
        _error: false,
        _selectedItem: null
    }, 'jabberwerx.ui.MUCSearchView');
    jabberwerx.ui.MUCSearchView.ACTION_SUBMITTED = "submitted";
})(jabberwerx);
/*build/dist/CAXL-release-2014.04.10787/src/views/MUCConfigView.js*/
;
(function (jabberwerx) {
    jabberwerx.ui.MUCConfigView = jabberwerx.ui.JWView.extend({
        init: function (mucRoom) {
            this._super();
            if (!(mucRoom && mucRoom instanceof jabberwerx.MUCRoom)) {
                throw new TypeError("mucRoom must be a MucRoom");
            }
            this._initialized = false;
            this._error = false;
            this.room = mucRoom;
            this.room.event("roomExited").bind(this.invocation("_handleRoomDestroyed"));
            this.room.fetchConfig(this.invocation('_handleConfigForm'));
        },
        destroy: function () {
            this.room.event("roomExited").unbind(this.invocation("_handleRoomDestroyed"));
            this._super();
        },
        height: function (h, noupdate) {
            var result = this._super(h, true);
            if (h !== undefined && this.jq) {
                var height = this.jq.get(0).clientHeight -
                    (this.jq.find(".muc_config_buttons").outerHeight(true) +
                        this.jq.find(".muc_config_error").outerHeight(true));
                this.jq.find(".muc_config_form").height(height);
                if (!noupdate) {
                    this.update();
                }
            }
        },
        createDOM: function (doc) {
            var div = jabberwerx.$("<div/>", doc).addClass("jabberwerx muc_config_view");
            var config = jabberwerx.$("<div/>").addClass("muc_config_form").appendTo(div);
            var error = jabberwerx.$("<div>&nbsp;</div>").addClass("muc_config_error").appendTo(div);
            var buttons = jabberwerx.$("<div/>").addClass("muc_config_buttons").appendTo(div);
            var submit = jabberwerx.$("<input type='button'/>").addClass("muc_config_button_submit").attr("value", jabberwerx._("Submit")).click(this.invocation("submit")).appendTo(buttons);
            var cancel = jabberwerx.$("<input type='button'/>").addClass("muc_config_button_cancel").attr("value", jabberwerx._("Cancel")).click(this.invocation("cancel")).appendTo(buttons);
            this.hide();
            return div[0];
        },
        _handleConfigForm: function (form, error) {
            if (form) {
                this._initialized = true;
                if (!form.getTitle()) {
                    form.setTitle("Configure " + this.room.getDisplayName());
                }
                var formView = new jabberwerx.ui.XDataFormView(form);
                formView.render().appendTo(jabberwerx.$(".muc_config_form", this.jq));
                this.dimensions(this.dimensions());
            } else {
                jabberwerx.$(".muc_config_button_submit", this.jq).attr("disabled", "disabled");
                this._showError(error);
            }
            this.show();
        },
        _handleConfigSubmit: function (error) {
            if (error) {
                this._showError(error);
            } else {
                this.destroy();
            }
        },
        _handleRoomDestroyed: function (evt) {
            this.destroy();
        },
        update: function () {
            var retval = this._super();
            if (retval) {
                this.jq.find(".muc_config_form .xdata_form_view").each(function () {
                    if (this.jw_view) {
                        this.jw_view.update();
                    }
                });
            }
            return retval;
        },
        show: function () {
            if (this.jq) {
                this.jq.show();
            }
        },
        hide: function () {
            if (this.jq) {
                this.jq.hide();
            }
        },
        submit: function () {
            if (this._initialized) {
                var form_view = jabberwerx.$(".xdata_form_view", this.jq).get(0).jw_view;
                var form = null;
                if (form_view) {
                    try {
                        form = form_view.submit();
                    } catch (e) {
                        this._showError(e);
                        return;
                    }
                }
                this.room.applyConfig(form, this.invocation('_handleConfigSubmit'));
            } else {
                this.destroy();
            }
        },
        cancel: function () {
            if (this._initialized) {
                var form_view = jabberwerx.$(".xdata_form_view", this.jq).get(0).jw_view;
                if (form_view) {
                    var form = form_view.cancel();
                    this.room.applyConfig(form, this.invocation('_handleConfigSubmit'));
                } else {
                    this.destroy();
                }
            } else {
                this.destroy();
            }
        },
        _showError: function (error) {
            var msg;
            if (error instanceof jabberwerx.Stanza.ErrorInfo) {
                msg = jabberwerx.errorReporter.getMessage(error.getNode());
                if (!msg) {
                    msg = error.getNode().xml;
                }
            } else if (error instanceof TypeError) {
                msg = error.message;
            } else {
                msg = error;
            }
            jabberwerx.$(".muc_config_error", this.jq).text(msg);
            if (!this._error) {
                var height = jabberwerx.$(".muc_config_form", this.jq).height() -
                    jabberwerx.$(".muc_config_error", this.jq).height();
                jabberwerx.$(".muc_config_form", this.jq).height(height);
                if ((jabberwerx.$(".xdata_form_view", this.jq).get(0) && jabberwerx.$(".xdata_form_view", this.jq).get(0).jw_view)) {
                    jabberwerx.$(".xdata_form_view", this.jq).get(0).jw_view.height(height);
                }
            }
            this._error = true;
        },
        room: null,
        _initialized: false,
        _error: false
    }, 'jabberwerx.ui.MUCConfigView');
})(jabberwerx);