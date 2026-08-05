    const express = require("express"); //bring express into our project
    const cors = require("cors");
    const app = express();
    const videoRoutes = require("./routes/videoRoutes"); //importing the video routes , video routes is a module that handles the video streaming functionality of the server, it is defined in the routes/videoRoutes.js file
    const statsRoutes = require("./routes/statsRoutes");
    const uploadRoutes = require("./routes/uploadRoutes");//importing the upload routes
    const storageRoutes = require("./routes/storageRoutes");

    app.use(cors());
    app.use(express.json());
    app.use("/api/stats", statsRoutes);
    app.use((req, res, next) => {
        console.log("REQUEST:", req.method, req.url);
        next();
    });
    app.use("/api/video", videoRoutes);//use the video routes for the /api/video endpoint
    // /api/video is for streaming video segments, where :video and :segment are dynamic parameters representing the video name and segment name respectively
    const PORT = 5000; 
    app.use("/api/upload", uploadRoutes);//api/upload is for uploading video segments to the server
    app.use("/api/storage", storageRoutes);//api/storage is for fetching storage statistics from the server

    app.get("/api/health", (req, res) => {
        res.json({
            status: "Server Running",
            project: "EdgeCache",
            version: "1.0",
            developer: "Shravani"
        });
    });

    app.listen(PORT, () => { // from line 9 it is 5000
        console.log(`Server running on http://localhost:${PORT}`);
    });

    // /api/health is for checking the health of the server, it returns a json object with the status, project name, version and developer name
    // app.listen is used to start the server and listen for incoming requests on the specified port (5000 in this case)