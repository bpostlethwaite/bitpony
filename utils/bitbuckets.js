var JSONStream = require('JSONStream')
  , reconnect = require("../lib/reconnect")
  , goxstream = require("../lib/gox-stream")
  , BitBucket = require("../lib/bitbucket")

var gstream = goxstream({channel:"ticker.BTCUSD"})

var bitbucket = BitBucket()

reconnect(gstream, function (stream) {

  var lastmin = 0
  var jstream = JSONStream.parse("ticker")

 jstream.on('data', function (data) {

  var unixTime = parseInt(data.now.slice(0,13))

   if (min === unixTime)
     bitbucket.add()
   else {
     /*
      * New bucket
      */
     var bucket = bitbucket.empty()
     bitbucket.add()


   if (bitbucket.add(unixTime, data.last_local.value, data.vol.value))
     console.log(bitbucket.data)

   // if (bitbucket.add(unixTime, data.last_local.value, data.vol.value))
   //   db.put(bitbucket.time, bitbucket.data, onError) // some kind of I/O error
 })

  stream.pipe(jstream)

})





function onError(err) {
  if (err) return console.log('Ooops!', err)
  else return true
}