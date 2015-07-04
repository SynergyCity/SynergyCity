angular.module('synergyCity')
  .directive('house', function() {
    return {
      scope: true,
      templateUrl: 'directives/house.html',
      controller: function($scope) {
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
