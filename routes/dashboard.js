var express = require('express');
var router = express.Router();
const cookieParser = require('cookie-parser');
const auth = require('../auth');

router.get('/', auth, (req, res) => {
    const username = req.user.username;
    res.render('dashboard', { username: username }); 
});




module.exports = router;