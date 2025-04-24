import { lazy, Suspense } from "react";

const StudentLayout = lazy(() => import("@/components/student/StudentLayout.jsx"));
const ExamInstrucctionsScreen = lazy(() => import("@/screens/student/ExamInstrucctionsScreen.jsx"));
const Loader = lazy(() => import("@/components/public/Loader.jsx"));

const StudentRoutes = [
    {
        path: "/student",
        element: (
            <Suspense fallback={<Loader />}>
                <StudentLayout />
            </Suspense>
        ),
        children: [
            {
                path: "exam-instructions",
                element: <ExamInstrucctionsScreen />
            },
        ],
    },
];

export default StudentRoutes;