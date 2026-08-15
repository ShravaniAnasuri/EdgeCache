import "../styles/VideoCard.css";
import { FaPlayCircle } from "react-icons/fa";
import "../styles/VideoList.css";

function VideoList({ videos, onSelectVideo }) {

    return (

        <div className="video-library">

            <h2 className="library-heading">

                Available Videos

            </h2>

            <div className="video-grid">

                {videos.map((video, index) => {

                    const videoName =
                        typeof video === "string"
                            ? video
                            : (
                                video.name ||
                                video.videoName ||
                                video.filename ||
                                video.fileName ||
                                video.title ||
                                video.video ||
                                `Video ${index + 1}`
                            );

                    return (

                        <div
                            className="video-card"
                            key={videoName || index}
                        >

                            <div className="video-card-title">

                                {videoName}

                            </div>

                            <button
                                className="play-button"
                                onClick={() => onSelectVideo(video)}
                            >

                                <FaPlayCircle />

                                &nbsp;

                                Play

                            </button>

                        </div>

                    );

                })}

            </div>

        </div>

    );

}

export default VideoList;