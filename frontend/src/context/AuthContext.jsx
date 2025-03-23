import { createContext, useContext, useEffect, useState } from 'react';


// AuthContext provides: 
// - isLoggedIn (boolean)
// - user (object with name, email) or null
// - login(email, password): Promise
// - signup(name, email, password): Promise
// - logout(): Promise


export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    useEffect(() => {
        // fetch if the user's cookies are valid then skip login.

    }, []);

    const login = async (email, password) => {};
    const signup = async (name, email, password) => {};
    const logout = async () => {};

    const value = {
        user,
        isLoggedIn,
        login,
        logout,
        signup,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth =  () => useContext(AuthContext);




