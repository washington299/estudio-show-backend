const mongoose = require('mongoose');

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const userSchema = new Schema({
  photo: String,
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    trim: true,
  },
  photographer: Boolean,
  client: Boolean,
});

module.exports = mongoose.model('Users', userSchema);
