import { GameShell, gameStyles as styles } from '../../components/GameShell';
import { WORD_MATCH } from '../../data/english';
import { useGameFeedback } from '../../hooks/useGameFeedback';
import { useGameRound } from '../../hooks/useGameRound';
import { pick, sample, shuffle } from '../../lib/random';

type Props = { topicId: string; subjectId: string };

function makeRound(level: number) {
  const count = Math.min(3 + level, WORD_MATCH.length);
  const pool = sample(WORD_MATCH, count);
  const target = pick(pool);
  return { target, options: shuffle(pool) };
}

export function WordMatch({ topicId, subjectId }: Props) {
  const { level, wobble, onCorrect, attemptWrong, isMarkedWrong } = useGameFeedback(topicId);
  const { round, nextRound } = useGameRound(level, makeRound, (r) => r.target.word);

  const choose = (word: string) => {
    if (isMarkedWrong(word)) return;
    if (word === round.target.word) {
      onCorrect();
      nextRound();
    } else {
      attemptWrong(word);
    }
  };

  return (
    <GameShell title="Word Match" topicId={topicId} backTo={`/island/${subjectId}`}>
      <p className={styles.prompt}>Match the picture to the word!</p>
      <div className={`${styles.bigEmoji} ${wobble ? 'wobble' : ''}`}>{round.target.emoji}</div>
      <div className={styles.choices}>
        {round.options.map((opt) => (
          <button
            key={opt.word}
            type="button"
            className={`${styles.choice}${isMarkedWrong(opt.word) ? ` ${styles.choiceWrong}` : ''}`}
            disabled={isMarkedWrong(opt.word)}
            onClick={() => choose(opt.word)}
          >
            {opt.word}
          </button>
        ))}
      </div>
    </GameShell>
  );
}
