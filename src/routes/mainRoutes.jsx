import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import PublicRoutes from "@/routes/publicRoutes.jsx";
import AdminRoutes from "@/routes/adminRoutes";

const Loader = lazy(() => import("@/components/public/Loader.jsx"));
const NotFoundScreen = lazy(() => import("@/screens/public/NotFoundScreen.jsx"));

const router = createBrowserRouter([
    ...PublicRoutes,
    ...AdminRoutes,
    { path: "*", element: (<Suspense fallback={<Loader />}><NotFoundScreen /></Suspense>) }
]);

export default router;