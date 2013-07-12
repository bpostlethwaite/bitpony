var websocket = require('websocket-stream')
var xtend     = require('xtend')
var url = 'wss://websocket.mtgox.com/mtgox'
var JSONStream = require('JSONStream')
var ws = websocket(url)

var defaultOptions = {
  currency: 'CAD'
, ticker: true
, depth: false
, trade: false
, lag: false
}

var options = {}

options = xtend(defaultOptions, options)

ws.on('connect', function() {
  console.log('connected to:', url)
  if (options.ticker) subscribe('ticker.BTC' + options.currency)
  if (options.depth) subscribe('depth.BTC' + options.currency)
  if (options.trade) subscribe('trade.BTC')
  if (options.lag) subscribe('trade.lag')
})

function subscribe(channel) {
    console.log('subscribing to channel:', channel)
    ws.write(JSON.stringify({ op: 'mtgox.subscribe', channel: channel }))
}

// ws.on('data', function (data, flags) {
//   console.log(data, flags)
// })

var shoe = require('shoe')


var stream = shoe('/tickbit')

var jstream = JSONStream.parse('ticker.avg.value')

ws.pipe(jstream).pipe(stream).pipe(ws)


var tv = 250

// instantiate our graph!
var graph = new Rickshaw.Graph( {
  element: document.getElementById("chart"),
  width: 900,
  height: 500,
  min: "auto",
  renderer: 'line',
  series: new Rickshaw.Series.FixedDuration([{ name: 'one' }], undefined, {
    timeInterval: tv,
    maxDataPoints: 10,
    timeBase: new Date().getTime() / 1000
  })
})

var y_axis = new Rickshaw.Graph.Axis.Y( {
  graph: graph,
  orientation: 'left',
  tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
  element: document.getElementById('y_axis'),
})


jstream.on('data', function (tbit) {
  var data = { one: parseFloat(tbit) }
  console.log()
  graph.series.addData(data)
  graph.render()
})