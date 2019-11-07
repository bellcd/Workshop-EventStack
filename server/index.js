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

// TODO: add route for getting all events

app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));