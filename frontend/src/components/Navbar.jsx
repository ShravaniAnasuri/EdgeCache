import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

import "../styles/Navbar.css";

function Navbar() {

    return (

        <div className="navbar">

            <div className="navbar-title">

                EdgeCache CDN Management

            </div>

            <div className="navbar-search">

                <FaSearch />

                <input
                    type="text"
                    placeholder="Search videos..."
                />

            </div>

            <div className="navbar-right">

                <div className="server-status">

                    🟢 Server Running

                </div>

                <FaBell className="nav-icon" />

                <FaUserCircle className="nav-icon avatar" />

            </div>

        </div>

    );

}

export default Navbar;