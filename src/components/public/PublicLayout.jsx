import { Outlet } from "react-router-dom";
import PublicHeader from "@/components/public/PublicHeader.jsx";
import PublicFooter from "@/components/public/PublicFooter.jsx";

const PublicLayout = () => {
    return (
        <div className="h-feat overflow-x-hidden">
            <PublicHeader />
            <main className="h-feat">
                <Outlet />
            </main>
            <PublicFooter />
        </div>
    )
}

export default PublicLayout;