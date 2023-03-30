import React, {useState, useEffect } from 'react'

const GameCard = ({game, user, setGames, gyms}) => {

    const [isJoined, setIsJoined] = useState(false)
    const [RSVPs, setRSVPs] = useState([])
    const [formData, setFormData] = useState({
        game_start: '',
        game_end: '',
        capacity: '',
        gym_id: '',
        donation: '',
        location: ''
    })
    const [showForm, setShowForm] = useState(false)
    
    useEffect(() => {
        if (user) {
            fetch('/api/signed_up_players')
            .then((response) => response.json())
            .then((allRSVPs) => {
                const RSVPsForGame = allRSVPs.filter((player) => player.game_id === game.id);
                setRSVPs(RSVPsForGame)
                const userHasRSVPd = RSVPsForGame.some((player) => player.player_id === user.id);
                setIsJoined(userHasRSVPd);
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
        }
    }, [game, user]);
    
    const handleJoinOrUnjoin = () => {
        if (isJoined) {
            const RSVP = RSVPs.find((player) => player.player_id === user.id);
            fetch(`/api/signed_up_players/${RSVP.id}`, {
            method: 'DELETE',
            headers: {
            },
            })
            .then((response) => {
                if (!response.ok) {
                throw new Error('Error unjoining the game');
                }
                setIsJoined(false);
                setRSVPs((prevRSVPs) => prevRSVPs.filter((player) => player.id !== RSVP.id));
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
        } else {
            fetch('/api/signed_up_players', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
            .then((newRSVP) => {
                setIsJoined(true)
                setRSVPs((prevRSVPS) => [...prevRSVPS, newRSVP])
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
        }
        };

        const handleFormChange = (e) => {
            console.log('formData: ', formData);
            setFormData({
            ...formData,
            [e.target.name]: e.target.value 
            })
        }


        // const handleFormChange = (e) => {
        //     const { name, value } = e.target;
        //     let convertedValue = value;

        //     if (name === "game_start" || name === "game_end") {
        //     const localTime = new Date(value);
        //     console.log('localTime: ', localTime);
        //     const utcTime = new Date(localTime.getTime() + localTime.getTimezoneOffset() * 60000);
        //     console.log('utcTime: ', utcTime);
        //     const convertedValue = utcTime.toISOString(); }
        //     console.log('convertedValue: ', convertedValue);

        //     setFormData((prevData) => ({
        //       ...prevData,
        //       [name]: convertedValue,
        //     }));
        //   };

        const handleFormSubmit = (e) => {
            e.preventDefault();
           
            const convertedFormData = {
                ...formData
            }
            if (convertedFormData.game_start) {
                const localTime = new Date(convertedFormData.game_start);
                const utcTime = new Date(localTime.getTime() + localTime.getTimezoneOffset() * 60000);
                // convertedFormData.game_start = utcTime.toISOString();
                convertedFormData.game_start = localTime.toISOString()
            }
            if (convertedFormData.game_end) {
                const localTime = new Date(convertedFormData.game_end);
                const utcTime = new Date(localTime.getTime() + localTime.getTimezoneOffset() * 60000);
                convertedFormData.game_end = localTime.toISOString();
            }




            fetch(`/api/games/${game.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(convertedFormData),
            })
            .then((response) => {
                if (!response.ok) {
                throw new Error('Error updating the game');
                }
                return response.json();
            })
            .then((updatedGame) => {
                setGames((prevGames) =>
                prevGames.map((g) => (g.id === updatedGame.id ? updatedGame : g))
                );
                setShowForm(false)
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
        };

        const deleteGame = () => {
        fetch(`/api/games/${game.id}`, {
            method: 'DELETE'
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error deleting the game')
                }
                setGames((currentGames) => currentGames.filter((g) => g.id !== game.id))
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error)
            })
    }

        // const editGame = () => {
        //     showForm(true);
        // };

        const formatDate = (dateString) => {
            const date = new Date(dateString);
            // const formattedDate = date.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });

            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const hours = date.getHours();
            const meridiem = hours < 12 ? 'AM' : 'PM';
            const year = date.getFullYear() % 100
            const paddedYear = year.toString().padStart(2, '0')
            return `${((hours + 11) % 12) + 1}${meridiem} - ${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()}, '${paddedYear} `;
        };

        // const formatDateTitle = (dateString) => {
        //     const date = new Date(dateString);
        //     const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        //     const hours = date.getHours();
        //     const meridiem = hours < 12 ? 'AM' : 'PM';
        //     return `${((hours + 11) % 12) + 1}${meridiem} ${days[date.getDay()]}`;
        // };

return (
    <div className="game-card">
        <h3>{formatDate(game.game_start)} at {game.gym.gym_name}</h3>
        <p>Game ID: {game.id}</p>
        <p>Donation: ${game.donation}</p>
        <p>Start: {formatDate(game.game_start)}</p>
        <p>End: {formatDate(game.game_end)}</p>
        <p>Total Capacity: {game.capacity} players</p>
        <p>Created by: {game.player.username === user.username ? 'Me' : game.player.username}</p>
        <button
            onClick={handleJoinOrUnjoin}
            style={{ backgroundColor: isJoined ? 'green' : 'blue' }}
        >
        {isJoined ? "You're going!" : 'JOIN GAME'}
        </button>
        <br />
            {showForm ? (
                <form  onSubmit={handleFormSubmit}>
                <h3>Edit your Game</h3>
                    <label htmlFor="game_start">Game Start:</label>
                    <input style={{ color: 'black'}}
                        type="datetime-local"
                        name="game_start"
                        value={formData.game_start}
                        onChange={handleFormChange}
                    />
                    <br />
                    <label htmlFor="game_end">Game End:</label>
                    <input style={{ color: 'black'}}
                        type="datetime-local"
                        name="game_end"
                        value={formData.game_end}
                        onChange={handleFormChange}
                    />
                    <br />
                    <label htmlFor="capacity">Capacity:</label>
                    <input style={{ color: 'black'}}
                        type="number"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleFormChange}
                    />
                    <br />
                    <label htmlFor="donation">Donation:</label>
                    <input style={{ color: 'black'}}
                        type="number"
                        name="donation"
                        value={formData.donation}
                        onChange={handleFormChange}
                    />
                    <br />
                    <label htmlFor="gym_id">Location:</label>
                    <select style={{ color: 'black'}}
                        name='gym_id'
                        value={formData.gym_id}
                        onChange={handleFormChange}
                    >
                        <option value=''>Select a gym</option>
                        {gyms.map((gym) => {
                            return <option key={gym.id} value={gym.id}>
                                {gym.gym_name}
                            </option>
                        })}
                    </select>
                    <br />
                    <button type="submit">Update</button>
                </form>
                ) : (
                <>
                    {user && game.player.id === user.id && (<button onClick={() => setShowForm(true)}>Edit My Game</button>)}
                </>
                )}
        {user && game.player.id === user.id && (
        <button onClick={deleteGame}>Delete My Game</button>
        )}
    </div>
  )
}

export default GameCard