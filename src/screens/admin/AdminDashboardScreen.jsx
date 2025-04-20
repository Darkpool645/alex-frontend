import { HomeIcon } from "@heroicons/react/24/solid";
import Breadcrumb from "@/components/common/Breadcrumb";
import FastCounter from "@/components/common/FastCounter";

const AdminDashboard = () => {
    const menu = [
        { label: "Panel General", href: "/admin", icon: HomeIcon }
    ];
    return (
        <div className="w-full pt-10">
            <div className="flex items-center justify-between">
                <Breadcrumb items={menu} />
                <h1 className="text-5xl font-bold">Panel General</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 pt-10">
                <div className="w-full min-h-28 rounded-lg shadow-md flex flex-col justify-center items-center">
                    <h1 className="text-lg font-semibold mb-1">Docentes</h1>
                    <FastCounter target={10000} />
                </div>
                <div className="w-full min-h-28 rounded-lg shadow-md flex flex-col justify-center items-center">
                    <h1 className="text-lg font-semibold mb-1">Exámenes</h1>
                    <FastCounter target={10000} />
                </div>
                <div className="w-full min-h-28 rounded-lg shadow-md flex flex-col justify-center items-center">
                    <h1 className="text-lg font-semibold mb-1">Docentes</h1>
                    <FastCounter target={10000} />
                </div>
                <div className="w-full min-h-28 rounded-lg shadow-md flex flex-col justify-center items-center">
                    <h1 className="text-lg font-semibold mb-1">Docentes</h1>
                    <FastCounter target={10000} />
                </div>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-10">
                <div className="w-full p-10 rounded-lg shadow-lg" />
                <div className="w-full p-10 rounded-lg shadow-lg" />
            </div>
        </div>
    )
};

export default AdminDashboard;