import React, {useState, useEffect} from 'react'
import FormEditProfile from './FormEditProfile'

const Profile = ({user, updateUser}) => {

  const [userRSVPs, setUserRSVPs] = useState([]);
  const [showEditProfile, setShowEditProfile] = useState(false);


  useEffect(() => {
    if (user) {
      fetch(`/api/signed_up_players?player_id=${user.id}`)
        .then((response) => response.json())
        .then((data) => 
        // const sortedEvents = data.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
        setUserRSVPs(data));
    }
  }, [user]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayOfMonth = date.getDate();
    const hours = date.getHours();
    const meridiem = hours < 12 ? 'AM' : 'PM';
    return `${((hours + 11) % 12) + 1}${meridiem} ${days[date.getDay()]} - ${months[date.getMonth()]} ${dayOfMonth}`;
  };

  const rsvpList = userRSVPs.map((rsvp) => (
    <div key={rsvp.id}>
      <h3>{formatDate(rsvp.game.game_start)} at Gym {rsvp.game.gym_id}</h3>
      <p>Game ID: {rsvp.game.id}</p>
      <p>Game start: {formatDate(rsvp.game.game_start)}</p>
      <p>Game end: {formatDate(rsvp.game.game_end)}</p>
      <p>RSVPed: {formatDate(rsvp.created_at)}</p>
    </div>
  ));
  


  return (
    <div>
      <h2>Profile Details: {user.username}</h2>
      {user ? (
        <div>
          <h3>My RSVPs:</h3>
          {rsvpList}
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
      <div>
        <h3>About:</h3>
          <p>Username: {user.username}</p>
          <p>Email: {user.player_email}</p>
          <p>Phone Number: {user.player_phone_number}</p>
      </div>
      <button onClick={() => setShowEditProfile(!showEditProfile)}>
        {showEditProfile ? "Dismiss" : "Edit Profile"}
      </button>
      {showEditProfile && <FormEditProfile user={user} updateUser={updateUser}/>}
    </div>

  )
}

export default Profile