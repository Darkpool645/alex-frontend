import { lazy, Suspense } from "react";
import PublicRouteGuard from "@/config/PublicRouteGuard";
const PublicLayout = lazy(() => import("@/components/public/PublicLayout.jsx"));
const LoginScreen = lazy(() => import("@/screens/public/LoginScreen.jsx"));
const LandingScreen = lazy(() => import("@/screens/public/LandingScreen.jsx"));
const RegisterScreen = lazy(() => import("@/screens/public/RegisterScreen.jsx"));
const ExamAccessScreen = lazy(() => import("@/screens/public/ExamAccessScreen.jsx"));
const Loader = lazy(() => import("@/components/public/Loader.jsx"));

const PublicRoutes = [
    {
        path: "/",
        element: (
            <Suspense fallback={<Loader />}>
                <PublicRouteGuard>
                    <PublicLayout />
                </PublicRouteGuard>
            </Suspense>
        ),
        children: [
            {
                path: "login",
                element: <LoginScreen />,
            },
            {
                index: true,
                element: <LandingScreen />,
            },
            {
                path: "subscribe",
                element: <RegisterScreen />
            },
            {
                path: "exam-code",
                element: <ExamAccessScreen />
            }
        ],
    },
];

export default PublicRoutes;
