import { GameShell, gameStyles as styles } from '../../components/GameShell';
import { OPPOSITES } from '../../data/english';
import { useGameFeedback } from '../../hooks/useGameFeedback';
import { useGameRound } from '../../hooks/useGameRound';
import { pick, shuffle } from '../../lib/random';

type Props = { topicId: string; subjectId: string };

function makeRound(level: number) {
  const pool = OPPOSITES.slice(0, Math.min(OPPOSITES.length, 4 + level));
  const target = pick(pool);
  const wrong = shuffle(OPPOSITES.filter((o) => o.opposite !== target.opposite))
    .slice(0, 3)
    .map((o) => o.opposite);
  return {
    target,
    options: shuffle([target.opposite, ...wrong]),
  };
}

export function Opposites({ topicId, subjectId }: Props) {
  const { level, wobble, onCorrect, attemptWrong, isMarkedWrong } = useGameFeedback(topicId);
  const { round, nextRound } = useGameRound(level, makeRound, (r) => r.target.word);

  const choose = (word: string) => {
    if (isMarkedWrong(word)) return;
    if (word === round.target.opposite) {
      onCorrect();
      nextRound();
    } else {
      attemptWrong(word);
    }
  };

  return (
    <GameShell title="Opposites Game" topicId={topicId} backTo={`/island/${subjectId}`}>
      <div className={styles.bigEmoji}>{round.target.emoji}</div>
      <p className={styles.prompt}>
        What is the opposite of <strong>{round.target.word}</strong>?
      </p>
      <div className={`${styles.choices} ${wobble ? 'wobble' : ''}`}>
        {round.options.map((word) => (
          <button
            key={word}
            type="button"
            className={`${styles.choice}${isMarkedWrong(word) ? ` ${styles.choiceWrong}` : ''}`}
            disabled={isMarkedWrong(word)}
            onClick={() => choose(word)}
          >
            {word}
          </button>
        ))}
      </div>
    </GameShell>
  );
}
