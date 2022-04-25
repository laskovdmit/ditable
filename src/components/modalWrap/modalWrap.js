import React from 'react';
import styled from 'styled-components';

const StyledModalWrap = styled.div`
    display: ${props => props.display};
    width: 100%;
    height: 100%;

    overflow-x: hidden;
    overflow-y: auto;

    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    
    background-color: rgba(0, 0, 0, 0.3);

    .modal__wrap {
        display: flex;
        align-items: center;
        justify-content: center;

        margin: 1.75rem auto;
        min-height: calc(100% - (1.75rem * 2));

        pointer-events: none;
        position: relative;
    }

    .modal__content {
        min-width: ${props => props.width || '800px'};
        min-height: ${props => props.height || '400px'};
        background-color: #fff;
        border-radius: 15px;

        padding: 20px 30px;
        position: relative;
        display: flex;
        flex-direction: column;

        pointer-events: auto;
    }

    .modal__close {
        position: absolute;
        top: -10px;
        right: -25px;

        cursor: pointer;

        font-size: 40px;
        line-height: 40px;
    }
`;

const getScrollWidth = () => {
    const div = document.createElement('div');

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY ='scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
};

const ModalWrap = ({display, closedFunc, children, width, height}) => {
    
    if (display) {
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = getScrollWidth() + 'px';
    } 
    
    return (
        <StyledModalWrap
            display={display ? 'block' : 'none'}
            width={width}
            height={height}
            onClick={(e) => (e.target === e.currentTarget) && closedFunc()}>
            <div className="modal__wrap">
                <div className="modal__content">
                    {children}
                    <div
                        className="modal__close"
                        onClick={closedFunc}>&times;</div>
                </div>
            </div>
        </StyledModalWrap>
    );
};

export default ModalWrap;