var JSONStream = require('JSONStream')
  , BitBucket = require("../lib/bitbucket")
  , test = require('tap').test
  , data = require("./testData.json")


var bitbucket = BitBucket()

test("bucket values", function (t) {

  var buckets = []

  /*
   * Send all test data into bitbucket.
   */
  var times = []
    , prices = []
    , vols = []

  data.forEach( function (testbucket) {
    times = times.concat(testbucket.times)
    prices = prices.concat(testbucket.prices)
    vols = vols.concat(testbucket.vols)
  })

  var min = (new Date(times[0])).getMinutes()

  for (var i = 0; i < times.length; i++) {

    if ((new Date(times[i])).getMinutes() === min) {
      bitbucket.add(times[i], prices[i], vols[i])
    }
    else {
      min = (new Date(times[i])).getMinutes()
      buckets.push( bitbucket.empty() )
      bitbucket.newBucket(
      bitbucket.add(times[i], prices[i], vols[i])

    }
  }
  buckets.push( bitbucket.empty() )

  var bucket, testbucket
  for (i = 0; i < data.length; i++) {
    testbucket = data[i]
    bucket = buckets[i]
    Object.keys(bucket).forEach(function (key) {
      t.equal(testbucket[key], bucket[key])
    })
  }



  t.end()


})


