import React, { useState, useEffect } from 'react';
import './Quiz.css'

const questions = [
  {
    question: "Which monuments is this?",
    options: ["HawaMahal", "Alberthall", "JantarMantar", "AmberFort"],
    answer: "HawaMahal",
    image: "https://www.holidify.com/images/cmsuploads/compressed/h4_20170822181427.PNG" // URL of the image for the first question
  },
  {
    question: "Capital of France",
    options: ["Paris", "Marseille", "Lyon", "Toulouse",],
    answer: "Paris",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiVoQJvfQufxs_MaY172KyVWtUFs4gbOZmezY0S_hclQ&s" // URL of the image for the second question
  },
  {
    question: "When was National Cinema Day?",
    options: ["October 13", "November 13", "December 13", "January 13"],
    answer: "October 13",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQenkaP77Dp7rNgB8eDGYuE50KIaItys90EeBiZ39ll-A&s" // URL of the image for the third question
  },
  {
    question: "Which country has this flag?",
    options: ["China", "USA", "India", "Japan"],
    answer: "India",
    image: "https://wallpapers.com/images/featured/indian-flag-yqfmermanpgsw0jm.jpg" // URL of the image for the fourth question
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
    <div className='quiz'>
      <h1>Quiz Application</h1>
      {currentQuestion < questions.length ? (
        <div>
          <h4>Time remaining: {timer} seconds</h4>
          {questions[currentQuestion].image && (
            <img src={questions[currentQuestion].image} alt="Question" style={{ maxWidth: '20%' }} />
          )}
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
