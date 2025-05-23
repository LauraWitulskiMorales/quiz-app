// This file renders individual questions and answer options
import React, { useState } from 'react';
import '../styles/index.css';
import { StyledButton } from './Buttons';

// define what Props each question is supposed to contain
interface QuestionProps {
  question: {
    question: string;
    options: string[];
    answer: string;
  };
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
}

const Question: React.FC<QuestionProps> = ({ question, onAnswer, onNext }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleButtonClick = () => {
    if (!isSubmitted && selectedOption !== null) {
      setIsSubmitted(true);
      onAnswer(selectedOption === question.answer);
    } else if (isSubmitted) {
      setSelectedOption(null);
      setIsSubmitted(false);
      onNext();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-neutral-800">{question.question}</h2>
      <br />
      {question.options.map((option) => {
        let optionClasses = "flex items-center justify-between cursor-pointer bg-[rgba(255,255,255,0.4)] border border-neutral-300 text-neutral-800 m-1 w-200 px-4 rounded-sm transition-colors";

        if (isSubmitted) {
          if (option === question.answer) {
            optionClasses += " bg-green-400 text-white";
          } else if (selectedOption === option) {
            optionClasses += " bg-red-400 text-white";
          } else {
            optionClasses += " opacity-50";
          }
        }
        return (
        <label
          key={option}
          className={optionClasses}
        >
          {option}
          <input
            type="radio"
            name="answer-option"
            value={option}
            checked={selectedOption === option}
            disabled={isSubmitted}
            onChange={() => setSelectedOption(option)}
            className="hidden peer"
          />
          <div className="w-4 h-4 rounded-full border-2 border-gray-500 peer-checked:border-purple-600 peer-checked:bg-purple-600 mr-2"></div>
        </label>
        );
      })}
      <br />
      <StyledButton
        type="button"
        disabled={selectedOption === null}
        onClick={handleButtonClick}
      >
        {isSubmitted ? "Next" : "Submit"}
      </StyledButton>
    </div>
  );
};

export default Question;
