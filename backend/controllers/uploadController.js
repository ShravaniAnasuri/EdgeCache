const fs = require("fs");
const path = require("path");
const { convertToHLS } = require("../services/videoService");

exports.uploadVideo = async (req, res) => {

    try {

        const uploadedFile = req.file;

        const videoName = path.parse(uploadedFile.originalname).name;

        const videoFolder = path.join(__dirname, "../../origin", videoName);

        // Create folder if it doesn't exist
        if (!fs.existsSync(videoFolder)) {
            fs.mkdirSync(videoFolder, { recursive: true });
        }

        // Move uploaded file into video folder
        const newVideoPath = path.join(videoFolder, uploadedFile.originalname);
        
        fs.copyFileSync(uploadedFile.path, newVideoPath);
        fs.unlinkSync(uploadedFile.path);

        // Convert video to HLS
        await convertToHLS(newVideoPath, videoFolder);

        res.status(200).json({
            message: "Video Uploaded and Converted Successfully",
            video: videoName
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Video Conversion Failed"
        });

    }

};


exports.getVideos = (req, res) => {

    const originPath = path.join(__dirname, "../../origin");

    try {

        const videos = fs.readdirSync(originPath).filter(item => {

            return fs.statSync(path.join(originPath, item)).isDirectory();

        });

        res.json(videos);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Unable to read videos"
        });

    }

};