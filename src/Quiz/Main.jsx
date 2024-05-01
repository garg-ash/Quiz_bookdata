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
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(5);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (currentQuestion !== null && currentQuestion < questions.length) {
      const interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer === 1) {
            handleNextQuestion();
            return 5;
          } else {
            return prevTimer - 1;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    } else if (currentQuestion === questions.length) {
      setIsQuizCompleted(true);
    }
  }, [currentQuestion]);

  const handleStartQuiz = () => {
    if (userName === "") {
      alert("Please enter your name")
    } else {
      setCurrentQuestion(0);
      setIsQuizStarted(true);
    }
  };

  const handleOptionSelect = option => {
    setSelectedOption(option);
    if (option === questions[currentQuestion].answer) {
      setScore(prevScore => prevScore + 1);
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setCurrentQuestion(prevQuestion => prevQuestion + 1);
    setTimer(5);
  };

  return (
    <div>
      <h1>Quiz Application</h1>
      {!isQuizStarted && !isQuizCompleted && (
        <div>
          <input type="text" placeholder="Enter your name" value={userName} onChange={(e) => setUserName(e.target.value)} className='names' />
          <button onClick={handleStartQuiz} className='start'>Start Quiz</button>
        </div>
      )}
      {isQuizStarted && currentQuestion !== null && currentQuestion < questions.length ? (
        <div>
          <h4>Time remaining: {timer} seconds</h4>
          <h3>{questions[currentQuestion].question}</h3>
          <ul>
            {questions[currentQuestion].options.map((option, index) => (
              <li key={index}>
                <button
                  onClick={() => handleOptionSelect(option.text || option)}
                  disabled={selectedOption !== null}
                >
                  {option.image ? <img src={option.image} alt={option.text} style={{ width: '100px', height: '100px' }} /> : option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : isQuizCompleted && (
        <div className='inpmain'>
          <h2>Quiz completed!</h2>
          <p>Hi {userName}! Your score: {score} out of {questions.length}</p>
        </div>
      )}
    </div>
  );
};

export default Main;