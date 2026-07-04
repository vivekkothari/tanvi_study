import { MAX_LEVEL, MISSES_TO_LEVEL_DOWN, STREAK_TO_LEVEL_UP } from '../config';
import type { TopicProgress } from '../types/game';
import { defaultTopicProgress } from './progress';

export type AnswerResult = {
  progress: TopicProgress;
  leveledUp: boolean;
  leveledDown: boolean;
};

export function applyCorrect(current: TopicProgress | undefined): AnswerResult {
  const base = current ?? defaultTopicProgress();
  const streak = base.streak + 1;
  let level = base.level;
  let leveledUp = false;

  if (streak >= STREAK_TO_LEVEL_UP && level < MAX_LEVEL) {
    level += 1;
    leveledUp = true;
  }

  return {
    progress: {
      stars: base.stars + 1,
      level,
      attempts: base.attempts + 1,
      correct: base.correct + 1,
      streak: leveledUp ? 0 : streak,
      missStreak: 0,
    },
    leveledUp,
    leveledDown: false,
  };
}

export function applyWrong(current: TopicProgress | undefined): AnswerResult {
  const base = current ?? defaultTopicProgress();
  const missStreak = base.missStreak + 1;
  let level = base.level;
  let leveledDown = false;

  if (missStreak >= MISSES_TO_LEVEL_DOWN && level > 1) {
    level -= 1;
    leveledDown = true;
  }

  return {
    progress: {
      ...base,
      attempts: base.attempts + 1,
      streak: 0,
      missStreak: leveledDown ? 0 : missStreak,
      level,
    },
    leveledUp: false,
    leveledDown,
  };
}
