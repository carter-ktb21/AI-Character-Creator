import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { useContext } from "react";

const Header = () => {
    const { isLoggedIn, logout, userEmail } = useContext(AuthContext);
    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div
                style={{
                    display: "flex", flexDirection: "column", alignItems: "flex-start", backgroundColor: "rgb(2,0,36)",
                    background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(119,35,184,1) 0%, rgba(0,0,0,1) 100%)", width: "100%"
                }}
            >
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <div
                        style={{
                            display: "flex", flexDirection: "column", alignItems: "center", padding: "2%", height: "100%", marginRight: "2%"
                        }}>
                        {/* If user is logged in, logo button goes to home page. Otherwise, it goes to landing page */}
                        <Link to={isLoggedIn ? "/homePage" : "/"}>
                            <img
                                className="header-logo"
                                src="/assets/Anvil.webp" alt="AI Character Forge Logo"
                            />
                        </Link>
                        <h1
                            className="header-font"
                        >
                            AI Character Forge
                        </h1>
                    </div>
                    {isLoggedIn && (
                        <div
                            className="user-profile"
                        >
                            <p>User: {userEmail}</p>
                            <button
                                onClick={logout}
                                style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "2%", paddingBottom: "2%" }}
                            >
                                Logout
                            </button>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header