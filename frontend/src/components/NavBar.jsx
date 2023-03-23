import React from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom'

function NavBar ({user, setUser}) {

    const history = useHistory()

    const handleLogoutClick = (e) => {
        fetch('api/logout', { method: 'DELETE' })
        .then((response) => {
            if (response.ok) {
                setUser(null)
                history.push('/')
            } else {
                response.json()
                .then(err => alert(err))
            }
        } )
        }
    
    if (!user) {
        return (
         <nav className="navbar">
             <NavLink to='/login'>
               Log in
             </NavLink>
             <NavLink to='/games'>
               Games
             </NavLink>
             <NavLink to='/players'>
               Players
             </NavLink>
             <NavLink to= '/gyms'>
               Gyms
             </NavLink>
         </nav>
        )}
    
    return (
        <nav className="navbar">
            <NavLink exact to='/games'>Games</NavLink>
            <NavLink exact to='/players'>Players</NavLink>
            <NavLink exact to='/gyms'>Gyms</NavLink>
            <NavLink exact to='/profile'>{user.username}</NavLink>
            <button  onClick={handleLogoutClick}>Log Out</button>
        </nav>
    )
}

export default NavBar