(function(){
    angular
        .module("FormBuilderApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home/:userId",{
                templateUrl:"views/home/home.view.html"
            })
            .when("/register",{
                templateUrl:"views/users/register.view.html",
                controller:"RegisterController"
            })
            .when("/profile",{
                templateUrl:"views/users/profile.view.html",
                controller:"ProfileController"
            })

            .when("/login",{
                templateUrl:"views/users/login.view.html",
                controller:"LoginController"
            })

            .when("/admin",{
                templateUrl:"views/admin/admin.view.html",
                controller:"AdminController"
            })
            .when("/forms",{
                templateUrl:"views/forms/forms.view.html",
                controller:"FormController"
            })
            .otherwise({
                templateUrl:"views/home/home.view.html"
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
