import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { UserIcon, AcademicCapIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import InputField from "@/components/common/InputField";
import useForm from "@/hooks/useFormHook";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "@/services/authServices";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

const LoginScreen = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const onSubmit = async(data) => {
        try{
            const result = await loginRequest(data);
            if (result.httpStatusCode === 200) {
                login(result.data);
                navigate("/admin");
            } else { 
            }
        } catch (error) {
            console.error("error en la peticion:", error);
            toast.error("Credenciales inválidas");  
        }
    };

    const baseForm = {
        accessCode: "",
    }

    const baseSchema = {
        accessCode: { required: true }
    }

    const { formData, errors, handleChange, validateField, handleSubmit, setFormData } = useForm(baseForm, baseSchema);

    return (
        <div className="min-h-[calc(100vh-3.6rem)] flex flex-col items-center justify-start pt-24 w-full">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">
                Iniciar Sesión
            </h2>
            <TabGroup className="w-full px-4 lg:px-24">
                <TabList className="flex space-x-1 mb-6 w-full">
                    {tabs.map(({ name, icon: Icon }) => (
                        <Tab key={name} className={({ selected }) =>
                            `flex items-center justify-center flex-1 p-2 rounded transition-colors duration-200 ${selected ? "bg-blue-900 text-white" : "bg-gray-200 text-gray-700"
                            }`
                        }>
                            <Icon className="size-5 mr-2" />
                            {name}
                        </Tab>
                    ))}
                </TabList>
                <TabPanels>
                    {tabs.map((_, index) => (
                        <TabPanel key={index}>
                            <form className="flex flex-col space-y-3" onSubmit={handleSubmit(onSubmit)}>
                                <InputField label="Clave de accesso" required value={formData.accessCode} onChange={handleChange("accessCode")}
                                    placeholder="Ingrese su clave de acceso" error={!!errors.accessCode} errorMessage={errors.accessCode}
                                    onBlur={(e) => validateField("accesCode", e.target.value)} />
                                <button className="bg-blue-900 text-white p-2 rounded transition">
                                    Iniciar Sesión
                                </button>
                            </form>
                        </TabPanel>
                    ))}
                </TabPanels>
            </TabGroup>
            <Link to="/exam-code" className="underline text-blue-900 text-lg mt-10">Ingresar como alumno</Link>
        </div>
    )
}

const tabs = [
    { name: "administrador", icon: UserIcon },
    { name: "docente", icon: AcademicCapIcon }
]

export default LoginScreen;