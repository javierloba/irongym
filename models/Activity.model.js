const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  image: {type: String, default: ''},
  name: {type: String, required: true},
  description: {type: String, required: true},
  date: {type: Date, default: Date.now},
  hour: {type: Time}
})

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;