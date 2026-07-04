import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';
import styles from './BigButton.module.css';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  accent?: string;
};

export function BigButton({
  children,
  variant = 'primary',
  accent,
  className = '',
  style,
  ...rest
}: Props) {
  const variantClass =
    variant === 'secondary' ? styles.secondary : variant === 'ghost' ? styles.ghost : '';

  return (
    <button
      type="button"
      className={`${styles.btn} ${variantClass} ${className}`}
      style={{ ...(style as CSSProperties), ['--accent' as string]: accent } as CSSProperties}
      {...rest}
    >
      {children}
    </button>
  );
}
