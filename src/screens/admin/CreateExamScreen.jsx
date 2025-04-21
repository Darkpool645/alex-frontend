import { useState } from "react";
import { DocumentIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import Breadcrumb from "@/components/common/Breadcrumb";
import InputField from "@/components/common/InputField";

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

    const [formData, setFormData] = useState({
        title: "",
        mode: "",
        teacher: "",
        duration: "",
        subject: "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
        setErrors({ ...errors, [field]: "" });
    }

    const validateField = (field, value) => {
        if (!value) {
            setErrors((prev) => ({ ...prev, [field]: "Campo obligatorio" }));
        } else {
            setErrors((prev) => ({ ...prev, [field]: "" }));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        Object.entries(formData).forEach(([key, value]) => {
            if (!value) newErrors[key] = "Campo obligatorio";
        });
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            // TODO - Logica del sistema
            console.log("Formulario completado", formData);
        }
    }

    return (
        <div className="w-full pt-10">
            <div className="flex items-center justify-between">
                <Breadcrumb items={menu} />
                <h1 className="text-5xl font-bold">Nuevo examen</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-4 pt-10">
                    <InputField label={"Título del exámen"} value={formData.title} onChange={handleChange("title")} 
                        placeholder={"Campo de prueba"} required error={!!errors.title} errorMessage={errors.title} 
                        onBlur={(e) => validateField("title", e.target.value)} 
                    />
                    <InputField label={"Modalidad"} value={formData.mode} onChange={handleChange("mode")}
                        type="select" icon={ChevronDownIcon} options={modes} required  error={!!errors.mode} errorMessage={errors.mode}
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
                    <InputField label={"Materia"} value={formData.subject} onChange={handleChange("subject")}
                        required error={!!errors.subject} errorMessage={errors.subject} onBlur={(e) => validateField("subject", e.target.value)} />
                    <InputField label={"Prueba"} value={""} onChange={() => {}} required onBlur={() => {}} />
                </div>
                <button type="submit" className="bg-blue-900 text-white rounded-lg py-2 px-3 w-full font-semibold mt-10">Guardar examen</button>
            </form>
        </div>
    );
};

export default CreateExamScreen;