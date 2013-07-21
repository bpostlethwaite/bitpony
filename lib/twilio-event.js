var twilio = require('twilio')
  , qs = require('querystring')
  , http = require('http')
  , EventEmitter = require("events").EventEmitter
  , auth = require("./auth.json")//JSON.parse(require("fs").readFileSync("./auth.json"))

module.exports = function (PORT) {

  var ev = new EventEmitter


  var server = http.createServer(

    function (req, res) {

      if (req.method == 'POST') {
        var body = ''

        req.on('data', function (data) {
          body += data
        })

        req.on('end', function () {
          var POST = qs.parse(body)

          //validate incoming request is from twilio using your auth token and the header from Twilio
          var token = auth.twilio.auth_token
            , header = req.headers['x-twilio-signature']

          console.log(token, header)
          //validateRequest returns true if the request originated from Twilio
          // if (twilio.validateRequest(token, header, 'http://twilio-raw.herokuapp.com', POST)) {
          //   console.log("legit")
          // } else {
          //   console.log("failed auth")
          // }

          if (verify(POST)) {
            ev.emit("message", POST.Body)
          } else {
            console.log("THIS AIN'T AN AUTHORIZED NUMBER")
          }
        })
      }

    }).listen(PORT)

  return ev
}

function verify (req) {
  return req.From === "+17788699361"
}
