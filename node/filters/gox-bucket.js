var Transform = require("stream").Transform

function transform (data, encoding, done) {

  data = JSON.parse(data)

  if (data.ticker) {
    var ticker = data.ticker
    var unixTime = parseInt(ticker.now.slice(0,13))
    var packet = {
      now: unixTime
    , price: parseFloat(ticker.last_local.value)
    , volume: parseFloat(ticker.vol.value)
    }
    this.push(packet)
  }
  done()
}

module.exports = function () {
  var s = new Transform({objectMode: true})
  s._transform = transform

  return s
}