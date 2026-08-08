const admin = require('firebase-admin');

const connectDB = () => {
  // Prevent multiple initializations in serverless environments
  if (!admin.apps.length) {
    try {
      // You must add FIREBASE_SERVICE_ACCOUNT to your Vercel Environment Variables
      // Paste the entire JSON string from your Firebase Service Account file into it
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
      console.log('Firebase Admin initialized successfully.');
    } catch (error) {
      console.error('Firebase initialization error:', error.message);
    }
  }
};

// Export both the init function and the db instance for your routes
const db = admin.apps.length ? admin.firestore() : null;

module.exports = { connectDB, getDb: () => admin.firestore() };