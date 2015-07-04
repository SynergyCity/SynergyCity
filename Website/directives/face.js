angular.module('synergyCity')
  .directive('face', function(){
    return {
      restrict: 'E',
      scope: { happinessLevel: '=' },
      template: '<div style="background-size:contain;background-repeat:no-repeat;background-position:center;" ng-style="{\'background-image\':\'url(\\\'content/smiley-\' + happinessName + \'.svg\\\')\'}"></div>',
      controller: function($scope){
        $scope.happinessName = 'sad';
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
