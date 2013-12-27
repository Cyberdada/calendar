//var myApp = angular.module('myApp',[]);

function calendarHead($scope) {
 $scope.scale = "week";
 $scope.days = initDays();



function initDays() {
	moment.lang('sv');
var mon = moment().subtract('days', moment().day() - 1);
var retval = [];
for(var i = 0;i < 7 ; i++ )	{
		retval.push(mon.format("ddd, MMM, Do YYYY"));
	 	mon = moment(mon).add('days', 1);
	}
return retval;
} 
}