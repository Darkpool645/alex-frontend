import { useState } from "react";
import initialExam from "@/utils/ExamSample.js";

const ExamAnswerScreen = () => {
  const [questions, setQuestions] = useState(initialExam.questions);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(initialExam.questions.length).fill(null)
  );
  const [result, setResult] = useState(null);

  const handleSelect = (qIndex, aIndex) => {
    const updated = [...selectedAnswers];
    updated[qIndex] = aIndex;
    setSelectedAnswers(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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

    console.log("Resultado:", output);
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
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full mt-3"
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
