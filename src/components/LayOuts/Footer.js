import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';

const Footer = () => {
    return (
        <footer className="py-4 bg-dark">
            <p className="text-white pt-3 text-center">Copyright <FontAwesomeIcon className="icon" icon={faCopyright} /> THE COMPUTER CENTER 2021 All Right Reserved.</p>
        </footer>
    );
};

export default Footer;