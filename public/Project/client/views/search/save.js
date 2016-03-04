(function(){
    angular.module("FinalProject")
        .controller("SearchControler",SearchControler);

    function SearchControler($scope, $rootScope, $location,$sce,$routeParams,SearchService) {

        var vm=this;

        vm.details=details;
        $scope.$location = $location;

        function init()
        {
            if($routeParams.title)
            {
                console.log("params there")
            }
        }
        init();

        function details(desc)
        {
            console.log(desc)
            $rootScope.description=$sce.trustAsHtml(desc);
            $location.path("/details");
        }


    }

})();

