import { NavLink } from "react-router-dom";

import {
    FaUpload,
    FaChartBar,
    FaVideo,
    FaServer
} from "react-icons/fa";

import "../styles/Sidebar.css";

function Sidebar() {

    return (

        <div className="sidebar">

            <div className="logo">

                EdgeCache

            </div>

            <nav>

                <NavLink
                    to="/"
                    className="nav-link"
                >
                    <FaUpload />

                    <span>

                        Upload

                    </span>

                </NavLink>

                <NavLink
                    to="/dashboard"
                    className="nav-link"
                >
                    <FaChartBar />

                    <span>

                        Dashboard

                    </span>

                </NavLink>

                <NavLink
                    to="/library"
                    className="nav-link"
                >
                    <FaVideo />

                    <span>

                        Video Library

                    </span>

                </NavLink>

                <NavLink
                    to="/status"
                    className="nav-link"
                >
                    <FaServer />

                    <span>

                        Status

                    </span>

                </NavLink>

            </nav>

        </div>

    );

}

export default Sidebar;