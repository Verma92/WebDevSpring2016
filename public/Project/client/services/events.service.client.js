(function() {
    angular.module("FinalProject")
        .factory("FormService", FormService);

    function FormService(){

        var service={
            findAllFormsForUser:findAllFormsForUser,
            createFormForUser:createFormForUser,
            deleteFormById:deleteFormById,
            updateFormById:updateFormById

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

    /*    function findAllUsers()
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
        */

    }
})();