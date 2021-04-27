const express = require('express');
const { isLoggedIn/*, checkRole */} = require('../middlewares');
const router = express.Router();
const Activity = require('../models/Activity.model');
const User = require('../models/User.model');

router.get('/profile', isLoggedIn, (req, res, next) => {
  const  id  = req.user._id;
  console.log('private routes l 13');
  
  User.findOne({ _id: id })
  .populate('activity_id')
  .then(user => {
    
    res.render('profile', {user})
  })
  .catch(error => console.error(error))
})

router.post('/reserve/activity/:id', (req,res) => {
  const activity_id = req.params.id
  const user_id = req.user._id
  const activityReserve = []
  activityReserve.push(activity_id)

  User.findOneAndUpdate({_id: user_id}, {activityReserve}, {new: true})
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