conferenceApp.controller('adhocController', ['$scope','$timeout', function($scope,$timeout) {
        $scope.message = 'adhoc controller called.';
        $scope.rooms=["Pushya","Revati","Anurdha","Rohini","Kritika","Ashwini"];
         $scope.CurrentDate = new Date();
          var update = function() {
            $scope.CurrentDate = new Date();
            $timeout(update, 1000);
          }
          $timeout(update, 1000);
    }]);