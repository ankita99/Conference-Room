conferenceApp.controller('adhocController', ['$scope','$state','$location','$window','$http','$timeout','Status', '$interval','Customer', function($scope, $state, $location, $window, $http, $timeout, Status, $interval,Customer) {
	$scope.message = 'adhoc controller called.';
	
	$scope.rooms=["Pushya","Revati","Anurdha","Rohini","Kritika","Ashwini"];
	$scope.CustData={};
	$scope.CurrentDate = new Date();
	var update = function() {
		$scope.CurrentDate = new Date();
		$timeout(update, 1000);
	}
	$timeout(update, 1000);

$scope.roomList={  "roomStatus":[
                             { "name":"Pushya",
                                "status":"available"
                              },
                              {
                            	  "name":"Ashwini",
                                  "status":"available"
                              },
                              {
                            	  "name":"Revati",
                                 "status":"booked"
                              },
                              {
                            	  "name":"Rohini",
                                 "status":"BNO"
                              },
                              {
                            	  "name":"Kritika",
                                 "status":"FBO"
                              }
                               ] };

	$scope.getRooms = function(){
		var roomsData = Status.query(function(){
			$scope.roomList = roomsData;
		},function(error){
			console.log('Error in retrieving rooms data '+error.data);
		});

	};
	
	$scope.getCust = function(){
		var customersData = Customer.query(function(){
			$scope.CustData = customersData;
		},function(error){
			console.log('Error in retrieving rooms data '+error.data);
		});

	};
	
	$scope.getCust();
	$scope.startTimer = function(){
		var c = 89;
		$scope.timer = $interval(function(){
			$scope.timer = "Refreshing in : "+c;
			c--;
			if (c == 0) {
				c=89;
				//$scope.getRooms();	
				$scope.timer = "Refreshing Page";
			};
		}, 1000);
	};
	$scope.startTimer();

}]);