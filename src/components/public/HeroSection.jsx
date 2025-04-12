import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
    return (
        <motion.section className="w-full h-feat flex items-center flex-col pt-44 pb-28 px-4 lg:px-24 gap-y-5"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            <h1 className="font-bold text-5xl whitespace-pre-line text-center">Exámenes seguros y sin trampas,{"\n"}en segundos</h1>
            <h2 className="font-medium text-xl md:text-2xl text-gray-400 whitespace-pre-line text-center">
                Convierte tus documentos en {"\n"} exámenes listos para aplicar y {"\n"} garantizar la integridad de cada {"\n"} prueba.
            </h2>
            <Link to="/subscribe"
                className="text-white bg-gradient-to-r drop-shadow-xl from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus-ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                Registrarse
            </Link>
        </motion.section>
    );
};

export default HeroSection;