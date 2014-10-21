var SessionTimer = function (element) {
	var sessionAlive = false,
		el = element || document.body;
	
	var runner = {
	
		init: function (config) {
			config = config || {};
			console.log("here we go...");
			this.duration = config.duration || 900000;
			this.redirectUrl = config.url || '#';
			this.message = config.message || '';
			this.refresh = config.refresh;
			
			if (this.timer) {
				window.clearTimeout(this.timer);
			}
		
			this.addListeners();
			this.sessionTimer();
		},
		
		sessionHandler: function(event) {
			if (typeof runner.refresh === 'function') {
				sessionAlive = runner.refresh();
			} else if (typeof runner.refresh.then === 'function') { // quick, dirty check for a promise object
				runner.refresh.then(function (data) {
						sessionAlive = true; // set on AJAX success
				}, function (jqXHR, textStatus, error) {
					    sessionAlive = false;
					    throw new Error(error);
					});
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
	
		sessionTimer: function () {
			var self = this;

			this.timer = window.setTimeout(function () {
				if (!sessionAlive) {
					alert(self.message);
					window.clearTimeout(self.timer);
					window.location = self.redirectUrl; // '/logout'
				}

				sessionAlive = false;

				self.addListeners();
				self.sessionTimer();
				
			}, self.duration);
		}
	};
	
	return runner;
};