// This file is the main component, which controls the game process (e.g. starting and ending the game)

import { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';
import { useTimer } from '../hooks/useTimer';
import Quiz from './Quiz';
import PauseScreen from './ui/pauseScreen';
import StartScreen from './ui/startScreen';
import ResultScreen from './ui/resultScreen';
import { shuffleArray } from '../lib/utils';
import questions from '../data/Questions.json';


function App() {
  const quizContext = useContext(QuizContext);
  const {
    timeLeft,
    start: startTimer,
    pause: pauseTimer,
    reset: resetTimer
  } = useTimer({
    duration: 30,
    onTimeout: () => handleEnd(),
  });

  if (!quizContext) return null;
  const { quizState, setQuizState } = quizContext;

  const { currentQuestionIndex, currentScreen, totalQuestions } = quizState;

  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  // Handlers update currentScreen in context
  const initializeGameplay = () => {
    setQuizState(prev => ({ ...prev, currentScreen: 'game' }));
    resetTimer();
    startTimer();
  };

  const setScore = (finalScore: number) => {
    setQuizState(prev => ({ ...prev, score: finalScore }));
  };

  const pauseGameplay = () => {
    setQuizState(prev => ({ ...prev, currentScreen: 'pause' }));
    pauseTimer();
  };

  const handleEnd = () => {
    setQuizState(prev => ({ ...prev, currentScreen: 'result' }));
  };

  const continueGame = () => {
    setQuizState(prev => ({ ...prev, currentScreen: 'game' }));
    startTimer();
  };

  const restartGame = () => {
    setQuizState(prev => ({
      ...prev,
      score: 0,
      lives: 5,
      timer: 30,
      currentQuestionIndex: 0,
      shuffledQuestions: shuffleArray(questions),
      totalQuestions: questions.length,
      currentScreen: 'game',
    }));
    resetTimer();
    startTimer();
  };

  const goToStartScreen = () => {
    setQuizState(prev => ({
      ...prev,
      score: 0,
      lives: 5,
      timer: 30,
      currentQuestionIndex: 0,
      shuffledQuestions: shuffleArray(questions),
      totalQuestions: questions.length,
      currentScreen: 'start',
    }));
  };

  return (
    <div className="app-container">
      {currentScreen === 'start' && (
        <StartScreen onGame={initializeGameplay} />
      )}
      {currentScreen === 'pause' && (
        <PauseScreen
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
          progress={progress}
          score={quizState.score}
          lives={quizState.lives}
          onContinue={continueGame}
          onRestart={restartGame}
          onExit={handleEnd}
        />
      )}
      {currentScreen === 'game' && (
        <Quiz
          setScore={setScore}
          endGame={handleEnd}
          startGame={initializeGameplay}
          pauseGame={pauseGameplay}
          timeLeft={timeLeft}
          resetTimer={resetTimer}
        />
      )}
      {currentScreen === 'result' && (
        <ResultScreen
          score={quizState.score}
          totalQuestions={quizState.totalQuestions}
          onReturnToStart={goToStartScreen}
        />
      )}
    </div>
  );
}

export default App;
