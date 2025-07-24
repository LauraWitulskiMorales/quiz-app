//Pause Screen content

import React from "react"
import haraldImage from '../../assets/images/harald.png'
import { Card } from "./Card"
import { Progress } from "./progress"
import StyledButton from "./Buttons"
import { PauseScreenProps } from "../../lib/types";

const PauseScreen: React.FC<PauseScreenProps & { score: number; lives: number }> = ({
  currentQuestionIndex,
  totalQuestions,
  progress,
  onContinue,
  onRestart,
  onExit,
  score,
  lives,
}) => {
  return (
    <div>
      <div>
        <span>{currentQuestionIndex + 1} / {totalQuestions}</span>
        <Progress value={progress} className="border border-black" />
      </div>
      <Card score={score} lives={lives}>
        <h1 className="mb-2 py-5">Game Paused</h1>
        <div className='flex justify-center mb-4'>
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
