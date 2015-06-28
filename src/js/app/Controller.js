/******************************************************************************
 * MLBF Controller 0.0.1 2015-05-26 
 * author hongri
 ******************************************************************************/

MLBF.define('app.Controller', function(require) {
    var extend = require('util.extend'),
        Zepto = require('lib.Zepto'),
        template = require('lib.template'),
        _ = require('util.underscore'),
        defaults = require('util.defaults'),
        Attribute = require('util.Attribute'),
        Class = require('util.Class');

    var methods = {},
        fn = Zepto.fn;

    //this.method = this.$el.method
    for (var methodName in fn) {
        if (fn.hasOwnProperty(methodName)) {
            (function(methodName) {
                methods[methodName] = function() {
                    if (!this.$el) {
                        this.setElement('<div></div>');
                    }
                    var result = this.$el[methodName].apply(this.$el, arguments);
                    return this.$el === result ? this : result;
                }
            })(methodName);
        }
    }

    delete methods.constructor;

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
    return Class.inherit(methods, Attribute, {
        initialize: function(opts) {

            //merge options
            this.mergeOptions(opts);

            //render structure
            this.render();

            /**
             * Fire when node initialized
             * @event load
             * @param {Event} event JQuery event
             * @param {Node} node Node object
             */
            this.trigger('load', [this]);
        },

        /**
         * @method $
         * @uses lib.Zepto
         */
        $: Zepto,

        /**
         * @method Zepto
         * @uses lib.Zepto
         */
        Zepto: Zepto,

        /**
         * @method template
         * @uses util.template
         */
        template: template,

        // todo
        // copy static property settings when inheriting

        /**
         * Merge options with defaults and cache to node.opts
         * @method mergeOptions
         * @param {Object} opts Options to be merged
         * @protected
         * @chainable
         * @example
         *      node.mergeOptions({
         *          //options
         *      });
         */
        mergeOptions: function(opts) {
            // use this.defaults before fall back to constructor.settings
            // which enables default settings to be inherited
            var options = defaults(true, opts || (opts = {}), this.defaults || this.constructor.settings || {});

            // set to attributes, keep silent to avoid firing change event
            this.set(options, {
                silence: true
            });
            return this;
        },

        /**
         * Render node
         * Most node needs overwritten this method for own logic
         * @method render
         * @chainable
         */
        render: function() {
            this.setElement(this.get('selector') || this.selector);
            return this;
        },

        /**
         * Set node's $el. $el is the base of a node ( UI component )
         * Cautious: direct change of node.$el may be dangerous
         * @method setElement
         * @param {String|documentElement|Zepto|Node} el The element to be core $el of the node
         * @chainable
         */
        setElement: function(el) {
            var $el = this.Zepto(el.node || el || this.selector) ;

            if (this.$el) {
                this.$el.replaceWith($el);
            }

            this.$el = $el;
            this.el = $el.get(0);

            // customize className
            if (this.get('className')) {
                this.$el.addClass(this.get('className'));
            }

            // Initialization of common elements for the component
            this.initElements();

            // Component default events
            this.delegateEvents();

            // Instance events
            this.initEvents();

            // Component's default actions, should be placed after initElements
            this.defaultActions();

            return this;
        },

        /**
         * Delegate events to node
         * @method delegateEvents
         * @param {Object} [events=this.events] Events to be delegated
         * @chainable
         * @example
         *      node.delegateEvents({
         *          'click .child': function(){
         *              alert('child clicked');
         *          }
         *      });
         */
        delegateEvents: function(events) {
            events = events || this.events;
            if (!events) {
                return this;
            }

            // delegate events
            var node = this;
            $.each(events, function(delegate, handler) {
                var args = (delegate + '').split(' '),
                    eventType = args.shift(),
                    selector = args.join(' ');

                if ($.trim(selector).length > 0) {
                    // has selector
                    // use delegate
                    node.delegate(selector, eventType, function() {
                        return node[handler].apply(node, arguments);
                    });

                    return;
                }

                node.bind(eventType, function() {
                    return node[handler].apply(node, arguments);
                });
            });

            return this;
        },

        /**
         * All default actions bound to node's $el
         * @method defaultActions
         * @protected
         */
        defaultActions: function() {

        },

        /**
         * Bind options.events
         * @method initEvents
         * @param {Object} [delegate=this] Object to be apply as this in callback
         * @chainable
         * @protected
         */
        initEvents: function(delegate) {
            var node = this,
                events = this.get('events');

            if (!events) {
                return this;
            }

            delegate = delegate || node;
            for (var eventName in events) {
                if (events.hasOwnProperty(eventName)) {
                    node.bind(eventName, proxy(events[eventName], delegate));
                }
            }

            return this;
        },

        /**
         * Find this.elements, wrap them with Zepto and cache to this, like this.$name
         * @method initElements
         * @chainable
         * @protected
         */
        initElements: function() {
            var elements = this.elements;

            if (elements) {
                for (var name in elements) {
                    if (elements.hasOwnProperty(name)) {
                        this[name] = this.find(elements[name]);
                    }
                }
            }

            return this;
        }
    });
});