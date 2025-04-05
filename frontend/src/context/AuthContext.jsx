

import { createContext, useContext, useEffect, useState } from 'react';
import { loginUser, checkAuthStatus, logOutUser } from '../helpers/api-communicator';

// AuthContext provides: 
// - isLoggedIn (boolean)
// - user (object with name, email) or null
// - login(email, password): Promise
// - signup(name, email, password): Promise
// - logout(): Promise

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user's token is valid when the component mounts
        async function checkStatus() {
            const data = await checkAuthStatus();
            if (data) {
                setUser({ email: data.email, name: data.name });
                setIsLoggedIn(true);
            }
        }
        checkStatus();
    }, []);

    const login = async (email, password) => {
        try {
            const data = await loginUser(email, password);
            if (data) {
                setUser({ email: data.email, name: data.name });
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.error("Login error:", error);
            // Handle login failure (e.g., show an error message)
        }
    };

    const signup = async (name, email, password) => {
        // Signup functionality can be implemented here
    };

    const logout = async () => {
        try {
            await logOutUser();
            setIsLoggedIn(false);
            setUser(null);
            window.location.reload(); // Optionally reload the page after logout
        } catch (error) {
            console.error("Logout error:", error);
            // Handle logout failure (e.g., show an error message)
        }
    };

    const value = {
        user,
        isLoggedIn,
        login,
        logout,
        signup,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);



