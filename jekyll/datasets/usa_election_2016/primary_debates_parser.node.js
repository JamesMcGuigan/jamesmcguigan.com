#!/bin/env node

var process = require("process");
var csv = require("csv");
var fs = require("fs");
var _ = require("lodash");

var config = {
  inputFile:  __dirname+'/primary_debates_cleaned.csv',
  outputFile: __dirname+'/primary_debates_parsed.json',

  wordRegexp: /\b[a-z]+([',][a-z]+)?\b/ig,
  prefilter: {
    Date:    (string) => string.replace(/(\d+)\/(\d+)\/(\d+)/, '20$3-$1-$2').replace(/-(\d)\b/g, '-0$1'), // MM/DD/YY -> YYYY-MM-DD
    Text:    (string) => string.replace(/\(\w+\)/, ''),    // remove (Applause) (Bell) etc
    Speaker: (string) => string.replace(/\s*\(\w+\)/, ''), // remove (VIDEO)
    Party:   (string) => string.replace(/\s+.*$/, '')      // Republican Undercard -> Republican
  }
};
var util = {
  sumWordCounts: function(wordsCountObjects) {
    return _.partialRight(_.extendWith, (x,y) => (x||0)+(y||0)).apply(this, wordsCountObjects)
  },
  sortObjectKeys: function(object) {
    return _(object)
      .toPairs()
      .sortBy((x) => x[1])
      .reverse()
      .fromPairs()
      .value()
    ;
  },

  /**
   * Filter out 100 most common words in english language and reject words only used once
   * @param object
   * @returns {Object}
   */
  uncommonFilter: function(object) {
    return _(object)
      .omit(require('./common_words.json'))
      .pickBy((x) => x >= 3)
      .value()
    ;
  }
};
var mappings = {
  wordSummary: function(inputCSV) {
    var wordCounts = _(inputCSV)
      .map('wordsCounts')
      .thru(util.sumWordCounts)
      .value()
    ;

    return {
      wordCounts: {
        unique: _(this.wordCounts(inputCSV)).keys().size(),
        total:  _(this.wordCounts(inputCSV)).values().sum()
      },
      groupBy: _.mapValues(mappings.groupBy(inputCSV), (groupCSV) => {
        return {
          unique: _(this.wordCounts(groupCSV)).keys().size(),
          total:  _(this.wordCounts(groupCSV)).values().sum()
        }
      })
    }
  },

  wordCounts: function(inputCSV) {
    return _(inputCSV)
      .map('wordsCounts')
      .thru(util.sumWordCounts)
      .thru(util.sortObjectKeys)
      .thru(util.uncommonFilter)
      .value()
    ;
  },
  groupBy: function(inputCSV) {
    return _(["Date", "Location", "Party", "Speaker"])
      .keyBy()
      .mapValues((value, fieldName) => {
        return _(inputCSV)
          .groupBy(fieldName)
          .mapValues(mappings.wordCounts)
          .value()
        ;
      })
      .value()
    ;
  }
};
var output = {
};


fs.createReadStream(config.inputFile).pipe(
  /**
   * output = [{
   *   Date: "2/11/16"
   *   Line: "1"
   *   Location: "Milwaukee, Wisconsin"
   *   Party: "Democratic"
   *   Speaker: "Woodruff"
   *   Text: "Good evening, and thank you. We are happy to welcome you to Milwaukee for this Democratic debate. We are especially pleased to thank our partners at Facebook, who have helped us set up a vibrant conversation among voters who are undecided. And tonight you're going to hear some of their questions for the candidates. And you can follow along at home on the PBS NewsHour page on Facebook. We also want to thank our hosts, the University of Wisconsin, Milwaukee, on whose campus we meet, here in the beautiful Helen Bader Concert Hall."
   *   URL: "http://www.presidency.ucsb.edu/ws/index.php?pid=111520"
   * }]
   */
  csv.parse({ columns: true }, function(error, inputCSV) {

    for( var i = 0; i<inputCSV.length; i++ ) {
      for( var key in config.prefilter ) {
        inputCSV[i][key] = config.prefilter[key]( inputCSV[i][key] );
      }

      inputCSV[i]['wordsCounts'] = _(inputCSV[i]['Text'].toLowerCase().match(config.wordRegexp))
        .groupBy()
        .mapValues(_.size)
        .value()
      ;
    }

    for( var key in mappings ) {
      output[key] = mappings[key](inputCSV);
    }

    fs.writeFile(config.outputFile, JSON.stringify(output, null, 2), function(error) {
      error && console.error(error) || console.log("JSON saved to " + config.outputFile);
    });

    //console.log("primary_debates_parser.node.tsc:46:", "output", output);
  })
);


