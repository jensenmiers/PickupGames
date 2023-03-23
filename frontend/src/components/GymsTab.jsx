import React, {useState, useEffect} from 'react'
import GymCard from './GymCard'
import SearchGyms from './SearchGyms'

const GymsTab = ({gyms}) => {

  const [searchedGyms, setSearchedGyms] = useState('')

  const filteredGyms = gyms.filter( gym => (gym.gym_name.toLowerCase().includes(searchedGyms.toLowerCase())))

  return (
    <div>
      <h2>Gyms</h2>
        <SearchGyms searchedGyms={searchedGyms} setSearchedGyms={setSearchedGyms} />
        {filteredGyms.map((gym) => (
            <GymCard key={gym.id} gym={gym} />
        ))}
    </div>
  )
}

export default GymsTab