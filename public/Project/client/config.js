(function(){
    angular
        .module("FinalProject")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl:"views/home/home.view.html",
                controller:"HomeControler",
                controllerAs:"vm"
            })
            .when("/search",{
                templateUrl:"views/search/search.view.html",
                controller:"SearchControler",
                controllerAs:"vm"
            })
            .when("/details",{
                templateUrl:"views/details/details.view.html",
                controller:"DetailsControler",
                controllerAs:"vm"
            })
            .otherwise({
                redirectTo: '/home'

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