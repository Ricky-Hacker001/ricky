import { useEffect, useState } from "react";
import { GITHUB_FALLBACK_REPOS, GITHUB_PINNED } from "@/data/github";

export type Repo = {
  name: string;
  description: string | null;
  language: string | null;
  stars: number | null;
  url: string;
  pushed?: string;
};

export type GithubData = {
  status: "idle" | "loading" | "ready" | "error";
  avatar?: string;
  publicRepos?: number;
  followers?: number;
  repos: Repo[];
  /** day ISO → event count, last ~90 days (public events API) */
  activity: Record<string, number> | null;
};

const TTL = 60 * 60 * 1000;
const KEY = (u: string) => `gh-cache:${u}`;

function readCache(user: string): GithubData | null {
  try {
    const raw = localStorage.getItem(KEY(user));
    if (!raw) return null;
    const { t, d } = JSON.parse(raw);
    return Date.now() - t < TTL ? (d as GithubData) : null;
  } catch {
    return null;
  }
}

function writeCache(user: string, d: GithubData) {
  try {
    localStorage.setItem(KEY(user), JSON.stringify({ t: Date.now(), d }));
  } catch {
    /* quota / private mode */
  }
}

const fallback = (): GithubData => ({ status: "error", repos: GITHUB_FALLBACK_REPOS, activity: null });

/**
 * GitHub profile, repos and recent public activity. Starts only when `enabled`
 * (section near viewport), caches for an hour, times out after 8s and always
 * resolves to something renderable.
 */
export function useGithub(user: string, enabled: boolean): GithubData {
  const [data, setData] = useState<GithubData>(() => readCache(user) ?? { status: "idle", repos: [], activity: null });

  useEffect(() => {
    if (!enabled || data.status === "ready") return;
    const ctrl = new AbortController();
    let cancelled = false;
    const timer = window.setTimeout(() => ctrl.abort(), 8000);
    setData((d) => ({ ...d, status: "loading" }));

    const get = (path: string) =>
      fetch(`https://api.github.com/${path}`, { signal: ctrl.signal, headers: { Accept: "application/vnd.github+json" } }).then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      });

    (async () => {
      try {
        const [u, rs] = await Promise.all([get(`users/${user}`), get(`users/${user}/repos?per_page=100&sort=pushed`)]);
        const own = (rs as Record<string, unknown>[]).filter((r) => !r.fork);
        const byName = new Map(own.map((r) => [r.name as string, r]));
        const pinned = GITHUB_PINNED.map((n) => byName.get(n)).filter(Boolean) as Record<string, unknown>[];
        const rest = own.filter((r) => !GITHUB_PINNED.includes(r.name as string));
        const repos: Repo[] = [...pinned, ...rest].slice(0, 6).map((r) => ({
          name: r.name as string,
          description: (r.description as string) ?? null,
          language: (r.language as string) ?? null,
          stars: (r.stargazers_count as number) ?? 0,
          url: r.html_url as string,
          pushed: (r.pushed_at as string)?.slice(0, 10),
        }));

        // Activity is best-effort: its failure must not hide the repos.
        let activity: Record<string, number> | null = null;
        try {
          const ev = (await get(`users/${user}/events/public?per_page=100`)) as { created_at: string }[];
          activity = {};
          for (const e of ev) {
            const day = e.created_at.slice(0, 10);
            activity[day] = (activity[day] ?? 0) + 1;
          }
        } catch {
          activity = null;
        }

        const next: GithubData = {
          status: "ready",
          avatar: u.avatar_url,
          publicRepos: u.public_repos,
          followers: u.followers,
          repos: repos.length ? repos : GITHUB_FALLBACK_REPOS,
          activity,
        };
        writeCache(user, next);
        if (!cancelled) setData(next);
      } catch {
        if (!cancelled) setData(fallback());
      } finally {
        window.clearTimeout(timer);
      }
    })();

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      ctrl.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, user]);

  return data;
}
