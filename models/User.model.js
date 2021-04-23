const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  image: {type: String, default: ''},
  name: {type: String, required: true, trim: true},
  email: {type: String, required: true, lowercase: true, trim: true},
  password: {type: String, required: true, trim: true},
  age: {type: Number, required: true},
  activityReserve: [],
  trainerReserve: []
})

const User = mongoose.model('User', userSchema);

module.exports = User;