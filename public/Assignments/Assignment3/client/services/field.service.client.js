(function() {

    angular.module("FormBuilderApp")
        .factory("FieldService", FieldService);


    function FieldService($http,$q){

        var api={
            getFieldsForForm:getFieldsForForm,
            createFieldForForm:createFieldForForm,
            deleteFieldFromForm:deleteFieldFromForm
           /*
            getFieldForForm:getFieldForForm
            updateField:updateField*/
        };

        return api;

        function deleteFieldFromForm(fid,field)
        {
            var deferred=$q.defer();
            $http.delete("/api/assignment/form/"+fid+"/field/"+field).success(function(response){
                deferred.resolve(response);
            });
            console.log(deferred.promise)
            return deferred.promise;
        }

        function getFieldsForForm(formId)
        {
            var deferred=$q.defer();

            $http.get("/api/assignment/form/"+formId+"/field").success(function(response){

                deferred.resolve(response);

            });
           console.log(deferred.promise)
            return deferred.promise;
        }

        function createFieldForForm(fid,field){

            var deferred=$q.defer();
            $http.post("/api/assignment/form/"+fid+"/field",field).success(function(response){

                deferred.resolve(response);

            });
            console.log(deferred.promise)
            return deferred.promise;
        }
    }


})();