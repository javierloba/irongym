const users = require('../data/user.data');
const User = require('../models/User.model');

const activities = require('../data/activity.data');
const Activity = require('../models/Activity.model');

const trainers = require('../data/trainer.data');
const Trainer = require('../models/Trainer.model');

const mongoose = require('mongoose');
const DB_NAME = 'irongym';

mongoose.connect(`mongodb://localhost/${DB_NAME}`)
.then (() => {
  console.log('Connected to database')
  User.insertMany(users)
    .then(users => {
      console.log(`${users.length} inserted.`)
  })
  Trainer.insertMany(trainers)
  .then(trainers => {
    console.log(`${trainers.length} inserted.`)
  })
  Activity.insertMany(activities)
  .then(activities => {
    console.log(`${activities.length} inserted.`)
  })
})
.catch(error => console.error(error));