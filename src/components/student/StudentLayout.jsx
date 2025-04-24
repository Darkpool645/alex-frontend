import { Outlet } from "react-router-dom"
import StudentHeader from "@/components/student/StudentHeader";

const StudentLayout = () => {
    return(
        <div>
            <StudentHeader />
            <main className="px-8">
                <Outlet className="h-fit w-fit"/>
            </main>
        </div>
    );
};

export default StudentLayout;