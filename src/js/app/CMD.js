/******************************************************************************
 * MLBF 0.0.1 2015-05-26 
 * author hongri
 ******************************************************************************/

/*
 * CMD Rules, do not have dependencies module
 * MLBF.defined('moudleName', function(require, exports, module))
 */

(function(global, undefined) {

    // Avoid conflicting when `MLBF.js` is loaded multiple times
    if (global.MLBF) {
        var lastVersion = global.MLBF;
    }

    var exports = global.MLBF = {
        version: "0.0.1"
    }

    var data = exports.data = {};

    function isType(type) {
        return function(obj) {
            return {}.toString.call(obj) == "[object " + type + "]";
        }
    }

    var isFunction = isType("Function");

    var cachedMods = global.MLBF.cache = {};

    function Module() {};

    // Execute a module
    Module.prototype.exec = function() {
        var mod = this;

        if (this.execed) {
            return mod.exports;
        }
        this.execed = true;

        function require(id) {
            return Module.get(id).exec();
        }

        var factory = mod.factory;

        var exports = isFunction(factory) ?
            factory(require, mod.exports = {}, mod) :
            factory;

        if (exports === undefined) {
            exports = mod.exports;
        }

        // Reduce memory leak
        delete mod.factory;

        mod.exports = exports;

        return exports;
    }

    Module.save = function(meta) {
        var mod = Module.get(meta.id);

        mod.id = meta.id;
        mod.factory = meta.factory;
    }

    Module.get = function(id) {
        return cachedMods[id] || (cachedMods[id] = new Module());
    }

    // Define a module
    Module.define = function(id, factory) {
        var meta = {
            id: id,
            factory: factory
        }

        Module.save(meta);
    }

    exports.define = Module.define;

    // For Developers
    exports.Module = Module;

    exports.require = function(id) {
        var mod = Module.get(id);
        if (!mod.execed) {
            mod.exec();
        }
        return mod.exports;
    }

})(this)