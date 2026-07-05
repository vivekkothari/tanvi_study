import { GameShell, gameStyles as styles } from '../../components/GameShell';
import { SEASONS } from '../../data/evs';
import { useGameFeedback } from '../../hooks/useGameFeedback';
import { useGameRound } from '../../hooks/useGameRound';
import { pick, shuffle } from '../../lib/random';

type Props = { topicId: string; subjectId: string };

function makeRound(_level: number) {
  const target = pick(SEASONS);
  return { target, options: shuffle(SEASONS) };
}

export function SeasonsWeather({ topicId, subjectId }: Props) {
  const { level, wobble, onCorrect, attemptWrong, isMarkedWrong } = useGameFeedback(topicId);
  const { round, nextRound } = useGameRound(level, makeRound, (r) => r.target.season, 4);

  const choose = (season: string) => {
    if (isMarkedWrong(season)) return;
    if (season === round.target.season) {
      onCorrect();
      nextRound();
    } else {
      attemptWrong(season);
    }
  };

  return (
    <GameShell title="Seasons & Weather" topicId={topicId} backTo={`/island/${subjectId}`}
      announce={`Which season or weather is this? ${round.target.picture}`}>
      <p className={styles.prompt}>Which season or weather is this?</p>
      <div className={`${styles.bigEmoji} ${wobble ? 'wobble' : ''}`}>{round.target.pictureEmoji}</div>
      <p style={{ fontSize: '1.4rem', fontWeight: 800 }}>{round.target.picture}</p>
      <div className={styles.choices}>
        {round.options.map((item) => (
          <button
            key={item.season}
            type="button"
            className={`${styles.choice}${isMarkedWrong(item.season) ? ` ${styles.choiceWrong}` : ''}`}
            disabled={isMarkedWrong(item.season)}
            onClick={() => choose(item.season)}
          >
            <span style={{ fontSize: '1.8rem' }}>{item.emoji}</span>
            <div>{item.season}</div>
          </button>
        ))}
      </div>
    </GameShell>
  );
}
