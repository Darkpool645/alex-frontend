import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";

const StudentDetailDialog = ({ isOpen, closeModal, student }) => {
  if (!student) return null;

  return (
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
              <DialogPanel className="w-full max-w-6xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-2xl font-semibold text-gray-900 mb-4"
                >
                  Respuestas del Alumno:{" "}
                  <span className="text-blue-600 font-bold">
                    {student.studentName}
                  </span>
                </DialogTitle>

                <div className="mb-6">
                  <p className="text-sm text-gray-700">
                    <strong>Puntuación:</strong>{" "}
                    <span className="font-bold">{student.score}</span>
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200 rounded">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                          #
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                          Pregunta
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                          Respuesta del alumno
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                          ¿Es correcta?
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {student.questions.map((question, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-2">{index + 1}</td>
                          <td className="px-4 py-2">{question.text}</td>
                          <td className="px-4 py-2">
                            {question.answer?.text ?? (
                              <span className="italic text-gray-400">
                                Sin respuesta
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-2">
                            <span
                              className={`font-semibold ${
                                question.answer?.isCorrect
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {question.answer?.isCorrect
                                ? "Correcta"
                                : "Incorrecta"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
  );
};

export default StudentDetailDialog;
