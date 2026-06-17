const express = require('express');
const router = express.Router();
const TourPackage = require('../models/TourPackage');
const { protect } = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const fs = require('fs');
const path = require('path');

router.get('/', async (req, res) => {
  try {
    const packages = await TourPackage.find().sort({ createdAt: -1 });
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    const { title, duration } = req.body;
    if (!title || !duration) {
      return res.status(400).json({ message: 'Title and duration are required' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    const newPackage = new TourPackage({
      title,
      duration,
      imageUrl,
    });

    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const pkg = await TourPackage.findById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ message: 'Package not found' });
    }

    const filePath = path.join(__dirname, '..', pkg.imageUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await TourPackage.deleteOne({ _id: req.params.id });
    res.json({ message: 'Package removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
