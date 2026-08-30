import { useState, useEffect, useRef } from "react";

const GITHUB_USERNAME = "Costa404";
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

const CONTRIBUTIONS_API = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`;

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
        const [contributionsRes, reposRes] = await Promise.all([
          fetch(CONTRIBUTIONS_API),
          fetch(REPOS_API)
        ]);

        const contributionsData = contributionsRes.ok ? await contributionsRes.json() : { contributions: [] };
        const repos = reposRes.ok ? await reposRes.json() : [];

        // Build a map for easy lookup
        const dayMap = new Map<string, number>();
        let maxCount = 1;
        
        // The jogruber API returns an array of objects: { date: "YYYY-MM-DD", count: 4, level: 1 }
        // Note: The API's 'level' might be 0-4.
        const allContributions: {date: string, count: number, level: number}[] = contributionsData.contributions || [];
        
        for (const item of allContributions) {
            dayMap.set(item.date, item.count);
            if (item.count > maxCount) maxCount = item.count;
        }

        // Build the grid: WEEKS columns × 7 rows (Sun–Sat)
        const today = new Date();
        // Set today to midnight local time for accurate comparisons
        today.setHours(0, 0, 0, 0); 
        const todayDow = today.getDay(); // 0=Sun

        // Start from the Sunday that is (WEEKS - 1) weeks before the current week's Sunday
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - todayDow - (WEEKS - 1) * 7);

        const columns: DayEntry[][] = [];
        let totalContributions = 0;

        const cursor = new Date(startDate);

        for (let w = 0; w < WEEKS; w++) {
          const week: DayEntry[] = [];
          for (let d = 0; d < 7; d++) {
            // Ensure we use local time formatting to match YYYY-MM-DD
            const y = cursor.getFullYear();
            const m = String(cursor.getMonth() + 1).padStart(2, '0');
            const day = String(cursor.getDate()).padStart(2, '0');
            const dateStr = `${y}-${m}-${day}`;
            
            const count = dayMap.get(dateStr) || 0;
            totalContributions += count;

            // Bucket into 5 levels based on our own maxCount
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

        // Calculate total contributions specifically for the last year (as returned by API)
        totalContributions = contributionsData.total?.[today.getFullYear()] || contributionsData.total?.lastYear || 
            allContributions.reduce((sum, item) => sum + item.count, 0);

        // Calculate streaks
        let currentStreak = 0;
        let longestStreak = 0;
        let runningStreak = 0;
        
        // Sort contributions chronologically to calculate longest streak
        const sortedContributions = [...allContributions].sort((a, b) => a.date.localeCompare(b.date));
        
        // Calculate longest streak across all returned data
        for (const item of sortedContributions) {
            // Only count past/present days
            const itemDate = new Date(item.date);
            itemDate.setHours(0,0,0,0);
            if (itemDate > today) continue;

            if (item.count > 0) {
                runningStreak++;
                if (runningStreak > longestStreak) {
                    longestStreak = runningStreak;
                }
            } else {
                runningStreak = 0;
            }
        }

        // Calculate current streak (walking backwards from today)
        const checkDate = new Date(today);
        let foundTodayOrYesterday = false;
        
        // Check if there was a contribution today
        let y = checkDate.getFullYear();
        let m = String(checkDate.getMonth() + 1).padStart(2, '0');
        let d = String(checkDate.getDate()).padStart(2, '0');
        let dStr = `${y}-${m}-${d}`;
        
        if ((dayMap.get(dStr) || 0) > 0) {
            foundTodayOrYesterday = true;
        } else {
            // If not today, check yesterday
            checkDate.setDate(checkDate.getDate() - 1);
            y = checkDate.getFullYear();
            m = String(checkDate.getMonth() + 1).padStart(2, '0');
            d = String(checkDate.getDate()).padStart(2, '0');
            dStr = `${y}-${m}-${d}`;
            
            if ((dayMap.get(dStr) || 0) > 0) {
                foundTodayOrYesterday = true;
            }
        }

        if (foundTodayOrYesterday) {
            // Walk backwards counting the streak
            // We've already verified the start of the streak
            currentStreak = 0;
            const streakCursor = new Date(today);
            
            // If today has 0, but yesterday has >0, start counting from yesterday
            y = streakCursor.getFullYear();
            m = String(streakCursor.getMonth() + 1).padStart(2, '0');
            d = String(streakCursor.getDate()).padStart(2, '0');
            if ((dayMap.get(`${y}-${m}-${d}`) || 0) === 0) {
                streakCursor.setDate(streakCursor.getDate() - 1);
            }

            while (true) {
                y = streakCursor.getFullYear();
                m = String(streakCursor.getMonth() + 1).padStart(2, '0');
                d = String(streakCursor.getDate()).padStart(2, '0');
                dStr = `${y}-${m}-${d}`;
                
                if ((dayMap.get(dStr) || 0) > 0) {
                    currentStreak++;
                    streakCursor.setDate(streakCursor.getDate() - 1);
                } else {
                    break;
                }
            }
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
