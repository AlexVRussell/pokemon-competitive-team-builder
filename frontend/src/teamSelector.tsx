import { useState, useEffect } from "react"
import type { Pokemon } from "./types/pokemon"

const STORAGE_KEY = "pokemon-team"

export function useTeam() {
  const [team, setTeam] = useState<Pokemon[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsedTeam = JSON.parse(saved)
        setTeam(parsedTeam)
      } catch (error) {
        console.error("Failed to parse saved team:", error)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save to localStorage whenever team changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(team))
    }
  }, [team, isLoaded])

  function addToTeam(poke: Pokemon) {
    if (team.length >= 6) {
      return
    }
    const alreadyInTeam = team.find((member) => member.name === poke.name)
    if (alreadyInTeam) {
      console.log(`${poke.name} is already added`)
      return
    }

    // Add with default customization values
    const newPokemon: Pokemon = {
      ...poke,
      selectedAbility: poke.abilities?.[0]?.ability?.name || "",
      heldItem: null,
      nature: "hardy",
      moves: [],
    }

    setTeam([...team, newPokemon])
  }

  function removeFromTeam(poke: Pokemon) {
    setTeam(team.filter((member) => member.name !== poke.name))
  }

  function updatePokemonCustomization(pokemonName: string, updates: Partial<Pokemon>) {
    setTeam(
      team.map((member) =>
        member.name === pokemonName
          ? { ...member, ...updates }
          : member
      )
    )
  }

  return { team, addToTeam, removeFromTeam, updatePokemonCustomization }
}
