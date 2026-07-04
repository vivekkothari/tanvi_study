import { STORAGE_KEY } from '../config';
import type { ProgressMap, TopicProgress } from '../types/game';

export function defaultTopicProgress(): TopicProgress {
  return {
    stars: 0,
    level: 1,
    attempts: 0,
    correct: 0,
    streak: 0,
    missStreak: 0,
  };
}

export function loadProgress(): ProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as ProgressMap;
  } catch {
    return {};
  }
}

export function saveProgress(progress: ProgressMap): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function getTopicProgress(progress: ProgressMap, topicId: string): TopicProgress {
  return progress[topicId] ?? defaultTopicProgress();
}

export function totalStars(progress: ProgressMap): number {
  return Object.values(progress).reduce((sum, t) => sum + t.stars, 0);
}
