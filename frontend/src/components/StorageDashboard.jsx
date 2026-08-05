import { useEffect, useState } from "react";
import api from "../services/api"; // Importing the api service to make HTTP requests to the backend
import "../styles/Storage.css"; 

function StorageDashboard() {

    const [storage, setStorage] = useState({

        originStorage: "0 MB",

        cacheStorage: "0 MB",

        totalVideos: 0,

        cachedSegments: 0,

        cacheUtilization: 0

    });

    const fetchStorage = async () => {

        try {

            const response = await api.get("/storage");

            setStorage(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchStorage();

        const interval = setInterval(() => {

            fetchStorage();

        }, 2000);

        return () => clearInterval(interval);

    }, []);
    return (

        <div className="storage-card">

            <div className="storage-title">

                Storage Dashboard

            </div>

            <div className="storage-grid">

                <div className="storage-box">

                    <div className="storage-label">

                        Origin Storage

                    </div>

                    <div className="storage-value">

                        {storage.originStorage}

                    </div>

                </div>

                <div className="storage-box">

                    <div className="storage-label">

                        Cache Storage

                    </div>

                    <div className="storage-value">

                        {storage.cacheStorage}

                    </div>

                </div>

                <div className="storage-box">

                    <div className="storage-label">

                        Total Videos

                    </div>

                    <div className="storage-value">

                        {storage.totalVideos}

                    </div>

                </div>

                <div className="storage-box">

                    <div className="storage-label">

                        Cached Segments

                    </div>

                    <div className="storage-value">

                        {storage.cachedSegments}

                    </div>

                </div>

                <div className="storage-box">
                    <div className="storage-label">
                        Cache Utilization
                    </div>
                    <div className="storage-value">
                        {storage.cacheUtilization}%
                    </div>
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{                            
                                width: `${storage.cacheUtilization}%`                            
                            }}                        
                        />
                    </div>
                </div>
                
            </div>

        </div>

    );
}

export default StorageDashboard;