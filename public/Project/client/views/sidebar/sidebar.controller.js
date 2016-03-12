 (function() {
 angular.module("FinalProject")
 .controller("SidebarController",SidebarController);

 function SidebarController($scope, $location) {
 $scope.$location = $location;
 }
 })();
