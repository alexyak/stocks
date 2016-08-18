
'use strict';


Module.register("stocks", {

    result: [],
	// Default module config.
	defaults: {
		stocks: '.DJI,MSFT,AAPL,GOOG,INTC,CICS,TSLA,FB',
        updateInterval: 37000
	},

    getStyles: function() {
		return ["stocks.css"];
	},

    start: function() { 
        this.getStocks();
        this.scheduleUpdate();
    },

	// Override dom generator.
	getDom: function() {

        var wrapper = document.createElement("marquee");
        wrapper.className = 'medium bright';
        
        var count = 0;

        var _this = this;

        if (this.result.length > 0){
            this.result.forEach(function(stock) {
                var symbolElement =  document.createElement("span");
                var symbol = stock.t;
                var lastPrice = stock.l;
                var changePercentage = stock.cp;
                var lastClosePrice = stock.pcls_fix;
                var lastPriceFix = stock.l_fix;

                symbolElement.innerHTML = symbol + ' '; 
                wrapper.appendChild(symbolElement);

                var priceElement = document.createElement("span");

                priceElement.innerHTML = lastPrice;

                var changeElement = document.createElement("span");
                if (changePercentage > 0)
                    changeElement.className = "up";
                else 
                    changeElement.className = "down";

                var change = Math.round(Math.abs(lastPriceFix - lastClosePrice), -2);

                changeElement.innerHTML = " " + _this.roundValue(Math.abs(lastPriceFix - lastClosePrice));

                var divider = document.createElement("span"); 
                
                if (count < _this.result.length - 1)
                    divider.innerHTML = '  •  ';

                wrapper.appendChild(priceElement);

                wrapper.appendChild(changeElement);

                wrapper.appendChild(divider);
                count++;
            });

        }

        return wrapper;
	},

    scheduleUpdate: function(delay) {
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}

		var self = this;
		setInterval(function() {
			self.getStocks();
		}, nextLoad);
	},

    roundValue: function(value) {
       return Math.round(value*100)/100; 
    },

    getStocks: function () {
        var url = 'http://finance.google.com/finance/info?client=ig&q=' + this.config.stocks;
        this.sendSocketNotification('GET_STOCKS', url);
    },


    socketNotificationReceived: function(notification, payload) {
        if (notification === "STOCKS_RESULT") {
            this.result = payload;
            this.updateDom(self.config.fadeSpeed);
        }    
    },

});
