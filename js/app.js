angular.module('CyberDaDaCalendar', [ 'firebase'])
 
.value('fbURL', 'https://cyberdada.firebaseio.com/')
 
.factory('Projects', function($firebase, fbURL) {
  return $firebase(new Firebase(fbURL));
})