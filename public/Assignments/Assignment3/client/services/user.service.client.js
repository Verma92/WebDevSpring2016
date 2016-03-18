(function()
{
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService($q,$http)
    {
        var users = [
            {"_id":123, "firstName":"Alice",  "lastName":"Wonderland","username":"alice",
                "password":"alice", "roles": ["student"]},
            {"_id":234, "firstName":"Bob",    "lastName":"Hope",      "username":"bob",
                "password":"bob" ,"roles": ["admin"]},
            {"_id":345, "firstName":"Charlie","lastName":"Brown",     "username":"charlie",
                "password":"charlie" , "roles": ["faculty"]},
            {"_id":456, "firstName":"Dan",    "lastName":"Craig",     "username":"dan",
                "password":"dan", "roles": ["faculty", "admin"] },
            {"_id":567, "firstName":"Edward", "lastName":"Norton",    "username":"ed",
                "password":"ed" , "roles": ["student"]}
        ];
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
               $http.get("/api/assignment/user?username=" + username + "&password=" + password)
                   .success(function(response){
                   deferred.resolve(response);
               });
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
            var newuser ={"_id":(new Date).getTime(), "firstName":"",  "lastName":"",
                           "username":user.username,  "password":user.password};

            var deferred = $q.defer();
            $http.post("/api/assignment/user",newuser).success(function(response){
                deferred.resolve(response);


            });
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
            var deferred = $q.defer();

            $http.put("/api/assignment/user/" + id, user).success(function(response){
                deferred.resolve(response);
            });

            return deferred.promise;

        }

    }
})();


/*
findUserByUsernameAndPassword(username, password, callback)
findAllUsers(callback)
createUser(user, callback)
deleteUserById(userId, callback)
updateUser(userId, user, callback)

(function() {
    angular.module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $q) {

        var api={
            findUserByUsernameAndPassword:findUserByUsernameAndPassword,
            findAllUsers:findAllUsers,
            getUserById:getUserById,
            addUser:addUser,
            deleteUserById:deleteUserById,
            updateUser:updateUser



        };
        return api;

        function getUserById(id){
            var deferred=$q.defer();
            $http.get("/api/assignment/user/"+id).success(function(response){
                deferred.resolve(response);
            });

            return deferred.promise;

        }

        function findUserByUsernameAndPassword(username,password) {

            var deferred = $q.defer();
            $http.get("/api/assignment/user?username=" + username + "&password=" + password).success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function findAllUsers  (){
            console.log("Reached");
            var deferred = $q.defer();
            $http.get("/api/assignment/user").success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function addUser (user) {

            var new_user = user;
            //new_user.id = Guid.raw();

            var deferred = $q.defer();
            $http.post("/api/assignment/user", user).success(function(response){
                console.log("In users.ser"+response[0]);
                deferred.resolve(response);


            });
            return deferred.promise;
        }

        function deleteUserById (id){

            var deferred = $q.defer();
            $http.delete("/api/assignment/user/" + id).success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function updateUser(id,user)  {

            var deferred = $q.defer();
            $http.put("/api/assignment/user/" + id, user).success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;

        }


    }

})();
*/


