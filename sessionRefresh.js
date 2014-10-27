var SessionRefresh = function (element) {
    var sessionAlive = false,
        el = element || document.body;

    var runner = {

        init: function (config) {
            this.config = config || {};
            this.duration = this.config.duration || 900000; // 15 minutes
            this.redirectUrl = this.config.url || '#';
            this.message = this.config.message || '';
            this.refresh = this.config.refresh;
            this.notify = this.config.notify;

            if (this.timer) {
                window.clearTimeout(this.timer);
            }

            this.addListeners();
            this.sessionTimer();
        },

        sessionNotify: function () {
            this.notify(this.message);
        },

        sessionLogout: function (url, callback) {
            callback(url);
        },

        sessionHandler: function (event) {
            var waitTimer = window.setTimeout()
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
                    self.sessionNotify();
                    window.clearTimeout(self.timer);

                    self.sessionLogout(self.redirectUrl, self.config.logout);
                }

                sessionAlive = false;

                self.addListeners();
                self.sessionTimer();

            }, self.duration);
        }
    };

    return runner;
};