/// <reference types="@types/react" />

// Start Screen content

import * as React from 'react';
import { Card } from "./Card"
import StyledButton from "./Buttons"
import { StartScreenProps } from "../../lib/types"
import razorImage from '../../assets/images/razor.jpeg'

const StartScreen = ({ onGame }: StartScreenProps) => {
  return (
    <Card>
      <h1 className="brasika text-neutral-800 py-10">The Quiz That's SO 2000s</h1>
      <div className="flex justify-center mb-4">
        <img src={razorImage} alt="Motorola Razr" className="shake" />
      </div>
      <StyledButton onClick={onGame}>Start Quiz</StyledButton>
    </Card>
  );
};

export default StartScreen;


