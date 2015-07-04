angular.module('synergyCity')
  .directive('timeControl', function(){
    return {
      restrict: 'E',
      templateUrl: 'directives/time-control.html',
      scope: true,
      controller: function($scope) {
        $scope.nextClicked = function() {
	  console.log('Next Clicked!');
	  $scope.currentWeather = "smiley-sad" == $scope.currentWeather ? "smiley-happy" : "smiley-sad";
	};

	$scope.currentTime = "Summer?";
	$scope.currentWeather = "smiley-neutral";
      }
    };
  });
