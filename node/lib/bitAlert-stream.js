var sms = require('./twilio-client')
  , Transform = require('stream').Transform


var lowTrigger = true
  , highTrigger = true

var _transform = function(data, encoding, callback) {

  var self = this

  var price = parseFloat(data.toString())

  if (this.low && lowTrigger && (price < this.low)) {
    sms(this.number, this.messager(price))
    lowTrigger = false
  }

  if (this.high && highTrigger && (price > this.high)) {
    sms(this.number, this.messager(price))
    lowTrigger = false
  }

  this.push(data)

  callback()
}



module.exports = function (opts) {

  var s = new Transform()

  s.low = opts.low
  s.high = opts.high
  s.number = opts.number
  s.messager = opts.messager

  s._transform = _transform

  return s


}
