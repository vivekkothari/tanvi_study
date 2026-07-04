import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { shuffle } from '../lib/random';
import styles from './MatchPairs.module.css';

export type MatchPairItem = {
  /** Shared id linking the left and right items of a pair. */
  id: string;
  left: ReactNode;
  right: ReactNode;
};

type Side = 'left' | 'right';

type Selection = { side: Side; id: string };

type FlashLine = { x1: number; y1: number; x2: number; y2: number };

export type MatchPairsProps = {
  pairs: MatchPairItem[];
  /** Shown while matching is in progress. */
  prompt?: string;
  /** Shown when every pair is matched. */
  completePrompt?: string;
  /** Called once per correct pair. */
  onMatch: () => void;
  /** Called once per incorrect attempt. */
  onMismatch: () => void;
  /** Called after a short celebration when all pairs are matched. */
  onRoundComplete?: () => void;
  /** Extra class for left-column cards (optional theme). */
  leftClassName?: string;
  /** Extra class for right-column cards (optional theme). */
  rightClassName?: string;
  /** Delay before onRoundComplete fires (ms). */
  completeDelayMs?: number;
};

function pairsKey(pairs: MatchPairItem[]): string {
  return pairs.map((p) => p.id).join('|');
}

export function MatchPairs({
  pairs,
  prompt = 'Tap one item, then tap its match!',
  completePrompt = '🎉 All matched!',
  onMatch,
  onMismatch,
  onRoundComplete,
  leftClassName = '',
  rightClassName = '',
  completeDelayMs = 1400,
}: MatchPairsProps) {
  const [selected, setSelected] = useState<Selection | null>(null);
  const [matchedIds, setMatchedIds] = useState<Set<string>>(() => new Set());
  const [flashLine, setFlashLine] = useState<FlashLine | null>(null);
  const [roundComplete, setRoundComplete] = useState(false);
  const [layoutTick, setLayoutTick] = useState(0);
  const [rightIds, setRightIds] = useState<string[]>(() =>
    shuffle(pairs.map((p) => p.id)),
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const leftRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const rightRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const key = pairsKey(pairs);

  const byId = useMemo(() => {
    const map = new Map<string, MatchPairItem>();
    for (const p of pairs) map.set(p.id, p);
    return map;
  }, [pairs]);

  // Reset when the set of pairs changes
  useEffect(() => {
    setSelected(null);
    setMatchedIds(new Set());
    setFlashLine(null);
    setRoundComplete(false);
    setRightIds(shuffle(key.split('|').filter(Boolean)));
  }, [key]);

  // Recompute line positions on resize
  useEffect(() => {
    const onResize = () => setLayoutTick((t) => t + 1);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const getCenter = useCallback((el: HTMLElement): { x: number; y: number } | null => {
    const container = containerRef.current;
    if (!container) return null;
    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    return {
      x: elRect.left - containerRect.left + elRect.width / 2,
      y: elRect.top - containerRect.top + elRect.height / 2,
    };
  }, []);

  const tryMatch = useCallback(
    (first: Selection, second: Selection) => {
      const leftId = first.side === 'left' ? first.id : second.id;
      const rightId = first.side === 'right' ? first.id : second.id;
      const leftEl = leftRefs.current.get(leftId);
      const rightEl = rightRefs.current.get(rightId);
      const isCorrect = leftId === rightId;

      if (leftEl && rightEl) {
        const from = getCenter(leftEl);
        const to = getCenter(rightEl);
        if (from && to) {
          if (isCorrect) {
            setMatchedIds((prev) => new Set(prev).add(leftId));
            onMatch();
            setSelected(null);
            setLayoutTick((t) => t + 1);
          } else {
            setFlashLine({ x1: from.x, y1: from.y, x2: to.x, y2: to.y });
            onMismatch();
            window.setTimeout(() => setFlashLine(null), 700);
            setSelected(null);
          }
          return;
        }
      }

      setSelected(null);
    },
    [getCenter, onMatch, onMismatch],
  );

  const handleTap = (side: Side, id: string) => {
    if (matchedIds.has(id) || roundComplete) return;

    if (!selected) {
      setSelected({ side, id });
      return;
    }

    // Tap same card again → deselect
    if (selected.side === side && selected.id === id) {
      setSelected(null);
      return;
    }

    // Tap another card on the same side → switch selection
    if (selected.side === side) {
      setSelected({ side, id });
      return;
    }

    tryMatch(selected, { side, id });
  };

  // Round complete
  useEffect(() => {
    if (pairs.length === 0) return;
    if (matchedIds.size < pairs.length) return;

    setRoundComplete(true);
    if (!onRoundComplete) return;

    const t = window.setTimeout(() => {
      onRoundComplete();
    }, completeDelayMs);
    return () => window.clearTimeout(t);
  }, [matchedIds.size, pairs.length, onRoundComplete, completeDelayMs]);

  void layoutTick;

  const svgLines: Array<{ id: string; x1: number; y1: number; x2: number; y2: number }> = [];
  for (const id of matchedIds) {
    const leftEl = leftRefs.current.get(id);
    const rightEl = rightRefs.current.get(id);
    if (!leftEl || !rightEl) continue;
    const from = getCenter(leftEl);
    const to = getCenter(rightEl);
    if (from && to) {
      svgLines.push({ id, x1: from.x, y1: from.y, x2: to.x, y2: to.y });
    }
  }

  const selectedLabel = selected
    ? selected.side === 'left'
      ? byId.get(selected.id)?.left
      : byId.get(selected.id)?.right
    : null;

  return (
    <div>
      <p className={styles.prompt}>{roundComplete ? completePrompt : prompt}</p>

      <div className={styles.arena} ref={containerRef}>
        <svg className={styles.linesSvg} aria-hidden="true">
          {svgLines.map((ln) => (
            <line
              key={ln.id}
              x1={ln.x1}
              y1={ln.y1}
              x2={ln.x2}
              y2={ln.y2}
              className={styles.lineCorrect}
            />
          ))}
          {flashLine && (
            <line
              x1={flashLine.x1}
              y1={flashLine.y1}
              x2={flashLine.x2}
              y2={flashLine.y2}
              className={styles.lineFlash}
            />
          )}
        </svg>

        <div className={styles.column}>
          {pairs.map((p) => {
            const matched = matchedIds.has(p.id);
            const isSelected = selected?.side === 'left' && selected.id === p.id;
            return (
              <button
                key={`L-${p.id}`}
                type="button"
                ref={(el) => {
                  if (el) leftRefs.current.set(p.id, el);
                  else leftRefs.current.delete(p.id);
                }}
                className={`${styles.card} ${styles.leftCard} ${leftClassName} ${isSelected ? styles.cardSelected : ''} ${matched ? styles.cardMatched : ''}`}
                onClick={() => handleTap('left', p.id)}
                disabled={matched || roundComplete}
              >
                {p.left}
              </button>
            );
          })}
        </div>

        <div className={styles.column}>
          {rightIds.map((id) => {
            const p = byId.get(id);
            if (!p) return null;
            const matched = matchedIds.has(id);
            const isSelected = selected?.side === 'right' && selected.id === id;
            return (
              <button
                key={`R-${id}`}
                type="button"
                ref={(el) => {
                  if (el) rightRefs.current.set(id, el);
                  else rightRefs.current.delete(id);
                }}
                className={`${styles.card} ${styles.rightCard} ${rightClassName} ${isSelected ? styles.cardSelected : ''} ${matched ? styles.cardMatched : ''}`}
                onClick={() => handleTap('right', id)}
                disabled={matched || roundComplete}
              >
                {p.right}
              </button>
            );
          })}
        </div>
      </div>

      <p className={styles.hint}>
        {selected ? (
          <>Tap the match for {selectedLabel}</>
        ) : (
          `${matchedIds.size} / ${pairs.length} matched`
        )}
      </p>
    </div>
  );
}
