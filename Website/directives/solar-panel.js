angular.module('synergyCity')
  .directive('solarPanel', function(){
    return {
      scope: true,
      templateUrl: 'directives/solar-panel.html',
      restrict: 'E',
      controller: function($scope) {
        
      }
    };
  });
