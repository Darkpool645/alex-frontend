const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const registerInstitute = async(data) => {
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
