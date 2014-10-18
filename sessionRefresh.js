(function () {
	
	var sessionAlive = false;
	var SessionTimer = {
	
		init: function () {
			console.log("timing session...");
			if (this.timer) {
				window.clearTimeout(this.timer);
			}
		
			this.addListeners();
			this.setTimer();
		},
	
		sessionRefresh: function () {
			document.removeEventListener('mousemove', this.sessionRefresh, false);

			// send an AJAX request to refresh session on server
			sessionAlive = true; // set on AJAX success
		
			window.clearTimeout(this.timer);
			SessionTimer.init();
		},
	
		addListeners: function () {
			if (!sessionAlive) {
				document.addEventListener('mousemove', this.sessionRefresh, false);
			}
		},
	
		setTimer: function () {
			var self = this;
			
			this.timer = window.setTimeout(function () {
				if (!sessionAlive) {
					var confirmation = window.confirm("Your session expired. Continue?");
					if (!confirmation) {
						window.location = "http://www.mozilla.org";
					}
				}
			
				sessionAlive = false;
				self.init();
			}, 10000);
		}
	};	
	
	SessionTimer.init();
		
})();