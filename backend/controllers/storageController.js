const { getStorageStats } = require("../services/storageService");

exports.getStorage = (req, res) => {

    try {

        const storage = getStorageStats();

        res.json(storage);

    }

    catch (error) {

        res.status(500).json({

            message: "Failed to fetch storage statistics"

        });

    }

};