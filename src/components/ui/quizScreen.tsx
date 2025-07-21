import React from "react";
import QuestionScreen from './questionScreen';
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
}) => {

  return (
    <div>
      <div>
        <span>{currentIndex + 1} / {totalQuestions}</span>
        <Progress value={progress} className="border border-black" />
      </div>
      <Card score={score} lives={lives}>
        <QuestionScreen
          key={currentIndex}
          question={currentQuestion.question}
          options={currentQuestion.options}
          selectedOption={null}
          isSubmitted={false}
          correctAnswer={currentQuestion.answer}
          handleOptionChange={() => { }}
          handleButtonClick={() => { }}
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
