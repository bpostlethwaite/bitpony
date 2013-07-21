var goxstream = require("../lib/gox-stream")
  , JSONStream = require("JSONStream")
  , reconnect = require("../lib/reconnect")

var gstream = goxstream()


reconnect(gstream, function (stream) {
  var jstream = JSONStream.parse('ticker.avg.value')

  jstream.on("data", function (data) {
    console.log(data)
  })

  stream.pipe(jstream)

  setTimeout(function () {
    console.log("ending stream")
    stream.end()
  }, 8000)

})