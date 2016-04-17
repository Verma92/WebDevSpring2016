(function(){
    angular
        .module("FinalProject")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl:"views/home/home.view.html",
                controller:"HomeControler",
                controllerAs:"vm",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/search/:title",{
                templateUrl:"views/search/search.view.html",
                controller:"SearchControler",
                controllerAs:"vm",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/details",{
                templateUrl:"views/details/details.view.html",
                controller:"DetailsControler",
                controllerAs:"vm",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/register",{
                templateUrl:"views/users/register.view.html",
                controller:"RegisterController",
                controllerAs:"vm"

            })
            .when("/profile",{
                templateUrl:"views/users/profile.view.html",
                controller:"ProfileController",
                controllerAs:"vm" ,
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            .when("/login",{
                templateUrl:"views/users/login.view.html",
                controller:"LoginController",
                controllerAs:"vm"
            })
            .otherwise({
                redirectTo: '/home'

            });

    }





    //--------------------------------------------------
    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            console.log("In checking")
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.user = user;
                console.log("user found"+user+user.data)
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                console.log("not checking")
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };


    //----------------------------------------------

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.user = user;
            }
            else
                $rootScope.user =null

            deferred.resolve();
        });

        return deferred.promise;
    };


})();
