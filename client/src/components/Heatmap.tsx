import { useMemo, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { ScanDto } from '../../../common/dtos/scan.dto';

interface HeatmapProps {
  scans: ScanDto[];
  year: number;
}

const MONTHS_IN_YEAR = 12;

// Color levels 1-5, matching the .color1-.color5 classes / the assignment table.
const LEVELS = [1, 2, 3, 4, 5] as const;

const getDaysInMonth = (year: number, month: number): number =>
  new Date(year, month + 1, 0).getDate();

// Start of the current day in local time. A square is rendered only for days
// strictly before this, and today/future days are excluded from the max.
const getStartOfToday = (): Date => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

// Picks the color level (1-5) for a day based on its scan count relative to the
// maximum daily scans of the year. See the assignment color table.
const getLevel = (count: number, max: number): number => {
  if (count === 0 || max === 0) {
    return 1;
  }
  const ratio = count / max;
  if (ratio <= 0.25) return 2;
  if (ratio <= 0.5) return 3;
  if (ratio <= 0.75) return 4;
  return 5;
};

export const Heatmap = ({ scans, year }: HeatmapProps) => {
  const startOfToday = getStartOfToday();
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);

  // Count scans per [month][day] for the selected year.
  const dailyCounts = useMemo(() => {
    const counts: number[][] = Array.from({ length: MONTHS_IN_YEAR }, (_, month) =>
      new Array<number>(getDaysInMonth(year, month) + 1).fill(0)
    );

    for (const scan of scans) {
      const date = new Date(scan.date);
      if (date.getFullYear() !== year) continue;
      counts[date.getMonth()][date.getDate()] += 1;
    }

    return counts;
  }, [scans, year]);

  // Maximum daily scans for the year, excluding today and future days.
  const maxDailyScans = useMemo(() => {
    let max = 0;
    for (let month = 0; month < MONTHS_IN_YEAR; month++) {
      const daysInMonth = getDaysInMonth(year, month);
      for (let day = 1; day <= daysInMonth; day++) {
        if (new Date(year, month, day) >= startOfToday) continue;
        max = Math.max(max, dailyCounts[month][day]);
      }
    }
    return max;
  }, [dailyCounts, year, startOfToday]);

  const cellClassName = (level: number): string => {
    const classes = ['heatmap-cell', `color${level}`];
    if (hoveredLevel !== null) {
      classes.push(level === hoveredLevel ? 'highlight' : 'dimmed');
    }
    return classes.join(' ');
  };

  return (
    <div className="heatmap">
      <div className="heatmap-grid">
        {Array.from({ length: MONTHS_IN_YEAR }, (_, month) => {
          const daysInMonth = getDaysInMonth(year, month);
          return (
            <div className="heatmap-row" key={month}>
              {Array.from({ length: daysInMonth }, (_, dayIndex) => {
                const day = dayIndex + 1;
                // Only render squares for days strictly before today.
                if (new Date(year, month, day) >= startOfToday) {
                  return null;
                }
                const count = dailyCounts[month][day];
                const date = new Date(year, month, day);
                return (
                  <Tooltip
                    key={day}
                    arrow
                    title={
                      <>
                        <div>{date.toDateString()}</div>
                        <div>{count} scan{count === 1 ? '' : 's'}</div>
                      </>
                    }
                  >
                    <div className={cellClassName(getLevel(count, maxDailyScans))} />
                  </Tooltip>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="heatmap-legend">
        <span className="heatmap-legend-label">Less</span>
        {LEVELS.map((level) => (
          <div
            key={level}
            className={`heatmap-cell color${level}${hoveredLevel === level ? ' highlight' : ''}`}
            onMouseEnter={() => setHoveredLevel(level)}
            onMouseLeave={() => setHoveredLevel(null)}
          />
        ))}
        <span className="heatmap-legend-label">More</span>
      </div>
    </div>
  );
};
