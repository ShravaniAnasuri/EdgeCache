import { useEffect, useState } from "react";

import api from "../services/api";

import DashboardCards from "../components/DashboardCards";
import CacheDashboard from "../components/CacheDashboard";
import CacheGraphs from "../components/CacheGraphs";
import StorageDashboard from "../components/StorageDashboard";
import VideoPlayer from "../components/VideoPlayer";
import "../styles/Page.css";
import "../styles/Page.css";
function DashboardPage() {

    const [stats, setStats] = useState({

        cacheHits: 0,

        cacheMisses: 0,

        totalRequests: 0

    });

    const [serverData, setServerData] = useState(null);

    const [videos, setVideos] = useState([]);

    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {

        const fetchHealth = async () => {

            try {

                const response = await api.get("/health");

                setServerData(response.data);

            }

            catch (error) {

                console.log(error);

            }

        };

        const fetchVideos = async () => {

            try {

                const response = await api.get("/upload/videos");

                setVideos(response.data);

                if (response.data.length > 0) {

                    setSelectedVideo(response.data[0]);

                }

            }

            catch (error) {

                console.log(error);

            }

        };

        fetchHealth();

        fetchVideos();

    }, []);

    return (

        <>
            <h1 className="page-title">

                Cache Dashboard

            </h1>
            <CacheDashboard onStats={setStats} />

            <br />

            <DashboardCards

                stats={stats}

                server={serverData}

            />

            <br />

            <CacheGraphs />

            <br />

            <StorageDashboard />

            <br />

            {

                selectedVideo && (

                    <VideoPlayer

                        video={selectedVideo}

                    />

                )

            }

        </>

    );

}

export default DashboardPage;