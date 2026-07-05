import { GameShell, gameStyles as styles } from '../../components/GameShell';
import { ANIMAL_HOMES } from '../../data/evs';
import { useGameFeedback } from '../../hooks/useGameFeedback';
import { useGameRound } from '../../hooks/useGameRound';
import { pick, sample, shuffle } from '../../lib/random';

type Props = { topicId: string; subjectId: string };

function makeRound(level: number) {
  const count = Math.min(3 + level, ANIMAL_HOMES.length);
  const pool = sample(ANIMAL_HOMES, count);
  const target = pick(pool);
  return { target, homes: shuffle(pool) };
}

export function AnimalHomes({ topicId, subjectId }: Props) {
  const { level, wobble, onCorrect, attemptWrong, isMarkedWrong } = useGameFeedback(topicId);
  const { round, nextRound } = useGameRound(level, makeRound, (r) => r.target.animal);

  const choose = (home: string) => {
    if (isMarkedWrong(home)) return;
    if (home === round.target.home) {
      onCorrect();
      nextRound();
    } else {
      attemptWrong(home);
    }
  };

  return (
    <GameShell title="Animal Homes" topicId={topicId} backTo={`/island/${subjectId}`}
      announce={`Where does this animal live? ${round.target.animal}`}>
      <p className={styles.prompt}>Where does this animal live?</p>
      <div className={`${styles.bigEmoji} ${wobble ? 'wobble' : ''}`}>{round.target.animalEmoji}</div>
      <p style={{ fontSize: '1.5rem', fontWeight: 800 }}>{round.target.animal}</p>
      <div className={styles.bins}>
        {round.homes.map((item) => (
          <button
            key={item.home}
            type="button"
            className={`${styles.bin}${isMarkedWrong(item.home) ? ` ${styles.binWrong}` : ''}`}
            disabled={isMarkedWrong(item.home)}
            onClick={() => choose(item.home)}
          >
            <span style={{ fontSize: '2rem' }}>{item.homeEmoji}</span>
            <span>{item.home}</span>
          </button>
        ))}
      </div>
    </GameShell>
  );
}
