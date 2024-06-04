import { useState, useContext } from "react";
import Header from "../Header";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

const SignInPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [wasOperationSuccessful, setWasOperationSuccessful] = useState(false);
    const navigate = useNavigate();
    const { logout, login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://ai-character-creator-functions.azurewebsites.net/api/Login?code=M399_UZSb5Fl1qymEWgKhyLCAtpCLE5PchR1rhnr6bivAzFugoO0GA%3D%3D', { email, password });
            console.log(response.data);
            setWasOperationSuccessful(true);
            localStorage.setItem("userLoggedIn", email);
            login();

            // Wait for a second before navigating
            setTimeout(() => {
                navigate("/homePage")
            }, 1000); // 1000 milliseconds = 1 second
        } catch (error) {
            console.error("Error logging in:", error);
        }
    }

    return (
        <div>
            <Header />
            {!wasOperationSuccessful &&
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <br />
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <label>Email</label>
                        <input style={{ fontFamily: "contentFont" }} value={email} placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}></input><br />
                        <label>Password</label>
                        <input style={{ fontFamily: "contentFont" }} type="password" value={password} placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}></input><br />
                        <input style={{ fontFamily: "headerFont", padding: "3%" }} type="submit" />
                    </form>
                </div>
            }
            {wasOperationSuccessful &&
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <p>Success!</p>
                </div>
            }
        </div>
    );
}

export default SignInPage