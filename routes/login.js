var express = require('express');
var router = express.Router();
const Reg = require('../schema/user');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser')

router.get('/', (req, res) => {
  const kpass = req.cookies.session;
    if (kpass)
        res.redirect('/dashboard');
    else
        res.render('login');
});

router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Reg.findOne({ username: username });

    if (!user) {
      return res.render('login', { title: "Login", showalert: 'invalid email or password' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      res.cookie('session', user._id.toString()); 
      res.redirect('/dashboard');
    } else {
      return res.render('login', { title: "Login", showalert: 'invalid email or password' });
    }
  } catch (err) {
    console.log("Error:", err);
    res.status(500).send('Internal error');
  }
});



module.exports = router;