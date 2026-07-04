import { useCallback, useEffect, useRef, useState } from 'react';
import { useProgress } from '../context/ProgressContext';

function toKey(optionKey: string | number | boolean): string {
  return String(optionKey);
}

export function useGameFeedback(topicId: string) {
  const { getTopic, recordCorrect, recordWrong, resetEpoch } = useProgress();
  const [wobble, setWobble] = useState(false);
  const [wrongCounts, setWrongCounts] = useState<Record<string, number>>({});
  const wrongCountsRef = useRef<Record<string, number>>({});
  const topic = getTopic(topicId);

  const clearWrongMarks = useCallback(() => {
    wrongCountsRef.current = {};
    setWrongCounts({});
  }, []);

  useEffect(() => {
    clearWrongMarks();
  }, [resetEpoch, clearWrongMarks]);

  const onCorrect = useCallback(() => {
    recordCorrect(topicId);
    clearWrongMarks();
  }, [recordCorrect, topicId, clearWrongMarks]);

  const onWrong = useCallback(() => {
    recordWrong(topicId);
    setWobble(true);
    window.setTimeout(() => setWobble(false), 450);
  }, [recordWrong, topicId]);

  /** Record a wrong tap. After the same option is wrong more than once, it is marked. */
  const attemptWrong = useCallback(
    (optionKey: string | number | boolean) => {
      const key = toKey(optionKey);
      const count = wrongCountsRef.current[key] ?? 0;
      if (count > 1) return;

      const next = count + 1;
      wrongCountsRef.current = { ...wrongCountsRef.current, [key]: next };
      setWrongCounts(wrongCountsRef.current);
      onWrong();
    },
    [onWrong],
  );

  const isMarkedWrong = useCallback(
    (optionKey: string | number | boolean) => (wrongCounts[toKey(optionKey)] ?? 0) > 1,
    [wrongCounts],
  );

  const choiceClass = useCallback(
    (baseClass: string, wrongClass: string, optionKey: string | number | boolean) =>
      `${baseClass}${isMarkedWrong(optionKey) ? ` ${wrongClass}` : ''}`,
    [isMarkedWrong],
  );

  return {
    level: topic.level,
    stars: topic.stars,
    wobble,
    onCorrect,
    onWrong,
    attemptWrong,
    isMarkedWrong,
    choiceClass,
    clearWrongMarks,
  };
}
