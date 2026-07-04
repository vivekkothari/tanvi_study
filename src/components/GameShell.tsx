import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { BigButton } from './ui/BigButton';
import styles from './GameShell.module.css';

type Props = {
  title: string;
  topicId: string;
  children: ReactNode;
  backTo: string;
};

export function GameShell({ title, topicId, children, backTo }: Props) {
  const navigate = useNavigate();
  const { getTopic, resetTopic } = useProgress();
  const topic = getTopic(topicId);

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
        <BigButton variant="ghost" onClick={startAfresh} aria-label="Start afresh" title="Start afresh">
          🔄
        </BigButton>
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
