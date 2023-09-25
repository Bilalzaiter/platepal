const express = require('express');
const router = express.Router();
const geocode = require('../controller/geocode.controller');

router.get('/geocode', geocode.geocode);

  module.exports = router;