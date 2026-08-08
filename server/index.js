const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 6767;
const dotenv = require("dotenv");
// const connectDB = require("./config/db.js");
const { connectDB } = require("./config/db.js");

dotenv.config();

connectDB();

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