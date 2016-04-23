var q = require("q");
module.exports = function(mongoose,db) {
    var events= require('./event.mock.json');

    var EventSchema = require("./event.stats.schema.server.js")(mongoose);

    var EventModel = mongoose.model("EventModel", EventSchema);

    var BroadcastSchema = require("./broadcast.schema.server.js")(mongoose);

    var BroadcastModel = mongoose.model("BroadcastModel", BroadcastSchema);


    var api = {
        Create: Create,
        addorupdateevent:addorupdateevent,
        geteventstats:geteventstats,
        AllUserEvents:AllUserEvents,
        addbroadcast:addbroadcast,
        getallbroadcasts:getallbroadcasts,
        deletestat:deletestat
        /*FindAll: FindAll,
        addFieldForForm: addFieldForForm,
        deleteField: deleteField,
        getFormByUser: getFormByUser,
        Update: Update,
        Delete: Delete,
        FindById: FindById,
        findFormByTitle:findFormByTitle,
        UpdateFieldforForm:UpdateFieldforForm*/

    };

    return api;



    function deletestat(eventid,type){
        var deferred = q.defer();


        EventModel.findOne({eventid:eventid}, function (err, event) {

            if(err){
                deferred.reject(err);
                console.log("rejected")
            }
            else{
                for (var i=0;i<event.stats.length;i++) {

                    if (event.stats[i] == type)
                    {
                        event.stats.splice(i, 1)
                        console.log("event stat found and deleted")
                        event.save(function (err, event) {

                            if (err) {
                                console.log("in error")
                                deferred.reject(err);
                            }
                            else {
                                console.log("after saving user" + event)
                                deferred.resolve(event);
                            }
                        });
                    break
                    }
                }
                }
        });
        return deferred.promise;

    }

     function addbroadcast(message){

        var deferred = q.defer();
        BroadcastModel.create(message,function (err, broadcast) {
            if (err) {
                console.log("not added broadcast")
            }
            else{

                console.log("after creating broadcast" + broadcast)
                deferred.resolve(broadcast);
            }
        });
        return deferred.promise;

    }


    function getallbroadcasts(){

        var deferred = q.defer();
        BroadcastModel.find(function (err, broadcasts) {
            if (err) {
                console.log("error in broadcasts finding")
            }
            else{
                console.log("all broacasts" + broadcasts)
                deferred.resolve(broadcasts);
            }
        });
        return deferred.promise;

    }


    function geteventstats(id){


        var deferred = q.defer();

        EventModel.findOne({eventid:id}, function (err, event) {
                console.log("after finding event" + event)
                        deferred.resolve(event);

                });
        return deferred.promise;
    }

    function addorupdateevent(id,type) {

        var deferred = q.defer();

        EventModel.findOne({eventid:id}, function (err, event) {


            if (event==null) {
                console.log("new addition")
                EventModel.create({eventid:id,stats:[type]},function (err, event) {
                    if (err) {
                        console.log("not added")
                    }
                    else{

                        console.log("after creating event" + event)
                        deferred.resolve(event);
                    }
                 });
            }
            else
            {
                event.stats.push(type)
                event.save(function (err, event) {
                    if (err) {
                        console.log("Exits but error while saving")
                        deferred.reject(err);
                    }
                    else {
                        console.log("after saving existing event" + event)
                        deferred.resolve(event);
                    }
                });

            }

        });

        return deferred.promise;

    }

        function AllUserEvents(eventIds) {
        var userevents=[]
        for (i = 0; i < eventIds.length; i++) {
            console.log("outside:"+i)
            for (j = 0; j < eventIds[i].length; j++) {
                console.log("middle:"+j)
                for (k = 0; k < events.length; k++) {
                    console.log("inside:"+k)

                    if(events[k].id==eventIds[i][j])
                    {
                        console.log("found:"+k)
                        userevents.push(events[k])

                    }

                }
            }
        }
        console.log("returned list of events from model:"+userevents)
        return userevents
    }


    function Create(event)
    {
        var newevent =
        {   "name":event.name,
            "start":event.start,
            "end":event.end,
            "description":event.desc,
            "logo": {"url":"http://awdf.org/wp-content/themes/africa_womens_dev_fund158/images/Default-Event-2x.png"}
        };


        newevent.id=(new Date).getTime()
        events.push(newevent)

        console.log("Created Event:"+ newevent)
        return newevent.id
    }


    /*

        function UpdateFieldforForm(formId,fieldId,field){

            for (i = 0; i < forms.length; i++) {

                if (forms[i]._id == formId) {
                    console.log("form found")
                    console.log("field ID: "+fieldId)
                    for (j = 0; j < forms[i].fields.length; j++) {

                        if (forms[i].fields[j]._id == fieldId)
                        {
                            console.log("field found")
                            forms[i].fields[j]=field
                            break
                        }
                    }
                    break
                }
            }
            console.log("i="+i,"j="+j)
            console.log(forms[i])
            return forms[i]

        }

        function addFieldForForm(formID, field) {
            for (i = 0; i < forms.length; i++) {
                if (forms[i]._id == formID) {
                    forms[i].fields.push(field)
                    break
                }
            }
                return forms[i]
        }

        function FindAll() {
            return forms
        }


        function deleteField(formID, fieldID)
        {

            for (i = 0; i < forms.length; i++) {

                if (forms[i]._id == formID) {
                    console.log("form found")
                    console.log("field ID: "+fieldID)
                    for (j = 0; j < forms[i].fields.length; j++) {

                        if (forms[i].fields[j]._id == fieldID)
                        {
                            console.log("field found")
                            forms[i].fields.splice(j, 1)
                            break
                        }
                    }
                    break
                }
            }
            console.log("i="+i,"j="+j)
            console.log(forms[i])
            return forms[i]

        }

        function FindById(fid) {
            var form=null
            for (i = 0; i < forms.length; i++) {

                if (forms[i]._id == fid) {
                   form=forms[i]
                }
            }
            return form

        }

        function findFormByTitle(title) {
            var form=null
            for (i = 0; i < forms.length; i++) {

                if (forms[i].title == title) {
                    form=forms[i]
                }
            }
            console.log(form)
            return form
        }
        function Create(form)
        {

            var userforms=getFormByUser(form.userId)
            userforms.push(form)
            forms.push(form)
            return userforms
        }


        function getFormByUser(uid) {

            var userforms=[]

            for (i = 0; i < forms.length; i++) {

                if (forms[i].userId == uid) {
                    userforms.push(forms[i])
                }
            }

            return userforms

        }


        function Update(fid, form) {

            for (i = 0; i < forms.length; i++) {

                if (forms[i]._id == fid) {

                    forms[i] = {
                        _id: form._id,
                        title: form.title,
                        userId: form.userId


                    };

                    return forms[i]
                    break

                }
            }
        }

        function Delete(fid,uid)
        {
            for (i = 0; i < forms.length; i++)
            {
                    if (forms[i].userId == uid)
                    {
                        forms.splice(i, 1)
                    }

            }
            return forms
        }

    */


};