import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from './api/axios'
import Header from './Header';
const KART_URL = '/v1/kart'

const Kart = (props) => {
  const [cart, setCart] = useState()
  const navigate = useNavigate()
  let total = 0
  let quantity = 0
  useEffect(() => {
    getCart()
  }, [])

  const getCart = async() => {
    console.log('cartId',localStorage.getItem('cartId'));
    let id = JSON.parse(localStorage.getItem('cartId'))
    const response = await axios.get(`${KART_URL}/${id}`)
    // const response = {
    //   "id": 1,
    //   "userId": 1,
    //   "item": [
    //     {
    //       "itemId": "Reebook Shoes",
    //       "quantity": 2,
    //       "cost": 200,
    //       "price": 200
    //     },
    //     {
    //       "itemId": "T-Shirt For Mens",
    //       "quantity": 1,
    //       "cost": 200,
    //       "price": 200
    //     }
    //   ]
    // }
    setCart(response.data)
  }

  const onCheckout=(element)=>{
    console.log('cart element',element);
    if (element?.id) {
      navigate('/payment',{state:{element:element}})
    }
  }

  return (
    <div className='container-fluid vh-100 p-2'>
      <div className="row mb-2">
          <div className="col-md-12">
            <Header/>
          </div>
        </div>
      <div className='row'>
        <div className="col-md-12 p-2">
          <table className='table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            {
              cart===undefined?<tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>:<tbody>
              {
                cart?.item?cart?.item.map((element) => {
                  total += element?.price
                  quantity += element?.quantity
                  return (<tr key={element?.itemId}>
                    <td>{element?.itemName}</td>
                    <td>{element?.cost}</td>
                    <td>{element?.quantity}</td>
                    <td>{element?.price}</td>
                  </tr>)
                }):<></>
              }
            </tbody>
            } 
          </table>
          <h3 id="cart-total">Cart Total</h3>
          <div className='d-flex justify-content-between'>
            <span>Cart Totals</span>
            <span>Number of items: {quantity?quantity:0}</span>
            <span>Total: {total?total:0}</span>
          </div>
          <div className='d-flex justify-content-end pt-5'>
            <button className='btn btn-outline-primary' onClick={()=>onCheckout(cart)}>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Kart