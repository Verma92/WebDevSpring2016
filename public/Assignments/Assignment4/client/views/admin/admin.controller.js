(function() {
    angular.module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, UserService) {

       $scope.users= UserService.findAllUsers();
        }
    }
)();