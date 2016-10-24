import angular from 'angular';
import * as d3 from "d3";

angular.module('UsaElectionModule').directive('wordsForceLayout', function() {
  return {
    restrict: "E",
    template: "",
    link: function(scope) {
      d3.csv("/projects/usa_presidential_election_2016/data/primary_debates_cleaned.csv", function(data) {
        console.log("wordsForceLayout.directive.js:10:", "data", data);
        //debugger
      })
    }
  }
});
