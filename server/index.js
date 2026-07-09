// const express = require("express");
// const app = express();
// const PORT = 6767;

// const indexRoutes = require("./routes/indexRoutes");

// app.set("view engine", "ejs");
// app.use("/static", express.static("public"));

// app.use(indexRoutes);

// app.listen(PORT || process.env.PORT, process.env.IP, () => {
//     console.log("Server is up on PORT: 6767");
// });

const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 6767;

const indexRoutes = require("./routes/indexRoutes");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static(path.join(__dirname, "public")));

app.use(indexRoutes);

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is up on PORT: ${PORT}`);
    });
}

module.exports = app;

