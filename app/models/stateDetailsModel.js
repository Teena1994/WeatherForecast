const mongoose = require('mongoose');

const stateDetailsSchema = new mongoose.Schema({
  state: { type: String, required: true},
  capital: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true }
});

stateDetailsSchema.index({ state: 1 }); // Create an index on the 'state' field

const stateDetails = mongoose.model('state_details', stateDetailsSchema);

module.exports = stateDetails;
