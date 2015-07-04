angular.module('synergyCity')
  .directive('house', function() {
    return {
      scope: { house: '=houseRef'},
      templateUrl: 'directives/house.html',
      controller: function($scope) {
        $scope.__proto__ = $scope.$parent;

	$scope.$watch('season', function(season) {
	  $scope.house.completeTimeSlice(season);
	})

        $scope.solarPanels = [
          {},
          {},
          {},
          {},
        ];
        
        $scope.dropSolarPanel = function() {
          console.log('drop')
          $scope.solarPanels.push({});
        }
        
        $scope.dragOverSolarPanel = function($event) {
          $event.preventDefault();
          console.log('drag over')
        }
      }
    };
  });
