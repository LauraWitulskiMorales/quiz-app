//Result screen that is rendered when the game ends

import { StyledButton } from './Buttons'; // imports the button styling

interface ResultProps {
  score: number;
  totalQuestions: number;
  onReturnToStart: () => void;
}

function Result({ score, totalQuestions, onReturnToStart }: ResultProps) {
  return (
    <div className="result-container">
      <h2>Quiz Finished!</h2>
      <p>
        You scored {score} out of {totalQuestions}.
      </p>
      <p>{score === totalQuestions ? 'Perfect!' : 'Good try!'}</p>
      <br />
      <StyledButton onClick={onReturnToStart}>Return to Start</StyledButton>
    </div>
  );
}

export default Result;
