import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import StatusMessage from './statusMessage';

const StyledWrapper = styled.div`
    position: fixed;
    z-index: 12;
    bottom: 10px;
    left: 10px;
`;

const StatusWrapper = ({messages}) => {
    return (
        <StyledWrapper>
            {messages && messages.map(message => {
                return <StatusMessage key={message.id} message={message}/>
            })}
        </StyledWrapper>
    );
};

const mapStateToProps = (state) => {
    return {
        messages: state.statusMessageArray
    }
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(StatusWrapper);