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

export const RegisterExam = async (formData) => {
    try{
        const response = await fetch(`${API_BASE}/exam/create-exam`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error during registerExam request:", error);
        throw error;
    }
}

export const getExamAmout = async (instituteId) => {
    try{
        const response = await fetch(`${API_BASE}/exam/get-amount?instituteId=${instituteId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) throw new Error(`HTTP error! status ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error durigngetExamAmount request:", error);
        throw error;
    }
}

export const getExam = async (examCode) => {
    try{
        const response = await fetch(`${API_BASE}/exam/get-exam?examCode=${examCode}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error(`HTTP error! status ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error during getExam request:", error);
        throw error;
    }
}

export const getExamPageables = async (instituteId, page) =>{
    try{
        const response = await fetch(`${API_BASE}/exam/get-pageable-exams?instituteId=${instituteId}&size=10&page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error(`HTTP error! status ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error during getExamPageables request:", error);
        throw error;
    }
}   

export const saveStudentAnswers = async (questions, studentName, examReference, score) => {
    try {
      const response = await fetch(
        `${API_BASE}/exam/register-student-answers?studentName=${studentName}&examReference=${examReference}&score=${score}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(questions),
        }
      );
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error during saveStudentAnswers request: ", error);
      throw error;
    }
  };
  

export const getStudentAnswersByExam = async(examReference) => {
    try {
        const response = await fetch(`${API_BASE}/exam/get-student-results?examReference=${examReference}`, {
            method: 'GET'
        });
        if (!response.ok) throw new Error(`HTTP error! status ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error during getStudentAnswersByExam request:", error);
        throw error;
    }
}
