const path = require("path");
const fs = require("fs");

const { getSegment } = require("../services/cacheService");


exports.streamSegment = (req, res) => { // Controller function to handle streaming of video segments
    try {
        const { video, segment } = req.params;

        const result = getSegment(video, segment);

        res.sendFile(result.file);

    } catch (err) {
        res.status(404).json({
            message: err.message
        });
    }
};

exports.streamPlaylist = (req, res) => {

    try {

        const { video } = req.params;

        const playlistPath = path.join(
            __dirname,
            "../origin",
            video,
            "playlist.m3u8"
        );

        if (!fs.existsSync(playlistPath)) {

            return res.status(404).json({
                message: "Playlist not found"
            });

        }

        res.sendFile(playlistPath);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
console.log("videoController loaded");