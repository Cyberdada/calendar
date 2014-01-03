angular.module('CyberDaDaCalendar').factory('bookingService',
function bookingService() {

	return {
		getBookings : function (func) {
		  var messageListRef = new Firebase('https://cyberdada.firebaseio.com/bookings');
	      messageListRef.on('child_added',function(snapshot) { 
	      		func(snapshot); 
	      	});
		}, 

		addBooking: function (booking) {
	            var messageListRef = new Firebase('https://cyberdada.firebaseio.com/bookings');
	            var bookref = messageListRef.push();
	            bookref.set({'book_id': booking.book_id});
	 	}
	 }
});


