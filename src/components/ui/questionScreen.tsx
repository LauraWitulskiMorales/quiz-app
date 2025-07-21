
import React from 'react';
import { StyledButton } from './Buttons';
import type { QuestionScreenProps } from '../../lib/types';

const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  options,
  selectedOption,
  isSubmitted,
  correctAnswer,
  handleOptionChange,
  handleButtonClick,
}) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="gloock text-neutral-800 text-4xl font-bold flex-wrap">
        {question}
      </h2>
      <br />
      <div className="doto grid grid-cols-2 gap-4">
        {options.map((option) => {
          let optionClasses =
            'flex items-center justify-between cursor-pointer bg-[rgba(255,255,255,0.4)] border border-neutral-300 text-neutral-800 m-0.25 w-90 h-15 px-4 rounded-sm transition-colors';

          if (isSubmitted) {
            if (option === correctAnswer) {
              optionClasses += ' bg-green-400 text-white';
            } else if (selectedOption === option) {
              optionClasses += ' bg-red-400 text-white';
            } else {
              optionClasses += ' opacity-50';
            }
          }
          return (
            <label key={option} className={optionClasses}>
              {option}
              <input
                type="radio"
                name="answer-option"
                value={option}
                checked={selectedOption === option}
                disabled={isSubmitted}
                onChange={() => handleOptionChange(option)}
                className="hidden peer"
              />
              <div className="w-4 h-4 rounded-full border-2 border-gray-500 peer-checked:border-[#eb3da8] peer-checked:bg-[#eb3da8] mr-2"></div>
            </label>
          );
        })}
      </div>
      <div className="w-full flex justify-center mt-4 relative">
        <StyledButton
          type="button"
          disabled={selectedOption === null}
          onClick={handleButtonClick}
        >
          {isSubmitted ? 'Next' : 'Submit'}
        </StyledButton>
      </div>
    </div>
  );
};

export default QuestionScreen;
