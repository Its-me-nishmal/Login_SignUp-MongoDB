const model = require('./schema/user'); 
const mongoose = require('mongoose'); 
const cookieParser = require('cookie-parser')

const auth = async (req, res, next) => {
  const userId = req.cookies.session; 

  try {
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      res.redirect('/login'); 
      return;
    }

    const user = await model.findById(userId);

    if (!user) {
      res.redirect('/login'); 
    } else {
      req.user = user; 
      next(); 
    }
  } catch (error) {
    console.error(error);
    res.send('An error occurred');
  }
};

module.exports = auth;
