import { useState } from "react";
import Header from "../Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './CreateCharacterPage.css';

const CreateCharacterPage = () => {
    const [characterName, setCharacterName] = useState("");
    const [physicalAttributes, setPhysicalAttributes] = useState([""]);
    const [emotionalAttributes, setEmotionalAttributes] = useState([""]);
    const [speechAttributes, setSpeechAttributes] = useState([""]);
    const [equipAttributes, setEquipAttributes] = useState([""]);
    const [backstory, setBackstory] = useState("");
    const [hasCharacterBeenCreated, setHasCharacterBeenCreated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = localStorage.getItem("userLoggedIn");
            console.log(characterName + ":\n" + "Physical Attributes: " + physicalAttributes + "\n" +
                "Emotional Attributes: " + emotionalAttributes + "\n" +
                "Speech Attributes (i.e. ways of speaking): " + speechAttributes + "\n" +
                "Equipment Attributes & Items: " + equipAttributes + "\n" +
                "Backstory: " + backstory + "\n" +
                "User: " + user
            );

            const characterData = {
                characterName,
                physicalAttributes,
                emotionalAttributes,
                speechAttributes,
                equipAttributes,
                backstory,
                user
            };

            const response = await axios.post('https://ai-character-creator-functions.azurewebsites.net/api/AddCharacter?code=PQBfceF6t0xs6KL19Rw3JB5d5FZXHa1uXWNnziUm3Q94AzFuJTBlkg%3D%3D', characterData);
            console.log(response.data);

            setHasCharacterBeenCreated(true);
            setIsLoading(true);
            // Wait for 3 seconds before navigating
            setTimeout(() => {
                navigate("/homePage")
            }, 3000);
        } catch (error) {
            console.error("Error creating user:", error);
        }
    }

    // Physical Attributes Labels & Inputs
    const handlePhysAttributeChange = (index, value) => {
        const updatedAttributes = [...physicalAttributes];
        updatedAttributes[index] = value;
        setPhysicalAttributes(updatedAttributes);
    };
    const handlePhysAddAttribute = () => {
        setPhysicalAttributes([...physicalAttributes, ""]);
    };
    const handlePhysRemoveAttribute = (index) => {
        const updatedAttributes = [...physicalAttributes];
        updatedAttributes.splice(index, 1);
        setPhysicalAttributes(updatedAttributes);
    };

    // Emotional Attributes Labels & Inputs
    const handleEmotionalAttributeChange = (index, value) => {
        const updatedAttributes = [...emotionalAttributes];
        updatedAttributes[index] = value;
        setEmotionalAttributes(updatedAttributes);
    };
    const handleEmotionalAddAttribute = () => {
        setEmotionalAttributes([...emotionalAttributes, ""]);
    };
    const handleEmotionalRemoveAttribute = (index) => {
        const updatedAttributes = [...emotionalAttributes];
        updatedAttributes.splice(index, 1);
        setEmotionalAttributes(updatedAttributes);
    };

    // Speech Attributes Labels & Inputs
    const handleSpeechAttributeChange = (index, value) => {
        const updatedAttributes = [...speechAttributes];
        updatedAttributes[index] = value;
        setSpeechAttributes(updatedAttributes);
    };
    const handleSpeechAddAttribute = () => {
        setSpeechAttributes([...speechAttributes, ""]);
    };
    const handleSpeechRemoveAttribute = (index) => {
        const updatedAttributes = [...speechAttributes];
        updatedAttributes.splice(index, 1);
        setSpeechAttributes(updatedAttributes);
    };

    // Equipment % Items Attributes Labels & Inputs
    const handleEquipAttributeChange = (index, value) => {
        const updatedAttributes = [...equipAttributes];
        updatedAttributes[index] = value;
        setEquipAttributes(updatedAttributes);
    };
    const handleEquipAddAttribute = () => {
        setEquipAttributes([...equipAttributes, ""]);
    };
    const handleEquipRemoveAttribute = (index) => {
        const updatedAttributes = [...equipAttributes];
        updatedAttributes.splice(index, 1);
        setEquipAttributes(updatedAttributes);
    };

    return (
        <div>
            <Header />
            <div>
                {!hasCharacterBeenCreated &&
                    <div className="form-container">
                        <br />
                        <form onSubmit={handleSubmit} className="form-container">
                            <label>Character Name</label>
                            <input value={characterName} placeholder="Enter character name" onChange={(e) => setCharacterName(e.target.value)}></input><br />

                            {/* Physical Attributes */}
                            <label>Physical Attributes</label>
                            {physicalAttributes.map((attribute, index) => (
                                <div className="form-group" key={index}>
                                    <input
                                        value={attribute}
                                        placeholder="Enter physical attribute"
                                        onChange={(e) => handlePhysAttributeChange(index, e.target.value)}
                                    />
                                    {index > 0 && (
                                        <button type="button" onClick={() => handlePhysRemoveAttribute(index)}>
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button type="button" onClick={handlePhysAddAttribute}>Add Physical Attribute</button>
                            <br />

                            {/* Emotional Attributes */}
                            <label>Emotional Attributes</label>
                            {emotionalAttributes.map((attribute, index) => (
                                <div className="form-group" key={index}>
                                    <input
                                        value={attribute}
                                        placeholder="Enter emotional attribute"
                                        onChange={(e) => handleEmotionalAttributeChange(index, e.target.value)}
                                    />
                                    {index > 0 && (
                                        <button type="button" onClick={() => handleEmotionalRemoveAttribute(index)}>
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button type="button" onClick={handleEmotionalAddAttribute}>Add Emotional Attribute</button>
                            <br />

                            {/* Speech Attributes */}
                            <label>Speech Attributes (i.e. ways of speaking)</label>
                            {speechAttributes.map((attribute, index) => (
                                <div className="form-group" key={index}>
                                    <input
                                        value={attribute}
                                        placeholder="Enter speech attribute"
                                        onChange={(e) => handleSpeechAttributeChange(index, e.target.value)}
                                    />
                                    {index > 0 && (
                                        <button type="button" onClick={() => handleSpeechRemoveAttribute(index)}>
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button type="button" onClick={handleSpeechAddAttribute}>Add Speech Attribute</button>
                            <br />

                            {/* Equipment Attributes & Items */}
                            <label>Equipment & Items</label>
                            {equipAttributes.map((attribute, index) => (
                                <div className="form-group" key={index}>
                                    <input
                                        value={attribute}
                                        placeholder="Enter equipment attribute"
                                        onChange={(e) => handleEquipAttributeChange(index, e.target.value)}
                                    />
                                    {index > 0 && (
                                        <button type="button" onClick={() => handleEquipRemoveAttribute(index)}>
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button type="button" onClick={handleEquipAddAttribute}>Add Equipment/Item</button>
                            <br />

                            {/* Backstory */}
                            <label>Backstory</label>
                            <textarea value={backstory} placeholder="Enter character backstory..." onChange={(e) => setBackstory(e.target.value)}></textarea><br />
                            <input type="submit" value="Create Character" />
                        </form>
                    </div>
                }
                {hasCharacterBeenCreated &&
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginLeft: "25%", marginRight: "25%" }}>
                    <p>
                        Your character has been created! Go to "View Characters" to play around with them!
                    </p>
                    {isLoading &&
                        <div className="loader" />
                    }
                </div>
                }
            </div>
        </div>
    );
}

export default CreateCharacterPage