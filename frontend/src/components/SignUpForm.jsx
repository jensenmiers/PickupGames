import React, { useState } from 'react';

function SignUpForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [player_email, setPlayerEmail] = useState('');
  const [player_phone_number, setPlayerPhoneNumber] = useState('');
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    fetch('api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, player_email, player_phone_number }),
    }).then((response) => {
      setIsLoading(false);
      if (response.ok) {
        response.json().then((user) => onLogin(user));
      } else {
        response.json().then((err) => setErrors(err.errors));
      }
    }) 
    .catch((error) => {
        setIsLoading(false);
        setErrors(['An unexpected error occurred. Please try again later.']);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label htmlFor="player_email">Email</label>
      <input
        type="email"
        id="player_email"
        name="player_email"
        value={player_email}
        onChange={(e) => setPlayerEmail(e.target.value)}
      />
      <label htmlFor="player_phone_number">Phone Number</label>
      <input
        type="tel"
        id="player_phone_number"
        name="player_phone_number"
        value={player_phone_number}
        onChange={(e) => setPlayerPhoneNumber(e.target.value)}
      />
      <button type="submit">{isLoading ? 'Loading...' : 'Sign Up'}</button>
      {errors.map((err) => (
        <p key={err}>{err}</p>
      ))}
    </form>
  );
}

export default SignUpForm;
