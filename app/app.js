'use strict';

var ipfCalc = angular.module('ipfCalc', []);

ipfCalc.controller('CalculateController', function($scope) {
	//initial values
	$scope.fragments = [];
	$scope.data = {mtuSize: 1500};

	//when you click "Calculate"
	$scope.calculate = function(data){
		//Initializing the data...
		$scope.fragments = [];
		var headerSize = 20;
		var remaining = data.dataSize;
		var maxSize = data.mtuSize - headerSize;
		var flag = 1;

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
				offset: ~~((data.dataSize-remaining)/8), 
			})

			//until everything has been sent.
			remaining -= maxSize;
		}
	};
});