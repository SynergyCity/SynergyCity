angular.module('synergyCity')
  .directive('face', function(){
    return {
      restrict: 'E',
      scope: { happinessLevel: '@' },
      template: '<img style="width:100%;height:100%;" src="content/smiley-{{happinessName}}.svg"></img>',
      controller: function($scope){
        $scope.$watch('happinessLevel', function(){
	  switch($scope.happinessLevel) {
	    case -1:
              $scope.happinessName = 'sad';
	      break;
	    case 0:
              $scope.happinessName = 'neutral';
	      break;
	    case 1:
              $scope.happinessName = 'happy';
	      break;
	    default:
	      $scope.happinessName = 'neutral';
	  }
	});
      }
    };
  });
