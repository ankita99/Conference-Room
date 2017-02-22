	// create the module and name it scotchApp
	var conferenceApp = angular.module('conferenceApp', ['ngRoute', 'ngMaterial']);

	// configure our routes
	conferenceApp.config(function($routeProvider, $mdThemingProvider) {
		
		//create application theme
		$mdThemingProvider.theme('orange')
		.accentPalette('orange')
		.backgroundPalette('blue');
		
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'js/partials/book.html',
				controller  : 'mainController'
			})

			// route for the about page
			.when('/cancel', {
				templateUrl : 'js/partials/cancel.html',
				controller  : 'cancelController'
			})

			// route for the contact page
			.when('/adhoc', {
				templateUrl : 'js/partials/adhoc.html',
				controller  : 'adhocController'
			});
	});
	
	// create the controller and inject Angular's $scope
	conferenceApp.controller('mainController', function($scope) {
		// create a message to display in our view
		$scope.message = 'Everyone come and book a room';
	});

	conferenceApp.controller('cancelController', function($scope) {
		$scope.message = 'Cancel controller called';
	});

	conferenceApp.controller('adhocController', function($scope) {
		$scope.message = 'adhoc controller called.';
	});