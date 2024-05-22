import { Link } from "react-router-dom";
import Header from "../Header";

const LandingPage = () => {
    return (
        <div>
            <Header />
            <div
                style={{
                    display: "flex", flexDirection: "column", alignItems: "center"
                }}>
                <Link to={"/signIn"} style={{ margin: "7%", height: "7rem", width: "25rem" }}>
                    <button
                        style={{
                            height: "7rem", width: "25rem"
                        }}>
                        Sign In
                    </button>
                </Link>

                <Link to={"/createAccount"} style={{ height: "7rem", width: "25rem" }}>
                    <button
                        style={{
                            height: "7rem", width: "25rem"
                        }}>
                        Create Account
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default LandingPage;