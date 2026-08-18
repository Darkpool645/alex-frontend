import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { useExam } from "@/context/ExamContext";
import { saveStudentAnswers } from "@/services/ExamServices";
import { useNavigate } from "react-router-dom";

const EXAM_KEY = "exam_submitted";

const ExamAnswerScreen = () => {
  const navigate = useNavigate();
  const { questions, student, examName } = useExam();
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const hasToasted = useRef(false);
  const [submittedAt, setSubmittedAt] = useState(null);

  useEffect(() => {
    if (questions.length > 0 && selectedAnswers.length === 0) {
      setSelectedAnswers(Array(questions.length).fill(null));
    }
  }, [questions]);

  useEffect(() => {
    const alreadySubmitted = localStorage.getItem(EXAM_KEY);
    if (alreadySubmitted) {
      setIsSubmitted(true);
      const storedResult = JSON.parse(alreadySubmitted);
      setResult(storedResult.result);
      setSelectedAnswers(storedResult.answers);
      if (!hasToasted.current) {
        toast.info("Ya no puedes modificar tu calificación");
        hasToasted.current = true;
      }
    }

    if (student === "" || student === null) {
      localStorage.clear();
      navigate("/");
    }
  }, []);

  useEffect(() => {
    // El examen debe bloquearse en cuanto el estudiante entra a la vista,
    // sin importar si ya seleccionó alguna respuesta. Solo evitamos
    // dispararlo si el examen ya fue enviado o si las preguntas todavía
    // no han cargado (para no bloquear antes de que la vista esté lista).
    const canLockdown = () => !isSubmitted && questions.length > 0;

    // Punto único de disparo del bloqueo, para no repetir la misma
    // lógica en cada listener y evitar envíos/toasts duplicados
    // (autoSubmit ya es idempotente por el guard `if (isSubmitted) return;`).
    const triggerLockdown = (reason) => {
      if (!canLockdown()) return;
      autoSubmit();
      if (!hasToasted.current) {
        toast.info(
          "Saliste de la aplicación. Ya no puedes registrar nuevas respuestas"
        );
        hasToasted.current = true;
      }
      console.log("Bloqueo de examen disparado por:", reason);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        triggerLockdown("visibilitychange");
      }
    };

    const handleBeforeUnload = () => {
      triggerLockdown("beforeunload");
    };

    // Chrome (y navegadores basados en Chromium) permiten dividir la
    // ventana para ver dos pestañas al mismo tiempo (split view). En ese
    // modo la página del examen sigue "visible" en pantalla aunque el
    // alumno haga clic en la otra pestaña dividida, así que
    // document.visibilityState nunca cambia a "hidden" y
    // visibilitychange no se dispara. Lo que sí cambia es el FOCO: al
    // interactuar con el otro panel, esta ventana/documento deja de
    // tener el foco. Usamos blur como señal principal para ese caso.
    const handleWindowBlur = () => {
      triggerLockdown("window-blur");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("blur", handleWindowBlur);

    // Watchdog de respaldo: por si en alguna versión/combinación de
    // navegador ni "blur" ni "visibilitychange" se disparan de forma
    // confiable durante el split view. Revisa periódicamente el estado
    // real de foco/visibilidad del documento.
    const focusWatchdog = setInterval(() => {
      if (!document.hasFocus() || document.visibilityState !== "visible") {
        triggerLockdown("focus-watchdog");
      }
    }, 1500);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("blur", handleWindowBlur);
      clearInterval(focusWatchdog);
    };
  }, [isSubmitted, selectedAnswers, questions]);
  const handleSelect = (qIndex, aIndex) => {
    if (isSubmitted) return;
    const updated = [...selectedAnswers];
    updated[qIndex] = aIndex;
    setSelectedAnswers(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    autoSubmit();
  };

  const autoSubmit = async () => {
    if (isSubmitted) return;
    const submissionDate = new Date();
    setSubmittedAt(submissionDate);
    const responses = questions.map((q, index) => {
      const selectedIndex = selectedAnswers[index];
      const selectedAnswer = q.answers[selectedIndex];

      return {
        question: q.text,
        answer: selectedAnswer?.text || "", 
        isCorrect: selectedAnswer?.isCorrect === true,
      };
    });

    const correctCount = responses.filter((r) => r.isCorrect).length;
    const score = correctCount;
    const output = {
      q: responses,
      score: parseFloat(score.toFixed(1)),
    };

    localStorage.setItem(
      EXAM_KEY,
      JSON.stringify({ result: output, answers: selectedAnswers })
    );

    setResult(output);
    setIsSubmitted(true);

    try {
      setIsSaving(true); // start loader
      await saveStudentAnswers(
        responses,
        student,
        localStorage.getItem("examReference"),
        output.score
      );
      console.log("Respuestas enviadas al servidor con éxito");
      toast.success("Respuestas enviadas al servidor correctamente");
    } catch (error) {
      toast.error("Error al guardar tus respuestas en el servidor");
    } finally {
      setIsSaving(false); // stop loader
    }

    if (!hasToasted.current) {
      toast.success("Respuestas guardadas automáticamente");
      hasToasted.current = true;
    }
  };

  console.log("Estudiante", student);
  console.log("submission", submittedAt);

  return (
    <form onSubmit={handleSubmit} className="py-4">
      {isSubmitted ? (
        result && (
          <div className="mt-6 p-4 bg-green-100 rounded shadow">
            <h2 className="font-bold text-lg mb-2">{examName}</h2>
            {submittedAt && (
              <>
              <h2> Fecha de entrega: {submittedAt.toLocaleDateString("es-ES")}</h2>
              <h2>Hora de entrega: {submittedAt.toLocaleTimeString("es-ES")}</h2>
              </>
            )}
          </div>
        )
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {questions.map((question, qIndex) => (
              <div key={qIndex} className="border rounded-lg p-4">
                <h2 className="font-bold text-lg mb-2">
                  {qIndex + 1}. {question.text}
                </h2>
                <ul className="space-y-2">
                  {question.answers.map((answer, aIndex) => (
                    <li key={aIndex} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                        checked={selectedAnswers[qIndex] === aIndex}
                        onChange={() => handleSelect(qIndex, aIndex)}
                        disabled={isSubmitted}
                      />
                      <span className="p-2 rounded w-full bg-gray-100">
                        {String.fromCharCode(65 + aIndex)}. {answer.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={isSubmitted || isSaving}
            className={`px-4 py-2 rounded w-full mt-3 text-white ${
              isSubmitted || isSaving
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSaving ? "Guardando..." : "Enviar respuestas"}
          </button>
        </>
      )}
    </form>
  );
};

export default ExamAnswerScreen;
