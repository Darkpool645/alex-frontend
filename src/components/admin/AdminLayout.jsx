import useInstitute from "@/hooks/useInstituteHook";
import { Outlet } from "react-router-dom";
import AdminHeader from "@/components/admin/AdminHeader";
const AdminLayout = () => {
    const { institute } = useInstitute();
    return (
        <div>
            {institute && (<p className="sr-only">{institute.idInstitute}</p>)}
            <AdminHeader />
            <main className="px-8">
                <Outlet className="h-fit w-fit" />
            </main>
        </div>
    )
};

export default AdminLayout;