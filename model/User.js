const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String, 
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  college: {
    type: String, 
    required: true
  },
  course: {
    type: String, 
    required: true
  },
  accountType: {
    type: String,
    default: 'user'
  },
  verificationToken: {
    type: String,
    default: null 
  },
  verified: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
