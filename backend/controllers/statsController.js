const { getStats } = require("../services/statsService");

exports.getCacheStats = (req, res) => {

    res.json(getStats());

};