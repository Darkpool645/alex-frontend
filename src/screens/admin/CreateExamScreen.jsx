import { useState } from "react";
import { DocumentIcon, ChevronDownIcon, TrashIcon } from "@heroicons/react/24/solid";
import Breadcrumb from "@/components/common/Breadcrumb";
import InputField from "@/components/common/InputField";
import useForm from "@/hooks/useFormHook";
import FileDropInput from "@/components/common/FileDropInput";
import { ParseExam } from "@/services/ExamServices";

const CreateExamScreen = () => {
    const menu = [
        { label: "Exámenes", href: "/admin/exams", icon: DocumentIcon },
        { label: "Nuevo examen", href: "/admin/exams/new-exam" }
    ];

    // TODO - traer un arreglo desde el backend
    const modes = [
        { label: "En linea", value: "online" },
        { label: "Presencial", value: "presential" }
    ];

    // TODO - traer un arreglo desde el backend
    const teachers = [
        { label: "Docente 1", value: "teacher1" },
        { label: "Docente 2", value: "teacher2" },
        { label: "Docente 3", value: "teacher3" }
    ];

    const duration = [
        { label: "30 minutos", value: 30 },
        { label: "1 hora", value: 60 },
        { label: "1 hora 30 minutos", value: 90 },
        { label: "2 horas", value: 120 },
        { label: "2 horas 30 minutos", value: 150 },
        { label: "3 horas", value: 180 }
    ];

    const [questions, setQuestions] = useState([]);


    const initialForm = {
        title: "",
        mode: "",
        teacher: "",
        duration: "",
        subject: "",
        examFile: null,
        instrucctions: "",
    };

    const validationSchema = {
        title: { required: true },
        mode: { required: true },
        teacher: { required: true },
        duration: { required: true },
        subject: { required: true },
        examFile: { required: false },
        instrucctions: { required: true },
    }

    const handleDeleteQuestion = (index) => {
        const updated = questions.filter((_, i) => i !== index);
        setQuestions(updated);
    };

    const { formData, errors, handleChange, validateField, handleSubmit } = useForm(initialForm, validationSchema);

    const onSubmit = (data) => {
        console.log("Formulario completado", data);
        // TODO - Lógica real aqui
    }

    return (
        <div className="w-full pt-10">
            <div className="flex items-center justify-between">
                <Breadcrumb items={menu} />
                <h1 className="text-5xl font-bold">Nuevo examen</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-4 pt-10">
                    <InputField label={"Título del exámen"} value={formData.title} onChange={handleChange("title")}
                        placeholder={"Campo de prueba"} required error={!!errors.title} errorMessage={errors.title}
                        onBlur={(e) => validateField("title", e.target.value)}
                    />
                    <InputField label={"Modalidad"} value={formData.mode} onChange={handleChange("mode")}
                        type="select" icon={ChevronDownIcon} options={modes} required error={!!errors.mode} errorMessage={errors.mode}
                        onBlur={(e) => validateField("mode", e.target.value)}
                    />
                    <InputField label={"Docente"} value={formData.teacher} onChange={handleChange("teacher")}
                        type="select" icon={ChevronDownIcon} options={teachers} required error={!!errors.teacher} errorMessage={errors.teacher}
                        onBlur={(e) => validateField("teacher", e.target.value)}
                    />
                    <InputField label={"Duración"} value={formData.duration} onChange={handleChange("duration")}
                        type="select" icon={ChevronDownIcon} options={duration} required error={!!errors.duration} errorMessage={errors.duration}
                        onBlur={(e) => validateField("duration", e.target.value)}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4 pt-2">
                    <InputField label={"Materia"} value={formData.subject} onChange={handleChange("subject")} placeholder="Materia del examen"
                        required error={!!errors.subject} errorMessage={errors.subject} onBlur={(e) => validateField("subject", e.target.value)} />
                    <InputField label={"Prueba"} value={""} onChange={() => { }} required onBlur={() => { }} />
                </div>
                <InputField label={"Instrucciones del examen"} value={formData.instrucctions} onChange={handleChange("instrucctions")} placeholder="Instrucciones del examen"
                    required error={!!errors.instrucctions} errorMessage={errors.instrucctions} onBlur={(e) => validateField("instrucctions", e.target.value)} />
                
                <FileDropInput label="Archivo del examen" value={formData.examFile} onChange={async (file) => {
                    handleChange("examFile")({ target: { value: file } });
                    if (file) {
                        try {
                            const result = await ParseExam(file);
                            console.log("Resultado", result.data.questions);
                            setQuestions(result.data.questions);
                        } catch (error) {
                            console.error("Error analizando el archivo", error);
                        }
                    }
                }}
                    onBlur={() => validateField("examFile", formData.examFile)} error={!!errors.examFile} errorMessage={errors.examFile} />

                {questions.map((question, index) => (
                    <div key={index} className="w-full p-3 rounded-lg border-dashed border-2 border-blue-900 mb-5">
                        <div className="flex w-full justify-between items-center">
                            <InputField label={"Pregunta"} value={question.text} placeholder="Pregunta" required className="px-10"/>
                            <button type="button" className="bg-red-500 rounded-xl p-2"
                                onClick={() => handleDeleteQuestion(index)}>
                                <TrashIcon className="text-white size-5" />
                            </button>
                        </div>

                    </div>
                ))}
                <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 pt-2">
                    <button type="button" onClick={() => setQuestions([...questions, { text: "", answers: [] }])}
                        className="bg-blue-900 text-white rounded-lg py-2 px-3 mb-10 w-full font-semibold">Agregar Pregunta</button>
                    <button type="submit" className="bg-blue-900 text-white rounded-lg py-2 px-3 mb-10 w-full font-semibold">Guardar examen</button>
                </div>
            </form>


        </div>
    );
};

export default CreateExamScreen;