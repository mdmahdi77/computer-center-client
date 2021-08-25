import React, { Fragment } from 'react';
import Header from '../LayOuts/Header';
import MetaData from '../LayOuts/MetaData';
import GetServices from '../GetPost/GetServices';
import HeaderMain from './../LayOuts/HeaderMain';
import ScrollButton from '../LayOuts/ScrollButton';
import Features from '../LayOuts/Features';

const Home = () => {
    return (
        <Fragment>
            <MetaData title={`FlexBlog Home Page`} />
            <Header />
            <HeaderMain />
            <GetServices/>
            <ScrollButton />
            <Features />
        </Fragment>
    );
};

export default Home;