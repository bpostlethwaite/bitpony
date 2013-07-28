/*
 * BITBUCKET
 * Ben Postlethwaite
 * July 2013
 */

var EventEmitter = require("events").EventEmitter
  , copy = require("shallow-copy")

module.exports = function () {

  /*
   * Bitbucket accepts data into it's internal arrays and return False
   * until a new marker is reached, at which it returns true and processes
   * The data and sets it as its data attribute
   */

  var self = new EventEmitter
    , flag
    , oldflag = false
    , lastprice = 0
    , lastvolume = 0
    , bucket = {
      priceOpen : 0
    , priceClose : 0
    , volOpen : 0
    , volClose : 0
    , priceHigh : 0
    , priceLow : 0
    , volHigh : 0
    , volLow : 0
    , startTime : 0
    }

  function add (time, price, volume) {

    var flag = (new Date(time)).getMinutes()

    var isNewBucket = (flag !== oldflag)

    if (isNewBucket) {

      /*
       * Finalize old bucket
       */
      bucket.priceClose = lastprice
      bucket.volClose = lastvolume

      /*
       * Make shallow copy and emit
       * oldflag is initially set to false so we dont
       * emit the starting bucket
       */
      if (oldflag)
        self.emit('bucket', copy(bucket))

      /*
       * Initialize new bucket
       */
      oldflag = flag

      bucket.startTime = time
      bucket.priceOpen = price
      bucket.volOpen = volume

      bucket.priceHigh = price
      bucket.priceLow = price
      bucket.volHigh = volume
      bucket.volLow = volume


    }
    /*
     * continue assigning data to bucket
     */
    if (price > bucket.priceHigh)
      bucket.priceHigh = price

    if (price < bucket.priceLow)
      bucket.priceLow = price

    if (volume > bucket.volHigh)
      bucket.volHigh = volume

    if (volume < bucket.volLow)
      bucket.volLow = volume


    lastprice = price
    lastvolume = volume

    return isNewBucket

  }

  self.bucket = bucket
  self.add = add


  return self
}
