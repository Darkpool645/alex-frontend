import { createBrowserRouter } from "react-router-dom";

import PublicRoutes from "@/routes/publicRoutes.jsx";
import AdminRoutes from "@/routes/adminRoutes";


const router = createBrowserRouter([
    ...PublicRoutes,
    ...AdminRoutes
]);

export default router;