(function() {
    angular.module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope,$rootScope, $routeParams,$location,UserService,FormService) {

        function init(){
           if($rootScope.user)
           {
            FormService.findAllFormsForUser($rootScope.user).then(function(forms)
        {
            console.log(forms)
            console.log(forms.title)
            $scope.forms= [];
            $scope.forms= $scope.forms.push(forms)
            console.log($scope.forms[0].title)
        });
           }

        }

        init();


        $scope.editForm = editForm
        $scope.updateForm = updateForm
        $scope.deleteForm = deleteForm
        $scope.addForm = addForm

        function editForm(index)
        {
            $scope.selectformindex = index;
            $scope.form = {
                _id: $scope.forms[index]._id,
                title: $scope.forms[index].title,
                userId: $scope.forms[index].userId

            }}

        function updateForm(form)
        {
           FormService.updateFormById(form._id,form,
                function(Newform)
                {

                    $scope.forms[$scope.selectformindex]=Newform
                    $scope.selectformindex=-1;

                })

        }
        function deleteForm(form)
        {
            FormService.deleteFormById(form._id,function(newforms)
            {
                $scope.forms=newforms
             })

        }
        function addForm(title)
        {
            FormService.createFormForUser($rootScope.user._id,title,function(form)
            {
            $scope.forms.push(form)})

        }
    }
})();
