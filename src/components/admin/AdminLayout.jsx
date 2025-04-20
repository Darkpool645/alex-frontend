import { Outlet } from "react-router-dom";
import AdminHeader from "@/components/admin/AdminHeader";
const AdminLayout = () => {
    return(
        <div>
            <AdminHeader/>
            <main className="px-8">
                <Outlet className="h-fit w-fit"/>
            </main>
        </div>
    )
};

export default AdminLayout;