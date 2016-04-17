module.exports = function(app,mongoose,db,modeluserproject) {
    var modelevent = require("./models/event.model.server.js")(mongoose,db);

    require("./services/user.service.server.js")(app, modeluserproject,modelevent);
    require("./services/event.service.server.js")(app, modelevent)

};
