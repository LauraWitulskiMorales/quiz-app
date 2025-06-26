import questions from '../data/Questions.json'

export interface QuizState {
  score: number;
  lives: number;
  timer: number;
  currentQuestionIndex: number;
  shuffledQuestions: typeof questions;
  totalQuestions: number;
};

export interface QuizContextType {
  quizState: QuizState;
  setQuizState: React.Dispatch<React.SetStateAction<QuizState>>;
};

export type EndReason = 'completed' | 'timeout' | 'out-of-lives' | 'exit';
