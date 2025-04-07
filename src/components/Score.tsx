import { FC } from 'react';

interface ScoreProps {
  score: number;
}

const Score: FC<ScoreProps> = ({ score }) => {
  return (
    <div className="score-container">
      <h3>Score: {score}</h3>
    </div>
  );
};

export default Score;
