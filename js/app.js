angular.module('CyberDaDaCalendar', [ 'firebase'])
 
.value('fbURL', 'https://cyberdada.firebaseio.com/')
 
.factory('Booked', function($firebase, fbURL) {
  return $firebase(new Firebase(fbURL));
})


.factory('Timeslots', function() {
	return [{id:1, name:"08:00 - 10:00"}, {id:2, name:"10:00 - 12:00"}, {id:3, name:"12:00 - 14:00"}, {id:4, name:"14:00 - 17:00"}, {id:5,name:"17:00 - 20:00"}, {id:6,name:"20:00 - 22:00"}];
})

.factory('Bookables', function() {
	return [{id:1, name:"Tvättmaskin #1"}, {id:2, name:"Tvättmaskin #2"}, {id:3,name:"Tvättmaskin #3"}];
})


.factory('Auth', function() {
var chatRef = new Firebase('https://cyberdada.firebaseio.com');
return 	new FirebaseSimpleLogin(chatRef, function(error, user) {
  if (error) {
    // an error occurred while attempting login
    console.log(error);
  } else if (user) {
    // user authenticated with Firebase
    console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
  } else {
    // user is logged out
  }
});
})



