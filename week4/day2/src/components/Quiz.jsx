import { useState } from "react";

const questions = [
  {
    q: "What is React?",
    options: ["Library", "Language", "Framework"],
    answer: "Library",
  },
  {
    q: "What hook manages state?",
    options: ["useState", "useEffect", "useRef"],
    answer: "useState",
  },
  {
    q: "JSX stands for?",
    options: ["Java Syntax XML", "JavaScript XML", "JSON Syntax XML"],
    answer: "JavaScript XML",
  },
];

export default function Quiz() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");

  const next = () => {
    if (selected === questions[index].answer) setScore((s) => s + 1);
    setSelected("");
    setIndex((i) => i + 1);
  };

  if (index >= questions.length)
    return (
      <div className="max-w-md mx-auto p-4 border rounded-xl text-center">
        <h2 className="text-xl font-semibold">Quiz Complete</h2>
        <p>
          Your Score: {score}/{questions.length}
        </p>
      </div>
    );

  return (
    <div className="max-w-md mx-auto p-4 border rounded-xl space-y-3">
      <h2 className="text-lg font-medium">{questions[index].q}</h2>
      {questions[index].options.map((opt) => (
        <button
          key={opt}
          onClick={() => setSelected(opt)}
          className={`block w-full px-4 py-2 rounded border ${
            selected === opt ? "bg-blue-500 text-white" : "bg-white"
          }`}
        >
          {opt}
        </button>
      ))}
      <button
        disabled={!selected}
        onClick={next}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
      >
        {index < questions.length - 1 ? "Next" : "Finish"}
      </button>
    </div>
  );
}
