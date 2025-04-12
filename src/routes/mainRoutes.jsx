import { createBrowserRouter } from "react-router-dom";

import PublicRoutes from "@/routes/publicRoutes.jsx";


const router = createBrowserRouter([
    ...PublicRoutes
]);

export default router;