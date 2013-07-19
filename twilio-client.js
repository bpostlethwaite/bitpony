// Load the twilio module

var auth = JSON.parse(require("fs").readFileSync("./auth.json"))
var client = require('twilio')(auth.twilio.account_sid, auth.twilio.auth_token)

client.sms.messages.create({
  to:'+17788699361',
  from:'+16042008607',
  body:'twilio twitter twish twat'
}, function(error, message) {

     if (!error) {
       console.log('Success! The SID for this SMS message is:');
       console.log(message.sid);

       console.log('Message sent on:');
       console.log(message.dateCreated);
     }
     else {
       console.log(error)
     }
   })
