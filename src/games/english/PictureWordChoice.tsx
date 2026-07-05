import { useMemo, useState } from 'react';
import { GameShell, SpeakableChoice, gameStyles as gs } from '../../components/GameShell';
import { PICTURE_WORD_ITEMS } from '../../data/english';
import { useGameFeedback } from '../../hooks/useGameFeedback';
import { useGameRound } from '../../hooks/useGameRound';
import { pick, shuffle } from '../../lib/random';
import { speakEnglish } from '../../lib/sound';
import styles from './PictureWordChoice.module.css';

type Props = { topicId: string; subjectId: string };
type Item = (typeof PICTURE_WORD_ITEMS)[number];

function makeRound(_level: number): Item {
  return pick(PICTURE_WORD_ITEMS as unknown as Item[]);
}

function WordImage({ item }: { item: Item }) {
  const [imgFailed, setImgFailed] = useState(false);
  if (item.img && !imgFailed) {
    return (
      <img
        src={item.img}
        alt={item.word}
        className={styles.picture}
        onError={() => setImgFailed(true)}
      />
    );
  }
  return <span className={styles.emoji}>{item.emoji}</span>;
}

export function PictureWordChoice({ topicId, subjectId }: Props) {
  const { level, wobble, onCorrect, attemptWrong, isMarkedWrong } = useGameFeedback(topicId);
  const { round: item, nextRound } = useGameRound(level, makeRound, (r) => r.word);

  const options = useMemo(
    () => shuffle([item.word, item.wrong] as string[]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [item.word, item.wrong],
  );

  const choose = (opt: string) => {
    if (isMarkedWrong(opt)) return;
    if (opt === item.word) {
      onCorrect();
      nextRound();
    } else {
      attemptWrong(opt);
    }
  };

  return (
    <GameShell
      title="Circle the Word"
      topicId={topicId}
      backTo={`/island/${subjectId}`}
      announce="Tap the correct word for the picture!"
    >
      <p className={gs.prompt}>Tap the correct word for the picture!</p>
      <div
        className={`${styles.pictureBox} ${wobble ? 'wobble' : ''}`}
        role="button"
        tabIndex={0}
        aria-label={`Picture of ${item.word}`}
        onClick={() => speakEnglish(item.word)}
        onKeyDown={(e) => e.key === 'Enter' && speakEnglish(item.word)}
      >
        <WordImage key={item.word} item={item} />
      </div>
      <div className={gs.choices}>
        {options.map((opt) => (
          <SpeakableChoice
            key={opt}
            label={opt}
            wrong={isMarkedWrong(opt)}
            disabled={isMarkedWrong(opt)}
            onClick={() => choose(opt)}
          />
        ))}
      </div>
    </GameShell>
  );
}
