import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { useContext } from "react";

const Header = () => {
    const { isLoggedIn, logout, userEmail } = useContext(AuthContext);
    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div
                style={{
                    display: "flex", flexDirection: "column", justifyContent: "center", backgroundColor: "rgb(2,0,36)",
                    background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(119,35,184,1) 0%, rgba(0,0,0,1) 100%)", width: "100%", height: "100%"
                }}
            >
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%" }}>
                    <div
                        style={{
                            display: "flex", flexDirection: "column", alignItems: "center", height: "100%", paddingLeft: ".5%", paddingRight: "1%"
                        }}>
                        <img
                            className="header-logo"
                            src="/assets/Anvil.webp" alt="AI Character Forge Logo"
                            style={{ marginBottom: "0.5rem" }}
                        />
                        <h1 className="header-font" style={{ margin: 0 }}>
                            AI Character Forge
                        </h1>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
                        <Link to={isLoggedIn ? "/homePage" : "/"}>
                            <img
                                className="home-logo"
                                src="/Home-icon.png" alt="Home Button"
                                style={{ marginBottom: "0.5rem" }}
                            />
                        </Link>
                        <label className="header-font" style={{ fontFamily: "headerFont", margin: 0 }}>Home Page</label>
                    </div>
                    {isLoggedIn ? (
                        <div
                            className="user-profile"
                            style={{ alignItems: "flex-end", width: "100%" }}
                        >
                            <p style={{ fontFamily: "headerFont", textShadow: "2px 2px 2px black" }}>User: {userEmail}</p>
                            <button
                                onClick={logout}
                                style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "2%", paddingBottom: "2%", fontFamily: "headerFont", fontWeight: "bold" }}
                            >
                                Logout
                            </button>

                        </div>
                    ):
                    <div className="user-profile"
                    style={{ alignItems: "flex-end", width: "100%" }}>
                        <p style={{ visibility: "hidden", fontFamily: "headerFont", textShadow: "2px 2px 2px black" }}>User: {userEmail}</p>
                        <button
                                onClick={logout}
                                style={{ visibility: "hidden", paddingLeft: "5%", paddingRight: "5%", paddingTop: "2%", paddingBottom: "2%", fontFamily: "headerFont", fontWeight: "bold" }}
                            >
                                Logout
                            </button>
                    </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Header