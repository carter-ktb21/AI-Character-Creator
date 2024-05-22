import { useState } from "react";
import Header from "../Header";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const CreateAccountPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [wasOperationSuccessful, setWasOperationSuccessful] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://ai-character-creator-functions.azurewebsites.net/api/CreateUser?code=mdSNxP_Lag3aFW96ghplwrW54f28E7mvXidfi9iq6u-BAzFulYbmoA%3D%3D', { email, password });
            console.log(response.data);
            setWasOperationSuccessful(true);

            // Wait for a second before navigating
            setTimeout(() => {
                navigate("/homePage")
            }, 1000); // 1000 milliseconds = 1 second
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
                </div>
            }
        </div>
    );
}

export default CreateAccountPage