(function() {
    angular.module("FinalProject")
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

      /*  function updateFormById(formId, newForm, callback) {
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
            var newform= {
                _id: (new Date).getTime(),
                title: form,
                userId: userId
            };
            callback(newform);
        }*/



    }
})();