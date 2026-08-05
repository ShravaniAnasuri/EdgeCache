import { useEffect, useState } from "react";

import api from "../services/api";

import VideoList from "../components/VideoList";
import VideoPlayer from "../components/VideoPlayer";
import "../styles/Page.css";
import "../styles/Page.css";
function LibraryPage() {

    const [videos, setVideos] = useState([]);

    const [selectedVideo, setSelectedVideo] = useState(null);

    const fetchVideos = async () => {

        try {

            const response = await api.get("/upload/videos");

            setVideos(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchVideos();

    }, []);

    return (

        <div>


            <h1 className="page-title">

                Video Library

            </h1>

            <input

                className="search-box"

                type="text"

                placeholder="Search videos (Module 15)"

                disabled

            />
            <VideoList

                videos={videos}

                onSelectVideo={setSelectedVideo}

            />

            <br />

            {

                selectedVideo && (

                    <VideoPlayer

                        video={selectedVideo}

                    />

                )

            }

        </div>

    );

}

export default LibraryPage;