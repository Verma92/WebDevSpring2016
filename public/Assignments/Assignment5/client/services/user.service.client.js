(function()
{
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService($q,$http)
    {
        var service = {

            findUserByCredentials:findUserByCredentials,
            findAllUsers:findAllUsers,
            getUserById:getUserById,
            addUser:addUser,
            addUserByAdmin:addUserByAdmin,
            deleteUserById:deleteUserById,
            updateUserByAdmin:updateUserByAdmin,
            updateUser:updateUser,
            logout:logout

        };
        return service;
        function addUserByAdmin(user)
        {

            console.log(user)
            var deferred = $q.defer();
            $http.post("/api/assignment/admin/user",user).success(function(response){
                deferred.resolve(response);


            });
            console.log(deferred.promise)
            return deferred.promise;

        }



        function updateUserByAdmin(user)
        {

            console.log(user)
            var deferred = $q.defer();

            $http.put("/api/assignment/admin/user/" + user._id, user).success(function(response){
                deferred.resolve(response);
            });
            console.log(deferred.promise)
            return deferred.promise;

        }
        function logout() {

            var deferred = $q.defer();
            $http.post("/api/assignment/logout").success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;

        }
        function findUserByCredentials(username,password)
        {
               var deferred = $q.defer();
            console.log(username , password)

            var user={username:username,
                password:password }
            console.log(user)
               //$http.get("/api/assignment/user?username=" + username + "&password=" + password)
            $http.post("/api/assignment/login", user) .success(function(response){
                   deferred.resolve(response);
               });

            console.log(deferred.promise)
               return deferred.promise;
        }

        function findAllUsers()
        {
            console.log("inside find all")
            var deferred = $q.defer();
            $http.get("/api/assignment/admin/user").success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;
        }
        function getUserById(id)
        {
            var deferred=$q.defer();
            $http.get("/api/assignment/user/"+id).success(function(response){
                deferred.resolve(response);
            });

            return deferred.promise;
        }
        function addUser(user)
        {
            var newuser ={"firstName":"",  "lastName":"","username":user.username,
                          "password":user.password,"emails":[user.emails]};
            console.log(user)
            var deferred = $q.defer();
            $http.post("/api/assignment/register",newuser).success(function(response){
                deferred.resolve(response);


            });
            console.log(deferred.promise)
            return deferred.promise;

        }
        function deleteUserById(id)
        {
            var deferred = $q.defer();
            $http.delete("/api/assignment/admin/user/" + id).success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;
        }
        function updateUser(user,id)
        {

            console.log(user)
            var deferred = $q.defer();

            $http.put("/api/assignment/user/" + id, user).success(function(response){
                deferred.resolve(response);
            });
            console.log(deferred.promise)
            return deferred.promise;

        }

    }
})();




