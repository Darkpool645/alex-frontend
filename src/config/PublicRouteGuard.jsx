import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const roleToPath = {
    "ROLE_administrador": "/admin",
    "ROLE_docente": "/teacher",
    "ROLE_estudiante": "/student"
};

const PublicRouteGuard = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("t");
        if (!token) return;

        try{
            const decoded = jwtDecode(token);
            const role = decoded?.authorities;
            if (role && roleToPath[role]) {
                navigate(roleToPath[role]);
            }
        } catch (err) {
            console.error("Token invalido:", err);
        }
    }, [navigate]);
    return children;
};

export default PublicRouteGuard;