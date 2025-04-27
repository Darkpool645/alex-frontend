import {  useEffect, useState } from "react";
import { HomeIcon, PlusCircleIcon, ArrowsUpDownIcon, EyeIcon, PencilIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import Breadcrumb from "@/components/common/Breadcrumb";
import FastCounter from "@/components/common/FastCounter";
import { Link, useNavigate } from "react-router-dom";
import { getEmployeesAmount } from "@/services/InstituteServices";
import { getExamAmout, getExamPageables } from "@/services/ExamServices";
import useInstitute from "@/hooks/useInstituteHook";
import StudentResultsDialog from "../../components/admin/StudentResultsDialog";
import downloadStudentSummary from "@/utils/downloadStudentSummary";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { institute } = useInstitute();
    const [employeesNumber, setEmployeesNumber] = useState(0);
    const [examAmount, setExamAmount] = useState(0);
    const [examsPageable, setExamPageable] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [examReference, setExamReference] = useState(null);
    useEffect(() => {
        if (!institute) return;
        const fetchEmployeesNumber = async() => {
            const result = await getEmployeesAmount(institute.idInstitute);
            setEmployeesNumber(result.data);
        };
        const fetchExamAmount = async() => {
            const result = await getExamAmout(institute.idInstitute);
            setExamAmount(result.data);
        }
        const fetchExamPageable = async() => {
            try{
                const result = await getExamPageables(institute.idInstitute, 0);
                    setExamPageable(result.data.content);
            }catch (error){
                console.error("Error fetching pageable exams:", error);
            }
        };
        
        fetchExamPageable();
        fetchEmployeesNumber();
        fetchExamAmount();
    },[institute]);

    const openResultsDialog=(examCode) =>{
        setExamReference(examCode);
        setIsOpen(true);
    }

    const closeResultsDialog = () => {
        setIsOpen(false);
        setExamReference(null);
    };

    const menu = [
        { label: "Panel General", href: "/admin", icon: HomeIcon }
    ];
    return (
        <div className="w-full pt-10">
            <div className="flex items-center justify-between">
                <Breadcrumb items={menu} />
                <h1 className="text-5xl font-bold">Panel General</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-10">
                <div className="w-full min-h-28 rounded-lg cursor-pointer shadow-md flex flex-col justify-center items-center" onClick={() => navigate("/admin/employees")}>
                    <h1 className="text-lg font-semibold mb-1">Docentes</h1>
                    <FastCounter target={employeesNumber} />
                </div>
                <div className="w-full min-h-28 rounded-lg shadow-md flex flex-col justify-center items-center">
                    <h1 className="text-lg font-semibold mb-1">Exámenes</h1>
                    <FastCounter target={examAmount} />
                </div>
            </div>
            <div className="pt-10">
                <div className="relaitve flex flex-col w-full h-full text-slate-700 shadow-md pt-2 px-3 rounded-xl bg-clip-border">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-slate-800">Ultimos exámenes</h3>
                        <div className="flex flex-row gap-2 shrink-0">
                            <button className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 active:opacity-[0.85]"
                                type="button">
                                Ver todos
                            </button>
                            <Link to ="/admin/exams/new-exam" className="flex select-none items-center gap-2 rounded bg-blue-900 py-2.5 px-4 text-xs font-semibold text-white shadow-md shadow-slate-900/10 transition-all hover:shadow-lg hover::shadow-slate-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85]">
                                <PlusCircleIcon className="size-6 text-white" />
                                Agregar Examen
                            </Link>
                        </div>
                    </div>
                    <div className="p-0">
                        <table className="w-full mt-4 text-left table-auto min-w-full overflow-x-auto">
                            <thead>
                                <tr>
                                    <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                        <p className="flex items-center justify-between gap-2 text-sm font-normal leading-none text-slate-500">
                                            Examen
                                            <ArrowsUpDownIcon className="size-4" />
                                        </p>
                                    </th>
                                    <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                        <p className="flex items-center justify-between gap-2 text-sm font-normal leading-none text-slate-500">
                                            Código de examen
                                            <ArrowsUpDownIcon className="size-4" />
                                        </p>
                                    </th>
                                    <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                        <p className="flex items-center justify-between gap-2 text-sm font-normal leading-none text-slate-500">
                                            Docente
                                            <ArrowsUpDownIcon className="size-4" />
                                        </p>
                                    </th>
                                    <th
                                        className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                        <p
                                            className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                                        </p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {examsPageable.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="p-4 text-center text-slate-500">No hay examenes disponibles</td>
                                    </tr>
                                ): (
                                        examsPageable.map((exam) => (
                                            <tr key={exam.idMasterExam} className="hover:bg-slate-50">
                                                <td className="p-4 border-b border-slate-100">{exam.examName}</td>
                                                <td className="p-4 border-b border-slate-100">{exam.examCode}</td>
                                                <td className="p-4 border-b border-slate-100">{exam.fkUserAccount.username}</td>
                                                <td className="p-4 border-b border-slate-100 grid grid-cols-1 md:grid-cols-3">
                                                    <EyeIcon className="cursor-pointer size-5" onClick={() => openResultsDialog(exam.examReference)}/>
                                                    <PencilIcon className="cursor-pointer size-5" />
                                                    <ArrowDownTrayIcon className="cursor-pointer size-5" 
                                                        onClick={() => downloadStudentSummary(exam.examReference,exam.examName)}/>
                                                </td>
                                            </tr>
                                        ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <StudentResultsDialog examReference={examReference} isOpen={isOpen} closeModal={closeResultsDialog}/>
        </div>
    )
};

export default AdminDashboard;