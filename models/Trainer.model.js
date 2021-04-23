const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trainerSchema = new Schema({
  image: {type: String, default: ''},
  name: {type: String, required: true},
  age: {type: Number, required: true},
  certificate: {type: String},
  description: {type: String, required: true},
  sports: {type: String, required: true}
})

const Trainer = mongoose.model('Trainer', trainerSchema);

module.exports = Trainer;