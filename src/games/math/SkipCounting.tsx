import { GameShell, gameStyles as styles } from '../../components/GameShell';
import { skipStepForLevel } from '../../data/math';
import { useGameFeedback } from '../../hooks/useGameFeedback';
import { useGameRound } from '../../hooks/useGameRound';
import { randInt, shuffle } from '../../lib/random';

type Props = { topicId: string; subjectId: string };

function makeRound(level: number) {
  const step = skipStepForLevel(level);
  const start = step;
  const seq = [start, start + step, start + step * 2, start + step * 3, start + step * 4];
  const missIndex = randInt(1, 3);
  const answer = seq[missIndex]!;
  const display = seq.map((n, i) => (i === missIndex ? null : n));
  const options = new Set<number>([answer]);
  while (options.size < 4) options.add(answer + step * randInt(-2, 2));
  return { display, answer, step, options: shuffle([...options].filter((n) => n > 0)) };
}

export function SkipCounting({ topicId, subjectId }: Props) {
  const { level, wobble, onCorrect, attemptWrong, isMarkedWrong } = useGameFeedback(topicId);
  const { round, nextRound } = useGameRound(
    level,
    makeRound,
    (r) => `${r.step}:${r.display.join(',')}:${r.answer}`,
  );

  const choose = (n: number) => {
    if (isMarkedWrong(n)) return;
    if (n === round.answer) {
      onCorrect();
      nextRound();
    } else {
      attemptWrong(n);
    }
  };

  return (
    <GameShell title="Skip Counting Rocket" topicId={topicId} backTo={`/island/${subjectId}`}>
      <div className={styles.bigEmoji}>🚀</div>
      <p className={styles.prompt}>Count by {round.step}s to launch!</p>
      <div className={`${styles.choices} ${wobble ? 'wobble' : ''}`}>
        {round.display.map((n, i) => (
          <div
            key={i}
            className={styles.choice}
            style={{
              background: n === null ? '#fff3e0' : '#e8f5e9',
              borderColor: n === null ? '#ff8c42' : '#81c784',
            }}
          >
            {n === null ? '?' : n}
          </div>
        ))}
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
