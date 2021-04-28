const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  image: {type: String, default: ''},
  name: {type: String, required: true},
  description: {type: String, required: true},
  date: {type: String, default: "Every monday"},
  hour: {type: String}
})

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;