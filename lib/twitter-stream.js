var twitter = require('ntwitter')
var auth = JSON.parse(require("fs").readFileSync("./auth.json"))




var twit = new twitter({
  consumer_key: auth.twitter.consumer_key,
  consumer_secret: auth.twitter.consumer_secret,
  access_token_key: auth.twitter.access_token_key,
  access_token_secret: auth.twitter.access_token_secret
})

twit.stream('statuses/sample', function(stream) {
  stream.on('data', function (data) {
    console.log(data)
  })
})

