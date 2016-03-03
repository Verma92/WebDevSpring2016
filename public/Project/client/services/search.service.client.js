(function() {
    angular.module("FinalProject")
        .factory("SeacrhService", SeacrhService);

    function SeacrhService($http){
        var service= {
            searchbytitle: searchbytitle
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
