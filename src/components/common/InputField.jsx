import { AnimatePresence, motion } from "framer-motion";

const InputField = ({ label, value, onChange, onBlur, placeholder, type = "text", error = false, errorMessage = "", icon: Icon = null,
    iconPosition = "right", required = false, options = [] }) => {

    const isSelect = type === "select";

    return (
        <div className="flex flex-col space-y-1 w-full">
            <label className={`font-medium transition-colors duration-200 ${error ? "text-red-500" : "text-gray-700"
                }`}>
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                {isSelect ? (
                    <select value={value} onChange={onChange} onBlur={onBlur} className={`w-full border p-2 rounded appearance-none focus:outline-none focus:ring-2 ${error
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                        } ${Icon && iconPosition === "left" ? "pl-10" : ""} ${Icon && iconPosition === "right" ? "pr-10" : ""
                        }`}>
                        <option value="">Seleccione una opción</option>
                        {options.map(({ label, value }) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input type={type} className={`w-full border p-2 rounded focus:outline-none focus:ring-2 ${error
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                        } ${Icon && iconPosition === "left" ? "pl-10" : ""} ${Icon && iconPosition === "right" ? "pr-10" : ""
                        }`} 
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                    />
                )}
                {Icon && (
                    <Icon className={`absolute top-2.5 size-5 text-gray-400 pointer-events-none ${iconPosition === "left" ? "left-2.5" : "right-2.5"
                        }`}
                    />
                )}
            </div>
            <div className="min-h-6">
                <AnimatePresence>
                    {error && (
                        <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.3 }}
                            className="text-red-500 font-semibold"
                        >
                            {errorMessage}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default InputField;