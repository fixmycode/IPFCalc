'use strict';

var ipfCalc = angular.module('ipfCalc', []);

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
		var maxPayload = maxSize - (maxSize % 8);
		var flag = 1;
		var offset = 0;

		//While data doesn't fit the MTU...
		while(remaining > 0){
			var length = 0;
			if(maxSize < remaining){
				length = maxPayload;
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