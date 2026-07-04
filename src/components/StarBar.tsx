import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { BigButton } from './ui/BigButton';
import styles from './StarBar.module.css';

export function StarBar() {
  const { stars, muted, toggleMute } = useProgress();

  return (
    <div className={styles.bar}>
      <div className={styles.stars} aria-label={`${stars} stars`}>
        <span>⭐</span>
        <span>{stars}</span>
      </div>
      <div className={styles.actions}>
        <BigButton variant="secondary" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
          {muted ? '🔇' : '🔊'}
        </BigButton>
        <Link to="/parent">
          <BigButton variant="secondary" aria-label="Parent dashboard">
            🔒
          </BigButton>
        </Link>
      </div>
    </div>
  );
}
