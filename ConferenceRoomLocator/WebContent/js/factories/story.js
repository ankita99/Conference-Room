appModule.factory("httpInterceptor", ["$q", "$window", "$log",
  function ($q, $window, $log) {
    return {
     "response": function (response) {
        var responseHeaders;
        responseHeaders = response.headers();
        if (responseHeaders["content-type"] == null || responseHeaders["content-type"] == undefined){
        	return response;
        }
        else if (   responseHeaders["content-type"]
                 .indexOf("text/html") !== -1
               && response.data
               && response.data
                   .indexOf('<meta name="Security" content="public"/>') 
                      !== -1) {
          $window.location.reload();
          return $q.reject(response);
        }
        return response;
      }
    };
 }
]);

appModule.factory('StoryFactory', ['$resource', function($resource){
	return $resource(CONSTANTS.BASEURL+CONSTANTS.STORY_API,{storyId:'@storyId'},{
		save :{
			method:'POST',
			headers:{'Content-Type':'application/json;charset=UTF-8'}
		}
	});
}]);


appModule.factory('Criteria', ['$resource', function($resource){
	return $resource(CONSTANTS.BASEURL+CONSTANTS.CRITERIA_API);
}]);

