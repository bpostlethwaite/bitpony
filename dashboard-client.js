var domready = require("domready")
  , shoe = require("shoe")
  , candlestick = require("./lib/candlestick.js")

domready( function () {


  var forex = []

  var stream = shoe("/bitpony")

  stream.on("data", function (data) {
    forex.push(JSON.parse(data))
  })


  stream.on("end", function() {
    candlestick(forex)
  })

})