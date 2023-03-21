import React, {useEffect, useState} from 'react'
import NavBar from './NavBar'
import { Switch, Route } from 'react-router-dom'
import GamesTab from './GamesTab'
import PlayersTab from './PlayersTab'
import GymsTab from './GymsTab'
import Profile from './Profile'
import LogIn from './LogIn'
import '../App.css'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // auto-login
    fetch('api/me').then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user))
      }
    })
  }, [])

  if (!user) {
     return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path='/login'>
            <LogIn onLogin={setUser} />
          </Route>
          <Route exact path='/games'>
            <GamesTab />
          </Route>
          <Route exact path='/players'>
            <PlayersTab />
          </Route>
          <Route exact path = '/gyms'>
            <GymsTab />
        </Route>
        </Switch>
      </div>
     )}
    

  return (
    <div>
      <NavBar user={user} setUser={setUser} />
      <Switch >
        <Route exact path='/games'>
          <GamesTab />
        </Route>
        <Route exact path = '/players'>
          <PlayersTab />
        </Route>
        <Route exact path = '/gyms'>
          <GymsTab />
        </Route>
        <Route exact path = '/profile' >
          <Profile />
        </Route>
      </Switch>

    </div>
  )
     }

export default App
