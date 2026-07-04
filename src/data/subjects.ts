import type { SubjectMeta } from '../types/game';

export const SUBJECTS: SubjectMeta[] = [
  {
    id: 'math',
    title: 'Mathematics',
    emoji: '🔢',
    color: '#FFE5B4',
    accent: '#FF8C42',
    games: [
      { id: 'count-tap', title: 'Count & Tap', emoji: '👆', description: 'Count the objects and tap the number!' },
      { id: 'number-train', title: 'Number Train', emoji: '🚂', description: 'Fill in the missing numbers!' },
      { id: 'shape-sorter', title: 'Shape Sorter', emoji: '🔷', description: 'Sort shapes into the right bins!' },
      { id: 'add-subtract', title: 'Add & Subtract', emoji: '🍎', description: 'Picture maths adventures!' },
      { id: 'greater-less', title: 'Greater / Less', emoji: '⚖️', description: 'Compare numbers with < > =' },
      { id: 'skip-counting', title: 'Skip Counting Rocket', emoji: '🚀', description: 'Count by 2s, 5s, or 10s!' },
      { id: 'number-spellings', title: 'Number Spellings', emoji: '🔗', description: 'Match numbers to their spellings!' },
    ],
  },
  {
    id: 'english',
    title: 'English',
    emoji: '📖',
    color: '#C8E6C9',
    accent: '#43A047',
    games: [
      { id: 'alphabet-parade', title: 'Alphabet Parade', emoji: '🔤', description: 'Letters, pictures & sounds!' },
      { id: 'phonics-blending', title: 'Phonics Blending', emoji: '🐱', description: 'Build CVC words!' },
      { id: 'word-match', title: 'Word Match', emoji: '🃏', description: 'Match pictures to words!' },
      { id: 'opposites', title: 'Opposites Game', emoji: '🔄', description: 'Find the opposite word!' },
      { id: 'articles-grammar', title: 'Articles & Grammar', emoji: '📝', description: 'a / an and singular / plural!' },
      { id: 'sentence-builder', title: 'Sentence Builder', emoji: '🧩', description: 'Arrange words into a sentence!' },
    ],
  },
  {
    id: 'hindi',
    title: 'Hindi',
    emoji: '🇮🇳',
    color: '#FFCCBC',
    accent: '#E64A19',
    games: [
      { id: 'swar-board', title: 'Swar Board', emoji: 'अ', description: 'Learn Hindi vowels!' },
      { id: 'vyanjan-parade', title: 'Vyanjan Parade', emoji: 'क', description: 'Learn Hindi consonants!' },
      { id: 'hindi-word-match', title: 'Hindi Word Match', emoji: '🥭', description: 'Match Hindi words to pictures!' },
      { id: 'two-letter-words', title: 'Two-letter Words', emoji: '✍️', description: 'Make words with matras!' },
    ],
  },
  {
    id: 'evs',
    title: 'EVS',
    emoji: '🌿',
    color: '#B3E5FC',
    accent: '#0288D1',
    games: [
      { id: 'body-parts', title: 'Body Parts Puzzle', emoji: '🧍', description: 'Tap the body part!' },
      { id: 'animal-homes', title: 'Animal Homes', emoji: '🏠', description: 'Where does each animal live?' },
      { id: 'living-nonliving', title: 'Living / Non-living', emoji: '🌱', description: 'Sort into two buckets!' },
      { id: 'community-helpers', title: 'Community Helpers', emoji: '👷', description: 'Match helpers to tools!' },
      { id: 'sense-organs', title: 'Sense Organs Quiz', emoji: '👁️', description: 'Which sense do we use?' },
      { id: 'seasons-weather', title: 'Seasons & Weather', emoji: '☀️', description: 'Pick the right season!' },
    ],
  },
];

export function getSubject(id: string): SubjectMeta | undefined {
  return SUBJECTS.find((s) => s.id === id);
}

export function getGame(subjectId: string, gameId: string) {
  const subject = getSubject(subjectId);
  return subject?.games.find((g) => g.id === gameId);
}

export function topicKey(subjectId: string, gameId: string): string {
  return `${subjectId}:${gameId}`;
}
