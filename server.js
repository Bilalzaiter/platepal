require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const mainRouter = require('./routes/index.routes');
const { logger, logEvents } = require('./services/logger')
const db  = require('./config/mongodb')
// const logger = require('./services/logger'); // Import the logger
app.use(logger)

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
db()

app.use('/', mainRouter);






const port = process.env.PORT || 5000;
app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server is running on http://localhost:${port}`);
  }
});
