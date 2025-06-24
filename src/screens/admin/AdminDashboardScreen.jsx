import { useEffect, useState } from "react";
import {
  HomeIcon,
  PlusCircleIcon,
  ArrowsUpDownIcon,
  EyeIcon,
  PencilIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  XMarkIcon
} from "@heroicons/react/24/solid";
import Breadcrumb from "@/components/common/Breadcrumb";
import FastCounter from "@/components/common/FastCounter";
import { Link, useNavigate } from "react-router-dom";
import { getEmployeesAmount } from "@/services/InstituteServices";
import {
  getExamAmout,
  getExamsPageablesByFilter,
} from "@/services/ExamServices";
import useInstitute from "@/hooks/useInstituteHook";
import StudentResultsDialog from "../../components/admin/StudentResultsDialog";
import downloadStudentSummary from "@/utils/downloadStudentSummary";
import { Switch } from "@headlessui/react";
import { toggleExamStatus } from "@/services/AdminServices";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { institute } = useInstitute();
  const [employeesNumber, setEmployeesNumber] = useState(0);
  const [examAmount, setExamAmount] = useState(0);
  const [examsPageable, setExamPageable] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [examReference, setExamReference] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!institute) return;

    const fetchEmployeesNumber = async () => {
      const result = await getEmployeesAmount(institute.idInstitute);
      setEmployeesNumber(result.data);
    };

    const fetchExamAmount = async () => {
      const result = await getExamAmout(institute.idInstitute);
      setExamAmount(result.data);
    };

    fetchEmployeesNumber();
    fetchExamAmount();
  }, [institute]);

  useEffect(() => {
    if (!institute) return;
    const fetchExamPageable = async () => {
      try {
        const filter = searchTerm.trim() === "" ? "" : searchTerm.trim();
        const result = await getExamsPageablesByFilter(
          institute.idInstitute,
          filter,
          currentPage
        );
        setExamPageable(result.data.content);
        setTotalPages(result.data.totalPages);
      } catch (error) {
        console.error("Error fetching pageable exams:", error);
      }
    };
    fetchExamPageable();
  }, [institute, currentPage, searchTerm]);

  const openResultsDialog = (examCode) => {
    setExamReference(examCode);
    setIsOpen(true);
  };

  const closeResultsDialog = () => {
    setIsOpen(false);
    setExamReference(null);
  };

  const handleToggleExamStatus = async (examId) => {
    try {
      const response = await toggleExamStatus(examId);
      if (!response.error) {
        setExamPageable((prevExams) =>
          prevExams.map((exam) =>
            exam.idMasterExam === examId
              ? {
                  ...exam,
                  fkStatusExam: {
                    ...exam.fkStatusExam,
                    statusName:
                      exam.fkStatusExam.statusName === "pendiente"
                        ? "en proceso"
                        : "pendiente",
                  },
                }
              : exam
          )
        );
      } else {
        toast.error(`Error: ${response.message}`);
      }
    } catch (error) {
      console.error("Error toggling exam status:", error);
      toast.error("Ocurrió un error al actualizar el estado del examen.");
    }
  };

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`px-3 py-1 rounded text-sm mx-1 ${
            page === currentPage
              ? "bg-blue-700 text-white"
              : "bg-white text-blue-700 border border-blue-700 hover:bg-blue-100"
          }`}
        >
          {page}
        </button>
      );
    }

    return buttons;
  };

  const menu = [{ label: "Panel General", href: "/admin", icon: HomeIcon }];

  return (
    <div className="w-full pt-10">
      <div className="flex items-center justify-between">
        <Breadcrumb items={menu} />
        <h1 className="text-5xl font-bold">Panel General</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-10">
        <div
          className="w-full min-h-28 rounded-lg cursor-pointer shadow-md flex flex-col justify-center items-center"
          onClick={() => navigate("/admin/employees")}
        >
          <h1 className="text-lg font-semibold mb-1">Docentes</h1>
          <FastCounter target={employeesNumber} />
        </div>
        <div className="w-full min-h-28 rounded-lg shadow-md flex flex-col justify-center items-center">
          <h1 className="text-lg font-semibold mb-1">Exámenes</h1>
          <FastCounter target={examAmount} />
        </div>
      </div>

      <div className="pt-10 mb-3">
        <div className="relative flex flex-col w-full h-full text-slate-700 shadow-md pt-2 px-3 rounded-xl bg-clip-border">
          <div className="flex items-center justify-between">
            <div className="flex justify-between items-center mb-4 w-full">
              <h3 className="text-lg font-semibold text-slate-800">
                Últimos exámenes
              </h3>
              <div className="relative flex items-center w-full mx-10 gap-0">
                <input
                  type="text"
                  placeholder="Buscar examen..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="border border-slate-300 rounded-l-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {inputValue && (
                  <button
                    onClick={() => {
                      setInputValue("");
                      setSearchTerm("");
                      setCurrentPage(1);
                    }}
                    className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700"
                    aria-label="Borrar filtro"
                  >
                    <XMarkIcon className="size-5 mr-5" />  
                  </button>
                )}
                <button
                  onClick={() => {
                    setSearchTerm(inputValue.trim());
                    setCurrentPage(1);
                  }}
                  className="absolute right-0 top-0 h-full px-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
                >
                  <MagnifyingGlassIcon className="size-5" />
                </button>
              </div>
            </div>
            <div className="flex flex-row gap-2 shrink-0">
              <button className="rounded border border-slate-300 py-2.5 px-3 text-xs font-semibold text-slate-600 hover:opacity-75">
                Ver todos
              </button>
              <Link
                to="/admin/exams/new-exam"
                className="flex items-center gap-2 rounded bg-blue-900 py-2.5 px-4 text-xs font-semibold text-white shadow-md hover:shadow-lg"
              >
                <PlusCircleIcon className="size-6 text-white" />
                Agregar Examen
              </Link>
            </div>
          </div>

          <div className="p-0">
            <table className="w-full mt-4 text-left table-auto min-w-full overflow-x-auto">
              <thead>
                <tr>
                  <th className="p-4 border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                    <p className="flex items-center justify-between text-sm text-slate-500">
                      Examen
                      <ArrowsUpDownIcon className="size-4" />
                    </p>
                  </th>
                  <th className="p-4 border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                    <p className="flex items-center justify-between text-sm text-slate-500">
                      Código de examen
                      <ArrowsUpDownIcon className="size-4" />
                    </p>
                  </th>
                  <th className="p-4 border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                    <p className="flex items-center justify-between text-sm text-slate-500">
                      Docente
                      <ArrowsUpDownIcon className="size-4" />
                    </p>
                  </th>
                  <th className="p-4 border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                    <p className="text-sm text-slate-500">Acciones</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {examsPageable.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-4 text-center text-slate-500">
                      No hay exámenes disponibles
                    </td>
                  </tr>
                ) : (
                  examsPageable.map((exam) => (
                    <tr key={exam.idMasterExam} className="hover:bg-slate-50">
                      <td className="p-4 border-b border-slate-100">
                        {exam.examName}
                      </td>
                      <td className="p-4 border-b border-slate-100">
                        {exam.examCode}
                      </td>
                      <td className="p-4 border-b border-slate-100">
                        {exam.fkUserAccount.username}
                      </td>
                      <td className="p-4 border-b border-slate-100 grid grid-cols-1 md:grid-cols-4">
                        <EyeIcon
                          className="cursor-pointer size-5"
                          onClick={() => openResultsDialog(exam.examReference)}
                        />
                        <PencilIcon className="cursor-pointer size-5" />
                        <ArrowDownTrayIcon
                          className="cursor-pointer size-5"
                          onClick={() =>
                            downloadStudentSummary(
                              exam.examReference,
                              exam.examName
                            )
                          }
                        />
                        <Switch
                          checked={exam.fkStatusExam.statusName !== "pendiente"}
                          onChange={() =>
                            handleToggleExamStatus(exam.idMasterExam)
                          }
                          className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-blue-500/10 p-1 transition-colors data-[checked]:bg-blue-500"
                        >
                          <span
                            aria-hidden="true"
                            className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white shadow-lg transition group-data-[checked]:translate-x-7"
                          />
                        </Switch>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINADOR */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 px-2 gap-2">
              <button
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded text-sm ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Anterior
              </button>

              <div className="flex flex-wrap justify-center items-center">
                {renderPaginationButtons()}
              </div>

              <button
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded text-sm ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
      </div>

      <StudentResultsDialog
        examReference={examReference}
        isOpen={isOpen}
        closeModal={closeResultsDialog}
      />
    </div>
  );
};

export default AdminDashboard;
