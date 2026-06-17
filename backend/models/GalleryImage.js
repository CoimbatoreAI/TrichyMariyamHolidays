const mongoose = require('mongoose');

const GalleryImageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  altText: {
    type: String,
    default: 'Gallery Image',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('GalleryImage', GalleryImageSchema);
