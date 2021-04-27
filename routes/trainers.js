const express = require('express');
const Trainer = require('../models/Trainer.model');
const router  = express.Router();

/* GET trainers page */
router.get('/', (req, res, next) => {
  Trainer.find({})
  .then ((trainers) => {
    res.render('trainers',  { user: req.user, trainers } );
  })
  .catch (error => console.error(error))
})
module.exports = router;