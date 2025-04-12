import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const SectionWrapper = ({ children, threshold, displacement = "vertical" }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: threshold
    });

    const initialPosition = {
        vertical: { opacity: 0, y: 50 },
        left: { opacity: 0, x: -50 },
        right: { opacity: 0, x: 50 }
    }

    return (
        <motion.section 
            ref={ref} 
            initial={initialPosition[displacement] || initialPosition.vertical} 
            animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
        >
            {children}
        </motion.section>
    );
};

export default SectionWrapper;