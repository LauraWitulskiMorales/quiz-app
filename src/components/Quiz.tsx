// This file manages question logic and answer processing

import QuizUI from './ui/quizUI';
import questions from '../data/Questions.json';
import { useTimer } from '../hooks/useTimer';
import { useEffect, useState } from 'react';
import { QuizProps } from '../lib/types';
import { useQuizState } from '../hooks/UseGameState';

function Quiz({ setScore, endGame, startGame, pauseGame, timeLeft, resetTimer }: QuizProps) {
  const {
    quizState: { score, lives, currentQuestionIndex, totalQuestions },
    incrementScore,
    loseLife,
    nextQuestion,
  } = useQuizState();

  const currentIndex = currentQuestionIndex;
  const isLastQuestion = currentIndex + 1 >= totalQuestions;
  const currentQuestion = questions[currentIndex];
  const [shouldPause, setShouldPause] = useState(false);
  const progress =
    ((currentIndex + 1) / totalQuestions) * 100;


  useEffect(() => {
    if (shouldPause) {
      pauseGame();
      setShouldPause(false);
    }
  }, [shouldPause, lives]); // make sure it re-runs when lives update

  const handleSkip = () => {
    if (!isLastQuestion) {
      nextQuestion();
      resetTimer();
      startGame();
    } else {
      endGame('completed');
      resetTimer();
    }
  };

  // Handle answer feedback and update score
  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect === true) {
      incrementScore(1);
    } else if (isCorrect === false) {
      loseLife();
    }
  };

  const handleNext = () => {
    // move on to next question and end game if it was the last question
    if (!isLastQuestion && lives >= 1) {
      nextQuestion();
      resetTimer();
      startGame();
    } else if (timeLeft === 0) {
      setScore(score);
      endGame('timeout');
      resetTimer();
    } else {
      setScore(score);
      endGame(lives < 1 ? 'out-of-lives' : 'completed');
      resetTimer();
      startGame();
    }
    console.log(useTimer);
  };

  const handleExit = () => {
    setScore(score);
    endGame('exit');
    resetTimer();
  };



  // Prevents rendering before shuffle is ready
  if (totalQuestions === 0) {
    return <div>Loading questions...</div>;
  }

  return (
    <QuizUI
      score={score}
      lives={lives}
      progress={progress}
      timeLeft={timeLeft}
      currentIndex={currentIndex}
      totalQuestions={totalQuestions}
      currentQuestion={currentQuestion}
      onAnswer={handleAnswer}
      onNext={handleNext}
      onSkip={handleSkip}
      onPause={() => setShouldPause(true)}
      onExit={handleExit}
    />
  )
}

export default Quiz;
