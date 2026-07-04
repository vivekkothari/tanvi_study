import { GameShell, gameStyles as styles } from '../../components/GameShell';
import { COMMUNITY_HELPERS } from '../../data/evs';
import { useGameFeedback } from '../../hooks/useGameFeedback';
import { useGameRound } from '../../hooks/useGameRound';
import { pick, sample, shuffle } from '../../lib/random';

type Props = { topicId: string; subjectId: string };

function makeRound(level: number) {
  const count = Math.min(3 + level, COMMUNITY_HELPERS.length);
  const pool = sample(COMMUNITY_HELPERS, count);
  const target = pick(pool);
  return { target, tools: shuffle(pool) };
}

export function CommunityHelpers({ topicId, subjectId }: Props) {
  const { level, wobble, onCorrect, attemptWrong, isMarkedWrong } = useGameFeedback(topicId);
  const { round, nextRound } = useGameRound(level, makeRound, (r) => r.target.helper);

  const choose = (tool: string) => {
    if (isMarkedWrong(tool)) return;
    if (tool === round.target.tool) {
      onCorrect();
      nextRound();
    } else {
      attemptWrong(tool);
    }
  };

  return (
    <GameShell title="Community Helpers" topicId={topicId} backTo={`/island/${subjectId}`}>
      <p className={styles.prompt}>Match the helper to their tool!</p>
      <div className={`${styles.bigEmoji} ${wobble ? 'wobble' : ''}`}>{round.target.helperEmoji}</div>
      <p style={{ fontSize: '1.5rem', fontWeight: 800 }}>{round.target.helper}</p>
      <div className={styles.choices}>
        {round.tools.map((item) => (
          <button
            key={item.tool}
            type="button"
            className={`${styles.choice}${isMarkedWrong(item.tool) ? ` ${styles.choiceWrong}` : ''}`}
            disabled={isMarkedWrong(item.tool)}
            onClick={() => choose(item.tool)}
          >
            <span style={{ fontSize: '1.8rem' }}>{item.toolEmoji}</span>
            <div>{item.tool}</div>
          </button>
        ))}
      </div>
    </GameShell>
  );
}
