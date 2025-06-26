import React from "react"
import haraldImage from '../../assets/harald.png';
// import '../styles/index.css';
import { Card } from "./Card"
import { Progress } from "./progress"
import StyledButton from "./Buttons"
import { PauseScreenProps } from "../../lib/types";

const PauseScreen: React.FC<PauseScreenProps> = ({
  currentQuestionIndex,
  totalQuestions,
  progress,
  onContinue,
  onRestart,
  onExit,
}) => {
  return (
    <div>
      <div>
        <span>{currentQuestionIndex + 1} / {totalQuestions}</span>
        <Progress value={progress} className="h-2" />
      </div>
      <br />
      <Card>
        <div className='flex justify-center'>
          <img src={haraldImage} alt="harald" className="shake" />
        </div>
        <div className="game-options">
          <StyledButton onClick={onContinue}>Continue Game</StyledButton>
          <StyledButton onClick={onRestart}>Restart Game</StyledButton>
          <StyledButton onClick={onExit}>Exit Game</StyledButton>
        </div>
      </Card>
    </div>
  );
};

export default PauseScreen;
