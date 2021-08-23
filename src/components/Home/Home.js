import React, { Fragment } from 'react';
import Header from '../LayOuts/Header';
import MetaData from '../LayOuts/MetaData';
import GetServices from '../GetPost/GetServices';

const Home = () => {
    return (
        <Fragment>
            <MetaData title={`FlexBlog Home Page`} />
            <Header />
            <GetServices/>
        </Fragment>
    );
};

export default Home;