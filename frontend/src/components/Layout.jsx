import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import { Outlet } from "react-router-dom";

import "../styles/Layout.css";

function Layout() {

    return (

        <div className="layout">

            <Sidebar />

            <div className="main-area">

                <Navbar />

                <div className="page-content">

                    <Outlet />

                </div>

            </div>

        </div>

    );

}

export default Layout;