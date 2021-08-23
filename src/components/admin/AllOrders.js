import React, { Fragment, useEffect, useState } from 'react';
import Header from '../LayOuts/Header';
import MetaData from '../LayOuts/MetaData';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllOrders = () => {

    const [orders, setOrders] = useState([])

    const fetchOrders = () => {

        axios.get(`http://localhost:8000/api/all/orders`)
        .then(response => {
            setOrders(response.data.allOrder)
        })
        .catch(err => console.log(err))

    }

    useEffect(() => {

        fetchOrders()

    },[])


    const deleteConfirm = (id) => {
        console.log(id)
        axios.delete(`http://localhost:8000/api/order/delete/${id}`)
            .then(response => {
                fetchOrders()
                alert('Orders deleted successfully')
            })
            .catch(error => alert('Error deleting post'))
    }

    const setOrder = () => {
        const data = {
            columns: [
                {
                    label: 'Order Id',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions'
                },
            ],
            rows: []
        }

        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                amount: order.orderItems.price,
                status: order.orderStatus && String(order.orderStatus).includes('Done') ?
                <p style ={{color: 'green'}}>{order.orderStatus}</p>
                :
                <p style ={{color: 'red'}}>{order.orderStatus}</p>,
                actions: <Fragment>
                    <Link className="btn btn-sm btn-outline-success text-decoration-none" to={`/update/process/${order._id}`}>
                        <i className="fa fa-eye"></i>
                    </Link>
                    <button className="btn btn-sm btn-outline-danger px-2 ml-2 py-1" onClick={() => deleteConfirm(order._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })
        return data
    }

    return (
        <Fragment>
            <MetaData title={`User Order List`} />
            <Header />
            <Fragment>

                <MDBDataTable 
                    data={setOrder()}
                    className="px-3"
                    bordered
                    striped
                    hover
                />

            </Fragment>
        </Fragment>
    );
};

export default AllOrders;