import { useState } from 'react';
import { GameShell, gameStyles as styles } from '../../components/GameShell';
import { ALPHABET } from '../../data/english';
import { useGameFeedback } from '../../hooks/useGameFeedback';
import { sound } from '../../lib/sound';

type Props = { topicId: string; subjectId: string };

export function AlphabetParade({ topicId, subjectId }: Props) {
  const { level, onCorrect } = useGameFeedback(topicId);
  const maxLetter = Math.min(26, 8 + level * 4);
  const letters = ALPHABET.slice(0, maxLetter);
  const [selected, setSelected] = useState<(typeof ALPHABET)[0] | null>(null);

  const pickLetter = (item: (typeof ALPHABET)[0]) => {
    setSelected(item);
    sound.tap();
    onCorrect();
  };

  return (
    <GameShell title="Alphabet Parade" topicId={topicId} backTo={`/island/${subjectId}`}>
      {selected ? (
        <div className={`${styles.detail} pop`}>
          <div className={styles.bigEmoji}>{selected.emoji}</div>
          <div className={styles.detailLetter}>{selected.letter}</div>
          <div className={styles.detailWord}>{selected.word}</div>
          <p style={{ fontSize: '1.25rem', fontWeight: 700 }}>
            /{selected.letter.toLowerCase()}/ as in {selected.word}
          </p>
          <button type="button" className={styles.choice} onClick={() => setSelected(null)}>
            Back to letters
          </button>
        </div>
      ) : (
        <>
          <p className={styles.prompt}>Tap a letter!</p>
          <div className={styles.letterGrid}>
            {letters.map((item) => (
              <button
                key={item.letter}
                type="button"
                className={styles.letterBtn}
                onClick={() => pickLetter(item)}
              >
                {item.letter}
              </button>
            ))}
          </div>
        </>
      )}
    </GameShell>
  );
}
