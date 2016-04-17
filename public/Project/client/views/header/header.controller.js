(function(){
    angular.module("FinalProject")
        .controller("HeaderController",HeaderController);

    function HeaderController($scope, $rootScope, $location,$http,SearchService,$routeParams,UserService) {
        $scope.$location = $location;
        var vm=this;

        vm.search=search;

        $scope.logout = function(){
            UserService
                .logout()
                .then(function (response) {
                    console.log("NOW LOGOUT SCENE IS" +response+ response.data)

                    $rootScope.user = response;
                    $location.path("/home");
                })
        };

        function search(value)
        {
            $rootScope.events=null
            $location.path("/search/"+vm.value);
        }


    }

})();

