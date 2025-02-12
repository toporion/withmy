import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
 
   

    // Load user data from localStorage when the app loads
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    


    const login = (user) => {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user)); // Store user in localStorage
    };

    const logOut = () => {
        setUser(null);
        localStorage.removeItem('user'); // Remove user from localStorage
        localStorage.removeItem('token')
    };

    return (
        <AuthContext.Provider value={{ user, login, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
