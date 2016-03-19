(function() {
    angular.module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http,$q){

        var forms=[
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234},
        ];

        var service={
            findAllFormsForUser:findAllFormsForUser,
            createFormForUser:createFormForUser,
            deleteFormById:deleteFormById,
            updateFormById:updateFormById
        };

        return service;

        function updateFormById(formId, newForm, callback) {
            for (i = 0; i < forms.length; i++) {

                if (forms[i]._id == formId) {

                    forms[i] = {
                        _id: newForm._id,
                        title: newForm.title,
                        userId: newForm.userId
                    };
                    callback(forms[i])

                }
            }

        }


        function deleteFormById(formId, callback)
        { for (i = 0; i < forms.length; i++) {
            if (forms[i]._id == formId) {
                var userID = forms[i].userId;
            }}
            var userforms=[];
            for (i = 0; i < forms.length; i++) {
                if ((forms[i]._id !== formId)&&(forms[i].userId == userID) ) {
                    userforms.push(forms[i])
                }}
            callback(userforms)
        }



        function findAllFormsForUser(user)
        {
            var deferred = $q.defer();
            $http.get("/api/assignment/user/" + uid + "/form").success(function(response) {
                deferred.resolve(response);
            });

            console.log(deferred.promise)
            return deferred.promise;

           /* if (user)
            {
                var userforms=[];
                for (i = 0; i < forms.length; i++) {

                    if (forms[i].userId == user._id) {
                        userforms.push(forms[i])
                    }
                }
                callback(userforms)
            }
             else
                callback(undefined)*/
        }


        function createFormForUser(userId, form, callback)
        {
            var newform= {
                _id: (new Date).getTime(),
                title: form,
                userId: userId
            };
            callback(newform);
        }



    }
})();

/*

function FormService($http,$q){

    var api={
        findFormsForUser:findFormsForUser,
        addForm:addForm,
        deleteForm:deleteForm,
        findAll:findAll,
        updateform:updateform

    };

    return api;

    function updateform(id,form)  {

        var deferred = $q.defer();
        $http.put("/api/assignment/form/" + id, form).success(function(response){

            deferred.resolve(response);
        });
        return deferred.promise;

    }

    function findAll(){

        var deferred=$q.defer();
        $http.get("/api/assignment/user").success(function(response){
            deferred.resolve(response);


        });

        return deferred.resolve(response);

    }

    function deleteForm(form)
    {
        var deferred=$q.defer();
        var fid=form._id;
        var userid=form.userId;

        $http.delete("/api/assignment/user/"+userid+"/form/" + fid).success(function(response) {
            deferred.resolve(response);
        });
        return deferred.promise;
    }

    function findFormsForUser(uid)
    {

        var deferred = $q.defer();
        $http.get("/api/assignment/user/" + uid + "/form").success(function(response) {
            deferred.resolve(response);
        });
        return deferred.promise;

    }

    function addForm(form)
    {

        var deferred = $q.defer();
        $http.post("/api/assignment/user/form", form).success(function(response) {
            deferred.resolve(response);
        });
        return deferred.promise;

    }



}

})();*/
