import React, { useState, useEffect } from 'react'

const PlayersTab = () => {
  const [RSVPs, setRSVPs] = useState([]);

  useEffect(() => {
    fetch('/api/signed_up_players')
      .then((response) => response.json())
      .then((data) => setRSVPs(data));
  }, []);

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
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const meridiem = hours < 12 ? 'AM' : 'PM';

    const formattedHours = ((hours + 11) % 12) + 1;
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes} ${meridiem}`;
  }

  return (
    <div>
      <h3>Recent RSVPs</h3>
      {RSVPs.map((rsvp) => (
        console.log('rsvp: ', rsvp),

        <div className="game-card" key={rsvp.id}>
          <p>{rsvp.player.username} just RSVPed at {formatRSVPtime(rsvp.created_at)}</p>
          <p>Gym ID: {rsvp.game.gym_id}</p> 
          {/* // doesnt have access to gym_name since this instance has just games and players */}
          <p>Game Start: {formatDate(rsvp.game.game_start)}</p>
          <p>Game End: {formatDate(rsvp.game.game_end)}</p>
          <p>Total Cap: {rsvp.game.capacity}</p>
        </div>
      ))}
    </div>
  )
}

export default PlayersTab