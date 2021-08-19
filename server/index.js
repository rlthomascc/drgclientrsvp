require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const db = require('../database/index.js');
const fs = require('fs');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/rsvp', (req, res) => {
  db.save(req.body);
  res.send('data has been sent from server to database')
});

app.get('/rsvp', (req, res) => {
  db.Rsvp.find().exec((err, data) => {
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
