/******************************************************************************
 * MLBF Controller 0.0.5 2015-06-10
 * author hongri
 ******************************************************************************/
MLBF.define('app.Model', function(require, exports, module) {
    var extend = require('util.extend'),
        Attribute = require('util.Attribute'),
        Class = require('util.Class');

   	/**
     * All ui components' base. All Zepto methods and template engine are mixed in.
     * @class Node
     * @namespace app.Controller
     * @extends util.Class
     * @uses lib.Zepto
     * @uses util.Attributes
     * @constructor
     * @param {String|Zepto|documentElement|ui.Nodes.Node} selector Node selector
     * @example
     *      new Node('#someElement'); // Turn element, which id is 'someElement', into a node
     *
     * @example
     *      // Zepto object or Node object or document element object are all acceptable
     *      new Node($('#someElement'));
     *      new Node(new Node('#someElement'));
     *      new Node(document.getElementById('someElement'));
     */
    return Class.inherit(Attribute, {
        initialize: function(opts) {
            /**
             * Fire when node initialized
             * @event load
             * @param {Event} event JQuery event
             * @param {Node} node Node object
             */
            this.trigger('load', [this]);
        }
    });
        
});