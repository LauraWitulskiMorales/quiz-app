// Shows current score

import React from 'react';

interface ScoreProps {
  score: number;
}

const Score: React.FC<ScoreProps> = ({ score }) => (
  <div className="score">Score: {score}</div>
);

export default Score;
