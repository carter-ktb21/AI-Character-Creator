import Header from "../Header";
import { Link } from "react-router-dom";
const HomePage = () => {
    return (
        <div>
            <Header />
            <div 
                style={{
                    display: "flex", flexDirection: "column", alignItems: "center"
                }}>
                <Link to={"/createCharacter"} style={{ margin: "7%", height: "7rem", width: "25rem" }}>
                    <button
                        style={{
                            height: "7rem", width: "25rem", fontFamily: "headerFont", fontSize: "30px"
                        }}>
                        Create Character
                    </button>
                </Link>

                <Link to={"/viewCharacters"} style={{ marginBottom: "7%", height: "7rem", width: "25rem" }}>
                    <button
                        style={{
                            height: "7rem", width: "25rem", fontFamily: "headerFont", fontSize: "30px"
                        }}>
                        View Characters
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default HomePage