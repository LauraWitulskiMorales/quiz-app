// This file is the main component, which controls the game process (e.g. starting and ending the game)

import { useEffect, useState } from 'react';
import Quiz from './Quiz';
import Result from './Result';
import '../styles/index.css';
import questions from '../data/Questions.json';
import { StyledButton } from './Buttons';
import { Progress } from '@/components/ui/progress';
import haraldImage from '../assets/harald.png';
import { Card } from './Card';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gameOptionsVisible, setGameOptionsVisible] = useState(false);

  // Read the saved quizState from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('quizState');
    if (savedState) {
      setGameOptionsVisible(true);

      const parsedState = JSON.parse(savedState);
      if (parsedState && typeof parsedState.currentQuestionIndex === 'number') {
        setCurrentQuestionIndex(parsedState.currentQuestionIndex);
      }
      if (parsedState && typeof parsedState.localScore === 'number') {
        setScore(parsedState.localScore);
      }
    }
  }, []);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setShowResult(false);
    setGameOptionsVisible(false);
  };

  const handleEnd = () => {
    setShowResult(true);
    setGameStarted(false);
    setGameOptionsVisible(false);
    localStorage.removeItem('quizState');
  };

  const continueGame = () => {
    setGameOptionsVisible(false);
    setGameStarted(true);
  };

  const restartGame = () => {
    localStorage.removeItem('quizState');
    setScore(0);
    setGameStarted(true);
    setGameOptionsVisible(false);
  };

  const goToStartScreen = () => {
    setGameStarted(false);
    setShowResult(false);
    setGameOptionsVisible(false);
    setScore(0);
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="app-container">
      {gameOptionsVisible && !gameStarted && !showResult && (
        <div>
          <p>
            <Progress value={progress} className="h-2" />
          </p>
          <br />
          <Card score={score}>
            <div>
              <img src={haraldImage} alt="harald" />
            </div>
            <div className="game-options">
              <StyledButton onClick={continueGame}>Continue Game</StyledButton>
              <StyledButton onClick={restartGame}>Restart Game</StyledButton>
              <StyledButton onClick={handleEnd}>Exit Game</StyledButton>
            </div>
          </Card>
        </div>
      )}

      {!gameStarted && !gameOptionsVisible && !showResult && (
        <Card>
          <StyledButton onClick={startGame}>Start Quiz</StyledButton>
        </Card>
      )}

      {gameStarted && !showResult && (
          <Quiz setScore={setScore} endGame={handleEnd} />
      )}

      {showResult && (
        <Card>
          <Result
            score={score}
            totalQuestions={questions.length}
            onReturnToStart={goToStartScreen}
          />
        </Card>
      )}
    </div>
  );
}

export default App;
