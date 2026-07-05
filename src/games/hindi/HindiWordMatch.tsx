import { GameShell, gameStyles as styles } from '../../components/GameShell';
import { HINDI_WORDS } from '../../data/hindi';
import { useGameFeedback } from '../../hooks/useGameFeedback';
import { useGameRound } from '../../hooks/useGameRound';
import { pick, sample, shuffle } from '../../lib/random';
import { speakHindi } from '../../lib/sound';

type Props = { topicId: string; subjectId: string };

function makeRound(level: number) {
  const count = Math.min(3 + level, HINDI_WORDS.length);
  const pool = sample(HINDI_WORDS, count);
  const target = pick(pool);
  return { target, options: shuffle(pool) };
}

export function HindiWordMatch({ topicId, subjectId }: Props) {
  const { level, wobble, onCorrect, attemptWrong, isMarkedWrong } = useGameFeedback(topicId);
  const { round, nextRound } = useGameRound(level, makeRound, (r) => r.target.word);

  const choose = (word: string) => {
    if (isMarkedWrong(word)) return;
    speakHindi(word);
    if (word === round.target.word) {
      onCorrect();
      nextRound();
    } else {
      attemptWrong(word);
    }
  };

  return (
    <GameShell title="Hindi Word Match" topicId={topicId} backTo={`/island/${subjectId}`}>
      <p className={styles.prompt}>Match the picture to the Hindi word!</p>
      <div className={`${styles.bigEmoji} ${wobble ? 'wobble' : ''}`}>{round.target.emoji}</div>
      <div className={styles.choices}>
        {round.options.map((opt) => (
          <button
            key={opt.word}
            type="button"
            className={`${styles.choice} hindi${isMarkedWrong(opt.word) ? ` ${styles.choiceWrong}` : ''}`}
            disabled={isMarkedWrong(opt.word)}
            // Speak on hover (desktop) and on touch start (mobile)
            onMouseEnter={() => speakHindi(opt.word)}
            onTouchStart={() => speakHindi(opt.word)}
            onClick={() => choose(opt.word)}
          >
            {opt.word}
          </button>
        ))}
      </div>
    </GameShell>
  );
}
