import { GameShell, gameStyles as styles } from '../../components/GameShell';
import { LIVING_NONLIVING } from '../../data/evs';
import { useGameFeedback } from '../../hooks/useGameFeedback';
import { useGameRound } from '../../hooks/useGameRound';
import { pick } from '../../lib/random';

type Props = { topicId: string; subjectId: string };

function makeRound(_level: number) {
  return pick(LIVING_NONLIVING);
}

export function LivingNonliving({ topicId, subjectId }: Props) {
  const { level, wobble, onCorrect, attemptWrong, isMarkedWrong } = useGameFeedback(topicId);
  const { round: item, nextRound } = useGameRound(level, makeRound, (r) => r.item);

  const choose = (living: boolean) => {
    if (isMarkedWrong(living)) return;
    if (living === item.living) {
      onCorrect();
      nextRound();
    } else {
      attemptWrong(living);
    }
  };

  return (
    <GameShell title="Living / Non-living" topicId={topicId} backTo={`/island/${subjectId}`}>
      <p className={styles.prompt}>Is this living or non-living?</p>
      <div className={`${styles.bigEmoji} ${wobble ? 'wobble' : ''}`}>{item.emoji}</div>
      <p style={{ fontSize: '1.5rem', fontWeight: 800 }}>{item.item}</p>
      <div className={styles.bins}>
        <button
          type="button"
          className={`${styles.bin}${isMarkedWrong(true) ? ` ${styles.binWrong}` : ''}`}
          disabled={isMarkedWrong(true)}
          onClick={() => choose(true)}
        >
          <span style={{ fontSize: '2rem' }}>🌱</span>
          <span>Living</span>
        </button>
        <button
          type="button"
          className={`${styles.bin}${isMarkedWrong(false) ? ` ${styles.binWrong}` : ''}`}
          disabled={isMarkedWrong(false)}
          onClick={() => choose(false)}
        >
          <span style={{ fontSize: '2rem' }}>🪨</span>
          <span>Non-living</span>
        </button>
      </div>
    </GameShell>
  );
}
