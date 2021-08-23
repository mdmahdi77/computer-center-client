import React, { Fragment } from 'react';
import Header from '../LayOuts/Header';
import MetaData from '../LayOuts/MetaData';

const Dashboard = () => {
    return (
        <Fragment>
            <MetaData title={'Admin dashboard'} />
            <Header />
            <div className="container">
                <h1 className="my-5">Dashboard page</h1>
            </div>
        </Fragment>
    );
};

export default Dashboard;