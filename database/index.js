const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.mongoUrl);


let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MongoDB has connected');
});

let todaysDate = new Date()
let dateString = todaysDate.getFullYear()

let rsvpSchema = ({
  fullName: String,
  spouseName: String,
  phoneNumber: Number,
  agent: String,
  guests: Number,
  publish: { type: Boolean, default: true },
  rsvp: { type: Boolean, default: false },
  archive: { type: Boolean, default: false },
  timestamp: { type: String, default: dateString, index: true },
  timeOfEntry: {type: String, default: todaysDate, index: true }
});

let Rsvp2022 = mongoose.model('Rsvp2022', rsvpSchema)

let invitesSchema = ({
  agent: String,
  name: String,
  email_phone: String,
  age: String,
  dateSent: String,
  dateViewed: String,
  rsvp: String,
  attend: {type: Boolean, default: false},
  guests: {type: Number, default: 0},
});

let Invites = mongoose.model('Invites', invitesSchema)

function save(e) {
  let obj = new Rsvp({
    fullName: e.name,
    spouseName: e.spouseName,
    phoneNumber: e.phone,
    agent: e.agent,
    guests: e.guests,
  });
  obj.save()
}


let funcs = { Rsvp2022, save, Invites }
module.exports = funcs;
