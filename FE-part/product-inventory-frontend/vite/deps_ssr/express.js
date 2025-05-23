import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  require_vary
} from "./chunk-AAUJVH65.js";
import {
  require_body_parser,
  require_content_type,
  require_depd,
  require_destroy,
  require_http_errors,
  require_lib,
  require_mime_types,
  require_on_finished,
  require_setprototypeof,
  require_statuses,
  require_type_is,
  require_unpipe
} from "./chunk-563YCVCO.js";
import {
  __commonJS,
  __require
} from "./chunk-YHCV7DAQ.js";

// node_modules/merge-descriptors/index.js
var require_merge_descriptors = __commonJS({
  "node_modules/merge-descriptors/index.js"(exports, module) {
    "use strict";
    module.exports = merge;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function merge(dest, src, redefine) {
      if (!dest) {
        throw new TypeError("argument dest is required");
      }
      if (!src) {
        throw new TypeError("argument src is required");
      }
      if (redefine === void 0) {
        redefine = true;
      }
      Object.getOwnPropertyNames(src).forEach(function forEachOwnPropertyName(name) {
        if (!redefine && hasOwnProperty.call(dest, name)) {
          return;
        }
        var descriptor = Object.getOwnPropertyDescriptor(src, name);
        Object.defineProperty(dest, name, descriptor);
      });
      return dest;
    }
  }
});

// node_modules/finalhandler/node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/finalhandler/node_modules/ms/index.js"(exports, module) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var y = d * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isNaN(val) === false) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      if (ms >= d) {
        return Math.round(ms / d) + "d";
      }
      if (ms >= h) {
        return Math.round(ms / h) + "h";
      }
      if (ms >= m) {
        return Math.round(ms / m) + "m";
      }
      if (ms >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      return plural(ms, d, "day") || plural(ms, h, "hour") || plural(ms, m, "minute") || plural(ms, s, "second") || ms + " ms";
    }
    function plural(ms, n, name) {
      if (ms < n) {
        return;
      }
      if (ms < n * 1.5) {
        return Math.floor(ms / n) + " " + name;
      }
      return Math.ceil(ms / n) + " " + name + "s";
    }
  }
});

// node_modules/finalhandler/node_modules/debug/src/debug.js
var require_debug = __commonJS({
  "node_modules/finalhandler/node_modules/debug/src/debug.js"(exports, module) {
    exports = module.exports = createDebug.debug = createDebug["default"] = createDebug;
    exports.coerce = coerce;
    exports.disable = disable;
    exports.enable = enable;
    exports.enabled = enabled;
    exports.humanize = require_ms();
    exports.names = [];
    exports.skips = [];
    exports.formatters = {};
    var prevTime;
    function selectColor(namespace) {
      var hash = 0, i;
      for (i in namespace) {
        hash = (hash << 5) - hash + namespace.charCodeAt(i);
        hash |= 0;
      }
      return exports.colors[Math.abs(hash) % exports.colors.length];
    }
    function createDebug(namespace) {
      function debug() {
        if (!debug.enabled) return;
        var self = debug;
        var curr = +/* @__PURE__ */ new Date();
        var ms = curr - (prevTime || curr);
        self.diff = ms;
        self.prev = prevTime;
        self.curr = curr;
        prevTime = curr;
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        args[0] = exports.coerce(args[0]);
        if ("string" !== typeof args[0]) {
          args.unshift("%O");
        }
        var index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
          if (match === "%%") return match;
          index++;
          var formatter = exports.formatters[format];
          if ("function" === typeof formatter) {
            var val = args[index];
            match = formatter.call(self, val);
            args.splice(index, 1);
            index--;
          }
          return match;
        });
        exports.formatArgs.call(self, args);
        var logFn = debug.log || exports.log || console.log.bind(console);
        logFn.apply(self, args);
      }
      debug.namespace = namespace;
      debug.enabled = exports.enabled(namespace);
      debug.useColors = exports.useColors();
      debug.color = selectColor(namespace);
      if ("function" === typeof exports.init) {
        exports.init(debug);
      }
      return debug;
    }
    function enable(namespaces) {
      exports.save(namespaces);
      exports.names = [];
      exports.skips = [];
      var split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
      var len = split.length;
      for (var i = 0; i < len; i++) {
        if (!split[i]) continue;
        namespaces = split[i].replace(/\*/g, ".*?");
        if (namespaces[0] === "-") {
          exports.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
        } else {
          exports.names.push(new RegExp("^" + namespaces + "$"));
        }
      }
    }
    function disable() {
      exports.enable("");
    }
    function enabled(name) {
      var i, len;
      for (i = 0, len = exports.skips.length; i < len; i++) {
        if (exports.skips[i].test(name)) {
          return false;
        }
      }
      for (i = 0, len = exports.names.length; i < len; i++) {
        if (exports.names[i].test(name)) {
          return true;
        }
      }
      return false;
    }
    function coerce(val) {
      if (val instanceof Error) return val.stack || val.message;
      return val;
    }
  }
});

// node_modules/finalhandler/node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/finalhandler/node_modules/debug/src/browser.js"(exports, module) {
    exports = module.exports = require_debug();
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : localstorage();
    exports.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"];
    function useColors() {
      if (typeof window !== "undefined" && window.process && window.process.type === "renderer") {
        return true;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    exports.formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (err) {
        return "[UnexpectedJSONParseError]: " + err.message;
      }
    };
    function formatArgs(args) {
      var useColors2 = this.useColors;
      args[0] = (useColors2 ? "%c" : "") + this.namespace + (useColors2 ? " %c" : " ") + args[0] + (useColors2 ? "%c " : " ") + "+" + exports.humanize(this.diff);
      if (!useColors2) return;
      var c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      var index = 0;
      var lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, function(match) {
        if ("%%" === match) return;
        index++;
        if ("%c" === match) {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    function log() {
      return "object" === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
    }
    function save(namespaces) {
      try {
        if (null == namespaces) {
          exports.storage.removeItem("debug");
        } else {
          exports.storage.debug = namespaces;
        }
      } catch (e) {
      }
    }
    function load() {
      var r;
      try {
        r = exports.storage.debug;
      } catch (e) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    exports.enable(load());
    function localstorage() {
      try {
        return window.localStorage;
      } catch (e) {
      }
    }
  }
});

// node_modules/finalhandler/node_modules/debug/src/node.js
var require_node = __commonJS({
  "node_modules/finalhandler/node_modules/debug/src/node.js"(exports, module) {
    var tty = __require("tty");
    var util = __require("util");
    exports = module.exports = require_debug();
    exports.init = init;
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.colors = [6, 2, 3, 4, 5, 1];
    exports.inspectOpts = Object.keys(process.env).filter(function(key) {
      return /^debug_/i.test(key);
    }).reduce(function(obj, key) {
      var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, function(_, k) {
        return k.toUpperCase();
      });
      var val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
      else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
      else if (val === "null") val = null;
      else val = Number(val);
      obj[prop] = val;
      return obj;
    }, {});
    var fd = parseInt(process.env.DEBUG_FD, 10) || 2;
    if (1 !== fd && 2 !== fd) {
      util.deprecate(function() {
      }, "except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)")();
    }
    var stream = 1 === fd ? process.stdout : 2 === fd ? process.stderr : createWritableStdioStream(fd);
    function useColors() {
      return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(fd);
    }
    exports.formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map(function(str) {
        return str.trim();
      }).join(" ");
    };
    exports.formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
    function formatArgs(args) {
      var name = this.namespace;
      var useColors2 = this.useColors;
      if (useColors2) {
        var c = this.color;
        var prefix = "  \x1B[3" + c + ";1m" + name + " \x1B[0m";
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push("\x1B[3" + c + "m+" + exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = (/* @__PURE__ */ new Date()).toUTCString() + " " + name + " " + args[0];
      }
    }
    function log() {
      return stream.write(util.format.apply(util, arguments) + "\n");
    }
    function save(namespaces) {
      if (null == namespaces) {
        delete process.env.DEBUG;
      } else {
        process.env.DEBUG = namespaces;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function createWritableStdioStream(fd2) {
      var stream2;
      var tty_wrap = process.binding("tty_wrap");
      switch (tty_wrap.guessHandleType(fd2)) {
        case "TTY":
          stream2 = new tty.WriteStream(fd2);
          stream2._type = "tty";
          if (stream2._handle && stream2._handle.unref) {
            stream2._handle.unref();
          }
          break;
        case "FILE":
          var fs = __require("fs");
          stream2 = new fs.SyncWriteStream(fd2, {
            autoClose: false
          });
          stream2._type = "fs";
          break;
        case "PIPE":
        case "TCP":
          var net = __require("net");
          stream2 = new net.Socket({
            fd: fd2,
            readable: false,
            writable: true
          });
          stream2.readable = false;
          stream2.read = null;
          stream2._type = "pipe";
          if (stream2._handle && stream2._handle.unref) {
            stream2._handle.unref();
          }
          break;
        default:
          throw new Error("Implement me. Unknown stream file type!");
      }
      stream2.fd = fd2;
      stream2._isStdio = true;
      return stream2;
    }
    function init(debug) {
      debug.inspectOpts = {};
      var keys = Object.keys(exports.inspectOpts);
      for (var i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
      }
    }
    exports.enable(load());
  }
});

// node_modules/finalhandler/node_modules/debug/src/index.js
var require_src = __commonJS({
  "node_modules/finalhandler/node_modules/debug/src/index.js"(exports, module) {
    if (typeof process !== "undefined" && process.type === "renderer") {
      module.exports = require_browser();
    } else {
      module.exports = require_node();
    }
  }
});

// node_modules/encodeurl/index.js
var require_encodeurl = __commonJS({
  "node_modules/encodeurl/index.js"(exports, module) {
    "use strict";
    module.exports = encodeUrl;
    var ENCODE_CHARS_REGEXP = /(?:[^\x21\x23-\x3B\x3D\x3F-\x5F\x61-\x7A\x7C\x7E]|%(?:[^0-9A-Fa-f]|[0-9A-Fa-f][^0-9A-Fa-f]|$))+/g;
    var UNMATCHED_SURROGATE_PAIR_REGEXP = /(^|[^\uD800-\uDBFF])[\uDC00-\uDFFF]|[\uD800-\uDBFF]([^\uDC00-\uDFFF]|$)/g;
    var UNMATCHED_SURROGATE_PAIR_REPLACE = "$1�$2";
    function encodeUrl(url) {
      return String(url).replace(UNMATCHED_SURROGATE_PAIR_REGEXP, UNMATCHED_SURROGATE_PAIR_REPLACE).replace(ENCODE_CHARS_REGEXP, encodeURI);
    }
  }
});

// node_modules/escape-html/index.js
var require_escape_html = __commonJS({
  "node_modules/escape-html/index.js"(exports, module) {
    "use strict";
    var matchHtmlRegExp = /["'&<>]/;
    module.exports = escapeHtml;
    function escapeHtml(string) {
      var str = "" + string;
      var match = matchHtmlRegExp.exec(str);
      if (!match) {
        return str;
      }
      var escape;
      var html = "";
      var index = 0;
      var lastIndex = 0;
      for (index = match.index; index < str.length; index++) {
        switch (str.charCodeAt(index)) {
          case 34:
            escape = "&quot;";
            break;
          case 38:
            escape = "&amp;";
            break;
          case 39:
            escape = "&#39;";
            break;
          case 60:
            escape = "&lt;";
            break;
          case 62:
            escape = "&gt;";
            break;
          default:
            continue;
        }
        if (lastIndex !== index) {
          html += str.substring(lastIndex, index);
        }
        lastIndex = index + 1;
        html += escape;
      }
      return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
    }
  }
});

// node_modules/parseurl/index.js
var require_parseurl = __commonJS({
  "node_modules/parseurl/index.js"(exports, module) {
    "use strict";
    var url = __require("url");
    var parse = url.parse;
    var Url = url.Url;
    module.exports = parseurl;
    module.exports.original = originalurl;
    function parseurl(req) {
      var url2 = req.url;
      if (url2 === void 0) {
        return void 0;
      }
      var parsed = req._parsedUrl;
      if (fresh(url2, parsed)) {
        return parsed;
      }
      parsed = fastparse(url2);
      parsed._raw = url2;
      return req._parsedUrl = parsed;
    }
    function originalurl(req) {
      var url2 = req.originalUrl;
      if (typeof url2 !== "string") {
        return parseurl(req);
      }
      var parsed = req._parsedOriginalUrl;
      if (fresh(url2, parsed)) {
        return parsed;
      }
      parsed = fastparse(url2);
      parsed._raw = url2;
      return req._parsedOriginalUrl = parsed;
    }
    function fastparse(str) {
      if (typeof str !== "string" || str.charCodeAt(0) !== 47) {
        return parse(str);
      }
      var pathname = str;
      var query = null;
      var search = null;
      for (var i = 1; i < str.length; i++) {
        switch (str.charCodeAt(i)) {
          case 63:
            if (search === null) {
              pathname = str.substring(0, i);
              query = str.substring(i + 1);
              search = str.substring(i);
            }
            break;
          case 9:
          /* \t */
          case 10:
          /* \n */
          case 12:
          /* \f */
          case 13:
          /* \r */
          case 32:
          /*    */
          case 35:
          /* #  */
          case 160:
          case 65279:
            return parse(str);
        }
      }
      var url2 = Url !== void 0 ? new Url() : {};
      url2.path = str;
      url2.href = str;
      url2.pathname = pathname;
      if (search !== null) {
        url2.query = query;
        url2.search = search;
      }
      return url2;
    }
    function fresh(url2, parsedUrl) {
      return typeof parsedUrl === "object" && parsedUrl !== null && (Url === void 0 || parsedUrl instanceof Url) && parsedUrl._raw === url2;
    }
  }
});

// node_modules/finalhandler/index.js
var require_finalhandler = __commonJS({
  "node_modules/finalhandler/index.js"(exports, module) {
    "use strict";
    var debug = require_src()("finalhandler");
    var encodeUrl = require_encodeurl();
    var escapeHtml = require_escape_html();
    var onFinished = require_on_finished();
    var parseUrl = require_parseurl();
    var statuses = require_statuses();
    var unpipe = require_unpipe();
    var DOUBLE_SPACE_REGEXP = /\x20{2}/g;
    var NEWLINE_REGEXP = /\n/g;
    var defer = typeof setImmediate === "function" ? setImmediate : function(fn) {
      process.nextTick(fn.bind.apply(fn, arguments));
    };
    var isFinished = onFinished.isFinished;
    function createHtmlDocument(message) {
      var body = escapeHtml(message).replace(NEWLINE_REGEXP, "<br>").replace(DOUBLE_SPACE_REGEXP, " &nbsp;");
      return '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>Error</title>\n</head>\n<body>\n<pre>' + body + "</pre>\n</body>\n</html>\n";
    }
    module.exports = finalhandler;
    function finalhandler(req, res, options) {
      var opts = options || {};
      var env = opts.env || process.env.NODE_ENV || "development";
      var onerror = opts.onerror;
      return function(err) {
        var headers;
        var msg;
        var status;
        if (!err && headersSent(res)) {
          debug("cannot 404 after headers sent");
          return;
        }
        if (err) {
          status = getErrorStatusCode(err);
          if (status === void 0) {
            status = getResponseStatusCode(res);
          } else {
            headers = getErrorHeaders(err);
          }
          msg = getErrorMessage(err, status, env);
        } else {
          status = 404;
          msg = "Cannot " + req.method + " " + encodeUrl(getResourceName(req));
        }
        debug("default %s", status);
        if (err && onerror) {
          defer(onerror, err, req, res);
        }
        if (headersSent(res)) {
          debug("cannot %d after headers sent", status);
          if (req.socket) {
            req.socket.destroy();
          }
          return;
        }
        send(req, res, status, headers, msg);
      };
    }
    function getErrorHeaders(err) {
      if (!err.headers || typeof err.headers !== "object") {
        return void 0;
      }
      var headers = /* @__PURE__ */ Object.create(null);
      var keys = Object.keys(err.headers);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        headers[key] = err.headers[key];
      }
      return headers;
    }
    function getErrorMessage(err, status, env) {
      var msg;
      if (env !== "production") {
        msg = err.stack;
        if (!msg && typeof err.toString === "function") {
          msg = err.toString();
        }
      }
      return msg || statuses.message[status];
    }
    function getErrorStatusCode(err) {
      if (typeof err.status === "number" && err.status >= 400 && err.status < 600) {
        return err.status;
      }
      if (typeof err.statusCode === "number" && err.statusCode >= 400 && err.statusCode < 600) {
        return err.statusCode;
      }
      return void 0;
    }
    function getResourceName(req) {
      try {
        return parseUrl.original(req).pathname;
      } catch (e) {
        return "resource";
      }
    }
    function getResponseStatusCode(res) {
      var status = res.statusCode;
      if (typeof status !== "number" || status < 400 || status > 599) {
        status = 500;
      }
      return status;
    }
    function headersSent(res) {
      return typeof res.headersSent !== "boolean" ? Boolean(res._header) : res.headersSent;
    }
    function send(req, res, status, headers, message) {
      function write() {
        var body = createHtmlDocument(message);
        res.statusCode = status;
        if (req.httpVersionMajor < 2) {
          res.statusMessage = statuses.message[status];
        }
        res.removeHeader("Content-Encoding");
        res.removeHeader("Content-Language");
        res.removeHeader("Content-Range");
        setHeaders(res, headers);
        res.setHeader("Content-Security-Policy", "default-src 'none'");
        res.setHeader("X-Content-Type-Options", "nosniff");
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.setHeader("Content-Length", Buffer.byteLength(body, "utf8"));
        if (req.method === "HEAD") {
          res.end();
          return;
        }
        res.end(body, "utf8");
      }
      if (isFinished(req)) {
        write();
        return;
      }
      unpipe(req);
      onFinished(req, write);
      req.resume();
    }
    function setHeaders(res, headers) {
      if (!headers) {
        return;
      }
      var keys = Object.keys(headers);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        res.setHeader(key, headers[key]);
      }
    }
  }
});

// node_modules/express/node_modules/ms/index.js
var require_ms2 = __commonJS({
  "node_modules/express/node_modules/ms/index.js"(exports, module) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var y = d * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isNaN(val) === false) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      if (ms >= d) {
        return Math.round(ms / d) + "d";
      }
      if (ms >= h) {
        return Math.round(ms / h) + "h";
      }
      if (ms >= m) {
        return Math.round(ms / m) + "m";
      }
      if (ms >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      return plural(ms, d, "day") || plural(ms, h, "hour") || plural(ms, m, "minute") || plural(ms, s, "second") || ms + " ms";
    }
    function plural(ms, n, name) {
      if (ms < n) {
        return;
      }
      if (ms < n * 1.5) {
        return Math.floor(ms / n) + " " + name;
      }
      return Math.ceil(ms / n) + " " + name + "s";
    }
  }
});

// node_modules/express/node_modules/debug/src/debug.js
var require_debug2 = __commonJS({
  "node_modules/express/node_modules/debug/src/debug.js"(exports, module) {
    exports = module.exports = createDebug.debug = createDebug["default"] = createDebug;
    exports.coerce = coerce;
    exports.disable = disable;
    exports.enable = enable;
    exports.enabled = enabled;
    exports.humanize = require_ms2();
    exports.names = [];
    exports.skips = [];
    exports.formatters = {};
    var prevTime;
    function selectColor(namespace) {
      var hash = 0, i;
      for (i in namespace) {
        hash = (hash << 5) - hash + namespace.charCodeAt(i);
        hash |= 0;
      }
      return exports.colors[Math.abs(hash) % exports.colors.length];
    }
    function createDebug(namespace) {
      function debug() {
        if (!debug.enabled) return;
        var self = debug;
        var curr = +/* @__PURE__ */ new Date();
        var ms = curr - (prevTime || curr);
        self.diff = ms;
        self.prev = prevTime;
        self.curr = curr;
        prevTime = curr;
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        args[0] = exports.coerce(args[0]);
        if ("string" !== typeof args[0]) {
          args.unshift("%O");
        }
        var index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
          if (match === "%%") return match;
          index++;
          var formatter = exports.formatters[format];
          if ("function" === typeof formatter) {
            var val = args[index];
            match = formatter.call(self, val);
            args.splice(index, 1);
            index--;
          }
          return match;
        });
        exports.formatArgs.call(self, args);
        var logFn = debug.log || exports.log || console.log.bind(console);
        logFn.apply(self, args);
      }
      debug.namespace = namespace;
      debug.enabled = exports.enabled(namespace);
      debug.useColors = exports.useColors();
      debug.color = selectColor(namespace);
      if ("function" === typeof exports.init) {
        exports.init(debug);
      }
      return debug;
    }
    function enable(namespaces) {
      exports.save(namespaces);
      exports.names = [];
      exports.skips = [];
      var split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
      var len = split.length;
      for (var i = 0; i < len; i++) {
        if (!split[i]) continue;
        namespaces = split[i].replace(/\*/g, ".*?");
        if (namespaces[0] === "-") {
          exports.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
        } else {
          exports.names.push(new RegExp("^" + namespaces + "$"));
        }
      }
    }
    function disable() {
      exports.enable("");
    }
    function enabled(name) {
      var i, len;
      for (i = 0, len = exports.skips.length; i < len; i++) {
        if (exports.skips[i].test(name)) {
          return false;
        }
      }
      for (i = 0, len = exports.names.length; i < len; i++) {
        if (exports.names[i].test(name)) {
          return true;
        }
      }
      return false;
    }
    function coerce(val) {
      if (val instanceof Error) return val.stack || val.message;
      return val;
    }
  }
});

// node_modules/express/node_modules/debug/src/browser.js
var require_browser2 = __commonJS({
  "node_modules/express/node_modules/debug/src/browser.js"(exports, module) {
    exports = module.exports = require_debug2();
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : localstorage();
    exports.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"];
    function useColors() {
      if (typeof window !== "undefined" && window.process && window.process.type === "renderer") {
        return true;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    exports.formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (err) {
        return "[UnexpectedJSONParseError]: " + err.message;
      }
    };
    function formatArgs(args) {
      var useColors2 = this.useColors;
      args[0] = (useColors2 ? "%c" : "") + this.namespace + (useColors2 ? " %c" : " ") + args[0] + (useColors2 ? "%c " : " ") + "+" + exports.humanize(this.diff);
      if (!useColors2) return;
      var c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      var index = 0;
      var lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, function(match) {
        if ("%%" === match) return;
        index++;
        if ("%c" === match) {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    function log() {
      return "object" === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
    }
    function save(namespaces) {
      try {
        if (null == namespaces) {
          exports.storage.removeItem("debug");
        } else {
          exports.storage.debug = namespaces;
        }
      } catch (e) {
      }
    }
    function load() {
      var r;
      try {
        r = exports.storage.debug;
      } catch (e) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    exports.enable(load());
    function localstorage() {
      try {
        return window.localStorage;
      } catch (e) {
      }
    }
  }
});

// node_modules/express/node_modules/debug/src/node.js
var require_node2 = __commonJS({
  "node_modules/express/node_modules/debug/src/node.js"(exports, module) {
    var tty = __require("tty");
    var util = __require("util");
    exports = module.exports = require_debug2();
    exports.init = init;
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.colors = [6, 2, 3, 4, 5, 1];
    exports.inspectOpts = Object.keys(process.env).filter(function(key) {
      return /^debug_/i.test(key);
    }).reduce(function(obj, key) {
      var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, function(_, k) {
        return k.toUpperCase();
      });
      var val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
      else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
      else if (val === "null") val = null;
      else val = Number(val);
      obj[prop] = val;
      return obj;
    }, {});
    var fd = parseInt(process.env.DEBUG_FD, 10) || 2;
    if (1 !== fd && 2 !== fd) {
      util.deprecate(function() {
      }, "except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)")();
    }
    var stream = 1 === fd ? process.stdout : 2 === fd ? process.stderr : createWritableStdioStream(fd);
    function useColors() {
      return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(fd);
    }
    exports.formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map(function(str) {
        return str.trim();
      }).join(" ");
    };
    exports.formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
    function formatArgs(args) {
      var name = this.namespace;
      var useColors2 = this.useColors;
      if (useColors2) {
        var c = this.color;
        var prefix = "  \x1B[3" + c + ";1m" + name + " \x1B[0m";
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push("\x1B[3" + c + "m+" + exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = (/* @__PURE__ */ new Date()).toUTCString() + " " + name + " " + args[0];
      }
    }
    function log() {
      return stream.write(util.format.apply(util, arguments) + "\n");
    }
    function save(namespaces) {
      if (null == namespaces) {
        delete process.env.DEBUG;
      } else {
        process.env.DEBUG = namespaces;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function createWritableStdioStream(fd2) {
      var stream2;
      var tty_wrap = process.binding("tty_wrap");
      switch (tty_wrap.guessHandleType(fd2)) {
        case "TTY":
          stream2 = new tty.WriteStream(fd2);
          stream2._type = "tty";
          if (stream2._handle && stream2._handle.unref) {
            stream2._handle.unref();
          }
          break;
        case "FILE":
          var fs = __require("fs");
          stream2 = new fs.SyncWriteStream(fd2, {
            autoClose: false
          });
          stream2._type = "fs";
          break;
        case "PIPE":
        case "TCP":
          var net = __require("net");
          stream2 = new net.Socket({
            fd: fd2,
            readable: false,
            writable: true
          });
          stream2.readable = false;
          stream2.read = null;
          stream2._type = "pipe";
          if (stream2._handle && stream2._handle.unref) {
            stream2._handle.unref();
          }
          break;
        default:
          throw new Error("Implement me. Unknown stream file type!");
      }
      stream2.fd = fd2;
      stream2._isStdio = true;
      return stream2;
    }
    function init(debug) {
      debug.inspectOpts = {};
      var keys = Object.keys(exports.inspectOpts);
      for (var i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
      }
    }
    exports.enable(load());
  }
});

// node_modules/express/node_modules/debug/src/index.js
var require_src2 = __commonJS({
  "node_modules/express/node_modules/debug/src/index.js"(exports, module) {
    if (typeof process !== "undefined" && process.type === "renderer") {
      module.exports = require_browser2();
    } else {
      module.exports = require_node2();
    }
  }
});

// node_modules/array-flatten/array-flatten.js
var require_array_flatten = __commonJS({
  "node_modules/array-flatten/array-flatten.js"(exports, module) {
    "use strict";
    module.exports = arrayFlatten;
    function flattenWithDepth(array, result, depth) {
      for (var i = 0; i < array.length; i++) {
        var value = array[i];
        if (depth > 0 && Array.isArray(value)) {
          flattenWithDepth(value, result, depth - 1);
        } else {
          result.push(value);
        }
      }
      return result;
    }
    function flattenForever(array, result) {
      for (var i = 0; i < array.length; i++) {
        var value = array[i];
        if (Array.isArray(value)) {
          flattenForever(value, result);
        } else {
          result.push(value);
        }
      }
      return result;
    }
    function arrayFlatten(array, depth) {
      if (depth == null) {
        return flattenForever(array, []);
      }
      return flattenWithDepth(array, [], depth);
    }
  }
});

// node_modules/path-to-regexp/index.js
var require_path_to_regexp = __commonJS({
  "node_modules/path-to-regexp/index.js"(exports, module) {
    module.exports = pathToRegexp;
    var MATCHING_GROUP_REGEXP = /\\.|\((?:\?<(.*?)>)?(?!\?)/g;
    function pathToRegexp(path, keys, options) {
      options = options || {};
      keys = keys || [];
      var strict = options.strict;
      var end = options.end !== false;
      var flags = options.sensitive ? "" : "i";
      var lookahead = options.lookahead !== false;
      var extraOffset = 0;
      var keysOffset = keys.length;
      var i = 0;
      var name = 0;
      var pos = 0;
      var backtrack = "";
      var m;
      if (path instanceof RegExp) {
        while (m = MATCHING_GROUP_REGEXP.exec(path.source)) {
          if (m[0][0] === "\\") continue;
          keys.push({
            name: m[1] || name++,
            optional: false,
            offset: m.index
          });
        }
        return path;
      }
      if (Array.isArray(path)) {
        path = path.map(function(value) {
          return pathToRegexp(value, keys, options).source;
        });
        return new RegExp(path.join("|"), flags);
      }
      if (typeof path !== "string") {
        throw new TypeError("path must be a string, array of strings, or regular expression");
      }
      path = path.replace(/\\.|(\/)?(\.)?:(\w+)(\(.*?\))?(\*)?(\?)?|[.*]|\/\(/g, function(match, slash, format, key, capture, star, optional, offset) {
        if (match[0] === "\\") {
          backtrack += match;
          pos += 2;
          return match;
        }
        if (match === ".") {
          backtrack += "\\.";
          extraOffset += 1;
          pos += 1;
          return "\\.";
        }
        if (slash || format) {
          backtrack = "";
        } else {
          backtrack += path.slice(pos, offset);
        }
        pos = offset + match.length;
        if (match === "*") {
          extraOffset += 3;
          return "(.*)";
        }
        if (match === "/(") {
          backtrack += "/";
          extraOffset += 2;
          return "/(?:";
        }
        slash = slash || "";
        format = format ? "\\." : "";
        optional = optional || "";
        capture = capture ? capture.replace(/\\.|\*/, function(m2) {
          return m2 === "*" ? "(.*)" : m2;
        }) : backtrack ? "((?:(?!/|" + backtrack + ").)+?)" : "([^/" + format + "]+?)";
        keys.push({
          name: key,
          optional: !!optional,
          offset: offset + extraOffset
        });
        var result = "(?:" + format + slash + capture + (star ? "((?:[/" + format + "].+?)?)" : "") + ")" + optional;
        extraOffset += result.length - match.length;
        return result;
      });
      while (m = MATCHING_GROUP_REGEXP.exec(path)) {
        if (m[0][0] === "\\") continue;
        if (keysOffset + i === keys.length || keys[keysOffset + i].offset > m.index) {
          keys.splice(keysOffset + i, 0, {
            name: name++,
            // Unnamed matching groups must be consistently linear.
            optional: false,
            offset: m.index
          });
        }
        i++;
      }
      path += strict ? "" : path[path.length - 1] === "/" ? "?" : "/?";
      if (end) {
        path += "$";
      } else if (path[path.length - 1] !== "/") {
        path += lookahead ? "(?=/|$)" : "(?:/|$)";
      }
      return new RegExp("^" + path, flags);
    }
  }
});

// node_modules/express/lib/router/layer.js
var require_layer = __commonJS({
  "node_modules/express/lib/router/layer.js"(exports, module) {
    "use strict";
    var pathRegexp = require_path_to_regexp();
    var debug = require_src2()("express:router:layer");
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    module.exports = Layer;
    function Layer(path, options, fn) {
      if (!(this instanceof Layer)) {
        return new Layer(path, options, fn);
      }
      debug("new %o", path);
      var opts = options || {};
      this.handle = fn;
      this.name = fn.name || "<anonymous>";
      this.params = void 0;
      this.path = void 0;
      this.regexp = pathRegexp(path, this.keys = [], opts);
      this.regexp.fast_star = path === "*";
      this.regexp.fast_slash = path === "/" && opts.end === false;
    }
    Layer.prototype.handle_error = function handle_error(error, req, res, next) {
      var fn = this.handle;
      if (fn.length !== 4) {
        return next(error);
      }
      try {
        fn(error, req, res, next);
      } catch (err) {
        next(err);
      }
    };
    Layer.prototype.handle_request = function handle(req, res, next) {
      var fn = this.handle;
      if (fn.length > 3) {
        return next();
      }
      try {
        fn(req, res, next);
      } catch (err) {
        next(err);
      }
    };
    Layer.prototype.match = function match(path) {
      var match2;
      if (path != null) {
        if (this.regexp.fast_slash) {
          this.params = {};
          this.path = "";
          return true;
        }
        if (this.regexp.fast_star) {
          this.params = {
            "0": decode_param(path)
          };
          this.path = path;
          return true;
        }
        match2 = this.regexp.exec(path);
      }
      if (!match2) {
        this.params = void 0;
        this.path = void 0;
        return false;
      }
      this.params = {};
      this.path = match2[0];
      var keys = this.keys;
      var params = this.params;
      for (var i = 1; i < match2.length; i++) {
        var key = keys[i - 1];
        var prop = key.name;
        var val = decode_param(match2[i]);
        if (val !== void 0 || !hasOwnProperty.call(params, prop)) {
          params[prop] = val;
        }
      }
      return true;
    };
    function decode_param(val) {
      if (typeof val !== "string" || val.length === 0) {
        return val;
      }
      try {
        return decodeURIComponent(val);
      } catch (err) {
        if (err instanceof URIError) {
          err.message = "Failed to decode param '" + val + "'";
          err.status = err.statusCode = 400;
        }
        throw err;
      }
    }
  }
});

// node_modules/methods/index.js
var require_methods = __commonJS({
  "node_modules/methods/index.js"(exports, module) {
    "use strict";
    var http = __require("http");
    module.exports = getCurrentNodeMethods() || getBasicNodeMethods();
    function getCurrentNodeMethods() {
      return http.METHODS && http.METHODS.map(function lowerCaseMethod(method) {
        return method.toLowerCase();
      });
    }
    function getBasicNodeMethods() {
      return ["get", "post", "put", "head", "delete", "options", "trace", "copy", "lock", "mkcol", "move", "purge", "propfind", "proppatch", "unlock", "report", "mkactivity", "checkout", "merge", "m-search", "notify", "subscribe", "unsubscribe", "patch", "search", "connect"];
    }
  }
});

// node_modules/express/lib/router/route.js
var require_route = __commonJS({
  "node_modules/express/lib/router/route.js"(exports, module) {
    "use strict";
    var debug = require_src2()("express:router:route");
    var flatten = require_array_flatten();
    var Layer = require_layer();
    var methods = require_methods();
    var slice = Array.prototype.slice;
    var toString = Object.prototype.toString;
    module.exports = Route;
    function Route(path) {
      this.path = path;
      this.stack = [];
      debug("new %o", path);
      this.methods = {};
    }
    Route.prototype._handles_method = function _handles_method(method) {
      if (this.methods._all) {
        return true;
      }
      var name = typeof method === "string" ? method.toLowerCase() : method;
      if (name === "head" && !this.methods["head"]) {
        name = "get";
      }
      return Boolean(this.methods[name]);
    };
    Route.prototype._options = function _options() {
      var methods2 = Object.keys(this.methods);
      if (this.methods.get && !this.methods.head) {
        methods2.push("head");
      }
      for (var i = 0; i < methods2.length; i++) {
        methods2[i] = methods2[i].toUpperCase();
      }
      return methods2;
    };
    Route.prototype.dispatch = function dispatch(req, res, done) {
      var idx = 0;
      var stack = this.stack;
      var sync = 0;
      if (stack.length === 0) {
        return done();
      }
      var method = typeof req.method === "string" ? req.method.toLowerCase() : req.method;
      if (method === "head" && !this.methods["head"]) {
        method = "get";
      }
      req.route = this;
      next();
      function next(err) {
        if (err && err === "route") {
          return done();
        }
        if (err && err === "router") {
          return done(err);
        }
        if (++sync > 100) {
          return setImmediate(next, err);
        }
        var layer = stack[idx++];
        if (!layer) {
          return done(err);
        }
        if (layer.method && layer.method !== method) {
          next(err);
        } else if (err) {
          layer.handle_error(err, req, res, next);
        } else {
          layer.handle_request(req, res, next);
        }
        sync = 0;
      }
    };
    Route.prototype.all = function all() {
      var handles = flatten(slice.call(arguments));
      for (var i = 0; i < handles.length; i++) {
        var handle = handles[i];
        if (typeof handle !== "function") {
          var type = toString.call(handle);
          var msg = "Route.all() requires a callback function but got a " + type;
          throw new TypeError(msg);
        }
        var layer = Layer("/", {}, handle);
        layer.method = void 0;
        this.methods._all = true;
        this.stack.push(layer);
      }
      return this;
    };
    methods.forEach(function(method) {
      Route.prototype[method] = function() {
        var handles = flatten(slice.call(arguments));
        for (var i = 0; i < handles.length; i++) {
          var handle = handles[i];
          if (typeof handle !== "function") {
            var type = toString.call(handle);
            var msg = "Route." + method + "() requires a callback function but got a " + type;
            throw new Error(msg);
          }
          debug("%s %o", method, this.path);
          var layer = Layer("/", {}, handle);
          layer.method = method;
          this.methods[method] = true;
          this.stack.push(layer);
        }
        return this;
      };
    });
  }
});

// node_modules/utils-merge/index.js
var require_utils_merge = __commonJS({
  "node_modules/utils-merge/index.js"(exports, module) {
    exports = module.exports = function(a, b) {
      if (a && b) {
        for (var key in b) {
          a[key] = b[key];
        }
      }
      return a;
    };
  }
});

// node_modules/express/lib/router/index.js
var require_router = __commonJS({
  "node_modules/express/lib/router/index.js"(exports, module) {
    "use strict";
    var Route = require_route();
    var Layer = require_layer();
    var methods = require_methods();
    var mixin = require_utils_merge();
    var debug = require_src2()("express:router");
    var deprecate = require_depd()("express");
    var flatten = require_array_flatten();
    var parseUrl = require_parseurl();
    var setPrototypeOf = require_setprototypeof();
    var objectRegExp = /^\[object (\S+)\]$/;
    var slice = Array.prototype.slice;
    var toString = Object.prototype.toString;
    var proto = module.exports = function(options) {
      var opts = options || {};
      function router(req, res, next) {
        router.handle(req, res, next);
      }
      setPrototypeOf(router, proto);
      router.params = {};
      router._params = [];
      router.caseSensitive = opts.caseSensitive;
      router.mergeParams = opts.mergeParams;
      router.strict = opts.strict;
      router.stack = [];
      return router;
    };
    proto.param = function param(name, fn) {
      if (typeof name === "function") {
        deprecate("router.param(fn): Refactor to use path params");
        this._params.push(name);
        return;
      }
      var params = this._params;
      var len = params.length;
      var ret;
      if (name[0] === ":") {
        deprecate("router.param(" + JSON.stringify(name) + ", fn): Use router.param(" + JSON.stringify(name.slice(1)) + ", fn) instead");
        name = name.slice(1);
      }
      for (var i = 0; i < len; ++i) {
        if (ret = params[i](name, fn)) {
          fn = ret;
        }
      }
      if ("function" !== typeof fn) {
        throw new Error("invalid param() call for " + name + ", got " + fn);
      }
      (this.params[name] = this.params[name] || []).push(fn);
      return this;
    };
    proto.handle = function handle(req, res, out) {
      var self = this;
      debug("dispatching %s %s", req.method, req.url);
      var idx = 0;
      var protohost = getProtohost(req.url) || "";
      var removed = "";
      var slashAdded = false;
      var sync = 0;
      var paramcalled = {};
      var options = [];
      var stack = self.stack;
      var parentParams = req.params;
      var parentUrl = req.baseUrl || "";
      var done = restore(out, req, "baseUrl", "next", "params");
      req.next = next;
      if (req.method === "OPTIONS") {
        done = wrap(done, function(old, err) {
          if (err || options.length === 0) return old(err);
          sendOptionsResponse(res, options, old);
        });
      }
      req.baseUrl = parentUrl;
      req.originalUrl = req.originalUrl || req.url;
      next();
      function next(err) {
        var layerError = err === "route" ? null : err;
        if (slashAdded) {
          req.url = req.url.slice(1);
          slashAdded = false;
        }
        if (removed.length !== 0) {
          req.baseUrl = parentUrl;
          req.url = protohost + removed + req.url.slice(protohost.length);
          removed = "";
        }
        if (layerError === "router") {
          setImmediate(done, null);
          return;
        }
        if (idx >= stack.length) {
          setImmediate(done, layerError);
          return;
        }
        if (++sync > 100) {
          return setImmediate(next, err);
        }
        var path = getPathname(req);
        if (path == null) {
          return done(layerError);
        }
        var layer;
        var match;
        var route;
        while (match !== true && idx < stack.length) {
          layer = stack[idx++];
          match = matchLayer(layer, path);
          route = layer.route;
          if (typeof match !== "boolean") {
            layerError = layerError || match;
          }
          if (match !== true) {
            continue;
          }
          if (!route) {
            continue;
          }
          if (layerError) {
            match = false;
            continue;
          }
          var method = req.method;
          var has_method = route._handles_method(method);
          if (!has_method && method === "OPTIONS") {
            appendMethods(options, route._options());
          }
          if (!has_method && method !== "HEAD") {
            match = false;
          }
        }
        if (match !== true) {
          return done(layerError);
        }
        if (route) {
          req.route = route;
        }
        req.params = self.mergeParams ? mergeParams(layer.params, parentParams) : layer.params;
        var layerPath = layer.path;
        self.process_params(layer, paramcalled, req, res, function(err2) {
          if (err2) {
            next(layerError || err2);
          } else if (route) {
            layer.handle_request(req, res, next);
          } else {
            trim_prefix(layer, layerError, layerPath, path);
          }
          sync = 0;
        });
      }
      function trim_prefix(layer, layerError, layerPath, path) {
        if (layerPath.length !== 0) {
          if (layerPath !== path.slice(0, layerPath.length)) {
            next(layerError);
            return;
          }
          var c = path[layerPath.length];
          if (c && c !== "/" && c !== ".") return next(layerError);
          debug("trim prefix (%s) from url %s", layerPath, req.url);
          removed = layerPath;
          req.url = protohost + req.url.slice(protohost.length + removed.length);
          if (!protohost && req.url[0] !== "/") {
            req.url = "/" + req.url;
            slashAdded = true;
          }
          req.baseUrl = parentUrl + (removed[removed.length - 1] === "/" ? removed.substring(0, removed.length - 1) : removed);
        }
        debug("%s %s : %s", layer.name, layerPath, req.originalUrl);
        if (layerError) {
          layer.handle_error(layerError, req, res, next);
        } else {
          layer.handle_request(req, res, next);
        }
      }
    };
    proto.process_params = function process_params(layer, called, req, res, done) {
      var params = this.params;
      var keys = layer.keys;
      if (!keys || keys.length === 0) {
        return done();
      }
      var i = 0;
      var name;
      var paramIndex = 0;
      var key;
      var paramVal;
      var paramCallbacks;
      var paramCalled;
      function param(err) {
        if (err) {
          return done(err);
        }
        if (i >= keys.length) {
          return done();
        }
        paramIndex = 0;
        key = keys[i++];
        name = key.name;
        paramVal = req.params[name];
        paramCallbacks = params[name];
        paramCalled = called[name];
        if (paramVal === void 0 || !paramCallbacks) {
          return param();
        }
        if (paramCalled && (paramCalled.match === paramVal || paramCalled.error && paramCalled.error !== "route")) {
          req.params[name] = paramCalled.value;
          return param(paramCalled.error);
        }
        called[name] = paramCalled = {
          error: null,
          match: paramVal,
          value: paramVal
        };
        paramCallback();
      }
      function paramCallback(err) {
        var fn = paramCallbacks[paramIndex++];
        paramCalled.value = req.params[key.name];
        if (err) {
          paramCalled.error = err;
          param(err);
          return;
        }
        if (!fn) return param();
        try {
          fn(req, res, paramCallback, paramVal, key.name);
        } catch (e) {
          paramCallback(e);
        }
      }
      param();
    };
    proto.use = function use(fn) {
      var offset = 0;
      var path = "/";
      if (typeof fn !== "function") {
        var arg = fn;
        while (Array.isArray(arg) && arg.length !== 0) {
          arg = arg[0];
        }
        if (typeof arg !== "function") {
          offset = 1;
          path = fn;
        }
      }
      var callbacks = flatten(slice.call(arguments, offset));
      if (callbacks.length === 0) {
        throw new TypeError("Router.use() requires a middleware function");
      }
      for (var i = 0; i < callbacks.length; i++) {
        var fn = callbacks[i];
        if (typeof fn !== "function") {
          throw new TypeError("Router.use() requires a middleware function but got a " + gettype(fn));
        }
        debug("use %o %s", path, fn.name || "<anonymous>");
        var layer = new Layer(path, {
          sensitive: this.caseSensitive,
          strict: false,
          end: false
        }, fn);
        layer.route = void 0;
        this.stack.push(layer);
      }
      return this;
    };
    proto.route = function route(path) {
      var route2 = new Route(path);
      var layer = new Layer(path, {
        sensitive: this.caseSensitive,
        strict: this.strict,
        end: true
      }, route2.dispatch.bind(route2));
      layer.route = route2;
      this.stack.push(layer);
      return route2;
    };
    methods.concat("all").forEach(function(method) {
      proto[method] = function(path) {
        var route = this.route(path);
        route[method].apply(route, slice.call(arguments, 1));
        return this;
      };
    });
    function appendMethods(list, addition) {
      for (var i = 0; i < addition.length; i++) {
        var method = addition[i];
        if (list.indexOf(method) === -1) {
          list.push(method);
        }
      }
    }
    function getPathname(req) {
      try {
        return parseUrl(req).pathname;
      } catch (err) {
        return void 0;
      }
    }
    function getProtohost(url) {
      if (typeof url !== "string" || url.length === 0 || url[0] === "/") {
        return void 0;
      }
      var searchIndex = url.indexOf("?");
      var pathLength = searchIndex !== -1 ? searchIndex : url.length;
      var fqdnIndex = url.slice(0, pathLength).indexOf("://");
      return fqdnIndex !== -1 ? url.substring(0, url.indexOf("/", 3 + fqdnIndex)) : void 0;
    }
    function gettype(obj) {
      var type = typeof obj;
      if (type !== "object") {
        return type;
      }
      return toString.call(obj).replace(objectRegExp, "$1");
    }
    function matchLayer(layer, path) {
      try {
        return layer.match(path);
      } catch (err) {
        return err;
      }
    }
    function mergeParams(params, parent) {
      if (typeof parent !== "object" || !parent) {
        return params;
      }
      var obj = mixin({}, parent);
      if (!(0 in params) || !(0 in parent)) {
        return mixin(obj, params);
      }
      var i = 0;
      var o = 0;
      while (i in params) {
        i++;
      }
      while (o in parent) {
        o++;
      }
      for (i--; i >= 0; i--) {
        params[i + o] = params[i];
        if (i < o) {
          delete params[i];
        }
      }
      return mixin(obj, params);
    }
    function restore(fn, obj) {
      var props = new Array(arguments.length - 2);
      var vals = new Array(arguments.length - 2);
      for (var i = 0; i < props.length; i++) {
        props[i] = arguments[i + 2];
        vals[i] = obj[props[i]];
      }
      return function() {
        for (var i2 = 0; i2 < props.length; i2++) {
          obj[props[i2]] = vals[i2];
        }
        return fn.apply(this, arguments);
      };
    }
    function sendOptionsResponse(res, options, next) {
      try {
        var body = options.join(",");
        res.set("Allow", body);
        res.send(body);
      } catch (err) {
        next(err);
      }
    }
    function wrap(old, fn) {
      return function proxy() {
        var args = new Array(arguments.length + 1);
        args[0] = old;
        for (var i = 0, len = arguments.length; i < len; i++) {
          args[i + 1] = arguments[i];
        }
        fn.apply(this, args);
      };
    }
  }
});

// node_modules/express/lib/middleware/init.js
var require_init = __commonJS({
  "node_modules/express/lib/middleware/init.js"(exports) {
    "use strict";
    var setPrototypeOf = require_setprototypeof();
    exports.init = function(app) {
      return function expressInit(req, res, next) {
        if (app.enabled("x-powered-by")) res.setHeader("X-Powered-By", "Express");
        req.res = res;
        res.req = req;
        req.next = next;
        setPrototypeOf(req, app.request);
        setPrototypeOf(res, app.response);
        res.locals = res.locals || /* @__PURE__ */ Object.create(null);
        next();
      };
    };
  }
});

// node_modules/express/lib/middleware/query.js
var require_query = __commonJS({
  "node_modules/express/lib/middleware/query.js"(exports, module) {
    "use strict";
    var merge = require_utils_merge();
    var parseUrl = require_parseurl();
    var qs = require_lib();
    module.exports = function query(options) {
      var opts = merge({}, options);
      var queryparse = qs.parse;
      if (typeof options === "function") {
        queryparse = options;
        opts = void 0;
      }
      if (opts !== void 0 && opts.allowPrototypes === void 0) {
        opts.allowPrototypes = true;
      }
      return function query2(req, res, next) {
        if (!req.query) {
          var val = parseUrl(req).query;
          req.query = queryparse(val, opts);
        }
        next();
      };
    };
  }
});

// node_modules/express/lib/view.js
var require_view = __commonJS({
  "node_modules/express/lib/view.js"(exports, module) {
    "use strict";
    var debug = require_src2()("express:view");
    var path = __require("path");
    var fs = __require("fs");
    var dirname = path.dirname;
    var basename = path.basename;
    var extname = path.extname;
    var join = path.join;
    var resolve = path.resolve;
    module.exports = View;
    function View(name, options) {
      var opts = options || {};
      this.defaultEngine = opts.defaultEngine;
      this.ext = extname(name);
      this.name = name;
      this.root = opts.root;
      if (!this.ext && !this.defaultEngine) {
        throw new Error("No default engine was specified and no extension was provided.");
      }
      var fileName = name;
      if (!this.ext) {
        this.ext = this.defaultEngine[0] !== "." ? "." + this.defaultEngine : this.defaultEngine;
        fileName += this.ext;
      }
      if (!opts.engines[this.ext]) {
        var mod = this.ext.slice(1);
        debug('require "%s"', mod);
        var fn = __require(mod).__express;
        if (typeof fn !== "function") {
          throw new Error('Module "' + mod + '" does not provide a view engine.');
        }
        opts.engines[this.ext] = fn;
      }
      this.engine = opts.engines[this.ext];
      this.path = this.lookup(fileName);
    }
    View.prototype.lookup = function lookup(name) {
      var path2;
      var roots = [].concat(this.root);
      debug('lookup "%s"', name);
      for (var i = 0; i < roots.length && !path2; i++) {
        var root = roots[i];
        var loc = resolve(root, name);
        var dir = dirname(loc);
        var file = basename(loc);
        path2 = this.resolve(dir, file);
      }
      return path2;
    };
    View.prototype.render = function render(options, callback) {
      debug('render "%s"', this.path);
      this.engine(this.path, options, callback);
    };
    View.prototype.resolve = function resolve2(dir, file) {
      var ext = this.ext;
      var path2 = join(dir, file);
      var stat = tryStat(path2);
      if (stat && stat.isFile()) {
        return path2;
      }
      path2 = join(dir, basename(file, ext), "index" + ext);
      stat = tryStat(path2);
      if (stat && stat.isFile()) {
        return path2;
      }
    };
    function tryStat(path2) {
      debug('stat "%s"', path2);
      try {
        return fs.statSync(path2);
      } catch (e) {
        return void 0;
      }
    }
  }
});

// node_modules/safe-buffer/index.js
var require_safe_buffer = __commonJS({
  "node_modules/safe-buffer/index.js"(exports, module) {
    var buffer = __require("buffer");
    var Buffer2 = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
      module.exports = buffer;
    } else {
      copyProps(buffer, exports);
      exports.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer2(arg, encodingOrOffset, length);
    }
    SafeBuffer.prototype = Object.create(Buffer2.prototype);
    copyProps(Buffer2, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer2(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer2(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer2(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer.SlowBuffer(size);
    };
  }
});

// node_modules/content-disposition/index.js
var require_content_disposition = __commonJS({
  "node_modules/content-disposition/index.js"(exports, module) {
    "use strict";
    module.exports = contentDisposition;
    module.exports.parse = parse;
    var basename = __require("path").basename;
    var Buffer2 = require_safe_buffer().Buffer;
    var ENCODE_URL_ATTR_CHAR_REGEXP = /[\x00-\x20"'()*,/:;<=>?@[\\\]{}\x7f]/g;
    var HEX_ESCAPE_REGEXP = /%[0-9A-Fa-f]{2}/;
    var HEX_ESCAPE_REPLACE_REGEXP = /%([0-9A-Fa-f]{2})/g;
    var NON_LATIN1_REGEXP = /[^\x20-\x7e\xa0-\xff]/g;
    var QESC_REGEXP = /\\([\u0000-\u007f])/g;
    var QUOTE_REGEXP = /([\\"])/g;
    var PARAM_REGEXP = /;[\x09\x20]*([!#$%&'*+.0-9A-Z^_`a-z|~-]+)[\x09\x20]*=[\x09\x20]*("(?:[\x20!\x23-\x5b\x5d-\x7e\x80-\xff]|\\[\x20-\x7e])*"|[!#$%&'*+.0-9A-Z^_`a-z|~-]+)[\x09\x20]*/g;
    var TEXT_REGEXP = /^[\x20-\x7e\x80-\xff]+$/;
    var TOKEN_REGEXP = /^[!#$%&'*+.0-9A-Z^_`a-z|~-]+$/;
    var EXT_VALUE_REGEXP = /^([A-Za-z0-9!#$%&+\-^_`{}~]+)'(?:[A-Za-z]{2,3}(?:-[A-Za-z]{3}){0,3}|[A-Za-z]{4,8}|)'((?:%[0-9A-Fa-f]{2}|[A-Za-z0-9!#$&+.^_`|~-])+)$/;
    var DISPOSITION_TYPE_REGEXP = /^([!#$%&'*+.0-9A-Z^_`a-z|~-]+)[\x09\x20]*(?:$|;)/;
    function contentDisposition(filename, options) {
      var opts = options || {};
      var type = opts.type || "attachment";
      var params = createparams(filename, opts.fallback);
      return format(new ContentDisposition(type, params));
    }
    function createparams(filename, fallback) {
      if (filename === void 0) {
        return;
      }
      var params = {};
      if (typeof filename !== "string") {
        throw new TypeError("filename must be a string");
      }
      if (fallback === void 0) {
        fallback = true;
      }
      if (typeof fallback !== "string" && typeof fallback !== "boolean") {
        throw new TypeError("fallback must be a string or boolean");
      }
      if (typeof fallback === "string" && NON_LATIN1_REGEXP.test(fallback)) {
        throw new TypeError("fallback must be ISO-8859-1 string");
      }
      var name = basename(filename);
      var isQuotedString = TEXT_REGEXP.test(name);
      var fallbackName = typeof fallback !== "string" ? fallback && getlatin1(name) : basename(fallback);
      var hasFallback = typeof fallbackName === "string" && fallbackName !== name;
      if (hasFallback || !isQuotedString || HEX_ESCAPE_REGEXP.test(name)) {
        params["filename*"] = name;
      }
      if (isQuotedString || hasFallback) {
        params.filename = hasFallback ? fallbackName : name;
      }
      return params;
    }
    function format(obj) {
      var parameters = obj.parameters;
      var type = obj.type;
      if (!type || typeof type !== "string" || !TOKEN_REGEXP.test(type)) {
        throw new TypeError("invalid type");
      }
      var string = String(type).toLowerCase();
      if (parameters && typeof parameters === "object") {
        var param;
        var params = Object.keys(parameters).sort();
        for (var i = 0; i < params.length; i++) {
          param = params[i];
          var val = param.substr(-1) === "*" ? ustring(parameters[param]) : qstring(parameters[param]);
          string += "; " + param + "=" + val;
        }
      }
      return string;
    }
    function decodefield(str) {
      var match = EXT_VALUE_REGEXP.exec(str);
      if (!match) {
        throw new TypeError("invalid extended field value");
      }
      var charset = match[1].toLowerCase();
      var encoded = match[2];
      var value;
      var binary = encoded.replace(HEX_ESCAPE_REPLACE_REGEXP, pdecode);
      switch (charset) {
        case "iso-8859-1":
          value = getlatin1(binary);
          break;
        case "utf-8":
          value = Buffer2.from(binary, "binary").toString("utf8");
          break;
        default:
          throw new TypeError("unsupported charset in extended field");
      }
      return value;
    }
    function getlatin1(val) {
      return String(val).replace(NON_LATIN1_REGEXP, "?");
    }
    function parse(string) {
      if (!string || typeof string !== "string") {
        throw new TypeError("argument string is required");
      }
      var match = DISPOSITION_TYPE_REGEXP.exec(string);
      if (!match) {
        throw new TypeError("invalid type format");
      }
      var index = match[0].length;
      var type = match[1].toLowerCase();
      var key;
      var names = [];
      var params = {};
      var value;
      index = PARAM_REGEXP.lastIndex = match[0].substr(-1) === ";" ? index - 1 : index;
      while (match = PARAM_REGEXP.exec(string)) {
        if (match.index !== index) {
          throw new TypeError("invalid parameter format");
        }
        index += match[0].length;
        key = match[1].toLowerCase();
        value = match[2];
        if (names.indexOf(key) !== -1) {
          throw new TypeError("invalid duplicate parameter");
        }
        names.push(key);
        if (key.indexOf("*") + 1 === key.length) {
          key = key.slice(0, -1);
          value = decodefield(value);
          params[key] = value;
          continue;
        }
        if (typeof params[key] === "string") {
          continue;
        }
        if (value[0] === '"') {
          value = value.substr(1, value.length - 2).replace(QESC_REGEXP, "$1");
        }
        params[key] = value;
      }
      if (index !== -1 && index !== string.length) {
        throw new TypeError("invalid parameter format");
      }
      return new ContentDisposition(type, params);
    }
    function pdecode(str, hex) {
      return String.fromCharCode(parseInt(hex, 16));
    }
    function pencode(char) {
      return "%" + String(char).charCodeAt(0).toString(16).toUpperCase();
    }
    function qstring(val) {
      var str = String(val);
      return '"' + str.replace(QUOTE_REGEXP, "\\$1") + '"';
    }
    function ustring(val) {
      var str = String(val);
      var encoded = encodeURIComponent(str).replace(ENCODE_URL_ATTR_CHAR_REGEXP, pencode);
      return "UTF-8''" + encoded;
    }
    function ContentDisposition(type, parameters) {
      this.type = type;
      this.parameters = parameters;
    }
  }
});

// node_modules/send/node_modules/debug/node_modules/ms/index.js
var require_ms3 = __commonJS({
  "node_modules/send/node_modules/debug/node_modules/ms/index.js"(exports, module) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var y = d * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isNaN(val) === false) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      if (ms >= d) {
        return Math.round(ms / d) + "d";
      }
      if (ms >= h) {
        return Math.round(ms / h) + "h";
      }
      if (ms >= m) {
        return Math.round(ms / m) + "m";
      }
      if (ms >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      return plural(ms, d, "day") || plural(ms, h, "hour") || plural(ms, m, "minute") || plural(ms, s, "second") || ms + " ms";
    }
    function plural(ms, n, name) {
      if (ms < n) {
        return;
      }
      if (ms < n * 1.5) {
        return Math.floor(ms / n) + " " + name;
      }
      return Math.ceil(ms / n) + " " + name + "s";
    }
  }
});

// node_modules/send/node_modules/debug/src/debug.js
var require_debug3 = __commonJS({
  "node_modules/send/node_modules/debug/src/debug.js"(exports, module) {
    exports = module.exports = createDebug.debug = createDebug["default"] = createDebug;
    exports.coerce = coerce;
    exports.disable = disable;
    exports.enable = enable;
    exports.enabled = enabled;
    exports.humanize = require_ms3();
    exports.names = [];
    exports.skips = [];
    exports.formatters = {};
    var prevTime;
    function selectColor(namespace) {
      var hash = 0, i;
      for (i in namespace) {
        hash = (hash << 5) - hash + namespace.charCodeAt(i);
        hash |= 0;
      }
      return exports.colors[Math.abs(hash) % exports.colors.length];
    }
    function createDebug(namespace) {
      function debug() {
        if (!debug.enabled) return;
        var self = debug;
        var curr = +/* @__PURE__ */ new Date();
        var ms = curr - (prevTime || curr);
        self.diff = ms;
        self.prev = prevTime;
        self.curr = curr;
        prevTime = curr;
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        args[0] = exports.coerce(args[0]);
        if ("string" !== typeof args[0]) {
          args.unshift("%O");
        }
        var index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
          if (match === "%%") return match;
          index++;
          var formatter = exports.formatters[format];
          if ("function" === typeof formatter) {
            var val = args[index];
            match = formatter.call(self, val);
            args.splice(index, 1);
            index--;
          }
          return match;
        });
        exports.formatArgs.call(self, args);
        var logFn = debug.log || exports.log || console.log.bind(console);
        logFn.apply(self, args);
      }
      debug.namespace = namespace;
      debug.enabled = exports.enabled(namespace);
      debug.useColors = exports.useColors();
      debug.color = selectColor(namespace);
      if ("function" === typeof exports.init) {
        exports.init(debug);
      }
      return debug;
    }
    function enable(namespaces) {
      exports.save(namespaces);
      exports.names = [];
      exports.skips = [];
      var split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
      var len = split.length;
      for (var i = 0; i < len; i++) {
        if (!split[i]) continue;
        namespaces = split[i].replace(/\*/g, ".*?");
        if (namespaces[0] === "-") {
          exports.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
        } else {
          exports.names.push(new RegExp("^" + namespaces + "$"));
        }
      }
    }
    function disable() {
      exports.enable("");
    }
    function enabled(name) {
      var i, len;
      for (i = 0, len = exports.skips.length; i < len; i++) {
        if (exports.skips[i].test(name)) {
          return false;
        }
      }
      for (i = 0, len = exports.names.length; i < len; i++) {
        if (exports.names[i].test(name)) {
          return true;
        }
      }
      return false;
    }
    function coerce(val) {
      if (val instanceof Error) return val.stack || val.message;
      return val;
    }
  }
});

// node_modules/send/node_modules/debug/src/browser.js
var require_browser3 = __commonJS({
  "node_modules/send/node_modules/debug/src/browser.js"(exports, module) {
    exports = module.exports = require_debug3();
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : localstorage();
    exports.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"];
    function useColors() {
      if (typeof window !== "undefined" && window.process && window.process.type === "renderer") {
        return true;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    exports.formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (err) {
        return "[UnexpectedJSONParseError]: " + err.message;
      }
    };
    function formatArgs(args) {
      var useColors2 = this.useColors;
      args[0] = (useColors2 ? "%c" : "") + this.namespace + (useColors2 ? " %c" : " ") + args[0] + (useColors2 ? "%c " : " ") + "+" + exports.humanize(this.diff);
      if (!useColors2) return;
      var c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      var index = 0;
      var lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, function(match) {
        if ("%%" === match) return;
        index++;
        if ("%c" === match) {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    function log() {
      return "object" === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
    }
    function save(namespaces) {
      try {
        if (null == namespaces) {
          exports.storage.removeItem("debug");
        } else {
          exports.storage.debug = namespaces;
        }
      } catch (e) {
      }
    }
    function load() {
      var r;
      try {
        r = exports.storage.debug;
      } catch (e) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    exports.enable(load());
    function localstorage() {
      try {
        return window.localStorage;
      } catch (e) {
      }
    }
  }
});

// node_modules/send/node_modules/debug/src/node.js
var require_node3 = __commonJS({
  "node_modules/send/node_modules/debug/src/node.js"(exports, module) {
    var tty = __require("tty");
    var util = __require("util");
    exports = module.exports = require_debug3();
    exports.init = init;
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.colors = [6, 2, 3, 4, 5, 1];
    exports.inspectOpts = Object.keys(process.env).filter(function(key) {
      return /^debug_/i.test(key);
    }).reduce(function(obj, key) {
      var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, function(_, k) {
        return k.toUpperCase();
      });
      var val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
      else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
      else if (val === "null") val = null;
      else val = Number(val);
      obj[prop] = val;
      return obj;
    }, {});
    var fd = parseInt(process.env.DEBUG_FD, 10) || 2;
    if (1 !== fd && 2 !== fd) {
      util.deprecate(function() {
      }, "except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)")();
    }
    var stream = 1 === fd ? process.stdout : 2 === fd ? process.stderr : createWritableStdioStream(fd);
    function useColors() {
      return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(fd);
    }
    exports.formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map(function(str) {
        return str.trim();
      }).join(" ");
    };
    exports.formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
    function formatArgs(args) {
      var name = this.namespace;
      var useColors2 = this.useColors;
      if (useColors2) {
        var c = this.color;
        var prefix = "  \x1B[3" + c + ";1m" + name + " \x1B[0m";
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push("\x1B[3" + c + "m+" + exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = (/* @__PURE__ */ new Date()).toUTCString() + " " + name + " " + args[0];
      }
    }
    function log() {
      return stream.write(util.format.apply(util, arguments) + "\n");
    }
    function save(namespaces) {
      if (null == namespaces) {
        delete process.env.DEBUG;
      } else {
        process.env.DEBUG = namespaces;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function createWritableStdioStream(fd2) {
      var stream2;
      var tty_wrap = process.binding("tty_wrap");
      switch (tty_wrap.guessHandleType(fd2)) {
        case "TTY":
          stream2 = new tty.WriteStream(fd2);
          stream2._type = "tty";
          if (stream2._handle && stream2._handle.unref) {
            stream2._handle.unref();
          }
          break;
        case "FILE":
          var fs = __require("fs");
          stream2 = new fs.SyncWriteStream(fd2, {
            autoClose: false
          });
          stream2._type = "fs";
          break;
        case "PIPE":
        case "TCP":
          var net = __require("net");
          stream2 = new net.Socket({
            fd: fd2,
            readable: false,
            writable: true
          });
          stream2.readable = false;
          stream2.read = null;
          stream2._type = "pipe";
          if (stream2._handle && stream2._handle.unref) {
            stream2._handle.unref();
          }
          break;
        default:
          throw new Error("Implement me. Unknown stream file type!");
      }
      stream2.fd = fd2;
      stream2._isStdio = true;
      return stream2;
    }
    function init(debug) {
      debug.inspectOpts = {};
      var keys = Object.keys(exports.inspectOpts);
      for (var i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
      }
    }
    exports.enable(load());
  }
});

// node_modules/send/node_modules/debug/src/index.js
var require_src3 = __commonJS({
  "node_modules/send/node_modules/debug/src/index.js"(exports, module) {
    if (typeof process !== "undefined" && process.type === "renderer") {
      module.exports = require_browser3();
    } else {
      module.exports = require_node3();
    }
  }
});

// node_modules/send/node_modules/encodeurl/index.js
var require_encodeurl2 = __commonJS({
  "node_modules/send/node_modules/encodeurl/index.js"(exports, module) {
    "use strict";
    module.exports = encodeUrl;
    var ENCODE_CHARS_REGEXP = /(?:[^\x21\x25\x26-\x3B\x3D\x3F-\x5B\x5D\x5F\x61-\x7A\x7E]|%(?:[^0-9A-Fa-f]|[0-9A-Fa-f][^0-9A-Fa-f]|$))+/g;
    var UNMATCHED_SURROGATE_PAIR_REGEXP = /(^|[^\uD800-\uDBFF])[\uDC00-\uDFFF]|[\uD800-\uDBFF]([^\uDC00-\uDFFF]|$)/g;
    var UNMATCHED_SURROGATE_PAIR_REPLACE = "$1�$2";
    function encodeUrl(url) {
      return String(url).replace(UNMATCHED_SURROGATE_PAIR_REGEXP, UNMATCHED_SURROGATE_PAIR_REPLACE).replace(ENCODE_CHARS_REGEXP, encodeURI);
    }
  }
});

// node_modules/etag/index.js
var require_etag = __commonJS({
  "node_modules/etag/index.js"(exports, module) {
    "use strict";
    module.exports = etag;
    var crypto = __require("crypto");
    var Stats = __require("fs").Stats;
    var toString = Object.prototype.toString;
    function entitytag(entity) {
      if (entity.length === 0) {
        return '"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk"';
      }
      var hash = crypto.createHash("sha1").update(entity, "utf8").digest("base64").substring(0, 27);
      var len = typeof entity === "string" ? Buffer.byteLength(entity, "utf8") : entity.length;
      return '"' + len.toString(16) + "-" + hash + '"';
    }
    function etag(entity, options) {
      if (entity == null) {
        throw new TypeError("argument entity is required");
      }
      var isStats = isstats(entity);
      var weak = options && typeof options.weak === "boolean" ? options.weak : isStats;
      if (!isStats && typeof entity !== "string" && !Buffer.isBuffer(entity)) {
        throw new TypeError("argument entity must be string, Buffer, or fs.Stats");
      }
      var tag = isStats ? stattag(entity) : entitytag(entity);
      return weak ? "W/" + tag : tag;
    }
    function isstats(obj) {
      if (typeof Stats === "function" && obj instanceof Stats) {
        return true;
      }
      return obj && typeof obj === "object" && "ctime" in obj && toString.call(obj.ctime) === "[object Date]" && "mtime" in obj && toString.call(obj.mtime) === "[object Date]" && "ino" in obj && typeof obj.ino === "number" && "size" in obj && typeof obj.size === "number";
    }
    function stattag(stat) {
      var mtime = stat.mtime.getTime().toString(16);
      var size = stat.size.toString(16);
      return '"' + size + "-" + mtime + '"';
    }
  }
});

// node_modules/fresh/index.js
var require_fresh = __commonJS({
  "node_modules/fresh/index.js"(exports, module) {
    "use strict";
    var CACHE_CONTROL_NO_CACHE_REGEXP = /(?:^|,)\s*?no-cache\s*?(?:,|$)/;
    module.exports = fresh;
    function fresh(reqHeaders, resHeaders) {
      var modifiedSince = reqHeaders["if-modified-since"];
      var noneMatch = reqHeaders["if-none-match"];
      if (!modifiedSince && !noneMatch) {
        return false;
      }
      var cacheControl = reqHeaders["cache-control"];
      if (cacheControl && CACHE_CONTROL_NO_CACHE_REGEXP.test(cacheControl)) {
        return false;
      }
      if (noneMatch && noneMatch !== "*") {
        var etag = resHeaders["etag"];
        if (!etag) {
          return false;
        }
        var etagStale = true;
        var matches = parseTokenList(noneMatch);
        for (var i = 0; i < matches.length; i++) {
          var match = matches[i];
          if (match === etag || match === "W/" + etag || "W/" + match === etag) {
            etagStale = false;
            break;
          }
        }
        if (etagStale) {
          return false;
        }
      }
      if (modifiedSince) {
        var lastModified = resHeaders["last-modified"];
        var modifiedStale = !lastModified || !(parseHttpDate(lastModified) <= parseHttpDate(modifiedSince));
        if (modifiedStale) {
          return false;
        }
      }
      return true;
    }
    function parseHttpDate(date) {
      var timestamp = date && Date.parse(date);
      return typeof timestamp === "number" ? timestamp : NaN;
    }
    function parseTokenList(str) {
      var end = 0;
      var list = [];
      var start = 0;
      for (var i = 0, len = str.length; i < len; i++) {
        switch (str.charCodeAt(i)) {
          case 32:
            if (start === end) {
              start = end = i + 1;
            }
            break;
          case 44:
            list.push(str.substring(start, end));
            start = end = i + 1;
            break;
          default:
            end = i + 1;
            break;
        }
      }
      list.push(str.substring(start, end));
      return list;
    }
  }
});

// node_modules/send/node_modules/mime/types.json
var require_types = __commonJS({
  "node_modules/send/node_modules/mime/types.json"(exports, module) {
    module.exports = { "application/andrew-inset": ["ez"], "application/applixware": ["aw"], "application/atom+xml": ["atom"], "application/atomcat+xml": ["atomcat"], "application/atomsvc+xml": ["atomsvc"], "application/bdoc": ["bdoc"], "application/ccxml+xml": ["ccxml"], "application/cdmi-capability": ["cdmia"], "application/cdmi-container": ["cdmic"], "application/cdmi-domain": ["cdmid"], "application/cdmi-object": ["cdmio"], "application/cdmi-queue": ["cdmiq"], "application/cu-seeme": ["cu"], "application/dash+xml": ["mpd"], "application/davmount+xml": ["davmount"], "application/docbook+xml": ["dbk"], "application/dssc+der": ["dssc"], "application/dssc+xml": ["xdssc"], "application/ecmascript": ["ecma"], "application/emma+xml": ["emma"], "application/epub+zip": ["epub"], "application/exi": ["exi"], "application/font-tdpfr": ["pfr"], "application/font-woff": [], "application/font-woff2": [], "application/geo+json": ["geojson"], "application/gml+xml": ["gml"], "application/gpx+xml": ["gpx"], "application/gxf": ["gxf"], "application/gzip": ["gz"], "application/hyperstudio": ["stk"], "application/inkml+xml": ["ink", "inkml"], "application/ipfix": ["ipfix"], "application/java-archive": ["jar", "war", "ear"], "application/java-serialized-object": ["ser"], "application/java-vm": ["class"], "application/javascript": ["js", "mjs"], "application/json": ["json", "map"], "application/json5": ["json5"], "application/jsonml+json": ["jsonml"], "application/ld+json": ["jsonld"], "application/lost+xml": ["lostxml"], "application/mac-binhex40": ["hqx"], "application/mac-compactpro": ["cpt"], "application/mads+xml": ["mads"], "application/manifest+json": ["webmanifest"], "application/marc": ["mrc"], "application/marcxml+xml": ["mrcx"], "application/mathematica": ["ma", "nb", "mb"], "application/mathml+xml": ["mathml"], "application/mbox": ["mbox"], "application/mediaservercontrol+xml": ["mscml"], "application/metalink+xml": ["metalink"], "application/metalink4+xml": ["meta4"], "application/mets+xml": ["mets"], "application/mods+xml": ["mods"], "application/mp21": ["m21", "mp21"], "application/mp4": ["mp4s", "m4p"], "application/msword": ["doc", "dot"], "application/mxf": ["mxf"], "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"], "application/oda": ["oda"], "application/oebps-package+xml": ["opf"], "application/ogg": ["ogx"], "application/omdoc+xml": ["omdoc"], "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"], "application/oxps": ["oxps"], "application/patch-ops-error+xml": ["xer"], "application/pdf": ["pdf"], "application/pgp-encrypted": ["pgp"], "application/pgp-signature": ["asc", "sig"], "application/pics-rules": ["prf"], "application/pkcs10": ["p10"], "application/pkcs7-mime": ["p7m", "p7c"], "application/pkcs7-signature": ["p7s"], "application/pkcs8": ["p8"], "application/pkix-attr-cert": ["ac"], "application/pkix-cert": ["cer"], "application/pkix-crl": ["crl"], "application/pkix-pkipath": ["pkipath"], "application/pkixcmp": ["pki"], "application/pls+xml": ["pls"], "application/postscript": ["ai", "eps", "ps"], "application/prs.cww": ["cww"], "application/pskc+xml": ["pskcxml"], "application/raml+yaml": ["raml"], "application/rdf+xml": ["rdf"], "application/reginfo+xml": ["rif"], "application/relax-ng-compact-syntax": ["rnc"], "application/resource-lists+xml": ["rl"], "application/resource-lists-diff+xml": ["rld"], "application/rls-services+xml": ["rs"], "application/rpki-ghostbusters": ["gbr"], "application/rpki-manifest": ["mft"], "application/rpki-roa": ["roa"], "application/rsd+xml": ["rsd"], "application/rss+xml": ["rss"], "application/rtf": ["rtf"], "application/sbml+xml": ["sbml"], "application/scvp-cv-request": ["scq"], "application/scvp-cv-response": ["scs"], "application/scvp-vp-request": ["spq"], "application/scvp-vp-response": ["spp"], "application/sdp": ["sdp"], "application/set-payment-initiation": ["setpay"], "application/set-registration-initiation": ["setreg"], "application/shf+xml": ["shf"], "application/smil+xml": ["smi", "smil"], "application/sparql-query": ["rq"], "application/sparql-results+xml": ["srx"], "application/srgs": ["gram"], "application/srgs+xml": ["grxml"], "application/sru+xml": ["sru"], "application/ssdl+xml": ["ssdl"], "application/ssml+xml": ["ssml"], "application/tei+xml": ["tei", "teicorpus"], "application/thraud+xml": ["tfi"], "application/timestamped-data": ["tsd"], "application/vnd.3gpp.pic-bw-large": ["plb"], "application/vnd.3gpp.pic-bw-small": ["psb"], "application/vnd.3gpp.pic-bw-var": ["pvb"], "application/vnd.3gpp2.tcap": ["tcap"], "application/vnd.3m.post-it-notes": ["pwn"], "application/vnd.accpac.simply.aso": ["aso"], "application/vnd.accpac.simply.imp": ["imp"], "application/vnd.acucobol": ["acu"], "application/vnd.acucorp": ["atc", "acutc"], "application/vnd.adobe.air-application-installer-package+zip": ["air"], "application/vnd.adobe.formscentral.fcdt": ["fcdt"], "application/vnd.adobe.fxp": ["fxp", "fxpl"], "application/vnd.adobe.xdp+xml": ["xdp"], "application/vnd.adobe.xfdf": ["xfdf"], "application/vnd.ahead.space": ["ahead"], "application/vnd.airzip.filesecure.azf": ["azf"], "application/vnd.airzip.filesecure.azs": ["azs"], "application/vnd.amazon.ebook": ["azw"], "application/vnd.americandynamics.acc": ["acc"], "application/vnd.amiga.ami": ["ami"], "application/vnd.android.package-archive": ["apk"], "application/vnd.anser-web-certificate-issue-initiation": ["cii"], "application/vnd.anser-web-funds-transfer-initiation": ["fti"], "application/vnd.antix.game-component": ["atx"], "application/vnd.apple.installer+xml": ["mpkg"], "application/vnd.apple.mpegurl": ["m3u8"], "application/vnd.apple.pkpass": ["pkpass"], "application/vnd.aristanetworks.swi": ["swi"], "application/vnd.astraea-software.iota": ["iota"], "application/vnd.audiograph": ["aep"], "application/vnd.blueice.multipass": ["mpm"], "application/vnd.bmi": ["bmi"], "application/vnd.businessobjects": ["rep"], "application/vnd.chemdraw+xml": ["cdxml"], "application/vnd.chipnuts.karaoke-mmd": ["mmd"], "application/vnd.cinderella": ["cdy"], "application/vnd.claymore": ["cla"], "application/vnd.cloanto.rp9": ["rp9"], "application/vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"], "application/vnd.cluetrust.cartomobile-config": ["c11amc"], "application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"], "application/vnd.commonspace": ["csp"], "application/vnd.contact.cmsg": ["cdbcmsg"], "application/vnd.cosmocaller": ["cmc"], "application/vnd.crick.clicker": ["clkx"], "application/vnd.crick.clicker.keyboard": ["clkk"], "application/vnd.crick.clicker.palette": ["clkp"], "application/vnd.crick.clicker.template": ["clkt"], "application/vnd.crick.clicker.wordbank": ["clkw"], "application/vnd.criticaltools.wbs+xml": ["wbs"], "application/vnd.ctc-posml": ["pml"], "application/vnd.cups-ppd": ["ppd"], "application/vnd.curl.car": ["car"], "application/vnd.curl.pcurl": ["pcurl"], "application/vnd.dart": ["dart"], "application/vnd.data-vision.rdz": ["rdz"], "application/vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"], "application/vnd.dece.ttml+xml": ["uvt", "uvvt"], "application/vnd.dece.unspecified": ["uvx", "uvvx"], "application/vnd.dece.zip": ["uvz", "uvvz"], "application/vnd.denovo.fcselayout-link": ["fe_launch"], "application/vnd.dna": ["dna"], "application/vnd.dolby.mlp": ["mlp"], "application/vnd.dpgraph": ["dpg"], "application/vnd.dreamfactory": ["dfac"], "application/vnd.ds-keypoint": ["kpxx"], "application/vnd.dvb.ait": ["ait"], "application/vnd.dvb.service": ["svc"], "application/vnd.dynageo": ["geo"], "application/vnd.ecowin.chart": ["mag"], "application/vnd.enliven": ["nml"], "application/vnd.epson.esf": ["esf"], "application/vnd.epson.msf": ["msf"], "application/vnd.epson.quickanime": ["qam"], "application/vnd.epson.salt": ["slt"], "application/vnd.epson.ssf": ["ssf"], "application/vnd.eszigno3+xml": ["es3", "et3"], "application/vnd.ezpix-album": ["ez2"], "application/vnd.ezpix-package": ["ez3"], "application/vnd.fdf": ["fdf"], "application/vnd.fdsn.mseed": ["mseed"], "application/vnd.fdsn.seed": ["seed", "dataless"], "application/vnd.flographit": ["gph"], "application/vnd.fluxtime.clip": ["ftc"], "application/vnd.framemaker": ["fm", "frame", "maker", "book"], "application/vnd.frogans.fnc": ["fnc"], "application/vnd.frogans.ltf": ["ltf"], "application/vnd.fsc.weblaunch": ["fsc"], "application/vnd.fujitsu.oasys": ["oas"], "application/vnd.fujitsu.oasys2": ["oa2"], "application/vnd.fujitsu.oasys3": ["oa3"], "application/vnd.fujitsu.oasysgp": ["fg5"], "application/vnd.fujitsu.oasysprs": ["bh2"], "application/vnd.fujixerox.ddd": ["ddd"], "application/vnd.fujixerox.docuworks": ["xdw"], "application/vnd.fujixerox.docuworks.binder": ["xbd"], "application/vnd.fuzzysheet": ["fzs"], "application/vnd.genomatix.tuxedo": ["txd"], "application/vnd.geogebra.file": ["ggb"], "application/vnd.geogebra.tool": ["ggt"], "application/vnd.geometry-explorer": ["gex", "gre"], "application/vnd.geonext": ["gxt"], "application/vnd.geoplan": ["g2w"], "application/vnd.geospace": ["g3w"], "application/vnd.gmx": ["gmx"], "application/vnd.google-apps.document": ["gdoc"], "application/vnd.google-apps.presentation": ["gslides"], "application/vnd.google-apps.spreadsheet": ["gsheet"], "application/vnd.google-earth.kml+xml": ["kml"], "application/vnd.google-earth.kmz": ["kmz"], "application/vnd.grafeq": ["gqf", "gqs"], "application/vnd.groove-account": ["gac"], "application/vnd.groove-help": ["ghf"], "application/vnd.groove-identity-message": ["gim"], "application/vnd.groove-injector": ["grv"], "application/vnd.groove-tool-message": ["gtm"], "application/vnd.groove-tool-template": ["tpl"], "application/vnd.groove-vcard": ["vcg"], "application/vnd.hal+xml": ["hal"], "application/vnd.handheld-entertainment+xml": ["zmm"], "application/vnd.hbci": ["hbci"], "application/vnd.hhe.lesson-player": ["les"], "application/vnd.hp-hpgl": ["hpgl"], "application/vnd.hp-hpid": ["hpid"], "application/vnd.hp-hps": ["hps"], "application/vnd.hp-jlyt": ["jlt"], "application/vnd.hp-pcl": ["pcl"], "application/vnd.hp-pclxl": ["pclxl"], "application/vnd.hydrostatix.sof-data": ["sfd-hdstx"], "application/vnd.ibm.minipay": ["mpy"], "application/vnd.ibm.modcap": ["afp", "listafp", "list3820"], "application/vnd.ibm.rights-management": ["irm"], "application/vnd.ibm.secure-container": ["sc"], "application/vnd.iccprofile": ["icc", "icm"], "application/vnd.igloader": ["igl"], "application/vnd.immervision-ivp": ["ivp"], "application/vnd.immervision-ivu": ["ivu"], "application/vnd.insors.igm": ["igm"], "application/vnd.intercon.formnet": ["xpw", "xpx"], "application/vnd.intergeo": ["i2g"], "application/vnd.intu.qbo": ["qbo"], "application/vnd.intu.qfx": ["qfx"], "application/vnd.ipunplugged.rcprofile": ["rcprofile"], "application/vnd.irepository.package+xml": ["irp"], "application/vnd.is-xpr": ["xpr"], "application/vnd.isac.fcs": ["fcs"], "application/vnd.jam": ["jam"], "application/vnd.jcp.javame.midlet-rms": ["rms"], "application/vnd.jisp": ["jisp"], "application/vnd.joost.joda-archive": ["joda"], "application/vnd.kahootz": ["ktz", "ktr"], "application/vnd.kde.karbon": ["karbon"], "application/vnd.kde.kchart": ["chrt"], "application/vnd.kde.kformula": ["kfo"], "application/vnd.kde.kivio": ["flw"], "application/vnd.kde.kontour": ["kon"], "application/vnd.kde.kpresenter": ["kpr", "kpt"], "application/vnd.kde.kspread": ["ksp"], "application/vnd.kde.kword": ["kwd", "kwt"], "application/vnd.kenameaapp": ["htke"], "application/vnd.kidspiration": ["kia"], "application/vnd.kinar": ["kne", "knp"], "application/vnd.koan": ["skp", "skd", "skt", "skm"], "application/vnd.kodak-descriptor": ["sse"], "application/vnd.las.las+xml": ["lasxml"], "application/vnd.llamagraphics.life-balance.desktop": ["lbd"], "application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"], "application/vnd.lotus-1-2-3": ["123"], "application/vnd.lotus-approach": ["apr"], "application/vnd.lotus-freelance": ["pre"], "application/vnd.lotus-notes": ["nsf"], "application/vnd.lotus-organizer": ["org"], "application/vnd.lotus-screencam": ["scm"], "application/vnd.lotus-wordpro": ["lwp"], "application/vnd.macports.portpkg": ["portpkg"], "application/vnd.mcd": ["mcd"], "application/vnd.medcalcdata": ["mc1"], "application/vnd.mediastation.cdkey": ["cdkey"], "application/vnd.mfer": ["mwf"], "application/vnd.mfmp": ["mfm"], "application/vnd.micrografx.flo": ["flo"], "application/vnd.micrografx.igx": ["igx"], "application/vnd.mif": ["mif"], "application/vnd.mobius.daf": ["daf"], "application/vnd.mobius.dis": ["dis"], "application/vnd.mobius.mbk": ["mbk"], "application/vnd.mobius.mqy": ["mqy"], "application/vnd.mobius.msl": ["msl"], "application/vnd.mobius.plc": ["plc"], "application/vnd.mobius.txf": ["txf"], "application/vnd.mophun.application": ["mpn"], "application/vnd.mophun.certificate": ["mpc"], "application/vnd.mozilla.xul+xml": ["xul"], "application/vnd.ms-artgalry": ["cil"], "application/vnd.ms-cab-compressed": ["cab"], "application/vnd.ms-excel": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"], "application/vnd.ms-excel.addin.macroenabled.12": ["xlam"], "application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"], "application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"], "application/vnd.ms-excel.template.macroenabled.12": ["xltm"], "application/vnd.ms-fontobject": ["eot"], "application/vnd.ms-htmlhelp": ["chm"], "application/vnd.ms-ims": ["ims"], "application/vnd.ms-lrm": ["lrm"], "application/vnd.ms-officetheme": ["thmx"], "application/vnd.ms-outlook": ["msg"], "application/vnd.ms-pki.seccat": ["cat"], "application/vnd.ms-pki.stl": ["stl"], "application/vnd.ms-powerpoint": ["ppt", "pps", "pot"], "application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"], "application/vnd.ms-powerpoint.presentation.macroenabled.12": ["pptm"], "application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"], "application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"], "application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"], "application/vnd.ms-project": ["mpp", "mpt"], "application/vnd.ms-word.document.macroenabled.12": ["docm"], "application/vnd.ms-word.template.macroenabled.12": ["dotm"], "application/vnd.ms-works": ["wps", "wks", "wcm", "wdb"], "application/vnd.ms-wpl": ["wpl"], "application/vnd.ms-xpsdocument": ["xps"], "application/vnd.mseq": ["mseq"], "application/vnd.musician": ["mus"], "application/vnd.muvee.style": ["msty"], "application/vnd.mynfc": ["taglet"], "application/vnd.neurolanguage.nlu": ["nlu"], "application/vnd.nitf": ["ntf", "nitf"], "application/vnd.noblenet-directory": ["nnd"], "application/vnd.noblenet-sealer": ["nns"], "application/vnd.noblenet-web": ["nnw"], "application/vnd.nokia.n-gage.data": ["ngdat"], "application/vnd.nokia.n-gage.symbian.install": ["n-gage"], "application/vnd.nokia.radio-preset": ["rpst"], "application/vnd.nokia.radio-presets": ["rpss"], "application/vnd.novadigm.edm": ["edm"], "application/vnd.novadigm.edx": ["edx"], "application/vnd.novadigm.ext": ["ext"], "application/vnd.oasis.opendocument.chart": ["odc"], "application/vnd.oasis.opendocument.chart-template": ["otc"], "application/vnd.oasis.opendocument.database": ["odb"], "application/vnd.oasis.opendocument.formula": ["odf"], "application/vnd.oasis.opendocument.formula-template": ["odft"], "application/vnd.oasis.opendocument.graphics": ["odg"], "application/vnd.oasis.opendocument.graphics-template": ["otg"], "application/vnd.oasis.opendocument.image": ["odi"], "application/vnd.oasis.opendocument.image-template": ["oti"], "application/vnd.oasis.opendocument.presentation": ["odp"], "application/vnd.oasis.opendocument.presentation-template": ["otp"], "application/vnd.oasis.opendocument.spreadsheet": ["ods"], "application/vnd.oasis.opendocument.spreadsheet-template": ["ots"], "application/vnd.oasis.opendocument.text": ["odt"], "application/vnd.oasis.opendocument.text-master": ["odm"], "application/vnd.oasis.opendocument.text-template": ["ott"], "application/vnd.oasis.opendocument.text-web": ["oth"], "application/vnd.olpc-sugar": ["xo"], "application/vnd.oma.dd2+xml": ["dd2"], "application/vnd.openofficeorg.extension": ["oxt"], "application/vnd.openxmlformats-officedocument.presentationml.presentation": ["pptx"], "application/vnd.openxmlformats-officedocument.presentationml.slide": ["sldx"], "application/vnd.openxmlformats-officedocument.presentationml.slideshow": ["ppsx"], "application/vnd.openxmlformats-officedocument.presentationml.template": ["potx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ["xlsx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.template": ["xltx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ["docx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.template": ["dotx"], "application/vnd.osgeo.mapguide.package": ["mgp"], "application/vnd.osgi.dp": ["dp"], "application/vnd.osgi.subsystem": ["esa"], "application/vnd.palm": ["pdb", "pqa", "oprc"], "application/vnd.pawaafile": ["paw"], "application/vnd.pg.format": ["str"], "application/vnd.pg.osasli": ["ei6"], "application/vnd.picsel": ["efif"], "application/vnd.pmi.widget": ["wg"], "application/vnd.pocketlearn": ["plf"], "application/vnd.powerbuilder6": ["pbd"], "application/vnd.previewsystems.box": ["box"], "application/vnd.proteus.magazine": ["mgz"], "application/vnd.publishare-delta-tree": ["qps"], "application/vnd.pvi.ptid1": ["ptid"], "application/vnd.quark.quarkxpress": ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"], "application/vnd.realvnc.bed": ["bed"], "application/vnd.recordare.musicxml": ["mxl"], "application/vnd.recordare.musicxml+xml": ["musicxml"], "application/vnd.rig.cryptonote": ["cryptonote"], "application/vnd.rim.cod": ["cod"], "application/vnd.rn-realmedia": ["rm"], "application/vnd.rn-realmedia-vbr": ["rmvb"], "application/vnd.route66.link66+xml": ["link66"], "application/vnd.sailingtracker.track": ["st"], "application/vnd.seemail": ["see"], "application/vnd.sema": ["sema"], "application/vnd.semd": ["semd"], "application/vnd.semf": ["semf"], "application/vnd.shana.informed.formdata": ["ifm"], "application/vnd.shana.informed.formtemplate": ["itp"], "application/vnd.shana.informed.interchange": ["iif"], "application/vnd.shana.informed.package": ["ipk"], "application/vnd.simtech-mindmapper": ["twd", "twds"], "application/vnd.smaf": ["mmf"], "application/vnd.smart.teacher": ["teacher"], "application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"], "application/vnd.spotfire.dxp": ["dxp"], "application/vnd.spotfire.sfs": ["sfs"], "application/vnd.stardivision.calc": ["sdc"], "application/vnd.stardivision.draw": ["sda"], "application/vnd.stardivision.impress": ["sdd"], "application/vnd.stardivision.math": ["smf"], "application/vnd.stardivision.writer": ["sdw", "vor"], "application/vnd.stardivision.writer-global": ["sgl"], "application/vnd.stepmania.package": ["smzip"], "application/vnd.stepmania.stepchart": ["sm"], "application/vnd.sun.wadl+xml": ["wadl"], "application/vnd.sun.xml.calc": ["sxc"], "application/vnd.sun.xml.calc.template": ["stc"], "application/vnd.sun.xml.draw": ["sxd"], "application/vnd.sun.xml.draw.template": ["std"], "application/vnd.sun.xml.impress": ["sxi"], "application/vnd.sun.xml.impress.template": ["sti"], "application/vnd.sun.xml.math": ["sxm"], "application/vnd.sun.xml.writer": ["sxw"], "application/vnd.sun.xml.writer.global": ["sxg"], "application/vnd.sun.xml.writer.template": ["stw"], "application/vnd.sus-calendar": ["sus", "susp"], "application/vnd.svd": ["svd"], "application/vnd.symbian.install": ["sis", "sisx"], "application/vnd.syncml+xml": ["xsm"], "application/vnd.syncml.dm+wbxml": ["bdm"], "application/vnd.syncml.dm+xml": ["xdm"], "application/vnd.tao.intent-module-archive": ["tao"], "application/vnd.tcpdump.pcap": ["pcap", "cap", "dmp"], "application/vnd.tmobile-livetv": ["tmo"], "application/vnd.trid.tpt": ["tpt"], "application/vnd.triscape.mxs": ["mxs"], "application/vnd.trueapp": ["tra"], "application/vnd.ufdl": ["ufd", "ufdl"], "application/vnd.uiq.theme": ["utz"], "application/vnd.umajin": ["umj"], "application/vnd.unity": ["unityweb"], "application/vnd.uoml+xml": ["uoml"], "application/vnd.vcx": ["vcx"], "application/vnd.visio": ["vsd", "vst", "vss", "vsw"], "application/vnd.visionary": ["vis"], "application/vnd.vsf": ["vsf"], "application/vnd.wap.wbxml": ["wbxml"], "application/vnd.wap.wmlc": ["wmlc"], "application/vnd.wap.wmlscriptc": ["wmlsc"], "application/vnd.webturbo": ["wtb"], "application/vnd.wolfram.player": ["nbp"], "application/vnd.wordperfect": ["wpd"], "application/vnd.wqd": ["wqd"], "application/vnd.wt.stf": ["stf"], "application/vnd.xara": ["xar"], "application/vnd.xfdl": ["xfdl"], "application/vnd.yamaha.hv-dic": ["hvd"], "application/vnd.yamaha.hv-script": ["hvs"], "application/vnd.yamaha.hv-voice": ["hvp"], "application/vnd.yamaha.openscoreformat": ["osf"], "application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"], "application/vnd.yamaha.smaf-audio": ["saf"], "application/vnd.yamaha.smaf-phrase": ["spf"], "application/vnd.yellowriver-custom-menu": ["cmp"], "application/vnd.zul": ["zir", "zirz"], "application/vnd.zzazz.deck+xml": ["zaz"], "application/voicexml+xml": ["vxml"], "application/wasm": ["wasm"], "application/widget": ["wgt"], "application/winhlp": ["hlp"], "application/wsdl+xml": ["wsdl"], "application/wspolicy+xml": ["wspolicy"], "application/x-7z-compressed": ["7z"], "application/x-abiword": ["abw"], "application/x-ace-compressed": ["ace"], "application/x-apple-diskimage": [], "application/x-arj": ["arj"], "application/x-authorware-bin": ["aab", "x32", "u32", "vox"], "application/x-authorware-map": ["aam"], "application/x-authorware-seg": ["aas"], "application/x-bcpio": ["bcpio"], "application/x-bdoc": [], "application/x-bittorrent": ["torrent"], "application/x-blorb": ["blb", "blorb"], "application/x-bzip": ["bz"], "application/x-bzip2": ["bz2", "boz"], "application/x-cbr": ["cbr", "cba", "cbt", "cbz", "cb7"], "application/x-cdlink": ["vcd"], "application/x-cfs-compressed": ["cfs"], "application/x-chat": ["chat"], "application/x-chess-pgn": ["pgn"], "application/x-chrome-extension": ["crx"], "application/x-cocoa": ["cco"], "application/x-conference": ["nsc"], "application/x-cpio": ["cpio"], "application/x-csh": ["csh"], "application/x-debian-package": ["udeb"], "application/x-dgc-compressed": ["dgc"], "application/x-director": ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"], "application/x-doom": ["wad"], "application/x-dtbncx+xml": ["ncx"], "application/x-dtbook+xml": ["dtb"], "application/x-dtbresource+xml": ["res"], "application/x-dvi": ["dvi"], "application/x-envoy": ["evy"], "application/x-eva": ["eva"], "application/x-font-bdf": ["bdf"], "application/x-font-ghostscript": ["gsf"], "application/x-font-linux-psf": ["psf"], "application/x-font-pcf": ["pcf"], "application/x-font-snf": ["snf"], "application/x-font-type1": ["pfa", "pfb", "pfm", "afm"], "application/x-freearc": ["arc"], "application/x-futuresplash": ["spl"], "application/x-gca-compressed": ["gca"], "application/x-glulx": ["ulx"], "application/x-gnumeric": ["gnumeric"], "application/x-gramps-xml": ["gramps"], "application/x-gtar": ["gtar"], "application/x-hdf": ["hdf"], "application/x-httpd-php": ["php"], "application/x-install-instructions": ["install"], "application/x-iso9660-image": [], "application/x-java-archive-diff": ["jardiff"], "application/x-java-jnlp-file": ["jnlp"], "application/x-latex": ["latex"], "application/x-lua-bytecode": ["luac"], "application/x-lzh-compressed": ["lzh", "lha"], "application/x-makeself": ["run"], "application/x-mie": ["mie"], "application/x-mobipocket-ebook": ["prc", "mobi"], "application/x-ms-application": ["application"], "application/x-ms-shortcut": ["lnk"], "application/x-ms-wmd": ["wmd"], "application/x-ms-wmz": ["wmz"], "application/x-ms-xbap": ["xbap"], "application/x-msaccess": ["mdb"], "application/x-msbinder": ["obd"], "application/x-mscardfile": ["crd"], "application/x-msclip": ["clp"], "application/x-msdos-program": [], "application/x-msdownload": ["com", "bat"], "application/x-msmediaview": ["mvb", "m13", "m14"], "application/x-msmetafile": ["wmf", "emf", "emz"], "application/x-msmoney": ["mny"], "application/x-mspublisher": ["pub"], "application/x-msschedule": ["scd"], "application/x-msterminal": ["trm"], "application/x-mswrite": ["wri"], "application/x-netcdf": ["nc", "cdf"], "application/x-ns-proxy-autoconfig": ["pac"], "application/x-nzb": ["nzb"], "application/x-perl": ["pl", "pm"], "application/x-pilot": [], "application/x-pkcs12": ["p12", "pfx"], "application/x-pkcs7-certificates": ["p7b", "spc"], "application/x-pkcs7-certreqresp": ["p7r"], "application/x-rar-compressed": ["rar"], "application/x-redhat-package-manager": ["rpm"], "application/x-research-info-systems": ["ris"], "application/x-sea": ["sea"], "application/x-sh": ["sh"], "application/x-shar": ["shar"], "application/x-shockwave-flash": ["swf"], "application/x-silverlight-app": ["xap"], "application/x-sql": ["sql"], "application/x-stuffit": ["sit"], "application/x-stuffitx": ["sitx"], "application/x-subrip": ["srt"], "application/x-sv4cpio": ["sv4cpio"], "application/x-sv4crc": ["sv4crc"], "application/x-t3vm-image": ["t3"], "application/x-tads": ["gam"], "application/x-tar": ["tar"], "application/x-tcl": ["tcl", "tk"], "application/x-tex": ["tex"], "application/x-tex-tfm": ["tfm"], "application/x-texinfo": ["texinfo", "texi"], "application/x-tgif": ["obj"], "application/x-ustar": ["ustar"], "application/x-virtualbox-hdd": ["hdd"], "application/x-virtualbox-ova": ["ova"], "application/x-virtualbox-ovf": ["ovf"], "application/x-virtualbox-vbox": ["vbox"], "application/x-virtualbox-vbox-extpack": ["vbox-extpack"], "application/x-virtualbox-vdi": ["vdi"], "application/x-virtualbox-vhd": ["vhd"], "application/x-virtualbox-vmdk": ["vmdk"], "application/x-wais-source": ["src"], "application/x-web-app-manifest+json": ["webapp"], "application/x-x509-ca-cert": ["der", "crt", "pem"], "application/x-xfig": ["fig"], "application/x-xliff+xml": ["xlf"], "application/x-xpinstall": ["xpi"], "application/x-xz": ["xz"], "application/x-zmachine": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"], "application/xaml+xml": ["xaml"], "application/xcap-diff+xml": ["xdf"], "application/xenc+xml": ["xenc"], "application/xhtml+xml": ["xhtml", "xht"], "application/xml": ["xml", "xsl", "xsd", "rng"], "application/xml-dtd": ["dtd"], "application/xop+xml": ["xop"], "application/xproc+xml": ["xpl"], "application/xslt+xml": ["xslt"], "application/xspf+xml": ["xspf"], "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"], "application/yang": ["yang"], "application/yin+xml": ["yin"], "application/zip": ["zip"], "audio/3gpp": [], "audio/adpcm": ["adp"], "audio/basic": ["au", "snd"], "audio/midi": ["mid", "midi", "kar", "rmi"], "audio/mp3": [], "audio/mp4": ["m4a", "mp4a"], "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"], "audio/ogg": ["oga", "ogg", "spx"], "audio/s3m": ["s3m"], "audio/silk": ["sil"], "audio/vnd.dece.audio": ["uva", "uvva"], "audio/vnd.digital-winds": ["eol"], "audio/vnd.dra": ["dra"], "audio/vnd.dts": ["dts"], "audio/vnd.dts.hd": ["dtshd"], "audio/vnd.lucent.voice": ["lvp"], "audio/vnd.ms-playready.media.pya": ["pya"], "audio/vnd.nuera.ecelp4800": ["ecelp4800"], "audio/vnd.nuera.ecelp7470": ["ecelp7470"], "audio/vnd.nuera.ecelp9600": ["ecelp9600"], "audio/vnd.rip": ["rip"], "audio/wav": ["wav"], "audio/wave": [], "audio/webm": ["weba"], "audio/x-aac": ["aac"], "audio/x-aiff": ["aif", "aiff", "aifc"], "audio/x-caf": ["caf"], "audio/x-flac": ["flac"], "audio/x-m4a": [], "audio/x-matroska": ["mka"], "audio/x-mpegurl": ["m3u"], "audio/x-ms-wax": ["wax"], "audio/x-ms-wma": ["wma"], "audio/x-pn-realaudio": ["ram", "ra"], "audio/x-pn-realaudio-plugin": ["rmp"], "audio/x-realaudio": [], "audio/x-wav": [], "audio/xm": ["xm"], "chemical/x-cdx": ["cdx"], "chemical/x-cif": ["cif"], "chemical/x-cmdf": ["cmdf"], "chemical/x-cml": ["cml"], "chemical/x-csml": ["csml"], "chemical/x-xyz": ["xyz"], "font/collection": ["ttc"], "font/otf": ["otf"], "font/ttf": ["ttf"], "font/woff": ["woff"], "font/woff2": ["woff2"], "image/apng": ["apng"], "image/bmp": ["bmp"], "image/cgm": ["cgm"], "image/g3fax": ["g3"], "image/gif": ["gif"], "image/ief": ["ief"], "image/jp2": ["jp2", "jpg2"], "image/jpeg": ["jpeg", "jpg", "jpe"], "image/jpm": ["jpm"], "image/jpx": ["jpx", "jpf"], "image/ktx": ["ktx"], "image/png": ["png"], "image/prs.btif": ["btif"], "image/sgi": ["sgi"], "image/svg+xml": ["svg", "svgz"], "image/tiff": ["tiff", "tif"], "image/vnd.adobe.photoshop": ["psd"], "image/vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"], "image/vnd.djvu": ["djvu", "djv"], "image/vnd.dvb.subtitle": [], "image/vnd.dwg": ["dwg"], "image/vnd.dxf": ["dxf"], "image/vnd.fastbidsheet": ["fbs"], "image/vnd.fpx": ["fpx"], "image/vnd.fst": ["fst"], "image/vnd.fujixerox.edmics-mmr": ["mmr"], "image/vnd.fujixerox.edmics-rlc": ["rlc"], "image/vnd.ms-modi": ["mdi"], "image/vnd.ms-photo": ["wdp"], "image/vnd.net-fpx": ["npx"], "image/vnd.wap.wbmp": ["wbmp"], "image/vnd.xiff": ["xif"], "image/webp": ["webp"], "image/x-3ds": ["3ds"], "image/x-cmu-raster": ["ras"], "image/x-cmx": ["cmx"], "image/x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"], "image/x-icon": ["ico"], "image/x-jng": ["jng"], "image/x-mrsid-image": ["sid"], "image/x-ms-bmp": [], "image/x-pcx": ["pcx"], "image/x-pict": ["pic", "pct"], "image/x-portable-anymap": ["pnm"], "image/x-portable-bitmap": ["pbm"], "image/x-portable-graymap": ["pgm"], "image/x-portable-pixmap": ["ppm"], "image/x-rgb": ["rgb"], "image/x-tga": ["tga"], "image/x-xbitmap": ["xbm"], "image/x-xpixmap": ["xpm"], "image/x-xwindowdump": ["xwd"], "message/rfc822": ["eml", "mime"], "model/gltf+json": ["gltf"], "model/gltf-binary": ["glb"], "model/iges": ["igs", "iges"], "model/mesh": ["msh", "mesh", "silo"], "model/vnd.collada+xml": ["dae"], "model/vnd.dwf": ["dwf"], "model/vnd.gdl": ["gdl"], "model/vnd.gtw": ["gtw"], "model/vnd.mts": ["mts"], "model/vnd.vtu": ["vtu"], "model/vrml": ["wrl", "vrml"], "model/x3d+binary": ["x3db", "x3dbz"], "model/x3d+vrml": ["x3dv", "x3dvz"], "model/x3d+xml": ["x3d", "x3dz"], "text/cache-manifest": ["appcache", "manifest"], "text/calendar": ["ics", "ifb"], "text/coffeescript": ["coffee", "litcoffee"], "text/css": ["css"], "text/csv": ["csv"], "text/hjson": ["hjson"], "text/html": ["html", "htm", "shtml"], "text/jade": ["jade"], "text/jsx": ["jsx"], "text/less": ["less"], "text/markdown": ["markdown", "md"], "text/mathml": ["mml"], "text/n3": ["n3"], "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"], "text/prs.lines.tag": ["dsc"], "text/richtext": ["rtx"], "text/rtf": [], "text/sgml": ["sgml", "sgm"], "text/slim": ["slim", "slm"], "text/stylus": ["stylus", "styl"], "text/tab-separated-values": ["tsv"], "text/troff": ["t", "tr", "roff", "man", "me", "ms"], "text/turtle": ["ttl"], "text/uri-list": ["uri", "uris", "urls"], "text/vcard": ["vcard"], "text/vnd.curl": ["curl"], "text/vnd.curl.dcurl": ["dcurl"], "text/vnd.curl.mcurl": ["mcurl"], "text/vnd.curl.scurl": ["scurl"], "text/vnd.dvb.subtitle": ["sub"], "text/vnd.fly": ["fly"], "text/vnd.fmi.flexstor": ["flx"], "text/vnd.graphviz": ["gv"], "text/vnd.in3d.3dml": ["3dml"], "text/vnd.in3d.spot": ["spot"], "text/vnd.sun.j2me.app-descriptor": ["jad"], "text/vnd.wap.wml": ["wml"], "text/vnd.wap.wmlscript": ["wmls"], "text/vtt": ["vtt"], "text/x-asm": ["s", "asm"], "text/x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"], "text/x-component": ["htc"], "text/x-fortran": ["f", "for", "f77", "f90"], "text/x-handlebars-template": ["hbs"], "text/x-java-source": ["java"], "text/x-lua": ["lua"], "text/x-markdown": ["mkd"], "text/x-nfo": ["nfo"], "text/x-opml": ["opml"], "text/x-org": [], "text/x-pascal": ["p", "pas"], "text/x-processing": ["pde"], "text/x-sass": ["sass"], "text/x-scss": ["scss"], "text/x-setext": ["etx"], "text/x-sfv": ["sfv"], "text/x-suse-ymp": ["ymp"], "text/x-uuencode": ["uu"], "text/x-vcalendar": ["vcs"], "text/x-vcard": ["vcf"], "text/xml": [], "text/yaml": ["yaml", "yml"], "video/3gpp": ["3gp", "3gpp"], "video/3gpp2": ["3g2"], "video/h261": ["h261"], "video/h263": ["h263"], "video/h264": ["h264"], "video/jpeg": ["jpgv"], "video/jpm": ["jpgm"], "video/mj2": ["mj2", "mjp2"], "video/mp2t": ["ts"], "video/mp4": ["mp4", "mp4v", "mpg4"], "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"], "video/ogg": ["ogv"], "video/quicktime": ["qt", "mov"], "video/vnd.dece.hd": ["uvh", "uvvh"], "video/vnd.dece.mobile": ["uvm", "uvvm"], "video/vnd.dece.pd": ["uvp", "uvvp"], "video/vnd.dece.sd": ["uvs", "uvvs"], "video/vnd.dece.video": ["uvv", "uvvv"], "video/vnd.dvb.file": ["dvb"], "video/vnd.fvt": ["fvt"], "video/vnd.mpegurl": ["mxu", "m4u"], "video/vnd.ms-playready.media.pyv": ["pyv"], "video/vnd.uvvu.mp4": ["uvu", "uvvu"], "video/vnd.vivo": ["viv"], "video/webm": ["webm"], "video/x-f4v": ["f4v"], "video/x-fli": ["fli"], "video/x-flv": ["flv"], "video/x-m4v": ["m4v"], "video/x-matroska": ["mkv", "mk3d", "mks"], "video/x-mng": ["mng"], "video/x-ms-asf": ["asf", "asx"], "video/x-ms-vob": ["vob"], "video/x-ms-wm": ["wm"], "video/x-ms-wmv": ["wmv"], "video/x-ms-wmx": ["wmx"], "video/x-ms-wvx": ["wvx"], "video/x-msvideo": ["avi"], "video/x-sgi-movie": ["movie"], "video/x-smv": ["smv"], "x-conference/x-cooltalk": ["ice"] };
  }
});

// node_modules/send/node_modules/mime/mime.js
var require_mime = __commonJS({
  "node_modules/send/node_modules/mime/mime.js"(exports, module) {
    var path = __require("path");
    var fs = __require("fs");
    function Mime() {
      this.types = /* @__PURE__ */ Object.create(null);
      this.extensions = /* @__PURE__ */ Object.create(null);
    }
    Mime.prototype.define = function(map) {
      for (var type in map) {
        var exts = map[type];
        for (var i = 0; i < exts.length; i++) {
          if (process.env.DEBUG_MIME && this.types[exts[i]]) {
            console.warn((this._loading || "define()").replace(/.*\//, ""), 'changes "' + exts[i] + '" extension type from ' + this.types[exts[i]] + " to " + type);
          }
          this.types[exts[i]] = type;
        }
        if (!this.extensions[type]) {
          this.extensions[type] = exts[0];
        }
      }
    };
    Mime.prototype.load = function(file) {
      this._loading = file;
      var map = {}, content = fs.readFileSync(file, "ascii"), lines = content.split(/[\r\n]+/);
      lines.forEach(function(line) {
        var fields = line.replace(/\s*#.*|^\s*|\s*$/g, "").split(/\s+/);
        map[fields.shift()] = fields;
      });
      this.define(map);
      this._loading = null;
    };
    Mime.prototype.lookup = function(path2, fallback) {
      var ext = path2.replace(/^.*[\.\/\\]/, "").toLowerCase();
      return this.types[ext] || fallback || this.default_type;
    };
    Mime.prototype.extension = function(mimeType) {
      var type = mimeType.match(/^\s*([^;\s]*)(?:;|\s|$)/)[1].toLowerCase();
      return this.extensions[type];
    };
    var mime = new Mime();
    mime.define(require_types());
    mime.default_type = mime.lookup("bin");
    mime.Mime = Mime;
    mime.charsets = {
      lookup: function(mimeType, fallback) {
        return /^text\/|^application\/(javascript|json)/.test(mimeType) ? "UTF-8" : fallback;
      }
    };
    module.exports = mime;
  }
});

// node_modules/ms/index.js
var require_ms4 = __commonJS({
  "node_modules/ms/index.js"(exports, module) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/range-parser/index.js
var require_range_parser = __commonJS({
  "node_modules/range-parser/index.js"(exports, module) {
    "use strict";
    module.exports = rangeParser;
    function rangeParser(size, str, options) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var index = str.indexOf("=");
      if (index === -1) {
        return -2;
      }
      var arr = str.slice(index + 1).split(",");
      var ranges = [];
      ranges.type = str.slice(0, index);
      for (var i = 0; i < arr.length; i++) {
        var range = arr[i].split("-");
        var start = parseInt(range[0], 10);
        var end = parseInt(range[1], 10);
        if (isNaN(start)) {
          start = size - end;
          end = size - 1;
        } else if (isNaN(end)) {
          end = size - 1;
        }
        if (end > size - 1) {
          end = size - 1;
        }
        if (isNaN(start) || isNaN(end) || start > end || start < 0) {
          continue;
        }
        ranges.push({
          start,
          end
        });
      }
      if (ranges.length < 1) {
        return -1;
      }
      return options && options.combine ? combineRanges(ranges) : ranges;
    }
    function combineRanges(ranges) {
      var ordered = ranges.map(mapWithIndex).sort(sortByRangeStart);
      for (var j = 0, i = 1; i < ordered.length; i++) {
        var range = ordered[i];
        var current = ordered[j];
        if (range.start > current.end + 1) {
          ordered[++j] = range;
        } else if (range.end > current.end) {
          current.end = range.end;
          current.index = Math.min(current.index, range.index);
        }
      }
      ordered.length = j + 1;
      var combined = ordered.sort(sortByRangeIndex).map(mapWithoutIndex);
      combined.type = ranges.type;
      return combined;
    }
    function mapWithIndex(range, index) {
      return {
        start: range.start,
        end: range.end,
        index
      };
    }
    function mapWithoutIndex(range) {
      return {
        start: range.start,
        end: range.end
      };
    }
    function sortByRangeIndex(a, b) {
      return a.index - b.index;
    }
    function sortByRangeStart(a, b) {
      return a.start - b.start;
    }
  }
});

// node_modules/send/index.js
var require_send = __commonJS({
  "node_modules/send/index.js"(exports, module) {
    "use strict";
    var createError = require_http_errors();
    var debug = require_src3()("send");
    var deprecate = require_depd()("send");
    var destroy = require_destroy();
    var encodeUrl = require_encodeurl2();
    var escapeHtml = require_escape_html();
    var etag = require_etag();
    var fresh = require_fresh();
    var fs = __require("fs");
    var mime = require_mime();
    var ms = require_ms4();
    var onFinished = require_on_finished();
    var parseRange = require_range_parser();
    var path = __require("path");
    var statuses = require_statuses();
    var Stream = __require("stream");
    var util = __require("util");
    var extname = path.extname;
    var join = path.join;
    var normalize = path.normalize;
    var resolve = path.resolve;
    var sep = path.sep;
    var BYTES_RANGE_REGEXP = /^ *bytes=/;
    var MAX_MAXAGE = 60 * 60 * 24 * 365 * 1e3;
    var UP_PATH_REGEXP = /(?:^|[\\/])\.\.(?:[\\/]|$)/;
    module.exports = send;
    module.exports.mime = mime;
    function send(req, path2, options) {
      return new SendStream(req, path2, options);
    }
    function SendStream(req, path2, options) {
      Stream.call(this);
      var opts = options || {};
      this.options = opts;
      this.path = path2;
      this.req = req;
      this._acceptRanges = opts.acceptRanges !== void 0 ? Boolean(opts.acceptRanges) : true;
      this._cacheControl = opts.cacheControl !== void 0 ? Boolean(opts.cacheControl) : true;
      this._etag = opts.etag !== void 0 ? Boolean(opts.etag) : true;
      this._dotfiles = opts.dotfiles !== void 0 ? opts.dotfiles : "ignore";
      if (this._dotfiles !== "ignore" && this._dotfiles !== "allow" && this._dotfiles !== "deny") {
        throw new TypeError('dotfiles option must be "allow", "deny", or "ignore"');
      }
      this._hidden = Boolean(opts.hidden);
      if (opts.hidden !== void 0) {
        deprecate("hidden: use dotfiles: '" + (this._hidden ? "allow" : "ignore") + "' instead");
      }
      if (opts.dotfiles === void 0) {
        this._dotfiles = void 0;
      }
      this._extensions = opts.extensions !== void 0 ? normalizeList(opts.extensions, "extensions option") : [];
      this._immutable = opts.immutable !== void 0 ? Boolean(opts.immutable) : false;
      this._index = opts.index !== void 0 ? normalizeList(opts.index, "index option") : ["index.html"];
      this._lastModified = opts.lastModified !== void 0 ? Boolean(opts.lastModified) : true;
      this._maxage = opts.maxAge || opts.maxage;
      this._maxage = typeof this._maxage === "string" ? ms(this._maxage) : Number(this._maxage);
      this._maxage = !isNaN(this._maxage) ? Math.min(Math.max(0, this._maxage), MAX_MAXAGE) : 0;
      this._root = opts.root ? resolve(opts.root) : null;
      if (!this._root && opts.from) {
        this.from(opts.from);
      }
    }
    util.inherits(SendStream, Stream);
    SendStream.prototype.etag = deprecate.function(function etag2(val) {
      this._etag = Boolean(val);
      debug("etag %s", this._etag);
      return this;
    }, "send.etag: pass etag as option");
    SendStream.prototype.hidden = deprecate.function(function hidden(val) {
      this._hidden = Boolean(val);
      this._dotfiles = void 0;
      debug("hidden %s", this._hidden);
      return this;
    }, "send.hidden: use dotfiles option");
    SendStream.prototype.index = deprecate.function(function index(paths) {
      var index2 = !paths ? [] : normalizeList(paths, "paths argument");
      debug("index %o", paths);
      this._index = index2;
      return this;
    }, "send.index: pass index as option");
    SendStream.prototype.root = function root(path2) {
      this._root = resolve(String(path2));
      debug("root %s", this._root);
      return this;
    };
    SendStream.prototype.from = deprecate.function(SendStream.prototype.root, "send.from: pass root as option");
    SendStream.prototype.root = deprecate.function(SendStream.prototype.root, "send.root: pass root as option");
    SendStream.prototype.maxage = deprecate.function(function maxage(maxAge) {
      this._maxage = typeof maxAge === "string" ? ms(maxAge) : Number(maxAge);
      this._maxage = !isNaN(this._maxage) ? Math.min(Math.max(0, this._maxage), MAX_MAXAGE) : 0;
      debug("max-age %d", this._maxage);
      return this;
    }, "send.maxage: pass maxAge as option");
    SendStream.prototype.error = function error(status, err) {
      if (hasListeners(this, "error")) {
        return this.emit("error", createHttpError(status, err));
      }
      var res = this.res;
      var msg = statuses.message[status] || String(status);
      var doc = createHtmlDocument("Error", escapeHtml(msg));
      clearHeaders(res);
      if (err && err.headers) {
        setHeaders(res, err.headers);
      }
      res.statusCode = status;
      res.setHeader("Content-Type", "text/html; charset=UTF-8");
      res.setHeader("Content-Length", Buffer.byteLength(doc));
      res.setHeader("Content-Security-Policy", "default-src 'none'");
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.end(doc);
    };
    SendStream.prototype.hasTrailingSlash = function hasTrailingSlash() {
      return this.path[this.path.length - 1] === "/";
    };
    SendStream.prototype.isConditionalGET = function isConditionalGET() {
      return this.req.headers["if-match"] || this.req.headers["if-unmodified-since"] || this.req.headers["if-none-match"] || this.req.headers["if-modified-since"];
    };
    SendStream.prototype.isPreconditionFailure = function isPreconditionFailure() {
      var req = this.req;
      var res = this.res;
      var match = req.headers["if-match"];
      if (match) {
        var etag2 = res.getHeader("ETag");
        return !etag2 || match !== "*" && parseTokenList(match).every(function(match2) {
          return match2 !== etag2 && match2 !== "W/" + etag2 && "W/" + match2 !== etag2;
        });
      }
      var unmodifiedSince = parseHttpDate(req.headers["if-unmodified-since"]);
      if (!isNaN(unmodifiedSince)) {
        var lastModified = parseHttpDate(res.getHeader("Last-Modified"));
        return isNaN(lastModified) || lastModified > unmodifiedSince;
      }
      return false;
    };
    SendStream.prototype.removeContentHeaderFields = function removeContentHeaderFields() {
      var res = this.res;
      res.removeHeader("Content-Encoding");
      res.removeHeader("Content-Language");
      res.removeHeader("Content-Length");
      res.removeHeader("Content-Range");
      res.removeHeader("Content-Type");
    };
    SendStream.prototype.notModified = function notModified() {
      var res = this.res;
      debug("not modified");
      this.removeContentHeaderFields();
      res.statusCode = 304;
      res.end();
    };
    SendStream.prototype.headersAlreadySent = function headersAlreadySent() {
      var err = new Error("Can't set headers after they are sent.");
      debug("headers already sent");
      this.error(500, err);
    };
    SendStream.prototype.isCachable = function isCachable() {
      var statusCode = this.res.statusCode;
      return statusCode >= 200 && statusCode < 300 || statusCode === 304;
    };
    SendStream.prototype.onStatError = function onStatError(error) {
      switch (error.code) {
        case "ENAMETOOLONG":
        case "ENOENT":
        case "ENOTDIR":
          this.error(404, error);
          break;
        default:
          this.error(500, error);
          break;
      }
    };
    SendStream.prototype.isFresh = function isFresh() {
      return fresh(this.req.headers, {
        etag: this.res.getHeader("ETag"),
        "last-modified": this.res.getHeader("Last-Modified")
      });
    };
    SendStream.prototype.isRangeFresh = function isRangeFresh() {
      var ifRange = this.req.headers["if-range"];
      if (!ifRange) {
        return true;
      }
      if (ifRange.indexOf('"') !== -1) {
        var etag2 = this.res.getHeader("ETag");
        return Boolean(etag2 && ifRange.indexOf(etag2) !== -1);
      }
      var lastModified = this.res.getHeader("Last-Modified");
      return parseHttpDate(lastModified) <= parseHttpDate(ifRange);
    };
    SendStream.prototype.redirect = function redirect(path2) {
      var res = this.res;
      if (hasListeners(this, "directory")) {
        this.emit("directory", res, path2);
        return;
      }
      if (this.hasTrailingSlash()) {
        this.error(403);
        return;
      }
      var loc = encodeUrl(collapseLeadingSlashes(this.path + "/"));
      var doc = createHtmlDocument("Redirecting", "Redirecting to " + escapeHtml(loc));
      res.statusCode = 301;
      res.setHeader("Content-Type", "text/html; charset=UTF-8");
      res.setHeader("Content-Length", Buffer.byteLength(doc));
      res.setHeader("Content-Security-Policy", "default-src 'none'");
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.setHeader("Location", loc);
      res.end(doc);
    };
    SendStream.prototype.pipe = function pipe(res) {
      var root = this._root;
      this.res = res;
      var path2 = decode(this.path);
      if (path2 === -1) {
        this.error(400);
        return res;
      }
      if (~path2.indexOf("\0")) {
        this.error(400);
        return res;
      }
      var parts;
      if (root !== null) {
        if (path2) {
          path2 = normalize("." + sep + path2);
        }
        if (UP_PATH_REGEXP.test(path2)) {
          debug('malicious path "%s"', path2);
          this.error(403);
          return res;
        }
        parts = path2.split(sep);
        path2 = normalize(join(root, path2));
      } else {
        if (UP_PATH_REGEXP.test(path2)) {
          debug('malicious path "%s"', path2);
          this.error(403);
          return res;
        }
        parts = normalize(path2).split(sep);
        path2 = resolve(path2);
      }
      if (containsDotFile(parts)) {
        var access = this._dotfiles;
        if (access === void 0) {
          access = parts[parts.length - 1][0] === "." ? this._hidden ? "allow" : "ignore" : "allow";
        }
        debug('%s dotfile "%s"', access, path2);
        switch (access) {
          case "allow":
            break;
          case "deny":
            this.error(403);
            return res;
          case "ignore":
          default:
            this.error(404);
            return res;
        }
      }
      if (this._index.length && this.hasTrailingSlash()) {
        this.sendIndex(path2);
        return res;
      }
      this.sendFile(path2);
      return res;
    };
    SendStream.prototype.send = function send2(path2, stat) {
      var len = stat.size;
      var options = this.options;
      var opts = {};
      var res = this.res;
      var req = this.req;
      var ranges = req.headers.range;
      var offset = options.start || 0;
      if (headersSent(res)) {
        this.headersAlreadySent();
        return;
      }
      debug('pipe "%s"', path2);
      this.setHeader(path2, stat);
      this.type(path2);
      if (this.isConditionalGET()) {
        if (this.isPreconditionFailure()) {
          this.error(412);
          return;
        }
        if (this.isCachable() && this.isFresh()) {
          this.notModified();
          return;
        }
      }
      len = Math.max(0, len - offset);
      if (options.end !== void 0) {
        var bytes = options.end - offset + 1;
        if (len > bytes) len = bytes;
      }
      if (this._acceptRanges && BYTES_RANGE_REGEXP.test(ranges)) {
        ranges = parseRange(len, ranges, {
          combine: true
        });
        if (!this.isRangeFresh()) {
          debug("range stale");
          ranges = -2;
        }
        if (ranges === -1) {
          debug("range unsatisfiable");
          res.setHeader("Content-Range", contentRange("bytes", len));
          return this.error(416, {
            headers: {
              "Content-Range": res.getHeader("Content-Range")
            }
          });
        }
        if (ranges !== -2 && ranges.length === 1) {
          debug("range %j", ranges);
          res.statusCode = 206;
          res.setHeader("Content-Range", contentRange("bytes", len, ranges[0]));
          offset += ranges[0].start;
          len = ranges[0].end - ranges[0].start + 1;
        }
      }
      for (var prop in options) {
        opts[prop] = options[prop];
      }
      opts.start = offset;
      opts.end = Math.max(offset, offset + len - 1);
      res.setHeader("Content-Length", len);
      if (req.method === "HEAD") {
        res.end();
        return;
      }
      this.stream(path2, opts);
    };
    SendStream.prototype.sendFile = function sendFile(path2) {
      var i = 0;
      var self = this;
      debug('stat "%s"', path2);
      fs.stat(path2, function onstat(err, stat) {
        if (err && err.code === "ENOENT" && !extname(path2) && path2[path2.length - 1] !== sep) {
          return next(err);
        }
        if (err) return self.onStatError(err);
        if (stat.isDirectory()) return self.redirect(path2);
        self.emit("file", path2, stat);
        self.send(path2, stat);
      });
      function next(err) {
        if (self._extensions.length <= i) {
          return err ? self.onStatError(err) : self.error(404);
        }
        var p = path2 + "." + self._extensions[i++];
        debug('stat "%s"', p);
        fs.stat(p, function(err2, stat) {
          if (err2) return next(err2);
          if (stat.isDirectory()) return next();
          self.emit("file", p, stat);
          self.send(p, stat);
        });
      }
    };
    SendStream.prototype.sendIndex = function sendIndex(path2) {
      var i = -1;
      var self = this;
      function next(err) {
        if (++i >= self._index.length) {
          if (err) return self.onStatError(err);
          return self.error(404);
        }
        var p = join(path2, self._index[i]);
        debug('stat "%s"', p);
        fs.stat(p, function(err2, stat) {
          if (err2) return next(err2);
          if (stat.isDirectory()) return next();
          self.emit("file", p, stat);
          self.send(p, stat);
        });
      }
      next();
    };
    SendStream.prototype.stream = function stream(path2, options) {
      var self = this;
      var res = this.res;
      var stream2 = fs.createReadStream(path2, options);
      this.emit("stream", stream2);
      stream2.pipe(res);
      function cleanup() {
        destroy(stream2, true);
      }
      onFinished(res, cleanup);
      stream2.on("error", function onerror(err) {
        cleanup();
        self.onStatError(err);
      });
      stream2.on("end", function onend() {
        self.emit("end");
      });
    };
    SendStream.prototype.type = function type(path2) {
      var res = this.res;
      if (res.getHeader("Content-Type")) return;
      var type2 = mime.lookup(path2);
      if (!type2) {
        debug("no content-type");
        return;
      }
      var charset = mime.charsets.lookup(type2);
      debug("content-type %s", type2);
      res.setHeader("Content-Type", type2 + (charset ? "; charset=" + charset : ""));
    };
    SendStream.prototype.setHeader = function setHeader(path2, stat) {
      var res = this.res;
      this.emit("headers", res, path2, stat);
      if (this._acceptRanges && !res.getHeader("Accept-Ranges")) {
        debug("accept ranges");
        res.setHeader("Accept-Ranges", "bytes");
      }
      if (this._cacheControl && !res.getHeader("Cache-Control")) {
        var cacheControl = "public, max-age=" + Math.floor(this._maxage / 1e3);
        if (this._immutable) {
          cacheControl += ", immutable";
        }
        debug("cache-control %s", cacheControl);
        res.setHeader("Cache-Control", cacheControl);
      }
      if (this._lastModified && !res.getHeader("Last-Modified")) {
        var modified = stat.mtime.toUTCString();
        debug("modified %s", modified);
        res.setHeader("Last-Modified", modified);
      }
      if (this._etag && !res.getHeader("ETag")) {
        var val = etag(stat);
        debug("etag %s", val);
        res.setHeader("ETag", val);
      }
    };
    function clearHeaders(res) {
      var headers = getHeaderNames(res);
      for (var i = 0; i < headers.length; i++) {
        res.removeHeader(headers[i]);
      }
    }
    function collapseLeadingSlashes(str) {
      for (var i = 0; i < str.length; i++) {
        if (str[i] !== "/") {
          break;
        }
      }
      return i > 1 ? "/" + str.substr(i) : str;
    }
    function containsDotFile(parts) {
      for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
        if (part.length > 1 && part[0] === ".") {
          return true;
        }
      }
      return false;
    }
    function contentRange(type, size, range) {
      return type + " " + (range ? range.start + "-" + range.end : "*") + "/" + size;
    }
    function createHtmlDocument(title, body) {
      return '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>' + title + "</title>\n</head>\n<body>\n<pre>" + body + "</pre>\n</body>\n</html>\n";
    }
    function createHttpError(status, err) {
      if (!err) {
        return createError(status);
      }
      return err instanceof Error ? createError(status, err, {
        expose: false
      }) : createError(status, err);
    }
    function decode(path2) {
      try {
        return decodeURIComponent(path2);
      } catch (err) {
        return -1;
      }
    }
    function getHeaderNames(res) {
      return typeof res.getHeaderNames !== "function" ? Object.keys(res._headers || {}) : res.getHeaderNames();
    }
    function hasListeners(emitter, type) {
      var count = typeof emitter.listenerCount !== "function" ? emitter.listeners(type).length : emitter.listenerCount(type);
      return count > 0;
    }
    function headersSent(res) {
      return typeof res.headersSent !== "boolean" ? Boolean(res._header) : res.headersSent;
    }
    function normalizeList(val, name) {
      var list = [].concat(val || []);
      for (var i = 0; i < list.length; i++) {
        if (typeof list[i] !== "string") {
          throw new TypeError(name + " must be array of strings or false");
        }
      }
      return list;
    }
    function parseHttpDate(date) {
      var timestamp = date && Date.parse(date);
      return typeof timestamp === "number" ? timestamp : NaN;
    }
    function parseTokenList(str) {
      var end = 0;
      var list = [];
      var start = 0;
      for (var i = 0, len = str.length; i < len; i++) {
        switch (str.charCodeAt(i)) {
          case 32:
            if (start === end) {
              start = end = i + 1;
            }
            break;
          case 44:
            if (start !== end) {
              list.push(str.substring(start, end));
            }
            start = end = i + 1;
            break;
          default:
            end = i + 1;
            break;
        }
      }
      if (start !== end) {
        list.push(str.substring(start, end));
      }
      return list;
    }
    function setHeaders(res, headers) {
      var keys = Object.keys(headers);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        res.setHeader(key, headers[key]);
      }
    }
  }
});

// node_modules/forwarded/index.js
var require_forwarded = __commonJS({
  "node_modules/forwarded/index.js"(exports, module) {
    "use strict";
    module.exports = forwarded;
    function forwarded(req) {
      if (!req) {
        throw new TypeError("argument req is required");
      }
      var proxyAddrs = parse(req.headers["x-forwarded-for"] || "");
      var socketAddr = getSocketAddr(req);
      var addrs = [socketAddr].concat(proxyAddrs);
      return addrs;
    }
    function getSocketAddr(req) {
      return req.socket ? req.socket.remoteAddress : req.connection.remoteAddress;
    }
    function parse(header) {
      var end = header.length;
      var list = [];
      var start = header.length;
      for (var i = header.length - 1; i >= 0; i--) {
        switch (header.charCodeAt(i)) {
          case 32:
            if (start === end) {
              start = end = i;
            }
            break;
          case 44:
            if (start !== end) {
              list.push(header.substring(start, end));
            }
            start = end = i;
            break;
          default:
            start = i;
            break;
        }
      }
      if (start !== end) {
        list.push(header.substring(start, end));
      }
      return list;
    }
  }
});

// node_modules/ipaddr.js/lib/ipaddr.js
var require_ipaddr = __commonJS({
  "node_modules/ipaddr.js/lib/ipaddr.js"(exports, module) {
    (function() {
      var expandIPv6, ipaddr, ipv4Part, ipv4Regexes, ipv6Part, ipv6Regexes, matchCIDR, root, zoneIndex;
      ipaddr = {};
      root = this;
      if (typeof module !== "undefined" && module !== null && module.exports) {
        module.exports = ipaddr;
      } else {
        root["ipaddr"] = ipaddr;
      }
      matchCIDR = function(first, second, partSize, cidrBits) {
        var part, shift;
        if (first.length !== second.length) {
          throw new Error("ipaddr: cannot match CIDR for objects with different lengths");
        }
        part = 0;
        while (cidrBits > 0) {
          shift = partSize - cidrBits;
          if (shift < 0) {
            shift = 0;
          }
          if (first[part] >> shift !== second[part] >> shift) {
            return false;
          }
          cidrBits -= partSize;
          part += 1;
        }
        return true;
      };
      ipaddr.subnetMatch = function(address, rangeList, defaultName) {
        var k, len, rangeName, rangeSubnets, subnet;
        if (defaultName == null) {
          defaultName = "unicast";
        }
        for (rangeName in rangeList) {
          rangeSubnets = rangeList[rangeName];
          if (rangeSubnets[0] && !(rangeSubnets[0] instanceof Array)) {
            rangeSubnets = [rangeSubnets];
          }
          for (k = 0, len = rangeSubnets.length; k < len; k++) {
            subnet = rangeSubnets[k];
            if (address.kind() === subnet[0].kind()) {
              if (address.match.apply(address, subnet)) {
                return rangeName;
              }
            }
          }
        }
        return defaultName;
      };
      ipaddr.IPv4 = function() {
        function IPv4(octets) {
          var k, len, octet;
          if (octets.length !== 4) {
            throw new Error("ipaddr: ipv4 octet count should be 4");
          }
          for (k = 0, len = octets.length; k < len; k++) {
            octet = octets[k];
            if (!(0 <= octet && octet <= 255)) {
              throw new Error("ipaddr: ipv4 octet should fit in 8 bits");
            }
          }
          this.octets = octets;
        }
        IPv4.prototype.kind = function() {
          return "ipv4";
        };
        IPv4.prototype.toString = function() {
          return this.octets.join(".");
        };
        IPv4.prototype.toNormalizedString = function() {
          return this.toString();
        };
        IPv4.prototype.toByteArray = function() {
          return this.octets.slice(0);
        };
        IPv4.prototype.match = function(other, cidrRange) {
          var ref;
          if (cidrRange === void 0) {
            ref = other, other = ref[0], cidrRange = ref[1];
          }
          if (other.kind() !== "ipv4") {
            throw new Error("ipaddr: cannot match ipv4 address with non-ipv4 one");
          }
          return matchCIDR(this.octets, other.octets, 8, cidrRange);
        };
        IPv4.prototype.SpecialRanges = {
          unspecified: [[new IPv4([0, 0, 0, 0]), 8]],
          broadcast: [[new IPv4([255, 255, 255, 255]), 32]],
          multicast: [[new IPv4([224, 0, 0, 0]), 4]],
          linkLocal: [[new IPv4([169, 254, 0, 0]), 16]],
          loopback: [[new IPv4([127, 0, 0, 0]), 8]],
          carrierGradeNat: [[new IPv4([100, 64, 0, 0]), 10]],
          "private": [[new IPv4([10, 0, 0, 0]), 8], [new IPv4([172, 16, 0, 0]), 12], [new IPv4([192, 168, 0, 0]), 16]],
          reserved: [[new IPv4([192, 0, 0, 0]), 24], [new IPv4([192, 0, 2, 0]), 24], [new IPv4([192, 88, 99, 0]), 24], [new IPv4([198, 51, 100, 0]), 24], [new IPv4([203, 0, 113, 0]), 24], [new IPv4([240, 0, 0, 0]), 4]]
        };
        IPv4.prototype.range = function() {
          return ipaddr.subnetMatch(this, this.SpecialRanges);
        };
        IPv4.prototype.toIPv4MappedAddress = function() {
          return ipaddr.IPv6.parse("::ffff:" + this.toString());
        };
        IPv4.prototype.prefixLengthFromSubnetMask = function() {
          var cidr, i, k, octet, stop, zeros, zerotable;
          zerotable = {
            0: 8,
            128: 7,
            192: 6,
            224: 5,
            240: 4,
            248: 3,
            252: 2,
            254: 1,
            255: 0
          };
          cidr = 0;
          stop = false;
          for (i = k = 3; k >= 0; i = k += -1) {
            octet = this.octets[i];
            if (octet in zerotable) {
              zeros = zerotable[octet];
              if (stop && zeros !== 0) {
                return null;
              }
              if (zeros !== 8) {
                stop = true;
              }
              cidr += zeros;
            } else {
              return null;
            }
          }
          return 32 - cidr;
        };
        return IPv4;
      }();
      ipv4Part = "(0?\\d+|0x[a-f0-9]+)";
      ipv4Regexes = {
        fourOctet: new RegExp("^" + ipv4Part + "\\." + ipv4Part + "\\." + ipv4Part + "\\." + ipv4Part + "$", "i"),
        longValue: new RegExp("^" + ipv4Part + "$", "i")
      };
      ipaddr.IPv4.parser = function(string) {
        var match, parseIntAuto, part, shift, value;
        parseIntAuto = function(string2) {
          if (string2[0] === "0" && string2[1] !== "x") {
            return parseInt(string2, 8);
          } else {
            return parseInt(string2);
          }
        };
        if (match = string.match(ipv4Regexes.fourOctet)) {
          return function() {
            var k, len, ref, results;
            ref = match.slice(1, 6);
            results = [];
            for (k = 0, len = ref.length; k < len; k++) {
              part = ref[k];
              results.push(parseIntAuto(part));
            }
            return results;
          }();
        } else if (match = string.match(ipv4Regexes.longValue)) {
          value = parseIntAuto(match[1]);
          if (value > 4294967295 || value < 0) {
            throw new Error("ipaddr: address outside defined range");
          }
          return function() {
            var k, results;
            results = [];
            for (shift = k = 0; k <= 24; shift = k += 8) {
              results.push(value >> shift & 255);
            }
            return results;
          }().reverse();
        } else {
          return null;
        }
      };
      ipaddr.IPv6 = function() {
        function IPv6(parts, zoneId) {
          var i, k, l, len, part, ref;
          if (parts.length === 16) {
            this.parts = [];
            for (i = k = 0; k <= 14; i = k += 2) {
              this.parts.push(parts[i] << 8 | parts[i + 1]);
            }
          } else if (parts.length === 8) {
            this.parts = parts;
          } else {
            throw new Error("ipaddr: ipv6 part count should be 8 or 16");
          }
          ref = this.parts;
          for (l = 0, len = ref.length; l < len; l++) {
            part = ref[l];
            if (!(0 <= part && part <= 65535)) {
              throw new Error("ipaddr: ipv6 part should fit in 16 bits");
            }
          }
          if (zoneId) {
            this.zoneId = zoneId;
          }
        }
        IPv6.prototype.kind = function() {
          return "ipv6";
        };
        IPv6.prototype.toString = function() {
          return this.toNormalizedString().replace(/((^|:)(0(:|$))+)/, "::");
        };
        IPv6.prototype.toRFC5952String = function() {
          var bestMatchIndex, bestMatchLength, match, regex, string;
          regex = /((^|:)(0(:|$)){2,})/g;
          string = this.toNormalizedString();
          bestMatchIndex = 0;
          bestMatchLength = -1;
          while (match = regex.exec(string)) {
            if (match[0].length > bestMatchLength) {
              bestMatchIndex = match.index;
              bestMatchLength = match[0].length;
            }
          }
          if (bestMatchLength < 0) {
            return string;
          }
          return string.substring(0, bestMatchIndex) + "::" + string.substring(bestMatchIndex + bestMatchLength);
        };
        IPv6.prototype.toByteArray = function() {
          var bytes, k, len, part, ref;
          bytes = [];
          ref = this.parts;
          for (k = 0, len = ref.length; k < len; k++) {
            part = ref[k];
            bytes.push(part >> 8);
            bytes.push(part & 255);
          }
          return bytes;
        };
        IPv6.prototype.toNormalizedString = function() {
          var addr, part, suffix;
          addr = function() {
            var k, len, ref, results;
            ref = this.parts;
            results = [];
            for (k = 0, len = ref.length; k < len; k++) {
              part = ref[k];
              results.push(part.toString(16));
            }
            return results;
          }.call(this).join(":");
          suffix = "";
          if (this.zoneId) {
            suffix = "%" + this.zoneId;
          }
          return addr + suffix;
        };
        IPv6.prototype.toFixedLengthString = function() {
          var addr, part, suffix;
          addr = function() {
            var k, len, ref, results;
            ref = this.parts;
            results = [];
            for (k = 0, len = ref.length; k < len; k++) {
              part = ref[k];
              results.push(part.toString(16).padStart(4, "0"));
            }
            return results;
          }.call(this).join(":");
          suffix = "";
          if (this.zoneId) {
            suffix = "%" + this.zoneId;
          }
          return addr + suffix;
        };
        IPv6.prototype.match = function(other, cidrRange) {
          var ref;
          if (cidrRange === void 0) {
            ref = other, other = ref[0], cidrRange = ref[1];
          }
          if (other.kind() !== "ipv6") {
            throw new Error("ipaddr: cannot match ipv6 address with non-ipv6 one");
          }
          return matchCIDR(this.parts, other.parts, 16, cidrRange);
        };
        IPv6.prototype.SpecialRanges = {
          unspecified: [new IPv6([0, 0, 0, 0, 0, 0, 0, 0]), 128],
          linkLocal: [new IPv6([65152, 0, 0, 0, 0, 0, 0, 0]), 10],
          multicast: [new IPv6([65280, 0, 0, 0, 0, 0, 0, 0]), 8],
          loopback: [new IPv6([0, 0, 0, 0, 0, 0, 0, 1]), 128],
          uniqueLocal: [new IPv6([64512, 0, 0, 0, 0, 0, 0, 0]), 7],
          ipv4Mapped: [new IPv6([0, 0, 0, 0, 0, 65535, 0, 0]), 96],
          rfc6145: [new IPv6([0, 0, 0, 0, 65535, 0, 0, 0]), 96],
          rfc6052: [new IPv6([100, 65435, 0, 0, 0, 0, 0, 0]), 96],
          "6to4": [new IPv6([8194, 0, 0, 0, 0, 0, 0, 0]), 16],
          teredo: [new IPv6([8193, 0, 0, 0, 0, 0, 0, 0]), 32],
          reserved: [[new IPv6([8193, 3512, 0, 0, 0, 0, 0, 0]), 32]]
        };
        IPv6.prototype.range = function() {
          return ipaddr.subnetMatch(this, this.SpecialRanges);
        };
        IPv6.prototype.isIPv4MappedAddress = function() {
          return this.range() === "ipv4Mapped";
        };
        IPv6.prototype.toIPv4Address = function() {
          var high, low, ref;
          if (!this.isIPv4MappedAddress()) {
            throw new Error("ipaddr: trying to convert a generic ipv6 address to ipv4");
          }
          ref = this.parts.slice(-2), high = ref[0], low = ref[1];
          return new ipaddr.IPv4([high >> 8, high & 255, low >> 8, low & 255]);
        };
        IPv6.prototype.prefixLengthFromSubnetMask = function() {
          var cidr, i, k, part, stop, zeros, zerotable;
          zerotable = {
            0: 16,
            32768: 15,
            49152: 14,
            57344: 13,
            61440: 12,
            63488: 11,
            64512: 10,
            65024: 9,
            65280: 8,
            65408: 7,
            65472: 6,
            65504: 5,
            65520: 4,
            65528: 3,
            65532: 2,
            65534: 1,
            65535: 0
          };
          cidr = 0;
          stop = false;
          for (i = k = 7; k >= 0; i = k += -1) {
            part = this.parts[i];
            if (part in zerotable) {
              zeros = zerotable[part];
              if (stop && zeros !== 0) {
                return null;
              }
              if (zeros !== 16) {
                stop = true;
              }
              cidr += zeros;
            } else {
              return null;
            }
          }
          return 128 - cidr;
        };
        return IPv6;
      }();
      ipv6Part = "(?:[0-9a-f]+::?)+";
      zoneIndex = "%[0-9a-z]{1,}";
      ipv6Regexes = {
        zoneIndex: new RegExp(zoneIndex, "i"),
        "native": new RegExp("^(::)?(" + ipv6Part + ")?([0-9a-f]+)?(::)?(" + zoneIndex + ")?$", "i"),
        transitional: new RegExp("^((?:" + ipv6Part + ")|(?:::)(?:" + ipv6Part + ")?)" + (ipv4Part + "\\." + ipv4Part + "\\." + ipv4Part + "\\." + ipv4Part) + ("(" + zoneIndex + ")?$"), "i")
      };
      expandIPv6 = function(string, parts) {
        var colonCount, lastColon, part, replacement, replacementCount, zoneId;
        if (string.indexOf("::") !== string.lastIndexOf("::")) {
          return null;
        }
        zoneId = (string.match(ipv6Regexes["zoneIndex"]) || [])[0];
        if (zoneId) {
          zoneId = zoneId.substring(1);
          string = string.replace(/%.+$/, "");
        }
        colonCount = 0;
        lastColon = -1;
        while ((lastColon = string.indexOf(":", lastColon + 1)) >= 0) {
          colonCount++;
        }
        if (string.substr(0, 2) === "::") {
          colonCount--;
        }
        if (string.substr(-2, 2) === "::") {
          colonCount--;
        }
        if (colonCount > parts) {
          return null;
        }
        replacementCount = parts - colonCount;
        replacement = ":";
        while (replacementCount--) {
          replacement += "0:";
        }
        string = string.replace("::", replacement);
        if (string[0] === ":") {
          string = string.slice(1);
        }
        if (string[string.length - 1] === ":") {
          string = string.slice(0, -1);
        }
        parts = function() {
          var k, len, ref, results;
          ref = string.split(":");
          results = [];
          for (k = 0, len = ref.length; k < len; k++) {
            part = ref[k];
            results.push(parseInt(part, 16));
          }
          return results;
        }();
        return {
          parts,
          zoneId
        };
      };
      ipaddr.IPv6.parser = function(string) {
        var addr, k, len, match, octet, octets, zoneId;
        if (ipv6Regexes["native"].test(string)) {
          return expandIPv6(string, 8);
        } else if (match = string.match(ipv6Regexes["transitional"])) {
          zoneId = match[6] || "";
          addr = expandIPv6(match[1].slice(0, -1) + zoneId, 6);
          if (addr.parts) {
            octets = [parseInt(match[2]), parseInt(match[3]), parseInt(match[4]), parseInt(match[5])];
            for (k = 0, len = octets.length; k < len; k++) {
              octet = octets[k];
              if (!(0 <= octet && octet <= 255)) {
                return null;
              }
            }
            addr.parts.push(octets[0] << 8 | octets[1]);
            addr.parts.push(octets[2] << 8 | octets[3]);
            return {
              parts: addr.parts,
              zoneId: addr.zoneId
            };
          }
        }
        return null;
      };
      ipaddr.IPv4.isIPv4 = ipaddr.IPv6.isIPv6 = function(string) {
        return this.parser(string) !== null;
      };
      ipaddr.IPv4.isValid = function(string) {
        var e;
        try {
          new this(this.parser(string));
          return true;
        } catch (error1) {
          e = error1;
          return false;
        }
      };
      ipaddr.IPv4.isValidFourPartDecimal = function(string) {
        if (ipaddr.IPv4.isValid(string) && string.match(/^(0|[1-9]\d*)(\.(0|[1-9]\d*)){3}$/)) {
          return true;
        } else {
          return false;
        }
      };
      ipaddr.IPv6.isValid = function(string) {
        var addr, e;
        if (typeof string === "string" && string.indexOf(":") === -1) {
          return false;
        }
        try {
          addr = this.parser(string);
          new this(addr.parts, addr.zoneId);
          return true;
        } catch (error1) {
          e = error1;
          return false;
        }
      };
      ipaddr.IPv4.parse = function(string) {
        var parts;
        parts = this.parser(string);
        if (parts === null) {
          throw new Error("ipaddr: string is not formatted like ip address");
        }
        return new this(parts);
      };
      ipaddr.IPv6.parse = function(string) {
        var addr;
        addr = this.parser(string);
        if (addr.parts === null) {
          throw new Error("ipaddr: string is not formatted like ip address");
        }
        return new this(addr.parts, addr.zoneId);
      };
      ipaddr.IPv4.parseCIDR = function(string) {
        var maskLength, match, parsed;
        if (match = string.match(/^(.+)\/(\d+)$/)) {
          maskLength = parseInt(match[2]);
          if (maskLength >= 0 && maskLength <= 32) {
            parsed = [this.parse(match[1]), maskLength];
            Object.defineProperty(parsed, "toString", {
              value: function() {
                return this.join("/");
              }
            });
            return parsed;
          }
        }
        throw new Error("ipaddr: string is not formatted like an IPv4 CIDR range");
      };
      ipaddr.IPv4.subnetMaskFromPrefixLength = function(prefix) {
        var filledOctetCount, j, octets;
        prefix = parseInt(prefix);
        if (prefix < 0 || prefix > 32) {
          throw new Error("ipaddr: invalid IPv4 prefix length");
        }
        octets = [0, 0, 0, 0];
        j = 0;
        filledOctetCount = Math.floor(prefix / 8);
        while (j < filledOctetCount) {
          octets[j] = 255;
          j++;
        }
        if (filledOctetCount < 4) {
          octets[filledOctetCount] = Math.pow(2, prefix % 8) - 1 << 8 - prefix % 8;
        }
        return new this(octets);
      };
      ipaddr.IPv4.broadcastAddressFromCIDR = function(string) {
        var cidr, error, i, ipInterfaceOctets, octets, subnetMaskOctets;
        try {
          cidr = this.parseCIDR(string);
          ipInterfaceOctets = cidr[0].toByteArray();
          subnetMaskOctets = this.subnetMaskFromPrefixLength(cidr[1]).toByteArray();
          octets = [];
          i = 0;
          while (i < 4) {
            octets.push(parseInt(ipInterfaceOctets[i], 10) | parseInt(subnetMaskOctets[i], 10) ^ 255);
            i++;
          }
          return new this(octets);
        } catch (error1) {
          error = error1;
          throw new Error("ipaddr: the address does not have IPv4 CIDR format");
        }
      };
      ipaddr.IPv4.networkAddressFromCIDR = function(string) {
        var cidr, error, i, ipInterfaceOctets, octets, subnetMaskOctets;
        try {
          cidr = this.parseCIDR(string);
          ipInterfaceOctets = cidr[0].toByteArray();
          subnetMaskOctets = this.subnetMaskFromPrefixLength(cidr[1]).toByteArray();
          octets = [];
          i = 0;
          while (i < 4) {
            octets.push(parseInt(ipInterfaceOctets[i], 10) & parseInt(subnetMaskOctets[i], 10));
            i++;
          }
          return new this(octets);
        } catch (error1) {
          error = error1;
          throw new Error("ipaddr: the address does not have IPv4 CIDR format");
        }
      };
      ipaddr.IPv6.parseCIDR = function(string) {
        var maskLength, match, parsed;
        if (match = string.match(/^(.+)\/(\d+)$/)) {
          maskLength = parseInt(match[2]);
          if (maskLength >= 0 && maskLength <= 128) {
            parsed = [this.parse(match[1]), maskLength];
            Object.defineProperty(parsed, "toString", {
              value: function() {
                return this.join("/");
              }
            });
            return parsed;
          }
        }
        throw new Error("ipaddr: string is not formatted like an IPv6 CIDR range");
      };
      ipaddr.isValid = function(string) {
        return ipaddr.IPv6.isValid(string) || ipaddr.IPv4.isValid(string);
      };
      ipaddr.parse = function(string) {
        if (ipaddr.IPv6.isValid(string)) {
          return ipaddr.IPv6.parse(string);
        } else if (ipaddr.IPv4.isValid(string)) {
          return ipaddr.IPv4.parse(string);
        } else {
          throw new Error("ipaddr: the address has neither IPv6 nor IPv4 format");
        }
      };
      ipaddr.parseCIDR = function(string) {
        var e;
        try {
          return ipaddr.IPv6.parseCIDR(string);
        } catch (error1) {
          e = error1;
          try {
            return ipaddr.IPv4.parseCIDR(string);
          } catch (error12) {
            e = error12;
            throw new Error("ipaddr: the address has neither IPv6 nor IPv4 CIDR format");
          }
        }
      };
      ipaddr.fromByteArray = function(bytes) {
        var length;
        length = bytes.length;
        if (length === 4) {
          return new ipaddr.IPv4(bytes);
        } else if (length === 16) {
          return new ipaddr.IPv6(bytes);
        } else {
          throw new Error("ipaddr: the binary input is neither an IPv6 nor IPv4 address");
        }
      };
      ipaddr.process = function(string) {
        var addr;
        addr = this.parse(string);
        if (addr.kind() === "ipv6" && addr.isIPv4MappedAddress()) {
          return addr.toIPv4Address();
        } else {
          return addr;
        }
      };
    }).call(exports);
  }
});

// node_modules/proxy-addr/index.js
var require_proxy_addr = __commonJS({
  "node_modules/proxy-addr/index.js"(exports, module) {
    "use strict";
    module.exports = proxyaddr;
    module.exports.all = alladdrs;
    module.exports.compile = compile;
    var forwarded = require_forwarded();
    var ipaddr = require_ipaddr();
    var DIGIT_REGEXP = /^[0-9]+$/;
    var isip = ipaddr.isValid;
    var parseip = ipaddr.parse;
    var IP_RANGES = {
      linklocal: ["169.254.0.0/16", "fe80::/10"],
      loopback: ["127.0.0.1/8", "::1/128"],
      uniquelocal: ["10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16", "fc00::/7"]
    };
    function alladdrs(req, trust) {
      var addrs = forwarded(req);
      if (!trust) {
        return addrs;
      }
      if (typeof trust !== "function") {
        trust = compile(trust);
      }
      for (var i = 0; i < addrs.length - 1; i++) {
        if (trust(addrs[i], i)) continue;
        addrs.length = i + 1;
      }
      return addrs;
    }
    function compile(val) {
      if (!val) {
        throw new TypeError("argument is required");
      }
      var trust;
      if (typeof val === "string") {
        trust = [val];
      } else if (Array.isArray(val)) {
        trust = val.slice();
      } else {
        throw new TypeError("unsupported trust argument");
      }
      for (var i = 0; i < trust.length; i++) {
        val = trust[i];
        if (!Object.prototype.hasOwnProperty.call(IP_RANGES, val)) {
          continue;
        }
        val = IP_RANGES[val];
        trust.splice.apply(trust, [i, 1].concat(val));
        i += val.length - 1;
      }
      return compileTrust(compileRangeSubnets(trust));
    }
    function compileRangeSubnets(arr) {
      var rangeSubnets = new Array(arr.length);
      for (var i = 0; i < arr.length; i++) {
        rangeSubnets[i] = parseipNotation(arr[i]);
      }
      return rangeSubnets;
    }
    function compileTrust(rangeSubnets) {
      var len = rangeSubnets.length;
      return len === 0 ? trustNone : len === 1 ? trustSingle(rangeSubnets[0]) : trustMulti(rangeSubnets);
    }
    function parseipNotation(note) {
      var pos = note.lastIndexOf("/");
      var str = pos !== -1 ? note.substring(0, pos) : note;
      if (!isip(str)) {
        throw new TypeError("invalid IP address: " + str);
      }
      var ip = parseip(str);
      if (pos === -1 && ip.kind() === "ipv6" && ip.isIPv4MappedAddress()) {
        ip = ip.toIPv4Address();
      }
      var max = ip.kind() === "ipv6" ? 128 : 32;
      var range = pos !== -1 ? note.substring(pos + 1, note.length) : null;
      if (range === null) {
        range = max;
      } else if (DIGIT_REGEXP.test(range)) {
        range = parseInt(range, 10);
      } else if (ip.kind() === "ipv4" && isip(range)) {
        range = parseNetmask(range);
      } else {
        range = null;
      }
      if (range <= 0 || range > max) {
        throw new TypeError("invalid range on address: " + note);
      }
      return [ip, range];
    }
    function parseNetmask(netmask) {
      var ip = parseip(netmask);
      var kind = ip.kind();
      return kind === "ipv4" ? ip.prefixLengthFromSubnetMask() : null;
    }
    function proxyaddr(req, trust) {
      if (!req) {
        throw new TypeError("req argument is required");
      }
      if (!trust) {
        throw new TypeError("trust argument is required");
      }
      var addrs = alladdrs(req, trust);
      var addr = addrs[addrs.length - 1];
      return addr;
    }
    function trustNone() {
      return false;
    }
    function trustMulti(subnets) {
      return function trust(addr) {
        if (!isip(addr)) return false;
        var ip = parseip(addr);
        var ipconv;
        var kind = ip.kind();
        for (var i = 0; i < subnets.length; i++) {
          var subnet = subnets[i];
          var subnetip = subnet[0];
          var subnetkind = subnetip.kind();
          var subnetrange = subnet[1];
          var trusted = ip;
          if (kind !== subnetkind) {
            if (subnetkind === "ipv4" && !ip.isIPv4MappedAddress()) {
              continue;
            }
            if (!ipconv) {
              ipconv = subnetkind === "ipv4" ? ip.toIPv4Address() : ip.toIPv4MappedAddress();
            }
            trusted = ipconv;
          }
          if (trusted.match(subnetip, subnetrange)) {
            return true;
          }
        }
        return false;
      };
    }
    function trustSingle(subnet) {
      var subnetip = subnet[0];
      var subnetkind = subnetip.kind();
      var subnetisipv4 = subnetkind === "ipv4";
      var subnetrange = subnet[1];
      return function trust(addr) {
        if (!isip(addr)) return false;
        var ip = parseip(addr);
        var kind = ip.kind();
        if (kind !== subnetkind) {
          if (subnetisipv4 && !ip.isIPv4MappedAddress()) {
            return false;
          }
          ip = subnetisipv4 ? ip.toIPv4Address() : ip.toIPv4MappedAddress();
        }
        return ip.match(subnetip, subnetrange);
      };
    }
  }
});

// node_modules/express/lib/utils.js
var require_utils = __commonJS({
  "node_modules/express/lib/utils.js"(exports) {
    "use strict";
    var Buffer2 = require_safe_buffer().Buffer;
    var contentDisposition = require_content_disposition();
    var contentType = require_content_type();
    var deprecate = require_depd()("express");
    var flatten = require_array_flatten();
    var mime = require_send().mime;
    var etag = require_etag();
    var proxyaddr = require_proxy_addr();
    var qs = require_lib();
    var querystring = __require("querystring");
    exports.etag = createETagGenerator({
      weak: false
    });
    exports.wetag = createETagGenerator({
      weak: true
    });
    exports.isAbsolute = function(path) {
      if ("/" === path[0]) return true;
      if (":" === path[1] && ("\\" === path[2] || "/" === path[2])) return true;
      if ("\\\\" === path.substring(0, 2)) return true;
    };
    exports.flatten = deprecate.function(flatten, "utils.flatten: use array-flatten npm module instead");
    exports.normalizeType = function(type) {
      return ~type.indexOf("/") ? acceptParams(type) : {
        value: mime.lookup(type),
        params: {}
      };
    };
    exports.normalizeTypes = function(types) {
      var ret = [];
      for (var i = 0; i < types.length; ++i) {
        ret.push(exports.normalizeType(types[i]));
      }
      return ret;
    };
    exports.contentDisposition = deprecate.function(contentDisposition, "utils.contentDisposition: use content-disposition npm module instead");
    function acceptParams(str) {
      var parts = str.split(/ *; */);
      var ret = {
        value: parts[0],
        quality: 1,
        params: {}
      };
      for (var i = 1; i < parts.length; ++i) {
        var pms = parts[i].split(/ *= */);
        if ("q" === pms[0]) {
          ret.quality = parseFloat(pms[1]);
        } else {
          ret.params[pms[0]] = pms[1];
        }
      }
      return ret;
    }
    exports.compileETag = function(val) {
      var fn;
      if (typeof val === "function") {
        return val;
      }
      switch (val) {
        case true:
        case "weak":
          fn = exports.wetag;
          break;
        case false:
          break;
        case "strong":
          fn = exports.etag;
          break;
        default:
          throw new TypeError("unknown value for etag function: " + val);
      }
      return fn;
    };
    exports.compileQueryParser = function compileQueryParser(val) {
      var fn;
      if (typeof val === "function") {
        return val;
      }
      switch (val) {
        case true:
        case "simple":
          fn = querystring.parse;
          break;
        case false:
          fn = newObject;
          break;
        case "extended":
          fn = parseExtendedQueryString;
          break;
        default:
          throw new TypeError("unknown value for query parser function: " + val);
      }
      return fn;
    };
    exports.compileTrust = function(val) {
      if (typeof val === "function") return val;
      if (val === true) {
        return function() {
          return true;
        };
      }
      if (typeof val === "number") {
        return function(a, i) {
          return i < val;
        };
      }
      if (typeof val === "string") {
        val = val.split(",").map(function(v) {
          return v.trim();
        });
      }
      return proxyaddr.compile(val || []);
    };
    exports.setCharset = function setCharset(type, charset) {
      if (!type || !charset) {
        return type;
      }
      var parsed = contentType.parse(type);
      parsed.parameters.charset = charset;
      return contentType.format(parsed);
    };
    function createETagGenerator(options) {
      return function generateETag(body, encoding) {
        var buf = !Buffer2.isBuffer(body) ? Buffer2.from(body, encoding) : body;
        return etag(buf, options);
      };
    }
    function parseExtendedQueryString(str) {
      return qs.parse(str, {
        allowPrototypes: true
      });
    }
    function newObject() {
      return {};
    }
  }
});

// node_modules/express/lib/application.js
var require_application = __commonJS({
  "node_modules/express/lib/application.js"(exports, module) {
    "use strict";
    var finalhandler = require_finalhandler();
    var Router = require_router();
    var methods = require_methods();
    var middleware = require_init();
    var query = require_query();
    var debug = require_src2()("express:application");
    var View = require_view();
    var http = __require("http");
    var compileETag = require_utils().compileETag;
    var compileQueryParser = require_utils().compileQueryParser;
    var compileTrust = require_utils().compileTrust;
    var deprecate = require_depd()("express");
    var flatten = require_array_flatten();
    var merge = require_utils_merge();
    var resolve = __require("path").resolve;
    var setPrototypeOf = require_setprototypeof();
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var slice = Array.prototype.slice;
    var app = exports = module.exports = {};
    var trustProxyDefaultSymbol = "@@symbol:trust_proxy_default";
    app.init = function init() {
      this.cache = {};
      this.engines = {};
      this.settings = {};
      this.defaultConfiguration();
    };
    app.defaultConfiguration = function defaultConfiguration() {
      var env = process.env.NODE_ENV || "development";
      this.enable("x-powered-by");
      this.set("etag", "weak");
      this.set("env", env);
      this.set("query parser", "extended");
      this.set("subdomain offset", 2);
      this.set("trust proxy", false);
      Object.defineProperty(this.settings, trustProxyDefaultSymbol, {
        configurable: true,
        value: true
      });
      debug("booting in %s mode", env);
      this.on("mount", function onmount(parent) {
        if (this.settings[trustProxyDefaultSymbol] === true && typeof parent.settings["trust proxy fn"] === "function") {
          delete this.settings["trust proxy"];
          delete this.settings["trust proxy fn"];
        }
        setPrototypeOf(this.request, parent.request);
        setPrototypeOf(this.response, parent.response);
        setPrototypeOf(this.engines, parent.engines);
        setPrototypeOf(this.settings, parent.settings);
      });
      this.locals = /* @__PURE__ */ Object.create(null);
      this.mountpath = "/";
      this.locals.settings = this.settings;
      this.set("view", View);
      this.set("views", resolve("views"));
      this.set("jsonp callback name", "callback");
      if (env === "production") {
        this.enable("view cache");
      }
      Object.defineProperty(this, "router", {
        get: function() {
          throw new Error("'app.router' is deprecated!\nPlease see the 3.x to 4.x migration guide for details on how to update your app.");
        }
      });
    };
    app.lazyrouter = function lazyrouter() {
      if (!this._router) {
        this._router = new Router({
          caseSensitive: this.enabled("case sensitive routing"),
          strict: this.enabled("strict routing")
        });
        this._router.use(query(this.get("query parser fn")));
        this._router.use(middleware.init(this));
      }
    };
    app.handle = function handle(req, res, callback) {
      var router = this._router;
      var done = callback || finalhandler(req, res, {
        env: this.get("env"),
        onerror: logerror.bind(this)
      });
      if (!router) {
        debug("no routes defined on app");
        done();
        return;
      }
      router.handle(req, res, done);
    };
    app.use = function use(fn) {
      var offset = 0;
      var path = "/";
      if (typeof fn !== "function") {
        var arg = fn;
        while (Array.isArray(arg) && arg.length !== 0) {
          arg = arg[0];
        }
        if (typeof arg !== "function") {
          offset = 1;
          path = fn;
        }
      }
      var fns = flatten(slice.call(arguments, offset));
      if (fns.length === 0) {
        throw new TypeError("app.use() requires a middleware function");
      }
      this.lazyrouter();
      var router = this._router;
      fns.forEach(function(fn2) {
        if (!fn2 || !fn2.handle || !fn2.set) {
          return router.use(path, fn2);
        }
        debug(".use app under %s", path);
        fn2.mountpath = path;
        fn2.parent = this;
        router.use(path, function mounted_app(req, res, next) {
          var orig = req.app;
          fn2.handle(req, res, function(err) {
            setPrototypeOf(req, orig.request);
            setPrototypeOf(res, orig.response);
            next(err);
          });
        });
        fn2.emit("mount", this);
      }, this);
      return this;
    };
    app.route = function route(path) {
      this.lazyrouter();
      return this._router.route(path);
    };
    app.engine = function engine(ext, fn) {
      if (typeof fn !== "function") {
        throw new Error("callback function required");
      }
      var extension = ext[0] !== "." ? "." + ext : ext;
      this.engines[extension] = fn;
      return this;
    };
    app.param = function param(name, fn) {
      this.lazyrouter();
      if (Array.isArray(name)) {
        for (var i = 0; i < name.length; i++) {
          this.param(name[i], fn);
        }
        return this;
      }
      this._router.param(name, fn);
      return this;
    };
    app.set = function set(setting, val) {
      if (arguments.length === 1) {
        var settings = this.settings;
        while (settings && settings !== Object.prototype) {
          if (hasOwnProperty.call(settings, setting)) {
            return settings[setting];
          }
          settings = Object.getPrototypeOf(settings);
        }
        return void 0;
      }
      debug('set "%s" to %o', setting, val);
      this.settings[setting] = val;
      switch (setting) {
        case "etag":
          this.set("etag fn", compileETag(val));
          break;
        case "query parser":
          this.set("query parser fn", compileQueryParser(val));
          break;
        case "trust proxy":
          this.set("trust proxy fn", compileTrust(val));
          Object.defineProperty(this.settings, trustProxyDefaultSymbol, {
            configurable: true,
            value: false
          });
          break;
      }
      return this;
    };
    app.path = function path() {
      return this.parent ? this.parent.path() + this.mountpath : "";
    };
    app.enabled = function enabled(setting) {
      return Boolean(this.set(setting));
    };
    app.disabled = function disabled(setting) {
      return !this.set(setting);
    };
    app.enable = function enable(setting) {
      return this.set(setting, true);
    };
    app.disable = function disable(setting) {
      return this.set(setting, false);
    };
    methods.forEach(function(method) {
      app[method] = function(path) {
        if (method === "get" && arguments.length === 1) {
          return this.set(path);
        }
        this.lazyrouter();
        var route = this._router.route(path);
        route[method].apply(route, slice.call(arguments, 1));
        return this;
      };
    });
    app.all = function all(path) {
      this.lazyrouter();
      var route = this._router.route(path);
      var args = slice.call(arguments, 1);
      for (var i = 0; i < methods.length; i++) {
        route[methods[i]].apply(route, args);
      }
      return this;
    };
    app.del = deprecate.function(app.delete, "app.del: Use app.delete instead");
    app.render = function render(name, options, callback) {
      var cache = this.cache;
      var done = callback;
      var engines = this.engines;
      var opts = options;
      var renderOptions = {};
      var view;
      if (typeof options === "function") {
        done = options;
        opts = {};
      }
      merge(renderOptions, this.locals);
      if (opts._locals) {
        merge(renderOptions, opts._locals);
      }
      merge(renderOptions, opts);
      if (renderOptions.cache == null) {
        renderOptions.cache = this.enabled("view cache");
      }
      if (renderOptions.cache) {
        view = cache[name];
      }
      if (!view) {
        var View2 = this.get("view");
        view = new View2(name, {
          defaultEngine: this.get("view engine"),
          root: this.get("views"),
          engines
        });
        if (!view.path) {
          var dirs = Array.isArray(view.root) && view.root.length > 1 ? 'directories "' + view.root.slice(0, -1).join('", "') + '" or "' + view.root[view.root.length - 1] + '"' : 'directory "' + view.root + '"';
          var err = new Error('Failed to lookup view "' + name + '" in views ' + dirs);
          err.view = view;
          return done(err);
        }
        if (renderOptions.cache) {
          cache[name] = view;
        }
      }
      tryRender(view, renderOptions, done);
    };
    app.listen = function listen() {
      var server = http.createServer(this);
      return server.listen.apply(server, arguments);
    };
    function logerror(err) {
      if (this.get("env") !== "test") console.error(err.stack || err.toString());
    }
    function tryRender(view, options, callback) {
      try {
        view.render(options, callback);
      } catch (err) {
        callback(err);
      }
    }
  }
});

// node_modules/negotiator/lib/charset.js
var require_charset = __commonJS({
  "node_modules/negotiator/lib/charset.js"(exports, module) {
    "use strict";
    module.exports = preferredCharsets;
    module.exports.preferredCharsets = preferredCharsets;
    var simpleCharsetRegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
    function parseAcceptCharset(accept) {
      var accepts = accept.split(",");
      for (var i = 0, j = 0; i < accepts.length; i++) {
        var charset = parseCharset(accepts[i].trim(), i);
        if (charset) {
          accepts[j++] = charset;
        }
      }
      accepts.length = j;
      return accepts;
    }
    function parseCharset(str, i) {
      var match = simpleCharsetRegExp.exec(str);
      if (!match) return null;
      var charset = match[1];
      var q = 1;
      if (match[2]) {
        var params = match[2].split(";");
        for (var j = 0; j < params.length; j++) {
          var p = params[j].trim().split("=");
          if (p[0] === "q") {
            q = parseFloat(p[1]);
            break;
          }
        }
      }
      return {
        charset,
        q,
        i
      };
    }
    function getCharsetPriority(charset, accepted, index) {
      var priority = {
        o: -1,
        q: 0,
        s: 0
      };
      for (var i = 0; i < accepted.length; i++) {
        var spec = specify(charset, accepted[i], index);
        if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
          priority = spec;
        }
      }
      return priority;
    }
    function specify(charset, spec, index) {
      var s = 0;
      if (spec.charset.toLowerCase() === charset.toLowerCase()) {
        s |= 1;
      } else if (spec.charset !== "*") {
        return null;
      }
      return {
        i: index,
        o: spec.i,
        q: spec.q,
        s
      };
    }
    function preferredCharsets(accept, provided) {
      var accepts = parseAcceptCharset(accept === void 0 ? "*" : accept || "");
      if (!provided) {
        return accepts.filter(isQuality).sort(compareSpecs).map(getFullCharset);
      }
      var priorities = provided.map(function getPriority(type, index) {
        return getCharsetPriority(type, accepts, index);
      });
      return priorities.filter(isQuality).sort(compareSpecs).map(function getCharset(priority) {
        return provided[priorities.indexOf(priority)];
      });
    }
    function compareSpecs(a, b) {
      return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i || 0;
    }
    function getFullCharset(spec) {
      return spec.charset;
    }
    function isQuality(spec) {
      return spec.q > 0;
    }
  }
});

// node_modules/negotiator/lib/encoding.js
var require_encoding = __commonJS({
  "node_modules/negotiator/lib/encoding.js"(exports, module) {
    "use strict";
    module.exports = preferredEncodings;
    module.exports.preferredEncodings = preferredEncodings;
    var simpleEncodingRegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
    function parseAcceptEncoding(accept) {
      var accepts = accept.split(",");
      var hasIdentity = false;
      var minQuality = 1;
      for (var i = 0, j = 0; i < accepts.length; i++) {
        var encoding = parseEncoding(accepts[i].trim(), i);
        if (encoding) {
          accepts[j++] = encoding;
          hasIdentity = hasIdentity || specify("identity", encoding);
          minQuality = Math.min(minQuality, encoding.q || 1);
        }
      }
      if (!hasIdentity) {
        accepts[j++] = {
          encoding: "identity",
          q: minQuality,
          i
        };
      }
      accepts.length = j;
      return accepts;
    }
    function parseEncoding(str, i) {
      var match = simpleEncodingRegExp.exec(str);
      if (!match) return null;
      var encoding = match[1];
      var q = 1;
      if (match[2]) {
        var params = match[2].split(";");
        for (var j = 0; j < params.length; j++) {
          var p = params[j].trim().split("=");
          if (p[0] === "q") {
            q = parseFloat(p[1]);
            break;
          }
        }
      }
      return {
        encoding,
        q,
        i
      };
    }
    function getEncodingPriority(encoding, accepted, index) {
      var priority = {
        o: -1,
        q: 0,
        s: 0
      };
      for (var i = 0; i < accepted.length; i++) {
        var spec = specify(encoding, accepted[i], index);
        if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
          priority = spec;
        }
      }
      return priority;
    }
    function specify(encoding, spec, index) {
      var s = 0;
      if (spec.encoding.toLowerCase() === encoding.toLowerCase()) {
        s |= 1;
      } else if (spec.encoding !== "*") {
        return null;
      }
      return {
        i: index,
        o: spec.i,
        q: spec.q,
        s
      };
    }
    function preferredEncodings(accept, provided) {
      var accepts = parseAcceptEncoding(accept || "");
      if (!provided) {
        return accepts.filter(isQuality).sort(compareSpecs).map(getFullEncoding);
      }
      var priorities = provided.map(function getPriority(type, index) {
        return getEncodingPriority(type, accepts, index);
      });
      return priorities.filter(isQuality).sort(compareSpecs).map(function getEncoding(priority) {
        return provided[priorities.indexOf(priority)];
      });
    }
    function compareSpecs(a, b) {
      return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i || 0;
    }
    function getFullEncoding(spec) {
      return spec.encoding;
    }
    function isQuality(spec) {
      return spec.q > 0;
    }
  }
});

// node_modules/negotiator/lib/language.js
var require_language = __commonJS({
  "node_modules/negotiator/lib/language.js"(exports, module) {
    "use strict";
    module.exports = preferredLanguages;
    module.exports.preferredLanguages = preferredLanguages;
    var simpleLanguageRegExp = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;
    function parseAcceptLanguage(accept) {
      var accepts = accept.split(",");
      for (var i = 0, j = 0; i < accepts.length; i++) {
        var language = parseLanguage(accepts[i].trim(), i);
        if (language) {
          accepts[j++] = language;
        }
      }
      accepts.length = j;
      return accepts;
    }
    function parseLanguage(str, i) {
      var match = simpleLanguageRegExp.exec(str);
      if (!match) return null;
      var prefix = match[1];
      var suffix = match[2];
      var full = prefix;
      if (suffix) full += "-" + suffix;
      var q = 1;
      if (match[3]) {
        var params = match[3].split(";");
        for (var j = 0; j < params.length; j++) {
          var p = params[j].split("=");
          if (p[0] === "q") q = parseFloat(p[1]);
        }
      }
      return {
        prefix,
        suffix,
        q,
        i,
        full
      };
    }
    function getLanguagePriority(language, accepted, index) {
      var priority = {
        o: -1,
        q: 0,
        s: 0
      };
      for (var i = 0; i < accepted.length; i++) {
        var spec = specify(language, accepted[i], index);
        if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
          priority = spec;
        }
      }
      return priority;
    }
    function specify(language, spec, index) {
      var p = parseLanguage(language);
      if (!p) return null;
      var s = 0;
      if (spec.full.toLowerCase() === p.full.toLowerCase()) {
        s |= 4;
      } else if (spec.prefix.toLowerCase() === p.full.toLowerCase()) {
        s |= 2;
      } else if (spec.full.toLowerCase() === p.prefix.toLowerCase()) {
        s |= 1;
      } else if (spec.full !== "*") {
        return null;
      }
      return {
        i: index,
        o: spec.i,
        q: spec.q,
        s
      };
    }
    function preferredLanguages(accept, provided) {
      var accepts = parseAcceptLanguage(accept === void 0 ? "*" : accept || "");
      if (!provided) {
        return accepts.filter(isQuality).sort(compareSpecs).map(getFullLanguage);
      }
      var priorities = provided.map(function getPriority(type, index) {
        return getLanguagePriority(type, accepts, index);
      });
      return priorities.filter(isQuality).sort(compareSpecs).map(function getLanguage(priority) {
        return provided[priorities.indexOf(priority)];
      });
    }
    function compareSpecs(a, b) {
      return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i || 0;
    }
    function getFullLanguage(spec) {
      return spec.full;
    }
    function isQuality(spec) {
      return spec.q > 0;
    }
  }
});

// node_modules/negotiator/lib/mediaType.js
var require_mediaType = __commonJS({
  "node_modules/negotiator/lib/mediaType.js"(exports, module) {
    "use strict";
    module.exports = preferredMediaTypes;
    module.exports.preferredMediaTypes = preferredMediaTypes;
    var simpleMediaTypeRegExp = /^\s*([^\s\/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;
    function parseAccept(accept) {
      var accepts = splitMediaTypes(accept);
      for (var i = 0, j = 0; i < accepts.length; i++) {
        var mediaType = parseMediaType(accepts[i].trim(), i);
        if (mediaType) {
          accepts[j++] = mediaType;
        }
      }
      accepts.length = j;
      return accepts;
    }
    function parseMediaType(str, i) {
      var match = simpleMediaTypeRegExp.exec(str);
      if (!match) return null;
      var params = /* @__PURE__ */ Object.create(null);
      var q = 1;
      var subtype = match[2];
      var type = match[1];
      if (match[3]) {
        var kvps = splitParameters(match[3]).map(splitKeyValuePair);
        for (var j = 0; j < kvps.length; j++) {
          var pair = kvps[j];
          var key = pair[0].toLowerCase();
          var val = pair[1];
          var value = val && val[0] === '"' && val[val.length - 1] === '"' ? val.substr(1, val.length - 2) : val;
          if (key === "q") {
            q = parseFloat(value);
            break;
          }
          params[key] = value;
        }
      }
      return {
        type,
        subtype,
        params,
        q,
        i
      };
    }
    function getMediaTypePriority(type, accepted, index) {
      var priority = {
        o: -1,
        q: 0,
        s: 0
      };
      for (var i = 0; i < accepted.length; i++) {
        var spec = specify(type, accepted[i], index);
        if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
          priority = spec;
        }
      }
      return priority;
    }
    function specify(type, spec, index) {
      var p = parseMediaType(type);
      var s = 0;
      if (!p) {
        return null;
      }
      if (spec.type.toLowerCase() == p.type.toLowerCase()) {
        s |= 4;
      } else if (spec.type != "*") {
        return null;
      }
      if (spec.subtype.toLowerCase() == p.subtype.toLowerCase()) {
        s |= 2;
      } else if (spec.subtype != "*") {
        return null;
      }
      var keys = Object.keys(spec.params);
      if (keys.length > 0) {
        if (keys.every(function(k) {
          return spec.params[k] == "*" || (spec.params[k] || "").toLowerCase() == (p.params[k] || "").toLowerCase();
        })) {
          s |= 1;
        } else {
          return null;
        }
      }
      return {
        i: index,
        o: spec.i,
        q: spec.q,
        s
      };
    }
    function preferredMediaTypes(accept, provided) {
      var accepts = parseAccept(accept === void 0 ? "*/*" : accept || "");
      if (!provided) {
        return accepts.filter(isQuality).sort(compareSpecs).map(getFullType);
      }
      var priorities = provided.map(function getPriority(type, index) {
        return getMediaTypePriority(type, accepts, index);
      });
      return priorities.filter(isQuality).sort(compareSpecs).map(function getType(priority) {
        return provided[priorities.indexOf(priority)];
      });
    }
    function compareSpecs(a, b) {
      return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i || 0;
    }
    function getFullType(spec) {
      return spec.type + "/" + spec.subtype;
    }
    function isQuality(spec) {
      return spec.q > 0;
    }
    function quoteCount(string) {
      var count = 0;
      var index = 0;
      while ((index = string.indexOf('"', index)) !== -1) {
        count++;
        index++;
      }
      return count;
    }
    function splitKeyValuePair(str) {
      var index = str.indexOf("=");
      var key;
      var val;
      if (index === -1) {
        key = str;
      } else {
        key = str.substr(0, index);
        val = str.substr(index + 1);
      }
      return [key, val];
    }
    function splitMediaTypes(accept) {
      var accepts = accept.split(",");
      for (var i = 1, j = 0; i < accepts.length; i++) {
        if (quoteCount(accepts[j]) % 2 == 0) {
          accepts[++j] = accepts[i];
        } else {
          accepts[j] += "," + accepts[i];
        }
      }
      accepts.length = j + 1;
      return accepts;
    }
    function splitParameters(str) {
      var parameters = str.split(";");
      for (var i = 1, j = 0; i < parameters.length; i++) {
        if (quoteCount(parameters[j]) % 2 == 0) {
          parameters[++j] = parameters[i];
        } else {
          parameters[j] += ";" + parameters[i];
        }
      }
      parameters.length = j + 1;
      for (var i = 0; i < parameters.length; i++) {
        parameters[i] = parameters[i].trim();
      }
      return parameters;
    }
  }
});

// node_modules/negotiator/index.js
var require_negotiator = __commonJS({
  "node_modules/negotiator/index.js"(exports, module) {
    "use strict";
    var preferredCharsets = require_charset();
    var preferredEncodings = require_encoding();
    var preferredLanguages = require_language();
    var preferredMediaTypes = require_mediaType();
    module.exports = Negotiator;
    module.exports.Negotiator = Negotiator;
    function Negotiator(request) {
      if (!(this instanceof Negotiator)) {
        return new Negotiator(request);
      }
      this.request = request;
    }
    Negotiator.prototype.charset = function charset(available) {
      var set = this.charsets(available);
      return set && set[0];
    };
    Negotiator.prototype.charsets = function charsets(available) {
      return preferredCharsets(this.request.headers["accept-charset"], available);
    };
    Negotiator.prototype.encoding = function encoding(available) {
      var set = this.encodings(available);
      return set && set[0];
    };
    Negotiator.prototype.encodings = function encodings(available) {
      return preferredEncodings(this.request.headers["accept-encoding"], available);
    };
    Negotiator.prototype.language = function language(available) {
      var set = this.languages(available);
      return set && set[0];
    };
    Negotiator.prototype.languages = function languages(available) {
      return preferredLanguages(this.request.headers["accept-language"], available);
    };
    Negotiator.prototype.mediaType = function mediaType(available) {
      var set = this.mediaTypes(available);
      return set && set[0];
    };
    Negotiator.prototype.mediaTypes = function mediaTypes(available) {
      return preferredMediaTypes(this.request.headers.accept, available);
    };
    Negotiator.prototype.preferredCharset = Negotiator.prototype.charset;
    Negotiator.prototype.preferredCharsets = Negotiator.prototype.charsets;
    Negotiator.prototype.preferredEncoding = Negotiator.prototype.encoding;
    Negotiator.prototype.preferredEncodings = Negotiator.prototype.encodings;
    Negotiator.prototype.preferredLanguage = Negotiator.prototype.language;
    Negotiator.prototype.preferredLanguages = Negotiator.prototype.languages;
    Negotiator.prototype.preferredMediaType = Negotiator.prototype.mediaType;
    Negotiator.prototype.preferredMediaTypes = Negotiator.prototype.mediaTypes;
  }
});

// node_modules/accepts/index.js
var require_accepts = __commonJS({
  "node_modules/accepts/index.js"(exports, module) {
    "use strict";
    var Negotiator = require_negotiator();
    var mime = require_mime_types();
    module.exports = Accepts;
    function Accepts(req) {
      if (!(this instanceof Accepts)) {
        return new Accepts(req);
      }
      this.headers = req.headers;
      this.negotiator = new Negotiator(req);
    }
    Accepts.prototype.type = Accepts.prototype.types = function(types_) {
      var types = types_;
      if (types && !Array.isArray(types)) {
        types = new Array(arguments.length);
        for (var i = 0; i < types.length; i++) {
          types[i] = arguments[i];
        }
      }
      if (!types || types.length === 0) {
        return this.negotiator.mediaTypes();
      }
      if (!this.headers.accept) {
        return types[0];
      }
      var mimes = types.map(extToMime);
      var accepts = this.negotiator.mediaTypes(mimes.filter(validMime));
      var first = accepts[0];
      return first ? types[mimes.indexOf(first)] : false;
    };
    Accepts.prototype.encoding = Accepts.prototype.encodings = function(encodings_) {
      var encodings = encodings_;
      if (encodings && !Array.isArray(encodings)) {
        encodings = new Array(arguments.length);
        for (var i = 0; i < encodings.length; i++) {
          encodings[i] = arguments[i];
        }
      }
      if (!encodings || encodings.length === 0) {
        return this.negotiator.encodings();
      }
      return this.negotiator.encodings(encodings)[0] || false;
    };
    Accepts.prototype.charset = Accepts.prototype.charsets = function(charsets_) {
      var charsets = charsets_;
      if (charsets && !Array.isArray(charsets)) {
        charsets = new Array(arguments.length);
        for (var i = 0; i < charsets.length; i++) {
          charsets[i] = arguments[i];
        }
      }
      if (!charsets || charsets.length === 0) {
        return this.negotiator.charsets();
      }
      return this.negotiator.charsets(charsets)[0] || false;
    };
    Accepts.prototype.lang = Accepts.prototype.langs = Accepts.prototype.language = Accepts.prototype.languages = function(languages_) {
      var languages = languages_;
      if (languages && !Array.isArray(languages)) {
        languages = new Array(arguments.length);
        for (var i = 0; i < languages.length; i++) {
          languages[i] = arguments[i];
        }
      }
      if (!languages || languages.length === 0) {
        return this.negotiator.languages();
      }
      return this.negotiator.languages(languages)[0] || false;
    };
    function extToMime(type) {
      return type.indexOf("/") === -1 ? mime.lookup(type) : type;
    }
    function validMime(type) {
      return typeof type === "string";
    }
  }
});

// node_modules/express/lib/request.js
var require_request = __commonJS({
  "node_modules/express/lib/request.js"(exports, module) {
    "use strict";
    var accepts = require_accepts();
    var deprecate = require_depd()("express");
    var isIP = __require("net").isIP;
    var typeis = require_type_is();
    var http = __require("http");
    var fresh = require_fresh();
    var parseRange = require_range_parser();
    var parse = require_parseurl();
    var proxyaddr = require_proxy_addr();
    var req = Object.create(http.IncomingMessage.prototype);
    module.exports = req;
    req.get = req.header = function header(name) {
      if (!name) {
        throw new TypeError("name argument is required to req.get");
      }
      if (typeof name !== "string") {
        throw new TypeError("name must be a string to req.get");
      }
      var lc = name.toLowerCase();
      switch (lc) {
        case "referer":
        case "referrer":
          return this.headers.referrer || this.headers.referer;
        default:
          return this.headers[lc];
      }
    };
    req.accepts = function() {
      var accept = accepts(this);
      return accept.types.apply(accept, arguments);
    };
    req.acceptsEncodings = function() {
      var accept = accepts(this);
      return accept.encodings.apply(accept, arguments);
    };
    req.acceptsEncoding = deprecate.function(req.acceptsEncodings, "req.acceptsEncoding: Use acceptsEncodings instead");
    req.acceptsCharsets = function() {
      var accept = accepts(this);
      return accept.charsets.apply(accept, arguments);
    };
    req.acceptsCharset = deprecate.function(req.acceptsCharsets, "req.acceptsCharset: Use acceptsCharsets instead");
    req.acceptsLanguages = function() {
      var accept = accepts(this);
      return accept.languages.apply(accept, arguments);
    };
    req.acceptsLanguage = deprecate.function(req.acceptsLanguages, "req.acceptsLanguage: Use acceptsLanguages instead");
    req.range = function range(size, options) {
      var range2 = this.get("Range");
      if (!range2) return;
      return parseRange(size, range2, options);
    };
    req.param = function param(name, defaultValue) {
      var params = this.params || {};
      var body = this.body || {};
      var query = this.query || {};
      var args = arguments.length === 1 ? "name" : "name, default";
      deprecate("req.param(" + args + "): Use req.params, req.body, or req.query instead");
      if (null != params[name] && params.hasOwnProperty(name)) return params[name];
      if (null != body[name]) return body[name];
      if (null != query[name]) return query[name];
      return defaultValue;
    };
    req.is = function is(types) {
      var arr = types;
      if (!Array.isArray(types)) {
        arr = new Array(arguments.length);
        for (var i = 0; i < arr.length; i++) {
          arr[i] = arguments[i];
        }
      }
      return typeis(this, arr);
    };
    defineGetter(req, "protocol", function protocol() {
      var proto = this.connection.encrypted ? "https" : "http";
      var trust = this.app.get("trust proxy fn");
      if (!trust(this.connection.remoteAddress, 0)) {
        return proto;
      }
      var header = this.get("X-Forwarded-Proto") || proto;
      var index = header.indexOf(",");
      return index !== -1 ? header.substring(0, index).trim() : header.trim();
    });
    defineGetter(req, "secure", function secure() {
      return this.protocol === "https";
    });
    defineGetter(req, "ip", function ip() {
      var trust = this.app.get("trust proxy fn");
      return proxyaddr(this, trust);
    });
    defineGetter(req, "ips", function ips() {
      var trust = this.app.get("trust proxy fn");
      var addrs = proxyaddr.all(this, trust);
      addrs.reverse().pop();
      return addrs;
    });
    defineGetter(req, "subdomains", function subdomains() {
      var hostname = this.hostname;
      if (!hostname) return [];
      var offset = this.app.get("subdomain offset");
      var subdomains2 = !isIP(hostname) ? hostname.split(".").reverse() : [hostname];
      return subdomains2.slice(offset);
    });
    defineGetter(req, "path", function path() {
      return parse(this).pathname;
    });
    defineGetter(req, "hostname", function hostname() {
      var trust = this.app.get("trust proxy fn");
      var host = this.get("X-Forwarded-Host");
      if (!host || !trust(this.connection.remoteAddress, 0)) {
        host = this.get("Host");
      } else if (host.indexOf(",") !== -1) {
        host = host.substring(0, host.indexOf(",")).trimRight();
      }
      if (!host) return;
      var offset = host[0] === "[" ? host.indexOf("]") + 1 : 0;
      var index = host.indexOf(":", offset);
      return index !== -1 ? host.substring(0, index) : host;
    });
    defineGetter(req, "host", deprecate.function(function host() {
      return this.hostname;
    }, "req.host: Use req.hostname instead"));
    defineGetter(req, "fresh", function() {
      var method = this.method;
      var res = this.res;
      var status = res.statusCode;
      if ("GET" !== method && "HEAD" !== method) return false;
      if (status >= 200 && status < 300 || 304 === status) {
        return fresh(this.headers, {
          "etag": res.get("ETag"),
          "last-modified": res.get("Last-Modified")
        });
      }
      return false;
    });
    defineGetter(req, "stale", function stale() {
      return !this.fresh;
    });
    defineGetter(req, "xhr", function xhr() {
      var val = this.get("X-Requested-With") || "";
      return val.toLowerCase() === "xmlhttprequest";
    });
    function defineGetter(obj, name, getter) {
      Object.defineProperty(obj, name, {
        configurable: true,
        enumerable: true,
        get: getter
      });
    }
  }
});

// node_modules/cookie-signature/index.js
var require_cookie_signature = __commonJS({
  "node_modules/cookie-signature/index.js"(exports) {
    var crypto = __require("crypto");
    exports.sign = function(val, secret) {
      if ("string" != typeof val) throw new TypeError("Cookie value must be provided as a string.");
      if ("string" != typeof secret) throw new TypeError("Secret string must be provided.");
      return val + "." + crypto.createHmac("sha256", secret).update(val).digest("base64").replace(/\=+$/, "");
    };
    exports.unsign = function(val, secret) {
      if ("string" != typeof val) throw new TypeError("Signed cookie string must be provided.");
      if ("string" != typeof secret) throw new TypeError("Secret string must be provided.");
      var str = val.slice(0, val.lastIndexOf(".")), mac = exports.sign(str, secret);
      return sha1(mac) == sha1(val) ? str : false;
    };
    function sha1(str) {
      return crypto.createHash("sha1").update(str).digest("hex");
    }
  }
});

// node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse;
    exports.serialize = serialize;
    var __toString = Object.prototype.toString;
    var cookieNameRegExp = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
    var cookieValueRegExp = /^("?)[\u0021\u0023-\u002B\u002D-\u003A\u003C-\u005B\u005D-\u007E]*\1$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    function parse(str, opt) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var len = str.length;
      if (len < 2) return obj;
      var dec = opt && opt.decode || decode;
      var index = 0;
      var eqIdx = 0;
      var endIdx = 0;
      do {
        eqIdx = str.indexOf("=", index);
        if (eqIdx === -1) break;
        endIdx = str.indexOf(";", index);
        if (endIdx === -1) {
          endIdx = len;
        } else if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        var keyStartIdx = startIndex(str, index, eqIdx);
        var keyEndIdx = endIndex(str, eqIdx, keyStartIdx);
        var key = str.slice(keyStartIdx, keyEndIdx);
        if (!obj.hasOwnProperty(key)) {
          var valStartIdx = startIndex(str, eqIdx + 1, endIdx);
          var valEndIdx = endIndex(str, endIdx, valStartIdx);
          if (str.charCodeAt(valStartIdx) === 34 && str.charCodeAt(valEndIdx - 1) === 34) {
            valStartIdx++;
            valEndIdx--;
          }
          var val = str.slice(valStartIdx, valEndIdx);
          obj[key] = tryDecode(val, dec);
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function startIndex(str, index, max) {
      do {
        var code = str.charCodeAt(index);
        if (code !== 32 && code !== 9) return index;
      } while (++index < max);
      return max;
    }
    function endIndex(str, index, min) {
      while (index > min) {
        var code = str.charCodeAt(--index);
        if (code !== 32 && code !== 9) return index + 1;
      }
      return min;
    }
    function serialize(name, val, opt) {
      var enc = opt && opt.encode || encodeURIComponent;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!cookieNameRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (!opt) return str;
      if (null != opt.maxAge) {
        var maxAge = Math.floor(opt.maxAge);
        if (!isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + maxAge;
      }
      if (opt.domain) {
        if (!domainValueRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!pathValueRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        var expires = opt.expires;
        if (!isDate(expires) || isNaN(expires.valueOf())) {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.partitioned) {
        str += "; Partitioned";
      }
      if (opt.priority) {
        var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError("option priority is invalid");
        }
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function decode(str) {
      return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e) {
        return str;
      }
    }
  }
});

// node_modules/express/lib/response.js
var require_response = __commonJS({
  "node_modules/express/lib/response.js"(exports, module) {
    "use strict";
    var Buffer2 = require_safe_buffer().Buffer;
    var contentDisposition = require_content_disposition();
    var createError = require_http_errors();
    var deprecate = require_depd()("express");
    var encodeUrl = require_encodeurl();
    var escapeHtml = require_escape_html();
    var http = __require("http");
    var isAbsolute = require_utils().isAbsolute;
    var onFinished = require_on_finished();
    var path = __require("path");
    var statuses = require_statuses();
    var merge = require_utils_merge();
    var sign = require_cookie_signature().sign;
    var normalizeType = require_utils().normalizeType;
    var normalizeTypes = require_utils().normalizeTypes;
    var setCharset = require_utils().setCharset;
    var cookie = require_cookie();
    var send = require_send();
    var extname = path.extname;
    var mime = send.mime;
    var resolve = path.resolve;
    var vary = require_vary();
    var res = Object.create(http.ServerResponse.prototype);
    module.exports = res;
    var charsetRegExp = /;\s*charset\s*=/;
    res.status = function status(code) {
      if ((typeof code === "string" || Math.floor(code) !== code) && code > 99 && code < 1e3) {
        deprecate("res.status(" + JSON.stringify(code) + "): use res.status(" + Math.floor(code) + ") instead");
      }
      this.statusCode = code;
      return this;
    };
    res.links = function(links) {
      var link = this.get("Link") || "";
      if (link) link += ", ";
      return this.set("Link", link + Object.keys(links).map(function(rel) {
        return "<" + links[rel] + '>; rel="' + rel + '"';
      }).join(", "));
    };
    res.send = function send2(body) {
      var chunk = body;
      var encoding;
      var req = this.req;
      var type;
      var app = this.app;
      if (arguments.length === 2) {
        if (typeof arguments[0] !== "number" && typeof arguments[1] === "number") {
          deprecate("res.send(body, status): Use res.status(status).send(body) instead");
          this.statusCode = arguments[1];
        } else {
          deprecate("res.send(status, body): Use res.status(status).send(body) instead");
          this.statusCode = arguments[0];
          chunk = arguments[1];
        }
      }
      if (typeof chunk === "number" && arguments.length === 1) {
        if (!this.get("Content-Type")) {
          this.type("txt");
        }
        deprecate("res.send(status): Use res.sendStatus(status) instead");
        this.statusCode = chunk;
        chunk = statuses.message[chunk];
      }
      switch (typeof chunk) {
        // string defaulting to html
        case "string":
          if (!this.get("Content-Type")) {
            this.type("html");
          }
          break;
        case "boolean":
        case "number":
        case "object":
          if (chunk === null) {
            chunk = "";
          } else if (Buffer2.isBuffer(chunk)) {
            if (!this.get("Content-Type")) {
              this.type("bin");
            }
          } else {
            return this.json(chunk);
          }
          break;
      }
      if (typeof chunk === "string") {
        encoding = "utf8";
        type = this.get("Content-Type");
        if (typeof type === "string") {
          this.set("Content-Type", setCharset(type, "utf-8"));
        }
      }
      var etagFn = app.get("etag fn");
      var generateETag = !this.get("ETag") && typeof etagFn === "function";
      var len;
      if (chunk !== void 0) {
        if (Buffer2.isBuffer(chunk)) {
          len = chunk.length;
        } else if (!generateETag && chunk.length < 1e3) {
          len = Buffer2.byteLength(chunk, encoding);
        } else {
          chunk = Buffer2.from(chunk, encoding);
          encoding = void 0;
          len = chunk.length;
        }
        this.set("Content-Length", len);
      }
      var etag;
      if (generateETag && len !== void 0) {
        if (etag = etagFn(chunk, encoding)) {
          this.set("ETag", etag);
        }
      }
      if (req.fresh) this.statusCode = 304;
      if (204 === this.statusCode || 304 === this.statusCode) {
        this.removeHeader("Content-Type");
        this.removeHeader("Content-Length");
        this.removeHeader("Transfer-Encoding");
        chunk = "";
      }
      if (this.statusCode === 205) {
        this.set("Content-Length", "0");
        this.removeHeader("Transfer-Encoding");
        chunk = "";
      }
      if (req.method === "HEAD") {
        this.end();
      } else {
        this.end(chunk, encoding);
      }
      return this;
    };
    res.json = function json(obj) {
      var val = obj;
      if (arguments.length === 2) {
        if (typeof arguments[1] === "number") {
          deprecate("res.json(obj, status): Use res.status(status).json(obj) instead");
          this.statusCode = arguments[1];
        } else {
          deprecate("res.json(status, obj): Use res.status(status).json(obj) instead");
          this.statusCode = arguments[0];
          val = arguments[1];
        }
      }
      var app = this.app;
      var escape = app.get("json escape");
      var replacer = app.get("json replacer");
      var spaces = app.get("json spaces");
      var body = stringify(val, replacer, spaces, escape);
      if (!this.get("Content-Type")) {
        this.set("Content-Type", "application/json");
      }
      return this.send(body);
    };
    res.jsonp = function jsonp(obj) {
      var val = obj;
      if (arguments.length === 2) {
        if (typeof arguments[1] === "number") {
          deprecate("res.jsonp(obj, status): Use res.status(status).jsonp(obj) instead");
          this.statusCode = arguments[1];
        } else {
          deprecate("res.jsonp(status, obj): Use res.status(status).jsonp(obj) instead");
          this.statusCode = arguments[0];
          val = arguments[1];
        }
      }
      var app = this.app;
      var escape = app.get("json escape");
      var replacer = app.get("json replacer");
      var spaces = app.get("json spaces");
      var body = stringify(val, replacer, spaces, escape);
      var callback = this.req.query[app.get("jsonp callback name")];
      if (!this.get("Content-Type")) {
        this.set("X-Content-Type-Options", "nosniff");
        this.set("Content-Type", "application/json");
      }
      if (Array.isArray(callback)) {
        callback = callback[0];
      }
      if (typeof callback === "string" && callback.length !== 0) {
        this.set("X-Content-Type-Options", "nosniff");
        this.set("Content-Type", "text/javascript");
        callback = callback.replace(/[^\[\]\w$.]/g, "");
        if (body === void 0) {
          body = "";
        } else if (typeof body === "string") {
          body = body.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
        }
        body = "/**/ typeof " + callback + " === 'function' && " + callback + "(" + body + ");";
      }
      return this.send(body);
    };
    res.sendStatus = function sendStatus(statusCode) {
      var body = statuses.message[statusCode] || String(statusCode);
      this.statusCode = statusCode;
      this.type("txt");
      return this.send(body);
    };
    res.sendFile = function sendFile(path2, options, callback) {
      var done = callback;
      var req = this.req;
      var res2 = this;
      var next = req.next;
      var opts = options || {};
      if (!path2) {
        throw new TypeError("path argument is required to res.sendFile");
      }
      if (typeof path2 !== "string") {
        throw new TypeError("path must be a string to res.sendFile");
      }
      if (typeof options === "function") {
        done = options;
        opts = {};
      }
      if (!opts.root && !isAbsolute(path2)) {
        throw new TypeError("path must be absolute or specify root to res.sendFile");
      }
      var pathname = encodeURI(path2);
      var file = send(req, pathname, opts);
      sendfile(res2, file, opts, function(err) {
        if (done) return done(err);
        if (err && err.code === "EISDIR") return next();
        if (err && err.code !== "ECONNABORTED" && err.syscall !== "write") {
          next(err);
        }
      });
    };
    res.sendfile = function(path2, options, callback) {
      var done = callback;
      var req = this.req;
      var res2 = this;
      var next = req.next;
      var opts = options || {};
      if (typeof options === "function") {
        done = options;
        opts = {};
      }
      var file = send(req, path2, opts);
      sendfile(res2, file, opts, function(err) {
        if (done) return done(err);
        if (err && err.code === "EISDIR") return next();
        if (err && err.code !== "ECONNABORTED" && err.syscall !== "write") {
          next(err);
        }
      });
    };
    res.sendfile = deprecate.function(res.sendfile, "res.sendfile: Use res.sendFile instead");
    res.download = function download(path2, filename, options, callback) {
      var done = callback;
      var name = filename;
      var opts = options || null;
      if (typeof filename === "function") {
        done = filename;
        name = null;
        opts = null;
      } else if (typeof options === "function") {
        done = options;
        opts = null;
      }
      if (typeof filename === "object" && (typeof options === "function" || options === void 0)) {
        name = null;
        opts = filename;
      }
      var headers = {
        "Content-Disposition": contentDisposition(name || path2)
      };
      if (opts && opts.headers) {
        var keys = Object.keys(opts.headers);
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          if (key.toLowerCase() !== "content-disposition") {
            headers[key] = opts.headers[key];
          }
        }
      }
      opts = Object.create(opts);
      opts.headers = headers;
      var fullPath = !opts.root ? resolve(path2) : path2;
      return this.sendFile(fullPath, opts, done);
    };
    res.contentType = res.type = function contentType(type) {
      var ct = type.indexOf("/") === -1 ? mime.lookup(type) : type;
      return this.set("Content-Type", ct);
    };
    res.format = function(obj) {
      var req = this.req;
      var next = req.next;
      var keys = Object.keys(obj).filter(function(v) {
        return v !== "default";
      });
      var key = keys.length > 0 ? req.accepts(keys) : false;
      this.vary("Accept");
      if (key) {
        this.set("Content-Type", normalizeType(key).value);
        obj[key](req, this, next);
      } else if (obj.default) {
        obj.default(req, this, next);
      } else {
        next(createError(406, {
          types: normalizeTypes(keys).map(function(o) {
            return o.value;
          })
        }));
      }
      return this;
    };
    res.attachment = function attachment(filename) {
      if (filename) {
        this.type(extname(filename));
      }
      this.set("Content-Disposition", contentDisposition(filename));
      return this;
    };
    res.append = function append(field, val) {
      var prev = this.get(field);
      var value = val;
      if (prev) {
        value = Array.isArray(prev) ? prev.concat(val) : Array.isArray(val) ? [prev].concat(val) : [prev, val];
      }
      return this.set(field, value);
    };
    res.set = res.header = function header(field, val) {
      if (arguments.length === 2) {
        var value = Array.isArray(val) ? val.map(String) : String(val);
        if (field.toLowerCase() === "content-type") {
          if (Array.isArray(value)) {
            throw new TypeError("Content-Type cannot be set to an Array");
          }
          if (!charsetRegExp.test(value)) {
            var charset = mime.charsets.lookup(value.split(";")[0]);
            if (charset) value += "; charset=" + charset.toLowerCase();
          }
        }
        this.setHeader(field, value);
      } else {
        for (var key in field) {
          this.set(key, field[key]);
        }
      }
      return this;
    };
    res.get = function(field) {
      return this.getHeader(field);
    };
    res.clearCookie = function clearCookie(name, options) {
      if (options) {
        if (options.maxAge) {
          deprecate('res.clearCookie: Passing "options.maxAge" is deprecated. In v5.0.0 of Express, this option will be ignored, as res.clearCookie will automatically set cookies to expire immediately. Please update your code to omit this option.');
        }
        if (options.expires) {
          deprecate('res.clearCookie: Passing "options.expires" is deprecated. In v5.0.0 of Express, this option will be ignored, as res.clearCookie will automatically set cookies to expire immediately. Please update your code to omit this option.');
        }
      }
      var opts = merge({
        expires: /* @__PURE__ */ new Date(1),
        path: "/"
      }, options);
      return this.cookie(name, "", opts);
    };
    res.cookie = function(name, value, options) {
      var opts = merge({}, options);
      var secret = this.req.secret;
      var signed = opts.signed;
      if (signed && !secret) {
        throw new Error('cookieParser("secret") required for signed cookies');
      }
      var val = typeof value === "object" ? "j:" + JSON.stringify(value) : String(value);
      if (signed) {
        val = "s:" + sign(val, secret);
      }
      if (opts.maxAge != null) {
        var maxAge = opts.maxAge - 0;
        if (!isNaN(maxAge)) {
          opts.expires = new Date(Date.now() + maxAge);
          opts.maxAge = Math.floor(maxAge / 1e3);
        }
      }
      if (opts.path == null) {
        opts.path = "/";
      }
      this.append("Set-Cookie", cookie.serialize(name, String(val), opts));
      return this;
    };
    res.location = function location(url) {
      var loc;
      if (url === "back") {
        deprecate('res.location("back"): use res.location(req.get("Referrer") || "/") and refer to https://dub.sh/security-redirect for best practices');
        loc = this.req.get("Referrer") || "/";
      } else {
        loc = String(url);
      }
      return this.set("Location", encodeUrl(loc));
    };
    res.redirect = function redirect(url) {
      var address = url;
      var body;
      var status = 302;
      if (arguments.length === 2) {
        if (typeof arguments[0] === "number") {
          status = arguments[0];
          address = arguments[1];
        } else {
          deprecate("res.redirect(url, status): Use res.redirect(status, url) instead");
          status = arguments[1];
        }
      }
      address = this.location(address).get("Location");
      this.format({
        text: function() {
          body = statuses.message[status] + ". Redirecting to " + address;
        },
        html: function() {
          var u = escapeHtml(address);
          body = "<p>" + statuses.message[status] + ". Redirecting to " + u + "</p>";
        },
        default: function() {
          body = "";
        }
      });
      this.statusCode = status;
      this.set("Content-Length", Buffer2.byteLength(body));
      if (this.req.method === "HEAD") {
        this.end();
      } else {
        this.end(body);
      }
    };
    res.vary = function(field) {
      if (!field || Array.isArray(field) && !field.length) {
        deprecate("res.vary(): Provide a field name");
        return this;
      }
      vary(this, field);
      return this;
    };
    res.render = function render(view, options, callback) {
      var app = this.req.app;
      var done = callback;
      var opts = options || {};
      var req = this.req;
      var self = this;
      if (typeof options === "function") {
        done = options;
        opts = {};
      }
      opts._locals = self.locals;
      done = done || function(err, str) {
        if (err) return req.next(err);
        self.send(str);
      };
      app.render(view, opts, done);
    };
    function sendfile(res2, file, options, callback) {
      var done = false;
      var streaming;
      function onaborted() {
        if (done) return;
        done = true;
        var err = new Error("Request aborted");
        err.code = "ECONNABORTED";
        callback(err);
      }
      function ondirectory() {
        if (done) return;
        done = true;
        var err = new Error("EISDIR, read");
        err.code = "EISDIR";
        callback(err);
      }
      function onerror(err) {
        if (done) return;
        done = true;
        callback(err);
      }
      function onend() {
        if (done) return;
        done = true;
        callback();
      }
      function onfile() {
        streaming = false;
      }
      function onfinish(err) {
        if (err && err.code === "ECONNRESET") return onaborted();
        if (err) return onerror(err);
        if (done) return;
        setImmediate(function() {
          if (streaming !== false && !done) {
            onaborted();
            return;
          }
          if (done) return;
          done = true;
          callback();
        });
      }
      function onstream() {
        streaming = true;
      }
      file.on("directory", ondirectory);
      file.on("end", onend);
      file.on("error", onerror);
      file.on("file", onfile);
      file.on("stream", onstream);
      onFinished(res2, onfinish);
      if (options.headers) {
        file.on("headers", function headers(res3) {
          var obj = options.headers;
          var keys = Object.keys(obj);
          for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            res3.setHeader(k, obj[k]);
          }
        });
      }
      file.pipe(res2);
    }
    function stringify(value, replacer, spaces, escape) {
      var json = replacer || spaces ? JSON.stringify(value, replacer, spaces) : JSON.stringify(value);
      if (escape && typeof json === "string") {
        json = json.replace(/[<>&]/g, function(c) {
          switch (c.charCodeAt(0)) {
            case 60:
              return "\\u003c";
            case 62:
              return "\\u003e";
            case 38:
              return "\\u0026";
            /* istanbul ignore next: unreachable default */
            default:
              return c;
          }
        });
      }
      return json;
    }
  }
});

// node_modules/serve-static/index.js
var require_serve_static = __commonJS({
  "node_modules/serve-static/index.js"(exports, module) {
    "use strict";
    var encodeUrl = require_encodeurl();
    var escapeHtml = require_escape_html();
    var parseUrl = require_parseurl();
    var resolve = __require("path").resolve;
    var send = require_send();
    var url = __require("url");
    module.exports = serveStatic;
    module.exports.mime = send.mime;
    function serveStatic(root, options) {
      if (!root) {
        throw new TypeError("root path required");
      }
      if (typeof root !== "string") {
        throw new TypeError("root path must be a string");
      }
      var opts = Object.create(options || null);
      var fallthrough = opts.fallthrough !== false;
      var redirect = opts.redirect !== false;
      var setHeaders = opts.setHeaders;
      if (setHeaders && typeof setHeaders !== "function") {
        throw new TypeError("option setHeaders must be function");
      }
      opts.maxage = opts.maxage || opts.maxAge || 0;
      opts.root = resolve(root);
      var onDirectory = redirect ? createRedirectDirectoryListener() : createNotFoundDirectoryListener();
      return function serveStatic2(req, res, next) {
        if (req.method !== "GET" && req.method !== "HEAD") {
          if (fallthrough) {
            return next();
          }
          res.statusCode = 405;
          res.setHeader("Allow", "GET, HEAD");
          res.setHeader("Content-Length", "0");
          res.end();
          return;
        }
        var forwardError = !fallthrough;
        var originalUrl = parseUrl.original(req);
        var path = parseUrl(req).pathname;
        if (path === "/" && originalUrl.pathname.substr(-1) !== "/") {
          path = "";
        }
        var stream = send(req, path, opts);
        stream.on("directory", onDirectory);
        if (setHeaders) {
          stream.on("headers", setHeaders);
        }
        if (fallthrough) {
          stream.on("file", function onFile() {
            forwardError = true;
          });
        }
        stream.on("error", function error(err) {
          if (forwardError || !(err.statusCode < 500)) {
            next(err);
            return;
          }
          next();
        });
        stream.pipe(res);
      };
    }
    function collapseLeadingSlashes(str) {
      for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) !== 47) {
          break;
        }
      }
      return i > 1 ? "/" + str.substr(i) : str;
    }
    function createHtmlDocument(title, body) {
      return '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>' + title + "</title>\n</head>\n<body>\n<pre>" + body + "</pre>\n</body>\n</html>\n";
    }
    function createNotFoundDirectoryListener() {
      return function notFound() {
        this.error(404);
      };
    }
    function createRedirectDirectoryListener() {
      return function redirect(res) {
        if (this.hasTrailingSlash()) {
          this.error(404);
          return;
        }
        var originalUrl = parseUrl.original(this.req);
        originalUrl.path = null;
        originalUrl.pathname = collapseLeadingSlashes(originalUrl.pathname + "/");
        var loc = encodeUrl(url.format(originalUrl));
        var doc = createHtmlDocument("Redirecting", "Redirecting to " + escapeHtml(loc));
        res.statusCode = 301;
        res.setHeader("Content-Type", "text/html; charset=UTF-8");
        res.setHeader("Content-Length", Buffer.byteLength(doc));
        res.setHeader("Content-Security-Policy", "default-src 'none'");
        res.setHeader("X-Content-Type-Options", "nosniff");
        res.setHeader("Location", loc);
        res.end(doc);
      };
    }
  }
});

// node_modules/express/lib/express.js
var require_express = __commonJS({
  "node_modules/express/lib/express.js"(exports, module) {
    "use strict";
    var bodyParser = require_body_parser();
    var EventEmitter = __require("events").EventEmitter;
    var mixin = require_merge_descriptors();
    var proto = require_application();
    var Route = require_route();
    var Router = require_router();
    var req = require_request();
    var res = require_response();
    exports = module.exports = createApplication;
    function createApplication() {
      var app = function(req2, res2, next) {
        app.handle(req2, res2, next);
      };
      mixin(app, EventEmitter.prototype, false);
      mixin(app, proto, false);
      app.request = Object.create(req, {
        app: {
          configurable: true,
          enumerable: true,
          writable: true,
          value: app
        }
      });
      app.response = Object.create(res, {
        app: {
          configurable: true,
          enumerable: true,
          writable: true,
          value: app
        }
      });
      app.init();
      return app;
    }
    exports.application = proto;
    exports.request = req;
    exports.response = res;
    exports.Route = Route;
    exports.Router = Router;
    exports.json = bodyParser.json;
    exports.query = require_query();
    exports.raw = bodyParser.raw;
    exports.static = require_serve_static();
    exports.text = bodyParser.text;
    exports.urlencoded = bodyParser.urlencoded;
    var removedMiddlewares = ["bodyParser", "compress", "cookieSession", "session", "logger", "cookieParser", "favicon", "responseTime", "errorHandler", "timeout", "methodOverride", "vhost", "csrf", "directory", "limit", "multipart", "staticCache"];
    removedMiddlewares.forEach(function(name) {
      Object.defineProperty(exports, name, {
        get: function() {
          throw new Error("Most middleware (like " + name + ") is no longer bundled with Express and must be installed separately. Please see https://github.com/senchalabs/connect#middleware.");
        },
        configurable: true
      });
    });
  }
});

// node_modules/express/index.js
var require_express2 = __commonJS({
  "node_modules/express/index.js"(exports, module) {
    module.exports = require_express();
  }
});
export default require_express2();
/*! Bundled license information:

merge-descriptors/index.js:
  (*!
   * merge-descriptors
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)

encodeurl/index.js:
encodeurl/index.js:
  (*!
   * encodeurl
   * Copyright(c) 2016 Douglas Christopher Wilson
   * MIT Licensed
   *)

escape-html/index.js:
  (*!
   * escape-html
   * Copyright(c) 2012-2013 TJ Holowaychuk
   * Copyright(c) 2015 Andreas Lubbe
   * Copyright(c) 2015 Tiancheng "Timothy" Gu
   * MIT Licensed
   *)

parseurl/index.js:
  (*!
   * parseurl
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2014-2017 Douglas Christopher Wilson
   * MIT Licensed
   *)

finalhandler/index.js:
  (*!
   * finalhandler
   * Copyright(c) 2014-2022 Douglas Christopher Wilson
   * MIT Licensed
   *)

express/lib/router/layer.js:
express/lib/router/route.js:
express/lib/router/index.js:
express/lib/middleware/init.js:
express/lib/middleware/query.js:
express/lib/view.js:
express/lib/application.js:
express/lib/request.js:
express/lib/express.js:
express/index.js:
  (*!
   * express
   * Copyright(c) 2009-2013 TJ Holowaychuk
   * Copyright(c) 2013 Roman Shtylman
   * Copyright(c) 2014-2015 Douglas Christopher Wilson
   * MIT Licensed
   *)

methods/index.js:
  (*!
   * methods
   * Copyright(c) 2013-2014 TJ Holowaychuk
   * Copyright(c) 2015-2016 Douglas Christopher Wilson
   * MIT Licensed
   *)

safe-buffer/index.js:
  (*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)

content-disposition/index.js:
  (*!
   * content-disposition
   * Copyright(c) 2014-2017 Douglas Christopher Wilson
   * MIT Licensed
   *)

etag/index.js:
  (*!
   * etag
   * Copyright(c) 2014-2016 Douglas Christopher Wilson
   * MIT Licensed
   *)

fresh/index.js:
  (*!
   * fresh
   * Copyright(c) 2012 TJ Holowaychuk
   * Copyright(c) 2016-2017 Douglas Christopher Wilson
   * MIT Licensed
   *)

range-parser/index.js:
  (*!
   * range-parser
   * Copyright(c) 2012-2014 TJ Holowaychuk
   * Copyright(c) 2015-2016 Douglas Christopher Wilson
   * MIT Licensed
   *)

send/index.js:
  (*!
   * send
   * Copyright(c) 2012 TJ Holowaychuk
   * Copyright(c) 2014-2022 Douglas Christopher Wilson
   * MIT Licensed
   *)

forwarded/index.js:
  (*!
   * forwarded
   * Copyright(c) 2014-2017 Douglas Christopher Wilson
   * MIT Licensed
   *)

proxy-addr/index.js:
  (*!
   * proxy-addr
   * Copyright(c) 2014-2016 Douglas Christopher Wilson
   * MIT Licensed
   *)

express/lib/utils.js:
express/lib/response.js:
  (*!
   * express
   * Copyright(c) 2009-2013 TJ Holowaychuk
   * Copyright(c) 2014-2015 Douglas Christopher Wilson
   * MIT Licensed
   *)

negotiator/index.js:
  (*!
   * negotiator
   * Copyright(c) 2012 Federico Romero
   * Copyright(c) 2012-2014 Isaac Z. Schlueter
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)

accepts/index.js:
  (*!
   * accepts
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)

serve-static/index.js:
  (*!
   * serve-static
   * Copyright(c) 2010 Sencha Inc.
   * Copyright(c) 2011 TJ Holowaychuk
   * Copyright(c) 2014-2016 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
//# sourceMappingURL=express.js.map
