sessionRefresh
==============

A small, simple javascript library that allows you to manage timeouts on a webpage when there is no (mouse or keyboard) activity.  "Refresh" the session by passing in a promise object or a custom callback function.
  
No external dependencies.  

###API:
Create a new instance of SessionRefresh  
``` var session = new SessionRefresh();``` 

Call the init() method, passing in a configuration object to kick everything off  
``` 
session.init(config);
```
Set up a configuration object something like this:
```
var config = {};
```
duration = the amount of time in ms that the session can be inactive
```
config.duration = 3540000;
```
message = the message presented to the user when their session expires
```
config.message = 'Your session will expire soon.';
```
url = the url to redirect the user to when the session expires
```
config.url = '/Account/SessionTimeout';
```
refresh = can be a callback that returns boolean or i a promise object, like $.post('/session/refresh', {})
```
config.refresh = function () { return true; };
```
logout = a callback function that defines the logout behavior
```
// this example gives you 60 seconds to click continue or log out  
// before you are automatically redirected to the url
config.logout = function (url) {  
    var timer = window.setTimeout(function () {
      window.location = url;
    }, 60000);
    $("button#logout").click(function () {
      window.location = url;
    });
    $("button#continue").click(function () {
      window.clearTimeout(timer);
    });
};
```
notify = a callback function, called when the session duration expires
```
// in this example, a modal window pops up with the session message
// you can simply pass 'alert(message);' if you are testing
notify: function (message) {  
    $("#myModal").modal({ backdrop: 'static' });
  }
};
```  
###TODO:
+ more error checking
+ event listeners should be added/removed on a timer, not immediately when activity occurs
