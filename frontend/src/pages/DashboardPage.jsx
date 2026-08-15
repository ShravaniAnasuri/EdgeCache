import { useEffect, useState } from "react";

import api from "../services/api";

import DashboardCards from "../components/DashboardCards";
import CacheDashboard from "../components/CacheDashboard";
import CacheGraphs from "../components/CacheGraphs";
import StorageDashboard from "../components/StorageDashboard";
import "../styles/Page.css";

import { useVideo } from "../context/VideoContext";


function DashboardPage() {

    const [stats, setStats] = useState({

        cacheHits: 0,

        cacheMisses: 0,

        totalRequests: 0

    });

    const [serverData, setServerData] = useState(null);

    const { selectedVideo } = useVideo();


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

        fetchHealth();

    }, []);


    return (

        <>

            <h1 className="page-title">

                Cache Dashboard

            </h1>


            <CacheDashboard

                onStats={setStats}

            />


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
        </>

    );

}


export default DashboardPage;