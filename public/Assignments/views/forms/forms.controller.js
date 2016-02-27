(function() {
    angular.module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope,$rootScope, $routeParams,$location,UserService,FormService) {

            FormService.findAllFormsForUser($rootScope.user,function(forms)
        {
            $scope.forms=forms
        })
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
           /* FormService.updateFormById($scope.selectformindex,form,
                function(forms)
                {

                        $scope.forms=forms

                })
*/
            $scope.forms[$scope.selectformindex] = {
                _id: form._id,
                title: form.title,
                userId: form.userId
            };
            $scope.selectformindex=-1;
        }


        function deleteForm(form,index)
        {
            //FormService.deleteFormById()
            $scope.forms.splice(index,1)

        }
        function addForm(title)
        {
            //FormService.createFormForUser()

            form= {
                _id: (new Date).getTime(),
                title: title,
                userId: $rootScope.user._id
            };

            $scope.forms.push(form)

        }


    }
})();
