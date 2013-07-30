var JSONStream = require('JSONStream')
  , reconnect = require("../lib/reconnect")
  , goxstream = require("../lib/gox-stream")
  , BucketStream = require("../lib/bucket-stream")
  , goxFilter = require("../filters/gox-bucket")

//var gstream = goxstream({channel:"ticker.BTCUSD"})
var gstream = goxstream({channel:"depth.BTCUSD"})
reconnect(gstream, function (stream) {

  var lastmin = 0


  var filter = goxFilter()
  var bucketStream = BucketStream()

  // stream.pipe(filter).pipe(bucketStream)

  // bucketStream.on('data', function (data) {
  //   console.log(data)
  // })

  gstream.on('data', function (data) {
    console.log(data)
  })

})





function onError(err) {
  if (err) return console.log('Ooops!', err)
  else return true
}




