//Result screen that is rendered when the game ends
import { StyledButton } from './Buttons';
import { Card } from './Card';
import { ResultScreenProps } from '../../lib/types';


function ResultScreen({ score, totalQuestions, onReturnToStart }: ResultScreenProps) {
  const message = score === totalQuestions ? 'Perfect' : 'Good try!'


  return (
    <Card>
      <div className="result-container">
        <h2>Quiz Finished!</h2>
        <p>
          You scored {score} out of {totalQuestions}.
        </p>
        <p>{message}</p>
        <br />
        <StyledButton onClick={onReturnToStart}>Return to Start</StyledButton>
      </div>
    </Card>
  );
}

export default ResultScreen;
