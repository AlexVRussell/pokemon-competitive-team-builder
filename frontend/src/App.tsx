import { useState } from "react"
import type { Pokemon } from "./types/pokemon"

function App() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Pokemon[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsLoading(true)
    setError("")

    fetch(`https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`)
      .then(response => {
        if (!response.ok) throw new Error("Pokemon not found")
        return response.json()
      })
      .then(data => {
        setSearchResults([{ name: data.name, url: data.url, types: data.types }])
        setSearchQuery("")
      })
      .catch(() => {
        setError("Could not find that Pokemon. Try again!")
        setSearchResults([])
      })
      .finally(() => setIsLoading(false))
  }

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

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a Pokemon..."
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {searchResults.map((poke) => (
        <div key={poke.name}>
          <p>{poke.name}</p>
          <button onClick={() => addToTeam(poke)}>Add to Team</button>
        </div>
      ))}

      <h2> Your Team </h2>
      {team.map((poke) => (
        <div key={poke.name}>
          <p>{poke.name}</p>
          <p>{poke.types.map(t => t.type.name).join(", ")}</p>
          <button onClick={() => removeFromTeam(poke)}>Remove from Team</button>
        </div>
      ))}
    </div>
  )
}

export default App