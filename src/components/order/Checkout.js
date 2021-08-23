import React, { Fragment, useState, useEffect, useContext } from 'react';
import Header from '../LayOuts/Header';
import MetaData from '../LayOuts/MetaData';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import { UserContext } from './../../App';

const Checkout = () => {

    const [loggedIn, setLoggedIn] = useContext(UserContext)

    const {dataId} = useParams()

    const history = useHistory()

    const [services, setServices] = useState([])
    const[shipmentData, setShipmentData] = useState(null)

    const fetchPosts = () => {
        axios.get('http://localhost:8000/api/posts')
            .then(response => {
                setServices(response.data.posts)
            })
            .catch(error => console.log('Error fetching posts'))
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    // order details
    const cartDetails = services.find(service => service._id === dataId )

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => {
        setShipmentData(data)
    };


    //Handle submit after

    const handlePaymentSuccess = paymentId => {
        const order = {shippingInfo: shipmentData, orderItems: cartDetails, paymentInfo: {id: paymentId}, email: loggedIn.email}
        console.log(order)
        fetch('http://localhost:8000/api/order/new', {
              method: 'POST',
              headers: {
                  'Content-type' : 'application/json'
              },
              body: JSON.stringify(order)
          })
          .then(res => res.json())
          .then(data => {
            if(data){
            history.push(`/orderSuccess`)
            }
          })
    }

    return (
        <Fragment>
            <MetaData title={`Checkout`} />
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5">

                        <form style={{display: shipmentData ? "none" : "block"}} onSubmit={handleSubmit(onSubmit)}>

                            <input name='name' placeholder='Your Name' {...register("name", { required: true })} />
                            {errors.name && <span>This field is required</span>}
                            <br />
                            <input name='email' placeholder='Your Email' {...register("email", { required: true })} />
                            {errors.email && <span>This field is required</span>}
                            <br />
                            <input name='phoneNo' placeholder='Your Phone Number' {...register("phoneNo", { required: true })} />
                            {errors.phoneNo && <span>This field is required</span>}
                            <br />
                            <textarea name='address' placeholder='Address...' {...register("address", { required: true })} />
                            {errors.address && <span>This field is required</span>}
                            <br />
                            <input type="submit" />
                        </form>

                        <div className="my-5" style={{display: shipmentData ? "block" : "none"}}>
                            <ProcessPayment handlePayment={handlePaymentSuccess} />
                        </div>

                    </div>
                    <div className="col-md-6 mt-5">
                        <h1>{cartDetails?.title}</h1>
                        <p>{cartDetails?.content}</p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Checkout;