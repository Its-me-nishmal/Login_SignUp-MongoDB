const express = require('express');
const router = express.Router();
const Reg = require('../schema/user');
const bycrpt = require("bcrypt");
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');




router.get('/', (req, res) => {
  const kpass = req.cookies.session;
    if (kpass)
        res.redirect('/dashboard');
    else
        res.render('index');
});



router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashpass = await bycrpt.hash(password, 10);

    const exituser = await Reg.findOne({ email: email });
    if (exituser) {
      return res.render('index',{ title: "Registration", showalert: true })
    }

    const newUser = new Reg({
      username: username,
      email: email,
      password: hashpass,
    });
    await newUser.save();
    
    console.log('Success: User registered');
    res.redirect('/login');
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal server error');
  }
});


// router.delete('/delete', auth, async (req, res) => {
//   try {
//     const userId = req.user._id; 

    
//     await Reg.findByIdAndDelete(userId);

    
//     res.clearCookie('session');

//     res.json({ success: true, message: 'Account deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'An error occurred' });
//   }
// });

router.get('/logout', (req,res) =>{
  res.clearCookie('session');
  res.redirect('/login')
})

module.exports = router