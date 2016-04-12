module.exports = function(app,mongoose,db) {
    var modelevent = require("./models/event.model.server.js")(mongoose,db);
    var modeluser = require("./models/user.model.server.js")(mongoose,db);
    require("./services/user.service.server.js")(app, modeluser,modelevent);
    require("./services/event.service.server.js")(app, modelevent)

 /*   require("./services/event.service.server.js")(app, modelforms);

    require("./services/field.service.server.js")(app, modelforms);*/
};
