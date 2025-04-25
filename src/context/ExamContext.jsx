import { createContext, useContext, useEffect, useState } from "react";

const ExamContext = createContext();
const LOCAL_STORAGE_KEY = "exam_data";

export const ExamProvider = ({ children }) => {
  const [questions, setQuestionsState] = useState([]);

  // Cargar desde localStorage al iniciar
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setQuestionsState(parsed);
        }
      } catch (err) {
        console.error("❌ Error al parsear preguntas desde localStorage", err);
      }
    }
  }, []);

  // Setter que guarda en estado y en localStorage
  const setQuestions = (newQuestions) => {
    setQuestionsState(newQuestions);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newQuestions));
  };

  return (
    <ExamContext.Provider value={{ questions, setQuestions }}>
      {children}
    </ExamContext.Provider>
  );
};

export const useExam = () => useContext(ExamContext);
