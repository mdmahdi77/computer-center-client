import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Fragment } from 'react';
import Header from '../LayOuts/Header';
import MetaData from '../LayOuts/MetaData';
import renderHTML from 'react-render-html';

const ServiceDetail = (props) => {

    const [postDetails, setPostDetails] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:8000/api/post/${props.match.params.slug}`)
        .then(response => setPostDetails(response.data.post))
        .catch(error => console.log(error))
    },[])

    return (
        <Fragment>
            <MetaData title={'Single post detail'} />
            <Header />
            <h3>{postDetails.title}</h3>
                <div>{renderHTML(postDetails && postDetails.content)}</div>
                <p>Author: {postDetails.user}</p>
                <p>Published on {' '}{new Date(postDetails.createdAt).toLocaleString()}</p>
        </Fragment>
    );
};

export default ServiceDetail;