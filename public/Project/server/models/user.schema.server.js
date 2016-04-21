module.exports=function(mongoose){

    var EventSchema=require("./event.schema.server.js")(mongoose);
    var messageschema=require("./message.schema.server.js")(mongoose);
    var ProjectUserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        events:[EventSchema],
        invites:[{sender:String,message:[messageschema]}]

    }, {
        collection: "Project.User",

    });

    return ProjectUserSchema;

};