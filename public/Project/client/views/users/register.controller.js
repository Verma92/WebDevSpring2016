(function() {
    angular.module("FinalProject")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, $rootScope, UserService) {
            var vm=this
            vm.register = adduser;

        function adduser(user) {
            console.log("INSIDE")
            if (user.username !== undefined && user.password !== undefined
                && user.verifypassword !== undefined && user.password == user.verifypassword
                && user.email !== undefined)
            {
                UserService.addUser(user)
                    .then(function (newuser) {
                        console.log("newuser:"+newuser)
                        if(newuser!=null)
                        {
                        $rootScope.user = newuser
                        console.log($rootScope.user)
                        $location.path("/profile");}
                        else
                        {
                            alert("User Exists")
                        }

                    } )
            }
            else
            {
                alert("Enter proper Credentials")
            }
        }
    }
})();
