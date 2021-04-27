const express = require('express');
const Activity = require('../models/Activity.model');
const router  = express.Router();

router.get('/', (req, res, next) => {
  Activity.find({})
  .then ((activities) => {
    res.render('activities',  { user: req.user, activities } );
  })
  .catch (error => console.error(error))
})


module.exports = router;