import React, {useState, useEffect} from 'react'
import FormEditProfile from './FormEditProfile'

const Profile = ({user, updateUser}) => {

  const [userRSVPs, setUserRSVPs] = useState([]);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [pastRSVPs, setPastRSVPs] = useState([]);
  const [upcomingRSVPs, setUpcomingRSVPs] = useState([]);


  useEffect(() => {
    if (user) {
      fetch(`/api/signed_up_players?player_id=${user.id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log('data: ', data);
        const sortedRSVPs = data.sort((a, b) => new Date(b.game.game_start) - new Date(a.game.game_end));
        
        const past = []
        const upcoming = []
        const now = new Date()
        sortedRSVPs.forEach((rsvp) => {
          if (new Date(rsvp.game.game_start) < now) {
            past.push(rsvp)
          } else {
            upcoming.push(rsvp)
          }
        })
        setUserRSVPs(sortedRSVPs)

        setPastRSVPs(past)
        setUpcomingRSVPs(upcoming)
        console.log("Upcoming RSVPs:", upcoming);

        
        
        // setUserRSVPs(sortedEvents)
        });
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
    <div className='profile'>
      <h2>Profile Details: {user.username}</h2>
        {user ? (
        <div>
          <h3>My RSVPs:</h3>
          {rsvpList}
        </div>
          ) : (
        <p>Please log in to view your profile.</p>
        )}
        <div className='events-section'>
          <h3>Upcoming Events</h3>
          {upcomingRSVPs.map((rsvp) => (
            < div key={rsvp.id} className="event-details">
              <h3>{formatDate(rsvp.game.game_start)} at Gym {rsvp.game.gym_id}</h3>
            </div>
          ))}
        </div>
        <div >
          <h3>Past Events</h3>
          {pastRSVPs.map((rsvp) => (
            < div key={rsvp.id} className="event-details">
              <h3>{formatDate(rsvp.game.game_start)} at Gym {rsvp.game.gym_id}</h3>
              <h3>{formatDate(rsvp.game.game_start)} at {rsvp.game.gym_id}</h3>
                  {/* <p>Game ID: {game.id}</p>
                  <p>Donation: ${game.donation}</p>
                  <p>Start: {formatDate(game.game_start)}</p>
                  <p>End: {formatDate(game.game_end)}</p>
                  <p>Total Capacity: {game.capacity} players</p>
                  <p>Created by: {game.player.username}</p> */}




            </div>
          ))}
        </div>
      <div className='game-card'>
        <h3>About:</h3>
          <p>Username: {user.username}</p>
          <p>Email: {user.player_email}</p>
          <p>Phone Number: {user.player_phone_number}</p>
      <button onClick={() => setShowEditProfile(!showEditProfile)}>
        {showEditProfile ? "Dismiss" : "Edit Profile"}
      </button>
      {showEditProfile && <FormEditProfile user={user} updateUser={updateUser}/>}
      </div>
    </div>

  )
}

export default Profile