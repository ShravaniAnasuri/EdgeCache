import { useEffect, useState } from "react";

import { useVideo } from "../context/VideoContext";

import api from "../services/api";

import VideoList from "../components/VideoList";

import "../styles/Page.css";

function LibraryPage() {

    const [videos, setVideos] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");

    const [sortOrder, setSortOrder] = useState("name-asc");

    const { selectedVideo, setSelectedVideo } = useVideo();

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

    const getVideoName = (video) => {

        if (typeof video === "string") {

            return video;

        }

        return String(

            video.name ||

            video.videoName ||

            video.filename ||

            video.fileName ||

            video.title ||

            video.video ||

            video.id ||

            ""

        );
    };

    const filteredVideos = videos.filter((video) => {

        const search = searchTerm
            .trim()
            .toLowerCase();

        if (search === "") {

            return true;
            
        }

        const videoName = getVideoName(video)
            .trim()
            .toLowerCase();

        return videoName.includes(search);

    });

    const sortedVideos = [...filteredVideos].sort(

        (a, b) => {

            const nameA = getVideoName(a).toLowerCase();

            const nameB = getVideoName(b).toLowerCase();

            if (sortOrder === "name-desc") {

                return nameB.localeCompare(nameA);

            }

            return nameA.localeCompare(nameB);

        }

    );

    const clearSearch = () => {

        setSearchTerm("");

    };

    return (

        <div>

            <h1 className="page-title">

                Video Library

            </h1>

            <div className="library-toolbar">

                <input

                    className="search-box"

                    type="text"

                    placeholder="Search videos..."

                    value={searchTerm}

                    onChange={(event) =>

                        setSearchTerm(event.target.value)

                    }

                />

                <button

                    className="clear-button"

                    onClick={clearSearch}

                >

                    Clear

                </button>

                <select

                    className="sort-select"

                    value={sortOrder}

                    onChange={(event) =>

                        setSortOrder(event.target.value)

                    }

                >

                    <option value="name-asc">

                        Name: A → Z

                    </option>

                    <option value="name-desc">

                        Name: Z → A

                    </option>

                </select>

                <span className="video-count">

                    {sortedVideos.length} videos

                </span>

            </div>

            {sortedVideos.length > 0 ? (

                <VideoList
                    videos={sortedVideos}
                    onSelectVideo={setSelectedVideo}
                />

            ) : (

                <div className="empty-library">

                    <h2>

                        No videos found

                    </h2>

                    <p>

                        Try a different search term.

                    </p>

                </div>

            )}

            <br />

        </div>

    );

}

export default LibraryPage;