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
             <NavLink activeClassName="navlink-active" to='/login'>
               Log in
             </NavLink>
             <NavLink activeClassName="navlink-active" to='/games'>
               Games
             </NavLink>
             <NavLink activeClassName="navlink-active" to='/players'>
               Players
             </NavLink>
             <NavLink activeClassName="navlink-active" to= '/gyms'>
               Gyms
             </NavLink>
         </nav>
        )}
    
    return (
        <nav className="navbar">
            <NavLink activeClassName="navlink-active" exact to='/games'>Games</NavLink>
            <NavLink activeClassName="navlink-active" exact to='/players'>Players</NavLink>
            <NavLink activeClassName="navlink-active" exact to='/gyms'>Gyms</NavLink>
            <NavLink activeClassName="navlink-active" exact to='/profile'>{user.username}</NavLink>
            <button className="navbar-button" onClick={handleLogoutClick}>Log Out</button>
        </nav>
    )
}

export default NavBar