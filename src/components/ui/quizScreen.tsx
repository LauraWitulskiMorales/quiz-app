import React from "react";
import Question from '../Question';
import { Progress } from "./progress";
import { QuizScreenProps } from '../../lib/types';
import { StyledButton } from './Buttons';
import { Card } from './Card';

// shuffledQuestions[currentIndex]
// 
// setShouldPause

const QuizScreen: React.FC<QuizScreenProps> = ({
  score,
  lives,
  progress,
  timeLeft,
  currentIndex,
  totalQuestions,
  currentQuestion,
  onSkip,
  onPause,
  onExit,
  onNext,
  onAnswer
}) => {

  return (
    <div>
      <div>
        <span>{currentIndex + 1} / {totalQuestions}</span>
        <Progress value={progress} className="border border-black" />
      </div>
      <Card score={score} lives={lives}>
        <Question
          key={currentIndex} // Good to use key for list items or changing components
          question={currentQuestion} // CORRECTED: Pass the entire QuestionData object
          onAnswer={onAnswer} // Pass the onAnswer callback
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
export default QuizScreen;
