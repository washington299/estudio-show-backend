const mongoose = require('mongoose');

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const AlbumSchema = new Schema({
  photos: [String],
  photographer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Album', AlbumSchema);
