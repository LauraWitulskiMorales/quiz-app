import { useEffect, useState } from "react";
import Question from "./Question";
import questions from "../data/Questions.json";

type QuizProps = {
  setScore: (score: number) => void;
  endGame: (isCorrect: boolean) => void;
};

function Quiz({ setScore, endGame }: QuizProps) {
  const savedState = localStorage.getItem('quizState');
  const initialState = savedState ? JSON.parse(savedState) : { currentQuestionIndex: 0, localScore: 0 };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(initialState.currentQuestionIndex);
  const [localScore, setLocalScore] = useState(initialState.localScore);
  const [answerFeedback, setAnswerFeedback] = useState<string>('')

  useEffect(() => {
    const gameState = { currentQuestionIndex, localScore };
    localStorage.setItem("quizState", JSON.stringify(gameState));
    }, [currentQuestionIndex, localScore]);

  const handleSkip = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < questions.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
      }
  }

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setLocalScore((prev: number) => prev + 1);
      setAnswerFeedback('Correct!'); 
    } else {
      setAnswerFeedback('Incorrect!');
    }

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
  }

  return (
    <div> 
      <div className="score">Score: {localScore}</div>  
      <div className="counter">
        Question {currentQuestionIndex + 1} / {questions.length}
      </div>
      <Question
        question={questions[currentQuestionIndex]}
        onAnswer={handleAnswer}
      />
      <div className="controls">
        <button onClick={handleSkip}>Skip Question</button>
        <button onClick={handleExit}>Exit Game</button>
      </div>
      <div className="feedback">{answerFeedback}</div> 
    </div>
  );
}

export default Quiz;
