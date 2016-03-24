module.exports = function() {
    var events= require('./event.mock.json');
    var api = {
        Create: Create,
        AllUserEvents:AllUserEvents,
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