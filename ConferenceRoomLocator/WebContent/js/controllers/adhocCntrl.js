conferenceApp.controller('adhocController', ['$scope','$timeout','Status', function($scope,$timeout,Status) {
	$scope.message = 'adhoc controller called.';
	$scope.rooms=["Pushya","Revati","Anurdha","Rohini","Kritika","Ashwini"];
	$scope.CurrentDate = new Date();
	var update = function() {
		$scope.CurrentDate = new Date();
		$timeout(update, 1000);
	}
	$timeout(update, 1000);

$scope.roomList={};

	$scope.getRooms = function(){
		var profilesData = Status.query(function(){
			$scope.roomList = profilesData;
		},function(error){
			console.log('Error in retrieving rooms data '+error.data);
		});

	};

}]);