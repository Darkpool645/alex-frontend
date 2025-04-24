import InputField from "@/components/common/InputField";
import useForm from "@/hooks/useFormHook";
import { useNavigate } from "react-router-dom";

const ExamAccessScreen = () => {
    const navigate = useNavigate();
    const baseForm = {
        examCode: ""
    };

    const baseSchema = {
        examCode: { required: true, minLength: 8, maxLength: 8 }
    };

    const { formData, errors, handleChange, validateField, handleSubmit, setFormData } = useForm(baseForm, baseSchema);

    const onSubmit = (data) => {
        console.log("codigo del examen", data);
        setTimeout(() => {
            navigate("/student/exam-instructions")
        }, 2000);
    }

    return (
        <div className="min-h-[calc(100vh-3.6rem)] flex flex-col items-center justify-start pt-24 w-full">
            <h2 className=" text-3xl font-bold mb-6 text-center text-blue-900">
                Acceso al examen
            </h2>
            <div className="w-full px-20">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputField label="Código del examen" required error={!!errors.examCode} value={formData.examCode}
                        onChange={handleChange("examCode")} errorMessage={errors.examCode} onBlur={(e) => validateField("examCode", e.target.value)} />
                    <button type="submit" className="mt-10 text-white bg-blue-900 w-full rounded-md px-3 py-2">
                        Acceder al examen
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ExamAccessScreen;