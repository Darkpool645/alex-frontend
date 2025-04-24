const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const loginRequest = async (data) => {
    try{
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                "username": data.accessCode,
                "password": "1234"
            })
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error during login request:", error);
        throw error;
    }
}