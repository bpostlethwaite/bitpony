var JSONStream = require('JSONStream')
  , BucketStream = require("../lib/bucket-stream")
  , test = require('tap').test
  , data = require("./testData.json")
  , through = require('stream').PassThrough({objectMode: true})

var bucketStream = BucketStream()

through.pipe(bucketStream)


test("bucket values", function (t) {


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


  for (var i = 0; i < times.length; i++) {
    through.write({
      now: times[i]
    , price: prices[i]
    , volume: vols[i]
    })
  }

  /*
   * Push out last bucket with random data
   */
  through.write({
    now: times[times.length] + 61000
  , price: 3454
  , volume: 123456
  })


  var testbucket, ind = 0

  bucketStream.on('data', function (bucket) {
    console.log(bucket)
    testbucket = data[ind]
    ind++

    Object.keys(bucket).forEach(function (key) {
      t.equal(testbucket[key], bucket[key])
    })

  })


  t.end()


})


