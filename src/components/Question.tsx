// This file renders individual questions and answer options

import React, { useState } from 'react';
import QuestionScreen from './ui/questionScreen';
import type { QuestionProps } from '../lib/types';

const Question: React.FC<QuestionProps> = ({ question, onAnswer, onNext }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

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
    <QuestionScreen
      question={question.question}
      options={question.options}
      selectedOption={selectedOption}
      isSubmitted={isSubmitted}
      correctAnswer={question.answer}
      handleOptionChange={handleOptionChange}
      handleButtonClick={handleButtonClick}
    />
  );
};

export default Question;
