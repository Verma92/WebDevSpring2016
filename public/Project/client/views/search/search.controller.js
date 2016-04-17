(function(){
    angular.module("FinalProject")
        .controller("SearchControler",SearchControler);

    function SearchControler($scope, $rootScope, $location,$sce,$routeParams,SearchService) {

        var vm=this;

        vm.details=details;
        $scope.$location = $location;

        function init()
        {
            if($routeParams.title) {
                console.log("params there")
                $rootScope.loading = 1;
                SearchService.searchbytitle($routeParams.title).then(renderresults, rendererror);
            }

        }init();

        function renderresults(response){

            $rootScope.loading=null;
            $rootScope.events=response.data.events;
            console.log($rootScope.events);

            if($rootScope.events.length==0)
                $rootScope.noresult=1
            else
                $rootScope.noresult=null

        }
        function rendererror()
        {
            console.log("error");
        }


        function details(desc,event)
        {
            $rootScope.event={
                imageurl:event.logo.url,
                eventid:event.id
            }
           console.log(desc)
            $rootScope.description=$sce.trustAsHtml(desc);
            $location.path("/details");
        }


    }

})();




