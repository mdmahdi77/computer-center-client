import React from 'react';
import '../../App.css'
import Typical from 'react-typical'

const steps = [
    'COMPUTER BUSINESS', 3000,
    'MORE SOLUTION', 3000,
    'GREAT SERVICES', 3000
];

const HeaderMain = () => {
    return (
        <main className="headerMain">
            <h1 className="text-center text-white pt-5">Great Service For Our Customer</h1>
            <Typical wrapper="span" steps={steps} loop={Infinity} className="typical" />
            
        </main>
    );
};

export default HeaderMain;