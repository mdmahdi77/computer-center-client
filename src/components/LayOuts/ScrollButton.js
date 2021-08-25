import React from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

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
        left: 1%;
        bottom: 100px;
        height: 20px;
        font-size: 3rem;
        z-index: 1;
        cursor: pointer;
        color: blue;
    `

    return (
        <ButtonStyles>
            <Button className="my-5 text-center" onClick={scrollToTop} style={{ display: visible ? 'inline' : 'none' }}>
                Top
            </Button>
        </ButtonStyles>
    );
};

export default ScrollButton;