import { GameShell, gameStyles as styles } from '../../components/GameShell';
import { addSubtractMax } from '../../data/math';
import { useGameFeedback } from '../../hooks/useGameFeedback';
import { useGameRound } from '../../hooks/useGameRound';
import { pick, randInt, shuffle } from '../../lib/random';

type Props = { topicId: string; subjectId: string };

const EMOJIS = ['🍎', '⭐', '🎈', '🍓', '🦋'];

function makeRound(level: number) {
  const max = addSubtractMax(level);
  const isAdd = level <= 2 ? true : Math.random() < 0.5;
  const emoji = pick(EMOJIS);
  let a: number;
  let b: number;
  let answer: number;

  if (isAdd) {
    a = randInt(1, Math.max(1, max - 1));
    b = randInt(1, max - a);
    answer = a + b;
  } else {
    a = randInt(2, max);
    b = randInt(1, a);
    answer = a - b;
  }

  const options = new Set<number>([answer]);
  while (options.size < 4) options.add(randInt(0, max + 2));
  return { a, b, answer, isAdd, emoji, options: shuffle([...options]) };
}

export function AddSubtract({ topicId, subjectId }: Props) {
  const { level, wobble, onCorrect, attemptWrong, isMarkedWrong } = useGameFeedback(topicId);
  const { round, nextRound } = useGameRound(
    level,
    makeRound,
    (r) => `${r.isAdd ? '+' : '-'}:${r.a}:${r.b}`,
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
    <GameShell title="Add & Subtract" topicId={topicId} backTo={`/island/${subjectId}`}>
      <p className={styles.prompt}>What is the answer?</p>
      <div className={`${styles.objects} ${wobble ? 'wobble' : ''}`} style={{ fontSize: '2rem' }}>
        <span>{Array.from({ length: round.a }, () => round.emoji).join('')}</span>
        <span style={{ fontWeight: 900, fontSize: '2rem' }}>{round.isAdd ? '+' : '−'}</span>
        <span>{Array.from({ length: round.b }, () => round.emoji).join('')}</span>
        <span style={{ fontWeight: 900, fontSize: '2rem' }}>= ?</span>
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
