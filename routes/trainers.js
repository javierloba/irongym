const express = require('express');
const router  = express.Router();
const { isLoggedOut } = require('../middlewares')
const { isLoggedIn } = require('../middlewares')

/* GET activities page */
router.get('/trainers', (req, res, next) => {
  const { email } = req.body;
  res.render('trainers', { email} );
});

module.exports = router;