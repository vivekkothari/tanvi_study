import { Link } from 'react-router-dom';
import { APP_NAME, CHILD_NAME } from '../config';
import { useProgress } from '../context/ProgressContext';
import { SUBJECTS, topicKey } from '../data/subjects';
import { BigButton } from './ui/BigButton';
import { StarBar } from './StarBar';
import styles from './WorldMap.module.css';

export function WorldMap() {
  const { getTopic, resetProgress, stars } = useProgress();

  const startAfresh = () => {
    if (
      window.confirm(
        "Start afresh? This clears all of Tanvi's stars and levels so she can begin again.",
      )
    ) {
      resetProgress();
    }
  };

  return (
    <div className={styles.map}>
      <StarBar />
      <div className={styles.hero}>
        <div className={styles.wave}>🏝️</div>
        <h1 className="screen-title">{APP_NAME}</h1>
        <p className="screen-subtitle">Hi {CHILD_NAME}! Pick an island to play ✨</p>
      </div>
      <div className={styles.islands}>
        {SUBJECTS.map((subject) => {
          const subjectStars = subject.games.reduce(
            (sum, g) => sum + getTopic(topicKey(subject.id, g.id)).stars,
            0,
          );
          return (
            <Link
              key={subject.id}
              to={`/island/${subject.id}`}
              className={styles.island}
              style={{ background: subject.color }}
            >
              <span className={styles.emoji}>{subject.emoji}</span>
              <span className={styles.name}>{subject.title}</span>
              <span className={styles.stars}>⭐ {subjectStars}</span>
            </Link>
          );
        })}
      </div>
      {stars > 0 && (
        <div className={styles.footer}>
          <BigButton variant="secondary" onClick={startAfresh}>
            🔄 Start Afresh
          </BigButton>
        </div>
      )}
    </div>
  );
}
