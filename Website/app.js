angular.module('synergyCity', ['ngAnimate'])
  .run(function() {
    
  }).controller('Controller', function($scope) {
    $scope.seasonColors = {
      spring: ['#87c500', 'red'],
      summer: ['#e5e722', 'green'],
      autumn: ['#becc61', 'blue'],
      winter: ['#d9eec6', 'orange'],
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
    
    $scope.music = Math.random() >= 0.5 ? 'content/music/busy_schedule.mp3' : 'content/music/chuggachugga.mp3';
    
//    $scope.setHouses(1);
  });
