import useInstitute from "@/hooks/useInstituteHook";
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const registerTeacher = async (formData) => {
    try{
        const response = await fetch (`${API_BASE}/userAccount/new-teacher`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                "username": formData.username,
                "name": formData.name,
                "idInstitute": formData.idInstitute
            })
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error){ 
        console.error("Error during registerEmployee request:", error);
        throw error;
    }
}

export const getTeachersList = async (idInstitute) => {
    try{
        const response = await fetch (`${API_BASE}/userAccount/getTeachers?idInstitute=${idInstitute}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error(`HTTP error! status ${response.status}`);
        const data = await response.json();
        return data;
    }catch (error) {
            console.error("Error during getTeachersListt request:", error);
            throw error;
         }
}
