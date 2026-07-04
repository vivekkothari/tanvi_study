import { GameShell, gameStyles as gs } from '../../components/GameShell';
import { FILL_BLANK_ITEMS } from '../../data/english';
import { useGameFeedback } from '../../hooks/useGameFeedback';
import { useGameRound } from '../../hooks/useGameRound';
import { pick, shuffle } from '../../lib/random';
import styles from './FillInBlank.module.css';

type Props = { topicId: string; subjectId: string };
type Item = (typeof FILL_BLANK_ITEMS)[number];

function makeRound(_level: number): Item {
  return pick(FILL_BLANK_ITEMS as unknown as Item[]);
}

/** Render the sentence with the ___ replaced by a styled blank */
function SentenceDisplay({ text, filled }: { text: string; filled?: string }) {
  const parts = text.split('___');
  return (
    <p className={styles.sentence}>
      {parts[0]}
      <span className={`${styles.blank} ${filled ? styles.blankFilled : ''}`}>
        {filled ?? '___'}
      </span>
      {parts[1]}
    </p>
  );
}

export function FillInBlank({ topicId, subjectId }: Props) {
  const { level, wobble, onCorrect, attemptWrong, isMarkedWrong } = useGameFeedback(topicId);
  const { round: item, nextRound } = useGameRound(level, makeRound, (r) => r.sentence);

  const options = shuffle([item.answer, item.wrong] as string[]);

  const choose = (opt: string) => {
    if (isMarkedWrong(opt)) return;
    if (opt === item.answer) {
      onCorrect();
      nextRound();
    } else {
      attemptWrong(opt);
    }
  };

  return (
    <GameShell title="Fill in the Blank" topicId={topicId} backTo={`/island/${subjectId}`}>
      <p className={gs.prompt}>Choose the correct word!</p>
      <div className={`${styles.card} ${wobble ? 'wobble' : ''}`}>
        <SentenceDisplay text={item.sentence} />
      </div>
      <div className={gs.choices}>
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            className={`${gs.choice}${isMarkedWrong(opt) ? ` ${gs.choiceWrong}` : ''}`}
            disabled={isMarkedWrong(opt)}
            onClick={() => choose(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </GameShell>
  );
}
