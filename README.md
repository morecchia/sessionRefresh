sessionRefresh
==============

A small, simple javascript library that allows you to manage timeouts on webpage when there is no (mouse or keyboard) activity.  "Refresh" the session by passing in a promise object or a custom callback function.
  
No external dependencies.  

###TODO:
+ remove hardcoded javascript alert(), allow for custom alert function
+ event listeners should be added/removed on a timer, not immediately when activity occurs

###API:
Create a new instance of SessionTimer  
``` var session = new SessionTimer();``` 

Call the init() method, passing in a configuration object to kick everything off  
``` 
session.init({  
    duration: 3540000,  
    message: 'Your session has expired.  You will now be logged out.',  
    url: '/account/logout',
    refresh: $.getJSON('/api/session')
});
```  
