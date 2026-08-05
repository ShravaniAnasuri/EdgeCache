const express = require("express");

const router = express.Router();

const {
    getStorage // getStorage is a function that handles the GET request to the root endpoint ("/") of the storage route. It is responsible for fetching and returning storage statistics.
} = require("../controllers/storageController");

router.get("/", getStorage);

module.exports = router;