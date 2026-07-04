import { MatchPairs, type MatchPairItem } from '../../components/MatchPairs';
import { GameShell } from '../../components/GameShell';
import { NUMBER_SPELLINGS } from '../../data/math';
import { useGameFeedback } from '../../hooks/useGameFeedback';
import { useGameRound } from '../../hooks/useGameRound';
import { sample, shuffle } from '../../lib/random';

type Props = { topicId: string; subjectId: string };

function makeRound(level: number): MatchPairItem[] {
  const count = Math.min(4 + level, NUMBER_SPELLINGS.length);
  const pool = sample([...NUMBER_SPELLINGS], count);
  // Shuffle left column order so numerals aren't always ascending
  return shuffle(pool).map((p) => ({
    id: String(p.num),
    left: p.num,
    right: p.word,
  }));
}

export function NumberSpellings({ topicId, subjectId }: Props) {
  const { level, onCorrect, onWrong } = useGameFeedback(topicId);
  const { round: pairs, nextRound } = useGameRound(
    level,
    makeRound,
    (items) =>
      items
        .map((p) => p.id)
        .sort()
        .join(','),
  );

  return (
    <GameShell title="Number Spellings" topicId={topicId} backTo={`/island/${subjectId}`}>
      <MatchPairs
        pairs={pairs}
        prompt="Tap a number or spelling, then tap its match!"
        onMatch={onCorrect}
        onMismatch={onWrong}
        onRoundComplete={nextRound}
      />
    </GameShell>
  );
}
