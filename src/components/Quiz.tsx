// This file handles the game flow and the general layout

import { useEffect, useState } from 'react';
import Question from './Question';
import questions from '../data/Questions.json';

type QuizProps = {
  setScore: (score: number) => void;
  endGame: (isCorrect: boolean) => void;
};

// Shuffle Questions
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function Quiz({ setScore, endGame }: QuizProps) {
  // Load full state from localStorage if available
  const savedState = localStorage.getItem('quizState');
  const initialState = savedState
    ? JSON.parse(savedState)
    : {
        currentQuestionIndex: 0,
        localScore: 0,
        shuffledQuestions: shuffleArray(questions),
      };

  // Use the saved or default shuffledQuestions
  const [shuffledQuestions, setShuffledQuestions] = useState<typeof questions>(
    initialState.shuffledQuestions
  );

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    initialState.currentQuestionIndex
  );

  const [localScore, setLocalScore] = useState(initialState.localScore);
  const [answerFeedback, setAnswerFeedback] = useState<string>('');

  // Only shuffle once on first mount, if there's  no saved game
  useEffect(() => {
    if (!savedState) {
      const shuffled = shuffleArray(questions);
      setShuffledQuestions(shuffled);
      setCurrentQuestionIndex(0);
      setLocalScore(0); 
    }
  }, [savedState]);

  useEffect(() => {
    const gameState = { currentQuestionIndex, localScore, shuffledQuestions};
    localStorage.setItem('quizState', JSON.stringify(gameState));
  }, [currentQuestionIndex, localScore, shuffledQuestions]);

  const handleSkip = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    }
  };

  // Handle answer feedback and update score
  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setLocalScore((prev: number) => prev + 1);
      setAnswerFeedback('Correct!');
    } else {
      setAnswerFeedback('Incorrect!');
    }

    // move on to next question and end game if it was the last question
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setScore(localScore + (isCorrect ? 1 : 0));
      endGame(true);
    }
  };

  const handleExit = () => {
    setScore(localScore);
    endGame(true);
  };

  // Prevents rendering before shuffle is ready
  if (shuffledQuestions.length === 0) {
    return <div>Loading questions...</div>;
  }

  return (
    <div>
      <div className="bg-[rgba(255,255,255,0.3)] px-4 py-2 rounded-lg shadow-lg max-w-720 backdrop-blur-lg">
        <div className="score">Score: {localScore}</div>
        <div className="counter">
          Question {currentQuestionIndex + 1} / {shuffledQuestions.length}
        </div>
        <Question
          question={shuffledQuestions[currentQuestionIndex]}
          onAnswer={handleAnswer}
        />
      </div>
      <br />
      <div className="controls">
        <button
          className="bg-[rgba(75,5,227,0.5)] rounded-sm px-4 py-1.5"
          onClick={handleSkip}
        >
          Skip Question
        </button>
        <button
          className="bg-[rgba(75,5,227,0.5)] rounded-sm px-4 py-1.5"
          onClick={handleExit}
        >
          Exit Game
        </button>
      </div>
      <div className="feedback">{answerFeedback}</div>
    </div>
  );
}

export default Quiz;
