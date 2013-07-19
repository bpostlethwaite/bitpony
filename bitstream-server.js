var WebSocket = require('ws')
  , url = 'wss://websocket.mtgox.com/mtgox'
  , JSONStream = require('JSONStream')
  , Timestamp = require("./lib/timestamp-stream")
  , swapStream = require('fileswap-stream')
  , websocket = require('websocket-stream')

var wss = connect2gox(url)

function connect2gox(url) {
  wss = new WebSocket(url)

  wss.on('close', function (code, message) {
    console.log("shutting down wss")
    connect2gox(url)
  })

  var tickerStream = tickerPipe(wss)

  var options = {
    namer : namer
  , swapper : getMinute
  , tdelta : 1000
  , path : "data"
  , fsops : {
    flags: "a"
  , encoding: "utf8"
  }
  }
  var timeStream = swapStream(options)

  tickerStream.pipe(timeStream)

  return wss
}


function tickerPipe (wss) {

  var ws = websocket(wss)

  ws.on('connect', function() {
    console.log('connected to:', url)
    subscribe(ws, 'ticker.BTCUSD')
  })

  var jstream = JSONStream.parse('ticker.avg.value')
  var tstream = Timestamp()

  return ws.pipe(jstream).pipe(tstream)
}

function subscribe(ws, channel) {
  console.log('subscribing to channel:', channel)
  ws.write(JSON.stringify({ op: 'mtgox.subscribe', channel: channel }))
}

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
