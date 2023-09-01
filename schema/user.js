const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/self-stack',{
  useNewUrlParser : true,
  useUnifiedTopology : true
})


const registrationSchema = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
});

module.exports = mongoose.model('Registration', registrationSchema);

