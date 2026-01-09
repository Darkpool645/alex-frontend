import { DocumentIcon, ChevronDownIcon, TrashIcon } from "@heroicons/react/24/solid";
import Breadcrumb from "@/components/common/Breadcrumb";
import InputField from "@/components/common/InputField";
import useForm from "@/hooks/useFormHook";
import FileDropInput from "@/components/common/FileDropInput";
import { ParseExam, RegisterExam } from "@/services/ExamServices";
import useInstitute from "@/hooks/useInstituteHook";
import { useEffect, useState } from "react";
import { getTeachersList } from "@/services/AdminServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateExamScreen = () => {
    const navigate = useNavigate();
    const menu = [
        { label: "Exámenes", href: "/admin/exams", icon: DocumentIcon },
        { label: "Nuevo examen", href: "/admin/exams/new-exam" }
    ];

    const modes = [
        { label: "Virtual", value: "VIRTUAL" },
        { label: "Presencial", value: "PRESENCIAL" }
    ];
    const { institute } = useInstitute();
    const [teachersList, setTeachersList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await getTeachersList(institute.idInstitute);
                const formattedTeachers = response.data.map(t => ({
                    label: t.name,
                    value: t.userId
                }));

                setTeachersList(formattedTeachers);
            } catch (error) {
                console.error("Error al obtener la lista de docentes:", error);
            }
        };

        if (institute?.idInstitute) {
            fetchTeachers();
        }
    }, [institute]);


    const shifts = [
        { label: "Matutino", value: "MATUTINO" },
        { label: "Vespertino", value: "VESPERTINO" },
        { label: "Nocturno", value: "NOCTURNO" }
    ]

    const duration = [
        { label: "30 minutos", value: 30 },
        { label: "1 hora", value: 60 },
        { label: "1 hora 30 minutos", value: 90 },
        { label: "2 horas", value: 120 },
        { label: "2 horas 30 minutos", value: 150 },
        { label: "3 horas", value: 180 }
    ];

    const baseForm = {
        title: "", 
        mode: "", 
        teacher: "", 
        duration: "", 
        subject: "", 
        instructions: "", 
        examFile: null,
        examShift: "",
        questions: [], 
        examCode: "",
    };

    const baseSchema = {
        title: { required: true },
        mode: { required: true },
        teacher: { required: true },
        duration: { required: true },
        subject: { required: true },
        instructions: { required: true },
        examFile: { required: false },
        questions: { required: true },
        examShift: { required: true },
        examCode: { required: true, minLength: 8, maxLength: 8 },
    };

    const {
        formData,
        errors,
        handleChange,
        validateField,
        handleSubmit,
        setFormData
    } = useForm(baseForm, baseSchema);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const result = await RegisterExam({
                "title": data.title,
                "mode": data.mode,
                "teacherId": data.teacher,
                "duration": data.duration,
                "subject": data.subject,
                "instructions": data.instructions,
                "examShift": data.examShift,
                "questions": data.questions,
                "examCode": data.examCode,
                "instituteId": institute.idInstitute
            });
            toast.success("Examen registrado correctamente");
            navigate("/admin");
        } catch (error) {
            toast.error("Error al registrar el examen");
            console.error("Error al registrar el examen:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleQuestionChange = (index, value) => {
        const updatedQuestions = [...formData.questions];
        updatedQuestions[index].text = value;
        setFormData((prev) => ({ ...prev, questions: updatedQuestions }));
    };

    const handleDeleteQuestion = (index) => {
        const updatedQuestions = formData.questions.filter((_, i) => i !== index);
        setFormData((prev) => ({ ...prev, questions: updatedQuestions }));
    };

    const handleAddQuestion = () => {
        setFormData((prev) => ({
            ...prev,
            questions: [...prev.questions, { text: "", answers: [] }]
        }));
    };

    const handleAnswerTextChange = (questionIndex, answerIndex, value) => {
        const updatedQuestions = [...formData.questions];
        updatedQuestions[questionIndex].answers[answerIndex].text = value;
        setFormData(prev => ({
            ...prev,
            questions: updatedQuestions
        }));
    };

    const handleCorrectAnswer = (questionIndex, answerIndex) => {
        const updatedQuestions = [...formData.questions];
        updatedQuestions[questionIndex].answers = updatedQuestions[questionIndex].answers.map((ans, i) => ({
            ...ans,
            isCorrect: i === answerIndex
        }));
        setFormData(prev => ({
            ...prev,
            questions: updatedQuestions
        }));
    };

    const handleAddAnswer = (questionIndex) => {
        const updatedQuestions = [...formData.questions];
        updatedQuestions[questionIndex].answers.push({ text: "", isCorrect: false });
        setFormData(prev => ({
            ...prev,
            questions: updatedQuestions
        }));
    };

    const handleDeleteAnswer = (questionIndex, answerIndex) => {
        const updatedQuestions = [...formData.questions];
        updatedQuestions[questionIndex].answers = updatedQuestions[questionIndex].answers.filter((_, i) => i !== answerIndex);
        setFormData(prev => ({
            ...prev,
            questions: updatedQuestions
        }));
    };

    const handleFileChange = async (file) => {
        setFormData((prev) => ({ ...prev, examFile: file }));

        if (file) {
            try {
                const result = await ParseExam(file);
                const parsedQuestions = result.data.questions || [];
                setFormData((prev) => ({
                    ...prev,
                    questions: parsedQuestions
                }));
            } catch (error) {
                console.error("Error analizando el archivo", error);
            }
        }
    };

    return (
        <div className="w-full pt-10">
            <div className="flex items-center justify-between">
                <Breadcrumb items={menu} />
                <h1 className="text-5xl font-bold">Nuevo examen</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-4 pt-10">
                    <InputField label="Título del examen" value={formData.title} onChange={handleChange("title")}
                        placeholder="Título del examen" required error={!!errors.title} errorMessage={errors.title}
                        onBlur={(e) => validateField("title", e.target.value)}
                    />
                    <InputField label="Modalidad" value={formData.mode} onChange={handleChange("mode")}
                        type="select" icon={ChevronDownIcon} options={modes} required error={!!errors.mode} errorMessage={errors.mode}
                        onBlur={(e) => validateField("mode", e.target.value)}
                    />
                    <InputField label="Docente" value={formData.teacher} onChange={handleChange("teacher")}
                        type="select" icon={ChevronDownIcon} options={teachersList} required error={!!errors.teacher} errorMessage={errors.teacher}
                        onBlur={(e) => validateField("teacher", e.target.value)}
                    />
                    <InputField label="Duración" value={formData.duration} onChange={handleChange("duration")}
                        type="select" icon={ChevronDownIcon} options={duration} required error={!!errors.duration} errorMessage={errors.duration}
                        onBlur={(e) => validateField("duration", e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4 pt-2">
                    <InputField label="Materia" value={formData.subject} onChange={handleChange("subject")} placeholder="Materia del examen"
                        required error={!!errors.subject} errorMessage={errors.subject} onBlur={(e) => validateField("subject", e.target.value)} />
                    <InputField label="Turno" type="select" options={shifts} value={formData.examShift} onChange={handleChange("examShift")} placeholder="Turno del examen"
                        required error={!!errors.examShift} errorMessage={errors.examShift} onBlur={(e) => validateField("examShift", e.target.value)} />
                    <InputField label="Código del examen" value={formData.examCode} onChange={handleChange("examCode")} placeholder="Código del examen"
                        required error={!!errors.examCode} errorMessage={errors.examCode} onBlur={(e) => validateField("examCode", e.target.value)} />
                </div>

                <InputField label="Instrucciones del examen" value={formData.instructions} onChange={handleChange("instructions")} placeholder="Instrucciones del examen"
                    required error={!!errors.instructions} errorMessage={errors.instructions} onBlur={(e) => validateField("instructions", e.target.value)} />

                <FileDropInput label="Archivo del examen" value={formData.examFile} onChange={handleFileChange} accept={{ "text/plain": [] }}
                    onBlur={() => validateField("examFile", formData.examFile)} error={!!errors.examFile} errorMessage={errors.examFile} />

                {formData.questions.length > 0 && (
                    formData.questions.map((question, qIndex) => (
                        <div key={qIndex} className="w-full p-3 rounded-lg border-dashed border-2 border-blue-900 mb-5">
                            <div className="flex w-full justify-between items-center gap-4">
                                <InputField label={`Pregunta ${qIndex + 1}`} value={question.text}
                                    onChange={(e) => handleQuestionChange(qIndex, e.target.value)} placeholder="Pregunta"
                                    onBlur={(e) => validateField(`questions[${qIndex}].text`, e.target.value)} />
                                <button type="button" className="bg-red-500 rounded-xl p-2"
                                    onClick={() => handleDeleteQuestion(qIndex)}>
                                    <TrashIcon className="text-white size-5" />
                                </button>
                            </div>

                            {question.answers.map((answer, aIndex) => (
                                <div key={aIndex} className="flex w-full justify-between items-center gap-4 mt-2">
                                    <input
                                        type="radio"
                                        name={`correct-answer-${qIndex}`}
                                        className="size-4 bg-gray-100 border-blue-500 text-blue-900"
                                        checked={answer.isCorrect}
                                        onChange={() => handleCorrectAnswer(qIndex, aIndex)}
                                    />
                                    <InputField
                                        value={answer.text}
                                        label="Respuesta"
                                        onChange={(e) => handleAnswerTextChange(qIndex, aIndex, e.target.value)}
                                    />
                                    <button type="button" className="bg-red-500 rounded-xl p-2"
                                        onClick={() => handleDeleteAnswer(qIndex, aIndex)}>
                                        <TrashIcon className="text-white size-5" />
                                    </button>
                                </div>
                            ))}

                            <button type="button"
                                className="w-full bg-blue-900 text-white rounded-lg py-2 px-3 mb-3 font-semibold"
                                onClick={() => handleAddAnswer(qIndex)}>
                                Agregar Respuesta
                            </button>
                        </div>
                    ))
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 pt-2">
                    <button type="button" onClick={handleAddQuestion}
                        className="bg-blue-900 text-white rounded-lg py-2 px-3 mb-10 w-full font-semibold">
                        Agregar Pregunta
                    </button>
                    <button type="submit"
                        className="bg-blue-900 text-white rounded-lg py-2 px-3 mb-10 w-full font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className={'flex items-center justify-center'}>
                                <div role="status">
                                    <svg aria-hidden="true" class="w-4 h-4 me-2 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                                    <span class="sr-only">Loading...</span>
                                </div>
                                Registrando datos
                            </div>
                        ) : (
                            <span>
                                Guardar examen
                            </span>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateExamScreen;
