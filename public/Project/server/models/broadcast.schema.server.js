module.exports=function(mongoose){

    var broadcastSchema = mongoose.Schema({
        sender:String,
        text:String,
        Date:Date
    }, {
        collection: "Project.broadcast",

    });

    return broadcastSchema;

};