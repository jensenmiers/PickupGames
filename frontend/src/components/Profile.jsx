import React, {useState, useEffect} from 'react'

const Profile = ({user}) => {

  const [userRSVPs, setUserRSVPs] = useState([]);


  useEffect(() => {
    if (user) {
      fetch(`/api/signed_up_players?player_id=${user.id}`)
        .then((response) => response.json())
        .then((data) => setUserRSVPs(data));
    }
  }, [user]);

  const rsvpList = userRSVPs.map((rsvp) => (
    <div key={rsvp.id}>
      <p>Username: {rsvp.player.username}</p>
      <p>Gym ID: {rsvp.game.gym_id}</p>
      <p>Game start: {rsvp.game.game_start}</p>
      <p>Game end: {rsvp.game.game_end}</p>
      <p>Timestamp: {rsvp.created_at}</p>
    </div>
  ));
  


  return (
    <div>
    <h2>Profile</h2>
    {user ? (
      <div>
        <h3>{user.username}'s RSVPs:</h3>
        {rsvpList}
      </div>
    ) : (
      <p>Please log in to view your profile.</p>
    )}
  </div>  )
}

export default Profile