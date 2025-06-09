import { createContext, useState, useEffect, type ReactNode } from "react";
import questions from '@/data/Questions.json'
import { shuffleArray } from "@/lib/utils";
import { QuizContextType, QuizState } from "@/lib/types";

export const getInitialState = (): QuizState => {
  const shuffledQuestions = shuffleArray(questions);

  return {
    score: 0,
    lives: 5,
    currentQuestionIndex: 0,
    shuffledQuestions,
    totalQuestions: shuffledQuestions.length,
  }
};

export const QuizContext = createContext<QuizContextType | null>(null);
const Provider = QuizContext.Provider;

export const QuizProvider = ({ children }: { children: ReactNode; }) => {
  const [quizState, setQuizState] = useState<QuizState>(() => {
    const saved = localStorage.getItem('quizState');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.log(err);
        // noop
      }
    }

    return getInitialState();
  });

  useEffect(() => {
    localStorage.setItem('quizState', JSON.stringify(quizState));
  }, [quizState]);

  return <Provider value={{ quizState, setQuizState }}>{children}</Provider>
}
