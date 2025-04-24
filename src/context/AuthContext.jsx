import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const token = localStorage.getItem("t");
        if(!token) return null;
        try {
            const decoded = jwtDecode(token);
            return {
                token,
                email: decoded.sub,
                role: decoded.authorities,
                expiresAt: decoded.exp
            };
        } catch (e) {
            console.log("Token invalido", e);
            localStorage.removeItem("t");
            return null;
        }
    });

    const login = (token) => {
        try{
            const decoded = jwtDecode(token);
            localStorage.setItem("t", token);
            localStorage.setItem("r", decoded.authorities);
            setAuth({
                token,
                accesCode: decoded.sub,
                role: decoded.authorrties,
                expiresAt: decoded.exp
            });
        } catch (err) {
            console.error("Error al decodificar el token", err);
            throw err;
        }
    };

    const logout  = () => {
        localStorage.clear();
        setAuth(null);
    }
    
    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);