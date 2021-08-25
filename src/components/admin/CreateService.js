import axios from 'axios';
import React, { Fragment } from 'react';
import { useState, useContext } from 'react';
import { useEffect } from 'react';
import Header from '../LayOuts/Header';
import MetaData from '../LayOuts/MetaData';
import { UserContext } from '../../App';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateService = () => {

    const [loggedIn, setLoggedIn] = useContext(UserContext)
    
    const [imgUrl, setImgUrl] = useState(null)

    const [state, setState] = useState({
        title: '',
        user: '',
        price: '',
        image: ''
    })

    const [content, setContent] = useState('')

    // rich text editor handle change
    const handleContent = event => {
        console.log(event)
        setContent(event)
    }

    const { title, price, user } = state

    const handleChange = name => event => {
        // console.log('name', name, 'event', event.target.value)
        setState({...state, [name]: event.target.value})
    }

    const handleSubmit = event => {
        event.preventDefault()
        // console.table({title, content, user})
        axios.post('http://localhost:8000/api/post', {title, content, price, user, image: imgUrl})
        .then(response => {
            console.log(response)
            // empty state
            setState({...state, title: '', price: '', user: '', image: ''})
            setContent(content)
            // show success alert
            alert(`Post is ${response.data.post.title} created successfully`)
        })
        .catch(error => {
            console.log(error.response)
            alert(error.response.data.error)
        })
    }

    const handleImageUrl = (e) => {

        console.log(e.target.files[0])
        const imageData = new FormData()
        imageData.set('key', '3fdc4394d2aa620592a552e98b379e1c')
        imageData.append('image', e.target.files[0])

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                setImgUrl(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    return (
        <Fragment>
            <MetaData title={'Create new post'} />
                <Header />
            <div className="container p-5">
                <h1>Create post</h1>
                <br />

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="text-muted">Title</label>
                        <input value={title} onChange={handleChange('title')} type="text" className="form-control" placeholder="Post Title" required />
                    </div>
                    <br />
                    <div className="form-group">
                        <label className="text-muted">Content</label>
                        <ReactQuill
                            onChange={handleContent}
                            value={content}
                            theme="snow"
                            className="pb-5 mb-3"
                            placeholder="Write something.."
                            style={{border: '1px solid #666'}}
                         />
                    </div>
                    <br />
                    <div className="form-group">
                        <label className="text-muted">Price</label>
                        <input value={price} onChange={handleChange('price')} type="text" className="form-control" placeholder="Price" required />
                    </div>
                    <br />
                    <div className="form-group">
                        <label className="text-muted">User</label>
                        <input value={loggedIn.name} onChange={handleChange('user')} type="text" className="form-control" placeholder="Your name" required />
                    </div>
                    <br />
                    <div className="form-group">
                            <input className="form-control" type="file" onChange={handleImageUrl} />
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

export default CreateService;