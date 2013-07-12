"use strict";
var st = require("st")
  , http = require("http")
  , shoe = require('shoe')

// Listen on port
var PORT = 8082

var server = http.createServer( serverHandler )

server.listen(PORT, function() {
    console.log("Listening on port " + PORT)
})


var staticOptions = {
  path: './static/'
, url: '/'
, index: 'index.html' // use 'index.html' file as the index
, dot: false // default: return 403 for any url with a dot-file part
, passthrough: false // calls next instead of returning a 404 error
}

var mount = st(staticOptions)

function serverHandler(req, res) {
  return mount(req, res)
}


var sock = shoe(function (stream) {

    stream.pipe(process.stdout, { end : false });
})

sock.install(server, '/tickbit')