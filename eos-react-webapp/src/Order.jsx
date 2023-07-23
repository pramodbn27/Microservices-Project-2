import React from 'react'
import { Link } from 'react-router-dom'

const Order = () => {
  return (
    <div className='container'>
        <div className="row">
            <div className="col-md-12 p-2">
                <Link to='/profile' className='btn btn-outline-primary'>Back</Link>
            </div>
            <div className="col-md-12">
                <div className="card">
                    <div className="card-heading">
                        <h2 className="text-center">Order Process</h2>
                    </div>
                    <div className="card-body">
                        <div>
                            <input type="checkbox" name="Pre-Transit" id=""  className='orderstatus' defaultChecked/><label htmlFor='Pre-Transit'>Pre-Transit</label> 
                        </div>
                        <div>
                            <input type="checkbox" name="In-Transit" id=""  className='orderstatus' defaultChecked/><label htmlFor='In-Transit'>In Transit</label> 
                        </div>
                        <div>
                            <input type="checkbox" name="Out-for-Delivery" id=""  className='orderstatus' defaultChecked/><label htmlFor='Out-for-Delivery'>Out for Delivery</label> 
                        </div>
                        <div>
                            <input type="checkbox" name="Delivered" id=""  className='orderstatus' defaultChecked/><label htmlFor='Delivered'>Delivered</label> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Order