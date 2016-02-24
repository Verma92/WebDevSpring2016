(function() {
    angular.module("FormBuilderApp")
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

/*
var model=this;
model.addUser=addUser;

function init(){
    model.users=UserService.findAllUsers();

}
init();

function addUser(user){
    // console.log("User id:"+user.username);
    if(user!==undefined)
    {
        if(user.username!==undefined && user.password!==undefined && user.verify_password!==undefined && user.password==user.verify_password && user.email!==undefined)
        {

            UserService
                .addUser(user)
                .then(function(users){

                    model.users=users;
                    var c= users[users.length-1];
                    $rootScope.user=c;
                    var data_id=c._id;
                    $location.path("/profile/"+data_id);

                });
        }

        else {
            alert("Enter proper user credentials");
        }
    }
    else {
        alert("User is undefined");
    }





}*/
