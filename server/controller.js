const db = require('../db/index.js');

module.exports.getEvents = (callback) => {
  db.Event.find((err, events) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, events);
  });
}