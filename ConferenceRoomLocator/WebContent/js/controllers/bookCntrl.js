conferenceApp.controller('bookController', ['$scope', '$mdpTimePicker', function($scope, $mdpTimePicker) {
	$scope.message = 'Everyone come and book a room';
  this.myDate = new Date();
  this.isOpen = false;
  
  $scope.mytime = new Date();
  
  console.log($scope.startTime);

  this.showTimePicker = function(ev) {
  	$mdpTimePicker($scope.currentTime, {
      targetEvent: ev
    }).then(function(selectedDate) {
      $scope.currentTime = selectedDate;
      console.log($scope.currentTime);
    });
  };
  
  $scope.getRooms = function(){
	  console.log($scope.meetingDate);
	  console.log($scope.startTime);
	  console.log($scope.endTime);
  };
  
}]);