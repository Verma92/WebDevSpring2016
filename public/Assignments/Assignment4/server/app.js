module.exports = function(app) {
    var modeluser = require("./models/user.model.js")();
    require("./services/user.service.server.js")(app, modeluser);

     var modelforms = require("./models/form.model.js")();
    require("./services/form.service.server.js")(app, modelforms);

    require("./services/field.service.server.js")(app, modelforms);
};

/*

module.exports = function(app, mongoose, db) {
    var model = require("./models/user.model.js")(mongoose, db);
    require("./services/user.service.js")(app, model);

    var model2 = require("./models/form.model.js")(mongoose, db);
    require("./services/form.service.js")(app, model2);


    require("./services/field.service.js")(app, model2);
};
*/
