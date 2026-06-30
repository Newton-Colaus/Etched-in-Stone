const express = require("express");
const app = express();
const PORT = 6767;

const indexRoutes = require("./routes/indexRoutes");

app.set("view engine", "ejs");
app.use("/static", express.static("public"));

app.use(indexRoutes);

app.listen(PORT || process.env.PORT, process.env.IP, () => {
    console.log("Server is up on PORT: 6767");
});