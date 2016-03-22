(function(){
    angular.module("elemSortable", [])
        .directive("elemSortable", elemSortable);

    function elemSortable() {
        var start = null;
        var end = null;
        function link(scope, element, attributes) {
            var elemAxis = attributes.elemAxis;
            $(element).sortable({
                axis: elemAxis,
                start: function(event, ui) {
                    start = ui.item.index();
                },
                stop: function(event, ui) {
                    end = ui.item.index();
                    var temp = scope.users[start];
                    scope.users[start] = scope.users[end];
                    scope.users[end] = temp;
                    scope.$apply();
                }
            });
        }
        return {
            link: link
        }
    }
})();