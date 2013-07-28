var JSONStream = require('JSONStream')
  , BitBucket = require("../lib/bitbucket")
  , test = require('tap').test
  , data = require("./testData.json")

var bitbucket = BitBucket()

// test("another one", function (t) {
//   t.plan(1)
//   t.ok(true, "It's ok to plan, and also end.  Watch.")
//   t.end() // but it must match the plan!
// })


bitbucket.on('bucket', function (bucket) {
  console.log(bucket)
})

/*
 * Send all test data into bitbucket.
 */
data.forEach( function (bucket) {
  for (var i = 0; i < bucket.times.length; i++) {
    bitbucket.add(bucket.times[i], bucket.prices[i], bucket.vols[i])
  }
})

/*
 * bitbucket.get()
 */