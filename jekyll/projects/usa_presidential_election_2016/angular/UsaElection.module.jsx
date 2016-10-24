import angular from 'angular';
import * as d3 from "d3";

const UsaElectionModule = angular.module('UsaElectionModule', []);

export default UsaElectionModule;

angular.element(document).ready(function () {
    return angular.bootstrap(document, [UsaElectionModule.name]);
});


