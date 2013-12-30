//var myApp = angular.module('myApp',[]);

function calendarHead($scope, Timeslots,Bookables, Auth) {
         $scope.scale = "vecka";
        var _mon =  moment().subtract('days', moment().day() - 1);
         $scope.days = initDays();
         $scope.Timeslots = Timeslots;
         $scope.Bookables = Bookables;
         $scope.Current = "";
         $scope.currentId = "";
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

        function markBooked() {
        	for(i = 0; i < $scope.alreadyBooked.length; i++ ) {
				var p = $("#" + $scope.alreadyBooked[i].book_id)[0];
				if(p !== undefined && p !== null) {
					p.children[0].style.color = "#d55e00";
				}
			}
        };

		var messageListRef = new Firebase('https://cyberdada.firebaseio.com/bookings');
		messageListRef.on('child_added', function(snapshot) {
			$scope.alreadyBooked.push(snapshot.val());
			 markBooked();
		});

        $scope.login = function  () {
            Auth.login('facebook');
        }
       
        $scope.dateNow = function(){
                _mon =  moment().subtract('days', moment().day() - 1);
                 $scope.days = initDays();
                 $scope.$apply();
                 markBooked();
        }

        $scope.nextWeek = function() {
                _mon = moment(_mon).add('days', 7); 
                 $scope.days = initDays();
                 $scope.$apply();
                 markBooked();
        }

        $scope.previousWeek = function() {
                _mon = moment(_mon).subtract('days', 7); 
                 $scope.days = initDays();
                 $scope.$apply();
                 markBooked();
        }

        $scope.setCurrent = function(ev) {
        	var target = event.target || event.srcElement;
        	while(target.nodeName.toUpperCase()  == "SPAN") {
        		target = target.parentNode;
        	}
        	$scope.Current =target.title;
        	$scope.currentId = target.id;
        }

        $scope.Book = function() {
			var messageListRef = new Firebase('https://cyberdada.firebaseio.com/bookings');
			var bookref = messageListRef.push();
			bookref.set({'book_id': $scope.currentId});
			$("#myModal").modal('hide');

        }
}