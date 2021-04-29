const express = require('express');
const { isLoggedIn/*, checkRole */} = require('../middlewares');
const router = express.Router();
const User = require('../models/User.model');
const Activity = require('../models/Activity.model');
const Trainer = require('../models/Trainer.model');
const transporter = require('../configs/nodemailer.config');

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


router.post('/reserve/activity/:index/delete', (req, res) => {
  const activity_index = req.params.index;
  const user_id = req.user._id;

  User.findOne({_id: user_id})
  .then((user) => {
    user.activityReserve = user.activityReserve.filter((el, index) => { 
      return index != activity_index
    })
    user.save()
    .then(() => {
        return res.redirect('/private/profile');
      })
      .catch(error => {
        console.log(error);
        return res.redirect('/private/profile');
      })
  })
  .catch((error) => (console.error(error)))
})

// Post de activities
router.post('/reserve/activity/:id', (req,res) => {
  const activity_id = req.params.id
  const user_id = req.user._id

  if(!user_id){

    return res.redirect('/private/login')

  } else{

    const user_mail = req.user.email

    User.findOneAndUpdate({_id: user_id}, {$push: {activityReserve: activity_id}}, {new: true})
    .then(()=>{

      Activity.findOne({_id: activity_id})
      .then((activity)=> {
        transporter.sendMail({
          from: "Irongym 💪 <irongymbcn@gmail.com>",
          to: user_mail,
          subject: "Activity Reservation Confirmed!",
          html:`<p>Your reserve: ${activity.name}, is confirmed.</p>`
        })
        .then(() => {
          return res.redirect('/private/profile');
        })
        .catch(error => {
          console.log(error);
          return res.redirect('/private/profile');
        })
      })
    })
    .catch(error => console.error(error))
  }
})


router.post('/reserve/trainer/:index/delete', (req, res) => {
  const trainer_index = req.params.index;
  const user_id = req.user._id;

  User.findOne({_id: user_id})
  .then((user) => {
    user.trainerReserve = user.trainerReserve.filter((el, index) => { 
      return index != trainer_index
    })
    user.save()
    .then(() => {
        return res.redirect('/private/profile');
      })
      .catch(error => {
        console.log(error);
        return res.redirect('/private/profile');
      })
  })
  .catch((error) => (console.error(error)))
})



// Post de trainers
router.post('/reserve/trainer/:id', (req,res) => {
  const trainer_id = req.params.id
  const user_id = req.user._id

  if(!user_id){

    return res.redirect('/private/login')

  } else {

    const user_mail = req.user.email

    User.findOneAndUpdate({_id: user_id}, {$push: {trainerReserve: trainer_id}}, {new: true})
    .then(()=>{

      Trainer.findOne({_id: trainer_id})
      .then((trainer) => {
        transporter.sendMail({
          from: "Irongym 💪 <irongymbcn@gmail.com>",
          to: user_mail,
          subject: "Personal Trainer Reservation Confirmed!",
          html:`<p>Your reserve: ${trainer.name}, is confirmed.</p>`
        })
        .then(() => {
          return res.redirect('/private/profile');
        })
        .catch(error => {
          console.log(error);
          return res.redirect('/private/profile');
        })
      })
    })
    .catch(error => console.error(error))
  }
})




  //res.render('profile', { user: req.user/*, isAdmin: req.user.role === 'Admin'*/ });




// router.get('/admin-page', isLoggedIn, checkRole('Admin') ,(req, res, next) => {
//   res.render('admin-page', { user: req.user });
// })

module.exports = router