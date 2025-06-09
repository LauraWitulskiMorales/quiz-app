import questions from '../data/Questions.json'

export interface QuizState {
  score: number;
  lives: number;
  currentQuestionIndex: number;
  shuffledQuestions: typeof questions;
  totalQuestions: number;
};

export interface QuizContextType {
  quizState: QuizState;
  setQuizState: React.Dispatch<React.SetStateAction<QuizState>>;
}
