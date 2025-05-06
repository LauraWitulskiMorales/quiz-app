interface ResultProps {
  score: number;
  totalQuestions: number;
  onReturnToStart: () => void;
}

function Result ({ score, totalQuestions, onReturnToStart }: ResultProps) {
  return (
    <div className="result-container">
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
