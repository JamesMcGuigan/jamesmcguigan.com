import angular from 'angular';
import * as d3 from "d3";

const UsaElectionModule = angular.module('UsaElectionModule', [])
    .controller('UsaElection', function($scope) {
        $scope.name = 'Angular 1 $scope injection';

        d3.json('/projects/usa_presidential_election_2016/data/primary_debates_parsed.json', function(data) {
            $scope.data = data;
        });
    });

export default UsaElectionModule;

angular.element(document).ready(function () {
    return angular.bootstrap(document, [UsaElectionModule.name]);
});



