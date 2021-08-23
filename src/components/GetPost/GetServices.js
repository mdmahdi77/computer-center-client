import axios from 'axios';
import React, { useState } from 'react';
import { Fragment } from 'react';
import { useEffect } from 'react';
import Preloader from '../Home/PreLoader';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';

const GetServices = () => {

    const [posts, setPosts] = useState([])
    const [preloader, setPreloader] = useState('block')

    const fetchPosts = () => {
        axios.get('http://localhost:8000/api/posts')
            .then(response => {
                console.log(response.data.posts)
                setPosts(response.data.posts)
                setPreloader('none')
            })
            .catch(error => alert('Error fetching posts'))
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <Fragment>
            <div className="container my-5">
                <Preloader visibility={preloader} />

                <div className="row">
                    {
                        posts.map(post => (
                            <div className="col-md-4 my-5" key={post._id}>
                                <h3>{post.title}</h3>
                                <img src={post.image} width="300px" height="200px" alt="" />
                                <div>{renderHTML(post.content.substring(0, 150))}</div>
                                <div className="d-flex justify-content-between">
                                    <Link className="text-decoration-none" to={`/post/${post.slug}`}><span>View details</span></Link>
                                    <Link className="text-decoration-none" to={`/checkout/${post._id}`}><span>Buy now</span></Link>
                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>
        </Fragment>
    );
};

export default GetServices;