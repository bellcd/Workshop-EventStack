const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/events');
const db = mongoose.connection;

db.on('error', (err) => console.log(err));
db.on('open', () => {

  const eventSchema = new mongoose.Schema({
    id: String,
    title: String,
    description: String,
    summary: String,
    start_date: Date,
    end_date: Date,
    cost: Number
  });

  const Event = mongoose.model('Event', eventSchema);

  // Event.insertMany(events, (err) => {
  //   if (err) { console.log(err); }

  //   console.log('inserted!');
  // });

  module.exports = {
    connection: mongoose
  }
});

