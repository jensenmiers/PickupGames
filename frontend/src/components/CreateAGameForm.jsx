import React, {useState } from 'react';

const CreateAGameForm = ({addGame, gyms}) => {

    const [formData, setFormData] = useState({
        game_start: '',
        game_end: '',
        capacity: '',
        gym_id: '',
        donation: '',
    })

    const initialFormData = {
        game_start: '',
        game_end: '',
        capacity: '',
        gym_id: '',
        donation: '',
      }

    //   const formatDate = (dateString) => {
    //     const date = new Date(dateString);
    //     const options = {
    //       timeZone: 'America/Los_Angeles',
    //       hour12: true,
    //       hour: 'numeric',
    //       minute: 'numeric',
    //       month: 'short',
    //       day: 'numeric',
    //       year: '2-digit'
    //     };
    //     return date.toLocaleString('en-US', options);
    //   };
      

    const handleChange = (e) => {

        // new code
        // const { name, value } = e.target;

        // const localTime = new Date(value);
        // const utcTime = new Date(localTime.getTime() + localTime.getTimezoneOffset() * 60000);
        // const convertedValue = utcTime.toISOString();
       
        // setFormData({
        //     ...formData,
        //     [name]: convertedValue,
        //   });
        // }
        // // new code ^^

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const resetForm = () => {
        setFormData(initialFormData);
      };

    const handleSubmit =(e) => {
        e.preventDefault()

        ///new code below to get correct PDT timezone
        const convertedFormData = {
            ...formData
        }
        if (convertedFormData.game_start) {
            const localTime = new Date(convertedFormData.game_start);
            const utcTime = new Date(localTime.getTime() + localTime.getTimezoneOffset() * 60000);
            convertedFormData.game_start = utcTime.toISOString();
        }
        if (convertedFormData.game_end) {
            const localTime = new Date(convertedFormData.game_end);
            const utcTime = new Date(localTime.getTime() + localTime.getTimezoneOffset() * 60000);
            convertedFormData.game_end = utcTime.toISOString();
        }
        ///new code above ^^^ to get correct PDT timezone

        fetch('/api/games', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add an auth so can only create if loggen in?
            },
            body: JSON.stringify(convertedFormData),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((errorData) => {
                      throw new Error(JSON.stringify(errorData))
                    })
                  } 
                return response.json();
            })
            .then((newGame) => {
                addGame(newGame)
                resetForm()

            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
                // Display an error message to the user if needed.
              });
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3></h3>
                <label htmlFor="gym_id">Location:</label>
                    <select
                        name='gym_id'
                        value={formData.gym_id}
                        onChange={handleChange}
                    >
                        <option value=''>Select a gym</option>
                        {gyms.map((gym) => {
                            return <option key={gym.id} value={gym.id}>
                                {gym.gym_name}
                            </option>
                        })}
                    </select>
                    <br />
                <label htmlFor="game_start">Game Start:</label>
                <input
                    type="datetime-local"
                    name="game_start"
                    value={formData.game_start}
                    onChange={handleChange}
                />
                <br />

                <label htmlFor="game_end">Game End:</label>
                <input
                    type="datetime-local"
                    name="game_end"
                    value={formData.game_end}
                    onChange={handleChange}
                />
                <br />

                <label htmlFor="capacity">Capacity:</label>
                <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                />
                <br />

                <label htmlFor="donation">Donation:</label>
                <input
                    type="number"
                    name="donation"
                    value={formData.donation}
                    onChange={handleChange}
                />
                <br />

            <button type='submit'>ADD GAME</button>
        </form>
    )

}

export default CreateAGameForm