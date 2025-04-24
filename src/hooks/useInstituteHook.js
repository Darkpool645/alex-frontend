import { useState, useEffect } from "react";
import { getInstituteInfo } from "@/services/InstituteServices";

const useInstitute = () => {
    const [institute, setInstitute] = useState(null);

    useEffect(() => {
        const fetchInstitute = async () => {
            try{
                const response = await getInstituteInfo();
                setInstitute(response.data);
            } catch (err) {
                console.error("Error during fetching data", err);
            } 
        };
        fetchInstitute();
    },[]);
    return { institute };
};

export default useInstitute;