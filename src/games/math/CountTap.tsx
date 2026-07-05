import { GameShell, gameStyles as styles } from '../../components/GameShell';
import { COUNT_EMOJIS, countRangeForLevel } from '../../data/math';
import { useGameFeedback } from '../../hooks/useGameFeedback';
import { useGameRound } from '../../hooks/useGameRound';
import { pick, randInt, shuffle } from '../../lib/random';

type Props = { topicId: string; subjectId: string };

function makeRound(level: number) {
  const { min, max } = countRangeForLevel(level);
  const count = randInt(min, max);
  const emoji = pick(COUNT_EMOJIS);
  const options = new Set<number>([count]);
  while (options.size < 4) {
    const delta = randInt(1, Math.max(3, Math.floor(max / 10)));
    options.add(Math.max(1, count + (Math.random() < 0.5 ? -delta : delta)));
  }
  return { count, emoji, options: shuffle([...options]) };
}

export function CountTap({ topicId, subjectId }: Props) {
  const { level, wobble, onCorrect, attemptWrong, isMarkedWrong } = useGameFeedback(topicId);
  const { round, nextRound } = useGameRound(level, makeRound, (r) => `${r.count}:${r.emoji}`);

  const choose = (n: number) => {
    if (isMarkedWrong(n)) return;
    if (n === round.count) {
      onCorrect();
      nextRound();
    } else {
      attemptWrong(n);
    }
  };

  const tens = Math.floor(round.count / 10);
  const ones = round.count % 10;

  return (
    <GameShell title="Count & Tap" topicId={topicId} backTo={`/island/${subjectId}`}
      announce="How many do you see?">
      <p className={styles.prompt}>How many do you see?</p>
      <div className={`${styles.objects} ${wobble ? 'wobble' : ''}`}>
        {round.count <= 20
          ? Array.from({ length: round.count }, (_, i) => <span key={i}>{round.emoji}</span>)
          : (
              <>
                {Array.from({ length: tens }, (_, i) => (
                  <span key={`t${i}`} style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                    {round.emoji}×10
                  </span>
                ))}
                {Array.from({ length: ones }, (_, i) => (
                  <span key={`o${i}`}>{round.emoji}</span>
                ))}
              </>
            )}
      </div>
      <div className={styles.choices}>
        {round.options.map((n) => (
          <button
            key={n}
            type="button"
            className={`${styles.choice}${isMarkedWrong(n) ? ` ${styles.choiceWrong}` : ''}`}
            disabled={isMarkedWrong(n)}
            onClick={() => choose(n)}
          >
            {n}
          </button>
        ))}
      </div>
    </GameShell>
  );
}
