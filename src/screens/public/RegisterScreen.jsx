import InputField from "@/components/common/InputField";
import useForm from "@/hooks/useFormHook";
import FileDropInput from "@/components/common/FileDropInput";
import { Link, useNavigate } from "react-router-dom";
import { registerInstitute } from "@/services/InstituteServices";

const RegisterScreen = () => {
    const navigate = useNavigate();
    const initialForm = {
        schoolName: "",
        address: "",
        fullName: "",
        emailContact: "",
        phoneContact: "",
        userEmail: "",
        shoolLogo: null,
    };

    const validationSchema = {
        schoolName: { required: true },
        address: { required: true },
        fullName: { required: true },
        emailContact: { required: true },
        phoneContact: { required: true },
        userEmail: { required: true },
        schoolLogo: { required: false }
    };
    const { formData, errors, handleChange, validateField, handleSubmit } = useForm(initialForm, validationSchema);


    const onSubmit = async (data) => {
        try {
            const result = await registerInstitute(data);
            if (result.httpStatusCode === 201) {
                navigate("/login");
            }
        } catch (error) {
            console.error("Error en el registro:", error);
        }
    };
    

    return (
        <div className="min-h-[calc(100vh-3.6rem)] flex flex-col items-center justify-start pt-24 w-full">
            <h2 className="text-3xl font-bold text-center text-blue-900">
                Registrar mi escuela
            </h2>
            <div className="w-full px-4">
                <form className="flex flex-col space-y-3" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 pt-10">
                        <InputField label={"Nombre de la institución"} value={formData.schoolName} onChange={handleChange("schoolName")}
                            placeholder={"Nombre de la institución"} required error={!!errors.schoolName} errorMessage={errors.schoolName}
                            onBlur={(e) => validateField("schoolName", e.target.value)} />
                        <InputField label={"Dirección de la institución"} value={formData.address} onChange={handleChange("address")}
                            placeholder={"Dirección de la institución"} required error={!!errors.address} errorMessage={errors.address}
                            onBlur={(e) => validateField("address", e.target.value, false)} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
                        <InputField label={"Correo de contacto"} value={formData.emailContact} onChange={handleChange("emailContact")}
                            placeholder="Correo de contacto" required error={!!errors.emailContact} errorMessage={errors.emailContact}
                            onBlur={(e) => validateField("emailContact", e.target.value)} />
                        <InputField label={"Teléfono de contacto"} value={formData.phoneContact} onChange={handleChange("phoneContact")}
                            placeholder="Teléfono de contacto" required error={!!errors.phoneContact} errorMessage={errors.phoneContact}
                            onBlur={(e) => validateField("phoneContact", e.target.value)} />
                    </div>
                    <FileDropInput label="Logo de la institución" value={formData.schoolLogo} onChange={(file) => handleChange("schoolLogo")({ target: { value: file } })}
                        onBlur={() => validateField("schoolLogo", formData.schoolLogo)} accept="image/jpeg, image/png" error={!!errors.schoolLogo} errorMessage={errors.schoolLogo} />
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
                        <InputField label={"Nombre"} value={formData.fullName} onChange={handleChange("fullName")} placeholder="Nombre de empleado" required
                            error={!!errors.fullName} errorMessage={errors.fullName} onBlur={(e) => validateField("fullName", e.target.value)} />
                        <InputField label={"Correo personal"} value={formData.userEmail} onChange={handleChange("userEmail")} placeholder="Correo personal" required
                            error={!!errors.userEmail} errorMessage={errors.userEmail} onBlur={(e) => validateField("userEmail", e.target.value)} />
                    </div>
                    <button type="submit" className="bg-blue-900 text-white rounded-lg py-2 px-3 w-full font-semibold mt-10 mb-10">Registrar Institución</button>
                </form>
                <div className="w-full text-center justify-center flex my-10">
                    ¿Ya tienes una cuenta?
                    <Link to="/login" className="underline text-blue-900">Iniciar sesión</Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterScreen;