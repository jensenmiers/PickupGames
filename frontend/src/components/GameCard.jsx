import React from 'react'

const GameCard = ({game}) => {

    const handleJoin = () => {}

  return (
    <div className="game-card">
        <h3>{game.game_start}</h3>
        <p>DONATION: ${game.donation}</p>
        <p>{game.location}</p>
        <p>{game.game_end}</p>
        <p>Remaining spots: {game.remainingSpots} of {game.totalSpots}</p>
        <button onClick={handleJoin}>JOIN GAME</button>
    </div>
  )
}

export default GameCard