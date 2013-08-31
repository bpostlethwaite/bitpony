var io = require("socket.io-client")

var streamingSocket = io.connect('http://api-sandbox.oanda.com', {'force new connection':true , resource:'ratestream'})   // forcing due to socket.io bug

streamingSocket.on('connect', function (err) {

  console.log(err)

  var currencyList = ['EUR/USD']
  streamingSocket.emit('subscribe', {'instruments': currencyList})

  streamingSocket.on('tick', function (data) {
    console.log( data )
  })
})