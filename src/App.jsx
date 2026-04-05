import React, { useEffect, useRef, useState } from 'react'
import Btn from './components/Btn';
import arrayShuffle from 'array-shuffle';
import logoQuiz from './assets/Quiz.png';

const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const input = useRef([]);

  useEffect(() => {
    fetch("https://the-trivia-api.com/v2/questions")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const changeQuestion = () => {
    const selectedOption = input.current.find(item => item && item.checked);
    if (!selectedOption) {
      alert("Please select an answer!");
      return;
    }

    if (selectedOption.value === data[questionIndex].correctAnswer) {
      setScore(prev => prev + 10);
    }

    if (questionIndex < 9) {
      setQuestionIndex(questionIndex + 1);
      input.current.forEach(el => { if (el) el.checked = false; });
    } else {
      setResult(true);
    }
  }
return (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
    <div className="w-full max-w-2xl">

      {/* Header */}
      <div className="flex items-center justify-center gap-3">
        <img src={logoQuiz} alt="Quiz Logo" className="w-70 h-70 object-contain"/>
        <h1 className="text-7xl font-extrabold text-cyan-400 tracking-tight drop-shadow-lg">
          Quiz App
        </h1>
      </div>

      {/* Card */}
      <div className="bg-gray-900 border border-gray-700 rounded-3xl shadow-2xl p-8 text-white">

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="w-12 h-12 border-4 border-gray-600 border-t-cyan-400 rounded-full animate-spin" />
            <p className="text-cyan-300 font-medium">Loading questions...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <p className="text-5xl">⚠️</p>
            <p className="text-red-400 font-semibold text-lg">Something went wrong.</p>
            <p className="text-gray-400 text-sm">Please refresh and try again.</p>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <p className="text-6xl">{score >= 70 ? '🏆' : score >= 40 ? '👍' : '😅'}</p>
            <h2 className="text-3xl font-bold text-cyan-400">Quiz Complete!</h2>

            <div className="bg-gray-800 rounded-2xl px-10 py-6 text-center mt-2">
              <p className="text-gray-400 text-sm uppercase tracking-widest mb-1">Your Score</p>
              <p className="text-6xl font-extrabold text-cyan-400">{score}</p>
              <p className="text-gray-500 text-sm mt-1">out of 100</p>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-full shadow-md transition-all"
            >
              Play Again
            </button>
          </div>
        )}

        {/* Quiz */}
        {!result && data && (
          <div>

            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400 uppercase tracking-widest">
                Question {questionIndex + 1} of 10
              </span>
              <span className="text-xs text-cyan-400">
                Score: {score}
              </span>
            </div>

            <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
              <div
                className="bg-cyan-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((questionIndex + 1) / 10) * 100}%` }}
              />
            </div>

            <h2 className="text-xl font-semibold text-gray-200 mb-6">
              {data[questionIndex].question.text}
            </h2>

            <div className="flex flex-col gap-3">
              {arrayShuffle([...data[questionIndex].incorrectAnswers, data[questionIndex].correctAnswer]).map((item, index) => (
                <label
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl border border-gray-700 hover:border-cyan-400 hover:bg-gray-800 cursor-pointer transition"
                >
                  <input
                    type="radio"
                    name="quiz"
                    value={item}
                    ref={el => (input.current[index] = el)}
                    className="accent-cyan-400 w-4 h-4"
                  />
                  <span className="text-gray-300">
                    {item}
                  </span>
                </label>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <Btn
                title={questionIndex < 9 ? "Next →" : "Finish"}
                func={changeQuestion}
              />
            </div>

          </div>
        )}

      </div>
    </div>
  </div>
)
}

export default App