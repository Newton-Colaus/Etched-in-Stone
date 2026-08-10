const express = require('express');
const router = express.Router();
const multer = require('multer');
const { put, del } = require('@vercel/blob');
const { getDb } = require('../config/db'); // Import Firestore instance getter

const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 4.5 * 1024 * 1024 }
});

// Helper function to format Firestore docs into a clean array for EJS
const formatDocs = (snapshot) => {
  return snapshot.docs.map(doc => ({
    id: doc.id, // Firestore uses doc.id instead of Mongoose's _id
    ...doc.data()
  }));
};

router.get('/gallery', async (req, res) => {
  try {
    const db = getDb();
    const snapshot = await db.collection('galleryItems').orderBy('createdAt', 'desc').get();
    const items = formatDocs(snapshot);
    res.render('gallery', { items });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error connecting to Firebase database.');
  }
});

// router.get('/admin', async (req, res) => {
//   try {
//     const db = getDb();
//     const snapshot = await db.collection('galleryItems').orderBy('createdAt', 'desc').get();
//     const items = formatDocs(snapshot);
//     res.render('admin', { items });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error connecting to Firebase database.');
//   }
// });

router.post('/gallery/upload', upload.single('galleryImage'), async (req, res) => {
  try {
    const db = getDb();
    const snapshot = await db.collection('galleryItems').get();
    
    if (snapshot.size >= 10) {
      return res.status(400).send('Gallery cap reached! Please drop an entry first.');
    }

    if (!req.file) return res.status(400).send('No image file selected.');

    const blob = await put(`gallery/${Date.now()}-${req.file.originalname}`, req.file.buffer, {
      access: 'public',
    });

    await db.collection('galleryItems').add({
      title: req.body.title || 'Untitled Cloud Image',
      imageUrl: blob.url,
      createdAt: new Date().toISOString()
    });

    res.redirect('/gallery');
  } catch (err) {
    console.error('Vercel/Firebase upload fail:', err.message);
    res.status(500).send('Upload execution failed.');
  }
});

router.post('/gallery/delete/:id', async (req, res) => {
  try {
    const db = getDb();
    const docRef = db.collection('galleryItems').doc(req.params.id);
    const doc = await docRef.get();
    
    if (!doc.exists) return res.status(404).send('Item not registered.');

    // Delete image from Vercel Blob
    await del(doc.data().imageUrl);

    // Delete record from Firestore
    await docRef.delete();
    res.redirect('/gallery');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error stripping item records.');
  }
});

module.exports = router;