import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { closeStatusMessage } from '../../actions';

const StyledMessage = styled.div`
    display: ${props => props.display};
    position: relative;

    width: 250px;
    height: 120px;
    padding: 20px;
    margin-top: 10px;
    background-color: ${props => props.bgColor};
    border-radius: 7px;

    .message__header {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 5px;
    }

    .message__text {

    }

    .message__close {
        position: absolute;
        top: 0;
        right: 5px;

        cursor: pointer;

        font-size: 35px;
        line-height: 35px;
    }
`;

const StatusMessage = ({message, closeStatusMessage}) => {
    const {id, type, title, description} = message;
    const [display, toggleDisplay] = useState(true);
    let bgColor;
    
    switch (type) {
        case 'success':
            bgColor = "#99FF99";
            break;
        case 'error':
            bgColor = "#FD7B7C";
            break;
        default:
            bgColor = "#FDDB6D";
            break;
    }


    if (display) {
        setTimeout(() => {
            toggleDisplay(false);
            closeStatusMessage(id);
        }, 3000);
    }

    return (
        <StyledMessage display={display ? 'block' : ' none'} bgColor={bgColor}>
            <p className="message__header">{title}</p>
            <p className="message__text">{description}</p>
            <div className="message__close"
                onClick={() => {
                    toggleDisplay(false);
                    closeStatusMessage(id);
                }}>&times;</div>
        </StyledMessage>
    );
};

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = {
    closeStatusMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(StatusMessage);