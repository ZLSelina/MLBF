/******************************************************************************
 * MLBF Controller 0.0.1 2015-05-26 
 * author hongri
 ******************************************************************************/
MLBF.define('app.Model', function(require, exports, module) {
    var extend = require('util.extend'),
        Attribute = require('util.Attribute');
        
    var Model = extend({}, Attribute);
    return Model;
});