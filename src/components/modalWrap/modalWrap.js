import React from 'react';
import styled from 'styled-components';

const StyledModalWrap = styled.div`
    display: ${props => props.display};
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    
    background-color: rgba(0, 0, 0, 0.3);

    .modal__wrap {
        width: ${props => props.width || '800px'};
        height: ${props => props.height || '400px'};
        padding: 20px 30px;

        background-color: #fff;
        border-radius: 15px;

        position: relative;
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

const ModalWrap = ({display, closedFunc, children, width, height}) => {

    return (
        <StyledModalWrap
            display={display ? 'flex' : 'none'}
            width={width}
            height={height}
            onClick={(e) => (e.target === e.currentTarget) && closedFunc(false)}>
            <div className="modal__wrap">
                {children}
                <div
                    className="modal__close"
                    onClick={() => closedFunc(false)}>&times;</div>
            </div>
        </StyledModalWrap>
    );
};

export default ModalWrap;