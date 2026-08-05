import "./../styles/Dashboard.css";

import { FaServer } from "react-icons/fa";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { MdError } from "react-icons/md";
import { FaChartLine } from "react-icons/fa";

function DashboardCards({ stats, server }) { // DashboardCards component to display server and cache statistics

    return (

        <div className="dashboard-cards">

            <div className="dashboard-card">

                <FaServer className="dashboard-icon"/>

                <div className="dashboard-title">

                    Server Status

                </div>

                <div className="dashboard-value">

                    {server?.status || "Loading..."}

                </div>

            </div>

            <div className="dashboard-card">

                <BsFillLightningChargeFill
                    className="dashboard-icon"
                />

                <div className="dashboard-title">

                    Cache Hits

                </div>

                <div className="dashboard-value">

                    {stats.cacheHits}

                </div>

            </div>

            <div className="dashboard-card">

                <MdError className="dashboard-icon"/>

                <div className="dashboard-title">

                    Cache Misses

                </div>

                <div className="dashboard-value">

                    {stats.cacheMisses}

                </div>

            </div>

            <div className="dashboard-card">

                <FaChartLine className="dashboard-icon"/>

                <div className="dashboard-title">

                    Total Requests

                </div>

                <div className="dashboard-value">

                    {stats.totalRequests}

                </div>

            </div>

        </div>

    );

}

export default DashboardCards;