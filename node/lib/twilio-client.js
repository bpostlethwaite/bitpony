// Load the twilio module

var auth = require("../auth.json")//JSON.parse(require("fs").readFileSync("./auth.json"))
var client = require('twilio')(auth.twilio.account_sid, auth.twilio.auth_token)

module.exports = function (number, msg, cb) {

  if (!cb) {
    cb = function(error, message) {
      if (error) console.log(error)
    }
  }

  client.sms.messages.create({
    to: number
  , from:'+16042008607'
  , body: msg
  }, cb)

}