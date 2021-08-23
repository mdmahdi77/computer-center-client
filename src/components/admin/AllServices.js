import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import Header from '../LayOuts/Header';
import MetaData from '../LayOuts/MetaData';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';

const AllServices = () => {

    const [allPosts, setALLPosts] = useState([])

    const fetchPosts = () => {
        axios.get('http://localhost:8000/api/posts')
            .then(response => {
                console.log(response.data.posts)
                setALLPosts(response.data.posts)
            })
            .catch(error => alert('Error fetching posts'))
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    const deleteConfirm = (slug) => {
        let answer = window.confirm('Are you sure you want to delete')

        if(answer){
            deletePost(slug)
        }
    }

    const deletePost = (slug) => {
        console.log('delete', slug, 'post')
        axios.delete(`http://localhost:8000/api/post/${slug}`)
            .then(response => {
                alert(response.data.message)
                fetchPosts()
            })
            .catch(error => alert('Error deleting post'))
    }

    return (
        <Fragment>
            <MetaData title={'All post - Dashboard'} />
            <Header />
            <div className="container my-5">
                {
                    allPosts.map(posts => (
                        <div className="row" key={posts._id}>
                            <div className="col-md-10">
                                <h3>{posts.title}</h3>
                                <div>{renderHTML(posts.content.substring(0, 50))}</div>
                                <h6>Author:{' '}{posts.user}</h6>
                                <p>Published on {' '}{new Date(posts.createdAt).toLocaleString()}</p>
                            </div>
                            <div className="col-md-2">
                                <Link className="btn btn-sm btn-outline-success text-decoration-none" to={`/service/update/${posts.slug}`}> Update </Link>
                                <button className="btn btn-sm btn-outline-danger ml-1" onClick={() => deleteConfirm(posts.slug)}>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </Fragment>
    );
};

export default AllServices;