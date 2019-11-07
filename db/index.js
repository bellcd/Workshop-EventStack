const mongoose = require('mongoose');

mongoose.connect();


const Schema = mongoose.schema();

const eventSchema = new Schema({
  id: String,
  title: String,
  description: String,
  summary: String,
  start_date: Date,
  end_date: Date,
  cost: Number
});

const Event = mongoose.model('Event', eventSchema);

