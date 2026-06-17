const express = require('express');
const router = express.Router();
const GalleryImage = require('../models/GalleryImage');
const { protect } = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const fs = require('fs');
const path = require('path');

router.get('/', async (req, res) => {
  try {
    const images = await GalleryImage.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }
    
    // Convert to relative URL format for frontend
    const imageUrl = `/uploads/${req.file.filename}`;
    const newImage = new GalleryImage({
      imageUrl,
      altText: req.body.altText || 'Gallery Image',
    });

    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const image = await GalleryImage.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Delete file from disk
    const filePath = path.join(__dirname, '..', image.imageUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await GalleryImage.deleteOne({ _id: req.params.id });
    res.json({ message: 'Image removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
