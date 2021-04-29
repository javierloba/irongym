const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  image: {type: String, default: ''},
  name: {type: String, trim: true},
  email: {type: String, lowercase: true, trim: true},
  password: {type: String, trim: true},
  age: {type: Number},
  activityReserve: [{type: Schema.Types.ObjectId, ref: 'Activity'}],
  trainerReserve: [{type: Schema.Types.ObjectId, ref: 'Trainer'}],
  slackID: {type: String}
})

const User = mongoose.model('User', userSchema);

module.exports = User;