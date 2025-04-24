import { useState } from "react";

const useForm = (initialData = {}, validationSchema = {}) => {
    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const handleChange = (field) => (e) => {
        const value = e.target?.value ?? e;
        setFormData((prev) => ({ ...prev, [field]: value }));
        validateField(field, value);
    };

    const validateField = (field, value) => {
        const rules = validationSchema[field];
        if (!rules) return;

        let error = "";

        if (rules.required) {
            if (Array.isArray(value)) {
                if (value.length === 0) {
                    error = "Debe contener al menos un elemento";
                }
            } else if (!value) {
                error = "Campo obligatorio";
            }
        }

        if (!error && rules.minLength && value.length < rules.minLength) {
            error = `Debe tener al menos ${rules.minLength} caracteres`;
        }

        if (!error && rules.maxLength && value.length > rules.maxLength) {
            error = `Debe tener como máximo ${rules.maxLength} caracteres`;
        }

        if (!error && rules.pattern) {
            const regex = new RegExp(rules.pattern);
            if (!regex.test(value)) {
                error = rules.patternMessage || "Formato inválido";
            }
        }

        if (!error && rules.type) {
            switch (rules.type) {
                case "number":
                    if (isNaN(value)) error = "Debe ser un número";
                    break;
                case "date":
                    if (isNaN(new Date(value).getTime())) error = "Fecha inválida";
                    break;
                case "email":
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) error = "Email inválido";
                    break;
                default:
                    break;
            }
        }

        setErrors((prev) => ({ ...prev, [field]: error }));
        return error;
    };

    const validateAllFields = () => {
        const newErrors = {};
        Object.entries(validationSchema).forEach(([field]) => {
            const value = formData[field];
            const error = validateField(field, value);
            if (error) newErrors[field] = error;
        });
        return newErrors;
    };

    const handleSubmit = (onSubmit) => (e) => {
        e.preventDefault();
        const newErrors = validateAllFields();
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
