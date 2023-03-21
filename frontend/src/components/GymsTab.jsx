import React, {useState, useEffect} from 'react'
import GymCard from './GymCard'

const GymsTab = () => {

  const [gyms, setGyms] = useState([])

  useEffect(() => {
    fetch('api/gyms')
      .then((response) => response.json())
      .then((data) => setGyms(data))
  }, [])

  return (
    <div>
      <h2>Gyms</h2>
      
        {gyms.map((gym) => {
          return <GymCard key={gym.id} gym={gym} />
        })}
      
    </div>
  )
}

export default GymsTab