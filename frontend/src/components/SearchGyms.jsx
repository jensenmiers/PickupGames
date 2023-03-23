import React from 'react'

const SearchGyms = ({searchedGyms, setSearchedGyms}) => {
  
    const handleChange = (e) => {
        setSearchedGyms(e.target.value)
    }
  
  
return (
    <div>
           <input
                value={searchedGyms}
                type='text'
                placeholder='Search for gyms'
                onChange={handleChange}
            />
    </div>
  )
}

export default SearchGyms