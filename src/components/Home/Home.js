import React, { Fragment } from 'react';
import Header from '../LayOuts/Header';
import MetaData from '../LayOuts/MetaData';
import GetServices from '../GetPost/GetServices';
import HeaderMain from './../LayOuts/HeaderMain';
import ScrollButton from '../LayOuts/ScrollButton';
import Features from '../LayOuts/Features';
import HomeBackground from '../LayOuts/HomeBackground';
import Footer from './../LayOuts/Footer';

const Home = () => {
    return (
        <Fragment>
            <MetaData title={`Computer Center Home Page`} />
            <Header />
            <HeaderMain />
            <GetServices/>
            <ScrollButton />
            <Features />
            <HomeBackground />
            <Footer />
        </Fragment>
    );
};

export default Home;