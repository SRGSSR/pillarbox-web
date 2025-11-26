/*
 * tagContainer Generator v100.1
 * Copyright Commanders Act
 * https://www.commandersact.com/fr/
 * Generated: 2025-11-26 11:59:51 Europe/Paris
 * ---
 * Version	: 20.06
 * IDTC 	: 59
 * IDS		: 3666
 */

if(typeof tC == 'undefined'){
    if (typeof document.domain == 'undefined' ||typeof document.referrer == 'undefined')
        document = window.document; // eslint-disable-line no-global-assign, no-implicit-globals

    /*
    if (typeof console == 'undefined' || typeof console.log == 'undefined')
        var console = {
            log        : function() {},
            error    : function() {},
            warn    : function() {}
        };
     */


    (function(window, undefined) {
        var
        roottC,
        readyList,
        document         = window.document,
        location         = window.location,
        navigator         = window.navigator,
        _tC             = window.tC,
        _$                 = window.$,
        core_push         = Array.prototype.push,
        core_slice         = Array.prototype.slice,
        core_indexOf     = Array.prototype.indexOf,
        core_toString     = Object.prototype.toString,
        core_hasOwn     = Object.prototype.hasOwnProperty,
        core_trim         = String.prototype.trim,
        tC = function(selector, context) {
            return new tC.fn.init(selector, context, roottC);
        },
        core_pnum        = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
        core_rnotwhite    = /\S/,
        core_rspace        = /\s+/,
        rtrim            = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        rquickExpr        = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
        rsingleTag        = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        rvalidchars        = /^[\],:{}\s]*$/,
        rvalidbraces    = /(?:^|:|,)(?:\s*\[)+/g,
        rvalidescape    = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        rvalidtokens    = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
        rmsPrefix        = /^-ms-/,
        rdashAlpha        = /-([\da-z])/gi, fcamelCase = function(all, letter) {
            return (letter + "").toUpperCase();
        },
        class2type = {};

        tC.fn = tC.prototype = {
            constructor : tC,
            init : function(selector, context, roottC) {
                var match, elem, ret, doc;
                if (!selector) {
                    return this;
                }
                if (selector.nodeType) {
                    this.context = this[0] = selector;
                    this.length = 1;
                    return this;
                }
                if ( typeof selector === "string") {
                    if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {
                        match = [null, selector, null];
                    } else {
                        match = rquickExpr.exec(selector);
                    }
                    if (match && (match[1] || !context)) {
                        if (match[1]) {
                            context        = context instanceof tC ? context[0] : context;
                            doc            = (context && context.nodeType ? context.ownerDocument || context : document);
                            selector    = tC.parseHTML(match[1], doc, true);
                            if (rsingleTag.test(match[1]) && tC.isPlainObject(context)) {
                                this.attr.call(selector, context, true);
                            }
                            return tC.merge(this, selector);
                        } else {
                            elem = document.getElementById(match[2]);
                            if (elem && elem.parentNode) {
                                if (elem.id !== match[2]) {
                                    return roottC.find(selector);
                                }
                                this.length = 1;
                                this[0] = elem;
                            }
                            this.context = document;
                            this.selector = selector;
                            return this;
                        }
                    } else if (!context || context.tC) {
                        return (context || roottC).find(selector);
                    } else {
                        return this.constructor(context).find(selector);
                    }
                } else if (tC.isFunction(selector)) {
                    return roottC.ready(selector);
                }
                if (selector.selector !== undefined) {
                    this.selector = selector.selector;
                    this.context = selector.context;
                }
                return tC.makeArray(selector, this);
            },
            each : function(callback, args) {
                return tC.each(this, callback, args);
            },
            ready : function(fn) {
                // Add the callback
                //tC.ready.promise().done(fn);
                //CORRECTION SF/DP ... A VALIDER PAR MG
                tC.ready.promise(fn);
                return this;
            }
        };

        tC.fn.init.prototype = tC.fn;
        tC.extend = tC.fn.extend = function() {
            var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
            if ( typeof target === "boolean") {
                deep = target;
                target = arguments[1] || {};
                i = 2;
            }
            if ( typeof target !== "object" && !tC.isFunction(target)) {
                target = {};
            }
            if (length === i) {
                target = this; --i;
            }
            for (; i < length; i++) {
                if (( options = arguments[i]) != null) {
                    for (name in options) {
                        src = target[name];
                        copy = options[name];
                        if (target === copy) {
                            continue;
                        }
                        if (deep && copy && (tC.isPlainObject(copy) || ( copyIsArray = tC.isArray(copy)))) {
                            if (copyIsArray) {
                                copyIsArray = false;
                                clone = src && tC.isArray(src) ? src : [];
                            } else {
                                clone = src && tC.isPlainObject(src) ? src : {};
                            }
                            target[name] = tC.extend(deep, clone, copy);
                        } else if (copy !== undefined) {
                            target[name] = copy;
                        }
                    }
                }
            }
            return target;
        };

        tC.extend({
            ssl : "https://manager.",
            randOrd : function(){
                return (Math.round(Math.random())-0.5);
            },
            nodeNames : "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
                "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
            rnocache : /<(?:script|object|embed|option|style)/i,
            rnoshimcache : new RegExp("<(?:" + tC.nodeNames + ")[\\s/>]", "i"),
            rchecked : /checked\s*(?:[^=]|=\s*.checked.)/i,
            containersLaunched  : {}
        });

        tC.extend({
            inArray: function( elem, arr, i ) {
                var len,
                    core_indexOf     = Array.prototype.indexOf;

                if ( arr ) {
                    if ( core_indexOf ) {
                        return core_indexOf.call( arr, elem, i );
                    }

                    len = arr.length;
                    i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

                    for ( ; i < len; i++ ) {
                        if ( i in arr && arr[ i ] === elem ) {
                            return i;
                        }
                    }
                }
                return -1;
            },
            isFunction : function(obj) {
                return tC.type(obj) === "function";
            },
            isArray : Array.isArray || function(obj) {
                return tC.type(obj) === "array";
            },
            isWindow : function(obj) {
                return obj != null && obj == obj.window;
            },
            isNumeric : function(obj) {
                return !isNaN(parseFloat(obj)) && isFinite(obj);
            },
            type : function(obj) {
                return obj == null ? String(obj) : class2type[core_toString.call(obj)] || "object";
            },
            each : function(obj, callback, args) {
                var name, i = 0, length = obj.length, isObj = length === undefined || tC.isFunction(obj);
                if (args) {
                    if (isObj) {
                        for (name in obj) {
                            if (callback.apply(obj[name], args) === false) {
                                break;
                            }
                        }
                    } else {
                        for (; i < length; ) {
                            if (callback.apply(obj[i++], args) === false) {
                                break;
                            }
                        }
                    }
                } else {
                    if (isObj) {
                        for (name in obj) {
                            if (callback.call(obj[name], name, obj[name]) === false) {
                                break;
                            }
                        }
                    } else {
                        for (; i < length; ) {
                            if (callback.call(obj[i], i, obj[i++]) === false) {
                                break;
                            }
                        }
                    }
                }
                return obj;
            },
            log : function(v, t) {
                try {
                    if(tC.getCookie('tCdebugLib') && console) console[t ? t : 'log'](v); // eslint-disable-line no-console
                }catch(e) {}
            }
        });

        tC.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
            class2type["[object " + name + "]"] = name.toLowerCase();
        });

        roottC = tC(document);
        var optionsCache = {};

        function createOptions(options) {
            var object = optionsCache[options] = {};
            tC.each(options.split(core_rspace), function(_, flag) {
                object[flag] = true;
            });
            return object;
        }

        tC.buildFragment = function( args, context, scripts ) {
            var fragment, cacheable, cachehit,
                first = args[ 0 ];

            // Set context from what may come in as undefined or a jQuery collection or a node
            // Updated to fix #12266 where accessing context[0] could throw an exception in IE9/10 &
            // also doubles as fix for #8950 where plain objects caused createDocumentFragment exception
            context = context || document;
            context = !context.nodeType && context[0] || context;
            context = context.ownerDocument || context;

            // Only cache "small" (1/2 KB) HTML strings that are associated with the main document
            // Cloning options loses the selected state, so don't cache them
            // IE 6 doesn't like it when you put <object> or <embed> elements in a fragment
            // Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache
            // Lastly, IE6,7,8 will not correctly reuse cached fragments that were created from unknown elems #10501
            if ( args.length === 1 && typeof first === "string" && first.length < 512 && context === document &&
                first.charAt(0) === "<" && !tC.rnocache.test( first ) &&
                (tC.support.checkClone || !tC.rchecked.test( first )) &&
                (tC.support.html5Clone || !tC.rnoshimcache.test( first )) ) {

                // Mark cacheable and look for a hit
                cacheable = true;
                fragment = jQuery.fragments[ first ];
                cachehit = fragment !== undefined;
            }

            if ( !fragment ) {
                fragment = context.createDocumentFragment();
                tC.clean( args, context, fragment, scripts );

                // Update the cache, but only store false
                // unless this is a second parsing of the same content
                if ( cacheable ) {
                    tC.fragments[ first ] = cachehit && fragment;
                }
            }

            return { fragment: fragment, cacheable: cacheable };
        };

        window.tC = tC;
    })(window);

    /*NON utilisée - SF/MG 17/12/2013
    function createSafeFragment( document ) {
        var list = nodeNames.split( "|" ),
        safeFrag = document.createDocumentFragment();

        if ( safeFrag.createElement ) {
            while ( list.length ) {
                safeFrag.createElement(
                    list.pop()
                );
            }
        }
        return safeFrag;
    }*/
}
(function() {
    if (!tC.maindomain) {
        var hostname = location.hostname;
        var tb = hostname.split('.');
        // eslint-disable-next-line no-useless-escape
        var ipregexp = '^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$';
        //if local domain without extension or domain is one ip
        if(
            tb.length  < 2 || hostname.match(ipregexp)
        ){
            tC.maindomain = hostname;
        //else it's one other domain
        }else{
            tC.maindomain = tb[tb.length - 2] + '.' + tb[tb.length - 1];
        }
    }

    var currentContainer = {
        id_container           : String(59),
        id_site                : String(3666),
        frequency              : String(1000),
        containerVersion       : String(20.06),
        generatorVersion       : String('100.1'),
        containerStart         : Date.now(),
        sourceKey              : String('40b13c0d-80e8-4805-83fe-ade8adaa2917'),
        defaultCdnDomain       : String('cdn.trustcommander.net'),
    };

    tC.config = tC.config || {};
    tC.extend({
        internalvars           : typeof tC.internalvars !== 'undefined' ? tC.internalvars : {},
        internalFunctions      : typeof tC.internalFunctions !== 'undefined' ? tC.internalFunctions : {},
        privacyVersion         : tC.privacyVersion || '',
        id_container           : currentContainer.id_container,
        id_site                : currentContainer.id_site,
        containerVersion       : currentContainer.containerVersion,
        generatorVersion       : currentContainer.generatorVersion,
        defaultCdnDomain       : currentContainer.defaultCdnDomain,
        dedup_done             : typeof tC.dedup_done !== 'undefined' ? tC.dedup_done : false,
        // Unique timestamp for first container loaded
        containerStart         : tC.containerStart || currentContainer.containerStart,
        config                 : tC.config,
    });

    var internalvarsSite = {};
    internalvarsSite['internalvars_' + currentContainer.id_site] = typeof tC['internalvars_' + currentContainer.id_site] !== 'undefined' ? tC['internalvars_' + currentContainer.id_site] : {};
    tC.extend(internalvarsSite);

    window['tC_' + currentContainer.id_site + '_' + currentContainer.id_container] = currentContainer;

    tC.extend({
        launchTag           : function (id, label, template, idSite, idContainer, idTrigger) {
            if(typeof idTrigger === 'undefined'){
                idTrigger = 0;
            }

            tC.array_launched_tags.push(label);
            tC.array_launched_tags_keys.push(id);

            tC.containersLaunched[idSite][idContainer].t.push({
                id      : id,
                label   : label,
                idTpl   : template
            });

            window.top.postMessage('TC.EX:{"id":"'+id+'","idc":"'+idContainer+'","idt":"'+template+'","ids":"'+idSite+'","lb":"'+label.replace(/"/g, '\\"')+'","idtr":"'+idTrigger+'"}', '*');

        }
    });

    if (typeof tC.containersLaunched === 'undefined') {
        tC.containersLaunched = {};
    }

    if (typeof tC.containersLaunched[currentContainer.id_site] === 'undefined') {
        tC.containersLaunched[currentContainer.id_site] = {};
    }

    tC.containersLaunched[currentContainer.id_site][currentContainer.id_container] = {v:currentContainer.containerVersion, t:[], g:currentContainer.generatorVersion};

    /*extends*/
    
tC.coreReadyStandalone = true;
if (tC.isDOMReady) {
    tC.coreReadyStandalone = false;
}

tC.domReady = tC.domReady || false;

tC.isDOMReady = tC.isDOMReady || function() {
    if (document.readyState === 'complete' || document.readyState === 'loaded')
        return true;
    if (document.readyState !== 'interactive')
        return false;
    if (!document.documentElement.doScroll)
        return true;
    try {
        document.documentElement.doScroll('left');
        return true;
    } catch (e) {
        return false;
    }
};

tC.waitingOnDomReadyCallBacks = tC.waitingOnDomReadyCallBacks || [];

tC.excuteOnDomReadyCallBacks = tC.excuteOnDomReadyCallBacks || function() {
    for (var i = 0; i < tC.waitingOnDomReadyCallBacks.length; i++) {
        tC.waitingOnDomReadyCallBacks[i]();
    }
    tC.waitingOnDomReadyCallBacks = [];
};

tC.onDomReady = tC.onDomReady || function(callback) {

    if(this.domReady){
        callback();
        return;
    }

    tC.waitingOnDomReadyCallBacks.push(callback);
    var browserTypeSet = false;
    /* Mozilla, Chrome, Opera */
    if (document.addEventListener) {
        browserTypeSet = true;
        document.addEventListener('DOMContentLoaded', function() {
            document.removeEventListener('DOMContentLoaded', arguments.callee, false);
            tC.excuteOnDomReadyCallBacks();
        }, false);
    }
    // If IE event model is used
    else if (document.attachEvent) {
        browserTypeSet = true;
        // ensure firing before onload,
        // maybe late but safe also for iframes
        document.attachEvent('onreadystatechange', function() {
            if (document.readyState === 'complete') {
                document.detachEvent('onreadystatechange', arguments.callee);
                tC.excuteOnDomReadyCallBacks();
            }
        });

        // If IE and not an iframe
        // continually check to see if the document is ready
        if (document.documentElement.doScroll && window === window.top)
            (function() {
                if (tC.domReady)
                    return;

                try {
                    // If IE is used, use the trick by Diego Perini
                    // http://javascript.nwbox.com/IEContentLoaded/
                    document.documentElement.doScroll('left');
                } catch( error ) {
                    setTimeout(arguments.callee, 0);
                    return;
                }

                // and execute any waiting functions
                tC.excuteOnDomReadyCallBacks();
            })();
    }
    /* Other web browsers */
    if (!browserTypeSet) {
        window.onload = tC.excuteOnDomReadyCallBacks;
    }
};

if (tC.coreReadyStandalone === true) {
    if(tC.isDOMReady()){
        tC.domReady = true;
    }else{
        tC.onDomReady(function() {
            tC.domReady = true;
        });
    }
}

(function() {
    'use strict';
    tC.cactUtils = {};

    var defaultCallback = function() {};
    tC.cactUtils.formatArgumentsV2 = function(args) {
        var message = {};
        var nextArg = 0;

        if (typeof args[nextArg] === 'string') {
            message.event = args[nextArg++];
        }
        if (typeof args[nextArg] === 'object') {
            message.properties = Object.assign({}, args[nextArg++]);
        }
        if (typeof args[nextArg] === 'object') {
            message.config = Object.assign({}, args[nextArg++]);
        }
        if (typeof args[nextArg] === 'function') {
            message.callback = args[nextArg++];
        }
        message.properties = message.properties || {};
        message.config = message.config || {};
        message.callback = message.callback || defaultCallback;
        return message;
    };
})();

(function() {
    'use strict';

    var tC = window.tC;
    var apiVersion = 2;

    if (tC == null || (tC.cact && tC.cactInfo && tC.cactInfo.apiVersion >= apiVersion)) {
        return;
    }

    var isArrayLike = function(message) {
        return message.toString() === '[object Arguments]' || Array.isArray(message);
    };

    var formatOldQueue = function(queue) {
        return queue.map(function(message) {
            if (isArrayLike(message)) {
                return message;
            }

            var args = JSON.parse(JSON.stringify(message));
            var _done = args._done;
            delete args.event;
            delete args.callback;
            delete args._done;

            var newMessage;
            if (Object.keys(args).length !== 0) {
                newMessage = [ message.event, args, message.callback ];
            } else {
                newMessage = [ message.event, message.callback ];
            }
            if (_done) {
                newMessage._tc_meta = { done: _done };
            }
            return newMessage;
        });
    };

    window.caReady = window.caReady || [];
    window.cact = window.cact || function() {
        window.caReady.push(arguments);
    };

    if (tC.cact) { // there is a version to override
        window.caReady = formatOldQueue(window.caReady); // this will also remove the push override
    }

    tC.cact = tC.cact || {}; // namespace for container apis
    tC.cactInfo = { apiVersion: apiVersion };

    var processEvent = function(message) {
        message._tc_meta = message._tc_meta || {};
        var command = message[0];
        if (message._tc_meta.done || tC.cact[command] == null) {
            return;
        }

        // preserve from infinite recursion
        message._tc_meta = message._tc_meta || {};
        message._tc_meta.done = true;

        var version = tC.cact[command]._tc_version;
        message = Array.prototype.slice.call(message, version == null ? 0 : 1); // from version 2, strip command
        if (version == null) {
            var formatedMessage = formatArgumentsV1(message);
            tC.cact[command](formatedMessage, formatedMessage.callback);
        } else {
            tC.cact[command].apply(tC.cact, message);
        }
    };

    var defaultCallback = function() {};
    var formatArgumentsV1 = function(args) {
        var message;
        var callback;
        if (typeof args[1] === 'object') {
            message = args[1];
            callback = args[2];
        } else if (typeof args[1] === 'function') {
            message = {};
            callback = args[1];
        } else {
            message = {};
        }
        message.event = args[0];
        message.callback = callback || defaultCallback;
        return message;
    };

    var processAllEvents = function() {
        for (var i = 0; i < window.caReady.length; ++i) {
            processEvent(window.caReady[i]);
        }
        var message = tC.cactUtils.formatArgumentsV2(arguments);
        if (message && message.callback) message.callback(); // mostly for test purposes on the "exec" command
    };
    tC.cact.exec = processAllEvents;

    var pushEvent = function(message) {
        Array.prototype.push.call(window.caReady, message);
        processEvent(message);
    };
    Object.defineProperty(window.caReady, 'push', { configurable: true, value: pushEvent });

    tC.cact.exec();
})();

(function () {
    'use strict';

    tC.config = tC.config || {};
    tC.cact.config = function () {
        var args = tC.cactUtils.formatArgumentsV2(arguments);
        var callback = args.callback;

        Object.assign(tC.config, args.properties);
        callback();
    };

    tC.cact.config._tc_version = 2;

})();

(function () {
    'use strict';

    var getElement = function(eventOrElement) {
        var element;
        if (eventOrElement instanceof Event) {
            element = eventOrElement.target;
        } else {
            element = eventOrElement;
        }

        return element instanceof Element ? element : null;
    };

    tC.cact.trigger = function () {
        var args = tC.cactUtils.formatArgumentsV2(arguments);
        var event = args.event;
        var properties = Object.assign({}, args.properties);
        var config = args.config;
        var callback = args.callback;

        if (typeof event !== 'string' || event === '') {
            return;
        }
        if (tC.trigger) {
            var eventTarget = getElement(properties.from);
            if (eventTarget) {
                config.eventTarget = eventTarget;
                delete properties.from;
            }
            tC.trigger({
                event: event,
                properties: properties,
                config: config,
            });
        }
        callback();
        return tC.uniqueEventIndex;
    };
    tC.cact.trigger._tc_version = 2;

    tC.cact.setProperty = function (key, value) {
        if (!tC.set || typeof key !== 'string') {
            return;
        }
        tC.config = tC.config || {};
        tC.config.eventData = tC.config.eventData || {};
        tC.set(tC.config.eventData, key, value);
    };
    tC.cact.setProperty._tc_version = 2;

    tC.cact.dispatchEvent = function() {
        var args = tC.cactUtils.formatArgumentsV2(arguments);
        var event = args.event;
        var properties = Object.assign({}, args.properties);
        var config = Object.assign({}, args.config);
        var callback = args.callback;

        config.eventData = properties;
        var eventTarget = getElement(properties.from);
        if (eventTarget) {
            config.eventTarget = eventTarget;
            delete properties.from;
        }
        tC.eventTarget.dispatchEvent(event, config);
        callback();
    };
    tC.cact.dispatchEvent._tc_version = 2;
    tC.cact.emit = tC.cact.dispatchEvent; // alias for dispatchEvent

    tC.cact.addEventListener = function() {
        var args = tC.cactUtils.formatArgumentsV2(arguments);
        var event = args.event;
        var callback = args.callback;

        return tC.eventTarget.addEventListener(event, callback);
    };
    tC.cact.addEventListener._tc_version = 2;
    tC.cact.on = tC.cact.addEventListener; // alias for addEventListener

    tC.cact.once = function() {
        var args = tC.cactUtils.formatArgumentsV2(arguments);
        var event = args.event;
        var callback = args.callback;

        return tC.eventTarget.once(event, callback);
    };
    tC.cact.once._tc_version = 2;

    tC.cact.removeEventListener = function() {
        var args = tC.cactUtils.formatArgumentsV2(arguments);
        var event = args.event;
        var callback = args.callback;

        return tC.eventTarget.removeEventListener(event, callback);
    };
    tC.cact.removeEventListener._tc_version = 2;
    tC.cact.off = tC.cact.removeEventListener; // alias for removeEventListener
})();

/*
 *
 */
tC.extend({
    isCurrentVersion:function(){
        if (Boolean(tC.bypassBookmarklet) === true) {
            return true;
        }
        /*
         * return true :
         * - if bm is disable,
         * - if bm is enable but the container is loaded by the bookmarklet
         * else return false
         */
        var v = tC.getCookie('tc_mode_test');
        var t = 'testModeIncludeReplaceThisByTrue' ;
        /*
         * info : 'testModeIncludeReplaceThisByTrue' is replaced by "true" by the test mode include script
         */
        return v !== '1' || (v === '1' && t === 'true');
    }
});



/*
 * Extension pixelTrack
 *
 * @vars
 */

tC.pixelTrack = tC.pixelTrack || {
    add : function(u, t) {
        u = u || 0;
        t = t || 'img';
        tC.onDomReady(function() {
            var d;
            if(t === 'iframe'){
                d = document.createElement(t);
                d.src = u;
                d.width = 1;
                d.height = 1;
                d.style.display = 'none';
                document.body.appendChild(d);
            }else{
                d = new Image();
                d.src = u;
            }
        });
    }
};

tC.setCookie = tC.setCookie || function(name, value, expires, path, domain, secure, sameSite) {
    if (!domain) {
        domain = tC.domain();
    }

    tC.config = tC.config || {};
    tC.cookieForceSameSite = tC.cookieForceSameSite || '';
    sameSite = sameSite || tC.config.cookieForceSameSite || tC.cookieForceSameSite;

    if (!tC.isSameSiteContext()) {
        sameSite = 'None'; // 'Lax' and 'Strict' will not work in cross-site context iframes
    }
    if (!sameSite) {
        sameSite = tC.isSubdomain(domain) ? 'Lax': 'None';
    }

    tC.cookieForceSecure = tC.cookieForceSecure != null ? tC.cookieForceSecure : '';// "first container wins"
    if (secure == null) {
        secure = tC.config.cookieForceSecure; // value from cact('config')
    }
    if (secure == null) {
        secure = tC.cookieForceSecure; // value manually set in customJS
    }
    secure = Boolean(Number(secure)); // double-cast to handle properly '0' value (0 as a string);

    if (sameSite.toLowerCase() === 'none') {// even if we want to force secure setting, SameSite=None must not be set withtout secure flag (or popular browsers may not set cookie)
        secure = true;
    }

    var today = new Date();
    today.setTime(today.getTime());
    if (expires)
        expires = expires * 1000 * 60 * 60 * 24;
    var expires_date = new Date(today.getTime() + (expires));

    var cookieString = name + '=' + tC.cookieEncode(value)
        + ((expires) ? ';expires=' + expires_date.toGMTString() : '' )
        + ((path) ? ';path=' + path : ';path=/' )
        + ((domain) ? ';domain=' + domain : '' )
        + ((secure) ? ';secure' : '' )
        + ';SameSite=' + sameSite;
    document.cookie = cookieString;
};

tC.cookieEncode = tC.cookieEncode || function (value) {
    var specialChars = {
        '!': '%21',
        "'": '%27',
        '(': '%28',
        ')': '%29',
        '~': '%7E',
    };
    var encoded = encodeURIComponent(value)
        .replace(/[!~'()]/g, function(x) {
            return specialChars[x];
        });
    return encoded;
};

tC.getCookie = tC.getCookie || function(key) {
    if (key == null) {
        return '';
    }
    var whitelist = '@$'.split('');
    var hasWhitelistChars = whitelist.some(function(c) {
        return key.indexOf(c) !== -1;
    });
    if (!hasWhitelistChars) {
        key = encodeURIComponent(key);
    } else {
        key = key.replace('$', '\\$');
    }
    var result = new RegExp('(?:^|; )' + key + '=([^;]*)').exec(document.cookie);
    if (result) {
        var decodedValue = '';
        try {
            decodedValue = decodeURIComponent(result[1]);
        } catch(e) {
            decodedValue = unescape(result[1]);
        }
        return decodedValue;
    }

    return '';
};

tC.cookieCheck = function(options) {
    options = options || {};
    var domain = options.domain ? ';domain=' + options.domain : '';
    var samesite = options.samesite ? ';samesite=' + options.samesite : '';
    var cookieName = 'tc_test_cookie';
    var cookieValue = Math.random().toString(36).substr(2, 9);

    var cookieSet;
    var cookieString =
        cookieName + '=' + cookieValue + ';expires=0;path=/;' + samesite + domain;
    document.cookie = cookieString;

    var match = new RegExp('(?:^|; )' + cookieName + '=([^;]*)').exec(document.cookie);
    if (match) match = match[1];
    cookieSet = match === cookieValue;
    if (cookieSet) {
        cookieString =
            cookieName + '=;expires=' + new Date(0).toUTCString() + ';path=/;' + samesite + domain;
        document.cookie = cookieString;
    }
    return cookieSet;
};

tC._samesite = tC._samesite || null;
tC.isSameSiteContext = tC.isSameSiteContext || function() {
    if (tC._samesite != null) {
        return tC._samesite;
    }
    if (tC.isCrossDomainContext()) {
        tC._samesite = false;
    } else {
        tC._samesite = tC.cookieCheck({ samesite: 'lax' });
    }
    return tC._samesite;
};

tC.isCookieEnabled = function () {
    // Quick test if browser has cookieEnabled host property
    if (navigator.cookieEnabled && window.navigator.userAgent.indexOf('MSIE') === -1) {
        return true;
    }
    return tC.cookieCheck();
};

tC.removeCookie = tC.removeCookie || function (name, domain) {
    this.setCookie(name, '', -1, '/', domain);
};

/*
 * Extension domain
 */

tC._domain = tC._domain || null;
tC.domain = tC.domain || function() {
    if (tC._domain != null) {
        return tC._domain;
    }

    var domainParts = (tC.tc_hdoc.domain || '').toLowerCase().split('.');
    var domainLength = domainParts.length;
    if (domainLength === 0) {
        return '';
    }

    var cookieCheck = false;
    var domain;
    for (var domainLevel = 2; !cookieCheck && domainLevel <= domainLength; ++domainLevel) {
        domain = '.' + domainParts.slice(domainLength - domainLevel, domainLength).join('.');
        cookieCheck = tC.cookieCheck({ domain: domain });
    }

    tC._domain = domain || '';
    return tC._domain;
};

tC.getDomainLevels = tC.getDomainLevels || function() {
    var splitted = (tC.tc_hdoc.domain || '').toLowerCase().split('.');
    var subdomains = splitted.map(function(level, index) {
        return '.' + splitted.slice(index).join('.');
    });
    subdomains.pop();
    subdomains.reverse();
    return subdomains;
};

tC.isSubdomain = tC.isSubdomain || function(domain) {
    if (domain && domain[0] === '.') {
        domain = domain.substr(1, domain.length - 1);
    }
    return new RegExp(domain + '$').test(tC.tc_hdoc.domain);
};

tC.isCrossDomainContext = tC.isCrossDomainContext || function() {
    try{
        window.top.document;
        return false;
    }catch(e){
        return true;
    }
};

tC.tc_hdoc = tC.tc_hdoc || false;
if (!tC.tc_hdoc) {
    // if iframe with different domain/alias => get domain of the iframe as fallback
    tC.tc_hdoc = tC.isCrossDomainContext() ? window.document : window.top.document;
}

tC.isTcDns = function(dns) {
    dns = dns || '';
    if (dns === '') {
        return false;
    }
    return dns.indexOf('.commander1.com') !== -1 || dns.indexOf('.tagcommander.com') !== -1;
};

tC.isCustomDns = function(dns) {
    dns = dns || '';
    if (dns === '') {
        return false;
    }
    return !tC.isTcDns(dns);
};

(function(){
    tC.getCdnDomainList = tC.getCdnDomainList || function() {
        return [] || [];
    };

    tC.getClientDnsList = tC.getClientDnsList || function() {
        return [] || [];
    };

    var getDomainMatcher = function(getFromCache, getDomainList) {
        return function() {
            var cachedDomain = getFromCache();
            if (cachedDomain) {
                return cachedDomain;
            }

            var domainLevels = tC.getDomainLevels().map(function (domain) {
                return new RegExp('^[\\w,\\d,\\-]*' + domain.replace('.', '\\.') + '$');
            });

            var domainList = getDomainList();
            var matchingDomain = domainList.find(function (dns) {
                return domainLevels.find(function (domainRegexp) {
                    return domainRegexp.test(dns);
                });
            });

            return matchingDomain;
        };
    };

    tC.getCachedClientCollectDns = function() {
        return tC.clientCollectDns;
    };

    tC.getCachedClientCdnDomain = function() {
        return tC.clientCdnDomain;
    };

    tC.getClientCollectDns = getDomainMatcher(tC.getCachedClientCollectDns, tC.getClientDnsList);
    tC.clientCollectDns = tC.getClientCollectDns();

    tC.getClientCdnDomain = getDomainMatcher(tC.getCachedClientCdnDomain, tC.getCdnDomainList);
    tC.clientCdnDomain = tC.getClientCdnDomain();

    tC.clientCampaignDns = tC.clientCampaignDns || 'redirect3666.tagcommander.com';
    tC.getClientCampaignDns = function() {
        return tC.clientCampaignDns;
    };

    tC.campaignForceCookieFirst = 0;

    tC.getCdnDomain = function(options) {
        var defaultDomain = options.defaultDomain || tC.defaultCdnDomain;
        var customDomain = window.tc_cdn_domain || tC.clientCdnDomain;

        return customDomain || defaultDomain;
    };

    tC.getPrivacyCdnDomain = function() {
        return tC.getCdnDomain({ defaultDomain: (tC.privacy || {}).defaultCdnDomain });
    };
})();

(function() {
    'use strict';

    var tC = window.tC;
    tC.eventTarget = tC.eventTarget || {
        _eventTarget: document.createElement('null'),
        addEventListener: function(type, listener, options) {
            this._eventTarget.addEventListener(type, listener, options);
        },
        once: function(type, listener, options) {
            this.addEventListener(type, listener, Object.assign({}, options, {once: true}));
        },
        removeEventListener: function(type, callback) {
            this._eventTarget.removeEventListener(type, callback);
        },
        createEvent: function(eventType, eventData) {
            var event;
            if (eventType instanceof Event && eventType.target == null) {
                event = eventType;
            } else if (typeof eventType === 'string' && eventType !== '*') {
                event = new Event(eventType);
            } else {
                return;
            }

            if (eventData == null || typeof eventData !== 'object') {
                eventData = {};
            }
            event.eventData = eventData;
            return event;
        },
        dispatchEvent: function(eventType, options) {
            options = options || {};
            var event = tC.eventTarget.createEvent(eventType, options.eventData);
            this._eventTarget.dispatchEvent(event);

            var broadcast = new Event('*');
            broadcast.originalEvent = event;
            this._eventTarget.dispatchEvent(broadcast);

            tC.eventTarget.callTagTrigger(event.type, options);
        },
        callTagTrigger: function(eventType, options) {
            if (options.skipTrigger === true) {
                return;
            }

            var event = tC.eventTarget.createEvent(eventType, options.eventData);

            var tagTrigger = options.tagTrigger;
            if (tagTrigger == null) {
                // ex: 'my-custom-event' -> 'my_custom_event' -> tC.event.my_custom_event
                tagTrigger = event.type.replace(/-/g, '_');
            }

            var target = options.eventTarget;
            var attributes = {};
            if (target && target.getAttributeNames) {
                target.getAttributeNames().forEach(function(attr) {
                    attributes[attr] = target[attr];
                });
            }
            Object.defineProperty(event, 'target', { writable: true, value: attributes });
            Object.defineProperty(event, 'target', { writable: false });

            if (tagTrigger != null && tC.event != null && typeof tC.event[tagTrigger] === 'function') {
                tC.event[tagTrigger](event, event.eventData);
            }
        },
        dispatchEventAsync: function(eventType, options) {
            options = Object.assign({}, options);
            var delay = 0;
            if (options.delay > 0) {
                delay = Number(options.delay);
                delete options.delay;
            }
            setTimeout(function() {
                tC.eventTarget.dispatchEvent(eventType, options);
            }, delay);
        },
    };
})();

// AI generated function, equivalent to lodash.set
tC.set = function (object, path, value) {
    if (!object || typeof object !== 'object') return object;

    // Convert path to an array if it is not already
    if (typeof path === 'string') {
        path = path.split('.').map(function(key) {
            return key.indexOf('[') > -1 ? key.replace(/\]/g, '').split('[') : key;
        }).reduce(function(acc, val) {
            return acc.concat(val);
        }, []);
    }

    var current = object;

    for (var i = 0; i < path.length; i++) {
        var key = path[i];

        // If we are at the last key, set the value
        if (i === path.length - 1) {
            current[key] = value;
        } else {
            // If the key doesn't exist or isn't an object, create an object or array
            if (!current[key] || typeof current[key] !== 'object') {
                current[key] = isNaN(Number(path[i + 1])) ? {} : [];
            }
            current = current[key];
        }
    }

    return object;
};


// https://stackoverflow.com/a/34749873
tC.deepMerge = function() {
    var isObject = function(item) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    };

    var sources = Array.from(arguments); // eslint-disable-line es/no-array-from
    var target = sources.shift();
    if (!sources.length) {
        return target;
    }
    var source = sources.shift();

    if (isObject(target) && isObject(source)) {
        var toAssign;
        for (var key in source) {
            if (isObject(source[key])) {
                if (!target[key]) {
                    toAssign = {};
                    toAssign[key] = {};
                    Object.assign(target, toAssign);
                }
                tC.deepMerge(target[key], source[key]);
            } else {
                toAssign = {};
                toAssign[key] = source[key];
                Object.assign(target, toAssign);
            }
        }
    }

    return tC.deepMerge.apply(tC, [target].concat(sources));
};

tC.xhr = tC.xhr || function (reqOptions) {
    var req = new XMLHttpRequest();
    if (!req) {
        return false;
    }
    req.open(reqOptions.method || 'GET', reqOptions.url);
    if (reqOptions.withCredentials) {
        req.withCredentials = true;
    }
    var data = reqOptions.data;
    if (reqOptions.json === true) {
        req.setRequestHeader('Content-Type', 'application/json');
        if (typeof data !== 'string') {
            try {
                data = JSON.stringify(data);
            } catch (e) {
                data = 'null';
            }
        }
    }
    if (reqOptions.headers) {
        Object.keys(reqOptions.headers).forEach(function(header) {
            req.setRequestHeader(header, reqOptions.headers[header]);
        });
    }
    var ajaxCallback = function () {
        if (req.readyState === XMLHttpRequest.DONE) {
            var callback = reqOptions[(req.status >= 200 && req.status < 300) ? 'done' : 'fail'];
            if (callback) {
                var response = req.response;
                if (reqOptions.json === true) {
                    try {
                        response = JSON.parse(response);
                    } catch (e) {
                        // nothing to do
                    }
                }
                callback(response, req.status);
            }
        }
    };
    req.onload = ajaxCallback;
    req.onerror = ajaxCallback;
    req.send(data);
};

(function() {
    'use strict';

    tC.getCrossDomainCookie = tC.getCrossDomainCookie || function(options, callback) {
        callback = callback || function() {};
        var siteId = options.siteId;
        var cookieName = options.name;
        var domain = options.domain;

        tC.xhr({
            url: 'https://' + domain + '/get-cookie?tc_s=' + siteId + '&name=' + cookieName,
            withCredentials: true,
            json: true,
            done: function(res) {
                var cookieValue = '';
                try {
                    cookieValue = res[cookieName] || '';
                } catch (err) {
                    // nothing to do
                }
                callback(cookieValue);
            },
            fail: function(err) {
                if (tC.log) {
                    tC.log('error occured retrieving cookie ' + cookieName, err);
                }
                callback('');
            },
        });
    };
})();

(function() {
    'use strict';

    var routes = {
        'cookie-serverside': {
            path: 'css',
            serverId: 'phoenix',
            defaultDomain: 'collect.commander1.com',
            siteQueryArg: 'tc_s',
            caidSync: false,
        },
        'dms': {
            path: 'dms',
            serverId: 'data',
            defaultDomain: 'engage.commander1.com',
            siteQueryArg: 'tc_s',
        },
        'events': {
            path: 'events',
            serverId: 'cdp',
            defaultDomain: 'collect.commander1.com',
            siteQueryArg: 'tc_s',
        },
        'measure-click-and-visit': {
            path: 'cs3',
            serverId: 'mix',
            defaultDomain: tC.clientCampaignDns || 'mix.commander1.com',
            syncDomain: 'collect.commander1.com',
            siteQueryArg: 'tcs',
        },
        'measure-visit': {
            path: 's3',
            serverId: 'mix',
            defaultDomain: tC.clientCampaignDns || 'mix.commander1.com',
            syncDomain: 'collect.commander1.com',
            siteQueryArg: 'tcs',
        },
        'privacy-consent': {
            path: 'privacy-consent',
            serverId: 'trust',
            defaultDomain: 'privacy.commander1.com',
            cookielessDomains: ['privacy.trustcommander.net'],
            siteQueryArg: 'site',
        },
    };

    var generateCaid = function() {
        var date = new Date();
        var year = date.getFullYear();
        var month = ('0' + (date.getMonth() + 1)).slice(-2);
        var day = ('0' + date.getDate()).slice(-2);
        var hours = ('0' + date.getHours()).slice(-2);
        var minutes = ('0' + date.getMinutes()).slice(-2);
        var seconds = ('0' + date.getSeconds()).slice(-2);
        var formattedDate = year + month + day + hours + minutes + seconds;
        return formattedDate + Math.floor((Math.random() * 12345678942) + 1);
    };

    var sendHit = function(url, data) {
        var useXhr = false;
        if (typeof navigator.sendBeacon !== 'function') {
            useXhr = true;
        } else if (!navigator.sendBeacon(url, data)) {
            useXhr = true;
        }
        if (useXhr) {
            tC.xhr({
                method: 'POST',
                json: true,
                url: url,
                data: data,
                withCredentials: true,
            });
        }
    };

    if (tC.track == null) {
        tC._trackVersion = 5;
    }
    tC.track = tC.track || function(options) {
        options = options || {};
        var siteId = options.siteId || tC.config.siteId || tC.id_site;

        var route = routes[options.route];
        if (route == null) {
            return null;
        }

        var eventData = JSON.stringify(options.body || {});

        var defaultDomain = '' || route.defaultDomain;
        var collectionDomain = options.domain || window.tC_collect_dns || tC.config.collectionDomain || defaultDomain;
        collectionDomain = collectionDomain.split('://').slice(-1)[0]; // remove protocol part
        if (collectionDomain[collectionDomain.length - 1] === '/') {
            collectionDomain = collectionDomain.slice(0, -1);
        }

        var isFirstParty = tC.isCustomDns(collectionDomain) && !(route.cookielessDomains || []).includes(collectionDomain);
        var isCookieless = options.isCookieless || (route.cookielessDomains || []).includes(collectionDomain);
        var queryParams = {};
        if (isCookieless) {
            queryParams.tc_do_not_track = isCookieless;
        }

        var byPassCookieExtension = 0;
        if (byPassCookieExtension) {
            queryParams.force_rewrite_cookie = byPassCookieExtension;
        }
        if (route.siteQueryArg && siteId) {
            queryParams[route.siteQueryArg] = siteId;
        }
        Object.assign(queryParams, options.queryParams);
        var queryString = Object.keys(queryParams).reduce(function(qs, key) {
            var value = queryParams[key];
            qs.push(key + '=' + value);
            return qs;
        }, []);
        queryString = queryString.join('&');
        if (queryString) {
            queryString = '?' + queryString;
        }

        var serverId = isFirstParty ? '/' + route.serverId : '';
        var collectionUrl = 'https://' + collectionDomain + serverId + '/' + route.path + queryString;

        var cookieName = '' || 'CAID';
        var cookieValue = tC.getCookie(cookieName);
        var caidSync = route.caidSync !== false;
        if (caidSync) {
            caidSync = tC.config.caidSync != null ? tC.config.caidSync : caidSync;
            caidSync = options.caidSync != null ? options.caidSync : caidSync;
        }
        var hasMissingCaid = isFirstParty && !isCookieless && !cookieValue;
        if (hasMissingCaid) {
            if (caidSync) {
                var syncDomain = '' || route.syncDomain || defaultDomain;
                tC.getCrossDomainCookie({ name: 'TCID', siteId: siteId, domain: syncDomain }, function(tcid) {
                    var caid = tcid;
                    if (!caid) {
                        caid = generateCaid();
                    }
                    tC.setCookie(cookieName, caid);
                    sendHit(collectionUrl, eventData);
                });
            } else {
                var caid = generateCaid();
                tC.setCookie(cookieName, caid);
                sendHit(collectionUrl, eventData);
            }
        } else {
            sendHit(collectionUrl, eventData);
        }
    };
})();

(function () {
    'use strict';

    tC.uniqueEventIndex = tC.uniqueEventIndex || 0;
    //keep last event in tC
    tC.triggeredEvents = tC.triggeredEvents || [];

    tC.config = tC.config || {};
    var containerSourceKey = '40b13c0d-80e8-4805-83fe-ade8adaa2917' || null;
    tC.config.collectionDomain = tC.config.collectionDomain || tC.clientCollectDns;

    var emailReg = /[a-z0-9-.+_-]+@[a-z0-9-]+(\.[a-z0-9-]+)*/i;
    var userLookingSearchParams = /(user|mail|pass(word|phrase)?|secret|((first|last)name))/i;
    var anonymize= function(text) {
        return (text || '').replace(emailReg, '*****');
    };
    var anonymizeUrl= function(url) {
        try {
            var safeUrl = new URL(url);
            safeUrl.pathname = anonymize(safeUrl.pathname);
            safeUrl.searchParams.forEach(function(paramValue, paramKey) {
                if (emailReg.test(paramValue)) {
                    return safeUrl.searchParams.set(paramKey, anonymize(paramValue));
                } else if (userLookingSearchParams.test(paramKey)) {
                    return safeUrl.searchParams.set(paramKey, '*****');
                }
            });
            return safeUrl.toString();
        } catch (e) {
            return url;
        }
    };

    tC.generateEventId = function() {
        var eventId = String(Date.now()).slice(2) + Math.round(Math.random() * 10000000000000);
        while (eventId.length < 24) {
            eventId = eventId + '0';
        }
        return eventId;
    };

    //Trigger API
    tC.trigger = function (options) {
        options = options || {};
        var event = options.event;
        var properties = Object.assign({}, options.properties);
        var config = options.config || {};
        var pageUrl = properties.url || anonymizeUrl(window.location.href);

        tC.uniqueEventIndex++;
        tC.uniqueEventId = tC.generateEventId();
        //default settings
        var queryParams = {};
        var sourceKey = config.sourceKey || tC.config.sourceKey || containerSourceKey;
        if (sourceKey) {
            queryParams.token = sourceKey;
        }

        var defaultEventData = tC.config.eventData;
        if (typeof defaultEventData === 'object' && tC.deepMerge) {
            properties = tC.deepMerge({}, defaultEventData, properties);
        }

        //add automatic data
        properties.user = properties.user || {};
        //get consents
        if (!properties.user.consent_categories) {
            var consentCategories = [];
            if ('privacy' in tC) {
                if ('getValidCategories' in tC.privacy) {
                    consentCategories = tC.privacy.getValidCategories();
                } else {
                    consentCategories = tC.privacy.getOptinCategories();
                }
            }
            //manage Trust v1 when consent categories are 'ALL'
            var privacyCookie = tC.getCookie(tC.privacy && tC.privacy.getCN() || 'TC_PRIVACY');
            if (/ALL/.test(privacyCookie)) {
                consentCategories = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
            }
            properties.user.consent_categories = consentCategories;
        }
        if (!properties.user.rejected_vendors) {
            var rejectedVendors = [];
            if (tC.privacy) {
                if (tC.privacy.checkOptoutAllVendors && tC.privacy.checkOptoutAllVendors()) {
                    rejectedVendors = 'ALL';
                } else if (tC.privacy.checkOptinAllVendors && !tC.privacy.checkOptinAllVendors()) {
                    rejectedVendors = tC.privacy.getOptoutVendors();
                }
            }
            properties.user.rejected_vendors = rejectedVendors;
        }
        if (properties.revenue) {
            properties.amount = properties.revenue;
        }
        properties.integrations = properties.integrations || {};
        //Facebook cookies
        // TODO: remove once it is handled properly on backend https://tagcommander.atlassian.net/browse/PTMS-6738
        properties.integrations.facebook = properties.integrations.facebook || {};
        properties.integrations.facebook.fbc = tC.getCookie('_fbc') || undefined; // eslint-disable-line no-undefined
        properties.integrations.facebook.fbp = tC.getCookie('_fbp') || undefined; // eslint-disable-line no-undefined
        properties.integrations.facebook.event_id = properties.integrations.facebook.event_id || tC.uniqueEventId;
        //specific automatic properties regarding the type of event
        switch (event) {
            case 'page_view':
                properties.title = document.title;
                properties.path = location.pathname;
                properties.url = pageUrl;
                if (document.referrer !== '') properties.referrer = document.referrer;
                properties.type = properties.type || (window.tc_vars || {}).env_template || 'other';
                properties.page_type = properties.page_type || (window.tc_vars || {}).env_template || 'other';
                break;
            case 'purchase':
                properties.status = properties.status || 'in_progress';
                properties.type = properties.type || 'online';
                break;
        }
        var timezone;
        try {
            timezone = window.Intl && window.Intl.DateTimeFormat().resolvedOptions().timeZone;
        } catch(e) {
            // browser doesn't have the feature => skip
        }
        var de = document.documentElement || {};
        var nav = window.navigator || {};
        var page = {
            title: document.title,
            url: pageUrl,
            lang: de.lang,
            referrer: document.referrer || (tC.storage && tC.storage.get('TC_REFERRER')),
            viewport: {
                width: de.clientWidth,
                height: de.clientHeight,
            },
        };
        var pickCookies = function() {
            // Facebook: _fbp/_fbq
            // Google: https://business.safety.google/adscookies/
            //AT-internet: atuserid/xtidc
            //Criteo: crto_mapped_user_id
            //Awin: awc
            var usefulCookies = [
                '_fbp',
                '_fbc',
                /^_+(ga|gcl|opt_|utm)/,
                /^(pm_sess|VISITOR_INFO1|FPGCL|GA_)/,
                '__gsas',
                'NID',
                'DSID',
                'test_cookie',
                'id',
                'GED_PLAYLIST_ACTIVITY',
                'ACLK_DATA',
                'aboutads_sessNNN',
                'FPAU',
                'ANID',
                'AID',
                'IDE',
                'TAID',
                'FLC',
                'RUL',
                'FCCDCF',
                'FCNEC',
                'CUID',
                '1P_JAR',
                'Conversion',
                'YSC',
                'FPLC',
                '_gid',
                'AMP_TOKEN',
                'FPID',
                '_dc_gtm_',
                'PAIDCONTENT',
                'atuserid',
                'xtidc',
                'crto_mapped_user_id',
                'awc',
                'tduid',
                'kwks2s',
                '_ttp',
                /^_pk_id\./,
                '_pcid', // piano
                'pa_vid', // piano
                'rmStore', // rakuten
                '_uetmsclkid', // microsoft uet
                /^_dy.*/, // dynamic yield
                /^ty_.*/, // thank you analytics
            ];
            return (document.cookie || '').split('; ').filter(function(cookie) {
                var name = cookie.split('=')[0];
                return usefulCookies.find(function(pattern) { return pattern.test ? pattern.test(name) : (name === pattern); });
            }).join('; ');
        };
        var device = {
            cookie: pickCookies() || '',
            lang: nav.language || nav.userLanguage,
            screen: {
                width: window.screen.width,
                height: window.screen.height,
            },
            timezone: timezone
        };
        //store it as an internal vars for automatic mapping in other tags
        tC.internalvars.caEventData = properties;
        var eventId = config.eventId ? String(config.eventId) : tC.uniqueEventId;
        //build event data
        var eventObject = {
            event_name: event,
            context: {
                page: page,
                device: device,
                eventId: eventId,
                version: 2,
                created: new Date().toJSON(),
                generatorVersion: tC.generatorVersion,
                containerVersion: tC.containerVersion
            },
        };
        Object.assign(eventObject, properties);
        //limit history size
        if (100 < tC.triggeredEvents.length) {
            while (tC.triggeredEvents.length > 100) {
                tC.triggeredEvents.shift();
            }
        }
        tC.triggeredEvents.push(eventObject);
        tC.lastTriggeredEvent = tC.triggeredEvents[tC.triggeredEvents.length - 1];

        var siteId = config.siteId || config.idSite;
        var collectionDomain = config.collectionDomain;
        //SEND HIT through sendBeacon or ajax as a fallback
        tC.track({
            domain: collectionDomain,
            route: 'events',
            siteId: siteId,
            queryParams: queryParams,
            body: eventObject,
            caidSync: config.caidSync,
        });

        if (tC.eventTarget) {
            var dispatchParams = {
                eventData: eventObject,
                eventTarget: config.eventTarget,
            };
            tC.eventTarget.dispatchEvent('track_' + event, dispatchParams);
            tC.eventTarget.dispatchEvent('track_all_events', dispatchParams);
        }
        return tC.uniqueEventIndex;
    };

})();

/*
 * Extension storage
 *
 * tC.storage
 */

tC.storage = {
    // legacy function has Storage
    has : function () {
        try {
            if ('localStorage' in window && window.localStorage != null) {
                window.localStorage.setItem('TC_CHECK', '1');
                window.localStorage.removeItem('TC_CHECK');
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
    },
    isAvailable: function() {
        try {
            window.localStorage;
            return true;
        } catch (err) {
            return false;
        }
    },
    //get storage
    get : function (k) {
        if (!this.isAvailable()) return;
        return window.localStorage.getItem(k);
    },
    //set storage
    set : function (k, v) {
        if (!this.isAvailable()) return;
        try {
            return window.localStorage.setItem(k, v) || true;
        } catch (e) {
            // most likely localstorage size limit exceeded
            return false;
        }
    },
    //remove storage
    remove : function (k) {
        if (!this.isAvailable()) return;
        return window.localStorage.removeItem(k) || true;
    },
    setWithExpiry: function (key, value, nbDays) {
        if (!this.isAvailable()) return;
        var now = (new Date()).getTime();
        var ttl = nbDays * 1000 * 60 * 60 * 24;
        var item = JSON.stringify({
            value: value,
            expires: now + ttl,
        });
        try {
            window.localStorage.setItem(key, item);
        } catch (e) {
            // most likely localstorage size limit exceeded
        }
    },
    getWithExpiry: function (key) {
        if (!this.isAvailable()) return;
        var item = window.localStorage.getItem(key);
        if (item == null) {
            return null;
        }
        var now = (new Date()).getTime();
        item = JSON.parse(item);
        if (item.expires < now) {
            this.remove(key);
            return null;
        }

        return item.value;
    },
};

/**
 * Extension hitCounter
 *
 * adds the hit counter for each container
 * allows to follow the usage of this container
 * will be called once in $frequency times
 *
 * @vars id_tagcommander,id_site,version,frequency
 */

(function() {
    var hitCounterExtend = {};
    var containerName = 3666 + '_' + 59;
    /*
    * f = force le hit
    * c = className du hit img
    */
    hitCounterExtend['hitCounter_' + containerName] = function() {
        var container = window['tC_' + containerName];
        if(Math.floor(Math.random()*parseInt(container.frequency)) === 0){
            var dns = window.tc_collect_dns || tC.clientCollectDns || 'manager.tagcommander.com';
            tC.pixelTrack.add('https://' + dns + '/utils/hit.php?id='+container.id_container+'&site='+container.id_site+'&version='+container.containerVersion+'&frequency='+container.frequency+'&position='+tC.container_position+'&rand='+Math.random());
        }
    };

    tC.extend(hitCounterExtend);

    /* global tc_container_position */
    tC.container_position = (typeof tc_container_position !== 'undefined') ? tc_container_position : (typeof tC.container_position !== 'undefined') ? tC.container_position : 0;
    tC.container_position++;
    if(typeof tc_container_position !== 'undefined'){
        tc_container_position++; // eslint-disable-line no-global-assign
    }
    tC['hitCounter_' + containerName]();
})();
/*
 * Extension script
 */

tC.script = {
    add: function(src,callback,abortTime){
        var s           = (document.getElementsByTagName('body')[0] || document.getElementsByTagName('script')[0].parentNode);
        var e           = document.createElement('script');
        e.type      = 'text/javascript';
        e.async     = true;
        e.src       = src;
        e.charset   = 'utf-8';
        e.id        = 'tc_script_' + Math.random();
        if(s){
            if(callback){
                if (e.addEventListener) { /* normal browsers (FF, Chrome,IE9+)*/
                    e.addEventListener('load', function(){
                        callback();
                    }, false);
                }
                else {
                    e.onreadystatechange = function() { /* old IEs (8-) */
                        if (e.readyState in {loaded: 1, complete: 1}){
                            e.onreadystatechange = null;
                            callback();
                        }
                    };
                }
            }
            if(abortTime && typeof abortTime === 'number'){
                setTimeout(function(){
                    if ( s && e.parentNode ) {
                        s.removeChild(e);
                    }
                },abortTime);
            }
            s.insertBefore(e, s.firstChild);
        }
        else{
            tC.log('tC.script error : the element <script> or <body> is not found ! the file '+src+' is not implemented !', 'warn');
        }
    }
};

/*
 * Extension bypassBookmarklet
 */


tC.bypassBookmarklet = true;

tC.extend({
	isWindow : function(obj) {
		return obj != null && obj == obj.window;
	},
	isNumeric : function(obj) {
		return !isNaN(parseFloat(obj)) && isFinite(obj);
	},
	makeArray: function( arr, results ) {
		var type,
			ret = results || [];

		if ( arr != null ) {

			type = tC.type( arr );

			if ( arr.length == null || type === "string" || type === "function" || type === "regexp" || tC.isWindow( arr ) ) {
				core_push = typeof core_push != 'undefined' ? core_push : Array.prototype.push;
				core_push.call( ret, arr );
			} else {
				tC.merge( ret, arr );
			}
		}

		return ret;
	},
	
	merge: function( first, second ) {
		var l = second.length,
			i = first.length,
			j = 0;

		if ( typeof l === "number" ) {
			for ( ; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}

		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	}/*,
	
	trim: core_trim && !core_trim.call("\uFEFF\xA0") ?
		function( text ) {
			return text == null ?
				"" :
				core_trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		}*/
});

/*
tC.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
	class2type["[object " + name + "]"] = name.toLowerCase();
});*/
if (tC.privacy != null && tC.privacy.initialized === false) {
    tC.privacy.init();
}

tC.extend({});

tC.event = tC.event || {};
tC.event.playListFunctions = tC.event.playListFunctions || [];
tC.event.playListIdTags = tC.event.playListIdTags || [];
tC.event.play=function(el, p){
tc_array_events=tC.container_3666_59.init_tc_array_events(p);
for(var i=0,x=tC.event.playListFunctions.length;i<x;i++){
tC.event.playListFunctions[i](el, p);
}
};

tC.event.pauseListFunctions = tC.event.pauseListFunctions || [];
tC.event.pauseListIdTags = tC.event.pauseListIdTags || [];
tC.event.pause=function(el, p){
tc_array_events=tC.container_3666_59.init_tc_array_events(p);
for(var i=0,x=tC.event.pauseListFunctions.length;i<x;i++){
tC.event.pauseListFunctions[i](el, p);
}
};

tC.event.notifyListFunctions = tC.event.notifyListFunctions || [];
tC.event.notifyListIdTags = tC.event.notifyListIdTags || [];
if (tC.event.notifyListIdTags.indexOf("503")==-1){
    tC.event.notifyListIdTags.push("503");
    tC.event.notifyListFunctions.push(function(el, p){
    
        tC.executeTag503_3666_59(el, p);
        tC.launchTag(503, 'Commanders Act - Event QA', 1377, 3666, 59, 77);});
}
if (tC.event.notifyListIdTags.indexOf("507")==-1){
    tC.event.notifyListIdTags.push("507");
    tC.event.notifyListFunctions.push(function(el, p){
    
        tC.executeTag507_3666_59(el, p);
        tC.launchTag(507, 'UDP', 26, 3666, 59, 77);});
}
if (tC.event.notifyListIdTags.indexOf("509")==-1){
    tC.event.notifyListIdTags.push("509");
    tC.event.notifyListFunctions.push(function(el, p){
    
        tC.executeTag509_3666_59(el, p);
        tC.launchTag(509, 'Comscore - Create playback session', 26, 3666, 59, 77);});
}
if (tC.event.notifyListIdTags.indexOf("515")==-1){
    tC.event.notifyListIdTags.push("515");
    tC.event.notifyListFunctions.push(function(el, p){
    
        tC.executeTag515_3666_59(el, p);
        tC.launchTag(515, 'comScore - notifyPlay', 2381, 3666, 59, 77);});
}
if (tC.event.notifyListIdTags.indexOf("516")==-1){
    tC.event.notifyListIdTags.push("516");
    tC.event.notifyListFunctions.push(function(el, p){
    
        tC.executeTag516_3666_59(el, p);
        tC.launchTag(516, 'comScore - notifyPause', 2383, 3666, 59, 77);});
}
if (tC.event.notifyListIdTags.indexOf("517")==-1){
    tC.event.notifyListIdTags.push("517");
    tC.event.notifyListFunctions.push(function(el, p){
    
        tC.executeTag517_3666_59(el, p);
        tC.launchTag(517, 'comScore - notifyBufferStart', 2377, 3666, 59, 77);});
}
if (tC.event.notifyListIdTags.indexOf("518")==-1){
    tC.event.notifyListIdTags.push("518");
    tC.event.notifyListFunctions.push(function(el, p){
    
        tC.executeTag518_3666_59(el, p);
        tC.launchTag(518, 'comScore - notifyBufferStop', 2379, 3666, 59, 77);});
}
if (tC.event.notifyListIdTags.indexOf("519")==-1){
    tC.event.notifyListIdTags.push("519");
    tC.event.notifyListFunctions.push(function(el, p){
    
        tC.executeTag519_3666_59(el, p);
        tC.launchTag(519, 'comScore - notifySeekStart', 2387, 3666, 59, 77);});
}
if (tC.event.notifyListIdTags.indexOf("521")==-1){
    tC.event.notifyListIdTags.push("521");
    tC.event.notifyListFunctions.push(function(el, p){
    
        tC.executeTag521_3666_59(el, p);
        tC.launchTag(521, 'comScore - notifyChangePlaybackRate', 2381, 3666, 59, 77);});
}
if (tC.event.notifyListIdTags.indexOf("522")==-1){
    tC.event.notifyListIdTags.push("522");
    tC.event.notifyListFunctions.push(function(el, p){
    
        tC.executeTag522_3666_59(el, p);
        tC.launchTag(522, 'comScore - notifyEnd', 2385, 3666, 59, 77);});
}
if (tC.event.notifyListIdTags.indexOf("526")==-1){
    tC.event.notifyListIdTags.push("526");
    tC.event.notifyListFunctions.push(function(el, p){
    
        tC.executeTag526_3666_59(el, p);
        tC.launchTag(526, 'webtrekk - play', 26, 3666, 59, 77);});
}
if (tC.event.notifyListIdTags.indexOf("527")==-1){
    tC.event.notifyListIdTags.push("527");
    tC.event.notifyListFunctions.push(function(el, p){
    
        tC.executeTag527_3666_59(el, p);
        tC.launchTag(527, ' webtrekk - pause, seek, pos, uptime, stop, eof', 26, 3666, 59, 77);});
}
if (tC.event.notifyListIdTags.indexOf("532")==-1){
    tC.event.notifyListIdTags.push("532");
    tC.event.notifyListFunctions.push(function(el, p){
    
        tC.executeTag532_3666_59(el, p);
        tC.launchTag(532, 'Chartbeat - init', 26, 3666, 59, 77);});
}
tC.event.notify=function(el, p){
tc_array_events=tC.container_3666_59.init_tc_array_events(p);
for(var i=0,x=tC.event.notifyListFunctions.length;i<x;i++){
tC.event.notifyListFunctions[i](el, p);
}
};
;

;
tC.extend({
    container: {
        reload: function(){
            var params = arguments[0];
            tC.reload_events = true;
            tC.container_position = 0;

            if(tC.containerList){
                tC.each(tC.containerList, function(index, value) {
                    if(typeof tC['container_'+value] === 'object' && typeof tC['container_'+value].reload === 'function') {
                        tC['container_' + value].reload(params, true);
                        tC.reload_events = false;
                    }
                });
            }
        }
    }
});

(function() {
    var containerIdExtend = {};
    var containerName = 3666 + '_' + 59;
    var container = window['tC_' + containerName] || {};
    var cactTriggerFuncName = 'trigger' + '_' + containerName;

    var containerApi = {
        /**
         * Load container elements
         * @param {object} params Parameters of the load (list of exclusions, tC.event functions to call…) ; ex.: {exclusions:["datastorage", "internalvars"], events:{function1:["paramF1"],function2:["param1F2", "param2F2"]}}
         * @param {boolean} [isReload] false (default) for the first load, true for a reload
         */
        load: function(params, isReload){
            tC.container_position++;
            tC['hitCounter_' + containerName]();
            this.datalayer();
            tC.array_launched_tags = [];
            tC.array_launched_tags_keys = [];

            if(typeof params !== 'object'){
                params = {};
            }

            if(typeof isReload !== 'boolean'){
                isReload = false;
            }

            if(typeof params.exclusions === 'undefined') {
                params.exclusions = [];
            }

            if (params.exclusions.indexOf('datastorage') === -1) {
                this.datastorage();
            }

            if (params.exclusions.indexOf('deduplication') === -1) {
                this.deduplication();
            }

            if (params.exclusions.indexOf('internalvars') === -1) {
                this.internalvars();
            }

            if (params.exclusions.indexOf('privacy') === -1) {
                this.privacy();
            }

            if (params.exclusions.indexOf('eventlisteners') === -1) {
                this.eventlisteners();
            }

            if (tC.reload_events === false || typeof params.events === 'undefined') {
                params.events = {};
            }

            //Each params.events is an object with name of the function in key and an array of parameters in value, for example: {function1:["param1", "param2"]}
            tC.each(params.events, function (k, v) {
                if (tC.event && typeof tC.event[k] === 'function' && v.length > 0) {//we check if there is a tC.event corresponding, with at least 1 parameter
                    if (typeof v[1] === 'undefined') {//2nd parameter is not set, we don't send it to the tC.event custom function
                        tC.event[k](v[0]);
                    } else {
                        tC.event[k](v[0], v[1]);
                    }
                }
            });
        },

        reload: function(params, isGlobalReload){
            if(typeof isGlobalReload !== 'boolean'){
                isGlobalReload = false;
            }

            if(!isGlobalReload){
                tC.container_position = 0;
                tC.reload_events = true;
            }

            this.load(arguments[0], true);
        },

        datalayer: function(){
            /* global tc_vars */
            if(typeof tc_vars==='undefined') window.tc_vars=[];
            var l = 'pbw_players_data|content_channel|content_category_1|content_category_2|content_category_3|content_category_4|content_id|content_template|survey_id|survey_session_id|content_category_concat|content_categorization|content_tvp_date|content_ed_format|content_publication_date|content_publication_time|content_page_elements|content_special|content_publication_version|content_thumbnail|content_character_encoding|content_production_type|content_production_source|content_body_character_count|content_tags_location|content_tags_subject|content_author_name|page_id_referrer|page_id|content_page_type|content_title|content_surtitle|content_bu_owner|content_language|content_title_pretty|media_enterprise_units|media_signlanguage_on|media_audiodescription_on|media_sub_set_id|media_topic_list|media_user_elapsed_time|media_episode_id_referring|media_since_publication_d|media_since_publication_h|media_chromecast_selected|media_number_of_segments_total|media_number_of_segment_selected|media_duration_category|media_tv_time|media_tv_date|media_is_dvr|media_dvr_window_length|media_dvr_window_offset|media_channel_cs|media_full_length|media_segment_length|media_is_livestream|media_is_web_only|media_author_name|media_episode_length|media_type|media_is_tvsvizzera|media_livestream_encoder|media_is_geoblocked|media_assigned_tags|media_special|media_joker1|media_joker2|media_joker3|media_player_display|media_url|media_thumbnail|media_publication_time|media_streaming_quality|media_camera_angle_name|media_audio_track|media_player_version|media_bu_owner|media_publication_date|media_special_format|media_player_name|media_publication_datetime|media_language|media_urn|media_content_group|media_segment_id|media_segment|media_episode_id|media_episode|media_show_id|media_show|media_channel_id|media_channel_name|media_segment_id_referring|media_embedding_environment|media_embedding_referrer|media_embedding_url|media_embedding_content_page_type|media_tv_id|media_bu_distributer|pretty_app_name|navigation_platform|navigation_level_8|navigation_content_filter|navigation_level_2|navigation_level_1|navigation_app_site_name|navigation_bu_distributer|navigation_level_7|navigation_level_6|navigation_level_3|navigation_level_4|navigation_level_5|navigation_environment|navigation_property_type|settings_language|user_login_status|user_profileid|user_sub|business_unit_of_intranet_user|user_settings|java_script_activated|user_id_log_in|accessed_after_push_notification|accessed_after_click_url|srg_mod4|srg_mod3|srg_mod2|srg_mod1|search_nb_result|search_term|amount_of_likes|amount_of_comments|http_status_code|ab_test_group|content_layout_name'.split('|');
            for(var k in l){
                if(!tc_vars.hasOwnProperty(l[k])){
                    tc_vars[l[k]]='';
                }
            }

            window.top.postMessage('TC.EX.EXT_VARS.RELOAD', '*');
        },

        datastorage: function(){
            ;

            window.top.postMessage('TC.EX.DATASTORAGE.RELOAD', '*');
        },

        deduplication: function(){
            if(tC.dedup) {
                tC.dedup.LeA=false;
                tC.dedup.LeAD=false;
                tC.dedup.LeC=false;
                tC.dedup.LeCD=false;
                tC.dedup.LeV=false;
                tC.dedup.LeVD=false;
                tC.dedup.FeA=false;
                tC.dedup.FeAD=false;
                tC.dedup.FeC=false;
                tC.dedup.FeCD=false;
                tC.dedup.FeV=false;
                tC.dedup.FeVD=false;
                tC.dedup.AeA=[];
                tC.dedup.AeC=[];
                tC.dedup.AeV=[];
                tC.dedup.init();
                tC.dedup.setEventList();
            }
        },

        eventlisteners: function(){
            ;
        },

        internalvars: function(){
            var listInternalVars = tC['internalvars_' + containerName].listVar;
            if(listInternalVars.length > 0){
                for (var i = 0; i < listInternalVars.length; i++) {
                    tC['internalvars_' + 3666].initiators['var'+listInternalVars[i]]();
                }
            }

            window.top.postMessage('TC.EX.INT_VARS.RELOAD', '*');
        },

        privacy: function(){
            if(tC.privacy) {
                tC.privacy.init();
            }
        },

        init_tc_array_events: function(t){
            if (typeof t === 'undefined') {
                t = {};
            }
            var l = 'peach_items_displayed|peach_items|peach_hit_index|media_subtitle_selection|media_audio_track|segment_change_origin|media_playback_rate|event_type|event_name|event_source|event_value|media_signlanguage_on|pbw_player_id|media_segment_id|media_duration_category|media_urn|media_episode_length|media_bu_owner|media_special|media_episode_id|media_episode|media_show_id|media_show|media_channel_id|media_channel_name|media_tv_id|media_publication_datetime|media_is_geoblocked|media_url|media_thumbnail|media_type|media_is_livestream|media_segment_length|media_full_length|media_is_web_only|media_joker1|media_joker2|media_joker3|media_livestream_encoder|media_chromecast_selected|media_content_group|media_embedding_content_page_type|media_embedding_referrer|media_embedding_url|media_embedding_environment|media_language|media_publication_date|media_publication_time|media_assigned_tags|media_is_tvsvizzera|media_player_name|media_player_version|media_player_display|media_position_real|media_audiodescription_on|media_time_spent|media_since_publication_d|media_since_publication_h|media_bu_distributer|media_segment|media_streaming_quality|media_sub_set_id|media_topic_list|media_player_id|event_value_1|event_value_2|event_value_3|event_value_4|event_value_5|event_id|media_subtitles_on|media_timeshift|media_quality|media_camera_angle_name|media_bandwidth|media_volume|media_mute|media_position|media_is_dvr|media_dvr_window_offset|media_dvr_window_length|media_is_live|media_stream_type|peach_reco_id|id'.split('|');
            for (var k in l) {
                if (!t.hasOwnProperty(l[k])) {
                    t[l[k]] = '';
                }
            }

            return t;
        },
        cact: function() {
            var args = arguments;
            if (args[0] === 'trigger') {
                args[0] = cactTriggerFuncName;
            }
            window.caReady.push(args);
        },
        get_info: function() {
            var info  = Object.assign({}, container);
            delete info.api;
            return info;
        },
        get_config: function() {
            return Object.assign({}, tC.config);
        }
    };

    containerIdExtend['container_' + containerName] = containerApi;
    tC.extend(containerIdExtend);
    container.api = containerApi;

    if(typeof tC.containerList === 'undefined'){tC.containerList = [];}
    tC.containerList.push(containerName);
    window.tc_array_events = tC['container_' + containerName].init_tc_array_events([]);

    if (tC.cact) {
        tC.cact[cactTriggerFuncName] = function() {
            var args = tC.cactUtils.formatArgumentsV2(arguments);

            var event = args.event;
            var properties = Object.assign({}, args.properties);
            var config = Object.assign({}, args.config);
            var callback = args.callback;

            var globalConfig = tC.config || {};
            if (!config.sourceKey && !globalConfig.sourceKey && container.sourceKey) {
                config.sourceKey = container.sourceKey;
            }
            if (!config.siteId && !config.id_site && !globalConfig.siteId && container.id_site) {
                config.siteId = container.id_site;
            }

            tC.cact.trigger(event, properties, config, callback);
        };
        tC.cact[cactTriggerFuncName]._tc_version = 2;
    }
})();

;

    window['tC' + currentContainer.id_site + '_' + currentContainer.id_container] = tC;

    window.postMessage('TC.EX.CONTAINER:{"id":' + currentContainer.id_container + ',"ids":' + currentContainer.id_site + ',"v":"' + currentContainer.containerVersion + '","g":' + currentContainer.generatorVersion + ',"p":'+tC.container_position+',"url":"'+(document.currentScript ? document.currentScript.src : '')+'"}','*');
})();

tC.container_3666_59.datalayer();tC.array_launched_tags=[];tC.array_launched_tags_keys=[];

/*DYNAMIC JS BLOCK 1*/

/*END DYNAMIC JS BLOCK 1*/

/*CUSTOM_JS_BLOCK1*/
function customLogger(value){tC.log({name:'customLogger',value:value});}
/*END_CUSTOM_JS_BLOCK1*/
if(tC.privacyCookieDisallowed){tC.setCookie('TCPID','',-1,'',tC.domain());}
tC.id_site='3666';
/*VARIABLES_BLOCK*/
tC.internalvars_3666.initiators=tC.internalvars_3666.initiators||{};tC.internalvars_3666_59={listVar:[]}
tC.internalvars_3666.initiators.var307=typeof tC.internalvars_3666.initiators.var307=="function"?tC.internalvars_3666.initiators.var307:function(){tC.internalvars.device=tC.internalvars.device?tC.internalvars.device:"";}
tC.internalvars_3666.initiators.var307();tC.internalvars_3666_59.listVar.push(307);tC.internalvars_3666.initiators.var308=typeof tC.internalvars_3666.initiators.var308=="function"?tC.internalvars_3666.initiators.var308:function(){tC.internalvars.tc_array_url_vars=tC.internalvars.tc_array_url_vars?tC.internalvars.tc_array_url_vars:"";}
tC.internalvars_3666.initiators.var308();tC.internalvars_3666_59.listVar.push(308);tC.internalvars_3666.initiators.var309=typeof tC.internalvars_3666.initiators.var309=="function"?tC.internalvars_3666.initiators.var309:function(){tC.internalvars.tc_fulldomain=tC.internalvars.tc_fulldomain?tC.internalvars.tc_fulldomain:"";}
tC.internalvars_3666.initiators.var309();tC.internalvars_3666_59.listVar.push(309);tC.internalvars_3666.initiators.var310=typeof tC.internalvars_3666.initiators.var310=="function"?tC.internalvars_3666.initiators.var310:function(){tC.internalvars.tc_maindomain=tC.internalvars.tc_maindomain?tC.internalvars.tc_maindomain:"";}
tC.internalvars_3666.initiators.var310();tC.internalvars_3666_59.listVar.push(310);tC.internalvars_3666.initiators.var311=typeof tC.internalvars_3666.initiators.var311=="function"?tC.internalvars_3666.initiators.var311:function(){tC.internalvars.tc_pathname=tC.internalvars.tc_pathname?tC.internalvars.tc_pathname:"";}
tC.internalvars_3666.initiators.var311();tC.internalvars_3666_59.listVar.push(311);tC.internalvars_3666.initiators.var312=typeof tC.internalvars_3666.initiators.var312=="function"?tC.internalvars_3666.initiators.var312:function(){tC.internalvars.tc_random=tC.internalvars.tc_random?tC.internalvars.tc_random:"";}
tC.internalvars_3666.initiators.var312();tC.internalvars_3666_59.listVar.push(312);tC.internalvars_3666.initiators.var313=typeof tC.internalvars_3666.initiators.var313=="function"?tC.internalvars_3666.initiators.var313:function(){tC.internalvars.tc_referrer=tC.internalvars.tc_referrer?tC.internalvars.tc_referrer:"";}
tC.internalvars_3666.initiators.var313();tC.internalvars_3666_59.listVar.push(313);tC.internalvars_3666.initiators.var314=typeof tC.internalvars_3666.initiators.var314=="function"?tC.internalvars_3666.initiators.var314:function(){tC.internalvars.tc_ssl=tC.internalvars.tc_ssl?tC.internalvars.tc_ssl:"";}
tC.internalvars_3666.initiators.var314();tC.internalvars_3666_59.listVar.push(314);tC.internalvars_3666.initiators.var315=typeof tC.internalvars_3666.initiators.var315=="function"?tC.internalvars_3666.initiators.var315:function(){tC.internalvars.tc_timestamp=tC.internalvars.tc_timestamp?tC.internalvars.tc_timestamp:"";}
tC.internalvars_3666.initiators.var315();tC.internalvars_3666_59.listVar.push(315);tC.internalvars_3666.initiators.var316=typeof tC.internalvars_3666.initiators.var316=="function"?tC.internalvars_3666.initiators.var316:function(){tC.internalvars.tc_title=tC.internalvars.tc_title?tC.internalvars.tc_title:"";}
tC.internalvars_3666.initiators.var316();tC.internalvars_3666_59.listVar.push(316);tC.internalvars_3666.initiators.var317=typeof tC.internalvars_3666.initiators.var317=="function"?tC.internalvars_3666.initiators.var317:function(){tC.internalvars.tc_url=tC.internalvars.tc_url?tC.internalvars.tc_url:"";}
tC.internalvars_3666.initiators.var317();tC.internalvars_3666_59.listVar.push(317);tC.internalvars_3666.initiators.var318=typeof tC.internalvars_3666.initiators.var318=="function"?tC.internalvars_3666.initiators.var318:function(){tC.internalvars.tc_url_1=tC.internalvars.tc_url_1?tC.internalvars.tc_url_1:"";}
tC.internalvars_3666.initiators.var318();tC.internalvars_3666_59.listVar.push(318);tC.internalvars_3666.initiators.var319=typeof tC.internalvars_3666.initiators.var319=="function"?tC.internalvars_3666.initiators.var319:function(){tC.internalvars.tc_url_2=tC.internalvars.tc_url_2?tC.internalvars.tc_url_2:"";}
tC.internalvars_3666.initiators.var319();tC.internalvars_3666_59.listVar.push(319);tC.internalvars_3666.initiators.var320=typeof tC.internalvars_3666.initiators.var320=="function"?tC.internalvars_3666.initiators.var320:function(){tC.internalvars.tc_url_3=tC.internalvars.tc_url_3?tC.internalvars.tc_url_3:"";}
tC.internalvars_3666.initiators.var320();tC.internalvars_3666_59.listVar.push(320);tC.internalvars_3666.initiators.var321=typeof tC.internalvars_3666.initiators.var321=="function"?tC.internalvars_3666.initiators.var321:function(){tC.internalvars.tc_url_no_query=tC.internalvars.tc_url_no_query?tC.internalvars.tc_url_no_query:"";}
tC.internalvars_3666.initiators.var321();tC.internalvars_3666_59.listVar.push(321);tC.internalvars_3666.initiators.var322=typeof tC.internalvars_3666.initiators.var322=="function"?tC.internalvars_3666.initiators.var322:function(){tC.internalvars.tc_url_query_string=tC.internalvars.tc_url_query_string?tC.internalvars.tc_url_query_string:"";}
tC.internalvars_3666.initiators.var322();tC.internalvars_3666_59.listVar.push(322);tC.internalvars_3666.initiators.var374=typeof tC.internalvars_3666.initiators.var374=="function"?tC.internalvars_3666.initiators.var374:function(){tC.internalvars.page_unique_name=tC.internalvars.page_unique_name?tC.internalvars.page_unique_name:"";}
tC.internalvars_3666.initiators.var374();tC.internalvars_3666_59.listVar.push(374);tC.internalvars_3666.initiators.var428=typeof tC.internalvars_3666.initiators.var428=="function"?tC.internalvars_3666.initiators.var428:function(){tC.internalvars.modified_page_unique=tC.internalvars.modified_page_unique?tC.internalvars.modified_page_unique:"";}
tC.internalvars_3666.initiators.var428();tC.internalvars_3666_59.listVar.push(428);tC.internalvars_3666.initiators.var439=typeof tC.internalvars_3666.initiators.var439=="function"?tC.internalvars_3666.initiators.var439:function(){tC.internalvars.media_position_peach=tC.internalvars.media_position_peach?tC.internalvars.media_position_peach:"";}
tC.internalvars_3666.initiators.var439();tC.internalvars_3666_59.listVar.push(439);tC.internalvars_3666.initiators.var445=typeof tC.internalvars_3666.initiators.var445=="function"?tC.internalvars_3666.initiators.var445:function(){tC.internalvars.content_title_lrc=tC.internalvars.content_title_lrc?tC.internalvars.content_title_lrc:"";}
tC.internalvars_3666.initiators.var445();tC.internalvars_3666_59.listVar.push(445);tC.internalvars_3666.initiators.var452=typeof tC.internalvars_3666.initiators.var452=="function"?tC.internalvars_3666.initiators.var452:function(){tC.internalvars.webtrekk_track_id=tC.internalvars.webtrekk_track_id?tC.internalvars.webtrekk_track_id:"";}
tC.internalvars_3666.initiators.var452();tC.internalvars_3666_59.listVar.push(452);tC.internalvars_3666.initiators.var459=typeof tC.internalvars_3666.initiators.var459=="function"?tC.internalvars_3666.initiators.var459:function(){tC.internalvars.test_title=tC.internalvars.test_title?tC.internalvars.test_title:"";}
tC.internalvars_3666.initiators.var459();tC.internalvars_3666_59.listVar.push(459);tC.internalvars_3666.initiators.var471=typeof tC.internalvars_3666.initiators.var471=="function"?tC.internalvars_3666.initiators.var471:function(){tC.internalvars.ns_st_tep=tC.internalvars.ns_st_tep?tC.internalvars.ns_st_tep:"";}
tC.internalvars_3666.initiators.var471();tC.internalvars_3666_59.listVar.push(471);tC.internalvars_3666.initiators.var472=typeof tC.internalvars_3666.initiators.var472=="function"?tC.internalvars_3666.initiators.var472:function(){tC.internalvars.ns_st_stc=tC.internalvars.ns_st_stc?tC.internalvars.ns_st_stc:"";}
tC.internalvars_3666.initiators.var472();tC.internalvars_3666_59.listVar.push(472);tC.internalvars_3666.initiators.var473=typeof tC.internalvars_3666.initiators.var473=="function"?tC.internalvars_3666.initiators.var473:function(){tC.internalvars.ns_st_tdt=tC.internalvars.ns_st_tdt?tC.internalvars.ns_st_tdt:"";}
tC.internalvars_3666.initiators.var473();tC.internalvars_3666_59.listVar.push(473);tC.internalvars_3666.initiators.var474=typeof tC.internalvars_3666.initiators.var474=="function"?tC.internalvars_3666.initiators.var474:function(){tC.internalvars.ns_st_tm=tC.internalvars.ns_st_tm?tC.internalvars.ns_st_tm:"";}
tC.internalvars_3666.initiators.var474();tC.internalvars_3666_59.listVar.push(474);tC.internalvars_3666.initiators.var475=typeof tC.internalvars_3666.initiators.var475=="function"?tC.internalvars_3666.initiators.var475:function(){tC.internalvars.ns_st_ci=tC.internalvars.ns_st_ci?tC.internalvars.ns_st_ci:"";}
tC.internalvars_3666.initiators.var475();tC.internalvars_3666_59.listVar.push(475);tC.internalvars_3666.initiators.var476=typeof tC.internalvars_3666.initiators.var476=="function"?tC.internalvars_3666.initiators.var476:function(){tC.internalvars.ns_st_cl=tC.internalvars.ns_st_cl?tC.internalvars.ns_st_cl:"";}
tC.internalvars_3666.initiators.var476();tC.internalvars_3666_59.listVar.push(476);tC.internalvars_3666.initiators.var477=typeof tC.internalvars_3666.initiators.var477=="function"?tC.internalvars_3666.initiators.var477:function(){tC.internalvars.ns_st_tpr=tC.internalvars.ns_st_tpr?tC.internalvars.ns_st_tpr:"";}
tC.internalvars_3666.initiators.var477();tC.internalvars_3666_59.listVar.push(477);tC.internalvars_3666.initiators.var478=typeof tC.internalvars_3666.initiators.var478=="function"?tC.internalvars_3666.initiators.var478:function(){tC.internalvars.ns_st_ddt=tC.internalvars.ns_st_ddt?tC.internalvars.ns_st_ddt:"";}
tC.internalvars_3666.initiators.var478();tC.internalvars_3666_59.listVar.push(478);tC.internalvars_3666.initiators.var479=typeof tC.internalvars_3666.initiators.var479=="function"?tC.internalvars_3666.initiators.var479:function(){tC.internalvars.ns_st_pr=tC.internalvars.ns_st_pr?tC.internalvars.ns_st_pr:"";}
tC.internalvars_3666.initiators.var479();tC.internalvars_3666_59.listVar.push(479);tC.internalvars_3666.initiators.var480=typeof tC.internalvars_3666.initiators.var480=="function"?tC.internalvars_3666.initiators.var480:function(){tC.internalvars.ns_st_ep=tC.internalvars.ns_st_ep?tC.internalvars.ns_st_ep:"";}
tC.internalvars_3666.initiators.var480();tC.internalvars_3666_59.listVar.push(480);tC.internalvars_3666.initiators.var481=typeof tC.internalvars_3666.initiators.var481=="function"?tC.internalvars_3666.initiators.var481:function(){tC.internalvars.ns_st_ce=tC.internalvars.ns_st_ce?tC.internalvars.ns_st_ce:"";}
tC.internalvars_3666.initiators.var481();tC.internalvars_3666_59.listVar.push(481);tC.internalvars_3666.initiators.var482=typeof tC.internalvars_3666.initiators.var482=="function"?tC.internalvars_3666.initiators.var482:function(){tC.internalvars.ns_st_en=tC.internalvars.ns_st_en?tC.internalvars.ns_st_en:"";}
tC.internalvars_3666.initiators.var482();tC.internalvars_3666_59.listVar.push(482);tC.internalvars_3666.initiators.var483=typeof tC.internalvars_3666.initiators.var483=="function"?tC.internalvars_3666.initiators.var483:function(){tC.internalvars.ns_st_ge=tC.internalvars.ns_st_ge?tC.internalvars.ns_st_ge:"";}
tC.internalvars_3666.initiators.var483();tC.internalvars_3666_59.listVar.push(483);tC.internalvars_3666.initiators.var484=typeof tC.internalvars_3666.initiators.var484=="function"?tC.internalvars_3666.initiators.var484:function(){tC.internalvars.main_domain_clean=tC.internalvars.main_domain_clean?tC.internalvars.main_domain_clean:"";}
tC.internalvars_3666.initiators.var484();tC.internalvars_3666_59.listVar.push(484);tC.internalvars_3666.initiators.var486=typeof tC.internalvars_3666.initiators.var486=="function"?tC.internalvars_3666.initiators.var486:function(){tC.internalvars.tc_url_4=tC.internalvars.tc_url_4?tC.internalvars.tc_url_4:"";}
tC.internalvars_3666.initiators.var486();tC.internalvars_3666_59.listVar.push(486);tC.internalvars_3666.initiators.var487=typeof tC.internalvars_3666.initiators.var487=="function"?tC.internalvars_3666.initiators.var487:function(){tC.internalvars.tc_url_5=tC.internalvars.tc_url_5?tC.internalvars.tc_url_5:"";}
tC.internalvars_3666.initiators.var487();tC.internalvars_3666_59.listVar.push(487);tC.internalvars_3666.initiators.var488=typeof tC.internalvars_3666.initiators.var488=="function"?tC.internalvars_3666.initiators.var488:function(){tC.internalvars.tc_url_6=tC.internalvars.tc_url_6?tC.internalvars.tc_url_6:"";}
tC.internalvars_3666.initiators.var488();tC.internalvars_3666_59.listVar.push(488);tC.internalvars_3666.initiators.var489=typeof tC.internalvars_3666.initiators.var489=="function"?tC.internalvars_3666.initiators.var489:function(){tC.internalvars.tc_url_7=tC.internalvars.tc_url_7?tC.internalvars.tc_url_7:"";}
tC.internalvars_3666.initiators.var489();tC.internalvars_3666_59.listVar.push(489);tC.internalvars_3666.initiators.var491=typeof tC.internalvars_3666.initiators.var491=="function"?tC.internalvars_3666.initiators.var491:function(){tC.internalvars.webtrekk_pages=tC.internalvars.webtrekk_pages?tC.internalvars.webtrekk_pages:"";}
tC.internalvars_3666.initiators.var491();tC.internalvars_3666_59.listVar.push(491);tC.internalvars_3666.initiators.var493=typeof tC.internalvars_3666.initiators.var493=="function"?tC.internalvars_3666.initiators.var493:function(){tC.internalvars.isMutedPlayback_in_web_view=tC.internalvars.isMutedPlayback_in_web_view?tC.internalvars.isMutedPlayback_in_web_view:"";}
tC.internalvars_3666.initiators.var493();tC.internalvars_3666_59.listVar.push(493);tC.internalvars_3666.initiators.var494=typeof tC.internalvars_3666.initiators.var494=="function"?tC.internalvars_3666.initiators.var494:function(){tC.internalvars.isNotMutedPlayback=tC.internalvars.isNotMutedPlayback?tC.internalvars.isNotMutedPlayback:"";}
tC.internalvars_3666.initiators.var494();tC.internalvars_3666_59.listVar.push(494);tC.internalvars_3666.initiators.var506=typeof tC.internalvars_3666.initiators.var506=="function"?tC.internalvars_3666.initiators.var506:function(){tC.internalvars.Chartbeat_rootSectio=tC.internalvars.Chartbeat_rootSectio?tC.internalvars.Chartbeat_rootSectio:"";}
tC.internalvars_3666.initiators.var506();tC.internalvars_3666_59.listVar.push(506);tC.internalvars_3666.initiators.var509=typeof tC.internalvars_3666.initiators.var509=="function"?tC.internalvars_3666.initiators.var509:function(){tC.internalvars.VideojsIsNotAutoplay=tC.internalvars.VideojsIsNotAutoplay?tC.internalvars.VideojsIsNotAutoplay:"";}
tC.internalvars_3666.initiators.var509();tC.internalvars_3666_59.listVar.push(509);tC.internalvars_3666.initiators.var516=typeof tC.internalvars_3666.initiators.var516=="function"?tC.internalvars_3666.initiators.var516:function(){tC.internalvars.media_tv_year=tC.internalvars.media_tv_year?tC.internalvars.media_tv_year:"";}
tC.internalvars_3666.initiators.var516();tC.internalvars_3666_59.listVar.push(516);tC.internalvars_3666.initiators.var517=typeof tC.internalvars_3666.initiators.var517=="function"?tC.internalvars_3666.initiators.var517:function(){tC.internalvars.media_tv_month=tC.internalvars.media_tv_month?tC.internalvars.media_tv_month:"";}
tC.internalvars_3666.initiators.var517();tC.internalvars_3666_59.listVar.push(517);tC.internalvars_3666.initiators.var518=typeof tC.internalvars_3666.initiators.var518=="function"?tC.internalvars_3666.initiators.var518:function(){tC.internalvars.media_tv_day=tC.internalvars.media_tv_day?tC.internalvars.media_tv_day:"";}
tC.internalvars_3666.initiators.var518();tC.internalvars_3666_59.listVar.push(518);tC.internalvars_3666.initiators.var519=typeof tC.internalvars_3666.initiators.var519=="function"?tC.internalvars_3666.initiators.var519:function(){tC.internalvars.media_pub_year=tC.internalvars.media_pub_year?tC.internalvars.media_pub_year:"";}
tC.internalvars_3666.initiators.var519();tC.internalvars_3666_59.listVar.push(519);tC.internalvars_3666.initiators.var520=typeof tC.internalvars_3666.initiators.var520=="function"?tC.internalvars_3666.initiators.var520:function(){tC.internalvars.media_pub_month=tC.internalvars.media_pub_month?tC.internalvars.media_pub_month:"";}
tC.internalvars_3666.initiators.var520();tC.internalvars_3666_59.listVar.push(520);tC.internalvars_3666.initiators.var521=typeof tC.internalvars_3666.initiators.var521=="function"?tC.internalvars_3666.initiators.var521:function(){tC.internalvars.media_pub_day=tC.internalvars.media_pub_day?tC.internalvars.media_pub_day:"";}
tC.internalvars_3666.initiators.var521();tC.internalvars_3666_59.listVar.push(521);tC.internalvars_3666.initiators.var522=typeof tC.internalvars_3666.initiators.var522=="function"?tC.internalvars_3666.initiators.var522:function(){tC.internalvars.media_pub_hour=tC.internalvars.media_pub_hour?tC.internalvars.media_pub_hour:"";}
tC.internalvars_3666.initiators.var522();tC.internalvars_3666_59.listVar.push(522);tC.internalvars_3666.initiators.var523=typeof tC.internalvars_3666.initiators.var523=="function"?tC.internalvars_3666.initiators.var523:function(){tC.internalvars.media_pub_minutes=tC.internalvars.media_pub_minutes?tC.internalvars.media_pub_minutes:"";}
tC.internalvars_3666.initiators.var523();tC.internalvars_3666_59.listVar.push(523);tC.internalvars_3666.initiators.var524=typeof tC.internalvars_3666.initiators.var524=="function"?tC.internalvars_3666.initiators.var524:function(){tC.internalvars.webtrekk_pages_rio=tC.internalvars.webtrekk_pages_rio?tC.internalvars.webtrekk_pages_rio:"";}
tC.internalvars_3666.initiators.var524();tC.internalvars_3666_59.listVar.push(524);tC.internalvars_3666.initiators.var530=typeof tC.internalvars_3666.initiators.var530=="function"?tC.internalvars_3666.initiators.var530:function(){tC.internalvars.ns_st_ct=tC.internalvars.ns_st_ct?tC.internalvars.ns_st_ct:"";}
tC.internalvars_3666.initiators.var530();tC.internalvars_3666_59.listVar.push(530);tC.internalvars_3666.initiators.var538=typeof tC.internalvars_3666.initiators.var538=="function"?tC.internalvars_3666.initiators.var538:function(){tC.internalvars.page_unique_name_rio=tC.internalvars.page_unique_name_rio?tC.internalvars.page_unique_name_rio:"";}
tC.internalvars_3666.initiators.var538();tC.internalvars_3666_59.listVar.push(538);tC.internalvars_3666.initiators.var540=typeof tC.internalvars_3666.initiators.var540=="function"?tC.internalvars_3666.initiators.var540:function(){tC.internalvars.short_form_on_demand=tC.internalvars.short_form_on_demand?tC.internalvars.short_form_on_demand:"";}
tC.internalvars_3666.initiators.var540();tC.internalvars_3666_59.listVar.push(540);tC.internalvars_3666.initiators.var542=typeof tC.internalvars_3666.initiators.var542=="function"?tC.internalvars_3666.initiators.var542:function(){tC.internalvars.long_form_on_demand=tC.internalvars.long_form_on_demand?tC.internalvars.long_form_on_demand:"";}
tC.internalvars_3666.initiators.var542();tC.internalvars_3666_59.listVar.push(542);tC.internalvars_3666.initiators.var544=typeof tC.internalvars_3666.initiators.var544=="function"?tC.internalvars_3666.initiators.var544:function(){tC.internalvars.live=tC.internalvars.live?tC.internalvars.live:"";}
tC.internalvars_3666.initiators.var544();tC.internalvars_3666_59.listVar.push(544);tC.internalvars_3666.initiators.var557=typeof tC.internalvars_3666.initiators.var557=="function"?tC.internalvars_3666.initiators.var557:function(){tC.internalvars.webtrekk_track_domain=tC.internalvars.webtrekk_track_domain?tC.internalvars.webtrekk_track_domain:"";}
tC.internalvars_3666.initiators.var557();tC.internalvars_3666_59.listVar.push(557);tC.internalvars_3666.initiators.var559=typeof tC.internalvars_3666.initiators.var559=="function"?tC.internalvars_3666.initiators.var559:function(){tC.internalvars.webtrekkConfig=tC.internalvars.webtrekkConfig?tC.internalvars.webtrekkConfig:"";}
tC.internalvars_3666.initiators.var559();tC.internalvars_3666_59.listVar.push(559);tC.internalvars_3666.initiators.var565=typeof tC.internalvars_3666.initiators.var565=="function"?tC.internalvars_3666.initiators.var565:function(){tC.internalvars.initComscore=tC.internalvars.initComscore?tC.internalvars.initComscore:"";}
tC.internalvars_3666.initiators.var565();tC.internalvars_3666_59.listVar.push(565);tC.internalvars_3666.initiators.var567=typeof tC.internalvars_3666.initiators.var567=="function"?tC.internalvars_3666.initiators.var567:function(){tC.internalvars.initMetaData=tC.internalvars.initMetaData?tC.internalvars.initMetaData:"";}
tC.internalvars_3666.initiators.var567();tC.internalvars_3666_59.listVar.push(567);tC.internalvars_3666.initiators.var572=typeof tC.internalvars_3666.initiators.var572=="function"?tC.internalvars_3666.initiators.var572:function(){tC.internalvars.userAgentIsWebview=tC.internalvars.userAgentIsWebview?tC.internalvars.userAgentIsWebview:"";}
tC.internalvars_3666.initiators.var572();tC.internalvars_3666_59.listVar.push(572);tC.internalvars_3666.initiators.var573=typeof tC.internalvars_3666.initiators.var573=="function"?tC.internalvars_3666.initiators.var573:function(){tC.internalvars.previousEvent=tC.internalvars.previousEvent?tC.internalvars.previousEvent:"";}
tC.internalvars_3666.initiators.var573();tC.internalvars_3666_59.listVar.push(573);tC.internalvars_3666.initiators.var575=typeof tC.internalvars_3666.initiators.var575=="function"?tC.internalvars_3666.initiators.var575:function(){tC.internalvars.initSRGPlayer=tC.internalvars.initSRGPlayer?tC.internalvars.initSRGPlayer:"";}
tC.internalvars_3666.initiators.var575();tC.internalvars_3666_59.listVar.push(575);tC.internalvars_3666.initiators.var576=typeof tC.internalvars_3666.initiators.var576=="function"?tC.internalvars_3666.initiators.var576:function(){tC.internalvars.playerStartTime=tC.internalvars.playerStartTime?tC.internalvars.playerStartTime:"";}
tC.internalvars_3666.initiators.var576();tC.internalvars_3666_59.listVar.push(576);tC.internalvars_3666.initiators.var579=typeof tC.internalvars_3666.initiators.var579=="function"?tC.internalvars_3666.initiators.var579:function(){tC.internalvars.media_assigned_tags_wo_seperator=tC.internalvars.media_assigned_tags_wo_seperator?tC.internalvars.media_assigned_tags_wo_seperator:"";}
tC.internalvars_3666.initiators.var579();tC.internalvars_3666_59.listVar.push(579);tC.internalvars_3666.initiators.var586=typeof tC.internalvars_3666.initiators.var586=="function"?tC.internalvars_3666.initiators.var586:function(){tC.internalvars.tc_url_embedded=tC.internalvars.tc_url_embedded?tC.internalvars.tc_url_embedded:"";}
tC.internalvars_3666.initiators.var586();tC.internalvars_3666_59.listVar.push(586);tC.internalvars_3666.initiators.var591=typeof tC.internalvars_3666.initiators.var591=="function"?tC.internalvars_3666.initiators.var591:function(){tC.internalvars.wt_eid=tC.internalvars.wt_eid?tC.internalvars.wt_eid:"";}
tC.internalvars_3666.initiators.var591();tC.internalvars_3666_59.listVar.push(591);tC.internalvars_3666.initiators.var592=typeof tC.internalvars_3666.initiators.var592=="function"?tC.internalvars_3666.initiators.var592:function(){tC.internalvars.wt_timestamp=tC.internalvars.wt_timestamp?tC.internalvars.wt_timestamp:"";}
tC.internalvars_3666.initiators.var592();tC.internalvars_3666_59.listVar.push(592);tC.internalvars_3666.initiators.var594=typeof tC.internalvars_3666.initiators.var594=="function"?tC.internalvars_3666.initiators.var594:function(){tC.internalvars.wt_referrer=tC.internalvars.wt_referrer?tC.internalvars.wt_referrer:"";}
tC.internalvars_3666.initiators.var594();tC.internalvars_3666_59.listVar.push(594);tC.internalvars_3666.initiators.var600=typeof tC.internalvars_3666.initiators.var600=="function"?tC.internalvars_3666.initiators.var600:function(){tC.internalvars.udp_pageview_url=tC.internalvars.udp_pageview_url?tC.internalvars.udp_pageview_url:"";}
tC.internalvars_3666.initiators.var600();tC.internalvars_3666_59.listVar.push(600);tC.internalvars_3666.initiators.var601=typeof tC.internalvars_3666.initiators.var601=="function"?tC.internalvars_3666.initiators.var601:function(){tC.internalvars.udp_cookie_name=tC.internalvars.udp_cookie_name?tC.internalvars.udp_cookie_name:"";}
tC.internalvars_3666.initiators.var601();tC.internalvars_3666_59.listVar.push(601);tC.internalvars_3666.initiators.var602=typeof tC.internalvars_3666.initiators.var602=="function"?tC.internalvars_3666.initiators.var602:function(){tC.internalvars.mapp_trackID_TEST=tC.internalvars.mapp_trackID_TEST?tC.internalvars.mapp_trackID_TEST:"";}
tC.internalvars_3666.initiators.var602();tC.internalvars_3666_59.listVar.push(602);tC.internalvars_3666.initiators.var603=typeof tC.internalvars_3666.initiators.var603=="function"?tC.internalvars_3666.initiators.var603:function(){tC.internalvars.udp_uievent_url=tC.internalvars.udp_uievent_url?tC.internalvars.udp_uievent_url:"";}
tC.internalvars_3666.initiators.var603();tC.internalvars_3666_59.listVar.push(603);tC.internalvars_3666.initiators.var614=typeof tC.internalvars_3666.initiators.var614=="function"?tC.internalvars_3666.initiators.var614:function(){tC.internalvars.userAgentIsBot=tC.internalvars.userAgentIsBot?tC.internalvars.userAgentIsBot:"";}
tC.internalvars_3666.initiators.var614();tC.internalvars_3666_59.listVar.push(614);tC.internalvars_3666.initiators.var617=typeof tC.internalvars_3666.initiators.var617=="function"?tC.internalvars_3666.initiators.var617:function(){tC.internalvars.playbackSessionOk=tC.internalvars.playbackSessionOk?tC.internalvars.playbackSessionOk:"";}
tC.internalvars_3666.initiators.var617();tC.internalvars_3666_59.listVar.push(617);tC.internalvars_3666.initiators.var676=function(){tC.internalFunctions.getCookie=function(key){if(key==null){return'';}
var whitelist='@$:'.split('');var hasWhitelistChars=whitelist.some(function(c){return key.indexOf(c)!==-1;});if(!hasWhitelistChars){key=encodeURIComponent(key);}else{key=key.replace('$','\\$');}
var result=new RegExp('(?:^|; )'+key+'=([^;]*)').exec(document.cookie);if(result){var decodedValue='';try{decodedValue=decodeURIComponent(result[1]);}catch(e){decodedValue=unescape(result[1]);}
return decodedValue;}
return'';};}
tC.internalvars_3666.initiators.var676();tC.internalvars_3666_59.listVar.push(676);tC.internalvars_3666.initiators.var623=function(){tC.internalvars.udp_cookie_id=(function(cookieName){var cookieId=tC.storage.get(cookieName)||tC.internalFunctions.getCookie(cookieName);if(!cookieId){cookieId=crypto.randomUUID?crypto.randomUUID():('10000000-1000-4000-8000-100000000000'.replace(/[018]/g,function(c){return(+c^crypto.getRandomValues(new Uint8Array(1))[0]&15>>+c/4).toString(16)}));tC.storage.set(cookieName,cookieId);}
tC.setCookie(cookieName,cookieId,730);return cookieId||null;})(tC.internalvars.udp_cookie_name||'srf:analytics:uuid');}
tC.internalvars_3666.initiators.var623();tC.internalvars_3666_59.listVar.push(623);tC.internalvars_3666.initiators.var626=function(){tC.internalvars.mediaPlayerInitComscore=function(){if(ns_.analytics.configuration.getPublisherConfigurations().length)return;ns_.analytics.PlatformApi.setPlatformAPI(ns_.analytics.PlatformAPIs.WebBrowser);ns_.analytics.configuration.addClient(new ns_.analytics.configuration.PublisherConfiguration({'publisherId':'6036016','persistentLabels':{'cs_fpid':tC.getCookie('cs_fpid'),'mp_login':3}}));ns_.analytics.start();};}
tC.internalvars_3666.initiators.var626();tC.internalvars_3666_59.listVar.push(626);tC.internalvars_3666.initiators.var627=function(){tC.internalvars.mediaPlayerInitComscoreMetaData=function(player_id){var analytics=ns_.analytics;window.media_player_comscore=window.media_player_comscore||{sa:{},cm:{}};if(!media_player_comscore.sa[player_id]){media_player_comscore.sa[player_id]=new analytics.StreamingAnalytics();}
media_player_comscore.sa[player_id].createPlaybackSession();media_player_comscore.cm[player_id]=new analytics.StreamingAnalytics.ContentMetadata();var mediaType="*null";switch(tc_array_events["media_duration_category"]){case"short":mediaType=analytics.StreamingAnalytics.ContentMetadata.ContentType.SHORT_FORM_ON_DEMAND;break;case"long":mediaType=analytics.StreamingAnalytics.ContentMetadata.ContentType.LONG_FORM_ON_DEMAND;break;case"infinit.livestream":mediaType=analytics.StreamingAnalytics.ContentMetadata.ContentType.LIVE;break;}
media_player_comscore.cm[player_id].setUniqueId(tc_array_events["media_segment_id"]||"*null");var mediaLength=tC.isNumeric(tc_array_events["media_segment_length"])?tc_array_events["media_segment_length"]*1000:"*null";media_player_comscore.cm[player_id].setLength(mediaLength);media_player_comscore.cm[player_id].setMediaType(mediaType);var dateOfDigitalAiring=new Date(tc_array_events["media_publication_date"]);media_player_comscore.cm[player_id].setDateOfDigitalAiring(dateOfDigitalAiring.getFullYear()||0,dateOfDigitalAiring.getMonth()?dateOfDigitalAiring.getMonth()+1:0,dateOfDigitalAiring.getDate()||0);media_player_comscore.cm[player_id].setEpisodeTitle(tc_array_events["media_segment"]||"*null");media_player_comscore.cm[player_id].setStationTitle(tc_array_events['media_channel_cs']);media_player_comscore.cm[player_id].setStationCode(tc_array_events["media_channel_cs"]||"*null");if(tc_array_events['media_tv_date']!==''){var dateOfTvAiring=new Date(tc_array_events["media_publication_date"]);media_player_comscore.cm[player_id].setDateOfTvAiring(dateOfTvAiring.getFullYear()||0,dateOfTvAiring.getMonth()?dateOfTvAiring.getMonth()+1:0,dateOfTvAiring.getDate()||0);}
media_player_comscore.cm[player_id].setEpisodeId(tc_array_events['media_tv_id']);var timeOfProduction=new Date('0000-01-01 '+tc_array_events["media_tv_time"]);media_player_comscore.cm[player_id].setTimeOfProduction(timeOfProduction.getHours()||0,timeOfProduction.getMinutes()||0);var programId=tc_array_events["media_show_id"]||"*null";media_player_comscore.cm[player_id].setProgramId(tc_array_events["media_is_live"]?"1":programId);media_player_comscore.cm[player_id].setProgramTitle(tc_array_events["media_episode"]||"*null");media_player_comscore.cm[player_id].setPublisherName('SRG');media_player_comscore.cm[player_id].setTotalSegments('1');media_player_comscore.cm[player_id].setDictionaryClassificationC3('srg');media_player_comscore.cm[player_id].setDictionaryClassificationC4(tc_array_events['media_enterprise_units']);media_player_comscore.cm[player_id].setDictionaryClassificationC6('');media_player_comscore.cm[player_id].carryTvAdvertisementLoad('*null');media_player_comscore.cm[player_id].setEpisodeNumber(tc_array_events["media_episode_id"]||"*null");media_player_comscore.cm[player_id].setGenreName(tc_array_events["media_content_group"]||"*null");media_player_comscore.cm[player_id].carryTvAdvertisementLoad('*null');media_player_comscore.sa[player_id].setMediaPlayerName(tc_array_events['media_player_name']);media_player_comscore.sa[player_id].setMediaPlayerVersion(tc_array_events['media_player_version']);media_player_comscore.sa[player_id].setMetadata(media_player_comscore.cm[player_id]);};}
tC.internalvars_3666.initiators.var627();tC.internalvars_3666_59.listVar.push(627);tC.internalvars_3666.initiators.var678=function(){tC.internalvars.rsi_risultati=function setInternalVariable(){var internalVariable="";if(dataLayer.tc_vars&&dataLayer.tc_vars.content_title&&dataLayer.tc_vars.content_title.includes("Risultati")){internalVariable="Risultati";}};}
tC.internalvars_3666.initiators.var678();tC.internalvars_3666_59.listVar.push(678);tC.internalvars_3666.initiators.var679=typeof tC.internalvars_3666.initiators.var679=="function"?tC.internalvars_3666.initiators.var679:function(){tC.internalvars.pagenotfound_url=tC.internalvars.pagenotfound_url?tC.internalvars.pagenotfound_url:"";}
tC.internalvars_3666.initiators.var679();tC.internalvars_3666_59.listVar.push(679);tC.internalvars_3666.initiators.var680=function(){tC.internalvars.media_tv_id=(function(){if(tc_vars["media_is_livestream"]==="false"){return tc_vars["media_tv_id"];}
tc_vars["media_joker1"]="";tc_vars["media_joker2"]="";tc_vars["media_joker3"]="";tc_vars["media_tv_id"]="";tc_vars['media_assigned_tags']="";return tc_vars["media_tv_id"];})();}
tC.internalvars_3666.initiators.var680();tC.internalvars_3666_59.listVar.push(680);tC.internalvars_3666.initiators.var681=function(){tC.internalvars.languageFormat=function(lang){var language={"de":"de","deu":"de","allemand":"de","deutsch":"de","tedesco":"de","hkk":"de_ad","it":"it","ita":"it","italiano":"it","italienisch":"it","italien":"it","hnn":"it_ad","fr":"fr","fra":"fr","français":"fr","französisch":"fr","teo":"fr_ad","rm":"rm","hak":"rm_ad","eng":"en","en":"en"};var langLowerCase=(lang||"und").toLowerCase();return language[langLowerCase]||langLowerCase;};}
tC.internalvars_3666.initiators.var681();tC.internalvars_3666_59.listVar.push(681);tC.internalvars_3666.initiators.var682=function(){tC.internalvars.SRGChartbeatStrategy=function(player){this._player=player;this._viewStartTime=Date.now();this._videoStartTime=undefined;this._player.one('playing',function(){this._videoStartTime=Date.now();}.bind(this));};tC.internalvars.SRGChartbeatStrategy.prototype._timeElapsed=function(timestamp){if(timestamp===undefined){return 0;}
return Date.now()-timestamp;};tC.internalvars.SRGChartbeatStrategy.ContentType={AD:"ad",CONTENT:"ct"};tC.internalvars.SRGChartbeatStrategy.AdPosition={PREROLL:"a1",MIDROLL:"a2",POSTROLL:"a3",OVERLAY:"a4",SPECIAL:"a5"};tC.internalvars.SRGChartbeatStrategy.VideoState={UNPLAYED:"s1",PLAYED:"s2",STOPPED:"s3",COMPLETED:"s4"};tC.internalvars.SRGChartbeatStrategy.prototype.isReady=function(){return Boolean(this._player)?this._player.isReady_:false;};tC.internalvars.SRGChartbeatStrategy.prototype.getTitle=function(){return tc_array_events['media_episode'];};tC.internalvars.SRGChartbeatStrategy.prototype.getVideoPath=function(){return tc_array_events['media_url'];};tC.internalvars.SRGChartbeatStrategy.prototype.getContentType=function(){return SRGChartbeatStrategy.ContentType.CONTENT;};tC.internalvars.SRGChartbeatStrategy.prototype.getAdPosition=function(){};tC.internalvars.SRGChartbeatStrategy.prototype.getTotalDuration=function(){var mediaEpisodeLength=tc_array_events['media_episode_length'];return mediaEpisodeLength!==''?Number(mediaEpisodeLength)*1000:0;};tC.internalvars.SRGChartbeatStrategy.prototype.getState=function(){if(!this._player.hasStarted()){return SRGChartbeatStrategy.VideoState.UNPLAYED;}
if(this._player.ended()){return SRGChartbeatStrategy.VideoState.COMPLETED;}
if(this._player.paused()){return SRGChartbeatStrategy.VideoState.STOPPED;}
return SRGChartbeatStrategy.VideoState.PLAYED;};tC.internalvars.SRGChartbeatStrategy.prototype.getCurrentPlayTime=function(){return Boolean(this._player)?Math.round(this._player.currentTime()*1000):0;};tC.internalvars.SRGChartbeatStrategy.prototype.getBitrate=function(){if(!this._player||!this._player.qualityLevels||!this._player.qualityLevels().length)return-1;var qualityLevels=this._player.qualityLevels();return qualityLevels[qualityLevels.selectedIndex].bitrate;};tC.internalvars.SRGChartbeatStrategy.prototype.getThumbnailPath=function(){return tc_array_events['media_thumbnail'];};tC.internalvars.SRGChartbeatStrategy.prototype.getPlayerType=function(){return tc_array_events['media_player_name'];};tC.internalvars.SRGChartbeatStrategy.prototype.getViewStartTime=function(){return this._timeElapsed(this._viewStartTime);};tC.internalvars.SRGChartbeatStrategy.prototype.getViewPlayTime=function(){if(!this._player.hasStarted()){return-1;}
return this._timeElapsed(this.viewStartTime_);};tC.internalvars.SRGChartbeatStrategy.prototype.getViewAdPlayTime=function(){};tC.internalvars.SRGChartbeatStrategy.verify=function(player){return Boolean(player)&&Boolean(player.options);};}
tC.internalvars_3666.initiators.var682();tC.internalvars_3666_59.listVar.push(682);tC.internalvars_3666.initiators.var427=typeof tC.internalvars_3666.initiators.var427=="function"?tC.internalvars_3666.initiators.var427:function(){tC.internalvars.pretty_app_name=tC.internalvars.pretty_app_name?tC.internalvars.pretty_app_name:"";}
tC.internalvars_3666.initiators.var427();tC.internalvars_3666_59.listVar.push(427);tC.internalvars_3666.initiators.var458=typeof tC.internalvars_3666.initiators.var458=="function"?tC.internalvars_3666.initiators.var458:function(){tC.internalvars.media_duration_cs=tC.internalvars.media_duration_cs?tC.internalvars.media_duration_cs:"";}
tC.internalvars_3666.initiators.var458();tC.internalvars_3666_59.listVar.push(458);tC.internalvars_3666.initiators.var469=typeof tC.internalvars_3666.initiators.var469=="function"?tC.internalvars_3666.initiators.var469:function(){tC.internalvars.media_is_livestream_cs=tC.internalvars.media_is_livestream_cs?tC.internalvars.media_is_livestream_cs:"";}
tC.internalvars_3666.initiators.var469();tC.internalvars_3666_59.listVar.push(469);tC.internalvars_3666.initiators.var485=typeof tC.internalvars_3666.initiators.var485=="function"?tC.internalvars_3666.initiators.var485:function(){tC.internalvars.chartbeat_account_id=tC.internalvars.chartbeat_account_id?tC.internalvars.chartbeat_account_id:"";}
tC.internalvars_3666.initiators.var485();tC.internalvars_3666_59.listVar.push(485);tC.internalvars_3666.initiators.var490=typeof tC.internalvars_3666.initiators.var490=="function"?tC.internalvars_3666.initiators.var490:function(){tC.internalvars.business_unit_mapped=tC.internalvars.business_unit_mapped?tC.internalvars.business_unit_mapped:"";}
tC.internalvars_3666.initiators.var490();tC.internalvars_3666_59.listVar.push(490);tC.internalvars_3666.initiators.var492=typeof tC.internalvars_3666.initiators.var492=="function"?tC.internalvars_3666.initiators.var492:function(){tC.internalvars.net_metrix_identifier=tC.internalvars.net_metrix_identifier?tC.internalvars.net_metrix_identifier:"";}
tC.internalvars_3666.initiators.var492();tC.internalvars_3666_59.listVar.push(492);tC.internalvars_3666.initiators.var502=typeof tC.internalvars_3666.initiators.var502=="function"?tC.internalvars_3666.initiators.var502:function(){tC.internalvars.netmetrix_secureSubDomain=tC.internalvars.netmetrix_secureSubDomain?tC.internalvars.netmetrix_secureSubDomain:"";}
tC.internalvars_3666.initiators.var502();tC.internalvars_3666_59.listVar.push(502);tC.internalvars_3666.initiators.var503=typeof tC.internalvars_3666.initiators.var503=="function"?tC.internalvars_3666.initiators.var503:function(){tC.internalvars.netmetrix_subDomain=tC.internalvars.netmetrix_subDomain?tC.internalvars.netmetrix_subDomain:"";}
tC.internalvars_3666.initiators.var503();tC.internalvars_3666_59.listVar.push(503);tC.internalvars_3666.initiators.var504=typeof tC.internalvars_3666.initiators.var504=="function"?tC.internalvars_3666.initiators.var504:function(){tC.internalvars.Chartbeat_userId=tC.internalvars.Chartbeat_userId?tC.internalvars.Chartbeat_userId:"";}
tC.internalvars_3666.initiators.var504();tC.internalvars_3666_59.listVar.push(504);tC.internalvars_3666.initiators.var505=typeof tC.internalvars_3666.initiators.var505=="function"?tC.internalvars_3666.initiators.var505:function(){tC.internalvars.Chartbeat_domain=tC.internalvars.Chartbeat_domain?tC.internalvars.Chartbeat_domain:"";}
tC.internalvars_3666.initiators.var505();tC.internalvars_3666_59.listVar.push(505);tC.internalvars_3666.initiators.var507=typeof tC.internalvars_3666.initiators.var507=="function"?tC.internalvars_3666.initiators.var507:function(){tC.internalvars.Chartbeat_authors=tC.internalvars.Chartbeat_authors?tC.internalvars.Chartbeat_authors:"";}
tC.internalvars_3666.initiators.var507();tC.internalvars_3666_59.listVar.push(507);
/*END_VARIABLES_BLOCK*/


/*DYNAMIC JS BLOCK 2*/

/*END DYNAMIC JS BLOCK 2*/

/*CUSTOM_JS_BLOCK2*/

/*END_CUSTOM_JS_BLOCK2*/
tC.container_3666_59.datastorage();tC.inclusion_file_1="!function(n,t){\"object\"==typeof exports&&\"object\"==typeof module?module.exports=t():\"function\"==typeof define&&define.amd?define([],t):\"object\"==typeof exports?exports.ns_=t():(n.ns_=n.ns_||{},n.ns_.analytics=t())}(\"undefined\"!=typeof self?self:this,(()=>{return n={499:(n,t,e)=>{\"use strict\";Object.defineProperty(t,\"t\",{value:!0}),t.i=t.o=t.u=void 0;var i=e(6041),r=e(8842),o=function(){function n(n,t){void 0===t&&(t=null),this.l={v:!1},this._=[],this.h=!1,this.m=-1,this.S=null,this.I=!1,this.P=!1,this.A=n,this.C=t}return n.prototype.L=function(){return this.D(),this.l},n.prototype.N=function(n){this._.indexOf(n)>-1||(this._.push(n),this.D())},n.prototype.D=function(){var n=this;if(!this.h){this.h=!0;var t=+new Date,e=-1,r=function(r){if(!n.S){n.m=r.T,n.l={v:!1},-1==e&&(e=+new Date-t);try{if(\"sectionChange\"==r.eventName||\"loaded\"==r.pingData.cmpStatus&&\"visible\"!=r.pingData.cmpDisplayStatus){var o=n.A(\"getGPPData\"),s=n.A(\"getSection\",null,\"tcfeuv2\");if(!o||!s||-1==r.pingData.supportedAPIs.indexOf(\"tcfeuv2\")||-1==o.applicableSections||0==o.applicableSections||o.applicableSections instanceof Array&&-1!=o.applicableSections.indexOf(-1))return void(n.C?(n.P=!0,n.O(n.C)):n.l=(0,i.k)({cs_cmp_id:r.pingData.cmpId,cs_cmp_rt:e,cs_cmp_av:r.pingData.gppVersion,gpp_sid:2}));n.l=(0,i.R)(s,{cs_cmp_id:r.pingData.cmpId,cs_cmp_sv:s.cmpVersion,cs_cmp_rt:e,cs_cmp_av:r.pingData.gppVersion,gpp_sid:2}),n.l.v&&n.M()}}catch(u){n.I=!0,n.U()}}};try{r(this.A(\"addEventListener\",r))}catch(o){this.I=!0,this.U()}}},n.prototype.M=function(){for(var n=0,t=this._;n<t.length;n++)(0,t[n])()},n.prototype.removeEventListener=function(){try{this.A(\"removeEventListener\",null,this.m)}catch(n){}},n.prototype.U=function(){this.removeEventListener(),this.C?this.O(this.C):(this.l={v:!0,W:!0,F:!1,V:{cs_cmp_ie:3}},this.M())},n.prototype.O=function(n){var t=this;if(!this.S){this.removeEventListener();var e=this.S=new r.B(n);e.N((function(){t.l=e.L(),t.l.v&&(t.I?t.l.V.cs_cmp_ie=1:t.P&&(t.l.V.cs_cmp_ie=2),t.M())}))}},n}();t.u=o,t.o=function(){if(\"function\"!=typeof __gpp)return!1;var n=__gpp(\"ping\");return n&&\"1.0\"==n.gppVersion},t.i=function(){return __gpp}},7447:(n,t,e)=>{\"use strict\";Object.defineProperty(t,\"t\",{value:!0}),t.G=t.j=t.H=void 0;var i=e(6041),r=e(8842),o=function(){function n(n,t){void 0===t&&(t=null),this.l={v:!1},this._=[],this.h=!1,this.m=-1,this.S=null,this.I=!1,this.P=!1,this.A=n,this.C=t}return n.prototype.L=function(){return this.D(),this.l},n.prototype.N=function(n){this._.indexOf(n)>-1||(this._.push(n),this.D())},n.prototype.D=function(){var n=this;if(!this.h){this.h=!0;var t=+new Date,e=-1;try{this.A(\"addEventListener\",(function(r){if(!n.S){n.m=r.T,n.l={v:!1},-1==e&&(e=+new Date-t);try{if(\"signalStatus\"!=r.eventName||\"ready\"!=r.data)return;if(!r.pingData.parsedSections.tcfeuv2||-1==r.pingData.applicableSections||0==r.pingData.applicableSections||r.pingData.applicableSections instanceof Array&&-1!=r.pingData.applicableSections.indexOf(-1))return void(n.C?(n.P=!0,n.O(n.C)):n.l=(0,i.k)({cs_cmp_id:r.pingData.cmpId,cs_cmp_rt:e,gpp_sid:2,cs_cmp_av:r.pingData.gppVersion}));n.l=(0,i.R)(r.pingData.parsedSections.tcfeuv2,{cs_cmp_id:r.pingData.cmpId,cs_cmp_sv:r.pingData.parsedSections.tcfeuv2.cmpVersion,cs_cmp_rt:e,cs_cmp_av:r.pingData.gppVersion,gpp_sid:2}),n.l.v&&n.M()}catch(o){n.I=!0,n.U()}}}))}catch(r){this.I=!0,this.U()}}},n.prototype.M=function(){for(var n=0,t=this._;n<t.length;n++)(0,t[n])()},n.prototype.U=function(){this.removeEventListener(),this.C?this.O(this.C):(this.l={v:!0,W:!0,F:!1,V:{cs_cmp_ie:3}},this.M())},n.prototype.removeEventListener=function(){try{this.A(\"removeEventListener\",(function(){}),this.m)}catch(n){}},n.prototype.O=function(n){var t=this;if(!this.S){this.removeEventListener();var e=this.S=new r.B(n);e.N((function(){t.l=e.L(),t.l.v&&(t.I?t.l.V.cs_cmp_ie=1:t.P&&(t.l.V.cs_cmp_ie=2)),t.M()}))}},n}();t.H=o,t.j=function(){return\"function\"==typeof __gpp},t.G=function(){return __gpp}},5682:function(n,t,e){\"use strict\";var i=this&&this.K||(Object.create?function(n,t,e,i){i===undefined&&(i=e);var r=Object.getOwnPropertyDescriptor(t,e);r&&!(\"get\"in r?!t.t:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[e]}}),Object.defineProperty(n,i,r)}:function(n,t,e,i){i===undefined&&(i=e),n[i]=t[e]}),r=this&&this.J||function(n,t){for(var e in n)\"default\"===e||Object.prototype.hasOwnProperty.call(t,e)||i(t,n,e)};Object.defineProperty(t,\"t\",{value:!0}),t.Y=void 0;var o=e(8842),s=e(499),u=e(7447);r(e(1196),t);var a={v:!0,W:!0,F:!1,V:{}},f=function(){function n(){}return n.prototype.X=function(){return this.Z(),this.nn?this.nn.L():a},n.prototype.tn=function(n){this.Z(),this.nn&&this.nn.N(n)},n.prototype.en=function(){return null!=this.nn},n.prototype.Z=function(){null==this.nn&&((0,s.o)()?this.nn=new s.u((0,s.i)(),(0,o.rn)()?(0,o.sn)():null):(0,u.j)()?this.nn=new u.H((0,u.G)(),(0,o.rn)()?(0,o.sn)():null):(0,o.rn)()&&(this.nn=new o.B((0,o.sn)())))},n}();t.Y=f},8842:(n,t,e)=>{\"use strict\";Object.defineProperty(t,\"t\",{value:!0}),t.sn=t.rn=t.B=void 0;var i=e(6041),r=function(){function n(n){this.l={v:!1},this._=[],this.h=!1,this.C=n}return n.prototype.L=function(){return this.D(),this.l},n.prototype.N=function(n){this._.indexOf(n)>-1||(this._.push(n),this.D())},n.prototype.D=function(){var n=this;if(!this.h){this.h=!0;var t=+new Date,e=-1;try{this.C(\"addEventListener\",2,(function(r,o){o&&(n.l={v:!1},\"tcloaded\"!=r.eventStatus&&\"useractioncomplete\"!=r.eventStatus||(-1==e&&(e=+new Date-t),n.l=(0,i.R)(r,{cs_cmp_id:r.cmpId,cs_cmp_sv:r.cmpVersion,cs_cmp_rt:e}),n.l.v&&n.M()))}))}catch(r){}}},n.prototype.M=function(){for(var n=0,t=this._;n<t.length;n++)(0,t[n])()},n}();t.B=r,t.rn=function(){return\"function\"==typeof __tcfapi},t.sn=function(){return __tcfapi}},6041:function(n,t){\"use strict\";var e=this&&this.un||function(){return e=Object.assign||function(n){for(var t,e=1,i=arguments.length;e<i;e++)for(var r in t=arguments[e])Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n},e.apply(this,arguments)};function i(n){var e={};if(!n)return e;for(var i=0,r=t.an;i<r.length;i++){var o=r[i];e[o]=n.purpose.consents[o]}return e}function r(n){return{v:!0,W:!0,F:!0,V:e({gdpr:0,cs_ucc:1},n)}}Object.defineProperty(t,\"t\",{value:!0}),t.k=t.R=t.an=t.fn=void 0,t.fn=77,t.an=[1,7,8,9,10],t.R=function(n,o){return n.gdprApplies?function(n,t){var i,r={gdpr:1};r.gdpr_li=n.cn?1:0,r.gdpr_pcc=n.ln,n.vn&&n.purposeOneTreatment?(r.gdpr_p1t=1,i=!0):(r.gdpr_p1t=0,i=!!n.consents[1]);var o=!1;if(n.dn){o=i;var s=[];i&&s.push(1),n.consents[7]&&s.push(7),n.consents[8]&&s.push(8),n.consents[9]&&s.push(9),n.consents[10]&&s.push(10),r.gdpr_purps=s.join(\",\")}else r.gdpr_purps=\"\";return{v:!0,W:o,F:!0,V:e(e({cs_ucc:1},r),t)}}({vn:n.isServiceSpecific,purposeOneTreatment:n.purposeOneTreatment,cn:n.vendor.legitimateInterests[t.fn],dn:n.vendor.consents[t.fn],consents:i(n),ln:n.publisherCC||\"\"},e({},o)):r(o)},t.k=r},1196:(n,t)=>{\"use strict\";Object.defineProperty(t,\"t\",{value:!0})},4855:(n,t,e)=>{var i,r=e(634),o=e(7297),s=e(6286),u=e(623),a=e(390),f=e(6397),c=e(1695);i=new function(){r.extend(this,{StreamingAnalytics:c,PlatformAPIs:f._n.PlatformApis,PlatformApi:f._n,ConnectivityType:u,EventInfo:s,configuration:o.configuration.pn,version:a.VERSION,start:function(){o.start()},notifyHiddenEvent:function(n){o.hn(n)},notifyViewEvent:function(n){o.gn(n)},notifyDistributedContentViewEvent:function(n,t){o.notifyDistributedContentViewEvent(n,t)},notifyUxActive:function(){o.notifyUxActive()},notifyUxInactive:function(){o.notifyUxInactive()},notifyEnterForeground:function(){o.notifyEnterForeground()},notifyExitForeground:function(){o.notifyExitForeground()},flushOfflineCache:function(){o.flushOfflineCache()},clearOfflineCache:function(){o.clearOfflineCache()},clearInternalData:function(){o.clearInternalData()}})},n.exports=i},390:(n,t,e)=>{var i=\"http:\/\/b.scorecardresearch.com/p\",r=\"https:\/\/sb.scorecardresearch.com/p\",o={VERSION:\"7.9.0+2406050415\",mn:!0,yn:5e3,Sn:!0,bn:e(5174).STANDARD,wn:[\"c1\",\"c2\",\"ca2\",\"cb2\",\"cc2\",\"cd2\",\"ns_site\",\"ns_ap_an\",\"ns_ap_pn\",\"ns_ap_pv\",\"c12\",\"ca12\",\"cb12\",\"cc12\",\"cd12\",\"ns_ak\",\"ns_ar\",\"name\",\"ns_ap_ni\",\"ns_ap_ec\",\"ns_ap_ev\",\"ns_ap_device\",\"ns_ap_id\",\"ns_ap_csf\",\"ns_ap_bi\",\"ns_ap_pfm\",\"ns_ap_pfv\",\"ns_ap_ver\",\"ns_ap_sv\",\"ns_ap_bv\",\"ns_ap_cv\",\"ns_ap_smv\",\"ns_type\",\"cs_partner\",\"cs_xcid\",\"cs_impid\",\"cs_proid\",\"cs_dc_di\",\"cs_dc_ci\",\"cs_dc_ei\",\"ns_ap_ui\",\"ns_ap_gs\",\"ns_ap_ie\",\"ns_ts\",\"ns_ap_cfg\",\"ns_ap_env\",\"ns_ap_ais\",\"ns_ap_ut\",\"ns_ap_er\",\"cs_fpcu\",\"cs_fpid\",\"cs_fpit\",\"cs_fpdm\",\"cs_fpdt\",\"ns_st_sv\",\"ns_st_pv\",\"ns_st_smv\",\"ns_st_it\",\"ns_st_id\",\"ns_st_ec\",\"ns_st_cn\",\"ns_st_ev\",\"ns_st_sp\",\"ns_st_sc\",\"ns_st_ppc\",\"ns_st_apc\",\"ns_st_spc\",\"ns_st_dppc\",\"ns_st_dapc\",\"ns_st_dspc\",\"ns_st_psq\",\"ns_st_asq\",\"ns_st_sq\",\"ns_st_po\",\"ns_st_lda\",\"ns_st_ldw\",\"ns_st_ldo\",\"ns_st_hc\",\"ns_st_hd\",\"ns_st_mp\",\"ns_st_mv\",\"ns_st_cl\",\"ns_st_sl\",\"ns_st_pn\",\"ns_st_tp\",\"ns_st_ct\",\"ns_st_ad\",\"ns_st_li\",\"ns_st_ty\",\"ns_st_ci\",\"ns_st_si\",\"ns_ap_et\",\"ns_ap_ar\",\"cs_c12u\",\"ca_cs_c12u\",\"cb_cs_c12u\",\"cc_cs_c12u\",\"cd_cs_c12u\",\"ns_ap_cs\",\"ns_ap_fg\",\"ns_ap_dft\",\"ns_ap_dbt\",\"ns_ap_dit\",\"ns_ap_as\",\"ns_ap_das\",\"ns_ap_usage\",\"ns_category\",\"category\",\"ns_radio\",\"ns_st_pt\",\"ns_st_ipt\",\"ns_st_iap\",\"ns_st_iet\",\"ns_st_iupc\",\"ns_st_iupa\",\"ns_st_ilpc\",\"ns_st_ilpa\",\"ns_st_ibc\",\"ns_st_ibt\",\"ns_st_itpc\",\"ns_st_icpc\",\"ns_st_ae\",\"ns_st_er\",\"ns_st_cfg\",\"ns_st_rcn\",\"ns_st_cpo\",\"ns_st_ui\",\"c3\",\"ca3\",\"cb3\",\"cc3\",\"cd3\",\"c4\",\"ca4\",\"cb4\",\"cc4\",\"cd4\",\"c6\",\"ca6\",\"cb6\",\"cc6\",\"cd6\",\"ns_st_bn\",\"ns_st_tb\",\"ns_st_an\",\"ns_st_ta\",\"ns_st_ce\",\"ns_st_ia\",\"ns_st_pu\",\"ns_st_st\",\"ns_st_stc\",\"ns_st_sta\",\"ns_st_pr\",\"ns_st_tpr\",\"ns_st_sn\",\"ns_st_en\",\"ns_st_ep\",\"ns_st_tep\",\"ns_st_dt\",\"ns_st_ddt\",\"ns_st_tdt\",\"ns_st_tm\",\"ns_st_dtm\",\"ns_st_ttm\",\"ns_st_ge\",\"ns_st_tge\",\"ns_st_cs\",\"ns_st_ft\",\"ns_st_amg\",\"ns_st_ami\",\"ns_st_amp\",\"ns_st_amw\",\"ns_st_amt\",\"ns_st_ams\",\"ns_st_cde\",\"ns_st_cds\",\"ns_st_cdc\",\"ns_st_cda\",\"ns_st_cdm\",\"ns_st_cmt\",\"ns_st_amd\",\"ns_st_amo\",\"ns_st_sr\",\"ns_st_pl\",\"ns_st_ca\",\"ns_st_cp\",\"ns_st_fee\",\"ns_st_dskc\",\"ns_st_dska\",\"ns_st_skd\",\"ns_st_dskt\",\"ns_st_dpc\",\"ns_ap_i1\",\"ns_ap_i2\",\"ns_ap_i3\",\"ns_ap_i4\",\"ns_ap_i5\",\"ns_ap_i6\",\"cs_ucfr\",\"gdpr\",\"gdpr_p1t\",\"gdpr_li\",\"gdpr_pcc\",\"gdpr_purps\",\"gdpr_consent\",\"gpp\",\"gpp_sid\",\"cs_ucc\",\"cs_cmp_id\",\"cs_cmp_sv\",\"cs_cmp_rt\",\"c5\",\"c10\",\"c11\",\"c13\",\"c14\",\"c15\",\"c16\",\"ns_ap_install\",\"ns_ap_updated\",\"ns_ap_lastrun\",\"ns_ap_ft\",\"ns_ap_bt\",\"ns_ap_it\",\"ns_ap_res\",\"ns_ap_sd\",\"ns_ap_po\",\"ns_ap_ot\",\"ns_ap_lang\",\"ns_ap_miss\",\"ns_ap_jb\",\"ns_ap_oc\",\"ns_c\",\"ns_st_cev\",\"ns_st_lt\",\"ns_st_br\",\"ns_st_pbr\",\"ns_st_rt\",\"ns_st_prt\",\"ns_st_vo\",\"ns_st_pvo\",\"ns_st_ws\",\"ns_st_pws\",\"ns_st_rp\",\"ns_st_at\",\"ns_st_pat\",\"ns_st_vt\",\"ns_st_pvt\",\"ns_st_tt\",\"ns_st_ptt\",\"ns_st_cdn\",\"ns_st_pcdn\",\"ns_st_pb\",\"ns_st_dpt\",\"ns_st_ap\",\"ns_st_dap\",\"ns_st_et\",\"ns_st_det\",\"ns_st_upc\",\"ns_st_dupc\",\"ns_st_upa\",\"ns_st_dupa\",\"ns_st_lpc\",\"ns_st_dlpc\",\"ns_st_lpa\",\"ns_st_dlpa\",\"ns_st_bc\",\"ns_st_dbc\",\"ns_st_bt\",\"ns_st_dbt\",\"ns_st_bp\",\"ns_st_dtpc\",\"ns_st_dcpc\",\"ns_st_skc\",\"ns_st_ska\",\"ns_st_skt\",\"ns_st_pc\",\"ns_st_pp\",\"ns_st_pa\",\"c7\",\"c8\",\"c9\",\"ns_st_cu\",\"ns_st_amc\"],En:i,In:i+\"2\",Pn:r,An:r+\"2\"};n.exports=o},7297:(n,t,e)=>{var i,r=e(634),o=e(4352),s=e(1843),u=e(1770),a=e(6286),f=e(6471),c=e(6397).Cn,l=e(1186),v=e(3181),d=e(1234),_=e(9301),p=e(9182),h=e(6271),g=e(5634),m=e(6018),y=e(4156),S=e(4219),b=e(7429),w=e(390),E=e(6974),I=e(9283),P=e(7227),A=e(1625),C=e(3492);i=new function(){var n,t,e,i,L,D,N,T,O,k,R,M,U,x,W,F,V,B,q,G,j=this;function H(){var n;W.Ln()||V.Dn((function(n){n.W&&L.Nn()})),((n=L.On()).Tn||n.kn)&&W.Rn(n.Mn)}function K(n){G.push((function(){e.Un(n,X(),W)}))}function J(r){switch(r){case u.DISABLE:!function(){O&&(O=!1,R&&c.clearTimeout(q),x&&(T.stop(),I.Wn().xn()),(k||R)&&(t.Fn(this),t.Vn(this),t.Bn(),F.qn()),N&&N.Gn())}();break;case u.TIME_WINDOW_ELAPSED:V.Dn((function(r){!function(r){e=new s(t,n,N,i,D,L,V,B),(T=new p(n)).jn(j),r.W&&z(),W.Hn()>=0&&t.Kn(W.Hn(),W.Jn()==v.FOREGROUND_ONLY),T.Yn(W.isKeepAliveMeasurementEnabled()),I.Wn().zn(W),x=!0,n.commit()}(r),function(){for(var n=0;n<G.length;++n)(0,G[n])();G=[]}()}));break;case u.PARTNER:case u.PUBLISHER:x&&(V.Dn((function(t){t.W&&(z(),n.commit())})),n.commit());break;case u.OFFLINE_CACHE_MODE:break;case u.KEEP_ALIVE:x&&T.Yn(W.isKeepAliveMeasurementEnabled());break;case u.DISABLED_TCF_INTEGRATION:V.disableCmpIntegration(),B.disableCmpIntegration();break;case u.Xn:B.enableFirstPartyCookie();break;case u.Qn:B.$n();break;case u.DISABLED_CMP_INTEGRATION:V.disableCmpIntegration(),B.disableCmpIntegration()}}function Y(n,e,i,r){var o;k&&x?n():U?G.push(n):i?(G.push(n),K(e),M=!0):(M||(o=e,G.push((function(){t.notifyEnterForeground(o)})),M=!0),r||K(e),G.push(n),U=!0)}function z(){for(var t=n.get(S.Zn,{}),i=W.getPublisherConfigurations(),r=\"a\".charCodeAt(0)-1,o=0;o<i.length;++o){var s=i[o],u=s.getPublisherId(),a=L.nt(s.getPublisherSecret()),f=t[u],c=\"\";r>=\"a\".charCodeAt(0)&&(c=\"c\"+String.fromCharCode(r)+\"_\"),r++,f&&f!=a&&e.tt(c+\"cs_c12u\",f),t[u]=a,s.setPublisherUniqueDeviceId(a)}n.put(S.Zn,t)}function X(n){var t;if(n instanceof a)t=n;else{t=new a,\"object\"==typeof n&&t.addLabels(n);var e=W.getIncludedPublishers();if(e.length>0)for(var i=0;i<e.length;++i)t.addIncludedPublisher(e[i])}return t.getIncludedPublishers().length>0&&W.getPartnerConfigurations().length>0&&t.addIncludedPublisher(o.et),t}i=new _(H),O=!0,k=!1,R=!1,M=!1,U=!1,x=!1,W=new o,V=new P,B=new A,G=[],W.addListener(J),r.extend(j,{configuration:W,start:function(){if(W.it(),!k&&!R){B.rt(c.ot),R=!0;var i,r,o=C.st();F=new E(W),function(n){var t=new y;t.ut(n),t.ft(n)}(n=new d(F)),N=new h(n,F),(i=new b(F,n,N)).ct(),i.lt(),L=new m(n,V),O&&(D=new g(n,W),(t=new l(n,o)).vt(j),t.dt(j),U||(r=o,O&&Y((function(){0==e._t()&&e.Un(r,X(),W)}),r,!1,!0),U=!0),k=!0,n.commit(),V.ht(),q=c.setTimeout((function(){V.Dn((function(t){t.W||V.gt(n),q=null,W.yt()}))}),w.yn))}},hn:function(n){if(O){var t=C.st();Y((function(){e.hn(t,X(n),W)}),t)}},notifyDistributedContentViewEvent:function(n,t){if(W.getPartnerConfiguration(n)){var e=new f;e.St(!1),e.addIncludedPublisher(o.et),e.setLabel(\"ns_ap_ev\",\"distributed_view\"),e.setLabel(\"cs_dc_di\",n),e.setLabel(\"cs_dc_ci\",t),j.gn(e)}},gn:function(n){if(O){var t=C.st();Y((function(){e.gn(t,X(n),W)}),t)}},notifyUxActive:function(){if(O){var n=C.st();Y((function(){t.notifyUxActive(n)}),n)}},notifyUxInactive:function(){if(O){var n=C.st();Y((function(){t.notifyUxInactive(n)}),n)}},notifyEnterForeground:function(){if(O){var n=C.st();Y((function(){t.notifyEnterForeground(n)}),n,!0)}},notifyExitForeground:function(){if(O){var n=C.st();Y((function(){t.notifyExitForeground(n)}),n,!0)}},flushOfflineCache:function(){O&&k&&Y((function(){N.flush(W,!0),N.persist(),n.commit()}),C.st())},clearOfflineCache:function(){O&&k&&Y((function(){N.Gn(),N.persist(),n.commit()}),C.st())},clearInternalData:function(){O&&k&&Y((function(){n.clear(),n.commit()}),C.st())},bt:function(){e.wt(C.st(),X(),W),n.commit()},Et:function(n,t){O&&n==l.Pt.It&&(x?T.start(p.At):G.push((function(){T.start(p.At)})))},Ct:function(n,t){if(O){var e=function(){n==l.Pt.It&&(x?T.stop():G.push((function(){T.stop()})))};x?e():G.push(e)}},Lt:function(n,t){},Dt:function(n,t){}})},n.exports=i},9182:(n,t,e)=>{var i=e(634),r=e(6397).Cn,o=e(4219),s=e(3492),u=864e5;function a(n){var t,e,a,f,c=this;t=!0,e=!1,i.extend(c,{start:function(i){c.stop(),t&&(e=!0,a=r.setTimeout((function(){if(function(){if(t){var e=n.get(o.Nt,0),i=s.st()-e;e>0&&i>86399e3&&f&&f.bt()}}(),e){var i=n.get(o.Nt,0);if(0==i)c.start(3e3);else{var r=u-(s.st()-i);c.start(r)}}}),i))},stop:function(){e&&(e=!1,r.clearTimeout(a),a=null)},Yn:function(n){t=n},jn:function(n){f=n}})}a.ENABLED=!0,a.At=3e3,n.exports=a},5634:(n,t,e)=>{var i=e(634),r=e(4219),o=e(3492);n.exports=function(n,t){var e,s,u,a,f=-1;!function(){u=!1,a=!1,f=n.get(r.Tt,-1),e=n.get(r.Ot,-1),s=n.get(r.kt,null),n.put(r.kt,t.Rt());var i=o.st();-1==f?(f=i,e=i,n.put(r.Tt,f),n.put(r.Ot,e),u=!0):s&&s!=t.Rt()&&(e=i,n.put(r.Ot,e),n.put(r.Mt,0),a=!0)}(),i.extend(this,{Ut:function(){return s},xt:function(){return f},Wt:function(){return e},Ft:function(){return a},Vt:function(){return u}})}},6440:(n,t,e)=>{var i=e(634),r=e(8293),o=\"unknown\",s={Bt:function(n,t,e){return-1==n.indexOf(\"?\")?n+=\"?\":n+=\"&\",n+s.qt(t,e)},Gt:function(n,t){return i.extend(n,s.jt(t||{}))},jt:function(n){var t={};for(var e in n)if(n.hasOwnProperty(e)){var i=n[e];null===i||i===undefined?t[e]=i:t[e]=n[e]+\"\"}return t},qt:function(n,t){var e=!1,r=\"\";n=i.Ht(n);for(var o=\"undefined\"!=typeof encodeURIComponent?encodeURIComponent:escape,s=0;s<t.length;++s){var u=t[s];null!=n[u]&&(e&&(r+=\"&\"),e=!0,r+=o(u)+\"=\"+o(n[u]),delete n[u])}for(u in n)null!=n[u]&&(e&&(r+=\"&\"),e=!0,r+=o(u)+\"=\"+o(n[u]));return r},Kt:function(n){return o==n?o:r.Jt(n)?\"1\":\"0\"}};n.exports=s},969:(n,t,e)=>{var i=e(634),r=e(9911),o=e(390),s=e(9182);n.exports=function(n){var t,e,u,a,f;function c(t,e){return n&&null!=n[t]?n[t]:e}i.extend(this,{addPersistentLabels:function(n){r.Yt(e,n)},setPersistentLabel:function(n,t){r.zt(e,n,t)},removeAllPersistentLabels:function(){e={}},removePersistentLabel:function(n){delete e[n]},getStartLabels:function(){return t},getPersistentLabels:function(){return e},containsPersistentLabel:function(n){return null!=e[n]},containsStartLabel:function(n){return null!=t[n]},getPersistentLabel:function(n){return e[n]},isKeepAliveMeasurementEnabled:function(){return u},isSecureTransmissionEnabled:function(){return a},isHttpRedirectCachingEnabled:function(){return f}}),u=s.ENABLED,a=o.Sn,f=o.mn,e={},t=c(\"startLabels\",t={}),e=c(\"persistentLabels\",e),u=c(\"keepAliveMeasurement\",u),a=c(\"secureTransmission\",a),f=c(\"httpRedirectCaching\",f)}},4352:(n,t,e)=>{var i=e(634),r=e(9911),o=e(3492),s=e(6271),u=e(5333),a=e(390),f=e(4341),c=e(1186),l=e(6974),v=e(1770),d=e(2532),_=e(8576),p=e(5156),h=e(6397),g=h.Cn,m=e(9283),y=f.Xt,S=\"21193409\";function b(){var n,t,e,f,w,E,I,P,A,C,L,D,N,T,O,k,R,M,U,x,W,F,V,B,q,G,j,H,K,J,Y,z,X,Q,$,Z,nn,tn,en,rn,on,sn=this;function un(){(function(){if(q.length>0){for(var n=!1,t=0;t<T.length;++t){var e=T[t];if(-1!=q.indexOf(e.getPublisherId())){n=!0;break}}return!n&&O.length>0&&-1!=q.indexOf(S)&&(n=!0),n}return!0})()&&(fn(),L&&function(){var n=L.split(\"?\");if(L=n[0],n[1])for(var t=n[1].split(\"&\"),e=0;e<t.length;e++){var i=t[e].split(\"=\");I[i[0]]=i[1]?i[1]:\"\"}}(),N&&N!=s.Qt||(N=n?s.$t:s.Qt),O.length>0&&0==T.length&&an(),f=!0,cn(v.TIME_WINDOW_ELAPSED))}function an(){if(!E){E=!0;var n=new _({publisherId:z.getPublisherId(),publisherSecret:z.getPublisherSecret()});T.push(n),cn(v.PUBLISHER)}}function fn(){!function(){if(0!=T.length)for(var e=0;e<T.length;++e){var i=T[e];i.getPublisherId()!=z.getPublisherId()&&(n=i.isSecureTransmissionEnabled(),A=i.isKeepAliveMeasurementEnabled(),t=i.isHttpRedirectCachingEnabled())}}(),function(){if(0!=O.length)for(var e=1==T.length&&T[0].getPublisherId()==z.getPublisherId(),i=0;i<O.length;++i){var r=O[i];e&&r.isSecureTransmissionEnabled()&&(n=!0),A=r.isKeepAliveMeasurementEnabled(),t=r.isHttpRedirectCachingEnabled()}}()}function cn(n){for(var t=F.slice(),e=0;e<t.length;++e)t[e](n)}i.extend(sn,{it:function(){h.Zt(),$=-1==$?g.ne:$,Z=-1==Z?g.te:Z},addListener:function(n){o.ee(n)&&F.push(n)},yt:function(){w||(w=!0,(O.length>0||T.length>0)&&un())},addClient:function(n){n instanceof p&&function(n){if(n.getPartnerId()){for(var t=0;t<O.length;++t)if(O[t].getPartnerId()==n.getPartnerId())return;O.push(n),an(),w&&(f?fn():un()),cn(v.PARTNER)}}(n),n instanceof _&&function(n){if(n.getPublisherId()&&n.getPublisherSecret()&&n.getPublisherId()!=b.et){for(var t=0;t<T.length;++t)if(T[t].getPublisherId()==n.getPublisherId())return;T.length>0&&T[T.length-1].getPublisherId()==z.getPublisherId()?T.splice(T.length-1,0,n):T.push(n),w&&(f?fn():un()),cn(v.PUBLISHER)}}(n)},ie:function(){var i=\"\",r=\"-\";return i+=n?\"1\":\"0\",i+=A?\"1\":\"0\",i+=t?\"1\":\"0\",i+=e?\"1\":\"0\",i+=Q?\"1\":\"0\",i+=tn?\"1\":\"0\",i+=k?\"1\":\"0\",i+=R?\"1\":\"0\",i+=M?\"1\":\"0\",i+=r,i+=C+\"\",i+=D+\"\",i+=J+\"\",i+=r,i+=Y.toString(16).toUpperCase(),i+=r,i+=G.toString(16).toUpperCase(),i+=r,i+=j.toString(16).toUpperCase(),i+=r,i+=K.toString(16).toUpperCase(),i+=r,i+=H.toString(16).toUpperCase(),i+=r,i+=($/100).toString(16).toUpperCase(),i+=r,i+=(Z/100).toString(16).toUpperCase(),i+=r,i+=(nn/100).toString(16).toUpperCase()},re:function(n){for(var t=0;t<T.length;++t)if(T[t].getPublisherId()==n)return!0;return!1},oe:function(n){for(var t=0;t<O.length;++t)if(O[t].getPartnerId()==n)return!0;return!1},getPartnerConfiguration:function(n){for(var t=0;t<O.length;++t){var e=O[t];if(e.getPartnerId()==n)return e}return null},getPublisherConfiguration:function(n){for(var t=0;t<T.length;++t){var e=T[t];if(e.getPublisherId()==n)return e}return null},se:function(){for(var n=[],t=0;t<T.length;++t){var e=T[t];n.push(e.getPublisherId())}return n},getPublisherConfigurations:function(){return T},getPartnerConfigurations:function(){return O},getLabelOrder:function(){return W},setLabelOrder:function(n){n instanceof Array&&(W=i.Ht(n),cn(v.LABEL_ORDER))},ue:function(){return L},setLiveEndpointUrl:function(n){f||(L=n)},ae:function(){return N},setOfflineFlushEndpointUrl:function(n){f||(N=n)},fe:function(){return U},setApplicationName:function(n){f||(U=n)},setApplicationVersion:function(n){f||(x=n)},Rt:function(){return x},ce:function(){return g.le()},setPersistentLabel:function(n,t){r.zt(I,n,t)&&cn(v.PERSISTENT_LABELS)},removeAllPersistentLabels:function(){I={},cn(v.PERSISTENT_LABELS)},removePersistentLabel:function(n){delete I[n],cn(v.PERSISTENT_LABELS)},getPersistentLabels:function(){return I},getPersistentLabel:function(n){return I[n]},containsPersistentLabel:function(n){return null!=I[n]},addPersistentLabels:function(n){r.Yt(I,n),cn(v.PERSISTENT_LABELS)},setStartLabel:function(n,t){r.zt(P,n,t)&&cn(v.START_LABELS)},removeAllStartLabels:function(){P={},cn(v.START_LABELS)},removeStartLabel:function(n){delete P[n],cn(v.START_LABELS)},addStartLabels:function(n){r.Yt(P,n),cn(v.START_LABELS)},getStartLabels:function(){return P},ve:function(n){return P[n]},containsStartLabel:function(n){return null!=P[n]},setKeepAliveMeasurementEnabled:function(n){null!=n&&(A=n,cn(v.KEEP_ALIVE))},isKeepAliveMeasurementEnabled:function(){return A},isSecureTransmissionEnabled:function(){return n},isHttpRedirectCachingEnabled:function(){return t},setLiveTransmissionMode:function(n){n&&(C=n,cn(v.LIVE_TRANSMISSION_MODE))},de:function(){return C},enableImplementationValidationMode:function(){f||(e=!0)},_e:function(){return e},setOfflineCacheMode:function(n){n&&(D=n,cn(v.OFFLINE_CACHE_MODE))},pe:function(){return D},setUsagePropertiesAutoUpdateMode:function(n){n&&(f||(J=n))},Jn:function(){return J},setUsagePropertiesAutoUpdateInterval:function(n){f||(Y=n)},Hn:function(){return Y},setCacheMaxMeasurements:function(n){f||(G=n)},he:function(){return G},setCacheMaxFlushesInARow:function(n){f||(j=n)},ge:function(){return j},setCacheMinutesToRetry:function(n){f||(H=n)},me:function(){return H},setCacheMeasurementExpiry:function(n){f||(K=n)},ye:function(){return K},isEnabled:function(){return B},Se:function(){return f},disable:function(){B&&(B=!1,cn(v.DISABLE))},disableTcfIntegration:function(){k&&(k=!1,cn(v.DISABLED_TCF_INTEGRATION))},disableCmpIntegration:function(){k&&(k=!1,cn(v.DISABLED_CMP_INTEGRATION))},enableFirstPartyCookie:function(){f||(R=!0,cn(v.Xn))},bypassUserConsentRequirementFor1PCookie:function(){f||(M=!0,cn(v.Qn))},removeListener:function(n){if(o.ee(n)){var t=F.indexOf(n);-1!=t&&F.splice(t,1)}},be:function(){return sn.getPublisherConfiguration(S)},setDebugEnabled:function(n){f||(X=n)},we:function(){return X},setSystemClockJumpDetectionEnabled:function(n){f||(Q=n)},Ee:function(){return Q},setSystemClockJumpDetectionInterval:function(n){f||(n=100*Math.floor(n/100),$=n)},setSystemClockJumpDetectionAlternativeContextInterval:function(n){f||(n=100*Math.floor(n/100),Z=n)},Ie:function(){return $},Pe:function(){return Z},setSystemClockJumpDetectionPrecision:function(n){f||(n=100*Math.floor(n/100),nn=n)},Ae:function(){return nn},setStorageWriteInterval:function(n){0!=en&&(n<l.Ce||n>l.Le)||(rn=!0,en=n)},De:function(){return rn?en:g.Ne},addIncludedPublisher:function(n){-1==q.indexOf(n)&&q.push(n)},getIncludedPublishers:function(){return q},addCrossPublisherUniqueDeviceIdChangeListener:function(n){o.ee(n)&&-1===V.indexOf(n)&&V.push(n)},removeCrossPublisherUniqueDeviceIdChangeListener:function(n){var t=V.indexOf(n);-1!==t&&V.splice(t,1)},Rn:function(n){if(\"string\"==typeof n)for(var t=0;t<V.length;t++)V[t](n)},enableChildDirectedApplicationMode:function(){f||(tn=!0)},Ln:function(){return tn},pn:null}),B=!0,E=!1,f=!1,w=!1,H=s.Te,G=s.Oe,j=s.ke,K=s.Re,J=c.Me,Y=c.Ue,I={},P={},W=a.wn,q=[],z=new _({publisherId:S}),C=a.bn,D=u.ENABLED,A=z.isKeepAliveMeasurementEnabled(),n=!1,t=!0,e=!1,F=[],V=[],O=[],T=[],k=!0,R=!1,M=!1,X=!1,Q=m.ENABLED,$=-1,Z=-1,nn=m.xe,tn=!1,en=l.We,rn=!1,U=y,x=y,on=new d(sn),sn.pn=on}b.et=S,n.exports=b},2532:(n,t,e)=>{var i=e(634),r=e(5156),o=e(8576),s=e(5174),u=e(5333),a=e(1770),f=e(3181);n.exports=function(n){i.extend(this,{setLiveTransmissionMode:n.setLiveTransmissionMode,setKeepAliveMeasurementEnabled:n.setKeepAliveMeasurementEnabled,setOfflineCacheMode:n.setOfflineCacheMode,enableImplementationValidationMode:n.enableImplementationValidationMode,getPartnerConfigurations:n.getPartnerConfigurations,getPublisherConfigurations:n.getPublisherConfigurations,setLabelOrder:n.setLabelOrder,getLabelOrder:n.getLabelOrder,setApplicationName:n.setApplicationName,setApplicationVersion:n.setApplicationVersion,addStartLabels:n.addStartLabels,setStartLabel:n.setStartLabel,removeStartLabel:n.removeStartLabel,removeAllStartLabels:n.removeAllStartLabels,isEnabled:n.isEnabled,addPersistentLabels:n.addPersistentLabels,setPersistentLabel:n.setPersistentLabel,removePersistentLabel:n.removePersistentLabel,removeAllPersistentLabels:n.removeAllPersistentLabels,getPartnerConfiguration:n.getPartnerConfiguration,getPublisherConfiguration:n.getPublisherConfiguration,disable:n.disable,disableTcfIntegration:n.disableTcfIntegration,disableCmpIntegration:n.disableCmpIntegration,enableFirstPartyCookie:n.enableFirstPartyCookie,bypassUserConsentRequirementFor1PCookie:n.bypassUserConsentRequirementFor1PCookie,addListener:n.addListener,removeListener:n.removeListener,addClient:n.addClient,setDebugEnabled:n.setDebugEnabled,setSystemClockJumpDetectionEnabled:n.setSystemClockJumpDetectionEnabled,setSystemClockJumpDetectionInterval:n.setSystemClockJumpDetectionInterval,setSystemClockJumpDetectionAlternativeContextInterval:n.setSystemClockJumpDetectionAlternativeContextInterval,setSystemClockJumpDetectionPrecision:n.setSystemClockJumpDetectionPrecision,setLiveEndpointUrl:n.setLiveEndpointUrl,setOfflineFlushEndpointUrl:n.setOfflineFlushEndpointUrl,setCacheMaxMeasurements:n.setCacheMaxMeasurements,setCacheMaxFlushesInARow:n.setCacheMaxFlushesInARow,setCacheMinutesToRetry:n.setCacheMinutesToRetry,setCacheMeasurementExpiry:n.setCacheMeasurementExpiry,setUsagePropertiesAutoUpdateMode:n.setUsagePropertiesAutoUpdateMode,setUsagePropertiesAutoUpdateInterval:n.setUsagePropertiesAutoUpdateInterval,setStorageWriteInterval:n.setStorageWriteInterval,addIncludedPublisher:n.addIncludedPublisher,addCrossPublisherUniqueDeviceIdChangeListener:n.addCrossPublisherUniqueDeviceIdChangeListener,removeCrossPublisherUniqueDeviceIdChangeListener:n.removeCrossPublisherUniqueDeviceIdChangeListener,enableChildDirectedApplicationMode:n.enableChildDirectedApplicationMode,PartnerConfiguration:r,PublisherConfiguration:o,LiveTransmissionMode:s,CacheMode:u,UsagePropertiesAutoUpdateMode:f,ConfigurationType:a})}},1770:n=>{n.exports={PERSISTENT_LABELS:0,PARTNER:1,PUBLISHER:2,KEEP_ALIVE:3,LIVE_TRANSMISSION_MODE:4,OFFLINE_CACHE_MODE:5,DISABLE:6,TIME_WINDOW_ELAPSED:7,START_LABELS:8,LABEL_ORDER:9,DISABLED_TCF_INTEGRATION:10,Xn:11,Qn:12,DISABLED_CMP_INTEGRATION:13}},5156:(n,t,e)=>{var i=e(634),r=e(969);n.exports=function(n){var t,e,o;function s(t,e){return n&&null!=n[t]?n[t]:e}t=new r(n=n||{}),i.extend(this,t),i.extend(this,{getPartnerId:function(){return e},getExternalClientId:function(){return o}}),e=s(\"partnerId\",\"\"),o=s(\"externalClientId\",\"\")}},8576:(n,t,e)=>{var i=e(634),r=e(969),o=e(6018);n.exports=function s(n){var t,e,u,a,f;function c(t,e){return n&&null!=n[t]?n[t]:e}n=i.Ht(n||{}),e=c(\"publisherId\",e),f=c(\"publisherUniqueDeviceIdListener\"),u=o.Fe(e),a=null,t=new r(n),i.extend(this,t),i.extend(this,{getPublisherId:function(){return e},getPublisherSecret:function(){return u},getPublisherUniqueDeviceId:function(){return a},setPublisherUniqueDeviceId:function(n){a=n,\"function\"==typeof f&&f(n)},copy:function(t){return new s(t=i.extend(n,t))}})}},6471:(n,t,e)=>{var i=e(634),r=e(6286);function o(){var n=new r,t=[],e=!0;i.extend(this,n),i.extend(this,{Ve:function(n){t=n},Be:function(){return t},St:function(n){e=n},qe:function(){return e}})}o.prototype=Object.create(r.prototype),n.exports=o},9301:(n,t,e)=>{var i=e(634),r=e(6397).Cn;n.exports=function(n){var t,e;function o(){e&&(e=!1,function(){n();for(var e=0;e<t.length;e++)t[e]()}())}function s(){e&&(e=!1)}t=[],i.extend(this,{addListener:function(n){t.push(n)},Ge:function(){e||(e=!0,r.je(o,s))}})}},6158:(n,t,e)=>{var i=e(634);n.exports=function(){var n,t={};i.extend(this,{He:function(n){return null!=t[n]},Ke:function(n){return t[n]},addLabels:function(n){i.extend(t,n)},setLabel:function(n,e){t[n]=e+\"\"},Je:function(){return\"start\"==t.ns_ap_ev},getLabels:function(){return t},setLiveEndpointUrl:function(t){n=t},ue:function(){return n}})}},3160:(n,t,e)=>{var i=e(4352),r=e(634),o=e(6471),s=e(6397).Cn,u=\"a\".charCodeAt(0);function a(n,t){if(0==t)return n;var e=String.fromCharCode(u+t-1),i=function(n){var t=n.match(/^[cC](\\d|[12]\\d)$/);return t&&t[1]?t[1]:\"\"}(n);return String(i?\"c\"+e+i:\"c\"+e+\"_\"+n)}function f(n,t,e){var i=[],r=n.getPersistentLabels();for(var o in r)i.push(o);if(e){var s=n.getStartLabels();for(o in s)i.push(o)}var u=t.getPublisherLabels(n.getPublisherId()),a=t.getLabels();for(o in u)o in a||i.push(o);return i}var c={Ye:function(n,t,e,u){for(var c={},l=n.Je(),v=[],d=[],_=t.getIncludedPublishers(),p=u.getPublisherConfigurations(),h=0;h<p.length;++h){var g=p[h],m=g.getPublisherId();m!=i.et&&(0!=_.length&&-1==_.indexOf(m)||(v.push(g),d.push(m)))}if((0==_.length||-1!=_.indexOf(i.et))&&u.getPartnerConfigurations().length>0){var y=function(n){for(var t={},e={},i=n.getPartnerConfigurations(),o=0;o<i.length;++o){var s=i[o];r.extend(t,s.getPersistentLabels()),r.extend(e,s.getStartLabels())}return n.be().copy({persistentLabels:t,startLabels:e})}(u);v.push(y),d.push(y.getPublisherId())}for(var S=[],b=0;b<v.length;++b){var w=v[b];if(b>=26)break;var E={};if(E.c2=w.getPublisherId(),E.c12=w.getPublisherUniqueDeviceId(),s.ze&&(E.c12=s.Xe),r.extend(E,e),r.extend(E,u.getPersistentLabels()),r.extend(E,w.getPersistentLabels()),r.extend(E,t.getLabels()),l&&r.extend(E,u.getStartLabels()),r.extend(E,t.getPublisherLabels(w.getPublisherId())),l&&r.extend(E,w.getStartLabels()),0==b)S=f(w,t,l),r.extend(c,E);else{for(h=0;h<S.length;++h){var I=S[h];I in E||(E[I]=\"*null\")}for(var P in E)P in c&&c[P]==E[P]||(c[a(P,b)]=E[P])}}if(t instanceof o){var A=t.Be();for(h=0;h<A.length;++h){var C=A[h];if(b>=26)break;if(-1==d.indexOf(C)){var L=t.getPublisherLabels(C);for(P in c[a(\"c2\",b)]=C,L)P in c&&c[P]==L[P]||(c[a(P,b)]=L[P]);b++}}}n.addLabels(c)}};n.exports=c},6286:(n,t,e)=>{var i=e(634),r=e(9911);n.exports=function(){var n={},t=[],e={};i.extend(this,{addLabels:function(t){r.Yt(n,t)},getLabels:function(){return n},setLabel:function(t,e){r.zt(n,t,e)},getIncludedPublishers:function(){return t},addIncludedPublisher:function(n){t&&-1==t.indexOf(n)&&t.push(n)},addPublisherLabels:function(n,t){n&&(e[n]=e[n]||{},r.Yt(e[n],t))},setPublisherLabel:function(n,t,i){n&&(e[n]=e[n]||{},r.zt(e[n],t,i))},getPublisherLabels:function(n){return e[n]||{}}})}},1843:(n,t,e)=>{var i=e(634),r=e(6440),o=e(6158),s=e(6397).Cn,u=e(1868),a=e(3160),f=e(1186),c=e(390),l=e(4341),v=e(623),d=e(5174),_=e(4219),p=e(6471),h=e(3492),g=l.Xt;n.exports=function(n,t,e,l,m,y,S,b){var w,E,I,P,A,C,L,D,N,T;function O(){for(var n=0;n<T.length;n++){var t=T[n];k(t.event,t.timestamp,t.Qe,t.configuration)}T=[]}function k(n,i,o,a){!function(n){n.setLabel(\"ns_ap_pn\",s.$e()),n.setLabel(\"ns_ap_pv\",s.Ze()),n.setLabel(\"ns_ap_pfm\",s.ni()),n.setLabel(\"ns_ap_pfv\",s.ti()),n.setLabel(\"ns_ap_device\",s.ei()),n.setLabel(\"ns_ap_lang\",s.ii()),n.setLabel(\"ns_ap_ar\",s.ri()),n.setLabel(\"ns_radio\",function(n){switch(n){case v.EMULATOR:return\"emu\";case v.WIFI:return\"wlan\";case v.WWAN:return\"wwan\";case v.ETHERNET:return\"eth\";case v.BLUETOOTH:return\"bth\";default:return\"unknown\"}}(s.oi())),n.setLabel(\"ns_ap_env\",s.si()),n.Je()&&n.setLabel(\"ns_ap_jb\",r.Kt(s.ui()))}(n),function(n,t){n.setLabel(\"ns_ap_an\",t.fe()===g?s.fe():t.fe()),n.setLabel(\"ns_ap_res\",s.ai()),n.setLabel(\"ns_ap_po\",\"0x0\"),n.setLabel(\"ns_ap_sd\",s.fi()),n.setLabel(\"ns_ap_ver\",t.Rt()===g?s.Rt():t.Rt()),n.setLabel(\"ns_ap_bi\",t.ce())}(n,a),S.Dn((function(i){b.ci(i,a,n),n.addLabels(i.V),function(n){var t=y.On();t.Mn&&n.setLabel(\"ns_ak\",t.Mn),t.Tn&&n.setLabel(\"ns_ap_ni\",\"1\")}(n),s.li(n.getLabels()),E.push(n),function(n,t){!function(n,t){var i=s.oi(),r=n.de(),o=!1;i!=v.DISCONNECTED&&r!=d.CACHE&&(r!=d.LAN||i!=v.WWAN&&i!=v.BLUETOOTH)||(o=!0);for(var a=0;a<E.length;++a){var f=E[a];if(o)e.vi(f,n);else{var c=new u(f,U,x,n,t);n._e()&&s.di(\"Comscore: \"+c._i()),c.pi()}}e.hi(),E=[]}(n,t)}(a,i),t.commit()}))}function R(n,e){return function(n,t){var e=n.getIncludedPublishers();if(0==e.length)return!0;for(var i=0;i<e.length;++i)if(t.re(e[i]))return!0;return!1}(n,e)&&((i=h.st())<A?(C=0,A=i,L=0,D=i,t.put(_.gi,L),t.put(_.mi,D)):(i-A>1e3&&(C=0,A=i),i-D>1e3&&(L=0,D=i,t.put(_.gi,L),t.put(_.mi,D))),C<20&&L<6e3&&(C++,L++,t.put(_.gi,L),!0));var i}function M(e,i,r,o){R(r,o)&&(t.put(_.Nt,h.st()),n.yi(i,!0),function(e,i,r,o){var s=0==w&&e.Je();s&&(I=h.st(),t.put(_.Si,I),P++,t.put(_.Mt,P),e.setLabel(\"ns_ap_csf\",\"1\"),e.setLabel(\"ns_ap_cfg\",o.ie())),w++,e.setLabel(\"ns_ts\",i+\"\"),e.setLabel(\"ns_ap_ec\",w+\"\"),e.setLabel(\"ns_ap_cs\",P+\"\"),e.setLabel(\"ns_ap_id\",I+\"\"),n.bi()==f.Pt.wi?e.setLabel(\"name\",\"foreground\"):n.bi()==f.Pt.Ei||n.bi()==f.Pt.It?e.setLabel(\"name\",\"background\"):e.setLabel(\"name\",\"Application\"),r instanceof p&&!r.qe()||function(t,e,i){t.setLabel(\"ns_ap_fg\",n.Ii()+\"\"),t.setLabel(\"ns_ap_ft\",n.Pi(t.Je())+\"\"),t.setLabel(\"ns_ap_dft\",n.Ai()+\"\"),t.setLabel(\"ns_ap_bt\",n.Ci(t.Je())+\"\"),t.setLabel(\"ns_ap_dbt\",n.Li()+\"\"),t.setLabel(\"ns_ap_it\",n.Di(t.Je())+\"\"),t.setLabel(\"ns_ap_dit\",n.Ni()+\"\"),t.setLabel(\"ns_ap_as\",n.Ti()+\"\"),t.setLabel(\"ns_ap_das\",n.Oi()+\"\"),t.setLabel(\"ns_ap_ut\",1e3*e.Hn()+\"\"),t.setLabel(\"ns_ap_usage\",i-n.ki()+\"\")}(e,o,i),function(n){n.setLabel(\"c1\",\"19\"),n.setLabel(\"ns_ap_smv\",\"6.7\"),n.setLabel(\"ns_ap_bv\",c.VERSION),n.setLabel(\"ns_ap_sv\",c.VERSION)}(e),function(n,t){var e=t.getPartnerConfigurations();if(0!=t.getPartnerConfigurations().length){for(var i=\"\",r=\"\",o=0;o<e.length;++o){var s=e[o];i+=s.getPartnerId()+\",\",r+=s.getExternalClientId()+\",\"}i=i.substring(0,i.length-1),r=r.substring(0,r.length-1),n.setLabel(\"cs_partner\",i),n.setLabel(\"cs_xcid\",r)}}(e,o),e.addLabels(N),e.addLabels(r.getLabels()),a.Ye(e,r,e.getLabels(),o)}(e,i,r,o),N={},T.push({event:e,timestamp:i,Qe:r,configuration:o}),l.Ge())}function U(n,i){e.flush(i),e.persist(),t.commit()}function x(n,i){e.vi(n,i),e.persist(),e.hi(),t.commit()}i.extend(this,{_t:function(){return w},wt:function(n,t,i){var r;M(((r=new o).setLabel(\"ns_type\",\"hidden\"),r.setLabel(\"ns_ap_ev\",\"keep-alive\"),r.setLabel(\"ns_ap_oc\",e.Ri()+\"\"),r),n,t,i)},Un:function(t,e,i){M(function(){var t=new o;t.setLabel(\"ns_type\",\"view\"),t.setLabel(\"ns_ap_ev\",\"start\"),t.setLabel(\"ns_ap_gs\",m.xt()+\"\"),t.setLabel(\"ns_ap_install\",m.Wt()+\"\");var e=n.Mi();return e>0&&t.setLabel(\"ns_ap_lastrun\",e+\"\"),m.Ft()&&t.setLabel(\"ns_ap_updated\",m.Ut()+\"\"),t}(),t,e,i)},hn:function(n,t,e){M(function(){var n=new o;return n.setLabel(\"ns_type\",\"hidden\"),n.setLabel(\"ns_ap_ev\",\"hidden\"),n}(),n,t,e)},gn:function(n,t,e){var i=function(){var n=new o;return n.setLabel(\"ns_type\",\"view\"),n.setLabel(\"ns_ap_ev\",\"view\"),n}();M(i,n,t,e)},tt:function(n,e){N[n]=e+\"\",t.put(_.Ui,N)}}),w=0,E=[],P=t.get(_.Mt,0),A=-1,C=0,D=-1,L=0,N=t.get(_.Ui,{}),T=[],l.addListener(O)}},5174:n=>{n.exports={STANDARD:1,LAN:2,CACHE:3}},623:n=>{n.exports={UNKNOWN:0,UNAVAILABLE:1,DISCONNECTED:2,CONNECTED:3,ETHERNET:4,WIFI:5,WWAN:6,BLUETOOTH:7,EMULATOR:8}},2937:(n,t,e)=>{var i=e(634),r=e(6397).Cn;n.exports=function(n,t,e,o){function s(n){200==n||o.isHttpRedirectCachingEnabled()&&(302==n||301==n)?e.onSuccess():e.onFailure()}i.extend(this,{pi:function(){r.xi?r.xi(n,t,s):s()}})}},1868:(n,t,e)=>{var i=e(634),r=e(6397).Cn,o=e(6440),s=e(3492);n.exports=function(n,t,e,u,a){var f;function c(i){200==i||u.isHttpRedirectCachingEnabled()&&(302==i||301==i)?t(n,u):e(n,u)}!function(){f=o.Bt(u.ue()||(u.isSecureTransmissionEnabled()?a.W?s.ee(r.Wi)?r.Wi():r.Wi:s.ee(r.Fi)?r.Fi():r.Fi:a.W?s.ee(r.Vi)?r.Vi():r.Vi:s.ee(r.Bi)?r.Bi():r.Bi),n.getLabels(),u.getLabelOrder());var t=\"undefined\"==typeof window||(window.ActiveXObject,1)?4096:2048;if(f.length>t&&f.indexOf(\"&\")>0){var e=f.substring(0,t-8).lastIndexOf(\"&\"),i=encodeURIComponent(f.substring(e+1));f=f.substring(0,e)+\"&ns_cut=\"+i}f.length>t&&(f=f.substring(0,t))}(),i.extend(this,{pi:function(){r.qi?r.qi(f,c,u):c()},_i:function(){return f}})}},6271:(n,t,e)=>{var i=e(634),r=e(6440),o=e(2416),s=e(5333),u=e(2937),a=e(6039),f=e(6397).Cn,c=e(623),l=e(4219),v=e(3492);function d(n,t){var e,d,_,p,h,g=this;function m(t,i){var r=t.pe(),o=f.oi();return!(r==s.DISABLED||r==s.MANUAL_FLUSH&&!i||r==s.LAN&&(o==c.WWAN||o==c.BLUETOOTH||o==c.DISCONNECTED)||function(t){var e=60*t.me()*1e3,i=t.ge();return v.st()-n.get(l.Nt,-1)>e&&(h=0),h>i}(t)||0==e.length||d)}function y(n){d=!0;var t=n.ae(),i={};i.c2=n.getPublisherConfigurations()[0].getPublisherId();var s=\"JetportGotAMaskOfThe\"+n.getPublisherConfigurations()[0].getPublisherSecret()+\"S.D_K-\";s=a(s),i.s=s;var f=r.Bt(t,i,n.getLabelOrder());!function(n){for(var t=v.st()-24*n.ye()*60*60*1e3,i=0;i<e.length;){var r=e[i];parseInt(r.ns_ts)<t?(e.splice(i,1),p++):i++}}(n),_=e,e=[],h++;var c=o.Gi(n,_,p);new u(f,c,g,n).pi()}d=!1,e=[],_=null,p=n.get(l.ji,0),h=0,function(){var n=t.getCache();if(null!=n)try{var i=JSON.parse(n);if(!(i instanceof Array))return;e=i}catch(r){}}(),i.extend(g,{persist:function(){f.Hi&&n.put(l.ji,p)},hi:function(){if(f.Hi){var n=JSON.stringify(e);t.storeCache(n)}},onSuccess:function(){d=!1,_=null,p=0,g.hi()},onFailure:function(){d=!1,e=_.concat(e),_=null,g.hi()},vi:function(n,t){f.Hi&&t.pe()!=s.DISABLED&&(function(n){return e.length<=n.he()}(t)?e.push(n.getLabels()):p++)},Ki:function(n){if(f.Hi){for(var t=[],i=0;i<n.length;++i)t.push(n[i].getLabels());e=t.concat(e)}},flush:function(n,t){f.Hi&&m(n,t)&&y(n)},Ri:function(){return e.length},Gn:function(){e=[]}})}d.Re=31,d.Oe=2e3,d.Qt=\"http:\/\/udm.scorecardresearch.com/offline\",d.$t=\"https:\/\/udm.scorecardresearch.com/offline\",d.ke=10,d.Te=30,n.exports=d},5333:n=>{n.exports={DISABLED:4,LAN:3,MANUAL_FLUSH:2,ENABLED:1}},7429:(n,t,e)=>{var i=e(634),r=e(6158),o=e(6397).Cn,s=\"cache_dir\",u=\"undefined\"!=typeof encodeURIComponent?decodeURIComponent:unescape;n.exports=function(n,t,e){var a=\"function\"==typeof o.Ji?new o.Ji:null,f=\"function\"==typeof o.Yi?new o.Yi:null,c=function(){return f&&f.dir(s)||[]},l=function(n){f&&(f.deleteFile(s,n),a&&a.remove(n))},v=function(n){if(!f)return[];var t=f.read(s,n);return t?t.split(\"\\n\"):[]};function d(n){for(var t=n.split(\"&\"),e=new r,i=0;i<t.length;++i){var o=t[i].split(\"=\"),s=u(o[0]),a=u(o[1]);e.setLabel(s,a)}return e}i.extend(this,{ct:function(){var n=function(n){for(var t=[],e=0;e<n.length;++e){var i=d(n[e]);t.push(i)}return t}(function(){for(var n=c(),t=[],e=0;e<n.length;++e){var i=v(n[e]);t=t.concat(i)}return t}());e.Ki(n)},lt:function(){for(var n=c(),t=0;t<n.length;++t)l(n[t])}})}},2416:(n,t,e)=>{var i=e(6397).Cn,r=e(6039),o=e(3492);function s(n,t,e){var i=n.ns_ts,r=\"undefined\"!=typeof encodeURIComponent?encodeURIComponent:escape,o=\"\",s=!1;for(var u in n)null==t[u]&&\"ns_ts\"!=u&&(s&&(o+=\"&\"),s=!0,o+=r(u)+\"=\"+r(n[u]));return e.push(o),'<event t=\"'+i+'\">'+o+\"</event>\"}var u={Gi:function(n,t,e){var u=function(n){var t={};return t.c12=n.getPublisherConfigurations()[0].getPublisherUniqueDeviceId(),t.c1=\"19\",t.ns_ap_pn=i.$e(),t.ns_ap_an=n.fe(),t.ns_ap_device=i.ei(),t}(n),a=\"\";for(var f in a+='<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\\n<events ',a+='t=\"'+o.st()+'\" ',u)a+=f+'=\"'+u[f]+'\" ';a+='dropped=\"'+e+'\" ';for(var c=[],l=\"\",v=0;v<t.length;++v)l+=\"    \"+s(t[v],u,c)+\"\\n\";return a+='md5=\"'+r(c.join(\"\"))+'\" ',a+=\">\\n\",a+=l,a+=\"</events>\"}};n.exports=u},4219:n=>{n.exports={ji:\"ocdrm\",Nt:\"ltrts\",kt:\"pappv\",Tt:\"fits\",Ot:\"cits\",zi:\"cpidmd5\",Xi:\"cpidrsa\",Zn:\"c12s\",Qi:\"lappaccts\",$i:\"lsaccts\",Zi:\"lappsts\",nr:\"ftrsc\",tr:\"accft\",er:\"accbt\",ir:\"accit\",rr:\"tft\",sr:\"tbt\",ur:\"tit\",ar:\"accappst\",cr:\"appsc\",lr:\"g\",Si:\"lrt\",gi:\"dc\",mi:\"dco\",Mt:\"csc\",Ui:\"sl\"}},1234:(n,t,e)=>{var i=e(634);n.exports=function(n){var t,e;!function(){var e=n.getProperties();try{(t=JSON.parse(e))&&\"object\"==typeof t||(t={})}catch(i){t={}}}(),e=!1,i.extend(this,{put:function(n,i){t[n]=i,e=!0},get:function(n,e){return n in t?t[n]:e},remove:function(n){delete t[n],e=!0},contains:function(n){return n in t},clear:function(){t={}},commit:function(){var i;e&&(i=JSON.stringify(t),n.storeProperties(i)),e=!1}})}},4156:(n,t,e)=>{var i=e(634),r=e(4219),o=e(6397).Cn,s=[\"previousVersion\",\"AppName\",\"AppVersion\",\"vid\",\"exitCode\",\"q_dcc\",\"q_dcf\",\"runs\",\"accumulatedActiveUserSessionTime\",\"accumulatedUserSessionTime\",\"activeUserSessionCount\",\"userSessionCount\",\"userInteractionCount\",\"lastActiveUserSessionTimestamp\",\"lastUserInteractionTimestamp\",\"lastUserSessionTimestamp\"],u={CACHE_DROPPED_MEASUREMENTS:r.ji,lastApplicationAccumulationTimestamp:r.Qi,lastSessionAccumulationTimestamp:r.$i,lastApplicationSessionTimestamp:r.Zi,foregroundTransitionsCount:r.nr,accumulatedForegroundTime:r.tr,accumulatedBackgroundTime:r.er,accumulatedInactiveTime:r.ir,totalForegroundTime:r.rr,totalBackgroundTime:r.sr,totalInactiveTime:r.ur,accumulatedApplicationSessionTime:r.ar,applicationSessionCountKey:r.cr,genesis:r.lr,previousGenesis:r.Si,installId:r.Ot,firstInstallId:r.Tt,currentVersion:r.kt,coldStartCount:r.Mt,crossPublisherIdHashed:r.zi,crossPublisherId:r.Xi},a={pg:r.Si};n.exports=function(){var n=\"function\"==typeof o.Ji?new o.Ji:null;i.extend(this,{ut:function(t){if(n)for(var e in u){var i=n.get(e);null!=i&&t.put(u[e],i)}for(var r in a){var o=t.get(r);null!=o&&t.put(a[r],o)}},ft:function(t){if(n){for(var e in u)n.remove(e);for(var i=0;i<s.length;++i)n.remove(s[i]);n.clear()}for(var r in a)t.remove(r)}})}},1186:(n,t,e)=>{var i=e(634),r=e(6397).Cn,o=e(4219),s=e(3492),u=e(3181),a={vr:2,dr:3,It:4},f={wi:1,Ei:2,It:3};function c(n,t){var e,u,c,l,v,d,_,p,h,g,m,y,S,b,w,E,I,P,A,C,L,D=this,N=[],T=[];function O(n){var t;(t=u?f.wi:c?f.Ei:f.It)!=l&&function(n,t){l!=n&&(function(n,t){switch(n){case f.It:break;case f.Ei:case f.wi:M()}for(var e=0;e<T.length;++e)T[e].Et(n,t)}(l,t),function(n,t){switch(n){case f.It:break;case f.Ei:v||R();break;case f.wi:R(),d++}for(var e=0;e<T.length;++e)T[e].Ct(n,t)}(n,t),k(t,!0),l=n)}(t,n)}function k(t,e){var i=t-_;switch(l){case f.wi:p+=i,h+=i;break;case f.Ei:g+=i,m+=i;break;case f.It:y+=i,S+=i}_=t,e&&(n.put(o.Qi,_),n.put(o.nr,d),n.put(o.tr,p),n.put(o.er,g),n.put(o.ir,y),n.put(o.rr,h),n.put(o.sr,m),n.put(o.ur,S))}function R(){M(),A>0&&(L=r.setTimeout((function(){D.yi(s.st(),!0),L=null,R(),n.commit()}),A))}function M(){L&&(r.clearTimeout(L),L=null)}function U(n){var t;(t=c?a.vr:u?a.dr:a.It)!=e&&function(n,t){e!=n&&(function(n,t){switch(n){case a.vr:case a.dr:b=t;break;case a.It:W(t)||(w+=t-E)}for(var e=0;e<N.length;++e)N[e].Lt(n,t)}(e,t),function(n,t){switch(n){case a.vr:case a.dr:W(t)}for(var e=0;e<N.length;++e)N[e].Dt(n,t)}(n,t),x(t,!0),e=n)}(t,n)}function x(t,i){var r=t-E;switch(e){case a.vr:case a.dr:w+=r,b=t}E=t,i&&(n.put(o.$i,E),n.put(o.Zi,b),n.put(o.ar,w),n.put(o.lr,I),n.put(o.cr,C))}function W(t){var e=!1;return t-b>18e5&&(I=t,n.put(o.lr,I),C++,e=!0),b=t,e}d=0,v=!1,l=f.It,e=a.It,u=!1,c=!1,h=0,m=0,S=0,g=0,p=0,y=0,w=0,I=-1,P=-1,_=-1,E=-1,b=-1,A=0,C=0,_=n.get(o.Qi,-1),E=n.get(o.$i,-1),b=n.get(o.Zi,-1),d=n.get(o.nr,0),p=n.get(o.tr,0),g=n.get(o.er,0),y=n.get(o.ir,0),h=n.get(o.rr,0),m=n.get(o.sr,0),S=n.get(o.ur,0),w=n.get(o.ar,0),C=n.get(o.cr,0),function(t){P=n.get(o.Si,0),(I=n.get(o.lr,-1))<0?(I=t,n.put(o.lr,I),P=0,n.put(o.Si,P),b=I,C++):(W(t)||(w+=t-E,n.put(o.ar,w)),b=I)}(t),function(t){if(_>0){var e=t-_;y+=e,n.put(o.ir,y),S+=e,n.put(o.ur,S)}E=_=t,n.put(o.$i,E),n.put(o.Qi,_),n.put(o.Zi,b)}(t),i.extend(D,{bi:function(){return l},notifyUxActive:function(t){c||(c=!0,O(t),U(t),n.commit())},notifyUxInactive:function(t){c&&(c=!1,O(t),U(t),n.commit())},notifyEnterForeground:function(t){u||(u=!0,O(t),U(t),n.commit())},notifyExitForeground:function(t){u&&(u=!1,O(t),U(t),n.commit())},yi:function(n,t){k(n,t),x(n,t)},Kn:function(n,t){A=1e3*n,v=t,n>0&&(l==f.wi||l==f.Ei&&!t)?R():M()},Ti:function(t){t===undefined&&(t=!0);var e=C;return t&&(C=0,n.put(o.cr,C)),e},Oi:function(t){t===undefined&&(t=!0);var e=w;return t&&(w=0,n.put(o.ar,w)),e},Ni:function(t){t===undefined&&(t=!0);var e=y;return t&&(y=0,n.put(o.ir,y)),e},Di:function(t){t===undefined&&(t=!0);var e=S;return t&&(S=0),n.put(o.ur,S),e},Li:function(t){t===undefined&&(t=!0);var e=g;return t&&(g=0,n.put(o.er,g)),e},Ai:function(t){t===undefined&&(t=!0);var e=p;return t&&(p=0,n.put(o.tr,p)),e},Pi:function(t){t===undefined&&(t=!0);var e=h;return t&&(h=0),n.put(o.rr,h),e},Ii:function(t){t===undefined&&(t=!0);var e=d;return t&&(d=0,n.put(o.nr,d)),e},Ci:function(t){t===undefined&&(t=!0);var e=m;return t&&(m=0),n.put(o.sr,m),e},ki:function(){return I},Mi:function(){return P},vt:function(n){T.push(n)},Fn:function(n){var t=T.indexOf(n);-1!=t&&T.splice(t,1)},dt:function(n){N.push(n)},Vn:function(n){var t=N.indexOf(n);-1!=t&&N.splice(t,1)},Bn:function(){M()}})}c.Me=u.FOREGROUND_ONLY,c.Ue=60,c._r=a,c.Pt=f,n.exports=c},3181:n=>{n.exports={DISABLED:2,FOREGROUND_AND_BACKGROUND:1,FOREGROUND_ONLY:0}},6018:(n,t,e)=>{var i=e(634),r=e(6397).Cn,o=e(4219),s=e(6039),u=e(7934);function a(n){var t=null,e=null,a=!0,f=!1,c={};i.extend(this,{Nn:function(){var i=(r.pr()||\"null\").split(\" \"),l=i[0]&&\"null\"!=i[0]?i[0]:null;if(null==l)return t=null,e=null,void(c={Mn:null,Tn:!1,kn:a});e||(t=n.get(o.zi,null),e=n.get(o.Xi,null)),e?\"none\"==l&&\"none\"==e||!a&&\"none\"==e||\"none\"!=l&&s(l)==t||(f=!0,a&&\"none\"!=l?(t=s(l),e=u(l)):(t=null,e=\"none\"),n.put(o.Xi,e),null==t?n.remove(o.zi):n.put(o.zi,t)):(\"none\"==l?(t=null,e=\"none\"):(t=s(l),e=u(l)),n.put(o.Xi,e),null==t?n.remove(o.zi):n.put(o.zi,t)),c={Mn:e,Tn:f,kn:a},a=!1},On:function(){return c},persist:function(){},nt:function(n){var t=r.hr(),e=r.gr();return s(t+n)+\"-cs\"+e}})}a.Fe=function(n){return s(\"zutphen2011comScore@\"+n)},n.exports=a},6974:(n,t,e)=>{var i=e(634),r=e(6397).Cn,o=e(3120);function s(n){var t,e,s,u,a,f;function c(){s&&(s=!1,t.storeProperties(e)),a&&(a=!1,t.storeCache(u))}function l(){if(-1==f){var t=n.De();0==t?c():f=r.setTimeout((function(){f=-1,c()}),t)}}i.extend(this,{storeProperties:function(n){e=n,s=!0,l()},getProperties:function(){return s?e:t.getProperties()},storeCache:function(n){u=n,a=!0,l(),t.storeCache(n)},getCache:function(){return a?u:t.getCache()},qn:function(){-1!=f&&(r.clearTimeout(f),f=-1)}}),t=\"function\"==typeof r.Storage?new r.Storage(n):new o,e=\"\",u=\"\",s=!1,a=!1,f=-1}s.Ce=6e4,s.Le=3e5,s.We=0,n.exports=s},1625:(n,t,e)=>{var i=e(634),r=e(3492),o=e(3804),s=\"_scor_uid\";n.exports=function(){var n=!1,t=!1,e=!1,u=!0,a=!1,f=!1;function c(n){try{if(\"undefined\"==typeof document||\"undefined\"==typeof document.cookie)return;var t=o.mr(document.cookie,s);t||(t=r.uuid());var e=new Date((new Date).getTime()+33696e6);o.yr(document,s,t,e),n.setLabel(\"cs_fpcu\",t)}catch(i){}}i.extend(this,{enableFirstPartyCookie:function(){n=!0},$n:function(){t=!0},rt:function(n){e=n},disableCmpIntegration:function(){u=!1},ci:function(i,r,l){e&&(u&&!i.F||!u?n&&(function(n){for(var t=n.getPublisherConfigurations(),e=n.getPartnerConfigurations(),i=t.concat(e),r=0;r<i.length;++r){var o=i[r].getPersistentLabels();if(\"1\"==o.cs_ucfr||1==o.cs_ucfr)return!0}return!1}(r)||t)?a||c(l):a=!0:n&&i.W?a||c(l):(function(n){try{if(\"undefined\"==typeof document||\"undefined\"==typeof document.cookie)return;o.mr(document.cookie,s)&&(o.Sr(document,s),f=!0)}catch(t){}}(),a=!0),f&&l.setLabel(\"cs_fpcd\",\"1\"))}})}},7227:(n,t,e)=>{var i=e(634),r=e(5682),o=e(4219),s=e(6397).Cn;n.exports=function(){var n,t=new r.Y,e=!1,u=[],a=!1;function f(){if(n){var e=t.X();if(e.v&&!a){a=!0;for(var i=0;i<u.length;++i)u[i](e);u=[],a=!1}}}i.extend(this,{disableCmpIntegration:function(){n=!1,u=[]},gt:function(n){n.remove(o.Zn),n.remove(o.zi),n.remove(o.Xi)},ht:function(){n&&s.br&&(e||(e=!0,t.tn(f)))},Dn:function(i){var r=function(n){i(n)};if(n&&s.br){var o=t.X();o.v?r(o):u.push(r),e||(e=!0,t.tn(f))}else r({v:!0,W:!0,F:!1,V:{}})}}),n=!0}},3757:(n,t,e)=>{var i=e(4855);n.exports=i,n.exports.analytics=i},4341:n=>{n.exports={Xt:\"unknown\",wr:\"0x0\",Er:\"-----BEGIN PUBLIC KEY-----\\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQD0+fCVxGq3Bk24jUKO1PzsiUs3\\nvqww6zR4n2e3AweVLUAgsrDRbAWJ/EjZm1WBLBVNMiTLpSAkV6sjOIrUs03xdUEj\\nQZJHwOGK+MfzFaZukoo0qAsEMPwQ5posv0JdkBdUGhKchPk6+NYmD6Hb44Lkp7/a\\nQnVeWzvfAPQyTJR5wQIDAQAB\\n-----END PUBLIC KEY-----\"}},3318:n=>{var t=\"undefined\",e=\"function\";n.exports=function(n,i){var r=this;function o(t){t=t||[];var e=[\"comScore\",+new Date];return n&&e.push(n),t=Array.prototype.slice.call(t),e=e.concat(t)}function s(n){var t,e,r;if(\"boolean\"==typeof i||!i)return!!i;if(r=n.join(\" \"),i instanceof Array&&i.length>0){for(t=0;t<i.length;++t)if((e=i[t])instanceof RegExp&&e.test(r))return!0;return!1}if(\"object\"==typeof i){var o=!1;if(i.hide instanceof Array)for(t=0;t<i.hide.length;++t)if((e=i.hide[t])instanceof RegExp&&e.test(r)){o=!0;break}if(i.show instanceof Array)for(t=0;t<i.show.length;++t)if((e=i.show[t])instanceof RegExp&&e.test(r))return!0;return!o&&!i.show}return!0}r.log=function(){var n=o(arguments);typeof console!=t&&typeof console.log==e&&s(n)&&console.log.apply(console,n)},r.warn=function(){var n=o(arguments);typeof console!=t&&typeof console.warn==e&&s(n)&&console.warn.apply(console,n)},r.error=function(){var n=o(arguments);typeof console!=t&&typeof console.error==e&&s(n)&&console.error.apply(console,n)},r.Ir=function(n){for(var t=[\"API call to:\",n],e=1;e<arguments.length;++e)t.push(\"arg\"+e+\":\",arguments[e]);this.log.apply(this,t)},r.Pr=function(){var n=[\"Trace log:\"];n.push.apply(n,Array.prototype.slice.call(arguments)),this.log.apply(this,n)},r.Ar=function(n,t){var e=[\"Deprecated API:\",n,\"is deprecated and will be eventually removed.\"];t&&e.push(\"Use\",t,\"instead.\"),this.warn.apply(this,e)}}},405:(n,t)=>{var e={},i=\"undefined\";e.indexOf=function(n,t){var i=-1;return e.forEach(t,(function(t,e){t==n&&(i=e)})),i},e.forEach=function(n,t,e){try{if(\"function\"==typeof t)if(e=typeof e!=i?e:null,\"number\"!=typeof n.length||typeof n[0]==i){var r=typeof n.__proto__!=i;for(var o in n)n.hasOwnProperty(o)&&(!r||r&&typeof n.__proto__[o]==i)&&\"function\"!=typeof n[o]&&t.call(e,n[o],o)}else for(var s=0,u=n.length;s<u;s++)t.call(e,n[s],s)}catch(a){}},t.indexOf=e.indexOf,t.forEach=e.forEach},4295:n=>{var t={},e=\"undefined\";t.Cr=function(){try{return typeof document!==e}catch(n){return!1}},t.Lr=function(){try{return typeof navigator!==e}catch(n){return!1}},t.Dr=function(){if(!t.Cr())return!1;var n=!1;return(typeof document.hidden!==e||typeof document.mozHidden!==e||typeof document.msHidden!==e||typeof document.webkitHidden!==e)&&(n=!0),n},t.Nr=function(){if(!t.Cr())return null;var n,i,r;typeof document.hidden!==e?(n=\"hidden\",i=\"visibilitychange\",r=\"visibilityState\"):typeof document.mozHidden!==e?(n=\"mozHidden\",i=\"mozvisibilitychange\",r=\"mozVisibilityState\"):typeof document.msHidden!==e?(n=\"msHidden\",i=\"msvisibilitychange\",r=\"msVisibilityState\"):typeof document.webkitHidden!==e&&(n=\"webkitHidden\",i=\"webkitvisibilitychange\",r=\"webkitVisibilityState\");var o={hidden:n,Tr:i,state:r};return function(){return o}}(),t.Or=function(){if(!t.Cr())return!1;if(!t.Dr())return!1;var n=t.Nr();return document[n.hidden]},t.kr=function(n){if(t.Cr()&&t.Dr()){var e=t.Nr();document.addEventListener(e.Tr,n,!1)}},t.Rr=function(n){if(t.Cr()&&t.Dr()){var e=t.Nr();document.removeEventListener(e.Tr,n,!1)}},t.Mr=function(){if(!t.Lr())return\"\";var n,e,i=navigator.userAgent||\"\",r=navigator.appName||\"\";return-1!=(e=i.indexOf(\"Opera\"))||-1!=(e=i.indexOf(\"OPR/\"))?r=\"Opera\":-1!=(e=i.indexOf(\"Android\"))?r=\"Android\":-1!=(e=i.indexOf(\"Chrome\"))?r=\"Chrome\":-1!=(e=i.indexOf(\"Safari\"))?r=\"Safari\":-1!=(e=i.indexOf(\"Firefox\"))?r=\"Firefox\":-1!=(e=i.indexOf(\"IEMobile\"))?r=\"Internet Explorer Mobile\":\"Microsoft Internet Explorer\"==r||\"Netscape\"==r?r=\"Internet Explorer\":(n=i.lastIndexOf(\" \")+1)<(e=i.lastIndexOf(\"/\"))?(r=i.substring(n,e)).toLowerCase()==r.toUpperCase()&&(r=navigator.appName):r=\"unknown\",r},t.Ur=function(){if(!t.Lr())return\"\";var n,e,i,r=navigator.userAgent||\"\",o=navigator.appName||\"\",s=navigator.appVersion?\"\"+parseFloat(navigator.appVersion):\"\";return-1!=(e=r.indexOf(\"Opera\"))?(s=r.substring(e+6),-1!=(e=r.indexOf(\"Version\"))&&(s=r.substring(e+8))):-1!=(e=r.indexOf(\"OPR/\"))?s=r.substring(e+4):-1!=(e=r.indexOf(\"Android\"))?s=r.substring(e+11):-1!=(e=r.indexOf(\"Chrome\"))?s=r.substring(e+7):-1!=(e=r.indexOf(\"Safari\"))?(s=r.substring(e+7),-1!=(e=r.indexOf(\"Version\"))&&(s=r.substring(e+8))):-1!=(e=r.indexOf(\"Firefox\"))?s=r.substring(e+8):\"Microsoft Internet Explorer\"==o?null!=new RegExp(\"MSIE ([0-9]{1,}[.0-9]{0,})\").exec(r)&&(s=parseFloat(RegExp.$1)):\"Netscape\"==o?null!=new RegExp(\"Trident/.*rv:([0-9]{1,}[.0-9]{0,})\").exec(r)&&(s=parseFloat(RegExp.$1)):s=r.lastIndexOf(\" \")+1<(e=r.lastIndexOf(\"/\"))?r.substring(e+1):\"unknown\",-1!=(i=(s=s.toString()).indexOf(\";\"))&&(s=s.substring(0,i)),-1!=(i=s.indexOf(\" \"))&&(s=s.substring(0,i)),-1!=(i=s.indexOf(\")\"))&&(s=s.substring(0,i)),n=parseInt(\"\"+s,10),isNaN(n)&&(s=\"\"+parseFloat(navigator.appVersion)),s},t.Wr=function(){return typeof window==e||(window.ActiveXObject,!0)},t.Fr=function(){return typeof window!=e&&typeof document!=e},t.Vr=function(){return!!t.Cr()&&\"s\"===document.location.href.charAt(4)},n.exports.Dr=t.Dr,n.exports.Nr=t.Nr,n.exports.Or=t.Or,n.exports.Mr=t.Mr,n.exports.Ur=t.Ur,n.exports.Wr=t.Wr,n.exports.Fr=t.Fr,n.exports.Vr=t.Vr,n.exports.kr=t.kr,n.exports.Rr=t.Rr},3492:n=>{var t,e=e||{},i=\"undefined\";e.Br=(t=1,function(){return+new Date+\"_\"+t++}),e.qr=function(){var n=(new Date).getTime(),t=\"undefined\"!=typeof performance&&performance.now&&1e3*performance.now()||0;return\"xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx\".replace(/[xy]/g,(function(e){var i=16*Math.random();return n>0?(i=(n+i)%16|0,n=Math.floor(n/16)):(i=(t+i)%16|0,t=Math.floor(t/16)),(\"x\"===e?i:3&i|8).toString(16)}))},e.Gr=function(n){return n===undefined||null===n||\"\"===n||n instanceof Array&&0===n.length},e.jr=function(n){return!this.Gr(n)},e.Hr=function(n,t){return t=this.Kr(t)?t:\"\",this.Kr(n)?n:t},e.Jr=function(n){return typeof n!=i&&(\"string\"==typeof n?\"true\"===(n=n.toLowerCase())||\"1\"===n||\"on\"===n:!!n)},e.Yr=function(n,t,e,i,r){if(t<0||i<0||t+r>n.length||i+r>e.length)return!1;for(;--r>=0;)if(n.charAt(t++)!=e.charAt(i++))return!1;return!0},e.Kr=function(n){return typeof n!=i&&null!=n},e.ee=function(n){return!!(n&&n.constructor&&n.call&&n.apply)},e.st=function(){return(new Date).getTime()},n.exports.st=e.st,n.exports.ee=e.ee,n.exports.Kr=e.Kr,n.exports.Yr=e.Yr,n.exports.Jr=e.Jr,n.exports.Hr=e.Hr,n.exports.jr=e.jr,n.exports.Gr=e.Gr,n.exports.Br=e.Br,n.exports.uuid=e.qr},9911:n=>{var t={zt:function(n,t,e){return null!=t&&t+\"\"!=\"\"&&null!=e&&(n[t+\"\"]=e+\"\",!0)},Yt:function(n,e){for(var i in e)e.hasOwnProperty(i)&&t.zt(n,i,e[i])}};n.exports.zt=t.zt,n.exports.Yt=t.Yt},6039:n=>{var t={};t.zr=function(){function n(n,t){var s=n[0],u=n[1],a=n[2],c=n[3];s=e(s,u,a,c,t[0],7,-680876936),c=e(c,s,u,a,t[1],12,-389564586),a=e(a,c,s,u,t[2],17,606105819),u=e(u,a,c,s,t[3],22,-1044525330),s=e(s,u,a,c,t[4],7,-176418897),c=e(c,s,u,a,t[5],12,1200080426),a=e(a,c,s,u,t[6],17,-1473231341),u=e(u,a,c,s,t[7],22,-45705983),s=e(s,u,a,c,t[8],7,1770035416),c=e(c,s,u,a,t[9],12,-1958414417),a=e(a,c,s,u,t[10],17,-42063),u=e(u,a,c,s,t[11],22,-1990404162),s=e(s,u,a,c,t[12],7,1804603682),c=e(c,s,u,a,t[13],12,-40341101),a=e(a,c,s,u,t[14],17,-1502002290),s=i(s,u=e(u,a,c,s,t[15],22,1236535329),a,c,t[1],5,-165796510),c=i(c,s,u,a,t[6],9,-1069501632),a=i(a,c,s,u,t[11],14,643717713),u=i(u,a,c,s,t[0],20,-373897302),s=i(s,u,a,c,t[5],5,-701558691),c=i(c,s,u,a,t[10],9,38016083),a=i(a,c,s,u,t[15],14,-660478335),u=i(u,a,c,s,t[4],20,-405537848),s=i(s,u,a,c,t[9],5,568446438),c=i(c,s,u,a,t[14],9,-1019803690),a=i(a,c,s,u,t[3],14,-187363961),u=i(u,a,c,s,t[8],20,1163531501),s=i(s,u,a,c,t[13],5,-1444681467),c=i(c,s,u,a,t[2],9,-51403784),a=i(a,c,s,u,t[7],14,1735328473),s=r(s,u=i(u,a,c,s,t[12],20,-1926607734),a,c,t[5],4,-378558),c=r(c,s,u,a,t[8],11,-2022574463),a=r(a,c,s,u,t[11],16,1839030562),u=r(u,a,c,s,t[14],23,-35309556),s=r(s,u,a,c,t[1],4,-1530992060),c=r(c,s,u,a,t[4],11,1272893353),a=r(a,c,s,u,t[7],16,-155497632),u=r(u,a,c,s,t[10],23,-1094730640),s=r(s,u,a,c,t[13],4,681279174),c=r(c,s,u,a,t[0],11,-358537222),a=r(a,c,s,u,t[3],16,-722521979),u=r(u,a,c,s,t[6],23,76029189),s=r(s,u,a,c,t[9],4,-640364487),c=r(c,s,u,a,t[12],11,-421815835),a=r(a,c,s,u,t[15],16,530742520),s=o(s,u=r(u,a,c,s,t[2],23,-995338651),a,c,t[0],6,-198630844),c=o(c,s,u,a,t[7],10,1126891415),a=o(a,c,s,u,t[14],15,-1416354905),u=o(u,a,c,s,t[5],21,-57434055),s=o(s,u,a,c,t[12],6,1700485571),c=o(c,s,u,a,t[3],10,-1894986606),a=o(a,c,s,u,t[10],15,-1051523),u=o(u,a,c,s,t[1],21,-2054922799),s=o(s,u,a,c,t[8],6,1873313359),c=o(c,s,u,a,t[15],10,-30611744),a=o(a,c,s,u,t[6],15,-1560198380),u=o(u,a,c,s,t[13],21,1309151649),s=o(s,u,a,c,t[4],6,-145523070),c=o(c,s,u,a,t[11],10,-1120210379),a=o(a,c,s,u,t[2],15,718787259),u=o(u,a,c,s,t[9],21,-343485551),n[0]=f(s,n[0]),n[1]=f(u,n[1]),n[2]=f(a,n[2]),n[3]=f(c,n[3])}function t(n,t,e,i,r,o){return t=f(f(t,n),f(i,o)),f(t<<r|t>>>32-r,e)}function e(n,e,i,r,o,s,u){return t(e&i|~e&r,n,e,o,s,u)}function i(n,e,i,r,o,s,u){return t(e&r|i&~r,n,e,o,s,u)}function r(n,e,i,r,o,s,u){return t(e^i^r,n,e,o,s,u)}function o(n,e,i,r,o,s,u){return t(i^(e|~r),n,e,o,s,u)}function s(n){var t,e=[];for(t=0;t<64;t+=4)e[t>>2]=n.charCodeAt(t)+(n.charCodeAt(t+1)<<8)+(n.charCodeAt(t+2)<<16)+(n.charCodeAt(t+3)<<24);return e}var u=\"0123456789abcdef\".split(\"\");function a(n){for(var t=\"\",e=0;e<4;e++)t+=u[n>>8*e+4&15]+u[n>>8*e&15];return t}function f(n,t){var e=(65535&n)+(65535&t);return(n>>16)+(t>>16)+(e>>16)<<16|65535&e}return function(t){return function(n){for(var t=0;t<n.length;t++)n[t]=a(n[t]);return n.join(\"\")}(function(t){var e,i=t.length,r=[1732584193,-271733879,-1732584194,271733878];for(e=64;e<=t.length;e+=64)n(r,s(t.substring(e-64,e)));t=t.substring(e-64);var o=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(e=0;e<t.length;e++)o[e>>2]|=t.charCodeAt(e)<<(e%4<<3);if(o[e>>2]|=128<<(e%4<<3),e>55)for(n(r,o),e=0;e<16;e++)o[e]=0;return o[14]=8*i,n(r,o),r}(t))}}(),n.exports=t.zr},634:n=>{var t=t||{};t.filter=function(n,t){var e={};for(var i in t)t.hasOwnProperty(i)&&n(t[i])&&(e[i]=t[i]);return e},t.extend=function(n){var t,e=arguments.length;n=n||{};for(var i=1;i<e;i++)if(t=arguments[i])for(var r in t)t.hasOwnProperty(r)&&(n[r]=t[r]);return n},t.Ht=function(n,e){if(e=e||0,\"object\"!=typeof n)return n;var i;if(n instanceof Array){i=[];for(var r=0,o=n.length;r<o;r++)i[r]=t.Ht(n[r],e-1);return i}for(var s in i={},n)if(n.hasOwnProperty(s)){var u=n[s];\"object\"==typeof u&&e>0&&(u=t.Ht(u,e-1)),i[s]=u}return i},n.exports.filter=t.filter,n.exports.extend=t.extend,n.exports.Ht=t.Ht},7934:(n,t,e)=>{var i=e(4341),r={};r.encrypt=function(){var n=\"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\",t=function(t,e){var i=n.indexOf(t.charAt(e));if(-1===i)throw new Error;return i},e=function(n){var e,i,r,o=(n=\"\"+n).length;if(0===o)return n;if(o%4!=0)throw new Error;e=0,\"=\"===n.charAt(o-1)&&(e=1,\"=\"===n.charAt(o-2)&&(e=2),o-=4);var s=[];for(i=0;i<o;i+=4)r=t(n,i)<<18|t(n,i+1)<<12|t(n,i+2)<<6|t(n,i+3),s.push(String.fromCharCode(r>>16,r>>8&255,255&r));switch(e){case 1:r=t(n,i)<<18|t(n,i+1)<<12|t(n,i+2)<<6,s.push(String.fromCharCode(r>>16,r>>8&255));break;case 2:r=t(n,i)<<18|t(n,i+1)<<12,s.push(String.fromCharCode(r>>16))}return s.join(\"\")};function r(n,t,e){null!=n&&(\"number\"==typeof n?this.Xr(n,t,e):null==t&&\"string\"!=typeof n?this.Qr(n,256):this.Qr(n,t))}function o(){return new r(null)}r.prototype.$r=function(n,t,e,i,r,o){for(var s=16383&t,u=t>>14;--o>=0;){var a=16383&this[n],f=this[n++]>>14,c=u*a+f*s;r=((a=s*a+((16383&c)<<14)+e[i]+r)>>28)+(c>>14)+u*f,e[i++]=268435455&a}return r},r.prototype.Zr=28,r.prototype.no=268435455,r.prototype.eo=1<<28,r.prototype.io=Math.pow(2,52),r.prototype.ro=24,r.prototype.oo=4;var s,u,a=\"0123456789abcdefghijklmnopqrstuvwxyz\",f=[];for(s=\"0\".charCodeAt(0),u=0;u<=9;++u)f[s++]=u;for(s=\"a\".charCodeAt(0),u=10;u<36;++u)f[s++]=u;for(s=\"A\".charCodeAt(0),u=10;u<36;++u)f[s++]=u;function c(n){return a.charAt(n)}function l(n,t){var e=f[n.charCodeAt(t)];return null==e?-1:e}function v(n){var t=o();return t.so(n),t}function d(n){var t,e=1;return 0!=(t=n>>>16)&&(n=t,e+=16),0!=(t=n>>8)&&(n=t,e+=8),0!=(t=n>>4)&&(n=t,e+=4),0!=(t=n>>2)&&(n=t,e+=2),0!=(t=n>>1)&&(n=t,e+=1),e}function _(n){this.uo=n}function p(n){this.uo=n,this.ao=n.fo(),this.co=32767&this.ao,this.lo=this.ao>>15,this.vo=(1<<n.Zr-15)-1,this[\"do\"]=2*n._o}function h(n,t){return n&t}function g(n,t){return n|t}function m(n,t){return n^t}function y(n,t){return n&~t}function S(n){if(0==n)return-1;var t=0;return 0==(65535&n)&&(n>>=16,t+=16),0==(255&n)&&(n>>=8,t+=8),0==(15&n)&&(n>>=4,t+=4),0==(3&n)&&(n>>=2,t+=2),0==(1&n)&&++t,t}function b(n){for(var t=0;0!=n;)n&=n-1,++t;return t}function w(){}function E(n){return n}function I(n){this.r2=o(),this.po=o(),r.ONE.ho(2*n._o,this.r2),this.mo=this.r2.yo(n),this.uo=n}_.prototype.So=function(n){return n.s<0||n.bo(this.uo)>=0?n.wo(this.uo):n},_.prototype.Eo=function(n){return n},_.prototype.reduce=function(n){n.Io(this.uo,null,n)},_.prototype.Po=function(n,t,e){n.Ao(t,e),this.reduce(e)},_.prototype.Co=function(n,t){n.Lo(t),this.reduce(t)},p.prototype.So=function(n){var t=o();return n.abs().ho(this.uo._o,t),t.Io(this.uo,null,t),n.s<0&&t.bo(r.ZERO)>0&&this.uo.Do(t,t),t},p.prototype.Eo=function(n){var t=o();return n.No(t),this.reduce(t),t},p.prototype.reduce=function(n){for(;n._o<=this[\"do\"];)n[n._o++]=0;for(var t=0;t<this.uo._o;++t){var e=32767&n[t],i=e*this.co+((e*this.lo+(n[t]>>15)*this.co&this.vo)<<15)&n.no;for(n[e=t+this.uo._o]+=this.uo.$r(0,i,n,t,0,this.uo._o);n[e]>=n.eo;)n[e]-=n.eo,n[++e]++}n.To(),n.Oo(this.uo._o,n),n.bo(this.uo)>=0&&n.Do(this.uo,n)},p.prototype.Po=function(n,t,e){n.Ao(t,e),this.reduce(e)},p.prototype.Co=function(n,t){n.Lo(t),this.reduce(t)},r.prototype.No=function(n){for(var t=this._o-1;t>=0;--t)n[t]=this[t];n._o=this._o,n.s=this.s},r.prototype.so=function(n){this._o=1,this.s=n<0?-1:0,n>0?this[0]=n:n<-1?this[0]=n+DV:this._o=0},r.prototype.Qr=function(n,t){var e;if(16==t)e=4;else if(8==t)e=3;else if(256==t)e=8;else if(2==t)e=1;else if(32==t)e=5;else{if(4!=t)return void this.ko(n,t);e=2}this._o=0,this.s=0;for(var i=n.length,o=!1,s=0;--i>=0;){var u=8==e?255&n[i]:l(n,i);u<0?\"-\"==n.charAt(i)&&(o=!0):(o=!1,0==s?this[this._o++]=u:s+e>this.Zr?(this[this._o-1]|=(u&(1<<this.Zr-s)-1)<<s,this[this._o++]=u>>this.Zr-s):this[this._o-1]|=u<<s,(s+=e)>=this.Zr&&(s-=this.Zr))}8==e&&0!=(128&n[0])&&(this.s=-1,s>0&&(this[this._o-1]|=(1<<this.Zr-s)-1<<s)),this.To(),o&&r.ZERO.Do(this,this)},r.prototype.To=function(){for(var n=this.s&this.no;this._o>0&&this[this._o-1]==n;)--this._o},r.prototype.ho=function(n,t){var e;for(e=this._o-1;e>=0;--e)t[e+n]=this[e];for(e=n-1;e>=0;--e)t[e]=0;t._o=this._o+n,t.s=this.s},r.prototype.Oo=function(n,t){for(var e=n;e<this._o;++e)t[e-n]=this[e];t._o=Math.max(this._o-n,0),t.s=this.s},r.prototype.Ro=function(n,t){var e,i=n%this.Zr,r=this.Zr-i,o=(1<<r)-1,s=Math.floor(n/this.Zr),u=this.s<<i&this.no;for(e=this._o-1;e>=0;--e)t[e+s+1]=this[e]>>r|u,u=(this[e]&o)<<i;for(e=s-1;e>=0;--e)t[e]=0;t[s]=u,t._o=this._o+s+1,t.s=this.s,t.To()},r.prototype.Mo=function(n,t){t.s=this.s;var e=Math.floor(n/this.Zr);if(e>=this._o)t._o=0;else{var i=n%this.Zr,r=this.Zr-i,o=(1<<i)-1;t[0]=this[e]>>i;for(var s=e+1;s<this._o;++s)t[s-e-1]|=(this[s]&o)<<r,t[s-e]=this[s]>>i;i>0&&(t[this._o-e-1]|=(this.s&o)<<r),t._o=this._o-e,t.To()}},r.prototype.Do=function(n,t){for(var e=0,i=0,r=Math.min(n._o,this._o);e<r;)i+=this[e]-n[e],t[e++]=i&this.no,i>>=this.Zr;if(n._o<this._o){for(i-=n.s;e<this._o;)i+=this[e],t[e++]=i&this.no,i>>=this.Zr;i+=this.s}else{for(i+=this.s;e<n._o;)i-=n[e],t[e++]=i&this.no,i>>=this.Zr;i-=n.s}t.s=i<0?-1:0,i<-1?t[e++]=this.eo+i:i>0&&(t[e++]=i),t._o=e,t.To()},r.prototype.Ao=function(n,t){var e=this.abs(),i=n.abs(),o=e._o;for(t._o=o+i._o;--o>=0;)t[o]=0;for(o=0;o<i._o;++o)t[o+e._o]=e.$r(0,i[o],t,o,0,e._o);t.s=0,t.To(),this.s!=n.s&&r.ZERO.Do(t,t)},r.prototype.Lo=function(n){for(var t=this.abs(),e=n._o=2*t._o;--e>=0;)n[e]=0;for(e=0;e<t._o-1;++e){var i=t.$r(e,t[e],n,2*e,0,1);(n[e+t._o]+=t.$r(e+1,2*t[e],n,2*e+1,i,t._o-e-1))>=t.eo&&(n[e+t._o]-=t.eo,n[e+t._o+1]=1)}n._o>0&&(n[n._o-1]+=t.$r(e,t[e],n,2*e,0,1)),n.s=0,n.To()},r.prototype.Io=function(n,t,e){var i=n.abs();if(!(i._o<=0)){var s=this.abs();if(s._o<i._o)return null!=t&&t.so(0),void(null!=e&&this.No(e));null==e&&(e=o());var u=o(),a=this.s,f=n.s,c=this.Zr-d(i[i._o-1]);c>0?(i.Ro(c,u),s.Ro(c,e)):(i.No(u),s.No(e));var l=u._o,v=u[l-1];if(0!=v){var _=v*(1<<this.ro)+(l>1?u[l-2]>>this.oo:0),p=this.io/_,h=(1<<this.ro)/_,g=1<<this.oo,m=e._o,y=m-l,S=null==t?o():t;for(u.ho(y,S),e.bo(S)>=0&&(e[e._o++]=1,e.Do(S,e)),r.ONE.ho(l,S),S.Do(u,u);u._o<l;)u[u._o++]=0;for(;--y>=0;){var b=e[--m]==v?this.no:Math.floor(e[m]*p+(e[m-1]+g)*h);if((e[m]+=u.$r(0,b,e,y,0,l))<b)for(u.ho(y,S),e.Do(S,e);e[m]<--b;)e.Do(S,e)}null!=t&&(e.Oo(l,t),a!=f&&r.ZERO.Do(t,t)),e._o=l,e.To(),c>0&&e.Mo(c,e),a<0&&r.ZERO.Do(e,e)}}},r.prototype.fo=function(){if(this._o<1)return 0;var n=this[0];if(0==(1&n))return 0;var t=3&n;return(t=(t=(t=(t=t*(2-(15&n)*t)&15)*(2-(255&n)*t)&255)*(2-((65535&n)*t&65535))&65535)*(2-n*t%this.eo)%this.eo)>0?this.eo-t:-t},r.prototype.Uo=function(){return 0==(this._o>0?1&this[0]:this.s)},r.prototype.exp=function(n,t){if(n>4294967295||n<1)return r.ONE;var e=o(),i=o(),s=t.So(this),u=d(n)-1;for(s.No(e);--u>=0;)if(t.Co(e,i),(n&1<<u)>0)t.Po(i,s,e);else{var a=e;e=i,i=a}return t.Eo(e)},r.prototype.toString=function(n){if(this.s<0)return\"-\"+this.xo().toString(n);var t;if(16==n)t=4;else if(8==n)t=3;else if(2==n)t=1;else if(32==n)t=5;else{if(4!=n)return this.Wo(n);t=2}var e,i=(1<<t)-1,r=!1,o=\"\",s=this._o,u=this.Zr-s*this.Zr%t;if(s-- >0)for(u<this.Zr&&(e=this[s]>>u)>0&&(r=!0,o=c(e));s>=0;)u<t?(e=(this[s]&(1<<u)-1)<<t-u,e|=this[--s]>>(u+=this.Zr-t)):(e=this[s]>>(u-=t)&i,u<=0&&(u+=this.Zr,--s)),e>0&&(r=!0),r&&(o+=c(e));return r?o:\"0\"},r.prototype.xo=function(){var n=o();return r.ZERO.Do(this,n),n},r.prototype.abs=function(){return this.s<0?this.xo():this},r.prototype.bo=function(n){var t=this.s-n.s;if(0!=t)return t;var e=this._o;if(0!=(t=e-n._o))return this.s<0?-t:t;for(;--e>=0;)if(0!=(t=this[e]-n[e]))return t;return 0},r.prototype.Fo=function(){return this._o<=0?0:this.Zr*(this._o-1)+d(this[this._o-1]^this.s&this.no)},r.prototype.wo=function(n){var t=o();return this.abs().Io(n,null,t),this.s<0&&t.bo(r.ZERO)>0&&n.Do(t,t),t},r.prototype.Vo=function(n,t){var e;return e=n<256||t.Uo()?new _(t):new p(t),this.exp(n,e)},r.ZERO=v(0),r.ONE=v(1),w.prototype.So=E,w.prototype.Eo=E,w.prototype.Po=function(n,t,e){n.Ao(t,e)},w.prototype.Co=function(n,t){n.Lo(t)},I.prototype.So=function(n){if(n.s<0||n._o>2*this.uo._o)return n.wo(this.uo);if(n.bo(this.uo)<0)return n;var t=o();return n.No(t),this.reduce(t),t},I.prototype.Eo=function(n){return n},I.prototype.reduce=function(n){for(n.Oo(this.uo._o-1,this.r2),n._o>this.uo._o+1&&(n._o=this.uo._o+1,n.To()),this.mo.Bo(this.r2,this.uo._o+1,this.po),this.uo.qo(this.po,this.uo._o+1,this.r2);n.bo(this.r2)<0;)n.Go(1,this.uo._o+1);for(n.Do(this.r2,n);n.bo(this.uo)>=0;)n.Do(this.uo,n)},I.prototype.Po=function(n,t,e){n.Ao(t,e),this.reduce(e)},I.prototype.Co=function(n,t){n.Lo(t),this.reduce(t)};var P=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997],A=(1<<26)/P[P.length-1];function C(){this.jo=0,this.Ho=0,this.Ko=[]}r.prototype.Jo=function(n){return Math.floor(Math.LN2*this.Zr/Math.log(n))},r.prototype.Wo=function(n){if(null==n&&(n=10),0==this.Yo()||n<2||n>36)return\"0\";var t=this.Jo(n),e=Math.pow(n,t),i=v(e),r=o(),s=o(),u=\"\";for(this.Io(i,r,s);r.Yo()>0;)u=(e+s.zo()).toString(n).substr(1)+u,r.Io(i,r,s);return s.zo().toString(n)+u},r.prototype.ko=function(n,t){this.so(0),null==t&&(t=10);for(var e=this.Jo(t),i=Math.pow(t,e),o=!1,s=0,u=0,a=0;a<n.length;++a){var f=l(n,a);f<0?\"-\"==n.charAt(a)&&0==this.Yo()&&(o=!0):(u=t*u+f,++s>=e&&(this.Xo(i),this.Go(u,0),s=0,u=0))}s>0&&(this.Xo(Math.pow(t,s)),this.Go(u,0)),o&&r.ZERO.Do(this,this)},r.prototype.Xr=function(n,t,e){if(\"number\"==typeof t)if(n<2)this.so(1);else for(this.Xr(n,e),this.Qo(n-1)||this.$o(r.ONE.shiftLeft(n-1),g,this),this.Uo()&&this.Go(1,0);!this.Zo(t);)this.Go(2,0),this.Fo()>n&&this.Do(r.ONE.shiftLeft(n-1),this);else{var i=[],o=7&n;i.length=1+(n>>3),t.ns(i),o>0?i[0]&=(1<<o)-1:i[0]=0,this.Qr(i,256)}},r.prototype.$o=function(n,t,e){var i,r,o=Math.min(n._o,this._o);for(i=0;i<o;++i)e[i]=t(this[i],n[i]);if(n._o<this._o){for(r=n.s&this.no,i=o;i<this._o;++i)e[i]=t(this[i],r);e._o=this._o}else{for(r=this.s&this.no,i=o;i<n._o;++i)e[i]=t(r,n[i]);e._o=n._o}e.s=t(this.s,n.s),e.To()},r.prototype.ts=function(n,t){var e=r.ONE.shiftLeft(n);return this.$o(e,t,e),e},r.prototype.es=function(n,t){for(var e=0,i=0,r=Math.min(n._o,this._o);e<r;)i+=this[e]+n[e],t[e++]=i&this.no,i>>=this.Zr;if(n._o<this._o){for(i+=n.s;e<this._o;)i+=this[e],t[e++]=i&this.no,i>>=this.Zr;i+=this.s}else{for(i+=this.s;e<n._o;)i+=n[e],t[e++]=i&this.no,i>>=this.Zr;i+=n.s}t.s=i<0?-1:0,i>0?t[e++]=i:i<-1&&(t[e++]=this.eo+i),t._o=e,t.To()},r.prototype.Xo=function(n){this[this._o]=this.$r(0,n-1,this,0,0,this._o),++this._o,this.To()},r.prototype.Go=function(n,t){if(0!=n){for(;this._o<=t;)this[this._o++]=0;for(this[t]+=n;this[t]>=this.eo;)this[t]-=this.eo,++t>=this._o&&(this[this._o++]=0),++this[t]}},r.prototype.qo=function(n,t,e){var i,r=Math.min(this._o+n._o,t);for(e.s=0,e._o=r;r>0;)e[--r]=0;for(i=e._o-this._o;r<i;++r)e[r+this._o]=this.$r(0,n[r],e,r,0,this._o);for(i=Math.min(n._o,t);r<i;++r)this.$r(0,n[r],e,r,0,t-r);e.To()},r.prototype.Bo=function(n,t,e){--t;var i=e._o=this._o+n._o-t;for(e.s=0;--i>=0;)e[i]=0;for(i=Math.max(t-this._o,0);i<n._o;++i)e[this._o+i-t]=this.$r(t-i,n[i],e,0,0,this._o+i-t);e.To(),e.Oo(1,e)},r.prototype.rs=function(n){if(n<=0)return 0;var t=this.eo%n,e=this.s<0?n-1:0;if(this._o>0)if(0==t)e=this[0]%n;else for(var i=this._o-1;i>=0;--i)e=(t*e+this[i])%n;return e},r.prototype.os=function(n){var t=this.ss(r.ONE),e=t.us();if(e<=0)return!1;var i=t.fs(e);(n=n+1>>1)>P.length&&(n=P.length);for(var s=o(),u=0;u<n;++u){s.so(P[Math.floor(Math.random()*P.length)]);var a=s.cs(i,this);if(0!=a.bo(r.ONE)&&0!=a.bo(t)){for(var f=1;f++<e&&0!=a.bo(t);)if(0==(a=a.Vo(2,this)).bo(r.ONE))return!1;if(0!=a.bo(t))return!1}}return!0},r.prototype.clone=function(){var n=o();return this.No(n),n},r.prototype.zo=function(){if(this.s<0){if(1==this._o)return this[0]-this.eo;if(0==this._o)return-1}else{if(1==this._o)return this[0];if(0==this._o)return 0}return(this[1]&(1<<32-this.Zr)-1)<<this.Zr|this[0]},r.prototype.ls=function(){return 0==this._o?this.s:this[0]<<24>>24},r.prototype.vs=function(){return 0==this._o?this.s:this[0]<<16>>16},r.prototype.Yo=function(){return this.s<0?-1:this._o<=0||1==this._o&&this[0]<=0?0:1},r.prototype.ds=function(){var n=this._o,t=[];t[0]=this.s;var e,i=this.Zr-n*this.Zr%8,r=0;if(n-- >0)for(i<this.Zr&&(e=this[n]>>i)!=(this.s&this.no)>>i&&(t[r++]=e|this.s<<this.Zr-i);n>=0;)i<8?(e=(this[n]&(1<<i)-1)<<8-i,e|=this[--n]>>(i+=this.Zr-8)):(e=this[n]>>(i-=8)&255,i<=0&&(i+=this.Zr,--n)),0!=(128&e)&&(e|=-256),0==r&&(128&this.s)!=(128&e)&&++r,(r>0||e!=this.s)&&(t[r++]=e);return t},r.prototype.equals=function(n){return 0==this.bo(n)},r.prototype.min=function(n){return this.bo(n)<0?this:n},r.prototype.max=function(n){return this.bo(n)>0?this:n},r.prototype.and=function(n){var t=o();return this.$o(n,h,t),t},r.prototype.or=function(n){var t=o();return this.$o(n,g,t),t},r.prototype.xor=function(n){var t=o();return this.$o(n,m,t),t},r.prototype._s=function(n){var t=o();return this.$o(n,y,t),t},r.prototype.ps=function(){for(var n=o(),t=0;t<this._o;++t)n[t]=this.no&~this[t];return n._o=this._o,n.s=~this.s,n},r.prototype.shiftLeft=function(n){var t=o();return n<0?this.Mo(-n,t):this.Ro(n,t),t},r.prototype.fs=function(n){var t=o();return n<0?this.Ro(-n,t):this.Mo(n,t),t},r.prototype.us=function(){for(var n=0;n<this._o;++n)if(0!=this[n])return n*this.Zr+S(this[n]);return this.s<0?this._o*this.Zr:-1},r.prototype.hs=function(){for(var n=0,t=this.s&this.no,e=0;e<this._o;++e)n+=b(this[e]^t);return n},r.prototype.Qo=function(n){var t=Math.floor(n/this.Zr);return t>=this._o?0!=this.s:0!=(this[t]&1<<n%this.Zr)},r.prototype.gs=function(n){return this.ts(n,g)},r.prototype.ys=function(n){return this.ts(n,y)},r.prototype.Ss=function(n){return this.ts(n,m)},r.prototype.add=function(n){var t=o();return this.es(n,t),t},r.prototype.ss=function(n){var t=o();return this.Do(n,t),t},r.prototype.multiply=function(n){var t=o();return this.Ao(n,t),t},r.prototype.yo=function(n){var t=o();return this.Io(n,t,null),t},r.prototype.bs=function(n){var t=o();return this.Io(n,null,t),t},r.prototype.ws=function(n){var t=o(),e=o();return this.Io(n,t,e),[t,e]},r.prototype.cs=function(n,t){var e,i,r=n.Fo(),s=v(1);if(r<=0)return s;e=r<18?1:r<48?3:r<144?4:r<768?5:6,i=r<8?new _(t):t.Uo()?new I(t):new p(t);var u=[],a=3,f=e-1,c=(1<<e)-1;if(u[1]=i.So(this),e>1){var l=o();for(i.Co(u[1],l);a<=c;)u[a]=o(),i.Po(l,u[a-2],u[a]),a+=2}var h,g,m=n._o-1,y=!0,S=o();for(r=d(n[m])-1;m>=0;){for(r>=f?h=n[m]>>r-f&c:(h=(n[m]&(1<<r+1)-1)<<f-r,m>0&&(h|=n[m-1]>>this.Zr+r-f)),a=e;0==(1&h);)h>>=1,--a;if((r-=a)<0&&(r+=this.Zr,--m),y)u[h].No(s),y=!1;else{for(;a>1;)i.Co(s,S),i.Co(S,s),a-=2;a>0?i.Co(s,S):(g=s,s=S,S=g),i.Po(S,u[h],s)}for(;m>=0&&0==(n[m]&1<<r);)i.Co(s,S),g=s,s=S,S=g,--r<0&&(r=this.Zr-1,--m)}return i.Eo(s)},r.prototype.Es=function(n){var t=n.Uo();if(this.Uo()&&t||0==n.Yo())return r.ZERO;for(var e=n.clone(),i=this.clone(),o=v(1),s=v(0),u=v(0),a=v(1);0!=e.Yo();){for(;e.Uo();)e.Mo(1,e),t?(o.Uo()&&s.Uo()||(o.es(this,o),s.Do(n,s)),o.Mo(1,o)):s.Uo()||s.Do(n,s),s.Mo(1,s);for(;i.Uo();)i.Mo(1,i),t?(u.Uo()&&a.Uo()||(u.es(this,u),a.Do(n,a)),u.Mo(1,u)):a.Uo()||a.Do(n,a),a.Mo(1,a);e.bo(i)>=0?(e.Do(i,e),t&&o.Do(u,o),s.Do(a,s)):(i.Do(e,i),t&&u.Do(o,u),a.Do(s,a))}return 0!=i.bo(r.ONE)?r.ZERO:a.bo(n)>=0?a.ss(n):a.Yo()<0?(a.es(n,a),a.Yo()<0?a.add(n):a):a},r.prototype.pow=function(n){return this.exp(n,new w)},r.prototype.Is=function(n){var t=this.s<0?this.xo():this.clone(),e=n.s<0?n.xo():n.clone();if(t.bo(e)<0){var i=t;t=e,e=i}var r=t.us(),o=e.us();if(o<0)return t;for(r<o&&(o=r),o>0&&(t.Mo(o,t),e.Mo(o,e));t.Yo()>0;)(r=t.us())>0&&t.Mo(r,t),(r=e.us())>0&&e.Mo(r,e),t.bo(e)>=0?(t.Do(e,t),t.Mo(1,t)):(e.Do(t,e),e.Mo(1,e));return o>0&&e.Ro(o,e),e},r.prototype.Zo=function(n){var t,e=this.abs();if(1==e._o&&e[0]<=P[P.length-1]){for(t=0;t<P.length;++t)if(e[0]==P[t])return!0;return!1}if(e.Uo())return!1;for(t=1;t<P.length;){for(var i=P[t],r=t+1;r<P.length&&i<A;)i*=P[r++];for(i=e.rs(i);t<r;)if(i%P[t++]==0)return!1}return e.os(n)},r.prototype.Ps=function(){var n=o();return this.Lo(n),n},C.prototype.init=function(n){var t,e,i;for(t=0;t<256;++t)this.Ko[t]=t;for(e=0,t=0;t<256;++t)e=e+this.Ko[t]+n[t%n.length]&255,i=this.Ko[t],this.Ko[t]=this.Ko[e],this.Ko[e]=i;this.jo=0,this.Ho=0},C.prototype.next=function(){var n;return this.jo=this.jo+1&255,this.Ho=this.Ho+this.Ko[this.jo]&255,n=this.Ko[this.jo],this.Ko[this.jo]=this.Ko[this.Ho],this.Ko[this.Ho]=n,this.Ko[n+this.Ko[this.jo]&255]};var L,D,N,T=256;function O(){var n;n=(new Date).getTime(),D[N++]^=255&n,D[N++]^=n>>8&255,D[N++]^=n>>16&255,D[N++]^=n>>24&255,N>=T&&(N-=T)}if(null==D){var k;for(D=[],N=0;N<T;)k=Math.floor(65536*Math.random()),D[N++]=k>>>8,D[N++]=255&k;N=0,O()}function R(){if(null==L){for(O(),(L=new C).init(D),N=0;N<D.length;++N)D[N]=0;N=0}return L.next()}function M(){}function U(n,t){return new r(n,t)}function x(){this.n=null,this.e=0,this.d=null,this.p=null,this.q=null,this.dmp1=null,this.dmq1=null,this.coeff=null}M.prototype.ns=function(n){var t;for(t=0;t<n.length;++t)n[t]=R()},x.prototype.As=function(n){return n.Vo(this.e,this.n)},x.prototype.Cs=function(n,t){null!=n&&null!=t&&n.length>0&&t.length>0?(this.n=U(n,16),this.e=parseInt(t,16)):alert(\"Invalid RSA public key\")},x.prototype.encrypt=function(n){var t=function(n,t){if(t<n.length+11)return alert(\"Message too long for RSA\"),null;for(var e=[],i=n.length-1;i>=0&&t>0;){var o=n.charCodeAt(i--);o<128?e[--t]=o:o>127&&o<2048?(e[--t]=63&o|128,e[--t]=o>>6|192):(e[--t]=63&o|128,e[--t]=o>>6&63|128,e[--t]=o>>12|224)}e[--t]=0;for(var s=new M,u=[];t>2;){for(u[0]=0;0==u[0];)s.ns(u);e[--t]=u[0]}return e[--t]=2,e[--t]=0,new r(e)}(n,this.n.Fo()+7>>3);if(null==t)return null;var e=this.As(t);if(null==e)return null;var i=e.toString(16);return 0==(1&i.length)?i:\"0\"+i},x.prototype.Ls=function(n){if(null==this.p||null==this.q)return n.cs(this.d,this.n);for(var t=n.wo(this.p).cs(this.dmp1,this.p),e=n.wo(this.q).cs(this.dmq1,this.q);t.bo(e)<0;)t=t.add(this.p);return t.ss(e).multiply(this.coeff).wo(this.p).multiply(this.q).add(e)},x.prototype.Ds=function(n,t,e){null!=n&&null!=t&&n.length>0&&t.length>0?(this.n=U(n,16),this.e=parseInt(t,16),this.d=U(e,16)):alert(\"Invalid RSA private key\")},x.prototype.Ns=function(n,t,e,i,r,o,s,u){null!=n&&null!=t&&n.length>0&&t.length>0?(this.n=U(n,16),this.e=parseInt(t,16),this.d=U(e,16),this.p=U(i,16),this.q=U(r,16),this.dmp1=U(o,16),this.dmq1=U(s,16),this.coeff=U(u,16)):alert(\"Invalid RSA private key\")},x.prototype.Ts=function(n,t){var e=new M,i=n>>1;this.e=parseInt(t,16);for(var o=new r(t,16);;){for(;this.p=new r(n-i,1,e),0!=this.p.ss(r.ONE).Is(o).bo(r.ONE)||!this.p.Zo(10););for(;this.q=new r(i,1,e),0!=this.q.ss(r.ONE).Is(o).bo(r.ONE)||!this.q.Zo(10););if(this.p.bo(this.q)<=0){var s=this.p;this.p=this.q,this.q=s}var u=this.p.ss(r.ONE),a=this.q.ss(r.ONE),f=u.multiply(a);if(0==f.Is(o).bo(r.ONE)){this.n=this.p.multiply(this.q),this.d=o.Es(f),this.dmp1=this.d.wo(u),this.dmq1=this.d.wo(a),this.coeff=this.q.Es(this.p);break}}},x.prototype.decrypt=function(n){var t=U(n,16),e=this.Ls(t);return null==e?null:function(n,t){for(var e=n.ds(),i=0;i<e.length&&0==e[i];)++i;if(e.length-i!=t-1||2!=e[i])return null;for(++i;0!=e[i];)if(++i>=e.length)return null;for(var r=\"\";++i<e.length;){var o=255&e[i];o<128?r+=String.fromCharCode(o):o>191&&o<224?(r+=String.fromCharCode((31&o)<<6|63&e[i+1]),++i):(r+=String.fromCharCode((15&o)<<12|(63&e[i+1])<<6|63&e[i+2]),i+=2)}return r}(e,this.n.Fo()+7>>3)};var W=\"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\",F=\"=\";function V(n){var t,e,i=\"\";for(t=0;t+3<=n.length;t+=3)e=parseInt(n.substring(t,t+3),16),i+=W.charAt(e>>6)+W.charAt(63&e);for(t+1==n.length?(e=parseInt(n.substring(t,t+1),16),i+=W.charAt(e<<2)):t+2==n.length&&(e=parseInt(n.substring(t,t+2),16),i+=W.charAt(e>>2)+W.charAt((3&e)<<4));(3&i.length)>0;)i+=F;return i}function B(n){var t,e,i=\"\",r=0;for(t=0;t<n.length&&n.charAt(t)!=F;++t){var o=W.indexOf(n.charAt(t));o<0||(0==r?(i+=c(o>>2),e=3&o,r=1):1==r?(i+=c(e<<2|o>>4),e=15&o,r=2):2==r?(i+=c(e),i+=c(o>>2),e=3&o,r=3):(i+=c(e<<2|o>>4),i+=c(15&o),r=0))}return 1==r&&(i+=c(e<<2)),i}x.prototype.Os=function(n){n=this.ks(n);var t=this.Rs(),e=0,i=null,r=null,o=0;for(var s in t)t.hasOwnProperty(s)&&((i=t[s]).hasOwnProperty(\"offset\")&&(e+=2*i.offset),o=\"string\"==typeof i.length?this[i.length]:i.length,o*=2,r=n.substr(e,o),i.hasOwnProperty(\"type\")&&(\"int\"==i.type?r=parseInt(r,16):\"bigint\"==i.type&&(r=U(r,16))),e+=o,this[s]=r)},x.prototype.Ms=function(n){var t=\"\";n=e(n);for(var i=0;i<n.length;++i){var r=n.charCodeAt(i).toString(16);1===r.length&&(r=\"0\"+r),t+=r}return t},x.prototype.ks=function(n){var t=(n=n.replace(/^\\s+|\\s+$/g,\"\")).split(/\\r?\\n/);return\"-----BEGIN\"==t[0].substring(0,10)&&(t=t.slice(1,t.length-1)),n=t.join(\"\"),this.Ms(n)},x.prototype.Us=function(){var n=\"\",t=this.Rs(),e=null,i=null,r=0;for(var o in t)t.hasOwnProperty(o)&&(e=t[o]).variable&&((i=this[o].toString(16)).length%2&&(i=\"0\"+i),e.hasOwnProperty(\"padded\")&&e.xs&&(i=\"00\"+i),(r=(r=i.length/2).toString(16)).length%2&&(r=\"0\"+r),e.hasOwnProperty(\"extraspace\")&&(n+=r),n+=r,n+=i,n+=\"02\");return n.slice(0,-2)},x.prototype.Ws=function(n,t){if(!n)return n;var e=\"(.{1,\"+(t=t||64)+\"})( +|$\\n?)|(.{1,\"+t+\"})\";return n.match(new RegExp(e,\"g\")).join(\"\\n\")},x.prototype.Fs=function(){var n=\"-----BEGIN RSA PRIVATE KEY-----\\n\",t=\"3082025e02010002\";return t+=this.Us(),n+=this.Ws(V(t))+\"\\n\",n+=\"-----END RSA PRIVATE KEY-----\"},x.prototype.Vs=function(){var n=\"-----BEGIN PUBLIC KEY-----\\n\",t=\"30819f300d06092a864886f70d010101050003818d0030818902\";return t+=this.Us(),n+=this.Ws(V(t))+\"\\n\",n+=\"-----END PUBLIC KEY-----\"};var q=function(n){x.call(this),n&&this.Os(n)};(q.prototype=new x).constructor=q,q.prototype.Rs=function(){return{header:{length:4},versionlength:{length:1,offset:1,type:\"int\"},version:{length:\"versionlength\",type:\"int\"},n_length:{length:1,offset:2,type:\"int\"},n:{length:\"n_length\",type:\"bigint\",variable:!0,xs:!0,Bs:!0},e_length:{length:1,offset:1,type:\"int\"},e:{length:\"e_length\",type:\"int\",variable:!0},d_length:{length:1,offset:2,type:\"int\"},d:{length:\"d_length\",type:\"bigint\",variable:!0,xs:!0,Bs:!0},p_length:{length:1,offset:1,type:\"int\"},p:{length:\"p_length\",type:\"bigint\",variable:!0,xs:!0},q_length:{length:1,offset:1,type:\"int\"},q:{length:\"q_length\",type:\"bigint\",variable:!0,xs:!0},dmp1_length:{length:1,offset:1,type:\"int\"},dmp1:{length:\"dmp1_length\",type:\"bigint\",variable:!0},dmq1_length:{length:1,offset:1,type:\"int\"},dmq1:{length:\"dmq1_length\",type:\"bigint\",variable:!0,xs:!0},coeff_length:{length:1,offset:1,type:\"int\"},coeff:{length:\"coeff_length\",type:\"bigint\",variable:!0,xs:!0}}};var G=function(n){x.call(this),n&&(\"string\"==typeof n?this.Os(n):n.hasOwnProperty(\"n\")&&n.hasOwnProperty(\"e\")&&(this.n=n.n,this.e=n.e))};(G.prototype=new x).constructor=G,G.prototype.Rs=function(){return{header:{length:25},n_length:{length:1,offset:2,type:\"int\"},n:{length:\"n_length\",type:\"bigint\",variable:!0,xs:!0,Bs:!0},e_length:{length:1,offset:1,type:\"int\"},e:{length:\"e_length\",type:\"int\",variable:!0}}};var j=function(){this.qs=null,this.Gs=null};return j.prototype.js=function(n){this.qs=new q(n),this.Gs=new G(this.qs)},j.prototype.Hs=function(n){this.Gs=new G(n)},j.prototype.decrypt=function(n){return!!this.qs&&this.qs.decrypt(B(n))},j.prototype.encrypt=function(n){var t=this.Gs||this.qs;return!!t&&V(t.encrypt(n))},j.prototype.Fs=function(){return this.qs||(this.qs=new q,this.qs.Ts(1024,\"010001\"),this.Gs=new G(this.qs)),this.qs.Fs()},j.prototype.Vs=function(){return this.Gs||(this.Gs=new G,this.Gs.Ts(1024,\"010001\")),this.Gs.Vs()},function(n){var t=new j;return t.Hs(i.Er),t.encrypt(n)}}(),n.exports=r.encrypt},2004:n=>{var t=t||{};t.Ks=function(n){return n.replace(/&#x([0-9A-Fa-f]{2})/g,(function(){return String.fromCharCode(parseInt(arguments[1],16))}))},t.Js=function(n,t){var e=t+\"\";return Array(n).join(\"0\").substring(0,Math.max(n-e.length,0))+e},n.exports=t},1946:n=>{var t=t||{},e=\"undefined\";t.Ys=function(n,t){return t=t||!1,n?\"0\"!=n:t},t.zs=function(n,t){return null==n||isNaN(n)?t||0:parseInt(n)},t.Xs=function(n,t){var e=Number(n);return null==n||isNaN(e)?t||0:e},t.toString=function(n){if(typeof n==e)return e;if(\"string\"==typeof n)return n;if(n instanceof Array)return n.join(\",\");var t=\"\";for(var i in n)n.hasOwnProperty(i)&&(t+=i+\":\"+n[i]+\";\");return t||n.toString()},n.exports.Ys=t.Ys,n.exports.zs=t.zs,n.exports.Xs=t.Xs,n.exports.toString=t.toString},4442:(n,t,e)=>{var i=e(405),r=\"undefined\",o=e(634);n.exports=function(){var n=this,t=typeof encodeURIComponent!==r?encodeURIComponent:escape,e=typeof decodeURIComponent!==r?decodeURIComponent:unescape,s=\"cs_dir_\",u=\"cs_file_\",a=typeof localStorage!==r?localStorage:null,f={},c=\"|\",l=a&&t&&e;o.extend(n,{dir:function(n){if(!l)return null;var t=s+n,i=f[t];if(i)return i.slice();var r=a.getItem(t);if(r){i=[];for(var o=0,u=(r=r.split(c)).length;o<u;o++)r[o].length>0&&i.push(e(r[o]));return f[t]=i,i.slice()}return null},append:function(t,e,i){if(l){var r=n.read(t,e);r?r+=i:r=i,n.write(t,e,r)}},write:function(e,r,o){if(l){var v=n.dir(e);v||(function(n){var t=s+n;\"function\"==typeof a.setItem?a.setItem(t,\"\"):a[t]=\"\",f[t]=[]}(e),v=[]),-1==i.indexOf(r,v)&&function(n,e){var i=s+n;try{\"function\"==typeof a.setItem?a.setItem(i,a.getItem(i)+c+t(e)):a[i]=a.getItem(i)+c+t(e)}catch(r){}f[i].push(e)}(e,r),function(n,t,e){try{\"function\"==typeof a.setItem?a.setItem(u+n+t,e):a[u+n+t]=e}catch(i){}}(e,r,o)}},deleteFile:function(e,r){if(!l)return!1;var o=n.dir(e);return!!o&&-1!=i.indexOf(r,o)&&(function(n,e){var r=s+n,o=f[r];o.splice(i.indexOf(e,o),1);for(var l=[],v=0,d=o.length;v<d;v++)l.push(t(o[v]));try{\"function\"==typeof a.setItem?a.setItem(r,l.join(c)):a[r]=l.join(c),\"function\"==typeof a.removeItem?a.removeItem(u+n+e):delete a[u+n+e]}catch(_){}}(e,r),!0)},read:function(t,e){if(!l)return null;var r=n.dir(t);return r?-1==i.indexOf(e,r)?null:function(n,t){try{return\"function\"==typeof a.getItem?a.getItem(u+n+t):a[u+n+t]}catch(e){}}(t,e):null}})}},2886:(n,t,e)=>{var i,r,o=e(405),s=\"undefined\",u=e(634),a=null,f=null,c=\"cs_dir_\",l=\"|\",v={},d=!1;function _(){a=typeof FileSystem!=s?new FileSystem:null,f=typeof curWidget!=s?curWidget.id:null,typeof sf!==s&&(r=i=function(n,t){sf.core.localData(n,t)}),null==a||typeof a.isValidCommonPath==s||a.isValidCommonPath(f)||a.createCommonDir(f),d=!0}function p(n){return n.replace(/^\\s+|\\s+$/g,\"\")}function h(n,t){var e=v[n];e?e.push(t):e=v[n]=[t],r(c+n,e.join(l))}function g(n,t){var e=v[n],i=o.indexOf(t,e);i>=0&&(e.splice(i,1),r(c+n,0===e.length?null:e.join(l)))}n.exports=function(){u.extend(this,{dir:function(n){if(d||_(),a.isValidCommonPath(f+\"/\"+n)){var t=v[n];if(!t){if(!(t=i(c+n)))return null;t=v[n]=t.split(l)}for(var e=t.slice(),r=0,o=e.length;r<o;r++){var s=t[r];a.isValidCommonPath(f+\"/\"+n+\"/\"+s)||g(n,s)}return e}return null},append:function(n,t,e){d||_();var i=f+\"/\"+n;a.isValidCommonPath(i)||a.createCommonDir(i),a.isValidCommonPath(i+\"/\"+t)||h(n,t);var r=a.openCommonFile(i+\"/\"+t,\"a\");r.writeLine(p(e)),a.closeCommonFile(r)},write:function(n,t,e){d||_();var i=f+\"/\"+n;a.isValidCommonPath(i)||a.createCommonDir(i),a.isValidCommonPath(i+\"/\"+t)||h(n,t);var r=a.openCommonFile(i+\"/\"+t,\"w\");r.writeLine(p(e)),a.closeCommonFile(r)},deleteFile:function(n,t){d||_();var e=f+\"/\"+n;return!!a.isValidCommonPath(e)&&(g(n,t),a.deleteCommonFile(e+\"/\"+t))},read:function(n,t){d||_();var e=f+\"/\"+n;if(!a.isValidCommonPath(e))return null;var i=a.openCommonFile(e+\"/\"+t,\"r\");if(i){for(var r,o=[];r=i.readLine();)o.push(r);return a.closeCommonFile(i),o.join(\"\\n\")}return g(n,t),\"\"}})}},8763:(n,t,e)=>{var i=e(4295),r=[],o=!1;function s(){for(var n=0;n<r.length;++n)r[n]()}n.exports={Qs:function(n){r.push(n),o||i.Fr()&&(window.addEventListener?(window.addEventListener(\"unload\",s,!1),o=!0):window.attachEvent&&(window.attachEvent(\"onunload\",s),o=!0))},$s:function(n){for(var t=0;t<r.length;++t)if(r[t]==n){r.splice(t,1);break}0==r.length&&i.Fr()&&(window.removeEventListener?(window.removeEventListener(\"unload\",s,!1),o=!1):window.detachEvent&&(window.detachEvent(\"onunload\",s),o=!1))}}},3975:(n,t,e)=>{var i=e(3492),r=e(4341),o=e(6412).Zs,s=e(6412).nu,u=e(8823),a=e(5464),f=\"undefined\",c=r.Xt,l=r.wr,v=null,d=null,_=null;function p(){null==v&&(typeof atv!=f&&typeof atv.device!=f&&atv.device.idForVendor?(v=i.Hr(atv.device.idForVendor,\"\"),d=\"62\"):(v=+new Date+~~(1e3*Math.random()),d=\"72\"),_=null)}var h={tu:\"atv\",qi:o,xi:s,Storage:u,Ji:a,Hi:!1,Ne:6e4,pr:function(){return p(),_},fe:function(){return c},Rt:function(){return c},hr:function(){return p(),v},gr:function(){return d},ei:function(){return\"Apple TV\"},ti:function(){return typeof atv!=f&&typeof atv.device!=f&&i.Hr(atv.device.softwareVersion,c)},$e:function(){return\"js\"},ni:function(){return\"atv\"},Ze:function(){return typeof atv!=f&&typeof atv.device!=f&&i.Hr(atv.device.softwareVersion,c)},fi:function(){return typeof atv.device!=f&&typeof atv.device.screenFrame!=f&&typeof atv.device.screenFrame.height!=f&&typeof atv.device.screenFrame.width!=f?atv.device.screenFrame.height+\"x\"+atv.device.screenFrame.width:l},ii:function(){return typeof atv!=f&&typeof atv.device!=f&&i.Hr(atv.device.language,\"\")},setTimeout:function(n,t){return typeof atv!=f&&typeof atv.setTimeout!=f&&atv.setTimeout(n,t)},setInterval:function(n,t){return typeof atv!=f&&typeof atv.setInterval!=f&&atv.setInterval(n,t)},clearTimeout:function(n){return typeof atv!=f&&typeof atv.clearTimeout!=f&&atv.clearTimeout(n)},clearInterval:function(n){return typeof atv!=f&&typeof atv.clearInterval!=f&&atv.clearInterval(n)}};n.exports=h},963:(n,t,e)=>{var i=e(634),r=e(5439),o=e(3492),s=e(4295),u=e(4341),a=e(614),f=e(134).eu,c=e(5247),l=e(4442),v=e(7264),d=e(8763),_=\"undefined\",p=u.Xt,h=u.wr,g=i.extend({},r,{tu:\"chromecast\",qi:a,xi:f,Storage:c,Ji:v,Yi:l,Hi:!0,Ne:6e4,fe:function(){return typeof ns_.crm===_?p:ns_.crm.getApplicationData().name},hr:function(){return+new Date+~~(1e3*Math.random())},gr:function(){return\"72\"},ei:function(){return\"chromecast\"},ti:function(){return cast.receiver.VERSION+\"-\"+o.Hr(s.Mr()+\" \"+s.Ur(),p)},ni:function(){return\"html\"},Ze:function(){return\"5\"},fi:function(){var n=typeof window!=_&&o.Kr(window.screen)&&o.Kr(window.screen.availWidth)?window.screen.availWidth:0,t=typeof window!=_&&o.Kr(window.screen)&&o.Kr(window.screen.availHeight)?window.screen.availHeight:0;return n>0&&t>0?n+\"x\"+t:h},ii:function(){return typeof window!=_&&o.Kr(window.navigator)&&o.Hr(window.navigator.language,\"\")||p},iu:function(n){d.Qs(n)},ru:function(n){d.$s(n)}});n.exports=g},2338:(n,t,e)=>{var i=e(634),r=e(5439),o=e(3492),s=e(4341),u=e(614),a=e(134)._o,f=e(134).eu,c=e(5247),l=e(4442),v=e(7264),d=\"undefined\",_=s.Xt,p=s.wr,h=null,g=null,m=null;function y(){if(null==h){var n=typeof device!=d&&o.Kr(device.uuid)&&device.uuid.length>0?device.uuid:null;null!=n?(h=n,g=\"31\",m=n):(h=+new Date+~~(1e3*Math.random()),g=\"72\",m=null)}}var S=i.extend({},r,{tu:\"cordova\",qi:function(){return typeof Image!=d?u.apply(this,arguments):a.apply(this,arguments)},xi:f,Storage:c,Hi:!0,Ji:v,Yi:l,Ne:6e4,pr:function(){return y(),m},hr:function(){return y(),h},gr:function(){return g},ei:function(){return typeof device!=d&&o.Kr(device.model)||_},ti:function(){return typeof device!=d&&o.Kr(device.cordova)&&device.cordova||_},ni:function(){return typeof device!=d&&o.Kr(device.platform)&&\"cordova\"+device.platform||\"cordova\"},Ze:function(){return typeof device!=d&&o.Kr(device.version)||_},fi:function(){var n=typeof window!=d&&o.Kr(window.screen)&&o.Kr(window.screen.availWidth)&&window.screen.availWidth||0,t=typeof window!=d&&o.Kr(window.screen)&&o.Kr(window.screen.availHeight)&&window.screen.availHeight||0;return n>0&&t>0?n+\"x\"+t:p},ii:function(){return typeof window!=d&&o.Kr(window.navigator)&&o.Kr(window.navigator.language)&&window.navigator.language||_}});n.exports=S},165:(n,t,e)=>{var i=e(634),r=e(5439),o=e(3492),s=e(4295),u=e(4341),a=e(614),f=e(134)._o,c=e(134).eu,l=e(5247),v=e(4442),d=e(7264),_=e(8763),p=\"undefined\",h=typeof document!=p&&document||undefined,g=u.Xt,m=u.wr,y=i.extend({},r,{tu:\"html5\",qi:function(){return typeof Image!=p?a.apply(this,arguments):f.apply(this,arguments)},xi:c,Storage:l,Ji:d,Yi:v,Hi:!0,Ne:6e4,fe:function(){return h&&o.Kr(h.title)&&h.title||g},hr:function(){return this.ei()+ +new Date+~~(1e3*Math.random())},gr:function(){return\"72\"},ei:function(){return typeof window!=p&&o.Kr(window.navigator)&&o.Hr(window.navigator.platform,\"\")||\"\"},ti:function(){return o.Hr(s.Mr()+\" \"+s.Ur(),\"\")},ni:function(){return\"html\"},Ze:function(){return\"5\"},fi:function(){var n,t;typeof window!=p&&window.screen&&window.screen.width&&(n=window.screen.width),typeof window!=p&&window.screen&&window.screen.width&&(t=window.screen.height);var e=1;return typeof window!=p&&window.devicePixelRatio&&(e=window.devicePixelRatio),n>0&&t>0?(n*=e)+\"x\"+(t*=e):m},ai:function(){var n,t;typeof window!=p&&window.innerWidth&&(n=window.innerWidth),typeof window!=p&&window.innerHeight&&(t=window.innerHeight);var e=1;return typeof window!=p&&window.devicePixelRatio&&(e=window.devicePixelRatio),n>0&&t>0?(n*=e)+\"x\"+(t*=e):m},ii:function(){return typeof window!=p&&o.Kr(window.navigator)&&o.Hr(window.navigator.language,\"\")||g},iu:function(n){_.Qs(n)},ru:function(n){_.$s(n)}});n.exports=y},6263:(n,t,e)=>{var i=e(634),r=e(5439),o=e(3492),s=e(4341),u=e(134)._o,a=e(134).eu,f=e(5247),c=e(7264),l=e(4442),v=e(623),d=\"undefined\",_=s.Xt,p=s.wr,h=null,g=null,m=null;function y(){if(null==h)if(typeof jsmaf!=d&&o.Kr(jsmaf.hardwareId)){var n=jsmaf.hardwareId;h=n,g=\"31\",m=n}else h=+new Date+~~(1e3*Math.random()),g=\"72\",m=null}var S=i.extend({},r,{tu:\"jsmaf\",qi:u,xi:a,Storage:f,Hi:!0,Ji:c,Yi:l,Ne:6e4,pr:function(){return y(),m},hr:function(){return y(),h},gr:function(){return y(),g},ei:function(){return typeof jsmaf!=d&&o.Kr(jsmaf.platform)?jsmaf.platform:_},ni:function(){return\"jsmaf\"},Ze:function(){return typeof jsmaf!=d&&o.Kr(jsmaf.version)?jsmaf.version:_},fi:function(){return typeof jsmaf!=d&&o.Kr(jsmaf.screenWidth)&&o.Kr(jsmaf.screenHeight)?jsmaf.screenWidth+\"x\"+jsmaf.screenHeight:p},ii:function(){return typeof jsmaf!=d&&o.Kr(jsmaf.locale)?jsmaf.locale:_},setTimeout:function(n,t){return jsmaf.setTimeout(n,t)},setInterval:function(n,t){return jsmaf.setInterval(n,t)},clearTimeout:function(n){return jsmaf.clearTimeout(n)},clearInterval:function(n){return jsmaf.clearInterval(n)},ri:function(){if(typeof jsmaf==d||!o.Kr(jsmaf.platform))var n=_;return\"ps3\"==jsmaf.platform?n=\"cell\":\"ps4\"==jsmaf.platform?n=\"ps4\":\"vita\"==jsmaf.platform&&(n=\"vita\"),n},oi:function(){return typeof jsmaf!=d&&\"connected\"==jsmaf.networkStatus&&o.Kr(jsmaf.connectionType)?\"wired\"==jsmaf.connectionType?v.ETHERNET:\"wireless\"==jsmaf.connectionType?v.WIFI:\"phone\"==jsmaf.connectionType?v.WWAN:v.UNKNOWN:v.UNKNOWN}});n.exports=S},2221:(n,t,e)=>{var i=e(634),r=e(5439),o=e(3492),s=e(4341),u=e(614),a=e(134)._o,f=e(5247),c=e(7264),l=e(623),v=\"undefined\",d=s.Xt,_=s.wr,p=null,h=null,g=null;function m(){if(null==p){var n=function(){if(typeof ns_!=v&&o.Kr(ns_.netcastDevice)){if(o.Kr(ns_.netcastDevice.net_macAddress)&&o.jr(ns_.netcastDevice.net_macAddress))return ns_.netcastDevice.net_macAddress;if(o.Kr(ns_.netcastDevice.serialNumber)&&o.jr(ns_.netcastDevice.serialNumber))return ns_.netcastDevice.serialNumber}return null}();null!=n?(p=n,h=\"31\",g=n):(p=+new Date+~~(1e3*Math.random()),h=\"72\",g=null)}}var y=i.extend({},r,{tu:\"netcast\",qi:function(){return typeof Image!=v?u.apply(this,arguments):a.apply(this,arguments)},xi:null,Storage:f,Ji:c,Hi:!1,Ne:6e4,pr:function(){return m(),g},hr:function(){return m(),p},gr:function(){return h},ei:function(){return typeof ns_!=v&&o.Kr(ns_.netcastDevice)&&o.Kr(ns_.netcastDevice.modelName)&&ns_.netcastDevice.modelName||d},ti:function(){return typeof ns_!=v&&o.Kr(ns_.netcastDevice)&&o.Hr(ns_.netcastDevice.version,d)||d},ni:function(){return typeof ns_!=v&&o.Kr(ns_.netcastDevice)?\"lg-ott\"+o.Hr(ns_.netcastDevice.platform,d):d},Ze:function(){if(typeof ns_!=v&&o.Kr(ns_.netcastDevice)){if(o.Kr(ns_.netcastDevice.version))return ns_.netcastDevice.version;if(o.Kr(ns_.netcastDevice.hwVersion))return ns_.netcastDevice.hwVersion;if(o.Kr(ns_.netcastDevice.swVersion))return ns_.netcastDevice.swVersion}return d},fi:function(){if(typeof ns_!=v&&o.Kr(ns_.netcastDevice)&&o.Kr(ns_.netcastDevice.osdResolution))switch(ns_.netcastDevice.osdResolution){case 0:return\"640x480\";case 1:return\"720x576\";case 2:return\"1280x720\";case 3:return\"1920x1080\";case 4:return\"1366x768\"}return _},ii:function(){return typeof ns_!=v&&o.Kr(ns_.netcastDevice)&&o.Hr(ns_.netcastDevice.tvLanguage2,o.Hr(window.navigator.language))||d},oi:function(){if(typeof ns_.netcastDevice!==v){if(0===ns_.netcastDevice.networkType)return l.ETHERNET;if(1===ns_.netcastDevice.networkType)return l.WIFI}return d}});n.exports=y},2684:(n,t,e)=>{var i=e(634),r=e(5439),o=e(3492),s=e(4341),u=s.Xt,a=null,f=null,c=null;function l(){null==a&&(a=+new Date+~~(1e3*Math.random()),f=\"72\",c=null)}function v(n,t){var i=this,r=0;i.send=function(o){var s=o.match(/^https/)?e(5687):e(3685),u=function(n){var t=e(2037);return{headers:{\"User-Agent\":(n.fe()||\"unknown\")+\"/\"+(n.Rt()||\"unknown\")+\" (\"+(t.platform()||\"unknown\")+\"; \"+(t.arch()||\"unknown\")+\"; \"+(t.type()||\"unknown\")+\"/\"+(t.release||\"unknown\")+\") node.js/\"+process.version}}}(t);s.get(o,u,(function(t){var e=t.statusCode;if((302==e||301==e)&&r<20&&t.headers&&t.headers.location)return r++,void i.send(t.headers.location);n(e)})).on(\"error\",(function(){n()}))}}var d=i.extend({},r,{tu:\"nodejs\",qi:function(n,t,e){new v(t,e).send(n)},xi:null,Storage:null,Hi:!1,pr:function(){return l(),c},hr:function(){return l(),a},gr:function(){return f},ti:function(){var n=e(2037);return[n.type(),n.platform(),n.release()].join(\";\")},ri:function(){return e(2037).arch()||u},ni:function(){return\"nodejs\"},Ze:function(){return\"undefined\"==typeof process||o.Gr(process.version)?u:process.version}});n.exports=d},2905:(n,t,e)=>{var i=e(634),r=e(5439),o=e(3492),s=e(4341),u=e(623),a=e(614),f=e(134)._o,c=e(134).eu,l=e(5247),v=\"undefined\",d=s.Xt,_=s.wr,p=null,h=i.extend({},r,{tu:\"samsung-tizen-tv\",qi:function(){return typeof Image!=v?a.apply(this,arguments):f.apply(this,arguments)},xi:c,Storage:l,Hi:!0,Ne:6e4,fe:function(){try{return tizen[\"package\"].getPackageInfo().name}catch(n){return d}},Rt:function(){try{return tizen[\"package\"].getPackageInfo().version}catch(n){return d}},pr:function(){try{if(!(webapis&&webapis.adinfo&&webapis.adinfo.isLATEnabled()))return null;var n=webapis.adinfo.getTIFA();if(n)return n}catch(t){return d}},hr:function(){return function(){try{webapis&&webapis.appcommon&&webapis.appcommon.getUuid()&&(p=webapis.appcommon.getUuid())}catch(n){p=+new Date+~~(1e3*Math.random())}}(),p},gr:function(){return\"72\"},ti:function(){try{return tizen.systeminfo.getCapability(\"http:\/\/tizen.org/feature/platform.version\")}catch(n){return d}},ri:function(){try{return tizen.systeminfo.getCapability(\"http:\/\/tizen.org/feature/platform.core.cpu.arch\")}catch(n){return d}},ni:function(){return\"samsung-tizen-tv\"},Ze:function(){try{return tizen[\"package\"].getPackageInfo().version}catch(n){return d}},fi:function(){try{return tizen.systeminfo.getCapability(\"http:\/\/tizen.org/feature/screen.width\")+\"x\"+tizen.systeminfo.getCapability(\"http:\/\/tizen.org/feature/screen.height\")}catch(n){return _}},ei:function(){return\"samsung-tizen-tv\"},le:function(){try{return tizen[\"package\"].getPackageInfo().id}catch(n){return d}},oi:function(){return navigator&&navigator.connection&&navigator.connection.type?navigator.connection.type:u.UNKNOWN},ai:function(){var n=typeof window!=v&&o.Kr(window.innerWidth)?window.innerWidth:0,t=typeof window!=v&&o.Kr(window.innerHeight)?window.innerHeight:0;return n>0&&t>0?n+\"x\"+t:_}});n.exports=h},5439:(n,t,e)=>{var i=e(4295),r=e(614),o=e(5247),s=e(4341),u=e(623),a=s.Xt,f=s.wr,c=e(390),l={tu:\"generic\",Vi:c.In,Bi:c.In,Wi:c.An,Fi:c.An,qi:r,xi:null,Storage:o,Hi:!1,Ji:null,Yi:null,Ne:0,ou:!1,br:!1,ot:!1,je:function(n){n()},pr:function(){return null},fe:function(){return a},Rt:function(){return a},hr:function(){return+new Date+~~(1e3*Math.random())},gr:function(){return\"72\"},ei:function(){return a},ti:function(){return a},$e:function(){return\"js\"},ni:function(){return a},Ze:function(){return a},fi:function(){return f},ai:function(){return f},ii:function(){return a},le:function(){return a},setTimeout:function(n,t){return setTimeout(n,t)},setInterval:function(n,t){return setInterval(n,t)},clearTimeout:function(n){return clearTimeout(n)},clearInterval:function(n){return clearInterval(n)},ri:function(){return a},oi:function(){return u.UNKNOWN},ui:function(){return a},li:function(n){},di:function(n){console.log(n)},ne:3e3,te:3e4,su:function(){return!i.Dr()||!i.Or()},uu:function(n){i.Dr()&&i.kr(n)},au:function(n){i.Dr()&&i.Rr(n)},iu:function(n){},ru:function(n){},ze:!1,Xe:\"_\",si:function(){return\"0-0-2\"}};n.exports=l},1243:(n,t,e)=>{var i=e(634),r=e(5439),o=e(3492),s=e(4341),u=e(134)._o,a=e(1582),f=e(7026),c=e(2886),l=e(623),v=\"undefined\",d=s.Xt,_=s.wr,p=null,h=null,g=null;function m(){if(null==p){var n=function(){if(\"object\"!=typeof sf||\"object\"!=typeof sf.core||\"function\"!=typeof sf.core.sefplugin)return null;var n=sf.core.sefplugin(\"NNAVI\");if(\"function\"!=typeof n.Open||\"function\"!=typeof n.Execute)return null;n.Open(\"Network\",\"1.001\",\"Network\");var t=n.Execute(\"GetMAC\",\"0\");if(!o.Gr(t))return t;if(t=n.Execute(\"GetMAC\",\"1\"),!o.Gr(t))return t;var e=n.Execute(\"GetDeviceID\");return o.Gr(e)?null:e}();null!=n?(p=n,h=\"31\",g=n):(p=+new Date+~~(1e3*Math.random()),h=\"72\",g=null)}}var y=i.extend({},r,{tu:\"smarttv\",qi:u,xi:null,Storage:a,Hi:!0,Ji:f,Yi:c,Ne:6e4,pr:function(){return m(),g},Rt:function(){return typeof sf!=v&&o.Kr(sf.env)&&o.Kr(sf.env.getAppVersion)&&sf.env.getAppVersion()||d},hr:function(){return m(),p},gr:function(){return h},ei:function(){return typeof sf!=v&&o.Kr(sf.core)&&o.Kr(sf.core.getEnvValue)&&sf.core.getEnvValue(\"modelid\")||d},ti:function(){return\"2.0.0\"},ni:function(){if(typeof sf!==v&&o.Kr(sf.env)&&o.Kr(sf.env.getProductType)&&o.Kr(sf.env.PRODUCTTYPE_TV)&&o.Kr(sf.env.PRODUCTTYPE_MONITOR)&&o.Kr(sf.env.PRODUCTTYPE_BD)){var n=[];return n[sf.env.PRODUCTTYPE_TV]=\"samsung-smarttv-tv\",n[sf.env.PRODUCTTYPE_MONITOR]=\"samsung-smarttv-monitor\",n[sf.env.PRODUCTTYPE_BD]=\"samsung-smarttv-bd\",n[sf.env.getProductType()]}},Ze:function(){return typeof sf!=v&&o.Kr(sf.env)&&o.Kr(sf.env.getFirmwareVer)&&sf.env.getFirmwareVer().version},fi:function(){if(typeof sf===v||!o.Kr(sf.env)||!o.Kr(sf.env.getScreenSize))return _;var n=sf.env.getScreenSize();return n.width+\"x\"+n.height},ii:function(){if(typeof sf!==v&&o.Kr(sf.env)&&o.Kr(sf.env.getLanguageCode))return sf.env.getLanguageCode()},oi:function(){if(\"object\"!=typeof sf||\"object\"!=typeof sf.core||\"function\"!=typeof sf.core.sefplugin)return l.UNKNOWN;var n=sf.core.sefplugin(\"NETWORK\");if(\"function\"!=typeof n.Open||\"function\"!=typeof n.Execute)return l.UNKNOWN;n.Open(\"Network\",\"1.001\",\"Network\");var t=n.Execute(\"GetActiveType\");return 0===t?l.ETHERNET:1===t?l.WIFI:l.UNKNOWN}});n.exports=y},9655:(n,t,e)=>{var i=e(634),r=e(5439),o=e(3492),s=e(4341),u=e(4309),a=e(5247),f=e(7264),c=\"undefined\",l=s.Xt,v=s.wr,d=null,_=null,p=null;function h(){if(null==d){var n=o.jr(engine.stats.device.id)?engine.stats.device.id:o.jr(engine.stats.network.mac)?engine.stats.network.mac:null;null!=n?(d=n,_=\"31\",p=n):(d=+new Date+~~(1e3*Math.random()),_=\"72\",p=null)}}var g=i.extend({},r,{tu:\"trilithium\",qi:u,xi:null,Storage:a,Ji:f,Hi:!1,Ne:6e4,pr:function(){return h(),p},fe:function(){return o.jr(engine.stats.application.name)?engine.stats.application.name:l},Rt:function(){return o.jr(engine.stats.application.version)?engine.stats.application.version:l},hr:function(){return h(),d},gr:function(){return _},ei:function(){return o.Hr(engine.stats.device.platform,l)},ni:function(){return\"trilithium\"},Ze:function(){return o.Hr(engine.stats.device.version,l)},fi:function(){return typeof screen!=c&&typeof screen.height!=c&&typeof screen.width!=c?screen.height+\"x\"+screen.width:v}});n.exports=g},9158:(n,t,e)=>{var i=e(634),r=e(5439),o=e(3492),s=e(4341),u=e(134)._o,a=e(134).eu,f=e(5247),c=e(4442),l=e(7264),v=s.wr,d=null,_=null,p=null;function h(){null==d&&(o.Gr(Device.vendorIdentifier)?(d=+new Date+~~(1e3*Math.random()),_=\"72\"):(d=Device.vendorIdentifier,_=\"62\"),p=d)}var g=i.extend({},r,{tu:\"tvos\",qi:u,xi:a,Storage:f,Hi:!0,Ji:l,Yi:c,Ne:6e4,pr:function(){return h(),p},fe:function(){return Device.appIdentifier},Rt:function(){return Device.appVersion},hr:function(){return h(),d},gr:function(){return _},ei:function(){return Device.productType},ti:function(){return Device.systemVersion},ni:function(){return\"tvos\"},Ze:function(){return Device.systemVersion},fi:function(){return v},ii:function(){return Settings.language},le:function(){return Device.appIdentifier}});n.exports=g},3210:(n,t,e)=>{var i=e(634),r=e(165),o=e(390),s=i.extend({},r,{tu:\"webbrowser\",Storage:null,Ji:null,Yi:null,Hi:!1,Vi:o.En,Bi:o.In,Wi:o.Pn,Fi:o.An,ou:!0,br:!0,ot:!0,ni:function(){return\"webbrowser\"},li:function(n){if(\"undefined\"!=typeof document){var t=document;n.c7=t.URL,n.c8=t.title,n.c9=t.referrer,n.ns_c=t.characterSet||t.defaultCharset||\"\"}},ze:!0});n.exports=s},1267:(n,t,e)=>{var i,r,o,s=e(634),u=e(5439),a=e(4341),f=e(614),c=e(134).eu,l=e(5247),v=e(4442),d=e(7264),_=e(623),p=\"undefined\",h=a.Xt,g=a.wr,m=s.extend({},u,{tu:\"webos\",qi:f,xi:c,Storage:l,Ji:d,Yi:v,Hi:!0,Ne:6e4,je:function(n,t){var e=3,s=function(){0==--e&&n()};!function(n,t){webOS.service.request(\"luna:\/\/com.webos.service.tv.systemproperty\",{method:\"getSystemInfo\",parameters:{keys:[\"modelName\",\"firmwareVersion\",\"UHD\",\"sdkVersion\"]},onSuccess:function(t){t.returnValue&&(i=t),n()},onFailure:function(){n()}})}(s),function(n,t){webOS.service.request(\"luna:\/\/com.webos.settingsservice\",{method:\"getSystemSettings\",parameters:{category:\"option\"},onSuccess:function(t){t.returnValue&&(r=t),n()},onFailure:function(){n()}})}(s),function(n,t){webOS.service.request(\"luna:\/\/com.webos.service.connectionmanager\",{method:\"getStatus\",onSuccess:function(t){t.returnValue&&(o=t),n()},onFailure:function(){n()}})}(s)},pr:function(){return typeof webOS!==p&&webOS.device&&webOS.device.serialNumber&&\"Unknown\"!=webOS.device.serialNumber?webOS.device.serialNumber:null},hr:function(){return+new Date+~~(1e3*Math.random())},gr:function(){return\"72\"},ei:function(){return i&&i.modelName?i.modelName:h},ti:function(){return i&&i.sdkVersion?i.sdkVersion:h},ni:function(){return\"webOS\"},Ze:function(){return typeof webOS!==p&&webOS.device?webOS.device.platformVersion:h},fi:function(){var n=0;typeof webOS!==p&&webOS.device?n=webOS.device.screenWidth:typeof window!=p&&window.screen&&(n=window.screen.availWidth);var t=0;return typeof webOS!==p&&typeof webOS.device!==p?t=webOS.device.screenHeight:typeof window!=p&&window.screen&&(t=window.screen.availHeight),n>0&&t>0?n+\"x\"+t:g},ii:function(){return r&&r.locales&&(r.locales.UI||r.locales.TV)||h},oi:function(){if(o&&(o.wired||o.wifi)){if(\"connected\"===o.wired.state&&\"yes\"===o.wired.onInternet)return _.ETHERNET;if(\"connected\"===o.wifi.state&&\"yes\"===o.wifi.onInternet)return _.WIFI}return _.UNKNOWN}});n.exports=m},3406:(n,t,e)=>{var i=e(634),r=e(5439),o=e(4341),s=e(1720).fu,u=e(1720).cu,a=e(5247),f=e(4442),c=e(7264),l=e(623),v=\"undefined\",d=o.Xt,_=o.wr,p=null,h=null,g=null,m=!1,y=!1,S=!1;function b(){var n=null;if(typeof Windows!=v&&Windows&&Windows.Xbox&&Windows.Xbox.ApplicationModel&&Windows.Xbox.ApplicationModel.Core&&Windows.Xbox.ApplicationModel.Core.CoreApplicationContext&&Windows.Xbox.ApplicationModel.Core.CoreApplicationContext.currentUser){var t=Windows.Xbox.ApplicationModel.Core.CoreApplicationContext.currentUser;null!=t&&!t.lu&&t.vu&&(n=Windows.Xbox.ApplicationModel.Core.CoreApplicationContext.currentUser.xboxUserId)}g=n}var w=i.extend({},r,{tu:\"xbox\",qi:s,xi:u,Storage:a,Ji:c,Yi:f,Hi:!0,Ne:6e4,pr:function(){return S||(typeof Windows!=v&&Windows&&Windows.Xbox&&Windows.Xbox.ApplicationModel&&Windows.Xbox.ApplicationModel.Core&&Windows.Xbox.ApplicationModel.Core.CoreApplicationContext&&Windows.Xbox.ApplicationModel.Core.CoreApplicationContext.addEventListener(\"currentuserchanged\",(function(){y=!0})),b(),S=!0),y&&b(),g},fe:function(){var n=d;return typeof Windows!=v&&Windows&&Windows.ApplicationModel&&Windows.ApplicationModel.Package&&Windows.ApplicationModel.Package.current&&Windows.ApplicationModel.Package.current.id&&Windows.ApplicationModel.Package.current.id.name&&(n=Windows.ApplicationModel.Package.current.id.name),n},Rt:function(){var n=d;if(typeof Windows!=v&&Windows&&Windows.ApplicationModel&&Windows.ApplicationModel.Package&&Windows.ApplicationModel.Package.current&&Windows.ApplicationModel.Package.current.id&&Windows.ApplicationModel.Package.current.id.version){var t=Windows.ApplicationModel.Package.current.id.version;n=t.major+\".\"+t.minor+\".\"+t.build+\".\"+t.revision}return n},hr:function(){return m||function(){typeof Windows!=v&&Windows&&Windows.Xbox&&Windows.Xbox.System&&Windows.Xbox.System.Console&&Windows.Xbox.System.Console.applicationSpecificDeviceId?(p=Windows.Xbox.System.Console.applicationSpecificDeviceId,h=\"72\"):(p=this.ei()+ +new Date+~~(1e3*Math.random()),h=\"72\"),m=!0}(),p},gr:function(){return h},ei:function(){return\"xbox one\"},ti:function(){var n=d;return typeof navigator!=v&&navigator&&navigator.userAgent&&navigator.userAgent.split(\";\").filter((function(n){return-1!=n.indexOf(\"Windows NT\")})).forEach((function(t){n=t.substr(t.indexOf(\"Windows NT\")+11,t.length-1)})),n},$e:function(){return\"xbox\"},ni:function(){return\"winjs\"},Ze:function(){var n=d;return typeof Windows!=v&&Windows&&Windows.ApplicationModel&&Windows.ApplicationModel.Package&&Windows.ApplicationModel.Package.current&&Windows.ApplicationModel.Package.current.dependencies&&Windows.ApplicationModel.Package.current.dependencies.filter((function(n){return n&&n.id&&n.id.name&&-1!=n.id.name.indexOf(\"WinJS\")&&n.id.version})).forEach((function(t){n=t.id.version.major+\".\"+t.id.version.minor+\".\"+t.id.version.build+\".\"+t.id.version.revision})),n},fi:function(){var n=_;if(typeof Windows!=v&&Windows&&Windows.Xbox&&Windows.Xbox.Graphics&&Windows.Xbox.Graphics.Display&&Windows.Xbox.Graphics.Display.DisplayConfiguration&&Windows.Xbox.Graphics.Display.DisplayConfiguration.getForCurrentView&&Windows.Xbox.Graphics.Display.DisplayConfiguration.getForCurrentView()&&Windows.Xbox.Graphics.Display.DisplayConfiguration.getForCurrentView().currentDisplayMode&&Windows.Xbox.Graphics.Display.DisplayConfiguration.getForCurrentView().currentDisplayMode.rawWidth&&Windows.Xbox.Graphics.Display.DisplayConfiguration.getForCurrentView().currentDisplayMode.rawHeight){var t=Windows.Xbox.Graphics.Display.DisplayConfiguration.getForCurrentView().currentDisplayMode;n=t.rawWidth+\"x\"+t.rawHeight}return n},ai:function(){var n=_;return typeof window!=v&&window.innerWidth&&window.innerHeight&&(n=window.innerWidth+\"x\"+window.innerHeight),n},ii:function(){var n=d;return typeof Windows!=v&&Windows&&Windows.System&&Windows.System.UserProfile&&Windows.System.UserProfile.GlobalizationPreferences&&Windows.System.UserProfile.GlobalizationPreferences.languages&&(n=Windows.System.UserProfile.GlobalizationPreferences.languages.getAt(0)),n},le:function(){var n=d;return typeof Windows!=v&&Windows&&Windows.ApplicationModel&&Windows.ApplicationModel.Package&&Windows.ApplicationModel.Package.current&&Windows.ApplicationModel.Package.current.id&&Windows.ApplicationModel.Package.current.id.name&&(n=Windows.ApplicationModel.Package.current.id.name),n},ri:function(){var n=\"unknown\";if(typeof Windows!=v&&Windows&&Windows.ApplicationModel&&Windows.ApplicationModel.Package&&Windows.ApplicationModel.Package.current&&Windows.ApplicationModel.Package.current.id&&Windows.ApplicationModel.Package.current.id.architecture)switch(Windows.ApplicationModel.Package.current.id.architecture){case 5:n=\"arm\";break;case 11:n=\"neutral\";break;case 9:n=\"x64\";break;case 0:n=\"x86\"}return n},oi:function(){var n=l.UNKNOWN;if(typeof Windows!=v&&Windows&&Windows.Networking&&Windows.Networking.Connectivity&&Windows.Networking.Connectivity.NetworkInformation&&Windows.Networking.Connectivity.NetworkInformation.getInternetConnectionProfile&&Windows.Networking.Connectivity.NetworkInformation.getInternetConnectionProfile()&&Windows.Networking.Connectivity.NetworkInformation.getInternetConnectionProfile().networkAdapter&&Windows.Networking.Connectivity.NetworkInformation.getInternetConnectionProfile().networkAdapter.ianaInterfaceType)switch(Windows.Networking.Connectivity.NetworkInformation.getInternetConnectionProfile().networkAdapter.ianaInterfaceType){case 6:n=l.ETHERNET;break;case 71:n=l.WIFI}return n}});n.exports=w},8823:(n,t,e)=>{var i=e(634),r=\"cs_settings\",o=\"cs_cache\",s=\"undefined\";n.exports=function(n){var t=typeof atv!=s&&typeof atv.localStorage!=s&&atv.localStorage||null;i.extend(this,{storeProperties:function(n){if(t)try{\"function\"==typeof t.setItem?t.setItem(r,n):t&&(t[r]=n)}catch(e){}},getProperties:function(){if(!t)return null;try{if(\"function\"==typeof t.getItem)return t.getItem(r);if(t)return t[r]}catch(n){}},storeCache:function(n){if(t)try{\"function\"==typeof t.setItem?t.setItem(o,n):t&&(t[o]=n)}catch(e){}},getCache:function(){if(!t)return null;try{if(\"function\"==typeof t.getItem)return t.getItem(o);if(t)return t[o]}catch(n){}}})}},5464:(n,t,e)=>{var i=e(634),r=\"undefined\",o=\"cs_\";n.exports=function(){var n=typeof atv!=r&&typeof atv.localStorage!=r&&atv.localStorage||null;i.extend(this,{get:function(t){return n&&t&&n.getItem(o+t)||null},set:function(t,e){n&&t&&(n[o+t]=e)},remove:function(t){n&&t&&n.removeItem(o+t)},clear:function(){}})}},3120:(n,t,e)=>{var i=e(634);n.exports=function(){i.extend(this,{storeProperties:function(){},getProperties:function(){return null},storeCache:function(){},getCache:function(){return null}})}},5247:(n,t,e)=>{var i=e(634),r=\"cs_settings\",o=\"cs_cache\";n.exports=function(n){var t;!function(){try{t=\"undefined\"!=typeof localStorage?localStorage:null}catch(n){t=null}}(),i.extend(this,{storeProperties:function(n){if(t)try{\"function\"==typeof t.setItem?t.setItem(r,n):t&&(t[r]=n)}catch(e){}},getProperties:function(){if(!t)return null;try{if(\"function\"==typeof t.getItem)return t.getItem(r);if(t)return t[r]}catch(n){}},storeCache:function(n){if(t)try{\"function\"==typeof t.setItem?t.setItem(o,n):t&&(t[o]=n)}catch(e){}},getCache:function(){if(!t)return null;try{if(\"function\"==typeof t.getItem)return t.getItem(o);if(t)return t[o]}catch(n){}}})}},7264:(n,t,e)=>{var i=e(634),r=\"cs_\";n.exports=function(){var n=\"undefined\"!=typeof localStorage?localStorage:null;i.extend(this,{get:function(t){try{return n&&\"function\"==typeof n.getItem?n.getItem(r+t):n?n[r+t]:n}catch(e){}},remove:function(t){try{n&&\"function\"==typeof n.removeItem?n.removeItem(r+t):n&&delete n[r+t]}catch(e){}},clear:function(){try{for(var t=0;n&&t<n.length;++t){var e=n.key(t);e.substr(0,3)===r&&(\"function\"==typeof n.removeItem?n.removeItem(e):delete n[e])}}catch(i){}}})}},1582:(n,t,e)=>{var i,r,o,s,u=e(634),a=\"cs_settings\",f=\"cs_cache_dir\",c=\"cs_cache_dir_single\",l=\"undefined\";n.exports=function(n){o=typeof FileSystem!=l?new FileSystem:null,s=typeof curWidget!=l?curWidget.id:null,\"undefined\"!=typeof sf?i=r=function(n,t){sf.core.localData(n,t)}:(i=function(n,t){$.sf.setData(n,t===undefined?null:t)},r=function(n){return $.sf.getData(n)}),null==o||typeof o.isValidCommonPath==l||o.isValidCommonPath(s)||o.createCommonDir(s),u.extend(this,{storeProperties:function(n){try{i(a,n)}catch(t){}},getProperties:function(){try{return r(a)}catch(n){}},storeCache:function(n){try{!function(n,t,e){var i=s+\"/\"+n;o.isValidCommonPath(i)||o.createCommonDir(i);var r=o.openCommonFile(i+\"/\"+t,\"w\");r.writeLine(e),o.closeCommonFile(r)}(f,c,n)}catch(t){}},getCache:function(){try{return function(n,t){var e=s+\"/\"+n;if(!o.isValidCommonPath(e))return null;var i=o.openCommonFile(e+\"/\"+t,\"r\");if(i){var r=i.du();return o.closeCommonFile(i),r}return null}(f,c)}catch(n){}}})}},7026:(n,t,e)=>{var i,r,o=e(634),s=\"cs_\";\"undefined\"!=typeof sf?r=i=function(n,t){sf.core.localData(n,t)}:(r=function(n,t){$.sf.setData(n,t===undefined?null:t)},i=function(n){return $.sf.getData(n)}),n.exports=function(){o.extend(this,{get:function(n){return i(s+n)},set:function(n,t){r(s+n,t)},has:function(n){return i(s+n)!==undefined},remove:function(n){r(s+n,null)},clear:function(){}})}},134:(n,t)=>{var e=\"undefined\";t._o=function(n,t){if(typeof XMLHttpRequest!=e){var i=new XMLHttpRequest;i.open(\"GET\",n,!0),i.onreadystatechange=function(){4===i.readyState&&(t&&t(i.status),i=null)},i.send()}else\"function\"==typeof setTimeout?t&&setTimeout(t,0):t&&t()},t.eu=function(n,t,i){if(typeof XMLHttpRequest!=e){var r=new XMLHttpRequest;r.open(\"POST\",n,!0),r.onreadystatechange=function(){4===r.readyState&&(i&&i(r.status),r=null)},r.send(t)}else\"function\"==typeof setTimeout?i&&setTimeout(i,0):i&&i()}},6412:(n,t)=>{var e=\"undefined\";t.Zs=function(n,t){if(typeof atv!=e&&typeof XMLHttpRequest!=e){var i=new XMLHttpRequest;i.open(\"GET\",n,!0),i.onreadystatechange=function(){4==i.readyState&&(t&&t(i.status),i=null)},i.send()}else typeof atv!=e&&\"function\"==typeof atv.setTimeout?t&&atv.setTimeout(t,0):t&&t()},t.nu=function(n,t,i){if(typeof atv!=e&&typeof XMLHttpRequest!=e){var r=new XMLHttpRequest;r.open(\"POST\",n,!0),r.onreadystatechange=function(){4===r.readyState&&(i&&i(r.status),r=null)},r.send(t)}else typeof atv!=e&&\"function\"==typeof atv.setTimeout?i&&atv.setTimeout(i,0):i&&i()}},614:n=>{n.exports=function(n,t,e){if(\"undefined\"!=typeof Image){var i=new Image;i.onload=function(){t&&t(200),i=null},i.onerror=function(){t&&t(),i=null},i.src=n}else\"function\"==typeof setTimeout?t&&setTimeout(t,0):t&&t()}},4309:n=>{n.exports=function(n,t){\"undefined\"!=typeof engine?(engine.createHttpClient().createRequest(\"GET\",n,null).start(),t&&setTimeout(t,0)):\"function\"==typeof setTimeout?t&&setTimeout(t,0):t&&t()}},1720:(n,t)=>{var e=\"undefined\";t.fu=function(n,t){typeof WinJS!=e&&typeof WinJS.xhr!=e?WinJS.xhr({url:n}).then((function(n){t&&t(n.status)}),(function(){t&&t()})):\"function\"==typeof setTimeout?t&&setTimeout(t,0):t&&t()},t.cu=function(n,t,i){typeof WinJS!=e&&typeof WinJS.xhr!=e?WinJS.xhr({type:\"post\",url:n,data:t,headers:{\"Content-type\":\"application/xml\"}}).then((function(n){i&&i(n.status)}),(function(){i&&i()})):\"function\"==typeof setTimeout?i&&setTimeout(i,0):i&&i()}},6397:(n,t,e)=>{var i=e(634),r=e(1151),o=e(9326),s=e(5439),u=e(1243),a=e(2221),f=e(1267),c=e(2338),l=e(9655),v=e(3975),d=e(3406),_=e(963),p=e(9158),h=e(6263),g=e(2684),m=e(165),y=e(3210),S=e(2905),b={tu:\"PLATFORM\",Vi:\"defaultLiveEndpointUrl\",Wi:\"defaultSecureLiveEndpointUrl\",Bi:\"defaultLiveEndpointUrlNoCookies\",Fi:\"defaultSecureLiveEndpointUrlNoCookies\",qi:\"httpGet\",xi:\"httpPost\",Storage:\"Storage\",Hi:\"offlineCache\",Ji:\"migratedStorage\",Yi:\"migratedIO\",Ne:\"defaultStorageWriteInterval\",je:\"onDataFetch\",pr:\"getCrossPublisherUniqueDeviceId\",fe:\"getApplicationName\",Rt:\"getApplicationVersion\",hr:\"getPublisherSpecificUniqueDeviceId\",gr:\"getPublisherSpecificUniqueDeviceIdSuffix\",ei:\"getDeviceModel\",ti:\"getPlatformVersion\",$e:\"getPlatformName\",ni:\"getRuntimeName\",Ze:\"getRuntimeVersion\",fi:\"getDisplayResolution\",ai:\"getApplicationResolution\",ii:\"getLanguage\",le:\"getPackageName\",setTimeout:\"setTimeout\",setInterval:\"setInterval\",clearTimeout:\"clearTimeout\",clearInterval:\"clearInterval\",ri:\"getDeviceArchitecture\",oi:\"getConnectionType\",ui:\"getDeviceJailBrokenFlag\",li:\"updateMeasurementLabels\",di:\"standardOutputLog\",ne:\"defaultSystemClockJumpDetectorNormalContextInterval\",te:\"defaultSystemClockJumpDetectorAlternativeContextInterval\",su:\"isNormalContext\",uu:\"addContextChangeListener\",au:\"removeContextChangeListener\",iu:\"addEnvironmentExitListener\",ru:\"removeEnvironmentExitListener\",ze:\"overrideCollectedC12Value\",Xe:\"defaultC12OverrideValue\",si:\"getPlatformEnvironmentProperties\",ou:\"tcfIntegration\",br:\"cmpIntegration\",ot:\"firstPartyCookie\"};n.exports=new function(){var n,t,e=this;function w(e){if(!n)switch(n=!0,e){case o.SmartTV:i.extend(t,u);break;case o.Netcast:i.extend(t,a);break;case o.Cordova:i.extend(t,c);break;case o.Trilithium:i.extend(t,l);break;case o.AppleTV:i.extend(t,v);break;case o.Chromecast:i.extend(t,_);break;case o.Xbox:i.extend(t,d);break;case o.webOS:i.extend(t,f);break;case o.tvOS:i.extend(t,p);break;case o.JSMAF:i.extend(t,h);break;case o.nodejs:i.extend(t,g);break;case o.html5:i.extend(t,m);break;case o.WebBrowser:i.extend(t,y);break;case o.SamsungTizenTV:i.extend(t,S)}}i.extend(e,{_n:null,PlatformApis:o,Cn:null,Zt:function(){n||w(o.WebBrowser)},setPlatformApi:function(n,e){var r,s;if(\"number\"==typeof n)r=n,s=e||{};else{if(\"object\"!=typeof n)return;r=o.Skeleton,s=n}w(r),i.extend(t,function(n){var t={};for(var e in b){var i=b[e];i in n&&(t[e]=n[i])}return t.ou!=undefined&&t.br==undefined&&(t.br=t.ou),t}(s))}}),n=!1,e.Cn=t=i.Ht(s),e._n=new r(e)}},9326:n=>{n.exports={SmartTV:0,Netcast:1,Cordova:2,Trilithium:3,AppleTV:4,Chromecast:5,Xbox:6,webOS:7,tvOS:8,nodejs:9,html5:10,JSMAF:11,Skeleton:12,WebBrowser:13,SamsungTizenTV:14}},1151:(n,t,e)=>{var i=e(634);n.exports=function(n){i.extend(this,{PlatformApis:n.PlatformApis,setPlatformAPI:n.setPlatformApi,setPlatformApi:n.setPlatformApi})}},7978:n=>{n.exports={NORMAL:\"norm\",FULL_SCREEN:\"full\",MINIMIZED:\"min\",MAXIMIZED:\"max\"}},8885:(n,t,e)=>{var i=e(634),r=e(9911),o=e(7460),s=e(1494);function u(){var n,t,e,u,f,c=this,l=new o,v=[\"ns_st_ct\",\"ns_st_li\",\"ns_st_ty\",\"ns_st_cl\",\"ns_st_fee\",\"ns_st_cs\",\"ns_st_cu\"];function d(n,t){r.zt(f,n,t)}n=null,t={},u=!1,f={},d(\"ns_st_li\",\"0\"),d(\"ns_st_ty\",\"video\"),d(\"ns_st_ad\",\"1\"),d(\"ns_st_tp\",\"1\"),i.extend(c,l),i.extend(c,{setRelatedContentMetadata:function(t){t instanceof s||(t=null),n=t},getRelatedContentMetadata:function(){return n},setMediaType:function(n){if(null!=n){d(\"ns_st_ct\",(u?\"aa\":\"va\")+(e=n));var t=\"1\";e==a.ON_DEMAND_PRE_ROLL||e==a.BRANDED_ON_DEMAND_PRE_ROLL?t=\"pre-roll\":e==a.ON_DEMAND_MID_ROLL||e==a.BRANDED_ON_DEMAND_MID_ROLL?t=\"mid-roll\":e!=a.ON_DEMAND_POST_ROLL&&e!=a.BRANDED_ON_DEMAND_POST_ROLL||(t=\"post-roll\"),d(\"ns_st_ad\",t),e==a.LIVE||e==a.BRANDED_DURING_LIVE?d(\"ns_st_li\",\"1\"):d(\"ns_st_li\",\"0\")}},classifyAsAudioStream:function(n){null==n&&(n=!0),u=n,null==e?delete f.ns_st_ct:d(\"ns_st_ct\",(u?\"aa\":\"va\")+e),d(\"ns_st_ty\",u?\"audio\":\"video\")},setVideoDimensions:function(n,t){d(\"ns_st_cs\",(n=n||0)+\"x\"+(t=t||0))},setLength:function(n){d(\"ns_st_cl\",n)},setBreakNumber:function(n){d(\"ns_st_bn\",n)},setTotalBreaks:function(n){d(\"ns_st_tb\",n)},setNumberInBreak:function(n){d(\"ns_st_an\",n)},setTotalInBreak:function(n){d(\"ns_st_ta\",n)},setClipUrl:function(n){d(\"ns_st_cu\",n)},setServer:function(n){d(\"ns_st_ams\",n)},setCallToActionUrl:function(n){d(\"ns_st_amc\",n)},setDeliveryType:function(n){d(\"ns_st_amd\",n)},setOwner:function(n){d(\"ns_st_amo\",n)},setStack:function(n,e){t[n]=e},getStacks:function(){return t},getStandardLabels:function(){return i.extend({},l.getStandardLabels(),f)},getMetadataLabels:function(){var t={};if(n){var e=n.getStandardLabels();for(var r in e)e.hasOwnProperty(r)&&-1==v.indexOf(r)&&(t[r]=e[r])}return i.extend(t,c.getStandardLabels(),n?n.getCustomLabels():null,c.getCustomLabels())}})}var a={ON_DEMAND_PRE_ROLL:\"11\",ON_DEMAND_MID_ROLL:\"12\",ON_DEMAND_POST_ROLL:\"13\",LIVE:\"21\",BRANDED_ON_DEMAND_PRE_ROLL:\"31\",BRANDED_ON_DEMAND_MID_ROLL:\"32\",BRANDED_ON_DEMAND_POST_ROLL:\"33\",BRANDED_AS_CONTENT:\"34\",BRANDED_DURING_LIVE:\"35\",OTHER:\"00\"};u.AdvertisementType=a,u.AdvertisementDeliveryType={NATIONAL:\"national\",LOCAL:\"local\",SYNDICATION:\"syndication\"},u.AdvertisementOwner={DISTRIBUTOR:\"distributor\",ORIGINATOR:\"originator\",MULTIPLE:\"mp\",NONE:\"none\"},n.exports=u},2304:(n,t,e)=>{var i=e(634),r=e(5866),o=e(1296)._u;function s(n,t,e){t=t||{},e=e||\"\";var o,s,u,a,f,c,l,v,d,_,p,h,g,m,y,S,b,w,E,I,P,A,C,L,D,N,T,O,k,R,M,U,x,W,F,V,B,q,G,j,H,K,J,Y,z,X,Q,$,Z,nn,tn,en,rn,on,sn,un,an,fn,cn,ln,vn,dn,_n,pn,hn,gn,mn,yn,Sn,bn,wn,En,In,Pn,An,Cn,Ln,Dn,Nn,Tn=this;function On(n){var t={},e=[];for(var i in n)if(n.hasOwnProperty(i)){var r=n[i];if(i.length>=2&&\"c\"==i[0]&&i[1].charCodeAt(0)>=\"a\".charCodeAt(0)&&i[1].charCodeAt(0)<=\"z\".charCodeAt(0)&&\"p\"!=i[1]&&\"s\"!=i[1]){var o=i[1];i.length>3&&\"_\"==i[2]?((t[o]=t[o]||{})[i.substring(3,i.length)]=r,e.push(i)):3==i.length&&i[2]>=\"0\"&&i[2]<=\"9\"&&((t[o]=t[o]||{})[\"c\"+i[2]]=r,e.push(i))}}for(var s=0;s<e.length;++s)delete n[e[s]];for(var u in t){var a=t[u],f=a.c2;f&&(delete a.c2,Tn.pu(f,a))}}i.extend(Tn,{pu:function(n,t){f[n]=f[n]||{},i.extend(f[n],t)},hu:function(){f={}},getStacks:function(){return f},gu:function(){return s},mu:function(n){T=n},yu:function(){return T},Su:function(n,t){u[n]=t},bu:function(n){return u[n]},wu:function(n){return null!=u[n]},addLabels:function(n){On(n),i.extend(a,n)},getLabels:function(){return a},setLabel:function(n,t){a[n]=t},Eu:function(){a={}},Ke:function(n){return a[n]},He:function(n){return null!=a[n]},Iu:function(){return parseInt(Tn.bu(\"ns_st_cn\"))},Pu:function(n){Tn.Su(\"ns_st_cn\",n+\"\")},Au:function(n){Ln=n,Dn=!0},Cu:function(){return Ln},Lu:function(){return Dn},Yt:function(n,t,e){var s,a=n,f=parseInt(a.ns_st_po);s=e&&Cn<0&&h-f>0?P+h-f:e&&Cn>0&&f-h>0?P+f-h:P,a.ns_st_ap=s+\"\",a.ns_st_dap=s-A+\"\",a.ns_st_iap=s-C+\"\",a.ns_st_pt=v+(isNaN(d)?0:t-d)+\"\",a.ns_st_dpt=v+(isNaN(d)?0:t-d)-_+\"\",a.ns_st_ipt=v+(isNaN(d)?0:t-d)-p+\"\",a.ns_st_et=m+(isNaN(y)?0:t-y)+\"\",a.ns_st_det=m+(isNaN(y)?0:t-y)-S+\"\",a.ns_st_iet=m+(isNaN(y)?0:t-y)-L+\"\",a.ns_st_bt=G+\"\",a.ns_st_dbt=G+(isNaN(j)?0:t-j)-H+\"\",a.ns_st_ibt=G+(isNaN(j)?0:t-j)-z+\"\";var l=O,g=k;e&&(l=r.Du(O,Cn<0?f:R,Cn<0?R:f,T),g=r.Du(k,Cn<0?f:R,Cn<0?R:f,T));for(var b,I=0,X=0,Q=0;Q<l.length;Q++)I+=b=Math.abs(l[Q].end-l[Q].start),b>X&&(X=b);var nn=0,tn=0;for(Q=0;Q<g.length;Q++)nn+=b=Math.abs(g[Q].end-g[Q].start),b>tn&&(tn=b);a.ns_st_upc=I+\"\",a.ns_st_dupc=I-M+\"\",a.ns_st_iupc=I-U+\"\",a.ns_st_lpc=X+\"\",a.ns_st_dlpc=X-x+\"\",a.ns_st_ilpc=X-N+\"\",a.ns_st_upa=nn+\"\",a.ns_st_dupa=nn-W+\"\",a.ns_st_iupa=nn-F+\"\",a.ns_st_lpa=tn+\"\",a.ns_st_dlpa=tn-V+\"\",a.ns_st_ilpa=tn-D+\"\",a.ns_st_pc=sn+\"\",a.ns_st_dpc=sn-un+\"\",a.ns_st_skc=an+\"\",a.ns_st_dskc=an-fn+\"\",a.ns_st_bc=K+\"\",a.ns_st_dbc=K-J+\"\",a.ns_st_ibc=K-Y+\"\",a.ns_st_skt=$+\"\",a.ns_st_dskt=$-Z+\"\",a.ns_st_ska=en+\"\",a.ns_st_dska=en-rn+\"\",o&&(a.ns_st_spc=cn+\"\",a.ns_st_dspc=cn-B+\"\",a.ns_st_apc=ln+\"\",a.ns_st_dapc=ln-q+\"\",a.ns_st_sq=vn+\"\",a.ns_st_asq=dn+\"\"),a.ns_st_dtpc=bn-wn+\"\",a.ns_st_itpc=bn-En+\"\",a.ns_st_dcpc=hn-gn+\"\",a.ns_st_icpc=hn-mn+\"\",a.ns_st_rt=Cn+\"\",a.ns_st_ldw=w,a.ns_st_ldo=E,a.ns_st_pn=Ln+\"\",a.ns_st_lda=c?\"1\":\"0\",i.extend(a,u)},Nu:function(n){_=parseInt(n.ns_st_pt),A=parseInt(n.ns_st_ap),S=parseInt(n.ns_st_et),H=parseInt(n.ns_st_bt),M=parseInt(n.ns_st_upc),x=parseInt(n.ns_st_lpc),W=parseInt(n.ns_st_upa),V=parseInt(n.ns_st_lpa),un=parseInt(n.ns_st_pc),fn=parseInt(n.ns_st_skc),J=parseInt(n.ns_st_bc),Z=parseInt(n.ns_st_skt),rn=parseInt(n.ns_st_ska),o&&(B=parseInt(n.ns_st_spc),q=parseInt(n.ns_st_apc)),wn=bn,gn=hn,Tn.Tu(0)},Ou:function(n){p=parseInt(n.ns_st_pt),U=parseInt(n.ns_st_upc),F=parseInt(n.ns_st_upa),C=parseInt(n.ns_st_ap),L=parseInt(n.ns_st_et),D=parseInt(n.ns_st_lpa),N=parseInt(n.ns_st_lpc),z=parseInt(n.ns_st_bt),Y=parseInt(n.ns_st_bc),En=bn,mn=hn},ku:function(){return Tn.bu(\"ns_st_vt\")},Ru:function(n){Tn.Su(\"ns_st_vt\",n+\"\")},Mu:function(){return Tn.bu(\"ns_st_at\")},Uu:function(n){Tn.Su(\"ns_st_at\",n+\"\")},xu:function(){return Tn.bu(\"ns_st_tt\")},Wu:function(n){Tn.Su(\"ns_st_tt\",n+\"\")},Fu:function(){return Tn.bu(\"ns_st_cdn\")},Vu:function(n){Tn.Su(\"ns_st_cdn\",n+\"\")},Bu:function(){sn++},qu:function(){an++},Gu:function(){vn++},ju:function(){return vn},Hu:function(n){_n=n},Ku:function(n){pn=n},Ju:function(){return pn},Yu:function(){return _n},zu:function(){return G},Xu:function(n){G=n},Qu:function(n){if(!isNaN(j)){var t=Tn.zu();t+=n-j,Tn.Xu(t),j=NaN}},$u:function(n){R=parseInt(n)},Zu:function(){return R},na:function(n){isNaN(R)||isNaN(n)||(O=r.Du(O,Cn<0?n:R,Cn<0?R:n,T),k=r.Du(k,Cn<0?n:R,Cn<0?R:n,T),R=NaN)},ta:function(n){var t=k;null!=n&&(t=r.Du(k,Cn<0?_n:R,Cn<0?R:_n,T)),In||Pn||(t.length>1||0==t.length||t[0].start-T>0?In=!0:t[0].end-t[0].start>=3e3&&(Pn=!0,bn++)),yn||Sn||(t.length>1||0==t.length||t[0].start-T>0?yn=!0:t[0].end-t[0].start>=Nn&&(Sn=!0,hn++))},ea:function(){return m},ia:function(n){m=n},ra:function(n){if(!isNaN(y)){var t=Tn.ea();t+=n-y,Tn.ia(t),y=NaN}},oa:function(){return y},sa:function(n){y=n},ua:function(n){isNaN(d)||(v+=n-d,d=NaN)},aa:function(){return v},fa:function(n){var t=h;return t+=Math.floor((n-g)*Cn/100)},ca:function(n){return h+Math.floor((n-I)*Cn/100)},la:function(n,t){return h+E-t+n-I},va:function(n){return E+Math.floor((n-I)*(1-Cn/100))},da:function(n){return E+n-I},_a:function(n){h=n},pa:function(n){g=n},ha:function(){return g},ga:function(){return h},ma:function(){return d},ya:function(n){d=n},Sa:function(n){_=n},ba:function(){return j},wa:function(n){j=n},Ea:function(){return sn},Ia:function(n){sn=n},Pa:function(){return an},Aa:function(n){an=n},Ca:function(n){X=n},La:function(){return X},Da:function(n){tn=n},Na:function(){return tn},Ta:function(){return l},Oa:function(n){l=n},ka:function(n){o=n},Ra:function(){return o},Ma:function(n){Q=n},Ua:function(){return Q},xa:function(n){if(!isNaN(Q)){var t=Tn.Wa();t+=n-Q,Tn.Fa(t),Q=NaN}},Wa:function(){return $},Fa:function(n){$=n},Va:function(n){on=n},Ba:function(){return on},qa:function(n){nn=n},Ga:function(){return nn},ja:function(n){en=n},Ha:function(){return en},Ka:function(n){var t,e=Tn.Ha();e+=Math.abs(n-nn),Tn.ja(e),nn==n?t=0:nn>n?t=-1:nn<n&&(t=1),Tn.Tu(t),nn=0},Ja:function(){return parseInt(Tn.bu(\"ns_st_skd\"))},Tu:function(n){Tn.Su(\"ns_st_skd\",n+\"\")},Ya:function(){v=0,_=0,p=0,G=0,H=0,z=0,K=0,J=0,Y=0,sn=0,un=0,vn=0,L=0,m=0,S=0,$=0,Z=0,en=0,rn=0,an=0,fn=0,Dn=!1},za:function(){cn++},Xa:function(){ln++},Qa:function(){P=0,A=0,C=0,k=[],W=0,F=0,V=0,D=0,In=!1,Pn=!1,yn=!1,Sn=!1},$a:function(n){cn=n},Za:function(n){b=n},nf:function(){return cn},tf:function(){return b},ef:function(){return K},\"if\":function(){K++},rf:function(){return H},uf:function(n){dn=n},af:function(){dn++},ff:function(){return dn},cf:function(){return An},lf:function(n){An=n},vf:function(){return Cn},df:function(n){Cn=n},_f:function(n){Cn<0&&h-n>0?P+=h-n:Cn>0&&n-h>0&&(P+=n-h)},setDvrWindowLength:function(n){w=n},pf:function(){return w},hf:function(n){E=n},gf:function(n){I=n},mf:function(){return I},yf:function(){return E},Sf:function(n){c=n},bf:function(){return c},wf:function(){An=!1}}),(u={}).ns_st_cl=\"0\",u.ns_st_tp=\"0\",u.ns_st_cn=\"1\",u.ns_st_skd=\"0\",u.ns_st_ci=\"0\",u.ns_st_cn=\"1\",u.c3=\"*null\",u.c4=\"*null\",u.c6=\"*null\",u.ns_st_st=\"*null\",u.ns_st_pu=\"*null\",u.ns_st_pr=\"*null\",u.ns_st_ep=\"*null\",u.ns_st_sn=\"*null\",u.ns_st_en=\"*null\",u.ns_st_ct=\"*null\",f={},On(t),a=t,o=!1,c=!1,l=!1,v=0,d=NaN,h=0,_=0,m=0,_n=0,pn=NaN,y=NaN,b=0,S=0,p=0,w=0,E=0,I=NaN,P=0,A=0,C=0,L=0,D=0,N=0,R=NaN,O=[],k=[],M=0,U=0,x=0,W=0,F=0,V=0,B=0,q=0,G=0,j=NaN,H=0,K=0,J=0,Y=0,z=0,X=!1,Q=NaN,tn=!1,nn=0,on=0,$=0,Z=0,en=0,rn=0,sn=0,un=0,an=0,fn=0,cn=0,ln=0,vn=0,dn=0,hn=0,gn=0,mn=0,yn=!1,Sn=!1,bn=0,wn=0,En=0,In=!1,Pn=!1,An=!1,Cn=100,Ln=1,Dn=!1,s=e,T=n.getConfiguration().Ef,Nn=n.getConfiguration().If}s.Pf=function(n){return null==n.ns_st_cn?r.Pf(n,o):n.ns_st_cn+\"\"},s.Af=function(n,t,e){for(var i=n.getLabels(),r={},o=0;e&&o<e.length;++o)i.hasOwnProperty(e[o])&&(r[e[o]]=i[e[o]]);t.addLabels(r),t.mu(n.yu())},s.Cf=500,s.Lf=500,s.Df=3e3,n.exports=s},173:(n,t,e)=>{var i=e(634),r=e(1946);n.exports=function(){var n=null,t={};i.extend(this,{Nf:function(e){var i=e.gu();t[i]=e,r.Ys(e.Ke(\"ns_st_ad\"))||(n=e)},Tf:function(n){return!!t[n]},Of:function(n){return t[n]},kf:function(){return n}})}},7460:(n,t,e)=>{var i=e(634),r=e(9911),o=e(5866);n.exports=function(){var n,t;function e(t,e){r.zt(n,t,e)}n={},t={},i.extend(this,{setFee:function(n){e(\"ns_st_fee\",n)},setUniqueId:function(n){e(\"ns_st_ami\",n)},setTitle:function(n){e(\"ns_st_amt\",n)},setServerCampaignId:function(n){e(\"ns_st_amg\",n)},setPlacementId:function(n){e(\"ns_st_amp\",n)},setSiteId:function(n){e(\"ns_st_amw\",n)},addCustomLabels:function(n){\"object\"!=typeof n&&(n={}),t=o.jt(n)},getCustomLabels:function(){return t},getStandardLabels:function(){return n},getMetadataLabels:function(){return i.extend({},n,t)}})}},4610:(n,t,e)=>{var i=e(634),r=e(9911),o=e(5866),s=e(2004);function u(){var n,t;function e(t,e){r.zt(n,t,e)}n={},t={},i.extend(this,{setUniqueId:function(n){e(\"ns_st_ci\",n)},setPublisherName:function(n){e(\"ns_st_pu\",n)},setProgramTitle:function(n){e(\"ns_st_pr\",n)},setEpisodeTitle:function(n){e(\"ns_st_ep\",n)},setEpisodeSeasonNumber:function(n){e(\"ns_st_sn\",n)},setEpisodeNumber:function(n){e(\"ns_st_en\",n)},setGenreName:function(n){e(\"ns_st_ge\",n)},setGenreId:function(n){e(\"ns_st_tge\",n)},setDateOfProduction:function(n,t,i){e(\"ns_st_dt\",a(n,t,i))},setTimeOfProduction:function(n,t){e(\"ns_st_tm\",f(n,t))},setDateOfDigitalAiring:function(n,t,i){e(\"ns_st_ddt\",a(n,t,i))},setTimeOfDigitalAiring:function(n,t){e(\"ns_st_dtm\",f(n,t))},setDateOfTvAiring:function(n,t,i){e(\"ns_st_tdt\",a(n,t,i))},setTimeOfTvAiring:function(n,t){e(\"ns_st_ttm\",f(n,t))},setStationTitle:function(n){e(\"ns_st_st\",n)},setStationCode:function(n){e(\"ns_st_stc\",n)},setProgramId:function(n){e(\"ns_st_tpr\",n)},setEpisodeId:function(n){e(\"ns_st_tep\",n)},setFee:function(n){e(\"ns_st_fee\",n)},setPlaylistTitle:function(n){e(\"ns_st_pl\",n)},setNetworkAffiliate:function(n){e(\"ns_st_sta\",n)},setDeliveryMode:function(n){e(\"ns_st_cde\",n)},setDeliverySubscriptionType:function(n){e(\"ns_st_cds\",n)},setDeliveryComposition:function(n){e(\"ns_st_cdc\",n)},setDeliveryAdvertisementCapability:function(n){e(\"ns_st_cda\",n)},setDistributionModel:function(n){e(\"ns_st_cdm\",n)},setMediaFormat:function(n){e(\"ns_st_cmt\",n)},setDictionaryClassificationC3:function(n){e(\"c3\",n)},setDictionaryClassificationC4:function(n){e(\"c4\",n)},setDictionaryClassificationC6:function(n){e(\"c6\",n)},addCustomLabels:function(n){\"object\"!=typeof n&&(n={}),t=o.jt(n)},getStandardLabels:function(){return n},getCustomLabels:function(){return t},getMetadataLabels:function(){return i.extend({},n,t)}})}function a(n,t,e){return s.Js(4,n)+\"-\"+s.Js(2,t)+\"-\"+s.Js(2,e)}function f(n,t){return s.Js(2,n)+\":\"+s.Js(2,t)}u.ContentDeliveryMode={LINEAR:\"linear\",ON_DEMAND:\"ondemand\",DVR:\"dvr\"},u.ContentDeliverySubscriptionType={TRADITIONAL_MVPD:\"mvpd_auth\",VIRTUAL_MVPD:\"virtualmvpd\",SUBSCRIPTION:\"svod\",ADVERTISING:\"avod\",TRANSACTIONAL:\"tvod\",PREMIUM:\"pvod\"},u.ContentDeliveryComposition={CLEAN:\"clean\",EMBED:\"embedded\"},u.ContentDeliveryAdvertisementCapability={NONE:\"none\",DYNAMIC_LOAD:\"dai\",DYNAMIC_REPLACEMENT:\"dar\",LINEAR_1DAY:\"lai-c1\",LINEAR_2DAY:\"lai-c2\",LINEAR_3DAY:\"lai-c3\",LINEAR_4DAY:\"lai-c4\",LINEAR_5DAY:\"lai-c5\",LINEAR_6DAY:\"lai-c6\",LINEAR_7DAY:\"lai-c7\"},u.ContentDistributionModel={TV_AND_ONLINE:\"to\",EXCLUSIVELY_ONLINE:\"eo\"},u.ContentMediaFormat={FULL_CONTENT_GENERIC:\"fc\",FULL_CONTENT_EPISODE:\"fc01\",FULL_CONTENT_MOVIE:\"fc02\",FULL_CONTENT_PODCAST:\"fc03\",PARTIAL_CONTENT_GENERIC:\"pc\",PARTIAL_CONTENT_EPISODE:\"pc01\",PARTIAL_CONTENT_MOVIE:\"pc02\",PARTIAL_CONTENT_PODCAST:\"pc03\",PREVIEW_GENERIC:\"pv\",PREVIEW_EPISODE:\"pv01\",PREVIEW_MOVIE:\"pv02\",EXTRA_GENERIC:\"ec\",EXTRA_EPISODE:\"ec01\",EXTRA_MOVIE:\"ec02\"},n.exports=u},7051:(n,t,e)=>{var i=e(634),r=e(9911),o=e(6859),s=e(5498),u=e(693),a=e(2304),f=e(7163),c={Rf:\"pauseOnBuffering\",Mf:\"pauseOnBufferingInterval\",Uf:\"exitEndEvent\",xf:\"keepAliveMeasurement\",Wf:\"keepAliveInterval\",Ff:\"heartbeatMeasurement\",Vf:\"heartbeatIntervals\",Bf:\"includedPublishers\",qf:\"autoResumeStateOnAssetChange\",Ef:\"playbackIntervalMergeTolerance\",labels:\"labels\",If:\"customStartMinimumPlayback\"};n.exports=function(n){var t=this,e=\"\",l={};for(var v in t.Rf=!0,t.Mf=500,t.Uf=!0,t.xf=o.ENABLED,t.Wf=o.Gf,t.Ff=s.ENABLED,t.Vf=s.jf,t.Bf=[],t.qf=u.Hf,t.Ef=a.Cf,t.labels={},t.If=a.Df,c){var d=n[c[v]];null!=d&&(t[v]=d)}t.Wf=t.Wf<o.Kf?o.Kf:t.Wf,t.Mf=t.Mf<300?300:t.Mf,t.Ef=t.Ef<a.Lf?a.Lf:t.Ef,t.Wf=1e3*Math.floor(t.Wf/1e3),t.Mf=100*Math.floor(t.Mf/100),t.Ef=100*Math.floor(t.Ef/100),t.If=1e3*Math.floor(t.If/1e3),e+=t.Rf?\"1\":\"0\",e+=t.xf?\"1\":\"0\",e+=t.Ff?\"1\":\"0\",e+=t.qf?\"1\":\"0\",e+=t.Uf?\"1\":\"0\",e+=s.Jf(t.Vf,s.jf)?\"0\":\"1\",e+=t.Bf.length>0?\"1\":\"0\",e+=t.Ef!=a.Cf?\"1\":\"0\",e+=t.If!=a.Yf?\"1\":\"0\",e+=\"-\"+(t.Mf/100).toString(16),e+=\"-\"+(t.Wf/1e3).toString(16),e+=\"-\"+(t.If/1e3).toString(16),e+=\"-\"+(t.Ef/100).toString(16),t.zf=function(){return e},i.extend(t,{getLabels:function(){return t.labels},addLabels:function(n){r.Yt(t.labels,n)},setLabel:function(n,e){r.zt(t.labels,n,e)},removeLabel:function(n){delete t.labels[n]},removeAllLabels:function(){t.labels={}},getStreamingPublisherConfiguration:function(n){return l[n]=l[n]||new f,l[n]},Xf:function(){return l}})}},7995:(n,t,e)=>{var i=e(634);n.exports=function(n){i.extend(this,{addLabels:n.addLabels,setLabel:n.setLabel,removeLabel:n.removeLabel,removeAllLabels:n.removeAllLabels,getStreamingPublisherConfiguration:n.getStreamingPublisherConfiguration})}},1296:n=>{n.exports={_u:[\"ns_st_ci\",\"ns_st_pu\",\"ns_st_pr\",\"ns_st_sn\",\"ns_st_en\",\"ns_st_ep\",\"ns_st_st\",\"ns_st_ty\",\"ns_st_ct\",\"ns_st_li\",\"ns_st_ad\",\"ns_st_bn\",\"ns_st_tb\",\"ns_st_an\",\"ns_st_ta\",\"c3\",\"c4\",\"c6\",\"ns_st_tpr\",\"ns_st_tep\",\"ns_st_stc\",\"ns_st_sta\",\"ns_st_amg\",\"ns_st_ami\",\"ns_st_amt\",\"ns_st_dt\",\"ns_st_tm\",\"ns_st_ddt\",\"ns_st_dtm\",\"ns_st_tdt\",\"ns_st_ttm\"],Qf:[\"ns_st_ci\",\"ns_st_pu\",\"ns_st_pr\",\"ns_st_sn\",\"ns_st_en\",\"ns_st_ep\",\"ns_st_st\",\"ns_st_ty\",\"ns_st_ct\",\"ns_st_li\",\"ns_st_ad\",\"ns_st_bn\",\"ns_st_tb\",\"ns_st_ta\",\"c3\",\"c4\",\"c6\",\"ns_st_tpr\",\"ns_st_tep\",\"ns_st_stc\",\"ns_st_sta\",\"ns_st_dt\",\"ns_st_tm\",\"ns_st_ddt\",\"ns_st_dtm\",\"ns_st_tdt\",\"ns_st_ttm\"]}},1494:(n,t,e)=>{var i=e(634),r=e(9911),o=e(4610);function s(){var n,t,e,s,a,f=this;function c(n,t){null!=n&&l(\"ns_st_ct\",(t?\"ac\":\"vc\")+n)}function l(n,e){r.zt(t,n,e)}function v(n){delete t[n]}t={},a=!1,e={},n=new o,l(\"ns_st_li\",\"0\"),l(\"ns_st_ty\",\"video\"),i.extend(f,n),i.extend(f,{setMediaType:function(n){(s=n)==u.LIVE||s==u.USER_GENERATED_LIVE?l(\"ns_st_li\",\"1\"):l(\"ns_st_li\",\"0\"),c(s,a)},classifyAsAudioStream:function(n){null==n&&(n=!0),l(\"ns_st_ty\",(a=n)?\"audio\":\"video\"),c(s,a)},classifyAsCompleteEpisode:function(n){null==n&&(n=!0),n?l(\"ns_st_ce\",\"1\"):v(\"ns_st_ce\")},carryTvAdvertisementLoad:function(n){null==n&&(n=!0),n?l(\"ns_st_ia\",\"1\"):v(\"ns_st_ia\")},setLength:function(n){l(\"ns_st_cl\",n)},setTotalSegments:function(n){l(\"ns_st_tp\",n)},setClipUrl:function(n){l(\"ns_st_cu\",n)},setFeedType:function(n){l(\"ns_st_ft\",n)},setVideoDimensions:function(n,t){l(\"ns_st_cs\",(n=n||0)+\"x\"+(t=t||0))},setStack:function(n,t){e[n]=t},getStandardLabels:function(){return i.extend({},n.getStandardLabels(),t)},getMetadataLabels:function(){return i.extend({},f.getStandardLabels(),f.getCustomLabels())},getStacks:function(){return e}})}i.extend(s,o);var u={LONG_FORM_ON_DEMAND:\"12\",SHORT_FORM_ON_DEMAND:\"11\",LIVE:\"13\",USER_GENERATED_LONG_FORM_ON_DEMAND:\"22\",USER_GENERATED_SHORT_FORM_ON_DEMAND:\"21\",USER_GENERATED_LIVE:\"23\",BUMPER:\"99\",OTHER:\"00\"};s.ContentType=u,s.ContentFeedType={EAST_HD:\"EASTHD\",WEST_HD:\"WESTHD\",EAST_SD:\"EASTSD\",WEST_SD:\"WESTSD\",OTHER:\"OTHER\"},n.exports=s},8449:(n,t,e)=>{var i=e(8705),r=e(2813),o=e(4717),s=e(9461),u=e(1128),a=e(4784),f=e(5969),c=e(3387),l=e(4574),v=e(3955),d=e(8592),_=e(8937),p=e(8489),h=e(5866),g=e(4149),m=e(634),y=e(405),S=e(9283),b=e(3492),w=e(7995),E=e(7051),I=e(9215),P=e(693),A=e(2356).$f,C=e(2356).Zf,L=e(2356).nc,D=e(6859),N=e(5498),T=e(462),O=e(3318),k=e(6117),R=e(4341),M=e(7297),U=e(6397).Cn,x=e(6471),W=e(6814),F=\"7.9.0+2406050415\";function V(n){var t,e,V,B,q,G,j,H,K,J,Y,z,X,Q,$,Z,nn,tn,en,rn,on,sn,un,an,fn,cn,ln,vn,dn,_n,pn=this;function hn(){t.tc().disable(),t.ec().disable(),pn.ic()}function gn(n){var e=t.oc().rc();if(e==A.IDLE||e==A.PLAYBACK_NOT_STARTED||e==A.BUFFERING_BEFORE_PLAYBACK||e==A.SEEKING_BEFORE_PLAYBACK){if(n==C.PLAY)return!0}else if(e==A.PLAYING){if(n==C.END||n==C.AD_SKIP||n==C.SEEK_START||n==C.PAUSE)return!0}else if(e==A.PAUSED||e==A.BUFFERING_DURING_PAUSE||e==A.SEEKING_DURING_PLAYBACK||e==A.SEEKING_DURING_BUFFERING||e==A.SEEKING_DURING_PAUSE){if(n==C.END||n==C.AD_SKIP||n==C.PLAY)return!0}else if(e==A.BUFFERING_DURING_PLAYBACK){if(n==C.PAUSE_ON_BUFFERING||n==C.END||n==C.AD_SKIP||n==C.SEEK_START||n==C.PAUSE||n==C.PLAY)return!0}else if(e==A.BUFFERING_DURING_SEEKING){if(n==C.END||n==C.AD_SKIP||n==C.PAUSE||n==C.PLAY)return!0}else if(e==A.PAUSED_DURING_BUFFERING&&(n==C.END||n==C.AD_SKIP||n==C.BUFFER_STOP||n==C.PLAY))return!0;return!1}function mn(n){(_n=n)==S.uc.sc?(pn.ac(\"1\"),t.fc().Pr(\"System clock jump detected\",\"to the far past\")):_n==S.uc.cc?(pn.ac(\"3\"),t.fc().Pr(\"System clock jump detected\",\"to the future\")):(pn.ac(\"2\"),t.fc().Pr(\"System clock jump detected\",\"to the near past\")),t.ec().lc(rn)}function yn(){pn.vc(new I(C.END))}function Sn(){V=M.configuration.se()}function bn(){V=M.configuration.se()}m.extend(pn,{dc:null,ac:function(n){-1==vn.indexOf(n)&&vn.push(n)},_c:function(){if(t.hc().configuration.isEnabled()){var n=new I(C.HEARTBEAT);n.setLabel(\"ns_st_hc\",t.ec().gc());var e=t.mc(),i=e.Of(),r=isNaN(rn)?en:rn;rn=n.yc,S.Wn().Sc(n.yc);var o=!1;_n&&(_n=null,o=!0,n.yc=r);var s=i.ga(),u=i.ha(),a=i.Yu(),f=i.Ju(),c=i.yf(),l=i.mf();i.bf()?e.bc(A.PLAYING,null,n.yc):e.wc(A.PLAYING,null,n.yc),i.ta(n);var v=pn.Yt(C.HEARTBEAT,n);t.mc().Of().Ou(v.Ec),t.Ic().dispatchEvent(v),i._a(s),i.pa(u),i.Hu(a),i.Ku(f),i.hf(c),i.gf(l),o&&(i.pa(rn),i.Ku(rn),i.gf(rn),e.ya(rn-parseInt(v.Ec.ns_st_dpt)),i.ya(rn-parseInt(v.Ec.ns_st_dpt)),i.sa(rn-parseInt(v.Ec.ns_st_det)))}else hn()},Yt:function(n,i){var r=i.yc,o=t.mc(),s={};s.ns_ts=r+\"\",s.ns_st_ev=C.toString(n),s.ns_st_mp=\"js_api\",s.ns_st_mv=F,s.ns_st_ub=\"0\",s.ns_st_br=\"0\",s.ns_st_pn=\"1\",s.ns_st_tp=\"0\",s.ns_st_it=L.toString(L.Pc),s.ns_st_sv=F,s.ns_st_smv=\"6.7\",s.ns_type=\"hidden\",s.ns_st_ec=t.Ic()._t()+\"\",s.ns_st_cfg=e.zf(),s.ns_st_hd=t.ec().Ac(r),s.ns_st_po=o.Of().Yu()+\"\",vn.length>0&&(s.ns_ap_ie=vn.join(\";\")),o.Yt(s,r),o.Of().Yt(s,r,n==C.HEARTBEAT),m.extend(s,i.Cc),m.extend(s,ln),function(){for(var n=m.Ht(cn),t=0;t<n.length;++t)n[t](s)}();var u={};m.extend(u,s),m.extend(u,e.getLabels());var a=new x;a.St(!1);var f=e.Xf(),c=e.Bf,l=o.Of(),v=l.getStacks();if(c.length>0)for(var d=0;d<c.length;++d){var _=c[d];-1!=V.indexOf(_)&&a.addIncludedPublisher(_)}else for(d=0;d<V.length;++d){var p=V[d];a.addIncludedPublisher(p)}var h=[];for(var g in f){var y=f[g];if(!(c.length>0&&-1==c.indexOf(g))){var S={};m.extend(S,u),m.extend(S,y.getLabels()),m.extend(S,l.getLabels()),v[g]&&m.extend(S,v[g]),m.extend(S,i.Lc),a.addPublisherLabels(g,S),h.push(g)}}var b=[];for(var w in v){var E=v[w];if(-1==h.indexOf(w)){var I={};m.extend(I,E),m.extend(I,i.Lc),a.addPublisherLabels(w,I),b.push(w)}}return a.Ve(b),m.extend(u,l.getLabels()),m.extend(u,i.Lc),a.addLabels(u),new W(n,a,s)},vc:function(n){if(t.hc().configuration.isEnabled()){var i=t.oc().rc();if(e.qf){if(an&&i==A.BUFFERING_BEFORE_PLAYBACK&&n.Dc==C.BUFFER_STOP){t.fc().Pr(\"Resume to PLAY from state:\",h.Nc(i));var r=new I(C.PLAY);return r.yc=n.yc,r.Cc.ns_st_ae=\"1\",pn.vc(r),void(an=!1)}an&&(an=!1)}var o=t.oc().Tc(n.Dc);if(null!=o&&o!=i){dn&&h.Oc(i)&&!h.Oc(o)?U.iu(yn):dn&&!h.Oc(i)&&h.Oc(o)&&U.ru(yn);var s=t.mc(),u=s.Of(),a=isNaN(rn)?en:rn;S.Wn().Sc(n.yc),rn=n.yc;var f=!1;_n&&(_n=null,f=!0,n.yc=a),i==A.IDLE&&u.He(\"ns_st_pn\")&&s.startFromSegment(parseInt(u.Ke(\"ns_st_pn\"))),u.bf()?s.bc(i,o,n.yc):s.wc(i,o,n.yc),i==A.IDLE&&s.kc(),function(n){var e=t.oc().rc();n.Dc==C.AD_SKIP&&!n.Cc.hasOwnProperty(\"ns_st_ui\")&&gn(n.Dc)?n.Cc.ns_st_ui=\"skip\":n.Dc==C.SEEK_START&&!n.Cc.hasOwnProperty(\"ns_st_ui\")&&gn(n.Dc)&&(n.Cc.ns_st_ui=\"seek\");var i=n.Dc;e==A.IDLE?i==C.BUFFER?B.Rc(n):i==C.SEEK_START?B.Mc(n):i==C.PLAY&&B.Uc(n):e==A.PLAYBACK_NOT_STARTED?i==C.END||i==C.AD_SKIP?G.xc(n):i==C.SEEK_START?G.Mc(n):i==C.PLAY?G.Uc(n):i==C.BUFFER&&G.Rc(n):e==A.PLAYING?i==C.END||i==C.AD_SKIP?j.xc(n):i==C.BUFFER?j.Rc(n):i==C.SEEK_START?j.Mc(n):i==C.PAUSE&&j.Wc(n):e==A.PAUSED?i==C.END||i==C.AD_SKIP?q.xc(n):i==C.PLAY?q.Uc(n):i==C.BUFFER?Z.Fc(n):i==C.SEEK_START&&Z.Vc(n):e==A.BUFFERING_BEFORE_PLAYBACK?i==C.END||i==C.AD_SKIP?H.xc(n):i==C.BUFFER_STOP?H.Bc(n):i==C.SEEK_START?H.Mc(n):i==C.PAUSE?H.Wc(n):i==C.PLAY&&H.Uc(n):e==A.BUFFERING_DURING_PLAYBACK?i==C.PAUSE_ON_BUFFERING?K.qc(n):i==C.BUFFER_STOP?Z.Gc(n):i==C.END||i==C.AD_SKIP?K.xc(n):i==C.SEEK_START?K.Mc(n):i==C.PAUSE?K.Wc(n):i==C.PLAY&&Z.Gc(n):e==A.BUFFERING_DURING_SEEKING?i==C.END||i==C.AD_SKIP?J.xc(n):i==C.PAUSE?J.Wc(n):i==C.PLAY?J.Uc(n):i==C.BUFFER_STOP&&Z.jc(n):e==A.BUFFERING_DURING_PAUSE?i==C.END||i==C.AD_SKIP?Y.Hc(n):i==C.PAUSE?Y.Wc(n):i==C.PLAY?Y.Uc(n):i==C.SEEK_START?Z.Vc(n):i==C.BUFFER_STOP&&Z.jc(n):e==A.SEEKING_BEFORE_PLAYBACK?i==C.END||i==C.AD_SKIP?X.xc(n):i==C.PAUSE?X.Wc(n):i==C.PLAY?X.Uc(n):i==C.BUFFER&&Z.Fc(n):e==A.SEEKING_DURING_PLAYBACK?i==C.END||i==C.AD_SKIP?$.xc(n):i==C.PLAY?$.Uc(n):i==C.BUFFER?Z.Fc(n):i==C.PAUSE&&Z.Kc(n):e==A.SEEKING_DURING_BUFFERING?i==C.PAUSE?Q.Wc(n):i==C.BUFFER?Z.Fc(n):i==C.PLAY?Z.Jc(n):i==C.END||i==C.AD_SKIP?Z.Yc(n):i==C.BUFFER_STOP&&Z.zc(n):e==A.PAUSED_DURING_BUFFERING?i==C.END||i==C.AD_SKIP?z.xc(n):i==C.BUFFER_STOP?z.Xc(n):i==C.SEEK_START?z.Mc(n):i==C.PAUSE?z.Wc(n):i==C.PLAY&&z.Xc(n):e==A.SEEKING_DURING_PAUSE&&(i==C.BUFFER?Z.Fc(n):i==C.PLAY?Z.Jc(n):i==C.PAUSE?Z.Kc(n):i==C.END||i==C.AD_SKIP?Z.Yc(n):i==C.BUFFER_STOP&&Z.zc(n)),gn(i)&&t.mc().Qc(!0)}(n),t.oc().vc(n.Dc,n.yc),o==A.IDLE?S.Wn().$c(mn):i==A.IDLE&&S.Wn().Zc(mn),f&&(u.pa(rn),u.Ku(rn),u.gf(rn),o!=A.IDLE&&o!=A.PLAYBACK_NOT_STARTED&&o!=A.SEEKING_BEFORE_PLAYBACK&&o!=A.BUFFERING_BEFORE_PLAYBACK&&u.sa(rn),o!=A.BUFFERING_BEFORE_PLAYBACK&&o!=A.BUFFERING_DURING_PAUSE&&o!=A.BUFFERING_DURING_PLAYBACK&&o!=A.BUFFERING_DURING_SEEKING&&o!=A.PAUSED_DURING_BUFFERING||(s.wa(rn),u.wa(rn)),o==A.PLAYING&&(s.ya(rn),u.ya(rn)),o!=A.SEEKING_BEFORE_PLAYBACK&&o!=A.SEEKING_DURING_BUFFERING&&o!=A.SEEKING_DURING_PAUSE&&o!=A.SEEKING_DURING_PLAYBACK&&o!=A.BUFFERING_DURING_SEEKING||u.Ma(rn)),t.fc().log(\"Transition from\",h.Nc(i),\"to\",h.Nc(o),\"due to event:\",C.toString(n.Dc));for(var c=0,l=fn.length;c<l;c++)fn[c](i,o,n.Cc)}else t.fc().Pr(\"Ignored event:\",C.toString(n.Dc),\"during state\",h.Nc(i),n.Cc)}else hn()},nl:function(n){if(t.hc().configuration.isEnabled()){var e=n.Dc,i=n.Cc,r=t.oc().rc();if(e!=C.LOAD&&e!=C.ENGAGE||r==A.IDLE){var o,s,u,a,f=!0,c=!1,l=!0;if(e==C.ERROR&&null==i.ns_st_er&&(i.ns_st_er=R.Xt),e==C.TRANSFER&&null==i.ns_st_rp&&(i.ns_st_rp=R.Xt),e==C.PLAYBACK_RATE){var v=parseInt(i.ns_st_rt);(0==v||isNaN(v))&&(l=!1,pn.ac(\"6\"),i.ns_st_rt=t.mc().Of().vf()+\"\")}if(e==C.VOLUME){var d=parseInt(i.ns_st_vo);(d<0||isNaN(d))&&(l=!1,pn.ac(\"7\"),i.ns_st_vo=ln.ns_st_vo)}switch(e){case C.BIT_RATE:o=\"ns_st_br\",s=\"ns_st_pbr\";break;case C.PLAYBACK_RATE:o=\"ns_st_rt\",s=\"ns_st_prt\";break;case C.VOLUME:o=\"ns_st_vo\",s=\"ns_st_pvo\";break;case C.WINDOW_STATE:o=\"ns_st_ws\",s=\"ns_st_pws\";break;case C.AUDIO:o=\"ns_st_at\",s=\"ns_st_pat\";break;case C.VIDEO:o=\"ns_st_vt\",s=\"ns_st_pvt\";break;case C.SUBS:o=\"ns_st_tt\",s=\"ns_st_ptt\";break;case C.CDN:o=\"ns_st_cdn\",s=\"ns_st_pcdn\";break;default:f=!1}var _=t.mc(),p=_.Of();if(f&&o in i)switch(a=i[o],e){case C.BIT_RATE:case C.VOLUME:case C.WINDOW_STATE:o in ln&&(u=ln[o],i[s]=u,c=a==u+\"\"),ln[o]=i[o];break;case C.AUDIO:case C.VIDEO:case C.SUBS:case C.CDN:p.wu(o)&&(u=p.bu(o),i[s]=u,c=a==u+\"\"),p.Su(o,i[o]);break;case C.PLAYBACK_RATE:u=p.vf(),i[s]=u+\"\"}if(f&&r!=A.PLAYING&&r!=A.BUFFERING_DURING_PLAYBACK||f&&c&&l)return e==C.PLAYBACK_RATE&&p.df(parseInt(i.ns_st_rt)),void t.fc().Pr(\"No measurement send for the pseudo-event:\",C.toString(e),\"during state\",h.Nc(r),i);var g=isNaN(rn)?en:rn;rn=n.yc,S.Wn().Sc(n.yc);var m=!1;_n&&(_n=null,m=!0,n.yc=g),p.bf()?_.bc(r,null,n.yc):_.wc(r,null,n.yc),r==A.IDLE&&_.kc();var y=p.Yu();_.tl(),r!=A.IDLE&&r!=A.PLAYBACK_NOT_STARTED&&r!=A.SEEKING_BEFORE_PLAYBACK&&r!=A.BUFFERING_BEFORE_PLAYBACK&&(p.ra(n.yc),p.sa(n.yc)),r==A.PLAYING&&(_.ua(n.yc),_.ya(n.yc),p.ua(n.yc),p.ya(n.yc),p._f(y),p.na(y),p.ta(),p.$u(y),t.ec().pause(),t.ec().resume()),r!=A.BUFFERING_BEFORE_PLAYBACK&&r!=A.BUFFERING_DURING_PAUSE&&r!=A.BUFFERING_DURING_PLAYBACK&&r!=A.BUFFERING_DURING_SEEKING||(_.Qu(n.yc),_.wa(n.yc),p.Qu(n.yc),p.wa(n.yc));var b=pn.Yt(e,n);p.Nu(b.Ec),p.Ou(b.Ec),_.Nu(b.Ec),t.Ic().dispatchEvent(b),e==C.PLAYBACK_RATE&&p.df(parseInt(i.ns_st_rt)),m&&(p.pa(rn),p.Ku(rn),p.gf(rn),r==A.PLAYING&&(_.ya(rn),p.ya(rn)),r!=A.IDLE&&r!=A.PLAYBACK_NOT_STARTED&&r!=A.SEEKING_BEFORE_PLAYBACK&&r!=A.BUFFERING_BEFORE_PLAYBACK&&p.sa(rn),r!=A.BUFFERING_BEFORE_PLAYBACK&&r!=A.BUFFERING_DURING_PAUSE&&r!=A.BUFFERING_DURING_PLAYBACK&&r!=A.BUFFERING_DURING_SEEKING&&r!=A.PAUSED_DURING_BUFFERING||(_.wa(rn),p.wa(rn)),r!=A.SEEKING_BEFORE_PLAYBACK&&r!=A.SEEKING_DURING_BUFFERING&&r!=A.SEEKING_DURING_PAUSE&&r!=A.SEEKING_DURING_PLAYBACK&&r!=A.BUFFERING_DURING_SEEKING||p.Ma(rn))}else t.fc().Pr(\"Ignored pseudo-event:\",C.toString(e),\"during state\",h.Nc(r),i)}else hn()},addListener:function(n){fn.push(n)},removeListener:function(n){fn.splice(y.indexOf(n,fn),1)},addMeasurementListener:function(n){b.ee(n)&&cn.push(n)},removeMeasurementListener:function(n){var t=cn.indexOf(n);-1!=t&&cn.splice(t,1)},el:function(){return U},il:function(){return nn},rl:function(n){nn=n},ol:function(){return tn},setLoadTimeOffset:function(n){tn=n},sl:function(){return en},ul:function(){return sn},al:function(){return dn},fl:function(n){pn.ic(),un=pn.el().setTimeout((function(){var n=new I(C.PAUSE_ON_BUFFERING);pn.vc(n)}),on)},ic:function(){null!=un&&(pn.el().clearTimeout(un),un=null)},cl:function(){an=!0},ll:function(){return t},vl:function(n){var e=t.mc();t.dl(new P(t)),t.mc()._l(Sn),P.vl(t,e,n),vn=[]},pl:function(){t.ec().reset()},setProjectId:function(n){ln.cs_proid=n}}),t=new g(pn),e=new E(n||{}),pn.dc=new w(e),t.setConfiguration(e),t.hl(M),t.gl(new D(t)),t.ml(new N(t)),t.yl(new T(e,M)),t.Ic().Sl(bn),t.bl(new k),t.wl(new O(\"STA\",t.hc().configuration.we())),t.dl(new P(t)),t.mc()._l(Sn),V=[],B=new i(t),q=new r(t),G=new o(t),j=new s(t),H=new u(t),K=new a(t),J=new f(t),Y=new c(t),z=new l(t),X=new v(t),Q=new d(t),$=new _(t),Z=new p(t),nn=!1,tn=0,en=b.st(),sn=!0,vn=[],fn=[],cn=[],(ln={}).ns_st_vo=\"100\",_n=null,function(n){sn=n.Rf,on=n.Mf,dn=n.Uf}(e)}V.El=500,V.Il=!0,V.Pl=!0,n.exports=V},2356:n=>{var t,e=(t=[\"play\",\"pause\",\"pause-on-buffering\",\"end\",\"buffer\",\"buffer-stop\",\"keep-alive\",\"hb\",\"custom\",\"load\",\"start\",\"skstart\",\"adskip\",\"cta\",\"error\",\"trans\",\"drmfa\",\"drmap\",\"drmde\",\"bitrt\",\"playrt\",\"volume\",\"window\",\"audio\",\"video\",\"subs\",\"cdn\"],{PLAY:0,PAUSE:1,PAUSE_ON_BUFFERING:2,END:3,BUFFER:4,BUFFER_STOP:5,KEEPALIVE:6,HEARTBEAT:7,CUSTOM:8,LOAD:9,ENGAGE:10,SEEK_START:11,AD_SKIP:12,CTA:13,ERROR:14,TRANSFER:15,DRM_FAILED:16,DRM_APPROVED:17,DRM_DENIED:18,BIT_RATE:19,PLAYBACK_RATE:20,VOLUME:21,WINDOW_STATE:22,AUDIO:23,VIDEO:24,SUBS:25,CDN:26,toString:function(n){return t[n]}}),i=function(){var n=[\"c\",\"s\",\"r\"];return{Pc:0,Al:1,Cl:2,toString:function(t){return n[t]}}}();n.exports.Zf=e,n.exports.$f={IDLE:0,PLAYBACK_NOT_STARTED:1,PLAYING:2,PAUSED:3,BUFFERING_BEFORE_PLAYBACK:4,BUFFERING_DURING_PLAYBACK:5,BUFFERING_DURING_SEEKING:6,BUFFERING_DURING_PAUSE:7,SEEKING_BEFORE_PLAYBACK:8,SEEKING_DURING_PLAYBACK:9,SEEKING_DURING_BUFFERING:10,SEEKING_DURING_PAUSE:11,PAUSED_DURING_BUFFERING:12},n.exports.nc=i},9215:(n,t,e)=>{var i=e(3492);n.exports=function(n){var t=this;t.Dc=n,t.Lc={},t.Cc={},t.yc=i.st(),t.setLabel=function(n,e){t.Cc[n]=e}}},6814:n=>{n.exports=function(n,t,e){var i=this;i.Ll=n,i.Qe=t,i.Ec=e}},462:(n,t,e)=>{var i=e(634),r=e(2356).Zf,o=e(1770);n.exports=function(n,t){var e,s,u,a,f=this;function c(){for(var n=0;n<s.length;++n){var e=s[n];t.hn(e)}s=[]}function l(n){switch(n){case o.TIME_WINDOW_ELAPSED:a=!0,d()&&v();break;case o.PUBLISHER:a&&d()&&v()}}function v(){for(var e=0;e<u.length;++e)u[e]();t.configuration.removeListener(l);var i=t.configuration.se();for(e=0;e<s.length;++e)for(var r=s[e],o=0;o<i.length;o++){var a=i[o];n.Bf.length>0&&-1==n.Bf.indexOf(a)||r.addIncludedPublisher(a)}c()}function d(){var e=t.configuration.se();if(0==n.Bf.length)return!0;for(var i=0;i<e.length;++i)if(-1!=n.Bf.indexOf(e[i]))return!0;return!1}i.extend(this,{dispatchEvent:function(n){n.Ll!=r.HEARTBEAT&&f.Dl(),s.push(n.Qe),a&&d()&&c()},Sl:function(n){u.push(n)},_t:function(){return e},Dl:function(){e++}}),e=1,s=[],u=[],(a=t.configuration.Se())&&d()||t.configuration.addListener(l)}},9194:(n,t,e)=>{var i=e(634),r=e(9911),o=e(2356).Zf,s=e(9215);n.exports=function(n){var t=n.Nl();function e(n,t){var e=new s(n);return r.Yt(e.Lc,t||{}),e}function u(n,t,i,r){var o=e(n,r);return null!=i&&o.setLabel(t,i+\"\"),o}i.extend(this,{setLoadTimeOffset:function(e){n.fc().Ir(\"setLoadTimeOffset\",e),t.setLoadTimeOffset(e)},setPlaybackSessionExpectedLength:function(e){n.fc().Ir(\"setPlaybackSessionExpectedLength\",e),t.ll().mc().Tl(e)},setPlaybackSessionExpectedNumberOfItems:function(e){n.fc().Ir(\"setPlaybackSessionExpectedNumberOfItems\",e),t.ll().mc().Ol(e)},notifySkipAd:function(i){n.fc().Ir(\"notifySkipAd\",i);var r=e(o.AD_SKIP,i);t.vc(r)},notifyLoad:function(i){n.fc().Ir(\"notifyLoad\",i);var r=e(o.LOAD,i);t.nl(r)},notifyEngage:function(i){n.fc().Ir(\"notifyEngage\",i);var r=e(o.ENGAGE,i);t.nl(r)},notifyCallToAction:function(i){n.fc().Ir(\"notifyCallToAction\",i);var r=e(o.CTA,i);t.nl(r)},notifyDrmFail:function(i){n.fc().Ir(\"notifyDrmFail\",i);var r=e(o.DRM_FAILED,i);t.nl(r)},notifyDrmApprove:function(i){n.fc().Ir(\"notifyDrmApprove\",i);var r=e(o.DRM_APPROVED,i);t.nl(r)},notifyDrmDeny:function(i){n.fc().Ir(\"notifyDrmDeny\",i);var r=e(o.DRM_DENIED,i);t.nl(r)},notifyCustomEvent:function(i,r){n.fc().Ir(\"notifyCustomEvent\",i,r);var s=e(o.CUSTOM,r);s.setLabel(\"ns_st_cev\",i+\"\"),t.nl(s)},notifyChangeBitrate:function(e,i){n.fc().Ir(\"notifyChangeBitrate\",e,i);var r=u(o.BIT_RATE,\"ns_st_br\",e,i);t.nl(r)},notifyChangeVolume:function(e,i){n.fc().Ir(\"notifyChangeVolume\",e,i);var r=Math.floor(100*e),s=u(o.VOLUME,\"ns_st_vo\",r,i);t.nl(s)},notifyChangeWindowState:function(e,i){n.fc().Ir(\"notifyChangeWindowState\",e,i);var r=u(o.WINDOW_STATE,\"ns_st_ws\",e,i);t.nl(r)},notifyChangeAudioTrack:function(e,i){n.fc().Ir(\"notifyChangeAudioTrack\",e,i);var r=u(o.AUDIO,\"ns_st_at\",e,i);t.nl(r)},notifyChangeVideoTrack:function(e,i){n.fc().Ir(\"notifyChangeVideoTrack\",e,i);var r=u(o.VIDEO,\"ns_st_vt\",e,i);t.nl(r)},notifyChangeSubtitleTrack:function(e,i){n.fc().Ir(\"notifyChangeSubtitleTrack\",e,i);var r=u(o.SUBS,\"ns_st_tt\",e,i);t.nl(r)},notifyChangeCdn:function(e,i){n.fc().Ir(\"notifyChangeCdn\",e,i);var r=u(o.CDN,\"ns_st_cdn\",e,i);t.nl(r)},notifyError:function(n,e){t.ll().fc().Ir(\"notifyError\",n,e);var i=u(o.ERROR,\"ns_st_er\",n,e);t.nl(i)},notifyTransferPlayback:function(n,e){t.ll().fc().Ir(\"notifyTransferPlayback\",n,e);var i=u(o.TRANSFER,\"ns_st_rp\",n,e);t.nl(i)}})}},5498:(n,t,e)=>{var i=e(634),r=e(3492);function o(n){var t,e,o,s,u,a,f,c,l=this;function v(){u++,s=0,l.resume(),n.Nl()._c()}function d(){null!=o&&(n.Nl().el().clearTimeout(o),o=null)}i.extend(this,{disable:function(){t=!1,d()},gc:function(){return u},kl:function(n){var t=0;if(null!=e)for(var i=0;i<e.length;i++){var r=e[i],o=r.Rl;if(!o||n<o){t=r.interval;break}}return t},resume:function(){if(t){var e;d(),e=f?n.mc().Of().aa()+(c-n.mc().Of().ma()):n.mc().Of().aa()+(r.st()-n.mc().Of().ma());var i=l.kl(e);if(i>0){var u=s>0?s:i;a=f?c+u:r.st()+u,o=n.Nl().el().setTimeout(v,u)}s=0,f=!1}},pause:function(){if(t){var e;d(),e=f?n.mc().Of().aa()+(c-n.mc().Of().ma()):n.mc().Of().aa()+(r.st()-n.mc().Of().ma());var i=l.kl(e);s=i-e%i,f=!1}},reset:function(){t&&(d(),s=0,u=0)},Ac:function(n){return null==o?-1:a-n},lc:function(n){f=!0,c=n}}),s=0,u=0,t=n.getConfiguration().Ff,e=i.Ht(n.getConfiguration().Vf)}o.ENABLED=!0,o.jf=[{Rl:6e4,interval:1e4},{Rl:null,interval:6e4}],o.Jf=function(n,t){if(n.length!=t.length)return!1;for(var e=0;e<n.length;++e){var i=n[e],r=t[e];if(i.Rl!=r.Rl)return!1;if(i.interval!=r.interval)return!1}return!0},n.exports=o},6859:(n,t,e)=>{var i=e(2356).Zf,r=e(634),o=e(9215);function s(n){var t,e,s,u=this;function a(){var t=new o(i.KEEPALIVE);n.Nl().nl(t),u.start()}function f(){null!=s&&(n.Nl().el().clearTimeout(s),s=null)}r.extend(u,{disable:function(){t=!1,f()},start:function(){t&&(f(),s=n.Nl().el().setTimeout(a,e))},stop:function(){t&&f()}}),t=n.getConfiguration().xf,e=n.getConfiguration().Wf}s.Gf=12e5,s.Kf=6e4,s.ENABLED=!0,n.exports=s},693:(n,t,e)=>{var i=e(634),r=e(3492),o=e(5866),s=e(1946),u=e(1296).Qf,a=e(2356).$f,f=e(2356).Zf,c=e(4341),l=e(8885),v=l.AdvertisementType,d=e(1494),_=e(2304),p=e(173),h=e(9215);function g(n){var t,e,g,m,y,S,b,w,E,I,P,A,C,L,D,N,T,O,k,R,M,U,x,W,F,V,B,q,G,j,H,K,J=this;i.extend(this,{Af:function(){var t=e,i=new d,r=_.Pf(i);e=new _(n,i,r),_.Af(t,e)},addLabels:function(n){null!=n&&i.extend(w,n)},getLabels:function(){return w},setLabel:function(n,t){var e={};e[n]=t,J.addLabels(e)},Ke:function(n){return w[n]},Of:function(){return e},Yt:function(n,t){var r=n;r.ns_st_pa=y+(isNaN(S)?0:t-S)+\"\",r.ns_st_pp=T+\"\",r.ns_st_sp=O+\"\",r.ns_st_bp=k+\"\",C||(r.ns_st_pb=\"1\"),e.Ra()&&(r.ns_st_ppc=L+\"\",r.ns_st_dppc=L-D+\"\",r.ns_st_psq=N+\"\"),r.ns_st_sc=M+\"\",i.extend(r,b)},Gu:function(){O++},Bu:function(){T++},ua:function(n){if(!isNaN(S)){var t=J.aa();t+=n-S,J.Ml(t),S=NaN}},Qu:function(n){if(!isNaN(m)){var t=J.zu();t+=n-m,J.Xu(t),m=NaN}},zu:function(){return k},Xu:function(n){k=n},aa:function(){return y},wa:function(n){m=n},ba:function(){return m},Ml:function(n){y=n},ya:function(n){S=n},ma:function(){return S},Ea:function(){return T},Ia:function(n){T=n},Ul:function(){return P},wc:function(n,i,r){var o;if(e._a(e.Yu()),e.pa(e.Ju()),!q||n!=a.IDLE&&n!=a.PLAYBACK_NOT_STARTED&&n!=a.BUFFERING_BEFORE_PLAYBACK&&n!=a.SEEKING_BEFORE_PLAYBACK&&i!=a.PLAYING)if(n==a.IDLE){var u=t.kf();o=s.Ys(e.Ke(\"ns_st_ad\"))||G&&1==F?0:I[e.gu()]&&u&&u.gu()==e.gu()?e.ga():0}else o=n==a.PLAYING?e.fa(r):e.ga();else o=V,q=!1;e.Hu(o),e.Ku(r)},bc:function(n,t,i){var r,o=e.yf();e._a(e.Yu()),e.pa(e.Ju()),e.Ta()?n==a.IDLE||n==a.BUFFERING_BEFORE_PLAYBACK||n==a.SEEKING_BEFORE_PLAYBACK||n==a.PLAYBACK_NOT_STARTED||t==a.PLAYING?(j?(j=!1,o=B):o=e.da(i),r=e.la(i,o)):n==a.PLAYING?(o=e.va(i),r=e.ca(i)):(o=e.da(i),r=e.la(i,o)):(j&&(j=!1,o=B),r=e.pf()-o),e.Hu(r),e.Ku(i),e.hf(o),e.gf(i)},kc:function(){var n,i=t.kf();n=s.Ys(e.Ke(\"ns_st_ad\"))?1:G?F:I[e.gu()]&&I[e.gu()]&&i&&i.gu()==e.gu()?e.Lu()?e.Cu():e.Cu()+1:1,e.Au(n),G=!1},tl:function(){t.Nf(e),g&&t.Nf(g);var n=e.Iu();if(A<n&&(A=n),s.Ys(e.Ke(\"ns_st_ad\"))){var i=o.Pf(e.getLabels(),u),r=parseInt(e.Ke(\"ns_st_an\"));if((null==x[i]||x[i]<r)&&(x[i]=r),W[e.gu()]=K,e.He(\"ns_st_rcn\")){var a=parseInt(e.Ke(\"ns_st_rcn\"));A<a&&(A=a)}}E&&(J.Gu(),J.uf(0),E=!1),P=!0},xl:function(){I[e.gu()]=!0,s.Ys(e.Ke(\"ns_st_ad\"))||(1==e.Cu()?H[e.gu()]=1:(null==H[e.gu()]&&(H[e.gu()]=0),H[e.gu()]++));for(var n=0;n<U.length;++n)U[n]()},_l:function(n){U.push(n)},Wl:function(){return L},Fl:function(){L++},Qc:function(n){C=n},uf:function(n){N=n},af:function(){N++},Vl:function(){return b.ns_st_id},Tl:function(n){n<0||(b.ns_st_ca=n+\"\")},Ol:function(n){n<1||(b.ns_st_cp=n+\"\")},setMediaPlayerName:function(n){n&&(b.ns_st_mp=n+\"\")},setMediaPlayerVersion:function(n){n&&(b.ns_st_mv=n+\"\")},setImplementationId:function(n){n&&(b.cs_impid=n+\"\")},loopPlaybackSession:function(){for(var n in I)if(I.hasOwnProperty(n)){var i=t.Of(n);i&&(i._a(0),i.Za(0),i.Oa(!1),i.setDvrWindowLength(0),i.hf(0)),I[n]=!1}J.startFromSegment(1),e.lf(!0),E=!0},startFromSegment:function(n){F=n,G=!0},startFromPosition:function(n){V=n,q=!0},startFromDvrWindowOffset:function(n){B=n,j=!0},Nu:function(n){e.Ra()&&(D=parseInt(n.ns_st_ppc)),R=!1},Bl:function(i){if(n.fc().Ir(\"setMetadata\",i),i&&(i instanceof d||i instanceof l)){var r=i.getMetadataLabels();if(n.fc().Pr(\"Passed labels:\",r),s.Ys(r.ns_st_ad)){if(null==r.ns_st_bn){var c=r.ns_st_ct;if((c=null!=c?c.slice(2):null)==v.ON_DEMAND_PRE_ROLL||c==v.BRANDED_ON_DEMAND_PRE_ROLL)r.ns_st_bn=\"1\";else if(c==v.ON_DEMAND_POST_ROLL||c==v.BRANDED_ON_DEMAND_POST_ROLL)r.ns_st_bn=\"1\";else if(c==v.ON_DEMAND_MID_ROLL||c==v.BRANDED_ON_DEMAND_MID_ROLL){var p=\"\";i instanceof l&&i.getRelatedContentMetadata()&&(p=_.Pf(i.getRelatedContentMetadata().getMetadataLabels())),p&&null!=H[p]?r.ns_st_bn=H[p]:r.ns_st_bn=\"1\"}}if(null==r.ns_st_an){var m=o.Pf(r,u),y=1;null!=x[m]&&(y=x[m]+1),r.ns_st_an=y+\"\"}!function(){if(null==r.ns_st_rcn){var n,e=\"\";i instanceof l&&i.getRelatedContentMetadata()&&(e=_.Pf(i.getRelatedContentMetadata().getMetadataLabels())),n=e?t.Tf(e)?t.Of(e).Iu():null==r.ns_st_cn?A+2:parseInt(r.ns_st_cn)+1:0,r.ns_st_rcn=n+\"\"}}()}var S=_.Pf(r),b=\"\";i instanceof l&&i.getRelatedContentMetadata()&&(b=_.Pf(i.getRelatedContentMetadata().getMetadataLabels()));var w=e;if(S==w.gu()&&!(G||q||E||null!=r.ns_st_pn))return n.fc().Pr(\"Updating existing asset labels with the newly provided ones:\",r),w.Eu(),w.hu(),w.addLabels(r),void J.ql(i,w);var I,P=n.oc().rc();if(P!=a.IDLE){n.fc().Pr(\"Ending the current Clip. It was in state:\",o.Nc(P));var C=new h(f.END);C.Cc.ns_st_ae=\"1\",n.Nl().vc(C)}if(t.Tf(S)?((I=t.Of(S)).wf(),I.Eu(),I.hu(),I.addLabels(r)):(I=new _(n,r,S),null==r.ns_st_cn?I.Pu(A+1):I.Pu(parseInt(r.ns_st_cn))),function(){if(i instanceof l&&i.getRelatedContentMetadata()){var e=i.getRelatedContentMetadata().getMetadataLabels(),r=_.Pf(e);t.Tf(r)?g=t.Of(r):(g=new _(n,e,r)).Pu(I.Iu()+1)}else g=null}(),s.Ys(I.Ke(\"ns_st_ad\"))&&function(){var n;if(b)if(t.Tf(b)){var e=I.Ke(\"ns_st_ct\");n=(e=null!=e?e.slice(2):null)==v.ON_DEMAND_PRE_ROLL||e==v.BRANDED_ON_DEMAND_PRE_ROLL?0:t.Of(b).Yu()}else n=0;else n=0;I.Su(\"ns_st_cpo\",n+\"\")}(),J.ql(i,I),E&&I.lf(!0),e=I,K=b,R||M++,R=!0,n.getConfiguration().qf)if(P==a.PLAYING){n.fc().Pr(\"Resuming the new Asset.\");var L=new h(f.PLAY);L.Cc.ns_st_ae=\"1\",n.Nl().vc(L)}else P!=a.BUFFERING_DURING_PLAYBACK&&P!=a.PAUSED_DURING_BUFFERING||(n.fc().Pr(\"Starting buffering the new Asset.\"),n.Nl().vc(new h(f.BUFFER)),n.Nl().cl())}else n.fc().Pr(\"Ignoring API call. An AssetMetadata object was expected and received instead:\",i)},ql:function(n,t){if(n instanceof l){var e=n.getStacks(),i=n.getRelatedContentMetadata()?n.getRelatedContentMetadata().getStacks():null,r=[];for(var o in e)if(e.hasOwnProperty(o)){var s=e[o],u=i&&i[o]||null;r.push(o);var a=s.getMetadataLabels(u);t.pu(o,a)}if(i)for(var f in i)if(i.hasOwnProperty(f)&&-1==r.indexOf(f)){var c=i[f];t.pu(f,c.getMetadataLabels())}}else{var v=n.getStacks();for(var d in v)if(v.hasOwnProperty(d)){var _=v[d];t.pu(d,_.getMetadataLabels())}}}}),function(){t=new p;var i=(new d).getMetadataLabels(),o=_.Pf(i);e=new _(n,i,o),g=null,(b={}).ns_st_id=r.uuid(),b.ns_st_mp=c.Xt,b.ns_st_mv=c.Xt,w={},E=!1,I={},m=NaN,y=0,S=NaN,A=0,P=!1,C=!1,L=0,D=0,T=0,N=0,O=1,k=0,R=!0,M=1,U=[],x={},W={},F=-1,V=0,B=0,q=!1,G=!1,j=!1,H={},K=null}()}g.vl=function(n,t,e){for(var i=t.Of(),r=t.getLabels(),o={},s=0;e&&s<e.length;s++)r.hasOwnProperty(e[s])&&(o[e[s]]=r[e[s]]);n.mc().addLabels(o),_.Af(i,n.mc().Of(),e)},g.Hf=!0,n.exports=g},7163:(n,t,e)=>{var i=e(634),r=e(9911);n.exports=function(){var n;i.extend(this,{setLabel:function(t,e){r.zt(n,t,e)},removeLabel:function(t){delete n[t]},addLabels:function(t){r.Yt(n,t)},removeAllLabels:function(){n={}},getLabels:function(){return n}}),n={}}},4149:(n,t,e)=>{var i=e(634);n.exports=function(n){var t,e,r,o,s,u,a,f;i.extend(this,{hc:function(){return e},Nl:function(){return n},getConfiguration:function(){return t},Ic:function(){return r},oc:function(){return o},ec:function(){return s},tc:function(){return u},mc:function(){return a},fc:function(){return f},setConfiguration:function(n){t=n},hl:function(n){e=n},gl:function(n){u=n},ml:function(n){s=n},yl:function(n){r=n},bl:function(n){o=n},dl:function(n){a=n},wl:function(n){f=n}})}},4039:(n,t,e)=>{var i=e(634),r=e(7460);function o(){var n=this,t=new r;i.extend(n,t),i.extend(n,{getMetadataLabels:function(t){var e={};return t&&i.extend(e,t.getStandardLabels()),i.extend(e,n.getStandardLabels()),t&&i.extend(e,t.getCustomLabels()),i.extend(e,n.getCustomLabels()),e}})}i.extend(o,r),n.exports=o},341:(n,t,e)=>{var i=e(634),r=e(4610);function o(){var n=new r;i.extend(this,n)}i.extend(o,r),n.exports=o},6117:(n,t,e)=>{var i=e(2356).$f,r=e(634),o=e(2356).Zf;n.exports=function(n){var t,e,s,u=this;r.extend(u,{Tc:function(n){if(s==i.IDLE){if(n==o.PLAY)return i.PLAYING;if(n==o.SEEK_START)return i.SEEKING_BEFORE_PLAYBACK;if(n==o.BUFFER)return i.BUFFERING_BEFORE_PLAYBACK}else if(s==i.PLAYBACK_NOT_STARTED){if(n==o.PLAY)return i.PLAYING;if(n==o.SEEK_START)return i.SEEKING_BEFORE_PLAYBACK;if(n==o.BUFFER)return i.BUFFERING_BEFORE_PLAYBACK;if(n==o.END||n==o.AD_SKIP)return i.IDLE}else if(s==i.PLAYING){if(n==o.END||n==o.AD_SKIP)return i.IDLE;if(n==o.BUFFER)return i.BUFFERING_DURING_PLAYBACK;if(n==o.PAUSE)return i.PAUSED;if(n==o.SEEK_START)return i.SEEKING_DURING_PLAYBACK}else if(s==i.PAUSED){if(n==o.END||n==o.AD_SKIP)return i.IDLE;if(n==o.BUFFER)return i.BUFFERING_DURING_PAUSE;if(n==o.PLAY)return i.PLAYING;if(n==o.SEEK_START)return i.SEEKING_DURING_PAUSE}else if(s==i.BUFFERING_BEFORE_PLAYBACK){if(n==o.END||n==o.AD_SKIP)return i.IDLE;if(n==o.PAUSE||n==o.BUFFER_STOP)return i.PLAYBACK_NOT_STARTED;if(n==o.PLAY)return i.PLAYING;if(n==o.SEEK_START)return i.SEEKING_BEFORE_PLAYBACK}else if(s==i.BUFFERING_DURING_PLAYBACK){if(n==o.END||n==o.AD_SKIP)return i.IDLE;if(n==o.PLAY||n==o.BUFFER_STOP)return i.PLAYING;if(n==o.PAUSE_ON_BUFFERING)return i.PAUSED_DURING_BUFFERING;if(n==o.SEEK_START)return i.SEEKING_DURING_BUFFERING;if(n==o.PAUSE)return i.PAUSED}else if(s==i.BUFFERING_DURING_SEEKING){if(n==o.END||n==o.AD_SKIP)return i.IDLE;if(n==o.PLAY)return i.PLAYING;if(n==o.BUFFER_STOP)return i.SEEKING_DURING_PLAYBACK;if(n==o.PAUSE)return i.PAUSED}else if(s==i.BUFFERING_DURING_PAUSE){if(n==o.END||n==o.AD_SKIP)return i.IDLE;if(n==o.PLAY)return i.PLAYING;if(n==o.SEEK_START)return i.SEEKING_DURING_PAUSE;if(n==o.BUFFER_STOP||n==o.PAUSE)return i.PAUSED}else if(s==i.SEEKING_BEFORE_PLAYBACK){if(n==o.END||n==o.AD_SKIP)return i.IDLE;if(n==o.PAUSE)return i.PLAYBACK_NOT_STARTED;if(n==o.PLAY)return i.PLAYING;if(n==o.BUFFER)return i.BUFFERING_BEFORE_PLAYBACK}else if(s==i.SEEKING_DURING_PLAYBACK){if(n==o.END||n==o.AD_SKIP)return i.IDLE;if(n==o.PLAY)return i.PLAYING;if(n==o.PAUSE)return i.PAUSED;if(n==o.BUFFER)return i.BUFFERING_DURING_SEEKING}else if(s==i.SEEKING_DURING_BUFFERING){if(n==o.END||n==o.AD_SKIP)return i.IDLE;if(n==o.PLAY)return i.PLAYING;if(n==o.PAUSE||n==o.BUFFER_STOP)return i.PAUSED;if(n==o.BUFFER)return i.BUFFERING_DURING_SEEKING}else if(s==i.SEEKING_DURING_PAUSE){if(n==o.END||n==o.AD_SKIP)return i.IDLE;if(n==o.PLAY)return i.PLAYING;if(n==o.PAUSE||n==o.BUFFER_STOP)return i.PAUSED;if(n==o.BUFFER)return i.BUFFERING_DURING_PAUSE}else if(s==i.PAUSED_DURING_BUFFERING){if(n==o.END||n==o.AD_SKIP)return i.IDLE;if(n==o.SEEK_START)return i.SEEKING_DURING_BUFFERING;if(n==o.PAUSE)return i.PAUSED;if(n==o.PLAY||n==o.BUFFER_STOP)return i.PLAYING}return null},rc:function(){return s},vc:function(n,i){var r=u.Tc(n);s!=r&&(e=s,s=r,t=i)},Gl:function(){return e},jl:function(){return t}}),s=i.IDLE,e=null,t=NaN}},1695:(n,t,e)=>{var i=e(634),r=e(5866),o=e(8449),s=e(2356).Zf,u=e(2356).$f,a=e(9215),f=e(9194),c=e(1494),l=e(341),v=e(8885),d=e(4039),_=e(7978);function p(n){var t,e=this;i.extend(e,{configuration:null,extendedAnalytics:null,createPlaybackSession:function(){t.ll().fc().Ir(\"createPlaybackSession\");var n=t.ll().oc().rc();n!=u.IDLE&&(t.ll().fc().Pr(\"Ending the current Clip. It was in state:\",r.Nc(n)),e.notifyEnd()),t.ll().mc().Ul()&&t.vl()},addListener:function(n){t.addListener(n)},removeListener:function(n){t.removeListener(n)},addMeasurementListener:function(n){t.addMeasurementListener(n)},removeMeasurementListener:function(n){t.removeMeasurementListener(n)},setDvrWindowLength:function(n){t.ll().mc().Of().setDvrWindowLength(n),t.ll().mc().Of().Sf(!0)},startFromDvrWindowOffset:function(n){t.ll().mc().startFromDvrWindowOffset(n),t.ll().mc().Of().Sf(!0)},setMediaPlayerName:function(n){t.ll().mc().setMediaPlayerName(n)},setMediaPlayerVersion:function(n){t.ll().mc().setMediaPlayerVersion(n)},setImplementationId:function(n){t.ll().mc().setImplementationId(n)},setProjectId:function(n){t.setProjectId(n+\"\")},startFromSegment:function(n){t.ll().fc().Ir(\"startFromSegment\",n),t.ll().mc().startFromSegment(n)},startFromPosition:function(n){t.ll().fc().Ir(\"startFromPosition\",n),t.ll().mc().startFromPosition(n)},loopPlaybackSession:function(){t.ll().fc().Ir(\"loopPlaybackSession\"),t.ll().mc().loopPlaybackSession()},setMetadata:function(n){t.ll().mc().Bl(n)},getPlaybackSessionId:function(){return t.ll().mc().Vl()},notifyPlay:function(){t.ll().fc().Ir(\"notifyPlay\");var n=new a(s.PLAY);t.vc(n)},notifyPause:function(){t.ll().fc().Ir(\"notifyPause\");var n=new a(s.PAUSE);t.vc(n)},notifyEnd:function(){t.ll().fc().Ir(\"notifyEnd\");var n=new a(s.END);t.vc(n)},notifyBufferStart:function(){t.ll().fc().Ir(\"notifyBufferStart\");var n=new a(s.BUFFER);t.vc(n)},notifyBufferStop:function(){t.ll().fc().Ir(\"notifyBufferStop\");var n=new a(s.BUFFER_STOP);t.vc(n)},notifySeekStart:function(){t.ll().fc().Ir(\"notifySeekStart\");var n=new a(s.SEEK_START);t.vc(n)},notifyChangePlaybackRate:function(n){t.ll().fc().Ir(\"notifyChangePlaybackRate\");var e=Math.floor(100*n),i=new a(s.PLAYBACK_RATE);i.Cc.ns_st_rt=e+\"\",t.nl(i)}}),t=new o(n),e.configuration=t.dc,e.extendedAnalytics=new f(t.ll()),t.ll().fc().log(\"New StreamingAnalytics instance with configuration\",n)}p.PlayerEvents=s,p.InternalStates=u,p.WindowState=_,p.ContentMetadata=c,p.StackedContentMetadata=l,p.AdvertisementMetadata=v,p.StackedAdvertisementMetadata=d,n.exports=p},5866:(n,t,e)=>{var i=e(634),r=e(2356).$f,o=\"undefined\";t.jt=function(n){var t={};for(var e in n){var i=n[e];null===i||i===undefined?t[e]=i:t[e]=n[e]+\"\"}return t},t.Hl=function(n,t){var e,i=[];for(e in n)t&&!t.test(e)||!n.hasOwnProperty(e)||(i[i.length]=e);return i},t.Fr=function(){return typeof window!=o&&typeof document!=o},t.Du=function(n,t,e,r){var o=i.Ht(n,1),s={start:t,end:e};if(s.start>=s.end)return o;for(var u=0;u<o.length;++u){var a=o[u];if(a.start<=s.start&&s.end<=a.end)break;if(a.start<=s.start&&s.start<=a.end&&a.end<=s.end)break;if(s.start<=a.start&&a.start<=s.end&&s.end<=a.end)break;if(s.end<=a.start)break}o.splice(u,0,s);for(var f=1;f<o.length;){var c=o[f],l=o[f-1];l.start<=c.start&&c.end<=l.end?o.splice(f,1):c.start<=l.start&&l.end<=c.end?o.splice(f-1,1):l.start<=c.start&&c.start<=l.end+r&&l.end<=c.end?o.splice(f-1,2,{start:l.start,end:c.end}):c.start<=l.start&&l.start-r<=c.end&&c.end<=l.end?o.splice(f-1,2,{start:c.start,end:l.end}):f++}return o},t.Nc=function(n){for(var t in r)if(r.hasOwnProperty(t)&&r[t]==n)return t},t.Oc=function(n){return n==r.IDLE||n==r.BUFFERING_BEFORE_PLAYBACK||n==r.SEEKING_BEFORE_PLAYBACK||n==r.PLAYBACK_NOT_STARTED},t.Pf=function(n,t){for(var e=\"hash:\",i=0;i<t.length;i++)n[t[i]]&&(e+=t[i]+\":\"+n[t[i]]+\";\");return e}},1128:(n,t,e)=>{var i=e(634),r=e(2356).Zf;n.exports=function(n){i.extend(this,{xc:function(t){var e=n.mc(),i=e.Of(),r=t.yc;e.Qu(r),i.Qu(r),i.La()&&i.Na()&&i.Va(r-i.Ua()),i.ra(r),i.Ya(),i.ka(!1)},Bc:function(t){var e=n.mc(),i=e.Of(),r=t.yc;e.Qu(r),i.Qu(r),i.La()&&i.Na()&&(i.xa(r),i.Da(!1))},Mc:function(t){var e=n.mc(),i=e.Of(),r=i.Yu(),o=t.yc;e.Qu(o),i.Qu(o),i.La()?i.Na()||(i.Ma(o),i.Da(!0)):i.qu(),i.La()||(i.Ca(!0),i.Da(!0),i.qa(r),i.Ma(o))},Wc:function(t){var e=n.mc(),i=e.Of(),r=t.yc;e.Qu(r),i.Qu(r),i.La()&&i.Na()&&(i.xa(r),i.Da(!1))},Uc:function(t){var e=n.mc(),i=e.Of(),o=i.Yu(),s=t.yc;e.Qu(s),i.Qu(s),i.La()&&(i.Na()&&(i.xa(s),i.Da(!1)),i.Ka(o),i.Ca(!1)),i.ka(!0),i.Oa(!0),(i.cf()||0==e.Wl())&&(e.Fl(),i.lf(!1)),e.af(),i.ka(!0),i.za(),i.Gu(),e.ya(s),i.ya(s),i.ra(s),i.sa(s),i.$u(o),(0==i.tf()||i.Cu()<=i.tf())&&(i.Za(i.Cu()),i.Xa(),i.uf(0),i.Qa()),i.af(),n.Nl().il()||(t.Cc.ns_st_lt=n.Nl().ol()+s-n.Nl().sl()+\"\",n.Nl().rl(!0)),n.ec().resume(),n.tc().start();var u=n.Nl().Yt(r.PLAY,t);i.Nu(u.Ec),i.Ou(u.Ec),e.Nu(u.Ec),n.Ic().dispatchEvent(u)}})}},3387:(n,t,e)=>{var i=e(634),r=e(2356).Zf;n.exports=function(n){i.extend(this,{Hc:function(t){var e=n.mc(),i=e.Of(),o=t.yc;n.Nl().pl(),n.tc().stop(),e.Qu(o),i.Qu(o),i.ra(o);var s=n.Nl().Yt(r.END,t);i.Nu(s.Ec),i.Ou(s.Ec),e.Nu(s.Ec),n.Ic().dispatchEvent(s),i.La()&&i.Na()&&(i.Va(o-i.Ua()),i.Da(!1)),i.Ya(),i.ka(!1)},Wc:function(t){var e=n.mc(),i=e.Of(),r=t.yc;e.Qu(r),i.Qu(r),i.ra(r),i.sa(r)},Uc:function(t){var e=n.mc(),i=e.Of(),o=i.Yu(),s=t.yc;e.af(),i.af(),i.Gu(),e.Qu(s),i.Qu(s),i.La()&&(i.Na()&&(i.xa(s),i.Da(!1)),i.Ka(o),i.Ca(!1)),i.ra(s),i.sa(s),e.ya(s),i.ya(s),i.$u(o),n.ec().resume(),n.tc().start();var u=n.Nl().Yt(r.PLAY,t);i.Nu(u.Ec),i.Ou(u.Ec),e.Nu(u.Ec),n.Ic().dispatchEvent(u)}})}},4784:(n,t,e)=>{var i=e(634),r=e(2356).Zf;n.exports=function(n){i.extend(this,{qc:function(t){var e=n.mc(),i=e.Of(),o=t.yc;n.Nl().ic(),i.ra(o),i.sa(o),e.Qu(o),i.Qu(o),e.Bu(),i.Bu();var s=n.Nl().Yt(r.PAUSE,t);i.Nu(s.Ec),i.Ou(s.Ec),e.Nu(s.Ec),n.Ic().dispatchEvent(s),e.wa(o),i.wa(o)},xc:function(t){var e=n.mc(),i=e.Of(),o=t.yc;n.Nl().ic(),n.Nl().pl(),n.tc().stop(),e.Qu(o),i.Qu(o),i.ra(o);var s=n.Nl().Yt(r.END,t);i.Nu(s.Ec),i.Ou(s.Ec),e.Nu(s.Ec),n.Ic().dispatchEvent(s),i.Ya(),i.ka(!1)},Mc:function(t){var e=n.mc(),i=e.Of(),o=i.Yu(),s=t.yc;n.Nl().ic(),n.ec().pause(),n.tc().stop(),i.ra(s),i.sa(s),e.Qu(s),i.Qu(s),i.qu(),i.Ca(!0),i.Da(!0),i.qa(o),i.Ma(s),e.Bu(),i.Bu();var u=n.Nl().Yt(r.PAUSE,t);i.Nu(u.Ec),i.Ou(u.Ec),e.Nu(u.Ec),n.Ic().dispatchEvent(u)},Wc:function(t){var e=n.mc(),i=e.Of(),o=t.yc;n.Nl().ic(),i.ra(o),i.sa(o),e.Qu(o),i.Qu(o),e.Bu(),i.Bu();var s=n.Nl().Yt(r.PAUSE,t);i.Nu(s.Ec),i.Ou(s.Ec),e.Nu(s.Ec),n.Ic().dispatchEvent(s)}})}},5969:(n,t,e)=>{var i=e(634),r=e(2356).Zf;n.exports=function(n){i.extend(this,{xc:function(t){var e=n.mc(),i=e.Of(),o=t.yc;n.Nl().pl(),n.tc().stop(),n.Nl().ic(),e.Qu(o),i.Qu(o),i.ra(o);var s=n.Nl().Yt(r.END,t);i.Nu(s.Ec),i.Ou(s.Ec),e.Nu(s.Ec),n.Ic().dispatchEvent(s),i.La()&&i.Na()&&(i.Va(o-i.Ua()),i.Da(!1)),i.Ya(),i.ka(!1)},Wc:function(t){var e=n.mc(),i=e.Of(),r=t.yc;e.Qu(r),i.Qu(r),e.Bu(),i.Bu(),i.La()&&i.Na()&&(i.xa(r),i.Da(!1)),i.ra(r),i.sa(r)},Uc:function(t){var e=n.mc(),i=e.Of(),o=i.Yu(),s=t.yc;e.af(),i.af(),i.Gu(),e.Qu(s),i.Qu(s),i.La()&&(i.Na()&&(i.xa(s),i.Da(!1)),i.Ka(o),i.Ca(!1)),i.ra(s),i.sa(s),e.ya(s),i.ya(s),i.$u(o),n.ec().resume(),n.tc().start();var u=n.Nl().Yt(r.PLAY,t);i.Nu(u.Ec),i.Ou(u.Ec),e.Nu(u.Ec),n.Ic().dispatchEvent(u)}})}},8705:(n,t,e)=>{var i=e(634),r=e(2356).Zf;n.exports=function(n){i.extend(this,{Rc:function(t){var e=n.mc(),i=e.Of(),r=t.yc;e.tl(),e.xl(),i.La()&&i.Fa(i.Ba()),e.wa(r),i.wa(r),i.sa(r)},Mc:function(t){var e=n.mc(),i=e.Of(),r=i.Yu(),o=t.yc;e.tl(),e.xl(),i.La()&&i.Fa(i.Ba()),i.qu(),i.Ca(!0),i.Da(!0),i.qa(r),i.Ma(o),i.sa(o)},Uc:function(t){var e=n.mc(),i=e.Of(),o=i.Yu(),s=t.yc;e.tl(),e.xl(),(i.cf()||0==e.Wl())&&(e.Fl(),i.lf(!1)),i.La()&&(i.Fa(i.Ba()),i.Ka(o),i.Ca(!1)),e.af(),i.ka(!0),i.Oa(!0),i.za(),(0==i.tf()||i.Cu()<=i.tf())&&(i.Za(i.Cu()),i.Xa(),i.uf(0),i.Qa()),i.af(),i.Gu(),e.ya(s),i.ya(s),i.sa(s),i.$u(o),n.Nl().il()||(t.Cc.ns_st_lt=n.Nl().ol()+s-n.Nl().sl()+\"\",n.Nl().rl(!0)),n.ec().resume(),n.tc().start();var u=n.Nl().Yt(r.PLAY,t);i.Nu(u.Ec),i.Ou(u.Ec),e.Nu(u.Ec),n.Ic().dispatchEvent(u)}})}},2813:(n,t,e)=>{var i=e(634),r=e(2356).Zf;n.exports=function(n){i.extend(this,{xc:function(t){var e=n.mc(),i=e.Of(),o=t.yc;n.Nl().pl(),n.tc().stop(),i.ra(o);var s=n.Nl().Yt(r.END,t);i.Nu(s.Ec),i.Ou(s.Ec),e.Nu(s.Ec),n.Ic().dispatchEvent(s),i.La()&&i.Na()&&(i.Va(o-i.Ua()),i.Ca(!1)),i.Ya(),i.ka(!1)},Uc:function(t){var e=n.mc(),i=e.Of(),o=i.Yu(),s=t.yc;e.af(),i.La()&&(i.Na()&&(i.xa(s),i.Da(!1)),i.Ka(o),i.Ca(!1)),i.Gu(),i.af(),e.ya(s),i.ya(s),i.ra(s),i.sa(s),i.$u(o),n.ec().resume(),n.tc().start();var u=n.Nl().Yt(r.PLAY,t);i.Nu(u.Ec),i.Ou(u.Ec),e.Nu(u.Ec),n.Ic().dispatchEvent(u)}})}},4574:(n,t,e)=>{var i=e(634),r=e(2356).Zf;n.exports=function(n){i.extend(this,{xc:function(t){var e=n.mc(),i=e.Of(),o=t.yc;n.Nl().pl(),n.tc().stop(),e.Qu(o),i.Qu(o),i.ra(o),i.La()&&i.Na()&&(i.Va(o-i.Ua()),i.Da(!1));var s=n.Nl().Yt(r.END,t);i.Nu(s.Ec),i.Ou(s.Ec),e.Nu(s.Ec),n.Ic().dispatchEvent(s),i.Ya(),i.ka(!1)},Mc:function(t){var e=n.mc(),i=e.Of(),r=i.Yu(),o=t.yc;e.Qu(o),i.Qu(o),i.La()?i.Na()||(i.Ma(o),i.Da(!0)):i.qu(),i.La()||(i.Ca(!0),i.Da(!0),i.qa(r),i.Ma(o)),i.ra(o),i.sa(o)},Wc:function(t){var e=n.mc(),i=e.Of(),r=t.yc;e.Qu(r),i.Qu(r),i.ra(r),i.sa(r)},Xc:function(t){var e=n.mc(),i=e.Of(),o=i.Yu(),s=t.yc;e.af(),i.af(),e.Qu(s),i.Qu(s),i.Gu(),e.ya(s),i.ya(s),i.ra(s),i.sa(s),i.$u(o),n.ec().resume(),n.tc().start();var u=n.Nl().Yt(r.PLAY,t);i.Nu(u.Ec),i.Ou(u.Ec),e.Nu(u.Ec),n.Ic().dispatchEvent(u)}})}},4717:(n,t,e)=>{var i=e(634),r=e(2356).Zf;n.exports=function(n){i.extend(this,{xc:function(t){var e=n.mc().Of(),i=t.yc;e.La()&&e.Na()&&(e.Va(i-e.Ua()),e.Da(!1)),e.ra(i),e.Ya(),e.ka(!1)},Mc:function(t){var e=n.mc().Of(),i=e.Yu(),r=t.yc;e.La()?e.Ma(r):e.qu(),e.La()||(e.Ca(!0),e.Da(!0),e.qa(i),e.Ma(r))},Uc:function(t){var e=n.mc(),i=e.Of(),o=i.Yu(),s=t.yc;i.La()&&(i.Ka(o),i.Ca(!1)),(i.cf()||0==e.Wl())&&(e.Fl(),i.lf(!1)),e.af(),i.ka(!0),i.Oa(!0),i.za(),(0==i.tf()||i.Cu()<=i.tf())&&(i.Za(i.Cu()),i.Xa(),i.uf(0),i.Qa()),i.af(),i.Gu(),e.ya(s),i.ya(s),i.ra(s),i.sa(s),i.$u(o),n.Nl().il()||(t.Cc.ns_st_lt=n.Nl().ol()+s-n.Nl().sl()+\"\",n.Nl().rl(!0)),n.ec().resume(),n.tc().start();var u=n.Nl().Yt(r.PLAY,t);i.Nu(u.Ec),i.Ou(u.Ec),e.Nu(u.Ec),n.Ic().dispatchEvent(u)},Rc:function(t){var e=n.mc(),i=e.Of(),r=t.yc;e.wa(r),i.wa(r)}})}},9461:(n,t,e)=>{var i=e(634),r=e(2356).Zf;n.exports=function(n){i.extend(this,{xc:function(t){var e=n.mc(),i=e.Of(),o=i.Yu(),s=t.yc;n.Nl().pl(),n.tc().stop(),e.ua(s),i.ua(s),i._f(o),i.ra(s),i.na(o),i.ta();var u=n.Nl().Yt(r.END,t);i.Nu(u.Ec),i.Ou(u.Ec),e.Nu(u.Ec),n.Ic().dispatchEvent(u),i.Ya(),i.ka(!1)},Rc:function(t){var e=n.mc(),i=e.Of(),r=i.Yu(),o=t.yc;n.ec().pause(),n.tc().stop(),e.ua(o),i.ua(o),i._f(r),i.na(r),i.ta(),n.Nl().ul()&&n.Nl().fl(t),i[\"if\"](),e.wa(o),i.wa(o),i.ra(o),i.sa(o)},Mc:function(t){var e=n.mc(),i=e.Of(),o=i.Yu(),s=t.yc;n.ec().pause(),n.tc().stop(),e.ua(s),i.ua(s),i._f(o),i.na(o),i.ta(),i.qu(),i.Ca(!0),i.Da(!0),i.qa(o),i.Ma(s),i.ra(s),i.sa(s),e.Bu(),i.Bu();var u=n.Nl().Yt(r.PAUSE,t);i.Nu(u.Ec),i.Ou(u.Ec),e.Nu(u.Ec),n.Ic().dispatchEvent(u)},Wc:function(t){var e=n.mc(),i=e.Of(),o=i.Yu(),s=t.yc;n.ec().pause(),n.tc().stop(),e.ua(s),i.ua(s),i._f(o),i.na(o),i.ta(),i.ra(s),i.sa(s),e.Bu(),i.Bu();var u=n.Nl().Yt(r.PAUSE,t);i.Nu(u.Ec),i.Ou(u.Ec),e.Nu(u.Ec),n.Ic().dispatchEvent(u)}})}},3955:(n,t,e)=>{var i=e(634),r=e(2356).Zf;n.exports=function(n){i.extend(this,{xc:function(t){var e=n.mc().Of(),i=t.yc;e.La()&&e.Na()&&(e.Va(i-e.Ua()),e.Da(!1)),e.ra(i),e.Ya(),e.ka(!1)},Wc:function(t){var e=n.mc().Of(),i=t.yc;e.La()&&e.Na()&&(e.xa(i),e.Da(!1))},Uc:function(t){var e=n.mc(),i=e.Of(),o=i.Yu(),s=t.yc;i.La()&&(i.Na()&&(i.xa(s),i.Da(!1)),i.Ka(o),i.Ca(!1)),(i.cf()||0==e.Wl())&&(e.Fl(),i.lf(!1)),e.af(),i.ka(!0),i.Oa(!0),i.za(),(0==i.tf()||i.Cu()<=i.tf())&&(i.Za(i.Cu()),i.Xa(),i.uf(0),i.Qa()),i.af(),i.Gu(),e.ya(s),i.ya(s),i.ra(s),i.sa(s),i.$u(o),n.Nl().il()||(t.Cc.ns_st_lt=n.Nl().ol()+s-n.Nl().sl()+\"\",n.Nl().rl(!0)),n.ec().resume(),n.tc().start();var u=n.Nl().Yt(r.PLAY,t);i.Nu(u.Ec),i.Ou(u.Ec),e.Nu(u.Ec),n.Ic().dispatchEvent(u)}})}},8592:(n,t,e)=>{var i=e(634);n.exports=function(n){i.extend(this,{Wc:function(t){var e=n.mc(),i=e.Of(),r=t.yc;e.Bu(),i.Bu(),i.La()&&i.Na()&&(i.xa(r),i.Da(!1)),i.ra(r),i.sa(r)}})}},8937:(n,t,e)=>{var i=e(634),r=e(2356).Zf;n.exports=function(n){i.extend(this,{xc:function(t){var e=n.mc(),i=e.Of(),o=t.yc;n.Nl().pl(),n.tc().stop(),i.ra(o);var s=n.Nl().Yt(r.END,t);i.Nu(s.Ec),i.Ou(s.Ec),e.Nu(s.Ec),n.Ic().dispatchEvent(s),i.La()&&i.Na()&&(i.Va(o-i.Ua()),i.Da(!1)),i.Ya(),i.ka(!1)},Uc:function(t){var e=n.mc(),i=e.Of(),o=i.Yu(),s=t.yc;e.af(),i.af(),i.Gu(),i.La()&&(i.Na()&&(i.xa(s),i.Da(!1)),i.Ka(o),i.Ca(!1)),i.ra(s),i.sa(s),e.ya(s),i.ya(s),i.$u(o),n.Nl().il()||(t.Cc.ns_st_lt=n.Nl().ol()+s-n.Nl().sl()+\"\",n.Nl().rl(!0)),n.ec().resume(),n.tc().start();var u=n.Nl().Yt(r.PLAY,t);i.Nu(u.Ec),i.Ou(u.Ec),e.Nu(u.Ec),n.Ic().dispatchEvent(u)}})}},8489:(n,t,e)=>{var i=e(634),r=e(2356).Zf;n.exports=function(n){i.extend(this,{Vc:function(t){var e=n.mc().Of(),i=e.Yu(),r=t.yc;e.La()?e.Na()||(e.Ma(r),e.Da(!0)):e.qu(),e.La()||(e.Ca(!0),e.Da(!0),e.qa(i),e.Ma(r)),e.ra(r),e.sa(r)},Fc:function(t){var e=n.mc(),i=e.Of(),r=t.yc;e.wa(r),i.wa(r),i.ra(r),i.sa(r)},Jc:function(t){var e=n.mc(),i=e.Of(),o=i.Yu(),s=t.yc;e.af(),i.af(),i.La()&&(i.Na()&&(i.xa(s),i.Da(!1)),i.Ka(o),i.Ca(!1)),i.Gu(),e.ya(s),i.ya(s),i.ra(s),i.sa(s),i.$u(o),n.ec().resume(),n.tc().start();var u=n.Nl().Yt(r.PLAY,t);i.Nu(u.Ec),i.Ou(u.Ec),e.Nu(u.Ec),n.Ic().dispatchEvent(u)},jc:function(t){var e=n.mc(),i=e.Of(),r=t.yc;e.Qu(r),i.Qu(r),i.ra(r),i.sa(r)},Kc:function(t){var e=n.mc().Of(),i=t.yc;e.La()&&e.Na()&&(e.xa(i),e.Da(!1)),e.ra(i),e.sa(i)},Yc:function(t){var e=n.mc(),i=e.Of(),o=t.yc;n.Nl().pl(),n.tc().stop(),i.ra(o);var s=n.Nl().Yt(r.END,t);i.Nu(s.Ec),i.Ou(s.Ec),e.Nu(s.Ec),n.Ic().dispatchEvent(s),i.La()&&i.Na()&&(i.Va(o-i.Ua()),i.Da(!1)),i.Ya(),i.ka(!1)},zc:function(t){var e=n.mc().Of(),i=t.yc;e.La()&&e.Na()&&(e.xa(i),e.Da(!1)),e.ra(i),e.sa(i)},Gc:function(t){var e=n.mc(),i=e.Of(),r=i.Yu(),o=t.yc;n.Nl().ic(),e.Qu(o),i.Qu(o),e.ya(o),i.ya(o),i.$u(r),i.ra(o),i.sa(o),n.ec().resume(),n.tc().start()}})}},3804:(n,t)=>{function e(n,t,e,i){n.cookie=t+\"=\"+e+\"; expires=\"+i.toUTCString()+\"; path=/\"}t.mr=function(n,t){for(var e=0,i=n.split(\"; \");e<i.length;++e){var r=i[e];if(r&&0==r.indexOf(t))return r.substring(t.length+1)}},t.yr=e,t.Sr=function(n,t){e(n,t,\"\",new Date(0))}},8293:n=>{n.exports={Jt:function(n){return!(null==n||\"\"==n||\"0\"==n)}}},9283:(n,t,e)=>{var i,r=e(634),o=e(6397).Cn,s={Kl:1,sc:2,cc:3},u=+new Date;function a(){var n,t,e,i,a,f,c,l,v,d;function _(){c=o.su(),n&&(g(),p())}function p(){var t=c?l:v;i=+new Date,a=i+t,n=o.setInterval((function(){var n=(i=+new Date)-a;a=i+t,Math.abs(n)>d&&h(n>0?s.cc:i<e?s.sc:s.Kl)}),t)}function h(n){for(var t=0;t<f.length;++t)f[t](n)}function g(){n&&(o.clearInterval(n),n=null)}r.extend(this,{zn:function(e){e.Ee()&&(l=e.Ie(),v=e.Pe(),d=e.Ae(),c=o.su(),n||p(),t||(t=!0,o.uu(_)))},xn:function(){g(),t&&(o.au(_),t=!1)},Zc:function(n){f.push(n)},$c:function(n){var t=f.indexOf(n);-1!=t&&f.splice(t,1)},Sc:function(t){var r;n?a<t&&t-a>d?r=s.cc:e>t?r=s.sc:i>t&&(r=s.Kl):e>t&&(r=s.sc),r&&(h(r),n&&(g(),p())),e=t}}),n=null,t=!1,f=[],e=u,c=!0,l=-1,v=-1,d=1e3}a.xe=1e3,a.ENABLED=!0,a.uc=s,a.Wn=function(){return i||(i=new a),i},n.exports=a},3685:n=>{\"use strict\";n.exports=require(\"http\")},5687:n=>{\"use strict\";n.exports=require(\"https\")},2037:n=>{\"use strict\";n.exports=require(\"os\")}},t={},function e(i){var r=t[i];if(r!==undefined)return r.exports;var o=t[i]={exports:{}};return n[i].call(o.exports,o,o.exports,e),o.exports}(3757);var n,t}));";tC.inclusion_file_2="(function(l,k){var p=function(){var d=this;this.mediaStVersion=\"415\";this.instance=[];this.mediaSessions={};this.maxMediaRequests=500;this.ignoreDuplicatedRequest=!0;this.ignoreDuplicatedRequestTimeout=3E3;var f=function(){},p=function(a){a=a.split(\"&\");for(var b=\"?\",c=0,d=a.length;d;)c=parseInt(Math.random()*d),b+=a.splice(c,1)+\"&\",d--;return b.substr(0,b.length-1)},q=function(){for(var a=parseInt(10*Math.random())+5,b=\"\",c=0,d;c<a;c++)d=parseInt(37*Math.random()),b+=\"abcdefghijklmnopqrstuvwxyz-_0123456789\".charAt(d);\n"+"return b};this.getPixelInstance=function(a,b){if(\"undefined\"!==typeof webtrekkUnloadObjects)for(var c=0,d=webtrekkUnloadObjects.length;c<d;c++){var e=webtrekkUnloadObjects[c];if(e.trackId){\"1\"!==e.cookie||e.eid||e.firstParty();\"undefined\"===typeof e.requestObfuscation&&(e.requestObfuscation=!1);\"undefined\"===typeof e.executePlugin&&(e.executePlugin=f);\"undefined\"===typeof e.getPluginConfig&&(e.getPluginConfig=f);if(e.trackId===a)return[e];if(-1!==e.trackId.indexOf(a))return[{trackDomain:b,trackId:a,\n"+"eid:e.eid,pixelSampling:e.pixelSampling,deactivatePixel:e.deactivatePixel,executePlugin:e.executePlugin,getPluginConfig:e.getPluginConfig,requestObfuscation:e.requestObfuscation}]}}return\"undefined\"!==typeof webtrekk&&webtrekk.trackId&&webtrekk.trackDomain?(webtrekk.eid=\"undefined\"!==typeof wt_cookie_eid?wt_cookie_eid:!1,webtrekk.deactivatePixel=\"undefined\"!==typeof wt_deactivatePixel?wt_deactivatePixel:!1,webtrekk.requestObfuscation=!1,webtrekk.executePlugin=f,webtrekk.getPluginConfig=f,[webtrekk]):\n"+"[]};this.getAllPixelInstances=function(){if(\"undefined\"!==typeof webtrekkUnloadObjects){for(var a=0,b=webtrekkUnloadObjects.length;a<b;a++){var c=webtrekkUnloadObjects[a];\"1\"!==c.cookie||c.eid||c.firstParty();\"undefined\"===typeof c.requestObfuscation&&(c.requestObfuscation=!1);\"undefined\"===typeof c.executePlugin&&(c.executePlugin=f);\"undefined\"===typeof c.getPluginConfig&&(c.getPluginConfig=f)}return webtrekkUnloadObjects}return[]};this.escape=function(a){try{return encodeURIComponent(a)}catch(b){return escape(a)}};\n"+"this.getMediaCategory=function(a,b){var c=\"\",h,e;for(e in b)if(h=e+\"\",a||-1===h.indexOf(\"mg\"))c+=\"&\"+h+\"=\"+d.escape(b[h]);return c};this.init=function(a,b,c){c=c?c:0;a&&b&&(d.instance=d.getPixelInstance(b,a),0>=d.instance.length&&(a={trackDomain:a,trackId:b,eid:!1,pixelSampling:c?c:0,deactivatePixel:!1,executePlugin:f,getPluginConfig:f,requestObfuscation:!1},Math&&(Math.random&&0!==parseInt(Math.random()*parseInt(c)))&&(a.deactivatePixel=!0),d.instance.push(a)))};this.getPositionInterval=function(a){var b=\n"+"\"undefined\"!==typeof wt_mediaInterval?parseInt(wt_mediaInterval):60;return\"0\"===a?6E4:10<=parseInt(a)/b?1E3*(parseInt(a)/b):1E4};this.checkPositionTime=function(a){a=d.mediaSessions[a];if(null===a.posTime)return a.posTime=(new Date).getTime(),!0;var b=(new Date).getTime();if(b-a.posTime<a.posInterval)return!1;a.posTime=b;return!0};this.checkMediaRequest=function(a,b,c){if(!d.ignoreDuplicatedRequest)return!0;a=d.mediaSessions[a];b=b+\"_\"+c;if(\"undefined\"===typeof a.sendMediaRequest[b])a.sendMediaRequest[b]=\n"+"(new Date).getTime();else{c=(new Date).getTime();if(c-a.sendMediaRequest[b]<=d.ignoreDuplicatedRequestTimeout)return a.sendMediaRequest[b]=c,!1;a.sendMediaRequest[b]=c}return!0};this.initializeMediaSession=function(a,b,c){\"init\"===c&&\"undefined\"!==typeof d.mediaSessions[a]&&delete d.mediaSessions[a];\"undefined\"===typeof d.mediaSessions[a]&&(d.mediaSessions[a]={posInterval:d.getPositionInterval(b),posTime:null,maxMediaRequests:\"undefined\"!==typeof wt_maxMediaRequests?wt_maxMediaRequests:d.maxMediaRequests,\n"+"sendMediaRequest:{}},d.ignoreDuplicatedRequest=\"undefined\"!==typeof wt_ignoreDuplicatedRequest?wt_ignoreDuplicatedRequest:!0,d.ignoreDuplicatedRequestTimeout=\"undefined\"!==typeof wt_ignoreDuplicatedRequestTimeout?parseInt(wt_ignoreDuplicatedRequestTimeout):3E3)};this.sendinfo_media=function(a,b,c,h,e,m,f,g){if(a&&(0>=d.instance.length&&(\"object\"===typeof webtrekk&&webtrekk.trackDomain&&webtrekk.trackId?d.init(webtrekk.trackDomain,webtrekk.trackId):d.instance=d.getAllPixelInstances()),!(0>=d.instance.length))){if(!h||\n"+"isNaN(parseInt(h)))h=\"0\";var k=\"init\"===b||\"play\"===b,n=\"\";m=\"&bw=\"+(m?m:\"\")+(\"&vol=\"+(f?f:\"\"));m+=\"&mut=\"+(g?g:\"\");m+=\"&pu=\"+d.escape(l.document.location.href.split(\"#\")[0]);if(e)if(\"string\"===typeof e){n=e.split(\";\");e={};for(g=0;g<n.length;g++)f=n[g].split(\"=\"),2<=f.length&&(e[f[0]]=f[1]);n=d.getMediaCategory(k,e)}else\"object\"===typeof e&&(n=d.getMediaCategory(k,e));d.initializeMediaSession(a,h,b);if(!(\"pos\"===b&&!d.checkPositionTime(a)||\"pos\"!==b&&!d.checkMediaRequest(a,b,c)||0>=d.mediaSessions[a].maxMediaRequests&&\n"+"\"eof\"!==b&&\"stop\"!==b))for(d.mediaSessions[a].maxMediaRequests--,\"eof\"!==b&&\"stop\"!==b||delete d.mediaSessions[a],k=0;k<d.instance.length;k++)e=d.instance[k],e.deactivatePixel||(g=\"st,1,\"+d.baseparams()+\"&mi=\"+d.escape(a)+\"&mk=\"+d.escape(b)+\"&mt1=\"+c+\"&mt2=\"+h,e.eid&&(g+=\"&eid=\"+e.eid),\"function\"===typeof e.isUserIdentificationOptOuted_&&e.isUserIdentificationOptOuted_()&&(g+=\"&nc=1\"),g+=n,g+=m,e.executePlugin(e.getPluginConfig(\"media\",\"before\")),d.quicksend(e,g),e.executePlugin(e.getPluginConfig(\"media\",\n"+"\"after\")))}};this.quicksend=function(a,b){if(!a.deactivatePixel){var c=a.trackDomain,h=a.trackId,e=\"wt\";a.requestObfuscation&&(e+=q());b=\"p=\"+d.mediaStVersion+\",\"+b;c=\"https:\/\/\"+c+\"/\"+h+\"/\"+e;c=a.requestObfuscation?c+p(b):c+(\"?\"+b);h={};h.Image=\"function\"!==typeof l.Image?function(){return k.createElement(\"img\")}:l.Image;if(\"undefined\"===typeof f)var f=[];e=f.length;f[e]=new h.Image;f[e].onload=function(){return!1};f[e].src=c}};this.getBrowserHeight=function(){var a=0;try{a=l.innerHeight}catch(b){}if(!a)try{a=\n"+"k.documentElement.clientHeight}catch(c){}if(!a)try{a=k.body.clientHeight}catch(d){}\"undefined\"===typeof a&&(a=-1);return a};this.getBrowserWidth=function(){var a=0;try{a=l.innerWidth}catch(b){}if(!a)try{a=k.documentElement.clientWidth}catch(c){}if(!a)try{a=k.body.clientWidth}catch(d){}\"undefined\"===typeof a&&(a=-1);return a};this.baseparams=function(){var a=screen.width+\"x\"+screen.height+\",\",a=a+((\"Netscape\"!==navigator.appName?screen.colorDepth:screen.pixelDepth)+\",\"),a=a+(navigator.cookieEnabled?\n"+"\"1,\":navigator.cookieEnabled?-1!==k.cookie.indexOf(\"=\")?\"1,\":\"0,\":\"0,\"),a=a+((new Date).getTime()+\",\"),a=a+\"1\",b=d.getBrowserHeight(),c=d.getBrowserWidth();b&&b>screen.height&&(b=screen.height);c&&c>screen.width&&(c=screen.width);return a=a+(\",\"+c+\"x\"+b)+(\",\"+(navigator.javaEnabled()?\"1\":\"0\"))};l.wt_init_media=d.init;l.wt_sendinfo_media=d.sendinfo_media};\"undefined\"===typeof l.webtrekkMediaTracking&&l.webtrekkMediaTracking instanceof p||(l.webtrekkMediaTracking=new p)})(window,document);";

//----------------------------------------------------




//----

tC.extend({executeTag503_3666_59:function(el,p){if(!el||!el.target){el={type:"no_event",target:{}}};if(typeof p=="undefined"){p={};}
tc_array_events=tC.container_3666_59.init_tc_array_events(p);var cact=tC.container_3666_59.cact||window.cact;var cact_container=window.tC_3666_59;var cact_event=el||{};var cact_event_vars=Object.assign({},tc_array_events);var cact_event_attrs=cact_event.target||{};}});tC.extend({executeTag507_3666_59:function(el,p){if(!el||!el.target){el={type:"no_event",target:{}}};if(typeof p=="undefined"){p={};}
tc_array_events=tC.container_3666_59.init_tc_array_events(p);var cact=tC.container_3666_59.cact||window.cact;var cact_container=window.tC_3666_59;var cact_event=el||{};var cact_event_vars=Object.assign({},tc_array_events);var cact_event_attrs=cact_event.target||{};var is_event_allowed=tC.inArray(tc_array_events["event_name"],["eof","seek","pos","play","pause","stop"])>-1;var cookieID=tC.internalvars.udp_cookie_id;if(is_event_allowed&&cookieID!==null){var endpointURL=tC.internalvars.udp_uievent_url;var pageUrn=((document.querySelector('meta[name="srf:urn"]'))?(document.querySelector('meta[name="srf:urn"]').getAttribute('content')):null);var ui_event={"schema_version":"0.1.0","type":"media_event","product":"web","backend_system":"pillarbox","business_unit":tc_array_events["media_bu_distributer"].toLowerCase(),"timestamp":Date.now(),"cookie_id":cookieID,"url":window.location.href,"page_urn":pageUrn,"item_urn":tc_array_events["media_urn"],"content_title_pretty":tc_array_events["media_segment"],"content_publication_datetime":tc_array_events["media_publication_datetime"],"content_category_1":tc_vars["content_category_1"],"show_name":tc_array_events["media_show"],"episode_name":tc_array_events["media_episode"],"action_source":tc_array_events["media_type"],"action_name":tc_array_events["event_name"],"action_value":tc_array_events["media_position"],"action_location":"player","media_segment_length":tc_array_events["media_segment_length"],"media_episode_length":tc_array_events["media_episode_length"],"media_channel":tc_array_events["media_channel_name"],"media_is_geoblocked":tc_array_events["media_is_geoblocked"],"media_is_livestream":tc_array_events["media_is_livestream"],"media_full_length":tc_array_events["media_full_length"],"media_volume":tc_array_events["media_mute"],"media_mute":tc_array_events["media_mute"],"media_embedding_content_page_type":tc_array_events["media_embedding_content_page_type"],"media_embedding_referrer":tc_array_events["media_embedding_referrer"],"media_embedding_url":tC.internalvars.tc_url_embedded,"media_embedding_environment":tc_array_events["media_embedding_environment"],"media_language":tc_array_events["media_language"],"media_assigned_tags":tC.internalvars.media_assigned_tags_wo_seperator,"media_is_tvsvizzera":tc_array_events["media_is_tvsvizzera"],"media_subtitles_on":tc_array_events["media_subtitles_on"],"media_timeshift":tc_array_events["media_timeshift"],"media_camera_angle_name":tc_array_events["media_camera_angle_name"],"media_player_version":tc_array_events["media_player_version"],"media_quality":tc_array_events["media_streaming_quality"],"media_segment_id":tc_array_events["media_segment_id"],"media_episode_id":tc_array_events["media_episode_id"],"media_show_id":tc_array_events["media_show_id"],"media_channel_id":tc_array_events["media_channel_id"],"media_url":tc_array_events["media_url"],"media_thumbnail":tc_array_events["media_thumbnail"],"media_sub_set_id":tc_array_events["media_sub_set_id"],"media_topic_list":tc_array_events["media_topic_list"]};navigator.sendBeacon(endpointURL,JSON.stringify(ui_event));tC.log({tag:'UDP',event_name:tc_array_events["event_name"],player:tc_array_events["media_player_id"],data:ui_event});}}});tC.extend({executeTag509_3666_59:function(el,p){if(!el||!el.target){el={type:"no_event",target:{}}};if(typeof p=="undefined"){p={};}
tc_array_events=tC.container_3666_59.init_tc_array_events(p);var cact=tC.container_3666_59.cact||window.cact;var cact_container=window.tC_3666_59;var cact_event=el||{};var cact_event_vars=Object.assign({},tc_array_events);var cact_event_attrs=cact_event.target||{};if(tc_array_events["event_name"]==="init"){tC.internalvars.mediaPlayerInitComscore();tC.internalvars.mediaPlayerInitComscoreMetaData(tc_array_events["media_player_id"]);tC.log({tag:'comscore',event_name:tc_array_events["event_name"],player:tc_array_events["media_player_id"],playbackSessionId:media_player_comscore.sa[tc_array_events["media_player_id"]].getPlaybackSessionId(),stadardLabels:media_player_comscore.cm[tc_array_events["media_player_id"]].getStandardLabels()});}}});tC.extend({executeTag515_3666_59:function(el,p){if(!el||!el.target){el={type:"no_event",target:{}}};if(typeof p=="undefined"){p={};}
tc_array_events=tC.container_3666_59.init_tc_array_events(p);var cact=tC.container_3666_59.cact||window.cact;var cact_container=window.tC_3666_59;var cact_event=el||{};var cact_event_vars=Object.assign({},tc_array_events);var cact_event_attrs=cact_event.target||{};if(tc_array_events["event_name"]==="play"&&pbw_comscore.sa[tc_array_events["media_player_id"]]){if(tc_array_events["media_is_dvr"]){pbw_comscore.sa[tc_array_events["media_player_id"]].setDvrWindowLength(tc_array_events["media_dvr_window_length"]);pbw_comscore.sa[tc_array_events["media_player_id"]].startFromDvrWindowOffset(tc_array_events["media_dvr_window_offset"]);}
if(tc_array_events["media_is_live"]){pbw_comscore.sa[tc_array_events["media_player_id"]].notifyPlay();}else{pbw_comscore.sa[tc_array_events["media_player_id"]].startFromPosition(tc_array_events["media_position"]*1000);pbw_comscore.sa[tc_array_events["media_player_id"]].notifyPlay();}
tC.log({tag:'comscore',event_name:tc_array_events["event_name"],player:tc_array_events["media_player_id"],data:tc_array_events});}}});tC.extend({executeTag516_3666_59:function(el,p){if(!el||!el.target){el={type:"no_event",target:{}}};if(typeof p=="undefined"){p={};}
tc_array_events=tC.container_3666_59.init_tc_array_events(p);var cact=tC.container_3666_59.cact||window.cact;var cact_container=window.tC_3666_59;var cact_event=el||{};var cact_event_vars=Object.assign({},tc_array_events);var cact_event_attrs=cact_event.target||{};if(tc_array_events["event_name"]==="pause"&&pbw_comscore.sa[tc_array_events["media_player_id"]]){pbw_comscore.sa[tc_array_events["media_player_id"]].notifyPause();if(tc_array_events["media_is_dvr"]){pbw_comscore.sa[tc_array_events["media_player_id"]].setDvrWindowLength(tc_array_events["media_dvr_window_length"]);pbw_comscore.sa[tc_array_events["media_player_id"]].startFromDvrWindowOffset(tc_array_events["media_dvr_window_offset"]);}
tC.log({tag:'comscore',event_name:tc_array_events["event_name"],player:tc_array_events["media_player_id"],data:tc_array_events});}}});tC.extend({executeTag517_3666_59:function(el,p){if(!el||!el.target){el={type:"no_event",target:{}}};if(typeof p=="undefined"){p={};}
tc_array_events=tC.container_3666_59.init_tc_array_events(p);var cact=tC.container_3666_59.cact||window.cact;var cact_container=window.tC_3666_59;var cact_event=el||{};var cact_event_vars=Object.assign({},tc_array_events);var cact_event_attrs=cact_event.target||{};if(tc_array_events["event_name"]==="buffer_start"&&pbw_comscore.sa[tc_array_events["media_player_id"]]){pbw_comscore.sa[tc_array_events["media_player_id"]].startFromPosition(tc_array_events["media_position"]*1000);pbw_comscore.sa[tc_array_events["media_player_id"]].notifyBufferStart();tC.log({tag:'comscore',event_name:tc_array_events["event_name"],player:tc_array_events["media_player_id"],data:tc_array_events});}}});tC.extend({executeTag518_3666_59:function(el,p){if(!el||!el.target){el={type:"no_event",target:{}}};if(typeof p=="undefined"){p={};}
tc_array_events=tC.container_3666_59.init_tc_array_events(p);var cact=tC.container_3666_59.cact||window.cact;var cact_container=window.tC_3666_59;var cact_event=el||{};var cact_event_vars=Object.assign({},tc_array_events);var cact_event_attrs=cact_event.target||{};if(tc_array_events["event_name"]==="buffer_stop"&&pbw_comscore.sa[tc_array_events["media_player_id"]]){pbw_comscore.sa[tc_array_events["media_player_id"]].startFromPosition(tc_array_events["media_position"]*1000);pbw_comscore.sa[tc_array_events["media_player_id"]].notifyBufferStop();tC.log({tag:'comscore',event_name:tc_array_events["event_name"],player:tc_array_events["media_player_id"],data:tc_array_events});}}});tC.extend({executeTag519_3666_59:function(el,p){if(!el||!el.target){el={type:"no_event",target:{}}};if(typeof p=="undefined"){p={};}
tc_array_events=tC.container_3666_59.init_tc_array_events(p);var cact=tC.container_3666_59.cact||window.cact;var cact_container=window.tC_3666_59;var cact_event=el||{};var cact_event_vars=Object.assign({},tc_array_events);var cact_event_attrs=cact_event.target||{};if(tc_array_events["event_name"]==="seek"&&pbw_comscore.sa[tc_array_events["media_player_id"]]){pbw_comscore.sa[tc_array_events["media_player_id"]].notifySeekStart();if(tc_array_events["media_is_dvr"]){pbw_comscore.sa[tc_array_events["media_player_id"]].setDvrWindowLength(tc_array_events["media_dvr_window_length"]);pbw_comscore.sa[tc_array_events["media_player_id"]].startFromDvrWindowOffset(tc_array_events["media_dvr_window_offset"]);}
tC.log({tag:'comscore',event_name:tc_array_events["event_name"],player:tc_array_events["media_player_id"],data:tc_array_events});}}});tC.extend({executeTag521_3666_59:function(el,p){if(!el||!el.target){el={type:"no_event",target:{}}};if(typeof p=="undefined"){p={};}
tc_array_events=tC.container_3666_59.init_tc_array_events(p);var cact=tC.container_3666_59.cact||window.cact;var cact_container=window.tC_3666_59;var cact_event=el||{};var cact_event_vars=Object.assign({},tc_array_events);var cact_event_attrs=cact_event.target||{};if(tc_array_events["event_name"]==="change_playback_rate"&&pbw_comscore.sa[tc_array_events["media_player_id"]]){pbw_comscore.sa[tc_array_events["media_player_id"]].notifyChangePlaybackRate(tc_array_events["media_playback_rate"]);tC.log({tag:'comscore',event_name:tc_array_events["event_name"],player:tc_array_events["media_player_id"],data:tc_array_events});}}});tC.extend({executeTag522_3666_59:function(el,p){if(!el||!el.target){el={type:"no_event",target:{}}};if(typeof p=="undefined"){p={};}
tc_array_events=tC.container_3666_59.init_tc_array_events(p);var cact=tC.container_3666_59.cact||window.cact;var cact_container=window.tC_3666_59;var cact_event=el||{};var cact_event_vars=Object.assign({},tc_array_events);var cact_event_attrs=cact_event.target||{};if(["eof","stop"].includes(tc_array_events["event_name"])&&pbw_comscore.sa[tc_array_events["media_player_id"]]){pbw_comscore.sa[tc_array_events["media_player_id"]].notifyEnd();tC.internalvars.mediaPlayerInitComscoreMetaData(tc_array_events["media_player_id"]);tC.log({tag:'comscore',event_name:tc_array_events["event_name"],player:tc_array_events["media_player_id"],data:tc_array_events});}}});tC.extend({executeTag526_3666_59:function(el,p){if(!el||!el.target){el={type:"no_event",target:{}}};if(typeof p=="undefined"){p={};}
tc_array_events=tC.container_3666_59.init_tc_array_events(p);var cact=tC.container_3666_59.cact||window.cact;var cact_container=window.tC_3666_59;var cact_event=el||{};var cact_event_vars=Object.assign({},tc_array_events);var cact_event_attrs=cact_event.target||{};if(tc_array_events["event_name"]==="play"){var ck38=tC.internalvars.languageFormat(tc_array_events["media_audio_track"]);var ck39=tC.internalvars.languageFormat(tc_array_events["media_subtitle_selection"]);var media_id=tc_array_events["media_urn"];var media_length=tc_array_events["media_episode_length"];var wt_fields={"mg1":tc_array_events["media_segment_id"],"mg2":tc_array_events["media_bu_owner"],"mg3":tc_array_events["media_segment_id"],"mg4":tc_array_events["media_special"],"mg5":tc_array_events["media_episode_id"],"mg6":tc_array_events["media_episode"],"mg7":tc_array_events["media_show_id"],"mg8":tc_array_events["media_show"],"mg9":tc_array_events["media_channel_id"],"mg10":tc_array_events["media_channel_name"],"mg11":tc_array_events["media_tv_id"],"mg12":tc_array_events["media_publication_datetime"],"mg13":tc_array_events["media_is_geoblocked"],"mg14":tc_array_events["media_url"],"mg15":tc_array_events["media_thumbnail"],"mg16":tc_array_events["media_type"],"mg17":tc_array_events["media_episode_length"],"mg18":tc_array_events["media_is_livestream"],"mg19":tc_array_events["media_segment_length"],"mg20":tc_array_events["media_full_length"],"mg21":tc_array_events["media_is_web_only"],"mg22":tc_array_events["media_joker1"],"mg23":tc_array_events["media_joker2"],"mg24":tc_array_events["media_joker3"],"mg25":tc_array_events["media_livestream_encoder"],"ck1":tc_array_events["media_episode"],"ck2":tc_array_events["media_show"],"ck3":tc_array_events["media_segment_id"],"ck4":tc_array_events["media_playback_rate"],"ck5":tc_array_events["media_chromecast_selected"],"ck6":tc_array_events["media_bu_owner"],"ck7":tc_array_events["media_content_group"],"ck8":tc_array_events["media_episode_id"],"ck11":tc_vars["navigation_app_site_name"],"ck12":tc_array_events["media_embedding_content_page_type"],"ck13":tc_array_events["media_embedding_referrer"],"ck14":tc_array_events["media_embedding_url"],"ck15":tc_array_events["media_embedding_environment"],"ck16":tc_array_events["media_language"],"ck17":tc_array_events["media_publication_datetime"],"ck18":tc_array_events["media_publication_time"],"ck19":tc_array_events["media_since_publication_d"],"ck20":tc_array_events["media_since_publication_h"],"ck21":tC.internalvars.media_assigned_tags_wo_seperator,"ck22":tc_array_events["media_is_tvsvizzera"],"ck23":tc_array_events["media_player_name"],"ck24":tc_array_events["media_subtitles_on"],"ck25":tc_array_events["media_timeshift"],"ck26":tc_array_events["media_camera_angle_name"],"ck28":tc_array_events["media_player_version"],"ck29":tc_array_events["media_player_display"],"ck30":tc_array_events["media_quality"],"ck34":tc_array_events["media_is_livestream"],"ck38":ck38,"ck39":ck39,"ck46":tc_array_events["media_signlanguage_on"],"ck47":tc_array_events["media_audiodescription_on"]};wt_sendinfo_media(tc_array_events["media_urn"],tc_array_events["event_name"],tc_array_events["media_position"],media_length,wt_fields,tc_array_events["media_bandwidth"],tc_array_events["media_volume"],tc_array_events["media_mute"]);tC.log({tag:'webtrekk',event_name:tc_array_events["event_name"],player:tc_array_events["media_player_id"],data:tc_array_events});}}});tC.extend({executeTag527_3666_59:function(el,p){if(!el||!el.target){el={type:"no_event",target:{}}};if(typeof p=="undefined"){p={};}
tc_array_events=tC.container_3666_59.init_tc_array_events(p);var cact=tC.container_3666_59.cact||window.cact;var cact_container=window.tC_3666_59;var cact_event=el||{};var cact_event_vars=Object.assign({},tc_array_events);var cact_event_attrs=cact_event.target||{};var is_event_allowed=tC.inArray(tc_array_events["event_name"],["pause","seek","pos","uptime","stop","eof"])>-1;if(is_event_allowed){var wt_fields={"ck38":tC.internalvars.languageFormat(tc_array_events["media_audio_track"]),"ck39":tC.internalvars.languageFormat(tc_array_events["media_subtitle_selection"])};wt_sendinfo_media(tc_array_events["media_urn"],tc_array_events["event_name"],tc_array_events["media_position"],tc_array_events["media_episode_length"],wt_fields,tc_array_events["media_bandwidth"],tc_array_events["media_volume"],tc_array_events["media_mute"]);tC.log({tag:'webtrekk',event_name:tc_array_events["event_name"],player:tc_array_events["media_player_id"],data:tc_array_events});}}});tC.extend({executeTag532_3666_59:function(el,p){if(!el||!el.target){el={type:"no_event",target:{}}};if(typeof p=="undefined"){p={};}
tc_array_events=tC.container_3666_59.init_tc_array_events(p);var cact=tC.container_3666_59.cact||window.cact;var cact_container=window.tC_3666_59;var cact_event=el||{};var cact_event_vars=Object.assign({},tc_array_events);var cact_event_attrs=cact_event.target||{};if(tc_array_events["event_name"]==="init"){var player=document.getElementById(tc_array_events["media_player_id"]).player
window._cbv.push(player);tC.log({tag:'chartbeat',event_name:tc_array_events["event_name"],player:tc_array_events["media_player_id"],data:tc_array_events});}}});tC.launchTag(513,'Comscore - load library',114,3666,59,73);if(!window.ns_){eval(tC.inclusion_file_1);}
tC.launchTag(525,'Webtrekk - Media Tracking - Init',114,3666,59,73);eval(tC.inclusion_file_2);if(tc_vars["navigation_environment"]=='test'||tc_vars["navigation_environment"]=='preprod'||tc_vars["navigation_environment"]=='stage'){var trackId='845874508733847';}
else{var trackId='292330999892453';}
wt_init_media('data.srf.ch',trackId,'1');tC.launchTag(543,'Charbeat - Load Library',26,3666,59,73);var SRGChartbeatStrategy=tC.internalvars.SRGChartbeatStrategy;window['_cbv_strategies']=window['_cbv_strategies']||[];window._cbv=window._cbv||[];var hasSRGStrategy=window['_cbv_strategies'].findIndex(function(s){return s.name===SRGChartbeatStrategy.name})>-1;if(!hasSRGStrategy){window['_cbv_strategies'].push(SRGChartbeatStrategy);}
var _sf_async_config=window._sf_async_config=(window._sf_async_config||{});_sf_async_config.uid=tC.internalvars.chartbeat_account_id;_sf_async_config.domain=tC.internalvars.Chartbeat_domain
_sf_async_config.useCanonical=false;_sf_async_config.useCanonicalDomain=false;_sf_async_config.sections=tC.internalvars.Chartbeat_rootSectio;_sf_async_config.authors=tC.internalvars.Chartbeat_authors;if(!document.getElementById('chartbeat_video_sdk')){var e=document.createElement('script');var n=document.getElementsByTagName('script')[0];e.id="chartbeat_video_sdk";e.type='text/javascript';e.async=true;e.src='//static.chartbeat.com/js/chartbeat_video.js';n.parentNode.insertBefore(e,n);}
tC.onDomReady(function(){tC.container_3666_59.eventlisteners();tC.eventTarget.dispatchEvent('container-ready');tC.eventTarget.dispatchEvent('container_3666_59_ready');});