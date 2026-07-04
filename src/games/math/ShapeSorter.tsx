import { useRef, useState } from 'react';
import { GameShell, gameStyles as styles } from '../../components/GameShell';
import { SHAPES } from '../../data/math';
import { useGameFeedback } from '../../hooks/useGameFeedback';
import { useGameRound } from '../../hooks/useGameRound';
import { pick, sample } from '../../lib/random';

type Props = { topicId: string; subjectId: string };

function makeRound(level: number) {
  const count = Math.min(3 + Math.floor((level - 1) / 2), SHAPES.length);
  const bins = sample(SHAPES, count);
  const shape = pick(bins);
  return { bins, shape };
}

export function ShapeSorter({ topicId, subjectId }: Props) {
  const { level, wobble, onCorrect, attemptWrong, isMarkedWrong } = useGameFeedback(topicId);
  const { round, nextRound } = useGameRound(
    level,
    makeRound,
    (r) => `${r.shape.id}:${r.bins.map((b) => b.id).join(',')}`,
  );
  const [activeBin, setActiveBin] = useState<string | null>(null);
  const dragId = useRef<string | null>(null);

  const tryDrop = (binId: string) => {
    if (isMarkedWrong(binId)) return;
    if (binId === round.shape.id) {
      onCorrect();
      nextRound();
    } else {
      attemptWrong(binId);
    }
    setActiveBin(null);
    dragId.current = null;
  };

  return (
    <GameShell title="Shape Sorter" topicId={topicId} backTo={`/island/${subjectId}`}>
      <p className={styles.prompt}>Drag the shape into the correct bin!</p>
      <div
        className={`${styles.draggable} ${wobble ? 'wobble' : ''}`}
        draggable={false}
        onPointerDown={() => {
          dragId.current = round.shape.id;
        }}
      >
        {round.shape.emoji}
      </div>
      <p style={{ fontWeight: 700, fontSize: '1.25rem' }}>{round.shape.name}</p>
      <div className={styles.bins}>
        {round.bins.map((bin) => (
          <button
            key={bin.id}
            type="button"
            className={`${styles.bin}${activeBin === bin.id ? ` ${styles.binActive}` : ''}${isMarkedWrong(bin.id) ? ` ${styles.binWrong}` : ''}`}
            disabled={isMarkedWrong(bin.id)}
            onPointerEnter={() => dragId.current && setActiveBin(bin.id)}
            onPointerLeave={() => setActiveBin(null)}
            onPointerUp={() => tryDrop(bin.id)}
            onClick={() => tryDrop(bin.id)}
          >
            <span style={{ fontSize: '2rem' }}>{bin.emoji}</span>
            <span>{bin.name}</span>
          </button>
        ))}
      </div>
    </GameShell>
  );
}
