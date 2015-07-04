angular.module('synergyCity')
  .directive('timeControl', function(){
    return {
      restrict: 'E',
      templateUrl: 'directives/time-control.html',
      scope: true,
      controller: function($scope) {
        $scope.nextClicked = function() {
	  console.log('Next Clicked!');
	};

	$scope.currentTime = "Summer?";
	$scope.currentWeather = "noun_67566_cc";
      }
    };
  });
