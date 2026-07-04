import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CHILD_NAME, PARENT_PIN } from '../config';
import { useProgress } from '../context/ProgressContext';
import { SUBJECTS, topicKey } from '../data/subjects';
import { BigButton } from './ui/BigButton';
import styles from './ParentDashboard.module.css';

export function ParentDashboard() {
  const navigate = useNavigate();
  const { progress, stars, resetProgress } = useProgress();
  const [pin, setPin] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const tryDigit = (digit: string) => {
    const next = (pin + digit).slice(0, 4);
    setPin(next);
    setError(false);
    if (next.length === 4) {
      if (next === PARENT_PIN) {
        setUnlocked(true);
      } else {
        setError(true);
        setPin('');
      }
    }
  };

  if (!unlocked) {
    return (
      <div className={styles.wrap}>
        <div className={styles.header}>
          <BigButton variant="secondary" onClick={() => navigate('/')} aria-label="Back">
            ←
          </BigButton>
          <h1 className="screen-title" style={{ flex: 1 }}>
            Parents Only
          </h1>
          <div style={{ width: 60 }} />
        </div>
        <div className={styles.lock}>
          <div style={{ fontSize: '3rem' }}>🔒</div>
          <p className="screen-subtitle">Enter PIN to see {CHILD_NAME}&apos;s progress</p>
          <div className={styles.pinRow}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={styles.pinDot}>
                {pin[i] ? '•' : ''}
              </div>
            ))}
          </div>
          {error && <p className={styles.error}>Try again</p>}
          <div className={styles.pinRow} style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((d) => (
              <BigButton key={d} variant="secondary" onClick={() => tryDigit(d)}>
                {d}
              </BigButton>
            ))}
            <BigButton variant="ghost" onClick={() => setPin('')}>
              Clear
            </BigButton>
          </div>
        </div>
      </div>
    );
  }

  const totalAttempts = Object.values(progress).reduce((s, t) => s + t.attempts, 0);
  const totalCorrect = Object.values(progress).reduce((s, t) => s + t.correct, 0);

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <BigButton variant="secondary" onClick={() => navigate('/')} aria-label="Back">
          ←
        </BigButton>
        <h1 className="screen-title" style={{ flex: 1 }}>
          {CHILD_NAME}&apos;s Progress
        </h1>
        <div style={{ width: 60 }} />
      </div>

      <div className={styles.summary}>
        <div className={styles.stat}>
          <div className={styles.statValue}>⭐ {stars}</div>
          <div className={styles.statLabel}>Stars</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>{totalCorrect}</div>
          <div className={styles.statLabel}>Correct</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>{totalAttempts}</div>
          <div className={styles.statLabel}>Attempts</div>
        </div>
      </div>

      {SUBJECTS.map((subject) => (
        <div key={subject.id} className={styles.section}>
          <div className={styles.sectionTitle}>
            {subject.emoji} {subject.title}
          </div>
          {subject.games.map((game) => {
            const topic = progress[topicKey(subject.id, game.id)];
            return (
              <div key={game.id} className={styles.row}>
                <span>
                  {game.emoji} {game.title}
                </span>
                <span className={styles.meta}>
                  ⭐ {topic?.stars ?? 0} · L{topic?.level ?? 1}
                </span>
              </div>
            );
          })}
        </div>
      ))}

      <BigButton
        variant="secondary"
        onClick={() => {
          if (
            window.confirm(
              "Start afresh? This clears all of Tanvi's stars and levels.",
            )
          ) {
            resetProgress();
          }
        }}
      >
        🔄 Start Afresh
      </BigButton>
    </div>
  );
}
