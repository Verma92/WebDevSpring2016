module.exports = function() {

    console.log("module OK")

    var forms= require('./form.mock.json');

    console.log(forms)

    var api = {

        getFormByUser: getFormByUser,
        Update: Update,
        Delete: Delete,
        Create: Create
        /*
        findFormByTitle:findFormByTitle,
        FindById: FindById,
        FindAll: FindAll,
        Create: Create,

        addFieldForForm: addFieldForForm,
        deleteField: deleteField,*/

    };
    return api;

    function Create(form)
    {

        var userforms=getFormByUser(form.userId)
        userforms.push(form)
        forms.push(form)
        return userforms
    }


    function getFormByUser(uid) {

        var userforms=[]

        for (i = 0; i < forms.length; i++) {

            if (forms[i].userId == uid) {
                userforms.push(forms[i])
            }
        }

        return userforms

    }


    function Update(fid, form) {

        for (i = 0; i < forms.length; i++) {

            if (forms[i]._id == fid) {

                forms[i] = {
                    _id: form._id,
                    title: form.title,
                    userId: form.userId


                };

                return forms[i]
                break

            }
        }
    }

    function Delete(fid,uid)
    {
        for (i = 0; i < forms.length; i++)
        {
                if (forms[i].userId == uid)
                {
                    forms.splice(i, 1)
                }

        }
        return forms
    }


/*



        return deferred.promise;*!/

    }

    function findFormByTitle()
    {

    }
    function Update(fid, form) {

      /!*  var deferred = q.defer();
        var form1=form;

        FormModel.findById(fid, function(err, form) {
            form.title=form1.title;

            form.save(function(err, form) {
                //console.log("Server side: "+user);
                deferred.resolve(form);
            });
        });

        return deferred.promise;*!/

    }


    function FindAll() {

        /!*  var deferred = q.defer();
         FormModel.find(function(err, users) {
         deferred.resolve(users);

         });
         return deferred.promise;
         *!/

    }
    function FindById(fid) {
        /!*   var deferred = q.defer();
         FormModel.find({
         _id: fid
         }, function(err, form) {

         if (err) console.log(err);
         deferred.resolve(form);

         })

         return deferred.promise;*!/

    }


    function getFormByUser(uid) {

     /!*   var deferred = q.defer();
        FormModel.find({
            userId: uid
        }, function(err, form) {

            deferred.resolve(form);

        });

        return deferred.promise;
*!/

    }

    function deleteField(form, field) {

      /!*  var deferred = q.defer();

        FormModel.findById(form, function(err, form) {
            form.fields.splice(field, 1);
            form.save(function(err, form) {
                deferred.resolve(form);
            });
        });

        return deferred.promise;*!/

    }

    function addFieldForForm(fid, field) {

        /!*var deferred = q.defer();
        FormModel.findById(fid, function(err, form) {
            form.fields.push(field);
            form.save(function(err, form) {

                deferred.resolve(form);
            });
        });
        return deferred.promise;*!/

    }

*/


  //----------------------------

   /*
    function deleteById(fid, uid) {

        //console.log("In model");

        var deferred = q.defer();
        //console.log("Model user id");
        //console.log(uid);

        FormModel.remove({
            _id: fid
        }, function(err, status) {
            if (err) {
                //console.log(err);
            } else {
                FormModel.find({
                    userId: uid
                }, function(err, forms) {
                    if (err) console.log(err)
                    deferred.resolve(forms);

                });
            }
        });

        return deferred.promise;
    }


    function get(fid) {

        var deferred = q.defer();
        FormModel.find({
            _id: fid
        }, function(err, form) {

            if (err) console.log(err);
            deferred.resolve(form);

        })

        return deferred.promise;

    }
*/



};