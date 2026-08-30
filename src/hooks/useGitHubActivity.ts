import { useState, useEffect, useRef } from "react";

const GITHUB_USERNAME = "Costa404";
const EVENTS_API = `https://api.github.com/users/${GITHUB_USERNAME}/events/public`;
const REPOS_API = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;

/** Number of weeks to show in the heatmap */
const WEEKS = 17;

export interface DayEntry {
  date: string; // YYYY-MM-DD
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
  dayOfWeek: number; // 0 = Sunday
}

export interface GitHubStats {
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  topLanguages: string[];
  publicRepos: number;
}

export interface GitHubActivityData {
  grid: DayEntry[][];
  stats: GitHubStats;
  loading: boolean;
  error: string | null;
}

/**
 * Fetches public GitHub events and repos, aggregates by day, and
 * returns a grid suitable for a contribution heatmap.
 */
export function useGitHubActivity(): GitHubActivityData {
  const [grid, setGrid] = useState<DayEntry[][]>([]);
  const [stats, setStats] = useState<GitHubStats>({
    totalContributions: 0,
    currentStreak: 0,
    longestStreak: 0,
    topLanguages: [],
    publicRepos: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    const fetchData = async () => {
      try {
        // Fetch up to 10 pages of events (max GitHub allows) + repos in parallel
        const eventPages = Array.from({ length: 10 }, (_, i) =>
          fetch(`${EVENTS_API}?per_page=100&page=${i + 1}`)
            .then((r) => (r.ok ? r.json() : []))
            .catch(() => [])
        );

        const reposPromise = fetch(REPOS_API)
          .then((r) => (r.ok ? r.json() : []))
          .catch(() => []);

        const [eventsPages, repos] = await Promise.all([
          Promise.all(eventPages),
          reposPromise,
        ]);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const allEvents: any[] = eventsPages.flat();

        // Aggregate events per day
        const dayMap = new Map<string, number>();

        for (const event of allEvents) {
          if (!event.created_at) continue;
          const date = event.created_at.slice(0, 10); // YYYY-MM-DD

          // Weight different event types
          let weight = 1;
          if (event.type === "PushEvent") {
            weight = event.payload?.commits?.length || 1;
          } else if (event.type === "PullRequestEvent") {
            weight = 3;
          } else if (event.type === "CreateEvent") {
            weight = 2;
          }

          dayMap.set(date, (dayMap.get(date) || 0) + weight);
        }

        // Build the grid: WEEKS columns × 7 rows (Sun–Sat)
        const today = new Date();
        const todayDow = today.getDay(); // 0=Sun

        // Start from the Sunday that is (WEEKS - 1) weeks before the current week's Sunday
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - todayDow - (WEEKS - 1) * 7);

        const maxCount = Math.max(...Array.from(dayMap.values()), 1);
        const columns: DayEntry[][] = [];
        let totalContributions = 0;

        const cursor = new Date(startDate);

        for (let w = 0; w < WEEKS; w++) {
          const week: DayEntry[] = [];
          for (let d = 0; d < 7; d++) {
            const dateStr = cursor.toISOString().slice(0, 10);
            const count = dayMap.get(dateStr) || 0;
            totalContributions += count;

            // Bucket into 5 levels
            let level: 0 | 1 | 2 | 3 | 4 = 0;
            if (count > 0) {
              const ratio = count / maxCount;
              if (ratio <= 0.25) level = 1;
              else if (ratio <= 0.5) level = 2;
              else if (ratio <= 0.75) level = 3;
              else level = 4;
            }

            // Don't show future days
            const isFuture = cursor > today;

            week.push({
              date: dateStr,
              count: isFuture ? -1 : count,
              level: isFuture ? 0 : level,
              dayOfWeek: d,
            });

            cursor.setDate(cursor.getDate() + 1);
          }
          columns.push(week);
        }

        // Calculate streaks (walking backward from today)
        const allDates: string[] = [];
        const streakCursor = new Date(today);
        for (let i = 0; i < WEEKS * 7; i++) {
          allDates.push(streakCursor.toISOString().slice(0, 10));
          streakCursor.setDate(streakCursor.getDate() - 1);
        }

        let currentStreak = 0;
        for (const d of allDates) {
          if ((dayMap.get(d) || 0) > 0) currentStreak++;
          else break;
        }

        let longestStreak = 0;
        let runningStreak = 0;
        // Walk forward for longest
        const forwardCursor = new Date(startDate);
        for (let i = 0; i < WEEKS * 7; i++) {
          const ds = forwardCursor.toISOString().slice(0, 10);
          if ((dayMap.get(ds) || 0) > 0) {
            runningStreak++;
            longestStreak = Math.max(longestStreak, runningStreak);
          } else {
            runningStreak = 0;
          }
          forwardCursor.setDate(forwardCursor.getDate() + 1);
        }

        // Top languages from repos
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const langCount = new Map<string, number>();
        for (const repo of repos) {
          if (repo.language) {
            langCount.set(repo.language, (langCount.get(repo.language) || 0) + (repo.stargazers_count || 0) + 1);
          }
        }
        const topLanguages = [...langCount.entries()]
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([lang]) => lang);

        setGrid(columns);
        setStats({
          totalContributions,
          currentStreak,
          longestStreak,
          topLanguages,
          publicRepos: repos.length || 0,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch GitHub data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { grid, stats, loading, error };
}
