module.exports = function(app, model,otherusermodel) {

    //--------------problem resolver----------



    //----------------------------- NEW CODE -------------------------
    var passport         = require('passport');
    var LocalStrategy    = require('passport-local').Strategy;
//----------------------------------------------------------------

    var user_model = model;

    var auth = authorized;
    app.get('/api/assignment/user',checkquery)
    app.post('/api/assignment/user',adduser)
    app.get('/api/assignment/user/:id', auth, GetUserById)
    app.put('/api/assignment/user/:id', auth , updateuser)
    app.delete('/api/assignment/user/:id',deleteUserById)

//----------------------------- NEW CODE -------------------------


    app.post  ('/api/assignment/login', passport.authenticate('assignment'), login);
    app.post  ('/api/assignment/logout',         logout);
    app.post  ('/api/assignment/register',       register);
    app.get   ('/api/assignment/loggedin',       loggedin);
  //----------ADMIN ----------

    app.post  ('/api/assignment/admin/user',     auth, adduser);
    app.get('/api/assignment/admin/user/:id', auth, GetUserById);
    app.put   ('/api/assignment/admin/user',     auth, findAllUsers);
    app.put   ('/api/assignment/admin/user/:id', auth, updateUserByAdmin);
    app.delete('/api/assignment/admin/user/:id', auth, deleteUserById);
//--------------------------------------------------------


    passport.use('assignment',new LocalStrategy(localassignmentstrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function localassignmentstrategy(username, password, done) {

        var credentials = {
            username: username,
            password: password
        };
        console.log(credentials)
        user_model
            .findUserByCredentials(credentials)
            .then(
                function(user) {
                    if (!user) { return done(null, false);
                    console.log(" user not found at local")
                    }
                    console.log(" user found at local"+user+user._id)
                    return done(null, user);
                },
                function(err) {
                    console.log("error at local")
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        console.log("in serialize")
        done(null, user);
    }

    function deserializeUser(user, done) {
       console.log("problem"+otherusermodel.check(0))
        if(user.emails!=undefined)
        {
            user_model.FindById(user._id)
                .then(
                    function(user){
                        done(null, user);
                    },
                    function(err){
                        done(err, null);
                    }
                );
        }
        else
        {
            otherusermodel.FindById(user._id)
                .then(
                    function(user){
                        done(null, user);
                    },
                    function(err){
                        done(err, null);
                    }
                );
        }

    }
    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }
    function register(req, res) {
        var newUser = req.body;
        if(newUser.username=="admin")
            newUser.roles = ['admin'];
        else
        newUser.roles = ['student'];

        console.log("newUser"+newUser)
        user_model.findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        console.log("a")
                        res.json(null);
                    } else {
                        console.log("b")
                        return user_model.Create(newUser);
                }
                },
                function(err){
                    console.log("c")
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        console.log("d")
                        req.login(user, function(err) {
                            if(err) {
                                console.log("e")
                                res.status(400).send(err);
                            } else {
                                console.log("f")
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    console.log("g")
                    res.status(400).send(err);
                }
            );
    }
    function login(req, res) {
        console.log("h")
        console.log("login user"+req.user.username+req.user._id)
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        console.log("In loggedin")
        console.log("In loggedin value"+req.user)
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(null);
    }


//----------------------------------------------------------------

    function updateuser(req, res) {
        var user = req.body;
        var userId = req.params.id;
       user_model
           .Update(userId, user)
           .then(function(newuser){
               console.log(newuser)
            res.json(newuser)});

    }
    function GetUserById(req, res) {
        var userId = req.params.id;
       user_model.findById(userId)
       .then(function(user){
        res.json(user)});
    }

        function checkquery(req,res)
    {
        if (req.query.username !== undefined) {
            if (req.query.password !== undefined) {
                var credentials = {
                    username: req.query.username,
                    password: req.query.password
                };
                user_model.findUserByCredentials(credentials)
                    .then(function(user){
                        res.json(user)});
    }
            else {
       user_model.findUserByUsername(req.query.username)
           .then(function(user){
               res.json(user)});
     }
        }
        else {
            user_model.FindAll()
                .then(function(users){
                    res.json(users)});
        }

    }

    //------------------
    function updateUserByAdmin(req, res) {
        if(isAdmin(req.user))
        {
            var user = req.body;
            if(user.roles.indexOf(",")!=-1)
                user.roles = user.roles.split(",");


            var userId = req.params.id;
            user_model
                .Update(userId, user)
                .then(function(newuser){
                    console.log(newuser)
                    res.json(newuser)});

        }
        else
            res.send(403)
    }


    function deleteUserById(req, res) {
        if(isAdmin(req.user))
        {
            var userId = req.params.id;
            user_model
                .Delete(userId)
                .then(function(users){
                    res.json(users)});
        }

        else
            res.send(403)
    }


    function adduser(req, res)
    {
        if(isAdmin(req.user))
        {
            var user = req.body;


            if(user.roles && user.roles.length > 1) {
                user.roles = user.roles.split(",");
            } else {
                user.roles = ["student"];
            }
            user_model.Create(user)
                .then(function(users){
                    res.json(users)});

        }
        else
            res.send(403)
    }

    function findAllUsers(req, res)
    {
        console.log(req.user)
        if(isAdmin(req.user)) {
            var sort=req.body
            console.log("sort in user service:",sort)
            user_model.FindAll(sort)
                .then(function (users) {
                    res.json(users)
                });
        }
        else
            res.send(403)
    }


    function isAdmin(user) {

        if(user.roles.indexOf("admin") !=-1) {
            return true
        }
        return false;
    }

};