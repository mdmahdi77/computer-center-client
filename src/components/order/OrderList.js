import React, { Fragment, useContext, useEffect, useState } from 'react';
import Header from '../LayOuts/Header';
import MetaData from '../LayOuts/MetaData';
import { MDBDataTable } from 'mdbreact'
import axios from 'axios';
import { UserContext } from './../../App';

const OrderList = () => {

    const [loggedIn, setLoggedIn] = useContext(UserContext)

    const [ordersList, setOrdersList] = useState([])

    const fetchOrders = () => {
        
        axios.get(`http://localhost:8000/api/orders?email=`+loggedIn.email)
        .then(response => {
            console.log(response)
            setOrdersList(response.data.orders)
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

        ordersList.forEach(order => {
            data.rows.push({
                id: order._id,
                amount: order.orderItems.price,
                status: order.orderStatus && String(order.orderStatus).includes('Done') ?
                <p style ={{color: 'green'}}>{order.orderStatus}</p>
                :
                <p style ={{color: 'red'}}>{order.orderStatus}</p>,
                actions: <Fragment>
                    <button className="btn btn-danger" onClick={() => deleteConfirm(order._id)}>
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

export default OrderList;