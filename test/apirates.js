var hyperquest = require('hyperquest')
var JSONStream = require('JSONStream')

var URL = "http://api.apirates.com/api/update"
var URL2 = "http://api-sandbox.oanda.com/v1/quote?instruments=EUR_USD"

//hyperquest(URL).pipe(jstream).pipe(process.stdout)
setInterval( function () {
  hyperquest(URL).pipe(JSONStream.parse(["ticks","EURUSD"])).pipe(process.stdout)
}, 1000)