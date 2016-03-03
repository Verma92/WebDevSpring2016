(function(){
    angular.module("FinalProject")
        .controller("HeaderController",HeaderController);

    function HeaderController($scope, $rootScope, $location,$http,SeacrhService,$q) {
        $scope.$location = $location;
        var vm=this;
        vm.search=search;


        function search(value)
        {
            SeacrhService.searchbytitle(value).then(renderresults,rendererror);

/*            $scope.results=SeacrhService.searchbytitle(value,function (x){console.log(x); })*/
                /*.then(renderresults,rendererror);
                * SeacrhService.searchbytitle(value)
                 $scope.results=SeacrhService.searchbytitle(value)
                 console.log($scope.results);*/
        }
        function renderresults(response){

            $rootScope.events=response.data.events;
            $rootScope.length=$rootScope.events.length;

            console.log($scope.events);
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
