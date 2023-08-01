const express = require('express');
const router = express.Router();
const weatherController = require('../controller/weatherController');

router.get('/location/:stateName', weatherController.getStateDataByName);
router.get('/:latitude/:longitude', weatherController.getWeatherByCoordinates);
router.post('/insert/searchHistory', weatherController.insertSearchWeatherData);
router.get('/searchHistory', weatherController.getSearchWeatherData);

module.exports = router;
