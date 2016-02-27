(function() {
    angular.module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService(){

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

        function updateFormById(formId, newForm, callback)
        {
            forms[formId] = {
                _id: newForm._id,
                title: newForm.title,
                userId: newForm.userId
            };
            callback(forms)
        }


        function deleteFormById(formId, callback)
        {

        }


        function findAllFormsForUser(user,callback) {
            if (user)
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
                callback(undefined)
        }


        function createFormForUser(userId, form, callback)
        {



        }



    }
})();