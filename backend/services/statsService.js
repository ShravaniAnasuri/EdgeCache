let cacheHits = 0;
let cacheMisses = 0;
function recordHit() {
    cacheHits++;
    console.log("Current Hits:", cacheHits);
}
function recordMiss() {
    cacheMisses++;
    console.log("Current Misses:", cacheMisses);
}
function getStats() {

    const total = cacheHits + cacheMisses;

    return {

        cacheHits,

        cacheMisses,

        totalRequests: total,

        hitRatio:
            total === 0
                ? 0
                : ((cacheHits / total) * 100).toFixed(2)

    };

}

module.exports = {

    recordHit,
    recordMiss,
    getStats

};