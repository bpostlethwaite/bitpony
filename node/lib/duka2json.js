/*
 * Convert dukascopy csv to JSON forex data
 */

var Transform = require('stream').Transform


var _transform = function(data, encoding, callback) {

  var self = this

  if (self.header) {
    self.header--
    callback()
  }
  else {
    data.timestamp = getTimestamp(data.Time)
    self.push(JSON.stringify(data))
    callback()
  }
}

function getTimestamp(dukadate) {
  var da = dukadate.split(' ')
  var date = da[0].split('.').reverse().join("-") + "T" + da[1]
  return (new Date(date).getTime() / 1000)
}



module.exports = function (options) {
  if (!options)
    options = {}

  var s = new Transform({objectMode:true})
  s.header = options.header || 0
  s._transform = _transform
  return s
}
