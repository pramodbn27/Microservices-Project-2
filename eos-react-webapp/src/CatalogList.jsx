import React, { useState, useEffect } from "react";
import axios from "./api/axios";
import Header from "./Header";
const CATALOG_URL = "/v1/catalog";
const KART_URL = "/v1/kart";

const CatalogList = (props) => {
    const [catalog, setCatalog] = useState([]);

    /* Initial value for cartData should be placed in useState({ userid: "", item: [] }) 
    const [cartData, setCartData] = useState({ userid: "", item: [] }); */
    const [cartData , setCartData] = useState({ userid: "", item: [] });

    const [itemArray, setItemArray] = useState([]);
    useEffect(() => {
        catList();
    }, []);

    useEffect(() => {
        sendToCart()
    }, [itemArray.length])

    const catList = async () => {
        const response = await axios.get(CATALOG_URL)
        //   const response = [
        //      {
        //         id: 1,
        //         itemName: "T-Shirt",
        //         description: "T-Shirt For Mens",
        //         amount: 100,
        //         imageUrl: "https://edwiki-webserver-config.s3.amazonaws.com/1",
        //      },
        //      {
        //         id: 2,
        //         itemName: "Reebok Shoes",
        //         description: "Reebok Shoes For Men",
        //         amount: 200,
        //         imageUrl: "",
        //      },
        //      {
        //         id: 3,
        //         itemName: "Nike Shoes",
        //         description: "Nike Shoes For Men",
        //         amount: 250,
        //         imageUrl: "",
        //      },
        //      {
        //         id: 4,
        //         itemName: "Shirt",
        //         description: "Shirt For Mens",
        //         amount: 400,
        //         imageUrl: "",
        //      },
        //      {
        //         id: 5,
        //         itemName: "Shirt",
        //         description: "Shirt For Mens",
        //         amount: 400,
        //         imageUrl: "",
        //      },
        //   ];
        // const response = []
        setCatalog(response.data);
    };
    const sendToCart = async () => {
        if (itemArray.length) {
            let user = JSON.parse(localStorage.getItem('user'))
            // console.log('user',user);
            setCartData({ userid: user?.id, item: itemArray });
        }
        console.log("cartData", cartData);
        if (cartData.item.length) {
            if (cartData.item[0]?.quantity !== 0) {
                let response = await axios.post(KART_URL, cartData, null);
                console.log('cart response', response);
                if (response.data) {
                    localStorage.setItem('cartId', response.data?.id)
                    return <div class="alert alert-success" role="alert">
                        Item Added In Cart Successfully!
                    </div>
                }
            }

        }
    }
    const addToCart = async (element, quantity) => {
        let data = {
            itemId: element?.id,
            quantity: quantity,
        };
        setItemArray([...itemArray,data]);
        console.log('length',itemArray);
            sendToCart()
    };
    const incre = (element) => {
        if (itemArray.length) {
            itemArray?.forEach((v) => {
                if (v?.itemId === element?.id) {
                    v.quantity += 1;
                }
                setItemArray(itemArray)
                // setCartData({userid:1,item:itemArray})
            });
            sendToCart()
        }
    };
    const decre = (element) => {
        if (itemArray.length) {
            itemArray?.forEach((v) => {
                if (v?.itemId === element?.id) {
                    if (v.quantity >= 1) {
                        v.quantity = v.quantity - 1;
                        setItemArray(itemArray)
                    } else if (v.quantity < 1 || v.quantity == 0) {
                        // let newArray =itemArray.pull(element)
                        let newArray = itemArray.filter((v) => v.quantity != 0);
                        setItemArray(newArray);
                    }
                }
            });
            sendToCart()
        }
    };

    const isInCart = (element) => {

        //this method should find the element item that is in the cart. If is found then true is returned, else false
        return itemArray?.find((item) => item.itemId === element.id)
            ? true
            : false;
    };

    return (
        <div className='container-fluid cat'>
            <div className='row'>
                <Header />
            </div>
            {catalog.length !== 0 ? (
                <div className='row d-flex justify-content align-item flex-wrap mt-2'>
                    {catalog.map((element) => {
                        return (
                            <div className='col-md-3 col mb-2' key={element.id}>
                                <div className='card' style={{ width: "15rem" }}>
                                    <img
                                        src={element?.imageUrl}
                                        className='img-fluid card-image'
                                        alt=''
                                    />
                                    <div className='card-body'>
                                        <h5 className='card-title'>₹{element?.amount}</h5>
                                        <p className='card-text'>{element?.itemName}</p>
                                        <p className='card-text'>
                                            {element?.description}
                                        </p>

                                        {isInCart(element) ? (
                                            <>
                                                <a
                                                    className='btn btn-outline-danger me-2'
                                                    onClick={() => decre(element)}
                                                >
                                                    -
                                                </a>
                                                <a
                                                    className='btn btn-outline-primary'
                                                    onClick={() => incre(element)}
                                                >
                                                    +
                                                </a>
                                                {itemArray.map((item) => item?.quantity && item.itemId == element.id ? <label className="ms-2" key={item?.itemId}>{item?.quantity}</label> : <label className="ms-2" key={item?.itemId}>0</label>)}
                                            </>
                                        ) : (<a
                                            onClick={() => addToCart(element, 1)}
                                            className='btn btn-outline-primary'
                                        >
                                            Add To Cart
                                        </a>)}


                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default CatalogList;