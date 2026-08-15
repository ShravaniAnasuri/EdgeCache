import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Analytics.css";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function CacheGraphs() {

    const [stats, setStats] = useState({
        cacheHits: 0,
        cacheMisses: 0,
        totalRequests: 0,
        hitRatio: 0
    });

    const fetchStats = async () => {

        try {

            const response = await api.get("/stats");

            setStats(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchStats();

        const interval = setInterval(() => {

            fetchStats();

        }, 2000);

        return () => clearInterval(interval);

    }, []);

    const barData = {
        labels: ["Cache Hits", "Cache Misses"],
        datasets: [
            {
                label: "Requests",
                data: [
                    stats.cacheHits,
                    stats.cacheMisses
                ]
            }
        ]
    };

    return (

        <div className="analytics-card">

            <div className="analytics-title">

                Analytics Dashboard

            </div>

            <div className="graph-container">

                <div
                    style={{
                        width: "700px",
                        height: "320px",
                        margin: "0 auto"
                    }}
                >

                    <Bar
                        data={barData}
                        redraw={true}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            animation: false
                        }}
                    />
                </div>

            </div>

        </div>

    );

}

export default CacheGraphs;