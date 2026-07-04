import { useState } from 'react';
import { GameShell, gameStyles as gs } from '../../components/GameShell';
import { VOWEL_FILL_ITEMS } from '../../data/english';
import { useGameFeedback } from '../../hooks/useGameFeedback';
import { useGameRound } from '../../hooks/useGameRound';
import { pick } from '../../lib/random';
import styles from './VowelFill.module.css';

type Props = { topicId: string; subjectId: string };
type Item = (typeof VOWEL_FILL_ITEMS)[number];

const VOWELS = ['a', 'e', 'i', 'o', 'u'] as const;

function makeRound(_level: number): Item {
  return pick(VOWEL_FILL_ITEMS as unknown as Item[]);
}

export function VowelFill({ topicId, subjectId }: Props) {
  const { level, wobble, onCorrect, attemptWrong, isMarkedWrong } = useGameFeedback(topicId);
  const { round: item, nextRound } = useGameRound(level, makeRound, (r) => r.sentence);
  const [pickedVowel, setPickedVowel] = useState<string | null>(null);

  const choose = (vowel: string) => {
    if (isMarkedWrong(vowel)) return;
    if (vowel === item.answer) {
      setPickedVowel(vowel);
      onCorrect();
      window.setTimeout(() => {
        setPickedVowel(null);
        nextRound();
      }, 600);
    } else {
      attemptWrong(vowel);
    }
  };

  /** Render sentence with the _ replaced by a bubble showing the chosen vowel or a blank */
  const parts = item.sentence.split('_');

  return (
    <GameShell title="Fill the Vowel" topicId={topicId} backTo={`/island/${subjectId}`}>
      <p className={gs.prompt}>Tap the missing vowel!</p>

      <div className={`${styles.card} ${wobble ? 'wobble' : ''}`}>
        <p className={styles.sentence}>
          {parts[0]}
          <span className={`${styles.vowelSlot} ${pickedVowel ? styles.vowelCorrect : ''}`}>
            {pickedVowel ?? '_'}
          </span>
          {parts[1]}
        </p>
        {/* Show the reconstructed word as a hint */}
        <p className={styles.wordHint}>
          {item.before}
          <span className={styles.hintBlank}>{pickedVowel ?? '?'}</span>
          {item.after}
        </p>
      </div>

      <div className={gs.choices}>
        {VOWELS.map((v) => (
          <button
            key={v}
            type="button"
            className={`${styles.vowelBtn}${isMarkedWrong(v) ? ` ${gs.choiceWrong}` : ''}`}
            disabled={isMarkedWrong(v) || pickedVowel !== null}
            onClick={() => choose(v)}
          >
            {v}
          </button>
        ))}
      </div>
    </GameShell>
  );
}
