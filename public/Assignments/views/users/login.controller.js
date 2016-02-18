(function() {
    angular.module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, $rootScope, UserService) {

        $scope.login=function(username,password){
            $scope.bhai=(UserService.findUserByUsernameAndPassword(username, password));
            console.log(username,password);
        }
    }
})();