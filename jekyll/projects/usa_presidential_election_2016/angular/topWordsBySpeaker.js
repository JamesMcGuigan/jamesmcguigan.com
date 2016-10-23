import * as d3 from "d3";

d3.queue()
  .defer(d3.json, '/projects/usa_presidential_election_2016/data/primary_debates_parsed.json')
  .await(function(error, primary_debates_parsed) {
    if (error) throw error;

    d3.select('#topWordsBySpeaker thead')
      .append('tr')
      .selectAll('th')
      .data(_.keys(primary_debates_parsed.groupBy.Speaker))
      .enter()
        .append('th')
        .text((d) => d)
    ;

    var wordArray = _(0).range(100).map(function(i) {
      return _(primary_debates_parsed.groupBy.Speaker)
        .values()
        .map((words) => _(words).keys().get(i) )
        .value();
    }).value();

    d3.select('#topWordsBySpeaker tbody')
      .selectAll('tr')
      .data(wordArray)
        .enter()
        .append('tr')
          .selectAll('td')
          .data((d, i) => d)
          .enter()
            .append('td')
            .text((d) => d)
    ;
  })
;
