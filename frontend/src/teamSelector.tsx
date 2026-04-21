import { useState } from "react"
import type { Pokemon } from "./types/pokemon"

export function useTeam() {
  const [team, setTeam] = useState<Pokemon[]>([])

  function addToTeam(poke: Pokemon) {
    if (team.length >= 6) {
      return
    }
    const alreadyInTeam = team.find((member) => member.name === poke.name)
    if (alreadyInTeam) {
      console.log(`${poke.name} is already added`)
      return
    }
    setTeam([...team, poke])
  }

  function removeFromTeam(poke: Pokemon) {
    setTeam(team.filter((member) => member.name !== poke.name))
  }

  return { team, addToTeam, removeFromTeam }
}
