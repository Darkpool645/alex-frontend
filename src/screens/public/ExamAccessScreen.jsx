import InputField from "@/components/common/InputField";
import useForm from "@/hooks/useFormHook";
import { useNavigate } from "react-router-dom";
import { getExam } from "@/services/ExamServices";
import { useExam } from "@/context/ExamContext";
import { toast } from "react-toastify";

const ExamAccessScreen = () => {
    const navigate = useNavigate();
    const baseForm = {
        examCode: "",
        studentName: ""
    };

    const baseSchema = {
        examCode: { required: true, minLength: 8, maxLength: 8 },
        studentName: { required: true }
    };

    const { formData, errors, handleChange, validateField, handleSubmit } = useForm(baseForm, baseSchema);
    const { setQuestions, saveExamReference, setStudent } = useExam();

    const onSubmit = async (data) => {
        try {
            const result = await getExam(data.examCode);
            if (result === "Examen deshabilitado") {
                toast.error("El examen está deshabilitado");
                return;
            }
            console.log("datos del examen:",result);
            const questions = result?.data?.questions || [];

            if (questions.length > 0) {
                setQuestions(questions);
                saveExamReference(result?.data?.id);
                console.log("Nombre del estudiante:", data.studentName);
                setStudent(data.studentName);
                navigate('/student/exam');
            } else {
                toast.error("Código de examen erróneo o sin preguntas.");
            }
        } catch (error) {
            toast.error("Error al obtener el examen");
            console.error("Error durante la petición de getExam:", error);
        }
    };

    return (
        <div className="min-h-[calc(100vh-3.6rem)] flex flex-col items-center justify-start pt-24 w-full">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">
                Acceso al examen
            </h2>
            <div className="w-full px-20">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputField
                        label="Código del examen"
                        required
                        error={!!errors.examCode}
                        value={formData.examCode}
                        onChange={handleChange("examCode")}
                        errorMessage={errors.examCode}
                        onBlur={(e) => validateField("examCode", e.target.value)}
                    />
                    <InputField
                        label="Nombre del estudiante"
                        required
                        error={!!errors.studentName}
                        value={formData.studentName}
                        onChange={handleChange("studentName")}
                        errorMessage={errors.studentName}
                        onBlur={(e) => validateField("studentName", e.target.value)}
                    />
                    <button type="submit" className="mt-10 text-white bg-blue-900 w-full rounded-md px-3 py-2">
                        Acceder al examen
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ExamAccessScreen;


// TODO - Generar un reporte final de los examenes