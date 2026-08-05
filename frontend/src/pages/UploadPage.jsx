import { useEffect, useState } from "react";

import api from "../services/api";

import UploadVideo from "../components/UploadVideo";
import "../styles/Page.css";
import "../styles/Page.css";
function UploadPage() {

    const [videos, setVideos] = useState([]);

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

                Admin Upload

            </h1>

            <UploadVideo

                refreshVideos={fetchVideos}

            />

            <br />

            <h3>

                Uploaded Videos

            </h3>

            <p>

                Total Videos : {videos.length}

            </p>

        </div>

    );

}

export default UploadPage;