(function() {
    angular.module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, $rootScope, UserService) {

        $scope.login = function (username, password) {
            UserService.findUserByCredentials(username, password,
                function (user) {
                    if(angular.isDefined(user))
                    {
                        $rootScope.user = user;
                        $rootScope.UID=user._id;
                    $location.path("/profile/UID");
                    }
                    else
                   alert("Wrong Credentials. Please Try Again...")
                })


        }
    }
})();