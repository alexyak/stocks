/* Magic Mirror
 * Module: stocks
 *
 * By Alex Yakhnin https://github.com/alexyak
 * MIT Licensed.
 */
var NodeHelper = require('node_helper');
var request = require('request');

module.exports = NodeHelper.create({
  start: function () {
    console.log('stocks helper started ...');
  },

  getStocks: function (url) {
      var self = this;

      request({ url: url, method: 'GET' }, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              var result = JSON.parse(body.substring(3, body.length));
              self.sendSocketNotification('STOCKS_RESULT', result);
          }
      });

  },

  //Subclass socketNotificationReceived received.
  socketNotificationReceived: function(notification, payload) {
    if (notification === 'GET_STOCKS') {
      this.getStocks(payload);
    }
  }

});

