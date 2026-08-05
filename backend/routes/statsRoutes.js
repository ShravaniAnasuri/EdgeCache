const express = require("express");

const router = express.Router();

const {getCacheStats} = require("../controllers/statsController");

router.get("/", getCacheStats);

module.exports = router;