/*
 * BUCKETSTREAM
 * Ben Postlethwaite
 * July 2013
 */
var util = require('util')
  , Transform = require('stream').Transform
  , copy = require("shallow-copy")

util.inherits(BitBucket, Transform)


module.exports = BitBucket


function BitBucket() {
  if (!(this instanceof BitBucket))
    return new BitBucket()

  Transform.call(this, {objectMode: true})

  this._lastprice = 0
  this._lastvolume = 0
  this._bucket = {}
  this._min = null
}

BitBucket.prototype._transform = function(packet, encoding, done) {

  var time = packet.now
    , price = packet.price
    , volume = packet.volume

  if (!time && !price && !volume)
    throw new Error ("malformed incoming packet!")

  if (this._min !== (new Date(time)).getMinutes() ) {

    /*
     * Finish up and send bucket
     */
    this._bucket.priceClose = this._lastprice
    this._bucket.volClose = this._lastvolume
    /*
     * Only push if this isn't the first transform
     */
    if (this._min)
      this.push(copy(this._bucket))

    this._min = (new Date(time)).getMinutes()
    /*
     * build a new bucket
     */
    // startime is a whole number of seconds
    this._bucket.startTime = ( ((time/1000) | 0) - (new Date(time)).getSeconds() ) * 1000
    this._bucket.priceOpen = price
    this._bucket.volOpen = volume

    this._bucket.priceHigh = price
    this._bucket.priceLow = price
    this._bucket.volHigh = volume
    this._bucket.volLow = volume

  }

  /*
   * continue assigning data to this._bucket
   */
  if (price > this._bucket.priceHigh)
    this._bucket.priceHigh = price

  if (price < this._bucket.priceLow)
    this._bucket.priceLow = price

  if (volume > this._bucket.volHigh)
    this._bucket.volHigh = volume

  if (volume < this._bucket.volLow)
    this._bucket.volLow = volume

  /*
   * Update state for finishing bucket
   */
  this._lastprice = price
  this._lastvolume = volume


  done()
}
