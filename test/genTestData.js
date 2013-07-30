var getVol = randIntGenerator(1000,10000)
  , getPrice = randIntGenerator(1,100)
  , NUMBUCKETS = 4


var data = []

var start = 1374973441000
var bucketData

for (var i = 0; i < NUMBUCKETS; i++) {
  bucketData = simBucket(start)
  start += 60000
  data.push(bucketData)
}

console.log(JSON.stringify(data, null, "  "))


function simBucket (startTime) {

  var getTime = timeGenerator(startTime, 1, 6)
  var t = {}
  t.times = []
  t.prices = []
  t.vols = []

  var price = getPrice()
    , vol = getVol()
    , time = startTime
    , newtime

  /*
   * Floor startTime to nearest minute
   */
  t.startTime = ( ((startTime/1000) | 0) - (new Date(startTime)).getSeconds() ) * 1000
  t.priceOpen = price
  t.volOpen = vol

  t.times.push(time)
  t.prices.push(price)
  t.vols.push(vol)

  var min = (new Date(t.startTime)).getMinutes()



  while (true) {

    /*
     * Keep adding entries till we hit a new minute
     */
    newtime = getTime()
    if (min !== (new Date(newtime)).getMinutes())
      break;

    /*
     * Get new entries
     */
    time = newtime
    price = getPrice()
    vol = getVol()

    t.times.push(time)
    t.prices.push(price)
    t.vols.push(vol)

  }

  t.endTime = time
  t.priceClose = price
  t.volClose = vol

  t.priceHigh = Math.max.apply(null, t.prices)
  t.priceLow = Math.min.apply(null, t.prices)
  t.volHigh = Math.max.apply(null, t.vols)
  t.volLow = Math.min.apply(null, t.vols)

  return t
}





function timeGenerator(time, min, max) {
  var addTime = randIntGenerator(min, max)
  return function () {
    time += (addTime() * 1000)
    return time
  }
}


function randIntGenerator(min, max) {
  if (!min) min = 250
  if (!max) max = 1000

  return function () {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}

