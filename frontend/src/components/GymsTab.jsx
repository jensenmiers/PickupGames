import React, {useState, useEffect} from 'react'
import GymCard from './GymCard'
import SearchGyms from './SearchGyms'

const GymsTab = ({gyms}) => {

  const [searchedGyms, setSearchedGyms] = useState('')

  const filteredGyms = gyms.filter( gym => (gym.gym_name.toLowerCase().includes(searchedGyms.toLowerCase())))

  return (
    <div>
      <h1 className="h1">Gyms</h1>
        <SearchGyms searchedGyms={searchedGyms} setSearchedGyms={setSearchedGyms} />
        <div className='body'>
        {filteredGyms.map((gym) => (
            <GymCard key={gym.id} gym={gym} />
        ))}
        </div>
    </div>
  )
}

export default GymsTab