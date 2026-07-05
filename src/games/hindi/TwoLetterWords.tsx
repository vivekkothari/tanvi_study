import { GameShell, gameStyles as styles } from '../../components/GameShell';
import { MATRA_WORDS } from '../../data/hindi';
import { useGameFeedback } from '../../hooks/useGameFeedback';
import { useGameRound } from '../../hooks/useGameRound';
import { pick, shuffle } from '../../lib/random';

type Props = { topicId: string; subjectId: string };

function makeRound(level: number) {
  const pool = MATRA_WORDS.slice(0, Math.min(MATRA_WORDS.length, 4 + level));
  const target = pick(pool);
  return { target, options: shuffle(target.options) };
}

export function TwoLetterWords({ topicId, subjectId }: Props) {
  const { level, wobble, onCorrect, attemptWrong, isMarkedWrong } = useGameFeedback(topicId);
  const { round, nextRound } = useGameRound(level, makeRound, (r) => r.target.word);

  const choose = (matra: string) => {
    if (isMarkedWrong(matra)) return;
    if (matra === round.target.matra) {
      onCorrect();
      nextRound();
    } else {
      attemptWrong(matra);
    }
  };

  return (
    <GameShell title="Two-letter Words" topicId={topicId} backTo={`/island/${subjectId}`}
      announce="Pick the right matra to make the word">
      <p className={styles.prompt}>Pick the right matra to make the word</p>
      <div className={`${styles.detailWord} hindi`} style={{ fontSize: '2.5rem' }}>
        {round.target.word}
      </div>
      <div className={`${styles.choices} ${wobble ? 'wobble' : ''}`}>
        <span className={`${styles.choice} hindi`} style={{ fontSize: '2rem' }}>
          {round.target.base}
          <span style={{ color: '#e64a19' }}>?</span>
        </span>
      </div>
      <div className={styles.choices}>
        {round.options.map((matra) => (
          <button
            key={matra}
            type="button"
            className={`${styles.choice} hindi${isMarkedWrong(matra) ? ` ${styles.choiceWrong}` : ''}`}
            style={{ fontSize: '2rem', minWidth: 80 }}
            disabled={isMarkedWrong(matra)}
            onClick={() => choose(matra)}
          >
            {round.target.base}
            {matra}
          </button>
        ))}
      </div>
    </GameShell>
  );
}
