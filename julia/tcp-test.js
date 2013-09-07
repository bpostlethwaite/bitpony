/*
 * Node-Julia streaming-RPC
 *
 */
var net = require("net")
var Duplex = require('stream').Duplex
var util = require('util')
util.inherits(Julianode, Duplex)

function Julianode(opt) {
  Duplex.call(this, opt)
  this._FLOAT = 4 // 32 bits for data
  this._INT = 4   // Int32 for header info
  this._MODE = 14 // Uint8 x 14 for method name
  this._HEADER =


function bpack(method, data) {
  /*
   * BPACK - node -> Julia binary protocol
   *
   * Buffer:
   *   4xUint8 length string giving method
   *   INT32   length of data
   *   FLOAT32 DATA
   */

  var FLOAT = 4 // 32 bits (4x8 bytes)
    , INT = 4   // 32 bits (4x8 bytes)
    , MODE = 4  // 4 x Uint8
    , i

  var HEADER = MODE + INT

  /*
   * validation
   */
  if (typeof(method) !== "string")
    throw new Error("jpack method header must be string")
  if (method.length !== 4)
    throw new Error("jpack method name malformed")

  /*
   * Write Buffer Headers
   */
  var buff = new Buffer(HEADER + FLOAT * data.length)
  buff.write(method)
  buff.writeInt32LE(data.length, 0)

  /*
   * Write Buffer Data
   */
  for (i = 0; i < data.length; i++)
    buff.writeFloatLE(data[i], HEADER + i * 4)

  return buff
}


function bsend(method, data) {

  var buff = bpack(method, data)

  var client = net.connect(
    {port: 8080}
  , onConnect)

  function onConnect() { //'connect' listener
    console.log('client connected')
    client.write(data)
  }


var data = []
var i
for (i = 0; i < 30; i++)
  data[i] = i





/*
 * Using a connection per data stream.
 * To recycle a connection, can get numdata before
 * reading as a header. Then read nheader bytes
 * and close connection from this side. More robust?
 */
var transformed = []
var ndata
var HEADER = true
var nread = 0

function breceive

client.on("readable", function () {
  var chunk

  if (HEADER) {
    while (null !== (chunk = client.read(INT))) {
      var ndata = chunk.readInt32LE(0)
      console.log("length transformed data: ", ndata)
      HEADER = false
      break
    }
  }
  while (null !== (chunk = client.read(FLOAT))) {
    /* Stream bytes out here */
    transformed.push(chunk.readFloatLE(0))
    nread++
    if (nread === ndata) {
      console.log(transformed)
      client.end()
      break
    }
  }
})

client.on('end', function() {
  console.log('client disconnected')
//  console.log(transformed)
})

