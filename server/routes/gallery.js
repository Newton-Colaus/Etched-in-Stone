// routes/gallery.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { put, del } = require('@vercel/blob');
const GalleryItem = require('../models/gallery');

const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 4 * 1024 * 1024 }
});

router.get('/gallery', async (req, res) => {
  try {
    const items = await GalleryItem.find().sort({ createdAt: -1 });
    res.render('gallery', { items });
  } catch (err) {
    res.status(500).send('Error connecting to Atlas cloud database.');
  }
});

router.get('/admin', async (req, res) => {
  try {
    const items = await GalleryItem.find().sort({ createdAt: -1 });
    res.render('admin', { items: items });
  } catch (err) {
    res.status(500).send('Error connecting to Atlas cloud database.');
  }
});

router.post('/gallery/upload', upload.single('galleryImage'), async (req, res) => {
  try {
    const totalCount = await GalleryItem.countDocuments();
    if (totalCount >= 10) {
      return res.status(400).send('Gallery cap reached! Please drop an entry first.');
    }

    if (!req.file) return res.status(400).send('No image file selected.');

    const blob = await put(`gallery/${Date.now()}-${req.file.originalname}`, req.file.buffer, {
      access: 'public',
    });

    const newItem = new GalleryItem({
      title: req.body.title || 'Untitled Cloud Image',
      imageUrl: blob.url
    });

    await newItem.save();
    res.redirect('/gallery');
  } catch (err) {
    console.error('Vercel/Atlas upload fail:', err.message);
    res.status(500).send('Upload execution failed.');
  }
});

router.post('/gallery/delete/:id', async (req, res) => {
  try {
    const item = await GalleryItem.findById(req.params.id);
    if (!item) return res.status(404).send('Item not registered.');

    await del(item.imageUrl);

    await GalleryItem.findByIdAndDelete(req.params.id);
    res.redirect('/gallery');
  } catch (err) {
    res.status(500).send('Error stripping item records.');
  }
});

module.exports = router;
