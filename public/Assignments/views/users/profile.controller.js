(function() {
    angular.module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope,$rootScope, $routeParams,$location,UserService) {
        $scope.update = function (newuser) {
            UserService.updateUser(newuser, $rootScope.user._id,function(cbuser)
            {
                $rootScope.user=cbuser;
                    alert("Profile Fields Updated")
            })


        }
    }
})();
