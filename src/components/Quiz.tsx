// This file manages question logic and answer processing

import { Progress } from '@/components/ui/progress';
import { useQuizState } from '../hooks/useGameState';
import { useTimer } from '../hooks/useTimer';
import { useEffect, useState } from 'react';
import { StyledButton } from './ui/Buttons';
import { Card } from './ui/Card';
import Question from './Question';
import { EndReason } from '../lib/types';

type QuizProps = {
  setScore: (score: number) => void;
  endGame: (reason: EndReason) => void;
  startGame: () => void;
  pauseGame: () => void;
  timeLeft: number;
  resetTimer: () => void;
};

function Quiz({ setScore, endGame, startGame, pauseGame, timeLeft, resetTimer }: QuizProps) {
  const {
    quizState: { score, lives, currentQuestionIndex, shuffledQuestions, totalQuestions },
    incrementScore,
    loseLife,
    nextQuestion,
  } = useQuizState();

  const currentIndex = currentQuestionIndex;
  const isLastQuestion = currentIndex + 1 >= totalQuestions;
  const [shouldPause, setShouldPause] = useState(false);


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
    startGame()
  };

  const progress =
    ((currentIndex + 1) / totalQuestions) * 100;

  // Prevents rendering before shuffle is ready
  if (totalQuestions === 0) {
    return <div>Loading questions...</div>;
  }

  return (
    <div>
      <div className="counter">
        <span>{currentIndex + 1} / {totalQuestions}</span>
        <Progress value={progress} className="h-3 border border-black" />
        <br />
      </div>
      <Card score={score} lives={lives}>
        <Question
          key={currentIndex}
          question={shuffledQuestions[currentIndex]}
          onAnswer={handleAnswer}
          onNext={handleNext}
        />
      </Card>
      <div className="controls justify-center">
        <StyledButton onClick={handleSkip}>Skip Question</StyledButton>
        <StyledButton onClick={() => setShouldPause(true)}>
          Pause Game
        </StyledButton>

        <StyledButton onClick={handleExit}>Exit Game</StyledButton>
      </div>
      <div>⏱️{timeLeft}</div>
    </div>
  );
}

export default Quiz;
