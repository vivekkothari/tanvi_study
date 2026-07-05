import { useEffect, useMemo, useState } from 'react';
import { GameShell, gameStyles as styles } from '../../components/GameShell';
import { useProgress } from '../../context/ProgressContext';
import { CVC_WORDS } from '../../data/english';
import { useGameFeedback } from '../../hooks/useGameFeedback';
import { useGameRound } from '../../hooks/useGameRound';
import { pick, shuffle } from '../../lib/random';

type Props = { topicId: string; subjectId: string };

function makeRound(level: number) {
  const pool = CVC_WORDS.slice(0, Math.min(CVC_WORDS.length, 4 + level * 2));
  const target = pick(pool);
  const distractors = CVC_WORDS.filter((w) => w.word !== target.word);
  const options = shuffle([target, ...shuffle(distractors).slice(0, 3)]);
  return { target, options };
}

export function PhonicsBlending({ topicId, subjectId }: Props) {
  const { resetEpoch } = useProgress();
  const { level, wobble, onCorrect, onWrong, attemptWrong, isMarkedWrong } =
    useGameFeedback(topicId);
  const { round, nextRound } = useGameRound(level, makeRound, (r) => r.target.word);
  const [built, setBuilt] = useState<string[]>([]);

  useEffect(() => {
    setBuilt([]);
  }, [resetEpoch, round]);

  const letters = useMemo(
    () => shuffle([...round.target.letters, pick(['b', 'm', 'p', 's', 't', 'n'])]),
    [round],
  );

  const advance = () => {
    setBuilt([]);
    onCorrect();
    nextRound();
  };

  const addLetter = (letter: string) => {
    if (built.length >= 3) return;
    const next = [...built, letter];
    setBuilt(next);
    if (next.length === 3) {
      const word = next.join('');
      if (word === round.target.word) {
        advance();
      } else {
        onWrong();
        setTimeout(() => setBuilt([]), 400);
      }
    }
  };

  const chooseWord = (word: string) => {
    if (isMarkedWrong(word)) return;
    if (word === round.target.word) {
      advance();
    } else {
      attemptWrong(word);
    }
  };

  return (
    <GameShell title="Phonics Blending" topicId={topicId} backTo={`/island/${subjectId}`}
      announce={`Build the word by tapping letters. The word is: ${round.target}`}>
      <div className={styles.bigEmoji}>{round.target.emoji}</div>
      <p className={styles.prompt}>Build the word by tapping letters</p>
      <div className={`${styles.sentence} ${wobble ? 'wobble' : ''}`}>
        {[0, 1, 2].map((i) => (
          <span key={i} className={styles.tile}>
            {built[i] ?? '_'}
          </span>
        ))}
      </div>
      <div className={styles.tiles}>
        {letters.map((letter, i) => (
          <button
            key={`${letter}-${i}`}
            type="button"
            className={styles.tile}
            onClick={() => addLetter(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
      <div className={styles.choices}>
        {round.options.map((opt) => (
          <button
            key={opt.word}
            type="button"
            className={`${styles.choice}${isMarkedWrong(opt.word) ? ` ${styles.choiceWrong}` : ''}`}
            disabled={isMarkedWrong(opt.word)}
            onClick={() => chooseWord(opt.word)}
          >
            {opt.word}
          </button>
        ))}
      </div>
    </GameShell>
  );
}
