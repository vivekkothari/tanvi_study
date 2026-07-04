export const ALPHABET = [
  { letter: 'A', word: 'Apple', emoji: '🍎' },
  { letter: 'B', word: 'Ball', emoji: '⚽' },
  { letter: 'C', word: 'Cat', emoji: '🐱' },
  { letter: 'D', word: 'Dog', emoji: '🐶' },
  { letter: 'E', word: 'Elephant', emoji: '🐘' },
  { letter: 'F', word: 'Fish', emoji: '🐟' },
  { letter: 'G', word: 'Grapes', emoji: '🍇' },
  { letter: 'H', word: 'Hat', emoji: '🎩' },
  { letter: 'I', word: 'Ice cream', emoji: '🍦' },
  { letter: 'J', word: 'Juice', emoji: '🧃' },
  { letter: 'K', word: 'Kite', emoji: '🪁' },
  { letter: 'L', word: 'Lion', emoji: '🦁' },
  { letter: 'M', word: 'Monkey', emoji: '🐵' },
  { letter: 'N', word: 'Nest', emoji: '🪺' },
  { letter: 'O', word: 'Orange', emoji: '🍊' },
  { letter: 'P', word: 'Penguin', emoji: '🐧' },
  { letter: 'Q', word: 'Queen', emoji: '👑' },
  { letter: 'R', word: 'Rabbit', emoji: '🐰' },
  { letter: 'S', word: 'Sun', emoji: '☀️' },
  { letter: 'T', word: 'Tiger', emoji: '🐯' },
  { letter: 'U', word: 'Umbrella', emoji: '☂️' },
  { letter: 'V', word: 'Violin', emoji: '🎻' },
  { letter: 'W', word: 'Whale', emoji: '🐋' },
  { letter: 'X', word: 'Xylophone', emoji: '🎹' },
  { letter: 'Y', word: 'Yo-yo', emoji: '🪀' },
  { letter: 'Z', word: 'Zebra', emoji: '🦓' },
];

export const CVC_WORDS = [
  { word: 'cat', letters: ['c', 'a', 't'], emoji: '🐱' },
  { word: 'dog', letters: ['d', 'o', 'g'], emoji: '🐶' },
  { word: 'hat', letters: ['h', 'a', 't'], emoji: '🎩' },
  { word: 'sun', letters: ['s', 'u', 'n'], emoji: '☀️' },
  { word: 'pig', letters: ['p', 'i', 'g'], emoji: '🐷' },
  { word: 'bus', letters: ['b', 'u', 's'], emoji: '🚌' },
  { word: 'cup', letters: ['c', 'u', 'p'], emoji: '☕' },
  { word: 'bed', letters: ['b', 'e', 'd'], emoji: '🛏️' },
  { word: 'fox', letters: ['f', 'o', 'x'], emoji: '🦊' },
  { word: 'jam', letters: ['j', 'a', 'm'], emoji: '🫙' },
  { word: 'net', letters: ['n', 'e', 't'], emoji: '🥅' },
  { word: 'pen', letters: ['p', 'e', 'n'], emoji: '🖊️' },
];

export const WORD_MATCH = [
  { word: 'apple', emoji: '🍎' },
  { word: 'ball', emoji: '⚽' },
  { word: 'book', emoji: '📚' },
  { word: 'car', emoji: '🚗' },
  { word: 'tree', emoji: '🌳' },
  { word: 'flower', emoji: '🌸' },
  { word: 'house', emoji: '🏠' },
  { word: 'bird', emoji: '🐦' },
  { word: 'fish', emoji: '🐟' },
  { word: 'star', emoji: '⭐' },
];

export const OPPOSITES = [
  { word: 'big', opposite: 'small', emoji: '🐘' },
  { word: 'hot', opposite: 'cold', emoji: '🔥' },
  { word: 'happy', opposite: 'sad', emoji: '😊' },
  { word: 'up', opposite: 'down', emoji: '⬆️' },
  { word: 'day', opposite: 'night', emoji: '☀️' },
  { word: 'fast', opposite: 'slow', emoji: '🐇' },
  { word: 'open', opposite: 'closed', emoji: '🚪' },
  { word: 'wet', opposite: 'dry', emoji: '💧' },
  { word: 'loud', opposite: 'quiet', emoji: '🔊' },
  { word: 'in', opposite: 'out', emoji: '📥' },
];

export const ARTICLES = [
  { word: 'apple', article: 'an', emoji: '🍎' },
  { word: 'elephant', article: 'an', emoji: '🐘' },
  { word: 'orange', article: 'an', emoji: '🍊' },
  { word: 'umbrella', article: 'an', emoji: '☂️' },
  { word: 'ice cream', article: 'an', emoji: '🍦' },
  { word: 'ball', article: 'a', emoji: '⚽' },
  { word: 'cat', article: 'a', emoji: '🐱' },
  { word: 'dog', article: 'a', emoji: '🐶' },
  { word: 'tree', article: 'a', emoji: '🌳' },
  { word: 'sun', article: 'a', emoji: '☀️' },
];

export const PLURALS = [
  { singular: 'cat', plural: 'cats', emoji: '🐱' },
  { singular: 'dog', plural: 'dogs', emoji: '🐶' },
  { singular: 'book', plural: 'books', emoji: '📚' },
  { singular: 'star', plural: 'stars', emoji: '⭐' },
  { singular: 'ball', plural: 'balls', emoji: '⚽' },
  { singular: 'fish', plural: 'fish', emoji: '🐟' },
];

export const SENTENCES = [
  { words: ['I', 'like', 'apples'], emoji: '🍎' },
  { words: ['The', 'cat', 'is', 'big'], emoji: '🐱' },
  { words: ['She', 'has', 'a', 'ball'], emoji: '⚽' },
  { words: ['We', 'love', 'to', 'play'], emoji: '🎮' },
  { words: ['The', 'sun', 'is', 'hot'], emoji: '☀️' },
  { words: ['I', 'see', 'a', 'bird'], emoji: '🐦' },
];

// ── Worksheet games ────────────────────────────────────────────────────────

/**
 * Q1 & Q2 – "Circle the correct word"
 * Show a picture; Tanvi taps the correct word from two options.
 * `img` is a path relative to /images/words/ (null = use emoji fallback).
 */
export const PICTURE_WORD_ITEMS = [
  // Short-a family
  { word: 'cat', img: '/images/words/cat.png', emoji: '🐱', wrong: 'rat' },
  { word: 'bat', img: '/images/words/bat.png', emoji: '🦇', wrong: 'fat' },
  { word: 'tap', img: '/images/words/tap.png', emoji: '🚰', wrong: 'cap' },
  { word: 'pad', img: '/images/words/pad.png', emoji: '📋', wrong: 'bat' },
  { word: 'fan', img: '/images/words/fan.png', emoji: '💨', wrong: 'can' },
  { word: 'man', img: '/images/words/man.png', emoji: '👨', wrong: 'ram' },
  { word: 'tag', img: '/images/words/tag.png', emoji: '🏷️', wrong: 'pad' },
  { word: 'hat', img: '/images/words/hat.png', emoji: '🤠', wrong: 'dad' },
  { word: 'jam', img: '/images/words/jam.png', emoji: '🍓', wrong: 'ram' },
  { word: 'lad', img: '/images/words/lad.png', emoji: '👦', wrong: 'pad' },
  { word: 'cap', img: '/images/words/cap.png', emoji: '🧢', wrong: 'tap' },
  { word: 'ram', img: '/images/words/ram.png', emoji: '🐑', wrong: 'lad' },
  // Short-e family
  { word: 'bed', img: '/images/words/bed.png', emoji: '🛏️', wrong: 'ben' },
  { word: 'men', img: '/images/words/men.png', emoji: '👬', wrong: 'ten' },
  { word: 'peg', img: '/images/words/peg.png', emoji: '📌', wrong: 'ped' },
  { word: 'ten', img: '/images/words/ten.png', emoji: '🔟', wrong: 'tet' },
  { word: 'fed', img: '/images/words/fed.png', emoji: '🍼', wrong: 'fen' },
  { word: 'jet', img: null, emoji: '✈️', wrong: 'jed' },
  { word: 'net', img: null, emoji: '🥅', wrong: 'set' },
  { word: 'leg', img: null, emoji: '🦵', wrong: 'led' },
  { word: 'den', img: null, emoji: '🏕️', wrong: 'men' },
  { word: 'wet', img: null, emoji: '🌧️', wrong: 'wed' },
  { word: 'pen', img: null, emoji: '🖊️', wrong: 'peg' },
  { word: 'hen', img: null, emoji: '🐔', wrong: 'ham' },
] as const;

/**
 * Q3-A & Q3-C – "Fill in the blank" / "Circle the correct word" in a sentence.
 * `blank` marks where the gap is (use ___ in display).
 */
export const FILL_BLANK_ITEMS = [
  { sentence: 'The hen is on the ___.', answer: 'mat', wrong: 'fat' },
  { sentence: 'The cat is on the ___.', answer: 'mat', wrong: 'sat' },
  { sentence: 'Ben has a red ___.', answer: 'hen', wrong: 'den' },
  { sentence: 'The rat ran to the ___.', answer: 'bag', wrong: 'wag' },
  { sentence: 'Meg has a red ___.', answer: 'hen', wrong: 'wag' },
  { sentence: 'The ___ is on the mat.', answer: 'cat', wrong: 'cab' },
  { sentence: 'Ben has ___ pens.', answer: 'ten', wrong: 'rat' },
  { sentence: 'The ___ is on my lap.', answer: 'map', wrong: 'tap' },
  { sentence: 'Sam has a ___.', answer: 'van', wrong: 'man' },
  { sentence: 'The ___ ran fast.', answer: 'rat', wrong: 'red' },
] as const;

/**
 * Q3-B – "Fill in the blank with the correct vowel"
 * `before` and `after` are the parts of the word around the missing vowel.
 */
export const VOWEL_FILL_ITEMS = [
  { sentence: 'The c_t is on the mat.', before: 'c', after: 't', answer: 'a' as const },
  { sentence: 'Ben has a r_d pen.', before: 'r', after: 'd', answer: 'e' as const },
  { sentence: 'The r_t is in the bag.', before: 'r', after: 't', answer: 'a' as const },
  { sentence: 'The h_n is in the den.', before: 'h', after: 'n', answer: 'e' as const },
  { sentence: 'Sam has a c_p.', before: 'c', after: 'p', answer: 'u' as const },
] as const;
