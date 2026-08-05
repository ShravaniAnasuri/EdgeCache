const fs = require("fs");
const path = require("path");

const MAX_CACHE_SEGMENTS = 20;

function checkCacheLimit(cacheFolder) {

    if (!fs.existsSync(cacheFolder)) {
        return;
    }

    const files = fs.readdirSync(cacheFolder); // readdirSync reads the contents of the cache folder and returns an array of file names present in that folder.

    if (files.length < MAX_CACHE_SEGMENTS) {
        return;
    }

    const fileStats = files.map(file => {

        const filePath = path.join(cacheFolder, file);

        const stats = fs.statSync(filePath);

        return {

            file,

            filePath,

            lastAccess: stats.atimeMs //atimeMs is a value that represents the last access time of the file in milliseconds since the Unix epoch. It indicates when the file was last read or accessed.

        };

    });

    fileStats.sort((a, b) => a.lastAccess - b.lastAccess); // we subtract the last access time of file b from that of file a. If the result is negative, it means that file a was accessed before file b, and it will be placed before file b in the sorted array. If the result is positive, it means that file a was accessed after file b, and it will be placed after file b in the sorted array. If the result is zero, it means that both files were accessed at the same time, and their order will remain unchanged.
    // use of fileStats.sort((a, b) => a.lastAccess - b.lastAccess) is to sort the array of file statistics based on the last access time of each file. This allows us to identify the oldest accessed file in the cache folder, which can then be removed if the cache limit is exceeded.
    const oldestFile = fileStats[0];

    console.log("CACHE FULL");
    console.log("Removing:", oldestFile.file);

    fs.unlinkSync(oldestFile.filePath);

}

module.exports = {

    checkCacheLimit

};