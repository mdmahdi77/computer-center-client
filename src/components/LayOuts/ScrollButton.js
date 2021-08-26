import React from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

const ScrollButton = () => {

    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop
        if (scrolled > 300) {
            setVisible(true)
        } else if (scrolled <= 300) {
            setVisible(false)
        }
    }

    window.addEventListener('scroll', toggleVisible)

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behaviour: 'smooth'
        })
    }

    const ButtonStyles = styled.div`
        position: fixed;
        width: 100%;
        left: 95%;
        bottom: 100px;
        height: 20px;
        z-index: 1;
        cursor: pointer;
    `

    return (
        <ButtonStyles>
            <FontAwesomeIcon className="angleUp" onClick={scrollToTop} style={{ display: visible ? 'inline' : 'none' }} icon={faAngleUp} />
        </ButtonStyles>
    );
};

export default ScrollButton;