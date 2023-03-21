import React, { useState, useEffect } from 'react'
import GameCard from './GameCard'

const GamesTab = () => {

  const [games, setGames] = useState([])

  useEffect(() => {
    fetch('/api/games')
      .then((r) => r.json())
      .then((data) => setGames(data))
  }, [])

  return (
    <div>
      <h2>Games</h2>
      {games.map((game) => {
        return <GameCard key={game.id} game={game} />
      })}
    </div>
  )
}

export default GamesTab