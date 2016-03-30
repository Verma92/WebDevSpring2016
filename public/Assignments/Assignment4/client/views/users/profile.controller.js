(function() {
    angular.module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope,$rootScope, $routeParams,$location,UserService) {
        $scope.update = function (newuser) {
            UserService.updateUser(newuser, $rootScope.user._id).then(
                function(newuser)
            {
                console.log(newuser)
                $rootScope.user=newuser;
                    alert("Profile Fields Updated")
            })


        }
    }
})();
