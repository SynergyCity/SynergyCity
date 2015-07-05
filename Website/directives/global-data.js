angular.module('synergyCity').directive('globalData', function(){
  return {
    restrict: 'E',
    templateUrl: 'directives/global-data.html',
    controller: function($scope){
      $scope.currentLevel = 1;
      $scope.$watch('houses', function(){
        $scope.currentTotalMoney = sum($scope.houses.map(function(house){ 
  	      return house.wallet.balance; 
        }));

		var sumOfHappiness = sum($scope.houses.map(function(house){ return house.happiness; }));

		$scope.currentOverallHappiness = sumOfHappiness > 0 ? 1 : sumOfHappiness == 0 ? 0 : -1;
		$scope.sumOfHappiness = sumOfHappiness;
      }, true);
      $scope.currentOverallHappiness = 0;
	  $scope.sumOfHappiness = 0;

	  function sum(arr) {
		return arr.reduce(function(overallBalance, balance){ return overallBalance + balance; }, 0);
	  }
    }
  };
});
