import { type ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { speak, speakEnglish } from '../lib/sound';
import { BigButton } from './ui/BigButton';
import styles from './GameShell.module.css';

type Props = {
  title: string;
  topicId: string;
  children: ReactNode;
  backTo: string;
  /** Text to read aloud when the game/round loads. Defaults to title. */
  announce?: string;
  /** BCP-47 language for the announce text. Defaults to 'en-US'. */
  announceLang?: string;
};

export function GameShell({ title, topicId, children, backTo, announce, announceLang = 'en-US' }: Props) {
  const navigate = useNavigate();
  const { getTopic, resetTopic } = useProgress();
  const topic = getTopic(topicId);

  // Read aloud whenever the announced text changes (new round or first load)
  const readText = announce ?? title;
  useEffect(() => {
    void speak(readText, announceLang, 0.88);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readText]);

  const startAfresh = () => {
    if (window.confirm('Start this game afresh? Stars and level for this game will reset.')) {
      resetTopic(topicId);
    }
  };

  return (
    <div className={styles.shell}>
      <div className={styles.header}>
        <BigButton variant="secondary" onClick={() => navigate(backTo)} aria-label="Back">
          ←
        </BigButton>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.headerRight}>
          <BigButton
            variant="ghost"
            onClick={() => void speak(readText, announceLang, 0.88)}
            aria-label="Read aloud"
            title="Read aloud"
          >
            🔊
          </BigButton>
          <BigButton variant="ghost" onClick={startAfresh} aria-label="Start afresh" title="Start afresh">
            🔄
          </BigButton>
        </div>
      </div>
      <div className={styles.meta}>
        <span className={styles.level}>Level {topic.level}</span>
        <span className={styles.stars}>⭐ {topic.stars}</span>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}

export { styles as gameStyles };

// ── SpeakableChoice ────────────────────────────────────────────────────────
// A choice button that shows a 🔊 icon and reads the label on hover/touch.

type SpeakableChoiceProps = {
  label: string;
  lang?: string;
  disabled?: boolean;
  wrong?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick: () => void;
};

export function SpeakableChoice({
  label,
  lang = 'en-US',
  disabled,
  wrong,
  className,
  style,
  onClick,
}: SpeakableChoiceProps) {
  const doSpeak = () => void speak(label, lang, 0.88);

  return (
    <button
      type="button"
      className={`${styles.choice}${wrong ? ` ${styles.choiceWrong}` : ''}${className ? ` ${className}` : ''}`}
      style={style}
      disabled={disabled}
      onMouseEnter={doSpeak}
      onTouchStart={doSpeak}
      onClick={() => { doSpeak(); onClick(); }}
      aria-label={label}
    >
      {label}
      {!wrong && <span className={styles.speakIcon} aria-hidden>🔊</span>}
    </button>
  );
}

// Re-export for convenience
export { speakEnglish };
