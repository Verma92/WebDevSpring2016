(function() {
    angular.module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http,$q){
        var service={
            findAllFormsForUser:findAllFormsForUser,
            createFormForUser:createFormForUser,
            deleteFormById:deleteFormById,
            updateFormById:updateFormById
        };
        return service;

        function findAllFormsForUser(user)
        {
            var userId=user._id
            var deferred = $q.defer();
            $http.get("/api/assignment/user/" + userId + "/form").success(function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function updateFormById(id, form) {
            var deferred = $q.defer();
            $http.put("/api/assignment/form/" + id, form).success(function(response){

                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function deleteFormById(form) {
            var deferred=$q.defer();
            var formId=form._id
            var userid=form.userId;

            $http.delete("/api/assignment/user/"+userid+"/form/" + formId).success(function(response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function createFormForUser(userId, form) {
            var newform= {
                _id: (new Date).getTime(),
                title: form,
                userId: userId,
                fields:[]
            };
            console.log(newform)
            var deferred = $q.defer();
            $http.post("/api/assignment/user/form", newform).success(function(response) {
                deferred.resolve(response);
            });
            console.log(deferred.promise)
            return deferred.promise;
        }
    }
})();
