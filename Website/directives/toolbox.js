angular.module('synergyCity')
  .directive('toolbox', function(){
    return {
      scope: true,
      templateUrl: 'directives/toolbox.html',
      restrict: 'E',
      controller: function($scope) {
        
      }
    };
  });
