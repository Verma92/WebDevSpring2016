module.exports = function(app) {
    var modeluser = require("./models/user.model.js")();
    require("./services/user.service.server.js")(app, modeluser);

   /* var modelforms = require("./models/form.model.js")();
    require("./services/form.service.server.js")(app, modelforms);


    require("./services/field.service.server.js")(app, modelforms);*/
};
