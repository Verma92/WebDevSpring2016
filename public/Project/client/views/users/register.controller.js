(function() {
    angular.module("FinalProject")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, $rootScope, UserService) {
            $scope.register = adduser;

        function adduser(user) {
            if (user.username !== undefined && user.password !== undefined
                && user.verifypassword !== undefined && user.password == user.verifypassword
                && user.email !== undefined)
            {
                UserService.addUser(user, function (adduser) {
                    $rootScope.user = adduser;
                    console.log(adduser)
                    $location.path("/profile");

                })
            }
            else
            {
                alert("Enter proper Credentials")
            }
        }
    }
})();
