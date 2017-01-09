/******************************************************************************
 * MLBF 0.0.1 2015-06-11
 * author hongri
 ******************************************************************************/

MLBF.define('DemoController', function(require, exports, module) {
    var Controller = require('app.Controller'),
        template = require('util.template');

    var DemoController = Controller.inherit({
        /**
         * controller scope
         */
        selector: '#demoController',

        /**
         * this.$element
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
            DemoModel = require('DemoModel');

            var that = this;
            console.log('I am Controller');


            DemoModel = new DemoModel();
            console.log(DemoModel.url);
            DemoModel.set('id', 'test');
            console.log(DemoModel.get('id'));
            DemoModel.test().done(function() {
                console.log(DemoModel.get('responseData'));
                console.log('demo model attrs: ' + JSON.stringify(DemoModel.attributes()));
            }).fail();
            console.log('demo model attrs: ' + JSON.stringify(DemoModel.attributes()));

        },

        testFunc: function(el) {
            var that = $(el.target);
            console.log(that.val());

            // test template
            var render, html;
            html = [
                '<p><%=data.test%></p>'
            ].join('');
            render = template.compile(html);
            html = render({
                data: {
                    'test': '<script>alert(1)</script>Hello world!'
                }
            });
            this.$result.html(html);
        }
    })

    return DemoController;
})

var DemoController = MLBF.require('DemoController');
new DemoController();