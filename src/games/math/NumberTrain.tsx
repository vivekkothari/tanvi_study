import { GameShell, gameStyles as styles } from '../../components/GameShell';
import { useGameFeedback } from '../../hooks/useGameFeedback';
import { useGameRound } from '../../hooks/useGameRound';
import { randInt, shuffle } from '../../lib/random';

type Props = { topicId: string; subjectId: string };

function makeRound(level: number) {
  const max = [10, 20, 50, 80, 100][Math.min(level, 5) - 1] ?? 10;
  const start = randInt(1, Math.max(1, max - 5));
  const seq = [start, start + 1, start + 2, start + 3, start + 4];
  const modes = ['before', 'after', 'between'] as const;
  const mode = modes[randInt(0, modes.length - 1)]!;
  let answer: number;
  let display: (number | null)[];
  let prompt: string;

  if (mode === 'before') {
    answer = seq[0]!;
    display = [null, seq[1]!, seq[2]!, seq[3]!];
    prompt = 'What comes before?';
  } else if (mode === 'after') {
    answer = seq[3]!;
    display = [seq[0]!, seq[1]!, seq[2]!, null];
    prompt = 'What comes after?';
  } else {
    answer = seq[2]!;
    display = [seq[1]!, null, seq[3]!];
    prompt = 'What number is between?';
  }

  const options = new Set<number>([answer]);
  while (options.size < 4) options.add(randInt(1, max + 2));
  return { display, answer, options: shuffle([...options]), prompt, mode };
}

export function NumberTrain({ topicId, subjectId }: Props) {
  const { level, wobble, onCorrect, attemptWrong, isMarkedWrong } = useGameFeedback(topicId);
  const { round, nextRound } = useGameRound(
    level,
    makeRound,
    (r) => `${r.mode}:${r.display.join(',')}:${r.answer}`,
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
    <GameShell title="Number Train" topicId={topicId} backTo={`/island/${subjectId}`}
      announce={`${round.prompt} ${round.display.map((n) => n === null ? 'blank' : String(n)).join(', ')}`}>
      <p className={styles.prompt}>{round.prompt}</p>
      <div className={`${styles.choices} ${wobble ? 'wobble' : ''}`}>
        {round.display.map((n, i) => (
          <div
            key={i}
            className={styles.choice}
            style={{
              background: n === null ? '#fff3e0' : '#e3f2fd',
              borderColor: n === null ? '#ff8c42' : '#90caf9',
              minWidth: 72,
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
