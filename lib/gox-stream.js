var WebSocket = require('ws')
  , wsStream = require('websocket-stream')


function connect (opts) {


  if (!opts) opts = {}
  var channel = opts.channel || 'ticker.BTCUSD'

  var wss = new WebSocket('wss://websocket.mtgox.com/mtgox')

  // wss.on('close', function (code, message) {
  //   /*
  //    * TRY RECONNECT ???
  //    */
  //   var newstream = connect(opts)
  //   stream.emit("reconnect", newstream)
  // })

  var stream = wsStream(wss)

  stream.on('connect', function() {
    subscribe(stream, channel)
  })

  stream.on("end", function () {
    /*
     * Try reconnect
     */

    var newstream = connect(opts)
    stream.emit("reconnect", newstream)
  })

  return stream
}


function subscribe(ws, channel) {
  console.log('subscribing to channel:', channel)
  ws.write(JSON.stringify({ op: 'mtgox.subscribe', channel: channel }))
}

module.exports = connect


