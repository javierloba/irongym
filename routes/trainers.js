const express = require('express');
const router  = express.Router();

/* GET activities page */
router.get('/trainers', (req, res, next) => {
  res.render('trainers');
});

module.exports = router;