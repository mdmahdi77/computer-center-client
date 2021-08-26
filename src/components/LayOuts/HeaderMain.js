import React from 'react';
import '../../App.css'
import Typical from 'react-typical'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faGooglePlusG, faTwitter } from '@fortawesome/free-brands-svg-icons';

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
            <h6 className="text-center text-white mt-4">CONNECT WITH US</h6>
            <ul className="social-media list-inline text-center mt-4">
                <li className="list-inline-item">
                    <a href="//facebook.com"><FontAwesomeIcon className="icon active-icon" icon={faFacebookF} /></a>
                    </li>
                <li className="list-inline-item">
                <a href="//google.com"><FontAwesomeIcon className="icon" icon={faGooglePlusG} /></a>
                </li>
                <li className="list-inline-item">
                <a href="//instagram.com"><FontAwesomeIcon className="icon" icon={faInstagram} /></a>
                </li>
                <li className="list-inline-item">
                <a href="//twitter.com"><FontAwesomeIcon className="icon" icon={faTwitter} /></a>
                </li>
            </ul>
        </main>
    );
};

export default HeaderMain;