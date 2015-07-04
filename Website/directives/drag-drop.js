angular.module('synergyCity')
  .directive('dragStart', function() {
    return {
      controller: function($scope, $element, $attrs, $parse) {
        $element.attr('draggable', true);
        $element.on('dragstart', function() {
			   $parse($attrs.dragStart)($scope);
		    });
      }
    }
  })
  .directive('dragOver', function() {
    return {
      controller: function($scope, $element, $attrs, $parse) {
        $element.on('dragover', function(event) {
			   $parse($attrs.dragOver)($scope, { $event: event });
		    });
      }
    }
  })
  .directive('drop', function() {
    return {
      controller: function($scope, $element, $attrs, $parse) {
        $element.on('drop', function() {
	       $parse($attrs.drop)($scope);
		   $element.attr('draggable', false);
         $scope.$apply();
		    });
      }
    }
  })
