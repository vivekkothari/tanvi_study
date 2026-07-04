import { GameShell, gameStyles as styles } from '../../components/GameShell';
import { BODY_PARTS } from '../../data/evs';
import { useGameFeedback } from '../../hooks/useGameFeedback';
import { useGameRound } from '../../hooks/useGameRound';
import { pick, sample, shuffle } from '../../lib/random';

type Props = { topicId: string; subjectId: string };

function makeRound(level: number) {
  const count = Math.min(4 + level, BODY_PARTS.length);
  const pool = sample(BODY_PARTS, count);
  const target = pick(pool);
  return { target, options: shuffle(pool) };
}

export function BodyParts({ topicId, subjectId }: Props) {
  const { level, wobble, onCorrect, attemptWrong, isMarkedWrong } = useGameFeedback(topicId);
  const { round, nextRound } = useGameRound(level, makeRound, (r) => r.target.id);

  const choose = (id: string) => {
    if (isMarkedWrong(id)) return;
    if (id === round.target.id) {
      onCorrect();
      nextRound();
    } else {
      attemptWrong(id);
    }
  };

  return (
    <GameShell title="Body Parts Puzzle" topicId={topicId} backTo={`/island/${subjectId}`}>
      <p className={styles.prompt}>
        Tap the <strong>{round.target.name}</strong>!
      </p>
      <div className={`${styles.choices} ${wobble ? 'wobble' : ''}`}>
        {round.options.map((part) => (
          <button
            key={part.id}
            type="button"
            className={`${styles.choice}${isMarkedWrong(part.id) ? ` ${styles.choiceWrong}` : ''}`}
            style={{ fontSize: '2.5rem', minWidth: 80, minHeight: 80 }}
            disabled={isMarkedWrong(part.id)}
            onClick={() => choose(part.id)}
            aria-label={part.name}
          >
            {part.emoji}
          </button>
        ))}
      </div>
    </GameShell>
  );
}
