import { useEffect, useMemo, useState } from 'react';
import { GameShell, gameStyles as styles } from '../../components/GameShell';
import { BigButton } from '../../components/ui/BigButton';
import { useProgress } from '../../context/ProgressContext';
import { SENTENCES } from '../../data/english';
import { useGameFeedback } from '../../hooks/useGameFeedback';
import { useGameRound } from '../../hooks/useGameRound';
import { pick, shuffle } from '../../lib/random';

type Props = { topicId: string; subjectId: string };

function makeRound(level: number) {
  const pool = SENTENCES.slice(0, Math.min(SENTENCES.length, 3 + level));
  return pick(pool);
}

export function SentenceBuilder({ topicId, subjectId }: Props) {
  const { resetEpoch } = useProgress();
  const { level, wobble, onCorrect, onWrong } = useGameFeedback(topicId);
  const { round: sentence, nextRound } = useGameRound(
    level,
    makeRound,
    (r) => r.words.join(' '),
  );
  const [built, setBuilt] = useState<string[]>([]);

  useEffect(() => {
    setBuilt([]);
  }, [resetEpoch, sentence]);

  const tiles = useMemo(() => shuffle(sentence.words), [sentence]);

  const addWord = (word: string, index: number) => {
    if (built.includes(`${word}::${index}`)) return;
    const nextWords = [...built.map((b) => b.split('::')[0]!), word];
    const nextKeys = [...built, `${word}::${index}`];
    setBuilt(nextKeys);

    if (nextWords.length === sentence.words.length) {
      if (nextWords.join(' ') === sentence.words.join(' ')) {
        onCorrect();
        setBuilt([]);
        nextRound();
      } else {
        onWrong();
        setTimeout(() => setBuilt([]), 450);
      }
    }
  };

  return (
    <GameShell title="Sentence Builder" topicId={topicId} backTo={`/island/${subjectId}`}
      announce="Arrange the words into a sentence">
      <div className={styles.bigEmoji}>{sentence.emoji}</div>
      <p className={styles.prompt}>Arrange the words into a sentence</p>
      <div className={`${styles.sentence} ${wobble ? 'wobble' : ''}`}>
        {built.length === 0 ? (
          <span style={{ opacity: 0.5 }}>Tap words below…</span>
        ) : (
          built.map((key) => (
            <span key={key} className={styles.tile}>
              {key.split('::')[0]}
            </span>
          ))
        )}
      </div>
      <div className={styles.tiles}>
        {tiles.map((word, i) => {
          const key = `${word}::${i}`;
          const used = built.includes(key);
          return (
            <button
              key={key}
              type="button"
              className={`${styles.tile} ${used ? styles.tileUsed : ''}`}
              disabled={used}
              onClick={() => addWord(word, i)}
            >
              {word}
            </button>
          );
        })}
      </div>
      <BigButton variant="secondary" onClick={() => setBuilt([])}>
        Clear
      </BigButton>
    </GameShell>
  );
}
