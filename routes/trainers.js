const express = require('express');
const router  = express.Router();

/* GET trainers page */
router.get('/trainers', (req, res, next) => {
  res.render('trainers', { user: req.user } );
});

module.exports = router;