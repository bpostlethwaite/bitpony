var JSONStream = require('JSONStream')
  , Timestamp = require("../lib/timestamp-stream")
  , swapStream = require('fileswap-stream')
  , reconnect = require("../lib/reconnect")
  , goxstream = require("../lib/gox-stream")

var gstream = goxstream({channel:"ticker.BTCUSD"})


reconnect(gstream, function (stream) {


  var jstream = JSONStream.parse('ticker.avg.value')

    , tstream = Timestamp()

    , swap = swapStream({
      namer : namer
    , swapper : getDay
    , tdelta : 1000
    , path : "../data"
    , fops : {
      flags: "a"
    , encoding: "utf8"
    }
    })


  stream.pipe(jstream)
  .pipe(tstream)
  .pipe(swap)


})


function namer () {
  var dateObj = new Date()
  var month = ('0' + (dateObj.getUTCMonth() + 1 ) ).slice(-2)
  var year = dateObj.getUTCFullYear()

  return getDay() + "-" + month + "-" + year
}

function getDay () {
  var d = new Date()
  return ('0' + d.getUTCDate() ).slice(-2)
}

