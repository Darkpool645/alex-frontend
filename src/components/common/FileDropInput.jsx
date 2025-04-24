import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/solid";

const FileDropInput = ({
    label = "Sube tu archivo",
    value = null,
    onChange = () => { },
    onBlur = () => { },
    accept = { "image/*": [] },
    multiple = false,
    required = false,
    error = false,
    errorMessage = ""
}) => {
    const [preview, setPreview] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
        const selected = multiple ? acceptedFiles : acceptedFiles[0];
        onChange(selected);
    }, [onChange, multiple]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple,
        onBlur,
        accept
    });

    useEffect(() => {
        if (value && value.type?.startsWith("image/")) {
            const objectUrl = URL.createObjectURL(value);
            setPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setPreview(null);
        }
    },[value]);

    const clearFile = () => {
        onChange(null);
        setPreview(null);
    };

    return (
        <div className="flex flex-col space-y-1 w-full">
            <label className={`font-medium transition-colors duration-200 ${error ? "text-red-500" : "text-gray-700"}`}>
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div {...getRootProps()}
                className={`border-2 border-dashed p-6 rounded-lg text-center cursor-pointer transition-colors duration-200
                    ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}
                    ${error ? "border-red-500 bg-red-50" : ""}`}>
                <input {...getInputProps()} />
                <ArrowUpTrayIcon className="mx-auto mb-2 text-gray-500 size-8" />
                <p className="text-sm text-gray-600">
                    {isDragActive ? "Suelta tu archivo aquí" : "Arrastra tu archivo o has clic para subir"}
                </p>
            </div>
            <AnimatePresence>
                {value && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="mt-3 p-3 bg-blue-50 border border-blue-300 rounded flex items-center justify-between">
                        {preview ? (
                            <img src={preview} alt="preview" className="size-16 object-cover roundeed border" />
                        ):(
                            <div className="text-sm text-blue-800 truncate">{value.name}</div>
                        )}
                        <button type="button    " onClick={clearFile} className="text-red-500 hover:text-red-700">
                            <XMarkIcon className="size-5" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="min-h-6">
                <AnimatePresence>
                    {error && (
                        <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.3 }}
                            className="text-red-500 font-semibold">
                            {errorMessage}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default FileDropInput;