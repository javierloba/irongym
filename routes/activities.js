const express = require('express');
const router  = express.Router();

/* GET activities page */
router.get('/activities', (req, res, next) => {
  res.render('activities',  { user: req.user } );
});

module.exports = router;