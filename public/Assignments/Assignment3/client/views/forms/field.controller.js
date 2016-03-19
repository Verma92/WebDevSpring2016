(function() {

    angular.module("FormBuilderApp")
        .controller("FieldController", FieldController);
    function FieldController($scope, $location, $rootScope, $routeParams,FieldService) {
        var vm = this;
       /* model.addField=addField;*/
        vm.deleteField=deleteField;
        vm.formId = $routeParams["formId"];

        function init()
        {
            FieldService.getFieldsForForm(vm.formId)
                .then(function(fields){
                    console.log(fields)
                    vm.fields=fields
                });
        }
        init();

        function deleteField(field)
        {
            console.log(field)
            FieldService.deleteFieldFromForm(vm.formId,field)
                .then(function(fields){
                    vm.fields=fields
                });
        }

    }
})();


/*

var model = this;
var uid = $routeParams["userId"];
var fid = $routeParams["formId"];
model.addField=addField;
model.deleteField=deleteField;


function init()
{
    if($rootScope.user===undefined)
    {
        $location.path("/form");
    }
    FieldService.findFieldsForForm(fid)
        .then(function(field){
            model.fields=field[0].fields;
        });
}
init();
function deleteField(field)
{
    FieldService.deleteFieldForm(fid,field)
        .then(function(field){
            model.fields=field.fields;
        });
}
function addField(field){
    if(field.fieldType=== "TEXT")
    {
        field.label="Single line text field";
        field.placeholder="New field";

    }
    else if(field.fieldType=== "TEXTAREA")
    {
        field.label="Multiline text field";
        field.placeholder="New field";
    }
    else if(field.fieldType=== "DATE")
    {
        field.label="New date field";
        field.placeholder="New field";
    }
    else if(field.fieldType=== "RADIO")
    {
        field.label="New radio buttons";
        field.options= [{
            "label": "Option X",
            "value": "OPTION_X"
        }, {
            "label": "Option Y",
            "value": "OPTION_Y"
        }, {
            "label": "Option Z",
            "value": "OPTION_Z"
        }]
    }
    else if(field.fieldType=== "CHECKBOX")
    {
        field.label="New check box";
        field.options=[{
            "label": "Option A",
            "value": "OPTION_A"
        }, {
            "label": "Option B",
            "value": "OPTION_B"
        }, {
            "label": "Option C",
            "value": "OPTION_C"
        }]
    }
    else if(field.fieldType=== "SELECT")
    {
        field.label="New select field";
        field.options=[{
            "label": "Option D",
            "value": "OPTION_D"
        }, {
            "label": "Option E",
            "value": "OPTION_E"
        }, {
            "label": "Option F",
            "value": "OPTION_F"
        }]
    }
    FieldService.addFieldForm(fid,field)
        .then(function(field){
            model.fields=field.fields;
        });
}
*/
