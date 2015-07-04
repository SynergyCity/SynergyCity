angular.module('synergyCity').directive('globalData', function(){
  return {
    restrict: 'E',
    templateUrl: 'directives/global-data.html',
    controller: function($scope){
      $scope.currentLevel = 1;
      $scope.currentTotalMoney = 42;
      $scope.currentOverallHappiness = 37;
    }
  };
});
