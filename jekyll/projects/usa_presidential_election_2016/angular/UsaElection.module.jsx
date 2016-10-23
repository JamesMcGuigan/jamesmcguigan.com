import angular from 'angular';

const UsaElectionModule = angular.module('UsaElectionModule', [])
    .controller('UsaElection', function($scope) {
        $scope.name = 'Angular 1 $scope injection';
    });

export default UsaElectionModule;

angular.element(document).ready(function () {
    return angular.bootstrap(document, [UsaElectionModule.name]);
});
