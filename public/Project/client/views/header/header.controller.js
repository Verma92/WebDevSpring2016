(function(){
    angular.module("FinalProject")
        .controller("HeaderController",HeaderController);

    function HeaderController($scope, $rootScope, $location,$http,SearchService,$q) {
        $scope.$location = $location;
        var vm=this;
        $scope.search=search;


        function search(value)
        {
            $rootScope.loading=1;
            console.log("INN")
            SearchService.searchbytitle(value).then(renderresults,rendererror);

        }
        function renderresults(response){

            $rootScope.loading=null;
            $rootScope.events=response.data.events;
            $rootScope.length=$rootScope.events.length;

            console.log($rootScope.events);
            console.log($rootScope.length);


            $location.path("/search");
        }
        function rendererror()
        {
            console.log("error");
        }
    }

})();




/*


 $http({
 method: 'GET',
 url: '/some/url.py',
 params: {
 search: 'something' // will result in url /some/url.py?search=something
 }

 ?q="+value+"&token=AP4W7O3MQCLNJSL2NTHV"
,config.headers={
    "q":value,
    "Authorization":"AP4W7O3MQCLNJSL2NTHV"
});*/
