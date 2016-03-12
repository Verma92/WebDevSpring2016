(function(){
    angular.module("FinalProject")
        .controller("HeaderController",HeaderController);

    function HeaderController($scope, $rootScope, $location,$http,SearchService,$routeParams) {
        $scope.$location = $location;
        var vm=this;

        vm.search=search;

        $scope.logout = function(){
            $rootScope.user = undefined;
            $location.path("/home");
        };

        function search(value)
        {
            $rootScope.events=null
            $location.path("/search/"+vm.value);
        }


    }

})();

