import { lazy, Suspense } from "react";

const AdminLayout = lazy(() => import("@/components/admin/AdminLayout.jsx"));
const LoginScreen = lazy(() => import("@/screens/admin/AdminDashboardScreen.jsx"));
const Loader = lazy(() => import("@/components/public/Loader.jsx"));

const AdminRoutes = [
    {
        path: "/admin",
        element: (
            <Suspense fallback={<Loader />}>
                <AdminLayout />
            </Suspense>
        ),
        children: [
            {
                index: true,
                element: <LoginScreen />,
            },
        ],
    },
];

export default AdminRoutes;