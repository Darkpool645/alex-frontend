import { DocumentIcon, ChevronDownIcon, TrashIcon } from "@heroicons/react/24/solid";
import Breadcrumb from "@/components/common/Breadcrumb";
import InputField from "@/components/common/InputField";
import useForm from "@/hooks/useFormHook";
import { getExamData, updateExam } from "@/services/ExamServices";
import useInstitute from "@/hooks/useInstituteHook";
import { useEffect, useState } from "react";
import { getTeachersList } from "@/services/AdminServices";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";

const UpdateExamScreen = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const examCodeUrl = searchParams.get("code");
    const { institute } = useInstitute();
    
    const [teachersList, setTeachersList] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        formData,
        handleChange,
        handleSubmit,
        setFormData
    } = useForm({
        title: "", mode: "", teacher: "", duration: "", 
        subject: "", instructions: "", examShift: "", 
        questions: [], examCode: "",
    }, {
        title: { required: true },
        mode: { required: true },
        teacher: { required: true },
        duration: { required: true },
        subject: { required: true },
        instructions: { required: true },
        questions: { required: true },
        examShift: { required: true },
        examCode: { required: true },
    });

    // 1. CARGA INICIAL
    useEffect(() => {
        const initialize = async () => {
            try {
                const [teachersRes, examRes] = await Promise.all([
                    getTeachersList(institute.idInstitute),
                    getExamData(examCodeUrl)
                ]);

                setTeachersList(teachersRes.data.map(t => ({ label: t.name, value: t.userId })));

                if (!examRes.error) {
                    const d = examRes.data;
                    
                    setFormData({
                        ...d,
                        teacher: d.teacherId,
                        questions: d.questions.map(q => ({
                            text: q.text,
                            answers: q.answers.map(a => ({
                                text: a.text,
                                correct: a.isCorrect === true || a.correct === true 
                            }))
                        }))
                    });
                }
            } catch (error) {
                toast.error("Error al cargar datos");
            } finally {
                setIsFetching(false);
            }
        };
        if (institute?.idInstitute && examCodeUrl) initialize();
    }, [institute, examCodeUrl, setFormData]);

    // 2. MANEJADOR DE RESPUESTA CORRECTA (INMUTABLE)
    const handleCorrectAnswer = (qIdx, aIdx) => {
        setFormData(prev => {
            const newQuestions = prev.questions.map((q, i) => {
                if (i !== qIdx) return q;
                return {
                    ...q,
                    answers: q.answers.map((ans, j) => ({
                        ...ans,
                        correct: j === aIdx
                    }))
                };
            });
            return { ...prev, questions: newQuestions };
        });
    };

    // 3. ELIMINAR RESPUESTA
    const handleDeleteAnswer = (qIdx, aIdx) => {
        setFormData(prev => {
            const newQuestions = [...prev.questions];
            newQuestions[qIdx].answers = newQuestions[qIdx].answers.filter((_, i) => i !== aIdx);
            return { ...prev, questions: newQuestions };
        });
    };

    // 4. VALIDACIÓN
    const validateData = (questions) => {
        for (let i = 0; i < questions.length; i++) {
            const hasCorrect = questions[i].answers.some(ans => ans.correct === true);
            if (!hasCorrect) {
                toast.warn(`Pregunta ${i + 1} sin respuesta correcta.`);
                return false;
            }
        }
        return true;
    };

    // 5. ENVÍO DE DATOS
    const onSubmit = async (data) => {
        if (!validateData(data.questions)) return;

        setIsSubmitting(true);
        try {
            const payload = {
                title: data.title,
                mode: data.mode,
                teacherId: data.teacher,
                duration: Number(data.duration),
                subject: data.subject,
                instructions: data.instructions,
                examShift: data.examShift,
                examCode: data.examCode,
                instituteId: institute.idInstitute,
                questions: data.questions.map((q) => ({
                    text: q.text,
                    answers: q.answers.map((a) => ({
                        text: a.text,
                        isCorrect: a.correct === true
                    }))
                }))
            };

            const result = await updateExam(payload);
            if (!result.error) {
                toast.success("Examen actualizado correctamente");
                navigate("/admin");
            } else {
                toast.error("El servidor no pudo procesar los cambios");
            }
        } catch (error) {
            toast.error("Error de conexión al intentar actualizar");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isFetching) return <div className="p-10 font-bold">Cargando...</div>;

    return (
        <div className="w-full pt-10 pb-20 px-6">
            <div className="flex items-center justify-between mb-8">
                <Breadcrumb items={[{ label: "Exámenes", href: "/admin" }, { label: "Actualizar" }]} />
                <h1 className="text-4xl font-bold">Editar Examen</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-4 rounded-xl shadow">
                    <InputField label="Título" value={formData.title} onChange={handleChange("title")} required />
                    <InputField label="Modalidad" value={formData.mode} onChange={handleChange("mode")} type="select" options={[{label:"Virtual", value:"VIRTUAL"}]} required />
                    <InputField label="Docente" value={formData.teacher} onChange={handleChange("teacher")} type="select" options={teachersList} required />
                    <InputField label="Duración" value={formData.duration} onChange={handleChange("duration")} type="select" options={[{label:"1h", value:60}]} required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InputField label="Materia" value={formData.subject} onChange={handleChange("subject")} required />
                    <InputField label="Turno" type="select" options={[{label:"Matutino", value:"MATUTINO"}]} value={formData.examShift} onChange={handleChange("examShift")} required />
                    <InputField label="Código" value={formData.examCode} disabled className="bg-gray-100" />
                </div>

                <div className="space-y-8 mt-10">
                    {formData.questions.map((question, qIdx) => (
                        <div key={qIdx} className="p-6 bg-white border-2 border-blue-900 rounded-2xl">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold">Pregunta {qIdx + 1}</h3>
                                <button type="button" onClick={() => setFormData(prev => ({...prev, questions: prev.questions.filter((_, i) => i !== qIdx)}))} className="text-red-500">
                                    <TrashIcon className="size-5" />
                                </button>
                            </div>

                            <InputField 
                                value={question.text} 
                                onChange={(e) => {
                                    const updated = [...formData.questions];
                                    updated[qIdx].text = e.target.value;
                                    setFormData(prev => ({...prev, questions: updated}));
                                }} 
                            />

                            <div className="mt-4 space-y-3">
                                {question.answers.map((answer, aIdx) => (
                                    <div key={aIdx} className="flex items-center gap-4 bg-gray-50 p-2 rounded-lg">
                                        <input 
                                            type="radio" 
                                            name={`radio-group-${qIdx}`} 
                                            checked={answer.correct === true}
                                            onChange={() => handleCorrectAnswer(qIdx, aIdx)}
                                            className="size-5 accent-blue-900 cursor-pointer"
                                        />
                                        <input 
                                            type="text" 
                                            className="flex-1 text-sm bg-transparent border-none focus:ring-0"
                                            value={answer.text}
                                            onChange={(e) => {
                                                const updated = [...formData.questions];
                                                updated[qIdx].answers[aIdx].text = e.target.value;
                                                setFormData(prev => ({...prev, questions: updated}));
                                            }}
                                        />
                                        <button type="button" onClick={() => handleDeleteAnswer(qIdx, aIdx)} className="text-gray-400">
                                            <TrashIcon className="size-5" />
                                        </button>
                                    </div>
                                ))}
                                <button 
                                    type="button" 
                                    onClick={() => {
                                        const updated = [...formData.questions];
                                        updated[qIdx].answers.push({ text: "", correct: false });
                                        setFormData(prev => ({...prev, questions: updated}));
                                    }}
                                    className="text-blue-900 text-sm font-bold mt-2"
                                >
                                    + Agregar opción
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex gap-4 pt-10">
                    <button type="button" onClick={() => setFormData(prev => ({...prev, questions: [...prev.questions, {text: "", answers: []}]}))} className="flex-1 py-4 border-2 border-blue-900 rounded-xl font-bold">Agregar Pregunta</button>
                    <button type="submit" disabled={isSubmitting} className="flex-1 py-4 bg-blue-900 text-white rounded-xl font-bold disabled:bg-gray-400">
                        {isSubmitting ? "Enviando..." : "Actualizar Examen"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateExamScreen;