angular.module('synergyCity', ['ngAnimate'])
  .run(function() {
    
  }).controller('Controller', function($scope) {
    $scope.seasonColors = {
      spring: ['red', 'red'],
      summer: ['green', 'green'],
      autumn: ['blue', 'blue'],
      winter: ['orange', 'orange'],
    };
    
    $scope.seasonIndex = 0;
    $scope.$watch('seasonIndex', function(){
      $scope.season = seasons[$scope.seasonIndex];
    });
    $scope.progressSeason = function() {
      $scope.seasonIndex = ($scope.seasonIndex + 1) % 4;
    }
    $scope.houses = [new House(),new House(),new House(),new House(),new House(),new House()];
    
    $scope.setHouses = function(houses) {
      $scope.houses = [];
      
      for (var i = 0; i < houses; i++) {
        $scope.houses.push({});
      }
    }
    
//    $scope.setHouses(1);
  });
