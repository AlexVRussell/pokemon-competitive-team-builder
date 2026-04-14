import { useEffect, useState } from "react"
import type { Pokemon } from "./types/pokemon"

function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([])

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
      .then(response => response.json())
      .then(data => setPokemon(data.results))
  }, [])

  return (
    <div>
      <h1>MetaDex - Your personal Competitive Pokemon ChatBot Coach</h1>

      {pokemon.map((poke) => (
        <div key={poke.name}>
          <p key={poke.name}>{poke.name}</p>
          <p key={poke.url}>{poke.url}</p>
        </div>
      ))}
    </div>
  )
}

export default App