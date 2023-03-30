import React, { useState, useEffect } from 'react'

const PlayersTab = ({user}) => {
  const [RSVPs, setRSVPs] = useState([]);


  useEffect(() => {
    fetch('/api/signed_up_players')
      .then((response) => response.json())
      .then((allRSVPs) => {
        const sortedEvents = allRSVPs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setRSVPs(sortedEvents)
      } )
    }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const hours = date.getHours();
    const meridiem = hours < 12 ? 'AM' : 'PM';

  return `${((hours + 11) % 12) + 1}${meridiem} - ${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()} `;
  };

  const formatRSVPtime = (dateString) => {
    const date = new Date(dateString);
    const days = ['SUn', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const meridiem = hours < 12 ? 'AM' : 'PM';

    const formattedHours = ((hours + 11) % 12) + 1;
    const formattedMinutes = minutes.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes} ${meridiem} ${days[date.getDay()]}`;
  }

  const userHasRSVPed = (gameId) => {
    return RSVPs.some(
      (rsvp) => rsvp.player_id === user.id && rsvp.game_id === gameId
    );
  };

  const handleJoin = (game_id) => {
    fetch('/api/signed_up_players', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        user_id: user.id,
        game_id: game_id
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error joining the game')
        }
        return response.json()
      })
      .then((newRSVP) => {
        setRSVPs((prevRSVPs) => [...prevRSVPs, newRSVP])
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation', error)
      })
  }

return (
  <div>
    <h1 className="h1">Recent RSVPs</h1>

  <div className='body'>
      {RSVPs.map((rsvp) => (
        <div className="game-card" key={rsvp.id}>
          <h3>{rsvp.player.username === user.username ? 'I' : rsvp.player.username } joined at {formatRSVPtime(rsvp.created_at)}</h3>
          <p>Game ID: {rsvp.game.id}</p>
          <p>at gym {rsvp.game.gym_id}</p>
          {/* // doesnt have access to gym_name since this instance has just games and players */}
          <p>Game Start: {formatDate(rsvp.game.game_start)}</p>
          <p>Game End: {formatDate(rsvp.game.game_end)}</p>
          <p>Total Cap: {rsvp.game.capacity}</p>
          {rsvp.player_id === user.id ? ( <></>
              // <button disabled style={{ backgroundColor: 'grey', cursor: 'not-allowed' }}>I've RSVPed</button>
          ) : userHasRSVPed(rsvp.game.id) ? (
            <button disabled style={{ backgroundColor: 'grey', cursor: 'not-allowed'}} >
              You're already RSVPed to this game
            </button>
          ) : (
              <button onClick={() => handleJoin(rsvp.game.id)}>Join {rsvp.player.username}</button>
          )}
        </div>
      ))}
    </div>
  </div>
  )
}

export default PlayersTab