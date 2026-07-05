import { useEffect, useState } from 'react';
import { GameShell, gameStyles as styles } from '../../components/GameShell';
import { VYANJAN } from '../../data/hindi';
import { useGameFeedback } from '../../hooks/useGameFeedback';
import { sound, speakHindi } from '../../lib/sound';

type Props = { topicId: string; subjectId: string };

export function VyanjanParade({ topicId, subjectId }: Props) {
  const { level, onCorrect } = useGameFeedback(topicId);
  const letters = VYANJAN.slice(0, Math.min(VYANJAN.length, 8 + level * 4));
  const [selected, setSelected] = useState<(typeof VYANJAN)[0] | null>(null);

  // Auto-read the letter + word when the detail card opens
  useEffect(() => {
    if (!selected) return;
    const text = `${selected.sound} … ${selected.word}`;
    speakHindi(text);
  }, [selected]);

  const pickLetter = (item: (typeof VYANJAN)[0]) => {
    setSelected(item);
    sound.tap();
    onCorrect();
  };

  return (
    <GameShell title="Vyanjan Parade" topicId={topicId} backTo={`/island/${subjectId}`}>
      {selected ? (
        <div className={`${styles.detail} pop`}>
          <div className={styles.bigEmoji}>{selected.emoji}</div>
          <div className={`${styles.detailLetter} hindi`}>{selected.letter}</div>
          <div className={`${styles.detailWord} hindi`}>{selected.word}</div>
          <p style={{ fontSize: '1.25rem', fontWeight: 700 }}>Sound: {selected.sound}</p>
          {/* Tap the card area to re-read */}
          <button
            type="button"
            className={styles.choice}
            style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}
            onClick={() => speakHindi(`${selected.sound} … ${selected.word}`)}
            aria-label="Read aloud"
          >
            🔊 Read again
          </button>
          <button type="button" className={styles.choice} onClick={() => setSelected(null)}>
            Back
          </button>
        </div>
      ) : (
        <>
          <p className={styles.prompt}>Tap a vyanjan (consonant)!</p>
          <div className={styles.letterGrid}>
            {letters.map((item) => (
              <button
                key={item.letter}
                type="button"
                className={`${styles.letterBtn} hindi`}
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
