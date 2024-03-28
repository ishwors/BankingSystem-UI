import React from "react";

//import { Link } from "react-router-dom";

import "./navbar.css";

export default function Navbar() {
    return (
        <nav>
            <div id="navContainer">
                <div>
                    <img src="/images/icons/AloiBank-icon_full-h.png" alt="Logo" id="navLogo" />
                </div>
                <div >
                    <ul id="navItems">
                        <li className="item">
                            <p>Home</p>
                            {/*  <Link to="/"><i class="fa-solid fa-house fa-xl" style={{ color: "#ffffff", }}></i></Link> */}
                        </li>
                        <li className="item">
                            <p>Team</p>
                            {/* <Link to="/search"><i class="fa-solid fa-magnifying-glass fa-xl" style={{ color: "#ffffff", }}></i></Link> */}
                        </li>
                        <li className="item">
                            <p>Products</p>
                            {/* <Link to="/search"><i class="fa-solid fa-magnifying-glass fa-xl" style={{ color: "#ffffff", }}></i></Link> */}
                        </li>
                        <li className="item">
                            <p>Clients</p>
                            {/* <Link to="/search"><i class="fa-solid fa-magnifying-glass fa-xl" style={{ color: "#ffffff", }}></i></Link> */}
                        </li>
                        <li className="item">
                            <p>Career</p>
                            {/* <Link to="/search"><i class="fa-solid fa-magnifying-glass fa-xl" style={{ color: "#ffffff", }}></i></Link> */}
                        </li>
                        <li className="item">
                            <p>Blog</p>
                            {/* <Link to="/search"><i class="fa-solid fa-magnifying-glass fa-xl" style={{ color: "#ffffff", }}></i></Link> */}
                        </li>
                        <li className="item">
                            <p>Contacts</p>
                            {/* <Link to="/search"><i class="fa-solid fa-magnifying-glass fa-xl" style={{ color: "#ffffff", }}></i></Link> */}
                        </li>
                    </ul>
                </div>
                <div>
                    <p>Testimonials</p>
                </div>
            </div>
        </nav>
    )
}
