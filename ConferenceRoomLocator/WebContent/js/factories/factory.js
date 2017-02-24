conferenceApp.factory('CalendarFactory', ['$resource', function($resource){
    return $resource(CONSTANTS.BASEURL+CONSTANTS.CALENDAR_API,{roomId:'@roomId'},{
        save :{
            method:'POST',
            headers:{'Content-Type':'application/json;charset=UTF-8'}
        }
    });
}]);


conferenceApp.factory('Status', ['$resource', function($resource){
    return $resource(CONSTANTS.BASEURL+CONSTANTS.STATUS_API);
}]);

conferenceApp.factory('Customer', ['$resource', function($resource){
    return $resource(CONSTANTS.BASEURL+CONSTANTS.CUST_API);
}]);

