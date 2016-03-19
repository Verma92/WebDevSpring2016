(function() {

    angular.module("FormBuilderApp")
        .factory("FieldService", FieldService);


    function FieldService($http,$q){

        var api={
            getFieldsForForm:getFieldsForForm,
            deleteFieldFromForm:deleteFieldFromForm
           /* createFieldForForm:createFieldForForm,
            getFieldForForm:getFieldForForm
            updateField:updateField*/
        };

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

        return api;
        /*


        function addFieldForm(fid,field){
            var deferred=$q.defer();
            $http.post("/api/assignment/form/"+fid+"/field",field).success(function(response){

                deferred.resolve(response);

            });

            return deferred.promise;
        }


*/
    }


})();