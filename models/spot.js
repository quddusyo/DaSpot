const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpotSchema = new Schema({
    title: String,
    funds: Number,
    description: String,
    location: String
});

module.exports = mongoose.model('Spot', SpotSchema);