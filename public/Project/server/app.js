module.exports = function(app) {
    var modelevent = require("./models/event.model.js")();
    var modeluser = require("./models/user.model.js")();
    require("./services/user.service.server.js")(app, modeluser,modelevent);
    require("./services/event.service.server.js")(app, modelevent)

 /*   require("./services/event.service.server.js")(app, modelforms);

    require("./services/field.service.server.js")(app, modelforms);*/
};
