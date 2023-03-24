import React, {useState} from 'react'

const FormEditProfile = ({user, updateUser}) => {

    const [formData, setFormData] = useState({
        username: user.username,
        player_email: user.player_email,
        player_phone_number: user.player_phone_number,
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`/api/players/${user.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify(formData)
        })
            .then((response) => response.json())
            .then((data) => {
                updateUser(data)
            })
            .catch((error) => {
                console.error("Error:", error)
            })
        // Add logic here to submit the updated user data to the API.
        // validate the data before sending? i.e. check if the passwords match.
    };

  return (
    <div>
    <h3>Edit Profile:</h3>
        <form onSubmit={handleSubmit}>
        <label>
            Username:
            <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            />
        </label>
        <label>
            Email:
            <input
            type="email"
            name="player_email"
            value={formData.player_email}
            onChange={handleChange}
            />
        </label>
        <label>
            Phone Number:
            <input
            type="text"
            name="player_phone_number"
            value={formData.player_phone_number}
            onChange={handleChange}
            />
        </label>
        <button type="submit">Save Changes</button>
        </form>
    </div>  )
}

export default FormEditProfile