const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/events');
const db = mongoose.connection;

db.on('error', (err) => console.log(err));
db.on('open', () => {
  // TODO: is all of the code that interacts with the db supposed to be in this callback? If so, how can the Mongoos object interact with other modules??
});

const eventSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  summary: String,
  startDate: Date,
  endDate: Date,
  cost: Number
});

const Event = mongoose.model('Event', eventSchema);

module.exports = {
  Event
}

