const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 3007;
const connection = require('../db/index.js')
const controller = require('./controller.js');

app.use(express.static('public/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/events', (req, res, next) => {
  controller.getEvents((err, events) => {
    if (err) {
      console.log(err);
      res.status(400).send();
    } else {
      res.status(200).send(JSON.stringify(events));
    }
  });
});

app.post('/event', (req, res, next) => {
  controller.addEvent(req.body, (err, event) => {
    if (err) {
      console.log(err);
      res.status(400).send();
    } else {
      res.status(200).send();
    }
  });
});

app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));