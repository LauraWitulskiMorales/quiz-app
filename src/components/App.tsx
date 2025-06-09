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
import { useQuizState } from '../hooks/useGameState';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [gameOptionsVisible, setGameOptionsVisible] = useState(false);

  const {
    quizState,
    setQuizState,
    clearSavedQuiz,
    reset,
  } = useQuizState();

  const hasSavedGame =
    quizState &&
    quizState.currentQuestionIndex < quizState.totalQuestions &&
    quizState.lives > 0;

  const { currentQuestionIndex } = quizState;

  const totalQuestions = questions.length;

  const startGame = () => {
    setGameStarted(true);
    setShowResult(false);
    setGameOptionsVisible(false);
    setIsPaused(false);

    reset();
  };

  const setScore = (finalScore: number) => {
    setQuizState(prev => ({ ...prev, score: finalScore }));
  };

  const pauseGame = () => {
    setGameOptionsVisible(true);
    setIsPaused(true);
    setGameStarted(false);
  }

  const handleEnd = () => {
    setShowResult(true);
    setGameStarted(false);
    setGameOptionsVisible(false);
    setIsPaused(false);
    clearSavedQuiz();
  };

  const continueGame = () => {
    setGameOptionsVisible(false);
    setGameStarted(true);
    setIsPaused(false);
  };

  const restartGame = () => {
    clearSavedQuiz();
    setGameStarted(true);
    setIsPaused(false);
    setGameOptionsVisible(false);

    reset();
  };

  const goToStartScreen = () => {
    setGameStarted(false);
    setShowResult(false);
    setIsPaused(false);
    setGameOptionsVisible(false);

    reset();
  };

  useEffect(() => {
    if (hasSavedGame) {
      setIsPaused(true);
      setGameOptionsVisible(true);
      setGameStarted(false); // This ensures we show the pause screen
    }
  }, [hasSavedGame]);

  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="app-container">
      {isPaused && gameOptionsVisible && !gameStarted && !showResult && (
        <div>
          <div>
            <span>{currentQuestionIndex + 1} / {totalQuestions}</span>
            <Progress value={progress} className="h-2" />
          </div>
          <br />
          <Card>
            {/* <div className="py-5 scale-200">{'🩷'.repeat(lives)}</div> */}
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
        <Quiz
          setScore={setScore}
          endGame={handleEnd}
          pauseGame={pauseGame}
        />
      )}


      {showResult && (
        <Card>
          <Result onReturnToStart={goToStartScreen} />
        </Card>
      )}
    </div>
  );
}

export default App;
