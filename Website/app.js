angular.module('synergyCity', ['ngAnimate'])
  .run(function() {
    
  }).controller('Controller', function($scope) {
    $scope.season = "spring";
    $scope.houses = [new House(),new House(),new House(),new House(),new House(),new House()];
    
    $scope.setHouses = function(houses) {
      $scope.houses = [];
      
      for (var i = 0; i < houses; i++) {
        $scope.houses.push({});
      }
    }
    
//    $scope.setHouses(1);
  });
