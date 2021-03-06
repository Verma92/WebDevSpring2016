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
            deleteUserById:deleteUserById,
            updateUser:updateUser
        };
        return service;

        function findUserByCredentials(username,password)
        {
               var deferred = $q.defer();
            console.log(username , password)
               $http.get("/api/assignment/user?username=" + username + "&password=" + password)
                   .success(function(response){
                   deferred.resolve(response);
               });

            console.log(deferred.promise)
               return deferred.promise;
        }

        function findAllUsers()
        {
            var deferred = $q.defer();
            $http.get("/api/assignment/user").success(function(response){
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
            $http.post("/api/assignment/user",newuser).success(function(response){
                deferred.resolve(response);


            });
            console.log(deferred.promise)
            return deferred.promise;

        }
        function deleteUserById(id)
        {
            var deferred = $q.defer();
            $http.delete("/api/assignment/user/" + id).success(function(response){
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




