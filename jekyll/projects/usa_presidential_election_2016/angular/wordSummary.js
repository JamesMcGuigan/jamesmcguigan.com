import * as d3 from "d3";
import * as _  from "lodash";
require('./wordSummary.scss');

d3.json('/projects/usa_presidential_election_2016/data/primary_debates_parsed.json', function(data) {
  d3.select('#wordSummary')
    .selectAll('caption')
    .data(['Words used'])
    .enter()
      .append('caption')
      .text((d) => d)
  ;

  d3.select('#wordSummary thead')
    .append('tr')
      .selectAll('th')
      .data(_.keys(data.wordSummary.wordCounts))
      .enter()
        .append('th')
        .text((d) => d)
  ;

  d3.select('#wordSummary tbody')
    .append('tr')
      .selectAll('td')
      .data(_.values(data.wordSummary.wordCounts))
      .enter()
        .append('td')
        .text((d) => d.toLocaleString())
  ;
});
