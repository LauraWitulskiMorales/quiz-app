interface ResultProps {
  score: number;
  totalQuestions: number;
  onReturnToStart: () => void;
  gameEndReason: 'lives' |  'completed';
  lives: number;
  maxLives: number;
}

function Result ({ score, totalQuestions, onReturnToStart, gameEndReason }: ResultProps) {
  const hearts = Array(5).fill('🩶');
  const showHearts = gameEndReason === 'lives';

  return (

    <div className="result-container">

      {showHearts && (
        <div className="hearts">
          {hearts.map((heart, index) => (
            <span key={index} className="grey-heart">
              {heart}  
            </span>
          ))}
        </div>
      )}

      <h2>Quiz Finished!</h2>
      <p>
        You scored {score} out of {totalQuestions}.
      </p>
      <p>{score === totalQuestions ? 'Perfect!' : 'Good try!'}</p>
      <button onClick={onReturnToStart}>Return to Start</button>
    </div>
  );
};

export default Result;