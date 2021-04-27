const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  image: {type: String, default: ''},
  name: {type: String, trim: true},
  email: {type: String, required: true, lowercase: true, trim: true},
  password: {type: String, required: true, trim: true},
  age: {type: Number},
  activityReserve: [{type: Schema.Types.ObjectId, ref: 'Activity'}],
  trainerReserve: [{type: Schema.Types.ObjectId, ref: 'Trainer'}]
})

const User = mongoose.model('User', userSchema);

module.exports = User;