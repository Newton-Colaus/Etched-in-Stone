const express = require("express");
const app = express();
const router = express.Router();

router.get("/", (req, res) => {
    res.render("home");
});

router.get("/services", (req, res) => {
    res.render("services");
});

module.exports = router;