//Result screen content

import { StyledButton } from './Buttons';
import { Card } from './Card';
import { ResultScreenProps } from '../../lib/types';
import smileyImage from '../../assets/images/smiley.png';


function ResultScreen({ score, totalQuestions, onReturnToStart }: ResultScreenProps) {
  const message = score === totalQuestions ? 'Perfect' : 'Good try!'

  return (
    <Card>
      <h1>Quiz Finished!</h1>
      <p>
        You scored {score} out of {totalQuestions}.
      </p>
      <p>{message}</p>
      <div className="flex justify-center mb-4 pt-5">
        <img src={smileyImage} alt="smiley" className='w-40 h-40 transform-3d' />
      </div>
      <StyledButton onClick={onReturnToStart}>Return to Start</StyledButton>
    </Card>
  );
}

export default ResultScreen;
