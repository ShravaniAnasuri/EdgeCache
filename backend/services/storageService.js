const fs = require("fs"); // Importing the 'fs' module to work with the file system
const path = require("path"); // Importing the 'path' module to work with file and directory paths

function folderSize(folderPath) {

    let total = 0;

    if (!fs.existsSync(folderPath)) {

        return 0;

    }

    const files = fs.readdirSync(folderPath);

    files.forEach(file => {

        const current = path.join(folderPath, file);

        const stats = fs.statSync(current);

        if (stats.isDirectory()) {

            total += folderSize(current);

        }

        else {

            total += stats.size;

        }

    });

    return total;

}

function formatBytes(bytes) { // Function to format bytes into a human-readable string

    if (bytes < 1024) {

        return bytes + " Bytes";

    }

    if (bytes < 1024 * 1024) {

        return (bytes / 1024).toFixed(2) + " KB";

    }

    if (bytes < 1024 * 1024 * 1024) {

        return (bytes / (1024 * 1024)).toFixed(2) + " MB";

    }

    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";

}

function countVideos(originFolder) { //

    if (!fs.existsSync(originFolder)) {

        return 0;

    }

    return fs.readdirSync(originFolder).length;

}

function countSegments(cacheFolder) {

    if (!fs.existsSync(cacheFolder)) {

        return 0;

    }

    let count = 0;

    const videos = fs.readdirSync(cacheFolder);

    videos.forEach(video => {

        const folder = path.join(cacheFolder, video);

        if (fs.statSync(folder).isDirectory()) {

            count += fs.readdirSync(folder).length;

        }

    });

    return count;

}

function getStorageStats() {

    const originFolder = path.join(__dirname, "../../origin");

    const cacheFolder = path.join(__dirname, "../../cache");

    const originSize = folderSize(originFolder);

    const cacheSize = folderSize(cacheFolder);

    const cachedSegments = countSegments(cacheFolder);

    const MAX_CACHE_SEGMENTS = 20;
    
    return {
    
        originStorage: formatBytes(originSize),
    
        cacheStorage: formatBytes(cacheSize),
    
        totalVideos: countVideos(originFolder),
    
        cachedSegments,
    
        cacheUtilization:
    
            ((cachedSegments / MAX_CACHE_SEGMENTS) * 100).toFixed(0)
    
    };
}

module.exports = {

    getStorageStats

};