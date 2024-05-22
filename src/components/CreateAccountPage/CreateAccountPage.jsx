import { useState, useContext } from "react";
import Header from "../Header";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

const CreateAccountPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [wasOperationSuccessful, setWasOperationSuccessful] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { logout, login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://ai-character-creator-functions.azurewebsites.net/api/CreateUser?code=mdSNxP_Lag3aFW96ghplwrW54f28E7mvXidfi9iq6u-BAzFulYbmoA%3D%3D', { email, password });
            console.log(response.data);
            setWasOperationSuccessful(true);

            const response2 = await axios.post('https://ai-character-creator-functions.azurewebsites.net/api/Login?code=M399_UZSb5Fl1qymEWgKhyLCAtpCLE5PchR1rhnr6bivAzFugoO0GA%3D%3D', { email, password });
            console.log(response2.data);
            localStorage.setItem("userLoggedIn", email);
            login();
            setIsLoading(true);

            // Wait for a second before navigating
            setTimeout(() => {
                navigate("/homePage")
            }, 1000);
        } catch (error) {
            console.error("Error creating user:", error);
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
                        <input value={email} placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}></input><br />
                        <label>Create Password</label>
                        <input type="password" value={password} placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}></input><br />
                        <input type="submit" />
                    </form>
                </div>
            }
            {wasOperationSuccessful &&
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <p>Success!</p>
                    {isLoading &&
                        <div className="loader" />
                    }
                </div>
            }
        </div>
    );
}

export default CreateAccountPage