/******************************************************************************
 * MLBF 0.0.1 2015-06-11
 * author hongri
 ******************************************************************************/

MLBF.define('DemoModel', function(require, exports, module) {
    var Model = require('app.Model'),
        REST = require('app.REST'),
        extend = require('util.extend'),
        $ = require('lib.Zepto');

    var DemoModel = Model.inherit({
        // CGI URL for sync data
        url: '/api/test',
        initialize: function() {
            // initialization things
            console.log('I am a Model!');
        },
        test: function() {
            console.log('get id from model: ' + this.get('id'));
            var that = this;
            var promise = REST.create({
                url: this.url,
                data: {
                    'id': that.get('id')
                },
                success: function(data) {
                    that.set('responseData', data);
                }
            }).done(function(){console.log('ajax done!')})
            return promise;
        }
    }, Model);
    return DemoModel;
});
