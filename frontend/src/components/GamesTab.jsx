import React, { useState, useEffect } from 'react'
import GameCard from './GameCard'
import CreateAGameForm from './CreateAGameForm'

const GamesTab = ({gyms, user}) => {

  const [games, setGames] = useState([])
  const [showCreateForm, setShowCreateForm] = useState(false);


  const addGame = (newGame) => {
    setGames((prevGames) => [...prevGames, newGame])
  }

  useEffect(() => {
    fetch('/api/games')
      .then((r) => r.json())
      .then((data) => 
   // const sortedEvents = data.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

      setGames(data))
  }, [])

  return (
    <div>
      <h2>Games</h2>
      <button onClick={() => setShowCreateForm(!showCreateForm)}>
      {showCreateForm ? 'Dismiss' : 'Add a Game'}
      </button>
      {showCreateForm && <CreateAGameForm addGame={addGame} gyms={gyms} />}
      {games.map((game) => {
        return <GameCard key={game.id} game={game} games={games} user={user} setGames={setGames} gyms={gyms}/>
      })}
    </div>
  )
}

export default GamesTab