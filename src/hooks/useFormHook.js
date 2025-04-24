import { useState } from "react";

const useForm = (initialData = {}, validationSchema = {}) => {
    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const handleChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
        setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    const validateField = (field, value) => {
        const rules = validationSchema[field];
        if (rules?.required) {
            if (Array.isArray(value)) {
                if (value.length === 0) {
                    setErrors((prev) => ({ ...prev, [field]: "Debe contener al menos un elemento" }));
                    return;
                }
            } else if (!value) {
                setErrors((prev) => ({ ...prev, [field]: "Campo obligatorio" }));
                return;
            }
        }
        setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    const handleSubmit = (onSubmit) => (e) => {
        e.preventDefault();
        const newErrors = {};

        Object.entries(validationSchema).forEach(([field, rules]) => {
            const value = formData[field];

            if (rules?.required) {
                if (Array.isArray(value)) {
                    if (value.length === 0) {
                        newErrors[field] = "Debe contener al menos un elemento";
                    }
                } else if (!value) {
                    newErrors[field] = "Campo obligatorio";
                }
            }
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            onSubmit(formData);
        }
    };

    return {
        formData,
        errors,
        handleChange,
        validateField,
        handleSubmit,
        setFormData,
        setErrors
    };
};

export default useForm;
