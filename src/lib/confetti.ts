export type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
  rotation: number;
  spin: number;
};

const COLORS = ['#FF8C42', '#43A047', '#E64A19', '#0288D1', '#FFD54F', '#AB47BC', '#EC407A'];

export function createBurst(x: number, y: number, count = 40): Particle[] {
  return Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 6;
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]!,
      size: 6 + Math.random() * 8,
      life: 1,
      rotation: Math.random() * 360,
      spin: (Math.random() - 0.5) * 10,
    };
  });
}

export function stepParticles(particles: Particle[]): Particle[] {
  return particles
    .map((p) => ({
      ...p,
      x: p.x + p.vx,
      y: p.y + p.vy,
      vy: p.vy + 0.15,
      life: p.life - 0.02,
      rotation: p.rotation + p.spin,
    }))
    .filter((p) => p.life > 0);
}
