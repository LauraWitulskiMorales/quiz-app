//Result screen that is rendered when the game ends

import { StyledButton } from './ui/Buttons';
import { useQuizState } from '../hooks/UseGameState';

interface ResultProps {
  onReturnToStart: () => void;
}

function Result({ onReturnToStart }: ResultProps) {
  const {
    quizState: { score, totalQuestions },
  } = useQuizState();

  const message = score === totalQuestions ? 'Perfect' : 'Good try!'


  return (
    <div className="result-container">
      <h2>Quiz Finished!</h2>
      <p>
        You scored {score} out of {totalQuestions}.
      </p>
      <p>{message}</p>
      <br />
      <StyledButton onClick={onReturnToStart}>Return to Start</StyledButton>
    </div>
  );
}

export default Result;
