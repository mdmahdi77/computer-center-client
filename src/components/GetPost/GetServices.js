import axios from 'axios';
import React, { useState } from 'react';
import { Fragment } from 'react';
import { useEffect } from 'react';
import Preloader from '../Home/PreLoader';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';
import { Card, Col, Row } from 'react-bootstrap';
import '../../App.css'

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

    {/* <div>{renderHTML(post.content.substring(0, 150))}</div> */ }

    return (
        <Fragment>
            <div className="container-fluid my-5" id="services">
                    <h1 className="display-4 text-center font-weight-bolder mt-5 pt-5">OUR SERVICES</h1>
                    <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <h5 className="text-center mt-3 mb-5 pb-5 text-secondary">Here Is More Services, We Are Made It Easy For Every Customer Which Will Be More Effective And Effortless For You.</h5>
                    </div>
                </div>
                <Preloader visibility={preloader} />
                <Row sm={2} xs={1} md={3} className="g-4">
                    {
                        posts.map(post => (
                            <Col>
                                <Card className="cardStyle">
                                    <Link className="text-decoration-none" to={`/post/${post.slug}`}>
                                        <Card.Img variant="top" src={post.image} width="300px" height="200px" />
                                        <Card.Title className="mt-3"><h1 className="font-weight-bold text-danger">{post.title}</h1></Card.Title>
                                    </Link>
                                    <Card.Body className="d-flex justify-content-between align-item-center">
                                        <Card.Text><span className="font-weight-bold text-dark">Costs:</span> <span className="font-weight-bold text-danger">$</span>{post.price}</Card.Text>
                                        <Card.Text><Link className="text-decoration-none btn btn-outline-dark" to={`/checkout/${post._id}`}><span>Buy now</span></Link></Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>

            </div>
        </Fragment>
    );
};

export default GetServices;