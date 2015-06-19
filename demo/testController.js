/******************************************************************************
 * MLBF 0.0.1 2015-06-11
 * author hongri
 ******************************************************************************/

MLBF.define('TestController', function(require, exports, module) {
    var Controller = require('app.Controller'),
        template = require('util.template'),
        Mobilebone = require('lib.Mobilebone');

    var TestController = Controller.inherit({
        /**
         * controller scope
         */
        selector: '#testController',

        /**
         * this.$element
         * @property elements
         * @type Object
         * @protected
         */
        elements: {
            $inputDiv: '.test',
            $result: '.result'
        },

        /**
         * Nodes default UI events
         * @property events
         * @type Object
         * @protected
         */
        events: {
            'click .test': 'testFunc'
        },

        //run when init
        defaultActions: function() {
            var that = this;
            console.log('I am TestController');
        },

        testFunc: function(el) {
            var that = $(el.target);
            console.log(that.val());
            console.log(this.$result);

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
            console.log(html);
            $('.result').html(html);
            //this.$result.html(html);
        }
    })

    return TestController;
})