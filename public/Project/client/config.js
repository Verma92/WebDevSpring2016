(function(){
    angular
        .module("FinalProject")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl:"views/home/home.view.html"
            })
            .when("/search",{
                templateUrl:"views/search/search.view.html",
                controller:"SearchControler",
                controllerAs:"vm"
            })            .otherwise({
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
