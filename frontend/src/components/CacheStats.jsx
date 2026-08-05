import { useEffect, useState } from "react";
import api from "../services/api";

function CacheStats() {

    const [stats, setStats] = useState(null);

    const fetchStats = async () => {

        const response = await api.get("/stats");

        setStats(response.data);

    };

    useEffect(() => {

        fetchStats();

        const interval = setInterval(fetchStats, 2000);

        return () => clearInterval(interval);

    }, []);

    if (!stats) return <p>Loading Cache Statistics...</p>;

    return (

        <div
            style={{
                border: "1px solid gray",
                padding: "20px",
                marginTop: "20px"
            }}
        >

            <h2>Edge Cache Statistics</h2>

            <p>Cache Hits : {stats.cacheHits}</p>

            <p>Cache Misses : {stats.cacheMisses}</p>

            <p>Total Requests : {stats.totalRequests}</p>

            <p>Hit Ratio : {stats.hitRatio}%</p>

        </div>

    );

}

export default CacheStats;