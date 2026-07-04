import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { applyCorrect, applyWrong } from '../lib/difficulty';
import {
  defaultTopicProgress,
  getTopicProgress,
  loadProgress,
  saveProgress,
  totalStars,
} from '../lib/progress';
import { sound } from '../lib/sound';
import type { ProgressMap, TopicProgress } from '../types/game';

type ProgressContextValue = {
  progress: ProgressMap;
  stars: number;
  muted: boolean;
  confettiKey: number;
  /** Increments on any start-afresh so games can clear question history. */
  resetEpoch: number;
  getTopic: (topicId: string) => TopicProgress;
  recordCorrect: (topicId: string) => void;
  recordWrong: (topicId: string) => void;
  toggleMute: () => void;
  resetProgress: () => void;
  resetTopic: (topicId: string) => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressMap>(() => loadProgress());
  const [muted, setMuted] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);
  const [resetEpoch, setResetEpoch] = useState(0);

  const update = useCallback((next: ProgressMap) => {
    setProgress(next);
    saveProgress(next);
  }, []);

  const getTopic = useCallback(
    (topicId: string) => getTopicProgress(progress, topicId),
    [progress],
  );

  const recordCorrect = useCallback(
    (topicId: string) => {
      const result = applyCorrect(progress[topicId]);
      const next = { ...progress, [topicId]: result.progress };
      update(next);
      sound.success();
      if (result.leveledUp) sound.levelUp();
      setConfettiKey((k) => k + 1);
    },
    [progress, update],
  );

  const recordWrong = useCallback(
    (topicId: string) => {
      const result = applyWrong(progress[topicId]);
      const next = { ...progress, [topicId]: result.progress };
      update(next);
      sound.wrong();
    },
    [progress, update],
  );

  const toggleMute = useCallback(() => {
    const next = sound.toggleMute();
    setMuted(next);
  }, []);

  const resetProgress = useCallback(() => {
    update({});
    setResetEpoch((e) => e + 1);
  }, [update]);

  const resetTopic = useCallback(
    (topicId: string) => {
      const next = { ...progress, [topicId]: defaultTopicProgress() };
      update(next);
      setResetEpoch((e) => e + 1);
    },
    [progress, update],
  );

  const value = useMemo(
    () => ({
      progress,
      stars: totalStars(progress),
      muted,
      confettiKey,
      resetEpoch,
      getTopic,
      recordCorrect,
      recordWrong,
      toggleMute,
      resetProgress,
      resetTopic,
    }),
    [
      progress,
      muted,
      confettiKey,
      resetEpoch,
      getTopic,
      recordCorrect,
      recordWrong,
      toggleMute,
      resetProgress,
      resetTopic,
    ],
  );

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
