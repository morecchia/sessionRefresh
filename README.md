sessionRefresh
==============

A small, simple javascript library that allows you to add a timeout to a webpage when there is no mouse or keyboard activity.  
  
No external dependencies.

API:  

Create a new instance of SessionTimer  
`var session = new SessionTimer();`

Call the init() method, passing in a configuration object to kick everything off
`session.init({
  duration: 3540000, // the timeout duration; defaults to 15 minutes
  message: 'Your session has expired.  You will now be logged out.', // the alert message; defaults to an empty string
  url: '/account/logout', // url to redirect to, typically would log the user out of the application
  refresh: $.getJSON('/api/session') // can be set to a callback function that returns a boolean, or a promise object
});`
