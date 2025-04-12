import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    return(
        <div>
            <h1>AdminLayout</h1>
            <main>
                <Outlet />
            </main>
        </div>
    )
};

export default AdminLayout;