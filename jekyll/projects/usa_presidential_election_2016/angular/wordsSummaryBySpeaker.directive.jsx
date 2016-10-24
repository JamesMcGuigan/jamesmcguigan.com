import angular from 'angular';
import * as d3 from "d3";

angular.module('UsaElectionModule').directive('wordsSummaryBySpeaker', function() {
  return {
    restrict: "E",
    template: "",
    scope: {
      speakers: "="
    },
    link: function(scope) {
      d3.csv("/projects/usa_presidential_election_2016/data/primary_debates_cleaned.csv", function(data) {
        console.log("wordsForceLayout.directive.jsx:10:", "data", data);
        //debugger
      })
    }
  }
});
