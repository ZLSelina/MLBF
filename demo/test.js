/******************************************************************************
 * MLBF 0.0.1 2015-05-26 
 * author hongri
 ******************************************************************************/
MLBF.define("demoModel", function(require, exports, module) {
    var Model = require('app.Model'),
        REST = require('app.REST'),
        extend = require('util.extend'),
        $ = require('lib.Zepto');

    var SomeModel = extend({
        // CGI URL for sync data
        url: '/api/test',
        initialize: function() {
            // initialization things
            console.log("I'm a model!");
        },
        test: function() {
            console.log("get id from model: " + this.get("id"));
            var that = this;
            REST.read({
                url: this.url,
                data: {
                    "id": that.get('id')
                },
                success: function() {

                }
            })
        }
    }, Model);
    return SomeModel;
});

MLBF.define("demoController", function(require, exports, module) {
    var Controller = require('app.Controller'),
        template = require('util.template'),
        demoModel = require('demoModel'),
        Mobilebone = require('lib.Mobilebone');

    console.log(Mobilebone);

    console.log(demoModel.url);
    demoModel.set("id", "test");
    console.log(demoModel.get("id"));
    demoModel.test();
    console.log(demoModel.attributes());

    var Test = Controller.inherit({
        /**
         * 快捷访问，this.$element
         * @property elements
         * @type Object
         * @protected
         */
        elements: {
            $inputDiv: '.button',
            $result: '.result'
        },

        /**
         * Nodes default UI events
         * @property events
         * @type Object
         * @protected
         */
        events: {
            'click .button input': 'testFunc'
        },

        //run when init
        defaultActions: function() {
            var that = this;
            console.log("test hello");
        },

        testFunc: function(el) {
            var that = $(el.target);
            console.log(that.val());

            // test template
            var render, html;
            html = [
                '<p><%=data.test%></p>'
            ].join("");
            render = template.compile(html);
            html = render({
                data: {
                    "test": "Hello world!"
                }
            });
            this.$result.html(html);
        }
    })

    Test.include({
        settings: {
            events: {},
            selector: '.body'
        }
    });

    return Test;
})

var demoController = MLBF.require("demoController");
new demoController();