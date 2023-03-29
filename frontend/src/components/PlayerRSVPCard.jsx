// import React from 'react'

// const PlayerRSVPCard = () => {
//   return (
//     <div>PlayerRSVPCard</div>
//   )
// }

// export default PlayerRSVPCard


import React, { useState, useEffect } from 'react';
import GameCard from './GameCard';
import CreateAGameForm from './CreateAGameForm';

const GamesTab = ({ gyms, user }) => {
  const [games, setGames] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const addGame = (newGame) => {
    setGames((prevGames) => [...prevGames, newGame]);
  };

  useEffect(() => {
    fetch('/api/games')
      .then((r) => r.json())
      .then((data) => {
        const sortedEvents = data.sort(
          (a, b) => new Date(a.game_start) - new Date(b.game_start)
        );

        setGames(sortedEvents);
      });
  }, []);

  const now = new Date();
  const filterUpcomingGames = games.filter((game) => new Date(game.game_start) > now);

  return (
    <div>
      <h2>Games</h2>
      <button onClick={() => setShowCreateForm(!showCreateForm)}>
        {showCreateForm ? 'Dismiss' : 'Add a Game'}
      </button>
      {showCreateForm && <CreateAGameForm addGame={addGame} gyms={gyms} />}
      {filterUpcomingGames.map((game) => {
        return (
          <GameCard
            key={game.id}
            game={game}
            games={games}
            user={user}
            setGames={setGames}
            gyms={gyms}
          />
        );
      })}
    </div>
  );
};

export default GamesTab;
