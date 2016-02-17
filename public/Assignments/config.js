(function(){
    angular
        .module("FormBuilderApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl:"views/home/home.view.html"
            })
            .when("/profile",{
                templateUrl:"/views/users/profile.view.html"
            })
            .otherwise({
            redirectTo: "/home"
        });
    }
})();

/*
 ng-class="{'active' : $location.url().indexOf('home') != -1}"
 /register.view.html
 /login.view.html
 /home.view.html
 /profile.view.html
 /admin.view.html
 /forms.view.html
 */
