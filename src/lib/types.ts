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

export type QuestionData = {
  question: string;
  options: string[];
  answer: string;
}

export type QuestionProps = {
  question: QuestionData
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
};

export type QuizProps = {
  setScore: (score: number) => void;
  endGame: (reason: EndReason) => void;
  startGame: () => void;
  pauseGame: () => void;
  timeLeft: number;
  resetTimer: () => void;
};

export type QuizUIProps = {
  score: number,
  lives: number,
  progress: number,
  timeLeft: number
  currentIndex: number,
  totalQuestions: number,
  currentQuestion: QuestionData,
  onAnswer: (isCorrect: boolean) => void,
  onSkip: () => void,
  onNext: () => void,
  onPause: () => void,
  onExit: () => void,
};

export type PauseScreenProps ={
  currentQuestionIndex: number;
  totalQuestions: number;
  progress: number;
  onContinue: () => void;
  onRestart: ()=> void;
  onExit: () => void;
};

export type StartScreenProps = {
  onGame: () => void;
};

export type ResultScreenProps = {
  score: number;
  totalQuestions: number;
  onReturnToStart: () => void;
};
