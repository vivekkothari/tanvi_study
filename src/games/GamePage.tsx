import type { ComponentType } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { topicKey } from '../data/subjects';
import { CountTap } from './math/CountTap';
import { NumberTrain } from './math/NumberTrain';
import { ShapeSorter } from './math/ShapeSorter';
import { AddSubtract } from './math/AddSubtract';
import { GreaterLess } from './math/GreaterLess';
import { SkipCounting } from './math/SkipCounting';
import { NumberSpellings } from './math/NumberSpellings';
import { AlphabetParade } from './english/AlphabetParade';
import { PhonicsBlending } from './english/PhonicsBlending';
import { WordMatch } from './english/WordMatch';
import { Opposites } from './english/Opposites';
import { ArticlesGrammar } from './english/ArticlesGrammar';
import { SentenceBuilder } from './english/SentenceBuilder';
import { PictureWordChoice } from './english/PictureWordChoice';
import { FillInBlank } from './english/FillInBlank';
import { VowelFill } from './english/VowelFill';
import { SwarBoard } from './hindi/SwarBoard';
import { VyanjanParade } from './hindi/VyanjanParade';
import { HindiWordMatch } from './hindi/HindiWordMatch';
import { TwoLetterWords } from './hindi/TwoLetterWords';
import { BodyParts } from './evs/BodyParts';
import { AnimalHomes } from './evs/AnimalHomes';
import { LivingNonliving } from './evs/LivingNonliving';
import { CommunityHelpers } from './evs/CommunityHelpers';
import { SenseOrgans } from './evs/SenseOrgans';
import { SeasonsWeather } from './evs/SeasonsWeather';

const GAMES: Record<string, ComponentType<{ topicId: string; subjectId: string }>> = {
  'count-tap': CountTap,
  'number-train': NumberTrain,
  'shape-sorter': ShapeSorter,
  'add-subtract': AddSubtract,
  'greater-less': GreaterLess,
  'skip-counting': SkipCounting,
  'number-spellings': NumberSpellings,
  'alphabet-parade': AlphabetParade,
  'phonics-blending': PhonicsBlending,
  'word-match': WordMatch,
  opposites: Opposites,
  'articles-grammar': ArticlesGrammar,
  'sentence-builder': SentenceBuilder,
  'picture-word-choice': PictureWordChoice,
  'fill-in-blank': FillInBlank,
  'vowel-fill': VowelFill,
  'swar-board': SwarBoard,
  'vyanjan-parade': VyanjanParade,
  'hindi-word-match': HindiWordMatch,
  'two-letter-words': TwoLetterWords,
  'body-parts': BodyParts,
  'animal-homes': AnimalHomes,
  'living-nonliving': LivingNonliving,
  'community-helpers': CommunityHelpers,
  'sense-organs': SenseOrgans,
  'seasons-weather': SeasonsWeather,
};

export function GamePage() {
  const { subjectId = '', gameId = '' } = useParams();
  const Game = GAMES[gameId];

  if (!Game) return <Navigate to="/" replace />;

  return <Game topicId={topicKey(subjectId, gameId)} subjectId={subjectId} />;
}
