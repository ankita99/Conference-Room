/**
 * Creator : Ankita	
 * Purpose : Controller for displaying published stories
 */

appModule.controller("storysearchcntrl",['$scope','$state','$location','$window','$http','$rootScope','Criteria','StoryFactory', 'GLOBAL','filterFilter', function($scope, $state, $location, $window, $http, $rootScope, Criteria, StoryFactory, GLOBAL,filterFilter){

    	$scope.storylist = [];
    	$scope.filteredStories = [];
		$scope.predicate = '';
		$scope.reverse = false;
		$scope.count=0;
		
		/*************************** Get all stories *************************************/
		$scope.getStories = function(){
			//Get data for table of stories. And store it in $scope.storylistdata
			var storylistdata = StoryFactory.query(function(){
				 $scope.storylist = storylistdata;
				 $scope.totalItems = $scope.storylist.length;     //get the lenth for pagination
	             $scope.currentPage = 1;  							//set current page to 1			
			}, function(error){
				alert('Error'+error.data);
			});
			
		};
		
	
		$scope.getCriteria = function(){
			var criteriaData=Criteria.get(function(){
				$rootScope.labs=criteriaData.labs;
				$rootScope.domain=criteriaData.domains;
				$rootScope.labname=[];
				for(var i=0; i<$rootScope.labs.length ; i++)
					{
					$rootScope.labname.push($rootScope.labs[i].name);
					}
				//$rootScope.labname.push("all");
				$rootScope.labname.splice($rootScope.labname.indexOf("DevLab"),1);
				$rootScope.labname.splice($rootScope.labname.indexOf("CXLab"),1);
				$rootScope.labname.splice($rootScope.labname.indexOf("Paradise"),1);
				$rootScope.labname.splice($rootScope.labname.indexOf("BoardRoom"),1);
				$rootScope.labname.splice($rootScope.labname.indexOf("CEL Lab"),1);
				$rootScope.labname.splice($rootScope.labname.indexOf("BajiLab"),1);
				$rootScope.labname.splice($rootScope.labname.indexOf("Yorktown"),1);
				$rootScope.labname.sort();
				$rootScope.labname.splice(0,1,"Yorktown");
				
				GLOBAL.criteria = criteriaData;
			},function(error){
				alert('Error in retrieving criteria '+error.data);
			});
			
		};
		
		 $scope.order = function(predicate) {
			    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
			    $scope.predicate = predicate;
			  };
			  
		$scope.selectedIndustry = [];
		$scope.selectedDomains = [];
		$scope.selectedLab = [];
		
		$scope.uncheckAll = function() {
			  $scope.selectedIndustry.splice(0, $scope.selectedIndustry.length);
			  $scope.selectedDomains.splice(0, $scope.selectedDomains.length);
			  $scope.selectedLab.splice(0, $scope.selectedLab.length);
			  $scope.stories=[];
			  $scope.searchText="";	
			  $scope.totalItems = $scope.storylist.length;
  			  $scope.noOfPages = Math.ceil($scope.totalItems / $scope.itemsPerPage);
  			
			  };	
		
			  $scope.stories=[];
			  /************Filter published stories****************/
			  $scope.filterCriteria = function(storylist) {
				  function search(nameKey, myArray){
					  var flag=false;

					  for (var i=0; i < myArray.length; i++) {
						  if (myArray[i].name === nameKey) {
							  flag=true;
							  return flag;
						  }
					  }
					  return flag;
				  }
				  if (($scope.selectedIndustry.length > 0) ||  ($scope.selectedDomains.length > 0) || ($scope.selectedLab.length > 0))
				  {
					  $scope.industries=[];
					  $scope.industrylist=[];
					  var ind=[];
					  angular.forEach(storylist.galaxyData.industries.join(", ").split(": "), function(value) {
						  $scope.industries.push(value);

					  });
					  ind=$scope.industries;
					  angular.forEach(ind.join(", ").split(", "), function(value) {
						  $scope.industrylist.push(value);

					  });
					  /**********Industry filter**********/
					  for(var i=0;i<$scope.selectedIndustry.length;i++)
					  {
						  if (($.inArray($scope.selectedIndustry[i], $scope.industrylist) !==-1))
						  {
							  if($scope.stories.indexOf(storylist) == -1) {
								  $scope.stories.push(storylist);
							  }
							  $scope.count=$scope.stories.length;
							  return $scope.stories;
						  }
						  else{
							  if($scope.stories.indexOf(storylist) !== -1) {
								  $scope.stories.splice($scope.stories.indexOf(storylist),1);
							  }

						  }

					  }
					  /**********Domain filter**********/
					  for(var i=0;i<$scope.selectedDomains.length;i++)
					  {
						  if (($.inArray($scope.selectedDomains[i],storylist.galaxyData.domains.join(", ").split(", "))  !==-1))
						  {
							  if($scope.stories.indexOf(storylist) == -1) {
								  $scope.stories.push(storylist);
							  }
							  $scope.count=$scope.stories.length;
							  return $scope.stories;
						  }
						  else{
							  if($scope.stories.indexOf(storylist) !== -1) {
								  $scope.stories.splice($scope.stories.indexOf(storylist),1);
							  }

						  }

					  }

					/*********Lab Filter***********/
					  for(var i=0;i<$scope.selectedLab.length;i++)
					  {
						  if ((search($scope.selectedLab[i],storylist.galaxyData.targetLabs)) || (search("all",storylist.galaxyData.targetLabs)))
						  {
							  if($scope.stories.indexOf(storylist) == -1) {
								  $scope.stories.push(storylist);
							  }
							  $scope.count=$scope.stories.length;
							  return $scope.stories;
						  }
						  else{
							  if($scope.stories.indexOf(storylist) !== -1) {
								  $scope.stories.splice($scope.stories.indexOf(storylist),1);
							  }

						  }

					  }

					  if($scope.stories.length == 0){
						  $scope.totalItems = $scope.stories.length;
						  $scope.noOfPages = Math.ceil($scope.totalItems / $scope.itemsPerPage);
						  console.log("No stories found..!!!");
					  }
					  $scope.count=$scope.stories.length;
				  }

				  else {
					  $scope.stories=[];
					  $scope.count=$scope.storylist.length;

					  return storylist;
				  }

			  }
			  
		//Pagination
	    $scope.$watch('currentPage + totalItems', function() {
	        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);               //start item no from 
	        var end = begin + $scope.itemsPerPage;                                      //show item list till
	        $scope.filteredStories = $scope.storylist.slice(begin, end);             	//slice the array to our span
	        $scope.noOfPages = Math.ceil($scope.totalItems / $scope.itemsPerPage);      //total no of pages
	    });
	    
	    $scope.$watch('searchText', function (newVal, oldVal) {
	    	if($scope.stories.length > 0){
	    		$scope.filteredStories = filterFilter($scope.stories, newVal);
				$scope.totalItems = $scope.filteredStories.length;
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.itemsPerPage);
	    		
	    	}
	    	else{
	    		$scope.filteredStories = filterFilter($scope.storylist, newVal);
				$scope.totalItems = $scope.filteredStories.length;
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.itemsPerPage);
	    	}
			
			$scope.currentPage = 1;
		}, true);
	    
	    $scope.$watch('count', function () {
	    	if($scope.stories.length  > 0){
	    		$scope.filteredStories = filterFilter($scope.stories, $scope.searchText);
	    		$scope.totalItems =  $scope.filteredStories.length;
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.itemsPerPage);
	    		
	    	}
	    	else{
	    		$scope.filteredStories = filterFilter($scope.storylist, $scope.searchText);
	    		$scope.totalItems =  $scope.filteredStories.length;
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.itemsPerPage);
	    	}
			
	    	$scope.currentPage = 1;
		});
	    
	 
	    	$scope.getStories();
	    	$scope.getCriteria();
		    $scope.itemsPerPage =10 ;
}]);