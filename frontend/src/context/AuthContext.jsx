import { createContext, useContext, useEffect, useState } from 'react';
import { loginUser, checkAuthStatus } from '../helpers/api-communicator';


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
        const data = await loginUser(email, password);
        if (data) {
            setUser({ email: data.email, name: data.name });
            setIsLoggedIn(true);
        }
    };
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




