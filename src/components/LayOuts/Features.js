import React from 'react';
import { Fragment } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import '../../App.css'
import Hours from '../../images/24-hours.png'

const Features = () => {

    const features = [
        {
            id: '1',
            title: 'Customer Support',
            img: Hours
        },
        {
            id: '2',
            title: 'Customer Support',
            img: Hours
        },
        {
            id: '3',
            title: 'Home Services',
            img: Hours
        },
        {
            id: '4',
            title: 'Home Services',
            img: Hours
        },
        {
            id: '5',
            title: 'Home Services',
            img: Hours
        },
        {
            id: '6',
            title: 'Home Services',
            img: Hours
        },
        {
            id: '7',
            title: 'Home Services',
            img: Hours
        },
        {
            id: '8',
            title: 'Home Services',
            img: Hours
        },
        {
            id: '9',
            title: 'Home Services',
            img: Hours
        },
        {
            id: '10',
            title: 'Home Services',
            img: Hours
        },
        {
            id: '11',
            title: 'Customer Support',
            img: Hours
        },
        {
            id: '12',
            title: 'Customer Support',
            img: Hours
        }
    ]

    return (
        <Fragment>
            <div className="container mb-5 pb-5" id="features">
                <h1 className="display-4 text-center font-weight-bolder mt-5 pt-5">CORE FEATURES</h1>
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <h5 className="text-center mt-3 mb-5 pb-5 text-secondary">Here Is Some Unique Features, We Are Made It Easy For Every Customer Which Will Be More Effective And Effortless For You.</h5>
                    </div>
                </div>
                <Row sm={3} xs={2} md={4} className="g-4">
                    {
                        features.map(feature => (
                            <Col>
                                <Card className="feature">
                                    <img src={feature.img} width="100px" />
                                    <Card.Title className="mt-3">{feature.title}</Card.Title>   
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </div>
        </Fragment>
    );
};

export default Features;