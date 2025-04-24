const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const ParseExam = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${API_BASE}/exam/analize-file`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        console.log("Successful request:", data);
        return data;
    } catch (error) {
        console.error("Error during parseExam request:", error);
        throw error;
    }
};
