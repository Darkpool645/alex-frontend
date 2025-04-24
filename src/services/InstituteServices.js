import { jwtDecode } from "jwt-decode";
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const registerInstitute = async (data) => {
    try {
        const response = await fetch(`${API_BASE}/institute/new-institute`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.schoolName,
                address: data.address,
                phoneContact: data.phoneContact,
                emailContact: data.emailContact,
                accessCode: data.userEmail,
                username: data.fullName
            })
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const result = await response.json();
        console.log("Successful request:", result);
        return result;
    } catch (ex) {
        console.error("Error during registerInstitute request:", ex);
        throw ex;
    }
};

export const getInstituteInfo = async () => {
    try {
        const token = localStorage.getItem("t");
        const decoded = jwtDecode(token);
        const response = await fetch(`${API_BASE}/userAccount/getSchool?email=${decoded.sub}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error(`HTTP error! status : ${response.status}`);
        const result = await response.json();
        return result;
    } catch (ex) {
        console.error("Error during getInstituteInfo request:", ex);
        throw ex;
    }
}

export const getEmployeesAmount = async (instituteId) => {
    try {
        const response = await fetch(`${API_BASE}/userAccount/count-personal/${instituteId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        return result;
    }
    catch (ex) {
        console.error("Error during getEmployeesAmount:", ex);
        throw ex;
    }

}
