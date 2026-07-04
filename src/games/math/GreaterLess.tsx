import { GameShell, gameStyles as styles } from '../../components/GameShell';
import { useGameFeedback } from '../../hooks/useGameFeedback';
import { useGameRound } from '../../hooks/useGameRound';
import { randInt } from '../../lib/random';

type Props = { topicId: string; subjectId: string };

function makeRound(level: number) {
  const max = [10, 20, 50, 80, 100][Math.min(level, 5) - 1] ?? 10;
  let a = randInt(1, max);
  let b = randInt(1, max);
  if (level === 1 && a === b) b = a + 1;
  const answer = a > b ? '>' : a < b ? '<' : '=';
  return { a, b, answer };
}

export function GreaterLess({ topicId, subjectId }: Props) {
  const { level, wobble, onCorrect, attemptWrong, isMarkedWrong } = useGameFeedback(topicId);
  const { round, nextRound } = useGameRound(level, makeRound, (r) => `${r.a}:${r.b}`);

  const choose = (sym: string) => {
    if (isMarkedWrong(sym)) return;
    if (sym === round.answer) {
      onCorrect();
      nextRound();
    } else {
      attemptWrong(sym);
    }
  };

  return (
    <GameShell title="Greater / Less" topicId={topicId} backTo={`/island/${subjectId}`}>
      <p className={styles.prompt}>Pick the correct symbol</p>
      <div className={`${styles.choices} ${wobble ? 'wobble' : ''}`} style={{ fontSize: '2.5rem' }}>
        <span className={styles.choice}>{round.a}</span>
        <span className={styles.choice} style={{ background: '#fff3e0' }}>
          ?
        </span>
        <span className={styles.choice}>{round.b}</span>
      </div>
      <div className={styles.choices}>
        {['<', '=', '>'].map((sym) => (
          <button
            key={sym}
            type="button"
            className={`${styles.choice}${isMarkedWrong(sym) ? ` ${styles.choiceWrong}` : ''}`}
            style={{ fontSize: '2rem', minWidth: 80 }}
            disabled={isMarkedWrong(sym)}
            onClick={() => choose(sym)}
          >
            {sym}
          </button>
        ))}
      </div>
    </GameShell>
  );
}
