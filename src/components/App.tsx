import { useEffect, useState } from "react";
import Quiz from "./Quiz";
import Result from "./Result";
import "../styles/App.css";
import questions from "../data/Questions.json";

function App() {
  const savedState = localStorage.getItem('quizState');
  const initialState = savedState ? JSON.parse(savedState) : { currentQuestionIndex: 0, localScore: 0 };

  const [gameStarted, setGameStarted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOptionsVisible, setGameOptionsVisible] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(initialState.currentQuestionIndex);

  useEffect(() => {
    const savedState = localStorage.getItem('quizState');
    if (savedState) {
      setGameOptionsVisible(true); 
    }
  }, []);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setShowResult(false);
    setGameOptionsVisible(false);
    setCurrentQuestionIndex(0);
  };

  const handleEndOrExit = (userExit: boolean = false) => {
      if (userExit) {
        setShowResult(true);
        setGameStarted(false);
        setGameOptionsVisible(false);
        localStorage.removeItem('quizState');
      }
  }

  const continueGame = () => {
    setGameOptionsVisible(false);
    setGameStarted(true);
  }

  const restartGame = () => {
    localStorage.removeItem('quizState');
    setScore(0);
    setGameStarted(true);
    setGameOptionsVisible(false);
    setCurrentQuestionIndex(0);
  }

  const goToStartScreen = () => {
        setGameStarted(false);
        setShowResult(false);
        setGameOptionsVisible(false);
        setScore(0);
        
  }


  return (
    <div className="app-container">

{gameOptionsVisible && !gameStarted && !showResult && (
      <div className="game-options">
        <p>Score: {score}</p>
        <p>Question: {currentQuestionIndex + 1} / {questions.length} </p>
      <button onClick={continueGame}>Continue Game</button>
          <button onClick={restartGame}>Restart Game</button>
          <button onClick={() => handleEndOrExit(true)}>Exit Game</button>
      </div>
)}

      {!gameStarted && !gameOptionsVisible && !showResult && (
        <button onClick={startGame}>Start Quiz</button>
      )}
      {gameStarted && !showResult && (
        <Quiz setScore={setScore} endGame={handleEndOrExit} />
      )}

      {showResult && (
        <Result 
        score={score} 
        totalQuestions={questions.length} 
        onReturnToStart={goToStartScreen} 
        />
      )}
        </div>
  );
}

export default App;
