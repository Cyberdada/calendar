//var myApp = angular.module('myApp',[]);
angular.module('CyberDaDaCalendar').controller('calendarCtrl',
function calendarCtrl($scope, Timeslots, Bookables, Auth, bookingService) {



         var _mon =  moment().subtract('days', moment().day() - 1);
         $scope.days = initDays();
         $scope.Timeslots = Timeslots;
         $scope.Bookables = Bookables;
         $scope.alreadyBooked = [];
       
        function initDays() {
            moment.lang('sv');    
            var retval = [];
            var pon = _mon;
            for(var i = 0;i < 7 ; i++ )  {       
                retval.push(pon);
                pon = moment(pon).add('days', 1);
            }
            return retval;
        };

        
        bookingService.getBookings(function(snapshot){
            $scope.alreadyBooked.push(snapshot.val());
             markBooked($("#" + snapshot.val().book_id)[0]);
        });
    
 
    
        $scope.dateNow = function(){
            _mon =  moment().subtract('days', moment().day() - 1);
             $scope.days = initDays();
            $scope.$apply();
             markAllBooked();
        };

        $scope.nextWeek = function() {
            _mon = moment(_mon).add('days', 7); 
             $scope.days = initDays();
             $scope.$apply();
             markAllBooked();
        };
        $scope.previousExists = function() {
            return _mon._d <  moment().subtract('days', moment().day() - 1)._d;
        };

        $scope.previousWeek = function() {
            _mon = moment(_mon).subtract('days', 7); 
             $scope.days = initDays();
             $scope.$apply();
             markAllBooked();
        };

            function markAllBooked() {
            for(var i = 0; i < $scope.alreadyBooked.length; i++ ) {
                var p = $("#" + $scope.alreadyBooked[i].book_id)[0];
                markBooked(p);
            }
        };
        
        function markBooked(p){
            if(p !== undefined && p !== null) {
                $(p).removeClass("notBooked");
                $(p).addClass("booked");
            }              
        };

        $scope.setCurrent = function(ev) {
        	var target = event.target || event.srcElement;
        	while(target.nodeName.toUpperCase()  == "SPAN") {
        		target = target.parentNode;
        	}
            bookingService.addBooking({book_id:target.id});
        };
});