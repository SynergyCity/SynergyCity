angular.module('synergyCity')
  .directive('toolbox', function(){
    return {
      scope: true,
      templateUrl: 'directives/toolbox.html',
      restrict: 'E',
      controller: function($scope, $document, $rootScope) {
        $rootScope.startDraggingSolarPanel = function() {
          $rootScope.draggingSolarPanel = true;
          angular.element(document.body).addClass('dragging-solar-panel');
        }
        
        $rootScope.endDraggingSolarPanel = function() {
          $rootScope.draggingSolarPanel = false;
          angular.element(document.body).removeClass('dragging-solar-panel');
        }
      }
    };
  });
