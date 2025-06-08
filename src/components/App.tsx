// This file is the main component, which controls the game process (e.g. starting and ending the game)

import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';
import haraldImage from '../assets/harald.png';
import questions from '../data/Questions.json';
import '../styles/index.css';
import { StyledButton } from './Buttons';
import { Card } from './Card';
import Quiz from './Quiz';
import Result from './Result';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
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
      if (parsedState && typeof parsedState.lives === 'number') {
        setLives(parsedState.lives);
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
          <div>
            <span>{currentQuestionIndex + 1} / {questions.length}</span>
            <Progress value={progress} className="h-2" />
          </div> 
          <br />
          <Card score={score}>
            <div className="py-5 scale-200">{'🩷'.repeat(lives)}</div>
            <div className='flex justify-center'>
              <img src={haraldImage} alt="harald" className="shake" />
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
