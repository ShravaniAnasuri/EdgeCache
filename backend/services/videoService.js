const { exec } = require("child_process"); // Importing the 'exec' function from the 'child_process' module to execute shell commands
const path = require("path"); // Importing the 'path' module for handling file paths

const convertToHLS = (inputVideoPath, outputFolder) => {

    return new Promise((resolve, reject) => {

        const outputPlaylist = path.join(outputFolder, "playlist.m3u8");

        const segmentPattern = path.join(outputFolder, "segment%03d.ts");

        const command = `ffmpeg -i "${inputVideoPath}" -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${segmentPattern}" "${outputPlaylist}"`;

        exec(command, (error, stdout, stderr) => {

            if (error) {
                console.log(stderr);
                reject(error);
            } else {
                resolve();
            }

        });

    });

};

module.exports = {
    convertToHLS
};