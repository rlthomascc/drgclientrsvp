require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const db = require('../database/index.js');
const fs = require('fs');
const { Console } = require('console');
const { MessagingResponse } = require('twilio').twiml; //Twilio Text
const { VoiceResponse } = require('twilio').twiml; //Twilio Voice

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

const client = require('twilio')(
  process.env.sid, //sid
  process.env.token, //token
);


const sms = (data) => {
  client.messages.create({
  body: `Thank you ${data.name} for taking the time to RSVP to the 2022 Del Real Group Client Appreciation Event!

Your agent ${data.agent} & the Del Real Group looks forward to seeing you and your ${data.guests} guests! 

Please reach out to ${data.agent} directly if you have anything that needs to be changed or requirements`,
  from: '+12093993200',
  to: data.phone
  })
  .then(message => console.log(message.sid));
}

app.post('/rsvp', (req, res) => {
  sms(req.body);
  db.save(req.body);
  res.send('data has been sent from server to database')
});

app.get('/rsvp', (req, res) => {
  db.Rsvp2022.find().exec((err, data) => {
    res.send(data)
  })
})

app.patch('/invites', (req, res) => {
  const {name, guests} = req.body;

  db.Invites.findOneAndUpdate({
    name: name,
  }, {
    $set: {
      attend: true,
      guests: guests
    }
  }, null, (err, sessions) => {
    if (err) {
      res.send({
        success: false,
        message: 'Error updating database'
      })
    }
    res.send({
      success: true,
      message: 'Updated Database'
    })
  })
})

let port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
