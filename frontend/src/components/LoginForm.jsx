import React, {useState} from 'react'

function LoginForm ({onLogin}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        fetch('api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        }).then((response) => {
            setIsLoading(false)
            if (response.ok) {
                response.json().then((user) => onLogin(user))
            } else {
                response.json().then((err) => setErrors(err.errors))
            }
        })
    }


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
            <button type="submit">{isLoading ? 'Loading...' : 'Login'}</button>
            {errors.map((err) => (
                <p key={err}>{err}</p>
            ))}
        </form>
    )
}

export default LoginForm