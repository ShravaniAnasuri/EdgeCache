import { useEffect, useState } from "react";
import api from "../services/api";

function CacheDashboard({ onStats }) {

    const [stats, setStats] = useState({

        cacheHits: 0,

        cacheMisses: 0,

        totalRequests: 0

    });

    const fetchStats = async () => {

        try {

            const response = await api.get("/stats");

            setStats(response.data);

            if (onStats) {

                onStats(response.data);

            }

        }

        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchStats();

        const interval = setInterval(fetchStats, 2000);

        return () => clearInterval(interval);

    }, []);

    return null;

}

export default CacheDashboard;