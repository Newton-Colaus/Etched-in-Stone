const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 6767;
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");

dotenv.config();

connectDB();

const indexRoutes = require("./routes/indexRoutes");
const galleryRoutes = require("./routes/gallery.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use(indexRoutes);
app.use(galleryRoutes);

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is up on PORT: ${PORT}`);
    });
}

module.exports = app;