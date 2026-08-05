const express = require("express");
const router = express.Router();

const {
    streamPlaylist,
    streamSegment// these are required from the videoController.js file, which is located in the controllers folder. The videoController.js file contains the logic for streaming the playlist and segments of the video. The streamPlaylist function is responsible for streaming the playlist.m3u8 file, while the streamSegment function is responsible for streaming the individual video segments.
} = require("../controllers/videoController")

// Route to stream the playlist and segments
router.get("/:video/playlist.m3u8", streamPlaylist);
// Route to stream the video segments
router.get("/:video/:segment", streamSegment);

module.exports = router;
console.log("videoRoutes loaded");