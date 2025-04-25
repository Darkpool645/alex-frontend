import { PlusCircleIcon, ArrowsUpDownIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import Breadcrumb from "@/components/common/Breadcrumb";
import useInstitute from "@/hooks/useInstituteHook";
import { Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Fragment, useState } from "react";
import useForm from "@/hooks/useFormHook";
import InputField from "@/components/common/InputField";
import { registerTeacher } from "@/services/AdminServices";
import { toast } from "react-toastify";

const EmployeeListScreen = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleDialog = () => {
        setIsOpen(!isOpen);
    }
    const baseForm = {
        "username": "",
        "name": ""
    };
    const baseSchema = {
        username: { required: true },
        name: { required: true, minLenght:8, maxLenght:8 }
    }
    const { institute } = useInstitute();
    const menu = [
        { label: "Docentes", href: "/employees", icon: UserGroupIcon }
    ];
    const { formData, errors, handleChange, validateField, handleSubmit, setFormData } = useForm(baseForm, baseSchema);
    const onSubmit = async(data) => {
        console.log("Datos del nuevo empleado", data);
        const response = await registerTeacher({
            ...data,
            idInstitute: institute.idInstitute
        });
        console.log("respuesta del servidor",response);
        if (response.error === false) {
            toast.success("Docente registrado exitosamente");
            setIsOpen(false);
        }
    };
    return (
        <>
            <div className={`w-full pt-10 transition-all duration-300 ${isOpen ? 'blur-sm pointer-events-none' : ''}`}>
                <div className="flex items-center justify-between mb-7">
                    <Breadcrumb items={menu} />
                    <h1 className="text-5xl font-bold">Docentes</h1>
                </div>
                <Button onClick={toggleDialog} className="rounded-md flex items-center gap-3 bg-blue-900 px-4 py-2 text-sm font-medium text-white">
                    <PlusCircleIcon className="text-white size-6" />
                    Registrar nuevo Empleado
                </Button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={toggleDialog}>
                    {/* Fondo con animación */}
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                    </TransitionChild>

                    {/* Panel con animación */}
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                    Registrar nuevo Docente
                                </DialogTitle>
                                <div className="mt-4">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 pt-2">
                                            <InputField label="Nombre del docente" required value={formData.name} onChange={handleChange("name")} placeholder="Nombre del docente"
                                                error={!!errors.name} errorMessage={errors.name} onBlur={(e) => validateField("name", e.target.value)} />
                                            <InputField label="Código del docente" required value={formData.username} onChange={handleChange("username")} placeholder="Código del empleado"
                                                error={!!errors.username} errorMessage={errors.username} onBlur={(e) => validateField("username", e.target.value)} />
                                        </div>
                                        <button type="submit" className="w-full mt-5 bg-blue-900 text-white rounded-lg py-2 px-3 mb-3 font-semibold">
                                            Registrar docente
                                        </button>
                                    </form>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default EmployeeListScreen;
