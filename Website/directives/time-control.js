angular.module('synergyCity')
  .directive('timeControl', function(){
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
        
        $scope.nextClicked = function() {
	  $scope.progressSeason();
	};

	$scope.currentWeather = "smiley-neutral";
      }
    };
  })
  .filter('capitalize', function(){ 
    return function(input){ 
      return input[0].toUpperCase() + input.slice(1); 
    }; 
  });
