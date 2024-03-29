
import { Link } from "react-router-dom";

export default function AsideBar() {
    //get username from local storage
    const username = localStorage.getItem('username');

    //get usertype from local storage
    const userType = localStorage.getItem('userType');

    const handleLogout = () => {
        localStorage.clear(); // Clear local storage
        window.location.href = "/"; // Redirect to home page
    };

    return (
        <div>
            {userType === 'TellerPerson' ? (
                <aside>
                    <div id="asideContainer">
                        <div>
                            <img src="/assets/image/AloiBank-logo_full-h.png" alt="Logo" id="navLogo" />
                        </div>

                        <div >
                            <ul id="asideItems">
                                <li className="item">
                                    <Link to="/adminDashboard"><p>Admin Dashboard</p></Link>
                                </li>
                                <li className="item">
                                    <p>Profile</p>
                                </li>
                                <li className="item">
                                    <p>Account</p>

                                </li>
                                <li className="item">
                                    <p>KYC</p>

                                </li>
                                <li className="item">
                                    <p>Transactions</p>
                                </li>
                                <li className="item">
                                     <Link to="/adminViewUsers"><p>Users</p></Link>
                                </li>

                                <li className="item" onClick={handleLogout}>
                                    <p>Logout</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </aside>
            ) :
                (
                    <aside>
                        <div id="asideContainer">
                            <div>
                                <img src="/assets/image/AloiBank-logo_full-h.png" alt="Logo" id="navLogo" />
                            </div>

                            <div >
                                <ul id="asideItems">
                                    <li className="item">
                                        <p> User Dashboard</p>
                                    </li>
                                    <li className="item">
                                        <p>Profile</p>
                                    </li>
                                    <li className="item">
                                        <p>Account</p>

                                    </li>
                                    <li className="item">
                                        <p>KYC</p>

                                    </li>
                                    <li className="item">
                                        <p>Transactions</p>

                                    </li>
                                    <li className="item" onClick={handleLogout}>
                                        <p>Logout</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </aside>
                )}
        </div>
    )
}
