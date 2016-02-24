(function() {
    angular.module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope,$rootScope, $routeParams,$location,UserService) {
        $scope.update = function (newuser) {
            UserService.updateUser(newuser, $rootScope.UID,function(cbuser)
            {
                $rootScope.user=cbuser;
                    console.log(cbuser)
            })


        }
    }
})();
