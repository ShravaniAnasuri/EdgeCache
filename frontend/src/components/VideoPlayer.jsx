import { useEffect, useRef } from "react";
import Hls from "hls.js";
import "../styles/Player.css";

function VideoPlayer({ video }) {

    const videoRef = useRef(null);

    useEffect(() => {

        if (!video) return;

        const videoElement = videoRef.current;

        const videoUrl = `http://localhost:5000/api/video/${video}/playlist.m3u8`;

        console.log("Video selected:", video);
        console.log(videoUrl);

        if (Hls.isSupported()) {

            const hls = new Hls({

                maxBufferLength: 5,
                maxMaxBufferLength: 10,
                backBufferLength: 5,
                maxBufferSize: 10 * 1000 * 1000

            });

            hls.loadSource(videoUrl);

            hls.attachMedia(videoElement);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {

                videoElement.play();

            });

            return () => {

                hls.destroy();

            };

        } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {

            videoElement.src = videoUrl;

            videoElement.addEventListener("loadedmetadata", () => {

                videoElement.play();

            });

        }

    }, [video]);

    return (

        <div className="player-card">
        
            <div className="player-title">
        
                Now Playing
        
            </div>
        
            <div className="player-name">
        
                🎬 {video}
        
            </div>
        
            <video
    
                ref={videoRef}
        
                controls
        
                className="video-player"
        
            />
    
        </div>

    );
}

export default VideoPlayer;