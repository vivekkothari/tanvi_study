export const NUMBER_SPELLINGS = [
  { num: 1,  word: 'One' },
  { num: 2,  word: 'Two' },
  { num: 3,  word: 'Three' },
  { num: 4,  word: 'Four' },
  { num: 5,  word: 'Five' },
  { num: 6,  word: 'Six' },
  { num: 7,  word: 'Seven' },
  { num: 8,  word: 'Eight' },
  { num: 9,  word: 'Nine' },
  { num: 10, word: 'Ten' },
  { num: 11, word: 'Eleven' },
  { num: 12, word: 'Twelve' },
  { num: 13, word: 'Thirteen' },
  { num: 14, word: 'Fourteen' },
  { num: 15, word: 'Fifteen' },
  { num: 16, word: 'Sixteen' },
  { num: 17, word: 'Seventeen' },
  { num: 18, word: 'Eighteen' },
  { num: 19, word: 'Nineteen' },
  { num: 20, word: 'Twenty' },
  { num: 30, word: 'Thirty' },
  { num: 40, word: 'Forty' },
  { num: 50, word: 'Fifty' },
] as const;

export const SHAPES = [
  { id: 'circle', name: 'Circle', emoji: '⭕' },
  { id: 'square', name: 'Square', emoji: '🟦' },
  { id: 'triangle', name: 'Triangle', emoji: '🔺' },
  { id: 'rectangle', name: 'Rectangle', emoji: '▬' },
  { id: 'oval', name: 'Oval', emoji: '🥚' },
] as const;

export const COUNT_EMOJIS = ['🍎', '⭐', '🎈', '🦋', '🌸', '🐶', '🐱', '🐟', '🍓', '🌈'];

export function countRangeForLevel(level: number): { min: number; max: number } {
  switch (level) {
    case 1:
      return { min: 1, max: 5 };
    case 2:
      return { min: 1, max: 10 };
    case 3:
      return { min: 1, max: 20 };
    case 4:
      return { min: 10, max: 50 };
    default:
      return { min: 20, max: 100 };
  }
}

export function addSubtractMax(level: number): number {
  return [5, 10, 15, 20, 50][Math.min(level, 5) - 1] ?? 5;
}

export function skipStepForLevel(level: number): number {
  if (level <= 2) return 2;
  if (level <= 4) return 5;
  return 10;
}
