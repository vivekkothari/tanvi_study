export type SubjectId = 'math' | 'english' | 'hindi' | 'evs';

export type TopicProgress = {
  stars: number;
  level: number;
  attempts: number;
  correct: number;
  streak: number;
  missStreak: number;
};

export type ProgressMap = Record<string, TopicProgress>;

export type GameMeta = {
  id: string;
  title: string;
  emoji: string;
  description: string;
};

export type SubjectMeta = {
  id: SubjectId;
  title: string;
  emoji: string;
  color: string;
  accent: string;
  games: GameMeta[];
};

export type GameProps = {
  topicId: string;
  level: number;
  onCorrect: () => void;
  onWrong: () => void;
};
