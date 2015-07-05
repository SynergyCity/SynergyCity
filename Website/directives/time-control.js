angular.module('synergyCity')
  .directive('timeControl', ['$timeout', function($timeout){
    return {
      restrict: 'E',
      templateUrl: 'directives/time-control.html',
      scope: true,
      controller: function($scope, $rootScope) {
        $rootScope.getOverallConsumption = function() {
          var overall = 0;
          $scope.houses.forEach(function(house) {
            overall += house.getConsumption($scope.season) - house.getProduction($scope.season);
          })
          return Math.max(0, overall);
        }

        $scope.timeout = null;
        $scope.playing = false;

        $scope.toggleGameplay = function () {
			$timeout.cancel($scope.timeout);
          if ($scope.playing) {
            $scope.playing = false;
          } else {
            $scope.playing = true;
              $scope.progressSeason();
            $scope.queueNextTick();
          }
        };

        $scope.queueNextTick = function () {
          $scope.timeout = $timeout(function () {
              $scope.progressSeason();
              $scope.queueNextTick();
            }, 2000);
        };

        $scope.nextClicked = function() {
          if (!$scope.playing) {
            $scope.progressSeason();
          }
	};

	$scope.currentWeather = "smiley-neutral";
      }
    };
  }])
  .filter('capitalize', function(){
    return function(input){
      return input[0].toUpperCase() + input.slice(1);
    };
  });
