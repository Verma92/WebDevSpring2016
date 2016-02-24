(function() {
    angular.module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, $rootScope, UserService) {

        $scope.login = function (username, password) {
            UserService.findUserByCredentials(username, password,
                function (user) {
                    $rootScope.user = user;
                    if(angular.isDefined(user))
                    {
                    $location.path("/profile");
                    }
                    else
                   alert("Wrong Credentials. Please Try Again...")
                })


        }
    }
})();