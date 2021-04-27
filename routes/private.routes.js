const express = require('express');
const { isLoggedIn/*, checkRole */} = require('../middlewares');
const router = express.Router();
const User = require('../models/User.model');

router.get('/profile', isLoggedIn, (req, res, next) => {
  const id  = req.user._id;
  // Find de activities
  User.findOne({ _id: id })
  .populate('activityReserve').populate('trainerReserve')
  .then(user => {
    res.render('profile', {user})
  })
  .catch(error => console.error(error))
})

// Post de activities
router.post('/reserve/activity/:id', (req,res) => {
  const activity_id = req.params.id
  const user_id = req.user._id

  User.findOneAndUpdate({_id: user_id}, {$push: {activityReserve: activity_id}}, {new: true})
  .then((updatedUser)=>{
    console.log(updatedUser)
    res.redirect('/private/profile')
  })
  .catch(error => console.error(error))
})


// Post de trainers
router.post('/reserve/trainer/:id', (req,res) => {
  const trainer_id = req.params.id
  const user_id = req.user._id

  User.findOneAndUpdate({_id: user_id}, {$push: {trainerReserve: trainer_id}}, {new: true})
  .then((updatedUser)=>{
    console.log(updatedUser)
    res.redirect('/private/profile')
  })
  .catch(error => console.error(error))
})




  //res.render('profile', { user: req.user/*, isAdmin: req.user.role === 'Admin'*/ });




// router.get('/admin-page', isLoggedIn, checkRole('Admin') ,(req, res, next) => {
//   res.render('admin-page', { user: req.user });
// })

module.exports = router