import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Fragment } from "react";

const StudentDetailDialog = ({ isOpen, closeModal, student }) => {
    if (!student) return null;
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <TransitionChild as={Fragment} enter="ease-out duration-300"
                    enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200"
                    leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </TransitionChild>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild as={Fragment} enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                    Respuestas del Alumno {student.studentName}
                                </DialogTitle>
                                <div className="mt-4">
                                    <p><strong>Nombre:</strong> {student.studentName}</p>
                                    <p><strong>Examen:</strong> {student.examReference}</p>
                                    <p><strong>Puntuación:</strong> {student.score}</p>
                                    { student.questions.map((question, index) => (
                                        <div key={index} className="mt-2 border-b-2 border-gray-200 pb-2">
                                            <p><strong>Pregunta {index + 1}:</strong> {question.text}</p>
                                            <p><strong>Respuesta Correcta:</strong> {question.answer.correct ? "Correcto" : "Falso"}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 flex justify-end">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
    )
}

export default StudentDetailDialog;