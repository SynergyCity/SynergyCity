angular.module('synergyCity')
  .directive('timeControl', function(){
    return {
      restrict: 'E',
      templateUrl: 'directives/time-control.html',
      scope: true,
      controller: function($scope, $rootScope) {
        $scope.nextClicked = function() {
	  $scope.progressSeason();
	};

	$scope.currentTime = "Summer?";
	$scope.currentWeather = "smiley-neutral";
      }
    };
  });
