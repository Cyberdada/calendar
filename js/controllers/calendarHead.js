//var myApp = angular.module('myApp',[]);

function calendarHead($scope) {
 	$scope.scale = "week";
	var _mon =  moment().subtract('days', moment().day() - 1);
 	$scope.days = initDays();


	function initDays() {
		moment.lang('sv');    
		var retval = [];
		var pon = _mon;
		for(var i = 0;i < 7 ; i++ )	{
				retval.push(pon.format("ddd, MMM, Do YYYY"));
			 	pon = moment(pon).add('days', 1);
			}
		return retval;
	};


	$scope.dateNow = function(){
		_mon =  moment().subtract('days', moment().day() - 1);
 		$scope.days = initDays();
	}

	$scope.nextWeek = function() {
		_mon = moment(_mon).add('days', 7); 
 		$scope.days = initDays();
	}

	$scope.previousWeek = function() {
		_mon = moment(_mon).subtract('days', 7); 
 		$scope.days = initDays();

	}
}