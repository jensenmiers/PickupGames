import React from 'react'

const GymCard = ({gym}) => {



    return (
        <div className="game-card">
            <h3>{gym.gym_name}</h3>
            <p>Location: {gym.address}</p>
            <p>Phone: {gym.gym_phone_number}</p>
            <p>General Hours: {gym.general_hours}</p>
            <p>Parking tips: {gym.parking_tips}</p>
            <p>Membership fees: {gym.membership_fees}</p>
        </div>
    )
}

export default GymCard