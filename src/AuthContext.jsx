// AuthContext.js

import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Initial state is false
    const [userEmail, setUserEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserEmail = localStorage.getItem("userLoggedIn");
        if (storedUserEmail) {
            setIsLoggedIn(true);
            setUserEmail(storedUserEmail);
        } else {
            setIsLoggedIn(false);
            setUserEmail("");
        }
    }, [])

    const login = () => {
        setIsLoggedIn(true); // Set isLoggedIn to true
        // You can also save authentication token or user data in localStorage or cookies here
        setUserEmail(localStorage.getItem("userLoggedIn"));
    };

    const logout = () => {
        setIsLoggedIn(false); // Set isLoggedIn to false
        setUserEmail("");
        localStorage.removeItem("userLoggedIn"); // Clear localStorage
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, userEmail }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
