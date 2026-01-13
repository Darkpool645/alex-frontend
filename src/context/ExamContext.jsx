import { createContext, useContext, useEffect, useState } from "react";

const ExamContext = createContext();
const LOCAL_STORAGE_KEY = "exam_data";

export const ExamProvider = ({ children }) => {
  const [questions, setQuestionsState] = useState([]);
  const [student, setStudent] = useState("");
  const [examName, setExamName] = useState("");

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

  const saveExamReference = (examId) => {
    localStorage.setItem("examReference", examId);
  }

  const setExamNames = (name) => {
    setExamName(name);
    localStorage.setItem("EXAM_NAME", name);
  }

  return (
    <ExamContext.Provider value={{ questions, setQuestions, saveExamReference, student, setStudent, setExamNames, examName}}>
      {children}
    </ExamContext.Provider>
  );
};

export const useExam = () => useContext(ExamContext);
