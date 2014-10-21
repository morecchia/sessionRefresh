sessionRefresh
==============

A small, simple javascript library that allows you to add a timeout to a webpage when there is no mouse or keyboard activity.  
  
No external dependencies.

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
