sessionRefresh
==============

A small, simple javascript library that allows you to manage timeouts on a webpage when there is no (mouse or keyboard) activity.  "Refresh" the session by passing in a promise object or a custom callback function.
  
No external dependencies.  

###API:
Create a new instance of SessionTimer  
``` var session = new SessionTimer();``` 

Call the init() method, passing in a configuration object to kick everything off  
``` 
// this is being called within a Backbone view  
var self = this;  
session.init({
  duration: 3540000, // 59 minutes; the amount of time the session can be inactive
  message: 'Your session will expire soon.', // the message presented to the user
  url: '/Account/SessionTimeout', // the url to redirect the user to when the session expires
  refresh: function () { return true; },// must be a callback that returns boolean,  
                                        // or it can be a promise object, like $.post('/session/refresh', {})
  logout: function (url) {  
  // a callback function that defines the logout behavior.  
  // this example gives you 60 seconds to click continue or log out  
  // before you are automatically redirected to the url
    var timer = window.setTimeout(function () {
      window.location = url;
    }, 60000);
    $("button#logout").click(function () {
      window.location = url;
    });
    $("button#continue").click(function () {
      window.clearTimeout(timer);
    });
  },
  notify: function (message) {  
  // called when the session duration expires  
  // in this example, a modal window pops up with the session message
  // you can simply pass alert(message) if you are testing
    self.message = message;
    $(document.body).append(self.render().el);
    $("#myModal").modal({ backdrop: 'static' });
  }
});
```  
###TODO:
+ more error checking
+ event listeners should be added/removed on a timer, not immediately when activity occurs
