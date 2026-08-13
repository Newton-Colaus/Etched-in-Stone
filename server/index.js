const path = require("path");
const express = require("express");
const app = express();
const cookieSession = require("cookie-session");
const PORT = process.env.PORT || 6767;
const dotenv = require("dotenv");
const { connectDB } = require("./config/db.js");
const { getDb } = require('./config/db'); // Import Firestore instance getter

dotenv.config();

connectDB();

const formatDocs = (snapshot) => {
  return snapshot.docs.map(doc => ({
    id: doc.id, // Firestore uses doc.id instead of Mongoose's _id
    ...doc.data()
  }));
};

const indexRoutes = require("./routes/indexRoutes");
const galleryRoutes = require("./routes/gallery.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ONLY serve static files locally. Vercel handles public/ static assets via CDN in production.
if (process.env.NODE_ENV !== 'production') {
    app.use("/static", express.static(path.join(__dirname, "public")));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.set('trust proxy', 1); 

app.use(cookieSession({
    name: 'etched_admin_session',
    keys: [process.env.SESSION_SECRET || 'etched_in_stone_secure_key_2026'],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    
    // Security flags
    httpOnly: true, // Prevents client-side JS from reading the cookie
    secure: process.env.NODE_ENV === 'production' // Requires HTTPS on live Vercel
}));

function requireAuth(req, res, next) {
    if (req.session && req.session.isAdmin) {
        return next();
    }
    res.redirect('/login');
}

app.get('/login', (req, res) => {
    if (req.session.isAdmin) {
        return res.redirect('/admin');
    }
    res.render('login', { error: null });
});

// 2. POST Login Handler
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const adminUser = process.env.ADMIN_USERNAME || 'admin';
    const adminPass = process.env.ADMIN_PASSWORD || 'stone2026';

    if (username === adminUser && password === adminPass) {
        req.session.isAdmin = true;
        return res.redirect('/admin');
    }

    res.render('login', { error: 'Invalid username or password.' });
});

// 3. Protected Admin Dashboard Route
app.get('/admin', requireAuth, async (req, res) => {
    try {
        const db = getDb();
        const snapshot = await db.collection('galleryItems').orderBy('createdAt', 'desc').get();
        const items = formatDocs(snapshot);
        res.render('admin', { items });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error connecting to Firebase database.');
    }
});

// 4. Logout Route
app.get('/logout', (req, res) => {
    req.session = null;
    res.redirect("/login");
});

app.use(indexRoutes);
app.use(galleryRoutes);

app.use((req, res, next) => {
    res.status(404).render("error", {
        status: 404,
        title: "Page Not Found",
        message: "The page you are looking for doesn't exist or has been moved."
    });
});

// 2. The 500 Global Error Handler (Server/Code Crashes)
// Express knows this is the global error handler because it takes 4 arguments (err, req, res, next)
app.use((err, req, res, next) => {
    // Log the actual error to Vercel so you can debug it later
    console.error("CRITICAL ERROR:", err.stack);

    // Send a safe, clean message to the user
    res.status(500).render("error", {
        status: 500,
        title: "Internal Server Error",
        message: "Something went wrong on our end. We've logged the issue and are looking into it."
    });
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is up on PORT: ${PORT}`);
    });
}

module.exports = app;