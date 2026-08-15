import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import { Outlet } from "react-router-dom";

import { useVideo } from "../context/VideoContext";

import VideoPlayer from "./VideoPlayer";

import "../styles/Layout.css";

function Layout() {

    const {
        selectedVideo
    } = useVideo();

    return (

        <div className="layout">

            <Sidebar />

            <div className="main-area">

                <Navbar />

                <div className="page-content">

                    <Outlet />

                </div>

                {selectedVideo && (

                    <div className="persistent-player">

                        <VideoPlayer
                            video={selectedVideo}
                        />

                    </div>

                )}

            </div>

        </div>

    );

}

export default Layout;