import { useCallback, useEffect, useRef, useState } from 'react';
import { useProgress } from '../context/ProgressContext';

/**
 * Generates game rounds while avoiding recent duplicates.
 * Call `nextRound()` after a correct answer to advance.
 */
export function useGameRound<T>(
  level: number,
  makeRound: (level: number) => T,
  fingerprint: (round: T) => string,
  historySize = 12,
): { round: T; nextRound: () => void; resetHistory: () => void } {
  const { resetEpoch } = useProgress();
  const historyRef = useRef<string[]>([]);
  const levelRef = useRef(level);
  const epochRef = useRef(resetEpoch);
  const makeRef = useRef(makeRound);
  const fpRef = useRef(fingerprint);
  makeRef.current = makeRound;
  fpRef.current = fingerprint;

  const generate = useCallback(
    (lvl: number): T => {
      let next = makeRef.current(lvl);
      let attempts = 0;
      const maxAttempts = 50;

      while (historyRef.current.includes(fpRef.current(next)) && attempts < maxAttempts) {
        next = makeRef.current(lvl);
        attempts += 1;
      }

      const fp = fpRef.current(next);

      // Pool exhausted — drop older history so play can continue
      if (historyRef.current.includes(fp)) {
        historyRef.current = historyRef.current.slice(-Math.max(1, Math.floor(historySize / 2)));
      }

      historyRef.current = [...historyRef.current.filter((h) => h !== fp), fp].slice(-historySize);
      return next;
    },
    [historySize],
  );

  const [round, setRound] = useState(() => generate(level));

  useEffect(() => {
    levelRef.current = level;
  }, [level]);

  useEffect(() => {
    if (epochRef.current === resetEpoch) return;
    epochRef.current = resetEpoch;
    historyRef.current = [];
    levelRef.current = level;
    setRound(generate(level));
  }, [resetEpoch, level, generate]);

  const nextRound = useCallback(() => {
    setRound(generate(levelRef.current));
  }, [generate]);

  const resetHistory = useCallback(() => {
    historyRef.current = [];
    setRound(generate(levelRef.current));
  }, [generate]);

  return { round, nextRound, resetHistory };
}
