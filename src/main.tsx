import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { fairyDustCursor } from 'cursor-effects';
import App from './components/App.tsx';
import { QuizProvider } from './context/QuizContext.tsx';

fairyDustCursor({
  colors: ['#fff000', '#ffff99', '#ffffff'],
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QuizProvider>
      <App />
    </QuizProvider>
  </StrictMode>
);
