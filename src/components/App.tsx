// This file is the main component, which controls the game process (e.g. starting and ending the game)

import { useEffect, useState } from 'react';
import { useQuizState } from '../hooks/UseGameState';
import { useTimer } from '../hooks/useTimer';
import questions from '../data/Questions.json';
import Quiz from './Quiz';
import PauseScreen from './ui/pauseScreen';
import StartScreen from './ui/startScreen';
import ResultScreen from './ui/resultScreen';
// import '../styles/index.css';
// import Result from './Result';
// import { StyledButton } from './ui/Buttons';
// import { Card } from './ui/Card';
// import { Progress } from './ui/progress';


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

  const {
    timeLeft,
    start: startTimer,
    pause: pauseTimer,
    reset: resetTimer
  } = useTimer({
    duration: 30,
    onTimeout: () => handleEnd(),
  });

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
    resetTimer()
    startTimer();
  };

  const setScore = (finalScore: number) => {
    setQuizState(prev => ({ ...prev, score: finalScore }));
  };

  const pauseGame = () => {
    setGameOptionsVisible(true);
    setIsPaused(true);
    setGameStarted(false);
    pauseTimer();
    console.log('⏸ Game paused');
  }

  const handleEnd = () => {
    ;
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
    startTimer();
  };

  const restartGame = () => {
    console.log('🔁 Restarting game');
    clearSavedQuiz();
    setGameStarted(true);
    setIsPaused(false);
    setGameOptionsVisible(false)
    resetTimer();
    startTimer();

    reset();
  };

  const goToStartScreen = () => {
    clearSavedQuiz();
    reset();
    setGameStarted(false);
    setShowResult(false);
    setIsPaused(false);
    setGameOptionsVisible(false);

  };

  useEffect(() => {
    if (hasSavedGame) {
      setIsPaused(true);
      setGameOptionsVisible(true);
      setGameStarted(false);
      // This ensures we show the pause screen
    }
  }, [hasSavedGame]);

  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="app-container">
      {isPaused && gameOptionsVisible && !gameStarted && !showResult && (
        <PauseScreen
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
          progress={progress}
          onContinue={continueGame}
          onRestart={restartGame}
          onExit={handleEnd}
        />
      )}

      {!gameStarted && !gameOptionsVisible && !showResult && (
        <StartScreen onGame={startGame} />
      )}

      {gameStarted && !showResult && (
        <Quiz
          setScore={setScore}
          endGame={handleEnd}
          startGame={startGame}
          pauseGame={pauseGame}
          timeLeft={timeLeft}
          resetTimer={resetTimer}
        />
      )}


      {showResult && (
        <ResultScreen
          score={quizState.score}
          totalQuestions={quizState.totalQuestions}
          onReturnToStart={goToStartScreen} />
      )}
    </div>
  );
}

export default App;
