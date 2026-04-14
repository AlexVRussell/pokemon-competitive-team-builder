import { useEffect, useState } from "react"
import type { Pokemon } from "./types/pokemon"

function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([])

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
      .then(response => response.json())
      .then(data => setPokemon(data.results))
  }, [])

  // teamBuilder.tsx 
  const [team, setTeam] = useState<Pokemon[]>([])

  function addToTeam(poke: Pokemon) {
    if (team.length >= 6 ) {
      return;
    }

    const alreadyInTeam = team.find((member) => member.name === poke.name)

    if(alreadyInTeam) {
      console.log('${poke.name} is already added');
      return;
    }

    setTeam([...team, poke])
  }

  function removeFromTeam(poke: Pokemon){
    setTeam(team.filter((member) => member.name !== poke.name))
  }

  // end of teamBuilder.tsx

  return (
    <div>
      <h1>MetaDex - Your personal Competitive Pokemon ChatBot Coach</h1>

      {pokemon.map((poke) => (
        <div key={poke.name}>
          <p key={poke.name}>{poke.name}</p>
          <p key={poke.url}>{poke.url}</p>
          <button onClick={() => addToTeam(poke)}>Add to Team</button>
        </div>
      ))}

      <h2> Your Team </h2>
      {team.map((poke) => (
        <div key={poke.name}>
          <p key={poke.name}>{poke.name}</p>
          <button onClick={() => removeFromTeam(poke)}>Remove from Team</button>
        </div>
      ))}
    </div>
  )
}

export default App