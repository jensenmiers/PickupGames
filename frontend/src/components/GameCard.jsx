import React, {useState, useEffect } from 'react'

const GameCard = ({game, user}) => {

    const [isJoined, setIsJoined] = useState(false);
    const [signedUpPlayersForGame, setSignedUpPlayersForGame] = useState([]);


    useEffect(() => {
        if (user) {
          fetch('/api/signed_up_players')
            .then((response) => response.json())
            .then((allSignedUpPlayers) => {
              const playersForGame = allSignedUpPlayers.filter((player) => player.game_id === game.id);
              setSignedUpPlayersForGame(playersForGame)
              const userSignedUp = playersForGame.some((player) => player.player_id === user.id);
              setIsJoined(userSignedUp);
            })
            .catch((error) => {
              console.error('There was a problem with the fetch operation:', error);
            });
        }
      }, [game, user]);


    const handleJoinOrUnjoin = () => {
        if (isJoined) {
            const signedUpPlayerId = signedUpPlayersForGame.find((player) => player.player_id === user.id).id;
            fetch(`/api/signed_up_players/${signedUpPlayerId}`, {
              method: 'DELETE',
              headers: {
                // Add your authentication headers if required.
              },
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error('Error unjoining the game');
                }
                setIsJoined(false);
              })
              .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
              });
          } else {
            fetch('/api/signed_up_players', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                // Add your authentication headers if required.
              },
              body: JSON.stringify({
                user_id: user.id,
                game_id: game.id,
              }),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error('Error joining the game');
                }
                return response.json();
              })
              .then((signedUpPlayer) => {
                setIsJoined(true);
              })
              .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
              });
          }
        };

    const deleteGame = () => {}

    const editGame = () => {}

  return (
    <div className="game-card">
        <h3>{game.gym.gym_name}</h3>
        <p>Donation: ${game.donation}</p>
        <p>Start: {game.game_start}</p>
        <p>End: {game.game_end}</p>
        <p>Capacity: {game.capacity} of {game.capacity}</p>
        <p>Created by: {game.player.username}</p>
        <button
  onClick={handleJoinOrUnjoin}
  style={{ backgroundColor: isJoined ? 'green' : 'blue' }}
>
  {isJoined ? 'JOINED' : 'JOIN GAME'}
</button>
        {user && game.player.id === user.id && (
        <button onClick={editGame}>EDIT GAME</button>
        )}
        {user && game.player.id === user.id && (
        <button onClick={deleteGame}>DELETE GAME</button>
        )}
    </div>
  )
}

export default GameCard