import { createContext, useState, useEffect, type ReactNode } from "react";
import questions from '@/data/Questions.json'
import { shuffleArray } from "@/lib/utils";
import { QuizContextType, QuizScreen, QuizState } from "@/lib/types";

export const getInitialState = (): QuizState => {
  const shuffledQuestions = shuffleArray(questions);

  return {
    score: 0,
    lives: 5,
    timer: 30,
    currentQuestionIndex: 0,
    shuffledQuestions,
    totalQuestions: shuffledQuestions.length,
    currentScreen: 'start',
  }
};

export const QuizContext = createContext<QuizContextType | null>(null);
const Provider = QuizContext.Provider;

export const QuizProvider = ({ children }: { children: ReactNode; }) => {
  const [quizState, setQuizState] = useState<QuizState>(() => {
    const saved = sessionStorage.getItem('quizState');
    if (saved) {
      try {
        const parsedState: QuizState = JSON.parse(saved);
        let initialScreen: QuizScreen = 'start';

        if (parsedState.currentScreen === 'game' || parsedState.currentScreen === 'pause') {
          initialScreen = 'pause';
        } else if (parsedState.currentScreen === 'result') {
          initialScreen = 'result';
        }
        // Return the parsed state but with the correct initialScreen
        return {
          ...parsedState,
          currentScreen: initialScreen,
        };
      } catch (err) {
        console.log(err);
      }
    }
    return getInitialState();
  });

  useEffect(() => {
    sessionStorage.setItem('quizState', JSON.stringify(quizState));
  }, [quizState]);

  return <Provider value={{ quizState, setQuizState }}>{children}</Provider>
}
