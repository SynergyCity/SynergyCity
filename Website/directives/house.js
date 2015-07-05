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

        $scope.solarPanels = $scope.house.fixtures;
        
        $scope.dropSolarPanel = function() {
          if (!$scope.draggingSolarPanel) {
            return;
          }
          
          $scope.house.addFixture(new SolarPanelFixture());
        }
        
        $scope.dragOverSolarPanel = function($event) {
          $event.preventDefault();
        }
        
        $scope.$watch('solarPanels.length', function() {
          $scope.placeholderSolarPanels = [];
          for (var i = 0; i < 4 - $scope.solarPanels.length; i++) {
            $scope.placeholderSolarPanels.push({});
          }
        })
      }
    };
  });
