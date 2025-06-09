import { useContext } from "react";
import { getInitialState, QuizContext } from "@/context/QuizContext";

// localStorage GameState in a reusable custom hook
export function useQuizState() {
  const quizCtx = useContext(QuizContext);

  if (!quizCtx) {
    throw new Error('useQuizState must be used within a QuizProvider');
  }

  const { quizState, setQuizState } = quizCtx;
 
  function incrementScore(amount = 1) {
    setQuizState(prev => ({ ...prev, score: prev.score + amount }));
  }

  function loseLife() {
    setQuizState(prev => ({...prev, lives: Math.max(0, prev.lives - 1)}))
  }

  function nextQuestion() {
    setQuizState(prev => ({...prev, currentQuestionIndex: prev.currentQuestionIndex + 1}))
  }

  function clearSavedQuiz() {
    localStorage.removeItem('quizState')
  }

  function reset() {
    setQuizState(getInitialState());
  }

  return { quizState, setQuizState, incrementScore, loseLife, nextQuestion, clearSavedQuiz, reset };
}
