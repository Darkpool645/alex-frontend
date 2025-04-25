import { useEffect, useState } from "react";
import initialExam from "@/utils/ExamSample.js";

const EXAM_KEY = "exam_submitted";

const ExamAnswerScreen = () => {
  const [questions, setQuestions] = useState(initialExam.questions);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(initialExam.questions.length).fill(null)
  );
  const [result, setResult] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Revisa si ya envió el examen antes
  useEffect(() => {
    const alreadySubmitted = localStorage.getItem(EXAM_KEY);
    if (alreadySubmitted) {
      setIsSubmitted(true);
      const storedResult = JSON.parse(alreadySubmitted);
      setResult(storedResult.result);
      setSelectedAnswers(storedResult.answers);
    }
  }, []);

  const handleSelect = (qIndex, aIndex) => {
    if (isSubmitted) return;
    const updated = [...selectedAnswers];
    updated[qIndex] = aIndex;
    setSelectedAnswers(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const responses = questions.map((q, index) => {
      const selectedIndex = selectedAnswers[index];
      const selectedAnswer = q.answers[selectedIndex];
      const isCorrect = selectedAnswer?.is_correct === true;

      return {
        question: q.text,
        is_correct: isCorrect,
      };
    });

    const correctCount = responses.filter((r) => r.is_correct).length;
    const score = (correctCount / questions.length) * 10;
    const output = {
      questions: responses,
      score: parseFloat(score),
    };

    // Guardar en localStorage
    localStorage.setItem(
      EXAM_KEY,
      JSON.stringify({ result: output, answers: selectedAnswers })
    );

    setResult(output);
  };

  return (
    <form onSubmit={handleSubmit} className="py-4">
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
        disabled={isSubmitted}
        className={`px-4 py-2 rounded w-full mt-3 text-white ${
          isSubmitted
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        Enviar respuestas
      </button>

      {result && (
        <div className="mt-6 p-4 bg-green-100 rounded shadow">
          <h2 className="font-bold text-lg mb-2">Resultados</h2>
          <p>Score: {result.score}/{questions.length}</p>
        </div>
      )}
    </form>
  );
};

export default ExamAnswerScreen;
