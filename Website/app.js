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
    
	var soundtrack = [
		'busy_schedule.mp3',
		'chuggachugga.mp3',
		'wood_whistles.mp3'
	];
    $scope.music = 'content/music/' + soundtrack[Math.floor(Math.random() * 3)];
  });
