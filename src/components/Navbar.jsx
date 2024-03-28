
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav>
            <div id="navContainer">
                <div>
                    <img src="/assets/image/AloiBank-logo_full-h.png" alt="Logo" id="navLogo" />
                </div>
                <div >
                    <ul id="navItems">
                        <li className="item">
                            <Link to="/"><p>Home</p></Link>
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
                        <li className="item">
                             <Link to="/login"><p>Login</p></Link> 
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
