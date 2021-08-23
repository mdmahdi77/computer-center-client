import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Fragment } from 'react';
import Header from '../LayOuts/Header';
import MetaData from './../LayOuts/MetaData';
import { UserContext } from './../../App';
import { useHistory, useLocation, Link } from 'react-router-dom';

const Login = () => {

    const [loggedIn, setLoggedIn] = useContext(UserContext)

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const [state, setState] = useState({
        email: '',
        password: ''
    })

    const { email, password } = state

    const handleChange = name => event => {
        // console.log('name', name, 'event', event.target.value)
        setState({...state, [name]: event.target.value})
    }

    const handleSubmit = event => {
        event.preventDefault()
        axios.post('http://localhost:8000/api/login', {email, password})
        .then(response => {
            console.log(response)
            // empty state
            setState({...state})
            setLoggedIn(response.data.user)
            localStorage.setItem('token', JSON.stringify(response.data.token))
            localStorage.setItem('user', JSON.stringify(response.data.user))
            history.replace(from);
        })
        .catch(error => {
            console.log(error.response)
            alert(error.response.data.error)
        })
    }

    // const logoutHandler = () => {
    //     axios.get('http://localhost:8000/api/logout')
    //     .then(response => {
    //         console.log(response)
    //         setLoggedIn('')
    //         localStorage.removeItem('token', JSON.stringify(response.data.token))
    //         // show success alert
    //         alert(`User logout successfully`)
    //     })
    //     .catch(error => {
    //         console.log(error.response)
    //         alert(error.response.data.error)
    //     })
    // }


    // ANOTHER PROCESS ON AUTHENTICATION

    // const { register, handleSubmit, watch, formState: { errors } } = useForm();

    // let history = useHistory();
    // let location = useLocation();
    // let { from } = location.state || { from: { pathname: "/" } };

    // const onSubmit = data => {

    //     const eventData = {
    //         email: data.email,
    //         password: data.password
    //     }

    //     const url = `http://localhost:8000/api/login`

    //     fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-type': 'application/json'
    //         },
    //         body: JSON.stringify(eventData)

    //     })
    //         .then(res => res.json())

    //         .then(data => {

    //             console.log(data)

    //             if (data.token) {
    //                 localStorage.setItem('token', data.token)
    //                 history.replace(from);
    //             }
                

                
    //         })

    // }

    // const logoutHandler = () => {
    //     axios.get('http://localhost:8000/api/logout')
    //         .then(response => {
    //             console.log(response)
    //             localStorage.removeItem('token', JSON.stringify(response.data.token))
    //             // show success alert
    //             alert(`User logout successfully`)
    //         })
    //         .catch(error => {
    //             console.log(error.response)
    //         })
    // }

    return (
        <Fragment>
            <MetaData title={'Login page'} />
            <Header />
            <div className="container">
                <h1 className="my-5">Login</h1>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input value={email} onChange={handleChange('email')} type="text" className="form-control" placeholder="Your email" required />
                    </div>
                    <br />
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input value={password} onChange={handleChange('password')} type="text" className="form-control" placeholder="Your Password" required />
                    </div>
                    <br />
                    <div>
                        <button className="btn btn-primary">Create</button>
                    </div>
                    <br />
                    <div>
                       <Link to="/register" className="text-decoration-none">Register</Link>
                    </div>
                </form>

            </div>
        </Fragment>
    );
};

export default Login;