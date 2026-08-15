const express = require("express");
const multer = require("multer"); // multer is a middleware for handling multipart/form-data, which is primarily used for uploading files. It makes it easy to handle file uploads in Node.js applications. In this code, multer is used to handle video file uploads to the server.
const path = require("path");

const {
    uploadVideo,
    getVideos
} = require("../controllers/uploadController");

const router = express.Router();

const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        cb(null, path.join(__dirname, "../origin"));

    },

    filename: function (req, file, cb) {

        cb(null, file.originalname);

    }

});

const upload = multer({ storage });

router.post("/", upload.single("video"), uploadVideo);

router.get("/videos", getVideos);

module.exports = router;