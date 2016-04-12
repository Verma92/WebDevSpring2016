(function() {
    angular.module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, $rootScope, UserService) {

        $scope.login = function (username, password) {
            UserService.findUserByCredentials(username, password)
                .then(function (user) {

                    if(user.length!=0)
                    {

                    $rootScope.user =user;
                    $location.path("/profile");
                    }
                    else
                    {
                   alert("Wrong Credentials. Please Try Again...")
                    }
                })


        }
    }
})();