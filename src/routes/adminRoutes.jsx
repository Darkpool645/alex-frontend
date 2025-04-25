import { lazy, Suspense } from "react";
import AuthLayout from "../config/AuthLayout";

const AdminLayout = lazy(() => import("@/components/admin/AdminLayout.jsx"));
const AdminDashboardScreen = lazy(() => import("@/screens/admin/AdminDashboardScreen.jsx"));
const CreateExamScreen = lazy (()=> import("@/screens/admin/CreateExamScreen.jsx"));
const EmployeListScreen =  lazy(() => import("@/screens/admin/EmployeeListScreen.jsx"));
const Loader = lazy(() => import("@/components/public/Loader.jsx"));

const AdminRoutes = [
    {
        path: "/admin",
        element: (
            <Suspense fallback={<Loader />}>
                <AuthLayout>
                    <AdminLayout />
                </AuthLayout>
            </Suspense>
        ),
        children: [
            {
                index: true,
                element: <AdminDashboardScreen />,
            },
            {
                path: "exams/new-exam",
                element: <CreateExamScreen />
            },
            {
                path: "employees",
                element: <EmployeListScreen />
            }
        ],
    },
];

export default AdminRoutes;