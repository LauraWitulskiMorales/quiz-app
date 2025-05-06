import React from 'react';

interface QuestionProps {
  question: {
  question: string;
  options: string[];
  answer: string;
  }
  onAnswer: (isCorrect: boolean) => void;
}

const Question: React.FC<QuestionProps> = ({ question, onAnswer }) => (
  <div className="question-container">
    <h2>{question.question}</h2>
    {question.options.map((option) => (
      <button key={option} onClick={() => onAnswer(option === question.answer)}>
        {option}
      </button>
    ))}
  </div>
);

export default Question;
