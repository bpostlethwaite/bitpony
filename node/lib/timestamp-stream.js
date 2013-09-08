var Transform = require('stream').Transform


var _transform = function(data, encoding, callback) {

  var self = this

  var time = Math.floor( Date.now() / 1000 )
  self.push(time + "," + data + "\n")

  callback()
}


module.exports = function () {
  var s = new Transform()
  s._transform = _transform
  return s
}