'use strict';

var ipfCalc = angular.module('ipfCalc', []);

ipfCalc.controller('CalculateController', function($scope) {
    // Initial values
    $scope.fragments = [];
    $scope.data = {
        dataSize: 4000, 
        mtuSize: 1500,
        headerSize: 20
    };

    // When you click "Calculate"
    $scope.calculate = function(data) {
        // Initializing the data...
        $scope.fragments = [];
        var headerSize = data.headerSize;
        var remaining = data.dataSize; // Initial payload size
        var maxSize = data.mtuSize - headerSize; // Maximum fragment size excluding header
        var maxPayload = maxSize - (maxSize % 8); // Ensuring max payload size is a multiple of 8
        var flag = 1;
        var offset = 0;

        // While data doesn't fit the MTU...
        while (remaining > 0) {
            var length = 0;
            if (maxSize < remaining) {
                length = maxPayload;
            } else {
                length = remaining;
                flag = 0; // Last fragment
            }

            // Create the segment
            $scope.fragments.push({
                length: length,
                flag: flag,
                offset: offset,
            });

            // Subtract the payload length of the fragment from the remaining payload
            remaining -= length;
            // Increment the offset by the length of the payload divided by 8
            offset += length / 8;
        }
    };
});

