conferenceApp.controller('bookController', ['$scope', '$mdpTimePicker', function($scope, $mdpTimePicker) {
	$scope.message = 'Everyone come and book a room';
	
	$scope.rooms=["Pushya","Revati","Anurdha","Rohini","Kritika","Ashwini"];

  this.showTimePicker = function(ev) {
  	$mdpTimePicker($scope.currentTime, {
      targetEvent: ev
    }).then(function(selectedDate) {
      $scope.currentTime = selectedDate;
      console.log($scope.currentTime);
    });
  };
  
  $scope.getRooms = function(){
	  $scope.showRooms = true;
  };
  
}]);