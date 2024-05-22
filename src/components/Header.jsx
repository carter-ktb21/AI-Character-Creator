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
                }}>
                <div
                    style={{
                        display: "flex", flexDirection: "column", alignItems: "center", padding: "1%"
                    }}>
                    {/* If user is logged in, logo button goes to home page. Otherwise, it goes to landing page */}
                    <Link to={isLoggedIn ? "/homePage" : "/"}>
                        <img
                            style={{
                                maxHeight: "80px", maxWidth: "80px"
                            }} src="src\assets\Anvil.webp" alt="AI Character Forge Logo" />
                    </Link>
                    <h1
                        style={{
                            fontSize: "13px"
                        }}>
                        AI Character Forge
                    </h1>
                </div>
            </div>
            {isLoggedIn && (
                <div
                    style={{
                        display: "flex", flexDirection: "column", alignItems: "center", position: "absolute", padding: "2%", marginLeft: "7.5%"
                    }}
                >
                    <p>User: {userEmail}</p>
                    <button onClick={logout}>Logout</button>
                    
                </div>
            )}
        </div>
    );
}

export default Header