import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { UserIcon, AcademicCapIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LoginScreen = () => {
    const [username, setUsername] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = (ev) => {
        ev.preventDefault();
        validateInput(username);
        // TODO - Realizar la petición al backend
        console.log(`REQUEST:  username - ${username}`);
    };

    const validateInput = (value) => {
        const usernamePattern = /^[a-zA-Z0-9@._-]+$/;
        if (value.length === 0) {
            setError(true);
            setErrorMessage("Campo requerido.");
        } else if (!usernamePattern.test(value)) {
            setError(true);
            setErrorMessage("Formato inválido.");
        } else {
            setError(false);
            setErrorMessage(null);
        }
    }

    return (
        <div className="h-screen flex flex-col items-center justify-start pt-24 w-full">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">
                Iniciar Seisón
            </h2>
            <TabGroup className="w-full px-4 lg:px-24" onChange={() => {
                setUsername("")
                setError(false)
            }}>
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
                            <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
                                <label className={`font-medium transition-colors duration-200 ${error ? "text-red-500" : "text-gray-700"}`}>
                                    Clave de acceso {" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input type="text" className={`border p-2 rounded w-full focus:outline-none focus:ring-2 ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
                                    placeholder="Ingrese su clave de acceso"
                                    value={username}
                                    onChange={(ev) => {
                                        setUsername(ev.target.value)
                                        validateInput(ev.target.value)
                                    }}
                                    pattern="^[a-zA-Z0-9@._-]+$"
                                    onBlur={(ev) => validateInput(ev.target.value)} />
                                <div className="w-full min-h-6">
                                    <AnimatePresence>
                                        {error && (
                                            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.3 }} className="text-red-500 font-semibold">
                                                {errorMessage}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <button className="bg-blue-900 text-white p-2 rounded transition">
                                    Iniciar Sesión
                                </button>
                            </form>
                        </TabPanel>
                    ))}
                </TabPanels>
            </TabGroup>
            <p>{username}</p>
        </div>
    )
}

const tabs = [
    { name: "administrador", icon: UserIcon },
    { name: "docente", icon: AcademicCapIcon }
]

export default LoginScreen;