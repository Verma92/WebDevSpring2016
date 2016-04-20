(function() {
    angular.module("FinalProject")
        .factory("SearchService", SearchService);

    function SearchService($http,$q){
        var service= {
            searchbytitle: searchbytitle,
            defaultsearch:defaultsearch,
            searchbyid:searchbyid

        }
        return service;

        function searchbytitle(value,lat,long)
        {

            return ( $http({
                method: 'GET',
                url: 'https://www.eventbriteapi.com/v3/events/search/',
                params: {
                    q: value,
                    'location.latitude': lat,
                    'location.longitude':long,
                    token:'AP4W7O3MQCLNJSL2NTHV'
                }
            }));
        }

        function  searchbyid(id)
        {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'https://www.eventbriteapi.com/v3/events/'+id +'/',
                params: {
                    token:'AP4W7O3MQCLNJSL2NTHV'
                }
            }).success(function(response){
                deferred.resolve(response);
            });

            return deferred.promise;

        }
        function  defaultsearch(lat,long)
        {

            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'https://www.eventbriteapi.com/v3/events/search/',
                params: {
                    'location.latitude': lat,
                    'location.longitude':long,
                    token:'AP4W7O3MQCLNJSL2NTHV'
                }
            }).success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;

         /*   $http({
                method: 'GET',
                url: 'https://www.eventbriteapi.com/v3/events/'+'18719654992'+'/',
                params: {
                    token:'AP4W7O3MQCLNJSL2NTHV'
                }
            }).success(function(response){
                deferred.resolve(response);
            });

            return deferred.promise;*/

/*
            var venues=[];
            for (i = 0; i < events.length; i++) {
                if (events[i].venue_id) {
                    venues.push(events[i].venue_id)
                }
            }*/


            }

        function  venuesearch(lat,long) {

            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'https://www.eventbriteapi.com/v3/venues/:id/',
                params: {
                    token: 'AP4W7O3MQCLNJSL2NTHV'
                }
            }).success(function (response) {
                deferred.resolve(response);
            });
            console.log(deferred.promise)
            return deferred.promise
        }

        }
})();
