const fs = require("fs");
const path = require("path");

const { checkCacheLimit } = require("./lruService");

const {
    recordHit,
    recordMiss
} = require("./statsService");

function getSegment(video, segment) {

    const cacheFolder = path.join(__dirname, "../../cache", video);

    const originFolder = path.join(__dirname, "../../origin", video);

    const cacheFile = path.join(cacheFolder, segment);

    const originFile = path.join(originFolder, segment);

    console.log("\n========== CACHE DEBUG ==========");
    console.log("Video:", video);
    console.log("Segment:", segment);
    console.log("Origin Folder:", originFolder);
    console.log("Origin File:", originFile);
    console.log("Cache Folder:", cacheFolder);
    console.log("Cache File:", cacheFile);
    console.log("Origin Exists:", fs.existsSync(originFile));
    console.log("Cache Exists:", fs.existsSync(cacheFile));
    console.log("=================================\n");

    // Create cache folder if it doesn't exist
    if (!fs.existsSync(cacheFolder)) {
        fs.mkdirSync(cacheFolder, { recursive: true });
    }
    //heart of the CDN simulation. 
    // CACHE HIT
    if (fs.existsSync(cacheFile)) {

        console.log("CACHE HIT:", segment);

        recordHit();
        console.log("Hit recorded");
        return {
            hit: true,
            file: cacheFile
        };
    }

    // CACHE MISS
    console.log("CACHE MISS:", segment);

    recordMiss();

    if (!fs.existsSync(originFile)) {
        throw new Error("Dear User, Segment not found");
    }

    // Check cache size before adding new segment
    checkCacheLimit(cacheFolder);

    // Copy from Origin to Cache
    fs.copyFileSync(originFile, cacheFile);

    console.log("Copied from Origin to Cache");

    return {
        hit: false,
        file: cacheFile
    };

}

module.exports = {
    getSegment
};