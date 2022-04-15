import React from 'react';
import styled from 'styled-components';
import { StyledSpinner } from '../../styles/';

const CustomStyledSpinner = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

`;

const Spinner = () => {
    return (
        <CustomStyledSpinner>
            <StyledSpinner>
                <div className="loadingio-spinner-spinner-mswm6w4uf1t">
                    <div className="ldio-98zqx227uf4">
                        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                    </div>
                </div>
            </StyledSpinner>
        </CustomStyledSpinner>
    );
};

export default Spinner;