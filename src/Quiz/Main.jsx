import React, { useState, useEffect } from 'react';

const questions = [
  {
    question: "2+2",
    options: [1, 2, 3, 4],
    answer: 4
  },
  {
    question: "2*2*2-8",
    options: [8, 0, -2, 1],
    answer: 0
  },
  {
    question: "3+3+3",
    options: [0, 333, 6, 9],
    answer: 9
  },
  {
    question: "4*4/4",
    options: [4, 0, 8, 16],
    answer: 4
  }
];

const Main = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(5); // Initial timer value set to 5 seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer === 1) {
          handleNextQuestion();
          return 5; // Reset timer to 5 seconds for the next question
        } else {
          return prevTimer - 1; // Decrement timer by 1 second
        }
      });
    }, 1000); // Update timer every second

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [currentQuestion]); // Run effect whenever currentQuestion changes

  const handleOptionSelect = option => {
    setSelectedOption(option);
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setCurrentQuestion(prevQuestion => prevQuestion + 1);
    setTimer(5); // Reset timer to 5 seconds for the next question
  };

  return (
    <div>
      <h1>Quiz Application</h1>
      {currentQuestion < questions.length ? (
        <div>
          <h4>Time remaining: {timer} seconds</h4>
          <h3>{questions[currentQuestion].question}</h3>
          <ul>
            {questions[currentQuestion].options.map((option, index) => (
              <li key={index}>
                <button
                  onClick={() => handleOptionSelect(option)}
                  disabled={selectedOption !== null}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h2>Quiz completed!</h2>
          <p>Your score: {score} out of {questions.length}</p>
        </div>
      )}
    </div>
  );
};

export default Main;
