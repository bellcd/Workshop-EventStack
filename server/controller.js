const db = require('../db/index.js');

module.exports.getEvents = () => {
  db.Event.find((err, events) => {
    if (err) { return console.log(err); }
    return events;
  });
}