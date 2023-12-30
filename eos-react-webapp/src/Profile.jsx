import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from './api/axios'
import Header from './Header'
const ORDER_URL = '/v1/order/user'

const Profile = () => {
    const [order, setOrder] = useState()
    let [userData, setUserData] = useState()
    useEffect(() => {
        getUser()
    }, [!userData])

    const getUser = () => {
        let response = JSON.parse(localStorage.getItem('user'));
        setUserData(response)
    }
    useEffect(() => {
        orderList()
    }, [!order])

    const navigate = useNavigate()
    const orderList = async () => {
        let user = JSON.parse(localStorage.getItem('user'));
        const response = await axios.get(`${ORDER_URL}/${user?.id}`)
        console.log('orders', response);
        // const response = [
        //     {
        //         id: 1,
        //         amount: 200,
        //         imageUrl: '',
        //         itemName: 'Reebok shoes',
        //         description: 'This is reebok shoes'
        //     }
        // ]
        setOrder(response.data)
    }
    return (
        <div className='container-fluid profile-container'>
            <Header />
            <div className="row">
                <div className="col-md-12 profile-head">
                    <p><b>Welcome {userData?.username}</b> | {userData?.email}</p>
                </div>
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-12">
                            <h5 className='text-center'>Your Orders</h5>
                        </div>
                    </div>
                    {/* <div className="row">
                        {order ? order.map(element => {
                            return (<div className='col-md-3 mb-2' key={element?.id}>
                                <div className="card" style={{ width: "15rem" }}>
                                    <img src={element?.imageUrl} className="img-fluid card-image" alt="" />
                                    <div className="card-body">
                                        <h5 className="card-title">₹{element?.amount}</h5>
                                        <p className="card-text">{element?.itemName}</p>
                                        <p className="card-text">{element?.description}</p>
                                        <a className='btn btn-outline-primary' onClick={() => navigate('/order')}>Order Details</a>
                                    </div>
                                </div>
                            </div>)
                        }) : <></>}
                    </div> */}
                    <div className='row'>
                        <div className="col-md-12 p-2">
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                {
                                    order === undefined ? <tbody>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody> : <tbody>
                                        {
                                            order ? order.map((element) => {
                                                console.log('element order',element);
                                               return element?.item.map(item=>{
                                                    return (<tr key={item?.id}>
                                                        <td>{item?.itemName}</td>
                                                        <td>{item?.cost}</td>
                                                        <td>{item?.quantity}</td>
                                                        <td>{item?.price}</td>
                                                        <td><a className='btn btn-outline-primary' onClick={() => navigate('/order')}>Track</a></td>
                                                    </tr>)
                                                })
                                                
                                            }) : <></>
                                        }
                                    </tbody>
                                }
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
