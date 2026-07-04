import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { getSubject, topicKey } from '../data/subjects';
import { BigButton } from './ui/BigButton';
import styles from './IslandHub.module.css';

export function IslandHub() {
  const { subjectId = '' } = useParams();
  const navigate = useNavigate();
  const { getTopic } = useProgress();
  const subject = getSubject(subjectId);

  if (!subject) return <Navigate to="/" replace />;

  return (
    <div className={styles.hub}>
      <div className={styles.header}>
        <BigButton variant="secondary" onClick={() => navigate('/')} aria-label="Home">
          ←
        </BigButton>
        <div className={styles.titleWrap}>
          <div className={styles.emoji}>{subject.emoji}</div>
          <h1 className="screen-title">{subject.title} Island</h1>
        </div>
        <div style={{ width: 60 }} />
      </div>
      <div className={styles.grid}>
        {subject.games.map((game, i) => {
          const topic = getTopic(topicKey(subject.id, game.id));
          return (
            <Link
              key={game.id}
              to={`/island/${subject.id}/${game.id}`}
              className={styles.card}
              style={{
                ['--accent' as string]: subject.accent,
                animationDelay: `${i * 0.05}s`,
              }}
            >
              <span className={styles.cardEmoji}>{game.emoji}</span>
              <span className={styles.cardTitle}>{game.title}</span>
              <span className={styles.cardDesc}>{game.description}</span>
              <span className={styles.cardMeta}>
                ⭐ {topic.stars} · Level {topic.level}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
