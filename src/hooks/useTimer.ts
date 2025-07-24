import { useCallback, useEffect, useRef, useState } from 'react';

type UseTimerOptions = {
  duration: number;
  onTimeout: () => void;
};

export function useTimer({ duration, onTimeout }: UseTimerOptions) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isPausedRef = useRef(false);

  // Starts or resumes timer
  const start = useCallback(() => {
    if (intervalRef.current !== null) return;
    isPausedRef.current = false;

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          onTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [onTimeout]);

  // Pauses the timer
  const pause = useCallback(() => {
    isPausedRef.current = true;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Resets the timer
  const reset = useCallback(() => {
    pause();
    setTimeLeft(duration);
  }, [pause, duration]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return { timeLeft, start, pause, reset };
}
