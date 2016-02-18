(function(){
    angular
        .module("FormBuilderApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl:"views/home/home.view.html"
            })
            .when("/register",{
                templateUrl:"views/users/register.view.html"
            })
            .when("/profile",{
                templateUrl:"views/users/profile.view.html"
            })

            .when("/login",{
                templateUrl:"views/users/login.view.html"
            })

            .when("/admin",{
                templateUrl:"views/admin/admin.view.html"
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
