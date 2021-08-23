import axios from 'axios';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import Header from '../LayOuts/Header';
import MetaData from './../LayOuts/MetaData';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { UserContext } from './../../App';

const UpdatePost = (props) => {

    const [loggedIn, setLoggedIn] = useContext(UserContext)

    const [imgUrl, setImgUrl] = useState(null)

    const [state, setState] = useState({
        title: '',
        slug: '',
        user: '',
        image: ''
    })
    
    const [content, setContent] = useState('')
    
    // rich text editor handle change
    const handleContent = event => {
        console.log(event)
        setContent(event)
    }
    
    const { title, slug, user, image} = state
    

    useEffect(() => {
        axios.get(`http://localhost:8000/api/post/${props.match.params.slug}`)
        .then(response => {
            console.log(response)
            const { title, content, slug, user } = response.data.post
            setState({...state, title, slug, user, image})
            setContent(content)
        })
        .catch(error => console.log('Not found with this slug'))
    },[])

    const handleChange = name => event => {
        // console.log('name', name, 'event', event.target.value)
        setState({...state, [name]: event.target.value})
    }

    const handleSubmit = event => {
        event.preventDefault()
        // console.table({title, content, user})
        axios.put(`http://localhost:8000/api/post/${slug}`, {title, content, user, slug, image: imgUrl})
        .then(response => {
            console.log(response)
            const { title, content, slug, user, image } = response.data.post
            // empty state
            setState({...state, title: '', content: '', user: '', image: ''})
            // show success alert
            alert(`Post is ${title} updated successfully`)

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

    const showUpdateForm = () => (
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
                        <label className="text-muted">User</label>
                        <input value={loggedIn.name} onChange={handleChange('user')} type="text" className="form-control" placeholder="Your name" required />
                    </div>
                    <br />
                    <div className="form-group">
                            <input className="form-control" type="file" onChange={handleImageUrl} />
                        </div>
                    <br />
                    <div>
                        <button className="btn btn-primary">Update</button>
                    </div>
                </form>
    )

    return (
        <Fragment>
            <MetaData title={'Update post'} />
            <Header />
            <h1>Update Post</h1>
            {showUpdateForm()}
        </Fragment>
    );
};

export default UpdatePost;