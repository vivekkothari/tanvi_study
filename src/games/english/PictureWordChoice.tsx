import { useState } from 'react';
import { GameShell, gameStyles as gs } from '../../components/GameShell';
import { PICTURE_WORD_ITEMS } from '../../data/english';
import { useGameFeedback } from '../../hooks/useGameFeedback';
import { useGameRound } from '../../hooks/useGameRound';
import { pick, shuffle } from '../../lib/random';
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
  const [options] = useState(() => shuffle([item.word, item.wrong] as string[]));
  const [currentOptions, setCurrentOptions] = useState<string[]>(() =>
    shuffle([item.word, item.wrong] as string[]),
  );

  // Recompute options whenever the item changes
  const itemKey = item.word + item.wrong;

  const choose = (opt: string) => {
    if (isMarkedWrong(opt)) return;
    if (opt === item.word) {
      onCorrect();
      const nextItem = { ...item }; // nextRound will change item
      nextRound();
      setCurrentOptions(shuffle([nextItem.word, nextItem.wrong]));
    } else {
      attemptWrong(opt);
    }
  };

  void options;

  return (
    <GameShell title="Circle the Word" topicId={topicId} backTo={`/island/${subjectId}`}>
      <p className={gs.prompt}>Tap the correct word for the picture!</p>
      <div className={`${styles.pictureBox} ${wobble ? 'wobble' : ''}`}>
        <WordImage key={itemKey} item={item} />
      </div>
      <div className={gs.choices}>
        {currentOptions.map((opt) => (
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
