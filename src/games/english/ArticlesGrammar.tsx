import { GameShell, gameStyles as styles } from '../../components/GameShell';
import { ARTICLES, PLURALS } from '../../data/english';
import { useGameFeedback } from '../../hooks/useGameFeedback';
import { useGameRound } from '../../hooks/useGameRound';
import { pick, shuffle } from '../../lib/random';

type Props = { topicId: string; subjectId: string };

function makeRound(level: number) {
  const usePlural = level >= 3 && Math.random() < 0.5;
  if (usePlural) {
    const item = pick(PLURALS);
    const showPlural = Math.random() < 0.5;
    return {
      kind: 'plural' as const,
      emoji: item.emoji,
      prompt: showPlural ? 'Which is plural?' : 'Which is singular?',
      answer: showPlural ? item.plural : item.singular,
      options: shuffle([item.singular, item.plural]),
    };
  }
  const item = pick(ARTICLES);
  return {
    kind: 'article' as const,
    emoji: item.emoji,
    prompt: `Choose a or an for ${item.word}`,
    answer: item.article,
    options: ['a', 'an'],
  };
}

export function ArticlesGrammar({ topicId, subjectId }: Props) {
  const { level, wobble, onCorrect, attemptWrong, isMarkedWrong } = useGameFeedback(topicId);
  const { round, nextRound } = useGameRound(
    level,
    makeRound,
    (r) => `${r.kind}:${r.prompt}:${r.answer}`,
  );

  const choose = (value: string) => {
    if (isMarkedWrong(value)) return;
    if (value === round.answer) {
      onCorrect();
      nextRound();
    } else {
      attemptWrong(value);
    }
  };

  return (
    <GameShell title="Articles & Grammar" topicId={topicId} backTo={`/island/${subjectId}`}>
      <div className={`${styles.bigEmoji} ${wobble ? 'wobble' : ''}`}>{round.emoji}</div>
      <p className={styles.prompt}>{round.prompt}</p>
      <div className={styles.choices}>
        {round.options.map((opt) => (
          <button
            key={opt}
            type="button"
            className={`${styles.choice}${isMarkedWrong(opt) ? ` ${styles.choiceWrong}` : ''}`}
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
