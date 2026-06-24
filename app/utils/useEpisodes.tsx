import { useEffect, useState } from "react"

import { Episode } from "types/episode"

import { parseEpisode } from "./episode"

export interface Season {
  number: number
  episodes: Episode[]
}

function groupIntoSeasons(episodes: Episode[]): Season[] {
  const map = new Map<number, Episode[]>()

  for (const ep of episodes) {
    if (!map.has(ep.season)) map.set(ep.season, [])
    map.get(ep.season)!.push(ep)
  }

  return Array.from(map.entries())
    .sort(([a], [b]) => a - b)
    .map(([number, eps]) => ({
      number,
      episodes: eps.sort((a, b) => a.episode - b.episode),
    }))
}

async function fetchAllEpisodes(): Promise<Episode[]> {
  const firstRes = await fetch("https://rickandmortyapi.com/api/episode")
  if (!firstRes.ok) throw new Error(firstRes.statusText)
  const firstData = await firstRes.json()

  const restResults = await Promise.all(
    Array.from({ length: firstData.info.pages - 1 }, (_, i) =>
      fetch(`https://rickandmortyapi.com/api/episode?page=${i + 2}`).then((r) => {
        if (!r.ok) throw new Error(r.statusText)
        return r.json()
      }),
    ),
  )

  return [firstData, ...restResults].flatMap((r) => r.results).map(parseEpisode)
}

interface UseEpisodesResult {
  episodes: Episode[]
  seasons: Season[]
  isLoading: boolean
  error: string | null
  refetch: () => void
}

export function useEpisodes(): UseEpisodesResult {
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [seasons, setSeasons] = useState<Season[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [trigger, setTrigger] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        setIsLoading(true)
        setError(null)

        const allEpisodes = await fetchAllEpisodes()

        if (!cancelled) {
          setEpisodes(allEpisodes)
          setSeasons(groupIntoSeasons(allEpisodes))
        }
      } catch {
        if (!cancelled) setError("Failed to load episodes. Please try again.")
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [trigger])

  function refetch() {
    setTrigger((n) => n + 1)
  }

  return { episodes, seasons, isLoading, error, refetch }
}
