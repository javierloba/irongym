const express = require('express');
const Activity = require('../models/Activity.model');
const router  = express.Router();
// const User = require('../models/User.model');

/* GET activities page */
router.get('/activities', (req, res, next) => {
  Activity.find({})
  .then ((activities) => {
    res.render('activities',  { user: req.user, activities } );
  })
  .catch (error => console.error(error))
})

// router.get('/:id', (req, res, next) => {
//   const { id } = req.params;

//   User.findOne({ _id: id })
//   .populate('activity_id')
//   .then(user => {

//     res.render('profile', {user})
//   })
//   .catch(error => console.error(error))
// })

module.exports = router;