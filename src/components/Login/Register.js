import React, { Fragment, useState } from 'react';
import MetaData from '../LayOuts/MetaData';
import Header from '../LayOuts/Header';
import axios from 'axios';

const Register = () => {



    const [state, setState] = useState({
        name: '',
        email: '',
        password: ''
    })

    const { name, email, password } = state

    const handleChange = name => event => {
        // console.log('name', name, 'event', event.target.value)
        setState({ ...state, [name]: event.target.value })
    }

    const handleSubmit = event => {
        event.preventDefault()
        console.table({ name, email, password })
        axios.post('http://localhost:8000/api/register', {name, email, password})
        .then(response => {
            console.log(response)
            // empty state
            setState({...state, name: '', email: '', password: ''})
            // show success alert
            alert(`Register in user successfully`)
        })
        .catch(error => {
            console.log(error.response)
            alert(error.response.data.error)
        })
    }

    return (
        <Fragment>
            <MetaData title={'Sign in user'} />
            <Header />
            <div className="container">
                <h1 className="my-5">Register</h1>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input value={name} onChange={handleChange('name')} type="text" className="form-control" placeholder="Your name" required />
                    </div>
                    <br />
                    <div className="form-group">
                        <label className="text-muted">Name</label>
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
                </form>

            </div>
        </Fragment>
    );
};

export default Register;