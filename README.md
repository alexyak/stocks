# Module: stocks
The `stocks` module is a <a href="https://github.com/MichMich/MagicMirror">MagicMirror</a> addon.
This module displays a scrolling stocks ticker on your MagicMirror. 


## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
	{
		module: 'stocks',
        position: 'bottom_bar',
		config: {
			stocks: '.DJI,MSFT,AAPL,GOOG,INTC,CICS,TSLA,FB', // stock symbols
            updateInterval: 37000 // update interval in milliseconds
		}
	}
]
````

