(function() {
    angular.module("FinalProject")
        .factory("SearchService", SearchService);

    function SearchService($http){
        var service= {
            searchbytitle: searchbytitle,
            defaultsearch:defaultsearch
        }
        return service;

        function searchbytitle(value)
        {

            return ( $http({
                method: 'GET',
                url: 'https://www.eventbriteapi.com/v3/events/search/',
                params: {
                    q: value,
                    token:'AP4W7O3MQCLNJSL2NTHV'
                }
            }));
        }
        function  defaultsearch(lat,long)
        {

                return $http.get("https://www.eventbriteapi.com/v3/events/search/?location.latitude=" +
                    lat+"&location.longitude="+long+"&token=AP4W7O3MQCLNJSL2NTHV")
                /*  return ( $http({
                 method: 'GET',
                 url: 'https://www.eventbriteapi.com/v3/events/search/',
                 params: {
                 location:{latitude: lat,longitude: long},
                 token:'AP4W7O3MQCLNJSL2NTHV'
                 }
                 }));*/


                /*  return ( $http({
                 method: 'GET',
                 url: 'https://www.eventbriteapi.com/v3/events/search/',
                 params: {
                 location:
                 {latitude: lat,
                 longitude: long
                 },
                 token:'AP4W7O3MQCLNJSL2NTHV'
                 }
                 }));
                 */
            }



    }
})();


/*

(function() {
    angular.module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService(){




 (function(){
 angular.module("FinalProject")
 .controller("HeaderController",HeaderController);

 */