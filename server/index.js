const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 3007;
const connection = require('../db/index.js')
const controller = require('./controller.js');
const keys = require('../keys');
const request = require('request');

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

app.get('/possible-events', (req, res, next) => {
  const options = {
    url: `https://www.eventbriteapi.com/v3/events/search/?subcategories=2004`,
    headers: {
      'Host': `www.eventbriteapi.com`,
      'Authorization': `Bearer ${keys.EVENTBRITE}`
    }
  };

  request(options, (err, response, body) => {
    if (err) { console.log(err); }

    body = JSON.parse(body);
    console.log('body: ', body);
  });
});

app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));