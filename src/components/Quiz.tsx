// This file manages question logic and answer processing

import { useEffect, useState } from 'react';
import Question from './Question';
import questions from '../data/Questions.json';
import { StyledButton } from './Buttons';

type EndReason = 'completed' | 'timeout' | 'out-of-lives' | 'exit';

type QuizProps = {
  setScore: (score: number) => void;
  endGame: (reason: EndReason) => void;
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
  const [lives, setLives] = useState(5);
  const [timer, setTimer] = useState(30);

  // Only shuffle once on first mount, if there's  no saved game > potentially separate file
  useEffect(() => {
    if (!savedState) {
      const shuffled = shuffleArray(questions);
      setShuffledQuestions(shuffled);
      setCurrentQuestionIndex(0);
      setLocalScore(0);
    }
  }, [savedState]);

  //save game stats to Local Storage
  useEffect(() => {
    const gameState = { currentQuestionIndex, localScore, shuffledQuestions };
    localStorage.setItem('quizState', JSON.stringify(gameState));
  }, [currentQuestionIndex, localScore, shuffledQuestions]);
  //

  //30s timer which automatically ends the game if the user runs out of time > separate file
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1)
    }, 1000);
    return () => clearInterval(countdown);
  }, [currentQuestionIndex])

  useEffect(() => {
    if (timer <= 0) {
      setScore(localScore);
      endGame('timeout');
    }
  }, [timer, localScore, setScore, endGame]);
  //

  const handleSkip = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setTimer(30);
    }
  };

  // Handle answer feedback and update score
  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect === true) {
      setLocalScore((prev: number) => prev + 1);
    } else if (isCorrect === false) {
      setLives((prev: number) => prev - 1);
    }
  };

  const handleNext = () => {
      // move on to next question and end game if it was the last question
    const nextIndex = currentQuestionIndex + 1;
      if (nextIndex < shuffledQuestions.length && lives > 1) {
        setCurrentQuestionIndex(nextIndex);
        setTimer(30);
      } else {
        setScore(localScore);
        if (lives <= 1) {
          endGame('out-of-lives');
        } else {
          endGame('completed');
        }
      }
  };

  const handleExit = () => {
    setScore(localScore);
    endGame('exit');
  };

  // Prevents rendering before shuffle is ready
  if (shuffledQuestions.length === 0) {
    return <div>Loading questions...</div>;
  }

  return (
    <div>
      <div>⏱️{timer}</div>
      <div className="py-5 scale-200">{'🩷'.repeat(lives)}</div>
      <div className="bg-[rgba(255,255,255,0.25)] px-4 py-2 rounded-xl shadow-xl max-w-720 backdrop-blur-xs h-100">
        <div className="score">Score: {localScore}</div>
        <div className="counter">
          Question {currentQuestionIndex + 1} / {shuffledQuestions.length}
        </div>
        <Question
          question={shuffledQuestions[currentQuestionIndex]}
          onAnswer={handleAnswer}
          onNext={handleNext}
        />
      </div>
      <br />
      <div className="controls">
        <StyledButton onClick={handleSkip}>Skip Question</StyledButton>
        <StyledButton onClick={handleExit}>Exit Game</StyledButton>
      </div>
      {/* <div className="feedback">{answerFeedback}</div> */}
    </div>
  );
}

export default Quiz;
