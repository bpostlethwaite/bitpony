var st = require("st")
  , http = require("http")
  , shoe = require('shoe')
  , PORT

// if (MODE == "-p")
//   PORT = 80
// else if (MODE == "-d")
PORT = 5001
// else {
//   console.log("Unknown flag, use -p for production or -d for development")
//   process.exit()
// }

var staticOptions = {
  path: './static/'
, url: '/'
, index: 'index.html' // use 'index.html' file as the index
, dot: false // default: return 403 for any url with a dot-file part
, passthrough: false // calls next instead of returning a 404 error
}

var mount = st(staticOptions)


var server = http.createServer( serverHandler )
server.listen(PORT, function() {
    console.log("Listening on port " + PORT)
})

function serverHandler(req, res) {
  return mount(req, res)
}

var sock = shoe(socketHandler)
sock.install(server, "/bitpony")


function socketHandler (stream) {
  // All of these arguments are optional.
  var csv = require('csv-stream')
    , fs = require('fs')
    , path = require('path')
    , duka2json = require('./node/lib/duka2json')({header: 1})

  var csvoptions = {
    delimiter : ','
  , endLine : '\n'
  , columns : ["Time", "Open", "High", "Low", "Close", "Volume"]
  }

  var FILE = "EURUSD_Candlestick_1_m_BID_20.08.2013-22.08.2013.csv"
    , CSV = path.join(process.env.HOME, "programming/bitpony/data/forex/dukascopy", FILE)

  var csvStream = csv.createStream(csvoptions)

  fs.createReadStream(CSV)
  .pipe(csvStream)
  .pipe(duka2json)
  .pipe(stream)

}


