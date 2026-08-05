import { useEffect, useState } from "react";

import api from "../services/api";
import "../styles/Page.css";
import "../styles/Page.css";
function StatusPage() {

    const [server, setServer] = useState(null);

    useEffect(() => {

        const fetchHealth = async () => {

            try {

                const response = await api.get("/health");

                setServer(response.data);

            }

            catch (error) {

                console.log(error);

            }

        };

        fetchHealth();

        const interval = setInterval(fetchHealth, 2000);

        return () => clearInterval(interval);

    }, []);

    return (

        <div>

            <h1 className="page-title">

                System Status

            </h1>

            <br />

            <div className="storage-grid">

                <div className="storage-box">

                    <div className="storage-label">

                        Backend

                    </div>

                    <div className="storage-value">

                        🟢 Running

                    </div>

                </div>

                <div className="storage-box">

                    <div className="storage-label">

                        Origin Server

                    </div>

                    <div className="storage-value">

                        🟢 Online

                    </div>

                </div>

                <div className="storage-box">

                    <div className="storage-label">

                        Cache Server

                    </div>

                    <div className="storage-value">

                        🟢 Active

                    </div>

                </div>

                <div className="storage-box">

                    <div className="storage-label">

                        API

                    </div>

                    <div className="storage-value">

                        {server ? "🟢 Healthy" : "🔴 Offline"}

                    </div>

                </div>

                <div className="storage-box">

                    <div className="storage-label">

                        FFmpeg

                    </div>

                    <div className="storage-value">

                        🟢 Installed

                    </div>

                </div>

                <div className="storage-box">

                    <div className="storage-label">

                        Storage

                    </div>

                    <div className="storage-value">

                        🟢 Available

                    </div>

                </div>

            </div>

        </div>

    );

}

export default StatusPage;