import { useEffect, useState } from "react";
import Question from "./Question";
import questions from "../data/Questions.json";

type QuizProps = {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  endGame: (userExited: boolean, gameEndedDueToLives: boolean) => void;
  lives: number;
  setLives: React.Dispatch<React.SetStateAction<number>>; // ✅ add this
  maxLives: number;
};

function Quiz({ score, setScore, endGame }: QuizProps) {
  const savedState = localStorage.getItem('quizState');
  const initialState = savedState ? JSON.parse(savedState) : { currentQuestionIndex: 0, score: 0 };
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(initialState.currentQuestionIndex);
  const [answerFeedback, setAnswerFeedback] = useState<string>('');
  const [lives, setLives] = useState(5);

  useEffect(() => {
    const gameState = { currentQuestionIndex, score };
    localStorage.setItem("quizState", JSON.stringify(gameState));
    }, [currentQuestionIndex, score]);

  const handleSkip = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < questions.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
      }
  }

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prev: number) => prev + 1);
      setAnswerFeedback('Correct!'); 
    } else {
      setAnswerFeedback('Incorrect!');
      setLives((prev: number) => prev - 1);
    }

    if (lives === 1) {
      endGame(false, true);
    } else {
      const nextIndex = currentQuestionIndex + 1;
        if (nextIndex < questions.length) {
          setCurrentQuestionIndex(nextIndex);
        } else if (lives <= 0) {
          endGame(true, false);
        }
      } 
  };

  const handleExit = () => {
    endGame(false, false);
  }

  return (
    <div> 

      <div className="lives">{"❤️".repeat(lives)}</div>
      <div className="score">Score: {score}</div>  
      <div className="counter">Question: {currentQuestionIndex + 1} / {questions.length}</div>
      <div className="feedback">{answerFeedback}</div>

      <Question
        question={questions[currentQuestionIndex]}
        onAnswer={handleAnswer}
      />
      <div className="controls">
        <button onClick={handleSkip}>Skip Question</button>
        <button onClick={handleExit}>Exit Game</button>
      </div>
    </div>
  );
}

export default Quiz;
