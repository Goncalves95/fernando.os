interface SparklineProps {
  data: number[];
  className?: string;
}

const WIDTH = 200;
const HEIGHT = 40;

export function Sparkline({ data, className }: SparklineProps) {
  if (data.length < 2) return null;

  const max = Math.max(...data, 1);
  const step = WIDTH / (data.length - 1);

  const points = data
    .map((value, index) => {
      const x = index * step;
      const y = HEIGHT - (value / max) * (HEIGHT - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");

  const areaPoints = `0,${HEIGHT} ${points} ${WIDTH},${HEIGHT}`;

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="none"
      className={className}
      role="img"
      aria-label={`Commit activity over the last ${data.length} days`}
    >
      <polygon points={areaPoints} fill="#FF4500" opacity={0.12} />
      <polyline points={points} fill="none" stroke="#FF4500" strokeWidth={1.5} />
    </svg>
  );
}
