import "../styles/VideoCard.css";
import { FaPlayCircle } from "react-icons/fa";

function VideoList({ videos, onSelectVideo }) {

    return (

        <div>

            <h2>Available Videos</h2>

            <div className="video-grid">

                {videos.map((video) => (

                    <div
                        className="video-card"
                        key={video}
                    >

                        <div className="video-name">

                            {video}

                        </div>

                        <button

                            className="play-button"

                            onClick={() => onSelectVideo(video)}

                        >

                            <FaPlayCircle />

                            {" "}Play

                        </button>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default VideoList;