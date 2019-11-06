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
}, {
  toJSON: {
    virtuals: true,
  },
});

userSchema.virtual('photo_url').get(function () {
  return `http://localhost:3003/files/${this.photo}`;
});

module.exports = mongoose.model('Users', userSchema);
