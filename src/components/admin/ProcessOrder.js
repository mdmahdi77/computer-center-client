import React, { Fragment, useEffect, useState } from 'react';
import Header from '../LayOuts/Header';
import MetaData from '../LayOuts/MetaData';
import axios from 'axios';
import { useForm } from "react-hook-form";

const ProcessOrder = (props) => {

    const [orders, setOrders] = useState([])
    const { register, handleSubmit } = useForm();

    const [isSubmitSuccess, setIsSubmitSuccess] = useState(false)

    console.log(orders)

    useEffect(() => {

        axios.get(`http://localhost:8000/api/order/${props.match.params.id}`)
            .then(response => {

                setOrders(response.data.order)
            })
            .catch(error => console.log('Error loading single post'))

    }, [isSubmitSuccess])

    const onSubmit = data => {

        axios.put(`http://localhost:8000/api/order/update/${orders._id}`, data)
            .then(response => {
                setIsSubmitSuccess(true)
                console.log(response)
            })
            .catch(error => console.log('Error updating'))

    }

    // const handleUpdateStatus = (id) => {

    //     const formData = new FormData();
    //     formData.set('status', status)

    //     axios.put(`http://localhost:8000/api/order/update/${id}`)
    //         .then(response => {

    //             setStatus(formData)

    //         })
    //         .catch(error => console.log('Error updating'))

    // }


    return (
        <Fragment>
            <MetaData title={`User Order List`} />
            <Header />
            <Fragment>
                <h1>Process Order</h1>

                <h3># {orders._id}</h3>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <select {...register("status")}>
                        <option value="pending">Pending</option>
                        <option value="done">Done</option>
                    </select>
                    <br />
                    <input type="submit" />
                </form>

                {/* <div className="form-group">
                    <select
                        className="form-control"
                        name="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="Pending">Pending</option>
                        <option value="Done">Done</option>
                    </select>
                </div>

                <button className="btn btn-primary" onClick={() => handleUpdateStatus(orders._id)}>Update Status</button> */}

            </Fragment>
        </Fragment>
    );
};

export default ProcessOrder;