import { useEffect, useState } from "react"

import { Character } from "types/character"
import { Episode } from "types/episode"

import { parseEpisode } from "./episode"

interface UseEpisodeResult {
  episode: Episode | null
  characters: Character[]
  isLoading: boolean
  error: string | null
  refetch: () => void
}

export function useEpisode(id: number): UseEpisodeResult {
  const [episode, setEpisode] = useState<Episode | null>(null)
  const [characters, setCharacters] = useState<Character[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [trigger, setTrigger] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        setIsLoading(true)
        setError(null)

        const episodeRes = await fetch(`https://rickandmortyapi.com/api/episode/${id}`)
        if (!episodeRes.ok) throw new Error(episodeRes.statusText)
        const rawEpisode = await episodeRes.json()

        const characterIds = rawEpisode.characters
          .map((url: string) => url.split("/").pop())
          .join(",")
        const charactersRes = await fetch(
          `https://rickandmortyapi.com/api/character/${characterIds}`,
        )
        if (!charactersRes.ok) throw new Error(charactersRes.statusText)
        const charactersData = await charactersRes.json()

        if (!cancelled) {
          setEpisode(parseEpisode(rawEpisode))
          // API returns a single object (not array) when there's only one character
          setCharacters(Array.isArray(charactersData) ? charactersData : [charactersData])
        }
      } catch {
        if (!cancelled) setError("Failed to load episode. Please try again.")
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [id, trigger])

  const refetch = () => setTrigger((n) => n + 1)

  return { episode, characters, isLoading, error, refetch }
}
