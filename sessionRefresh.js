var SessionTimer = function (element) {
	var sessionAlive = false,
		el = element || document.body;
	
	var runner = {
	
		init: function (config) {
			config = config || {};
			
			this.duration = config.duration || 900000;
			this.redirectUrl = config.url || '#';
			this.message = config.message || '';
			this.confirm = config.confirm;
			this.refresh = config.refresh;
			
			if (this.timer) {
				window.clearTimeout(this.timer);
			}
		
			this.addListeners();
			this.setTimer();
		},
		
		sessionHandler: function(event) {
			if (typeof runner.refresh === 'function') {
				sessionAlive = runner.refresh();
			} else if (typeof runner.refresh.then === 'function') { // quick, dirty check for a promise object
				runner.refresh
					.then(function (data) {
						sessionAlive = true; // set on AJAX success
					});
					/* TODO: add error handling for promises
					.fail(function (error) {
						sessionAlive = false;
						console.log(error);
						// throw new Error(error);
					});
					*/
			} else {
				throw new Error('Callback not a function. You must provide a valid function the session timer.');
			}
			el.removeEventListener(event.type, this.sessionHandler, false);
			window.clearTimeout(this.timer);
		},
	
		addListeners: function () {
			if (!sessionAlive) {
				el.addEventListener('mousemove', this.sessionHandler, false);
				el.addEventListener('keypress', this.sessionHandler, false);
			}
		},
		
		waitExpire: function (confirmation, callback) {
			if (typeof callback === 'function') {
				window.setTimeout(function() {
					callback(confirmation);
				}, 5000);
			} else {
				throw new Error('Callback not a function. You must provide a valid function the session timer.');
			}
		},
	
		setTimer: function () {
			var self = this;
			this.waitConfirm();
			this.timer = window.setTimeout(function () {	
				if (!sessionAlive) {
					var confirmation = self.confirm || window.confirm(self.message);
										
					if (!confirmation) {
						window.clearTimeout(self.timer);
						window.location = self.redirectUrl; // '/logout'
					}
					
					self.waitExpire(function (confirmation) {
						if (confirmation) {
							window.location = self.redirectUrl;
						}
					});
				}
				
				sessionAlive = false;

				self.addListeners();
				self.setTimer();
				
			}, self.duration);
		}
	};
	
	return runner;
};