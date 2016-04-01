var q = require("q");
module.exports = function(mongoose, db) {

    var UserSchema = require("./user.schema.server.js")(mongoose);

    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {

       Delete: Delete,
       Update: Update,
       findUserByUsername: findUserByUsername,
       FindById: FindById,
       FindAll: FindAll,
       Create: Create,
       findUserByCredentials: findUserByCredentials
    };

    return api;

    function findUserByCredentials(user) {
        var deferred = q.defer();
        UserModel.findOne({
            username: user.username,
            password: user.password
        }, function(err, user) {

            if(err) {
                deferred.reject(err);
            }
            else{
               deferred.resolve(user);
            }
        });
        return deferred.promise;
//OLD CODE
  /*      for (i = 0; i < users.length; i++) {
            if ((users[i].username == user.username) && (users[i].password == user.password))
            {
                v1=(users[i]);
                break;
            }
            v1=null;

        }

   return v1*/
    }


    function Create(user) {
        var deferred = q.defer();

       UserModel.create(user, function(err,users) {
             if(err) {
                    deferred.reject(err);
                }
                else{
                 console.log(users)
                  deferred.resolve(users);

                }
        });
         return deferred.promise;


        //OLD CODE
       /* users.push(user);
        console.log(users)
        return users*/
    }


    function FindAll() {
        var deferred = q.defer();
        UserModel.find( function(err, users) {

            if(err) {
                deferred.reject(err);
            }
            else{
                deferred.resolve(users);
            }
        });

        return deferred.promise;
        //OLD CODE
      /* return users*/
    }


    function FindById(userId) {
        var deferred = q.defer();
        UserModel.findById({
            _id: userId
        }, function(err, user) {

            if(err) {
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        });

        return deferred.promise;

        //OLD CODE
      /*  for (i = 0; i < users.length; i++) {
            if (users[i]._id == userId)
            {
                v1=(users[i]);
                break;
            }
            v1=undefined;
        }
        return v1*/
    }

    function findUserByUsername(name) {
        var deferred = q.defer();
        UserModel.find({
            username: name
        }, function(err, user) {

            if(err) {
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        });

        return deferred.promise;

        //OLD CODE
       /* for (i = 0; i < users.length; i++) {
            if (users[i].username == name)
            {
                v1=(users[i]);
                break;
            }
            v1=undefined;
        }
        return v1*/
    }

    function Update(id, user) {
        var deferred = q.defer();
        var uname = user.username;
        var pass = user.password;
        var fname = user.firstName;
        var lname = user.lastName;
        var e = user.emails;

        UserModel.findById(id, function(err, user) {
            user.username = uname;
            user.password = pass;
            user.firstName = fname;
            user.lastName = lname;
            user.email =user.emails.push(e);

            user.save(function(err, user)
            {
                if(err) {
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(user);
                }
            });
        });

        return deferred.promise;


        //OLD CODE
     /*   for (i = 0; i < users.length; i++) {
            if (users[i]._id == id)
            {
                users[i].firstName=user.firstName;
                users[i].lastName=user.lastName;
                users[i].username=user.username;
                users[i].password=user.password;
                break;
            }
        }
       return users[i];*/
    }




    function Delete(id)
    {

        UserModel.findByIdAndRemove(id, function(err, user) {
            if(err) {
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        });

        return deferred.promise;
        //OLD CODE
     /*   for (i = 0; i < users.length; i++)
        {
            if (users[i]._id == id)
            {
                users.splice(i,1)
            }
        }
        return users;*/

    }


};