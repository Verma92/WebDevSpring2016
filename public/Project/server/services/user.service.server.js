module.exports = function(app, user_model,event_model) {

    //----------------------------- NEW CODE -------------------------
    var passport         = require('passport');
    var LocalStrategy    = require('passport-local').Strategy;
//----------------------------------------------------------------
    var auth = authorized;
    app.get('/api/project/user',checkquery)

    app.post('/api/project/login', passport.authenticate('project'),login);
    app.post('/api/project/user',register)
    app.get('/api/project/loggedin',loggedin);
    app.get('/api/project/user/:id',GetUserById)
    app.put('/api/project/user/:id',auth,updateuser)
    app.put('/api/project/user/event/:id',auth,updateuserevent)
    app.delete('/api/project/user/:id',deleteUserById)
    app.post  ('/api/project/logout',         logout);
    app.put("/api/project/user/name/:username",auth,updateuserinvites)
    app.get('/api/project/users/names',auth,usernames);

    passport.use('project',new LocalStrategy(localprojectstrategy));
   /* passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);*/



    function updateuserinvites(req,res){



        var invite = req.body;
        var username = req.params.username;


        console.log("in server service :"+invite.message.text,invite.message.Date)
        user_model
            .updateuserinvite(username,invite)
            .then(function(user){
            console.log("user after invite update:"+user)
            res.json(user)});

    }
    function  usernames(req,res){

        user_model
            .allusersnames()
            .then(function(names){
                console.log("Names:"+names)
                res.json(names)});
    }

    function localprojectstrategy(username, password, done) {

        var credentials = {
            username: username,
            password: password
        };

        user_model
            .findUserByCredentials(credentials)
            .then(
                function(user) {
                    if (!user) { return done(null, false);

                    }

                    return done(null, user);
                },
                function(err) {

                    if (err) { return done(err); }
                }
            );
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


        user_model.findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {

                        res.json(null);
                    } else {

                        return user_model.Create(newUser);
                    }
                },
                function(err){

                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){

                        req.login(user, function(err) {
                            if(err) {

                                res.status(400).send(err);
                            } else {

                                res.json(user);
                            }
                        });
                    }
                },
                function(err){

                    res.status(400).send(err);
                }
            );
    }
    function login(req, res) {

        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {

        res.send(req.isAuthenticated() ? req.user : '0');
    }


    function logout(req, res) {
        req.logOut();
        res.send(null);
    }

    function updateuser(req, res) {

        var user = req.body;
        var userId = req.params.id;
        console.log("in server update")
        user_model
            .Update(userId, user)
            .then(function(newuser){
                console.log("newuser in server service:"+newuser)
                res.json(newuser)});
    }
    function updateuserevent(req, res) {

        var event = req.body;
        var userId = req.params.id;
        console.log("in server update")
        user_model
            .UpdateUserEvent(userId,event)
            .then(function(newuser){
                console.log("newuser in server service:"+newuser)
                res.json(newuser)});
    }






    function deleteUserById(req, res) {
        var userId = req.params.id;
        var updateduser=user_model.Delete(userId)
        res.json(updateduser);
    }


    function GetUserById(req, res) {
        var userId = req.params.id;
        var user=user_model.findById(userId)
            res.json(user);

    }


        function checkquery(req,res)
    {
        if (req.query.username !== undefined) {
            if (req.query.password !== undefined) {
                //return user which mathces username and password
                var credentials = {
                    username: req.query.username,
                    password: req.query.password
                };
                var user=user_model.findUserByCredentials(credentials);
                 res.json(user);
    }
            else {
       var users=user_model.findUserByUsername(req.query.username)
       res.json(users);
     }
        }
        else {
            var users=user_model.FindAll();
        }

    }


};