import { FC } from 'react';

interface ResultProps {
  score: number;
  totalQuestions: number;
}

const Result: FC<ResultProps> = ({ score, totalQuestions }) => {
  return (
    <div className="result-container">
      <h2>Quiz Finished!</h2>
      <p>
        You scored {score} out of {totalQuestions}.
      </p>
      <p>{score === totalQuestions ? 'Perfect!' : 'Good try!'}</p>
    </div>
  );
};

export default Result;
