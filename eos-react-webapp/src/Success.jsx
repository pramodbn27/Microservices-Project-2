import React from 'react'
import { useNavigate,useLocation } from 'react-router-dom'

const Success = () => {
    const location = useLocation()
    const navigate = useNavigate()
    return (
        <div>
            <div className='card p-4'>
            <h1 className='text-center mb-4'>Payment Successfully Done!</h1>
                <h1 className='text-center mb-4'>{location.state.orderData.split('\n')[0]} created successfully.</h1>
            <a onClick={()=>navigate('/')} className='btn btn-outline-primary'>Done</a>
            </div>
        </div>
    )
}

export default Success
