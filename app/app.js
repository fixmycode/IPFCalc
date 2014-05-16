'use strict';

var ipfCalc = angular.module('ipfCalc', []);

ipfCalc.directive('mtuValid', function(){
	return {
		require: 'ngModel',
		link: function(scope, elm, attrs, ctrl) {
			ctrl.$parsers.unshift(function(viewValue) {
				var value = viewValue - scope.data.headerSize;
				if(value > 0 && value % 8 == 0){
					ctrl.$setValidity('mtuValid', true);
					return viewValue;
				} else {
					ctrl.$setValidity('mtuValid', false);
					return undefined;
				}
			});
		}
	};
});

ipfCalc.controller('CalculateController', function($scope) {
	//initial values
	$scope.fragments = [];
	$scope.data = {
		dataSize: 4000, 
		mtuSize: 1500,
		headerSize: 20
	};

	//when you click "Calculate"
	$scope.calculate = function(data){
		//Initializing the data...
		$scope.fragments = [];
		var headerSize = data.headerSize;
		var remaining = data.dataSize - headerSize;
		var maxSize = data.mtuSize - headerSize;
		var flag = 1;
		var offset = 0;

		//While data doesn't fit the MTU...
		while(remaining > 0){
			var length = 0;
			if(maxSize < remaining){
				length = maxSize;
			} else {
				length = remaining;
				flag = 0;
			}

			//Create the segment
			$scope.fragments.push({
				length: length,
				flag: flag,
				offset: offset, 
			})

			//until everything has been sent.
			remaining -= length;
			offset = ~~(((offset*8)+length)/8);
		}
	};
});