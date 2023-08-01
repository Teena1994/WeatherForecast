const stateDetails = require('./../models/stateDetailsModel'),
      searchHistoryModel = require('./../models/searchHistoryModel'),
      axios = require('axios'),
      weatherUrl = process.env.WEATHER_BASE_API_URL;

/*
1. Get list of usa state details from mongo db collection 'state_details'.
2. Filter specific state name from the above array to get the coordinate details
*/
exports.getStateDataByName = async (req, res) => {
    try {

        const stateName = req.params.stateName;
        console.log(`Querying for state ${stateName}`);

        //query based on state name and get the latitude and longitude of capital
        const stateCoordinates = await stateDetails.findOne({'state' : stateName});
        console.log(stateCoordinates)
        res.status(200).json({ success: true, data: stateCoordinates });

    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

/* Based on the latitude and longitude get the current weather details */
exports.getWeatherByCoordinates = async (req, res) => {
    try {
        const latitude = req.params.latitude,
            longitude = req.params.longitude;
        
        // Fetch current weather details based on latitude and longitude
        const response = await axios.get(`${weatherUrl}?latitude=${latitude}&longitude=${longitude}&current_weather=true`),
              weatherData = response.data;

        res.status(200).json(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(400).json({ success: false, message: error.message });
    }
}

/*Insert Search history details into the database*/
exports.insertSearchWeatherData = async (req, res) => {
    try {    
        console.log(req.body); 
        // Insert search history details into collection
        const searchDetails = await searchHistoryModel.create(req.body);
        res.status(200).json({ success: true, data: searchDetails });
    } catch (error) {
        console.error('Error while inserting search data:', error);
        res.status(400).json({ success: false, message: error.message });
    }
}

/*Get the list of lookups or search history details from the database*/
exports.getSearchWeatherData = async (req, res) => {
    try {    
        // get search history details from collection
        const searchDetails = await searchHistoryModel.find({});
        res.status(200).json({ success: true, data: searchDetails });
    } catch (error) {
        console.error('Error while fetching search data:', error);
        res.status(400).json({ success: false, message: error.message });
    }
}
