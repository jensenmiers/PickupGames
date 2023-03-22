import React, { useState, useEffect } from 'react'
import GameCard from './GameCard'
import CreateAGameForm from './CreateAGameForm'

const GamesTab = ({gyms, user}) => {

  const [games, setGames] = useState([])

  const addGame = (newGame) => {
    setGames((prevGames) => [...prevGames, newGame])
  }

  useEffect(() => {
    fetch('/api/games')
      .then((r) => r.json())
      .then((data) => setGames(data))
  }, [])

  return (
    <div>
      <h2>Games</h2>
      <CreateAGameForm addGame={addGame} gyms={gyms}/>
      {games.map((game) => {
        return <GameCard key={game.id} game={game} user={user}/>
      })}
    </div>
  )
}

export default GamesTab