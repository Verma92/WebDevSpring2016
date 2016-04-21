
module.exports=function(mongoose){

    var MessageSchema = mongoose.Schema({
        text:String,
        Date:Date
    }, {
        collection: "Project.message",

    });

    return MessageSchema;

};