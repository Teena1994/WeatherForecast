const mongoose = require('mongoose');

const searchHistorySchema = new mongoose.Schema({
  state: { type: String},
  current_weather: { type: Object },
  latitude: { type: Number},
  longitude: { type: Number },
  timeStamp: {type: Date, default: new Date()}
});

const searchHistoryDetails = mongoose.model('search_history', searchHistorySchema);

module.exports = searchHistoryDetails;
