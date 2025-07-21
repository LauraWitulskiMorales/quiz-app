import React from "react";
import Question from '../Question';
import { Progress } from "./progress";
import { QuizUIProps } from '../../lib/types';
import { StyledButton } from './Buttons';
import { Card } from './Card';

// shuffledQuestions[currentIndex]
// 
// setShouldPause

const QuizUI: React.FC<QuizUIProps> = ({
  score,
  lives,
  progress,
  timeLeft,
  currentIndex,
  totalQuestions,
  currentQuestion,
  onAnswer,
  onNext,
  onSkip,
  onPause,
  onExit,

}) => {

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
          question={currentQuestion}
          onAnswer={onAnswer}
          onNext={onNext}
        />
      </Card>
      <div className="controls justify-center">
        <StyledButton onClick={onSkip}>Skip Question</StyledButton>
        <StyledButton onClick={onPause}>
          Pause Game
        </StyledButton>

        <StyledButton onClick={onExit}>Exit Game</StyledButton>
      </div>
      <div>⏱️{timeLeft}</div>
    </div>
  );
};
export default QuizUI;
