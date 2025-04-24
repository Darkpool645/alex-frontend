import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { jwtDecode } from "jwt-decode";

const roleToPath = {
    "ROLE_administrador": "/admin",
    "ROLE_docente": "/teacher",
    "ROLE_estudiante": "/student"
};

const AuthRedirectGuard = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()  => {
        const token = localStorage.getItem("t");
        if (!token) return;

        try {

            const decoded = jwtDecode(token);
            const role = decoded?.authorities;

            if (role && roleToPath[role] && !location.pathname.startsWith(roleToPath[role])) {
                navigate(roleToPath[role])
            }
        } catch (e) {
            console.error("Token invalido", e);
        }
    },[location, navigate]);
    return children;
}

export default AuthRedirectGuard;