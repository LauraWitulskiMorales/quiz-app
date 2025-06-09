// This file manages question logic and answer processing

import { Progress } from '@/components/ui/progress';
import { useQuizState } from '../hooks/useGameState';
import { useEffect, useState } from 'react';
import { StyledButton } from './Buttons';
import { Card } from './Card';
import Question from './Question';

type EndReason = 'completed' | 'timeout' | 'out-of-lives' | 'exit';

type QuizProps = {
  setScore: (score: number) => void;
  endGame: (reason: EndReason) => void;
  pauseGame: () => void;
};

function Quiz({ setScore, endGame, pauseGame }: QuizProps) {
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
      setShouldPause(false); // reset the flag
    }
  }, [shouldPause, lives]); // make sure it re-runs when lives update


  //30s timer which automatically ends the game if the user runs out of time > separate file
  // useEffect(() => {
  //   const countdown = setInterval(() => {
  //     setTimer((prev) => prev - 1)
  //   }, 1000);
  //   return () => clearInterval(countdown);
  // }, [currentQuestionIndex])

  // useEffect(() => {
  //   if (timer <= 0) {
  //     setScore(localScore);
  //     endGame('timeout');
  //   }
  // }, [timer, localScore, setScore, endGame]);
  //

  const handleSkip = () => {
    if (!isLastQuestion) {
      nextQuestion();
      // setTimer(30);
    } else {
      endGame('completed');
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
      // setTimer(30);
    } else {
      setScore(score);
      endGame(lives < 1 ? 'out-of-lives' : 'completed');
    }
  };

  const handleExit = () => {
    setScore(score);
    endGame('exit');
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
        <div className="py-5 scale-200">{'🩷'.repeat(lives)}</div>
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
      {/* <div>⏱️{timer}</div> */}
    </div>
  );
}

export default Quiz;
