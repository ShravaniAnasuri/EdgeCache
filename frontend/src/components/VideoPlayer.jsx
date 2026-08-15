import { useEffect, useRef } from "react";

import { useVideo } from "../context/VideoContext";

import "../styles/Player.css";


function VideoPlayer({ video }) {

    const videoRef = useRef(null);

    const {
        currentTime,
        setCurrentTime
    } = useVideo();


    const getVideoName = () => {

        if (typeof video === "string") {

            return video;

        }

        return (
            video?.name ||
            video?.videoName ||
            video?.filename ||
            video?.fileName ||
            video?.title ||
            video?.video ||
            video?.id ||
            ""
        );

    };


    const videoName = getVideoName();


    const videoUrl =
        `http://localhost:5000/api/video/${videoName}/playlist.m3u8`;


    useEffect(() => {

        const player = videoRef.current;

        if (!player) {

            return;

        }


        const restorePosition = () => {

            if (currentTime > 0) {

                player.currentTime = currentTime;

            }

        };


        player.addEventListener(
            "loadedmetadata",
            restorePosition
        );


        return () => {

            player.removeEventListener(
                "loadedmetadata",
                restorePosition
            );

        };

    }, [videoName]);


    const handleTimeUpdate = () => {

        const player = videoRef.current;

        if (!player) {

            return;

        }

        setCurrentTime(player.currentTime);

    };


    return (

        <div className="player-card">

            <div className="player-title">

                Now Playing

            </div>


            <div className="player-name">

                {videoName}

            </div>


            <video

                ref={videoRef}

                className="video-player"

                controls

                onTimeUpdate={handleTimeUpdate}

                src={videoUrl}

            />

        </div>

    );

}


export default VideoPlayer;