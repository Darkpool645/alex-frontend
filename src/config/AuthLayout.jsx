import AuthRedirectGuard from "@/config/AuthRedirectGuard";

const AuthLayout = ({ children }) => {
    return <AuthRedirectGuard>{children}</AuthRedirectGuard>
};

export default AuthLayout;