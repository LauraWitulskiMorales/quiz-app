// This file handles the rendering of the questions and answers
import React, { useState} from 'react';
import '../styles/index.css';

// define what Props each question is supposed to contain
interface QuestionProps {
  question: {
    question: string;
    options: string[];
    answer: string;
  };
  onAnswer: (isCorrect: boolean) => void;
}

const Question: React.FC<QuestionProps> = ({ question, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  return (
    <div className="flex flex-col items-center">
      <h2 className='text-neutral-800'>{question.question}</h2>
      <br />
      {question.options.map((option) => (
        <label key={option} className="flex items-center justify-between curser-pointer bg-[rgba(255,255,255,0.4)] border-1 border-solid border-neutral-300 text-neutral-800 m-1 w-200 px-4 rounded-sm">
          {option}
          <input
            type="radio"
            name="answer-option"
            value={option}
            checked={selectedOption === option}
            onChange={() => setSelectedOption(option)}
            className="ml-2"
          />
        </label>
      ))}
      <br />
      <button
        type="button"
        disabled={selectedOption === null}
        onClick={() => {
          if (selectedOption !==  null) {
            onAnswer(selectedOption === question.answer);
            setSelectedOption(null);
          }
        }}
        className="bg-[rgba(75,5,227,0.5)] rounded-sm px-4 py-1.5"
      >
        Next
      </button>
    </div>
  );
};

export default Question;
