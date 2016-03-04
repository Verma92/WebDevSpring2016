(function(){
    angular.module("FinalProject")
        .controller("HeaderController",HeaderController);

    function HeaderController($scope, $rootScope, $location,$http,SearchService,$routeParams) {
        $scope.$location = $location;
        var vm=this;

        vm.search=search;


        function search(value)
        {
            $rootScope.loading=1;
            $rootScope.events=null;
            SearchService.searchbytitle(value).then(renderresults,rendererror);

        }
        function renderresults(response){

            $rootScope.loading=null;
            $rootScope.events=response.data.events;
            console.log($rootScope.events);

            if($rootScope.events.length==0)
                $rootScope.noresult=1
            else
                $rootScope.noresult=null

            $location.path("/search/"+vm.value);
        }
        function rendererror()
        {
            console.log("error");
        }
    }

})();

