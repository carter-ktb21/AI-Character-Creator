import { useState, useEffect, useContext } from "react";
import Header from "../Header";
import axios from "axios";
import { AuthContext } from "../../AuthContext";
import { Link } from "react-router-dom";
import './ViewCharactersPage.css';

const ViewCharactersPage = () => {
    const [characters, setCharacters] = useState([]);
    const { userEmail } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [chosenCharacter, setChosenCharacter] = useState();
    const [editedFields, setEditedFields] = useState({});

    useEffect(() => {
        const getCharacters = async () => {
            try {
                console.log(userEmail);
                const response = await axios.get('https://ai-character-creator-functions.azurewebsites.net/api/GetCharacters?code=fiKiZfg5lVMC5YIxex70I_V5jzC80AIJ_NO-nigzO5kkAzFuWhOsKg%3D%3D', {
                    params: { user: userEmail }
                });
                setCharacters(response.data);
                setLoading(false); // Set loading to false once characters are fetched
                localStorage.setItem("characters", JSON.stringify(response.data)); // Store characters in localStorage
            } catch (error) {
                console.error('Error getting characters:', error);
                setLoading(false); // Handle error by setting loading to false
            }
        };

        if (userEmail) {
            getCharacters(); // Fetch characters if userEmail is available
        }
    }, [userEmail]); // Depend only on userEmail to fetch characters

    const handleDelete = async (characterName, _id) => {
        const characterData = {
            characterName,
            _id
        };
        try {
            const response = await axios.post('https://ai-character-creator-functions.azurewebsites.net/api/DeleteCharacter?code=rqUwXvMM87wsMrM8Q_71t5z9uut3YrchVLb9qtluo5DlAzFulpeJRg%3D%3D', characterData);
            window.location.reload();
        } catch (error) {
            console.error("Error deleting character:", error);
        }
    }

    const handleEdit = async (characterName, _id) => {
        try {
            var modal = document.getElementById("editModal");
            if (modal) {
                modal.style.display = modal.style.display === "block" ? "none" : "block";
            }

            const response = await axios.get('https://ai-character-creator-functions.azurewebsites.net/api/GetCharacter?code=h1l_VtFmnf1aa1bepdS2qp9ugqy2KWMYF150FzBFZxAAAzFu3fm7Sw%3D%3D', {
                params: { characterName, characterID: _id }
            })
            console.log(response.data);
            setChosenCharacter(response.data);

            // Initialize editedFields with the current character data
            const initialEditedFields = {};
            Object.keys(response.data).forEach(key => {
                initialEditedFields[key] = response.data[key];
            });
            setEditedFields(initialEditedFields);
        } catch (error) {
            console.error("Error editing character:", error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Prepare updated character data based on editedFields
            const updatedCharacterData = {
                ...chosenCharacter,
                ...editedFields
            }

            Object.keys(updatedCharacterData).forEach(key => {
                if (Array.isArray(chosenCharacter[key]) && typeof updatedCharacterData[key] === 'string') {
                    updatedCharacterData[key] = updatedCharacterData[key].split(',').map(item => item.trim());
                }
            });

            console.log(updatedCharacterData);
            console.log(updatedCharacterData._id);

            // Send updated character data to backend for saving
            const response = await axios.post('https://ai-character-creator-functions.azurewebsites.net/api/UpdateCharacter?code=NSRoyuXKYvJ9St2Fz5MZV64iCq7gUC2_2i7lwEfsyLKmAzFugWvZ6w%3D%3D', updatedCharacterData);
            console.log("Character updated successfully:", response.data);

            var modal = document.getElementById("editModal");
            if (modal) {
                modal.style.display = modal.style.display === "block" ? "none" : "block";
            }

        } catch (error) {
            console.error("Error updating character:", error);
        }
    }

    const handleChange = (e, field) => {
        let value = e.target.value;

        // Update editedFields state with the new value for the specified field
        setEditedFields({
            ...editedFields,
            [field]: value
        });
    }

    return (
        <div>
            <Header />
            <div style={{ marginLeft: "2%" }}>
                <h2>Characters:</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <ul>
                        {characters.length > 0 ? (
                            characters.map((character) => (
                                <li key={character._id}>
                                    <div style={{ marginBottom: "5%" }}>
                                        {/* Name */}
                                        {character.characterName === "" ? (
                                            <h3>Unnamed Character</h3>
                                        ) : (
                                            <div>
                                                <h3>
                                                    Name: "{character.characterName}"
                                                    <button onClick={() => handleEdit(character.characterName, character._id)} style={{ marginLeft: "1%" }}>Edit</button>
                                                </h3>
                                                <Link to="/characterSandbox" state={{ character }}>
                                                    <button>Character Sandbox</button>
                                                </Link>
                                            </div>
                                        )}

                                        {/* Physical Attributes */}
                                        {character.physicalAttributes.length > 0 && (
                                            <p>
                                                Physical Attributes:{" "}
                                                {character.physicalAttributes.map((attr, index) => (
                                                    <span key={index}>{attr}{index !== character.physicalAttributes.length - 1 ? ', ' : ''}</span>
                                                ))}
                                            </p>
                                        )}

                                        {/* Emotional Attributes */}
                                        {character.emotionalAttributes.length > 0 && (
                                            <p>
                                                Emotional Attributes:{" "}
                                                {character.emotionalAttributes.map((attr, index) => (
                                                    <span key={index}>{attr}{index !== character.emotionalAttributes.length - 1 ? ', ' : ''}</span>
                                                ))}
                                            </p>
                                        )}

                                        {/* Speech Attributes */}
                                        {character.speechAttributes.length > 0 && (
                                            <p>
                                                Speech Attributes:{" "}
                                                {character.speechAttributes.map((attr, index) => (
                                                    <span key={index}>{attr}{index !== character.speechAttributes.length - 1 ? ', ' : ''}</span>
                                                ))}
                                            </p>
                                        )}

                                        {/* Equipment and Items */}
                                        {character.equipAttributes.length > 0 && (
                                            <p>
                                                Equipment & Items:{" "}
                                                {character.equipAttributes.map((attr, index) => (
                                                    <span key={index}>{attr}{index !== character.equipAttributes.length - 1 ? ', ' : ''}</span>
                                                ))}
                                            </p>
                                        )}

                                        {/* Backstory */}
                                        {character.backstory === "" ? (
                                            <p>No Lore :(</p>
                                        ) : (
                                            <p>Backstory: {character.backstory}</p>
                                        )}

                                        <button onClick={() => handleDelete(character.characterName, character._id)}>Delete</button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p>No characters found.</p>
                        )}
                    </ul>
                )}
            </div>

            {/* Modal to edit character details */}
            <div id="editModal" className="modal-filter">
                <div className="modal-container">
                    <form onSubmit={handleSubmit} style={{ width: "100%", height: "100%" }}>
                    <h2 style={{ fontSize: '24px', margin: '5%' }}>Edit Character</h2>
                        {chosenCharacter &&
                            <div className="modal-content">
                                <hr className='modal-line'></hr>
                                <div className="modal-form" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <h3 className="modal-content-h3">
                                        Character Name: {chosenCharacter.characterName}
                                    </h3>
                                    <h4 className="modal-content-h4">For fields with multiple values, separate values with a comma and space (e.g., value1, value2) *Refresh the page to see changes</h4>
                                    {/* Input field for editing character name */}
                                    <label htmlFor="characterName">Character Name:</label>
                                    <input className="input-label" type="text" id="characterName" name="characterName" value={editedFields.characterName || chosenCharacter.characterName} onChange={(e) => handleChange(e, 'characterName')} />

                                    {/* Input field for editing physical attributes */}
                                    <label htmlFor="physicalAttributes">Physical Attributes:</label>
                                    <input type="text" id="physicalAttributes" name="physicalAttributes" value={Array.isArray(editedFields.physicalAttributes) ? editedFields.physicalAttributes.join(', ') : editedFields.physicalAttributes || ''} onChange={(e) => handleChange(e, 'physicalAttributes')} />

                                    {/* Input field for editing emotional attributes */}
                                    <label htmlFor="emotionalAttributes">Emotional Attributes:</label>
                                    <input type="text" id="emotionalAttributes" name="emotionalAttributes" value={Array.isArray(editedFields.emotionalAttributes) ? editedFields.emotionalAttributes.join(', ') : editedFields.emotionalAttributes || ''} onChange={(e) => handleChange(e, 'emotionalAttributes')} />

                                    {/* Input field for editing speech attributes */}
                                    <label htmlFor="speechAttributes">Speech Attributes:</label>
                                    <input type="text" id="speechAttributes" name="speechAttributes" value={Array.isArray(editedFields.speechAttributes) ? editedFields.speechAttributes.join(', ') : editedFields.speechAttributes || ''} onChange={(e) => handleChange(e, 'speechAttributes')} />

                                    {/* Input field for editing equipment and items */}
                                    <label htmlFor="equipAttributes">Equipment & Items:</label>
                                    <input type="text" id="equipAttributes" name="equipAttributes" value={Array.isArray(editedFields.equipAttributes) ? editedFields.equipAttributes.join(', ') : editedFields.equipAttributes || ''} onChange={(e) => handleChange(e, 'equipAttributes')} />

                                    {/* Input field for editing backstory */}
                                    <div className="backstory-input">
                                    <label htmlFor="backstory">Backstory:</label>
                                    <textarea id="backstory" name="backstory" value={editedFields.backstory || ''} onChange={(e) => handleChange(e, 'backstory')} />
                                    </div>
                                </div>
                            </div>
                        }
                        <hr className='modal-line'></hr>
                        <div className="save-button">
                            <input type="submit" value="Save Changes" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ViewCharactersPage