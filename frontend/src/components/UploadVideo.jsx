import { useState } from "react";
import api from "../services/api";
import { ClipLoader } from "react-spinners";
import "../styles/Upload.css";

function UploadVideo({ refreshVideos }) {

    const [file, setFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const handleUpload = async () => {

        if (!file) {

            alert("Please choose a video.");

            return;

        }

        const formData = new FormData();

        formData.append("video", file);

        try {

            setLoading(true);

            setMessage("");

            await api.post("/upload", formData);

            setLoading(false);

            setMessage("Video uploaded successfully.");

            refreshVideos();

        }

        catch (error) {

            setLoading(false);

            console.log(error);

            alert("Upload failed.");

        }

    };

    return (

        <div className="upload-card">

            <div className="upload-title">

                Upload New Video

            </div>

            <div className="upload-subtitle">

                Select an MP4 video to convert into HLS format.

            </div>

            <input

                className="upload-input"

                type="file"

                accept=".mp4"

                onChange={(e) => setFile(e.target.files[0])}

            />

            <button

                className="upload-button"

                onClick={handleUpload}

            >

                Upload Video

            </button>

            {loading && (

                <div className="upload-loading">

                    <ClipLoader size={22} />

                </div>

            )}

            {message && (

                <div className="upload-success">

                    {message}

                </div>

            )}

        </div>

    );

}

export default UploadVideo;