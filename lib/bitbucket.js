/*
 * BITBUCKET
 * Ben Postlethwaite
 * July 2013
 */

module.exports = function () {

  /*
   * Bitbucket accepts data into it's internal arrays and return False
   * until a new marker is reached, at which it returns true and processes
   * The data and sets it as its data attribute
   */
  var self = {}
    , bucket
    , lastprice = 0
    , lastvolume = 0

  function add (price, volume) {

    if (!bucket) {
      bucket = newBucket()

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

  }

  function empty() {

    bucket.priceClose = lastprice
    bucket.volClose = lastvolume

    var fullbucket = bucket

    bucket = null

    return fullbucket
  }


  function newBucket(startTime) {
    return {
      priceOpen : 0
    , priceClose : 0
    , volOpen : 0
    , volClose : 0
    , priceHigh : 0
    , priceLow : 0
    , volHigh : 0
    , volLow : 0
    , startTime : startTime
    }
  }


  self.add = add
  self.empty = empty

  return self
}
