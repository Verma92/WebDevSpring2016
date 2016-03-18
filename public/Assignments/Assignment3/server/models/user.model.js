module.exports = function() {

    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };

    return api;

    function Delete(id) {
        var deferred = q.defer();

        UserModel.findByIdAndRemove(id, function(err, user) {
            deferred.resolve(user);

        });

        return deferred.promise;
    }

    function Create(user) {
        var deferred = q.defer();
        var uname = user._id;

        UserModel.create(user, function(err, user) {
            UserModel.find(function(err, users) {

                deferred.resolve(users);
            });
        });

        return deferred.promise;
    }



    function FindAll() {
        var deferred = q.defer();
        UserModel.find(function(err, users) {
            deferred.resolve(users);

        });
        return deferred.promise;

    }

    function FindById(userId) {


        var deferred = q.defer();
        //console.log("in model: " + userId);
        UserModel.findById({
            _id: userId
        }, function(err, user) {
            //console.log(user);
            deferred.resolve(user);

        });

        return deferred.promise;


    }

    function Update(id, user) {
        //var _id = mongoose.Types.ObjectId.fromString(id1);
        var deferred = q.defer();
        var uname = user.username;
        var pass = user.password;
        var fname = user.firstName;
        var lname = user.lastName;
        var e = user.email;

        UserModel.findById(id, function(err, user) {
            user.username = uname;
            user.password = pass;
            user.firstName = fname;
            user.lastName = lname;
            user.email = e;

            user.save(function(err, user) {
                //console.log("Server side: "+user);
                deferred.resolve(user);
            });
        });

        return deferred.promise;
    }



    function findUserByUsername(name) {

        var deferred = q.defer();
        UserModel.find({
            username: name
        }, function(err, user) {
            deferred.resolve(user);

        });


        return deferred.promise;


    }

    function findUserByCredentials(user) {



        var deferred = q.defer();
        UserModel.find({
            username: user.username,
            password: user.password
        }, function(err, user) {

            deferred.resolve(user);

        });

        return deferred.promise;

    }

};