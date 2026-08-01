const express = require("express");
const app = express();
const router = express.Router();

router.get("/", (req, res) => {
    res.render("home2");
});

router.get("/services", (req, res) => {
    res.render("services2");
});

module.exports = router;