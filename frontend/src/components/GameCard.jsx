import React, {useState, useEffect } from 'react'

const GameCard = ({game, user, setGames, gyms}) => {

    const [isJoined, setIsJoined] = useState(false);
    const [RSVPs, setRSVPs] = useState([]);
    const [formData, setFormData] = useState(game)
    const [showForm, setShowForm] = useState(false);
    
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
                // Add authentication headers if required?
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
            const { name, value } = e.target;
            setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            }));
        };

        const handleFormSubmit = (e) => {
            e.preventDefault();
            fetch(`/api/games/${game.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // Add authentication headers if required.
            },
            body: JSON.stringify(formData),
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

        const editGame = () => {
            showForm(true);
        };

        const formatDate = (dateString) => {
            const date = new Date(dateString);
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const hours = date.getHours();
            const meridiem = hours < 12 ? 'AM' : 'PM';
            return `${((hours + 11) % 12) + 1}${meridiem} - ${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()} `;
        };

        const formatDateTitle = (dateString) => {
            const date = new Date(dateString);
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const hours = date.getHours();
            const meridiem = hours < 12 ? 'AM' : 'PM';
            return `${((hours + 11) % 12) + 1}${meridiem} ${days[date.getDay()]}`;
        };

return (
    <div className="game-card">
        <h3>{formatDateTitle(game.game_start)} at {game.gym.gym_name}</h3>
        <p>Game ID: {game.id}</p>
        <p>Donation: ${game.donation}</p>
        <p>Start: {formatDate(game.game_start)}</p>
        <p>End: {formatDate(game.game_end)}</p>
        <p>Total Capacity: {game.capacity} players</p>
        <p>Created by: {game.player.username}</p>
        <button
            onClick={handleJoinOrUnjoin}
            style={{ backgroundColor: isJoined ? 'green' : 'blue' }}
        >
        {isJoined ? "You're going!" : 'JOIN GAME'}
        </button>
        <br />
            {showForm ? (
                <form onSubmit={handleFormSubmit}>
                <h3>Edit your Game</h3>
                    <label htmlFor="game_start">Game Start:</label>
                    <input
                        type="datetime-local"
                        name="game_start"
                        value={formData.game_start}
                        onChange={handleFormChange}
                    />
                    <br />
                    <label htmlFor="game_end">Game End:</label>
                    <input
                        type="datetime-local"
                        name="game_end"
                        value={formData.game_end}
                        onChange={handleFormChange}
                    />
                    <br />
                    <label htmlFor="capacity">Capacity:</label>
                    <input
                        type="number"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleFormChange}
                    />
                    <br />
                    <label htmlFor="donation">Donation:</label>
                    <input
                        type="number"
                        name="donation"
                        value={formData.donation}
                        onChange={handleFormChange}
                    />
                    <br />
                    <label htmlFor="gym_id">Location:</label>
                    <select
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