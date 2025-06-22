import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { getStudentAnswersByExam } from "@/services/ExamServices";
import { EyeIcon } from "@heroicons/react/24/solid";
import StudentDetailDialog from "@/components/admin/StudentDetailDialog";

const StudentResultsDialog = ({ examReference, isOpen, closeModal }) => {
  const [studentResults, setStudentResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    if (!examReference) return;

    const fetchResults = async () => {
      try {
        setLoading(true);
        const result = await getStudentAnswersByExam(examReference);
        console.log("Resultados de exámenes:", result.data);
        setStudentResults(result.data || []); // 🔥 AQUÍ guardas en el state
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [examReference]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-6xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Resultados del examen
                  </DialogTitle>
                  <div className="mt-4">
                    {loading ? (
                      <div className="text-center text-gray-500">
                        Cargando alumnos...
                      </div>
                    ) : (
                      <table className="w-full table-auto">
                        <thead>
                          <tr>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">
                              Alumno
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">
                              Puntuación
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">
                              Detalles
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {studentResults.length === 0 ? (
                            <tr>
                              <td
                                colSpan={2}
                                className="p-4 text-center text-gray-500"
                              >
                                No hay resultados
                              </td>
                            </tr>
                          ) : (
                            studentResults.map((student, idx) => (
                              <tr key={idx}>
                                <td className="px-4 py-2 border-t">
                                  {student.studentName}
                                </td>
                                <td className="px-4 py-2 border-t">
                                  {student.score}/{student.questions.length}
                                </td>
                                <td className="px-4 py-2 border-t">
                                  <EyeIcon
                                    className="size-6 text-blue-900 cursor-pointer"
                                    onClick={() => {
                                      setSelectedStudent(student);
                                      setIsDetailOpen(true);
                                    }}
                                  />
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    )}
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-900 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
                      onClick={closeModal}
                    >
                      Cerrar
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
      <StudentDetailDialog
        isOpen={isDetailOpen}
        closeModal={() => setIsDetailOpen(false)}
        student={selectedStudent}
      />
    </>
  );
};

export default StudentResultsDialog;
