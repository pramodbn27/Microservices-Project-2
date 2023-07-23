import React, { useState,useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from './api/axios';
const PAYMENT_URL = '/v1/payment'
const ORDER_URL = '/v1/order'

const Payment = (props) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [payment = { cardHolder: '', cardNumber: '', validation: '', cvv: '' }, setPayment] = useState();
  const [upi, setUPI] = useState()
  const [modeValue, setModeValue] = useState('Select Mode')
  const [cartData,setCartData] = useState()
  useEffect(() => {
    setCartData(location.state?.element)
  }, [!cartData])
  
  const onPayment = async (event) => {
    try {
      event.preventDefault()
      // navigate('/order',{state:{paymentid:1}})
      let kartId = JSON.parse(localStorage.getItem('cartId'))
      let user = JSON.parse(localStorage.getItem('user'));
      let data ={
        kartId:kartId,
        cardHolder:payment?.cardHolder,
        cardNumber:payment?.cardNumber,
        validation:payment?.validation,
        cvv:payment?.cvv,
        mode:'CARD',
      }
      let paymentresponse = await axios.post(PAYMENT_URL, data, null);
      if (paymentresponse) {
        let orderdata ={
          paymentId:paymentresponse?.data?.id,
          userId:user.id,
          item:cartData?.item
        }
        let response = await axios.post(ORDER_URL, orderdata, null);
        if (response) {
          navigate('/success',{state:{orderData:response?.data}});
        }
      }
      
      
    } catch (error) {
      console.log('paymentError', error);
    }
  }
  const onUpiPayment = async() => {
    try {
      let kartId = JSON.parse(localStorage.getItem('cartId'))
      let user = JSON.parse(localStorage.getItem('user'));
      let data ={
        kartId:kartId,
        mode:'UPI',
      }
      let paymentresponse = await axios.post(PAYMENT_URL, data, null);
      if (paymentresponse) {
        let orderdata ={
          paymentId:paymentresponse?.data?.id,
          userId:user.id,
          vpa:upi,
          item:cartData?.item
        }
        let response = await axios.post(ORDER_URL, orderdata, null);
        if (response) {
          navigate('/success',{state:{orderData:response?.data}});
        }
      }
    } catch (error) {
      console.log('upiError', error);
    }
  }
  const onCodPayment = async() => {
    try {
      let kartId = JSON.parse(localStorage.getItem('cartId'))
      let user = JSON.parse(localStorage.getItem('user'));
      let data ={
        kartId:kartId,
        mode:'COD',
      }
      let paymentresponse = await axios.post(PAYMENT_URL, data, null);
      if (paymentresponse) {
        let orderdata ={
          paymentId:paymentresponse?.data?.id,
          userId:user.id,
          item:cartData?.item
        }
        let response = await axios.post(ORDER_URL, orderdata, null);
        if (response) {
          navigate('/success',{state:{orderData:response?.data}});
        }
      }
      
    } catch (error) {
      console.log('codError', error);
    }
  }
  const handleChange = (e) => {
    console.log('e', e.target.value);
    setModeValue(e.target.value);
  };
  return (
    <div className='container'>
      <div className="row">
        <div className="col-md-12 d-flex justify-content-center align-item-center">
          <div className="card">
            <div className="body">
              {modeValue === 'CARD' ? <form className='p-2' onSubmit={onPayment}>
                <div className="form-group">
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Card holder*</label>
                    <input type="text" value={payment?.cardHolder} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required onChange={(ch) => setPayment({ ...payment, cardHolder: ch.target.value })} />
                  </div>
                </div>
                <div className="form-group">
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Credt/debt card number*</label>
                    <input type="text" value={payment?.cardNumber} className="form-control" id="exampleInputPassword1" required onChange={(cn) => setPayment({ ...payment, cardNumber: cn.target.value })} />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="mb-3 col">
                    <label className="form-check-label" htmlFor="expire">Expriration month and year*</label>
                    <input type="text" value={payment?.validation} className="form-control" id="expire" maxLength={5} required onChange={(my) => setPayment({ ...payment, validation: my.target.value })} />
                  </div>
                  <div className="mb-3 col">
                    <label className="form-check-label" htmlFor="cvc">CVC*</label>
                    <input type="text" value={payment?.cvv} className="form-control" id="cvc" maxLength={3} required onChange={(cv) => setPayment({ ...payment, cvv: cv.target.value })} />
                  </div>
                </div>
                <button type="submit" className="btn btn-outline-primary">Submit</button>
              </form> : modeValue === 'UPI' ? <div className='d-flex flex-column justify-content-center align-item-center p-2'>
                <input type='text' value={upi} onChange={(text) => setUPI(text.target.value)} placeholder='Enter your upi id'/>
                <button className='btn btn-outline-primary' onClick={() => onUpiPayment()}>Submit</button>
              </div> : modeValue === 'COD' ?<div className='p-2'><button className='btn btn-outline-primary mb-n2' onClick={() => onCodPayment()}>COD</button></div>: <div className="form-floating">
                <select className="form-select" id="floatingSelect" aria-label="Floating label select example" value={modeValue} onChange={handleChange}>
                  <option>{modeValue}</option>
                  <option value="CARD">CARD</option>
                  <option value="UPI">UPI</option>
                  <option value="COD">COD</option>
                </select>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment

