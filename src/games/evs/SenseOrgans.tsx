import { GameShell, gameStyles as styles } from '../../components/GameShell';
import { SENSE_ORGANS } from '../../data/evs';
import { useGameFeedback } from '../../hooks/useGameFeedback';
import { useGameRound } from '../../hooks/useGameRound';
import { pick, shuffle } from '../../lib/random';

type Props = { topicId: string; subjectId: string };

function makeRound(_level: number) {
  const target = pick(SENSE_ORGANS);
  return { target, options: shuffle(SENSE_ORGANS) };
}

export function SenseOrgans({ topicId, subjectId }: Props) {
  const { level, wobble, onCorrect, attemptWrong, isMarkedWrong } = useGameFeedback(topicId);
  const { round, nextRound } = useGameRound(level, makeRound, (r) => r.target.organ);

  const choose = (organ: string) => {
    if (isMarkedWrong(organ)) return;
    if (organ === round.target.organ) {
      onCorrect();
      nextRound();
    } else {
      attemptWrong(organ);
    }
  };

  return (
    <GameShell title="Sense Organs Quiz" topicId={topicId} backTo={`/island/${subjectId}`}>
      <p className={styles.prompt}>Which sense organ do we use for this?</p>
      <div className={`${styles.bigEmoji} ${wobble ? 'wobble' : ''}`}>{round.target.cueEmoji}</div>
      <p style={{ fontSize: '1.4rem', fontWeight: 800 }}>{round.target.cue}</p>
      <div className={styles.choices}>
        {round.options.map((item) => (
          <button
            key={item.organ}
            type="button"
            className={`${styles.choice}${isMarkedWrong(item.organ) ? ` ${styles.choiceWrong}` : ''}`}
            disabled={isMarkedWrong(item.organ)}
            onClick={() => choose(item.organ)}
          >
            <span style={{ fontSize: '1.8rem' }}>{item.organEmoji}</span>
            <div>{item.organ}</div>
          </button>
        ))}
      </div>
    </GameShell>
  );
}
