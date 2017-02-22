conferenceApp.controller('bookController', ['$scope', function($scope) {
	$scope.message = 'Everyone come and book a room';
  this.myDate = new Date();
  this.isOpen = false;
}]);